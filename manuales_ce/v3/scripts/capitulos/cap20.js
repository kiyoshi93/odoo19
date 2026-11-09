// Manual v3, capítulo 20: horas extra, nocturnidad, movilidad, adelantos y utilidades. Origen: v2 (22/10/2026), más los
// lotes 13 (C-36), 14 (C-37 y C-40), 15 (C-44), 16 (N-10), 17, 21b (N-16), 22a, 24 (C-47), 30, 58 y 62. Cifras de los
// casos medidas en contable19 el 09/11/2026 (EMPRESA_COMERCIO, DECLARACION, NOMINA, EMPRESA_INDUSTRIA, UTILIDADES,
// UTILIDADES_REPARTO, ADICIONALES) y ejemplos de los lotes.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 20
  a(
    h1('20. Horas extra, nocturnidad, movilidad, adelantos y utilidades'),
    p('Estos conceptos se registran como **Otras entradas** de la boleta (pestaña Días trabajados y entradas). El ejemplo es K1, «Vendedora con horas extras» del caso **EMPRESA_COMERCIO** («SOLSE Demo Comercio S.A.C.»): sueldo 1 800, ONP, jornada de 8 horas, junio de 2026.'),
    ...figura('c20_02_entradas_lista', 'Otras entradas de K1, junio de 2026: 10 horas extras al 25 % (HE25_001), 4 al 35 % (HE35_001) y 60 minutos de tardanza (TARD_001).'),
    tabla(['Entrada', 'Código', 'Regla', 'Cálculo', 'Importe'], [
      ['Horas extras 25 % (horas)', 'HE25_001', 'Valor hora × 1,25', '10 × 7,50 × 1,25', '93,75'],
      ['Horas extras 35 % (horas)', 'HE35_001', 'Valor hora × 1,35', '4 × 7,50 × 1,35', '40,50'],
      ['Tardanzas (minutos)', 'TARD_001', 'Valor hora ÷ 60 por minuto; reduce la base', '60 × 7,50 ÷ 60', '7,50'],
    ], [2400, 1300, 2700, 1900, 1338]),
    p('El **valor hora** es el sueldo ÷ 30 ÷ las horas diarias de la jornada del trabajador: 1 800 ÷ 30 ÷ 8 = 7,50 (20.1). Las dos primeras horas extras del día van al 25 % y las siguientes al 35 % (D.S. 007-2002-TR, art. 10).'),
    ...figura('c20_02_entradas_calculo', 'Cálculo de K1: remuneración 1 800,00, horas extras 93,75 y 40,50, tardanza 7,50; base afecta 1 926,75; ONP 250,48; EsSalud 173,41; neto 1 676,27.'),
    p('La base afecta (1 926,75) es el total de ingresos menos la tardanza (C-10). Sobre ella se calculan la ONP (13 % = 250,48) y EsSalud (9 % = 173,41).'),
    p('**La sobretasa nocturna** (`BNOC_001`, horas nocturnas) paga el 35 % del valor hora, con el piso del valor hora de la RMV con jornada de 8 horas (RMV ÷ 240). Caso EMPRESA_COMERCIO, junio de 2026 (RMV 1 130): K3, sueldo 1 500 y 20 horas nocturnas, 20 × 6,25 × 0,35 = **43,75**; K2, comisionista sin sueldo, toma el piso: 20 × 4,7083 × 0,35 = **32,96**. En la micro y pequeña empresa la boleta avisa si la jornada es habitualmente nocturna (capítulo 24).'),
    p('**El trabajo en un feriado o en el día de descanso** sin descanso sustitutorio se paga con la entrada `TFER_001` (0107), con el mismo valor hora y la sobretasa del 100 % (capítulo 18). Las horas extras, la nocturna, el trabajo en feriado y la movilidad de libre disposición son **variables regulares** para la gratificación, la CTS y las vacaciones (capítulo 14.1).'),

    h2('20.1 El valor hora con la jornada del trabajador'),
    p('Desde el lote 24 (C-47) el valor hora divide la remuneración de un día entre **las horas de la jornada del trabajador** (D.S. 007-2002-TR, art. 12), no siempre entre 8. Las horas salen del **«Promedio de horas por día»** del horario del contrato (si no hay, del trabajador o de la compañía; sin ninguno, 8) y no pasan de 48 ÷ los días por semana del horario. Se usa en las horas extras, el trabajo en feriado, la nocturna y las tardanzas. Opción **«Valor hora»** (compañía, pestaña «Nómina PE - Controles», grupo «Valor hora y feriados»): «Sueldo ÷ 30 ÷ las horas diarias de la jornada del trabajador» (por defecto) o «Sueldo ÷ 30 ÷ 8», como antes.'),
    tabla(['Jornada (ejemplo del lote 24, sueldo 3 000)', 'Valor hora', '2 horas extras al 25 %', '4 horas en un feriado', 'Una hora de tardanza'], [
      ['8 h (6 días)', '12,50', '31,25', '100,00', '12,50'],
      ['48 h en 5 días (9,6 h)', '10,42', '26,04 (antes 31,25)', '83,33 (antes 100,00)', '10,42 (antes 12,50)'],
      ['Tiempo parcial de 4 h', '25,00', '62,50 (antes 31,25)', '200,00 (antes 100,00)', '25,00 (antes 12,50)'],
    ], [2600, 1300, 1900, 1900, 1938]),
    nota('El resultado depende del **horario**: revise que el horario del contrato de cada trabajador sea su jornada real. Si el horario pasa de 48 horas semanales, la boleta avisa. Que el valor hora use la jornada del trabajador es un criterio según la norma, pendiente de confirmación (P-89); también que el comisionista sin sueldo tenga horas extras en 0, porque su valor hora sale del sueldo del contrato (A-4).', 'importante'),

    h2('20.2 Movilidad'),
    tabla(['Entrada', 'Qué es', 'PLAME', 'Aportes y renta de 5.ª', 'Utilidades'], [
      ['**MOVL_001** «Movilidad de libre disposición»', 'Lo que el trabajador recibe sin condición y gasta como quiere: es remuneración', '0908', 'EsSalud, ONP/AFP, SCTR, SENATI y 5.ª', 'Entra'],
      ['**MOV_001** «Movilidad supeditada a la asistencia»', 'Solo cubre el traslado y se paga por día asistido', '0909', 'Sin aportes; **sí 5.ª** (Tabla 22)', 'No entra'],
    ], [2400, 2900, 900, 2238, 1200]),
    p('Caso DECLARACION, 70001401 (octubre de 2026): sueldo 2 000, 200 de libre disposición y 100 supeditada. ONP **286,00** y EsSalud **198,00** (sobre 2 200); base de 5.ª **2 300,00**; `.rem` 0908 200.00 y 0909 100.00 (lote 14, C-37). Ninguna de las dos va en la vacacional.'),

    h2('20.3 Adelantos, descuento judicial y cuota sindical'),
    tabla(['Concepto', 'Cómo', 'Caso medido'], [
      ['Adelanto quincenal', 'Estructura NQA con el «Porcentaje de adelanto» del contrato; la mensual lo descuenta (DESC_ADEL_001)', 'NOMINA, Luis: adelanto 40 % **1 800,00** y descuento de 1 800,00 en la mensual de julio de 2026; neto 2 112,30'],
      ['Descuento judicial', '«¿Tiene beneficiario?» en la ficha', 'NOMINA, Miguel: **522,00** (20 % del disponible)'],
      ['Cuota sindical', '«Sindicalizado» en el contrato; parámetro `pe_cuota_sindical`', 'NOMINA, Rosa (semanal): **4,20** por semana. EMPRESA_INDUSTRIA, I2 (2 000): **20,00**'],
    ], [2200, 4000, 3438]),

    h2('20.4 Reparto de utilidades'),
    p('**Nómina › Nómina PE › Reparto de utilidades** abre la lista de los **repartos guardados**, uno por compañía y ejercicio (N-16, lote 21b). **«Calcular un ejercicio»** abre el asistente: ejercicio, renta neta anual antes de impuestos y porcentaje según la actividad (10 %, 8 % o 5 %). Reparte el 50 % por días laborados y el 50 % por remuneraciones, con tope individual de 18 remuneraciones (D.Leg. 892), da el Excel y **guarda el reparto en borrador**. Si ya había un borrador del ejercicio, lo recalcula.'),
    ...figura('c20_01_reparto_utilidades', 'Asistente «Calcular un ejercicio» en SOLSE Demo Pequeña Empresa: ejercicio 2026 (sin coma), renta neta 100 000,00 y porcentaje 5 %.'),
    h3('Qué cuenta'),
    vinetas([
      '**Remuneraciones** (D.S. 009-98-TR, art. 6; lote 13, C-36): las boletas validadas mensuales, semanales, adicionales, de gratificación, de vacaciones y de liquidación, con las reglas marcadas **«¿Aplica para utilidades?»**. Las tardanzas restan. No entran la bonificación extraordinaria, la CTS, las indemnizaciones, la movilidad supeditada, las utilidades pagadas, la devolución de 5.ª ni los subsidios.',
      '**Días** (art. 4): los de jornada, menos toda ausencia y las faltas, más los de los tipos de ausencia con **«Cuenta como día laborado para utilidades»** (la maternidad y el «Descanso médico por accidente de trabajo o enfermedad profesional»). Con jornada a tiempo parcial, las horas ÷ la jornada de la empresa. Cada boleta va al ejercicio en que empieza.',
      '**La microempresa** queda fuera por defecto («Microempresa: utilidades» = «Excluir», lote 58): lo que la persona trabajó en el régimen general antes de pasar a la micro sí cuenta. Si todas las boletas son de la micro, el asistente no reparte y dice por qué.',
    ]),
    p('Ejemplo del lote 13 (criterio A): sueldo 3 000 con cese el 30/11/2026, gratificación, vacaciones, descanso común, movilidad y utilidades pagadas: **225 días y 41 250,00** de remuneraciones (antes 233 y 33 200). El Excel tiene al final el detalle: días de jornada, ausencias que restan, ausencias que cuentan, faltas, mensuales y semanales, gratificaciones, vacaciones, liquidación y planillas adicionales.'),
    h3('Empresas de 20 trabajadores o menos'),
    p('El D.Leg. 892 (art. 2) no obliga al reparto a la empresa con 20 trabajadores o menos (lote 62). El asistente cuenta, en cada mes del ejercicio, el mayor número de personas con contrato vigente a la vez (con las fichas archivadas y la microempresa, sin practicantes), suma los 12 meses, divide entre 12 y redondea 0,5 hacia arriba. Opción **«Con 20 trabajadores o menos: utilidades»** (compañía, grupo «Utilidades (D.Leg. 892)»):'),
    tabla(['Valor', 'Qué hace'], [
      ['**Repartir y avisar** (por defecto)', 'Reparte y avisa arriba del reparto: «Aviso: la compañía tuvo en el ejercicio 2026 N trabajadores (… en promedio …): con 20 o menos el D.Leg. 892 (art. 2) no la obliga al reparto … El número sale de los contratos registrados: revise que estén todos.»'],
      ['No repartir (no está obligada)', 'No reparte y dice el número'],
      ['Repartir sin aviso (voluntario o por convenio)', 'Reparte sin aviso'],
    ], [3200, 6438]),
    tabla(['Caso', 'Trabajadores en promedio', 'Reparto'], [
      ['EMPRESA_PEQUENA', '68 ÷ 12 = 5,67, redondea a **6**', '5 % de 100 000 = **5 000,00** entre 5, con aviso'],
      ['EMPRESA_COMERCIO', '96 ÷ 12 = **8**', '8 % de 100 000 = **8 000,00** entre 4, con aviso'],
      ['EMPRESA_INDUSTRIA', '48 ÷ 12 = **4**', '10 % de 100 000 = **10 000,00** entre 4, con aviso'],
    ], [2600, 3200, 3838]),
    p('El valor por defecto no es «No repartir» porque el conteo sale de los contratos registrados: si faltan contratos, el número sale menor que el real. Los repartos ya guardados no cambian hasta recalcularlos.'),
    h3('El reparto guardado'),
    tabla(['Campo o botón', 'Qué es'], [
      ['**Remuneración del tope**', '«Vigente al cierre, con la asignación familiar» (**por defecto** desde el lote 22a: el sueldo de la versión al 31/12 más la asignación familiar del último mes), «Vigente al cierre del ejercicio» (solo el sueldo) o «Promedio mensual del ejercicio». Al cambiarla, «Recalcular»; los repartos guardados conservan su opción'],
      ['**Fecha de pago**', 'Posterior al cierre del ejercicio (D.Leg. 892, art. 6). Es la fecha límite para entregar la hoja'],
      ['**Fecha de la declaración jurada anual**', 'Con la fecha, «Se paga» se calcula (lote 30): antes de ella, `UTIL_ANT_001` (0910); ese día o después, `UTIL_001` (0911). Sin la fecha, se elige'],
      ['**Confirmar** / **Volver a borrador** / **Recalcular**', 'Un reparto confirmado no se recalcula ni se borra. «Volver a borrador» no se puede con boletas de la planilla validadas ni con el pago o la entrega de la hoja de un ex trabajador registrados'],
      ['**Generar la planilla de utilidades**', 'En el reparto confirmado con fecha de pago: crea el lote «Utilidades del ejercicio N» con una boleta de la estructura «Planilla de utilidades» por trabajador con contrato en el mes del pago, calculadas y en borrador. **«Completar la planilla de utilidades»** agrega las que falten'],
      ['**Trabajadores**', 'Las líneas: días, remuneraciones, participación por días y por remuneraciones, tope, lo que se paga y el remanente. «Ex trabajador» con la fecha de cese si no tiene contrato en la fecha de pago'],
    ], [3100, 6538]),
    p('**Caso UTILIDADES_REPARTO** (SOLSE Demo Servicios, ejercicio 2031, medido en contable19): renta neta 5 000 000,00 al 5 %, monto **250 000,00**; los tres con 261 días (total 783) y remuneraciones de 192 000,00; pago el 30/04/2032, después de la declaración (`UTIL_001`); tope «Vigente al cierre, con la asignación familiar»; confirmado.'),
    tabla(['Trabajador', 'Remuneraciones', 'Por días', 'Por remuneraciones', 'Tope (18 ×)', 'A pagar', 'Pago'], [
      ['70002501 (3 000)', '36 000,00', '41 666,67', '23 437,50', '54 000,00', '**54 000,00**', 'Boleta: 5.ª 5 215,60; neto 48 784,40'],
      ['70002502 (5 000), ex trabajadora, cese 31/01/2032', '60 000,00', '41 666,67', '39 062,50', '90 000,00', '**80 729,17**', 'Fuera de la planilla, 30/04/2032'],
      ['70002503 (8 000)', '96 000,00', '41 666,67', '62 500,00', '144 000,00', '**104 166,67**', 'Boleta: 5.ª 15 936,53; neto 88 230,14'],
    ], [2000, 1300, 1150, 1350, 1250, 1250, 1338]),
    p('70002501 llega al tope: su participación es 65 104,17 y el remanente por topes, **11 104,17**, va al FONDOEMPLEO (art. 3).'),
    ...figura('c20_03_reparto_guardado', 'Reparto 2031 de SOLSE Demo Servicios (caso UTILIDADES_REPARTO), confirmado: monto 250 000,00, total de días 783, remuneraciones 192 000,00, remanente 11 104,17 y las tres líneas, con la ex trabajadora marcada.'),
    h3('La hoja de liquidación de utilidades'),
    p('Desde cada línea, **«Hoja de liquidación»** (o Imprimir › «Hoja de liquidación de utilidades (PE)») imprime lo que pide el D.S. 009-98-TR, art. 16: la renta anual, los días y remuneraciones del trabajador y los totales, la forma del cálculo, el tope con la remuneración que se usó, lo que se paga y, con boleta, la retención de 5.ª y el neto. La hoja de un reparto sin confirmar lleva en rojo «BORRADOR». Se entrega al pagar (art. 7):'),
    vinetas([
      'la boleta de la planilla de utilidades, con «Enviar por correo», lleva la boleta y su hoja (capítulo 28);',
      'el **ex trabajador** no tiene boleta: se le paga fuera de la planilla y en su línea se registran la fecha y la operación del pago; la hoja se envía desde su línea o con «Enviar las hojas de los ex trabajadores», y «Confirmar recepción» registra el cargo de la hoja entregada impresa;',
      '**Nómina PE › Trabajadores del reparto de utilidades** lista las líneas de todos los repartos con los filtros «Ex trabajadores», «Sin boleta», «Sin el pago registrado», «Hoja sin enviar» y «Sin recepción confirmada».',
    ]),
    h3('La renta de 5.ª del pago'),
    p('Las utilidades son ingreso extraordinario (capítulo 13.3): la boleta del pago retiene el impuesto anual con ellas menos el impuesto sin ellas, en ese mismo mes (C-44). No pagan aportes. Caso ADICIONALES, 70001706: planilla de utilidades de 20 000,00 que retiene **2 800,00**. Caso DECLARACION: 70001404, `UTIL_ANT_001` 1 000 (PLAME 0910) y 70001405, `UTIL_001` 800 (0911), sin aportes sobre ellas.'),
    nota('Caso UTILIDADES (ejercicio 2025, tres trabajadores con los mismos días): monto 5 000,00, por días 833,33 cada uno y por remuneraciones 500,00, 750,00 y 1 250,00 (12 000, 18 000 y 30 000 de las mensuales); a pagar 1 333,33, 1 583,33 y 2 083,33. Con la liquidación del 30/06/2025, las remuneraciones son 15 000, 22 500 y 37 500 (C-36). En el escenario de tope, el tope usa el sueldo vigente al cierre del ejercicio, no el de hoy (C-22), y el remanente es 320 000,00.', 'caso'),
    nota('Criterios según la norma, pendientes de confirmación: cómo se cuentan los trabajadores para el umbral de 20 y si cuentan la micro y el tiempo parcial (A-1.2), que el reparto voluntario se calcule como el obligatorio (A-1.3), el tope del comisionista sin sueldo, que hoy sale del sueldo del contrato y queda sin tope (A-3), y la fecha de la declaración frente al vencimiento (P-66). Con su valor por defecto: el aviso del umbral (A-1.1), las licencias con goce (P-60), los conceptos no remunerativos (P-61), el accidente de trabajo (P-62) y la microempresa (P-160). Ver el capítulo 33 y el Anexo A.', 'importante'),
    pieCapitulo(['ce', 'ce_demo'], 'C-10, C-22, C-36 (lote 13), C-37 y C-40 (14), C-44 (15), N-10 (16), C-41 (17), N-16 (21b), lote 22a, C-47 (24), P-66 (30), O-179 (58), O-186 (62)'),
  );


  return c;
};
