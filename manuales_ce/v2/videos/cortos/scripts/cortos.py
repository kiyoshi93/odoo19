# Cortos publicitarios 9:16 (1080x1920, ≤30 s) para TikTok, Reels y estados de WhatsApp.
# Gancho + 2 o 3 escenas con capturas del manual + cierre de marca con la aparición del logo de la intro.
# Voz: la aprobada para la serie (Gabriel, eleven_v4, semilla 1). Subtítulos grandes incrustados.
# Uso (desde el repo): python3 manuales_ce/v2/videos/cortos/scripts/cortos.py S01[,S02...] | todos | guiones
import os, re, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter

AQUI = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.dirname(AQUI)                                                   # v2/videos/cortos
VIDEOS = os.path.dirname(BASE)                                                 # v2/videos
for clave, valor in {'VOZ': 'el:8Y8NNxkGdyBx5yhgIj6q', 'MODELO': 'eleven_v4', 'ESTABILIDAD': '0.3', 'SIMILITUD': '0.9',
                     'ESTILO': '0', 'VELOCIDAD': '1.0', 'REFUERZO': '1', 'SEMILLA': '1'}.items():
    os.environ.setdefault(clave, valor)
sys.path.insert(0, os.path.join(VIDEOS, 'scripts')); sys.path.insert(0, AQUI)
import serie  # noqa: E402  (textos, voz, OCR y fuentes de la serie)
from guiones_cortos import CORTOS, CIERRE_VOZ  # noqa: E402

W, H, FPS = 1080, 1920, 30
TRABAJO = os.path.join(BASE, 'trabajo'); SALIDA = os.path.join(BASE, 'salida')
INTRO = os.path.join(VIDEOS, 'marca', 'intro_systion.mp4')
LOGO = os.path.join(VIDEOS, 'marca', 'logo_systion.png')
WHATSAPP = os.environ.get('WHATSAPP', '+51 996 122 890')
WEB, CORREO = 'solse.pe', 'sistemas@solse.pe'
CONTACTO = f'WhatsApp {WHATSAPP}'
MUSICA = os.environ.get('MUSICA')            # pista de fondo opcional (otra carpeta de salida)
VOLUMEN_MUSICA = os.environ.get('VOLUMEN_MUSICA', '0.12')   # 0.22 en la primera versión: tapaba la voz
if MUSICA:
    SALIDA = os.path.join(BASE, 'salida_con_musica')
NARANJA, CREMA, AZUL, AZUL2 = (243, 146, 38), (246, 244, 239), (30, 38, 64), (14, 19, 36)
ZONA_TEXTO = (1430, 1640)          # subtítulos: por encima de los botones y textos de TikTok / Reels


def fondo():
    im = Image.new('RGB', (W, H), AZUL2); d = ImageDraw.Draw(im)
    for y in range(H):
        t = y / H
        d.line([(0, y), (W, y)], fill=tuple(int(AZUL[i] * (1 - t) + AZUL2[i] * t) for i in range(3)))
    logo = Image.open(LOGO).convert('RGBA'); logo = logo.resize((int(logo.width * 160 / logo.height), 160), Image.LANCZOS)
    im.paste(logo, (56, 56), logo)
    return im


def titular(d, texto, y, tam, ancho=W - 120):
    """Texto centrado; **x** en naranja."""
    f = serie.fuente(tam, True)
    piezas = [(p, i % 2 == 1) for i, p in enumerate(texto.split('**')) if p]
    palabras = [(w, n) for p, n in piezas for w in p.split()]
    lineas, actual = [], []
    for w, n in palabras:
        prueba = ' '.join(x for x, _ in actual + [(w, n)])
        if d.textlength(prueba, font=f) > ancho and actual:
            lineas.append(actual); actual = [(w, n)]
        else:
            actual.append((w, n))
    lineas.append(actual)
    for linea in lineas:
        total = d.textlength(' '.join(w for w, _ in linea), font=f); x = (W - total) / 2
        for w, n in linea:
            d.text((x, y), w, font=f, fill=NARANJA if n else CREMA); x += d.textlength(w + ' ', font=f)
        y += int(tam * 1.18)
    return y


