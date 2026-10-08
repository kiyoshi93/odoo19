// Tarjetas fijas del video resumen (1920x1080), con las fuentes locales de la promo.
const fs = require('fs'); const path = require('path');
const { chromium } = require(path.join(require('child_process').execSync('npm root -g').toString().trim(), 'playwright'));
const BASE = path.join(__dirname, '..');
const FUENTES = path.join(BASE, '..', 'promo', 'fuentes');
const lista = (items, color = '#7BE0A8', simbolo = '✓') => `<div style="display:flex;flex-direction:column;gap:22px;font-size:40px">${items.map((t) => `<div style="display:flex;gap:20px"><b style="color:${color}">${simbolo}</b><span>${t}</span></div>`).join('')}</div>`;
const pasos = (items) => `<div style="display:grid;grid-template-columns:repeat(${items.length},1fr);gap:24px">${items.map((t, i) => `<div style="background:rgba(255,255,255,.08);border:2px solid rgba(255,255,255,.16);border-radius:24px;padding:32px;display:flex;flex-direction:column;gap:18px"><div style="font-size:64px;font-weight:700;color:#F2B84B">${i + 1}</div><div style="font-size:32px;line-height:1.3">${t}</div></div>`).join('')}</div>`;
const marco = (ceja, titulo, cuerpo, fondo = '#1E2640') => `<section style="background:${fondo};color:#F6F4EF;padding:110px 128px;display:flex;flex-direction:column;gap:56px">
  <p style="font-size:28px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#F2B84B">${ceja}</p>
  <h1 style="font-size:76px;font-weight:700;line-height:1.08">${titulo}</h1>${cuerpo}</section>`;

const tarjetas = {
  v00_portada: `<section style="background:#1E2640;color:#F6F4EF;padding:128px;display:flex;flex-direction:column;justify-content:space-between">
    <p style="font-size:28px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#F2B84B">Video resumen · Nómina PE</p>
    <div style="display:flex;flex-direction:column;gap:32px"><h1 style="font-size:104px;font-weight:700;line-height:1.05">Nómina peruana en Odoo 19 Community</h1>
    <p style="font-size:38px;line-height:1.35;color:#C9CEDB">Del trabajador a la boleta, beneficios sociales, vacaciones, asistencias, PLAME y cuarta categoría</p></div>
    <p style="font-size:28px;color:#C9CEDB">Datos de prueba ficticios · Octubre 2026</p></section>`,
  v01_que_es: marco('Qué incluye', 'La localización peruana sobre la nómina Community',
    lista(['Parámetros legales con vigencia: UIT, RMV, RMA, tasas y tramos de 5ta', 'Maestros SUNAT y ficha del trabajador con datos T-Registro',
      'Planilla mensual y semanal, gratificaciones, CTS, vacaciones y liquidación', 'Asiento contable con el PCGE en el diario Planillas',
      'PLAME, AFPnet, planilla de sueldos y recibos por honorarios'])),
  v02_ciclo: marco('Cada mes', 'El ciclo de la planilla',
    pasos(['Revisar parámetros: RMA, RMV, UIT', 'Registrar novedades: altas, ceses, vacaciones', 'Cargar asistencias y entradas', 'Calcular y confirmar boletas', 'Generar PLAME, AFPnet y planilla'])),
  v03_orden: marco('Regla de oro', 'Los acumulados solo leen boletas validadas',
    pasos(['Adelanto quincenal', 'Gratificación, CTS y vacaciones', 'Mensual y semanal', 'Archivos legales'])
    + `<p style="font-size:34px;line-height:1.4;color:#C9CEDB">El descuento del adelanto, la renta de 5ta y el sexto de la CTS leen boletas en estado Hecho: valide cada paso antes del siguiente.</p>`),
  v04_alcance: marco('Para tener en cuenta', 'Lo que hoy no cubre la localización',
    lista(['Subsidios (el .snl sale vacío)', 'Exportación del T-Registro', 'Indemnización por despido y regularización de 5ta al cese', 'TXT de Scotiabank y Banco de la Nación'], '#F2B84B', '–')),
  v99_cierre: `<section style="background:#714B67;color:#F6F4EF;padding:128px;display:flex;flex-direction:column;justify-content:space-between">
    <p style="font-size:28px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#F1E4EE">Nómina PE · Odoo 19 Community</p>
    <div style="display:flex;flex-direction:column;gap:28px"><h1 style="font-size:120px;font-weight:700;line-height:1.05">Gracias</h1>
    <p style="font-size:38px;line-height:1.35;color:#F1E4EE">Cada paso está explicado en el manual de usuario, con las cifras medidas en la base de prueba.</p></div>
    <p style="font-size:30px;color:#F1E4EE">Agenda una demostración con tus propios datos</p></section>`,
};

(async () => {
  fs.mkdirSync(path.join(BASE, 'slides'), { recursive: true });
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const [n, h] of Object.entries(tarjetas)) {
    const f = path.join(BASE, 'slides', `_${n}.html`);
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><style>
      @font-face{font-family:'DM Sans';font-weight:500;src:url(file://${FUENTES}/DMSans-Medium.ttf)}
      @font-face{font-family:'DM Sans';font-weight:700;src:url(file://${FUENTES}/DMSans-Bold.ttf)}
      body{margin:0;font-family:'DM Sans',Arial,sans-serif;font-weight:500}section{width:1920px;height:1080px;box-sizing:border-box}h1,p{margin:0}</style></head><body>${h}</body></html>`);
    await p.goto('file://' + f); await p.evaluate(() => document.fonts.ready);
    await p.locator('section').screenshot({ path: path.join(BASE, 'slides', `${n}.png`) }); fs.unlinkSync(f); console.log(n);
  }
  await b.close();
})();
