// Capítulo 8 (cont.): asiento contable del recibo y Boleta de Pago (PE)
const u = require('./odoo_ui');
const ID_RECIBO = process.env.ID_RECIBO || '3';

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  await u.irA(pagina, `/odoo/payslips/${ID_RECIBO}`);
  const f = pagina.locator('.o_form_view').first();

  // Botón Imprimir (genera la Boleta de Pago PE)
  await u.captura(pagina, 'p08c_01_recibo_validado_imprimir', { resaltar: ['.o_form_statusbar button:has-text("Imprimir")'] });

  // Pestaña Otra información: asiento contable
  const botonAsiento = pagina.locator('.oe_stat_button', { hasText: 'Asiento contable' }).first();
  await u.captura(pagina, 'p08c_02_boton_asiento', { resaltar: [botonAsiento, '.o_form_sheet_bg .alert-warning, .o_form_view .alert'] });
  await u.irA(pagina, `/odoo/action-account.action_move_journal_line/${process.env.ID_ASIENTO || '3429'}`);
  await u.captura(pagina, 'p08c_03_asiento_borrador', { resaltar: ['.o_form_statusbar button:has-text("Publicar"), .o_form_statusbar button:has-text("Confirmar")'] });
  const publicar = pagina.locator('.o_form_statusbar button', { hasText: /^\s*(Publicar|Confirmar)\s*$/ }).first();
  if (await publicar.count()) { await publicar.click(); await u.esperarCarga(pagina, 2000); }
  await u.captura(pagina, 'p08c_04_asiento_publicado');

  // Boleta de Pago (PE) en HTML (misma plantilla que el PDF)
  await pagina.goto(`${u.URL_BASE}/report/html/solse_pe_payroll.reporte_boleta_pago/${ID_RECIBO}`, { waitUntil: 'networkidle' });
  await pagina.setViewportSize({ width: 1100, height: 900 });
  await u.captura(pagina, 'p08c_05_boleta_pago_pe', { completa: true });
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
