// Renderiza las escenas verticales (1080x1920) del video promocional a PNG.
const fs = require('fs'); const path = require('path');
const { chromium } = require(path.join(require('child_process').execSync('npm root -g').toString().trim(), 'playwright'));
// Las escenas, fuentes y recortes están en promo/; escenas.json junto a este script
const BASE = path.join(__dirname, '..');
const escenas = JSON.parse(fs.readFileSync(path.join(__dirname, 'escenas.json')));
const fuente = (archivo) => 'file://' + path.join(BASE, 'fuentes', archivo);
const img = (nombre) => 'file://' + path.join(BASE, 'recortes', nombre + '.png');
const CSS = `
@font-face{font-family:'DM Sans';font-weight:500;src:url(${fuente('DMSans-Medium.ttf')})}
@font-face{font-family:'DM Sans';font-weight:700;src:url(${fuente('DMSans-Bold.ttf')})}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;overflow:hidden;font-family:'DM Sans',sans-serif;color:#fff;
 background:radial-gradient(1200px 900px at 85% 0%,#3A2F55 0%,rgba(30,38,64,0) 60%),radial-gradient(900px 900px at 0% 100%,#2A3A63 0%,rgba(30,38,64,0) 60%),#1E2640;position:relative}
.marca{position:absolute;top:84px;left:72px;right:72px;display:flex;justify-content:space-between;align-items:center;font-size:30px;font-weight:700;letter-spacing:.5px}
.marca span{color:#AEB6CF;font-weight:500}
.paso{position:absolute;top:84px;right:72px;font-size:28px;color:#AEB6CF}
.contenido{position:absolute;top:200px;left:72px;right:72px;display:flex;flex-direction:column;gap:34px}
.ceja{align-self:flex-start;background:#F2B84B;color:#1E2640;font-weight:700;font-size:30px;padding:10px 26px;border-radius:999px;letter-spacing:.3px}
h1{font-size:82px;line-height:1.04;font-weight:700;letter-spacing:-1px}
.tarjeta{background:#fff;border-radius:28px;padding:14px;box-shadow:0 30px 80px rgba(0,0,0,.45);overflow:hidden;max-height:760px;display:flex;align-items:flex-start;justify-content:center}
.tarjeta img{width:100%;border-radius:16px;display:block;object-fit:cover;object-position:top}
.chips{display:flex;flex-wrap:wrap;gap:16px}
.chip{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.18);border-radius:999px;padding:12px 26px;font-size:32px;font-weight:500}
.chip b{color:#7BE0A8;font-size:34px}
.centro{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 80px 380px;gap:44px}
.grande{font-size:116px;line-height:1.02;font-weight:700;letter-spacing:-2px}
.grande em{font-style:normal;color:#F2B84B}
.sub{font-size:44px;color:#C9CFE2;line-height:1.25}
.lista{display:flex;flex-direction:column;gap:20px;font-size:40px}
.lista div{display:flex;gap:18px;align-items:center}.lista b{color:#7BE0A8}
.cta{align-self:flex-start;background:#F2B84B;color:#1E2640;font-size:48px;font-weight:700;padding:26px 52px;border-radius:999px;box-shadow:0 16px 40px rgba(242,184,75,.35)}
.fondo{position:absolute;right:-180px;top:260px;width:900px;transform:rotate(-8deg);opacity:.16;border-radius:24px}
`;
const marca = `<div class="marca">Nómina PE <span>Odoo 19 Community</span></div>`;
function html(e, n) {
  let cuerpo;
  if (e.tipo === 'portada') {
    cuerpo = `<img class="fondo" src="${img('calculo')}"><img class="fondo" style="top:900px;right:-260px;transform:rotate(6deg)" src="${img('plame')}">${marca}
      <div class="centro"><div class="grande">¿Tu planilla todavía vive en <em>Excel</em>?</div><div class="sub">${e.sub}</div></div>`;
  } else if (e.tipo === 'cierre') {
    const beneficios = ['Cálculo automático de la planilla', 'Gratificaciones, CTS y liquidación', 'PLAME y AFPnet en un clic', 'Vacaciones, asistencias y 4ta categoría'];
    cuerpo = `${marca}<div class="centro"><div class="grande" style="font-size:96px">Tu nómina peruana, en <em>Odoo 19 Community</em></div>
      <div class="lista">${beneficios.map((b) => `<div><b>✓</b>${b}</div>`).join('')}</div><div class="cta">${e.sub} →</div></div>`;
  } else {
    cuerpo = `${marca}<div class="contenido"><div class="ceja">${e.eyebrow}</div><h1>${e.titulo}</h1>
      <div class="tarjeta"><img src="${img(e.img)}"></div>
      <div class="chips">${e.chips.map((c) => `<div class="chip"><b>✓</b>${c}</div>`).join('')}</div></div>`;
  }
  return `<!doctype html><html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${cuerpo}</body></html>`;
}
(async () => {
  const navegador = await chromium.launch();
  const pagina = await navegador.newPage({ viewport: { width: 1080, height: 1920 } });
  for (const [n, e] of escenas.entries()) {
    const temporal = path.join(BASE, 'escenas', `_${e.id}.html`);
    fs.writeFileSync(temporal, html(e, n));
    await pagina.goto('file://' + temporal); await pagina.evaluate(() => document.fonts.ready);
    // Verifica que el contenido no invada la zona de subtítulos (y > 1480)
    const fondo = await pagina.evaluate(() => Math.max(...[...document.querySelectorAll('.contenido,.centro > *')].map((x) => x.getBoundingClientRect().bottom)));
    await pagina.screenshot({ path: path.join(BASE, 'escenas', `${e.id}.png`) });
    console.log(e.id, 'contenido hasta y =', Math.round(fondo));
  }
  await navegador.close();
})();
