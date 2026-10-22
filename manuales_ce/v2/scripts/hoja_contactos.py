# Une varias capturas en una hoja (2 columnas) para revisarlas de un vistazo. Uso: python3 hoja_contactos.py salida.png a.png b.png ...
import sys
from PIL import Image, ImageDraw
salida, archivos = sys.argv[1], sys.argv[2:]
ancho = 800
imgs = []
for a in archivos:
    i = Image.open(a).convert('RGB'); i = i.resize((ancho, int(i.height * ancho / i.width)))
    d = ImageDraw.Draw(i); d.rectangle((0, 0, ancho, 22), fill='black'); d.text((5, 5), a.split('/')[-1], fill='yellow')
    imgs.append(i)
filas = [imgs[k:k + 2] for k in range(0, len(imgs), 2)]
alto = sum(max(x.height for x in f) for f in filas)
hoja = Image.new('RGB', (ancho * 2 + 10, alto + 10 * len(filas)), 'white'); y = 0
for f in filas:
    for j, x in enumerate(f): hoja.paste(x, (j * (ancho + 10), y))
    y += max(x.height for x in f) + 10
hoja.save(salida)
