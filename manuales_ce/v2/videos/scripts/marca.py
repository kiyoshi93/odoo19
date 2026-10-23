# Intro de SYSTION + marca de agua sobre los episodios ya montados (no vuelve a generar voz).
# Uso (desde el repo): python3 manuales_ce/v2/videos/scripts/marca.py <carpeta_episodios> <carpeta_final> [E06,E07...]
import os, re, subprocess, sys
import imageio_ffmpeg

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))           # v2/videos
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
INTRO = os.path.join(BASE, 'marca', 'intro_systion.mp4')
LOGO = os.path.join(BASE, 'marca', 'logo_systion.png')
TRANSICION = 1.0          # disolvencia del logo de la intro a la portada del episodio
LOGO_ALTO, LOGO_OPACIDAD, LOGO_MARGEN = 104, 0.6, 30


def duracion(archivo):
    texto = subprocess.run([FFMPEG, '-i', archivo], capture_output=True, text=True).stderr
    h, m, s = re.search(r'Duration: (\d+):(\d+):([\d.]+)', texto).groups()
    return int(h) * 3600 + int(m) * 60 + float(s)


def marca_srt(s):
    ms = int(round(s * 1000))
    return f'{ms // 3600000:02d}:{ms % 3600000 // 60000:02d}:{ms % 60000 // 1000:02d},{ms % 1000:03d}'


def desplazar_srt(origen, destino, segundos):
    def leer(m):
        h, mi, s, ms = map(int, m.groups())
        return marca_srt(h * 3600 + mi * 60 + s + ms / 1000 + segundos)
    texto = open(origen, encoding='utf-8').read()
    open(destino, 'w', encoding='utf-8').write(re.sub(r'(\d\d):(\d\d):(\d\d),(\d\d\d)', leer, texto))


def procesar(video, carpeta_final):
    nombre = os.path.splitext(os.path.basename(video))[0]
    d_intro = duracion(INTRO); corte = d_intro - TRANSICION
    srt = os.path.join(carpeta_final, nombre + '.srt')
    desplazar_srt(os.path.splitext(video)[0] + '.srt', srt, corte)
    filtros = ';'.join([
        # intro 854x480 a 24 fps → 1920x1080 a 30 fps, igual que los episodios
        f'[0:v]scale=1920:1080:flags=lanczos,fps=30,format=yuv420p,setsar=1,settb=AVTB[i]',
        f'[2:v]scale=-1:{LOGO_ALTO}:flags=lanczos,format=rgba,colorchannelmixer=aa={LOGO_OPACIDAD}[l]',
        # el logo aparece con la portada, después de la intro (que ya lo muestra)
        f'[1:v][l]overlay=W-w-{LOGO_MARGEN}:H-h-{LOGO_MARGEN}:enable=\'gte(t,0.6)\',format=yuv420p,setsar=1,settb=AVTB[e]',
        f'[i][e]xfade=transition=fade:duration={TRANSICION}:offset={corte:.3f},format=yuv420p[v]',
        '[0:a]aresample=44100,aformat=channel_layouts=stereo[ia]',
        '[1:a]aresample=44100,aformat=channel_layouts=stereo[ea]',
        f'[ia][ea]acrossfade=d={TRANSICION}:c1=tri:c2=tri[a]',
    ])
    temporal = os.path.join(carpeta_final, nombre + '_tmp.mp4')
    subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', '-i', INTRO, '-i', video, '-i', LOGO,
                    '-filter_complex', filtros, '-map', '[v]', '-map', '[a]', '-c:v', 'libx264', '-preset', 'medium',
                    '-crf', '20', '-r', '30', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-c:a', 'aac', '-b:a', '160k', temporal], check=True)
    final = os.path.join(carpeta_final, nombre + '.mp4')
    subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error', '-i', temporal, '-i', srt, '-map', '0', '-map', '1',
                    '-c', 'copy', '-c:s', 'mov_text', '-metadata:s:s:0', 'language=spa', '-movflags', '+faststart', final], check=True)
    os.remove(temporal)
    print(f'{nombre}: {duracion(final) / 60:.1f} min', flush=True)


if __name__ == '__main__':
    origen, destino = sys.argv[1], sys.argv[2]
    os.makedirs(destino, exist_ok=True)
    ids = sys.argv[3].split(',') if len(sys.argv) > 3 else None
    for f in sorted(os.listdir(origen)):
        if f.endswith('.mp4') and (ids is None or f.split('_')[0] in ids):
            procesar(os.path.join(origen, f), destino)
