# Guiones del v3: reemplazos de episodios del v2 (REEMPLAZOS, por id) y episodios nuevos (NUEVOS).
# Las cifras son las del manual v3 (casos del laboratorio medidos en contable19 en noviembre de 2026).
REEMPLAZOS = {}
NUEVOS = []

# ---------------------------------------------------------------------- E17 · nota 1
REEMPLAZOS['E17'] = {
    'id': 'E17', 'titulo': 'Micro y pequeña empresa', 'capitulos': ['24'], 'caso': 'EMPRESA_PEQUENA y EMPRESA_MICRO',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'La micro y la pequeña empresa inscritas en el REMYPE tienen un régimen laboral especial. En este episodio vemos sus opciones y sus cifras, '
               'con dos compañías de laboratorio: una pequeña empresa y una microempresa.',
    'escenas': [
        {'t': 'tarjeta', 'ceja': 'El régimen se elige en el contrato', 'titulo': 'Lo que cambia frente al régimen general',
         'items': ['Pequeña empresa: media gratificación, CTS de 15 días por año, 15 días de vacaciones',
                   'Microempresa: sin gratificación ni CTS, 15 días de vacaciones, SIS en lugar de EsSalud',
                   'Indemnización: 20 días por año en la pequeña, 10 en la micro'],
         'voz': 'El régimen laboral se elige en el contrato de cada trabajador. En la pequeña empresa, la gratificación es de media remuneración, la CTS de quince remuneraciones diarias por año '
                'y las vacaciones de quince días. En la microempresa no hay gratificación ni CTS, las vacaciones son de quince días y la salud va al SIS. '
                'La indemnización por despido es de veinte remuneraciones diarias por año en la pequeña y de diez en la micro.'},
        {'t': 'cap', 'img': 'c24_03_compania_remype', 'rotulo': 'Compañía › Micro y pequeña empresa (REMYPE)',
         'focos': ['Acreditación en el', 'Pequeña empresa:'],
         'voz': 'En la compañía se registra la fecha de acreditación en el REMYPE, y se eligen las opciones: el régimen de salud de la micro, la asignación familiar y las utilidades. '
                'Por defecto, la asignación familiar no se paga, porque no es parte del régimen especial.'},
        {'t': 'cap', 'img': 'c24_05_pequena_grati_p1', 'rotulo': 'Pequeña empresa: gratificación de julio de 2026',
         'focos': ['Gratificacion', 'Bonificacion'],
         'voz': 'Una trabajadora de la pequeña empresa con [[S 2400]] recibe en julio media remuneración: [[S 1200]], más la bonificación extraordinaria de [[S 108]]. '
                'Su CTS de mayo es [[S 650]], quince remuneraciones diarias por año.'},
        {'t': 'cap', 'img': 'c24_06_pequena_liquidacion_p3', 'rotulo': 'Pequeña empresa: despido arbitrario el 15/10/2026',
         'focos': ['1,100.00', 'Neto de liquidación'],
         'voz': 'Un trabajador despedido el quince de octubre recibe sus truncas del régimen, y una indemnización de veinte remuneraciones diarias por año: '
                'sesenta soles diarios, por veinte, por once doceavos, [[S 1100]]. El neto de la liquidación es [[S 2787.75]].'},
        {'t': 'cap', 'img': 'c24_07_aviso_remype', 'rotulo': 'Aviso: contrato anterior al REMYPE',
         'focos': ['antes de la'],
         'voz': 'Si el contrato del régimen especial empezó antes de la acreditación, la boleta avisa: ese contrato conserva el régimen en que se celebró. El aviso no bloquea; decide la empresa.'},
        {'t': 'cap', 'img': 'c24_01_micro_jun_calculo', 'rotulo': 'Microempresa, junio de 2026',
         'voz': 'En la microempresa, un trabajador con [[S 1500]] paga ONP por [[S 195]]. El empleador aporta [[S 15]] al SIS en lugar de EsSalud. El neto es [[S 1305]].'},
        {'t': 'cap', 'img': 'c24_04_micro_liquidacion_m3', 'rotulo': 'Microempresa: despido el 30/09/2026',
         'focos': ['S/960.42'],
         'voz': 'Y en la liquidación de la micro, la indemnización es de diez remuneraciones diarias por año: [[S 416.67]]. Con las vacaciones truncas de [[S 625]], el neto es [[S 960.42]].'},
    ],
    'cifra_clave': ('S/ 1 100,00', 'Indemnización de la pequeña empresa: 20 remuneraciones diarias por año (caso EMPRESA_PEQUENA, 217 celdas).'),
    'cierre_titulo': 'Micro y pequeña empresa',
    'cierre': 'El tope de noventa remuneraciones diarias de la CTS de la pequeña empresa todavía no se aplica, y queda como criterio pendiente de la contadora. '
              'Todo está en el capítulo veinticuatro del manual.'}

