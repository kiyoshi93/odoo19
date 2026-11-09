# Escribe v3/videos/episodios.json (lo lee el manual para el Anexo F y el recuadro de video de cada capítulo) desde los
# guiones y los videos finales: título, capítulos, caso, archivo y duración real.
# Uso (desde el repo): python3 manuales_ce/v3/videos/scripts/episodios_json.py
import json, os, re, subprocess, sys, unicodedata
import imageio_ffmpeg

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from guiones import EPISODIOS  # noqa: E402


def sin_tildes(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn').lower()


def duracion(archivo):
    texto = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-i', archivo], capture_output=True, text=True).stderr
    h, m, s = re.search(r'Duration: (\d+):(\d+):([\d.]+)', texto).groups()
    t = int(h) * 3600 + int(m) * 60 + float(s)
    return f'{int(t // 60)}:{int(round(t % 60)):02d}'


salida = []
for ep in EPISODIOS:
    nombre = f'{ep["id"]}_{re.sub(r"[^A-Za-z0-9]+", "_", sin_tildes(ep["titulo"]).title()).strip("_")}.mp4'
    final = os.path.join(BASE, 'final', nombre)
    salida.append({'id': ep['id'], 'titulo': ep['titulo'], 'capitulos': ep['capitulos'], 'caso': ep.get('caso'),
                   'archivo': nombre, 'duracion': duracion(final) if os.path.exists(final) else '—'})
json.dump(salida, open(os.path.join(BASE, 'episodios.json'), 'w'), ensure_ascii=False, indent=1)
print(len(salida), 'episodios;', sum(1 for e in salida if e['duracion'] == '—'), 'sin video final todavía')
