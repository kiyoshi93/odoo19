# Guiones del v3, grupo g1_configuracion: E03, E04, E05 y E18 (capítulos 3 a 9 y 6/12 del manual v3).
# Cifras: las del manual v3 (casos del laboratorio medidos en contable19 el 09/11/2026). Solo capturas tomadas en noviembre de 2026.
REEMPLAZOS = {}

# ---------------------------------------------------------------------- E03 · parámetros
REEMPLAZOS['E03'] = {
    'id': 'E03', 'titulo': 'Parámetros legales con vigencia', 'capitulos': ['4', '26'], 'caso': 'NOMINA (hoja Parámetros)',
    'modulos': ['base', 'ce'],
    'entrada': 'Los valores legales de la planilla, como la UIT, la remuneración mínima o las tasas de las AFP, se guardan como parámetros con vigencia. '
               'Veamos cómo se mantienen, y los dos parámetros nuevos de esta versión.',
    'escenas': [
        {'t': 'cap', 'img': 'c04_01_parametros_lista', 'rotulo': 'Nómina PE › Parámetros de Nómina PE: 27 parámetros',
         'focos': ['pe_feriado_sobretasa', 'Tasa del no domiciliado'],
         'voz': 'En Nómina PE, Parámetros de Nómina PE, están los [[N 27]] parámetros, agrupados por categoría y con su valor vigente a hoy. '
                'Hay dos nuevos: la sobretasa del trabajo en feriado, uno punto cero, que es el cien por ciento, y la tasa del trabajador no domiciliado, el treinta por ciento.'},
        {'t': 'cap', 'img': 'c04_02_parametro_rmv', 'rotulo': 'RMV: una fila por vigencia',
         'focos': ['1230', '1130'],
         'voz': 'La remuneración mínima tiene dos vigencias: [[S 1130]] desde el 1 de enero de 2025 y [[S 1230]] desde el 1 de octubre de 2026. '
                'Cuando cambia, se agrega una vigencia; la anterior se conserva, y el recálculo de un mes pasado sigue usando la suya.'},
        {'t': 'cap', 'img': 'c04_03_parametro_rma', 'rotulo': 'RMA: una vigencia por trimestre',
         'voz': 'La remuneración máxima asegurable de las AFP cambia cada trimestre: tiene una vigencia por trimestre de 2025 y de 2026. La de octubre de 2026 es [[S 12732.70]].'},
        {'t': 'cap', 'img': 'c04_05_nueva_vigencia_comision_afp', 'rotulo': 'Nueva vigencia: una fila por AFP',
         'voz': 'Los parámetros con varias tasas no se escriben como texto. El botón Nueva vigencia abre un editor con una fila por AFP, la tasa en porcentaje y el texto que se guardará.'},
        {'t': 'cap', 'img': 'c04_06_editar_tramos_en_tabla', 'rotulo': 'Tramos de la renta de quinta en tabla',
         'voz': 'Y Editar en tabla muestra los tramos de la renta de quinta: cinco, veinte, treinta y cinco y cuarenta y cinco UIT, y el último sin tope. '
                'Al guardar, cada valor se comprueba: con punto decimal, sin separador de miles y con todas las claves que leen las reglas.'},
        {'t': 'cap', 'img': 'c04_08_boleta_2027_alertas_rma_uit', 'rotulo': 'Avisos antes de calcular 2027',
         'voz': 'Si falta una vigencia, la boleta avisa antes de calcular. En una boleta de enero de 2027, sin guardar, la banda dice que la RMA es de octubre, '
                'que faltan los feriados de 2027 y que falta la UIT de 2027, con lo que se usaría la de 2026: [[S 5500]]. El último aviso es nuevo: el del SENATI, que tiene su propio episodio.'},
        {'t': 'tarjeta', 'ceja': 'Nuevo en la versión 3', 'titulo': 'La UIT en dos lugares',
         'items': ['Con el catálogo de la facturación, «UIT por año»', 'La banda avisa si no coincide con la de la nómina', 'No corrige ninguna: se corrige la que no es la publicada',
                   'Hoy coinciden: 5 500 en 2026 y 5 350 en 2025'],
         'voz': 'Si está instalado el catálogo de la facturación, con su tabla UIT por año, la misma banda avisa cuando la UIT de ese catálogo no es la de la nómina. '
                'No corrige ninguna de las dos: la renta de quinta usa la de la nómina, y la detracción, la del catálogo. Hoy coinciden: [[S 5500]] en 2026 y [[S 5350]] en 2025.'},
    ],
    'cifra_clave': ('S/ 1 230', 'Remuneración mínima vital desde el 1 de octubre de 2026: una vigencia nueva en el parámetro, sin tocar las reglas.'),
    'cierre_titulo': 'Revise los parámetros cada trimestre',
    'cierre': 'Revise la RMA al inicio de cada trimestre, la UIT cada primero de enero, y la remuneración mínima y las comisiones de las AFP cuando cambien. '
              'La banda le recuerda la RMA y la UIT, pero no la remuneración mínima ni las comisiones. Está en los capítulos cuatro y veintiséis del manual.'}

