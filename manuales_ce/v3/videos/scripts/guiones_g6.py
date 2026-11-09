# Guiones del grupo g6_salidas (capítulos 2, 27, 29, 30 y Anexo E): E02, E19, E21, E23, E24, E25 y el nuevo E30.
# Cifras del manual v3: casos del laboratorio corridos en contable19 el 08 y el 09/11/2026; capturas de noviembre de 2026.
REEMPLAZOS = {}
NUEVOS = []

# ---------------------------------------------------------------------- E02 · nota 5
REEMPLAZOS['E02'] = {
    'id': 'E02', 'titulo': 'Instalación, actualización y laboratorio', 'capitulos': ['2', 'Anexo E'], 'caso': 'los 30 casos de la nómina',
    'modulos': ['base', 'ce', 'renta5', 'ce_demo'],
    'entrada': 'En este episodio vemos qué módulos se instalan, qué hace cada actualización y cómo usar el laboratorio de casos, '
               'que ahora tiene treinta casos de nómina, cinco de ellos en compañías propias.',
    'escenas': [
        {'t': 'cap', 'img': 'c02_01_aplicaciones_versiones', 'rotulo': 'Aplicaciones: cada módulo con su versión',
         'focos': ['Detalle de Renta de 5ta', '19.0.1.39.202'],
         'voz': 'Después de actualizar, filtre Aplicaciones por Nómina Peruana, Payroll y PLAME, solo las instaladas, y compare cada versión con la de la entrega. '
                'Hay un módulo nuevo: el detalle de la renta de quinta para Community, que muestra el cálculo paso a paso en cada boleta sin cambiar ningún importe.'},
        {'t': 'tarjeta', 'ceja': 'Lista de despliegue', 'titulo': 'Cada actualización, en este orden',
         'items': ['Script de impacto antes del -u (solo lectura)', 'Una sola copia de cada módulo en el addons_path',
                   '-u y log sin ERROR: «Cuentas CE: 0 asignaciones»', 'Levantar el servicio, comparar versiones y otra vez el impacto'],
         'voz': 'Cada entrega trae un script de impacto, de solo lectura, que se corre antes y después de actualizar: dice qué boletas validadas conviene revisar y cuáles en borrador cambian al recalcular. '
                'Cada módulo debe estar una sola vez en las rutas del servidor. Después del menos u, el log debe salir sin errores, con cero asignaciones de cuentas, y hay que levantar el servicio otra vez.'},
        {'t': 'tarjeta', 'ceja': 'Qué hace el -u', 'titulo': 'Completa sin pisar lo del cliente',
         'items': ['Repara estructuras y reglas; no vuelve a crear una regla archivada', 'Asigna cuentas solo donde faltan',
                   'Post-migraciones: tipo de planilla, dominical y suspensiones guardados', 'No recalcula nada validado; las opciones nuevas, con su valor por defecto'],
         'voz': 'La actualización repara las estructuras y sus reglas, pero no vuelve a crear una regla que usted archivó, y asigna cuentas solo donde faltan. '
                'Algunas versiones traen post-migraciones, por ejemplo la que pone el tipo de planilla a cada estructura. Nada validado se recalcula, '
                'y cada opción nueva aparece en la pestaña Nómina PE Controles de la compañía con su valor por defecto.'},
        {'t': 'cap', 'img': 'c02_02_laboratorio', 'rotulo': '② Sincronizar casos: 33 registrados, 30 conformes',
         'focos': ['Sincronizar casos', '90.91'],
         'voz': 'En SOLSE Demo, Configuración, Laboratorio, pulse Sincronizar casos después de cada actualización. Quedan [[N 33]] casos registrados y [[N 30]] conformes: '
                'los tres pendientes son de la contabilidad y la facturación, no de la nómina.'},
        {'t': 'cap', 'img': 'c02_03_casos_100', 'rotulo': 'Los 30 casos de la nómina al 100 %',
         'focos': ['Nomina (30)'],
         'voz': 'Los treinta casos de la nómina están comparados al cien por ciento: los veinticinco de siempre, en SOLSE Demo Servicios, con [[N 4741]] celdas, '
                'y los cinco laboratorios por empresa, con [[N 688]]. Cada caso se corre con Limpiar, Sembrar, Generar y Comparar.'},
        {'t': 'cap', 'img': 'c02_06_empresa_consultora', 'rotulo': 'Un laboratorio por empresa: EMPRESA_CONSULTORA',
         'focos': ['EMPRESA_CONSULTORA', '137'],
         'voz': 'Cada caso EMPRESA es un mes completo de una empresa realista en su propia compañía de laboratorio, sin RUC: una pequeña empresa, una microempresa, un comercio, una industria y una consultora. '
                'La primera vez, la compañía la crea un administrador. La consultora compara [[N 137]] celdas sin diferencias.'},
        {'t': 'limites', 'ceja': 'Limpiar y la tarea nocturna', 'titulo': 'Si la tarea está corriendo, no se borra nada',
         'items': ['«La tarea programada … está corriendo… No se borró nada: vuelva a pulsar Limpiar en unos minutos»',
                   'Terminada la tarea, una pasada borra todo, con sus entradas (528 en NOMINA)', 'UTILIDADES y SUBSIDIOS comparten DNI: de a uno'],
         'voz': 'La tarea nocturna que genera entradas de trabajo y el botón Limpiar ya no corren a la vez. Si la tarea está corriendo, Limpiar no borra nada y pide pulsar otra vez en unos minutos. '
                'Terminada la tarea, una sola pasada borra todo: en NOMINA, también las [[N 528]] entradas que la tarea acababa de crear.'},
        {'t': 'cap', 'img': 'c02_05_datos_de_prueba_en_fm', 'rotulo': 'En una compañía real no se cargan datos de prueba',
         'focos': ['es una compania real'],
         'voz': 'El laboratorio solo escribe en sus compañías de prueba. En una compañía real, el asistente de datos de prueba lo explica y no carga nada.'},
    ],
    'cifra_clave': ('30 / 30', 'Casos de la nómina al 100 % el 08/11/2026: 5 429 celdas (4 741 de los 25 de siempre + 688 de los 5 EMPRESA_*).'),
    'cierre_titulo': 'Comprobar después de cada actualización',
    'cierre': 'Después de cada actualización: el impacto, las versiones, sincronizar casos y correr los treinta. Está en el capítulo dos y en el anexo E del manual.'}

