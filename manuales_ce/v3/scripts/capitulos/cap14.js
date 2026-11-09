// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19 el 2026-10-22: casos del laboratorio (SOLSE Demo) y recorrido de FM SYSTEMS.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 14
  a(
    h1('14. Gratificaciones'),
    p('La estructura **GRAT** paga la gratificación de julio y diciembre: un sexto por mes completo del semestre, sobre la remuneración computable (sueldo + asignación familiar), más la **bonificación extraordinaria** (Ley 30334): 9 % (EsSalud) o 6,75 % (EPS). La pequeña empresa paga la mitad (factor 0,5) y la microempresa no paga gratificación.'),
    ...figura('c14_01_lucia_grati_jul2026_calculo', 'Lucía, gratificación de julio de 2026: 4 613,00 + bonificación 415,17 = 5 028,17.'),
    tabla(['Trabajador', 'Periodo', 'Gratificación', 'Bonificación', 'Neto', 'Fuente'], [
      ['Lucía (4 500 + AF)', 'Julio 2026', '4 613,00', '415,17 (9 %)', '5 028,17', 'FM'],
      ['Lucía', 'Diciembre 2026', '4 623,00 (AF 123)', '416,07', '5 039,07', 'FM'],
      ['Héctor (2 200), ingresó el 01/03/2025', 'Julio 2025', '1 466,67 (4/6)', '132,00', '1 598,67', 'FM'],
      ['María (8 000)', 'Julio 2026', '8 000,00', '720,00', '', 'NOMINA'],
      ['Carlos (EPS)', 'Julio 2026', '', '243,88 (6,75 %)', '', 'NOMINA'],
      ['José (pequeña empresa)', 'Julio 2026', '750,00 (factor 0,5)', '', '', 'NOMINA'],
    ], [2700, 1300, 1700, 1500, 1100, 1338]),
    h2('14.1 Una sola vez por semestre y contrato'),
    p('El semestre se paga **una sola vez** por contrato (C-34, Ley 27735): con la gratificación ordinaria validada, la liquidación no paga la trunca de ese semestre (trunca y bonificación 0,00, con aviso); y con la trunca validada, la ordinaria sale en 0,00. El orden no importa: vale en los dos sentidos. La entrada `GRATI_TRUNCA_001` fija el importe, también en 0.'),
    nota('Caso NOMINA: Carmen cobra la ordinaria de julio (2 500,00 + 225,00) y cesa el 31/08. La liquidación de agosto paga la gratificación trunca de 2/6 (julio y agosto): 833,33 + bonificación 75,00. Ninguna de las 14 liquidaciones del laboratorio repite el semestre ya pagado.', 'caso'),
    pieCapitulo(['ce'], 'C-34'),
  );


  return c;
};
