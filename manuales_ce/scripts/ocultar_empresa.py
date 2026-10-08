# Difumina en las capturas los identificadores que podrían ser reales: DNI de los trabajadores de la demo,
# RUC de los prestadores y de las compañías del laboratorio. FM SYSTEMS se muestra (empresa del usuario)
# y los DNI sintéticos 999999xx no se tocan.
# Uso: python3 -I ocultar_empresa.py <carpeta_capturas> [archivo ...]
import os, re, sys
from PIL import Image, ImageFilter
from rapidocr_onnxruntime import RapidOCR

PATRON = re.compile(
	r'(?<!\d)(4\d{7})(?!\d)'                       # DNI de la demo (4xxxxxxx)
	r'|1040000\d*'                                 # RUC de prestadores de la demo (también truncado)
	r'|PA\s?12345'                                 # pasaporte del no domiciliado (también truncado)
	r'|2060(1234565|2345671|3456786)',             # RUC de las compañías del laboratorio
	re.I)
MARGEN = 4
# Zonas que el OCR no separa bien (filas resaltadas o con tooltip): columnas de documento y prestador
ZONAS_MANUALES = {
	'p22_04_rxh_revision.png': [(318, 438, 600, 795)],
	'p22_05_rxh_archivos.png': [(318, 438, 600, 795)],
}


def difuminar(imagen, caja):
	x1, y1, x2, y2 = [int(v) for v in caja]
	x1, y1 = max(0, x1 - MARGEN), max(0, y1 - MARGEN)
	x2, y2 = min(imagen.width, x2 + MARGEN), min(imagen.height, y2 + MARGEN)
	zona = imagen.crop((x1, y1, x2, y2))
	# Pixelado + desenfoque: ilegible incluso al ampliar
	pequena = zona.resize((max(1, zona.width // 12), max(1, zona.height // 12)), Image.BILINEAR)
	zona = pequena.resize(zona.size, Image.NEAREST).filter(ImageFilter.GaussianBlur(6))
	imagen.paste(zona, (x1, y1))


def main(carpeta, archivos):
	ocr = RapidOCR()
	for archivo in archivos or sorted(os.listdir(carpeta)):
		if not archivo.endswith('.png'):
			continue
		ruta = os.path.join(carpeta, archivo)
		resultado, _ = ocr(ruta)
		cajas = [(min(p[0] for p in c), min(p[1] for p in c), max(p[0] for p in c), max(p[1] for p in c))
				 for c, texto, _ in (resultado or []) if PATRON.search(texto.replace(' ', ''))]
		cajas += ZONAS_MANUALES.get(archivo, [])
		if not cajas:
			continue
		imagen = Image.open(ruta).convert('RGB')
		for caja in cajas:
			difuminar(imagen, caja)
		imagen.save(ruta)
		print(archivo, len(cajas))


if __name__ == '__main__':
	main(sys.argv[1], sys.argv[2:])
