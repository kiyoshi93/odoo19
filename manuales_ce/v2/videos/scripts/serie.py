# Serie de videos del manual v2 (E00 a E26): tarjetas + capturas del manual con acercamiento al dato,
# voz de ElevenLabs y subtítulos. Las capturas son las mismas del manual (ya difuminadas), así que cada
# episodio repite sus cifras.
# Uso (desde el repo): python3 manuales_ce/v2/videos/scripts/serie.py E06[,E07...] | todos | guiones
import hashlib, json, os, re, subprocess, sys, unicodedata
from PIL import Image, ImageDraw, ImageFont
import imageio_ffmpeg

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))           # v2/videos
CAPTURAS = os.path.join(BASE, '..', 'capturas')
FUENTES = os.path.join(BASE, '..', '..', 'promo', 'fuentes')
TRABAJO = os.path.join(BASE, 'trabajo'); SALIDA = os.path.join(BASE, os.environ.get('SALIDA_VIDEOS', 'salida'))
sys.path.insert(0, os.path.join(BASE, '..', '..', 'promo', 'scripts'))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from guiones import EPISODIOS, VERSIONES  # noqa: E402

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
VOZ = os.environ.get('VOZ', 'el:EXAVITQu4vr4xnSDxMaL')   # Sarah, la misma del resumen v1
W, H, FPS = 1920, 1080, 30
ENTRADA, COLA, FUNDIDO = 0.5, 0.9, 0.35
AZUL, CREMA, ORO, ROJO, GRIS = (30, 38, 64), (246, 244, 239), (242, 184, 75), (229, 57, 53), (201, 206, 219)


def fuente(tam, negrita=False):
    return ImageFont.truetype(os.path.join(FUENTES, 'DMSans-Bold.ttf' if negrita else 'DMSans-Medium.ttf'), tam)


# ------------------------------------------------------------------ números en palabras
UNIDADES = 'cero uno dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince dieciséis diecisiete dieciocho diecinueve veinte veintiuno veintidós veintitrés veinticuatro veinticinco veintiséis veintisiete veintiocho veintinueve'.split()
DECENAS = {3: 'treinta', 4: 'cuarenta', 5: 'cincuenta', 6: 'sesenta', 7: 'setenta', 8: 'ochenta', 9: 'noventa'}
CENTENAS = {1: 'ciento', 2: 'doscientos', 3: 'trescientos', 4: 'cuatrocientos', 5: 'quinientos', 6: 'seiscientos', 7: 'setecientos', 8: 'ochocientos', 9: 'novecientos'}


def palabras(n, apocope=True):
    """Entero en palabras («un» antes de sustantivo cuando apocope)."""
    if n < 30:
        t = UNIDADES[n]
        return (t[:-1] if t.endswith('uno') and apocope else t) if n else 'cero'
    if n < 100:
        d, u = divmod(n, 10)
        return DECENAS[d] + ('' if not u else ' y ' + palabras(u, apocope))
    if n < 1000:
        c, r = divmod(n, 100)
        if n == 100:
            return 'cien'
        return CENTENAS[c] + ('' if not r else ' ' + palabras(r, apocope))
    if n < 1_000_000:
        m, r = divmod(n, 1000)
        return ('mil' if m == 1 else palabras(m, True) + ' mil') + ('' if not r else ' ' + palabras(r, apocope))
    mi, r = divmod(n, 1_000_000)
    return ('un millón' if mi == 1 else palabras(mi, True) + ' millones') + ('' if not r else ' ' + palabras(r, apocope))


def miles(n):
    return f'{n:,}'.replace(',', ' ')


def ficha(tipo, valor):
    """[[S 4025.70]] soles · [[N 2573]] número · [[P 0.53]] porcentaje · [[T voz|texto]] par libre."""
    if tipo == 'T':
        voz, sub = valor.split('|', 1)
        return voz, sub
    num = float(valor); entero = int(num); cent = int(round((num - entero) * 100))
    if tipo == 'S':
        voz = palabras(entero) + (' sol' if entero == 1 else ' soles') + (f' con {palabras(cent)} céntimos' if cent else '')
        return voz, f'S/ {miles(entero)},{cent:02d}' if '.' in valor else f'S/ {miles(entero)}'
    if tipo in ('N', 'P'):
        if '.' in valor:
            dec = valor.split('.')[1]
            voz = palabras(entero, False) + ' coma ' + (('cero ' if dec.startswith('0') and len(dec) > 1 else '') + palabras(int(dec), False))
            sub = miles(entero) + ',' + dec
        else:
            voz, sub = palabras(entero, False), miles(entero)
        if tipo == 'P':
            voz += ' por ciento'; sub += ' %'
        return voz, sub
    raise ValueError(tipo)


