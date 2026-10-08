// Capítulo 4: registrar vigencias en Parámetros de Nómina PE (Nómina > Configuración > Parámetros de Nómina PE).
// Valores de prueba (verificar en SBS / MTPE antes de usarlos en producción).
const ui = require('./odoo_ui');

const ACCION = '/odoo/action-solse_pe_payroll_base.rule_parameter_pe_action';
const VIGENCIAS = [
  // [id del parámetro, vigente desde, valor, nombre de captura o null]
  [2, '01/10/2026', '1230', 'p04_02_rmv_nueva_vigencia'],
  [3, '01/10/2026', '123.0', null],
  [8, '01/01/2025', "{'habitat': 0.0147, 'integra': 0.0155, 'prima': 0.0160, 'profuturo': 0.0169}", null],
  [7, '01/01/2025', '12184.88', null],
  [7, '01/01/2026', '12209.11', null],
  [7, '01/10/2026', '12732.70', 'p04_03_rma_vigencias'],
];

(async () => {
  const { navegador, contexto, pagina } = await ui.abrir();
  try {
    await ui.asegurarLogin(pagina, contexto);
    await ui.irA(pagina, ACCION);
    await ui.captura(pagina, 'p04_01_parametros_lista');
    for (const [id, desde, valor, nombreCaptura] of VIGENCIAS) {
      await ui.irA(pagina, `${ACCION}/${id}`);
      const f = pagina.locator('.o_form_view').first();
      await ui.pestana(pagina, 'Vigencias');
      const lista = ui.campo(f, 'parameter_version_ids');
      await lista.locator('.o_field_x2many_list_row_add a').first().click();
      await pagina.waitForTimeout(700);
      const fila = lista.locator('.o_data_row.o_selected_row');
      const entradaFecha = ui.campo(fila, 'date_from').locator('input').first();
      await entradaFecha.waitFor({ state: 'visible', timeout: 15000 });
      await entradaFecha.click();
      await entradaFecha.fill(desde);
      await entradaFecha.press('Escape').catch(() => {});
      await ui.escribir(fila, 'parameter_value', valor);
      await lista.locator('thead').click();
      await pagina.waitForTimeout(500);
      await ui.guardar(pagina);
      if (nombreCaptura) await ui.captura(pagina, nombreCaptura, { resaltar: [lista] });
      console.log('vigencia', id, desde, valor);
    }
  } finally {
    await navegador.close();
  }
})().catch((error) => { console.error(error); process.exit(1); });
