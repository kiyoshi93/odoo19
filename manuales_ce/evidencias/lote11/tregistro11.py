# Lote 11: asistente T-Registro con modificaciones y derechohabientes.
# Uso: tregistro11.py <etiqueta> <operacion> <desde> <hasta> [concepto] [fecha_cambio] [dni_a_añadir|-] [sctr_movimiento]
import sys, os, json, base64, io, zipfile
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
a = sys.argv[1:] + [''] * 8
etiqueta, op, desde, hasta, concepto, fecha_cambio, dni, sctr = a[:8]
CIA = 4
C = {'allowed_company_ids': [CIA], 'lang': 'es_PE', 'active_test': False}
M = 'solse.payroll.tregistro.wizard'
v = {'company_id': CIA, 'operacion': op, 'fecha_desde': desde, 'fecha_hasta': hasta}
if concepto: v.update({'concepto': concepto, 'fecha_cambio': fecha_cambio})
if sctr: v['sctr_movimiento'] = sctr
w = ejecutar(M, 'create', v, context=C); w = w[0] if isinstance(w, list) else w
doc = lambda ids: [e['identification_id'] for e in ejecutar('hr.employee', 'read', ids, fields=['identification_id'], context=C)] if ids else []
d = ejecutar(M, 'read', [w], fields=['empleado_ids', 'derechohabiente_ids'], context=C)[0]
r = {'propuestos': doc(d['empleado_ids']), 'derechohabientes_propuestos': len(d['derechohabiente_ids'])}
if dni and dni != '-' and dni not in r['propuestos']:
    e = ejecutar('hr.employee', 'search', [['identification_id', '=', dni], ['company_id', '=', CIA]], context=C)
    ejecutar(M, 'write', [w], {'empleado_ids': [(4, e[0])]}, context=C); r['añadido'] = dni
try:
    ejecutar(M, 'action_generar', [w], context=C)
except SystemExit as e:
    r['error'] = e.mensaje
d = ejecutar(M, 'read', [w], fields=['archivo', 'archivo_nombre', 'resumen', 'observaciones'], context=C)[0]
r.update({'archivo_nombre': d['archivo_nombre'], 'resumen': d['resumen'], 'observaciones': d['observaciones']})
if d['archivo']:
    raw = base64.b64decode(d['archivo'])
    destino = os.path.join(os.path.dirname(__file__), 'out', 'zips', etiqueta + '_' + (d['archivo_nombre'] or 'archivo'))
    open(destino, 'wb').write(raw); r['guardado'] = os.path.basename(destino)
    if raw[:2] == b'PK':
        z = zipfile.ZipFile(io.BytesIO(raw)); arch = {n: z.read(n) for n in z.namelist()}
    else:
        arch = {d['archivo_nombre']: raw}
    r['archivos'] = {n: len(b.splitlines()) for n, b in arch.items()}
    r['contenido'] = {n: b.decode('cp1252').splitlines() for n, b in arch.items()}
    r['codificacion'] = {n: ('CRLF' if b'\r\n' in b else 'LF') for n, b in arch.items()}
json.dump(r, open(os.path.join(os.path.dirname(__file__), 'out', etiqueta + '.json'), 'w'), ensure_ascii=False, indent=1)
print(json.dumps(r, ensure_ascii=False, indent=1))
