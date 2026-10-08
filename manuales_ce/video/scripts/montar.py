# Monta el video resumen narrado (1920x1080): tarjetas + clips grabados + voz de ElevenLabs + SRT.
# Uso (desde el repo): VOZ=el:<voice_id> python3 manuales_ce/video/scripts/montar.py
import json, os, re, subprocess, sys
import imageio_ffmpeg

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(BASE, '..', 'promo', 'scripts'))
from voz_elevenlabs import sintetizar  # noqa: E402

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
VOZ = os.environ.setdefault('VOZ', 'el:EXAVITQu4vr4xnSDxMaL')  # Sarah
TRAMOS = os.path.join(BASE, 'tramos'); os.makedirs(TRAMOS, exist_ok=True)
ENTRADA, COLA, FPS = 0.4, 1.0, 30

# (tipo, fuente, título, narración). Cifras medidas en contable19 (manual, capítulos 10-22).
SECUENCIA = [
	('img', 'v00_portada', 'Portada',
	 'Hola. En este resumen recorremos la nómina peruana para Odoo diecinueve Community, con datos de prueba ficticios y cifras medidas en una base real.'),
	('img', 'v01_que_es', 'Qué incluye',
	 'La localización se instala sobre la nómina comunitaria de Odoo y agrega lo peruano: parámetros legales con vigencia, maestros de SUNAT, '
	 'planilla mensual y semanal, gratificaciones, CTS, vacaciones y liquidación, el asiento contable y los archivos legales.'),
	('clip', 'a_menu', 'Menú Nómina PE',
	 'Todo está en la aplicación Nómina. El menú Nómina PE reúne los parámetros, los maestros de SUNAT, los seguros y EPS, '
	 'la planilla de sueldos, el pago a bancos, el PLAME, AFPnet y la contabilidad de nómina.'),
	('clip', 'b_parametros', 'Parámetros con vigencia',
	 'Los valores legales no están escritos en las reglas: cada parámetro tiene vigencias. Cuando la remuneración mínima subió a mil doscientos treinta soles en octubre de dos mil veintiséis, '
	 'bastó con agregar una fila. Lo mismo con la remuneración máxima asegurable, que cambia cada trimestre.'),
	('clip', 'c_empleado', 'Alta del trabajador',
	 'En la ficha del trabajador se registran los datos del T-Registro, la AFP con su CUSPP y el régimen de salud. El hijo menor genera la asignación familiar. '
	 'En el contrato se eligen la estructura mensual y el diario Planillas.'),
	('img', 'v02_ciclo', 'Ciclo del mes',
	 'Cada mes el ciclo es el mismo: revisar parámetros, registrar novedades, cargar asistencias, calcular y confirmar las boletas, y generar los archivos legales.'),
	('clip', 'd_boleta', 'Boleta, asiento y PDF',
	 'Esta es la boleta de diciembre de Lucía: cuatro mil quinientos de básico, ciento veintitrés de asignación familiar, los descuentos de la AFP y la renta de quinta, '
	 'y un neto de tres mil ochocientos veinticinco soles con noventa y seis céntimos. Al confirmar se genera el asiento en el diario Planillas y se imprime la boleta.'),
	('clip', 'e_lote', 'Lote mensual',
	 'Con un lote se generan las boletas de todos los trabajadores del mes y se confirman juntas. Las cifras coinciden al centavo con las calculadas una por una.'),
	('img', 'v03_orden', 'El orden importa',
	 'Una regla que evita errores: los acumulados solo leen boletas validadas. Primero el adelanto, luego gratificación, CTS y vacaciones, y al final la mensual.'),
	('clip', 'f_beneficios', 'Gratificación y CTS',
	 'La gratificación de julio paga el sueldo más la asignación familiar y la bonificación extraordinaria de nueve por ciento. '
	 'La CTS de noviembre incluye un sexto de la gratificación ya validada.'),
	('clip', 'g_vacaciones', 'Vacaciones',
	 'Las vacaciones se registran como una ausencia aprobada. En febrero Lucía gozó quince días: la mensual paga dos mil doscientos cincuenta, '
	 'la mitad del básico sobre un mes de treinta días, y la boleta de vacaciones paga los quince días.'),
	('clip', 'h_asistencias', 'Asistencias',
	 'Con el módulo de asistencias, el botón Cargar asistencias convierte las marcaciones en faltas y tardanzas, respetando la tolerancia configurada.'),
	('clip', 'i_plame', 'PLAME',
	 'El PLAME se genera en un clic desde las boletas validadas: remuneraciones, jornada y suspensiones, listos para importar en el PDT.'),
	('clip', 'j_rxh', 'Recibos por honorarios',
	 'Y los recibos por honorarios pagados en el mes se declaran en el PLAME de cuarta categoría, con su retención.'),
	('img', 'v04_alcance', 'Alcance',
	 'Para tener en cuenta: hoy no se cubren los subsidios, la exportación del T-Registro, la indemnización por despido ni los archivos de Scotiabank y Banco de la Nación.'),
	('img', 'v99_cierre', 'Cierre',
	 'Gracias por su tiempo. Cada paso está explicado en el manual de usuario. Escríbanos y agendamos una demostración con sus propios datos.'),
]


