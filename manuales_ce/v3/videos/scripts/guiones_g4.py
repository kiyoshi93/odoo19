# Guiones del v3, grupo g4_beneficios: E09 (renta de 5.ª), E10 (vacaciones y feriados), E15 (gratificaciones y CTS),
# E22 (horas extra y utilidades) y el nuevo E29 (el no domiciliado y el convenio). Cifras del manual v3 (capítulos 13,
# 14, 15, 17, 18 y 20), medidas en contable19 el 09/11/2026. Solo capturas tomadas para el v3.
REEMPLAZOS = {}
NUEVOS = []

# ---------------------------------------------------------------------- E09 · nota 6
REEMPLAZOS['E09'] = {
    'id': 'E09', 'titulo': 'Renta de 5.ª categoría de punta a punta', 'capitulos': ['13'], 'caso': 'Lucía (recorrido), NOMINA, CONCEPTOS, CESE y EMPRESA_CONSULTORA',
    'modulos': ['base', 'ce', 'ce_demo', 'renta5'],
    'entrada': 'Este episodio sigue la renta de quinta categoría: la retención del mes, su detalle paso a paso, los ingresos extraordinarios, '
               'el trabajador no domiciliado, el cese y el certificado anual.',
    'escenas': [
        {'t': 'cap', 'img': 'c13_01_lucia_ene2025_calculo', 'rotulo': 'Lucía, enero de 2025', 'focos': ['BAR5_001', '192.48'],
         'voz': 'La regla de renta de quinta proyecta la renta del año y retiene la parte del mes. En enero de 2025, la base afecta de Lucía es [[S 4613]], '
                'sueldo más asignación familiar, y la retención del mes es [[S 192.48]].'},
        {'t': 'cap', 'img': 'c13_05_renta5_detalle_maria_jul2026', 'rotulo': 'Pestaña «Renta de 5ta»: el cálculo paso a paso',
         'focos': ['Retencion de julio', '26,940.00'],
         'voz': 'Con el módulo del detalle de renta de quinta, cada boleta tiene la pestaña Renta de 5ta. En la mensual de julio de 2026 de María: '
                'remuneraciones proyectadas [[S 48000]], gratificaciones [[S 17440]], renta bruta [[S 65440]]. Menos siete UIT, la renta neta es [[S 26940]]. '
                'El impuesto del año es [[S 2155.20]], y entre el divisor de julio, ocho, la retención es [[S 269.40]]. El detalle sale del mismo cálculo de la regla: no puede diferir de la boleta.'},
        {'t': 'tarjeta', 'ceja': 'Ingresos extraordinarios y planillas adicionales', 'titulo': 'El impuesto del extraordinario va en el mes del pago',
         'items': ['Utilidades, gratificación extraordinaria y bonos: no se proyectan',
                   'CONCEPTOS: marzo retiene 6 716,25 + 6 000,00 = 12 716,25',
                   'Mensual y adicionales: una retención del mes, en cualquier orden',
                   'Descuento deducible (0707): reduce la base de 5.ª por defecto'],
         'voz': 'Las utilidades, la gratificación extraordinaria y los bonos de productividad son ingresos extraordinarios: no se proyectan, y el mes del pago retiene su impuesto. '
                'En el caso CONCEPTOS, con utilidades de veinte mil soles en marzo, la retención de marzo es [[S 6716.25]] más [[S 6000]]: [[S 12716.25]]. '
                'Con planillas adicionales, la retención del mes se calcula una vez y cada boleta retiene lo que falta, en cualquier orden.'},
        {'t': 'tarjeta', 'ceja': 'Opciones y registros nuevos', 'titulo': 'La semanal y los otros empleadores',
         'items': ['Renta de 5.ª en la planilla semanal: proporcional (por defecto), todo en la última o no retener',
                   'Obrero con 2 800 por semana: 329,17 en cada semanal de enero',
                   'Ficha › Nómina PE › Renta de 5.ª de otros empleadores',
                   'Empleador anterior acreditado: julio retiene 539,45 en vez de 40,40'],
         'voz': 'La planilla semanal también retiene: por defecto, el impuesto del mes se reparte entre las semanales. Un obrero con [[S 2800]] por semana retiene [[S 329.17]] en cada una. '
                'Y en la ficha del trabajador se registran las rentas de otros empleadores, con su acreditación: con un empleador anterior, la retención de julio del ejemplo pasa de [[S 40.40]] a [[S 539.45]].'},
        {'t': 'cap', 'img': 'c13_06_renta5_no_domiciliado_s2', 'rotulo': 'El no domiciliado: 30 % de lo que percibe', 'focos': ['436.00'],
         'voz': 'El trabajador no domiciliado retiene el [[P 30]] de lo que percibe, sin las siete UIT ni la escala, y cada boleta retiene lo suyo. '
                'En la gratificación de julio de este consultor venezolano, el treinta por ciento de lo percibido, menos lo ya retenido, da [[S 436]]. El episodio veintinueve lo explica completo.'},
        {'t': 'cap', 'img': 'c13_02_cese_devolucion_calculo', 'rotulo': 'Caso CESE: devolución de retención', 'focos': ['DEV5_001', '2,158.67'],
         'voz': 'Al cese, la liquidación hace el ajuste final del ejercicio con lo realmente ganado. En el caso CESE, la liquidación de abril de 2026 devuelve [[S 2158.67]] retenidos de más, y el neto es [[S 13132]]. '
                'Un incentivo por cese está gravado por defecto; con la marca del contrato, es inafecto hasta la indemnización.'},
        {'t': 'cap', 'img': 'c13_04_certificado_renta5_lucia_2025', 'rotulo': 'Certificado de 5.ª de Lucía, ejercicio 2025', 'focos': ['2,309.73'],
         'voz': 'El certificado anual de Lucía de 2025: renta bruta [[S 65412.34]], deducción de siete UIT [[S 37450]], renta neta [[S 27962.34]], '
                'y un impuesto igual a lo retenido: [[S 2309.73]]. Ahora muestra también las rentas acreditadas de otros empleadores.'},
    ],
    'cifra_clave': ('S/ 269,40', 'Retención de julio de 2026 de María: 2 155,20 ÷ 8, en la pestaña «Renta de 5ta» (caso NOMINA).'),
    'cierre_titulo': 'Retención, detalle, cese y certificado',
    'cierre': 'La devolución al cese va en la liquidación, y la proyección de un mes con subsidio usa la remuneración del mes: este último es un criterio pendiente de confirmación. '
              'Todo está en el capítulo trece del manual.'}

