// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Cifras y pantallas medidas en contable19 el 2026-10-22.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 9
  a(
    h1('9. Estructuras salariales'),
    tabla(['Código', 'Estructura', 'Reglas', 'Uso'], [
      ['NME', 'Nómina Mensual Empleados', '34', 'Planilla mensual'],
      ['NSO', 'Nómina Semanal Obreros', '34', 'Planilla semanal'],
      ['NQA', 'Nómina Quincenal / Adelanto', '3', 'Adelanto quincenal (porcentaje del contrato)'],
      ['GRAT', 'Gratificaciones', '5', 'Julio y diciembre'],
      ['CTS', 'CTS', '3', 'Mayo y noviembre'],
      ['VAC', 'Vacaciones', '23', 'Goce de vacaciones'],
      ['LIQ', 'Liquidación', '21', 'Cese: truncas, indemnización y 5.ª del cese'],
      ['0001 / BASE', 'Reglas Básicas / Base for new structures', '35 / 3', 'Plantillas de Odoo Mates: no se usan para la planilla peruana'],
    ], [1300, 3200, 1000, 4138]),
    ...figura('c09_01_estructuras', 'Las 9 estructuras con el número de reglas de cada una.'),
    ...figura('c09_02_estructura_nme', 'Estructura NME: reglas con código y categoría; la pestaña «Ausencias no pagadas» define qué ausencias descuentan.'),
    p('La lista **Configuración › Reglas salariales** abre **agrupada por estructura** y filtrada en «Estructuras peruanas» (U-03). La misma regla aparece una vez por estructura que la usa, con su propia configuración: la asignación familiar `ASF_001` está en la mensual (NME) y en la semanal (NSO).'),
    ...figura('c09_03_reglas_agrupadas', 'Reglas salariales agrupadas por estructura, con la mensual abierta.'),
    h2('9.1 Régimen de la microempresa'),
    p('El régimen laboral del contrato decide los factores del parámetro `pe_regimen_factores` (gratificación, días de CTS y días de vacaciones). Para la **microempresa** (REMYPE) la compañía define además, en **Ajustes de la compañía › Nómina PE - Controles** (C-25):'),
    tabla(['Opción', 'Valores', 'Por defecto'], [
      ['Microempresa: régimen de salud', 'SIS semicontributivo (S/ 15 al mes por trabajador, sin EsSalud) · EsSalud 9 %', 'SIS'],
      ['Microempresa: asignación familiar', 'No pagar (no es obligatoria) · Pagar (voluntario)', 'No pagar'],
    ], [3200, 4838, 1600]),
    ...figura('c09_04_compania_controles', 'Nómina PE - Controles de la compañía: controles al validar, T-Registro, pago a bancos y microempresa.'),
    p('Si el trabajador tiene su propio **régimen de salud** (T32) en la ficha, ese manda: 21 = SIS microempresa. El detalle, con el caso MICRO, está en el capítulo 24.'),
    nota('Las estructuras pertenecen a la compañía 1 y las usan también las demás compañías. Se comprobó que un usuario de otra compañía calcula sus boletas sin error de acceso (Q-03, cerrado sin cambio).', 'implementador'),
    pieCapitulo(['ce'], 'U-03, C-25, Q-03'),
  );


  return c;
};