# ---------------------------------------------------------------------- E27 · nuevo · nota 1
NUEVOS.append({
    'id': 'E27', 'titulo': 'El practicante: modalidades formativas', 'capitulos': ['31'], 'caso': 'EMPRESA_CONSULTORA',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'El practicante no es un trabajador: recibe una subvención, no una remuneración. Desde esta versión, la localización calcula y declara las modalidades formativas.',
    'escenas': [
        {'t': 'cap', 'img': 'c31_01_contrato_practicante', 'rotulo': 'Contrato: ¿Es practicante?',
         'focos': ['Es practicante', 'Practicas profesionales'],
         'voz': 'En la versión del contrato se marca ¿Es practicante?, y se completan la modalidad, la jornada del convenio, el seguro y el centro de formación. '
                'La subvención pactada es el sueldo de la versión, y la estructura es Subvención de modalidad formativa.'},
        {'t': 'cap', 'img': 'c31_02_boleta_junio_s1', 'rotulo': 'Boleta de junio de 2026: subvención y media subvención',
         'focos': ['Media subvencion', 'S/1,695.00'],
         'voz': 'En junio, la practicante cumple seis meses. La boleta paga la subvención de [[S 1130]] y la media subvención de [[S 565]]. '
                'La compañía aporta a EsSalud el nueve por ciento de lo pagado: [[S 152.55]]. No hay AFP, ONP ni renta de quinta: el neto es [[S 1695]].'},
        {'t': 'tarjeta', 'ceja': 'Lo que calcula', 'titulo': 'Subvención, media subvención y descanso',
         'items': ['Subvención: la mayor entre la pactada y el mínimo', 'Media subvención cada seis meses', 'Descanso de 15 días, y el no gozado al terminar', 'EsSalud 9 % de lo pagado'],
         'voz': 'La subvención es la mayor entre la pactada y el mínimo de su modalidad. Cada seis meses se paga media subvención; '
                'el descanso de quince días se paga en lugar de la subvención, y el no gozado, al terminar el convenio.'},
        {'t': 'cap', 'img': 'c31_03_compania_practicantes', 'rotulo': 'Opciones de la compañía',
         'voz': 'La compañía decide si paga el mínimo cuando la subvención pactada es menor, si descuenta las inasistencias y si el EsSalud usa la base mínima.'},
        {'t': 'cap', 'img': 'c31_04_plame_personal_formacion', 'rotulo': 'PLAME: personal en formación',
         'focos': ['Personal en formación'],
         'voz': 'El practicante no va al punto rem del PLAME. El asistente lo suma en un archivo aparte, para digitarlo en la sección Personal en formación del PDT: '
                'una persona y [[S 1695]] en junio.'},
    ],
    'cifra_clave': ('S/ 1 695,00', 'Subvención y media subvención de junio de 2026 (caso EMPRESA_CONSULTORA, S1).'),
    'cierre_titulo': 'Modalidades formativas',
    'cierre': 'Algunos criterios, como los periodos intermitentes o las cuentas contables, esperan la confirmación de la contadora. Todo está en el capítulo treinta y uno del manual.'})

