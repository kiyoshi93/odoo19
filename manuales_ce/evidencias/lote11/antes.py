import sys, os, json
sys.path.insert(0, 'lote3'); sys.path.insert(0, '.')
from recalcular_en_orden import foto
from rpc import ejecutar
base = json.load(open('lote10/out/fm_lote10_sin_recalcular.json'))
ahora = foto()
k = lambda x: (x['emp'], x['periodo'], x['estructura'])
B = {k(x): x for x in base}; A = {k(x): x for x in ahora}
dif = [list(c) for c in B if c in A and B[c] != A[c]]
falt = [list(c) for c in B if c not in A]; nuevas = [list(c) for c in A if c not in B]
r5 = {}
for x in ahora:
    for c, v in x['lineas']:
        if c.startswith('R5TA'): r5.setdefault(x['emp'], {}).setdefault(x['periodo'][:4], 0); r5[x['emp']][x['periodo'][:4]] += v
luc = {e: {a: round(v, 2) for a, v in d.items()} for e, d in r5.items() if round(d.get('2025', 0), 2) == 2309.73}
sv = ejecutar('hr.payslip', 'search_count', [['company_id', '=', 4], ['version_id', '=', False]])
tot = ejecutar('hr.payslip', 'search_count', [['company_id', '=', 4]])
salida = 'FM %s distintas %s faltan %s nuevas %s Lucía %s\nO-31 antes: sin versión %s de %s\n' % (len(ahora), dif, falt, nuevas, luc, sv, tot)
open('lote11/out/antes.txt', 'w').write(salida); print(salida)
json.dump(ahora, open('lote11/out/fm_lote11_sin_recalcular.json', 'w'))
