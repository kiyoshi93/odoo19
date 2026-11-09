// Manual v3, capítulo 14: gratificaciones. Origen: v2 (FM y caso NOMINA, 22/10/2026), más los lotes 17 (variables
// regulares), 20a a 20c (provisión, remite al 7), 22a a 22c, 23a, 23b, 30, 33a, 33b y 58. Cifras de los casos medidas en
// contable19 el 09/11/2026 (NOMINA, COMPUTABLE, EMPRESA_PEQUENA, EMPRESA_COMERCIO) y ejemplos de los lotes.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 14
  a(
    h1('14. Gratificaciones'),
    p('La estructura **GRAT** paga la gratificación de julio y diciembre (Ley 27735): un sexto por mes completo del semestre, sobre la **remuneración computable** (sueldo + asignación familiar + el promedio de las variables regulares, 14.1), más la **bonificación extraordinaria** (Ley 30334): 9 % (EsSalud) o 6,75 % (EPS). La pequeña empresa paga la mitad (factor 0,5) y la microempresa no paga gratificación (capítulo 24). Los meses se cuentan desde el inicio del **vínculo**, no del contrato (14.3).'),
    ...figura('c14_01_lucia_grati_jul2026_calculo', 'Lucía, gratificación de julio de 2026: 4 613,00 + bonificación 415,17 = 5 028,17.'),
    tabla(['Trabajador', 'Periodo', 'Gratificación', 'Bonificación', 'Neto', 'Fuente'], [
      ['Lucía (4 500 + AF)', 'Julio 2026', '4 613,00', '415,17 (9 %)', '5 028,17', 'FM'],
      ['Lucía', 'Diciembre 2026', '4 623,00 (AF 123)', '416,07', '5 039,07', 'FM'],
      ['Héctor (2 200), ingresó el 01/03/2025', 'Julio 2025', '1 466,67 (4/6)', '132,00', '1 598,67', 'FM'],
      ['María (8 000)', 'Julio 2026', '8 000,00', '720,00', '8 720,00', 'NOMINA'],
      ['Carlos (EPS)', 'Julio 2026', '3 613,00', '243,88 (6,75 %)', '3 856,88', 'NOMINA'],
      ['José (pequeña empresa)', 'Julio 2026', '750,00 (factor 0,5)', '67,50', '817,50', 'NOMINA'],
      ['P1 (pequeña empresa, 2 400)', 'Julio 2026', '1 200,00 (factor 0,5)', '108,00', '1 308,00', 'EMPRESA_PEQUENA'],
    ], [2700, 1300, 1700, 1500, 1100, 1338]),
    p('La pequeña empresa no paga la asignación familiar por defecto («Pequeña empresa: asignación familiar» = «No pagar», lote 58); con «Pagar», también entra en la gratificación. La gratificación del trabajador de microempresa sale sin importes y no se valida.'),

    h2('14.1 La remuneración computable: variables regulares'),
    p('Cada regla salarial tiene la casilla **«Variable regular para la remuneración computable»** (lote 17, C-41). En «Reglas Básicas» viene marcada en las horas extras al 25 % y al 35 %, la sobretasa nocturna, la movilidad de libre disposición, la alimentación principal en dinero, las comisiones, las bonificaciones regulares, el bono por productividad remunerativo, el trabajo en feriado y el exceso de las prestaciones alimentarias. No se marca lo que no es remuneración computable: gratificaciones extraordinarias, utilidades, movilidad supeditada a la asistencia, prestaciones alimentarias dentro del tope. En las demás estructuras la marca es del cliente.'),
    p('Un concepto marcado es **regular** si el trabajador lo percibió en al menos **3 meses** del periodo: entonces se suma lo percibido y se divide entre 6, y eso se suma al sueldo y a la asignación familiar.'),
    tabla(['Gratificación', 'Periodo de las variables', 'Se divide entre'], [
      ['Julio', 'Enero a junio', '6'],
      ['Diciembre', 'Julio a noviembre (opción: julio a diciembre)', '6'],
      ['Trunca (liquidación)', 'Del inicio del semestre al mes **anterior** al cese (opción: hasta el cese)', '6'],
    ], [2400, 5200, 2038]),
    tabla(['Caso COMPUTABLE (sueldo 3 000, ONP)', 'Variables', 'Gratificación de diciembre de 2026'], [
      ['70001801', 'Comisiones de 600, 300 y 900 en agosto, setiembre y noviembre', '**3 300,00** (3 000 + 1 800 ÷ 6) y bonificación 297,00'],
      ['70001802', 'Comisiones en 2 meses: no es regular', '3 000,00 y 270,00'],
      ['70001803', '1 300 en 4 meses, de agosto a noviembre (el ejemplo de P-67)', '3 216,67 y 289,50'],
    ], [2600, 3900, 3138]),
    p('Mientras la boleta está en borrador, un aviso detalla por concepto en cuántos meses hubo importe, el total, el divisor y lo que suma; al validar, el detalle queda en el historial («Remuneración computable al validar»). Se leen las boletas validadas mensuales, semanales, adicionales y de vacaciones del vínculo; las notas de crédito restan.'),
    h3('Cómo entra cada concepto'),
    p('Junto a la casilla, **«Cómo entra en la remuneración computable»** (lote 33a) se elige en la copia de la regla de cada estructura. Por defecto, «Variable», como antes.'),
    tabla(['Forma', 'En la gratificación', 'Ejemplo del lote 33a (sueldo 3 000)'], [
      ['**Variable** (por defecto)', 'Con importe en 3 de los 6 meses: lo percibido ÷ 6', 'Movilidad de 200 desde mayo: 3 000,00 (2 meses)'],
      ['**Fija mensual**', 'Entera, con el importe del mes de referencia (junio o noviembre)', 'La misma movilidad, fija: **3 200,00**'],
      ['**Periódica** (bono de más de un mes)', 'Como variable; con la opción «Remuneraciones periódicas en la gratificación» = «No entran», no entra', '—'],
      ['**Periódica anual**', 'No entra', '—'],
    ], [2600, 4000, 3038]),
    p('**El comisionista y el destajero** (lote 33b): con **«Remuneración principal»** = «Comisionista» o «Destajero» en el contrato (o sin sueldo), las comisiones entran con el promedio del semestre, **sin** el requisito de 3 meses. Caso EMPRESA_COMERCIO, julio de 2026: K2, sin sueldo, con comisiones de 13 000 de enero a junio, gratificación **2 166,67** (13 000 ÷ 6) y bonificación 195,00; K4, comisiones solo en mayo y junio (3 000), **500,00** y 45,00 (como variable de una remuneración fija no serían regulares y saldría 0,00).'),
    h3('Las opciones de la compañía'),
    p('En la compañía, pestaña **«Nómina PE - Controles»**, grupos **«Gratificaciones»** y **«Remuneración computable (variables regulares)»**:'),
    tabla(['Opción', 'Por defecto', 'Alternativa y ejemplo del lote'], [
      ['Remuneración de la gratificación', 'La del mes del pago (Ley 27735, art. 2)', '«La vigente al 30/06 y al 30/11» (D.S. 005-2002-TR, art. 3.2). Aumento a 3 500 el 01/12: 3 500,00 por defecto; 3 000,00 con la opción (lote 23a)'],
      ['Variables de la gratificación de diciembre', 'Julio a noviembre', '«Julio a diciembre»: comisiones de 500 en setiembre, octubre y diciembre, 3 000,00 por defecto y 3 250,00 con la opción (lote 23a)'],
      ['Variables de la gratificación trunca', 'Hasta el mes anterior al cese (D.S. 005-2002-TR, art. 5.3)', '«Hasta el cese»: también las del mes del cese (14.4)'],
      ['Divisor de las variables con menos de 6 meses', 'Según la norma: la gratificación ÷ 6', '«÷ los meses del periodo en todas»: ingreso el 01/08/2026 con comisiones de 600 en agosto a octubre, diciembre 2 750,00 por defecto y 2 800,00 con la opción (lote 23b)'],
      ['Gratificación de diciembre del comisionista y el destajero', 'Junio a noviembre', '«Julio a noviembre», como las variables (lote 33b)'],
      ['Gratificación de diciembre de un cese desde el 15/12', 'Completa', '«Proporcional» (14.4)'],
    ], [2700, 2600, 4338]),

    h2('14.2 Una sola vez por semestre y vínculo'),
    p('El semestre se paga **una sola vez** por vínculo (C-34, Ley 27735): con la gratificación ordinaria validada, la liquidación no paga la trunca de ese semestre (trunca y bonificación 0,00, con aviso); y con la trunca validada, la ordinaria sale en 0,00. El orden no importa. La entrada `GRATI_TRUNCA_001` fija el importe, también en 0. Si una liquidación se anula con su nota de crédito, el semestre vuelve a pagarse.'),
    nota('Caso NOMINA: Carmen cobra la ordinaria de julio de 2026 (2 500,00 + 225,00) y cesa el 31/08. La liquidación de agosto paga la gratificación trunca de 2/6 (julio y agosto): 833,33 + bonificación 75,00. Ninguna liquidación del laboratorio repite el semestre ya pagado.', 'caso'),

    h2('14.3 El vínculo continuo: renovar no es cesar'),
    p('Un contrato que empieza a más tardar el día siguiente al fin del anterior es el **mismo vínculo** (lote 22b, C-48): la gratificación cuenta los meses desde el inicio del vínculo y no se corta en el fin de cada contrato. Ejemplos del lote 22b (criterio medido en el laboratorio), sueldo 3 000 desde el 01/01/2025:'),
    vinetas([
      'renovación el 16/05/2026: gratificación de julio **3 000,00** y 270,00 (antes del lote, 500,00: solo junio);',
      'un contrato que termina el 20/12 y se renueva el 21/12: diciembre cuenta los seis meses, 3 000,00 (antes 2 500,00).',
    ]),
    p('El vínculo **sí se corta** con un cese que tiene su **liquidación validada** (el contrato del día siguiente es otro vínculo: liquidado al 15/05 y nuevo desde el 16/05, julio paga junio, 500,00), con un practicante (no es vínculo laboral) y con un cambio de régimen laboral. Las boletas de los seis primeros meses del contrato nuevo avisan:'),
    nota('«El contrato empieza el 16/05/2026, al día siguiente del cese del 15/05/2026, que tiene su liquidación validada: es otro vínculo, y la gratificación, la CTS y las vacaciones cuentan desde el contrato nuevo. Si la relación siguió sin interrupción (no hubo cese), anule la liquidación con una nota de crédito: el vínculo vuelve a ser uno.»', 'nota'),
    p('Un **reingreso en el mismo mes** (cese el 10/03 liquidado con el mes entero y reingreso el 20/03): la trunca de marzo es del vínculo anterior; la gratificación de julio del contrato nuevo paga abril a junio, 1 500,00 (lote 22c). Las variables del contrato anterior ya liquidado tampoco cuentan (lote 42a).'),

    h2('14.4 La gratificación y el cese'),
    tabla(['Fecha del cese', 'Qué paga y quién', 'Ejemplo (3 000 desde el 01/01/2025)'], [
      ['Del 01 al 14 de julio, sin la gratificación de julio validada', 'La **liquidación** paga enero a junio como gratificación trunca (Ley 27735, art. 7; lote 22c) y avisa. Si la gratificación de julio de ese trabajador se calcula después, sale en 0', 'Cese el 10/07/2026: trunca **3 000,00** y 270,00 (antes 0). Con ingreso el 16/03/2026 y comisiones de 600, 300 y 900: 1 650,00'],
      ['Desde el 15 de julio', 'Le corresponde la **ordinaria**, con la boleta de gratificación, validada **antes** que la liquidación: la liquidación no la paga y avisa', 'Cese el 15/07: la CTS trunca suma su sexto, 729,17 si la gratificación se validó antes y 625,00 si después'],
      ['Del 15 al 31 de diciembre', '«Completa» (por defecto): diciembre cuenta por presunción de labor (art. 6), en cualquier orden. «Proporcional»: los meses completos hasta el cese (lote 23a)', 'Cese el 20/12/2026: **3 000,00** y 270,00 (antes 2 500,00 y 225,00); el 14/12, 2 500,00'],
      ['Cualquier otro', 'La liquidación paga la trunca del semestre en curso con la remuneración **vigente el último día del mes anterior al cese** (lote 22a) y sus variables hasta ese mes (lote 23b)', '3 000 hasta julio y 3 500 desde el 01/08, cese el 31/08: 3 000 × 2/6 = **1 000,00** y 90,00 (antes 1 166,67)'],
    ], [2200, 4200, 3238]),
    p('Con las variables hasta el mes anterior (lote 23b), cese el 30/09/2026 y comisiones de 400 en julio, agosto y setiembre: julio y agosto son dos meses, no es regular, y la trunca es **1 500,00** y 135,00 (con «Hasta el cese», 1 600,00). Caso COMPUTABLE, 70001806 (cese el 30/06/2026 con comisiones en marzo, abril y junio): gratificación trunca **3 000,00** y 270,00, medido en contable19 (antes del lote 23b, 3 200,00 y 288,00). La hoja de liquidación lo explica; el cálculo completo de la liquidación está en el capítulo 16.'),
    p('**En el PLAME** (lote 30): la ordinaria va en el 0406 y su bonificación en el 0312; la trunca, en el 0407 y el 0313. La de un cese del 15 al 31/12 es la ordinaria (0406 y 0312) aunque la pague la liquidación.'),

    h2('14.5 La provisión mensual'),
    p('Si la compañía provisiona los beneficios (capítulo 7, N-13), cada mes se provisiona un sexto de la gratificación y su bonificación (sueldo 3 000: 500,00 y 45,00) y la gratificación pagada lo descarga: en el asiento «Provisiones del mes», en la mensual siguiente o, con **«Aplicación de lo provisionado»** = «En la boleta del beneficio», en la propia boleta de gratificación con las líneas `APL_GRATI_001` 3 000,00 y `APL_BONO_001` 270,00 (debe 4114 / haber 6214 3 270,00), que no cambian el neto (lote 20c). La opción de diciembre «Completa» no se provisiona: la diferencia va al gasto al pagar (O-90).'),

    h2('14.6 Criterios pendientes de la contadora'),
    p('Lo que sigue funciona como se describe; son **criterios según la norma, pendientes de confirmación**: el vínculo continuo en los beneficios (P-47) y el contrato del día siguiente a un cese liquidado (P-108); la trunca de enero a junio en un cese del 01 al 14/07 (P-57) y su sexto en la CTS trunca (P-127); la remuneración de la trunca del mes anterior al cese (P-115) y sus variables hasta ese mes (P-81); las variables de diciembre (P-79) y el divisor (P-80); la forma «Fija mensual» (P-82); el cambio de régimen dentro del semestre, cuya parte de pequeña empresa no paga ninguna boleta (P-126, capítulo 33). Con su valor por defecto: el cese desde el 15/12 (P-59), las variables regulares (P-67), las periódicas (P-83) y el comisionista (P-84).'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-34, C-41 (lote 17), N-13 (20a a 20c), P-115 (22a), C-48 (22b), P-57 y P-58 (22c), P-59 y P-79 (23a), P-80 y P-81 (23b), P-63 (30), P-82 y P-83 (33a), P-84 (33b), O-177 (58)'),
  );


  return c;
};
