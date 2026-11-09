// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19 el 2026-10-22: casos del laboratorio (SOLSE Demo) y recorrido de FM SYSTEMS.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 11
  a(
    h1('11. Lote mensual y orden del proceso'),
    p('**Nómina › Procesamientos de nóminas** agrupa las boletas de un periodo. El lote nace con el diario **Planillas** (C-06).'),
    ...figura('c11_01_lotes', 'Lista de lotes.'),
    h2('11.1 Generar el lote'),
    pasos([
      '**Nuevo**: nombre y periodo. El diario Planillas viene por defecto.',
      'Guarde y pulse **Generar nóminas**. En el asistente, **Agregar una línea** para elegir a los trabajadores y pulse **Generar**.',
      'El lote crea una boleta por trabajador, con la estructura de su contrato, y las calcula.',
      'Revise las boletas y valide con **Marcar como hecho**, que confirma todas las boletas del lote.',
    ]),
    ...figura('c11_03_lote_nuevo', 'Lote nuevo de noviembre de 2026 en la compañía de laboratorio.'),
    ...figura('c11_04_generar_nominas', 'Asistente «Generar nóminas» con el trabajador elegido.'),
    ...figura('c11_05_lote_generado', 'Lote con la boleta generada: «Boleta de Trabajador HORAS EXTRA (manual v2) – noviembre 2026», en borrador.'),
    nota('El lote **no vuelve a calcular ni a contabilizar las boletas ya validadas** (C-17). Antes, generar o marcar como hecho un lote con boletas validadas las recalculaba y duplicaba su asiento. Las boletas que el lote nunca calculó se calculan antes de validar.', 'importante'),
    ...figura('c11_02_lote_diciembre_fm', 'Lote «Planilla diciembre 2026» de FM SYSTEMS, en estado Hecho, con los botones «Registrar pago» y «Enviar boletas por correo» (capítulo 28). La boleta lleva el nombre en español de U-06 («Boleta de … – diciembre 2026»).'),
    h2('11.2 Orden del mes'),
    p('Los acumulados leen boletas **validadas** (1.2). El orden es:'),
    pasos([
      '**Adelanto quincenal** (NQA), si lo hay: la mensual lo descuenta.',
      '**Gratificación** (julio y diciembre), **CTS** (mayo y noviembre) y **vacaciones** del mes.',
      '**Mensual** (NME) y **semanales** (NSO). La renta de 5.ª de la mensual cuenta la gratificación y las vacaciones ya validadas.',
      'Si hay un cese: las boletas del año antes que la **liquidación** (capítulo 16).',
    ]),
    nota('En diciembre no queda mes para corregir la renta de 5.ª. Por eso la compañía tiene el control «Gratificación y vacaciones de diciembre antes que la mensual» (V-04): con «Avisar», la mensual de diciembre muestra una banda si la gratificación o las vacaciones del mes siguen en borrador; con «Bloquear», no deja validarla. Los controles están en el capítulo 26.', 'importante'),
    pieCapitulo(['base', 'ce'], 'C-06, C-17, V-04, N-07, N-08'),
  );


  return c;
};
