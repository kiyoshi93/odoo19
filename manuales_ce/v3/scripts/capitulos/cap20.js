// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19 el 2026-10-22: casos del laboratorio (SOLSE Demo) y recorrido de FM SYSTEMS.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 20
  a(
    h1('20. Horas extra, nocturnidad, movilidad, adelantos y utilidades'),
    p('Estos conceptos se registran como **Otras entradas** de la boleta (pestaña Días trabajados y entradas). El ejemplo es un trabajador sintético de la compañía de laboratorio (sueldo 2 400, ONP, octubre de 2026), armado para este manual y borrado después.'),
    ...figura('c20_02_entradas_lista', 'Otras entradas: 6 horas extra al 25 %, 2 al 35 %, 10 horas nocturnas, movilidad 200 y 45 minutos de tardanza.'),
    tabla(['Entrada', 'Código', 'Regla', 'Cálculo', 'Importe'], [
      ['Horas extra 25 % (horas)', 'HE25_001', 'Sueldo / 30 / 8 × 1,25', '6 × 10,00 × 1,25', '75,00'],
      ['Horas extra 35 % (horas)', 'HE35_001', 'Sueldo / 30 / 8 × 1,35', '2 × 10,00 × 1,35', '27,00'],
      ['Horas nocturnas (horas)', 'BNOC_001', 'Valor hora (mínimo RMV / 240) × 35 %', '10 × 10,00 × 0,35', '35,00'],
      ['Movilidad de libre disposición', 'MOV_001', 'Importe; no afecta', '', '200,00'],
      ['Tardanzas (minutos)', 'TARD_001', 'Sueldo / 240 / 60 por minuto; reduce la base', '45 × 0,1667', '7,50'],
    ], [2400, 1300, 2700, 1900, 1338]),
    ...figura('c20_02_entradas_calculo', 'Cálculo: total ingresos 2 737,00; base afecta 2 529,50 (sin la movilidad y menos la tardanza); ONP 328,84; EsSalud 227,66; neto 2 400,66.'),
    p('La base afecta (2 529,50) es el total de ingresos menos la movilidad (no remunerativa) menos la tardanza (C-10). Sobre ella se calculan la ONP (13 % = 328,84) y EsSalud (9 % = 227,66).'),
    h2('20.1 Adelantos, descuento judicial y cuota sindical'),
    tabla(['Concepto', 'Cómo', 'Caso NOMINA'], [
      ['Adelanto quincenal', 'Estructura NQA con el «Porcentaje de adelanto» del contrato; la mensual lo descuenta (DESC_ADEL_001)', 'Luis: adelanto 40 % **1 800,00** y descuento de 1 800,00 en la mensual; neto 2 112,30'],
      ['Descuento judicial', '«¿Tiene beneficiario?» en la ficha', 'Miguel: **522,00** (20 % del disponible)'],
      ['Cuota sindical', '«Sindicalizado» en el contrato; parámetro `pe_cuota_sindical`', 'Rosa (semanal): **4,20**'],
    ], [2200, 4000, 3438]),
    h2('20.2 Reparto de utilidades'),
    p('**Nómina PE › Reparto de utilidades** reparte la participación del D.Leg. 892: 50 % por días laborados y 50 % por remuneraciones del ejercicio, con tope individual de 18 sueldos. Días y remuneraciones salen de las boletas validadas del año. Se indica la renta neta y el porcentaje según la actividad (CIIU); el resultado es un Excel y el importe se paga con la entrada `UTIL_001`.'),
    ...figura('c20_01_reparto_utilidades', 'Asistente del reparto de utilidades: ejercicio, renta neta y porcentaje.'),
    tabla(['Trabajador (caso UTILIDADES)', 'Remuneraciones', 'Por días', 'Por remuneraciones', 'A pagar'], [
      ['70000801', '12 000,00', '833,33', '500,00', '1 333,33'],
      ['70000802', '18 000,00', '833,33', '750,00', '1 583,33'],
      ['70000803', '30 000,00', '833,33', '1 250,00', '2 083,33'],
    ], [2600, 1800, 1500, 1900, 1838]),
    p('Monto a repartir 5 000,00 entre 3 trabajadores con los mismos días, sin remanente por topes. El **tope** de 18 sueldos usa el sueldo **vigente al cierre del ejercicio**, no el de hoy (C-22). En el escenario de tope del caso, el remanente es 320 000,00.'),
    nota('Qué cuenta como días laborados y como remuneración para el reparto, y si los días de vacaciones y de subsidio se incluyen, está pendiente de confirmación por la contadora (P-25, P-26 y P-29). Hoy se usan las líneas pagadas de los días trabajados. Ver el Anexo A.', 'importante'),
    pieCapitulo(['ce', 'ce_demo'], 'C-10, C-22'),
  );


  return c;
};
