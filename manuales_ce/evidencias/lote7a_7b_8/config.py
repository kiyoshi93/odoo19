import sys, os, json
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
C = {'allowed_company_ids': [1, 4], 'lang': 'es_PE'}
r = {}
lt = ejecutar('hr.leave.type', 'search_read', [], fields=['name', 'code', 'pe_tipo_suspension'] if 'code' in ejecutar('hr.leave.type', 'fields_get', attributes=['type']) else ['name', 'pe_tipo_suspension'], context=dict(C, active_test=False))
r['tipos_ausencia'] = lt
fs = ejecutar('hr.payroll.structure', 'fields_get', attributes=['string', 'relation', 'type'], context=C)
kn = [k for k, v in fs.items() if 'no pagad' in v['string'].lower() or 'ausencia' in v['string'].lower()]
r['campo_estructura'] = {k: fs[k]['string'] for k in kn}
r['estructuras'] = ejecutar('hr.payroll.structure', 'search_read', [['code', 'in', ['NME', 'NSO']]], fields=['name', 'code'] + kn, context=C)
for e in r['estructuras']:
    for k in kn:
        if isinstance(e[k], list) and e[k] and isinstance(e[k][0], int):
            e[k + '_nombres'] = [x['name'] for x in ejecutar(fs[k]['relation'], 'read', e[k], fields=['name'], context=C)]
r['parametro_c31'] = ejecutar('ir.config_parameter', 'search_read', [['key', '=', 'solse_pe_payroll_ce.c31_sin_goce_no_pagado']], fields=['value'], context=C)
fc = ejecutar('res.company', 'fields_get', attributes=['string', 'selection'], context=C)
kc = [k for k, v in fc.items() if k.startswith('pe_control') or 'subsidio' in k or 'cese' in k.lower()]
r['controles'] = ejecutar('res.company', 'read', [1, 4], fields=['name'] + kc, context=C)
r['controles_etiquetas'] = {k: fc[k]['string'] for k in kc}
fl = ejecutar('life.insurance', 'fields_get', attributes=['string', 'type'], context=C)
r['vida_ley_campos'] = {k: v['string'] for k, v in fl.items() if v['type'] in ('boolean', 'float', 'monetary', 'many2one', 'many2many', 'one2many', 'char', 'date', 'integer') and not k.startswith(('create_', 'write_', '__'))}
r['vida_ley'] = ejecutar('life.insurance', 'search_read', [], fields=[k for k in r['vida_ley_campos'] if k not in ('display_name',)], context=dict(C, active_test=False))
# asiento de la mensual de 70000561
b = ejecutar('hr.payslip', 'search_read', [['employee_id.identification_id', '=', '70000561'], ['date_from', '=', '2026-06-01'], ['struct_id.code', '=', 'NME']], fields=['name', 'move_id', 'number'] + [k for k, v in ejecutar('hr.payslip', 'fields_get', attributes=['string'], context=C).items() if 'pagar' in v['string'].lower()], context=C)
r['boleta_561'] = b
if b and b[0]['move_id']:
    r['asiento_561'] = ejecutar('account.move.line', 'search_read', [['move_id', '=', b[0]['move_id'][0]]], fields=['account_id', 'partner_id', 'debit', 'credit', 'name'], context=C)
json.dump(r, open(os.path.join(os.path.dirname(__file__), 'out', 'config.json'), 'w'), ensure_ascii=False, indent=1)
print(json.dumps(r, ensure_ascii=False, indent=1)[:9000])