# ---------------------------------------------------------------------- E28 · nuevo · nota 1
NUEVOS.append({
    'id': 'E28', 'titulo': 'SENATI', 'capitulos': ['32'], 'caso': 'EMPRESA_INDUSTRIA',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'La contribución al SENATI es el cero coma setenta y cinco por ciento de las remuneraciones, a cargo de las empresas industriales. Veamos cómo se configura y cuándo avisa.',
    'escenas': [
        {'t': 'cap', 'img': 'c32_01_compania_senati', 'rotulo': 'Compañía: Afecta a SENATI',
         'focos': ['Afecta a SENATI', 'Con 20 trabajadores'],
         'voz': 'En la compañía se marca Afecta a SENATI. Con la opción Con veinte trabajadores o menos, se elige si la boleta avisa o si la empresa aporta de forma voluntaria.'},
        {'t': 'cap', 'img': 'c32_02_contrato_fuera_senati', 'rotulo': 'Contrato: Fuera de la base del SENATI',
         'focos': ['Fuera de la base'],
         'voz': 'Al personal que no está en la actividad industrial, como el vendedor de la tienda de la fábrica, se le marca Fuera de la base del SENATI en el contrato. Su boleta no lleva la contribución.'},
        {'t': 'cap', 'img': 'c32_03_boleta_senati_i3', 'rotulo': 'Junio de 2026: 0,75 % después de la tardanza',
         'focos': ['SENATI'],
         'voz': 'Una administrativa con [[S 2500]] y media hora de tardanza tiene una base de [[S 2494.79]]. El SENATI es [[S 18.71]], a cargo del empleador: su neto no cambia.'},
        {'t': 'cap', 'img': 'c32_04_aviso_senati', 'rotulo': 'Aviso: 20 trabajadores o menos el año anterior',
         'focos': ['Afecta a SENATI'],
         'voz': 'La contribución obliga solo a la empresa que tuvo más de veinte trabajadores en promedio el año anterior. Esta compañía tuvo tres: la boleta avisa que la contribución es voluntaria, y sigue calculando.'},
    ],
    'cifra_clave': ('S/ 18,71', 'SENATI de junio de 2026: 0,75 % de 2 494,79 (caso EMPRESA_INDUSTRIA, I3).'),
    'cierre_titulo': 'SENATI',
    'cierre': 'Está en el capítulo treinta y dos del manual.'})

# ---------------------------------------------------------------------- E00 · promo (al cerrar la serie)
REEMPLAZOS['E00'] = {
    'id': 'E00', 'titulo': 'Nómina peruana para Odoo 19 Community: versión 3', 'capitulos': ['1', '33'], 'caso': None,
    'modulos': ['base', 'ce', 'ce_demo', 'renta5'],
    'entrada': 'La nómina peruana para Odoo diecinueve Community tiene una versión nueva, con sesenta lotes de mejoras, todos probados contra la norma.',
    'escenas': [
        {'t': 'tarjeta', 'ceja': 'Ahora incluye', 'titulo': 'Nuevo en la versión 3',
         'items': ['El practicante: subvención, media subvención y descanso', 'La pequeña empresa y el REMYPE; el SENATI con su umbral',
                   'El no domiciliado y el convenio con la Comunidad Andina', 'Provisiones de gratificación, CTS y vacaciones'],
         'voz': 'El practicante, con su subvención, la media subvención y el descanso. La pequeña empresa y el REMYPE. El SENATI con su umbral de veinte trabajadores. '
                'El no domiciliado y el convenio con la Comunidad Andina. Y las provisiones de gratificación, CTS y vacaciones.'},
        {'t': 'cap', 'img': 'c31_02_boleta_junio_s1', 'rotulo': 'El practicante: subvención y media subvención', 'focos': ['Media subvencion'],
         'voz': 'La practicante cumple seis meses en junio: la boleta le paga la subvención y la media subvención, sin aportes ni renta de quinta.'},
        {'t': 'cap', 'img': 'c24_06_pequena_liquidacion_p3', 'rotulo': 'Pequeña empresa: indemnización de 20 días por año', 'focos': ['Neto de liquidación'],
         'voz': 'En la pequeña empresa, las truncas y la indemnización siguen su propio régimen.'},
        {'t': 'cap', 'img': 'c13_07_renta5_andino_s5_jun2026', 'rotulo': 'No domiciliado de la Comunidad Andina: con la escala',
         'voz': 'El no domiciliado de un país andino retiene con la escala, como un domiciliado; los demás, el treinta por ciento.'},
        {'t': 'cap', 'img': 'c07_09_boleta_lineas_provision', 'rotulo': 'Provisiones en la boleta mensual',
         'voz': 'Las provisiones se registran cada mes, en un asiento o en la propia boleta, y se aplican al pagar el beneficio.'},
        {'t': 'cap', 'img': 'c16_05_hoja_liquidacion', 'rotulo': 'Documentos del cese',
         'voz': 'Y los documentos del cese, la hoja de liquidación de utilidades y el PLAME con sus archivos nuevos salen listos para entregar.'},
    ],
    'cifra_clave': ('30 casos · 5 429 celdas', 'Treinta casos de laboratorio, comparados celda por celda contra la norma: todos al 100 %.'),
    'cierre_titulo': 'Manual v3 y su serie de videos',
    'cierre': 'Treinta casos de laboratorio, cinco mil cuatrocientas veintinueve celdas comparadas contra la norma, todas conformes. Todo está en el manual versión tres y en esta serie de videos.'}