# ---------------------------------------------------------------------- E10 · notas 2 y 3
REEMPLAZOS['E10'] = {
    'id': 'E10', 'titulo': 'Vacaciones y feriados', 'capitulos': ['17', '18'], 'caso': 'Lucía (recorrido), NOMINA y FERIADOS',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'Este episodio muestra cómo se registran y se pagan las vacaciones, qué cambia con el adelanto y con el cese, y cómo se pagan los feriados.',
    'escenas': [
        {'t': 'cap', 'img': 'c17_03_asignaciones', 'rotulo': 'Asignaciones de vacaciones', 'focos': ['Devengo mensual'],
         'voz': 'Los días ganados se registran como asignaciones, con el plan de devengo mensual: dos días y medio por mes. En noviembre de 2026, Lucía tiene cincuenta y cinco días y Héctor, cincuenta.'},
        {'t': 'cap', 'img': 'c17_04_ausencias', 'rotulo': 'El goce: una ausencia aprobada',
         'voz': 'El goce se registra como una ausencia aprobada del mismo tipo: Lucía, del dos al dieciséis de febrero de 2026, y Héctor, del catorce al veintitrés de setiembre. '
                'Al validar la boleta, las suspensiones del mes quedan guardadas para el punto snl del PLAME.'},
        {'t': 'cap', 'img': 'c17_06_oscar_vac_jul2026_dias', 'rotulo': 'Vacacional: los días de goce', 'focos': ['VACPE100'],
         'voz': 'En el mes de goce se calculan dos boletas. La vacacional de Óscar paga los once días hábiles de vacaciones, del uno al quince de julio.'},
        {'t': 'cap', 'img': 'c17_07_oscar_nme_jul2026_dias', 'rotulo': 'Mensual: la misma línea, sin pagar', 'focos': ['VACPE100'],
         'voz': 'La mensual lleva la misma línea, sin marcar en Pagado: esos días ya los pagó la vacacional. Óscar recibe [[S 1500]] en cada boleta.'},
        {'t': 'cap', 'img': 'c17_01_lucia_vac_feb2026_calculo', 'rotulo': 'Lucía, vacacional de febrero de 2026', 'focos': ['VAC_001', '2,306.50'],
         'voz': 'La vacacional de Lucía paga [[S 2306.50]]: sueldo más asignación familiar, entre treinta, por quince días. Con la mensual de [[S 2250]] y la asignación familiar completa, el mes suma [[S 4669.50]]. '
                'La vacacional no retiene renta de quinta: lo hace la mensual.'},
        {'t': 'tarjeta', 'ceja': 'La remuneración vacacional y el adelanto', 'titulo': 'Lo nuevo de las vacaciones',
         'items': ['Variables regulares de los 6 meses anteriores: 1 583,33 con movilidad de 200 en 5 meses',
                   'Adelanto: a cuenta del récord en curso, con acuerdo escrito',
                   'Cese antes de cumplirlo: truncas 2 250,00 → 1 250,00',
                   'Valide las vacacionales en orden: aviso «vacaciones_orden»'],
         'voz': 'La remuneración vacacional suma el promedio de las variables regulares de los seis meses anteriores al goce: con una movilidad de doscientos soles en cinco meses, quince días pagan [[S 1583.33]]. '
                'Si el trabajador goza antes de cumplir su récord, es un adelanto: la vacacional lo avisa, porque requiere acuerdo escrito, y al cese esos días se restan de las truncas, '
                'de [[S 2250]] a [[S 1250]] en el ejemplo. Y si se valida una vacacional fuera de orden, la boleta lo avisa.'},
        {'t': 'tarjeta', 'ceja': 'Récords al cese y tiempo parcial', 'titulo': 'El año que se completa el día del cese',
         'items': ['Récord cumplido el día del cese: vacaciones no gozadas, 3 000,00 (0118)',
                   'Truncas de fecha a fecha desde el aniversario',
                   'Tiempo parcial: se calculan como a cualquiera, con aviso (criterio pendiente)'],
         'voz': 'Al cese, el año que se completa ese mismo día es un récord cumplido: va como vacaciones no gozadas, [[S 3000]], y no como trunca. Las truncas se cuentan de fecha a fecha desde el aniversario. '
                'Al trabajador a tiempo parcial se le calculan como a cualquiera, y la boleta avisa: es un criterio pendiente de confirmación.'},
        {'t': 'cap', 'img': 'c18_03_feriados_aparte', 'rotulo': 'Feriados aparte: 0115 y trabajo en feriado', 'focos': ['FER_001', 'TFER_001'],
         'voz': 'Los feriados se cargan cada año en Días festivos. Con la opción de declararlos aparte, la mensual paga la remuneración de feriados por separado: en el caso FERIADOS, en diciembre de 2026, '
                '[[S 300]] por tres feriados y [[S 2700]] de básica; el total no cambia. Quien trabajó ocho horas un feriado cobra además, con la entrada de trabajo en feriado, [[S 200]], con la sobretasa del cien por ciento.'},
    ],
    'cifra_clave': ('S/ 4 669,50', 'Febrero de 2026 de Lucía: vacacional 2 306,50 + mensual 2 250,00 + asignación familiar 113,00.'),
    'cierre_titulo': 'Dos boletas en el mes de goce',
    'cierre': 'Vacacional por los días de goce, mensual por el resto, las vacacionales en orden, y los feriados cargados antes de calcular. Está en los capítulos diecisiete y dieciocho del manual.'}

