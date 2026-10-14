# Lote 4: utilidades para boletas de prueba (solo trabajadores de prueba).
import sys, os, re, json, html
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
C = {'lang': 'es_PE', 'allowed_company_ids': [1]}
REG = os.path.join(os.path.dirname(__file__), 'out', 'registros_prueba.json')


def anotar(clave, valor):
    d = json.load(open(REG)); d.setdefault(clave, []).append(valor); json.dump(d, open(REG, 'w'), ensure_ascii=False, indent=1)


def crear_boleta(emp, desde, hasta, estructura=None, lote=None):
    r = ejecutar('hr.payslip', 'onchange_employee_id', [], desde, hasta, emp, False, context=C)
    v = r.get('value', {})
    datos = {'employee_id': emp, 'date_from': desde, 'date_to': hasta}
    for k in ('name', 'version_id', 'contract_id', 'struct_id', 'journal_id'):
        if v.get(k): datos[k] = v[k][0] if isinstance(v[k], list) else v[k]
    if estructura: datos['struct_id'] = estructura
    if lote: datos['payslip_run_id'] = lote
    datos['worked_days_line_ids'] = [(0, 0, l) for l in v.get('worked_days_line_ids', []) if isinstance(l, dict)]
    b = ejecutar('hr.payslip', 'create', datos, context=C); b = b[0] if isinstance(b, list) else b
    anotar('boletas', b)
    return b, r.get('warning')


def avisos(b):
    h = ejecutar('hr.payslip', 'read', [b], fields=['pe_avisos'], context=C)[0]['pe_avisos'] or ''
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', h))).strip()


def lineas(b):
    return [[l['code'], l['total']] for l in ejecutar('hr.payslip.line', 'search_read', [['slip_id', '=', b]], fields=['code', 'total'], order='sequence,id', context=C)]


def asientos(b):
    n = ejecutar('hr.payslip', 'read', [b], fields=['number', 'move_id'], context=C)[0]
    return ejecutar('account.move', 'search_read', ['|', ['ref', 'ilike', n['number']], ['id', '=', n['move_id'] and n['move_id'][0]]], fields=['name', 'ref', 'state'], context=dict(C, active_test=False)) if n['number'] else []


def mensajes(b):
    return [re.sub(r'<[^>]+>', ' ', m['body'] or '').strip() for m in ejecutar('mail.message', 'search_read', [['model', '=', 'hr.payslip'], ['res_id', '=', b]], fields=['body'], order='id', context=C)]
