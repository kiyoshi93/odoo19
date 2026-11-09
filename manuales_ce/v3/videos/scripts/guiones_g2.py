# Guiones del grupo g2_contabilidad: E20 (reemplazo, capítulo 28) y E31 (nuevo, provisiones, capítulo 7).
# Cifras: las del manual v3 (capítulos 7 y 28), medidas en contable19 en noviembre de 2026. Solo capturas del v3.
REEMPLAZOS = {}
NUEVOS = []

# ---------------------------------------------------------------------- E20 · reemplazo
REEMPLAZOS['E20'] = {
    'id': 'E20', 'titulo': 'Pago de la planilla y entrega de boletas', 'capitulos': ['28'],
    'caso': 'recorrido de FM (Héctor y Lucía), DOCUMENTOS_CESE y UTILIDADES_REPARTO',
    'modulos': ['base', 'ce'],
    'entrada': 'Pagar la planilla, pagar AFPnet y entregar cada boleta y cada constancia a tiempo. En este episodio vemos cómo se registra el pago, '
               'a quién se le envía la boleta por correo y qué documentos acompañan a la liquidación y a las utilidades.',
    'escenas': [
        {'t': 'cap', 'img': 'c28_02_registrar_pago', 'rotulo': 'Registrar pago del lote validado',
         'focos': ['Un asiento por', '1,914.00'],
         'voz': 'Desde el lote validado, Registrar pago muestra lo que se le debe a cada trabajador: en la planilla de diciembre, [[S 1914]]. '
                'Se elige el banco, la fecha y la referencia. Por defecto se hace un asiento por lote; con la casilla Un asiento por trabajador, '
                'uno por trabajador, para conciliar transferencia por transferencia. El contable lo registra desde el lote, sin ser administrador de nómina.'},
        {'t': 'cap', 'img': 'c28_04_boleta_pagada', 'rotulo': 'La boleta queda con su pago y su plazo de entrega',
         'focos': ['OP-UTIL-2031-70002501'],
         'voz': 'Cada boleta queda con su fecha de pago, su número de operación y la fecha límite de entrega. La boleta común se entrega hasta el tercer día hábil después del pago; '
                'la de utilidades, el mismo día del pago: aquí, el treinta de abril de dos mil treinta y dos.'},
        {'t': 'cap', 'img': 'c28_06_afpnet_pago', 'rotulo': 'Nómina PE › AFPnet: registrar el pago',
         'focos': ['Solo estas AFP'],
         'voz': 'Los aportes retenidos al sistema privado quedan en la cuenta cuatro uno siete y se pagan en los primeros cinco días hábiles del mes siguiente. '
                'Este asistente hace un asiento por AFP: debe la cuatro uno siete, haber el banco. Si se paga tarde, el asiento lo dice.'},
        {'t': 'cap', 'img': 'c28_03_asiento_pago_afpnet', 'rotulo': 'Asiento del pago de AFPnet, conciliado',
         'focos': ['597.30'],
         'voz': 'Así queda el pago de octubre a Integra: [[S 597.30]] al debe de la cuatro uno siete y al haber del banco, conciliado con la boleta. '
                'Una segunda vez, el asistente ya no encuentra nada que pagar.'},
        {'t': 'cap', 'img': 'c28_08_opcion_boleta_correo', 'rotulo': 'Compañía › Boleta por correo',
         'focos': ['Solo con el acuerdo'],
         'voz': 'La compañía decide a quién se envía la boleta por correo. Por defecto, solo a quien firmó el acuerdo de entrega electrónica. '
                'Con la otra opción, también a quien cobra en cuenta, como permite el Decreto Legislativo mil trescientos diez, siempre que el pago esté registrado.'},
        {'t': 'tarjeta', 'ceja': 'Enviar por correo', 'titulo': 'Lo que cuida el envío',
         'items': ['Sale del correo de la compañía o del usuario; sin remitente, no se envía',
                   'Reenviar adjunta los mismos PDF; si lo impreso cambió, guarda los dos',
                   'SON: … Y 50/100 SOLES, en plural',
                   'Nómina / Usuario calcula, valida, imprime y envía sus boletas'],
         'voz': 'El correo sale de la dirección de la compañía o, si no tiene, de la del usuario; sin ninguna, la boleta no se envía. '
                'Reenviar la misma boleta adjunta los mismos documentos; si algo impreso cambió, se guardan los nuevos y los anteriores, como prueba. '
                'El importe en letras dice soles, en plural. Y el usuario de nómina ya puede calcular, validar, imprimir y enviar las boletas que ve.'},
        {'t': 'cap', 'img': 'c28_07_documentos_cese_imprimir', 'rotulo': 'Liquidación: los documentos del cese',
         'focos': ['Certificado de trabajo', 'Constancia de cese'],
         'voz': 'La liquidación con cese se imprime y se envía con tres documentos más: la hoja de liquidación, el certificado de trabajo y la constancia de cese para retirar la CTS. '
                'Su plazo es de cuarenta y ocho horas desde el cese: con cese el treinta y uno de agosto, se entrega hasta el dos de setiembre.'},
        {'t': 'tarjeta', 'ceja': 'Utilidades', 'titulo': 'La hoja de liquidación de utilidades',
         'items': ['Va con la boleta de la planilla de utilidades', 'El ex trabajador la recibe desde su línea del reparto', 'Se entrega el día del pago'],
         'voz': 'La hoja de liquidación de utilidades va junto con la boleta de la planilla de utilidades. El ex trabajador, que no tiene boleta, la recibe desde su línea del reparto, '
                'con el pago registrado. En los dos casos se entrega el mismo día del pago.'},
    ],
    'cifra_clave': ('48 horas', 'Plazo de entrega de la liquidación con cese y sus documentos: cese el 31/08/2030, entregar hasta el 02/09/2030 (caso DOCUMENTOS_CESE).'),
    'cierre_titulo': 'Pagar y entregar a tiempo',
    'cierre': 'Si la compañía provisiona en la boleta mensual, esas boletas todavía no se pagan con Registrar pago; está anotado como límite. '
              'Si se paga por lote o por trabajador es un criterio pendiente de confirmación de la contadora. Todo está en el capítulo veintiocho del manual.'}

