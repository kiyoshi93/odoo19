// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 26
  a(
    h1('26. Avisos y controles'),
    p('La versión 2 avisa antes de que un error llegue a la boleta, al PLAME o a la contabilidad. Hay dos clases:'),
    vinetas([
      '**Bandas** (siempre activas): avisos amarillos en las listas de boletas y lotes y en el formulario de la boleta y del lote en borrador.',
      '**Controles al validar**, configurables por compañía en **Ajustes de la compañía › Nómina PE - Controles**: «Avisar» (banda y nota en el historial al validar), «Bloquear la validación» o «No controlar».',
    ]),
    tabla(['Aviso o control', 'Cuándo aparece', 'Dónde', 'Ítem / capítulo'], [
      ['RMA de AFP desactualizada o faltante', 'La RMA vigente a la fecha tiene más de 95 días o no existe', 'Banda', 'V-03 · 4'],
      ['UIT del año faltante', 'La UIT vigente es de un año anterior', 'Banda', 'V-03 · 4'],
      ['Feriados del año faltantes', 'Ningún feriado registrado en el año', 'Banda', 'V-05 · 18'],
      ['Vigencia faltante de un parámetro', 'Al calcular, una regla pide un parámetro sin vigencia a la fecha', 'Mensaje al calcular', 'V-02 · 4'],
      ['Sin contrato vigente', 'El periodo de la boleta no tiene contrato', 'Banda y advertencia', 'V-04'],
      ['Trabajador sin sistema pensionario', 'Sin ONP ni AFP y sin «No aporta pensión»', 'Control (Avisar)', 'V-04'],
      ['Gratificación y vacaciones de diciembre antes que la mensual', 'En diciembre, con la GRAT o la VAC del mes en borrador', 'Control (Avisar)', 'V-04 · 11'],
      ['Subsidio sin los aportes que dan derecho', 'Menos de 3 meses consecutivos o 4 no consecutivos', 'Control (Avisar)', 'N-01 · 23'],
      ['Boletas del año antes que la liquidación del cese', 'Boletas del año en borrador al liquidar', 'Control (Avisar)', 'N-04 · 16'],
      ['Trabajador sin póliza Vida Ley', 'Sin póliza vigente de su compañía', 'Control (No controlar por defecto)', 'N-05 · 6'],
      ['Boleta sin importes', 'Todas las líneas en 0,00', 'Mensaje al validar', 'C-18 · 10'],
    ], [2900, 3000, 1800, 1938]),
    ...figura('c09_04_compania_controles', 'Nómina PE - Controles: cada control con su opción. FM SYSTEMS tiene todos en «Avisar», salvo Vida Ley en «No controlar».'),
    h2('26.1 Ejemplos medidos'),
    ...figura('c26_04_sin_contrato_vigente', 'Boleta de octubre de un trabajador que ingresa el 25 de noviembre: «Sin contrato vigente en el periodo… la boleta no tendrá contrato, estructura ni días trabajados».'),
    ...figura('c26_02_sin_sistema_pensionario', 'Boleta nueva de un trabajador sin ONP ni AFP (escenario del manual): «… no tiene sistema pensionario (ONP o AFP): la boleta no calculará aportes de pensión. Regístrelo en su ficha … o marque «No aporta pensión» si corresponde».'),
    ...figura('c26_01_diciembre_grati_borrador_dias', 'Mensual de diciembre con la gratificación del mes en borrador (escenario del manual): «… está en borrador: valídela ANTES que esta boleta. En diciembre la renta de 5.ª ya no se corrige en otro mes».'),
    h3('Vigencia faltante (V-02)'),
    p('Si una regla pide un parámetro sin vigencia a la fecha de la boleta, el cálculo se detiene con un mensaje funcional. Medido con una boleta de diciembre de 2024 (antes de la primera vigencia):'),
    p('«Falta registrar «ONP - Tasa de aporte (D.L. 19990)» (pe_onp_tasa) vigente al 31/12/2024 (la primera vigencia registrada es desde el 01/01/2025). Regístrelo en Nómina › Nómina PE › Parámetros de Nómina PE. Boleta: …, regla ONP - Sistema Nacional de Pensiones (ONP_001).»'),
    ...figura('c26_03_vigencia_faltante', 'En el navegador, el mismo error se muestra como «¡Vaya! Ocurrió un error…»: el mensaje funcional queda al final de «Ver detalles técnicos» (hallazgo O-64).'),
    nota('Medido el 22/10/2026: por RPC el mensaje es el funcional, pero el cliente web no lo muestra como advertencia. La excepción `VigenciaFaltante` hereda de `UserError`, aunque el navegador la trata como un error de servidor y la muestra en el diálogo genérico. Mientras no se corrija (O-64, archivo de hallazgos), abra «Ver detalles técnicos» y lea la última línea: ahí está el parámetro que falta y la fecha.', 'importante'),
    pieCapitulo(['base', 'ce'], 'V-02, V-03, V-04, V-05'),
  );


  return c;
};
