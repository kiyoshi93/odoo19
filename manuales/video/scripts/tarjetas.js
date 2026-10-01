// Portada y cierre del video (sin datos de contacto ni marcadores)
const fs = require('fs'); const path = require('path');
const { chromium } = require(path.join(process.env.NPM_G, 'playwright'));
const tarjetas = {
  v00_portada: `<section style="background:#1E2640;color:#F6F4EF;padding:128px;display:flex;flex-direction:column;justify-content:space-between">
    <p style="font-size:28px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:#8FD3D6">Resumen en video · Sesión de soporte 1</p>
    <div style="display:flex;flex-direction:column;gap:32px"><h1 style="font-size:104px;font-weight:700;line-height:1.05">Nómina peruana en Odoo 19 Enterprise</h1>
    <p style="font-size:36px;line-height:1.35;color:#C9CEDB">Lo que vimos en su base: del trabajador a la boleta, vacaciones, PLAME y recibos por honorarios</p></div>
    <p style="font-size:28px;color:#C9CEDB">Datos de prueba ficticios · Octubre 2026</p></section>`,
  v99_cierre: `<section style="background:#714B67;color:#F6F4EF;padding:128px;display:flex;flex-direction:column;justify-content:space-between">
    <p style="font-size:28px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:#F1E4EE">Nómina Enterprise · Sesión 1</p>
    <div style="display:flex;flex-direction:column;gap:28px"><h1 style="font-size:120px;font-weight:700;line-height:1.05">Gracias</h1>
    <p style="font-size:38px;line-height:1.35;color:#F1E4EE">El detalle de cada paso está en el manual de usuario que les entregamos.</p></div>
    <p style="font-size:30px;color:#F1E4EE">Próximas sesiones: carga de trabajadores, nómina en paralelo y archivos legales</p></section>`,
};
(async () => {
  const opts = { args: [] }; if (process.env.HTTPS_PROXY) opts.proxy = { server: process.env.HTTPS_PROXY };
  if (process.env.SPKI_FILE) opts.args.push('--ignore-certificate-errors-spki-list=' + fs.readFileSync(process.env.SPKI_FILE, 'utf8').trim());
  const b = await chromium.launch(opts); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const [n, h] of Object.entries(tarjetas)) {
    const f = path.join(__dirname, 'tmp_' + n + '.html');
    fs.writeFileSync(f, `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400..700&display=swap"><style>body{margin:0;font-family:'DM Sans',Arial,sans-serif}section{width:1920px;height:1080px;box-sizing:border-box}h1,p{margin:0}</style></head><body>${h}</body></html>`);
    await p.goto('file://' + f, { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready);
    await p.locator('section').screenshot({ path: `slides/${n}.png` }); fs.unlinkSync(f); console.log(n);
  }
  await b.close();
})();
