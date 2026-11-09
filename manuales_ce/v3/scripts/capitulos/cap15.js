// Manual v3, capítulo 15: CTS. Origen: v2 (FM, 22/10/2026), más los lotes 17 (variables regulares), 20a a 20c
// (provisión, remite al 7), 22a, 22b, 23b, 33a, 33b, 38, 46a y 70 (mes parcial en el divisor), 58 (pequeña empresa) y
// 67 (tiempo parcial). Cifras de los casos medidas en contable19 el 09/11/2026 (COMPUTABLE, EMPRESA_PEQUENA,
// EMPRESA_COMERCIO) y ejemplos de los lotes.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 15
  a(
    h1('15. CTS'),
    p('La estructura **CTS** calcula el depósito de mayo (noviembre–abril) y noviembre (mayo–octubre): remuneración computable × meses y días del periodo / 12. La remuneración computable es el sueldo + la asignación familiar + el promedio de las variables regulares (15.1) + **1/6 de la gratificación** validada del periodo (que ya trae sus variables). La pequeña empresa deposita 15 remuneraciones diarias por año (15.4), la microempresa no deposita y el trabajador a tiempo parcial no tiene CTS (15.3). Los meses se cuentan desde el inicio del **vínculo**: con una renovación sin interrupción el periodo no se corta (lote 22b; ejemplo del lote, renovación el 16/08/2026: CTS de noviembre **1 500,00**, antes 633,33).'),
    ...figura('c15_01_lucia_cts_nov2026_calculo', 'Lucía, CTS de noviembre de 2026: 2 695,92.'),
    tabla(['Trabajador', 'Mayo 2025', 'Noviembre 2025', 'Mayo 2026', 'Noviembre 2026'], [
      ['Lucía', '1 537,67', '2 690,92', '2 690,92', '2 695,92'],
      ['Héctor', '366,67', '1 222,22', '1 283,33', '1 283,33'],
    ], [2200, 1850, 1850, 1850, 1888]),
    p('Lucía, noviembre de 2026: (4 500 + 123 + 768,83 de sexto de la gratificación de julio) × 6 / 12 = 2 695,92. La asignación familiar es la del mes de abril u octubre, con la edad del hijo **en ese periodo**, no la de hoy (lote 22a).'),

    h2('15.1 Las variables regulares en la CTS'),
    p('Las reglas marcadas **«Variable regular para la remuneración computable»** (capítulo 14.1) entran si el trabajador las percibió en al menos 3 meses del periodo: lo percibido ÷ los meses del periodo (6, o menos si el vínculo empezó dentro). Se suman al sueldo y a la asignación familiar.'),
    tabla(['Caso', 'Situación', 'CTS'], [
      ['COMPUTABLE, 70001804 (3 000)', 'Comisiones de 600 en junio, agosto y setiembre; sin gratificación de julio', 'Noviembre de 2026: (3 000 + 1 800 ÷ 6) × 6 ÷ 12 = **1 650,00**'],
      ['Ejemplo del lote 23b', 'Ingreso el 01/08/2026, comisiones de 600 en agosto, setiembre y octubre', 'Noviembre: (3 000 + 1 800 ÷ 3) × 3 ÷ 12 = **900,00**; con «÷ 6 en todas», 825,00'],
      ['EMPRESA_COMERCIO, K9 (1 500)', 'Ingreso el 15/07/2025; horas extras de 62,50 de julio a octubre (250,00)', 'Noviembre de 2025: 250,00 ÷ 3,5667 = 70,09; computable 1 570,09; **466,67**. Con «Entero», 250,00 ÷ 4 = 62,50 y 464,41'],
    ], [2500, 3600, 3538]),
    p('**El divisor** lo deciden dos opciones de la compañía (pestaña «Nómina PE - Controles», grupo **«Remuneración computable (variables regulares)»**):'),
    vinetas([
      '**«Divisor de las variables con menos de 6 meses»**: «Según la norma» (por defecto: la CTS ÷ los meses del periodo, D.S. 004-97-TR, art. 6), «÷ 6 en todas» o «÷ los meses del periodo en todas».',
      '**«Mes parcial en el divisor de las variables»** (lote 46a): «Por días» (por defecto: el mes del ingreso o del cese cuenta sus días, meses de 30; el divisor no baja de 1) o «Entero». Con K9, del 15/07 al 31/10 son 107 días: el divisor es **3,5667** y la constancia lo imprime «3.5667 (107 días ÷ 30)».',
    ]),
    p('**La forma** de la regla (lote 33a): una **«Periódica»** (bono de más de un mes) entra en la CTS como lo percibido en el periodo ÷ 6, sin el requisito de 3 meses (TUO del D.Leg. 650, art. 18); la **«Periódica anual»**, ÷ 12. Ejemplo del lote 33a: CTS de mayo con un bono trimestral de 900 en marzo, +75,00. La **«Fija mensual»** entra entera con el importe de abril u octubre. **El comisionista y el destajero** (lote 33b) entran con lo percibido en el periodo ÷ sus días × 30, sin el requisito de 3 meses.'),

    h2('15.2 La liquidación del depósito de CTS'),
    p('Desde la boleta de CTS, **Imprimir › Liquidación de depósito de CTS (PE)** entrega al trabajador el detalle del depósito: remuneración computable (con el promedio de las variables y su divisor, lote 23b), periodo, tiempo computable, entidad, cuenta y monto (N-08). También se envía por correo con la boleta (capítulo 28). La constancia de una CTS validada **guarda el detalle** con el que se calculó: si después cambian las opciones, no se recalcula (lote 46a). Los importes llevan separador de miles y el monto en letras dice «SOLES» (lotes 59 y 38).'),
    ...figura('c15_02_liquidacion_deposito_cts', 'Liquidación del depósito de noviembre de 2026 de Lucía: remuneración computable 5 391,83 (4 500 + 123 + 1/6 de gratificación 768,83), periodo 01/05/2026–31/10/2026 (6 meses), monto depositado 2 695,92.'),
    ...figura('c15_03_constancia_cts_k9_divisor', 'Liquidación del depósito de noviembre de 2025 de K9 (EMPRESA_COMERCIO): sueldo 1 500,00, variables 70,09 «÷ 3.5667 (107 días ÷ 30)», computable 1 570,09, cómputo del 15/07/2025 al 31/10/2025 (3 meses y 17 días), monto 466,67.'),
    p('Los TXT de CTS para el banco están en el capítulo 27. La CTS de un trabajador cuya cuenta CTS es de **otro banco** ya no se abona por CCI en el archivo de Interbank: por defecto va a «Omitidos» y se deposita con el archivo del banco de su cuenta (C-23, opción **«Interbank: CTS en cuenta de otro banco»**).'),

    h2('15.3 El trabajador a tiempo parcial'),
    p('Quien trabaja **menos de 4 horas diarias** en promedio no tiene CTS (D.S. 001-97-TR, art. 4; lote 67). El sistema lo detecta por el **horario** del contrato: la jornada semanal entre los días de la semana de la compañía. `CTS_001`, `CTS_TRUNCA_001` y la provisión salen en 0, y la boleta avisa «tiempo_parcial» («… trabaja a tiempo parcial (3 h diarias en promedio, menos de 4 …). La CTS no se calcula: no está comprendido …»). Si la Tabla 12 del contrato dice otra cosa, también avisa.'),
    tabla(['Caso EMPRESA_COMERCIO', 'Opción «Tiempo parcial: CTS»', 'CTS de mayo de 2026'], [
      ['K8, 450, 3 horas diarias (15 semanales de 40)', '«No pagar (no le corresponde)» (por defecto)', '**0,00** y aviso «tiempo_parcial»'],
      ['K8', '«Pagar (convenio o liberalidad)»', '450 × 6 ÷ 12 = **225,00**'],
      ['K1, jornada completa', '—', 'Sin aviso'],
    ], [3600, 3200, 2838]),
    p('La opción está en la compañía, pestaña «Nómina PE - Controles», grupo **«Tiempo parcial (menos de 4 horas diarias)»**. Las compañías que ya le pagaban CTS quedaron en «Pagar» al actualizar. El tiempo parcial sí tiene gratificación, asignación familiar, utilidades, EsSalud con la base mínima y pensión (capítulo 12); sus vacaciones, en el capítulo 17.'),
    nota('Hay que revisar que el horario del contrato sea la jornada real: un trabajador de 3 horas con el horario estándar de 8 horas recibe CTS. Que el tiempo parcial se detecte por el horario (A-6.2) y que el promedio de las 4 horas sea la jornada semanal entre los días de la jornada de la empresa (A-6.3) son criterios según la norma, pendientes de confirmación.', 'importante'),
    nota('Caso EMPRESA_COMERCIO, celdas del lote 67: la CTS de K8 se calcula en una boleta en borrador que el caso deshace al medir; en la base quedan las boletas de K1 a K4 y de K9. Para verla, corra el caso o calcule una CTS de mayo de 2026 de K8 en borrador.', 'caso'),

    h2('15.4 La pequeña empresa'),
    p('En la pequeña empresa la CTS es de **15 remuneraciones diarias por año** (TUO de la Ley MYPE, art. 50): por semestre, la computable ÷ 4. Caso EMPRESA_PEQUENA («SOLSE Demo Pequeña Empresa S.A.C.», medido en contable19):'),
    tabla(['Trabajador', 'Cálculo', 'CTS'], [
      ['P1, pequeña empresa, 2 400', '(2 400 + 1 200 ÷ 6) ÷ 4', '**650,00** en mayo y en noviembre de 2026'],
      ['P3, pequeña empresa, 1 800', '(1 800 + 300 ÷ 6) ÷ 4', '462,50 en mayo de 2026'],
      ['P6, régimen general en la misma compañía, 2 000', '(2 000 + 2 000 ÷ 6) × 6 ÷ 12', '1 166,67 en mayo de 2026'],
    ], [3400, 3200, 3038]),
    p('Sin asignación familiar por defecto («Pequeña empresa: asignación familiar» = «No pagar», lote 58). El tope de 90 remuneraciones diarias de la CTS de la pequeña empresa todavía no se aplica (O-178; la contadora decide si es acumulado o por periodo, P-159): va en el capítulo 33.'),

    h2('15.5 La provisión mensual'),
    p('Si la compañía provisiona los beneficios (capítulo 7, N-13), cada mes se provisiona la CTS del mes (sueldo 3 000: 291,67) y la CTS pagada cancela su periodo: la de mayo, noviembre a abril; la de noviembre, mayo a octubre. Con **«Aplicación de lo provisionado»** = «En la boleta del beneficio», la boleta de CTS de mayo lleva `APL_CTS_001` **1 166,68** (lo provisionado de enero a abril; ejemplo del lote 20c, sueldo 3 000), que no cambia el neto. Las faltas del mes no rebajan la provisión: la diferencia queda en el gasto al pagar.'),
    pieCapitulo(['ce', 'ce_demo'], 'C-01, C-23, N-08, C-41 (lote 17), N-13 (20a a 20c), lote 22a, C-48 (22b), P-80 (23b), P-83 (33a), P-84 (33b), O-84 (38), O-130 (46a y 70), O-177 (58), O-193 (67)'),
  );


  return c;
};
