# Guiones del grupo g3_el_mes (capítulos 10, 11, 12, 19, 21, 22 y 25): E06, E07, E08, E11, E12 y E13, que se regraban con las
# versiones del v3. Solo capturas del v3 (tomadas o rehechas el 09/11/2026 con scripts/capturas_g3_el_mes.js y las de otros
# grupos). Cifras: las del manual v3 (casos del laboratorio en contable19).
REEMPLAZOS = {}

# ---------------------------------------------------------------------- E06
REEMPLAZOS['E06'] = {
    'id': 'E06', 'titulo': 'La boleta: cálculo, avisos, impresión y asiento', 'capitulos': ['10', '26'], 'caso': 'BOLETA, CONCEPTOS y EMPRESA_COMERCIO',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'Este episodio sigue una boleta de punta a punta: cómo se crea, qué calcula, qué avisa, cómo se imprime y qué asiento genera.',
    'escenas': [
        {'t': 'cap', 'img': 'c10_04_boleta_nueva', 'rotulo': 'Boleta nueva: trabajador y periodo',
         'focos': ['WORK100'],
         'voz': 'En Nóminas del empleado, Nuevo: se elige el trabajador y el periodo. La boleta toma el contrato y la estructura, propone el nombre en español '
                'y los días laborados: veintitrés días y ciento ochenta y cuatro horas.'},
        {'t': 'cap', 'img': 'c10_01_calculo', 'rotulo': 'Cálculo de diciembre de 2026 (caso BOLETA)',
         'focos': ['ASF_001', 'Neto a pagar'],
         'voz': 'Al calcular aparecen las líneas: remuneración de [[S 4500]], asignación familiar de [[S 123]], los aportes a la AFP, EsSalud, SENATI '
                'y el neto a pagar: [[S 4025.70]]. La asignación familiar mira la edad del hijo en el mes que se paga, no la de hoy.'},
        {'t': 'cap', 'img': 'c10_06_conceptos_vales', 'rotulo': 'Conceptos del mes: los vales van fuera del neto',
         'focos': ['PRALI_001', 'PRALI_EN'],
         'voz': 'Los conceptos del mes se ingresan como entradas: alimentación, comisiones, bonificaciones, bonos, vales. Los vales de alimentos no se pagan por banco: '
                'la línea de prestaciones entregadas los saca del neto. En el caso CONCEPTOS, [[S 150]] de vales, y un neto de [[S 5097.50]].'},
        {'t': 'cap', 'img': 'c10_07_aviso_rmv', 'rotulo': 'Aviso: sueldo menor que la remuneración mínima',
         'focos': ['remuneracion minima'],
         'voz': 'Antes de validar, la banda amarilla avisa lo que conviene revisar. Aquí, un sueldo de [[S 1200]] en octubre, cuando la remuneración mínima ya es [[S 1230]]. '
                'El aviso no bloquea. Con trabajo nocturno, compara con la mínima más el treinta y cinco por ciento.'},
        {'t': 'tarjeta', 'ceja': 'Avisos con código', 'titulo': 'Lo que la boleta avisa',
         'items': ['rmv y rmv_nocturna: sueldo bajo la mínima', 'sin_tipo: la estructura no entra en las salidas',
                   'computable: el detalle de las variables regulares', 'valor_hora: horario de más de 48 horas'],
         'voz': 'Cada aviso tiene un código. Los más frecuentes: la remuneración mínima, la estructura sin tipo de planilla, el detalle de la remuneración computable '
                'y el horario de más de cuarenta y ocho horas. Varios quedan en el historial al validar. La lista completa está en el capítulo veintiséis.'},
        {'t': 'cap', 'img': 'c10_02_boleta_impresa', 'rotulo': 'Boleta de Pago de Remuneraciones',
         'focos': ['NETO A PAGAR', 'SOLES'],
         'voz': 'La boleta impresa muestra treinta y un días laborados, ingresos por [[S 4623.00]], descuentos por [[S 597.30]] y aportes del empleador por [[S 450.74]]. '
                'Los importes llevan coma de miles, y el monto en letras dice soles, en plural.'},
        {'t': 'cap', 'img': 'c10_03_asiento', 'rotulo': 'Asiento: 5 671,04 al debe y al haber',
         'focos': ['PLLA/2026/12/0373'],
         'voz': 'Al confirmar, la boleta genera su asiento en el diario Planillas. Suma [[S 5671.04]] al debe y al haber, y el saldo de la cuenta cuatro uno uno uno '
                'del trabajador es igual al neto de la boleta.'},
    ],
    'cifra_clave': ('S/ 4 025,70', 'Neto de diciembre de 2026 del caso BOLETA: igual en el cálculo, en la boleta impresa y en la cuenta 4111 del asiento.'),
    'cierre_titulo': 'La boleta cuadra al centavo',
    'cierre': 'El caso BOLETA comprueba ciento sesenta y seis celdas: seis boletas que cuadran al centavo. Está en los capítulos diez y veintiséis del manual.'}

