import sys, os, json
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
C = {'allowed_company_ids': [4]}
b = ejecutar('hr.payslip', 'search_read', [['company_id', '=', 4]], fields=['employee_id', 'date_from', 'date_to', 'struct_id', 'state'], order='employee_id,date_from,id', context=C)
r = [[x['employee_id'][1], x['date_from'], x['date_to'], x['struct_id'][1] if x['struct_id'] else None, x['state']] for x in b]
json.dump(r, open(os.path.join(os.path.dirname(__file__), 'out', 'demo_boletas_' + sys.argv[1] + '.json'), 'w'), ensure_ascii=False, indent=0)
print(sys.argv[1], len(r))
