# Lote 5: corre casos del laboratorio (Limpiar → Sembrar → Generar → Comparar), cuenta celdas por estructura,
# descarga el Excel de la comparación y cuenta contactos de trabajadores por nombre (duplicados).
import sys, os, json, base64, collections
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from rpc import ejecutar
C = {'allowed_company_ids': [4, 1]}
vuelta, codigos = sys.argv[1], sys.argv[2].split(',')
SALIDA = os.path.join(os.path.dirname(__file__), 'out', 'vuelta' + vuelta); os.makedirs(SALIDA, exist_ok=True)
res = {}
for codigo in codigos:
    caso = ejecutar('solse.demo.caso', 'search_read', [['codigo', '=', codigo]], fields=['id'], context=C)[0]['id']
    pasos = {}
    for paso in ('limpiar', 'sembrar', 'generar', 'comparar'):
        try:
            ejecutar('solse.demo.caso', 'accion_' + paso, [caso], context=C); pasos[paso] = 'OK'
        except SystemExit as e:
            pasos[paso] = 'ERROR: ' + (getattr(e, 'mensaje', '') or str(e))[:600]; break
    d = ejecutar('solse.demo.caso', 'read', [caso], fields=['estado', 'conforme', 'porcentaje', 'ultima_comparacion_id'], context=C)[0]
    r = {'pasos': pasos, 'estado': d['estado'], 'conforme': d['conforme'], 'porcentaje': d['porcentaje']}
    if d['ultima_comparacion_id'] and all(v == 'OK' for v in pasos.values()):
        cid = d['ultima_comparacion_id'][0]
        ls = ejecutar('solse.demo.comparacion.linea', 'search_read', [['comparacion_id', '=', cid]], fields=['estructura', 'resultado'], context=C)
        r.update({'comparacion': d['ultima_comparacion_id'][1], 'celdas': len(ls),
                  'por_estructura': dict(collections.Counter(l['estructura'] for l in ls)),
                  'resultados': dict(collections.Counter(l['resultado'] for l in ls))})
        a = ejecutar('solse.demo.comparacion', 'read', [cid], fields=['archivo', 'nombre_archivo'], context=C)[0]
        if a.get('archivo'):
            nombre = os.path.join(SALIDA, a.get('nombre_archivo') or ('COMPARACION_%s.xlsx' % codigo))
            open(nombre, 'wb').write(base64.b64decode(a['archivo'])); r['excel'] = os.path.basename(nombre)
    res[codigo] = r
    print(codigo, json.dumps(r, ensure_ascii=False)[:500], flush=True)
# Contactos de trabajadores de la compañía del laboratorio, por nombre
emps = ejecutar('hr.employee', 'search_read', [['company_id', '=', 4]], fields=['name'], context=dict(C, active_test=False))
nombres = sorted({e['name'] for e in emps})
contactos = {n: ejecutar('res.partner', 'search_count', [['name', '=', n]], context=dict(C, active_test=False)) for n in nombres}
res['_contactos'] = contactos
json.dump(res, open(os.path.join(SALIDA, 'resultado.json'), 'w'), ensure_ascii=False, indent=1)
