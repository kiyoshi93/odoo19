// Capítulo 12: Recibos por honorarios — configuración (ajustes y retención de 4ta)
const u = require('./odoo_ui');

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);

  // 12.1 Ajustes de Contabilidad: bloque PLAME - Recibos por Honorarios
  await u.irA(pagina, '/odoo/settings#account');
  await pagina.locator('.o_searchview_input, input.o_searchview_input').first().fill('PLAME');
  await pagina.waitForTimeout(1500);
  await u.captura(pagina, 'p12_01_ajustes_plame_rxh', { resaltar: ['.o_setting_box:visible, .o_settings_container:visible'] });

  // 12.2 Impuesto de retención de 4ta categoría
  await u.irA(pagina, '/odoo/action-account.action_tax_form/new');
  const f = pagina.locator('.o_form_view').first();
  await u.escribir(f, 'name', 'Retención Renta 4ta Categoría 8%');
  await u.seleccion(pagina, f, 'type_tax_use', 'Compras');
  await u.escribir(f, 'amount', '-8');
  await pagina.waitForTimeout(600);
  const campos = await f.locator('.o_field_widget[name]').evaluateAll((n) => n.map((x) => x.getAttribute('name')));
  console.log('CAMPOS', campos.join(','));
  if (campos.includes('es_retencion_cuarta')) await u.casilla(f, 'es_retencion_cuarta', true);
  await u.captura(pagina, 'p12_02_impuesto_retencion_4ta', { resaltar: [u.campo(f, 'amount'), u.campo(f, 'type_tax_use'), u.campo(f, 'es_retencion_cuarta')] });
  // Cuenta contable en las líneas de distribución (factura y nota de crédito)
  const pestanas = await pagina.locator('.o_notebook .nav-link').allInnerTexts();
  console.log('PESTAÑAS', pestanas);
  for (const lista of ['invoice_repartition_line_ids', 'refund_repartition_line_ids']) {
    const tabla = u.campo(f, lista);
    if (!(await tabla.count())) continue;
    const filaImpuesto = tabla.locator('.o_data_row').nth(1);
    await filaImpuesto.locator('td[name="account_id"]').click();
    await pagina.waitForTimeout(400);
    await u.muchosAUno(pagina, filaImpuesto, 'account_id', '4017200');
    await tabla.locator('thead').first().click();
  }
  await u.captura(pagina, 'p12_03_impuesto_cuentas', { resaltar: [u.campo(f, 'invoice_repartition_line_ids'), u.campo(f, 'refund_repartition_line_ids')] });
  await u.guardar(pagina);
  console.log('URL', pagina.url());
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
