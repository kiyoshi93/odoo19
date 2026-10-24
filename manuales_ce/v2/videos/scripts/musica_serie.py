# Versión con música de fondo de la serie final (intro + episodio): la música entra al terminar la intro,
# se agacha cuando habla la voz y queda al mismo volumen bajo que en los cortos. No toca la imagen ni la voz.
# Uso (desde el repo): python3 manuales_ce/v2/videos/scripts/musica_serie.py [E06,E07...]
import os, re, subprocess, sys
import imageio_ffmpeg

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))           # v2/videos
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
ORIGEN, DESTINO = os.path.join(BASE, 'final'), os.path.join(BASE, 'final_con_musica')
PISTAS = sorted(os.path.join(BASE, 'marca', 'musica_serie', f) for f in os.listdir(os.path.join(BASE, 'marca', 'musica_serie')))
VOLUMEN = os.environ.get('VOLUMEN_MUSICA', '0.12')     # el mismo de los cortos
ENTRA = 5.1                                             # fin de la intro (6,08 s menos la disolvencia)


def duracion(archivo):
    texto = subprocess.run([FFMPEG, '-i', archivo], capture_output=True, text=True).stderr
    h, m, s = re.search(r'Duration: (\d+):(\d+):([\d.]+)', texto).groups()
    return int(h) * 3600 + int(m) * 60 + float(s)


def procesar(video, pista):
    d = duracion(video); largo = d - ENTRA
    filtros = (f'[1:a]aloop=loop=-1:size=2e9,atrim=0:{largo:.2f},volume={VOLUMEN},afade=t=in:d=1.5,'
               f'afade=t=out:st={largo - 2.5:.2f}:d=2.5,adelay={int(ENTRA * 1000)}:all=1,apad,aresample=44100,aformat=channel_layouts=stereo[m];'
               f'[0:a]asplit[voz][guia];[m][guia]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=400[md];'
               f'[voz][md]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[a]')
    final = os.path.join(DESTINO, os.path.basename(video))
    subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', '-i', video, '-stream_loop', '-1', '-i', pista,
                    '-filter_complex', filtros, '-map', '0:v', '-map', '[a]', '-map', '0:s?', '-c:v', 'copy', '-c:s', 'copy',
                    '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', final], check=True)
    srt = os.path.splitext(video)[0] + '.srt'
    if os.path.exists(srt):
        open(os.path.splitext(final)[0] + '.srt', 'w', encoding='utf-8').write(open(srt, encoding='utf-8').read())
    print(os.path.basename(final), os.path.basename(pista), flush=True)


if __name__ == '__main__':
    os.makedirs(DESTINO, exist_ok=True)
    ids = sys.argv[1].split(',') if len(sys.argv) > 1 else None
    videos = sorted(f for f in os.listdir(ORIGEN) if f.endswith('.mp4') and (ids is None or f.split('_')[0] in ids))
    for f in videos:
        n = int(f[1:3])
        procesar(os.path.join(ORIGEN, f), PISTAS[n % len(PISTAS)])
