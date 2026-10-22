# Borra los datos de los escenarios del manual v2 en SOLSE Demo Servicios (compañía 4): lotes y boletas
# «(manual v2)» y los trabajadores sintéticos 70009xxx. Solo borradores; nunca toca otra compañía.
import sys
sys.path.insert(0, '/tmp/claude-0/-home-user-odoo19/a58fb904-ba88-59df-b173-0f0ec3a57b51/scratchpad')
from rpc import ejecutar
C = {'allowed_company_ids': [4], 'active_test': False}
emps = ejecutar('hr.employee', 'search', [['identification_id', '=like', '70009%'], ['company_id', '=', 4]], context=C)
lotes = ejecutar('hr.payslip.run', 'search', [['name', 'ilike', '(manual v2)']], context=C)
boletas = ejecutar('hr.payslip', 'search_read', ['|', ['employee_id', 'in', emps], ['payslip_run_id', 'in', lotes]], fields=['company_id', 'state'], context=C)
assert all(b['company_id'][0] == 4 and b['state'] in ('draft', 'cancel') for b in boletas), boletas
if boletas: ejecutar('hr.payslip', 'unlink', [b['id'] for b in boletas], context=C)
if lotes: ejecutar('hr.payslip.run', 'unlink', lotes, context=C)
vers = ejecutar('hr.version', 'search', [['employee_id', 'in', emps]], context=C) if emps else []
if emps: ejecutar('hr.employee', 'unlink', emps, context=C)
print('boletas', len(boletas), 'lotes', len(lotes), 'trabajadores', len(emps), 'versiones', len(vers))
print('quedan:', ejecutar('hr.employee', 'search_count', [['identification_id', '=like', '70009%']], context=C),
      ejecutar('hr.payslip.run', 'search_count', [['name', 'ilike', '(manual v2)']], context=C))
