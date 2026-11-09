// Manual v3 (origen: v2), bloque 4: capítulos 30 a 32 y anexos A a E (el 19 está en cap19.js). Medido el 2026-10-22.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');

  // ------------------------------------------------------------------ 30
  a(
    h1('30. Recibos por honorarios (4.ª categoría)'),
    p('El PLAME de 4.ª categoría (prestadores y comprobantes) tiene **dos puertas con el mismo contenido** (medido byte a byte en el caso PLAME):'),
    vinetas([
      '**Sin nómina**: Contabilidad › Reportes › **PLAME - Recibos por Honorarios** (`solse_pe_plame_rxh`). Genera el `.ps4` (prestadores) y el `.4ta` (comprobantes).',
      '**Con nómina**: casilla **Incluir 4ta categoría** del asistente PLAME (`solse_pe_plame_4ta`), que los agrega al ZIP de la planilla (capítulo 27).',
    ]),
    p('Entran los recibos **pagados** en el mes, sin importar su fecha de emisión. Los pagos parciales se prorratean y las notas de crédito toman la fecha de pago del recibo de origen. La retención sale del impuesto marcado como **retención de 4.ª**. Los datos del prestador (apellidos y nombres separados, domiciliado, convenio, suspensiones) se registran en el contacto.'),
    pasos([
      'Elija **Ejercicio** y **Mes** (o el rango Desde / Hasta).',
      '**Revisar periodo** lista los comprobantes con su prestador, tipo, serie, número, emisión, pago, retención y monto, y la pestaña **Validaciones** dice qué falta corregir.',
      '**Generar archivos** produce el `.ps4` y el `.4ta`.',
    ]),
    ...figura('c30_02_rxh_revision', 'Revisión de julio de 2026 (caso PLAME-RXH): 8 prestadores, 9 comprobantes y total declarado S/ 15 022,60, con una nota de crédito y un no domiciliado con pasaporte.'),
    ...figura('c30_03_ajustes_4ta', 'Ajustes de 4.ª categoría de la compañía: retención para el PLAME y umbral de S/ 1 500.'),
    nota('Caso PLAME-RXH (202 celdas): los 8 prestadores del `.ps4` (7 con RUC y un pasaporte no domiciliado con convenio 2) y los 9 comprobantes del `.4ta`, con CRLF y en ASCII.', 'caso'),
    nota('El formato se comparó con archivos aceptados por el PDT 4.6. La **validación final en el PDT del cliente está pendiente**: verifíquelo con su primera declaración.', 'importante'),
    pieCapitulo(['plame_rxh', 'plame_4ta'], null),
  );


  return c;
};