# ---------------------------------------------------------------------- E15 · notas 1 y 4
REEMPLAZOS['E15'] = {
    'id': 'E15', 'titulo': 'Gratificaciones y CTS', 'capitulos': ['14', '15'], 'caso': 'Lucía (recorrido), COMPUTABLE, EMPRESA_COMERCIO y EMPRESA_PEQUENA',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'Este episodio muestra la gratificación y la CTS: la remuneración computable con las variables, el vínculo continuo, el cese, el tiempo parcial y la constancia del depósito.',
    'escenas': [
        {'t': 'cap', 'img': 'c14_01_lucia_grati_jul2026_calculo', 'rotulo': 'Gratificación de julio de 2026', 'focos': ['GRATI_001', '5,028.17'],
         'voz': 'La gratificación de julio de Lucía paga el sueldo más la asignación familiar, [[S 4613]], y la bonificación extraordinaria del nueve por ciento, [[S 415.17]]. En total, [[S 5028.17]].'},
        {'t': 'tarjeta', 'ceja': 'Remuneración computable', 'titulo': 'Las variables regulares',
         'items': ['Regla marcada «Variable regular para la remuneración computable»',
                   'Regular: con importe en 3 meses del semestre; lo percibido ÷ 6',
                   'Comisiones de 1 800 en 3 meses: diciembre 3 300,00 (en 2 meses: 3 000,00)',
                   'Comisionista sin sueldo: el promedio, sin los 3 meses: 2 166,67'],
         'voz': 'La remuneración computable suma el promedio de las variables regulares: las horas extras, las comisiones y las demás reglas marcadas. Un concepto es regular si se pagó en tres meses del semestre. '
                'Con comisiones de mil ochocientos soles en tres meses, la gratificación de diciembre es [[S 3300]]; con dos meses, [[S 3000]]. '
                'Al comisionista sin sueldo se le promedia todo, sin los tres meses: [[S 2166.67]] en el caso EMPRESA_COMERCIO.'},
        {'t': 'tarjeta', 'ceja': 'El vínculo y el cese', 'titulo': 'Renovar no es cesar',
         'items': ['Renovación sin interrupción el 16/05: julio paga 3 000,00 (antes 500,00)',
                   'Cese del 01 al 14/07: la liquidación paga enero a junio',
                   'Cese desde el 15/12: diciembre completo, 3 000,00',
                   'Trunca: la remuneración del mes anterior al cese'],
         'voz': 'Un contrato renovado sin interrupción es el mismo vínculo: la gratificación de julio cuenta los seis meses, [[S 3000]], y no solo junio. Un cese liquidado sí cierra el vínculo, y la boleta del contrato nuevo lo avisa. '
                'Quien cesa del uno al catorce de julio cobra enero a junio en su liquidación; quien cesa desde el quince de diciembre cobra diciembre completo. La trunca usa la remuneración del mes anterior al cese.'},
        {'t': 'cap', 'img': 'c15_01_lucia_cts_nov2026_calculo', 'rotulo': 'CTS de noviembre de 2026', 'focos': ['CTS_001', '2,695.92'],
         'voz': 'La CTS de noviembre se calcula con la remuneración computable: sueldo, asignación familiar, variables regulares y un sexto de la gratificación ya validada. Lucía recibe [[S 2695.92]].'},
        {'t': 'cap', 'img': 'c15_02_liquidacion_deposito_cts', 'rotulo': 'Liquidación del depósito de CTS', 'focos': ['5,391.83'],
         'voz': 'La liquidación del depósito detalla la remuneración computable, [[S 5391.83]], el periodo de seis meses y el monto depositado. Los datos de la empresa y de la cuenta se ocultan en este video.'},
        {'t': 'cap', 'img': 'c15_03_constancia_cts_k9_divisor', 'rotulo': 'Ingreso a mitad de mes: el divisor por días', 'focos': ['3.5667', '466.67'],
         'voz': 'Con un ingreso el quince de julio, el periodo tiene tres meses y diecisiete días: las horas extras se dividen entre tres coma cinco seis seis siete, y no entre cuatro. '
                'Las variables suman [[S 70.09]], la computable es [[S 1570.09]] y la CTS, [[S 466.67]]. La constancia imprime el divisor con sus días.'},
        {'t': 'tarjeta', 'ceja': 'Tiempo parcial y pequeña empresa', 'titulo': 'Quién no tiene CTS y quién la tiene a la mitad',
         'items': ['Menos de 4 horas diarias: CTS 0,00 y aviso «tiempo_parcial»',
                   'Con «Tiempo parcial: CTS» = «Pagar»: 225,00',
                   'Pequeña empresa: gratificación 1 200,00 y CTS 650,00 con 2 400',
                   'Microempresa: sin gratificación ni CTS'],
         'voz': 'El trabajador a tiempo parcial, con menos de cuatro horas diarias según su horario, no tiene CTS: la boleta sale en cero y avisa. Si la empresa la paga por convenio, con la opción Pagar, son [[S 225]] en el ejemplo. '
                'En la pequeña empresa, una trabajadora con [[S 2400]] recibe media gratificación, [[S 1200]], y una CTS de quince días por año, [[S 650]].'},
    ],
    'cifra_clave': ('S/ 466,67', 'CTS de noviembre de 2025 de K9 (EMPRESA_COMERCIO): variables 250,00 ÷ 3,5667 = 70,09; computable 1 570,09.'),
    'cierre_titulo': 'Gratificación antes que CTS',
    'cierre': 'La CTS lee la gratificación validada: valide primero la gratificación. El vínculo continuo y la trunca de julio son criterios según la norma, pendientes de confirmación. Está en los capítulos catorce y quince del manual.'}

