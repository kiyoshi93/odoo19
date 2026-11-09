// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después). Caso AUMENTO
// re-medido en el lote 71 (100 %). Lo nuevo de los lotes 25a, 25b y 54, con sus criterios y su re-medición.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 22
  a(
    h1('22. Licencias sin goce, permisos por horas y meses sin remuneración'),
    p('El tipo de ausencia **Sin pagar** (código SINGOCE100, Tabla 21: 05) está marcado como «no pagado» en las estructuras mensual y semanal (C-31): sus días se descuentan de la remuneración y se declaran como suspensión. Las licencias **con** goce (paternidad, fallecimiento, sindical…) se pagan; con la opción del capítulo 18 van aparte, en el 0907. Ejemplos del ' + escenario.toLowerCase() + ', sueldo 2 500 y noviembre de 2026.'),
    ...figura('c22_04_ausencias_sin_goce', 'Las tres ausencias «Sin pagar» aprobadas: el 17/11 de 8:00 a 10:00 (2 horas), del 9 al 13/11 (40 horas) y todo noviembre (168 horas).'),
    h2('22.1 Una semana sin goce'),
    ...figura('c22_01_semana_sin_goce_dias', 'Días trabajados: «Sin pagar» −5 días / −40 h, sin marcar en «¿Pagado?».'),
    p('Remuneración = 2 500 / 30 × 25 = **2 083,33**. EsSalud **187,50** (9 % de la remuneración: con remuneración en el mes, el piso de la RMV no cambia nada). En el PLAME, el `.snl` declara `05|5`.'),
    h2('22.2 Permiso de dos horas'),
    p('Un permiso por horas descuenta la **fracción** del día: 2 horas = 0,25 día. Antes de C-31 descontaba un día entero. El valor hora del permiso es sueldo ÷ 30 ÷ las horas diarias del horario del trabajador (con 8 horas, ÷ 8).'),
    ...figura('c22_02_permiso_2_horas_calculo', 'Permiso de 2 horas: remuneración 2 479,17 (2 500 − 2 500 / 30 / 8 × 2), ONP 322,29, EsSalud 223,13 y neto 2 156,88.'),
    nota('Un permiso por horas no es un día entero de suspensión: no va al `.snl`.', 'nota'),
    h2('22.3 Un mes entero sin remuneración'),
    p('Si el trabajador no tiene remuneración en todo el mes, no corresponde aportar a EsSalud (C-32; SUNAT, Informe 003-2007-SUNAT/2B0000). La boleta queda **sin importes** y no se valida (C-18). El PLAME declara al trabajador en el `.jor` con 0 horas y en el `.snl` con `05|30`.'),
    ...figura('c22_03_mes_sin_goce_dias', 'Noviembre entero sin goce: «Sin pagar» −21 días / −168 h; la boleta no tiene importes.'),
    nota('Con días laborados en el mes, la base mínima de EsSalud sigue siendo la RMV (Informe 003-2007-SUNAT/2B0000, conclusión 1): un ingreso a fin de mes paga EsSalud sobre la RMV aunque su remuneración sea menor. Solo un mes **sin ninguna** remuneración no aporta.', 'importante'),
    nota('Caso AUMENTO, re-medido en el lote 71: semana sin goce de 70000903 con `.snl` `05|5` y `.jor` 126 h; la trabajadora con todo noviembre sin goce no tiene mensual (sin importes) y su `.snl` declara `05|30` y su `.jor` `0`.', 'caso'),

    h2('22.4 Todo el periodo en suspensión perfecta: básica y asignación (lote 25a)'),
    p('En la suspensión perfecta cesa la obligación de pagar la remuneración (TUO D.Leg. 728, art. 11). Antes, todo febrero sin goce pagaba 2 días de básica (30 − 28). Desde el lote 25a (O-73), si **todos los días del vínculo en el periodo** son de suspensión perfecta, la básica es 0:'),
    vinetas([
      '**Cuentan:** las ausencias de un tipo de la Tabla 21 del 01 al 12 (licencia sin goce, falta registrada como ausencia del tipo 07, sanción y demás suspensiones perfectas), más los días subsidiados.',
      '**No cuentan:** las vacaciones, las licencias con goce ni un tipo de ausencia sin código de la Tabla 21. Febrero entero de vacaciones sigue con 2 días de básica más 28 de vacacional.',
    ]),
    p('**La asignación familiar** tampoco se paga en ese mes: es remuneración (Ley 25129) y en la suspensión perfecta no se debe. La opción **«Asignación familiar en un mes entero sin goce»** (ficha de la compañía, pestaña «Nómina PE - Controles», grupo **Suspensiones**) viene en «No pagarla en un mes entero en suspensión perfecta (TUO D.Leg. 728, art. 11)»; «Pagarla» es lo de antes. Con un solo día laborado o pagado, se paga completa. Las semanales y los meses con subsidio no cambian. Es «criterio según la norma, pendiente de confirmación (P-39)». Con sueldo 3 000 y un hijo (criterios del lote 25a):'),
    tabla(['Situación', 'Antes', 'Ahora'], [
      ['Todo febrero sin goce', 'Básica 200,00 y asignación 113,00', '**0,00 y 0,00**; EsSalud 0'],
      ['La misma, con la opción «Pagarla»', '—', 'Básica 0,00 y asignación 113,00'],
      ['Cese el 20/02 con el 01/02 laborado y una licencia sin goce registrada hasta el 28/02', '0,00 y 113,00', '**100,00** y 113,00 (los días se cuentan dentro del vínculo)'],
      ['27 días sin goce y un día laborado en febrero', '300,00 y 113,00', '300,00 y 113,00 (sin cambio)'],
    ], [4600, 2300, 2738]),

    h2('22.5 Meses de 28 o 31 días con suspensiones: el piso y la opción (lote 25b)'),
    p('El valor día es el sueldo ÷ 30 y la básica de un mes con suspensiones es 30 menos los días suspendidos. En un mes de 31 días esa cuenta podía dejar sin pago un día trabajado: con el 01/07 laborado y del 02 al 31/07 sin goce, 30 − 30 = 0. Desde el lote 25b, en una mensual del mes entero, **la básica no paga menos que los días laborables del horario con goce × sueldo ÷ 30** (el piso; nadie trabaja sin retribución, Constitución, art. 23):'),
    vinetas([
      '**Cuentan para el piso:** los días trabajados, los feriados, las licencias con goce y el descanso médico a cargo del empleador (los primeros 20 días).',
      '**No cuentan:** las ausencias que la estructura no paga (sin goce, faltas), los días subsidiados ni las faltas de la conciliación de asistencias (capítulo 19).',
      'El piso solo corre en un mes con días sin remuneración y **sin vacaciones**. Una falta o un día sin goce el día 31 se sigue descontando (Informe 513-2023-MTPE).',
    ]),
    p('Para la parte no suspendida de un mes de 28 o 31 días no hay norma. La opción **«Básica de un mes con suspensiones»** (grupo **Suspensiones**) viene en «Mes comercial: 30 − los días suspendidos»; con **«Días calendario con goce (con tope de 30)»** la básica paga los días del mes sin suspensión, igual que los días del PLAME. Con las dos, cada falta descuenta 1/30, las vacaciones las paga su boleta y el piso se aplica. Sueldo 3 000, horario de lunes a viernes (criterios del lote 25b):'),
    tabla(['Situación', 'Antes', 'Ahora'], [
      ['Julio: el 01 laborado y del 02 al 31 sin goce', '0,00', '**100,00** (el piso)'],
      ['Julio: el 01 laborado, el 02 de licencia con goce y del 03 al 31 sin goce (con 0907 aparte)', 'Básica 0,00 y licencia 100,00', '**100,00 y 100,00**'],
      ['Julio: vacaciones del 01 al 30 (el 31 laborado)', '0,00 de básica', '0,00 (sin días sin remuneración no hay piso)'],
      ['Julio: un día sin goce el 31', '2 900,00', '2 900,00 (sin cambio)'],
      ['Julio con 17 días sin goce', '1 300,00', '1 300,00; con la opción, **1 400,00**'],
      ['Febrero con 14 días sin goce', '1 600,00', '1 600,00; con la opción, **1 400,00**'],
      ['Con la opción: un día sin goce el 31/07', '—', '**3 000,00** (30 días con goce)'],
      ['Con la opción: una falta (07) el 31/07', '—', '2 900,00 (la falta se descuenta)'],
    ], [4800, 2200, 2638]),
    p('El piso y la opción son para **la mensual del mes calendario entero con un solo sueldo**. No se aplican con ingreso o cese en el mes, con dos sueldos ni con dos contratos (capítulo 21), ni a las semanales. Ninguna boleta validada cambia; `impacto_lote25b.py` cuenta las mensuales en que el piso cambia la básica y en cuántas cambiaría con la opción.'),
    ...figura('c22_05_opciones_suspensiones', 'Ficha de la compañía, pestaña «Nómina PE - Controles», grupo «Suspensiones»: «Asignación familiar en un mes entero sin goce» y «Básica de un mes con suspensiones» con sus valores por defecto.'),
    nota('«Criterio según la norma, pendiente de confirmación (P-41)»: ¿13 o 14 días en un mes de 31 con 17 suspendidos?, ¿acepta el piso?, ¿una sanción de un día descuenta con la opción, como la falta? Un mes con vacaciones y suspensiones no tiene piso (el 01 laborado, vacaciones del 02 al 10 y el resto sin goce paga 0); un permiso no pagado sin código de la Tabla 21 no activa el piso; una versión sin horario o con horario flexible no tiene piso (capítulo 33).', 'limite'),

    h2('22.6 La licencia aprobada después de validar: el `.snl` guardado (lote 54)'),
    p('Al validar una mensual o una semanal, la boleta **guarda las suspensiones de cada día** (Tabla 21). El `.snl` del PLAME y los días impresos se toman de lo guardado, no de las ausencias de hoy (O-167): una licencia aprobada, cambiada o rechazada después ya no cambia el `.snl` ni la boleta de un mes ya pagado. La actualización lo guardó en las 195 mensuales y semanales validadas del laboratorio, sin ninguna diferencia (re-medición de los lotes 43 a 56).'),
    vinetas([
      'Si al validar los días de ausencia de la boleta ya no coinciden con las ausencias aprobadas de hoy (una licencia se aprobó, cambió o rechazó después de crear la boleta), la boleta se valida igual y el historial dice: «Los días trabajados de la boleta no coinciden con las ausencias aprobadas de hoy (<código>: N en la boleta, M hoy)… vuelva a calcular los días trabajados y la hoja, o rectifique la boleta.»',
      'Para corregir un mes ya validado, rectifique la boleta (capítulo 25): la nota de crédito usa las suspensiones de la boleta que rectifica, y la boleta nueva guarda las suyas.',
    ]),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-09, C-31, C-32, O-73 y P-39 (25a), P-41 (25b), O-167 (54)'),
  );


  return c;
};
