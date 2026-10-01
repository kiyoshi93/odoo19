// Capítulo 1-2: menú de Nómina PE y configuración de la compañía
const { abrir, asegurarLogin, irA, captura, esperarCarga } = require('./odoo_ui');

(async () => {
  const { navegador, contexto, pagina } = await abrir();
  await asegurarLogin(pagina, contexto);

  // 1.1 Tablero de Nómina
  await irA(pagina, '/odoo/payroll');
  await captura(pagina, 'p01_01_tablero_nomina', { resaltar: ['.o_menu_brand'] });

  // 1.2 Menú Nómina PE desplegado
  await pagina.locator('.o_menu_sections button:has-text("Nómina PE")').click();
  await pagina.waitForTimeout(800);
  await captura(pagina, 'p01_02_menu_nomina_pe', { resaltar: ['.o-dropdown--menu'] });
  await pagina.keyboard.press('Escape');

  // 2.1 Ficha de la compañía: Afecta a SENATI
  await irA(pagina, '/odoo/action-base.action_res_company_form/1');
  const senati = pagina.locator('div[name="afecto_senati"]');
  await captura(pagina, 'p02_01_compania_senati', { resaltar: [senati] });
  const casilla = senati.locator('input[type="checkbox"]');
  if (!(await casilla.isChecked())) await casilla.check();
  await captura(pagina, 'p02_02_compania_senati_marcado', { resaltar: [senati] });

  // 2.2 Pestaña Nómina PE - Asistencias
  await pagina.locator('.o_notebook .nav-link:has-text("Asistencias")').first().click();
  await pagina.waitForTimeout(800);
  await captura(pagina, 'p02_03_compania_asistencias', { resaltar: ['.o_notebook .tab-pane.active'] });

  // Guardar
  const guardar = pagina.locator('.o_form_button_save');
  if (await guardar.isVisible()) { await guardar.click(); await esperarCarga(pagina, 1000); }
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
