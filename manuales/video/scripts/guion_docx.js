// Genera el guion de narración (Word) a partir de guion.json
const fs = require('fs'); const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, AlignmentType, HeadingLevel, LevelFormat } = require('docx');
const guion = JSON.parse(fs.readFileSync(path.join(__dirname, 'guion.json')));
const COLOR = '714B67';
const mmss = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.round(s % 60)).padStart(2, '0')}`.replace(':60', ':59');
const borde = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const bordes = { top: borde, bottom: borde, left: borde, right: borde };
const anchos = [700, 1500, 2100, 5338];
const celda = (texto, i, cab, opciones = {}) => new TableCell({
  width: { size: anchos[i], type: WidthType.DXA }, borders: bordes, margins: { top: 80, bottom: 80, left: 100, right: 100 },
  shading: cab ? { type: ShadingType.CLEAR, fill: COLOR, color: 'auto' } : undefined,
  children: [new Paragraph({ children: [new TextRun({ text: texto, bold: cab || opciones.bold, color: cab ? 'FFFFFF' : undefined, size: opciones.size || 20 })] })],
});
const total = guion[guion.length - 1].fin;
const filas = guion.map((g) => new TableRow({ children: [
  celda(String(g.n), 0, false, { bold: true }),
  celda(`${mmss(g.inicio)} – ${mmss(g.fin)}`, 1, false),
  celda(g.titulo, 2, false, { bold: true }),
  celda(g.texto, 3, false, { size: 22 }),
] }));
const doc = new Document({
  styles: { default: { document: { run: { font: 'Calibri', size: 22 } } },
    paragraphStyles: [{ id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', run: { size: 34, bold: true, color: COLOR }, paragraph: { spacing: { after: 160 }, outlineLevel: 0 } }] },
  numbering: { config: [{ reference: 'v', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 } } }, children: [
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Guion de narración · Resumen en video, sesión 1')] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun(`Video: Resumen_Nomina_Enterprise_Sesion1.mp4 · 1920×1080 · ${mmss(total)} min · sin audio.`)] }),
    ...['Lea cada bloque cuando empiece su tramo (columna Tiempo). Cada tramo deja de 2 a 6 segundos de holgura al final: no hace falta apurarse.',
      'Ritmo sugerido: pausado, unas 140 palabras por minuto.',
      'Graba la voz en una sola pista (por ejemplo, con Audacity o con el grabador del celular) y luego únela al video en cualquier editor (Clipchamp, CapCut, DaVinci Resolve o iMovie), alineando el inicio en 00:00.',
      'Los números están escritos como se leen en voz alta.'].map((t) => new Paragraph({ numbering: { reference: 'v', level: 0 }, spacing: { after: 60 }, children: [new TextRun(t)] })),
    new Paragraph({ spacing: { after: 120 }, children: [] }),
    new Table({ width: { size: anchos.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: anchos,
      rows: [new TableRow({ tableHeader: true, children: ['#', 'Tiempo', 'Qué se ve', 'Texto a narrar'].map((t, i) => celda(t, i, true)) }), ...filas] }),
  ] }],
});
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(path.join(__dirname, 'Guion_Narracion_Sesion1.docx'), b); console.log('guion listo'); });
