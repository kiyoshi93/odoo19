// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19 el 2026-10-22: casos del laboratorio (SOLSE Demo) y recorrido de FM SYSTEMS.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 15
  a(
    h1('15. CTS'),
    p('La estructura **CTS** calcula el depósito de mayo (noviembre–abril) y noviembre (mayo–octubre): remuneración computable (sueldo + asignación familiar + 1/6 de la gratificación validada del semestre) × meses del periodo / 12. La pequeña empresa deposita 15 días por año (factor del parámetro `pe_regimen_factores`) y la microempresa no deposita.'),
    ...figura('c15_01_lucia_cts_nov2026_calculo', 'Lucía, CTS de noviembre de 2026: 2 695,92.'),
    tabla(['Trabajador', 'Mayo 2025', 'Noviembre 2025', 'Mayo 2026', 'Noviembre 2026'], [
      ['Lucía', '1 537,67', '2 690,92', '2 690,92', '2 695,92'],
      ['Héctor', '366,67', '1 222,22', '1 283,33', '1 283,33'],
    ], [2200, 1850, 1850, 1850, 1888]),
    h2('15.1 Liquidación del depósito de CTS'),
    p('Desde la boleta de CTS, **Imprimir › Liquidación de depósito de CTS (PE)** entrega al trabajador el detalle del depósito: remuneración computable, periodo, tiempo computable, entidad, cuenta y monto (N-08). También se envía por correo con la boleta (capítulo 28).'),
    ...figura('c15_02_liquidacion_deposito_cts', 'Liquidación del depósito de noviembre de 2026 de Lucía: remuneración computable 5 391,83 (4 500 + 123 + 1/6 de gratificación 768,83), periodo 01/05/2026–31/10/2026 (6 meses), Banco de Crédito, monto depositado 2 695,92.'),
    p('Los TXT de CTS para el banco están en el capítulo 27. La CTS de un trabajador cuya cuenta CTS es de **otro banco** ya no se abona por CCI en el archivo de Interbank: por defecto va a «Omitidos» y se deposita con el archivo del banco de su cuenta (C-23, opción de la compañía).'),
    pieCapitulo(['ce'], 'C-01, C-23, N-08'),
  );


  return c;
};