# ---------------------------------------------------------------------- E07
REEMPLAZOS['E07'] = {
    'id': 'E07', 'titulo': 'El lote mensual y las rectificativas', 'capitulos': ['11', '25'], 'caso': 'Recorrido de FM, ADICIONALES y escenario del manual',
    'modulos': ['base', 'ce'],
    'entrada': 'Este episodio muestra cómo procesar el mes con un lote, en qué orden se validan las boletas y cómo se corrige una boleta ya validada.',
    'escenas': [
        {'t': 'cap', 'img': 'c11_01_lotes', 'rotulo': 'Nómina › Procesamientos de nóminas',
         'focos': ['Planilla diciembre 2026'],
         'voz': 'Los lotes están en Procesamientos de nóminas. Cada lote agrupa las boletas de un periodo, nace con el diario Planillas y solo se ve en su compañía.'},
        {'t': 'cap', 'img': 'c11_02_lote_diciembre_fm', 'rotulo': 'Lote de diciembre de 2026, validado',
         'focos': ['Registrar pago', 'Compañía'],
         'voz': 'Con Generar nóminas se eligen los trabajadores y el lote crea y calcula sus boletas. Marcar como hecho las valida todas. '
                'Un lote no vuelve a calcular las boletas ya validadas, y desde aquí se registra el pago y se envían las boletas.'},
        {'t': 'tarjeta', 'ceja': 'Orden del mes', 'titulo': 'El lote valida en este orden',
         'items': ['Gratificación, vacaciones, CTS y planillas adicionales', 'Mensual y semanales', 'Liquidaciones al final'],
         'voz': 'Los acumulados solo leen boletas validadas. Por eso el lote valida primero la gratificación, las vacaciones, la CTS y las planillas adicionales; '
                'después la mensual y las semanales; y al final, las liquidaciones. Lo hace solo, también si se validan varias boletas juntas desde la lista.'},
        {'t': 'cap', 'img': 'c11_06_adicional_comisiones', 'rotulo': 'Planilla de comisiones: aportes del mes',
         'focos': ['COM_001', 'Neto a pagar'],
         'voz': 'Las comisiones pueden ir en su propia planilla adicional. En el caso ADICIONALES, la mensual de [[S 3000]] paga ONP de [[S 390]], '
                'y la planilla de comisiones de [[S 500]] paga [[S 65]]: la base mínima y los topes son del mes. El trabajador recibe un solo abono de [[S 3045]].'},
        {'t': 'cap', 'img': 'c10_06_conceptos_vales', 'rotulo': 'Una boleta validada no se edita: se rectifica',
         'focos': ['Rectificar'],
         'voz': 'Si una boleta validada tiene un error, no se edita: se rectifica con el botón Rectificar.'},
        {'t': 'tarjeta', 'ceja': 'Rectificar', 'titulo': 'Original, rectificativa y boleta nueva',
         'items': ['La rectificativa copia la original y resta en todos los reportes', 'Se concilia con la original: no se paga dos veces',
                   'Conserva el régimen pensionario y revierte las provisiones', 'Luego se calcula y valida la boleta correcta'],
         'voz': 'La rectificativa copia las líneas de la original y resta en el PLAME, AFPnet, bancos, la planilla y las utilidades. Se concilia con la original, '
                'conserva su régimen pensionario y revierte sus provisiones. En el ejemplo del manual, una mensual validada con [[S 2500]] se rectifica, '
                'y la boleta nueva de [[S 2700]] queda declarada una sola vez, con un neto de [[S 2349]].'},
    ],
    'cifra_clave': ('S/ 3 045,00', 'Un solo abono del mes: mensual 2 610,00 + planilla de comisiones 435,00 (caso ADICIONALES, 70001701).'),
    'cierre_titulo': 'Orden y rectificación',
    'cierre': 'Validar en orden y rectificar en lugar de editar mantiene los acumulados y los reportes correctos. Está en los capítulos once y veinticinco del manual.'}