# ---------------------------------------------------------------------- E04 · maestros, seguros y mapeo contable
REEMPLAZOS['E04'] = {
    'id': 'E04', 'titulo': 'Maestros SUNAT, seguros y mapeo contable', 'capitulos': ['5', '6', '7'], 'caso': None,
    'modulos': ['base', 'ce'],
    'entrada': 'Este episodio recorre las tablas de SUNAT, los seguros y la configuración contable de la nómina: lo que se revisa una vez por compañía.',
    'escenas': [
        {'t': 'cap', 'img': 'c05_01_t22_conceptos_plame', 'rotulo': 'T22: conceptos del PLAME',
         'voz': 'La tabla veintidós tiene los [[N 293]] conceptos del PLAME, con su código y los tributos y aportes a los que está afecto cada uno. '
                'Los códigos que empezaron a usar las reglas de esta versión, como el cero uno uno seis o el cero cuatro cero siete, ya estaban en ella.'},
        {'t': 'cap', 'img': 'c05_03_busqueda_por_codigo', 'rotulo': 'Búsqueda por código: 0121',
         'focos': ['0121'],
         'voz': 'Cada maestro se muestra como código y descripción, y se busca por cualquiera de los dos: cero uno dos uno encuentra Remuneración o jornal básico.'},
        {'t': 'cap', 'img': 'c05_05_t19_vinculos', 'rotulo': 'T19: vínculos familiares',
         'voz': 'Para el T-Registro están los vínculos de la tabla diecinueve, los [[N 1892]] distritos del ubigeo de RENIEC y las [[N 5925]] combinaciones de institución y carrera. '
                'Un parentesco sin código de la tabla diecinueve no se exporta como derechohabiente.'},
        {'t': 'tarjeta', 'ceja': 'Listas dentro del contrato', 'titulo': 'Tablas nuevas de la versión 3',
         'items': ['T18: modalidad formativa (el practicante)', 'T25: convenio para evitar la doble tributación', '«0 · Ninguno» por defecto; «3 · Comunidad Andina»', 'Japón aún sin código en la T25: va con «0»'],
         'voz': 'Dos tablas nuevas son listas dentro del contrato: la dieciocho, la modalidad formativa del practicante, y la veinticinco, el convenio para evitar la doble tributación del no domiciliado. '
                'El convenio con Japón está vigente, pero la tabla veinticinco todavía no tiene su código: ese trabajador va con cero, ninguno.'},
        {'t': 'cap', 'img': 'c06_01_planes_eps', 'rotulo': 'Seguros y EPS › Planes EPS',
         'voz': 'En Seguros y EPS se registran los planes EPS, con su entidad de la tabla catorce, su vigencia y la tasa o el importe del empleador y del trabajador. '
                'Desde esta versión, el plan cuenta solo mientras está vigente, y un plan por importe fijo también genera su crédito.'},
        {'t': 'cap', 'img': 'c06_05_polizas_sctr', 'rotulo': 'Seguros y EPS › Pólizas SCTR',
         'focos': ['Salud - EPS', '0.5300'],
         'voz': 'Y la entrada nueva, Pólizas SCTR: una póliza por entidad y vigencia, con la tasa del contrato. En el caso SCTR: EsSalud [[P 0.53]], EPS [[P 1.20]], ONP [[P 0.92]] y compañía de seguros [[P 1.05]]. '
                'El detalle del SCTR está en el episodio dieciocho.'},
        {'t': 'cap', 'img': 'c07_01_mapeo_pcge', 'rotulo': 'Mapeo contable PCGE: 79 filas',
         'focos': ['1-79 / 79', 'RB_001'],
         'voz': 'El mapeo contable asigna a cada regla su prefijo de débito y de crédito del plan contable general empresarial. En esta versión tiene [[N 79]] filas; en la anterior eran cuarenta y cinco. '
                'La remuneración básica va al debe de la seis dos uno uno y al haber de la cuatro uno uno uno.'},
        {'t': 'tarjeta', 'ceja': 'Cuentas nuevas', 'titulo': 'Lo que cambió en el asiento',
         'items': ['Descuento deducible y tardanza: debe 4111, haber 6211', 'Prestaciones alimentarias entregadas: 4699', 'SCTR: 4031 (EsSalud), 4032 (ONP), 4699 (EPS o compañía)', 'Indemnización vacacional: 623'],
         'voz': 'Algunas cuentas son nuevas. El descuento deducible y la tardanza rebajan el gasto: debe cuatro uno uno uno, haber seis dos uno uno. Los vales de alimentos entregados van a la cuatro seis nueve nueve. '
                'El SCTR va a la cuatro cero tres uno con EsSalud, a la cuatro cero tres dos con la ONP, y a la cuatro seis nueve nueve con una EPS o una compañía. '
                'Algunas cuentas son criterio pendiente de confirmación de la contadora; el mapeo se puede cambiar por compañía.'},
    ],
    'cifra_clave': ('79 reglas', 'Cada regla con su cuenta de débito y de crédito del PCGE; el asiento cae en el diario Planillas.'),
    'cierre_titulo': 'Configuración que se hace una vez',
    'cierre': 'Esta configuración se hace una vez por compañía, y se revisa después de cada actualización. Los detalles están en los capítulos cinco, seis y siete del manual.'}

