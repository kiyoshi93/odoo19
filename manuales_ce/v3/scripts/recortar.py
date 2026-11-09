# Recorta el espacio vacío de abajo (y de la derecha en los informes) de las capturas altas.
# Uso: python3 recortar.py archivo.png ...
import sys
from PIL import Image, ImageChops
for ruta in sys.argv[1:]:
    im = Image.open(ruta).convert('RGB')
    fondo = Image.new('RGB', im.size, im.getpixel((im.width - 2, im.height - 2)))
    caja = ImageChops.difference(im, fondo).point(lambda v: 255 if v > 12 else 0).getbbox()
    if not caja: continue
    abajo = min(im.height, caja[3] + 30)
    derecha = im.width if '_impresa' not in ruta and 'liquidacion_deposito' not in ruta else min(im.width, caja[2] + 30)
    izquierda = 0 if derecha == im.width else max(0, caja[0] - 30)
    arriba = 0 if derecha == im.width else max(0, caja[1] - 30)
    if abajo < im.height - 20 or derecha < im.width - 20:
        im.crop((izquierda, arriba, derecha, abajo)).save(ruta)
        print(ruta.split('/')[-1], im.size, '→', (derecha - izquierda, abajo - arriba))