# ---------------------------------------------------------------------- E19
REEMPLAZOS['E19'] = {
    'id': 'E19', 'titulo': 'Pago a bancos: BCP, Interbank y Scotiabank', 'capitulos': ['27', '15'], 'caso': 'BANCOS y ADICIONALES',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'Este episodio muestra los archivos de pago de haberes y de CTS para el BCP, Interbank y Scotiabank.',
    'escenas': [
        {'t': 'cap', 'img': 'c27_04_bcp_haberes_resultado', 'rotulo': 'BCP haberes de mayo de 2026',
         'focos': ['Incluir planillas', '7918.00'],
         'voz': 'En Nómina PE, Pago masivo a bancos, se elige el mes, el tipo, haberes o CTS, el banco y la cuenta de cargo. En el caso BANCOS, el archivo de haberes del BCP abona a cuatro trabajadores, [[S 7918]]. '
                'La casilla Incluir planillas adicionales viene marcada: las comisiones del mes se pagan con los haberes.'},
        {'t': 'tarjeta', 'ceja': 'Omitidos', 'titulo': 'Un trabajador sin cuenta no bloquea el archivo',
         'items': ['BCP: 1 omitido sin cuenta sueldo, por 1 566,00', 'El resumen dice a quién no se pagó y por qué', 'Modo estricto: no generar si falta alguien'],
         'voz': 'Un trabajador sin cuenta no bloquea el archivo: se omite, y el resumen dice a quién no se pagó y por qué. Aquí, uno sin cuenta sueldo, por [[S 1566]]. Si la empresa prefiere, el modo estricto no genera el archivo.'},
        {'t': 'cap', 'img': 'c27_05_interbank_cts_resultado', 'rotulo': 'Interbank CTS: 1 abonado, 4 omitidos',
         'focos': ['833.33', '2800.39'],
         'voz': 'El archivo de CTS de Interbank abona [[S 833.33]] y omite a cuatro por [[S 2800.39]]: tres tienen la CTS en otro banco y se depositan con el archivo de ese banco, y uno no tiene cuenta CTS.'},
        {'t': 'cap', 'img': 'c27_06_scotiabank_haberes_resultado', 'rotulo': 'Scotiabank: formato sin validar',
         'focos': ['formato sin validar', '6003.88'],
         'voz': 'Scotiabank abona a tres trabajadores, [[S 6003.88]], y omite a dos. Su formato es propio de la localización: el asistente avisa que no está validado con el banco. Haga una carga de prueba antes del primer pago real.'},
        {'t': 'tarjeta', 'ceja': 'Quién entra en haberes', 'titulo': 'Mensual, semanal, practicantes y adicionales',
         'items': ['Las planillas adicionales: un solo abono (ADICIONALES: 3 045,00)', 'El practicante cobra su subvención con los haberes',
                   'Los vales de alimentos se entregan fuera del neto: no van al banco', 'La gratificación, con su casilla'],
         'voz': 'Un trabajador con mensual y comisiones recibe un solo abono: [[S 3045]] en el caso ADICIONALES. El practicante cobra su subvención con los haberes, '
                'y los vales de alimentos, que ahora se entregan fuera del neto, no van al banco.'},
        {'t': 'tarjeta', 'ceja': 'Archivos', 'titulo': 'Listos para la banca por internet',
         'items': ['Banco de cada cuenta por su código SBS', 'Sin tildes (ASCII) y con fin de línea CRLF', 'Total exacto al centavo', 'Banco de la Nación: no cubierto'],
         'voz': 'Los archivos salen sin tildes y con fin de línea de Windows, con el total exacto al centavo. El banco de cada cuenta se reconoce por su código SBS. El Banco de la Nación no está cubierto: su formato no es público.'},
    ],
    'cifra_clave': ('S/ 7 918,00', 'Haberes de mayo de 2026 abonados por el BCP a 4 trabajadores del caso BANCOS (407 celdas).'),
    'cierre_titulo': 'Revise los omitidos',
    'cierre': 'Antes de subir un archivo al banco, ábralo y revise los omitidos. Está en los capítulos veintisiete y quince del manual.'}

