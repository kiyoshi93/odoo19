// Lote 11, punto 8: ficha (derechohabientes), línea nueva descartada, T19 y edad. Nada se guarda.
const fs = require('fs'); const path = require('path');
const u = require('/home/user/odoo19/manuales_ce/scripts/odoo_ui');
const SALIDA = path.join(__dirname, 'out'); const CAPTURAS = path.join(SALIDA, 'capturas');
fs.mkdirSync(CAPTURAS, { recursive: true });
const ARCHIVO = path.join(SALIDA, 'ui_hechos.json');
const hechos = fs.existsSync(ARCHIVO) ? JSON.parse(fs.readFileSync(ARCHIVO)) : {};
const foto = (p, n) => p.screenshot({ path: path.join(CAPTURAS, n + '.png'), fullPage: false });
const limpio = (s) => (s || '').replace(/\s+/g, ' ').trim();
async function cids(ctx, v) { await ctx.addCookies([{ name: 'cids', value: v, url: u.URL_BASE }]); }
async function pestana(p, re) { const t = p.locator('.o_notebook .nav-link').filter({ hasText: re }); if (await t.count()) { await t.first().click(); await p.waitForTimeout(800); } }
const lista = () => '.o_field_widget[name="relative_ids"]';

const pasos = {
  async ficha(p, c) {
    await cids(c, '4'); await u.irA(p, '/odoo/employees/' + process.env.EMP_502); await pestana(p, /^\s*Nómina PE\s*$/);
    const l = p.locator(lista()).first(); await l.scrollIntoViewIfNeeded();
    hechos.p8_columnas = await l.locator('thead th').evaluateAll((t) => t.map((x) => x.innerText.trim()).filter(Boolean));
    hechos.p8_filas = (await l.locator('.o_data_row').allInnerTexts()).map(limpio);
    await foto(p, 'l11_p8_ficha_70001502_derechohabientes');
    await l.locator('.o_field_x2many_list_row_add a').first().click(); await p.waitForTimeout(1500);
    const fila = l.locator('.o_data_row.o_selected_row, .o_data_row').last();
    const alta = fila.locator('[name="pe_fecha_alta"]');
    hechos.p8_alta_nueva = limpio(await alta.innerText().catch(() => '')) || await alta.locator('input').inputValue().catch(() => '');
    const modal = p.locator('.modal .o_form_view');
    if (await modal.count()) hechos.p8_alta_nueva_modal = await modal.locator('[name="pe_fecha_alta"] input').inputValue().catch(() => '');
    await foto(p, 'l11_p8_linea_nueva_alta_hoy');
    await p.keyboard.press('Escape'); await p.waitForTimeout(600);
    const desc = p.locator('.o_form_button_cancel').first();
    if (await desc.isVisible().catch(() => false)) { await desc.click(); await p.waitForTimeout(800); }
    hechos.p8_descartado = !(await p.locator('.o_form_status_indicator_buttons .o_form_button_save').isVisible().catch(() => false));
  },
  async t19(p, c) {
    await cids(c, '4'); await u.irA(p, '/odoo/action-1034');
    hechos.p8_t19 = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await foto(p, 'l11_p8_vinculos_familiares_t19');
  },
  async edad(p, c) {
    await cids(c, '4'); await u.irA(p, '/odoo/employees/' + process.env.EMP_501);
    await pestana(p, /^\s*Nómina PE\s*$/);
    const e = p.locator('.o_field_widget[name="age"]').first();
    hechos.p8_edad = limpio(await e.innerText().catch(() => '')) || await e.locator('input').inputValue().catch(() => '');
    await e.scrollIntoViewIfNeeded().catch(() => {}); await foto(p, 'l11_p8_edad_70001501');
  },
};

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  for (const n of process.argv[2].split(',')) {
    try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await foto(pagina, 'error_' + n).catch(() => {}); }
    fs.writeFileSync(ARCHIVO, JSON.stringify(hechos, null, 1));
  }
  await navegador.close();
})();
