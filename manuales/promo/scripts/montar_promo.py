# Monta el video promocional vertical: voz sintética, subtítulos (ASS/SRT) y efecto Ken Burns.
import json, os, subprocess, sys
import imageio_ffmpeg
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
if os.environ.get('VOZ', '').startswith('es-'):
    from voz_azure import sintetizar  # VOZ=es-PE-CamilaNeural | es-PE-AlexNeural
elif os.environ.get('VOZ'):
    from voz_neural import sintetizar  # VOZ=ef_dora | em_alex | em_santa
else:
    from voz import sintetizar
SUFIJO = f"_{os.environ['VOZ']}" if os.environ.get('VOZ') else ''
SOLO_CON_VOZ = bool(os.environ.get('SOLO_CON_VOZ'))

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
BASE = os.path.dirname(os.path.abspath(__file__))
if not os.path.isdir(os.path.join(BASE, 'escenas')):  # en el repo los scripts están en promo/scripts
    BASE = os.path.dirname(BASE)
TRAMOS = os.path.join(BASE, 'tramos' + os.environ.get('VOZ', '')); os.makedirs(TRAMOS, exist_ok=True)
SALIDA = os.path.join(BASE, 'salida'); os.makedirs(SALIDA, exist_ok=True)
FPS, ENTRADA, COLA = 30, 0.35, 0.75  # silencio antes y después de cada locución


def correr(args):
    subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error'] + args, check=True)


def marca_ass(s):
    return f'{int(s // 3600)}:{int(s % 3600 // 60):02d}:{s % 60:05.2f}'


def marca_srt(s):
    ms = int(round(s * 1000))
    return f'{ms // 3600000:02d}:{ms % 3600000 // 60000:02d}:{ms % 60000 // 1000:02d},{ms % 1000:03d}'


def main():
    escenas = json.load(open(os.path.join(BASE, 'escenas.json')))
    lista, subtitulos, guion, t = [], [], [], 0.0
    for n, e in enumerate(escenas):
        wav = os.path.join(TRAMOS, f'{e["id"]}.wav')
        voz = sintetizar(e['voz'], wav)
        dur = round(ENTRADA + voz + COLA, 2)
        cuadros = int(dur * FPS)
        # Reparte el tiempo de la locución entre las líneas según su largo
        total_chars = sum(len(x) for x in e['subt'])
        cursor = t + ENTRADA
        for linea in e['subt']:
            tramo = voz * len(linea) / total_chars
            subtitulos.append((cursor, cursor + tramo, linea)); cursor += tramo
        guion.append({'n': n + 1, 'id': e['id'], 'inicio': round(t, 2), 'fin': round(t + dur, 2), 'voz': e['voz'], 'subt': e['subt']})
        # Acercamiento alternado (entra / sale) para dar ritmo
        zoom = f"1+0.06*on/{cuadros}" if n % 2 == 0 else f"1.06-0.06*on/{cuadros}"
        filtro_v = (f"scale=2160:3840,zoompan=z='{zoom}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d={cuadros}:s=1080x1920:fps={FPS},"
                    f"fade=t=in:st=0:d=0.25,fade=t=out:st={dur - 0.25}:d=0.25,format=yuv420p")
        salida = os.path.join(TRAMOS, f'{e["id"]}.mp4')
        correr(['-loop', '1', '-framerate', str(FPS), '-i', os.path.join(BASE, 'escenas', f'{e["id"]}.png'), '-i', wav,
                '-filter_complex', f"[0:v]{filtro_v}[v];[1:a]adelay={int(ENTRADA * 1000)},apad,atrim=0:{dur},aresample=44100[a]",
                '-map', '[v]', '-map', '[a]', '-t', str(dur), '-c:v', 'libx264', '-preset', 'medium', '-crf', '19',
                '-c:a', 'aac', '-b:a', '160k', '-ac', '2', salida])
        lista.append(salida); t += dur
        print(f'{e["id"]} voz {voz:4.1f}s escena {dur:4.1f}s')

    with open(os.path.join(TRAMOS, 'lista.txt'), 'w') as f:
        f.writelines(f"file '{x}'\n" for x in lista)
    base_mp4 = os.path.join(TRAMOS, 'base.mp4')
    correr(['-f', 'concat', '-safe', '0', '-i', os.path.join(TRAMOS, 'lista.txt'), '-c', 'copy', base_mp4])

    # Subtítulos: SRT editable y ASS con estilo de caja para quemar en el video
    with open(os.path.join(SALIDA, f'Promo_Nomina_Enterprise_subtitulos{SUFIJO}.srt'), 'w', encoding='utf-8') as f:
        for i, (a, b, texto) in enumerate(subtitulos, 1):
            f.write(f'{i}\n{marca_srt(a)} --> {marca_srt(b)}\n{texto}\n\n')
    ass = os.path.join(TRAMOS, 'subtitulos.ass')
    with open(ass, 'w', encoding='utf-8') as f:
        f.write('[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\nWrapStyle: 0\n\n'
                '[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, '
                'ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n'
                'Style: Promo,DM Sans,58,&H00FFFFFF,&H00FFFFFF,&H00000000,&H00000000,-1,0,0,0,100,100,0,0,1,4,2,2,90,90,330,1\n\n'
                '[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n')
        for a, b, texto in subtitulos:
            f.write(f'Dialogue: 0,{marca_ass(a)},{marca_ass(b)},Promo,,0,0,0,,{texto}\n')

    fuentes = os.path.join(BASE, 'fuentes')
    filtro_sub = f"subtitles={ass}:fontsdir={fuentes}"
    con_voz = os.path.join(SALIDA, f'Promo_Nomina_Enterprise_con_voz{SUFIJO}.mp4')
    sin_voz = os.path.join(SALIDA, 'Promo_Nomina_Enterprise_sin_voz_con_subtitulos.mp4')
    limpio = os.path.join(SALIDA, 'Promo_Nomina_Enterprise_sin_voz_sin_subtitulos.mp4')
    comunes = ['-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-movflags', '+faststart']
    correr(['-i', base_mp4, '-vf', filtro_sub, '-c:a', 'copy'] + comunes + [con_voz])
    if SOLO_CON_VOZ:
        print('total', round(t, 1), 's'); return
    # Las versiones sin voz llevan pista silenciosa: algunas redes rechazan videos sin audio
    silencio = ['-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo']
    correr(['-i', base_mp4] + silencio + ['-map', '0:v', '-map', '1:a', '-shortest', '-vf', filtro_sub, '-c:a', 'aac'] + comunes + [sin_voz])
    correr(['-i', base_mp4] + silencio + ['-map', '0:v', '-map', '1:a', '-shortest', '-c:v', 'copy', '-c:a', 'aac', '-movflags', '+faststart', limpio])
    json.dump(guion, open(os.path.join(BASE, 'guion_promo.json'), 'w'), ensure_ascii=False, indent=1)
    print('total', round(t, 1), 's')


if __name__ == '__main__':
    main()
