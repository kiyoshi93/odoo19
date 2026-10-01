// Renderiza las diapositivas del deck (subset HTML) a PNG 1920x1080
const fs = require('fs'); const path = require('path');
const { chromium } = require(path.join(process.env.NPM_G, 'playwright'));
const DECK = '/tmp/claude-0/-home-user-odoo19/5a7cce31-0128-5069-870a-503f1a0a8a9c/scratchpad/deck/project';
const CAP = '/home/user/odoo19/manuales/capturas/';
const blobs = {
  '7e40710314c712e50383e53a34eeabb8': 'p07_03_nomina_pe_identificacion_pension.png', 'f34e9bd99c2a38b788aeeb3a46016fd6': 'p08b_02_calculo.png',
  'c6ddef26a2fc92c1e51966cff396fed4': 'p08c_05_boleta_pago_pe.png', 'fffc04f7e65022eac7ab1bd5499c2cc3': 'p01_02_menu_nomina_pe.png',
  '0a22c74bfc65f9e2c34fa8b2f308fe56': 'p17b_01_faltas_y_vacaciones_dias.png', '9b670326f241f3c64c9898e8f31e9fd1': 'p12_11_exportar_rxh_archivos.png',
  '8204a77282808b253df9b5a99f1b3987': 'p11_04_plame_generado.png' };
const iconos = { Play: '▶', Settings: '⚙', Book: '▤', Link: '⛓', Check: '✓' };
(async () => {
  const deck = JSON.parse(fs.readFileSync(path.join(DECK, 'deck.json')));
  const opts = { args: [] };
  if (process.env.SPKI_FILE) opts.args.push('--ignore-certificate-errors-spki-list=' + fs.readFileSync(process.env.SPKI_FILE, 'utf8').trim());
  if (process.env.HTTPS_PROXY) opts.proxy = { server: process.env.HTTPS_PROXY };
  const b = await chromium.launch(opts); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  for (const [i, id] of deck.order.entries()) {
    let html = fs.readFileSync(path.join(DECK, 'slides', id + '.html'), 'utf8');
    html = html.replace(/<aside>[\s\S]*?<\/aside>/, '');
    html = html.replace(/\/_blob\/([0-9a-f]{32})/g, (_, h) => 'file://' + CAP + blobs[h]);
    html = html.replace(/<x-icon name="(\w+)" style="color:([^;]+);width:(\d+)px;height:(\d+)px"><\/x-icon>/g, (_, n, c, w) => `<span style="display:inline-flex;align-items:center;justify-content:center;flex:none;width:${w}px;height:${w}px;border-radius:50%;background:${c};color:#FDFCF9;font-size:${Math.round(w*0.5)}px;font-weight:700">${iconos[n] || '•'}</span>`);
    html = html.replace(/<x-shape kind="arrow-right" style="background:([^;]+);width:(\d+)px;height:(\d+)px"><\/x-shape>/g, (_, c, w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 64 32" style="flex:none"><path d="M0 10 H38 V0 L64 16 L38 32 V22 H0 Z" fill="${c}"/></svg>`);
    const page = `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400..700&display=swap"><style>
      body{margin:0} section{width:1920px;height:1080px;box-sizing:border-box;position:relative;overflow:hidden}
      h1,h2,h3,p,ul,ol,table{margin:0} ul,ol{padding-left:1.3em} li{margin:0}
      table{border-collapse:collapse;width:100%} th,td{padding:0.35em 0.6em;border-bottom:1px solid #D9D4C8;text-align:left} th{font-weight:700}
      div{box-sizing:border-box}</style></head><body>${html}</body></html>`;
    const tmp = path.join(__dirname, 'tmp_' + id + '.html'); fs.writeFileSync(tmp, page); await p.goto('file://' + tmp, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    const nombre = `slides/${String(i + 1).padStart(2, '0')}_${id}.png`;
    await p.locator('section').screenshot({ path: nombre });
    console.log(nombre);
  }
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
