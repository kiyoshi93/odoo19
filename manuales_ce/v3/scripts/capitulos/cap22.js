// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 22
  a(
    h1('22. Licencias sin goce, permisos por horas y meses sin remuneración'),
    p('El tipo de ausencia **Sin pagar** (código SINGOCE100, Tabla 21: 05) está marcado como «no pagado» en las estructuras mensual y semanal (C-31): sus días se descuentan de la remuneración y se declaran como suspensión. Ejemplos del ' + escenario.toLowerCase() + ', sueldo 2 500 y noviembre de 2026.'),
    ...figura('c22_04_ausencias_sin_goce', 'Las tres ausencias «Sin pagar» aprobadas: el 17/11 de 8:00 a 10:00 (2 horas), del 9 al 13/11 (40 horas) y todo noviembre (168 horas).'),
    h2('22.1 Una semana sin goce'),
    ...figura('c22_01_semana_sin_goce_dias', 'Días trabajados: «Sin pagar» −5 días / −40 h, sin marcar en «¿Pagado?».'),
    p('Remuneración = 2 500 / 30 × 25 = **2 083,33**. EsSalud **187,50** (9 % de la remuneración: con remuneración en el mes, el piso de la RMV no cambia nada). En el PLAME, el `.snl` declara `05|5`.'),
    h2('22.2 Permiso de dos horas'),
    p('Un permiso por horas descuenta la **fracción** del día: 2 horas = 0,25 día. Antes de C-31 descontaba un día entero.'),
    ...figura('c22_02_permiso_2_horas_calculo', 'Permiso de 2 horas: remuneración 2 479,17 (2 500 − 2 500 / 30 / 8 × 2), ONP 322,29, EsSalud 223,13 y neto 2 156,88.'),
    nota('Un permiso por horas no es un día entero de suspensión: no va al `.snl`.', 'nota'),
    h2('22.3 Un mes entero sin remuneración'),
    p('Si el trabajador no tiene remuneración en todo el mes, no corresponde aportar a EsSalud (C-32; SUNAT, Informe 003-2007-SUNAT/2B0000). La boleta queda **sin importes** y no se valida (C-18). El PLAME declara al trabajador en el `.jor` con 0 horas y en el `.snl` con `05|30`.'),
    ...figura('c22_03_mes_sin_goce_dias', 'Noviembre entero sin goce: «Sin pagar» −21 días / −168 h; la boleta no tiene importes.'),
    nota('Con días laborados en el mes, la base mínima de EsSalud sigue siendo la RMV (Informe 003-2007-SUNAT/2B0000, conclusión 1): un ingreso a fin de mes paga EsSalud sobre la RMV aunque su remuneración sea menor. Solo un mes **sin ninguna** remuneración no aporta.', 'importante'),
    nota('Caso AUMENTO: semana sin goce de 70000903 con `.snl` `05|5` y `.jor` 126 h; la trabajadora con todo noviembre sin goce no tiene mensual (sin importes) y su `.snl` declara `05|30`.', 'caso'),
    pieCapitulo(['base', 'ce'], 'C-09, C-31, C-32'),
  );


  return c;
};
