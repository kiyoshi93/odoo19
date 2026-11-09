// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después). Caso AUMENTO
// re-medido en el lote 71 (100 %, las mismas cifras). Lo nuevo de los lotes 24, 25a y 25b, con sus criterios.
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
    nota('Las **horas** del mes (horas extras, trabajo en feriado, tardanzas) se valoran con el horario de la versión de la boleta, la vigente al fin del periodo (lote 24): las entradas son el total del mes. Si el aumento cambia también el horario, revise el valor hora (capítulo 10). La sobretasa nocturna y el aviso de la RMV también miran la versión del fin del periodo: un aumento a mitad de mes no se ve en el aviso.', 'nota'),
    h2('21.2 Dos contratos en el mismo mes'),
    p('Si un contrato termina y empieza otro en el mismo mes (renovación con otro sueldo), la boleta también suma los dos: 11 días / 88 h con el primero y 11 días / 88 h con el segundo. Remuneración **2 500,00**; ONP 325,00; EsSalud 225,00; neto 2 175,00.'),
    ...figura('c21_02_dos_contratos_oct_dias', 'Octubre de 2026 con dos contratos: una línea de días por contrato.'),
    nota('Caso AUMENTO (66 celdas), re-medido en el lote 71 al 100 %: los dos escenarios anteriores y una semana sin goce (capítulo 22). En el PLAME de octubre, el `.jor` declara **176 h** a cada uno (C-33); en el v1 se repetían días con dos versiones.', 'caso'),
    h2('21.3 Una mensual de una parte del mes: ingreso, cese o renovación (lote 25a)'),
    p('El mes comercial de 30 días es para la boleta que cubre el mes calendario entero. Desde el lote 25a (O-75), **una mensual cuyo periodo es una parte del mes** (del 20 al 31/03 por un ingreso, o del 01 al 10/03 por un cese) paga los **días calendario del periodo dentro del vínculo**, sin ajustar a 30; con un aumento dentro de ese periodo, cada sueldo paga sus días. Antes pagaba el sueldo del mes entero. Un periodo que cruza de mes (del 26 al 25) sigue como antes. Con sueldo 3 000 (criterios del lote 25a):'),
    tabla(['Situación', 'Antes', 'Ahora'], [
      ['Cese el 10/03, mensual del 01 al 10/03', '3 000,00', '**1 000,00**'],
      ['Ingreso el 20/03, mensual del 20 al 31/03', '3 000,00', '**1 200,00**'],
      ['La misma, con un aumento a 3 600 el 26/03', '3 480,00', '**1 320,00** (6 × 100 + 6 × 120)'],
      ['Ingreso el 20/03, mensual del mes entero', '1 200,00', '1 200,00 (sin cambio)'],
    ], [5000, 2000, 2638]),
    vinetas([
      '**Dos mensuales del mismo mes, una por contrato** (una renovación el 16/07 con una boleta del 01 al 15 y otra del 16 al 31) pagan cada una sus días: 1 500,00 y 1 600,00, que suman 3 100,00. Una sola mensual del mes con los dos tramos paga 3 000,00 (21.2). Para cerrar el mes en 30 días, use una sola mensual.',
      'Lo mismo con **dos mensuales por quincena**: se tratan como boletas de una parte del mes y suman los días calendario (3 100 en marzo, 2 800 en febrero; antes, 6 000). La estructura mensual es para el mes; para la quincena está el adelanto (capítulo 11).',
      'Un ingreso o un cese en febrero con la mensual del mes entero paga los días calendario del vínculo (ingreso el 21/02: 8 días), como antes.',
      'El **piso** y la opción «Básica de un mes con suspensiones» del capítulo 22 **no** se aplican con ingreso o cese en el mes, con dos sueldos ni con dos contratos: estas boletas pagan sus días por tramos. Las versiones de un mismo contrato con el mismo sueldo (un cambio de puesto o de área) cuentan como una.',
    ]),
    nota('La boleta lo marca en el campo «Periodo más corto que el mes». Ninguna boleta validada cambia: las mensuales de una parte del mes validadas antes del lote pagaron el mes entero; `impacto_lote25a.py` las cuenta para revisarlas. Que dos boletas del mismo mes no ajusten al mes comercial es «criterio según la norma, pendiente de confirmación (P-41)».', 'importante'),
    h2('21.4 Boletas sin versión'),
    p('Una boleta creada por importación o por código sin versión en la cabecera toma al calcular la versión vigente al final del periodo y calcula una sola vez (O-31). En el caso AUMENTO, ninguna boleta queda sin versión (diagnóstico del lote 71: 0).'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-28, C-30, C-33, O-31, C-47 (24), O-75 (25a), P-41 (25b)'),
  );


  return c;
};
