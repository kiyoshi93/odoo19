// Manual v3, capítulo 30: recibos por honorarios (4.ª categoría). Origen: v2 (22/10/2026). Sin cambios funcionales en
// solse_pe_plame_rxh ni en solse_pe_plame_4ta desde el v2; casos PLAME-RXH (202 celdas) y PLAME (126) corridos el
// 08/11/2026 con las versiones del v3.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 30
  a(
    h1('30. Recibos por honorarios (4.ª categoría)'),
    p('El PLAME de 4.ª categoría (prestadores y comprobantes) tiene **dos puertas con el mismo contenido** (medido en el caso PLAME: la hoja «Anexo4ta» compara el `.ps4` y el `.4ta` del ZIP con los del caso PLAME-RXH y da «igual»):'),
    vinetas([
      '**Sin nómina**: Contabilidad › Reportes › **PLAME - Recibos por Honorarios** (`solse_pe_plame_rxh`). Genera el `.ps4` (prestadores) y el `.4ta` (comprobantes).',
      '**Con nómina**: casilla **«Incluir 4ta categoría (.ps4 y .4ta)»** del asistente PLAME (`solse_pe_plame_4ta`), marcada por defecto, que los agrega al ZIP de la planilla (capítulo 27). Si no hay recibos pagados en el mes, el resumen lo dice: «4ta categoría: no hay recibos por honorarios pagados en el periodo.»',
    ]),
    p('Entran los recibos **pagados** en el mes, sin importar su fecha de emisión. Los pagos parciales se prorratean y las notas de crédito toman la fecha de pago del recibo de origen. La retención sale del impuesto marcado como **retención de 4.ª**. Los datos del prestador (apellidos y nombres separados, domiciliado, convenio, suspensiones) se registran en el contacto, pestaña «PLAME 4ta categoría».'),
    pasos([
      'Elija **Ejercicio** y **Mes** (o el rango Desde / Hasta).',
      '**Revisar periodo** lista los comprobantes con su prestador, tipo, serie, número, emisión, pago, retención y monto, y la pestaña **Validaciones** dice qué falta corregir.',
      '**Generar archivos** produce el `.ps4` y el `.4ta`.',
    ]),
    ...figura('c30_02_rxh_revision', 'Revisión de julio de 2026 (caso PLAME-RXH): 8 prestadores, 9 comprobantes (uno con retención y una nota de crédito de 200,00) y total declarado S/ 15 022,60. Los prestadores van difuminados.'),
    p('En la ficha de la compañía, pestaña **«Nómina PE - 4ta Categoría»**, grupo «Retención para el PLAME (.ps4)»: **Retención 4ta para PLAME** («Automático (comprobante primero, cálculo después)», por defecto; «Solo del comprobante (impuesto de retención)» o «Calcular 8% sobre el bruto (con umbral)») y **Umbral de retención 4ta (S/)**, 1 500,00.'),
    ...figura('c30_03_ajustes_4ta', 'SOLSE Demo Servicios, pestaña «Nómina PE - 4ta Categoría»: «Automático (comprobante primero, cálculo después)» y umbral de S/ 1 500,00.'),
    nota('Caso PLAME-RXH (202 celdas, corrido el 08/11/2026): los 8 prestadores del `.ps4` (7 con RUC y un pasaporte no domiciliado con convenio 2) y los 9 comprobantes del `.4ta`, con CRLF y en ASCII. En el caso PLAME, el mismo `.ps4` (8 líneas) y `.4ta` (9 líneas) van dentro del ZIP de julio de 2026 de la planilla.', 'caso'),
    nota('El prestador por recibos por honorarios no es un practicante: la subvención de una modalidad formativa no es renta de 4.ª y va en el «Personal en formación» del PLAME (capítulos 27 y 31).', 'nota'),
    nota('El formato se comparó con archivos aceptados por el PDT 4.6. La **validación final en el PDT del cliente está pendiente**: verifíquelo con su primera declaración.', 'importante'),
    pieCapitulo(['plame_rxh', 'plame_4ta'], null),
  );

  return c;
};
