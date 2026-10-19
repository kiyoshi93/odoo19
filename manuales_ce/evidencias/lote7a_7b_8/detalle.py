import sys, os, json
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
C = {'allowed_company_ids': [4, 1], 'lang': 'es_PE'}
def emp(nombre=None, dni=None):
    dom = [['identification_id', '=', dni]] if dni else [['name', '=', nombre]]
    r = ejecutar('hr.employee', 'search_read', dom + [['company_id', '=', 4]], fields=['name', 'identification_id'], context=dict(C, active_test=False))
    return r
def boletas(e, desde=None, hasta=None):
    dom = [['employee_id', '=', e]]
    if desde: dom.append(['date_from', '>=', desde])
    if hasta: dom.append(['date_from', '<=', hasta])
    bs = ejecutar('hr.payslip', 'search_read', dom, fields=['name', 'date_from', 'date_to', 'struct_id', 'state', 'version_id', 'move_id', 'number'], order='date_from,id', context=C)
    for b in bs:
        b['lineas'] = {l['code']: [l['name'], l['total']] for l in ejecutar('hr.payslip.line', 'search_read', [['slip_id', '=', b['id']]], fields=['code', 'name', 'total'], context=C) if l['total']}
        if b['version_id']:
            b['version'] = ejecutar('hr.version', 'read', [b['version_id'][0]], fields=['wage', 'date_version'], context=C)[0]
    return bs
res = {}
for clave, (nombre, dni, d, h) in {
    'aumento_mitad': ('Trabajador AUMENTO a mitad de mes', None, '2026-10-01', '2026-10-31'),
    'aumento_dos_contratos': ('Trabajadora AUMENTO dos contratos', None, '2026-10-01', '2026-10-31'),
    'aumento_sin_goce_semana': ('Trabajador AUMENTO sin goce una semana', None, '2026-11-01', '2026-11-30'),
    'aumento_sin_goce_mes': (None, '70000904', '2026-11-01', '2026-11-30'),
    'cese_devolucion': (None, '70004501', '2026-04-01', '2026-04-30'),
    'cese_reingreso': (None, '70004504', '2026-04-01', '2026-04-30'),
    'cese_orden_invertido': (None, '70004505', '2026-03-01', '2026-03-31'),
    'indem_351': (None, '70000351', None, None), 'indem_352': (None, '70000352', None, None),
    'indem_355': (None, '70000355', None, None), 'indem_357': (None, '70000357', None, None), 'indem_354': (None, '70000354', None, None),
    'vida_561': (None, '70000561', '2026-06-01', '2026-06-30'), 'vida_562': (None, '70000562', '2026-06-01', '2026-06-30'),
    'vida_568': (None, '70000568', '2026-06-01', '2026-06-30'), 'vida_565': (None, '70000565', '2026-06-01', '2026-06-30'),
}.items():
    es = emp(nombre, dni)
    res[clave] = [{'empleado': e['name'], 'dni': e['identification_id'], 'id': e['id'], 'boletas': boletas(e['id'], d, h)} for e in es]
json.dump(res, open(os.path.join(os.path.dirname(__file__), 'out', 'detalle_casos.json'), 'w'), ensure_ascii=False, indent=1)
for k, v in res.items():
    for e in v:
        print('##', k, e['empleado'], e['dni'])
        for b in e['boletas']:
            l = b['lineas']; pick = {c: l[c][1] for c in l if c in ('RB_001', 'ONP_001', 'ESSALUD_001', 'NET', 'DEV5_001', 'R5TA_001', 'VIDA_001', 'IND_001', 'GROSS') or 'IND' in c or 'SUB' in c}
            print('  ', b['id'], b['date_from'], b['date_to'], b['struct_id'] and b['struct_id'][1], b['state'], 'v=', b.get('version', {}).get('wage'), pick)
print('O-31 después: sin versión', ejecutar('hr.payslip', 'search_count', [['company_id', '=', 4], ['version_id', '=', False]], context=C), 'de', ejecutar('hr.payslip', 'search_count', [['company_id', '=', 4]], context=C))
