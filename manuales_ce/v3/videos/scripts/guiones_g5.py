# Guiones del v3, grupo g5_cese: E14 (subsidios, cap. 23) y E16 (liquidación por cese, cap. 16).
# Cifras del manual v3, medidas en contable19 en noviembre de 2026 (casos SUBSIDIOS, NOMINA, INDEMNIZACION y DOCUMENTOS_CESE).
# Lo que solo tiene cifra en los criterios de un lote va en tarjeta, citando el lote.
REEMPLAZOS = {}
NUEVOS = []

# ---------------------------------------------------------------------- E14 · nota 3 (lotes 24, 27b, 28a, 28b, 43, 47, 54)
REEMPLAZOS['E14'] = {
    'id': 'E14', 'titulo': 'Subsidios: descanso médico y maternidad', 'capitulos': ['23'], 'caso': 'SUBSIDIOS',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'Cuando un trabajador está con descanso médico o con descanso por maternidad, la boleta separa lo que paga el empleador y lo que es subsidio de EsSalud. '
               'En este episodio vemos el descanso, el promedio, el derecho al subsidio y el cambio de año.',
    'escenas': [
        {'t': 'cap', 'img': 'c23_04_descanso_medico', 'rotulo': 'Descanso médico del 1 al 30 de noviembre de 2026',
         'focos': ['Accidente', 'Tiempo personal por enfermedad'],
         'voz': 'El descanso se registra como una ausencia, con el tipo Tiempo personal por enfermedad y las fechas del certificado: del uno al treinta de noviembre. '
                'Si la incapacidad viene de un accidente, común o de trabajo, se marca la casilla Accidente en la primera ausencia: entonces basta la afiliación para tener el subsidio.'},
        {'t': 'cap', 'img': 'c23_01_descanso_nov_calculo', 'rotulo': '20 días del empleador y 10 de subsidio',
         'focos': ['SUB_INC', '2,740.00'],
         'voz': 'Los primeros veinte días del año los paga el empleador como remuneración: [[S 2000]]. Los diez siguientes son subsidio por incapacidad, '
                'con un promedio diario de [[S 100]]: [[S 1000]]. El subsidio no paga ONP ni EsSalud: la ONP es [[S 260]] y el EsSalud [[S 180]], solo sobre la remuneración. '
                'El neto es [[S 2740]].'},
        {'t': 'tarjeta', 'ceja': 'El promedio diario', 'titulo': '12 meses ÷ los días de afiliación',
         'items': ['Con los 12 meses enteros, ÷ 360; el mes de ingreso cuenta sus días', 'Un mes entero sin goce entra con 0', 'Horas extras y trabajo en feriado: siempre',
                   'Monto en soles enteros', 'Sin ONP por defecto: 260,00 (390,00 con la opción «Sí»)'],
         'voz': 'El promedio suma las remuneraciones de los doce meses anteriores y las divide entre los días de afiliación: con los doce meses enteros, entre trescientos sesenta. '
                'Las horas extras y el trabajo en feriado entran siempre. El monto del subsidio se paga en soles enteros, y por defecto no se descuenta para la ONP: '
                'con la opción Sí, la ONP de este mes sería [[S 390]]. Todo se elige en la ficha de la compañía.'},
        {'t': 'cap', 'img': 'c23_05_promedios_fijados', 'rotulo': 'Ficha del trabajador › Promedios fijados del subsidio',
         'focos': ['Fijado por', '100.000000'],
         'voz': 'El promedio queda fijo hasta el alta. Se fija al validar la primera boleta de la contingencia, y se ve en la ficha del trabajador, pestaña Nómina PE. '
                'Esta trabajadora tiene dos contingencias, del doce de octubre y del uno de noviembre, con [[S 100]] diarios cada una.'},
        {'t': 'cap', 'img': 'c23_03_sin_derecho_aviso', 'rotulo': 'Sin los aportes que dan derecho',
         'focos': ['SUB_INC', 'Validada con avisos'],
         'voz': 'El subsidio exige tres meses de aportes consecutivos, o cuatro no consecutivos, en los seis meses anteriores. Este trabajador tiene uno solo. '
                'La boleta calcula el subsidio, [[S 1000]], y deja la nota: EsSalud no lo reembolsará. Si fue un accidente, se marca en la ausencia; '
                'y la compañía puede elegir que este control bloquee la validación.'},
        {'t': 'cap', 'img': 'c23_02_maternidad_nov_calculo', 'rotulo': 'Maternidad: noviembre entero subsidiado',
         'focos': ['SUB_MAT', '3,000.00'],
         'voz': 'En maternidad, el mes entero es subsidio: [[S 3000]], sin ONP, sin EsSalud y sin remuneración. En diciembre, con treinta y un días, son [[S 3100]].'},
        {'t': 'tarjeta', 'ceja': 'El cambio de año', 'titulo': 'Los 20 días del empleador vuelven el 1 de enero',
         'items': ['Si el 31/12 pagaba el empleador: sigue hasta completar los 20 días del año nuevo',
                   'Caso SUBSIDIOS: diciembre 17 días del empleador; enero 20 del empleador y 5 de subsidio (2 500,00 + 500,00)',
                   'Si el 31/12 ya era subsidio: enero sigue subsidiado (lotes 43 y 47)',
                   'Rige desde «Continuación del subsidio al año nuevo desde»'],
         'voz': 'Al cambiar de año, si el treinta y uno de diciembre todavía pagaba el empleador, en enero sigue pagando hasta completar los veinte días del año nuevo: '
                'en el caso, diecisiete días en diciembre y, en enero, veinte del empleador y cinco de subsidio, [[S 2500]] más [[S 500]]. '
                'Si el treinta y uno ya era subsidio, enero sigue subsidiado. Esa regla rige desde la fecha de la opción Continuación del subsidio al año nuevo desde.'},
        {'t': 'tarjeta', 'ceja': 'En el PLAME', 'titulo': 'Días por tipo y subsidio por mes',
         'items': ['.snl: 20|20 y 21|10, guardado al validar la boleta', '.rem: 0121 2 000,00 y 0916 1 000,00; maternidad 0915',
                   'Semanal que cruza de mes: el subsidio va a cada mes por sus días (lote 27b: 600 y 100)'],
         'voz': 'En el PLAME, el punto ese ene ele declara los días por tipo, y queda guardado al validar la boleta: una ausencia cambiada después ya no cambia un mes pagado. '
                'El punto rem lleva el cero novecientos dieciséis de incapacidad y el cero novecientos quince de maternidad. '
                'Y en una semanal que cruza de mes, el subsidio se reparte por los días de cada mes: en el ejemplo del lote, seiscientos a octubre y cien a noviembre.'},
    ],
    'cifra_clave': ('S/ 2 740,00', 'Noviembre con descanso médico: 2 000,00 de remuneración + 1 000,00 de subsidio − ONP 260,00 (caso SUBSIDIOS, 344 celdas).'),
    'cierre_titulo': 'Subsidios en la boleta y en el PLAME',
    'cierre': 'Algunos criterios, como el trabajo en feriado en el promedio o los veinte días del año nuevo, son criterios pendientes de confirmación de la contadora. '
              'Todo está en el capítulo veintitrés del manual.'}