# ---------------------------------------------------------------------- E08
REEMPLAZOS['E08'] = {
    'id': 'E08', 'titulo': 'Aportes: ONP, AFP, EsSalud, EPS, SCTR y SENATI', 'capitulos': ['12', '32'], 'caso': 'NOMINA, CONCEPTOS, SCTR, EMPRESA_CONSULTORA y EMPRESA_INDUSTRIA',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'Este episodio repasa los aportes y retenciones de la boleta, con los casos del laboratorio.',
    'escenas': [
        {'t': 'cap', 'img': 'c12_01_carlos_calculo', 'rotulo': 'Carlos: AFP Habitat y EPS',
         'focos': ['EPS_CRED_001', 'Neto a pagar'],
         'voz': 'Carlos está en la AFP Habitat y tiene EPS: la boleta calcula el aporte, la comisión y la prima de seguro, EsSalud de [[S 325.17]], el aporte a la EPS de [[S 162.59]] '
                'con su crédito de [[S 81.29]], y SENATI. Su neto es [[S 3149.09]].'},
        {'t': 'cap', 'img': 'c12_02_ana_calculo', 'rotulo': 'Ana: la prima se topa en la RMA',
         'focos': ['AFP_PRI'],
         'voz': 'Ana gana [[S 15000]]. La prima de seguro de la AFP se calcula hasta la remuneración máxima asegurable: sale [[S 173.62]].'},
        {'t': 'cap', 'img': 'c12_03_nilda_vac_calculo', 'rotulo': 'Nilda: EsSalud del mes 270,00',
         'focos': ['ESSALUD'],
         'voz': 'La base mínima de EsSalud, el tope de la prima, el crédito EPS y la Vida Ley se miran por mes, no por boleta. Nilda goza vacaciones todo julio: '
                'la vacacional de [[S 3000]] paga EsSalud por [[S 270]], el nueve por ciento del mes, y la mensual queda sin importes.'},
        {'t': 'tarjeta', 'ceja': 'Crédito EPS', 'titulo': 'El crédito EPS es del mes',
         'items': ['25 % del EsSalud del mes, con todas las boletas', 'Sueldo 3 000 y comisiones 1 000: −90,00', 'Tope de la empresa: 10 % de la UIT por cubierto', 'El plan cuenta solo mientras está vigente'],
         'voz': 'El crédito EPS se calcula con todas las boletas del mes: con un sueldo de tres mil y comisiones de mil, son [[S 90]], sin importar el orden. '
                'Si el crédito de la empresa pasa el diez por ciento de la UIT por trabajador cubierto, la boleta avisa. Y un plan vencido ya no da aporte ni crédito.'},
        {'t': 'cap', 'img': 'c12_05_sctr_lineas', 'rotulo': 'SCTR: una línea por entidad',
         'focos': ['SCTR_SA', 'SCTR_PE'],
         'voz': 'Con Cubierto por SCTR, la boleta lleva una línea por cobertura, con la tasa de la póliza de su entidad. Con la EPS al uno coma dos por ciento '
                'y una compañía al uno coma cero cinco, un sueldo de tres mil paga [[S 36]] y [[S 31.50]]. La gratificación no paga SCTR, salvo que la póliza lo exija.'},
        {'t': 'cap', 'img': 'c12_06_deducible_voluntarios', 'rotulo': 'Descuento deducible y aportes voluntarios',
         'focos': ['DESC_D', 'AFPV_001'],
         'voz': 'El descuento deducible baja la base de los aportes: con treinta, la base es [[S 2970]] y la AFP, [[S 297]]. Los aportes voluntarios a la AFP '
                'se descuentan del neto y van a AFPnet, sin reducir ninguna base.'},
        {'t': 'cap', 'img': 'c12_07_tiempo_parcial_s4', 'rotulo': 'Tiempo parcial: EsSalud con la base mínima',
         'focos': ['ESSALUD'],
         'voz': 'Una asistente a tiempo parcial, con [[S 500]] y tres horas diarias, paga ONP sobre lo que gana, [[S 65]], y su EsSalud se calcula sobre la remuneración mínima: [[S 101.70]].'},
        {'t': 'cap', 'img': 'c32_03_boleta_senati_i3', 'rotulo': 'SENATI: 0,75 % a cargo del empleador',
         'focos': ['SENATI'],
         'voz': 'En una empresa industrial, el SENATI es el cero coma setenta y cinco por ciento: [[S 18.71]] sobre una base de [[S 2494.79]]. '
                'Si el año anterior tuvo veinte trabajadores o menos, la boleta avisa. El detalle está en el capítulo treinta y dos.'},
    ],
    'cifra_clave': ('S/ 270,00', 'EsSalud del mes de Nilda (caso NOMINA): la base mínima y los topes se aplican al mes, no a cada boleta.'),
    'cierre_titulo': 'Aportes por mes',
    'cierre': 'Que el tope del crédito EPS se mida por trabajador es un criterio pendiente de confirmación de la contadora. Todo está en el capítulo doce del manual.'}

