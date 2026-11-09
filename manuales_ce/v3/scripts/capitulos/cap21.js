// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 21
  a(
    h1('21. Cambios de contrato dentro del mes'),
    p('En Odoo 19 cada cambio del contrato (sueldo, cargo, horario) es una **versión** del empleado con su **fecha efectiva**. La boleta del mes usa todas las versiones vigentes en el periodo: cada versión paga sus días (C-28, C-30) y los días y horas se cuentan una sola vez (C-33).'),
    h2('21.1 Aumento a mitad de mes'),
    pasos([
      'En la ficha del empleado, con la fecha del aumento, cree una versión nueva (botón de la fecha del contrato › **+**) o, desde el contrato, cambie el sueldo **con fecha efectiva** el día del aumento.',
      'Calcule la boleta del mes normalmente. La pestaña de días trabajados trae una línea por versión.',
    ]),
    ...figura('c21_03_versiones_del_contrato', 'Contratos del caso AUMENTO agrupados por trabajador: el aumento a mitad de mes tiene dos versiones (2 000 desde el 01/09 y 3 000 desde el 15/10).'),
    ...figura('c21_01_aumento_oct_dias', 'Octubre de 2026 del trabajador con aumento: «Días laborados» 10 días / 80 h con la versión del 1 de setiembre y 12 días / 96 h con la del 15 de octubre. Total 22 días / 176 h.'),
    p('Cada sueldo paga los días calendario en que rigió, con divisor 30, y el último tramo completa los 30 días del mes comercial: 2 000 / 30 × 14 + 3 000 / 30 × 16 = **2 533,33**.'),
    ...figura('c21_01_aumento_oct_calculo', 'Cálculo: remuneración básica 2 533,33, ONP 329,33, EsSalud 228,00 y neto 2 204,00.'),
    h2('21.2 Dos contratos en el mismo mes'),
    p('Si un contrato termina y empieza otro en el mismo mes (renovación con otro sueldo), la boleta también suma los dos: 11 días / 88 h con el primero y 11 días / 88 h con el segundo. Remuneración **2 500,00**; ONP 325,00; EsSalud 225,00; neto 2 175,00.'),
    ...figura('c21_02_dos_contratos_oct_dias', 'Octubre de 2026 con dos contratos: una línea de días por contrato.'),
    nota('Caso AUMENTO (66 celdas): los dos escenarios anteriores y una semana sin goce (capítulo 22). En el PLAME de octubre, el `.jor` declara **176 h** a cada uno (C-33); en el v1 se repetían días con dos versiones.', 'caso'),
    h2('21.3 Boletas sin versión'),
    p('Una boleta creada por importación o por código sin versión en la cabecera toma al calcular la versión vigente al final del periodo y calcula una sola vez (O-31). En el laboratorio, ninguna boleta queda sin versión: 0 de 137 medidas.'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-28, C-30, C-33, O-31'),
  );


  return c;
};