# ---------------------------------------------------------------------- E21 · notas 3 y 6
REEMPLAZOS['E21'] = {
    'id': 'E21', 'titulo': 'PLAME, AFPnet y planilla de sueldos', 'capitulos': ['27'], 'caso': 'EMPRESA_CONSULTORA, PLAME, NOMINA',
    'modulos': ['base', 'ce', 'ce_demo', 'plame_demo'],
    'entrada': 'Este episodio muestra los archivos legales del mes: la planilla de sueldos, el PLAME, con sus archivos nuevos, y AFPnet.',
    'escenas': [
        {'t': 'tarjeta', 'ceja': 'Antes de generar', 'titulo': 'Cada salida lee las boletas validadas de la compañía activa',
         'items': ['Elija la compañía en el selector: un archivo por compañía', 'Las boletas se eligen por el tipo de planilla de su estructura',
                   'Una estructura sin tipo no entra en ninguna salida: la boleta lo avisa', 'Las rectificativas restan'],
         'voz': 'Todas las salidas leen las boletas validadas de la compañía activa: con varias compañías, elíjala antes en el selector. Las boletas se eligen por el tipo de planilla de su estructura; '
                'una estructura sin tipo no entra en ninguna salida, y la boleta lo avisa.'},
        {'t': 'cap', 'img': 'c27_01_planilla_resultado', 'rotulo': 'Planilla de sueldos de noviembre de 2026',
         'focos': ['Incluir planillas'],
         'voz': 'La planilla de sueldos sale en Excel o en PDF, con una fila por trabajador. Con Incluir planillas adicionales, quien tuvo mensual y comisiones sale en una sola fila: '
                'en el caso ADICIONALES, ingresos [[S 3500]] y neto [[S 3045]]. El practicante no va en la planilla.'},
        {'t': 'cap', 'img': 'c27_02_plame_resultado', 'rotulo': 'PLAME de junio de 2026 de la Consultora',
         'focos': ['otras condiciones', 'monto pagado 1695.00'],
         'voz': 'El PLAME genera el archivo comprimido para el PDT. En la consultora, junio de 2026: cuatro boletas, los conceptos cero ciento veintiuno y cero seiscientos cinco, '
                'dos líneas del punto toc para los dos no domiciliados, y una practicante con [[S 1695]] en el archivo del personal en formación, para digitarlo en el PDT.'},
        {'t': 'tarjeta', 'ceja': 'Archivos del ZIP', 'titulo': 'Siempre tres, y tres más cuando hacen falta',
         'items': ['.rem, .jor (6 campos) y .snl (suspensiones guardadas al validar)', '.or5: otras rentas de 5.ª, si se retiene por otro empleador',
                   '.toc: los no domiciliados, con «Domiciliado» = 2', '…_personal_en_formacion.txt: un monto por practicante'],
         'voz': 'El ZIP lleva siempre el punto rem, el punto jor y el punto snl, que declara las suspensiones guardadas al validar la boleta. Y tres archivos más cuando hacen falta: '
                'el punto or cinco, si la compañía retiene por otro empleador; el punto toc, con los no domiciliados; y el archivo del personal en formación.'},
        {'t': 'tarjeta', 'ceja': 'Conceptos nuevos del .rem', 'titulo': 'Medidos en el laboratorio',
         'items': ['Dominical de la semanal: 0115 240,00 y 0121 1 440,00 (PLAME, julio)', 'Gratificación trunca: 0407 2 000,00 y 0313 180,00',
                   'Feriados aparte: 0115 300,00, licencia con goce 0907 200,00, trabajo en feriado 0107 200,00', 'Utilidades: 0910 antes y 0911 después de la declaración anual'],
         'voz': 'El punto rem tiene conceptos nuevos. El dominical de la semanal va aparte en el cero ciento quince: [[S 240]], y el resto de la básica, [[S 1440]], en el cero ciento veintiuno. '
                'La gratificación trunca de la liquidación va en el cero cuatrocientos siete. Y con la opción de feriados, los feriados, la licencia con goce y el trabajo en feriado van en sus propios códigos.'},
        {'t': 'tarjeta', 'ceja': 'Ficha de la compañía', 'titulo': 'Aportes informativos en el .rem',
         'items': ['Marcadas por defecto: 0803 Vida Ley y 0811 SIS', 'Sin marcar: 0810, 0813 y 0814 del SCTR, 0801 y 0609 voluntarios',
                   'Antes de marcar una, pruebe la importación en el PDT'],
         'voz': 'Los aportes que el PDT no calcula pueden ir al punto rem como informativos. Por defecto van la Vida Ley y el SIS de la microempresa; los del SCTR y los voluntarios quedan sin marcar. '
                'Antes de marcar uno, pruebe la importación en su PDT.'},
        {'t': 'cap', 'img': 'c27_03_afpnet_resultado', 'rotulo': 'AFPnet de julio de 2026: 6 afiliados',
         'focos': ['Trabajadores SPP incluidos'],
         'voz': 'AFPnet sale en Excel con los afiliados al sistema privado: en julio, seis. El régimen es el del cálculo de la boleta, no el de hoy, y suma las planillas adicionales del mes. '
                'Los aportes voluntarios van en sus columnas. Y el pago a cada AFP se registra con AFPnet, registrar el pago.'},
        {'t': 'limites', 'ceja': 'Pendiente', 'titulo': 'Lo que falta probar en el PDT',
         'items': ['La importación del .toc, del .or5 y de los informativos en el PDT 4.7', 'El personal en formación se digita: no hay archivo de importación',
                   'El monto del personal en formación: criterio pendiente de confirmación'],
         'voz': 'Falta probar en el PDT la importación del punto toc, del punto or cinco y de los aportes informativos. El personal en formación se digita, y su monto es un criterio pendiente de confirmación por la contadora.'},
    ],
    'cifra_clave': ('126 celdas', 'Caso PLAME, julio de 2026: 30 boletas, 13 trabajadores, 42 líneas del .rem, con el dominical de la semanal en el 0115.'),
    'cierre_titulo': 'Abra cada archivo antes de enviarlo',
    'cierre': 'Importe el PLAME en el PDT y compare sus totales con la planilla. Está en el capítulo veintisiete del manual.'}