# ---------------------------------------------------------------------- E22 · nota 1
REEMPLAZOS['E22'] = {
    'id': 'E22', 'titulo': 'Horas extra, otras entradas y utilidades', 'capitulos': ['20'], 'caso': 'EMPRESA_COMERCIO, EMPRESA_PEQUENA y UTILIDADES_REPARTO',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'Este episodio muestra las horas extra y las demás entradas del mes, y el reparto de utilidades, que ahora queda guardado con su hoja de liquidación y su planilla.',
    'escenas': [
        {'t': 'cap', 'img': 'c20_02_entradas_lista', 'rotulo': 'Otras entradas de la boleta', 'focos': ['HE25_001', 'TARD_001'],
         'voz': 'Las horas extra y las tardanzas se registran en Otras entradas. Esta vendedora, con [[S 1800]] de sueldo, tiene diez horas extra al veinticinco por ciento, cuatro al treinta y cinco, y sesenta minutos de tardanza.'},
        {'t': 'cap', 'img': 'c20_02_entradas_calculo', 'rotulo': 'El cálculo: valor hora 7,50', 'focos': ['93.75', '1,926.75'],
         'voz': 'El valor hora es el sueldo entre treinta, entre las ocho horas de su jornada: [[S 7.50]]. Las horas extra suman [[S 93.75]] y [[S 40.50]], y la tardanza resta [[S 7.50]]. '
                'La base afecta es [[S 1926.75]] y el neto, [[S 1676.27]].'},
        {'t': 'tarjeta', 'ceja': 'Valor hora y movilidad', 'titulo': 'La jornada del trabajador decide el valor hora',
         'items': ['Sueldo ÷ 30 ÷ las horas diarias del horario del contrato',
                   '48 h en 5 días: 10,42 la hora; 4 horas diarias: 25,00',
                   'MOVL_001, libre disposición: remuneración (0908)',
                   'MOV_001, supeditada a la asistencia: sin aportes, sí 5.ª (0909)'],
         'voz': 'El valor hora divide entre las horas diarias de la jornada de cada trabajador, no siempre entre ocho: revise que el horario del contrato sea el real. '
                'Y hay dos movilidades: la de libre disposición es remuneración y paga aportes; la supeditada a la asistencia no paga aportes, pero sí renta de quinta.'},
        {'t': 'cap', 'img': 'c20_01_reparto_utilidades', 'rotulo': 'Reparto de utilidades › Calcular un ejercicio', 'focos': ['Calcular reparto'],
         'voz': 'El reparto se calcula con Calcular un ejercicio: el año, la renta neta y el porcentaje según la actividad. Reparte la mitad por días laborados y la mitad por remuneraciones, con tope de dieciocho remuneraciones.'},
        {'t': 'tarjeta', 'ceja': 'Qué cuenta y quién reparte', 'titulo': 'Días, remuneraciones y el umbral de 20 trabajadores',
         'items': ['Remuneraciones: reglas «¿Aplica para utilidades?»; las tardanzas restan',
                   'Días: la jornada, menos las ausencias; maternidad y accidente de trabajo cuentan',
                   'Microempresa: fuera del reparto por defecto',
                   '20 trabajadores o menos: reparte y avisa (pequeña empresa: 6 en promedio, 5 000,00)'],
         'voz': 'Cuentan las remuneraciones de las reglas marcadas para utilidades y los días de jornada, menos las ausencias; la maternidad y el descanso por accidente de trabajo sí cuentan. '
                'La microempresa queda fuera por defecto. Y si la empresa tuvo veinte trabajadores o menos, el reparto avisa: en la pequeña empresa del laboratorio, seis en promedio, reparte [[S 5000]] y lo advierte.'},
        {'t': 'cap', 'img': 'c20_03_reparto_guardado', 'rotulo': 'El reparto guardado y confirmado', 'focos': ['11,104.17', 'Vigente al cierre'],
         'voz': 'El reparto queda guardado, uno por ejercicio. En este, [[S 250000]] entre tres trabajadores; el tope usa la remuneración vigente al cierre con la asignación familiar. '
                'Uno llega al tope de [[S 54000]], y el remanente de [[S 11104.17]] va al FONDOEMPLEO. La ex trabajadora está marcada y se le paga fuera de la planilla.'},
        {'t': 'tarjeta', 'ceja': 'Del reparto al pago', 'titulo': 'Planilla de utilidades y hoja de liquidación',
         'items': ['Confirmar y «Generar la planilla de utilidades»',
                   'Renta de 5.ª del pago: 5 215,60 y 15 936,53',
                   'Antes de la declaración anual: UTIL_ANT_001 (0910); después: UTIL_001 (0911)',
                   'Hoja de liquidación de utilidades, por correo con la boleta'],
         'voz': 'Confirmado el reparto, Generar la planilla de utilidades crea una boleta por trabajador con contrato. Las utilidades no pagan aportes, pero retienen renta de quinta en el mes del pago: [[S 5215.60]] y [[S 15936.53]] en el ejemplo. '
                'Con la fecha de la declaración anual, el sistema elige el código del PLAME. Y desde cada línea se imprime la hoja de liquidación de utilidades.'},
    ],
    'cifra_clave': ('S/ 11 104,17', 'Remanente por topes del reparto 2031 (caso UTILIDADES_REPARTO): va al FONDOEMPLEO.'),
    'cierre_titulo': 'Criterios pendientes',
    'cierre': 'Cómo se cuentan los trabajadores para el umbral de veinte y el tope del comisionista sin sueldo son criterios pendientes de confirmación. Lo demás está en el capítulo veinte del manual.'}