# ---------------------------------------------------------------------- E01 · resumen
REEMPLAZOS['E01'] = {
    'id': 'E01', 'titulo': 'Resumen: la nómina de un mes, del alta al PLAME', 'capitulos': ['1', '11', '27'], 'caso': 'BOLETA y NOMINA',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'En este resumen recorremos un mes completo de planilla en Odoo diecinueve Community, del alta del trabajador hasta el PLAME. '
               'Las cifras son las del manual versión tres, medidas en una base de prueba con datos ficticios.',
    'escenas': [
        {'t': 'cap', 'img': 'c03_02_menu_nomina_pe', 'rotulo': 'Nómina › Nómina PE',
         'voz': 'Todo vive en la aplicación Nómina. El menú Nómina PE reúne los parámetros legales, los maestros de SUNAT, los seguros, las salidas legales, las provisiones y la contabilidad de nómina.'},
        {'t': 'cap', 'img': 'c04_02_parametro_rmv', 'rotulo': 'Parámetros con vigencia: RMV 1 130 y 1 230',
         'voz': 'Los valores legales no están escritos en las reglas. Cada parámetro tiene vigencias: la remuneración mínima vale [[S 1130]] desde enero de 2025 y [[S 1230]] desde el 1 de octubre de 2026. '
                'Cada boleta usa el valor vigente en su periodo.'},
        {'t': 'cap', 'img': 'c08_13_contrato_lucia', 'rotulo': 'Contrato: estructura, diario y sueldo',
         'voz': 'En la ficha del trabajador van los datos del T-Registro, y en su contrato, la estructura Nómina Mensual Empleados, el diario Planillas y el sueldo: [[S 4500]].'},
        {'t': 'cap', 'img': 'c10_01_calculo', 'rotulo': 'Boleta de diciembre de 2026 (caso BOLETA)', 'focos': ['Neto a pagar'],
         'voz': 'La boleta calcula la remuneración, la asignación familiar de [[S 123]], los aportes y la renta de quinta. En el caso BOLETA, el neto de diciembre es [[S 4025.70]].'},
        {'t': 'cap', 'img': 'c10_02_boleta_impresa', 'rotulo': 'Boleta impresa: ingresos − descuentos = neto',
         'voz': 'La boleta impresa cuadra al centavo: [[S 4623]] de ingresos, menos [[S 597.30]] de descuentos, da el neto, con el importe en letras.'},
        {'t': 'cap', 'img': 'c10_03_asiento', 'rotulo': 'Asiento en el diario Planillas',
         'voz': 'Al validar, se genera el asiento en el diario Planillas, con el trabajador como socio en la cuenta cuatro uno uno uno: [[S 5671.04]] al debe y al haber.'},
        {'t': 'tarjeta', 'ceja': 'Regla de oro', 'titulo': 'Los acumulados leen boletas validadas',
         'items': ['Primero el adelanto', 'Luego gratificación, CTS, vacaciones y planillas adicionales', 'Después la mensual y las semanales', 'Al final, la liquidación de quien cesa'],
         'voz': 'Una regla evita errores: los acumulados solo leen boletas validadas. Primero el adelanto; luego la gratificación, la CTS, las vacaciones y las planillas adicionales; después la mensual; y al final, la liquidación de quien cesa. El lote ya las ordena así.'},
        {'t': 'cap', 'img': 'c14_01_lucia_grati_jul2026_calculo', 'rotulo': 'Gratificación de julio de 2026',
         'voz': 'La gratificación de julio paga el sueldo más la asignación familiar, [[S 4613]], y la bonificación extraordinaria de [[S 415.17]].'},
        {'t': 'cap', 'img': 'c15_02_liquidacion_deposito_cts', 'rotulo': 'Liquidación del depósito de CTS',
         'voz': 'La CTS de noviembre suma un sexto de la gratificación validada a la remuneración computable: [[S 5391.83]]. La liquidación del depósito sale lista para entregar.'},
        {'t': 'cap', 'img': 'c16_01_carmen_liquidacion_calculo', 'rotulo': 'Liquidación por cese (caso NOMINA)',
         'voz': 'Cuando alguien cesa, la liquidación paga las vacaciones truncas, la gratificación trunca y la CTS trunca. Carmen recibe un neto de [[S 3331.89]].'},
        {'t': 'cap', 'img': 'c27_02_plame_resultado', 'rotulo': 'PLAME: un archivo comprimido para el PDT',
         'voz': 'Con las boletas validadas se genera el PLAME en un solo archivo comprimido, listo para importar en el PDT: remuneraciones, jornada, suspensiones y, si los hay, los no domiciliados y el personal en formación.'},
        {'t': 'cap', 'img': 'c27_04_bcp_haberes_resultado', 'rotulo': 'TXT del BCP: abonados y omitidos',
         'voz': 'Y los archivos de pago para el banco: en el caso BANCOS, el BCP abona a cuatro trabajadores [[S 7918]], y avisa del que no tiene cuenta sueldo.'},
        {'t': 'cap', 'img': 'c28_02_registrar_pago', 'rotulo': 'Registrar el pago de la planilla',
         'voz': 'Al final se registra el pago del lote, con un asiento por lote o uno por trabajador, y se entregan las boletas, impresas o por correo.'},
    ],
    'cifra_clave': ('S/ 4 025,70', 'Neto de diciembre de 2026 del caso BOLETA: ingresos 4 623,00 − descuentos 597,30, igual en la boleta, la impresión y el asiento.'),
    'cierre_titulo': 'Cada paso, en su episodio',
    'cierre': 'Cada uno de estos pasos tiene su capítulo en el manual y su episodio en esta serie, con las mismas cifras.'}