# ---------------------------------------------------------------------- E23 · notas 1, 2 y 6
REEMPLAZOS['E23'] = {
    'id': 'E23', 'titulo': 'T-Registro I: altas y bajas', 'capitulos': ['29'], 'caso': 'TREGISTRO',
    'modulos': ['ce', 'ce_demo'],
    'entrada': 'El T-Registro se carga con archivos de carga masiva. Este primer episodio muestra las altas y las bajas, también las del practicante.',
    'escenas': [
        {'t': 'tarjeta', 'ceja': 'Nómina PE › T-Registro (carga masiva)', 'titulo': 'Cinco operaciones, cada una un envío',
         'items': ['Altas y bajas', 'Modificaciones', 'Altas y bajas de derechohabientes', 'Estructura del Manual del PVS T-Registro v2.22'],
         'voz': 'El asistente del T-Registro tiene cinco operaciones: altas, bajas, modificaciones, y altas y bajas de derechohabientes. Cada una es un envío aparte, con la estructura del manual del validador de SUNAT.'},
        {'t': 'cap', 'img': 'c29_01_altas_resultado', 'rotulo': 'Altas del 1 al 22 de octubre de 2026',
         'focos': ['NO SE EXPORTA', 'altas_20261022'],
         'voz': 'Antes de exportar, el asistente valida los datos que exige el validador. Del uno al veintidós de octubre propone ocho trabajadores: cuatro se exportan y cuatro no, '
                'y el resumen dice qué le falta a cada uno y con qué regla. Por ejemplo, a uno le falta el celular.'},
        {'t': 'tarjeta', 'ceja': 'Archivos del alta', 'titulo': 'Un archivo por tipo de dato',
         'items': ['.ide 4 · .tra 4 · .per 17', '.est 4 · .cta 2 · .edu 3', 'Se validan en el PVS, que arma el ZIP para SOL'],
         'voz': 'Las altas generan un archivo por tipo de dato: identificación, datos laborales, periodos, establecimientos, cuentas y estudios. Se validan en el PVS, que arma el ZIP para SOL. '
                'Las bajas generan un solo archivo de periodos, con la fecha de fin y el motivo.'},
        {'t': 'tarjeta', 'ceja': 'Nuevo', 'titulo': 'El practicante: personal en formación, categoría 5',
         'items': ['Alta: .ide, .pfl, .per y .lug; sin .tra ni .est', 'Baja sin motivo: 07, término del convenio', 'De practicante a trabajador: un contrato nuevo'],
         'voz': 'El practicante se exporta como personal en formación, categoría cinco: su alta lleva el punto pfl, con la modalidad y el seguro, y el punto lug, sin datos laborales. '
                'Si su convenio termina sin motivo, la baja sale con el cero siete. Y el paso de practicante a trabajador va en un contrato nuevo.'},
        {'t': 'tarjeta', 'ceja': 'Periodos', 'titulo': 'Una liquidación en medio cierra el periodo',
         'items': ['Cese el 30/06 y contrato nuevo el 01/07: baja el 30/06 y alta el 01/07', 'Si se anula la liquidación, vuelve a ser un periodo', 'El cambio de régimen no cierra el periodo'],
         'voz': 'Una renovación sin interrupción no es alta ni baja. Pero si entre los dos contratos hay una liquidación validada, son dos periodos: con cese el treinta de junio y contrato nuevo el primero de julio, salen una baja y un alta.'},
        {'t': 'limites', 'ceja': 'Antes de la primera carga', 'titulo': 'Pruebe en el PVS',
         'items': ['El alta del practicante todavía no tiene un caso medido', 'El código de la modalidad, «03», se confirma en el PVS', 'No cubre pensionistas ni personal de terceros'],
         'voz': 'El alta del practicante todavía no tiene un caso medido en el laboratorio: pruebe la primera en el PVS. La localización no cubre pensionistas ni personal de terceros.'},
    ],
    'cifra_clave': ('4 / 8', 'Altas del 01/10 al 22/10/2026 exportadas; las otras 4 salen con lo que les falta (caso TREGISTRO, 262 celdas).'),
    'cierre_titulo': 'Prueba en el PVS',
    'cierre': 'La prueba en el validador la hace el implementador con su versión del PVS. Está en el capítulo veintinueve del manual.'}

