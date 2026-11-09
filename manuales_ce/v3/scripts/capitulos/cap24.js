// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 24
  a(
    h1('24. Microempresa'),
    p('Un trabajador con régimen laboral **MICROEMPRESA** (T33) en su contrato no recibe gratificación ni CTS y tiene 15 días de vacaciones (`pe_regimen_factores` = 0,0 / 0 / 15). La compañía decide el régimen de salud y la asignación familiar (C-25), en **Nómina PE - Controles** (capítulo 9):'),
    tabla(['Opción de la compañía', 'Por defecto', 'Efecto medido (caso MICRO, junio de 2026, sueldo 1 500)'], [
      ['Microempresa: régimen de salud', '**SIS** (S/ 15 por trabajador)', 'Sin EsSalud y `SIS_MICRO_001` **15,00**. Con «EsSalud 9 %»: EsSalud **135,00**'],
      ['Microempresa: asignación familiar', '**No pagar**', 'Con un hijo: ASF **0,00**. Con «Pagar»: **113,00**'],
    ], [3000, 2100, 4538]),
    ...figura('c24_01_micro_jun_calculo', 'Trabajador de microempresa, junio de 2026: remuneración 1 500, ONP 195,00, SIS 15,00, SENATI 11,25, sin EsSalud; neto 1 305,00.'),
    p('El SIS se paga en el Banco de la Nación: no va al `.rem` del PLAME. En la planilla de sueldos sale en «Otros aportes». Si el trabajador tiene su propio **régimen de salud** (T32) en la ficha, ese manda: 21 = SIS microempresa.'),
    ...figura('c24_02_micro_liquidacion_calculo', 'Liquidación del trabajador de microempresa: vacaciones truncas 687,50 (15 días por año), sin gratificación ni CTS truncas; ONP 89,38; neto 598,12.'),
    nota('La CTS y la gratificación del trabajador de microempresa salen en 0,00 y no se validan: la localización avisa y ofrece eliminarlas (capítulo 10, C-18).', 'nota'),
    nota('Caso MICRO (83 celdas): régimen, factores, SIS 15,00, asignación familiar 0,00 por defecto y 113,00 con «Pagar», EsSalud 135,00 con «EsSalud 9 %», liquidación y el aviso de la CTS sin importes.', 'caso'),
    pieCapitulo(['ce', 'ce_demo'], 'C-25, C-18'),
  );


  return c;
};
