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
  async tipos_ausencia(p, ctx) {
    await companias(ctx, '4');
    await u.irA(p, '/odoo/action-982');
    hechos.p6_columnas = await p.locator('.o_list_view thead th').evaluateAll((t) => t.map((x) => x.innerText.trim()).filter(Boolean));
    hechos.p6_filas = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    const tog = p.locator('.o_optional_columns_dropdown_toggle').first();
    if (!hechos.p6_columnas.some((c) => /Tabla 21/.test(c)) && await tog.count()) {
      await tog.click(); await p.waitForTimeout(500);
      const op = p.locator('.o-dropdown--menu .dropdown-item, .o-dropdown--menu label').filter({ hasText: /Tabla 21/ });
      hechos.p6_columna_opcional = await op.count();
      if (await op.count()) { await op.first().click(); await p.waitForTimeout(800); }
      await p.keyboard.press('Escape');
      hechos.p6_columnas_tras_activar = await p.locator('.o_list_view thead th').evaluateAll((t) => t.map((x) => x.innerText.trim()).filter(Boolean));
      hechos.p6_filas = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    }
    await foto(p, 'p6_01_tipos_de_ausencia_tabla21');
  },
  async boleta_impresa(p, ctx) {
    await companias(ctx, '4');
    await p.goto(`${u.URL_BASE}/report/html/solse_pe_payroll_ce.reporte_boleta_pago/1005`, { waitUntil: 'networkidle' });
    hechos.p7_texto = limpio(await p.locator('body').innerText()).slice(0, 1500);
    await foto(p, 'p7_01_boleta_impresa_oscar_julio_2026');
  },
  async dias_trabajados(p, ctx) {
    await companias(ctx, '4');
    await u.irA(p, '/odoo/action-1005/1005');
    const t = p.locator('.o_notebook .nav-link').filter({ hasText: /Días trabajados/ }); if (await t.count()) { await t.first().click(); await p.waitForTimeout(600); }
    const lista = p.locator('.o_field_widget[name="worked_days_line_ids"]');
    hechos.p8_columnas = await lista.locator('thead th').evaluateAll((t) => t.map((x) => x.innerText.trim()).filter(Boolean));
    hechos.p8_filas = await lista.locator('.o_data_row').evaluateAll((rs) => rs.map((r) => ({ texto: r.innerText.replace(/\s+/g, ' ').trim(),
      casillas: [...r.querySelectorAll('input[type=checkbox]')].map((c) => c.checked) })));
    await lista.scrollIntoViewIfNeeded();
    await foto(p, 'p8_01_dias_trabajados_pagado');
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
