# Comprueba, sin gastar voz, que cada captura de los episodios pedidos existe y que sus focos se encuentran por OCR.
# Uso (desde el repo): python3 manuales_ce/v3/videos/scripts/revisar_focos.py E06,E07
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import serie  # noqa: E402
ids = sys.argv[1].split(',')
mal = 0
for ep in serie.EPISODIOS:
    if ep['id'] not in ids:
        continue
    serie.preparar(ep); serie.textos(ep['entrada']); serie.textos(ep['cierre'])
    for esc in ep['escenas']:
        serie.textos(esc['voz'])
        if esc['t'] == 'cap':
            if not os.path.exists(os.path.join(serie.CAPTURAS, esc['img'] + '.png')):
                print('  FALTA LA CAPTURA', ep['id'], esc['img']); mal += 1; continue
            for f in esc.get('focos', []):
                try:
                    serie.buscar(esc['img'], f)
                except SystemExit as e:
                    print('  FOCO NO ENCONTRADO', ep['id'], esc['img'], f, '→', str(e)[:700]); mal += 1
    print(ep['id'], 'ok' if not mal else 'con problemas', flush=True)
sys.exit(1 if mal else 0)
