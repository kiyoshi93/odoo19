# Difumina en las capturas los datos reales de las empresas de la base (nombre, RUC, dirección, correos, logo).
# Usa OCR (rapidocr_onnxruntime) para ubicar los textos; las zonas extra se definen a mano en ZONAS_MANUALES.
import json, os, re, sys
from PIL import Image, ImageFilter

PATRON = re.compile(r'KNIT|BLAZ|MANUFACTURER|ACTURER|MKB|mkb\.|tienda1|cotizaciones|20452491746|MANZANILLA|MAKABE|AMALFI', re.I)
ZONAS_MANUALES = {  # archivo -> [(x1, y1, x2, y2), ...]: logos y textos que el OCR no detecta
    'p02_02_compania_senati_marcado.png': [(33, 130, 123, 220), (1085, 305, 1580, 352)],
    'p02_03_compania_asistencias.png': [(33, 130, 123, 220), (1085, 305, 1580, 352)],
    'p08c_05_boleta_pago_pe.png': [(108, 5, 262, 48)],
    'p17a_01_boleta_vacaciones.png': [(1083, 163, 1232, 207)],
}
MARGEN = 4


def difuminar(imagen, caja):
    x1, y1, x2, y2 = [int(v) for v in caja]
    x1, y1 = max(0, x1 - MARGEN), max(0, y1 - MARGEN)
    x2, y2 = min(imagen.width, x2 + MARGEN), min(imagen.height, y2 + MARGEN)
    zona = imagen.crop((x1, y1, x2, y2))
    # Pixelado + desenfoque: ilegible incluso al ampliar
    pequena = zona.resize((max(1, zona.width // 12), max(1, zona.height // 12)), Image.BILINEAR)
    zona = pequena.resize(zona.size, Image.NEAREST).filter(ImageFilter.GaussianBlur(6))
    imagen.paste(zona, (x1, y1))


def main(carpeta, ocr_json):
    ocr = json.load(open(ocr_json))
    for archivo, textos in sorted(ocr.items()):
        cajas = [(min(p[0] for p in c), min(p[1] for p in c), max(p[0] for p in c), max(p[1] for p in c))
                 for c, texto, _ in textos if PATRON.search(texto)]
        cajas += ZONAS_MANUALES.get(archivo, [])
        if not cajas:
            continue
        ruta = os.path.join(carpeta, archivo)
        imagen = Image.open(ruta).convert('RGB')
        for caja in cajas:
            difuminar(imagen, caja)
        imagen.save(ruta)
        print(archivo, len(cajas))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
