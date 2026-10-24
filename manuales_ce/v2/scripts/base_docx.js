// Utilidades del manual v2 (Word): las mismas del v1 más el pie de versión por capítulo.
const fs = require('fs');
const path = require('path');
const {
  Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, Bookmark,
} = require('docx');

const CAPTURAS = path.join(__dirname, '..', 'capturas');
const COLOR = '714B67';
const VERSIONES = {
  base: '19.0.1.20.1', ce: '19.0.1.27.1', ce_demo: '19.0.2.25.1', asistencia: '19.0.1.4.1',
  asistencia_demo: '19.0.1.2.1', plame_demo: '19.0.1.4.1', plame_4ta: '19.0.1.0.0', plame_rxh: '19.0.1.2.0',
  om: '19.0.1.0', om_account: '19.0.0.0',
};
const estado = { figura: 0, lista: 0 };
const indice = [];
const faltantes = [];

function corridas(texto, base = {}) {
  return String(texto).split(/(\*\*[^*]+\*\*|`[^`]+`)/).filter(Boolean).map((t) => {
    if (t.startsWith('**')) return new TextRun({ ...base, text: t.slice(2, -2), bold: true });
    if (t.startsWith('`')) return new TextRun({ ...base, text: t.slice(1, -1), font: 'Consolas', size: 20, color: '444444' });
    return new TextRun({ ...base, text: t });
  });
}
const p = (texto, opciones = {}) => new Paragraph({ children: corridas(texto), spacing: { after: 120 }, ...opciones });
const marcador = (nivel, texto) => {
  const id = `t${indice.length + 1}`;
  indice.push({ nivel, texto, id });
  return new Bookmark({ id, children: [new TextRun(texto)] });
};
const h1 = (texto) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [marcador(1, texto)], pageBreakBefore: true });
const h2 = (texto) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [marcador(2, texto)] });
const h3 = (texto) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(texto)] });
function pasos(lista) {
  estado.lista += 1;
  const instancia = estado.lista;
  return lista.map((t) => new Paragraph({ children: corridas(t), numbering: { reference: 'pasos', level: 0, instance: instancia }, spacing: { after: 80 } }));
}
const vinetas = (lista) => lista.map((t) => new Paragraph({ children: corridas(t), numbering: { reference: 'vinetas', level: 0 }, spacing: { after: 60 } }));
function nota(texto, tipo = 'nota') {
  const e = {
    nota: { relleno: 'EAF4F8', borde: '2E86AB', etiqueta: 'Nota: ' },
    importante: { relleno: 'FDF2E6', borde: 'E08A1E', etiqueta: 'Importante: ' },
    implementador: { relleno: 'F3EEF2', borde: COLOR, etiqueta: 'Para implementadores: ' },
    caso: { relleno: 'EEF7EE', borde: '3C8D40', etiqueta: 'Compruébelo con el laboratorio: ' },
    limite: { relleno: 'F7EEEE', borde: 'B23B3B', etiqueta: 'Límite: ' },
    video: { relleno: 'FFF6E5', borde: 'D9861C', etiqueta: '▶ Video: ' },
  }[tipo];
  return new Paragraph({
    children: [new TextRun({ text: e.etiqueta, bold: true, color: e.borde }), ...corridas(texto)],
    shading: { type: ShadingType.CLEAR, fill: e.relleno, color: 'auto' },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: e.borde, space: 8 } },
    spacing: { before: 120, after: 160 }, indent: { left: 120, right: 120 },
  });
}
function dimensionesPng(ruta) { const d = fs.readFileSync(ruta); return { ancho: d.readUInt32BE(16), alto: d.readUInt32BE(20) }; }
function figura(archivo, pie, anchoPx = 620) {
  const ruta = path.join(CAPTURAS, `${archivo}.png`);
  if (!fs.existsSync(ruta)) { faltantes.push(archivo); return [p(`[Falta la captura ${archivo}]`)]; }
  const { ancho, alto } = dimensionesPng(ruta);
  const escala = Math.min(1, anchoPx / ancho, 820 / alto);
  estado.figura += 1;
  return [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 120, after: 60 }, keepNext: true,
      children: [new ImageRun({ type: 'png', data: fs.readFileSync(ruta), transformation: { width: Math.round(ancho * escala), height: Math.round(alto * escala) }, altText: { title: pie, description: pie, name: archivo } })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: `Figura ${estado.figura}. `, bold: true, size: 18, color: COLOR }), new TextRun({ text: pie, italics: true, size: 18, color: '555555' })] }),
  ];
}
function tabla(encabezados, filas, anchos) {
  const total = anchos.reduce((a, b) => a + b, 0);
  const borde = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
  const bordes = { top: borde, bottom: borde, left: borde, right: borde };
  const celda = (texto, i, enc) => new TableCell({
    width: { size: anchos[i], type: WidthType.DXA }, borders: bordes, margins: { top: 60, bottom: 60, left: 100, right: 100 },
    shading: enc ? { type: ShadingType.CLEAR, fill: COLOR, color: 'auto' } : undefined,
    children: [new Paragraph({ children: corridas(String(texto), enc ? { bold: true, color: 'FFFFFF', size: 19 } : { size: 19 }) })],
  });
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: anchos,
    rows: [new TableRow({ tableHeader: true, children: encabezados.map((t, i) => celda(t, i, true)) }),
      ...filas.map((f) => new TableRow({ children: f.map((t, i) => celda(t, i, false)) }))] });
}
const espacio = () => new Paragraph({ children: [], spacing: { after: 120 } });
// Pie de cada capítulo: versión de los módulos que muestra y los ítems de la matriz que cubre
function pieCapitulo(modulos, items) {
  const texto = modulos.map((m) => `${m} ${VERSIONES[m]}`).join(' · ');
  return new Paragraph({
    spacing: { before: 240 }, border: { top: { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF', space: 4 } },
    children: [new TextRun({ text: `Versiones mostradas: ${texto}.`, size: 16, color: '777777' }),
      ...(items ? [new TextRun({ text: `  Ítems de la versión 2: ${items}.`, size: 16, color: '777777' })] : [])],
  });
}
module.exports = { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, espacio, pieCapitulo, corridas, indice, faltantes, estado, COLOR, VERSIONES };
