// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 28
  a(
    h1('28. Pago de la planilla, entrega de boletas y constancias'),
    h2('28.1 Registrar el pago'),
    p('Con el lote **validado**, **Registrar pago** (N-07) abre el asistente: diario de pago (banco), fecha, referencia (N.° de operación) y la lista de boletas con su importe **por pagar**. Al registrar se crea el asiento del pago, que concilia la 4111 de cada trabajador. Cada boleta queda pagada con su fecha, su asiento y su número de operación. Un segundo «Registrar pago» no vuelve a tomar las boletas pagadas.'),
    ...figura('c28_02_registrar_pago', 'Registrar pago del lote de noviembre de 2026 (escenario del manual): dos boletas por S/ 2 175,00 y S/ 2 610,00; total a pagar S/ 4 785,00.'),
    ...figura('c28_03_asiento_pago', 'Asiento del pago BNK1/2026/00001: debe 4111 de cada trabajador (2 175,00 y 2 610,00), haber banco 4 785,00; apuntes conciliados.'),
    ...figura('c28_04_boleta_pagada', 'Boleta pagada: fecha de pago 30/11, asiento del pago, N.° de operación OP-2026-11-30 y «Entregar hasta» 3 de diciembre.'),
    nota('Para que el pago concilie, las líneas 41x del asiento de la boleta llevan al trabajador como socio (capítulo 7). Medido: el saldo 41x de cada trabajador queda en 0,00 después del pago.', 'nota'),
    h2('28.2 Entrega de la boleta'),
    p('La boleta se entrega a más tardar el **tercer día hábil** después del pago (D.S. 001-98-TR): la boleta muestra la fecha límite en **Entregar hasta**. La entrega puede ser:'),
    vinetas([
      '**Física**: se imprime y el trabajador firma. Con **Confirmar recepción** se registra la fecha en que la recibió.',
      '**Por correo** (N-08): solo a los trabajadores con el **acuerdo de entrega electrónica** en su ficha (capítulo 8): «Boleta por correo», fecha del acuerdo y correo. **Enviar por correo** (en la boleta) o **Enviar boletas por correo** (en el lote) manda la boleta en PDF, y la liquidación del depósito si es de CTS, y deja la constancia en el historial. La respuesta del trabajador desde ese correo registra la recepción.',
    ]),
    ...figura('c28_05_enviar_boletas_sin_acuerdo', '«Enviar boletas por correo» pide confirmación: «Se enviará por correo a cada trabajador con acuerdo de entrega electrónica su boleta validada del lote que aún no se envió…». (Se canceló: los trabajadores del escenario no tienen acuerdo.)'),
    nota('El envío usa el servidor de correo saliente de la base. En la base de pruebas no se envió ningún correo: el manual no muestra el correo recibido. Los criterios del lote 8 lo midieron en una base local con correos ficticios.', 'nota'),
    h2('28.3 Constancias'),
    tabla(['Documento', 'Dónde', 'Capítulo'], [
      ['Boleta de pago (D.S. 001-98-TR)', 'Boleta › Imprimir › Boleta de Pago (PE)', '10'],
      ['Liquidación del depósito de CTS', 'Boleta de CTS › Imprimir › Liquidación de depósito de CTS (PE)', '15'],
      ['Certificado de rentas y retenciones de 5.ª', 'Nómina PE › Certificado de 5.ª categoría', '13'],
    ], [3600, 4500, 1538]),
    pieCapitulo(['ce'], 'N-07, N-08'),
  );


  return c;
};
