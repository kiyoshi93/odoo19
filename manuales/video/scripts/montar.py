# Monta el video resumen (sin audio) y el guion de narración con marcas de tiempo.
import json
import os
import subprocess

import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
BASE = os.path.dirname(os.path.abspath(__file__))
TRAMOS_DIR = os.path.join(BASE, 'tramos')
os.makedirs(TRAMOS_DIR, exist_ok=True)
PALABRAS_POR_SEG = 2.3  # ritmo de narración pausado en español

# (tipo, fuente, título, texto de narración)
SECUENCIA = [
    ('img', 'slides/v00_portada.png', 'Portada',
     'Hola. Les comparto el resumen de nuestra primera sesión de soporte sobre la nómina peruana en Odoo diecinueve Enterprise. '
     'En unos minutos repasamos lo que vimos en su propia base, con datos de prueba ficticios.'),
    ('img', 'slides/04_modulos.png', 'Lo que compraron',
     'Ustedes adquirieron dos piezas que trabajan juntas: la nómina Enterprise y la facturación electrónica. '
     'Las dos escriben en la misma contabilidad: cada boleta validada genera su asiento en el diario de salarios, '
     'y cada recibo por honorarios se registra como factura de proveedor tipo cero dos, que luego alimenta el PLAME.'),
    ('img', 'slides/05_ciclo.png', 'El ciclo de cada mes',
     'Cada mes el ciclo es el mismo: revisar parámetros como la remuneración mínima y la remuneración máxima asegurable; '
     'registrar las novedades, como altas, bajas y vacaciones aprobadas; completar asistencias; '
     'calcular y validar los recibos; publicar asientos e imprimir boletas; y, al final, generar los archivos legales.'),
    ('clip', 'a_menu', 'Demo: menú Nómina PE',
     'En la aplicación Nómina, el tablero muestra advertencias útiles, como trabajadores sin cuenta bancaria. '
     'El menú Nómina PE reúne todo lo de la localización: parámetros legales, maestros de SUNAT, seguros, '
     'los reportes de planilla, PLAME, AFPnet y pago a bancos, y la contabilidad de nómina.'),
    ('clip', 'b_empleado', 'Demo: alta de un trabajador',
     'La ficha del trabajador tiene todo lo necesario. En la pestaña Personal van el DNI, la fecha de nacimiento '
     'y las cuentas bancarias de sueldo y de CTS. En Nómina PE se registran los datos del T-Registro, la AFP con su CUSPP, '
     'el régimen de salud y la EPS. Los hijos menores de dieciocho años generan automáticamente la asignación familiar. '
     'Y en la pestaña Nómina se indica la fecha de inicio del contrato, el sueldo y la categoría de pago.'),
    ('clip', 'c_recibo', 'Demo: recibo, asiento y boleta',
     'Este es el recibo de julio de Carlos. En el cálculo se ven los ingresos, los aportes a la AFP, EsSalud, la EPS, SENATI '
     'y el neto a pagar: tres mil ciento cuarenta y nueve soles con nueve céntimos, el mismo valor que espera el caso de prueba de la localización. '
     'Al validar, Odoo genera el asiento contable con las cuentas del plan contable general empresarial, '
     'y con el botón imprimir se obtiene la boleta de pago de remuneraciones.'),
    ('img', 'slides/09_orden.png', 'El orden dentro del mes',
     'Una regla que evita muchos errores: el orden dentro del mes. Primero el adelanto quincenal, luego la gratificación, '
     'después las vacaciones y al final la planilla mensual. Cada paso se valida antes del siguiente, '
     'porque el descuento del adelanto, la renta de quinta y la CTS solo leen recibos validados.'),
    ('clip', 'd_vacaciones', 'Demo: vacaciones y faltas',
     'Las vacaciones se registran como una ausencia aprobada. Aquí, Jorge tuvo dos faltas y tres días de vacaciones en septiembre. '
     'La remuneración básica descuenta los días calendario sobre un mes de treinta días, como indica el decreto legislativo setecientos trece: '
     'novecientos cuarenta y uno con sesenta y siete.'),
    ('clip', 'e_plame', 'Demo: PLAME',
     'Los archivos para el PDT PLAME se generan en un clic: se elige el mes y Odoo arma el archivo comprimido con remuneraciones, '
     'jornada y el anexo de cuarta categoría, listo para importar.'),
    ('clip', 'f_rxh', 'Demo: recibos por honorarios',
     'Los recibos por honorarios se registran en contabilidad, con la retención de ocho por ciento cuando corresponde. '
     'El exportador declara los recibos pagados en el mes y genera los archivos de cuarta categoría.'),
    ('img', 'slides/13_recomendaciones.png', 'Recomendaciones',
     'Antes de salir en vivo les recomendamos: validar el archivo del banco antes del primer pago, '
     'procesar gratificación y CTS con recibos individuales, regenerar las entradas de trabajo antes de calcular el mes, '
     'mantener al día los parámetros y feriados, y hacer la primera nómina en paralelo con su planilla actual.'),
    ('img', 'slides/14_cierre-mes.png', 'Cierre mensual',
     'Y esta es la lista del cierre mensual en diez pasos. La encontrarán con más detalle en el manual de usuario.'),
    ('img', 'slides/v99_cierre.png', 'Cierre',
     'Gracias por su tiempo. En las próximas sesiones trabajaremos con sus propios datos: carga de trabajadores, '
     'una nómina en paralelo y los archivos legales.'),
]