def cuadro(esc, destino):
    im = fondo(); d = ImageDraw.Draw(im)
    if esc['t'] == 'gancho':
        titular(d, esc['titular'], 640, 104)
    elif esc['t'] == 'cifra':
        f = serie.fuente(170, True); tw = d.textlength(esc['cifra'], font=f)
        d.text(((W - tw) / 2, 660), esc['cifra'], font=f, fill=NARANJA)
        titular(d, esc['titular'], 900, 64)
    else:
        y = titular(d, esc['titular'], 290, 76)
        img = Image.open(os.path.join(serie.CAPTURAS, esc['img'] + '.png')).convert('RGB')
        ancho_panel, alto_max = 1000, ZONA_TEXTO[0] - 60 - (y + 30)
        focos = esc.get('focos', [])
        if focos:
            x0, y0, x1, y1 = serie.buscar(esc['img'], focos[0])
            cw = min(img.width, max(760, (x1 - x0) * 1.15)); ch = min(img.height, cw * alto_max / ancho_panel)
            cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
            izq = min(max(0, cx - cw / 2), img.width - cw); arr = min(max(0, cy - ch / 2), img.height - ch)
            img = img.crop((int(izq), int(arr), int(izq + cw), int(arr + ch)))
            caja = [x0 - izq, y0 - arr, x1 - izq, y1 - arr]
        else:
            caja = None
        esc_ = min(ancho_panel / img.width, alto_max / img.height)
        img = img.resize((int(img.width * esc_), int(img.height * esc_)), Image.LANCZOS)
        ox, oy = (W - img.width) // 2, y + 30 + (alto_max - img.height) // 2
        sombra = Image.new('RGBA', (img.width + 40, img.height + 40), (0, 0, 0, 0))
        ImageDraw.Draw(sombra).rounded_rectangle([20, 20, img.width + 20, img.height + 20], 18, fill=(0, 0, 0, 150))
        im.paste(sombra.filter(ImageFilter.GaussianBlur(14)), (ox - 20, oy - 8), sombra.filter(ImageFilter.GaussianBlur(14)))
        mascara = Image.new('L', img.size, 0); ImageDraw.Draw(mascara).rounded_rectangle([0, 0, img.width, img.height], 18, fill=255)
        im.paste(img, (ox, oy), mascara)
        if caja:
            r = [ox + caja[0] * esc_, oy + caja[1] * esc_, ox + caja[2] * esc_, oy + caja[3] * esc_]
            d.rounded_rectangle(r, 10, outline=NARANJA, width=7)
    im.save(destino)


def cierre_png(destino):
    im = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    y = titular(d, 'Nómina peruana', 985, 62)
    y = titular(d, 'para **Odoo 19 Community**', y, 62)
    y = titular(d, 'Agenda una demostración', y + 12, 50)
    f = serie.fuente(46, True); tw = d.textlength(CONTACTO, font=f)
    d.rounded_rectangle([(W - tw) / 2 - 40, y + 28, (W + tw) / 2 + 40, y + 28 + 92], 46, fill=NARANJA)
    d.text(((W - tw) / 2, y + 46), CONTACTO, font=f, fill=AZUL2)
    f = serie.fuente(40, True); linea = f'{WEB}  ·  {CORREO}'; tw = d.textlength(linea, font=f)
    d.text(((W - tw) / 2, y + 150), linea, font=f, fill=CREMA)
    im.save(destino)


def trocitos(frase, maximo=26):
    """Subtítulos cortos, al estilo de los videos verticales."""
    palabras, partes, actual = frase.split(), [], ''
    for p in palabras:
        if len(actual) + len(p) + 1 > maximo and actual:
            partes.append(actual); actual = p
        else:
            actual = (actual + ' ' + p).strip()
    return partes + [actual]


def marca_ass(s):
    cs = int(round(s * 100))
    return f'{cs // 360000}:{cs % 360000 // 6000:02d}:{cs % 6000 // 100:02d}.{cs % 100:02d}'


