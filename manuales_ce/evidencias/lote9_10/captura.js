const path = require('path'); const u = require('/home/user/odoo19/manuales_ce/scripts/odoo_ui');
(async () => {
  const { navegador, contexto, pagina: p } = await u.abrir(); await u.asegurarLogin(p, contexto);
  await contexto.addCookies([{ name: 'cids', value: '4', url: u.URL_BASE }]);
  await u.irA(p, '/odoo/action-1005/1370');
  const t = p.locator('.o_notebook .nav-link').filter({ hasText: /Días trabajados/ }); if (await t.count()) { await t.first().click(); await p.waitForTimeout(600); }
  const l = p.locator('.o_field_widget[name="worked_days_line_ids"]'); await l.scrollIntoViewIfNeeded();
  console.log((await l.locator('.o_data_row').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim()).join('\n'));
  await p.screenshot({ path: path.join(__dirname, 'out', 'capturas', 'l9_p5_dias_trabajados_aumento_oct2026_70000901.png') });
  await navegador.close();
})();
