# Equivalente por RPC (solo lectura) de medir_impacto_c35.py para FM SYSTEMS.
# Diferencia: el feriado se toma de resource.calendar.leaves (sin recurso de la compañía/calendario,
# o con el recurso del trabajador), no de _conciliar_periodo (privado, no se llama por RPC).
import sys, collections, datetime
sys.path.insert(0, '.')
from rpc import ejecutar
C = {'allowed_company_ids': [1], 'active_test': False}
o = []
cia = ejecutar('res.company', 'read', [1], fields=['name', 'asistencia_autocargar', 'asistencia_evaluar_horas', 'asistencia_descontar_tardanzas', 'asistencia_tolerancia_minutos', 'resource_calendar_id'], context=C)[0]
o.append('== FM SYSTEMS (id 1)')
o.append('  versión de solse_pe_payroll_asistencia: %s' % ejecutar('ir.module.module', 'search_read', [['name', '=', 'solse_pe_payroll_asistencia']], fields=['latest_version'])[0]['latest_version'])
o.append('  ajustes: cargar al calcular %s · evaluar por horas %s · descontar tardanzas %s · tolerancia %s min' % (cia['asistencia_autocargar'], cia['asistencia_evaluar_horas'], cia['asistencia_descontar_tardanzas'], cia['asistencia_tolerancia_minutos']))
emps = ejecutar('hr.employee', 'search_read', [['company_id', '=', 1]], fields=['resource_id'], context=C)
eids = [e['id'] for e in emps]; rids = [e['resource_id'][0] for e in emps if e['resource_id']]
o.append('  checadas (hr.attendance) de 2025-2026: %s' % ejecutar('hr.attendance', 'search_count', [['employee_id', 'in', eids], ['check_in', '>=', '2025-01-01'], ['check_in', '<', '2027-01-01']], context=C))
hojas = ejecutar('resource.calendar.leaves', 'search_read', [['holiday_id', '=', False], ['time_type', '=', 'leave'], ['date_from', '>=', '2024-12-31'], ['date_from', '<', '2027-01-01'], '|', ['resource_id', 'in', rids], '&', ['resource_id', '=', False], ['company_id', '=', 1]], fields=['resource_id', 'date_from', 'date_to', 'calendar_id'], context=C)
sin = [h for h in hojas if not h['resource_id']]
o.append('  días no laborables sin solicitud 2025-2026: %s sin recurso (feriados) · %s de trabajadores' % (len(sin), len(hojas) - len(sin)))
def fecha_lima(s): return (datetime.datetime.fromisoformat(s) - datetime.timedelta(hours=5)).date()
o.append('  fechas de los feriados: %s' % ', '.join(sorted({str(fecha_lima(h['date_from'])) for h in sin})))
bol = ejecutar('hr.payslip', 'search_read', [['company_id', '=', 1], ['asistencia_resumen', '!=', False]], fields=['state', 'asistencia_resumen', 'employee_id'], context=C)
o.append('  boletas con conciliación de asistencias: %s %s' % (len(bol), dict(collections.Counter(b['state'] for b in bol))))
def dias(h):
    d, f = fecha_lima(h['date_from']), fecha_lima(h['date_to'])
    while d <= f: yield str(d); d += datetime.timedelta(days=1)
fer_cia = {d for h in sin for d in dias(h)}
fer_emp = collections.defaultdict(set)
rid_emp = {e['resource_id'][0]: e['id'] for e in emps if e['resource_id']}
for h in hojas:
    if h['resource_id']: fer_emp[rid_emp[h['resource_id'][0]]] |= set(dias(h))
cambian, ndias = collections.Counter(), collections.Counter()
for b in bol:
    r = b['asistencia_resumen']; fer = fer_cia | fer_emp[b['employee_id'][0]]
    antes = [f for f in fer if '%s  ✘ FALTA' % f in r or '%s  ✔ · tarde' % f in r or '%s  ◐ parcial' % f in r]
    if antes: cambian[b['state']] += 1; ndias[b['state']] += len(antes)
o.append('  boletas con un feriado que su resumen trae como falta, tardanza o parcial: %s · días: %s' % (dict(cambian), dict(ndias)))
o.append('== fin (solo lectura)')
print('\n'.join(o)); open('lote12/out/impacto_c35_fm_rpc.txt', 'w').write('\n'.join(o) + '\n')