# ---------------------------------------------------------------------- E16 · nota 2 (lotes 14, 20c, 21a, 22a a 23b, 26a, 32a, 32b, 35a, 41, 42a, 42b)
REEMPLAZOS['E16'] = {
    'id': 'E16', 'titulo': 'Liquidación por cese e indemnización', 'capitulos': ['16'], 'caso': 'NOMINA, INDEMNIZACION y DOCUMENTOS_CESE',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'Este episodio muestra cómo se cesa a un trabajador: el orden, las truncas, la indemnización por despido arbitrario, '
               'las vacaciones no gozadas y los documentos que se le entregan.',
    'escenas': [
        {'t': 'tarjeta', 'ceja': 'Antes de empezar', 'titulo': 'El orden del cese',
         'items': ['1. Valide las boletas del año, la mensual del cese incluida', '2. Cese desde el 15/07: valide antes la gratificación de julio',
                   '3. Calcule y valide la liquidación', '4. Entregue los documentos dentro de 48 horas'],
         'voz': 'La liquidación ajusta la renta de quinta de todo el año con las boletas validadas. Por eso se validan primero las boletas del año, y la liquidación al final. '
                'Si el cese es desde el quince de julio, la gratificación de julio se valida antes. Y los documentos se entregan dentro de las cuarenta y ocho horas del cese.'},
        {'t': 'cap', 'img': 'c16_03_contrato_despido', 'rotulo': 'Contrato: motivo de baja y despido arbitrario',
         'focos': ['Despido arbitrario', 'Fin pactado del'],
         'voz': 'En el contrato se pone la fecha de fin y el motivo de baja. Si es un despido sin causa justa, se marca Despido arbitrario; en un contrato modal, también el fin pactado.'},
        {'t': 'cap', 'img': 'c16_01_carmen_liquidacion_calculo', 'rotulo': 'Liquidación de Carmen, cese el 31/08/2026',
         'focos': ['1,666.67', '3,331.89'],
         'voz': 'Carmen renuncia el treinta y uno de agosto. Su liquidación paga vacaciones truncas por [[S 1666.67]], que pagan AFP y EsSalud; '
                'la gratificación trunca de [[S 833.33]], con su bonificación de [[S 75]]; y la CTS trunca de [[S 972.22]]. El neto es [[S 3331.89]].'},
        {'t': 'cap', 'img': 'c16_02_indemnizacion_calculo', 'rotulo': 'Indemnización por despido arbitrario: 18 575,00',
         'focos': ['18,575.00', '2,563.33'],
         'voz': 'Un trabajador de plazo indeterminado, desde el quince de marzo de dos mil veintidós, es despedido el treinta de abril. '
                'La indemnización es una remuneración y media por año, contada de fecha a fecha: [[S 18575]]. No paga aportes ni renta de quinta: '
                'la base de quinta son solo las truncas, [[S 2563.33]]. Sus vacaciones truncas, de un mes y dieciséis días desde el aniversario, son [[S 383.33]], y el neto es [[S 22588.50]].'},
        {'t': 'cap', 'img': 'c16_04_opciones_cese', 'rotulo': 'Compañía › Nómina PE - Controles',
         'focos': ['contratos modales', 'Avisar: se registran'],
         'voz': 'En la ficha de la compañía están las opciones del cese. La base de la indemnización suma las variables regulares; '
                'el contrato modal que pasa su plazo máximo se indemniza como indeterminado; y las vacaciones ganadas y no gozadas, por defecto, se avisan y se registran con una entrada.'},
        {'t': 'cap', 'img': 'c16_05_hoja_liquidacion', 'rotulo': 'Hoja de liquidación de beneficios sociales',
         'focos': ['11,250.00', '22,865.00'],
         'voz': 'Esta es la hoja de liquidación de un despido con dos récords sin gozar. Detalla cada beneficio con su periodo y su remuneración computable: '
                'las vacaciones no gozadas, [[S 6000]], la indemnización vacacional del récord vencido, [[S 3000]], y la indemnización por despido, [[S 11250]]. El neto es [[S 22865]].'},
        {'t': 'cap', 'img': 'c28_07_documentos_cese_imprimir', 'rotulo': 'Imprimir › los documentos del cese',
         'focos': ['Certificado de trabajo', 'Constancia de cese'],
         'voz': 'Desde la liquidación validada, Imprimir ofrece la hoja de liquidación, el certificado de trabajo y la constancia de cese para el retiro de la CTS. '
                'Enviar por correo los manda todos juntos, con la boleta.'},
        {'t': 'tarjeta', 'ceja': 'Otros casos del cese', 'titulo': 'Lo que la liquidación también resuelve',
         'items': ['Cese del 1 al 14/07: paga enero a junio como trunca (lote 22c)', 'Récord cumplido el día del cese: vacaciones no gozadas, no trunca (lote 42b)',
                   'Reingreso: toma el contrato del cese (lote 42a)', 'Segunda liquidación del mismo cese: avisa', 'Incentivo por cese: entrada INC_CESE_001 (lote 26a)'],
         'voz': 'La liquidación resuelve también otros casos: si el cese es en la primera quincena de julio, paga enero a junio como gratificación trunca; '
                'el récord que se cumple el día del cese se paga como vacaciones no gozadas; con un reingreso, toma el contrato del cese; '
                'una segunda liquidación del mismo cese avisa; y el incentivo por cese se ingresa con su propia entrada.'},
    ],
    'cifra_clave': ('S/ 18 575,00', 'Indemnización por despido arbitrario del caso INDEMNIZACION (70000351), fuera de la base de 5.ª.'),
    'cierre_titulo': 'Cese completo',
    'cierre': 'Varios criterios, como la remuneración de la gratificación trunca o la indemnización con un cambio de régimen, son criterios pendientes de confirmación de la contadora. '
              'Todo está en el capítulo dieciséis del manual.'}
