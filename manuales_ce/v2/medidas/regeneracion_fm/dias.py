# Días trabajados que hoy pondría el formulario: onchange de la estructura (C-07, segunda revisión).
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
CTX = {'allowed_company_ids': [1], 'lang': 'es_PE'}
CAMPOS_DIA = ['name', 'sequence', 'code', 'number_of_days', 'number_of_hours', 'version_id', 'is_paid']
ESPEC = {'name': {}, 'struct_id': {}, 'employee_id': {}, 'date_from': {}, 'date_to': {}, 'version_id': {}, 'journal_id': {},
         'worked_days_line_ids': {'fields': {c: {} for c in CAMPOS_DIA}}}


def dias_nuevos(id_boleta):
    b = ejecutar('hr.payslip', 'read', [id_boleta], ['struct_id', 'employee_id', 'date_from', 'date_to', 'version_id'], context=CTX)[0]
    valores = {'struct_id': b['struct_id'][0], 'employee_id': b['employee_id'][0], 'date_from': b['date_from'],
               'date_to': b['date_to'], 'version_id': b['version_id'][0]}
    r = ejecutar('hr.payslip', 'onchange', [id_boleta], valores, ['struct_id'], ESPEC, context=CTX)
    lineas = []
    for cmd in r['value'].get('worked_days_line_ids', []):
        if cmd[0] == 0:
            v = dict(cmd[2])
            if isinstance(v.get('version_id'), dict):
                v['version_id'] = v['version_id']['id']
            lineas.append({c: v.get(c) for c in CAMPOS_DIA})
    return lineas, r['value']


if __name__ == '__main__':
    import json
    for i in map(int, sys.argv[1:]):
        l, v = dias_nuevos(i)
        print(i, json.dumps(l, ensure_ascii=False))
        print('  otros', {k: v[k] for k in v if k != 'worked_days_line_ids'})
