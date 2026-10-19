# Lote 10: asistente T-Registro (transitorio). Uso: tregistro.py <compania> <alta|baja> <desde> <hasta> <guardar_zip 0/1> <etiqueta>
import sys, os, json, base64, io, zipfile
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
cia, op, desde, hasta, guardar, etiqueta = sys.argv[1:7]
C = {'allowed_company_ids': [int(cia)], 'lang': 'es_PE'}
w = ejecutar('solse.payroll.tregistro.wizard', 'create', {'company_id': int(cia), 'operacion': op, 'fecha_desde': desde, 'fecha_hasta': hasta}, context=C)
w = w[0] if isinstance(w, list) else w
r = {'propuestos': len(ejecutar('solse.payroll.tregistro.wizard', 'read', [w], fields=['empleado_ids'], context=C)[0]['empleado_ids'])}
try:
    ejecutar('solse.payroll.tregistro.wizard', 'action_generar', [w], context=C)
except SystemExit as e:
    r['error'] = e.mensaje
d = ejecutar('solse.payroll.tregistro.wizard', 'read', [w], fields=['archivo', 'archivo_nombre', 'resumen', 'observaciones'], context=C)[0]
r.update({'archivo_nombre': d['archivo_nombre'], 'resumen': d['resumen'], 'observaciones': d['observaciones']})
if d['archivo']:
    raw = base64.b64decode(d['archivo'])
    z = zipfile.ZipFile(io.BytesIO(raw))
    r['archivos'] = {n: len(z.read(n).splitlines()) for n in z.namelist()}
    if guardar == '1':
        destino = os.path.join(os.path.dirname(__file__), 'out', 'zips', etiqueta + '_' + (d['archivo_nombre'] or 'tregistro.zip'))
        open(destino, 'wb').write(raw); r['zip'] = os.path.basename(destino)
        r['contenido'] = {n: z.read(n).decode('latin1').splitlines() for n in z.namelist()}
        r['codificacion'] = {n: ('CRLF' if b'\r\n' in z.read(n) else 'LF') for n in z.namelist()}
if guardar == '1':
    json.dump(r, open(os.path.join(os.path.dirname(__file__), 'out', etiqueta + '.json'), 'w'), ensure_ascii=False, indent=1)
print(json.dumps({k: v for k, v in r.items() if k != 'contenido'}, ensure_ascii=False, indent=1))
