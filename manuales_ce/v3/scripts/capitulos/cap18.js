// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19 el 2026-10-22: casos del laboratorio (SOLSE Demo) y recorrido de FM SYSTEMS.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 18
  a(
    h1('18. Feriados'),
    p('Los feriados nacionales se registran cada año en **Vacaciones › Configuración › Días festivos**, sin recurso (valen para toda la compañía). En FM SYSTEMS están los 16 feriados de 2025 y los 16 de 2026.'),
    ...figura('c18_01_dias_festivos', 'Días festivos de 2026 de FM SYSTEMS (filtro «Periodo: 2026»).'),
    h2('18.1 Efecto en la boleta y en el PLAME'),
    vinetas([
      'Los feriados **no descuentan**: el feriado es descanso remunerado (D.Leg. 713) y el sueldo mensual no cambia.',
      'Los **días laborados** declarados incluyen los feriados (C-09): diciembre de 2026 completo = 31 días, 0 no laborados. En el v1 la boleta declaraba 20 días.',
      'Las **horas** del `.jor` son las de la jornada cumplida: los feriados no suman horas (C-24, capítulo 27).',
      'En la conciliación de asistencias, el feriado sin marcas **no es falta** (C-35, capítulo 19).',
    ]),
    h2('18.2 Aviso de feriados del año sin cargar'),
    p('Si no hay ningún feriado registrado en el año de la boleta, la banda de avisos lo dice (V-05): sin ellos, las boletas de ese año no tienen la línea de feriados en los días trabajados y las horas y la asistencia salen mal.'),
    ...figura('c18_02_banda_sin_feriados', 'Compañía de laboratorio sin feriados de 2026: «Faltan los días festivos de 2026…» arriba de la lista de boletas.'),
    nota('Cargue los feriados del año siguiente en diciembre. Los feriados de otro calendario o de otra compañía no cuentan para el trabajador.', 'implementador'),
    pieCapitulo(['base', 'ce'], 'C-09, C-24, V-05'),
  );


  return c;
};
