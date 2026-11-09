// Manual v2, bloque 3 (capítulos 21 a 29). Lectura de los casos de SOLSE Demo y escenarios propios en
// SOLSE Demo (trabajadores 70009xxx, que borra limpiar_escenarios.py). En FM SYSTEMS no se guarda nada.
const fs = require('fs'); const path = require('path');
const u = require('../../scripts/odoo_ui');
const HECHOS = path.join(__dirname, '..', 'medidas', 'ui_bloque3.json');
const hechos = fs.existsSync(HECHOS) ? JSON.parse(fs.readFileSync(HECHOS)) : {};
const limpio = (s) => (s || '').replace(/\s+/g, ' ').trim();
async function cia(ctx, v) { await ctx.addCookies([{ name: 'cids', value: String(v), url: u.URL_BASE }]); }
const cap = (p, n, o = {}) => u.captura(p, n, o);
const ALTO = Number(process.env.ALTO || 900);
async function tab(p, t) {
  const l = p.locator('.o_notebook .nav-link').filter({ hasText: new RegExp('^\\s*' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$') });
  if (await l.count()) { await l.first().click(); await p.waitForTimeout(700); return true; } return false;
}
async function alta(p, f) { await p.setViewportSize({ width: 1600, height: 2600 }); await p.waitForTimeout(700); await f(); await p.setViewportSize({ width: 1600, height: ALTO }); }
async function boleta(p, c, compania, id, prefijo, pestanas = ['Días trabajados y entradas', 'Cálculo de la nómina']) {
  await cia(c, compania); await u.irA(p, '/odoo/action-1005/' + id);
  hechos[prefijo + '_botones'] = (await p.locator('.o_form_view .o_statusbar_buttons button:visible').allInnerTexts()).map(limpio);
  hechos[prefijo + '_avisos'] = limpio(await p.locator('.o_form_view .alert').allInnerTexts().then((x) => x.join(' || ')).catch(() => ''));
  for (const t of pestanas) {
    if (!(await tab(p, t))) continue;
    const n = prefijo + '_' + { 'Días trabajados y entradas': 'dias', 'Cálculo de la nómina': 'calculo', 'Información contable': 'contable', 'Asistencias': 'asistencias' }[t];
    hechos[n] = limpio(await p.locator('.o_notebook .tab-pane.active').innerText().catch(() => '')).slice(0, 3000);
    if (t === 'Cálculo de la nómina') await alta(p, () => cap(p, n)); else await cap(p, n);
  }
}
async function informe(p, c, compania, reporte, id, nombre) {
  await cia(c, compania); await p.goto(`${u.URL_BASE}/report/html/${reporte}/${id}`, { waitUntil: 'networkidle' });
  hechos[nombre] = limpio(await p.locator('body').innerText()).slice(0, 3000);
  await cap(p, nombre, { completa: true });
}
async function descartar(p) {
  const b = p.locator('.o_form_button_cancel').first();
  if (await b.isVisible().catch(() => false)) { await b.click(); await p.waitForTimeout(800); }
  await p.locator('.modal button').filter({ hasText: /Descartar/ }).first().click().catch(() => {});
}
const json = (n) => JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'medidas', n)));

const pasos = {
  async crear_boletas(p, c) {
    // Boletas desde el formulario (como un usuario: el periodo carga los días). Lista en BOLETAS_A_CREAR.
    const lista = JSON.parse(process.env.BOLETAS_A_CREAR);
    hechos.creadas = hechos.creadas || {};
    for (const b of lista) {
      await cia(c, 4); await u.irA(p, '/odoo/action-1005/new'); const f = p.locator('.o_form_view').first();
      await u.muchosAUno(p, f, 'employee_id', b.empleado); await p.waitForTimeout(2000); await u.esperarCarga(p, 800);
      if (await p.locator('.modal:visible').count()) { await p.locator('.modal:visible button').filter({ hasText: /^\s*Cerrar\s*$/ }).last().click().catch(() => p.keyboard.press('Escape')); await p.waitForTimeout(800); }
      await u.rangoFechas(p, f, 'date_from', 'date_to', b.desde, b.hasta); await p.waitForTimeout(2500);
      if (b.estructura) { await u.muchosAUno(p, f, 'struct_id', b.estructura); await p.waitForTimeout(1500); }
      await u.guardar(p);
      hechos.creadas[b.clave] = Number(p.url().split('/').pop());
      console.log('creada', b.clave, hechos.creadas[b.clave]);
    }
  },
};
module.exports = { pasos, hechos, HECHOS, boleta, informe, cap, cia, tab, alta, limpio, descartar, json };
if (require.main === module) {
  (async () => {
    const { navegador, contexto, pagina } = await u.abrir({ ancho: 1600, alto: ALTO });
    await u.asegurarLogin(pagina, contexto);
    const extra = process.env.PASOS_EXTRA ? require(process.env.PASOS_EXTRA) : {};
    Object.assign(pasos, extra);
    for (const n of process.argv[2].split(',')) {
      try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await u.captura(pagina, 'error_' + n).catch(() => {}); }
      fs.writeFileSync(HECHOS, JSON.stringify(hechos, null, 1));
    }
    await navegador.close();
  })();
}
