# Escenarios del bloque 3 en SOLSE Demo Servicios (compañía 4). Trabajadores sintéticos 70009xxx:
# se borran con limpiar_escenarios.py. Nada en FM SYSTEMS.
import sys, json
sys.path.insert(0, '/tmp/claude-0/-home-user-odoo19/a58fb904-ba88-59df-b173-0f0ec3a57b51/scratchpad')
from rpc import ejecutar
C = {'lang': 'es_PE', 'allowed_company_ids': [4], 'tz': 'America/Lima'}
nme = ejecutar('hr.payroll.structure', 'search', [['code', '=', 'NME']], context=C)[0]
onp = ejecutar('pension.system', 'search', [['code', '=', '02']], context=C)[0]
sin_pagar = ejecutar('hr.leave.type', 'search', [['code', '=', 'SINGOCE100']], context=C)[0]
salida = {}

def trabajador(dni, nombre, sueldo=2500.0, inicio='2025-01-01', pension=True):
    previo = ejecutar('hr.employee', 'search', [['identification_id', '=', dni], ['company_id', '=', 4]], context=C)
    if previo:
        return previo[0]
    valores = {'name': nombre, 'identification_id': dni, 'company_id': 4, 'birthday': '1990-05-10'}
    if pension:
        valores['pension_system_id'] = onp
    e = ejecutar('hr.employee', 'create', valores, context=C)
    e = e[0] if isinstance(e, list) else e
    v = ejecutar('hr.employee', 'read', [e], fields=['version_id'], context=C)[0]['version_id'][0]
    ejecutar('hr.version', 'write', [v], {'wage': sueldo, 'contract_date_start': inicio, 'date_version': inicio, 'struct_id': nme}, context=C)
    return e

def ausencia(emp, desde, hasta, **extra):
    a = ejecutar('hr.leave', 'create', dict({'name': 'Sin goce (manual v2)', 'employee_id': emp, 'holiday_status_id': sin_pagar,
                                             'request_date_from': desde, 'request_date_to': hasta}, **extra), context=C)
    a = a[0] if isinstance(a, list) else a
    for metodo in ('action_approve', 'action_validate'):
        estado = ejecutar('hr.leave', 'read', [a], fields=['state'], context=C)[0]['state']
        if estado == 'validate':
            break
        try:
            ejecutar('hr.leave', metodo, [a], context=C)
        except SystemExit as e:
            print('aviso', metodo, getattr(e, 'mensaje', e)[:150])
    return ejecutar('hr.leave', 'read', [a], fields=['state', 'number_of_days', 'number_of_hours'], context=C)[0]

salida['semana'] = trabajador('70009101', 'Trabajador LICENCIA una semana (manual v2)')
salida['horas'] = trabajador('70009102', 'Trabajador PERMISO 2 horas (manual v2)')
salida['mes'] = trabajador('70009103', 'Trabajador SIN GOCE todo el mes (manual v2)')
salida['rectificativa'] = trabajador('70009104', 'Trabajador RECTIFICATIVA (manual v2)')
salida['sin_pension'] = trabajador('70009105', 'Trabajador SIN PENSIÓN (manual v2)', pension=False)
salida['pago_uno'] = trabajador('70009106', 'Trabajador PAGO uno (manual v2)', sueldo=3000.0)
salida['pago_dos'] = trabajador('70009107', 'Trabajador PAGO dos (manual v2)', sueldo=2500.0)
salida['vigencia'] = trabajador('70009108', 'Trabajador VIGENCIA 2024 (manual v2)', inicio='2024-01-01')
print('trabajadores', salida)
if not ejecutar('hr.leave', 'search', [['employee_id', 'in', [salida['semana'], salida['horas'], salida['mes']]]], context=C):
    print('semana', ausencia(salida['semana'], '2026-11-09', '2026-11-13'))
    print('horas', ausencia(salida['horas'], '2026-11-17', '2026-11-17', request_unit_hours=True, request_hour_from=8.0, request_hour_to=10.0))
    print('mes', ausencia(salida['mes'], '2026-11-01', '2026-11-30'))
json.dump(salida, open('/home/user/odoo19/manuales_ce/v2/medidas/escenarios_bloque3.json', 'w'), indent=1)
