// Manual v3, capítulo 17: vacaciones. Origen: v2 (FM y caso NOMINA, 22/10/2026), más los lotes 17 (variables
// regulares), 20a a 20c (provisión, remite al 7), 22a, 22b, 23b, 32b, 33a, 33b, 35a (adelanto), 35b (remedición), 42b
// (récords al cese, nota CESE), 46b (orden de las vacacionales), 54 (.snl guardado) y 67 (tiempo parcial). Cifras de
// los casos medidas en contable19 el 09/11/2026 (NOMINA, COMPUTABLE) y ejemplos de los lotes.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 17
  a(
    h1('17. Vacaciones'),
    p('Las vacaciones se devengan como **asignaciones** del tipo **Vacaciones PE (D.Leg. 713)** (2,5 días por mes en el régimen general; 15 días por año en la micro y pequeña empresa) y se gozan con una **ausencia** aprobada del mismo tipo. El récord se cuenta desde el inicio del **vínculo**: una renovación sin interrupción no lo corta (lote 22b).'),
    ...figura('c17_03_asignaciones', 'Asignaciones de FM SYSTEMS: Lucía 52,5 días (21 meses) y Héctor 47,5 días (19 meses).'),
    ...figura('c17_04_ausencias', 'Ausencias aprobadas: Lucía del 2 al 16 de febrero de 2026 (11 días hábiles) y Héctor del 14 al 23 de setiembre de 2026 (8 días hábiles).'),
    h2('17.1 Tipos de ausencia y Tabla 21'),
    p('Cada tipo de ausencia tiene su **Tipo de suspensión (Tabla 21)** (C-09). Con ese código, la boleta descuenta los días declarados y el PLAME los lleva al `.snl`. Por defecto: Vacaciones PE 23, «Sin pagar» 05, Enfermedad 20, Días compensatorios 27 y Maternidad 22. Desde el lote 54 las suspensiones del mes **quedan guardadas al validar** la boleta: una ausencia aprobada o rechazada después ya no cambia el `.snl` ni los días impresos de un mes ya pagado.'),
    ...figura('c17_05_tipos_ausencia_tabla21', 'Tipos de ausencia con su código de la Tabla 21.'),

    h2('17.2 Boleta de vacaciones y mensual del mes'),
    p('En el mes de goce se calculan dos boletas: la **vacacional** (estructura VAC) por los días de goce y la **mensual** por el resto. Ejemplo del caso NOMINA: Óscar (sueldo 3 000) goza del 1 al 15 de julio de 2026.'),
    ...figura('c17_06_oscar_vac_jul2026_dias', 'Vacacional de Óscar: «Vacaciones PE» −11 días / −88 h pagada.'),
    ...figura('c17_07_oscar_nme_jul2026_dias', 'Mensual de Óscar: la misma línea de vacaciones, **no pagada** (¿Pagado? sin marcar, C-16).'),
    tabla(['Boleta', 'Remuneración', 'ONP', 'EsSalud', 'Neto'], [
      ['Vacacional (1–15 jul.)', 'VAC_001 1 500,00', '195,00', '135,00', '1 305,00'],
      ['Mensual (16–31 jul.)', 'RB_001 1 500,00', '195,00', '135,00', '1 305,00'],
      ['**Mes**', '**3 000,00**', '**390,00**', '**270,00**', ''],
    ], [2600, 2200, 1400, 1400, 2038]),
    p('En el recorrido de FM, Lucía goza 15 días en febrero de 2026: vacacional **2 306,50** ((4 500 + 113) / 30 × 15) y mensual con remuneración 2 250,00 y asignación familiar 113,00 completa. La asignación familiar del mes de goce parcial va completa en la mensual y proporcional en la vacacional: según la contadora es correcto (C-04, P-19). Total del mes: 4 669,50.'),
    ...figura('c17_01_lucia_vac_feb2026_calculo', 'Lucía, vacacional de febrero de 2026: 2 306,50 con AFP, EsSalud y SENATI; neto 2 008,50.'),
    ...figura('c17_02_lucia_nme_feb2026_calculo', 'Lucía, mensual de febrero de 2026: remuneración 2 250,00, asignación familiar 113,00 y renta de 5.ª del mes de vacaciones 183,73 (C-11).'),
    ...figura('c17_02_lucia_nme_feb2026_dias', 'Mensual de Lucía, febrero de 2026: «Vacaciones PE (D.Leg. 713)» −11 días sin «¿Pagado?» (C-16), igual que la de Óscar.'),
    nota('Un mes **entero** de goce deja la mensual sin importes, porque EsSalud y la prima ya se pagaron en la vacacional (C-26). Esa mensual no se valida: elimínela (C-18). Caso NOMINA: Nilda, 1 al 30 de julio de 2026, vacacional 3 000,00.', 'nota'),
    p('La vacacional **no retiene renta de 5.ª**: lo que paga cuenta en la mensual del mes (capítulo 13). La asignación familiar se paga con la edad del hijo **al inicio del periodo** de la boleta (lote 22a).'),

    h2('17.3 La remuneración vacacional'),
    p('La remuneración vacacional es la computable vigente al goce (D.Leg. 713, art. 15): el sueldo, la asignación familiar y el promedio de las **variables regulares** (capítulo 14.1) de los **6 meses anteriores** al mes en que empieza el goce, ÷ los meses del periodo si son menos de 6 (D.S. 012-92-TR, art. 16; lote 23b). No lleva la gratificación.'),
    tabla(['Caso o ejemplo', 'Situación', 'Vacacional'], [
      ['COMPUTABLE, 70001805 (3 000)', 'Movilidad de 200 en 5 de los 6 meses; goce del 1 al 15/12/2026', '(3 000 + 1 000 ÷ 6) × 15 ÷ 30 = **1 583,33** (medido en contable19)'],
      ['Ejemplo del lote 33a', 'Un bono bimestral con la forma «Periódica» en 3 meses', 'No entra en las vacaciones (D.S. 012-92-TR, art. 16); como «Variable» sumaba 450,00 a la base'],
      ['Ejemplo del lote 33b', 'Destajero de la semanal, vacaciones desde el 13/07: destajo de 700, 700, 700 y 1 400 en las 4 semanas anteriores', '3 500 ÷ 28 × 30 = **3 750,00** (antes 0)'],
    ], [2500, 4000, 3138]),
    p('**El destajero** de la planilla semanal toma el destajo de las 4 semanas anteriores a la semana que precede al descanso (D.S. 012-92-TR, art. 18). Opción **«Vacaciones del destajero»** (grupo «Remuneración computable (variables regulares)»): «Los 6 meses anteriores al goce, como el comisionista». Sin semanales en esas semanas, usa los 6 meses y avisa. El comisionista usa el promedio de los 6 meses sin el requisito de 3 meses (lote 33b).'),

    h2('17.4 El adelanto de vacaciones'),
    p('El módulo reparte los días de cada vacacional validada entre los récords del vínculo (lote 35a; D.Leg. 713, art. 10; D.S. 002-2019-TR, arts. 5 y 6):'),
    pasos([
      'primero, el récord cumplido más antiguo con días pendientes (también los acumulados);',
      'si no queda ninguno, a cuenta del récord **en curso**, que todavía no se cumple: es el **adelanto**;',
      'un goce que cruza el aniversario se parte en él; las vacacionales rectificadas con nota de crédito no cuentan.',
    ]),
    p('La vacacional de un adelanto avisa: «Adelanto de vacaciones: N de los M días de este goce son a cuenta de un récord que todavía no se cumple (el que empieza el …). Requiere acuerdo escrito previo con el trabajador (D.Leg. 713, art. 10; D.S. 002-2019-TR, art. 5). Al cese antes de cumplirlo, se restan de las vacaciones truncas, sin cobrar el exceso (art. 6.2).»'),
    tabla(['Ejemplo del lote 35a (sueldo 3 000, 100,00 por día)', 'Antes', 'Ahora'], [
      ['Ingreso el 01/01/2026, 10 días adelantados en julio, cese el 30/09: vacaciones truncas', '2 250,00', '**1 250,00**'],
      ['Ingreso el 01/01/2026, 15 días adelantados en abril, cese el 31/05', '1 250,00', '**0** (los 2,5 días no compensados no se cobran)'],
      ['Récord 2025 con 10 días adelantados en julio de 2025, cese el 31/03/2026: no gozadas', '3 000,00', '**2 000,00**'],
      ['Vacacional de 20 días rectificada con nota de crédito, cese el 31/03: no gozadas', '1 000,00', '**3 000,00**'],
      ['Provisión del récord en curso: 750,00 devengados y una vacacional adelantada de 1 500,00', '750,00', '**−750,00** (pago anticipado)'],
    ], [5200, 1800, 2638]),
    p('Con provisión, la opción **«Adelanto de vacaciones en la provisión»** (grupo «Provisiones (N-13)» de la compañía) descarga el adelanto del récord en curso al pagarlo (por defecto) o lo deja «Como antes: al gasto del mes» (capítulo 7). Es un criterio según la norma, pendiente de confirmación (P-96 y P-109).'),
    nota('**Valide las vacacionales en orden.** Si una vacacional posterior ya está validada y aplicó lo provisionado, la anterior avisa «vacaciones_orden» («Vacaciones fuera de orden: … posterior a esta, ya está validada y repartió sus días entre los récords sin esta … Valide en orden: cancele esa, valide esta y vuelva a validar esa») (lote 46b). Sin provisión, el orden no cambia nada.', 'importante'),

    h2('17.5 Los récords al cese'),
    p('Lo que paga la liquidación está en el capítulo 16. Para las vacaciones importa (lotes 21a, 32b y 42b):'),
    vinetas([
      '**El aniversario** se cuenta desde la fecha de ingreso, de fecha a fecha (Código Civil, art. 183): con ingreso el 29/02/2024, los aniversarios son el 28/02 en 2025 a 2027 y el 29/02 en 2028.',
      '**El año que se completa el día del cese** es un récord cumplido: va como vacaciones ganadas y no gozadas (`VAC_ADQ_001`, PLAME 0118), no como trunca. Ejemplo del lote 42b: ingreso el 15/03/2025 y cese el 14/03/2026, `VAC_ADQ_001` **3 000,00** y trunca 0 (antes, trunca 3 008,33).',
      '**Las vacaciones truncas** se cuentan de fecha a fecha desde el aniversario: del 15/03 al 30/04/2026, 1 mes y 16 días, **383,33** con sueldo 3 000 (por meses calendario, 391,67). Con menos de un mes de servicios no hay truncas. Opción **«Meses de las vacaciones truncas»** (grupo «Conteo de meses y días»).',
      '**Las no gozadas** de récords anteriores: la opción «Vacaciones ganadas y no gozadas al cese» (grupo «Liquidación por cese (N-15)») avisa por defecto, para registrarlas con `VAC_ADQ_001` e `IND_VAC_001`, o las calcula. La indemnización vacacional es la del récord cuyo año para gozar vence el día del cese.',
      'Si el récord cruza un **cambio de régimen** (general a pequeña empresa), la trunca se calcula por tramos, cada uno con sus días.',
    ]),

    h2('17.6 El trabajador a tiempo parcial'),
    p('Las vacaciones del trabajador con menos de 4 horas diarias se calculan **como a cualquiera** (30 días en el régimen general) y la vacacional, la CTS y la liquidación avisan «tiempo_parcial»: «Las vacaciones: el reglamento las excluye (D.S. 012-92-TR, art. 11) y la SUNAFIL aplica el Convenio 52 de la OIT (6 días por año); el sistema las calcula como a cualquiera: revíselo» (lote 67). Es un criterio según la norma, pendiente de confirmación (A-6.1). Cómo se detecta el tiempo parcial: capítulo 15.3.'),

    h2('17.7 La provisión de vacaciones'),
    p('Si la compañía provisiona (capítulo 7, N-13), cada mes se provisiona un dozavo de la remuneración vacacional (sueldo 3 000: 250,00) desde el ingreso, y la vacacional descarga lo pagado de los récords cumplidos antes del goce, del más antiguo; con «En la boleta del beneficio», en la propia vacacional (`APL_VAC_001`; goce del 1 al 15/02 del récord 2025: 1 500,00, lote 20c). Con **«Pasivo de vacaciones»** = «Remedir cada mes con la remuneración vigente» (por defecto desde el lote 35b), el pasivo de cada récord se vuelve a medir con la remuneración del cierre del mes: ingreso el 01/01/2026 y aumento a 4 000 el 01/07, el pasivo al 31/07 es **2 333,33** (17,5 días × 133,33; mes a mes, 1 833,33). Un récord cumplido sin gozar dentro del año siguiente provisiona también la indemnización vacacional (lote 50).'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-04, C-09, C-11, C-16, C-26, C-41 (lote 17), N-13 (20a a 20c), lote 22a, C-48 (22b), P-80 (23b), P-51 (32b), P-83 (33a), P-84 (33b), O-76 (35a), O-77 (35b), O-147 (50), lote 42b, O-141 (46b), O-167 (54), O-193 (67)'),
  );


  return c;
};