def correr(args):
    subprocess.run([FFMPEG, '-y', '-hide_banner', '-loglevel', 'error'] + args, check=True)


def duracion_lectura(texto):
    return len(texto.split()) / PALABRAS_POR_SEG


def intervalos_utiles(datos):
    """Del clip se conserva [inicio, fin] menos los tramos de carga."""
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


def main():
    tiempos = json.load(open(os.path.join(BASE, 'tiempos.json')))
    escala = 'scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x1E2640,fps=30,format=yuv420p'
    lista, guion, t = [], [], 0.0
    for n, (tipo, fuente, titulo, texto) in enumerate(SECUENCIA):
        salida = os.path.join(TRAMOS_DIR, f'{n:02d}.mp4')
        if tipo == 'img':
            dur = round(duracion_lectura(texto) + 2.0, 1)
            correr(['-loop', '1', '-t', str(dur), '-i', os.path.join(BASE, fuente),
                    '-vf', escala + f',fade=t=in:st=0:d=0.4,fade=t=out:st={dur - 0.4}:d=0.4',
                    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', salida])
        else:
            datos = tiempos[fuente]
            partes = []
            for i, (a, b) in enumerate(intervalos_utiles(datos)):
                parte = os.path.join(TRAMOS_DIR, f'{n:02d}_{i}.mp4')
                correr(['-ss', f'{a:.2f}', '-to', f'{b:.2f}', '-i', os.path.join(BASE, datos['archivo']),
                        '-vf', escala, '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', parte])
                partes.append(parte)
            lista_partes = os.path.join(TRAMOS_DIR, f'{n:02d}_lista.txt')
            with open(lista_partes, 'w') as f:
                f.writelines(f"file '{x}'\n" for x in partes)
            union = os.path.join(TRAMOS_DIR, f'{n:02d}_union.mp4')
            correr(['-f', 'concat', '-safe', '0', '-i', lista_partes, '-c', 'copy', union])
            dur = float(subprocess.run([FFMPEG, '-i', union], capture_output=True, text=True).stderr.split('Duration: ')[1].split(',')[0].split(':')[-1]) \
                + 60 * int(subprocess.run([FFMPEG, '-i', union], capture_output=True, text=True).stderr.split('Duration: ')[1].split(':')[1])
            extra = max(0.0, duracion_lectura(texto) + 2.5 - dur)  # congela el último cuadro si falta tiempo
            dur += extra
            correr(['-i', union, '-vf', f'tpad=stop_mode=clone:stop_duration={extra:.2f},fade=t=in:st=0:d=0.3,fade=t=out:st={dur - 0.3:.2f}:d=0.3',
                    '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', salida])
        lectura = duracion_lectura(texto)
        guion.append({'n': n + 1, 'titulo': titulo, 'inicio': t, 'fin': t + dur, 'texto': texto,
                      'lectura': round(lectura, 1), 'holgura': round(dur - lectura, 1)})
        t += dur
        lista.append(salida)
    with open(os.path.join(TRAMOS_DIR, 'lista.txt'), 'w') as f:
        f.writelines(f"file '{x}'\n" for x in lista)
    final = os.path.join(BASE, 'Resumen_Nomina_Enterprise_Sesion1.mp4')
    correr(['-f', 'concat', '-safe', '0', '-i', os.path.join(TRAMOS_DIR, 'lista.txt'), '-c', 'copy', '-movflags', '+faststart', final])
    json.dump(guion, open(os.path.join(BASE, 'guion.json'), 'w'), ensure_ascii=False, indent=1)
    for g in guion:
        print(f"{g['n']:2d} {g['inicio']:6.1f}-{g['fin']:6.1f} lectura {g['lectura']:5.1f}s holgura {g['holgura']:5.1f}s  {g['titulo']}")
    print('total', round(t, 1), 's ->', final)


if __name__ == '__main__':
    main()
