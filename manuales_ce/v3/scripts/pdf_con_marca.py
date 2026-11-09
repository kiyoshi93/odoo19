# PDF del manual v2 con el logo de SYSTION como marca de agua (centro de cada página) y sello en el pie.
# Uso: python3 manuales_ce/v2/scripts/pdf_con_marca.py <manual.pdf> <salida.pdf>
import io, os, sys
from PIL import Image
from pypdf import PdfReader, PdfWriter
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

LOGO = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'videos', 'marca', 'logo_systion.png')
OPACIDAD_CENTRO, OPACIDAD_PIE = 0.07, 0.85


def con_opacidad(opacidad):
    im = Image.open(LOGO).convert('RGBA')
    r, g, b, a = im.split()
    im = Image.merge('RGBA', (r, g, b, a.point(lambda v: int(v * opacidad))))
    buf = io.BytesIO(); im.save(buf, 'PNG'); buf.seek(0)
    return ImageReader(buf), im.size


def pagina_marca(ancho, alto):
    buf = io.BytesIO(); c = canvas.Canvas(buf, pagesize=(ancho, alto))
    img, (w, h) = con_opacidad(OPACIDAD_CENTRO)
    lw = ancho * 0.46; lh = lw * h / w
    c.drawImage(img, (ancho - lw) / 2, (alto - lh) / 2, lw, lh, mask='auto')
    img, (w, h) = con_opacidad(OPACIDAD_PIE)
    ph = 34; pw = ph * w / h
    c.drawImage(img, ancho - 40 - pw, 14, pw, ph, mask='auto')
    c.setFont('Helvetica', 6.5); c.setFillGray(0.45)
    c.drawRightString(ancho - 46 - pw, 24, 'SYSTION · FM Systems Solutions')
    c.save(); buf.seek(0)
    return PdfReader(buf).pages[0]


def main(origen, destino):
    lector, escritor = PdfReader(origen), PdfWriter()
    cache = {}
    for pagina in lector.pages:
        ancho, alto = float(pagina.mediabox.width), float(pagina.mediabox.height)
        clave = (round(ancho), round(alto))
        if clave not in cache:
            cache[clave] = pagina_marca(ancho, alto)
        pagina.merge_page(cache[clave])
        escritor.add_page(pagina)
    escritor.add_metadata({'/Title': 'Manual de Nómina Peruana - Odoo 19 Community (v2)', '/Author': 'SYSTION · FM Systems Solutions',
                           '/Subject': 'Manual de usuario de la nómina peruana en Odoo 19 Community'})
    escritor.compress_identical_objects()
    with open(destino, 'wb') as f:
        escritor.write(f)
    print(destino, len(lector.pages), 'páginas')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
