# Lote 3 · Rectificación en el trabajador de prueba «Dos» (95): validar mensual → Rectificar → comparar → cancelar ambas.
import sys, json, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
C = {'allowed_company_ids': [1], 'lang': 'es_PE'}
EMP, VERSION = 95, 95
ejecutar('hr.version', 'write', [VERSION], {'wage': 3000.0}, context=C)
valores = ejecutar('hr.payslip', 'onchange_employee_id', [], '2026-10-01', '2026-10-31', EMP, False, context=C)['value']
datos = {'employee_id': EMP, 'date_from': '2026-10-01', 'date_to': '2026-10-31'}
for k in ('name', 'version_id', 'contract_id', 'struct_id', 'journal_id'):
    if valores.get(k): datos[k] = valores[k] if not isinstance(valores[k], list) else valores[k][0]
datos['worked_days_line_ids'] = [(0, 0, l) for l in valores.get('worked_days_line_ids', []) if isinstance(l, dict)]
boleta = ejecutar('hr.payslip', 'create', datos, context=C)
boleta = boleta[0] if isinstance(boleta, list) else boleta
ejecutar('hr.payslip', 'compute_sheet', [boleta], context=C)
ejecutar('hr.payslip', 'action_payslip_done', [boleta], context=C)
accion = ejecutar('hr.payslip', 'refund_sheet', [boleta], context=C)
notas = ejecutar('hr.payslip', 'search_read', [['employee_id', '=', EMP], ['credit_note', '=', True]], fields=['id'], context=C)
nota = notas[-1]['id']
leer = lambda i: ejecutar('hr.payslip', 'read', [i], fields=['name', 'number', 'state', 'credit_note', 'struct_id', 'journal_id', 'move_id', 'company_id'], context=C)[0]
lineas = lambda i: [[l['code'], l['total']] for l in ejecutar('hr.payslip.line', 'search_read', [['slip_id', '=', i]], fields=['code', 'total'], order='sequence,id', context=C)]
def asiento(m):
    if not m: return None
    mv = ejecutar('account.move', 'read', [m[0]], fields=['name', 'state', 'journal_id', 'date'], context=C)[0]
    mv['lineas'] = [[l['account_id'][1], round(l['debit'], 2), round(l['credit'], 2)] for l in ejecutar('account.move.line', 'search_read', [['move_id', '=', m[0]]], fields=['account_id', 'debit', 'credit'], order='account_id,id', context=C)]
    return mv
b, n = leer(boleta), leer(nota)
res = {'accion': {k: accion.get(k) for k in ('name', 'domain')} if isinstance(accion, dict) else accion,
       'boleta': b, 'nota': n, 'lineas_boleta': lineas(boleta), 'lineas_nota': lineas(nota),
       'asiento_boleta': asiento(b['move_id']), 'asiento_nota': asiento(n['move_id'])}
res['mismas_lineas'] = res['lineas_boleta'] == res['lineas_nota']
if res['asiento_boleta'] and res['asiento_nota']:
    espejo = sorted([a, c, d] for a, d, c in res['asiento_boleta']['lineas'])
    res['asiento_espejo'] = espejo == sorted(res['asiento_nota']['lineas'])
# Limpieza: cancelar la nota y la boleta (om borra sus asientos)
ejecutar('hr.payslip', 'action_payslip_cancel', [nota, boleta], context=C)
res['tras_cancelar'] = [leer(nota)['state'], leer(boleta)['state'], ejecutar('account.move', 'search_count', [['id', 'in', [x for x in [b['move_id'] and b['move_id'][0], n['move_id'] and n['move_id'][0]] if x]]], context=C)]
json.dump(res, open(os.path.join(os.path.dirname(__file__), 'out', 'rectificacion.json'), 'w'), ensure_ascii=False, indent=1)
print(json.dumps(res, ensure_ascii=False, indent=1)[:4000])
