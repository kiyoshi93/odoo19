import sys, os, json
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
C = {'allowed_company_ids': [4], 'lang': 'es_PE'}
dom = [('employee_id', '=', False), ('company_id', '=', 4)]
todas = ejecutar('hr.version', 'search_read', dom, fields=['name', 'display_name', 'create_date', 'active'], context=C)
sin = [t for t in todas if not t.get('name')]
r = {'momento': sys.argv[1], 'plantillas': len(todas), 'sin_nombre': len(sin), 'ids_sin_nombre': [t['id'] for t in sin],
     'archivadas_sin_nombre': ejecutar('hr.version', 'search_count', dom + [('name', '=', False), ('active', '=', False)], context=dict(C, active_test=False))}
print(json.dumps(r, ensure_ascii=False)); json.dump(r, open(os.path.join(os.path.dirname(__file__), 'out', 'plantillas_' + sys.argv[1] + '.json'), 'w'), ensure_ascii=False, indent=1)
