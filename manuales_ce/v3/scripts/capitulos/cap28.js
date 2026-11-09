// Manual v3, capítulo 28 (pago de la planilla, entrega de boletas y constancias). Origen: v2 (22/10/2026, escenario del
// manual en SOLSE Demo con trabajadores 70009xxx, borrados después) más los lotes 21a, 21b, 38, 40, 53 y 59. Cifras
// medidas en contable19: re-mediciones de los lotes 21a, 21b, 38 (pruebas A4 a A7) y 43 a 56, y los casos
// DOCUMENTOS_CESE, UTILIDADES_REPARTO y PROVISIONES_BOLETA leídos el 09/11/2026 (solo lectura).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 28
  a(
    h1('28. Pago de la planilla, entrega de boletas y constancias'),
    h2('28.1 Registrar el pago'),
    p('Con el lote **validado**, **Registrar pago** (N-07) abre el asistente: diario de pago (banco), fecha, referencia (N.° de operación), la casilla **«Un asiento por trabajador»** y la lista de boletas con su importe **por pagar**. Al registrar se crea el asiento del pago, que concilia la 41x de cada trabajador (la 411, 413, 415 o 419: lo que se le debe, no la 417 de la AFP). Cada boleta queda pagada con su fecha, su asiento y su número de operación. Un segundo «Registrar pago» no vuelve a tomar las boletas pagadas: «No hay boletas por pagar en el lote…».'),
    ...figura('c28_02_registrar_pago', 'Registrar pago del lote «Planilla diciembre 2026» de FM SYSTEMS: la boleta de Héctor por S/ 1 914,00 y la casilla «Un asiento por trabajador», desmarcada.'),
    tabla(['«Un asiento por trabajador»', 'Asiento', 'Medido (re-medición del lote 38)'], [
      ['Desmarcada (por defecto)', 'Uno por lote: debe a la 41x con una línea por boleta, cuenta y trabajador; haber al banco', 'Lote de prueba con tres mensuales de octubre de 2026 del caso COMPUTABLE: un asiento de **8 352,00** (2 784,00, 2 610,00 y 2 958,00), cada línea con su trabajador y conciliada'],
      ['Marcada', 'Uno por trabajador, con su contacto también en la línea del banco: se concilia transferencia por transferencia', 'Lote «Utilidades del ejercicio 2031» (UTILIDADES_REPARTO): dos asientos, **48 784,40** y **88 230,14**, cada uno con la 4111 conciliada'],
    ], [2200, 3638, 3800]),
    p('El Libro Diario admite el asiento consolidado del día con su detalle (PLE, formato 5.1), así que la casilla es para conciliar, no una obligación. Qué usa cada empresa es la pregunta P-53 a de la contadora; hoy, por lote.'),
    ...figura('c28_03_asiento_pago', 'Asiento del pago del escenario del v2, un asiento por lote: debe 4111 de cada trabajador (2 175,00 y 2 610,00), haber banco 4 785,00; apuntes conciliados.'),
    ...figura('c28_04_boleta_pagada', 'Boleta pagada del escenario del v2: fecha de pago 30/11, asiento del pago, N.° de operación OP-2026-11-30 y «Entregar hasta» 3 de diciembre.'),
    nota('Para que el pago concilie, las líneas 41x del asiento de la boleta llevan al trabajador como socio (capítulo 7). Medido en el escenario del v2: el saldo 41x de cada trabajador queda en 0,00 después del pago. «Registrar pago» toma la compañía del lote aunque el usuario tenga otra activa (lote 40).', 'nota'),
    p('**Quién lo registra (lote 53).** El botón «Registrar pago» del lote es del grupo **Contabilidad / Facturación**: el contable lo abre y registra el pago desde el lote sin ser «Nómina / Administrador».'),
    nota('Con «Provisión mensual de beneficios» en «En la boleta mensual», o con «Aplicación de lo provisionado» en «En la boleta del beneficio» (capítulo 7), las líneas de provisión y de aplicación del asiento de la boleta van a la 4114, 4115 y 4151 con el trabajador, y el asistente las cuenta como deuda con él. Medido en contable19: la mensual de enero de 2028 de 70002201 (PROVISIONES_BOLETA) tiene neto **2 583,07** y figura con **3 669,74** por pagar (el neto más 500,00, 45,00, 291,67 y 250,00 de provisión); la gratificación de julio de 2029 de 70002301 (PROVISIONES_BENEFICIO), con neto 3 270,00, figura con **0,00**. Esas boletas no se pagan con «Registrar pago» mientras no se corrija (hallazgo informado). Con «Asiento mensual de provisiones» no pasa: la provisión va en su propio asiento.', 'limite'),

    h2('28.2 El pago de AFPnet'),
    p('Los aportes retenidos al trabajador del SPP quedan en la **417** y se pagan a cada AFP dentro de los primeros cinco días hábiles del mes siguiente (TUO de la Ley del SPP, art. 34). **Nómina › Nómina PE › AFPnet: registrar el pago** (también en **Facturación › Proveedores**, para quien registra los pagos sin tener nómina) hace **un asiento por AFP**, con la fecha del pago: debe a la 417 por lo retenido del periodo y haber al banco, y lo concilia con las boletas.'),
    ...pasos([
      'Elija la compañía, el **mes** y el **año** del periodo y, si paga solo algunas, **Solo estas AFP** (vacío: todas).',
      'Elija el **Diario de pago**, la **Fecha de pago** y la **Referencia** (el número de la planilla AFPnet o de la operación del banco).',
      '**Registrar el pago**. Las boletas quedan con su **Pago de AFPnet**; una segunda vez no hay nada que pagar. Si el pago se anula o se revierte, se puede registrar otra vez.',
    ]),
    ...figura('c28_06_afpnet_pago', 'Asistente «Registrar el pago de AFPnet» de FM SYSTEMS para noviembre de 2026: un asiento por AFP, debe 417 y haber banco.'),
    vinetas([
      'La AFP es la **del cálculo de la boleta**: un traspaso posterior no la cambia (como el Excel de AFPnet, lote 40).',
      'Pagado después del plazo, el asiento lo dice en una nota. Medido en la re-medición del lote 38 (laboratorio, julio de 2026 pagado el 03/11): cuatro asientos (Habitat 2 358,03, Integra 1 232,60, Prima 217,88 y Profuturo 587,70), cada uno con «Pagado fuera del plazo: … hasta el 07/08/2026».',
      'En FM SYSTEMS se registraron así los pagos de mayo a octubre de 2026: seis asientos de **596,00** (mayo a septiembre) y **597,30** (octubre), con la 417 de esos meses conciliada.',
    ]),

    h2('28.3 Entrega de la boleta'),
    p('La boleta se entrega a más tardar el **tercer día hábil** después del pago (D.S. 001-98-TR): la boleta muestra la fecha límite en **Entregar hasta**. La entrega puede ser:'),
    vinetas([
      '**Física**: se imprime y el trabajador firma. Con **Confirmar recepción** se registra la fecha en que la recibió.',
      '**Por correo** (N-08): **Enviar por correo** (en la boleta) o **Enviar boletas por correo** (en el lote) manda la boleta en PDF, y la liquidación del depósito si es de CTS, y deja la constancia en el historial. La respuesta del trabajador desde ese correo registra la recepción.',
    ]),
    h3('A quién se envía (lote 38)'),
    p('La opción **«Boleta por correo»** (compañía, pestaña Nómina PE - Controles, grupo «Boleta por correo (N-08)», y Ajustes) decide a quién:'),
    tabla(['Opción', 'A quién', 'Norma'], [
      ['«Solo con el acuerdo del trabajador» (por defecto)', 'A quien tiene en su ficha el **acuerdo de entrega electrónica** (capítulo 8): «Boleta por correo», fecha del acuerdo y correo', 'D.S. 001-98-TR, art. 19'],
      ['«Con el acuerdo o, sin él, a quien cobra en cuenta (D.Leg. 1310, art. 3.2)»', 'Además, la boleta de la remuneración a quien no firmó pero cobra en cuenta: con el pago registrado con un diario de banco o, registrado por otra vía (con su fecha), con una cuenta sueldo en su ficha. Va a su correo de trabajo o, si no tiene, al personal', 'D.Leg. 1310, art. 3.2'],
    ], [3200, 4438, 2000]),
    ...figura('c28_08_opcion_boleta_correo', 'Ajustes › Nómina PE › «Boleta por correo (N-08)»: las dos opciones de «Boleta por correo» y «Documento del trabajador en su contacto».'),
    vinetas([
      'Con la segunda opción, sin el pago registrado no se envía; sin correo de trabajo ni personal, tampoco, y el aviso lo dice. La nota del historial dice «Puesta a disposición por correo sin acuerdo previo: pago depositado en cuenta (D.Leg. 1310, art. 3.2).»',
      'La liquidación del depósito de la CTS y los documentos del cese **siguen pidiendo el acuerdo**.',
      'El pie de la boleta cita el D.S. 001-98-TR, art. 19, y el D.Leg. 1310, art. 3.',
      '**El remitente** es el correo de la compañía o, si no tiene, el del usuario. Sin ninguno, la boleta no se envía y el aviso dice «sin remitente» (antes salía sin remitente).',
      '**El reenvío** de la misma boleta adjunta los mismos PDF, sin crear otra constancia, y la nota lo dice. Si lo impreso cambió (una línea, el número de operación, el DNI corregido), se adjuntan los nuevos y se conservan los anteriores: son la prueba de lo enviado (D.Leg. 1310, art. 3.4).',
    ]),
    ...figura('c28_05_enviar_boletas_sin_acuerdo', '«Enviar boletas por correo» pide confirmación: «Se enviará por correo a cada trabajador con acuerdo de entrega electrónica su boleta validada del lote que aún no se envió…». (Se canceló: los trabajadores del escenario no tienen acuerdo.)'),
    p('**«SON: … SOLES».** La unidad es el sol (Ley 30381) y el texto oficial escribe el plural: la boleta, la hoja de liquidación y la liquidación de la CTS dicen, por ejemplo, «SON: DOS MIL SEISCIENTOS ONCE Y 50/100 SOLES» (medido en contable19; antes, «SOL»). Los importes impresos llevan coma de miles, como el resto de Odoo en español de Perú: «2,611.50» (lote 59).'),
    nota('El envío usa el servidor de correo saliente de la base. En la base de pruebas no se envió ningún correo: el manual no muestra el correo recibido. Los criterios de los lotes 8, 21a, 21b y 38 lo midieron en una base local con correos ficticios.', 'nota'),

    h2('28.4 Los documentos del cese (lote 21a)'),
    p('**Enviar por correo** de una liquidación con cese (N-15) lleva la **boleta**, la **hoja de liquidación de beneficios sociales**, el **certificado de trabajo** y, si el trabajador tiene cuenta CTS, la **constancia de cese para el retiro de la CTS**, con la plantilla «Nómina PE: liquidación de beneficios sociales y documentos del cese». La nota del historial dice «Con: …» y la lista de documentos. Los tres documentos se imprimen también desde **Imprimir** en la liquidación validada (capítulo 16).'),
    ...figura('c28_07_documentos_cese_imprimir', 'Liquidación de 70002401 (caso DOCUMENTOS_CESE, renuncia el 31/08/2030): Imprimir con la hoja de liquidación, el certificado de trabajo y la constancia de cese; «Entregar hasta» 2 sep.'),
    vinetas([
      '**La fecha límite** de una liquidación con cese es **48 horas desde el cese** (la del pago y la del certificado de trabajo), no los días hábiles desde el pago. En DOCUMENTOS_CESE, las cinco liquidaciones del 31/08/2030 dicen **Entregar hasta 02/09/2030**.',
      '«Enviar boletas por correo» de un lote cuenta **50 documentos por pulsación**, no 50 boletas: una liquidación con cese vale 3 o 4, así que cada pulsación envía unas 12 liquidaciones y avisa cuántas quedan. En DOCUMENTOS_CESE se enviarían **19 documentos** de cinco liquidaciones (70002404 no tiene cuenta CTS y su constancia no se emite).',
      'Sin representante del empleador (Empleados › «Es empleador»), los documentos salen sin su nombre. En contable19, ni FM SYSTEMS ni SOLSE Demo Servicios lo tienen: regístrelo antes de la primera liquidación.',
      'Una boleta mensual sigue enviando solo la suya.',
    ]),

    h2('28.5 La hoja de liquidación de utilidades (lote 21b)'),
    p('La hoja se entrega **al momento del pago** (D.Leg. 892, art. 7; capítulo 20):'),
    vinetas([
      'la boleta de la **planilla de utilidades**, con «Enviar por correo» o desde el lote, lleva la boleta y su hoja, con la plantilla «Nómina PE: boleta y hoja de liquidación de utilidades»;',
      'el **ex trabajador**, que no tiene boleta, la recibe desde su línea del reparto («Enviar por correo»), desde el reparto («Enviar las hojas de los ex trabajadores») o desde **Nómina › Nómina PE › Trabajadores del reparto de utilidades** («Enviar las hojas por correo»), con la plantilla «Nómina PE: hoja de liquidación de utilidades (ex trabajador)». Necesita el reparto confirmado, su participación, el pago registrado en la línea, el acuerdo de entrega electrónica y el representante del empleador;',
      '**la fecha límite es la del pago** (la de la boleta o, si aún no se registra, la del reparto), no el tercer día hábil (P-119);',
      '**Confirmar recepción** en la línea del ex trabajador aparece con el pago registrado, aunque no se haya enviado por correo: ahí se registra el cargo de la hoja entregada impresa (la prueba de la entrega es del empleador, RLGIT 23.2).',
    ]),
    tabla(['UTILIDADES_REPARTO (pago el 30/04/2032)', 'Cómo se entrega', 'Entregar hasta'], [
      ['70002501, en la planilla (neto 48 784,40)', 'Desde la boleta: «Boleta de Pago» y «Hoja de liquidación de utilidades»', '30/04/2032'],
      ['70002502, ex trabajadora (cese el 31/01/2032)', 'Desde su línea: «Hoja de liquidación de utilidades»; «Pagado fuera de la planilla el 30/04/2032»', '30/04/2032'],
      ['70002503, en la planilla (neto 88 230,14)', 'Desde la boleta: la boleta y la hoja', '30/04/2032'],
    ], [3200, 4638, 1800]),

    h2('28.6 Constancias'),
    tabla(['Documento', 'Dónde', 'Capítulo'], [
      ['Boleta de pago (D.S. 001-98-TR)', 'Boleta › Imprimir › Boleta de Pago (PE)', '10'],
      ['Liquidación del depósito de CTS', 'Boleta de CTS › Imprimir › Liquidación de depósito de CTS (PE)', '15'],
      ['Hoja de liquidación de beneficios sociales', 'Liquidación › Imprimir › Hoja de liquidación de beneficios sociales (PE)', '16'],
      ['Certificado de trabajo (D.S. 001-96-TR)', 'Liquidación › Imprimir › Certificado de trabajo (PE)', '16'],
      ['Constancia de cese para el retiro de la CTS (una por cuenta CTS)', 'Liquidación › Imprimir › Constancia de cese para el retiro de la CTS (PE)', '16'],
      ['Hoja de liquidación de utilidades (D.Leg. 892, art. 7)', 'Línea del reparto › Hoja de liquidación, o Imprimir › Hoja de liquidación de utilidades (PE)', '20'],
      ['Certificado de rentas y retenciones de 5.ª', 'Nómina PE › Certificado de 5.ª categoría', '13'],
    ], [3400, 4838, 1400]),
    p('La hoja de liquidación, la liquidación de la CTS y el detalle del computable imprimen el divisor de las variables con sus días, por ejemplo «3.5667 (107 días ÷ 30)» (lote 46a; capítulos 15 y 16). La liquidación de una CTS validada guarda el detalle con el que se calculó: si después cambian las opciones, no se recalcula.'),

    h2('28.7 Permisos y el documento en el contacto (lote 38)'),
    vinetas([
      '**«Nómina / Usuario»** crea, calcula, valida, imprime y envía las boletas que puede ver, sin «Empleados / Administrador» (en Odoo 19 el sueldo y las fechas del contrato son de ese grupo, y dárselo le abriría la ficha de todos los empleados). La validación crea el asiento. Lo que no puede ver sigue cerrado: las boletas de un área que no dirige o de una compañía que no tiene.',
      'Para el pago: «Registrar pago» y «AFPnet: registrar el pago» piden **Contabilidad / Facturación**. La planilla de utilidades la genera el responsable de nómina (capítulo 20).',
      'Conviene anotar los grupos de nómina en el documento de seguridad de la compañía y revisarlos cada seis meses (D.S. 016-2024-JUS, arts. 46 y 47).',
      '**«Documento del trabajador en su contacto de trabajo»** (apagada por defecto, P-53 c): al crear el empleado o cambiar su documento, su contacto de trabajo recibe el número y el tipo (DNI, carné de extranjería, pasaporte, RUC, PTP o su carné, carné de RR. EE. o documento extranjero); al marcarla, se completan los que ya estaban. Un contacto que ya tiene otro número (el RUC del trabajador que también emite recibos) se respeta. Está apagada porque el contacto lo ve cualquier usuario interno; el formato 3.11 del PLE ya toma el documento de la ficha (capítulo 7).',
    ]),
    pieCapitulo(['ce'], 'N-07, N-08, N-15 (21a), N-16 (21b), O-81, O-82, O-84, P-53 a, c y d, P-54 a, O-74, O-79 (38), O-158 y O-159 (40), lote 53, lote 59'),
  );


  return c;
};