# ---------------------------------------------------------------------- E31 · nuevo · nota 4
NUEVOS.append({
    'id': 'E31', 'titulo': 'Provisiones de gratificación, CTS y vacaciones', 'capitulos': ['7'],
    'caso': 'PROVISIONES, PROVISIONES_BOLETA y PROVISIONES_BENEFICIO',
    'modulos': ['base', 'ce', 'ce_demo'],
    'entrada': 'La gratificación, la CTS y las vacaciones se devengan cada mes, aunque se paguen después. Con las provisiones, el gasto se reconoce mes a mes '
               'y el pasivo se descarga al pagar. Veamos las tres formas de hacerlo y sus cifras.',
    'escenas': [
        {'t': 'cap', 'img': 'c07_05_opciones_provisiones', 'rotulo': 'Compañía › Provisiones (N-13)',
         'focos': ['Asiento mensual de provisiones', 'Remedir cada mes'],
         'voz': 'Las opciones están en la compañía, pestaña Nómina PE Controles. Provisión mensual de beneficios: sin provisión, que es lo de fábrica, '
                'con un asiento mensual, o en la boleta mensual. Debajo, dónde se aplica lo provisionado, el EsSalud de las vacaciones, el adelanto, '
                'la remedición del pasivo de vacaciones y la indemnización vacacional.'},
        {'t': 'cap', 'img': 'c07_06_asistente_provisiones', 'rotulo': 'Contabilidad de nómina › Provisiones del mes',
         'focos': ['Con el saldo inicial'],
         'voz': 'Con el asiento mensual, el asistente Provisiones del mes se ejecuta después de validar las boletas del mes. '
                'El primer mes se marca Con el saldo inicial, para llevar al pasivo lo devengado antes.'},
        {'t': 'cap', 'img': 'c07_07_asiento_provisiones_enero', 'rotulo': 'Asiento de enero de 2027',
         'focos': ['583.33'],
         'voz': 'El asiento de enero de dos mil veintisiete del caso suma [[S 17337.50]], con el trabajador en cada línea. '
                'Con un sueldo de tres mil, un mes provisiona [[S 500]] de gratificación, [[S 45]] de bonificación, [[S 291.67]] de CTS y [[S 250]] de vacaciones; '
                'y el saldo inicial de la CTS de noviembre y diciembre, [[S 583.33]].'},
        {'t': 'cap', 'img': 'c07_08_registro_provisiones', 'rotulo': 'Nómina PE › Provisiones de beneficios',
         'focos': ['1,750.01'],
         'voz': 'El registro guarda lo provisionado y lo aplicado por trabajador, concepto y periodo. En mayo, la CTS aplica [[S 1750.01]], '
                'y la boleta pagó [[S 1500]]: la diferencia vuelve al gasto del mes.'},
        {'t': 'cap', 'img': 'c07_09_boleta_lineas_provision', 'rotulo': 'En la boleta mensual: las líneas PRO',
         'focos': ['PRO_GRA', '2,583.07'],
         'voz': 'Con la provisión en la boleta mensual, la provisión va en sus líneas, en la categoría Provisiones: quinientos, cuarenta y cinco, doscientos noventa y uno con sesenta y siete, '
                'doscientos cincuenta y el EsSalud de [[S 22.50]]. No suman al neto, que sigue en [[S 2583.07]].'},
        {'t': 'cap', 'img': 'c07_10_asiento_gratificacion_aplicacion', 'rotulo': 'Aplicación en la boleta del beneficio',
         'focos': ['PLLA/2029/07/0001'],
         'voz': 'Con la aplicación en la boleta del beneficio, la gratificación de julio descarga su propio semestre: debe la cuatro uno uno cuatro y haber la seis dos uno cuatro, '
                '[[S 3000]] y [[S 270]]. El neto del trabajador no cambia.'},
        {'t': 'tarjeta', 'ceja': 'Las vacaciones', 'titulo': 'El pasivo se mide con la remuneración vigente',
         'items': ['Remedición: aumento de 3 000 a 4 000 en julio → 2 333,33 al 31/07 (antes 1 833,33)',
                   'Récord vencido sin gozar: indemnización vacacional a la 623 y la 4115',
                   'Un mes ya contabilizado se corrige con un asiento de ajuste: 267,33',
                   'Saldo inicial de un ejercicio cerrado: 13 465,82 a la 5922'],
         'voz': 'Las vacaciones se pagan con la remuneración vigente al goce, así que cada mes el pasivo se remide: con un aumento de tres mil a cuatro mil en julio, '
                'el pasivo al treinta y uno de julio es [[S 2333.33]] en lugar de [[S 1833.33]]. El récord vencido sin gozar provisiona la indemnización vacacional. '
                'Un mes ya contabilizado se corrige con un ajuste solo por la diferencia, y el saldo inicial de un ejercicio cerrado va a resultados acumulados.'},
    ],
    'cifra_clave': ('S/ 1 086,67', 'Provisión de un mes con sueldo 3 000: gratificación 500,00, bonificación 45,00, CTS 291,67 y vacaciones 250,00 (caso PROVISIONES, 70002101).'),
    'cierre_titulo': 'Criterios pendientes de confirmación',
    'cierre': 'Las cuentas y la base de la provisión, las variables que no llegan a ser regulares, la remedición con un aumento, la liquidación rectificada '
              'y las cuentas de la indemnización vacacional son criterios pendientes de confirmación de la contadora. Todo está en el capítulo siete del manual.'})
