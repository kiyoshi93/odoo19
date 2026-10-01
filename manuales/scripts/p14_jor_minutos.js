// Capítulo 13 (PLAME): validar el recibo de septiembre de Carlos y generar el PLAME para medir los minutos del .jor
const path = require('path');
const u = require('./odoo_ui');
const CARPETA = process.env.CARPETA_ARCHIVOS || path.join(__dirname, '..', 'archivos');
const ID_RECIBO = process.env.ID_RECIBO || '9';

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  await u.irA(pagina, `/odoo/payslips/${ID_RECIBO}`);
  const validar = pagina.locator('.o_form_statusbar button:visible', { hasText: /^\s*(Validar|Validate)\s*$/ }).first();
  if (await validar.count()) {
    await validar.click();
    await u.esperarCarga(pagina, 2000);
    const dialogo = pagina.locator('.modal:visible');
    if (await dialogo.count()) { await dialogo.locator('button:has-text("De acuerdo")').click(); await u.esperarCarga(pagina, 3000); }
  }
  await u.pestana(pagina, 'Días trabajados');
  await u.captura(pagina, 'p14_01_dias_trabajados_horas', { resaltar: ['.o_notebook .tab-pane.active .o_list_table'] });
  await u.irA(pagina, '/odoo/action-solse_pe_payroll.action_plame_wizard');
  const f = pagina.locator('.modal .o_form_view, .o_form_view').last();
  await u.seleccion(pagina, f, 'mes', 'Setiembre');
  await u.escribir(f, 'anio', '2026');
  await pagina.locator('button:visible', { hasText: 'Generar archivos PLAME' }).first().click();
  await pagina.waitForTimeout(4000);
  await u.captura(pagina, 'p14_02_plame_setiembre', { resaltar: [u.campo(f, 'resumen')] });
  const [zip] = await Promise.all([pagina.waitForEvent('download', { timeout: 60000 }), u.campo(f, 'archivo').locator('a, button').first().click()]);
  await zip.saveAs(path.join(CARPETA, 'plame_setiembre_2026.zip'));
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
