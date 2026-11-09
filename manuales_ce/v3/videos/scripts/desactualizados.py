# Lista los episodios cuyo video final es más viejo que alguna de sus capturas o que su guion (hay que volver a montarlos;
# la voz está en caché, así que no gasta caracteres si el texto no cambió).
import glob, os, re, sys, unicodedata
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from guiones import EPISODIOS  # noqa: E402
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def sin_tildes(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn').lower()
viejos = []
guiones = max(os.path.getmtime(f) for f in glob.glob(os.path.join(BASE, 'scripts', 'guiones*.py')))
for ep in EPISODIOS:
    nombre = f'{ep["id"]}_{re.sub(r"[^A-Za-z0-9]+", "_", sin_tildes(ep["titulo"]).title()).strip("_")}.mp4'
    final = os.path.join(BASE, 'final_con_musica', nombre)
    if not os.path.exists(final):
        viejos.append(ep['id']); continue
    t = os.path.getmtime(final)
    caps = [os.path.join(BASE, '..', 'capturas', e['img'] + '.png') for e in ep['escenas'] if e['t'] == 'cap']
    if any(os.path.getmtime(c) > t for c in caps if os.path.exists(c)):
        viejos.append(ep['id'])
print(','.join(viejos))
