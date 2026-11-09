// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19 el 2026-10-22: casos del laboratorio (SOLSE Demo) y recorrido de FM SYSTEMS.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 13
  a(
    h1('13. Renta de 5.ª categoría'),
    p('La regla `R5TA_001` proyecta la renta anual del trabajador y retiene la parte del mes:'),
    pasos([
      'Renta proyectada = remuneraciones del año ya validadas + sueldo del mes × meses que faltan + gratificaciones de julio y diciembre proyectadas, **con la asignación familiar** (C-03).',
      'Menos 7 UIT (37 450 en 2025; 38 500 en 2026).',
      'Impuesto anual con los tramos (8 %, 14 %, 17 %, 20 % y 30 %).',
      'Menos lo ya retenido en el año, dividido entre el divisor del mes (12 en enero a marzo, 9 en abril, 8 en mayo a julio, 5 en agosto, 4 en setiembre a noviembre; en diciembre, el saldo).',
    ]),
    ...figura('c13_01_lucia_ene2025_calculo', 'Lucía, enero de 2025: base afecta 4 613,00 y retención de 5.ª 192,48.'),
    h2('13.1 Retenciones medidas de Lucía'),
    tabla(['Año', 'Retención mensual', 'Total del año'], [
      ['2025', '192,48 (enero a julio), 192,47 (agosto a noviembre), 192,49 (diciembre)', '**2 309,73**'],
      ['2026', '179,42 (enero), 183,73 (febrero, mes de vacaciones), 179,79 (marzo), 179,39 a 179,40 (abril a setiembre), 180,21 (octubre y noviembre), 181,04 (diciembre)', '**2 160,78**'],
    ], [900, 6500, 2238]),
    p('Desde octubre de 2026 la asignación familiar es 123 (RMV 1 230) y la retención sube a 180,21. En febrero de 2026, el mes de vacaciones, la 5.ª se calcula en la mensual sumando la vacacional ya validada (C-11).'),
    h2('13.2 Certificado de 5.ª categoría'),
    p('**Nómina PE › Certificado de 5.ª categoría** imprime el certificado anual de rentas y retenciones (R.S. 010-2006/SUNAT, art. 2) de los trabajadores elegidos. Si no se elige ninguno, se imprimen todos los que tuvieron renta de 5.ª en el ejercicio. Opción **Por duplicado** (N-08).'),
    ...figura('c13_03_certificado_asistente', 'Asistente del certificado: compañía, ejercicio (por defecto, el año anterior), trabajadores y duplicado.'),
    ...figura('c13_04_certificado_renta5_lucia_2025', 'Certificado de Lucía, ejercicio 2025: renta bruta 65 412,34; deducción de 7 UIT 37 450,00; renta neta 27 962,34; impuesto y retención 2 309,73.'),
    nota('El certificado lo firma el representante del empleador: el empleado marcado **Firma como empleador** (capítulo 8). Si la compañía no tiene ninguno, el asistente no imprime y lo dice («… no tiene representante del empleador: marque «Empleador» en la ficha de quien firma el certificado»). FM SYSTEMS no tiene representante: la figura es la vista previa del informe, con el texto de reemplazo en lugar del nombre. Márquelo antes de imprimir.', 'importante'),
    h2('13.3 Regularización al cese y devolución'),
    p('La liquidación del cese ajusta la renta de 5.ª de todo el ejercicio con las boletas validadas (N-04). Si el trabajador retuvo de más, la liquidación le **devuelve** el exceso (`DEV5_001`, PLAME 0928). Si retuvo de menos, retiene la diferencia.'),
    ...figura('c13_02_cese_devolucion_calculo', 'Caso CESE, liquidación de abril de 2026: devolución de retención 2 158,67 y neto 13 132,00.'),
    tabla(['Trabajador del caso CESE', 'Qué pasa', 'Cifra'], [
      ['70004501 (devolución)', 'Retuvo 736,80 en enero, febrero y marzo; cesa el 30/04', 'Liquidación: R5TA 0,00 y **DEV5 2 158,67**; PLAME de abril 0928 2 158,67'],
      ['70004502 (retención)', 'Utilidades de 50 000 en marzo', 'Mensual de marzo: R5TA **1 586,14**; liquidación R5TA **190,80**'],
      ['70004503 (renovación)', 'Renueva el contrato sin interrupción', 'No hay cese ni ajuste'],
      ['70004504 (reingreso)', 'Cesa en febrero y reingresa en abril', 'Devolución 736,80 en febrero; abril R5TA 856,09'],
      ['70004505 (orden invertido)', 'Liquidación validada antes que la mensual de marzo', 'DEV5 5 257,17 y nota «rectifíquela» en la mensual'],
    ], [2600, 3800, 3238]),
    nota('Caso CESE (149 celdas): las cifras de la tabla, el ajuste final en 0,00 después de la devolución y el asiento de la liquidación con 2 158,67 al debe de la 40173.', 'caso'),
    pieCapitulo(['base', 'ce'], 'C-03, C-11, N-04, N-08'),
  );


  return c;
};
