# Compara el recálculo del lote 3 con lo esperado (Lucía R5TA/NET, Héctor R5TA 0) y con la línea base.
import json, collections
from decimal import Decimal, ROUND_HALF_UP
BASE = '/home/user/odoo19/manuales_ce/evidencias/anio_completo_fm.json'
base = {(b['emp'], b['periodo'], b['estructura']): b for b in json.load(open(BASE))}
antes = {(b['emp'], b['periodo'], b['estructura']): b for b in json.load(open('out/fm_antes_recalculo_lote3.json'))}
despues = {(b['emp'], b['periodo'], b['estructura']): b for b in json.load(open('out/anio_completo_fm_lote3.json'))}
ESPERADO = {  # mes: (R5TA, NET)
 '2025-01': (192.48, 3824.52), '2025-02': (192.48, 3824.52), '2025-03': (192.48, 3824.52), '2025-04': (192.48, 3824.52),
 '2025-05': (192.48, 3824.52), '2025-06': (192.48, 3824.52), '2025-07': (192.48, 3824.52), '2025-08': (192.47, 3824.53),
 '2025-09': (192.47, 3824.53), '2025-10': (192.47, 3824.53), '2025-11': (192.47, 3824.53), '2025-12': (192.49, 3824.51),
 '2026-01': (179.42, 3837.58), '2026-02': (183.73, 1873.97), '2026-03': (179.79, 3837.21), '2026-04': (179.40, 3837.60),
 '2026-05': (179.40, 3837.60), '2026-06': (179.40, 3837.60), '2026-07': (179.40, 3837.60), '2026-08': (179.39, 3837.61),
 '2026-09': (179.39, 3837.61), '2026-10': (180.21, 3845.49), '2026-11': (180.21, 3845.49), '2026-12': (181.04, 3844.66)}
r2 = lambda x: float(Decimal(str(x)).quantize(Decimal('0.01'), ROUND_HALF_UP))
lin = lambda b: {c: v for c, v in b['lineas']}
res = {'lucia': [], 'hector_r5ta_no_cero': [], 'otras_diferencias': [], 'solo_redondeo': 0, 'faltantes': []}
suma = collections.Counter()
for mes, (r5, net) in ESPERADO.items():
    d = despues.get((27, mes, 'NME'))
    if not d: res['faltantes'].append(mes); continue
    l = lin(d); m5, mn = l.get('R5TA_001', 0.0), l.get('NET')
    suma[mes[:4]] += m5
    res['lucia'].append({'mes': mes, 'id': d['id'], 'r5ta_esperado': r5, 'r5ta_medido': m5, 'net_esperado': net, 'net_medido': mn,
                         'ok': abs(m5 - r5) < 0.005 and abs(mn - net) < 0.005})
res['lucia_sumas'] = {k: round(v, 2) for k, v in suma.items()}
for k, d in despues.items():
    l = lin(d)
    if k[0] == 28 and abs(l.get('R5TA_001', 0.0)) > 0.0001: res['hector_r5ta_no_cero'].append([d['id'], k, l['R5TA_001']])
    b = base.get(k)
    if not b: res['faltantes'].append(list(k)); continue
    lb = lin(b)
    for c in sorted(set(l) | set(lb)):
        if c in ('R5TA_001', 'NET') and k[0] == 27 and k[2] == 'NME': continue
        vb, vd = lb.get(c, 0.0), l.get(c, 0.0)
        if abs(vd - vb) < 1e-9: continue
        if abs(vd - r2(vb)) < 1e-9: res['solo_redondeo'] += 1; continue
        res['otras_diferencias'].append({'boleta': d['id'], 'emp': k[0], 'periodo': k[1], 'estructura': k[2], 'linea': c, 'linea_base': vb, 'medido': vd, 'esperado(redondeo)': r2(vb)})
    if d['dias'] != b['dias']: res['otras_diferencias'].append({'boleta': d['id'], 'clave': list(k), 'dias_base': b['dias'], 'dias_medido': d['dias']})
    if d['estado'] != 'done' or not d['asiento']: res['otras_diferencias'].append({'boleta': d['id'], 'clave': list(k), 'estado': d['estado'], 'asiento': d['asiento']})
json.dump(res, open('out/comparacion_lote3.json', 'w'), ensure_ascii=False, indent=1)
print('Lucía OK', sum(x['ok'] for x in res['lucia']), 'de', len(res['lucia']), 'sumas', res['lucia_sumas'])
for x in res['lucia']:
    if not x['ok']: print('  FALLA', x)
print('Héctor R5TA≠0:', res['hector_r5ta_no_cero'])
print('solo redondeo:', res['solo_redondeo'], '· otras diferencias:', len(res['otras_diferencias']))
for x in res['otras_diferencias'][:60]: print('  ', x)
print('faltantes', res['faltantes'])
