const fs = require('fs'); const path = require('path'); const u = require('/home/user/odoo19/manuales_ce/scripts/odoo_ui');
const OUT = path.join(__dirname, 'out'); const h = {};
const foto = (p, n) => p.screenshot({ path: path.join(OUT, 'capturas', n + '.png') });
const limpio = (s) => (s || '').replace(/\s+/g, ' ').trim();
(async () => {
  const { navegador, contexto, pagina: p } = await u.abrir(); await u.asegurarLogin(p, contexto);
  await contexto.addCookies([{ name: 'cids', value: '4', url: u.URL_BASE }]);
  // Ficha: pestaña Nómina PE
  await u.irA(p, '/odoo/employees/393');
  await p.locator('.o_notebook .nav-link').filter({ hasText: /^\s*Nómina PE\s*$/ }).first().click(); await p.waitForTimeout(800);
  const txt = limpio(await p.locator('.o_notebook .tab-pane.active').innerText());
  h.ficha_grupos = ['IDENTIFICACIÓN T-REGISTRO', 'DOMICILIO PARA EL T-REGISTRO', 'ESTUDIOS SUPERIORES (T-REGISTRO)'].map((g) => [g, txt.toUpperCase().includes(g)]);
  h.ficha_tipo_documento = /Tipo de documento/i.test(txt);
  await foto(p, 'l10_p7_ficha_nomina_pe_1');
  const dom = p.locator('.o_notebook .tab-pane.active .o_horizontal_separator, .o_notebook .tab-pane.active .o_form_label').filter({ hasText: /Domicilio para el T-Registro|DOMICILIO PARA EL T-REGISTRO/i });
  if (await dom.count()) { await dom.first().scrollIntoViewIfNeeded(); await foto(p, 'l10_p7_ficha_nomina_pe_2_domicilio'); }
  const est = p.locator('.o_notebook .tab-pane.active .o_horizontal_separator').filter({ hasText: /Estudios superiores/i });
  if (await est.count()) { await est.first().scrollIntoViewIfNeeded(); await foto(p, 'l10_p7_ficha_nomina_pe_3_estudios'); }
  // Contrato
  await u.irA(p, '/odoo/action-1009/416');
  const f = p.locator('.o_form_view').first();
  h.contrato = { t8: await f.locator('.o_field_widget[name="pe_tipo_trabajador"]').count(), t24: await f.locator('.o_field_widget[name="pe_categoria_ocupacional"]').count(),
    etiquetas: (await f.locator('.o_form_label').allInnerTexts()).map(limpio).filter((x) => /T8|T24/.test(x)) };
  const c8 = f.locator('.o_field_widget[name="pe_tipo_trabajador"]'); if (await c8.count()) await c8.first().scrollIntoViewIfNeeded();
  await foto(p, 'l10_p7_contrato_t8_t24');
  // Maestros
  for (const [n, a] of [['T28', 1097], ['T34', 1096]]) { await u.irA(p, '/odoo/action-' + a); h['maestro_' + n] = await p.locator('.o_pager_counter, .o_pager_limit').first().innerText().catch(() => ''); await foto(p, 'l10_p7_maestro_' + n); }
  fs.writeFileSync(path.join(OUT, 'ui_capturas.json'), JSON.stringify(h, null, 1)); console.log(JSON.stringify(h, null, 1));
  await navegador.close();
})();
