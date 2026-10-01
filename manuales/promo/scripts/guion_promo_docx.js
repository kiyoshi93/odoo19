// Genera el guion de narración del video promocional (Word) desde guion_promo.json
const fs = require('fs'); const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, AlignmentType, HeadingLevel, LevelFormat } = require('docx');
const guion = JSON.parse(fs.readFileSync(path.join(__dirname, 'guion_promo.json')));
const escenas = JSON.parse(fs.readFileSync(path.join(__dirname, 'escenas.json')));
const COLOR = '714B67';
const seg = (s) => `0:${s.toFixed(1).padStart(4, '0')}`;
const borde = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const bordes = { top: borde, bottom: borde, left: borde, right: borde };
const anchos = [600, 1400, 2300, 5338];
const celda = (texto, i, cab, opciones = {}) => new TableCell({
  width: { size: anchos[i], type: WidthType.DXA }, borders: bordes, margins: { top: 80, bottom: 80, left: 100, right: 100 },
  shading: cab ? { type: ShadingType.CLEAR, fill: COLOR, color: 'auto' } : undefined,
  children: [new Paragraph({ children: [new TextRun({ text: texto, bold: cab || opciones.bold, color: cab ? 'FFFFFF' : undefined, size: opciones.size || 20 })] })],
});
const total = guion[guion.length - 1].fin;
const filas = guion.map((g, i) => new TableRow({ children: [
  celda(String(g.n), 0, false, { bold: true }),
  celda(`${seg(g.inicio)} – ${seg(g.fin)}`, 1, false),
  celda(escenas[i].titulo, 2, false, { bold: true }),
  celda(g.voz, 3, false, { size: 22 }),
] }));
const vinetas = [
  'Cada bloque dura entre 5 y 9 segundos: lee con energía y sin pausas largas, como un anuncio.',
  'Para poner tu voz usa el archivo «sin_voz_con_subtitulos» (o el «sin_subtitulos» junto con el .srt si tu editor maneja subtítulos) y alinea tu grabación desde 00:00.',
  'Si tu lectura queda más larga que un tramo, en CapCut o Clipchamp basta con alargar esa escena unos segundos.',
  'Los números están escritos como se leen. Los subtítulos del video dicen lo mismo, con cifras.',
  'Al final puedes añadir tu número de WhatsApp o tu web; el cierre deja espacio debajo del botón.',
];
const doc = new Document({
  styles: { default: { document: { run: { font: 'Calibri', size: 22 } } },
    paragraphStyles: [{ id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', run: { size: 34, bold: true, color: COLOR }, paragraph: { spacing: { after: 160 }, outlineLevel: 0 } }] },
  numbering: { config: [{ reference: 'v', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] }] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 } } }, children: [
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Guion de narración · Video promocional Nómina PE')] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun(`Video vertical 1080×1920 (9:16) · ${Math.round(total)} segundos · para estados, reels y TikTok.`)] }),
    ...vinetas.map((t) => new Paragraph({ numbering: { reference: 'v', level: 0 }, spacing: { after: 60 }, children: [new TextRun(t)] })),
    new Paragraph({ spacing: { after: 120 }, children: [] }),
    new Table({ width: { size: anchos.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: anchos,
      rows: [new TableRow({ tableHeader: true, children: ['#', 'Tiempo', 'Qué se ve', 'Texto a narrar'].map((t, i) => celda(t, i, true)) }), ...filas] }),
  ] }],
});
Packer.toBuffer(doc).then((b) => { fs.writeFileSync(path.join(__dirname, 'salida', 'Guion_Narracion_Promo.docx'), b); console.log('guion listo'); });
