// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19: recorrido de FM SYSTEMS (22/10/2026) y caso ADICIONALES (lote 16; re-medición del lote 71).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 11
  a(
    h1('11. Lote mensual y orden del proceso'),
    p('**Nómina › Procesamientos de nóminas** agrupa las boletas de un periodo. El lote nace con el diario **Planillas** (C-06) y, desde el lote 40, muestra su **Compañía**: solo se ven los lotes de la compañía activa, y la compañía no se cambia una vez que el lote tiene boletas.'),
    ...figura('c11_01_lotes', 'Lista de lotes.'),
    h2('11.1 Generar el lote'),
    pasos([
      '**Nuevo**: nombre y periodo. El diario Planillas viene por defecto.',
      'Guarde y pulse **Generar nóminas**. En el asistente, **Agregar una línea** para elegir a los trabajadores y pulse **Generar**.',
      'El lote crea una boleta por trabajador, con la estructura de su contrato, y las calcula.',
      'Revise las boletas y valide con **Marcar como hecho**, que confirma todas las boletas del lote.',
    ]),
    ...figura('c11_03_lote_nuevo', 'Lote nuevo de noviembre de 2026 en la compañía de laboratorio.'),
    ...figura('c11_04_generar_nominas', 'Asistente «Generar nóminas» con el trabajador elegido.'),
    ...figura('c11_05_lote_generado', 'Lote con la boleta generada: «Boleta de Trabajador HORAS EXTRA (manual v2) – noviembre 2026», en borrador.'),
    nota('El lote **no vuelve a calcular ni a contabilizar las boletas ya validadas** (C-17). Antes, generar o marcar como hecho un lote con boletas validadas las recalculaba y duplicaba su asiento. Las boletas que el lote nunca calculó se calculan antes de validar.', 'importante'),
    ...figura('c11_02_lote_diciembre_fm', 'Lote «Planilla diciembre 2026» de FM SYSTEMS, en estado Hecho, con los botones «Registrar pago» y «Enviar boletas por correo» (capítulo 28). La boleta lleva el nombre en español de U-06 («Boleta de … – diciembre 2026»).'),
    p('El contable que registra los pagos (grupo «Contabilidad / Facturación») puede abrir el lote y pulsar **Registrar pago** aunque no tenga «Nómina / Administrador» (lote 53). El asistente y la casilla «Un asiento por trabajador» se explican en el capítulo 28.'),

    h2('11.2 Las planillas adicionales (lote 16)'),
    p('Cada estructura tiene un **Tipo de planilla** (capítulo 9): mensual, semanal, adelanto o quincena, gratificación, vacaciones, liquidación, CTS, adicional o modalidad formativa. Con el tipo, cada salida (PLAME, AFPnet, bancos, planilla y utilidades) elige sus boletas. Las comisiones, las bonificaciones y las utilidades se pueden pagar en su propia boleta, con las tres estructuras de tipo adicional: **Planilla de comisiones** (COMI), **Planilla de bonificaciones** (BONI) y **Planilla de utilidades** (UTIL). Cada una tiene su boleta y su asiento en el diario Planillas y va al mismo PLAME, AFPnet y reparto del mes.'),
    p('Los aportes de la adicional respetan la base mínima y el tope **del mes** (capítulo 12), y la renta de 5.ª del mes se calcula una vez sobre la mensual y las adicionales: cada boleta retiene lo que falta (capítulo 13). Medido en el caso ADICIONALES, noviembre de 2026:'),
    tabla(['Caso ADICIONALES', 'Mensual', 'Planilla adicional', 'En el mes'], [
      ['70001701, sueldo 3 000 y comisiones 500 (ONP)', 'ONP 390,00 · EsSalud 270,00 · neto 2 610,00', 'ONP 65,00 · EsSalud 45,00 · neto 435,00', 'Un abono de 3 045,00; planilla con ingresos 3 500'],
      ['70001703 a 70001705, sueldo 30 000 y comisiones 5 000, en los tres órdenes', 'Retiene 721,50', 'Retiene 350,00', '`.rem` 0605 1071.50, igual en los tres órdenes'],
      ['70001706, sueldo 30 000 y utilidades 20 000 (validadas antes)', 'Retiene 721,50', 'Retiene 2 800,00, sin ONP ni EsSalud', '`.rem` 0911 20000.00 y 0605 3521.50'],
    ], [2900, 2300, 2300, 2138]),
    nota('Una estructura sin tipo (una copia propia anterior al lote 16 que la actualización no reconoció) queda fuera de todas las salidas: la boleta lo avisa («sin_tipo»; capítulo 26). Una estructura copiada con «Duplicar» hereda el tipo de la original: el caso ADICIONALES 70001707, con la copia de la mensual, da lo mismo que la original (0121 3000.00, abono 2 610,00).', 'importante'),

    h2('11.3 Orden del mes'),
    p('Los acumulados leen boletas **validadas** (1.2). El orden es:'),
    pasos([
      '**Adelanto quincenal** (NQA), si lo hay: la mensual lo descuenta.',
      '**Gratificación** (julio y diciembre), **CTS** (mayo y noviembre), **vacaciones** del mes y **planillas adicionales** (comisiones, bonificaciones, utilidades).',
      '**Mensual** (NME) y **semanales** (NSO). La renta de 5.ª de la mensual cuenta la gratificación, las vacaciones y las adicionales ya validadas, y cierra el total del mes.',
      'Si hay un cese: las boletas del año antes que la **liquidación** (capítulo 16).',
    ]),
    p('**Marcar como hecho** respeta ese orden por su cuenta: valida primero la gratificación, las vacaciones, las adicionales y la CTS, después las demás y al final las liquidaciones. Lo mismo si se seleccionan en la lista varias boletas del mismo trabajador y mes y se validan juntas: se validan de a una, por mes, en ese orden (lotes 16 y 20b).'),
    tabla(['Si la adicional se valida…', 'Renta de 5.ª', 'Provisión en la boleta (capítulo 7)'], [
      ['Antes de la mensual', 'Retiene el impuesto de sus propios ingresos (con la mensual en borrador o, sin ella, con el sueldo del contrato por los días del vínculo); la mensual cierra el total', 'No registra nada: la mensual ya incluye sus variables'],
      ['Después de la mensual', 'Retiene la diferencia', 'Por defecto («En la planilla adicional, con su fecha»), registra en su asiento la diferencia de la provisión del mes (lote 37, P-104). Comisión de 600 en marzo: 100,00 / 9,00 / 58,33 / 50,00 al 31/03'],
    ], [2400, 3800, 3438]),
    nota('En diciembre no queda mes para corregir la renta de 5.ª. Por eso la compañía tiene el control «Gratificación y vacaciones de diciembre antes que la mensual» (V-04): con «Avisar», la mensual de diciembre muestra una banda si la gratificación o las vacaciones del mes siguen en borrador; con «Bloquear», no deja validarla. Los controles están en el capítulo 26.', 'importante'),
    nota('Si se borra o se cancela un borrador del mes que una boleta validada después ya contó al repartir el EsSalud, el crédito EPS o la Vida Ley del mes, esa boleta recibe una nota en su historial para revisar sus aportes (lote 45, O-137; capítulo 12). Valide en el orden de arriba y no deje borradores viejos en el mes.', 'nota'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-06, C-17, V-04, N-07, N-08, C-42 y N-10 (16), N-13 (20b), P-104 (37), O-158 (40), O-137 (45), O-162 (53)'),
  );


  return c;
};
