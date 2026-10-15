// Lote 6a: O-21 (botón 5), C-18 en el navegador (MICRO, CTS sin importes) y C-23 (captura). Solo SOLSE Demo para escribir.
const fs = require('fs'); const path = require('path');
const u = require('/home/user/odoo19/manuales_ce/scripts/odoo_ui');
const SALIDA = path.join(__dirname, 'out'); const CAPTURAS = path.join(SALIDA, 'capturas');
fs.mkdirSync(CAPTURAS, { recursive: true });
const ARCHIVO = path.join(SALIDA, 'ui_hechos.json');
const hechos = fs.existsSync(ARCHIVO) ? JSON.parse(fs.readFileSync(ARCHIVO)) : {};
const foto = (p, n) => p.screenshot({ path: path.join(CAPTURAS, n + '.png') });
const limpio = (s) => (s || '').replace(/\s+/g, ' ').trim();
async function companias(ctx, valor) { await ctx.addCookies([{ name: 'cids', value: valor, url: u.URL_BASE }]); }

const pasos = {
  async o21(p, ctx) {
    await companias(ctx, '4');
    await u.irA(p, '/odoo/action-1044'); const m = p.locator('.modal').last();
    hechos.o21_botones = (await m.locator('button').allInnerTexts()).map((x) => x.trim()).filter(Boolean);
    await m.locator('button').filter({ hasText: '5. Reiniciar boletas demo' }).first().click(); await p.waitForTimeout(1000);
    await p.locator('.modal button').filter({ hasText: 'De acuerdo' }).last().click();
    await p.waitForTimeout(8000); await u.esperarCarga(p, 2000).catch(() => {});
    hechos.o21_resultado = limpio(await p.locator('.modal').last().innerText().catch(() => ''));
    await foto(p, 'o21_01_reiniciar_boletas_resultado');
  },
  async c18(p, ctx) {
    await companias(ctx, '4');
    await u.irA(p, '/odoo/action-1005/new'); const f = p.locator('.o_form_view').first();
    await u.muchosAUno(p, f, 'employee_id', 'Trabajador MICRO'); await p.waitForTimeout(2500); await u.esperarCarga(p, 800);
    await u.rangoFechas(p, f, 'date_from', 'date_to', '01/11/2026', '30/11/2026'); await p.waitForTimeout(1500);
    await u.muchosAUno(p, f, 'struct_id', 'CTS'); await p.waitForTimeout(2000);
    hechos.c18_boleta = { nombre: await u.campo(f, 'name').locator('input').inputValue().catch(() => ''), estructura: await u.campo(f, 'struct_id').locator('input').inputValue().catch(() => '') };
    await p.locator('.o_statusbar_buttons button').filter({ hasText: /Calcular hoja/ }).first().click(); await p.waitForTimeout(3000); await u.esperarCarga(p, 1000);
    hechos.c18_boleta.url = p.url();
    hechos.c18_boleta.lineas = (await p.locator('.o_field_widget[name="line_ids"] .o_data_row').allInnerTexts().catch(() => [])).map(limpio);
    await foto(p, 'c18_01_cts_micro_calculada');
    await p.locator('.o_statusbar_buttons button').filter({ hasText: /^\s*(Confirmar|Validar)\s*$/ }).first().click(); await p.waitForTimeout(3000);
    const dlg = p.locator('.modal').last();
    hechos.c18_aviso = limpio(await dlg.innerText().catch(() => ''));
    hechos.c18_botones_aviso = (await dlg.locator('button').allInnerTexts().catch(() => [])).map((x) => x.trim()).filter(Boolean);
    await foto(p, 'c18_02_aviso_boleta_sin_importes');
    await dlg.locator('button').filter({ hasText: 'Eliminar la boleta sin importes' }).first().click(); await p.waitForTimeout(2500);
    hechos.c18_notificacion = (await p.locator('.o_notification').allInnerTexts().catch(() => [])).map(limpio);
    hechos.c18_url_final = p.url();
    await foto(p, 'c18_03_notificacion_eliminada');
  },
  async c23(p, ctx) {
    await companias(ctx, '1');
    await u.irA(p, '/odoo/action-base.action_res_company_form/1');
    await p.locator('.o_notebook .nav-link').filter({ hasText: /Nómina PE - Controles/ }).first().click(); await p.waitForTimeout(800);
    hechos.c23 = limpio(await p.locator('.o_notebook .tab-pane.active').innerText());
    await foto(p, 'c23_01_fm_pago_a_bancos_interbank_cts');
  },
};

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto); await companias(contexto, '1');
  for (const n of process.argv[2].split(',')) {
    try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await foto(pagina, 'error_' + n).catch(() => {}); }
    fs.writeFileSync(ARCHIVO, JSON.stringify(hechos, null, 1));
  }
  await navegador.close();
})();