# ---------------------------------------------------------------------- E24 · nota 6
REEMPLAZOS['E24'] = {
    'id': 'E24', 'titulo': 'T-Registro II: modificaciones y derechohabientes', 'capitulos': ['29'], 'caso': 'TREGISTRO y EMPRESA_CONSULTORA',
    'modulos': ['ce', 'ce_demo'],
    'entrada': 'El segundo episodio del T-Registro muestra las modificaciones, el convenio del trabajador no domiciliado y los derechohabientes.',
    'escenas': [
        {'t': 'cap', 'img': 'c29_03_modificacion_resultado', 'rotulo': 'Modificación del tipo de trabajador',
         'focos': ['Tipo de trabajador', 'per: 2'],
         'voz': 'Cada modificación es un envío, con un concepto y su fecha de cambio. Aquí, el tipo de trabajador cambia el dieciséis de octubre de 2026: el asistente propone al trabajador '
                'y el archivo de periodos lleva dos líneas, el cierre y el nuevo periodo.'},
        {'t': 'tarjeta', 'ceja': 'Modificaciones', 'titulo': 'Nueve conceptos',
         'items': ['Tipo de trabajador, datos del contrato, cuenta de abono', 'Régimen pensionario, salud y EPS, SCTR salud', 'Establecimiento, estudios, celular, correo y domicilio'],
         'voz': 'Hay nueve conceptos. Cada uno genera solo los archivos que cambian, y el valor anterior se cierra el día previo a la fecha del cambio.'},
        {'t': 'tarjeta', 'ceja': 'Nuevo', 'titulo': 'El convenio, en el campo 22 del .tra',
         'items': ['EMPRESA_CONSULTORA: S5, de Colombia, convenio «3» → campo 22 = 3', 'Con «0 · Ninguno», vacío en el alta', 'En «Datos del contrato», el que vuelve a «0» va con «0»',
                   'Convenio sin la marca de no domiciliado: aviso'],
         'voz': 'El campo veintidós del archivo de datos laborales lleva el convenio para evitar la doble tributación del trabajador no domiciliado. En la consultora, el consultor andino, con el convenio tres de la Comunidad Andina, sale con un tres. '
                'Sin convenio, el campo va vacío en el alta. Si un contrato tiene convenio y no tiene la marca de no domiciliado, el asistente avisa.'},
        {'t': 'cap', 'img': 'c29_04_dh_altas_resultado', 'rotulo': 'Altas de derechohabientes: 4 exportados, 1 no',
         'focos': ['NO SE EXPORTA', '09112026_ALTA'],
         'voz': 'Las altas de derechohabientes generan un archivo de texto: del uno al veintidós de octubre, cuatro exportados. Un hijo mayor de edad sin incapacidad no se exporta, y el resumen lo dice. '
                'La fecha del nombre del archivo es la del día en que se genera.'},
        {'t': 'limites', 'ceja': 'Importante', 'titulo': 'Los TXT de derechohabientes van directo a SOL',
         'items': ['No pasan por el PVS', 'Se suben en SOL: T-Registro › Registro de Derechohabientes › Carga masiva', 'Nunca suba archivos del laboratorio: es un registro real'],
         'voz': 'Los archivos de derechohabientes no pasan por el validador: se suben directamente en SOL. Nunca suba los del laboratorio, porque una carga en SOL es un registro real.'},
    ],
    'cifra_clave': ('262 celdas', 'Caso TREGISTRO: altas, bajas, las 9 modificaciones y los derechohabientes, al 100 %.'),
    'cierre_titulo': 'Lo que no cubre',
    'cierre': 'No cubre pensionistas ni personal de terceros, ni la modificación masiva de derechohabientes. Está en el capítulo veintinueve del manual.'}

