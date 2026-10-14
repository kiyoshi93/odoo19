import sys, os, json, re
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
C = {'allowed_company_ids': [1, 4], 'active_test': False}
fuente = open(os.path.join(os.path.dirname(__file__), 'modulos', 'solse_pe_payroll_ce_demo', 'models', 'seeder.py')).read()
bloque = fuente[fuente.index('MATRIZ_EMPLEADOS'):][:6000]
dnis = sorted(set(re.findall(r"\(\s*'(\d{8})'", bloque)))
r = {'dnis_matriz': dnis,
     'boletas_fm': ejecutar('hr.payslip', 'search_count', [['company_id', '=', 1]], context=C),
     'boletas_fm_matriz': ejecutar('hr.payslip', 'search_count', [['company_id', '=', 1], ['employee_id.identification_id', 'in', dnis]], context=C),
     'empleados_fm_matriz': ejecutar('hr.employee', 'search_read', [['company_id', '=', 1], ['identification_id', 'in', dnis]], fields=['name', 'identification_id', 'active'], context=C),
     'boletas_demo': ejecutar('hr.payslip', 'search_count', [['company_id', '=', 4]], context=C)}
print(json.dumps(r, ensure_ascii=False)); json.dump(r, open(os.path.join(os.path.dirname(__file__), 'out', 'q01_' + sys.argv[1] + '.json'), 'w'), ensure_ascii=False, indent=1)