# ---------------------------------------------------------------------- E11
REEMPLAZOS['E11'] = {
    'id': 'E11', 'titulo': 'Asistencias: tardanzas, faltas y feriados', 'capitulos': ['19', '18'], 'caso': 'ASISTENCIA y FERIADOS',
    'modulos': ['asistencia', 'asistencia_demo', 'ce'],
    'entrada': 'Con el módulo de asistencias, las marcaciones se concilian con el horario y llegan a la boleta como faltas, tardanzas y trabajo en feriado. Veamos cómo.',
    'escenas': [
        {'t': 'cap', 'img': 'c19_01_ajustes_asistencias', 'rotulo': 'Compañía › Nómina PE - Asistencias',
         'focos': ['Tolerancia de', 'Pagar el trabajo en'],
         'voz': 'En la compañía se define la tolerancia de tardanza, diez minutos en este ejemplo, si las tardanzas se descuentan, si se concilia al calcular '
                'y, desde esta versión, si el trabajo en feriado se paga desde las asistencias. Por defecto, esa casilla está apagada.'},
        {'t': 'cap', 'img': 'c19_08_calendario_zona_horaria', 'rotulo': 'Horario en America/Lima',
         'focos': ['America/Lima', 'Promedio'],
         'voz': 'El horario de trabajo debe estar en la zona horaria America Lima: si queda en UTC, las tardanzas salen desplazadas cinco horas. '
                'Su promedio de horas por día es también el divisor del valor hora: con ocho horas, sueldo entre treinta, entre ocho.'},
        {'t': 'tarjeta', 'ceja': 'Caso ASISTENCIA', 'titulo': 'Tardanzas y faltas de setiembre de 2026',
         'items': ['Carlos: 3 tardanzas de 25 min; con 10 de tolerancia, 45 min: 10,94', 'Jorge: 2 faltas, básica 1 054,67',
                   'María: media jornada, básica 7 866,67', 'Óscar: vacaciones justificadas, básica 2 500,00'],
         'voz': 'Con Cargar asistencias, la boleta concilia las marcaciones del mes. Carlos llegó tres veces veinticinco minutos tarde: con diez de tolerancia, cuentan cuarenta y cinco minutos, '
                '[[S 10.94]] sobre [[S 3500]]. Jorge tiene dos faltas y su básica baja a [[S 1054.67]]. Con la evaluación por horas, la media jornada de María deja '
                '[[S 7866.67]]. Y las vacaciones de Óscar salen como justificadas.'},
        {'t': 'tarjeta', 'ceja': 'Feriados', 'titulo': 'El feriado no es falta',
         'items': ['Día no laborable del calendario, sin ausencia: feriado', 'Jorge, octubre de 2026: 21 días evaluados, 0 faltas, 1 feriado', 'Remuneración completa: 1 130,00'],
         'voz': 'El día no laborable del calendario cuenta como feriado: no es falta ni tardanza. En octubre, Jorge tiene veintiún días evaluados, cero faltas y un feriado, '
                'y su remuneración sale completa: [[S 1130]].'},
        {'t': 'cap', 'img': 'c18_03_feriados_aparte', 'rotulo': 'Trabajo en feriado: 8 horas al 100 %',
         'focos': ['TFER_001'],
         'voz': 'Si el trabajador marcó en un feriado y no tuvo descanso sustitutorio, se paga con el cien por ciento: con la casilla encendida, desde las asistencias; '
                'si no, con la entrada de trabajo en feriado. Ocho horas con un sueldo de tres mil pagan [[S 200]]: doce cincuenta por ocho, por dos.'},
    ],
    'cifra_clave': ('S/ 10,94', 'Tardanzas de Carlos en setiembre de 2026: 45 minutos de un sueldo de 3 500 con jornada de 8 horas (caso ASISTENCIA).'),
    'cierre_titulo': 'Lo que no sale de las asistencias',
    'cierre': 'El descanso semanal trabajado y un feriado en un día libre del horario no salen de las marcas: se ingresan a mano. Está en el capítulo diecinueve del manual.'}

