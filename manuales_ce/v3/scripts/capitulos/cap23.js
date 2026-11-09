// Manual v3 (origen: v2), capítulo 23. Actualizado por el grupo g5_cese con los lotes 24, 27b, 28a, 28b y la nota EL_MES
// (43, 47 y 54). Cifras releídas en contable19 el 2026-11-09 (caso SUBSIDIOS, 29 boletas, y las opciones de las compañías);
// las de los ejemplos sin caso salen de los criterios de cada lote (corridas reales de la base de pruebas del lote).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 23
  a(
    h1('23. Subsidios: descanso médico y maternidad'),
    p('La nómina calcula los subsidios de EsSalud (N-01). El descanso se registra como **ausencia** del tipo que corresponde y la boleta lo reparte por la **Tabla 21**:'),
    tabla(['Código T21', 'Qué es', 'Tipo de ausencia', 'Quién paga'], [
      ['20', 'Incapacidad temporal: los primeros 20 días del año', 'Tiempo personal por enfermedad', 'El empleador (remuneración)'],
      ['21', 'Incapacidad temporal desde el día 21 (subsidio)', 'El mismo; la boleta separa los días', 'Subsidio de EsSalud: `SUB_INC_001`, PLAME 0916'],
      ['22', 'Maternidad: pre y post natal', 'Descanso por maternidad (pre y post natal)', 'Subsidio de EsSalud: `SUB_MAT_001`, PLAME 0915'],
    ], [1300, 3400, 2700, 2238]),
    p('Los 20 días del empleador se cuentan por año calendario con las ausencias anteriores, salvo la incapacidad que ya estaba subsidiada el 31/12 (23.5). El subsidio no paga EsSalud; tampoco ONP, salvo que la compañía elija lo contrario (23.2). Con AFP paga aporte y prima (categoría «Ingreso afecto AFP»).'),
    ...figura('c23_04_descanso_medico', 'Descanso médico de noviembre de 2026 (caso SUBSIDIOS, 70000801), aprobado: «Tiempo personal por enfermedad» del 1 al 30 de noviembre (21 días hábiles), con la casilla «Accidente (común o de trabajo)» desmarcada.'),
    h3('Registrar un descanso médico'),
    pasos([
      'En **Vacaciones › Gestión › Vacaciones**, cree la ausencia del trabajador con el tipo «Tiempo personal por enfermedad» (o «Descanso por maternidad (pre y post natal)») y las fechas del certificado.',
      'Si la incapacidad viene de un **accidente**, común o de trabajo, marque **«Accidente (común o de trabajo)»** en la primera ausencia del descanso (23.3). Solo la marca el encargado de ausencias.',
      'Apruebe la ausencia y calcule la boleta del mes: la pestaña «Días trabajados y entradas» separa los días 20 y 21 (o 22).',
      'Revise la banda de avisos (derecho al subsidio, sin remuneraciones previas) y valide. Al validar, la boleta guarda sus suspensiones por día para el `.snl` (23.6).',
    ]),

    h2('23.1 El promedio diario'),
    p('El subsidio diario es la suma de las remuneraciones de los **12 meses calendario anteriores** al mes en que empieza la contingencia, dividida entre los **días de afiliación** de esos meses (Ley 26790, art. 12 a.2; D.S. 013-2019-TR, art. 33.4; lote 28a). Con los 12 meses enteros el divisor es 360; con menos, el tiempo de afiliación.'),
    vinetas([
      '**El mes que el vínculo no cubre entero** (ingreso, reingreso con hueco) cuenta sus días, con tope de 30. Ingreso el 16/06 con 3 000 y descanso en noviembre con 10 días subsidiados: 1 000,00 (antes 900,00).',
      '**Un mes entero en suspensión perfecta** (licencia sin goce, sanción) sigue siendo de afiliación y entra con 0: marzo entero sin goce en la ventana da 916,67 en vez de 1 000,00. Solo cuenta desde la primera boleta del trabajador o el inicio de su vínculo.',
      '**Un mes sin boleta ni ausencias** no cuenta: falta el dato.',
      '**Las horas extras entran siempre** (art. 33.2): 312,50 en 2 de 12 meses dan 1 008,68 en vez de 1 000,00.',
      '**El trabajo en feriado entra siempre** (lote 24): seis meses de 3 000 y 200,00 de feriado en marzo dan (18 000 + 200) ÷ 180 = 101,11 por día (antes 100,00).',
    ]),
    p('Las cifras de estos ejemplos son de los criterios de los lotes 24 y 28a. Las opciones están en la ficha de la compañía, pestaña «Nómina PE - Controles», grupo «Valor hora y feriados»:'),
    tabla(['Opción', 'Por defecto', 'Alternativa (lo de antes)'], [
      ['«Trabajo en feriado en el promedio del subsidio»', '«Siempre (Ley 26790, art. 12 a.2)»', '«Solo si es regular, como las horas extras»'],
      ['«Horas extras en el promedio del subsidio»', '«Siempre (D.S. 013-2019-TR, art. 33.2)»', '«Solo si son regulares: 6 de los 12 meses»'],
      ['«Mes de ingreso en el promedio del subsidio»', '«Por sus días de afiliación»', '«Como un mes entero» o «No contarlo»'],
      ['«Meses sin remuneración en el promedio del subsidio»', '«Con 0 (siguen siendo meses de afiliación)»', '«Fuera del divisor»'],
      ['«Reglas del promedio del subsidio: desde»', 'La fecha de la actualización (01/11/2026 en FM y en SOLSE Demo Servicios)', 'Las contingencias que empezaron antes siguen con las reglas de antes (art. 33.9)'],
    ], [3500, 3200, 2938]),

    h2('23.2 El monto: redondeo, promedio fijo y ONP'),
    vinetas([
      '**En soles enteros** (Directiva 08-GG-ESSALUD-2012, num. 10.2; lote 28b): 0,50 o más al entero superior. El redondeo es del monto de la contingencia: cada boleta paga lo acumulado redondeado menos lo de las anteriores. Diez días con promedio 91,666…: 917,00 (antes 916,67). El promedio diario no se redondea. Opción «Redondeo del subsidio»: «Con céntimos».',
      '**El promedio queda fijo hasta el alta** (art. 33.9): se fija al validar la primera boleta de la contingencia, aunque solo tenga días del empleador, y las siguientes lo usan aunque después se rectifique un mes de la ventana (octubre rectificado con +3 000 después de validar noviembre: diciembre sigue en 3 100,00). Una contingencia nueva tiene su propio promedio.',
      '**Dónde se ve:** en la ficha del trabajador, pestaña «Nómina PE», sección **«Promedios fijados del subsidio»** (subsidio, inicio de la contingencia, promedio diario y la boleta que lo fijó). El usuario de nómina solo lo lee; el administrador lo cambia o lo borra, y la próxima boleta lo vuelve a calcular.',
      '**La ONP** no grava el subsidio (Informe SUNAT 049-2014-SUNAT/5D0000): noviembre con 1 000,00 de subsidio paga ONP 260,00 sobre la remuneración. Con la opción «Subsidio afecto a la ONP» en «Sí (nota del 0607 de la Tabla 22)», 390,00. El SPP lo grava siempre.',
    ]),
    ...figura('c23_05_promedios_fijados', 'Ficha de la trabajadora SUBSIDIOS días previos (70000802), pestaña «Nómina PE», sección «Promedios fijados del subsidio»: dos contingencias de incapacidad temporal, con inicio el 12 oct. y el 1 nov., promedio diario 100 cada una, fijadas por sus boletas mensuales.'),

    h2('23.3 Derecho al subsidio'),
    p('El subsidio exige **3 meses de aportes consecutivos o 4 no consecutivos** en los 6 meses calendario anteriores al mes de la contingencia (Ley 26790, art. 10). La boleta lo comprueba con las boletas validadas. Si faltan, **calcula el subsidio y avisa** que EsSalud no lo reembolsará; con el control «Subsidio sin los aportes que dan derecho» en «Bloquear» no deja validar (capítulo 26). La entrada SUBI_001 o SUBM_001, con el importe, levanta el control.'),
    vinetas([
      '**Accidente:** en un accidente, común o de trabajo, basta la afiliación (art. 10; D.S. 013-2019-TR, art. 6.1 c). Marque «Accidente (común o de trabajo)» en la primera ausencia de la incapacidad y el aviso desaparece (lote 28a). No vale para la maternidad ni para una enfermedad profesional; el cambio queda en el historial de la ausencia.',
      'El aviso dice: «… no cumple los aportes que dan derecho al subsidio por incapacidad: 3 meses consecutivos o 4 no consecutivos en los 6 meses calendario anteriores al mes en que empezó (Ley 26790, art. 10), según las boletas validadas. EsSalud no reembolsará el subsidio. Si fue un accidente, márquelo en la ausencia («Accidente»: basta la afiliación); si los aportes están fuera del sistema, registre el importe con la entrada SUBI_001.»',
    ]),
    ...figura('c23_03_sin_derecho_aviso', 'Trabajador con un solo mes de aportes antes del descanso (caso SUBSIDIOS, 70000805, noviembre de 2026): remuneración 2 000,00 por los 20 días del empleador y subsidio por incapacidad 1 000,00, con la nota del aviso de derecho en el historial; neto 2 740,00.'),

    h2('23.4 Los casos de noviembre de 2026 a febrero de 2027'),
    ...figura('c23_01_descanso_nov_calculo', 'Caso SUBSIDIOS, noviembre: remuneración 2 000,00 por los 20 primeros días y subsidio por incapacidad 1 000,00 por los 10 siguientes (promedio diario 100,00); ONP 260,00 y EsSalud 180,00 sobre la remuneración; neto 2 740,00.'),
    tabla(['Trabajador (caso SUBSIDIOS)', 'Boleta', 'Días T21', 'PLAME .rem'], [
      ['70000801 · descanso de 30 días', 'Noviembre: RB 2 000,00 · subsidio 1 000,00 · neto 2 740,00', '20|20 y 21|10', '0121 2 000,00 · 0916 1 000,00'],
      ['70000802 · 15 días en octubre y 30 en noviembre', 'Noviembre: RB 500,00 · subsidio 2 500,00', '20|5 y 21|25', '0121 500,00 · 0916 2 500,00'],
      ['70000803 · maternidad desde el 01/11', 'Noviembre: subsidio 3 000,00 (diciembre 3 100,00), sin ONP ni EsSalud', '22|30 (diciembre 22|31)', '0915 3 000,00'],
      ['70000804 · con AFP', 'Noviembre: RB 2 000,00 · subsidio 1 000,00; AFP 300,00 y prima 41,10', '20|20 y 21|10', 'AFPnet: asegurable 3 000,00'],
      ['70000805 · sin derecho', 'Noviembre: RB 2 000,00 · subsidio 1 000,00, con el aviso', '20|20 y 21|10', '0121 2 000,00'],
      ['70000806 · maternidad desde el 15/01/2027', 'Enero: RB 1 300,00 (30 − 17) · subsidio 1 700,00; febrero: subsidio 2 800,00', '22|17; febrero 22|28', '0121 1 300,00 · 0915 1 700,00; febrero 0915 2 800,00'],
      ['70000807 · descanso del 15/12/2026 al 25/01/2027', 'Diciembre: 17 días del empleador, RB 3 000,00; enero: RB 2 500,00 · subsidio 500,00', 'Diciembre 20|17; enero 20|20 y 21|5', 'Enero: 0121 2 500,00 · 0916 500,00'],
    ], [2700, 3200, 1700, 2038]),
    ...figura('c23_02_maternidad_nov_calculo', 'Maternidad de noviembre (70000803): remuneración 0,00 y subsidio por maternidad 3 000,00 (promedio diario 100,00), sin ONP, EsSalud ni SENATI; neto 3 000,00.'),
    nota('Para 70000805, qué declarar en el PLAME sin derecho espera a la contadora (P-42): el caso solo compara la 0121 de su `.rem`. Las boletas del caso tienen todos sus promedios fijados en 100,00.', 'nota'),
    nota('En las boletas del caso, la línea de días del descanso médico se llama «Sick Time Off» con el código GLOBAL: es el nombre de la entrada de trabajo de Odoo, sin traducir (observación O-65). El cálculo y el `.snl` no se ven afectados.', 'nota'),
    nota('Caso SUBSIDIOS (344 celdas, 29 boletas): días por tipo de la Tabla 21, conceptos, `.snl` y `.rem` de noviembre de 2026 y de enero y febrero de 2027, promedio diario 100,00 y avisos de derecho.', 'caso'),

    h2('23.5 El cambio de año'),
    p('**Si el 31/12 el empleador todavía pagaba** (el descanso no llegó a 20 días en el año), en enero sigue pagando hasta completar los 20 días del año nuevo (Reglamento de Pago de Prestaciones Económicas de EsSalud, art. 33.10 a). Es lo que muestra 70000807: 17 días del empleador en diciembre y, en enero, 20 del empleador y 5 subsidiados.'),
    p('**Si el 31/12 ya estaba subsidiado** y la incapacidad sigue el 1 de enero, los días de enero siguen subsidiados hasta el alta y no consumen otra vez los 20 días del empleador (art. 33.10 b; lotes 43 y 47). Criterio del lote: un descanso del 01/11/2026 al 31/01/2027 tiene **enero entero subsidiado**; antes salían 20 días del empleador (RB 1 900,00) y 11 subsidiados. La continuación llega hasta la primera interrupción; un descanso nuevo en el año tiene sus 20 días del empleador. La semanal que cruza el año (del 28/12 al 03/01) se cuenta por año.'),
    p('La regla rige desde la fecha de la opción **«Continuación del subsidio al año nuevo desde»** (ficha de la compañía, grupo «Valor hora y feriados»), que es un 1 de enero. La actualización la puso en el 1 de enero siguiente al último día pagado por una mensual o semanal validada: **01/01/2027 en FM SYSTEMS** y **01/01/2029 en SOLSE Demo Servicios** (por eso el caso SUBSIDIOS, de 2026 y 2027, sigue con la regla anterior). Vacía, rige siempre. Los años anteriores a la fecha, ya declarados, no cambian.'),

    h2('23.6 La semanal y el PLAME'),
    vinetas([
      '**La boleta que cruza de mes** (lote 27b). El `.rem` de cada mes lleva la parte del subsidio de los días subsidiados de ese mes, como el `.snl`. Semanal del 26/10 al 01/11 con 7 días subsidiados y 700,00: **600 en octubre y 100 en noviembre** (antes, 700 en octubre). Maternidad desde el 29/10 en la misma semanal, 1 400,00: 1 050 y 350. Las partes van en soles enteros y suman el importe; la nota de crédito resta lo mismo en cada mes.',
      '**El redondeo en las semanales** (lote 28b): una maternidad pagada en semanales suma lo mismo que en una sola boleta; la del 30/11 (6 días) y la del 07/12 (7 días) pagan 607 y 707, lo acumulado.',
      '**El `.snl` guardado** (lote 54). Al validar, la mensual y la semanal guardan sus suspensiones por día. Un descanso acortado, aprobado o rechazado después ya no cambia el `.snl`, los días impresos ni el reparto del subsidio de un mes ya pagado; el resumen del PLAME avisa las validadas cuyas ausencias cambiaron (se rectifican con nota de crédito y una boleta nueva, capítulo 25).',
      'La remuneración de la semanal que cruza de mes y sus aportes siguen yendo enteros al mes en que empieza, y el AFPnet no cambia: en el mes del cruce, la base del SPP del PLAME y la del AFPnet difieren en esa parte.',
    ]),
    tabla(['Opción (grupo «PLAME» de la ficha de la compañía)', 'Valores', 'Hoy'], [
      ['«Subsidio de una boleta que cruza de mes (PLAME)»', '«Por los días subsidiados de cada mes» o «Todo en el mes en que empieza la boleta» (lo de antes)', 'Por los días'],
      ['«Subsidio que cruza de mes: desde»', 'Solo las boletas que empiezan esa fecha o después; vacía, todas', '01/11/2026 en FM y en SOLSE Demo Servicios'],
    ], [3600, 4000, 2038]),
    p('Las cifras de la semanal son de los criterios de los lotes 27b y 28b: en contable19 no hay semanales con subsidio (la re-medición del lote 27b contó 0 boletas que cruzan de mes con subsidio).'),
    nota('Criterios según la norma, pendientes de confirmación de la contadora: el trabajo en feriado siempre en el promedio (P-90); que los 20 días del empleador del año nuevo queden para un descanso posterior y que dos certificados seguidos (alta el 31/12 y otro desde el 01/01) sean una sola incapacidad (P-134); la renta de 5.ª de un mes con subsidio, que proyecta con la remuneración del mes (P-45 a); y el subsidio de un mes de 28 o 31 días con suspensión parcial (P-41). Con su valor de hoy: el promedio, el redondeo y el promedio fijo (P-37, P-38, P-43), la ONP (P-35), el reparto del PLAME (P-44) y el aviso de derecho (P-42). La vacacional no paga subsidios. La prima de Vida Ley de un mes subsidiado va con la última remuneración (lote 34b, capítulo 6).', 'limite'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'N-01, C-09, P-90 (lote 24), P-44 (27b), P-37, P-38, P-42 c y P-43 a (28a), P-35, P-43 b y c (28b), O-101 (43), O-166 (47), O-167 (54)'),
  );


  return c;
};
