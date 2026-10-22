// Genera el manual v2 de la nómina peruana (Odoo 19 Community) en Word.
// Uso: NODE_PATH=$(npm root -g) node manuales_ce/v2/scripts/generar_manual_v2.js [bloques: 1,2,3,4]
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, LevelFormat, InternalHyperlink, PageBreak,
  Header, Footer, PageNumber, PageOrientation,
} = require('docx');
const h = require('./base_docx');

const SALIDA = path.join(__dirname, '..', '..', 'Manual_Nomina_PE_Odoo19_Community_v2.docx');
const bloques = (process.argv[2] || '1,2,3,4').split(',').filter((b) => fs.existsSync(path.join(__dirname, 'capitulos', `bloque${b}.js`)));

const contenido = [];
contenido.push(
  new Paragraph({ spacing: { before: 2400 }, children: [] }),
  new Paragraph({ children: [new TextRun({ text: 'MANUAL DE USUARIO · VERSIÓN 2', bold: true, size: 28, color: '888888' })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Nómina Peruana en Odoo 19 Community', bold: true, size: 56, color: h.COLOR })] }),
  new Paragraph({ spacing: { after: 600 }, children: [new TextRun({ text: 'Localización SOLSE sobre om_hr_payroll: planilla, aportes, renta de 5.ª, gratificaciones, CTS, liquidación e indemnización, vacaciones, feriados, asistencias, subsidios, microempresa, Vida Ley, PLAME, AFPnet, T-Registro, pago a bancos, pago de la planilla, boletas por correo y recibos por honorarios', size: 26, color: '444444' })] }),
  new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: h.COLOR, space: 4 } }, children: [] }),
  h.espacio(),
  h.tabla(['Dato', 'Valor'], [
    ['Versión de Odoo', '19.0 Community'],
    ['Módulos documentados', `solse_pe_payroll_base ${h.VERSIONES.base} · solse_pe_payroll_ce ${h.VERSIONES.ce} · solse_pe_payroll_ce_demo ${h.VERSIONES.ce_demo} · solse_pe_payroll_asistencia ${h.VERSIONES.asistencia} · solse_pe_plame_rxh ${h.VERSIONES.plame_rxh} · solse_pe_plame_4ta ${h.VERSIONES.plame_4ta} · om_hr_payroll ${h.VERSIONES.om} · om_hr_payroll_account ${h.VERSIONES.om_account}`],
    ['Base de medición', 'contable19: FM SYSTEMS SOLUTIONS EIRL (recorrido) y SOLSE Demo Servicios S.A.C. (laboratorio de 14 casos)'],
    ['Público', 'Usuarios de RR. HH. y contabilidad, e implementadores'],
    ['Fecha', 'Octubre de 2026 · versión 2 (reemplaza a la versión 1 del 8 de octubre de 2026)'],
    ['Estado de esta entrega', bloques.length < 4 ? `Avance: bloque(s) ${bloques.join(', ')} de 4` : 'Completo'],
  ], [2600, 7038]),
  h.espacio(),
  h.nota('Todas las cifras salen de una **corrida real** en la base de pruebas (22 de octubre de 2026). Los trabajadores del recorrido son **ficticios** y sus DNI **sintéticos**; los del laboratorio también. No se muestra ningún dato personal real.'),
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ children: [new TextRun({ text: 'Contenido', bold: true, size: 32, color: h.COLOR })], spacing: { after: 200 } }),
  'INDICE',
);
for (const b of bloques) contenido.push(...require(`./capitulos/bloque${b}.js`)(h));

const entradas = h.indice.map(({ nivel, texto, id }) => new Paragraph({
  spacing: { before: nivel === 1 ? 120 : 0, after: nivel === 1 ? 40 : 20 }, indent: { left: nivel === 1 ? 0 : 400 },
  children: [new InternalHyperlink({ anchor: id, children: [new TextRun({ text: texto, bold: nivel === 1, size: nivel === 1 ? 22 : 20, color: nivel === 1 ? h.COLOR : '333333' })] })],
}));
contenido.splice(contenido.indexOf('INDICE'), 1, ...entradas);

const documento = new Document({
  creator: 'SOLSE - Implementación Odoo', title: 'Manual de Nómina Peruana - Odoo 19 Community (v2)',
  description: 'Manual de usuario de la nómina peruana (localización SOLSE) en Odoo 19 Community, versión 2',
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 36, bold: true, color: h.COLOR }, paragraph: { spacing: { before: 240, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, color: '333333' }, paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, color: h.COLOR }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [
    { reference: 'pasos', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] },
    { reference: 'vinetas', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Manual de Nómina Peruana · Odoo 19 Community · versión 2', size: 16, color: '888888' })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Página ', PageNumber.CURRENT, ' de ', PageNumber.TOTAL_PAGES], size: 16, color: '888888' })] })] }) },
    children: contenido,
  }],
});
Packer.toBuffer(documento).then((buffer) => {
  fs.writeFileSync(SALIDA, buffer);
  console.log(`Manual v2: ${SALIDA} · bloques ${bloques.join(',')} · ${h.estado.figura} figuras` + (h.faltantes.length ? ` · FALTAN: ${h.faltantes.join(', ')}` : ''));
});