# ---------------------------------------------------------------------- E12
REEMPLAZOS['E12'] = {
    'id': 'E12', 'titulo': 'Cambios de contrato dentro del mes', 'capitulos': ['21'], 'caso': 'AUMENTO',
    'modulos': ['base', 'ce'],
    'entrada': 'Un aumento a mitad de mes, un contrato nuevo, un ingreso o un cese cambian cómo se paga el mes. Este episodio muestra cómo lo resuelve la boleta.',
    'escenas': [
        {'t': 'cap', 'img': 'c21_01_aumento_oct_dias', 'rotulo': 'Una línea de días por versión',
         'focos': ['WORK100#2'],
         'voz': 'En Odoo diecinueve, un aumento se registra como una nueva versión del contrato. En el caso AUMENTO, el sueldo es de [[S 2000]] desde setiembre y de [[S 3000]] desde el 15 de octubre. '
                'La boleta de octubre lleva una línea de días por versión: diez días y doce días, en total veintidós días y ciento setenta y seis horas.'},
        {'t': 'cap', 'img': 'c21_01_aumento_oct_calculo', 'rotulo': 'Cada sueldo paga sus días',
         'focos': ['RB_001', 'Neto a pagar'],
         'voz': 'Cada sueldo paga sus días calendario: dos mil entre treinta por catorce, más tres mil entre treinta por dieciséis. La básica es [[S 2533.33]], '
                'con ONP de [[S 329.33]] y un neto de [[S 2204]].'},
        {'t': 'cap', 'img': 'c21_02_dos_contratos_oct_dias', 'rotulo': 'Dos contratos en el mismo mes',
         'focos': ['WORK100#2'],
         'voz': 'Con dos contratos en el mes, la boleta lleva una línea de días por contrato, y suma: [[S 2500]] de remuneración. En el PLAME, la jornada declara ciento setenta y seis horas una sola vez.'},
        {'t': 'tarjeta', 'ceja': 'Una parte del mes', 'titulo': 'Ingreso o cese: los días calendario del periodo',
         'items': ['Cese el 10/03, mensual del 01 al 10: 1 000,00', 'Ingreso el 20/03, mensual del 20 al 31: 1 200,00', 'Con un aumento a 3 600 el 26/03: 1 320,00', 'Dos mensuales en el mes suman 3 100: use una sola'],
         'voz': 'Una mensual que cubre solo una parte del mes paga los días calendario del periodo. Con un sueldo de tres mil, un cese el diez de marzo paga [[S 1000]] '
                'y un ingreso el veinte, [[S 1200]]; con un aumento dentro del periodo, cada sueldo paga sus días: [[S 1320]]. '
                'Dos mensuales del mismo mes no ajustan a treinta días: para cerrar el mes, use una sola. Es un criterio pendiente de confirmación de la contadora.'},
        {'t': 'tarjeta', 'ceja': 'Valor hora', 'titulo': 'Las horas, con el horario de la boleta',
         'items': ['Horas extras, feriado y tardanzas: el horario de la versión vigente al fin del mes', 'Si el aumento cambia el horario, revise el valor hora'],
         'voz': 'Las horas del mes, como las horas extras o las tardanzas, se valoran con el horario de la versión vigente al fin del periodo. Si el cambio de contrato trae otro horario, revise el valor hora.'},
    ],
    'cifra_clave': ('S/ 2 533,33', 'Básica de octubre con aumento el día 15: 2 000 / 30 × 14 + 3 000 / 30 × 16; 176 horas en el .jor (caso AUMENTO).'),
    'cierre_titulo': 'Un mes, varios sueldos',
    'cierre': 'Cada versión del contrato paga sus días, y el PLAME declara el mes una sola vez. Está en el capítulo veintiuno del manual.'}

