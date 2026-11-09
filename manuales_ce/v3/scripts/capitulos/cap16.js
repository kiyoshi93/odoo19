// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19 el 2026-10-22: casos del laboratorio (SOLSE Demo) y recorrido de FM SYSTEMS.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 16
  a(
    h1('16. Liquidación por cese'),
    p('Para cesar a un trabajador, ponga en el contrato la **fecha de fin** y el **motivo de baja** (T17). La liquidación (estructura **LIQ**) calcula las vacaciones, la gratificación y la CTS truncas, la indemnización si corresponde y el ajuste de la renta de 5.ª.'),
    ...figura('c16_03_contrato_despido', 'Contrato de la trabajadora modal del caso INDEMNIZACION: motivo de baja [03] DESPIDO O DESTITUCIÓN, «Despido arbitrario (se indemniza)» marcado y «Fin pactado del contrato modal» 31 ago.'),
    h2('16.1 Truncas con aportes'),
    p('Las **vacaciones truncas** son remunerativas: pagan ONP o AFP y EsSalud (C-20). La gratificación trunca y su bonificación, la CTS trunca y la indemnización no pagan aportes.'),
    ...figura('c16_01_carmen_liquidacion_calculo', 'Liquidación de Carmen (caso NOMINA), cese el 31/08/2026: vacaciones truncas 1 666,67 con AFP y EsSalud, gratificación trunca 833,33, bonificación 75,00, CTS trunca 972,22 y neto 3 331,89.'),
    tabla(['Concepto', 'Cálculo', 'Importe'], [
      ['Vacaciones truncas', '8/12 de 2 500', '1 666,67'],
      ['Gratificación trunca', '2/6 (julio y agosto)', '833,33'],
      ['Bonificación sobre la trunca', '9 %', '75,00'],
      ['CTS trunca', '4/12, con el sexto de gratificación sin la bonificación', '972,22'],
      ['AFP (aporte, comisión, prima)', 'Sobre las vacaciones truncas', '166,67 · 25,83 · 22,83'],
      ['EsSalud', '9 % de las vacaciones truncas', '150,00'],
      ['**Neto**', '', '**3 331,89**'],
    ], [3200, 4200, 2238]),
    h2('16.2 Indemnización por despido arbitrario'),
    p('Marque **Despido arbitrario (se indemniza)** en el contrato (N-03). La liquidación paga la indemnización del art. 38 del D.S. 003-97-TR: en plazo indeterminado, 1,5 remuneraciones por año completo y la parte proporcional, con tope de 12 remuneraciones; en la micro y la pequeña empresa, 10 o 20 remuneraciones diarias por año, con tope de 90 o 120 (`IND_001`, PLAME 0501). Se cuenta desde el inicio del vínculo continuo y solo si se superó el periodo de prueba. En un contrato **modal**, si se resuelve antes del **Fin pactado**, se paga 1,5 remuneraciones por cada mes que falta, con el mismo tope (`IND_MOD_001`, PLAME 0503). La indemnización no paga aportes ni entra en la base de la renta de 5.ª, y se asienta en la 623.'),
    ...figura('c16_02_indemnizacion_calculo', 'Caso INDEMNIZACION, plazo indeterminado: indemnización 18 575,00 sumada a las truncas; la base de 5.ª solo son las truncas (2 571,67); neto 22 595,75.'),
    tabla(['Trabajador del caso', 'Situación', 'Indemnización'], [
      ['70000351', 'Plazo indeterminado', 'IND_001 **18 575,00**'],
      ['70000352', 'Contrato modal resuelto antes del fin pactado', 'IND_MOD_001 **18 000,00**'],
      ['70000353', 'Pequeña empresa', 'IND_001 **4 083,33**'],
      ['70000354', 'En periodo de prueba', 'Sin indemnización y con aviso'],
      ['70000357 / 70000358', 'Tope de 12 remuneraciones', 'IND_001 **18 750,00** / **37 356,00**'],
    ], [2400, 4400, 2838]),
    nota('Caso INDEMNIZACION (63 celdas): las 8 liquidaciones validadas, el PLAME con 0501 / 0503 y el asiento de 70000351 con 18 575,00 al debe de la 623.', 'caso'),
    p('La **renta de 5.ª del cese** (ajuste y devolución) está en el 13.3. Si la compañía tiene el control «Boletas del año antes que la liquidación del cese» en «Avisar», la liquidación avisa si quedan boletas del año en borrador (capítulo 26).'),
    pieCapitulo(['base', 'ce'], 'C-20, C-34, N-03, N-04'),
  );


  return c;
};