# ---------------------------------------------------------------------- E05 · alta del trabajador y su contrato
REEMPLAZOS['E05'] = {
    'id': 'E05', 'titulo': 'Alta del trabajador y su contrato', 'capitulos': ['8', '9'], 'caso': 'TREGISTRO, EMPRESA_CONSULTORA y EMPRESA_INDUSTRIA',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'Este episodio muestra cómo dar de alta a un trabajador con todo lo que piden la boleta, el PLAME y el T-Registro, y los campos nuevos del contrato en esta versión.',
    'escenas': [
        {'t': 'cap', 'img': 'c08_03_nomina_pe_1', 'rotulo': 'Ficha › pestaña Nómina PE',
         'voz': 'La pestaña Nómina PE de la ficha tiene la identificación para el T-Registro: tipo de documento, nombres y apellidos por separado, situación educativa y la edad, en años cumplidos. '
                'Debajo, el sistema pensionario. Lucía, una trabajadora ficticia del recorrido, está en Integra con comisión por flujo.'},
        {'t': 'cap', 'img': 'c08_17_salud_cuentas_firma', 'rotulo': 'Salud: «Cubierto por SCTR»',
         'focos': ['Cubierto por SCTR'],
         'voz': 'En Salud, la casilla se llama ahora Cubierto por SCTR. Al marcarla aparecen la entidad de salud y la de pensión, que deciden con qué póliza se calcula. '
                'Más abajo, las cuentas bancarias, la firma de boletas y el acuerdo de entrega por correo. La ficha guarda también las rentas de quinta de otros empleadores.'},
        {'t': 'cap', 'img': 'c08_06_derechohabientes', 'rotulo': 'Derechohabientes: la edad del periodo',
         'voz': 'El hijo de Lucía, nacido en 2019, le da derecho a la asignación familiar. La boleta mide la edad del hijo el primer día de su mes, no la de hoy: '
                'el mes en que cumple dieciocho años todavía se paga, un criterio pendiente de confirmación. Un mes entero sin goce no paga la asignación, salvo que la compañía elija pagarla.'},
        {'t': 'cap', 'img': 'c08_16_contrato_t8_t24', 'rotulo': 'Contrato: Perú - Datos laborales',
         'focos': ['Remuneración', 'Es practicante'],
         'voz': 'En el contrato, el grupo de datos laborales tiene campos nuevos. Remuneración principal: fija, comisionista o destajero, para el promedio de las comisiones en los beneficios. '
                'Fuera de la base del SENATI, para el personal que no es de la actividad industrial. Y ¿Es practicante?, que abre los datos del convenio de modalidad formativa, con su propio episodio.'},
        {'t': 'cap', 'img': 'c08_18_contrato_no_domiciliado', 'rotulo': 'No domiciliado y convenio (Tabla 25)',
         'focos': ['Comunidad Andina'],
         'voz': 'Para el extranjero que no pasó más de ciento ochenta y tres días en el país se marca No domiciliado: su quinta es el treinta por ciento. '
                'Con sueldo de [[S 8000]], el consultor de Venezuela retiene [[S 2400]]. Con el convenio tres, Comunidad Andina, el de Colombia retiene con la escala, como un domiciliado: [[S 278.03]].'},
        {'t': 'tarjeta', 'ceja': 'El horario del contrato', 'titulo': 'Valor hora, tiempo parcial y SENATI',
         'items': ['Valor hora: sueldo ÷ 30 ÷ las horas diarias del horario', 'Menos de 4 horas diarias: tiempo parcial, sin CTS', 'S4, 500 con 3 h: ONP 65,00, EsSalud 101,70, neto 435,00', 'I4 «Fuera de la base»: sin SENATI; I3: 18,71'],
         'voz': 'El horario del contrato debe ser la jornada real, porque decide el valor hora de las horas extras y las tardanzas, y el tiempo parcial. Con menos de cuatro horas diarias no hay CTS. '
                'Una asistente con [[S 500]] y tres horas diarias paga ONP [[S 65]], EsSalud sobre la base mínima, [[S 101.70]], y cobra [[S 435]]. '
                'Y en la fábrica, el vendedor marcado fuera de la base no lleva SENATI, mientras la administrativa aporta [[S 18.71]].'},
        {'t': 'tarjeta', 'ceja': 'Renovar no es cesar', 'titulo': 'Un contrato desde el día siguiente es el mismo vínculo',
         'items': ['Renovación el 16/05/2026: gratificación de julio 3 000,00 (antes 500,00)', 'Con la liquidación validada, es otro vínculo y la boleta avisa', 'Anular la liquidación con nota de crédito une el vínculo'],
         'voz': 'Cuando un contrato se renueva, registre el nuevo desde el día siguiente, sin liquidación: los beneficios cuentan desde el inicio del vínculo. '
                'Con una renovación en mayo, la gratificación de julio paga los seis meses: [[S 3000]], y no [[S 500]]. Si hay una liquidación validada en medio, es otro vínculo, y las boletas lo avisan.'},
        {'t': 'cap', 'img': 'c09_01_estructuras', 'rotulo': 'Estructuras salariales y su tipo de planilla',
         'focos': ['Tipo de planilla', 'Planilla de comisiones'],
         'voz': 'Un contrato nuevo nace con la estructura mensual. Cada estructura tiene ahora su tipo de planilla, que es lo que leen el PLAME, AFPnet, los bancos y las utilidades. '
                'Son nuevas las planillas de comisiones, de bonificaciones y de utilidades, y la subvención de modalidad formativa.'},
        {'t': 'cap', 'img': 'c09_05_regla_casillas', 'rotulo': 'La regla: utilidades, extraordinario y remuneración computable',
         'focos': ['MOVL_001', 'Variable regular'],
         'voz': 'Y en cada regla, cuatro campos que decide el cliente: si aplica para utilidades, si es un ingreso extraordinario para la quinta, si es una variable regular para los beneficios, '
                'y cómo entra: variable, fija mensual o periódica. Qué conceptos son fijos mensuales es un criterio pendiente de confirmación.'},
    ],
    'cifra_clave': ('S/ 2 400,00 / 278,03', 'Renta de 5.ª de junio de 2026 con sueldo 8 000: no domiciliado al 30 % frente al andino con la escala (EMPRESA_CONSULTORA, S2 y S5).'),
    'cierre_titulo': 'Datos completos desde el alta',
    'cierre': 'Con la ficha y el contrato completos desde el alta, la boleta, el PLAME y el T-Registro salen sin correcciones. Está en los capítulos ocho y nueve del manual.'}

