// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 23
  a(
    h1('23. Subsidios: descanso médico y maternidad'),
    p('La versión 2 calcula los subsidios de EsSalud (N-01). El descanso se registra como **ausencia** del tipo que corresponde y la boleta lo reparte por la **Tabla 21**:'),
    tabla(['Código T21', 'Qué es', 'Tipo de ausencia', 'Quién paga'], [
      ['20', 'Incapacidad temporal: los primeros 20 días del año', 'Tiempo personal por enfermedad', 'El empleador (remuneración)'],
      ['21', 'Incapacidad temporal desde el día 21 (subsidio)', 'El mismo; la boleta separa los días', 'Subsidio de EsSalud: `SUB_INC_001`, PLAME 0916'],
      ['22', 'Maternidad: pre y post natal', 'Descanso por maternidad (pre y post natal)', 'Subsidio de EsSalud: `SUB_MAT_001`, PLAME 0915'],
    ], [1300, 3400, 2700, 2238]),
    p('El subsidio diario es el **promedio de las remuneraciones de los 12 meses anteriores** / 30. Los 20 días por año se cuentan por año calendario con las ausencias anteriores. El subsidio no paga ONP ni EsSalud; con AFP paga aporte y prima (categoría «Ingreso afecto AFP»).'),
    ...figura('c23_04_descanso_medico', 'Descanso médico de noviembre de 2026 (caso SUBSIDIOS): 21 días hábiles, del 1 al 30 de noviembre.'),
    h2('23.1 Descanso médico de 30 días'),
    ...figura('c23_01_descanso_nov_calculo', 'Caso SUBSIDIOS, noviembre: remuneración 2 000,00 por los 20 primeros días y subsidio por incapacidad 1 000,00 por los 10 siguientes (promedio diario 100,00); ONP 260,00 y EsSalud 180,00 sobre la remuneración; neto 2 740,00.'),
    tabla(['Trabajador (caso SUBSIDIOS)', 'Noviembre de 2026', 'Días T21', 'PLAME .rem'], [
      ['70000801 · descanso de 30 días', 'RB 2 000,00 · subsidio 1 000,00', '20|20 y 21|10', '0121 2 000,00 · 0916 1 000,00'],
      ['70000802 · 15 días en octubre y 30 en noviembre', 'RB 500,00 · subsidio 2 500,00', '20|5 y 21|25', '0121 500,00 · 0916 2 500,00'],
      ['70000803 · maternidad desde el 01/11', 'RB 0,00 · subsidio 3 000,00 (diciembre 3 100,00)', '22|30 (diciembre 22|31)', '0915 3 000,00'],
      ['70000804 · con AFP', 'RB 2 000,00 · subsidio 1 000,00; AFP 300,00 y prima 41,10', '20|20 y 21|10', 'AFPnet: asegurable 3 000,00'],
      ['70000805 · sin derecho', 'RB 2 000,00, sin subsidio y con aviso', '20|20 y 21|10', 'Solo 0121'],
    ], [2700, 3000, 1800, 2138]),
    ...figura('c23_02_maternidad_nov_calculo', 'Maternidad de noviembre: remuneración 0,00 y subsidio por maternidad 3 000,00, sin ONP ni EsSalud; neto 3 000,00.'),
    h2('23.2 Derecho al subsidio'),
    p('El subsidio exige **3 meses de aportes consecutivos o 4 no consecutivos** en los 6 meses calendario anteriores a la contingencia (en accidente basta la afiliación). La boleta lo comprueba con las boletas validadas. Lo que hace si falta lo decide la compañía con el control «Subsidio sin los aportes que dan derecho» (Avisar o Bloquear, capítulo 26).'),
    ...figura('c23_03_sin_derecho_nov_dias', 'Trabajador con un solo mes de aportes antes del descanso (caso SUBSIDIOS, 70000805): los días van como descanso, pero no se calcula subsidio.'),
    nota('En las boletas del caso, la línea de días del descanso médico se llama «Sick Time Off» con el código GLOBAL: es el nombre de la entrada de trabajo de Odoo, sin traducir (observación O-65). El cálculo y el `.snl` no se ven afectados.', 'nota'),
    nota('Caso SUBSIDIOS (344 celdas, 29 boletas): días por tipo de la Tabla 21, conceptos, `.snl` y `.rem` de noviembre de 2026 y de enero y febrero de 2027, promedio diario 100,00 y avisos de derecho.', 'caso'),
    nota('La vacacional no paga subsidios. La base de la prima de Vida Ley de un mes subsidiado está pendiente de confirmación (P-52).', 'limite'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'N-01, C-09'),
  );


  return c;
};