def textos(t):
    """(texto para la voz, texto para el subtítulo)."""
    voz, sub, pos = [], [], 0
    for m in re.finditer(r'\[\[([SNPT]) ([^\]]+)\]\]', t):
        voz.append(t[pos:m.start()]); sub.append(t[pos:m.start()])
        v, s = ficha(m.group(1), m.group(2)); voz.append(v); sub.append(s); pos = m.end()
    voz.append(t[pos:]); sub.append(t[pos:])
    return ''.join(voz), ''.join(sub)


# ------------------------------------------------------------------ utilidades
def correr(args):
    subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error'] + args, check=True)


def sin_tildes(s):
    return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn').lower()


SIN_VOZ = VOZ == 'ninguna'
if SIN_VOZ:
    SALIDA = os.path.join(BASE, 'salida_sin_voz')


def voz_cacheada(texto):
    """La voz se guarda por contenido: regenerar un episodio no vuelve a gastar caracteres."""
    if SIN_VOZ:
        # duración estimada de la narración (~15 caracteres por segundo) y pista muda
        dur = round(max(2.5, len(texto) / 15.0), 2)
        wav = os.path.join(TRABAJO, 'voz', f'silencio_{dur:.2f}.wav')
        if not os.path.exists(wav):
            os.makedirs(os.path.dirname(wav), exist_ok=True)
            correr(['-f', 'lavfi', '-i', 'anullsrc=r=24000:cl=mono', '-t', f'{dur:.2f}', wav])
        return wav, dur
    from voz_elevenlabs import sintetizar
    clave = hashlib.sha1((VOZ + '|' + texto).encode()).hexdigest()[:16]
    wav = os.path.join(TRABAJO, 'voz', clave + '.wav')
    if not os.path.exists(wav):
        os.makedirs(os.path.dirname(wav), exist_ok=True)
        import time, urllib.error
        for intento in range(5):
            try:
                sintetizar(texto, wav, VOZ); break
            except urllib.error.HTTPError as e:
                cuerpo = e.read()[:300]
                print('  ElevenLabs', e.code, cuerpo, flush=True)
                if intento == 4 or b'quota' in cuerpo:
                    raise
                time.sleep(5 * 2 ** intento)
    import wave
    with wave.open(wav) as w:
        return wav, w.getnframes() / w.getframerate()


_ocr = None


def cajas_ocr(nombre):
    global _ocr
    cache = os.path.join(TRABAJO, 'ocr', nombre + '.json')
    if os.path.exists(cache) and os.path.getmtime(cache) > os.path.getmtime(os.path.join(CAPTURAS, nombre + '.png')):
        return json.load(open(cache))
    if _ocr is None:
        from rapidocr_onnxruntime import RapidOCR
        _ocr = RapidOCR()
    r, _ = _ocr(os.path.join(CAPTURAS, nombre + '.png'))
    datos = [[[min(p[0] for p in c), min(p[1] for p in c), max(p[0] for p in c), max(p[1] for p in c)], t] for c, t, _s in (r or [])]
    os.makedirs(os.path.dirname(cache), exist_ok=True); json.dump(datos, open(cache, 'w'), ensure_ascii=False)
    return datos


def buscar(nombre, foco):
    """foco: «texto» (fila completa) · «texto#2» (segunda aparición) · {'texto', 'modo': 'caja'|'fila', 'hasta': texto}."""
    if isinstance(foco, str):
        foco = {'texto': foco}
    texto, n = (foco['texto'].split('#') + ['1'])[:2]
    hallados = [c for c, t in cajas_ocr(nombre) if sin_tildes(texto) in sin_tildes(t)]
    if len(hallados) < int(n):
        raise SystemExit(f'No encuentro «{foco["texto"]}» en {nombre}. Textos: ' + ' | '.join(t for _c, t in cajas_ocr(nombre))[:1500])
    x0, y0, x1, y1 = hallados[int(n) - 1]
    if foco.get('hasta'):
        otros = [c for c, t in cajas_ocr(nombre) if sin_tildes(foco['hasta']) in sin_tildes(t) and c[1] >= y0 - 5]
        if otros:
            c = min(otros, key=lambda c: c[1]); x0, y0, x1, y1 = min(x0, c[0]), y0, max(x1, c[2]), max(y1, c[3])
    if foco.get('modo', 'fila') == 'fila':
        ancho = Image.open(os.path.join(CAPTURAS, nombre + '.png')).width
        # la fila: del texto hasta el último texto a su altura
        misma = [c for c, _t in cajas_ocr(nombre) if abs((c[1] + c[3]) / 2 - (y0 + y1) / 2) < 8]
        x0 = min([x0] + [c[0] for c in misma]); x1 = max([x1] + [c[2] for c in misma]); x1 = min(ancho, x1)
    return [x0 - 10, y0 - 7, x1 + 10, y1 + 7]