# ---------------------------------------------------------------------- E18 · Vida Ley y SCTR
REEMPLAZOS['E18'] = {
    'id': 'E18', 'titulo': 'Seguro Vida Ley y SCTR', 'capitulos': ['6', '12'], 'caso': 'VIDALEY y SCTR',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'La Vida Ley y el SCTR son seguros a cargo del empleador, y la planilla los calcula. Este episodio muestra las pólizas, la prima en la boleta y lo nuevo de esta versión.',
    'escenas': [
        {'t': 'cap', 'img': 'c06_02_polizas_vida_ley', 'rotulo': 'Seguros y EPS › Vida Ley',
         'voz': 'Las pólizas de Vida Ley se registran en Seguros y EPS. El caso VIDALEY tiene una póliza por tasa, de [[P 0.53]], con seis trabajadores; otra por importe fijo, y una vencida, que no cobra.'},
        {'t': 'cap', 'img': 'c06_03_poliza_vida_ley', 'rotulo': 'Calcular la prima en la planilla',
         'focos': ['Calcular la prima'],
         'voz': 'Con la casilla Calcular la prima en la planilla, la prima de cada trabajador de la póliza sale en su boleta.'},
        {'t': 'cap', 'img': 'c06_08_boleta_vida_ley', 'rotulo': 'Junio de 2026: VIDA_001 15,90',
         'focos': ['VIDA_001'],
         'voz': 'Con sueldo de [[S 3000]] y la tasa de [[P 0.53]], la prima es [[S 15.90]]. Es un aporte del empleador: el neto del trabajador no cambia. '
                'La base se topa en la remuneración máxima asegurable: con un sueldo de [[S 15000]], la prima es [[S 66.77]].'},
        {'t': 'tarjeta', 'ceja': 'Nuevo en la versión 3', 'titulo': 'La remuneración asegurable',
         'items': ['Un mes entero sin goce: 15,00 (antes 0)', 'Un bono anual «Periódica anual»: fuera (15,00, antes 20,00)', 'Comisionista: el promedio de 3 meses', 'Inhabilitación: no sigue con la prima, y avisa'],
         'voz': 'La prima va ahora sobre la remuneración mensual habitual. En un mes de suspensión, como una licencia sin goce, la empresa sigue pagando sobre la última remuneración: '
                'con tasa de cero coma cincuenta por ciento y sueldo de [[S 3000]], [[S 15]], donde antes era cero. Los bonos periódicos quedan fuera, y las comisiones entran con su promedio.'},
        {'t': 'cap', 'img': 'c09_06_opciones_compania', 'rotulo': 'Compañía › grupo Seguro Vida Ley',
         'focos': ['SEGURO VIDA LEY'],
         'voz': 'Si la póliza de la empresa calcula distinto, la compañía puede volver a lo de antes en el grupo Seguro Vida Ley: solo lo percibido en el mes, todas las variables o la comisión del mes.'},
        {'t': 'cap', 'img': 'c06_05_polizas_sctr', 'rotulo': 'Pólizas SCTR: una por entidad',
         'focos': ['Salud - EPS', '1.2000'],
         'voz': 'El SCTR tiene su propio menú, Pólizas SCTR: una póliza por entidad y vigencia, con la tasa del contrato. Una fracción se rechaza, y por encima del cinco por ciento, avisa.'},
        {'t': 'cap', 'img': 'c06_04_sctr_en_la_ficha', 'rotulo': 'Ficha: Cubierto por SCTR',
         'focos': ['Cubierto por SCTR'],
         'voz': 'En la ficha se marca Cubierto por SCTR y se eligen la entidad de salud, EsSalud o EPS, y la de pensión, ONP o compañía de seguros. Este trabajador está con EsSalud y la ONP: '
                'su boleta de noviembre lleva [[S 15.90]] y [[S 27.60]].'},
        {'t': 'cap', 'img': 'c06_07_boleta_sctr', 'rotulo': 'Noviembre de 2026: EPS 36,00 y compañía 31,50',
         'focos': ['36.00', '31.50'],
         'voz': 'Con la EPS al [[P 1.20]] y la compañía de seguros al [[P 1.05]], una trabajadora de [[S 3000]] lleva [[S 36]] y [[S 31.50]]. '
                'La columna Póliza SCTR dice con qué póliza y tasa se calculó cada línea. Sin entidad en la ficha, la boleta usa la tasa referencial de los parámetros, y avisa.'},
        {'t': 'tarjeta', 'ceja': 'Gratificación', 'titulo': 'El SCTR sobre la gratificación',
         'items': ['Por defecto, la gratificación no paga SCTR (Ley 30334)', 'Con «Cobra la prima sobre la gratificación ordinaria»: EPS 1 % de 3 000 = 30,00', 'Criterio pendiente de confirmación'],
         'voz': 'Por defecto, la gratificación no paga SCTR. Si el contrato de la póliza lo exige, se marca Cobra la prima sobre la gratificación ordinaria: con una EPS al uno por ciento, '
                'la gratificación de [[S 3000]] lleva [[S 30]], con aviso. Es un criterio pendiente de confirmación de la contadora.'},
    ],
    'cifra_clave': ('S/ 15,90', 'Prima de Vida Ley con sueldo 3 000 y tasa 0,53 % (caso VIDALEY); el SCTR con EsSalud al 0,53 % da la misma cifra (caso SCTR).'),
    'cierre_titulo': 'Una póliza por trabajador',
    'cierre': 'Hoy se admite una póliza de Vida Ley por trabajador y una póliza SCTR por entidad y periodo. Está en los capítulos seis y doce del manual.'}
