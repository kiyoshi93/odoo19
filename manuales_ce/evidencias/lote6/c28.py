# C-28 (solo lectura): trabajadores de compañías reales con más de una versión de contrato activa y,
# para sus boletas validadas, si la versión de la boleta es la vigente en el periodo.
import sys, os, json, collections
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
comps = ejecutar('res.company', 'search_read', [], fields=['name', 'solse_es_demo'], context={'active_test': False})
reales = [c['id'] for c in comps if not c['solse_es_demo']]
C = {'allowed_company_ids': [c['id'] for c in comps]}
vers = ejecutar('hr.version', 'search_read', [['employee_id', '!=', False], ['company_id', 'in', reales]],
                fields=['employee_id', 'date_version', 'contract_date_start', 'contract_date_end', 'company_id', 'struct_id'], context=C)
por = collections.defaultdict(list)
for v in vers: por[v['employee_id'][0]].append(v)
res = {'companias_reales': [c['name'] for c in comps if not c['solse_es_demo']], 'versiones_activas': len(vers), 'trabajadores': []}
for emp, vs in por.items():
    if len(vs) < 2: continue
    vs.sort(key=lambda v: (v['date_version'] or '', v['id']))
    bol = ejecutar('hr.payslip', 'search_read', [['employee_id', '=', emp], ['state', '=', 'done']], fields=['name', 'date_from', 'version_id', 'struct_id'], order='date_from desc', limit=12, context=C)
    filas = []
    for b in bol:
        vigente = [v for v in vs if (v['date_version'] or '') <= b['date_from']]
        vig = vigente[-1]['id'] if vigente else None
        filas.append({'boleta': b['id'], 'desde': b['date_from'], 'estructura': b['struct_id'] and b['struct_id'][1], 'version_boleta': b['version_id'] and b['version_id'][0], 'version_vigente': vig, 'ok': (b['version_id'] and b['version_id'][0]) == vig})
    res['trabajadores'].append({'empleado': vs[0]['employee_id'][1], 'id': emp, 'compania': vs[0]['company_id'][1],
                                'versiones': [{'id': v['id'], 'fecha_version': v['date_version'], 'inicio_contrato': v['contract_date_start'], 'estructura': v['struct_id'] and v['struct_id'][1]} for v in vs],
                                'boletas_ultimas': filas})
json.dump(res, open(os.path.join(os.path.dirname(__file__), 'out', 'c28.json'), 'w'), ensure_ascii=False, indent=1)
print(json.dumps({'companias_reales': res['companias_reales'], 'versiones_activas': res['versiones_activas'], 'con_mas_de_una': len(res['trabajadores'])}, ensure_ascii=False))
for t in res['trabajadores']:
    print(t['empleado'], t['compania'], 'versiones', [(v['id'], v['fecha_version']) for v in t['versiones']], 'boletas', len(t['boletas_ultimas']), 'no vigentes', [f['boleta'] for f in t['boletas_ultimas'] if not f['ok']])