# ------------------------------------------------------------------ cuadros
def rotular(lienzo, rotulo, ep):
    d = ImageDraw.Draw(lienzo)
    chapa = f'{ep["id"]} · {ep["capitulos_txt"]}'
    f = fuente(26, True); tw = d.textlength(chapa, font=f)
    d.rounded_rectangle([W - 24 - tw - 36, 22, W - 24, 22 + 50], 10, fill=AZUL + (235,)); d.text((W - 24 - tw - 18, 31), chapa, font=f, fill=ORO)
    if rotulo:
        f = fuente(32, True); lineas = partir(d, rotulo, f, 1500)
        alto = 26 + 42 * len(lineas)
        d.rounded_rectangle([24, H - 28 - alto, 24 + 36 + max(d.textlength(l, font=f) for l in lineas) + 12, H - 28], 12, fill=AZUL + (238,))
        d.rectangle([24, H - 28 - alto, 31, H - 28], fill=ORO)
        for i, l in enumerate(lineas):
            d.text((52, H - 28 - alto + 13 + 42 * i), l, font=f, fill=CREMA)


def partir(d, texto, f, ancho):
    lineas, actual = [], ''
    for p in texto.split():
        prueba = (actual + ' ' + p).strip()
        if d.textlength(prueba, font=f) > ancho and actual:
            lineas.append(actual); actual = p
        else:
            actual = prueba
    return lineas + [actual]


def cursor(d, x, y):
    puntos = [(x, y), (x, y + 38), (x + 10, y + 29), (x + 17, y + 45), (x + 24, y + 42), (x + 17, y + 26), (x + 30, y + 26)]
    d.polygon([(a + 2, b + 2) for a, b in puntos], fill=(0, 0, 0, 90)); d.polygon(puntos, fill=(255, 255, 255), outline=(0, 0, 0))


