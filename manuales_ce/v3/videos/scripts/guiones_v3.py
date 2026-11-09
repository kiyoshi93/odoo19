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
         'focos': ['IND_001', 'Neto de liquidación'],
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
