// Capítulos 10 y 11: boleta individual (Lucía, diciembre 2026) y lote de nómina (Héctor, diciembre 2026).
// Las dos boletas se habían calculado por RPC; se borraron y se rehacen desde la interfaz para comparar cifras.
const ui = require('./odoo_ui');

const BOLETAS = '/odoo/action-1005';
const LOTES = '/odoo/action-1007';

async function boton(pagina, texto) {
  await pagina.locator('.o_form_view button, .modal button').filter({ hasText: new RegExp('^\\s*' + texto + '\\s*$') }).first().click();
  await ui.esperarCarga(pagina, 1200);
}

(async () => {
  const { navegador, contexto, pagina } = await ui.abrir();
  await contexto.addCookies([{ name: 'cids', value: '1', url: ui.URL_BASE }]);
  try {
    await ui.asegurarLogin(pagina, contexto);

    // --- 10. Boleta individual ---
    await ui.irA(pagina, `${BOLETAS}/new`);
    let f = pagina.locator('.o_form_view').first();
    await ui.muchosAUno(pagina, f, 'employee_id', 'Lucía Fernanda', 'Lucía Fernanda');
    // El onchange del empleado vuelve a pintar el formulario: esperar a que termine
    await pagina.waitForLoadState('networkidle').catch(() => {});
    await pagina.waitForTimeout(2500);
    await ui.rangoFechas(pagina, f, 'date_from', 'date_to', '01/12/2026', '31/12/2026');
    await pagina.waitForTimeout(1500);
    await ui.pestana(pagina, 'Información contable');
    await ui.muchosAUno(pagina, f, 'journal_id', 'Planillas', 'Planillas');
    await ui.pestana(pagina, 'Días trabajados y entradas');
    await ui.captura(pagina, 'p10_04_boleta_nueva', { resaltar: [ui.campo(f, 'employee_id'), ui.campo(f, 'struct_id'), ui.campo(f, 'worked_days_line_ids')] });
    await ui.guardar(pagina);
    await boton(pagina, 'Calcular hoja');
    await ui.pestana(pagina, 'Cálculo de la nómina');
    await ui.captura(pagina, 'p10_05_boleta_calculada');
    await boton(pagina, 'Confirmar');
    await ui.pestana(pagina, 'Información contable');
    await ui.captura(pagina, 'p10_06_boleta_confirmada', { resaltar: [ui.campo(f, 'move_id'), ui.campo(f, 'journal_id')] });
    console.log('BOLETA', pagina.url());

    // --- 11. Lote de nómina ---
    await ui.irA(pagina, `${LOTES}/new`);
    f = pagina.locator('.o_form_view').first();
    await ui.escribir(f, 'name', 'Planilla diciembre 2026');
    await ui.rangoFechas(pagina, f, 'date_start', 'date_end', '01/12/2026', '31/12/2026');
    await ui.muchosAUno(pagina, f, 'journal_id', 'Planillas', 'Planillas');
    await ui.captura(pagina, 'p11_01_lote_nuevo', { resaltar: [ui.campo(f, 'name'), ui.campo(f, 'journal_id')] });
    await ui.guardar(pagina);
    await boton(pagina, 'Generar nóminas');
    const modal = pagina.locator('.modal').last();
    await modal.waitFor();
    await ui.captura(pagina, 'p11_02_lote_asistente');
    const fila = modal.locator('.o_data_row').filter({ hasText: 'Héctor' });
    if (await fila.count()) {
      await fila.first().locator('input[type="checkbox"]').first().check().catch(async () => { await fila.first().click(); });
    } else {
      // Lista de empleados vacía: agregar al trabajador
      await modal.locator('.o_field_x2many_list_row_add a, button:has-text("Agregar")').first().click();
      const dialogo = pagina.locator('.modal').last();
      await dialogo.locator('input.o_searchview_input, .o_searchview input').first().fill('Héctor');
      await pagina.keyboard.press('Enter');
      await pagina.waitForTimeout(800);
      await dialogo.locator('.o_data_row').first().locator('input[type="checkbox"]').first().check();
      await dialogo.locator('button:has-text("Seleccionar")').first().click();
      await pagina.waitForTimeout(800);
    }
    await ui.captura(pagina, 'p11_03_lote_seleccion');
    await pagina.locator('.modal').last().locator('footer button, .modal-footer button').filter({ hasText: /Generar/ }).first().click();
    await ui.esperarCarga(pagina, 2000);
    await ui.captura(pagina, 'p11_04_lote_generado', { resaltar: [ui.campo(pagina.locator('.o_form_view').first(), 'slip_ids')] });
    console.log('LOTE', pagina.url());
  } finally {
    await navegador.close();
  }
})().catch((error) => { console.error(error); process.exit(1); });