def cuadro_captura(nombre, caja, rotulo, ep, destino):
    img = Image.open(os.path.join(CAPTURAS, nombre + '.png')).convert('RGB')
    lienzo = Image.new('RGBA', (W, H), AZUL + (255,))
    if caja is None:
        # vista completa, con aire para el rótulo
        esc = min((W - 80) / img.width, (H - 150) / img.height)
        if esc < 0.8:
            # captura alta: la parte de arriba a escala legible (el detalle viene en los focos)
            esc = min((W - 80) / img.width, 1.25)
            img = img.crop((0, 0, img.width, min(img.height, int((H - 150) / esc))))
        im = img.resize((int(img.width * esc), int(img.height * esc)), Image.LANCZOS)
        lienzo.paste(im, ((W - im.width) // 2, 92 + (H - 150 - im.height) // 2))
    else:
        x0, y0, x1, y1 = caja
        cw = min(img.width, max(980, (x1 - x0) * 1.35)); ch = cw * 9 / 16
        if ch > img.height:
            ch = img.height; cw = min(img.width, ch * 16 / 9)
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        izq = min(max(0, cx - cw / 2), img.width - cw); arr = min(max(0, cy - ch * 0.45), img.height - ch)
        recorte = img.crop((int(izq), int(arr), int(izq + cw), int(arr + ch)))
        esc = min(W / recorte.width, H / recorte.height)
        im = recorte.resize((int(recorte.width * esc), int(recorte.height * esc)), Image.LANCZOS)
        ox, oy = (W - im.width) // 2, (H - im.height) // 2
        lienzo.paste(im, (ox, oy))
        d = ImageDraw.Draw(lienzo, 'RGBA')
        r = [ox + (x0 - izq) * esc, oy + (y0 - arr) * esc, ox + (x1 - izq) * esc, oy + (y1 - arr) * esc]
        d.rounded_rectangle(r, 8, outline=ROJO, width=5)
        cursor(d, min(r[2] - 30, W - 60), r[3] - 12)
    rotular(lienzo, rotulo, ep)
    lienzo.convert('RGB').save(destino)


def cuadro_tarjeta(escena, ep, destino):
    lienzo = Image.new('RGB', (W, H), AZUL if escena['t'] != 'cierre' else (113, 75, 103))
    d = ImageDraw.Draw(lienzo)
    x = 128
    ceja = escena.get('ceja', '')
    d.text((x, 104), ceja.upper(), font=fuente(28, True), fill=ORO if escena['t'] != 'cierre' else (241, 228, 238))
    y = 160
    for l in partir(d, escena['titulo'], fuente(74 if escena['t'] != 'portada' else 92, True), W - 2 * x):
        d.text((x, y), l, font=fuente(74 if escena['t'] != 'portada' else 92, True), fill=CREMA); y += 88 if escena['t'] != 'portada' else 106
    y += 40
    if escena['t'] == 'cifra':
        d.text((x, y), escena['cifra'], font=fuente(150, True), fill=ORO); y += 200
        for l in partir(d, escena['etiqueta'], fuente(40), W - 2 * x):
            d.text((x, y), l, font=fuente(40), fill=CREMA); y += 54
    for item in escena.get('items', []):
        lineas = partir(d, item, fuente(38), W - 2 * x - 60)
        d.text((x, y), '✓' if escena['t'] != 'limites' else '–', font=fuente(38, True), fill=(123, 224, 168) if escena['t'] != 'limites' else ORO)
        for l in lineas:
            d.text((x + 56, y), l, font=fuente(38), fill=CREMA); y += 50
        y += 18
    if escena.get('pie'):
        for l in partir(d, escena['pie'], fuente(30), W - 2 * x)[::-1]:
            pass
        yy = H - 96 - 40 * (len(partir(d, escena['pie'], fuente(30), W - 2 * x)) - 1)
        for l in partir(d, escena['pie'], fuente(30), W - 2 * x):
            d.text((x, yy), l, font=fuente(30), fill=GRIS); yy += 40
    lienzo.save(destino)


# ------------------------------------------------------------------ episodio
def escenas_completas(ep):
    mods = ' · '.join(f'{m} {VERSIONES[m]}' for m in ep['modulos'])
    portada = {'t': 'portada', 'ceja': f'Nómina PE · Odoo 19 Community · {ep["id"]}', 'titulo': ep['titulo'],
               'items': [], 'pie': f'Manual v2: {ep["capitulos_txt"]} · {("Caso " + ep["caso"]) if ep.get("caso") else "Datos de prueba ficticios"} · Versiones: {mods}',
               'voz': ep['entrada']}
    cierre = {'t': 'cierre', 'ceja': 'Dónde leer más', 'titulo': ep['cierre_titulo'], 'items': [], 'cifra': None,
              'pie': f'Manual de nómina v2, {ep["capitulos_txt"]}' + (f' · Laboratorio: caso {ep["caso"]}' if ep.get('caso') else '') + f' · {mods}',
              'voz': ep['cierre']}
    if ep.get('cifra_clave'):
        cierre['t'] = 'cifra'; cierre['cifra'], cierre['etiqueta'] = ep['cifra_clave']; cierre['ceja'] = 'Cifra clave · dónde leer más'
    return [portada] + ep['escenas'] + [cierre]


def montar(ep):
    carpeta = os.path.join(TRABAJO, ep['id']); os.makedirs(carpeta, exist_ok=True); os.makedirs(SALIDA, exist_ok=True)
    tramos, subtitulos, t = [], [], 0.0
    for n, esc in enumerate(escenas_completas(ep)):
        voz, sub = textos(esc['voz'])
        wav, dvoz = voz_cacheada(voz)
        dur = round(ENTRADA + dvoz + COLA, 2)
        cuadros = []
        if esc['t'] == 'cap':
            focos = esc.get('focos', [])
            cuadros.append(os.path.join(carpeta, f'{n:02d}_0.png'))
            cuadro_captura(esc['img'], None, esc.get('rotulo'), ep, cuadros[-1])
            for i, f in enumerate(focos, 1):
                cuadros.append(os.path.join(carpeta, f'{n:02d}_{i}.png'))
                cuadro_captura(esc['img'], buscar(esc['img'], f), esc.get('rotulos', {}).get(i, esc.get('rotulo')), ep, cuadros[-1])
        else:
            cuadros.append(os.path.join(carpeta, f'{n:02d}_0.png')); cuadro_tarjeta(esc, ep, cuadros[-1])
        # reparto: la vista completa un poco más; cada foco el resto
        if len(cuadros) == 1:
            tiempos = [dur]
        else:
            primero = max(2.5, dur * 0.3) if dur > 6 else dur / len(cuadros)
            tiempos = [primero] + [(dur - primero) / (len(cuadros) - 1)] * (len(cuadros) - 1)
        entradas, filtros, prev = [], [], '0:v'
        for i, (c, d) in enumerate(zip(cuadros, tiempos)):
            entradas += ['-loop', '1', '-t', f'{d + (FUNDIDO if i < len(cuadros) - 1 else 0):.2f}', '-i', c]
        acumulado = 0.0
        for i in range(1, len(cuadros)):
            acumulado += tiempos[i - 1]
            filtros.append(f'[{prev}][{i}:v]xfade=transition=fade:duration={FUNDIDO}:offset={acumulado - FUNDIDO / 2:.2f}[x{i}]'); prev = f'x{i}'
        filtros.append(f'[{prev}]fps={FPS},format=yuv420p,trim=0:{dur:.2f},fade=t=in:st=0:d=0.3,fade=t=out:st={dur - 0.3:.2f}:d=0.3,setpts=PTS-STARTPTS[v]')
        filtros.append(f'[{len(cuadros)}:a]adelay={int(ENTRADA * 1000)},apad,atrim=0:{dur:.2f},aresample=44100[a]')
        salida = os.path.join(carpeta, f'{n:02d}.mp4')
        correr(entradas + ['-i', wav, '-filter_complex', ';'.join(filtros), '-map', '[v]', '-map', '[a]', '-t', f'{dur:.2f}',
                           '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-tune', 'stillimage', '-r', str(FPS),
                           '-c:a', 'aac', '-b:a', '160k', '-ac', '2', salida])
        tramos.append(salida)
        frases = [x.strip() for x in re.split(r'(?<=[.:;?])\s+', sub) if x.strip()]
        cursor_t, total = t + ENTRADA, sum(len(x) for x in frases)
        for frase in frases:
            for trozo in trocear(frase):
                tramo = dvoz * len(trozo) / total
                subtitulos.append((cursor_t, cursor_t + tramo, trozo)); cursor_t += tramo
        print(f'  {ep["id"]} {n:02d} {esc["t"]:8} voz {dvoz:5.1f}s', flush=True)
        t += dur
    lista = os.path.join(carpeta, 'lista.txt')
    with open(lista, 'w') as f:
        f.writelines(f"file '{x}'\n" for x in tramos)
    nombre = f'{ep["id"]}_{re.sub(r"[^A-Za-z0-9]+", "_", sin_tildes(ep["titulo"]).title()).strip("_")}'
    srt = os.path.join(SALIDA, nombre + '.srt')
    with open(srt, 'w', encoding='utf-8') as f:
        for i, (a, b, frase) in enumerate(subtitulos, 1):
            f.write(f'{i}\n{marca(a)} --> {marca(b)}\n{frase}\n\n')
    unido = os.path.join(carpeta, 'unido.mp4')
    correr(['-f', 'concat', '-safe', '0', '-i', lista, '-c', 'copy', unido])
    final = os.path.join(SALIDA, nombre + '.mp4')
    if SIN_VOZ:
        # sin voz, los subtítulos van incrustados en la imagen
        incrustado = os.path.join(carpeta, 'incrustado.mp4')
        estilo = 'FontName=DM Sans,FontSize=13,PrimaryColour=&H00FFFFFF,BackColour=&H10402620,BorderStyle=4,Outline=6,Shadow=0,MarginV=60'
        correr(['-i', unido, '-vf', f"subtitles={srt}:fontsdir={FUENTES}:force_style='{estilo}'", '-c:v', 'libx264', '-preset', 'medium',
                '-crf', '21', '-c:a', 'copy', incrustado])
        unido = incrustado
    correr(['-i', unido, '-i', srt, '-map', '0', '-map', '1', '-c', 'copy', '-c:s', 'mov_text',
            '-metadata:s:s:0', 'language=spa', '-metadata', f'title={ep["id"]} {ep["titulo"]}', '-movflags', '+faststart', final])
    print(f'{ep["id"]}: {t / 60:.1f} min -> {final}', flush=True)
    return final, t


def trocear(frase, maximo=84):
    """Subtítulos de hasta dos líneas cómodas."""
    if len(frase) <= maximo:
        return [frase]
    palabras_, partes, actual = frase.split(), [], ''
    for p in palabras_:
        if len(actual) + len(p) + 1 > maximo and actual:
            partes.append(actual); actual = p
        else:
            actual = (actual + ' ' + p).strip()
    return partes + [actual]


def marca(s):
    ms = int(round(s * 1000))
    return f'{ms // 3600000:02d}:{ms % 3600000 // 60000:02d}:{ms % 60000 // 1000:02d},{ms % 1000:03d}'


def documento_guiones():
    """Guiones escritos (lo que se dice y lo que se ve), antes de grabar."""
    salida = [f'# Guiones de la serie de videos · Nómina PE v2\n\nVoz: ElevenLabs Sarah. Cada escena muestra la captura del manual que se indica; '
              'el recuadro rojo marca el dato. Las cifras son las del manual v2 (corridas del 22/10/2026).\n']
    total = 0
    for ep in EPISODIOS:
        palabras_ep = 0
        salida.append(f'\n## {ep["id"]} · {ep["titulo"]}\n\n{ep["capitulos_txt"]} · Caso: {ep.get("caso") or "—"} · Módulos: '
                      + ', '.join(ep['modulos']) + '\n\n| # | Se ve | Se dice |\n|---|---|---|')
        for n, esc in enumerate(escenas_completas(ep)):
            _voz, sub = textos(esc['voz']); palabras_ep += len(sub.split())
            if esc['t'] == 'cap':
                ve = f'Captura `{esc["img"]}`' + (f' · foco: ' + ', '.join(f if isinstance(f, str) else f['texto'] for f in esc.get('focos', [])) if esc.get('focos') else '') + (f' · rótulo: «{esc["rotulo"]}»' if esc.get('rotulo') else '')
            elif esc['t'] == 'cifra':
                ve = f'Tarjeta: {esc["cifra"]} — {esc["etiqueta"]}'
            else:
                ve = f'Tarjeta: {esc["titulo"]}' + (' — ' + '; '.join(esc.get('items', [])) if esc.get('items') else '')
            salida.append(f'| {n + 1} | {ve} | {sub} |')
        salida.append(f'\nDuración estimada: {palabras_ep / 150:.1f} min ({palabras_ep} palabras).')
        total += palabras_ep
    salida.insert(1, f'\nTotal estimado: {total / 150:.0f} min de narración en {len(EPISODIOS)} episodios.\n')
    ruta = os.path.join(BASE, 'GUIONES_SERIE_V2.md')
    open(ruta, 'w', encoding='utf-8').write('\n'.join(salida) + '\n')
    print(ruta, total, 'palabras')


def preparar(ep):
    ep.setdefault('capitulos_txt', ('capítulo ' if len(ep['capitulos']) == 1 else 'capítulos ') + ', '.join(ep['capitulos']))
    return ep


if __name__ == '__main__':
    for ep in EPISODIOS:
        preparar(ep)
    pedido = sys.argv[1] if len(sys.argv) > 1 else 'guiones'
    if pedido == 'guiones':
        documento_guiones()
    elif pedido == 'focos':
        # comprueba que cada foco se encuentra en su captura, sin gastar voz
        for ep in EPISODIOS:
            for esc in ep['escenas']:
                if esc['t'] == 'cap':
                    assert os.path.exists(os.path.join(CAPTURAS, esc['img'] + '.png')), esc['img']
                    for f in esc.get('focos', []):
                        try:
                            buscar(esc['img'], f)
                        except SystemExit as e:
                            print('  FALTA', esc['img'], f, '→', str(e)[:200])
            print(ep['id'], 'ok', flush=True)
    else:
        ids = [e['id'] for e in EPISODIOS] if pedido == 'todos' else pedido.split(',')
        resumen = []
        for ep in EPISODIOS:
            if ep['id'] in ids:
                resumen.append(montar(ep))
        print('total', round(sum(t for _f, t in resumen) / 60, 1), 'min')