# ---------------------------------------------------------------------- E29 · nuevo · nota 6
NUEVOS.append({
    'id': 'E29', 'titulo': 'El no domiciliado y el convenio para evitar la doble tributación', 'capitulos': ['13', '8', '27', '29'], 'caso': 'EMPRESA_CONSULTORA',
    'modulos': ['base', 'ce', 'ce_demo', 'renta5'],
    'entrada': 'Un trabajador extranjero que no es domiciliado retiene el treinta por ciento de lo que percibe. Si viene de la Comunidad Andina, retiene como un domiciliado. '
               'Lo vemos con dos consultores con los mismos datos: uno de Venezuela y uno de Colombia.',
    'escenas': [
        {'t': 'tarjeta', 'ceja': 'Ley del Impuesto a la Renta, arts. 7 b y 54', 'titulo': '¿Quién es no domiciliado?',
         'items': ['El extranjero que no pasó más de 183 días en el Perú en 12 meses',
                   'La condición cambia el 1 de enero',
                   'Retención: 30 % de lo percibido, sin 7 UIT ni escala',
                   'Comunidad Andina (Bolivia, Colombia, Ecuador): 7 UIT y escala'],
         'voz': 'Es no domiciliado el extranjero que no pasó más de ciento ochenta y tres días en el Perú en doce meses, y la condición cambia el uno de enero. '
                'Su retención es el treinta por ciento de lo que percibe, sin las siete UIT y sin la escala. Pero si al contratarlo residía en Bolivia, Colombia o Ecuador, '
                'la Decisión quinientos setenta y ocho de la Comunidad Andina le da el trato de un domiciliado.'},
        {'t': 'cap', 'img': 'c08_18_contrato_no_domiciliado', 'rotulo': 'Contrato: la marca y el convenio', 'focos': ['No domiciliado', 'Comunidad Andina'],
         'voz': 'En el contrato hay dos campos: No domiciliado, y Convenio para evitar la doble tributación, de la Tabla veinticinco. Este consultor colombiano tiene la marca y el convenio tres, Comunidad Andina. '
                'Decide la residencia, no la nacionalidad: conviene guardar el sustento.'},
        {'t': 'cap', 'img': 'c13_08_s2_jun2026_calculo', 'rotulo': 'Venezuela, sin convenio: junio de 2026', 'focos': ['R5TA_001', '4,560.00'],
         'voz': 'El consultor venezolano gana [[S 8000]] desde el cuatro de mayo. En junio paga su ONP de [[S 1040]] y retiene el treinta por ciento: [[S 2400]]. El neto es [[S 4560]].'},
        {'t': 'cap', 'img': 'c13_06_renta5_no_domiciliado_s2', 'rotulo': 'Cada boleta retiene lo suyo', 'focos': ['436.00'],
         'voz': 'Cada boleta retiene el treinta por ciento de lo percibido desde que rige la marca, menos lo ya retenido. Su gratificación de julio retiene [[S 436]]. '
                'Así el orden de validación no cambia el total, y la liquidación no hace ajuste ni devuelve.'},
        {'t': 'cap', 'img': 'c13_07_renta5_andino_s5_jun2026', 'rotulo': 'Colombia, convenio 3: con la escala', 'focos': ['278.03', '27,673.33'],
         'voz': 'El consultor colombiano, con los mismos datos, retiene como un domiciliado: proyección, siete UIT y escala. Su renta neta es [[S 27673.33]] y junio retiene [[S 278.03]], no dos mil cuatrocientos. '
                'Su gratificación de julio no lleva retención.'},
        {'t': 'cap', 'img': 'c13_09_plame_toc_consultora', 'rotulo': 'PLAME: el archivo punto toc', 'focos': ['Lineas .toc'],
         'voz': 'En el PLAME, la retención va al cero seis cero cinco, como siempre. El ZIP lleva además el archivo punto toc, con una línea por no domiciliado: dos en junio, el venezolano y el colombiano, '
                'los dos con Domiciliado igual a dos. Sin no domiciliados, no hay punto toc.'},
        {'t': 'tarjeta', 'ceja': 'T-Registro, certificado y avisos', 'titulo': 'Lo que declara y lo que avisa',
         'items': ['T-Registro: el campo 22 del .tra lleva el convenio (3 para el colombiano)',
                   'Certificado de 5.ª: la renta al 30 % aparte',
                   'Avisos: 183 días al 31/12, extranjero sin la marca, país andino al 30 %',
                   'Japón: sin código en la Tabla 25, va con «0»'],
         'voz': 'En el T-Registro, el campo veintidós de los datos del trabajador lleva el convenio: tres para el colombiano. El certificado de quinta separa la renta al treinta por ciento. '
                'Y la boleta avisa: si por la fecha de ingreso pasaría los ciento ochenta y tres días, si un extranjero no tiene la marca, o si un trabajador de un país andino está retenido al treinta por ciento.'},
    ],
    'cifra_clave': ('S/ 278,03', 'Retención de junio de 2026 del consultor colombiano con el convenio de la CAN; el venezolano, sin convenio, retiene 2 400,00 (30 %).'),
    'cierre_titulo': 'El 30 % o la escala',
    'cierre': 'El trabajo en el exterior, la salida del país a mitad de año y la devolución al andino en el cese son criterios pendientes de confirmación. Todo está en el capítulo trece del manual.'})
