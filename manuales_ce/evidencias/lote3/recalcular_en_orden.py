# Lote 3: recalcula EN SITIO las boletas de FM SYSTEMS (cancelar → borrador → calcular → validar),
# mes por mes y, dentro del mes, GRAT/VAC/CTS antes de la mensual. Guarda foto antes y después
# con el formato de anio_completo_fm.json.
import sys, json, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
CTX = {'allowed_company_ids': [1], 'lang': 'es_PE'}
SALIDA = os.path.join(os.path.dirname(__file__), 'out')
ORDEN_ESTRUCTURA = {'GRAT': 0, 'VAC': 1, 'CTS': 2}


def foto():
    boletas = ejecutar('hr.payslip', 'search_read', [['company_id', '=', 1], ['credit_note', '=', False]],
                       fields=['employee_id', 'date_from', 'struct_id', 'state', 'move_id'], order='date_from,id', context=CTX)
    codigos = {e['id']: e['code'] for e in ejecutar('hr.payroll.structure', 'search_read', [], fields=['code'], context=CTX)}
    ids = [b['id'] for b in boletas]
    lineas, dias = {}, {}
    for l in ejecutar('hr.payslip.line', 'search_read', [['slip_id', 'in', ids]], fields=['slip_id', 'code', 'total', 'sequence'], order='slip_id,sequence,id', context=CTX):
        lineas.setdefault(l['slip_id'][0], []).append([l['code'], l['total']])
    for d in ejecutar('hr.payslip.worked_days', 'search_read', [['payslip_id', 'in', ids]], fields=['payslip_id', 'code', 'number_of_days', 'number_of_hours', 'is_paid'], order='payslip_id,sequence,id', context=CTX):
        dias.setdefault(d['payslip_id'][0], []).append([d['code'], d['number_of_days'], d['number_of_hours'], d['is_paid']])
    return [{'emp': b['employee_id'][0], 'periodo': b['date_from'][:7], 'estructura': codigos.get(b['struct_id'][0]) if b['struct_id'] else None,
             'id': b['id'], 'estado': b['state'], 'asiento': b['move_id'][0] if b['move_id'] else None,
             'dias': dias.get(b['id'], []), 'lineas': lineas.get(b['id'], [])} for b in boletas]


if __name__ == '__main__':
    antes = foto()
    json.dump(antes, open(os.path.join(SALIDA, 'fm_antes_recalculo_lote3.json'), 'w'), ensure_ascii=False, indent=0)
    orden = sorted(antes, key=lambda b: (b['periodo'], ORDEN_ESTRUCTURA.get(b['estructura'], 9), b['emp'], b['id']))
    bitacora = []
    for b in orden:
        paso = 'cancelar'
        try:
            ejecutar('hr.payslip', 'action_payslip_cancel', [b['id']], context=CTX); paso = 'borrador'
            ejecutar('hr.payslip', 'action_payslip_draft', [b['id']], context=CTX); paso = 'calcular'
            ejecutar('hr.payslip', 'compute_sheet', [b['id']], context=CTX); paso = 'validar'
            ejecutar('hr.payslip', 'action_payslip_done', [b['id']], context=CTX)
            bitacora.append([b['periodo'], b['estructura'], b['emp'], b['id'], 'ok'])
            print(b['periodo'], b['estructura'], b['emp'], b['id'], 'ok', flush=True)
        except SystemExit as e:
            bitacora.append([b['periodo'], b['estructura'], b['emp'], b['id'], 'ERROR en ' + paso + ': ' + getattr(e, 'mensaje', str(e))[:400]])
            print('ERROR', b, paso, getattr(e, 'mensaje', str(e))[:400], flush=True)
            break
    json.dump(bitacora, open(os.path.join(SALIDA, 'bitacora_recalculo_lote3.json'), 'w'), ensure_ascii=False, indent=0)
    despues = foto()
    json.dump(despues, open(os.path.join(SALIDA, 'anio_completo_fm_lote3.json'), 'w'), ensure_ascii=False, indent=0)
    print('recalculadas', sum(1 for x in bitacora if x[-1] == 'ok'), 'de', len(orden))