def correr(args):
	subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error'] + args, check=True)


def duracion(archivo):
	texto = subprocess.run([FFMPEG, '-i', archivo], capture_output=True, text=True).stderr
	h, m, s = re.search(r'Duration: (\d+):(\d+):([\d.]+)', texto).groups()
	return int(h) * 3600 + int(m) * 60 + float(s)


def intervalos_utiles(datos):
	"""Del clip se conserva [inicio, fin] menos los tramos de carga de página."""
	piezas, cursor = [], datos['inicio']
	for a, b in sorted(datos['cortes']):
		if b <= cursor or a >= datos['fin']:
			continue
		if a > cursor + 0.2:
			piezas.append((cursor, a))
		cursor = max(cursor, b)
	if datos['fin'] > cursor + 0.2:
		piezas.append((cursor, datos['fin']))
	return piezas


def marca_srt(s):
	ms = int(round(s * 1000))
	return f'{ms // 3600000:02d}:{ms % 3600000 // 60000:02d}:{ms % 60000 // 1000:02d},{ms % 1000:03d}'


def main():
	tiempos = json.load(open(os.path.join(BASE, 'tiempos.json')))
	escala = 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x1E2640,fps=30,format=yuv420p'
	lista, guion, subtitulos, t = [], [], [], 0.0
	for n, (tipo, fuente, titulo, texto) in enumerate(SECUENCIA):
		wav = os.path.join(TRAMOS, f'{n:02d}.wav')
		voz = sintetizar(texto, wav)
		mudo = os.path.join(TRAMOS, f'{n:02d}_mudo.mp4')
		if tipo == 'img':
			visual = 0.0
			correr(['-loop', '1', '-t', '1', '-i', os.path.join(BASE, 'slides', fuente + '.png'), '-vf', escala,
					'-c:v', 'libx264', '-preset', 'medium', '-crf', '20', mudo])
		else:
			partes = []
			for i, (a, b) in enumerate(intervalos_utiles(tiempos[fuente])):
				parte = os.path.join(TRAMOS, f'{n:02d}_{i}.mp4')
				correr(['-ss', f'{a:.2f}', '-to', f'{b:.2f}', '-i', os.path.join(BASE, tiempos[fuente]['archivo']),
						'-vf', escala, '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', parte])
				partes.append(parte)
			with open(os.path.join(TRAMOS, f'{n:02d}_lista.txt'), 'w') as f:
				f.writelines(f"file '{x}'\n" for x in partes)
			correr(['-f', 'concat', '-safe', '0', '-i', os.path.join(TRAMOS, f'{n:02d}_lista.txt'), '-c', 'copy', mudo])
			visual = duracion(mudo)
		dur = round(max(visual, ENTRADA + voz + COLA), 2)
		salida = os.path.join(TRAMOS, f'{n:02d}.mp4')
		# Congela el último cuadro si la voz dura más que el clip; voz con un respiro inicial
		correr(['-i', mudo, '-i', wav, '-filter_complex',
				f'[0:v]tpad=stop_mode=clone:stop_duration={dur:.2f},trim=0:{dur:.2f},fade=t=in:st=0:d=0.3,fade=t=out:st={dur - 0.3:.2f}:d=0.3,setpts=PTS-STARTPTS[v];'
				f'[1:a]adelay={int(ENTRADA * 1000)},apad,atrim=0:{dur:.2f},aresample=44100[a]',
				'-map', '[v]', '-map', '[a]', '-t', f'{dur:.2f}', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
				'-c:a', 'aac', '-b:a', '160k', '-ac', '2', salida])
		# Subtítulos: una línea por frase, repartidas según su largo
		frases = [x.strip() for x in re.split(r'(?<=[.:])\s+', texto) if x.strip()]
		cursor, total = t + ENTRADA, sum(len(x) for x in frases)
		for frase in frases:
			tramo = voz * len(frase) / total
			subtitulos.append((cursor, cursor + tramo, frase)); cursor += tramo
		guion.append({'n': n + 1, 'titulo': titulo, 'inicio': round(t, 2), 'fin': round(t + dur, 2), 'voz': round(voz, 1), 'texto': texto})
		print(f'{n + 1:2d} {titulo:26} voz {voz:5.1f}s visual {visual:5.1f}s tramo {dur:5.1f}s', flush=True)
		lista.append(salida); t += dur
	with open(os.path.join(TRAMOS, 'lista.txt'), 'w') as f:
		f.writelines(f"file '{x}'\n" for x in lista)
	final = os.path.join(BASE, 'Resumen_Nomina_Community.mp4')
	correr(['-f', 'concat', '-safe', '0', '-i', os.path.join(TRAMOS, 'lista.txt'), '-c', 'copy', '-movflags', '+faststart', final])
	with open(os.path.join(BASE, 'Resumen_Nomina_Community.srt'), 'w', encoding='utf-8') as f:
		for i, (a, b, frase) in enumerate(subtitulos, 1):
			f.write(f'{i}\n{marca_srt(a)} --> {marca_srt(b)}\n{frase}\n\n')
	json.dump(guion, open(os.path.join(BASE, 'guion.json'), 'w'), ensure_ascii=False, indent=1)
	print('total', round(t, 1), 's ->', final)


if __name__ == '__main__':
	main()
