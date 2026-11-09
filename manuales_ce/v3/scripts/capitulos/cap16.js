// Manual v3 (origen: v2), capítulo 16. Actualizado por el grupo g5_cese con los lotes 14, 17, 20c, 21a, 22a a 22c, 23a, 23b,
// 26a, 32a, 32b, 35a y la nota CESE (41, 42a, 42b, 55). Cifras releídas en contable19 el 2026-11-09 (casos INDEMNIZACION,
// NOMINA, DOCUMENTOS_CESE, COMPUTABLE, DECLARACION, PROVISIONES_BOLETA, EMPRESA_PEQUENA y EMPRESA_MICRO); las de los ejemplos
// sin caso salen de los criterios de cada lote (corridas reales de la base de pruebas del lote).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 16
  a(
    h1('16. Liquidación por cese'),
    p('Para cesar a un trabajador, ponga en el contrato la **fecha de fin** y el **motivo de baja** (T17); si es un despido sin causa justa, marque además **Despido arbitrario (se indemniza)**. La liquidación (estructura **Liquidación**, código LIQ) calcula las vacaciones truncas, la gratificación trunca y su bonificación, la CTS trunca, las vacaciones ganadas y no gozadas, la indemnización si corresponde, el incentivo por cese si se ingresa, y el ajuste final de la renta de 5.ª. Validada, imprime la hoja de liquidación, el certificado de trabajo y la constancia de cese para el retiro de la CTS (16.9).'),
    ...figura('c16_03_contrato_despido', 'Contrato de la trabajadora modal del caso INDEMNIZACION (70000352), tipo [04] POR NECESIDADES DEL MERCADO: motivo de baja [03] DESPIDO O DESTITUCIÓN, «Despido arbitrario (se indemniza)» marcado, «Fin pactado del contrato modal» 31 ago. y «Incentivo por cese inafecto (art. 18 a de la LIR)» desmarcado.'),
    h3('El orden del cese'),
    pasos([
      'Valide primero las boletas del año del trabajador (la mensual del mes del cese incluida). La liquidación hace el ajuste final de la renta de 5.ª con las validadas: el control «Boletas del año antes que la liquidación del cese» (Avisar o Bloquear, capítulo 26) avisa si queda alguna en borrador.',
      'Si el cese es **desde el 15 de julio** y la gratificación de julio no está validada, genérela y valídela **antes** que la liquidación (16.3). En diciembre no hace falta: la liquidación de un cese desde el 15/12 paga el semestre completo.',
      'Calcule la liquidación con el periodo del mes del cese, revise los avisos de la banda y valídela.',
      'Imprima o envíe por correo los documentos del cese (16.9). El plazo es de 48 horas desde el cese.',
    ]),
    h2('16.1 Truncas y sus aportes'),
    p('Las **vacaciones truncas** son remunerativas: pagan ONP o AFP y EsSalud (C-20) y entran en la renta de 5.ª. La gratificación trunca y su bonificación entran en la renta de 5.ª pero no pagan aportes; la CTS trunca y la indemnización no pagan ninguno de los dos.'),
    ...figura('c16_01_carmen_liquidacion_calculo', 'Liquidación de Carmen (caso NOMINA), cese el 31/08/2026: vacaciones truncas 1 666,67 con AFP (166,67, 25,83 y 22,83) y EsSalud 150,00, gratificación trunca 833,33, bonificación 75,00, CTS trunca 972,22, base de 5.ª 2 575,00 y neto 3 331,89; «Entregar hasta» 2 set.'),
    tabla(['Concepto', 'Cálculo', 'PLAME', 'Importe'], [
      ['Vacaciones truncas (VAC_TRUNCA_001)', '8/12 de 2 500', '0114', '1 666,67'],
      ['Gratificación trunca (GRATI_TRUNCA_001)', '2/6 (julio y agosto)', '0407', '833,33'],
      ['Bonificación sobre la trunca', '9 %', '0313', '75,00'],
      ['CTS trunca (CTS_TRUNCA_001)', '4/12, con el sexto de la gratificación de julio sin la bonificación', '—', '972,22'],
      ['AFP (aporte, comisión, prima)', 'Sobre las vacaciones truncas', '', '166,67 · 25,83 · 22,83'],
      ['EsSalud', '9 % de las vacaciones truncas', '', '150,00'],
      ['**Neto**', '', '', '**3 331,89**'],
    ], [3000, 3700, 900, 2038]),
    p('La gratificación trunca se declara con el **0407** (gratificación proporcional) y su bonificación con el **0313**; la ordinaria de julio y diciembre sigue en el 0406 (lote 14). Caso DECLARACION, 70001402, del 01/07 al 31/10/2026 con 3 000: trunca 2 000,00 y bonificación 180,00, en el `.rem` 0407 2000.00 y 0313 180.00, sin 0406. La de un cese del 15 al 31/12, que es la ordinaria, va con 0406 y 0312.'),
    nota('Con la provisión en la boleta mensual, la liquidación aplica en sus propias líneas todo lo provisionado del vínculo (lote 20c; con el asiento mensual, según «Aplicación de lo provisionado», capítulo 7). Las líneas APL_* no suman al neto. Caso PROVISIONES_BOLETA, 70002204, cese el 31/03/2028: APL_GRATI_001 1 500,00, APL_BONO_001 135,00, APL_CTS_001 875,01, APL_VAC_001 750,00 y APL_ESSVAC_001 67,50; el saldo del vínculo queda en cero y el neto es 3 591,36.', 'nota'),

    h2('16.2 Desde cuándo y cómo se cuenta'),
    p('**El vínculo continuo** (lote 22b). Un contrato que empieza a más tardar el día siguiente al fin del anterior es una renovación: las truncas cuentan desde el inicio del vínculo y el trabajador recibe lo mismo que con un solo contrato. Ejemplo del criterio del lote, 3 000 desde el 01/01/2025, renovado el 16/05/2026 y liquidado al 31/08/2026: vacaciones truncas 2 000,00 (antes 883,33), gratificación trunca 1 000,00 y CTS trunca 1 000,00 (antes 883,33). El vínculo se corta en tres casos:'),
    vinetas([
      '**un cese con su liquidación validada** (no anulada por una nota de crédito): el contrato que empieza al día siguiente es otro vínculo (16.8);',
      '**un convenio de prácticas** anterior: una modalidad formativa no es contrato de trabajo (Ley 28518; capítulo 31);',
      '**un cambio de régimen laboral** entre dos contratos: cada tramo se calcula con su régimen (la indemnización no se corta, 16.6).',
    ]),
    p('**Los meses y los días** (lote 32b, P-51). Las vacaciones truncas se cuentan **de fecha a fecha desde el aniversario del ingreso** (Código Civil, art. 183): del 15/03 al 14/04 es un mes y los días que sobran valen 1/30 del mes. La gratificación y la CTS truncas siguen por meses calendario, como dice su norma. Con **menos de un mes** de servicios no hay vacaciones truncas (D.S. 012-92-TR, art. 23).'),
    tabla(['Vacaciones truncas (sueldo 3 000)', 'Ahora (por defecto)', 'Antes del lote 32b'], [
      ['Caso INDEMNIZACION, 70000351: aniversario el 15/03/2026, cese el 30/04/2026', '1 mes y 16 días: **383,33**', '1 mes y 17 días: 391,67'],
      ['Aniversario el día 1', 'igual', 'igual'],
      ['Del 10/03 al 25/03 (menos de un mes; criterio del lote)', '0,00', '133,33'],
    ], [4600, 2600, 2438]),
    p('Con la opción «Por meses calendario» se vuelve al conteo de antes: los días del mes del ingreso y del cese, y los que pasan de 30 son un mes. La hoja de liquidación dice el conteo junto al tiempo: «1 mes y 16 días (de fecha a fecha)».'),
    p('**El adelanto de vacaciones** (lote 35a). Los días gozados antes de cumplir el récord son a cuenta del récord en curso. Al cese, se restan de las vacaciones truncas y lo que no alcance no se cobra (D.S. 002-2019-TR, art. 6.2); la hoja de liquidación detalla los días truncos, los adelantados, los días a pagar y los no compensados. Criterio del lote, sueldo 3 000: ingreso el 01/01/2026, 10 días adelantados en julio y cese el 30/09: truncas **1 250,00** (antes 2 250,00).'),
    tabla(['Opción (ficha de la compañía, «Nómina PE - Controles»)', 'Valores', 'Por defecto'], [
      ['«Meses de las vacaciones truncas» (grupo «Conteo de meses y días»)', '«De fecha a fecha, desde el aniversario del ingreso» o «Por meses calendario (como antes del lote 32b)»', 'De fecha a fecha'],
      ['«Tiempo de servicios de la indemnización» (mismo grupo)', '«De fecha a fecha (como antes)» o «Por meses calendario»', 'De fecha a fecha'],
    ], [3600, 4100, 1938]),

    h2('16.3 La gratificación trunca'),
    p('Paga los meses calendario completos del semestre en curso hasta el cese, por sexto, con su bonificación extraordinaria (Ley 27735, art. 7; Ley 30334). Su remuneración computable es **la vigente al mes anterior al del cese** (D.S. 005-2002-TR, art. 5.3; lote 22a): el sueldo y la asignación familiar del último día de ese mes y, desde el lote 23b, las variables regulares del inicio del semestre hasta ese mes. Las variables del mes del cese no cuentan. La CTS trunca y las vacaciones truncas siguen con la remuneración del cese.'),
    tabla(['Ejemplo (criterios de los lotes; ingreso 01/01/2025)', 'Gratificación trunca', 'Antes'], [
      ['3 000 hasta julio y 3 500 desde el 01/08, cese el 31/08/2026', '3 000 × 2/6 = **1 000,00** y 90,00', '1 166,67'],
      ['2 500 hasta el 31/07 en un contrato y 3 000 desde el 01/08 en su renovación, cese el 31/08', '2 500 × 2/6 = **833,33**', '—'],
      ['Comisiones de 400 en julio, agosto y setiembre, cese el 30/09/2026', 'Dos meses, no es regular: **1 500,00** y 135,00', '1 600,00'],
    ], [4800, 3000, 1838]),
    p('En el último ejemplo, la CTS trunca, (3 000 + 1 200 ÷ 5) × 5 ÷ 12 = 1 350,00, y las vacaciones truncas, (3 000 + 1 200 ÷ 6) × 9 ÷ 12 = 2 400,00, no cambian. El caso COMPUTABLE lo muestra con 70001806 (cese el 30/06/2026, comisiones en marzo, abril y junio): gratificación trunca **3 000,00** y bonificación **270,00**, CTS trunca 500,00 y vacaciones truncas 1 600,00. El detalle de la remuneración computable de la liquidación dice qué meses miró: «Remuneración computable de la gratificación trunca: variables del … al …».'),
    h3('Un cese cerca del pago de julio o de diciembre'),
    tabla(['Cese', 'Qué hace la liquidación', 'Ejemplo (3 000 desde el 01/01/2025)'], [
      ['Del **01 al 14 de julio**, sin la gratificación de julio validada (lote 22c)', 'Paga **enero a junio** como gratificación trunca (Ley 27735, art. 7), con la remuneración del mes anterior al cese, y avisa', 'Cese el 10/07/2026: 3 000,00 y 270,00 (antes 0)'],
      ['**Desde el 15 de julio**', 'No paga enero a junio: laboraba en la oportunidad del pago y le corresponde la ordinaria. Avisa que la genere y la valide **antes** que la liquidación', 'Cese el 15/07: CTS trunca 729,17 con la gratificación validada antes y 625,00 si se valida después'],
      ['**Desde el 15 de diciembre** (lote 23a)', 'Con «Completa», paga los seis meses en cualquier orden; la gratificación de diciembre calculada después sale en 0', 'Cese el 20/12/2026: 3 000,00 (antes 2 500,00); CTS trunca 486,11'],
      ['El 14 de diciembre', 'Julio a noviembre, como siempre', '2 500,00'],
    ], [2600, 4200, 2838]),
    p('El aviso del cese de la primera quincena de julio dice: «El cese (10/07/2026) es antes del 15/07 y la gratificación de julio (enero a junio) no está validada: la liquidación la paga como gratificación trunca de enero a junio (Ley 27735, art. 7). Si se pagó con la boleta de gratificación, valídela antes que la liquidación.» **El semestre se paga una sola vez**: si la gratificación de julio se validó antes, la liquidación no lo paga; si la liquidación se validó primero, la gratificación de julio sale en 0. Si otra liquidación del mismo vínculo ya pagó parte del semestre, la nueva paga solo lo que falta y lo avisa.'),
    tabla(['Opción (grupo «Gratificaciones»)', 'Valores', 'Por defecto'], [
      ['«Gratificación de diciembre de un cese desde el 15/12»', '«Completa: cuenta diciembre si laboraba el 15/12» o «Proporcional: los meses completos hasta el cese» (2 500,00 con el cese el 20/12)', 'Completa'],
      ['«Variables de la gratificación trunca»', '«Hasta el mes anterior al cese (D.S. 005-2002-TR, art. 5.3)» o «Hasta el cese (también las del mes del cese)»', 'Hasta el mes anterior'],
    ], [3200, 4600, 1838]),

    h2('16.4 La CTS trunca'),
    p('Paga desde el 1 de noviembre o de mayo hasta el cese, por dozavos y treintavos, con 1/6 de la gratificación percibida en su periodo (D.S. 001-97-TR, art. 18), sin la bonificación. Desde el lote 22c:'),
    vinetas([
      '**cuenta la gratificación validada antes de la liquidación**, aunque su boleta termine después del cese. Gratificación de diciembre validada y cese el 10/12: (3 000 + 500) × (1/12 + 10/360) = **388,89** (antes 333,33); cese el 20/07 con la de julio validada: 777,78 (antes 666,67);',
      '**la gratificación de enero a junio que paga la propia liquidación** (cese del 01 al 14/07) entra en la CTS trunca de mayo al cese: con el cese el 10/07, (3 000 + 500) × (2/12 + 10/360) = **680,56** (antes 583,33);',
      '**un reingreso no arrastra el sexto**: la gratificación de un contrato anterior ya liquidado no cuenta. Cese el 10/07 liquidado y reingreso del 20/07 al 10/09: 3 000 × (1/12 + 22/360) = 433,33 (antes 505,56).',
    ]),
    p('Las cifras son de los criterios del lote 22c (3 000 desde el 01/01/2025).'),

    h2('16.5 Las vacaciones ganadas y no gozadas al cese'),
    p('Si el trabajador tiene récords cumplidos con días sin gozar, se le pagan íntegros (D.Leg. 713, art. 22) y, si el año para gozarlos ya venció, además la indemnización vacacional (art. 23 c). Lo decide la opción **«Vacaciones ganadas y no gozadas al cese»** (grupo «Liquidación por cese (N-15)»):'),
    vinetas([
      '**«Avisar: se registran con las entradas VAC_ADQ_001 e IND_VAC_001»** (por defecto): la liquidación avisa con los récords, los días sin gozar y el importe sugerido, y deja la nota al validar;',
      '**«Calcular en la liquidación»**: las paga. Cuenta como gozados los días de las boletas de vacaciones validadas (y los adelantados a cuenta de cada récord, lote 35a) y solo revisa los récords cumplidos desde la primera boleta validada de la compañía. Úsela solo si las vacaciones gozadas están registradas como boletas de vacaciones.',
    ]),
    tabla(['Línea', 'Afectación', 'PLAME', 'Cuenta'], [
      ['«Vacaciones adquiridas no gozadas» (VAC_ADQ_001)', 'Aportes y renta de 5.ª, como las truncas', '0118', '6215'],
      ['«Indemnización vacacional» (IND_VAC_001)', 'Inafecta; solo si el año para gozar venció antes del cese', '0504', '623'],
    ], [3600, 3700, 900, 1438]),
    p('**El récord que se cumple el día del cese** (lote 42b) es un récord cumplido: va como VAC_ADQ_001 (0118) y no como trunca (0114), y se paga siempre, aunque la opción esté en «Avisar», porque no pudo gozarse. Criterio del lote: ingreso el 15/03/2025 y cese el 14/03/2026, VAC_ADQ_001 3 000,00 y trunca 0 (antes, trunca de 3 008,33). El aniversario se cuenta desde la fecha de ingreso: con ingreso el 29/02/2024, los aniversarios son el 28/02 en 2025 a 2027 y el 29/02 en 2028. Si el récord trunco cruza un cambio de régimen, se calcula por tramos, cada uno con sus días, y la hoja los muestra (883,33 + 375,00 del general a la pequeña empresa).'),
    tabla(['Caso DOCUMENTOS_CESE (cese el 31/08/2030)', 'Líneas', 'Neto'], [
      ['70002401, renuncia, un récord sin gozar registrado con la entrada', 'VAC_TRUNCA_001 2 000,00 · VAC_ADQ_001 3 000,00 · gratificación trunca 1 000,00 y 90,00 · CTS trunca 1 000,00 · ONP 650,00', '6 440,00'],
      ['70002402, despido arbitrario, ingreso el 01/03/2028, dos récords sin gozar y uno vencido', 'VAC_TRUNCA_001 1 500,00 · VAC_ADQ_001 6 000,00 · IND_VAC_001 3 000,00 · IND_001 11 250,00 · gratificación trunca 1 000,00 y 90,00 · CTS trunca 1 000,00 · ONP 975,00', '22 865,00'],
    ], [3200, 4900, 1538]),

    h2('16.6 Indemnización por despido arbitrario'),
    p('Marque **Despido arbitrario (se indemniza)** en el contrato (N-03). La liquidación paga la indemnización del TUO del D.Leg. 728, superado el periodo de prueba:'),
    tabla(['Situación', 'Cálculo', 'Regla y PLAME'], [
      ['Plazo indeterminado (art. 38)', '1,5 remuneraciones por año completo y la fracción por dozavos y treintavos; tope 12 remuneraciones', '`IND_001` · 0501'],
      ['Contrato modal resuelto antes del **Fin pactado** (art. 76)', '1,5 remuneraciones por cada mes que falta; tope 12', '`IND_MOD_001` · 0503'],
      ['Micro y pequeña empresa (TUO de la Ley MYPE, art. 56)', '10 (micro) o 20 (pequeña) remuneraciones diarias por año; tope 90 o 120 (capítulo 24)', '`IND_001` · 0501'],
    ], [3000, 4600, 2038]),
    p('La indemnización no paga aportes ni entra en la base de la renta de 5.ª, y se asienta en la 623. Sus avisos quedan en el historial al validar (lote 41).'),
    ...figura('c16_02_indemnizacion_calculo', 'Caso INDEMNIZACION, 70000351, plazo indeterminado del 15/03/2022 al 30/04/2026: indemnización 18 575,00 sumada a las truncas (total 22 638,33); la base de 5.ª solo son las truncas (2 563,33); ONP 49,83 sobre las vacaciones truncas de 383,33; neto 22 588,50.'),
    tabla(['Trabajador del caso', 'Situación', 'Indemnización'], [
      ['70000351', 'Plazo indeterminado: 4 años, 1 mes y 16 días', 'IND_001 **18 575,00**'],
      ['70000352', 'Modal resuelto el 30/04 con fin pactado el 31/08: 4 meses', 'IND_MOD_001 **18 000,00**'],
      ['70000353', 'Pequeña empresa, sueldo 1 500', 'IND_001 **4 083,33**'],
      ['70000354', 'En periodo de prueba', 'Sin indemnización y con aviso'],
      ['70000355 / 70000356', 'Modal renovado / de temporada', 'IND_MOD_001 **18 000,00** cada uno'],
      ['70000357', 'Indeterminado después de un modal, sin interrupción: desde el 01/03/2022', 'IND_001 **18 750,00**'],
      ['70000358', 'Tope de 12 remuneraciones (3 000 más la asignación familiar)', 'IND_001 **37 356,00**'],
    ], [2400, 4600, 2638]),
    nota('Caso INDEMNIZACION (63 celdas): las 8 liquidaciones validadas, el PLAME con 0501 / 0503 y el asiento de 70000351 con 18 575,00 al debe de la 623. En la micro y pequeña empresa, los casos EMPRESA_PEQUENA (P3: 60 × 20 × 11/12 = 1 100,00) y EMPRESA_MICRO (M3: 50 × 10 × 10/12 = 416,67) están en el capítulo 24.', 'caso'),
    h3('La base: la remuneración mensual al despido (lote 32a)'),
    vinetas([
      '**Suma las variables regulares** (D.S. 001-96-TR, art. 55): las reglas marcadas «Variable regular para la remuneración computable» con importe en al menos 3 de los 6 meses anteriores al cese, ÷ 6 o ÷ los meses del vínculo si son menos. Sueldo 3 000 con comisiones de 600 en 4 meses y 2 años y 8 meses: base 3 400 e indemnización **13 600,00** (antes 12 000,00).',
      '**Sin sueldo** (comisionista o destajero): el promedio de los 6 meses, sin la condición de los 3 meses. Comisiones de 6 000 en julio y en agosto: 8 000,00 (antes 0,00).',
      '**El 1/6 de la gratificación no se suma** por defecto (la ley habla de remuneración «ordinaria mensual»).',
      'La misma base vale para el art. 38, el art. 76 y el régimen de la micro y pequeña empresa. La hoja de liquidación dice cuánto son las variables y el sexto.',
    ]),
    h3('El tiempo de servicios y el vínculo (lotes 32b y 41)'),
    p('Se cuenta **de fecha a fecha desde el inicio del vínculo**; si el día no existe en el mes, el mes se cumple su último día: del 31/01/2022 al 27/02/2026 son 4 años y 1 mes, 18 375,00 con 3 000 (18 350,00 con «Por meses calendario»). El vínculo une las renovaciones sin interrupción, pero **no** las prácticas anteriores, las versiones archivadas ni un contrato anterior ya liquidado. En un reingreso, el periodo de prueba descuenta el servicio previo (D.S. 001-96-TR, art. 16) y la liquidación lo avisa. Criterios del lote 41: prácticas de 6 meses y 6 de contrato, 2 250,00 (antes 4 500,00); contrato liquidado el 15/05/2026 y otro despedido el 30/11/2026, 2 437,50 (antes 13 125,00). Un cambio de régimen (general a pequeña o micro empresa) no corta el tiempo: se indemniza con el régimen del cese por todo el vínculo.'),
    h3('El contrato modal que pasa su plazo máximo (lote 41)'),
    p('Si el trabajador siguió laborando después del plazo máximo de su modalidad, el contrato se desnaturalizó (art. 77 a): se indemniza como uno indeterminado, por el art. 38 (o por el régimen MYPE) y en el 0501. Los plazos son: 03 (inicio o incremento de actividad), 3 años; 04 (necesidades del mercado), 5 años; 05 (reconversión empresarial), 2 años; 06 (ocasional), 6 meses; y varias modalidades distintas suman 5 años en conjunto (art. 74). Los contratos 12 y 13 de la Tabla 12 no se controlan.'),
    tabla(['Criterio del lote 41 (sueldo 3 000)', 'Antes', 'Ahora'], [
      ['Necesidades del mercado del 01/01/2021, despido el 30/06/2026', 'IND_MOD_001 4 500,00 (0503)', 'IND_001 **24 750,00** (0501), con aviso'],
      ['Inicio de actividad 2020–2022 y necesidades del mercado desde 2023 (5 años en conjunto)', 'IND_MOD_001 27 000,00', 'IND_001 **29 250,00**'],
      ['Fin pactado después del plazo y despido antes del plazo', 'sin aviso', 'IND_MOD_001 36 000,00 (art. 76 hasta el fin pactado), con aviso'],
    ], [4400, 2500, 2738]),
    p('El aviso dice, por ejemplo: «Contrato por necesidades del mercado desde el 01/01/2021, plazo máximo de 5 años (TUO del D.Leg. 728, art. 58): el trabajador siguió laborando después del 31/12/2025, el contrato modal se desnaturalizó a plazo indeterminado (TUO art. 77 a) y se indemniza por el art. 38…».'),
    h3('El contrato modal en la micro y pequeña empresa (lote 32a)'),
    p('Caben dos lecturas (el art. 76 o la del régimen) y no hay pronunciamiento: por defecto se paga **la mayor de las dos** (Constitución, art. 26.3), en el 0503, y la liquidación avisa los dos importes. Pequeña empresa, modal, 4 años y 11 meses de servicios con un mes por cumplir y sueldo 1 500: **4 916,67** por el régimen (antes 2 250,00 por el art. 76). Modal de 6 meses resuelto a la mitad: 13 500,00 por el art. 76 (500,00 con «La del régimen»). El resto de la indemnización de la micro y pequeña empresa está en el capítulo 24.'),
    tabla(['Opción (grupo «Indemnización por despido arbitrario»)', 'Valores', 'Por defecto'], [
      ['«Variables en la base de la indemnización»', '«Con las variables regulares» o «Sin las variables (como antes del lote 32a)»', 'Con las variables'],
      ['«Sumar 1/6 de la gratificación a la base de la indemnización»', 'Casilla: la última gratificación ordinaria de los 12 meses anteriores ÷ 6', 'Desmarcada'],
      ['«Contrato modal en la micro y pequeña empresa»', '«La mayor entre el art. 76 y la del régimen», «La del art. 76 (como antes del lote 32a)» o «La del régimen de la micro o pequeña empresa»', 'La mayor'],
      ['«Contratos de exportación no tradicional y de extranjero (Tabla 12: 12 y 13)»', '«Por el art. 76, por analogía» o «No calcular (entrada IND_MOD_001)»', 'Por el art. 76'],
      ['«Tiempo de servicios del contrato modal desnaturalizado»', '«Desde el inicio del primer contrato» o «Desde la desnaturalización (el día siguiente al fin pactado o al plazo máximo)»', 'Desde el primer contrato'],
      ['«Plazo máximo de los contratos modales»', '«El de cada modalidad y 5 años en conjunto», «Además, 5 años para cualquier modalidad» o «No controlar (como antes del lote 41)»', 'El de cada modalidad'],
    ], [3300, 4600, 1738]),
    ...figura('c16_04_opciones_cese', 'Ficha de SOLSE Demo Servicios, pestaña «Nómina PE - Controles»: los grupos «Liquidación por cese (N-15)», «Indemnización por despido arbitrario», «Conteo de meses y días» y «Gratificaciones», todos con sus valores por defecto; resaltados, «Vacaciones ganadas y no gozadas al cese» en «Avisar…» y «Plazo máximo de los contratos modales» en «El de cada modalidad y 5 años en conjunto».'),

    h2('16.7 El incentivo por cese'),
    p('Es el monto que el empleador otorga al retiro del trabajador (mutuo disenso, renuncia incentivada; Tabla 22, 0906). Se ingresa en la liquidación con la entrada **INC_CESE_001** (lote 26a). No es remuneración: no paga EsSalud, ONP ni AFP.'),
    vinetas([
      '**Por defecto está gravado con la renta de 5.ª por el total** (LIR, art. 34 a): entra en la base de la liquidación y en el ajuste final del cese, con la retención en el 0605.',
      '**Con la marca del contrato «Incentivo por cese inafecto (art. 18 a de la LIR)»** (para el incentivo del inciso b del art. 88 o del art. 147 del D.Leg. 728) es inafecto hasta la indemnización que correspondería por despido injustificado, menos la que pague la misma liquidación; el exceso queda gravado.',
      'La liquidación avisa si la entrada está en una estructura sin las reglas (la mensual, una adicional, una copia de la liquidación) o en una boleta sin fecha de cese.',
    ]),
    tabla(['Criterio del lote 26a: sueldo 8 000, del 01/09/2024 al 31/08/2026', 'Resultado'], [
      ['INC_CESE_001 de 60 000', '**60 000,00 gravados**; la retención sube 2 886,93; los aportes no cambian'],
      ['La misma, con la marca del contrato', '**24 000,00 inafectos** y 36 000,00 gravados'],
      ['La misma, con una indemnización de 10 000 en la liquidación', '14 000,00 inafectos y 46 000,00 gravados'],
      ['Con la marca y el cese dentro del periodo de prueba', 'Todo gravado: sin indemnización no hay tope'],
    ], [5200, 4438]),

    h2('16.8 Reingreso, renovación y liquidación duplicada'),
    vinetas([
      '**La versión del contrato** (lote 42a). La liquidación con cese en el periodo toma el contrato que termina en el cese, aunque haya uno nuevo después. Criterio del lote: cese el 20/12/2026 y reingreso el 28/12; la liquidación del 01 al 31/12 da lo mismo que la del 01 al 20/12: gratificación trunca 3 000,00, bonificación 270,00, CTS trunca 486,11 y vacaciones truncas 2 916,67 (antes, sin importes). Los documentos del cese salen con el contrato del cese.',
      '**El cese liquidado cierra el vínculo** (lote 22b). Con una liquidación al 15/05 y un contrato nuevo desde el 16/05, la gratificación de julio paga junio (500,00), y las boletas de los seis primeros meses del contrato nuevo avisan: «… es otro vínculo, y la gratificación, la CTS y las vacaciones cuentan desde el contrato nuevo. Si la relación siguió sin interrupción (no hubo cese), anule la liquidación con una nota de crédito: el vínculo vuelve a ser uno.»',
      '**Las variables del contrato anterior** no entran en los beneficios del nuevo: las pagó la liquidación (comisiones de 600 en un contrato del 01 al 10/04 y reingreso el 20/04: la gratificación de julio no las cuenta).',
      '**Un reingreso en el mismo mes** (lote 22c): con un cese el 10/03 liquidado con el mes entero y un reingreso el 20/03, la gratificación de julio del contrato nuevo paga abril a junio (1 500,00). En el mes del reingreso se hace una boleta por contrato.',
      '**La segunda liquidación del mismo cese** avisa: «La liquidación «…» (validada) ya liquida el cese del …: esta volvería a pagar las truncas y la indemnización. Si aquella está mal, anúlela con una nota de crédito antes de validar esta; si no, no valide esta.» Con el control «Boletas del año antes que la liquidación del cese» en «Bloquear», no se valida. Una liquidación anulada con su nota de crédito no cuenta.',
      '**El T-Registro**: una liquidación validada que cierra el contrato el día anterior al siguiente también cierra el periodo (baja el 30/06 y alta el 01/07; lote 55, capítulo 29).',
    ]),

    h2('16.9 Los documentos del cese'),
    p('En la liquidación validada, **Imprimir** ofrece, además de la boleta, tres reportes (lote 21a). Desde una boleta que no es una liquidación con cese, cada uno lo dice y no se emite; la hoja de una liquidación rectificada con nota de crédito lleva arriba «RECTIFICADA por la nota de crédito …: esta hoja no vale».'),
    tabla(['Reporte', 'Qué lleva'], [
      ['«Hoja de liquidación de beneficios sociales (PE)»', 'Empleador, trabajador (cargo, régimen, sistema pensionario), ingreso (el inicio del vínculo), cese y motivo, tiempo de servicios; un bloque por beneficio con su periodo, el tiempo y su conteo («8 meses y 0 días (de fecha a fecha)»), la remuneración computable por concepto, el factor del régimen y el importe; las vacaciones no gozadas por récord; la indemnización con su norma, base y tope; los descuentos, la devolución de 5.ª, el neto en número y en letras, los aportes del empleador como información y las firmas'],
      ['«Certificado de trabajo (PE)»', 'Tiempo de servicios del vínculo, cargos con sus fechas (uno por contrato o por versión con otro cargo), la naturaleza de las labores (la descripción del puesto o el campo «Labores (certificado de trabajo)») y la conducta solo si se llena «Conducta o rendimiento (certificado de trabajo)»'],
      ['«Constancia de cese para el retiro de la CTS (PE)»', 'Dirigida al banco de la cuenta con uso «CTS» (una por cuenta), con la fecha de ingreso y la de cese, sin el motivo del cese. No se emite sin cuenta CTS, con la cuenta sin banco o en un régimen sin CTS sin depósitos validados'],
    ], [3000, 6638]),
    p('La hoja guarda el detalle con que se calculó: si después cambia el sueldo, un hijo o una comisión, la hoja reimpresa sigue diciendo con qué se pagó. Si una entrada fijó el importe (VAC_TRUNCA_001, GRATI_TRUNCA_001 o CTS_TRUNCA_001), el bloque lo dice: «Importe fijado por la entrada de la liquidación (el cálculo con los datos de arriba da …)». Los campos «Labores …» y «Conducta …» están en la liquidación, debajo de la nota de crédito, y solo se ven en una liquidación con cese.'),
    ...figura('c16_05_hoja_liquidacion', 'Hoja de liquidación de beneficios sociales del caso DOCUMENTOS_CESE, 70002402 (despido, ingreso el 01/03/2028, cese el 31/08/2030, 2 años, 6 meses y 0 días): vacaciones truncas 1 500,00 (6 meses y 0 días, de fecha a fecha), gratificación trunca 1 000,00 y 90,00, CTS trunca 1 000,00, dos récords no gozados 6 000,00 (uno vencido el 28/02/2030), indemnización vacacional 3 000,00, indemnización (art. 38) 11 250,00; total de ingresos 23 840,00, ONP 975,00 y neto 22 865,00.'),
    p('**«Enviar por correo»** de una liquidación con cese manda la boleta, la hoja, el certificado y, si hay cuenta CTS, la constancia, con la plantilla «Nómina PE: liquidación de beneficios sociales y documentos del cese». La fecha límite de entrega es **48 horas desde el cese** (capítulo 28). El certificado y la constancia los firma el representante del empleador (Empleados › «Es empleador»).'),

    h2('16.10 La renta de 5.ª del cese'),
    p('La liquidación hace el ajuste final del ejercicio sin proyectar (Reglamento de la LIR, art. 41 d) con las boletas validadas, más las truncas y el incentivo gravado. Si sale un exceso, la devolución va **en la liquidación** (DEV5_001, PLAME 0928) y la mensual solo avisa (P-46 a, lote 26a). El detalle está en el 13.3; el caso CESE lo mide.'),
    nota('Criterios según la norma, pendientes de confirmación de la contadora: la remuneración y las variables de la gratificación trunca del mes anterior al cese (P-115, P-81); la gratificación de enero a junio en un cese del 01 al 14/07 y su sexto en la CTS trunca (P-57, P-58, P-127); la CTS trunca con menos de un mes de servicios, que hoy se paga (P-123); la indemnización con el régimen del cese por todo el vínculo (P-128) y el tiempo del desnaturalizado con una liquidación en medio (P-130); el ocasional de 6 meses desde su inicio (P-131); el récord trunco por tramos con un cambio de régimen (P-133); el otro vínculo después de un cese liquidado (P-108); y las vacaciones no gozadas y la indemnización vacacional (P-113, P-114). Con un cambio de pequeña empresa a régimen general dentro del semestre, la parte de pequeña empresa no se paga en ninguna boleta (P-126). Lo que no cubre está en el capítulo 33.', 'limite'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-20, C-34, N-03, N-04, C-38 (lote 14), C-41 (17), N-13 (20c), N-15 (21a), P-115 (22a), C-48 (22b), P-57 y P-58 (22c), P-59 (23a), P-80 y P-81 (23b), P-46 a y c (26a), P-48 y P-50 (32a), P-51 (32b), O-76 (35a), O-85, O-96, O-115 a O-117 (41), O-88, O-89 y O-164 (42a), O-120 a O-122 (42b), O-163 (55)'),
  );


  return c;
};
