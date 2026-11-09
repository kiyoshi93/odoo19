# Borra los datos de los escenarios del manual v2 en SOLSE Demo Servicios (compañía 4): pagos, boletas
# (validadas: se cancelan antes), lotes «(manual v2)», ausencias y los trabajadores sintéticos 70009xxx.
# Nunca toca otra compañía: cada registro se comprueba antes de borrarlo.
import sys
sys.path.insert(0, '/tmp/claude-0/-home-user-odoo19/a58fb904-ba88-59df-b173-0f0ec3a57b51/scratchpad')
from rpc import ejecutar
C = {'allowed_company_ids': [4], 'active_test': False}
emps = ejecutar('hr.employee', 'search_read', [['identification_id', '=like', '70009%']], fields=['company_id'], context=C)
assert all(e['company_id'][0] == 4 for e in emps), emps
emps = [e['id'] for e in emps]
lotes = ejecutar('hr.payslip.run', 'search', [['name', 'ilike', '(manual v2)']], context=C)
boletas = ejecutar('hr.payslip', 'search_read', ['|', ['employee_id', 'in', emps], ['payslip_run_id', 'in', lotes]],
                   fields=['company_id', 'state', 'move_id', 'pe_pago_move_id'], context=C)
assert all(b['company_id'][0] == 4 for b in boletas), boletas
# 1) asientos de pago: a borrador (deshace la conciliación) y se borran
pagos = sorted({b['pe_pago_move_id'][0] for b in boletas if b.get('pe_pago_move_id')})
for m in pagos:
    assert ejecutar('account.move', 'read', [m], fields=['company_id'], context=C)[0]['company_id'][0] == 4
    ejecutar('account.move', 'button_draft', [m], context=C)
    ejecutar('account.move', 'unlink', [m], context=C)
# 2) boletas validadas: cancelar (om revierte el asiento) y borrar
for b in boletas:
    if b['state'] == 'done':
        ejecutar('hr.payslip', 'action_payslip_cancel', [b['id']], context=C)
movs = [b['move_id'][0] for b in boletas if b['move_id']]
for m in movs:
    estado = ejecutar('account.move', 'search_read', [['id', '=', m]], fields=['state'], context=C)
    if estado:
        if estado[0]['state'] == 'posted':
            ejecutar('account.move', 'button_draft', [m], context=C)
        ejecutar('account.move', 'unlink', [m], context=C)
if boletas:
    ejecutar('hr.payslip', 'write', [b['id'] for b in boletas], {'state': 'draft'}, context=C)
    ejecutar('hr.payslip', 'unlink', [b['id'] for b in boletas], context=C)
if lotes:
    ejecutar('hr.payslip.run', 'write', lotes, {'state': 'draft'}, context=C)
    ejecutar('hr.payslip.run', 'unlink', lotes, context=C)
# 3) ausencias y trabajadores
aus = ejecutar('hr.leave', 'search', [['employee_id', 'in', emps]], context=C)
for a in aus:
    for metodo in ('action_refuse', 'action_reset_confirm', 'action_draft'):
        try:
            ejecutar('hr.leave', metodo, [a], context=C)
        except SystemExit:
            pass
if aus:
    ejecutar('hr.leave', 'unlink', aus, context=C)
if emps:
    ejecutar('hr.employee', 'unlink', emps, context=C)
print('pagos', len(pagos), 'boletas', len(boletas), 'asientos', len(movs), 'lotes', len(lotes), 'ausencias', len(aus), 'trabajadores', len(emps))
print('quedan:', ejecutar('hr.employee', 'search_count', [['identification_id', '=like', '70009%']], context=C),
      ejecutar('hr.payslip.run', 'search_count', [['name', 'ilike', '(manual v2)']], context=C),
      ejecutar('hr.payslip', 'search_count', [['name', 'ilike', 'manual v2']], context=C))