# ---------------------------------------------------------------------- E13
REEMPLAZOS['E13'] = {
    'id': 'E13', 'titulo': 'Licencias sin goce, permisos y meses sin remuneración', 'capitulos': ['22'], 'caso': 'AUMENTO',
    'modulos': ['base', 'ce'],
    'entrada': 'Este episodio muestra las ausencias sin goce: una semana, un permiso de dos horas y un mes entero, y las opciones de la compañía para los meses con suspensiones.',
    'escenas': [
        {'t': 'cap', 'img': 'c22_07_ausencias_aumento', 'rotulo': 'Tres ausencias «Sin pagar» aprobadas',
         'focos': ['Sin pagar#3'],
         'voz': 'Las tres son ausencias del tipo Sin pagar, aprobadas: un permiso de dos horas el 17 de noviembre y una semana del 9 al 13, del mismo trabajador, y todo noviembre de una trabajadora.'},
        {'t': 'cap', 'img': 'c22_06_aumento_sin_goce_dias', 'rotulo': 'Semana sin goce y permiso: −5,25 días',
         'focos': ['SINGOCE100'],
         'voz': 'En la boleta, la semana y el permiso restan cinco coma veinticinco días, sin marcar en Pagado: el permiso de dos horas es un cuarto de día.'},
        {'t': 'cap', 'img': 'c22_06_aumento_sin_goce_calculo', 'rotulo': 'Remuneración: 2 400 / 30 × 24,75',
         'focos': ['RB_001', 'Neto a pagar'],
         'voz': 'Con un sueldo de [[S 2400]], la remuneración es [[S 1980]]: dos mil cuatrocientos entre treinta, por veinticuatro coma setenta y cinco días. El neto es [[S 1722.60]]. '
                'En el PLAME, la semana va como suspensión cero cinco por cinco días; el permiso por horas no va al punto snl.'},
        {'t': 'tarjeta', 'ceja': 'Mes entero sin goce', 'titulo': 'Sin remuneración, sin aportes',
         'items': ['Todo noviembre sin goce: la boleta no tiene importes', 'Sin EsSalud mínimo: no hay remuneración', 'PLAME: 05|30 y 0 horas en el .jor'],
         'voz': 'Con todo el mes sin goce, la básica es cero y la asignación familiar tampoco se paga. Sin remuneración no hay aporte a EsSalud: la boleta no tiene importes y no se valida. '
                'El PLAME declara treinta días de suspensión.'},
        {'t': 'cap', 'img': 'c22_05_opciones_suspensiones', 'rotulo': 'Compañía › Suspensiones',
         'focos': ['Asignacion familiar en', 'Basica de un mes'],
         'voz': 'Dos opciones de la compañía deciden los meses con suspensiones: si se paga la asignación familiar en un mes entero sin goce, por defecto no; '
                'y cómo se paga la básica en un mes de veintiocho o treinta y un días: por defecto, el mes comercial, treinta menos los días suspendidos.'},
        {'t': 'tarjeta', 'ceja': 'Meses de 28 o 31 días', 'titulo': 'El piso de la básica',
         'items': ['Julio: el 01 laborado y el resto sin goce: 100,00 (antes 0,00)', 'Julio con 17 días sin goce: 1 300,00; con la opción, 1 400,00', 'Una falta el día 31 se descuenta igual'],
         'voz': 'La básica nunca paga menos que los días con goce: con el uno de julio trabajado y el resto sin goce, paga [[S 100]], donde antes pagaba cero. '
                'Con la opción de días calendario con goce, julio con diecisiete días sin goce paga [[S 1400]] en vez de [[S 1300]]. Son criterios pendientes de confirmación de la contadora.'},
        {'t': 'tarjeta', 'ceja': 'Al validar', 'titulo': 'El punto snl queda guardado',
         'items': ['La boleta guarda las suspensiones de cada día al validarse', 'Una licencia aprobada después no cambia el PLAME', 'Si el mes debe cambiar: rectificar'],
         'voz': 'Al validar, la boleta guarda las suspensiones de cada día. Una licencia aprobada o rechazada después ya no cambia el punto snl de un mes pagado: la boleta lo deja dicho en su historial, '
                'y si el mes debe reflejarla, se rectifica.'},
    ],
    'cifra_clave': ('S/ 1 980,00', 'Noviembre de 2026 con una semana sin goce y un permiso de 2 horas: 2 400 / 30 × (30 − 5,25) (caso AUMENTO, 70000903).'),
    'cierre_titulo': 'Suspensiones',
    'cierre': 'El piso, la opción de los días con goce y la asignación familiar en un mes sin goce son criterios pendientes de confirmación de la contadora. Está en el capítulo veintidós del manual.'}