# ---------------------------------------------------------------------- E26 · cierre
REEMPLAZOS['E26'] = {
    'id': 'E26', 'titulo': 'Cierre mensual y anual', 'capitulos': ['34', 'Anexo E'], 'caso': None,
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'El último episodio reúne la lista de verificación del cierre de cada mes y de cada año.',
    'escenas': [
        {'t': 'tarjeta', 'ceja': 'Cada mes · antes de calcular', 'titulo': 'Parámetros y novedades',
         'items': ['RMA del trimestre, RMV y comisiones AFP', 'Ingresos, ceses, cambios de sueldo, comisiones y bonificaciones', 'Practicantes: convenios, descanso y media subvención', 'No domiciliados y su convenio; T-Registro dentro del plazo'],
         'voz': 'Cada mes, antes de calcular: revise los parámetros y registre las novedades: ingresos, ceses, cambios de sueldo, comisiones y bonificaciones. '
                'Revise los convenios de los practicantes y su media subvención, los no domiciliados y su convenio, y presente el T-Registro dentro del plazo.'},
        {'t': 'tarjeta', 'ceja': 'Cada mes · calcular y validar', 'titulo': 'En orden',
         'items': ['Adelanto → gratificación, CTS, vacaciones y adicionales → mensuales → liquidaciones', 'Avisos de cada boleta', 'Asiento de cada lote y, si corresponde, el de las provisiones'],
         'voz': 'Valide en orden: adelanto; gratificación, CTS, vacaciones y adicionales; mensuales; y al final, las liquidaciones. Revise los avisos de cada boleta, el asiento de cada lote y, si la compañía provisiona con un asiento mensual, el de las provisiones.'},
        {'t': 'tarjeta', 'ceja': 'Cada mes · después de validar', 'titulo': 'Archivos, pago y entrega',
         'items': ['Planilla, PLAME, AFPnet y bancos: abrir cada archivo', 'PLAME: el .toc, el .or5 y el personal en formación', 'Registrar el pago de la planilla y el de AFPnet', 'Entregar las boletas en 3 días hábiles'],
         'voz': 'Después: genere y abra cada archivo y revise los omitidos. En el PLAME, mire también el punto toc, el punto or cinco y el archivo del personal en formación. '
                'Registre el pago de la planilla y el de AFPnet, y entregue las boletas en tres días hábiles.'},
        {'t': 'tarjeta', 'ceja': 'Cada año', 'titulo': 'Diciembre y el cierre del ejercicio',
         'items': ['Feriados y UIT del año siguiente', 'Gratificación y vacaciones de diciembre antes que la mensual', 'Certificados de 5.ª; utilidades con su hoja de liquidación', 'SENATI: promedio de trabajadores del año; pasivo de vacaciones'],
         'voz': 'Cada año: registre los feriados y la UIT del año siguiente, valide la gratificación de diciembre antes que la mensual y emita los certificados de quinta. '
                'Reparta las utilidades y entregue su hoja de liquidación; si la compañía está afecta al SENATI, revise su promedio de trabajadores; y, si provisiona, revise el pasivo de vacaciones.'},
        {'t': 'cap', 'img': 'c02_03_casos_100', 'rotulo': 'Después de cada actualización: los 30 casos',
         'voz': 'Y después de cada actualización de los módulos, corra los treinta casos del laboratorio: todos deben quedar en cien por ciento.'},
    ],
    'cifra_clave': ('30 casos', 'Al 100 % después de cada actualización: la prueba de que el cálculo sigue la norma.'),
    'cierre_titulo': 'Gracias',
    'cierre': 'Gracias por acompañarnos en esta serie. La lista completa está en el capítulo treinta y cuatro del manual.'}