# ---------------------------------------------------------------------- E25
REEMPLAZOS['E25'] = {
    'id': 'E25', 'titulo': 'Recibos por honorarios y PLAME de 4.ª', 'capitulos': ['30'], 'caso': 'PLAME-RXH',
    'modulos': ['plame_rxh', 'plame_4ta'],
    'entrada': 'Los recibos por honorarios se declaran en el PLAME de cuarta categoría. Hay dos formas de generarlo, con el mismo contenido.',
    'escenas': [
        {'t': 'tarjeta', 'ceja': 'Dos puertas', 'titulo': 'El mismo archivo, con o sin nómina',
         'items': ['Sin nómina: Contabilidad › Reportes › PLAME - Recibos por Honorarios', 'Con nómina: casilla «Incluir 4ta categoría (.ps4 y .4ta)» del PLAME', 'Entran los recibos pagados en el mes'],
         'voz': 'Sin nómina, desde Contabilidad, Reportes. Con nómina, con la casilla Incluir cuarta categoría del PLAME, que viene marcada. En los dos casos entran los recibos pagados en el mes, sin importar su fecha de emisión.'},
        {'t': 'cap', 'img': 'c30_02_rxh_revision', 'rotulo': 'Revisar periodo: 8 prestadores, 9 comprobantes',
         'focos': ['15,022.60'],
         'voz': 'Se elige el ejercicio y el mes, y Revisar periodo lista cada comprobante con su serie, número, fechas, retención y monto. En julio de 2026, ocho prestadores y nueve comprobantes, '
                'con una nota de crédito. Total declarado: [[S 15022.60]]. La pestaña Validaciones dice qué falta corregir.'},
        {'t': 'cap', 'img': 'c30_03_ajustes_4ta', 'rotulo': 'Retención y umbral de 1 500',
         'focos': ['Umbral de retencion'],
         'voz': 'En la compañía, pestaña Nómina PE cuarta categoría, se indica de dónde sale la retención, por defecto automático, y el umbral de [[S 1500]].'},
        {'t': 'cap', 'img': 'c27_02_plame_resultado', 'rotulo': 'Sin recibos en el mes',
         'focos': ['no hay recibos'],
         'voz': 'Cuando no hay recibos pagados en el mes, el PLAME de la planilla lo dice en su resumen, y no agrega los archivos de cuarta.'},
        {'t': 'tarjeta', 'ceja': 'No confundir', 'titulo': 'El practicante no es un prestador',
         'items': ['La subvención de una modalidad formativa no es renta de 4.ª', 'Va en el «Personal en formación» del PLAME'],
         'voz': 'Un practicante no emite recibos por honorarios: su subvención no es renta de cuarta categoría y va en el personal en formación del PLAME.'},
    ],
    'cifra_clave': ('S/ 15 022,60', 'Total declarado de julio de 2026 en el caso PLAME-RXH: 8 prestadores y 9 comprobantes (202 celdas).'),
    'cierre_titulo': 'Valide en su PDT',
    'cierre': 'El formato se comparó con archivos aceptados por el PDT. Verifíquelo con su primera declaración. Está en el capítulo treinta del manual.'}

