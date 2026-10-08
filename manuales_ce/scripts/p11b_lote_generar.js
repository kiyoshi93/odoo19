// Capítulo 11 (continuación): generar las boletas del lote, calcular y marcar como hecho.
// Uso: node p11b_lote_generar.js <id del lote>
const ui = require('./odoo_ui');
(async () => {
  const idLote = process.argv[2];
  const { navegador, contexto, pagina } = await ui.abrir();
  await contexto.addCookies([{ name: 'cids', value: '1', url: ui.URL_BASE }]);
  try {
    await ui.asegurarLogin(pagina, contexto);
    await ui.irA(pagina, `/odoo/action-1007/${idLote}`);
    await pagina.locator('.o_form_view button').filter({ hasText: 'Generar nóminas' }).first().click();
    const modal = pagina.locator('.modal').last();
    await modal.waitFor();
    await ui.captura(pagina, 'p11_02_lote_asistente');
    if (!(await modal.locator('.o_data_row').filter({ hasText: 'Héctor' }).count())) {
      // El asistente abre sin empleados: se agregan con «Agregar una línea»
      await modal.locator('.o_field_x2many_list_row_add a').first().click();
      const dialogo = pagina.locator('.modal').last();
      await dialogo.locator('.o_searchview input').first().waitFor();
      await dialogo.locator('.o_searchview input').first().fill('Héctor');
      await pagina.keyboard.press('Enter');
      await pagina.waitForTimeout(1000);
      await dialogo.locator('.o_data_row').first().locator('input[type="checkbox"]').first().check();
      await dialogo.locator('button').filter({ hasText: /^\s*Seleccionar\s*$/ }).first().click();
      await pagina.waitForTimeout(1000);
    }
    await ui.captura(pagina, 'p11_03_lote_seleccion');
    await modal.locator('button').filter({ hasText: /^\s*Generar\s*$/ }).first().click();
    await ui.esperarCarga(pagina, 2500);
    const f = pagina.locator('.o_form_view').first();
    await ui.captura(pagina, 'p11_04_lote_generado', { resaltar: [ui.campo(f, 'slip_ids')] });
    await pagina.locator('.o_form_view button').filter({ hasText: /Marcar como/ }).first().click();
    await ui.esperarCarga(pagina, 2500);
    await ui.captura(pagina, 'p11_05_lote_hecho', { resaltar: ['.o_statusbar_status'] });
  } finally {
    await navegador.close();
  }
})().catch((error) => { console.error(error); process.exit(1); });