def montar(corto):
    carpeta = os.path.join(TRABAJO, corto['id']); os.makedirs(carpeta, exist_ok=True); os.makedirs(SALIDA, exist_ok=True)
    tramos, subs, t = [], [], 0.0
    for n, esc in enumerate(corto['escenas'] + [{'t': 'cierre', 'voz': CIERRE_VOZ}]):
        voz, sub = serie.textos(esc['voz'])
        wav, dvoz = serie.voz_cacheada(voz)
        salida = os.path.join(carpeta, f'{n:02d}.mp4')
        if esc['t'] == 'cierre':
            t_cierre = t
            entrada, dur = 0.3, round(max(3.3, 0.3 + dvoz + 0.8), 2)
            png = os.path.join(carpeta, 'cierre.png'); cierre_png(png)
            # la aparición del logo de la intro (de 2,9 s al final), al frente y desenfocada de fondo
            filtros = (f'[0:v]trim=2.9,setpts=PTS-STARTPTS,fps={FPS},split[a][b];'
                       f'[a]scale=-2:{H},crop={W}:{H},boxblur=24:2,eq=brightness=-0.42[fondo];'
                       f'[b]scale={W}:-2:flags=lanczos[frente];'
                       f'[fondo][frente]overlay=0:330[v0];[v0][1:v]overlay=0:0,tpad=stop_mode=clone:stop_duration=10,'
                       f'trim=0:{dur:.2f},fade=t=in:st=0:d=0.25,format=yuv420p,setsar=1[v];'
                       f'[0:a]atrim=2.9,asetpts=PTS-STARTPTS,volume=0.35,apad[m];'
                       f'[2:a]adelay={int(entrada * 1000)},apad[vz];[m][vz]amix=inputs=2:duration=longest:normalize=0,'
                       f'atrim=0:{dur:.2f},aresample=44100,aformat=channel_layouts=stereo[a]')
            serie.correr(['-i', INTRO, '-loop', '1', '-i', png, '-i', wav, '-filter_complex', filtros, '-map', '[v]', '-map', '[a]',
                          '-t', f'{dur:.2f}', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-r', str(FPS),
                          '-c:a', 'aac', '-b:a', '160k', salida])
        else:
            entrada = 0.15 if n == 0 else 0.25
            dur = round(entrada + dvoz + 0.35, 2)
            png = os.path.join(carpeta, f'{n:02d}.png'); cuadro(esc, png)
            # leve acercamiento para dar movimiento
            filtros = (f'[0:v]scale={W * 2}:{H * 2},zoompan=z=\'min(1+0.0006*on,1.04)\':d={int(dur * FPS) + 1}:'
                       f'x=\'iw/2-(iw/zoom/2)\':y=\'ih/2-(ih/zoom/2)\':s={W}x{H}:fps={FPS},trim=0:{dur:.2f},'
                       f'fade=t=in:st=0:d=0.18,format=yuv420p,setsar=1[v];'
                       f'[1:a]adelay={int(entrada * 1000)},apad,atrim=0:{dur:.2f},aresample=44100,aformat=channel_layouts=stereo[a]')
            serie.correr(['-loop', '1', '-t', f'{dur:.2f}', '-i', png, '-i', wav, '-filter_complex', filtros, '-map', '[v]', '-map', '[a]',
                          '-t', f'{dur:.2f}', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-r', str(FPS),
                          '-c:a', 'aac', '-b:a', '160k', salida])
        tramos.append(salida)
        piezas = [p for frase in re.split(r'(?<=[.:;?¿,])\s+', sub) if frase.strip() for p in trocitos(frase.strip())]
        cursor, total = t + entrada, sum(len(p) for p in piezas)
        for p in piezas:
            tramo = dvoz * len(p) / total; subs.append((cursor, cursor + tramo, p)); cursor += tramo
        t += dur
    lista = os.path.join(carpeta, 'lista.txt')
    open(lista, 'w').writelines(f"file '{x}'\n" for x in tramos)
    unido = os.path.join(carpeta, 'unido.mp4')
    serie.correr(['-f', 'concat', '-safe', '0', '-i', lista, '-c', 'copy', unido])
    ass = os.path.join(carpeta, 'subtitulos.ass')
    with open(ass, 'w', encoding='utf-8') as f:
        f.write('[Script Info]\nScriptType: v4.00+\nPlayResX: 1080\nPlayResY: 1920\nWrapStyle: 0\n\n[V4+ Styles]\n'
                'Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, '
                'ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\n'
                f'Style: Corto,DM Sans,78,&H00FFFFFF,&H00FFFFFF,&H00241309,&H96000000,-1,0,0,0,100,100,0,0,1,6,3,2,60,60,{H - ZONA_TEXTO[1]},1\n\n'
                '[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n')
        for a, b, p in subs:
            f.write(f'Dialogue: 0,{marca_ass(a)},{marca_ass(b)},Corto,,0,0,0,,{p}\n')
    nombre = f'{corto["id"]}_{re.sub(r"[^A-Za-z0-9]+", "_", serie.sin_tildes(corto["titulo"]).title()).strip("_")}'
    final = os.path.join(SALIDA, nombre + '.mp4')
    video = ['-vf', f'ass={ass}:fontsdir={serie.FUENTES}', '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p', '-profile:v', 'high']
    if MUSICA:
        # música bajo la voz (se agacha cuando hay voz) y se va antes del cierre, que trae la música de la intro
        filtros = (f'[1:a]aloop=loop=-1:size=2e9,atrim=0:{t_cierre + 0.6:.2f},volume={VOLUMEN_MUSICA},afade=t=in:d=0.6,'
                   f'afade=t=out:st={t_cierre - 0.6:.2f}:d=1.2,aresample=44100,aformat=channel_layouts=stereo[m];'
                   f'[0:a]asplit[voz][guia];[m][guia]sidechaincompress=threshold=0.03:ratio=6:attack=20:release=350[md];'
                   f'[voz][md]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100[a]')
        serie.correr(['-i', unido, '-i', MUSICA, '-filter_complex', filtros, '-map', '0:v', '-map', '[a]'] + video
                     + ['-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', final])
    else:
        serie.correr(['-i', unido] + video + ['-af', 'loudnorm=I=-14:TP=-1.5:LRA=11,aresample=44100', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', final])
    print(f'{corto["id"]}: {t:.1f} s -> {final}', flush=True)
    return t


def documento():
    filas = ['# Cortos publicitarios · Nómina PE para Odoo 19\n',
             'Formato 9:16 (1080×1920) para TikTok, Reels de Instagram y estados de WhatsApp. Voz del equipo de soporte; '
             'subtítulos grandes incrustados; logo de SYSTION arriba a la izquierda; cierre con la aparición del logo de la intro '
             f'y la invitación «{CIERRE_VOZ}». Cifras: manual v2.\n']
    for c in CORTOS:
        filas.append(f'\n## {c["id"]} · {c["titulo"]}\n\n| # | En pantalla | Voz |\n|---|---|---|')
        for n, e in enumerate(c['escenas'], 1):
            pantalla = e.get('titular', '').replace('**', '') + (f' · captura `{e["img"]}`' if e.get('img') else '') + (f' · cifra {e["cifra"]}' if e.get('cifra') else '')
            filas.append(f'| {n} | {pantalla} | {serie.textos(e["voz"])[1]} |')
        filas.append(f'| fin | Logo SYSTION + «Agenda una demostración» + {CONTACTO} | {CIERRE_VOZ} |')
    ruta = os.path.join(BASE, 'GUIONES_CORTOS.md'); open(ruta, 'w', encoding='utf-8').write('\n'.join(filas) + '\n'); print(ruta)


if __name__ == '__main__':
    pedido = sys.argv[1] if len(sys.argv) > 1 else 'guiones'
    if pedido == 'guiones':
        documento()
    else:
        ids = [c['id'] for c in CORTOS] if pedido == 'todos' else pedido.split(',')
        for c in CORTOS:
            if c['id'] in ids:
                montar(c)
