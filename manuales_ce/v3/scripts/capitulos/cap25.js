// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 25
  a(
    h1('25. Rectificar una boleta'),
    p('Si una boleta validada tiene un error, no se edita: se **rectifica**. El botón **Rectificar** crea una boleta rectificativa (nota de crédito) con las líneas de la original y la valida; después se calcula y se valida la boleta correcta. Desde la versión 2 la rectificativa **resta** en todos los reportes (C-27): PLAME, AFPnet, pago a bancos, planilla y utilidades.'),
    p('Ejemplo del ' + escenario.toLowerCase() + ': la mensual de noviembre de 2026 se validó con sueldo 2 500 y el correcto era 2 700.'),
    pasos([
      'Abra la boleta validada y pulse **Rectificar**.',
      'Se crea «Rectificación: Boleta de …», marcada **Boleta rectificativa** y con el enlace a la **Boleta rectificada**. Queda validada con su asiento.',
      'Corrija el dato (aquí, el sueldo del contrato) y cree, calcule y valide la boleta nueva del mismo periodo.',
    ]),
    ...figura('c25_01_original_rectificar', 'Boleta original de noviembre (2 500): botón «Rectificar».'),
    ...figura('c25_02_rectificativa_calculo', 'Rectificativa: las mismas líneas de la original (remuneración 2 500,00, ONP 325,00, neto 2 175,00), marcada como boleta rectificativa.'),
    ...figura('c25_04_lista_boletas_rectificada', 'Las tres boletas del trabajador en noviembre: la original, la rectificativa y la nueva.'),
    tabla(['Reporte de noviembre de 2026', 'Resultado medido'], [
      ['PLAME `.rem`', 'Una sola línea: `01|70009104|0121|2700.00|2700.00|`'],
      ['PLAME `.jor`', '`01|70009104|168|0|0|0|` (una vez)'],
      ['Planilla de sueldos', 'Remuneración 2 700,00; ONP 351,00; neto 2 349,00'],
    ], [3200, 6438]),
    nota('Los controles de la compañía (capítulo 26) no bloquean una rectificativa. Rectificar una boleta del ejercicio cambia los acumulados de la renta de 5.ª: revise la 5.ª de los meses siguientes.', 'importante'),
    pieCapitulo(['base', 'ce'], 'C-27'),
  );


  return c;
};
