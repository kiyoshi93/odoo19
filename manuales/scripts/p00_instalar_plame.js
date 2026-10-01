// Paso 0: instalar los módulos PLAME RxH y PLAME 4ta (Enterprise) desde Aplicaciones
const { abrir, asegurarLogin, irA, captura, esperarCarga } = require('./odoo_ui');

(async () => {
  const { navegador, contexto, pagina } = await abrir();
  await asegurarLogin(pagina, contexto);
  await irA(pagina, '/odoo/action-base.open_module_tree');
  // Quitar el filtro "Aplicaciones" para ver también los módulos técnicos
  const quitarFiltro = pagina.locator('.o_searchview_facet .o_facet_remove');
  while (await quitarFiltro.count()) { await quitarFiltro.first().click(); await pagina.waitForTimeout(600); }
  await pagina.fill('.o_searchview_input', 'solse_pe_plame');
  await pagina.keyboard.press('Enter');
  await esperarCarga(pagina, 1500);
  await pagina.locator('.o_kanban_record', { hasText: 'PLAME' }).first().waitFor();
  await captura(pagina, 'p00_01_aplicaciones_buscar_plame', { resaltar: ['.o_searchview'] });
  const tarjeta = pagina.locator('.o_kanban_record').filter({ hasText: /PLAME 4ta\s+Categor.a\s+\(Enterprise\)/ });
  await captura(pagina, 'p00_02_activar_plame_4ta_ee', { resaltar: [tarjeta.locator('button:has-text("Activar")')] });
  await tarjeta.locator('button:has-text("Activar")').click();
  // La instalación recarga el cliente web
  await pagina.waitForTimeout(8000);
  await captura(pagina, 'p00_99_tras_activar');
  const dialogo = pagina.locator('.modal-dialog, .o_error_dialog');
  if (await dialogo.count()) console.log('DIALOGO:', (await dialogo.first().innerText()).slice(0, 3000));
  await esperarCarga(pagina, 3000);
  await irA(pagina, '/odoo/action-base.open_module_tree');
  const quitar = pagina.locator('.o_searchview_facet .o_facet_remove');
  while (await quitar.count()) { await quitar.first().click(); await pagina.waitForTimeout(600); }
  await pagina.fill('.o_searchview_input', 'solse_pe_plame');
  await pagina.keyboard.press('Enter');
  await esperarCarga(pagina, 1500);
  await captura(pagina, 'p00_03_plame_instalados');
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
