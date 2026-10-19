import sys, os, json, base64, io, zipfile, re, html
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
import rpc
from rpc import ejecutar
C = {'allowed_company_ids': [4], 'lang': 'es_PE'}
OUT = os.path.join(os.path.dirname(__file__), 'out')
r = {}
for dni in ('70000901', '70000902', '70000903'):
    mes = '2026-11-01' if dni == '70000903' else '2026-10-01'
    b = ejecutar('hr.payslip', 'search_read', [['employee_id.identification_id', '=', dni], ['date_from', '=', mes], ['struct_id.code', '=', 'NME']], fields=['name', 'version_id'], context=C)[0]
    wd = ejecutar('hr.payslip.worked_days', 'search_read', [['payslip_id', '=', b['id']]], fields=['code', 'number_of_days', 'number_of_hours', 'is_paid', 'version_id'], context=C)
    rb = [l['total'] for l in ejecutar('hr.payslip.line', 'search_read', [['slip_id', '=', b['id']], ['code', '=', 'RB_001']], fields=['total'], context=C)]
    pdf = rpc.abridor.open(rpc.URL + '/report/pdf/solse_pe_payroll_ce.reporte_boleta_pago/%d' % b['id'], timeout=300).read()
    nombre = os.path.join(OUT, 'boleta_%d_%s.pdf' % (b['id'], dni)); open(nombre, 'wb').write(pdf)
    r[dni] = {'boleta': b['id'], 'version': b['version_id'] and b['version_id'][1], 'RB': rb,
              'dias': [[d['code'], d['number_of_days'], d['number_of_hours'], d['is_paid'], d['version_id'] and d['version_id'][1]] for d in wd],
              'suma_work100': [sum(d['number_of_days'] for d in wd if d['code'] == 'WORK100'), sum(d['number_of_hours'] for d in wd if d['code'] == 'WORK100')]}
for mes in ('10', '11'):
    w = ejecutar('solse.payroll.plame.wizard', 'create', {'mes': mes, 'anio': 2026}, context=C); w = w[0] if isinstance(w, list) else w
    ejecutar('solse.payroll.plame.wizard', 'action_generar', [w], context=C)
    z = zipfile.ZipFile(io.BytesIO(base64.b64decode(ejecutar('solse.payroll.plame.wizard', 'read', [w], fields=['archivo'], context=C)[0]['archivo'])))
    r['plame_' + mes] = {n: [l for l in z.read(n).decode('latin1').splitlines() if re.search(r'7000090[1-4]', l)] for n in z.namelist() if n.endswith(('.jor', '.snl', '.rem'))}
# C-34: avisos de las liquidaciones del laboratorio y trunca de Carmen
liqs = ejecutar('hr.payslip', 'search_read', [['company_id', '=', 4], ['struct_id.code', '=', 'LIQ']], fields=['name', 'employee_id', 'state', 'pe_avisos'], context=C)
r['liquidaciones'] = len(liqs)
r['avisos_c34'] = [[x['employee_id'][1], x['name'][:80]] for x in liqs if 'ya está validada' in html.unescape(re.sub('<[^>]+>', ' ', x['pe_avisos'] or ''))]
carmen = [x for x in liqs if 'Carmen' in x['employee_id'][1]]
r['carmen'] = [[x['name'][:90], {l['code']: l['total'] for l in ejecutar('hr.payslip.line', 'search_read', [['slip_id', '=', x['id']], ['code', 'ilike', 'GRAT']], fields=['code', 'total'], context=C) if l['total']}] for x in carmen]
r['o31_despues'] = [ejecutar('hr.payslip', 'search_count', [['company_id', '=', 4], ['version_id', '=', False]], context=C), ejecutar('hr.payslip', 'search_count', [['company_id', '=', 4]], context=C)]
json.dump(r, open(os.path.join(OUT, 'detalle_lote9.json'), 'w'), ensure_ascii=False, indent=1)
print(json.dumps(r, ensure_ascii=False, indent=1))
