import sys, os, json, collections
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
C = {'allowed_company_ids': [1], 'lang': 'es_PE'}
CA = dict(C, active_test=False)
r = {}
# 7a · «Sin pagar» aprobadas en 2026 y boletas en borrador de esos meses
lv = ejecutar('hr.leave', 'search_read', [['employee_id.company_id', '=', 1], ['state', '=', 'validate'], ['request_date_from', '<=', '2026-12-31'], ['request_date_to', '>=', '2026-01-01']],
              fields=['employee_id', 'holiday_status_id', 'request_date_from', 'request_date_to', 'number_of_days', 'number_of_hours'], context=CA)
r['ausencias_aprobadas_2026'] = lv
r['sin_pagar_2026'] = [l for l in lv if l['holiday_status_id'][0] == 4]
r['enfermedad_maternidad_2026'] = [l for l in lv if l['holiday_status_id'][0] in (2, 75)]
r['borradores_fm'] = ejecutar('hr.payslip', 'search_read', [['company_id', '=', 1], ['state', 'in', ['draft', 'verify']]], fields=['name', 'date_from', 'employee_id'], context=CA)
# 7a · más de una versión o contrato en 2026
v = ejecutar('hr.version', 'search_read', [['company_id', '=', 1], ['employee_id', '!=', False]], fields=['employee_id', 'date_version', 'contract_date_start', 'contract_date_end', 'active'], context=CA)
cnt = collections.Counter(x['employee_id'][0] for x in v)
r['versiones_fm'] = len(v); r['trabajadores_mas_de_una_version'] = {k: n for k, n in cnt.items() if n > 1}
# 7b · ceses en 2026 y liquidaciones en borrador
r['contratos_fin_2026'] = [x for x in v if x['contract_date_end'] and x['contract_date_end'].startswith('2026')]
r['liquidaciones_borrador_fm'] = ejecutar('hr.payslip', 'search_read', [['company_id', '=', 1], ['state', 'in', ['draft', 'verify']], ['struct_id.code', '=', 'LIQ']], fields=['name'], context=CA)
est = ejecutar('hr.payroll.structure', 'search_read', [], fields=['name', 'code'], context=CA)
r['estructuras'] = [(e['code'], e['name']) for e in est]
r['estructuras_liquidacion_propias'] = [e for e in est if ('liquid' in (e['name'] or '').lower() or 'LIQ' in (e['code'] or '')) and e['code'] != 'LIQ']
fr = ejecutar('hr.salary.rule', 'fields_get', attributes=['string', 'relation'], context=C)
kp = [k for k, x in fr.items() if 'plame' in k.lower() or 'PLAME' in x['string']]
r['campo_plame_regla'] = kp
if kp:
    k = kp[0]
    reglas = ejecutar('hr.salary.rule', 'search_read', [], fields=['code', 'name', 'struct_id', k], context=CA)
    rel = fr[k].get('relation')
    nombres = {}
    if rel:
        ids = sorted({i for x in reglas for i in (x[k] if isinstance(x[k], list) and x[k] and isinstance(x[k][0], int) and len(x[k]) != 2 or (isinstance(x[k], list) and x[k] and not isinstance(x[k][1], str)) else ([x[k][0]] if isinstance(x[k], list) and x[k] else []))})
        nombres = {y['id']: y['display_name'] for y in ejecutar(rel, 'read', ids, fields=['display_name'], context=CA)} if ids else {}
    def cod(x):
        val = x[k]
        if isinstance(val, list) and val:
            if len(val) == 2 and isinstance(val[1], str): return val[1]
            return ' '.join(nombres.get(i, str(i)) for i in val)
        return str(val or '')
    r['reglas_0501_0503'] = [(x['code'], x['name'], x['struct_id'] and x['struct_id'][1], cod(x)) for x in reglas if cod(x).startswith(('0501', '0503')) or ' 0501' in cod(x) or ' 0503' in cod(x) or cod(x) in ('0501', '0503')]
# 8 · Vida Ley de FM, empleador marcado, lotes validados/cerrados
r['vida_ley_fm'] = ejecutar('life.insurance', 'search_read', [['company_id', '=', 1]], fields=['name', 'rate', 'amount', 'cantidad_empleados', 'pe_calcular_en_planilla'], context=CA)
fe = ejecutar('hr.employee', 'fields_get', attributes=['string', 'type'], context=C)
ke = [k for k, x in fe.items() if x['type'] == 'boolean' and 'mpleador' in x['string']]
r['campo_empleador'] = {k: fe[k]['string'] for k in ke}
for k in ke:
    marcados = ejecutar('hr.employee', 'search_read', [[k, '=', True]], fields=['name', 'company_id'], context=dict(CA, allowed_company_ids=[1, 2, 3, 4]))
    r['empleador_' + k] = collections.Counter(m['company_id'][1] for m in marcados); r['empleador_' + k + '_lista'] = [(m['name'], m['company_id'][1]) for m in marcados]
r['lotes_fm'] = ejecutar('hr.payslip.run', 'search_read', [['state', 'in', ['done', 'close']]], fields=['name', 'state', 'date_start', 'date_end', 'company_id'] if 'company_id' in ejecutar('hr.payslip.run', 'fields_get', attributes=['type']) else ['name', 'state', 'date_start', 'date_end'], context=dict(C, allowed_company_ids=[1, 4]))
json.dump(r, open(os.path.join(os.path.dirname(__file__), 'out', 'impacto_fm.json'), 'w'), ensure_ascii=False, indent=1, default=str)
for k, val in r.items():
    if k in ('estructuras',): continue
    print(k, ':', json.dumps(val, ensure_ascii=False, default=str)[:700])