# ---------------------------------------------------------------------- E30 · nuevo · nota 5
NUEVOS.append({
    'id': 'E30', 'titulo': 'Una empresa en un mes', 'capitulos': ['2', 'Anexo E', '13', '27', '31'], 'caso': 'EMPRESA_CONSULTORA',
    'modulos': ['base', 'ce', 'renta5', 'ce_demo'],
    'entrada': 'Cada laboratorio por empresa es un mes completo de una empresa realista. Recorremos uno de punta a punta: una consultora con una practicante, '
               'dos extranjeros no domiciliados, una extranjera domiciliada y una asistente a tiempo parcial.',
    'escenas': [
        {'t': 'tarjeta', 'ceja': 'Cinco empresas de laboratorio', 'titulo': 'Cada una en su compañía, sin RUC',
         'items': ['Pequeña empresa · Microempresa · Comercio', 'Industria (SENATI) · Consultora', 'Limpiar, Sembrar, Generar y Comparar', 'La primera vez, un administrador crea la compañía'],
         'voz': 'Hay cinco laboratorios por empresa: una pequeña empresa, una microempresa, un comercio, una industria y una consultora. Cada uno trabaja en su propia compañía, sin RUC, '
                'y se corre como cualquier caso: Limpiar, Sembrar, Generar y Comparar.'},
        {'t': 'cap', 'img': 'c02_06_empresa_consultora', 'rotulo': 'EMPRESA_CONSULTORA: 137 celdas, 0 diferencias',
         'focos': ['EMPRESA_CONSULTORA', '137'],
         'voz': 'La consultora siembra cinco trabajadores, valida nueve boletas y compara [[N 137]] celdas, sin diferencias. Ahora abrimos sus boletas de junio de 2026.'},
        {'t': 'cap', 'img': 'c31_02_boleta_junio_s1', 'rotulo': 'La practicante: subvención y media subvención',
         'focos': ['Media subvencion', 'S/1,695.00'],
         'voz': 'La practicante cumple seis meses en junio: recibe la subvención de [[S 1130]] y la media subvención de [[S 565]]. La compañía aporta [[S 152.55]] a EsSalud, y el neto es [[S 1695]].'},
        {'t': 'cap', 'img': 'c13_08_s2_jun2026_calculo', 'rotulo': 'No domiciliado, sin convenio: el 30 %',
         'focos': ['R5TA_001', '4,560.00'],
         'voz': 'El consultor venezolano no domiciliado, sin convenio, gana [[S 8000]]. Se le retiene el treinta por ciento, [[S 2400]], sin deducción ni escala. Con la ONP de [[S 1040]], el neto es [[S 4560]].'},
        {'t': 'cap', 'img': 'c13_07_renta5_andino_s5_jun2026', 'rotulo': 'Andino con convenio 3: la escala',
         'focos': ['278.03'],
         'voz': 'El consultor colombiano gana lo mismo, pero tiene el convenio de la Comunidad Andina: se le retiene con las siete UIT y la escala, como a un domiciliado. '
                'La pestaña Renta de quinta muestra el cálculo: [[S 278.03]], y su neto es [[S 6681.97]].'},
        {'t': 'cap', 'img': 'c12_07_tiempo_parcial_s4', 'rotulo': 'Tiempo parcial: EsSalud con la base mínima',
         'focos': ['101.70', 'Neto a pagar'],
         'voz': 'La asistente a tiempo parcial gana [[S 500]]. Paga ONP por [[S 65]], y EsSalud se calcula sobre la remuneración mínima: [[S 101.70]]. Su neto es [[S 435]].'},
        {'t': 'cap', 'img': 'c27_02_plame_resultado', 'rotulo': 'El PLAME de junio de la consultora',
         'focos': ['otras condiciones', 'monto pagado 1695.00'],
         'voz': 'Y el PLAME del mes: cuatro trabajadores en el punto rem, el punto toc con los dos no domiciliados, y la practicante en el archivo del personal en formación, con [[S 1695]].'},
        {'t': 'limites', 'ceja': 'Para mirar, no para presentar', 'titulo': 'Las compañías de laboratorio no tienen RUC',
         'items': ['Los archivos salen sin RUC: PLAME_0601202606.zip', 'No se presentan el PLAME, AFPnet ni el T-Registro de estas empresas', 'No tocan la compañía de servicios ni FM'],
         'voz': 'Las compañías de laboratorio no tienen RUC: sus archivos salen sin él y sirven para mirar, no para presentar. Y como cada caso escribe en su propia compañía, no toca la de servicios ni una compañía real.'},
    ],
    'cifra_clave': ('137 celdas', 'EMPRESA_CONSULTORA al 100 %: practicante, no domiciliado, andino, domiciliada y tiempo parcial en un mes (junio de 2026).'),
    'cierre_titulo': 'Una empresa por tipo',
    'cierre': 'Los cinco laboratorios por empresa dan las cifras completas de una empresa por tipo. Están en el capítulo dos y en el anexo E del manual.'})
