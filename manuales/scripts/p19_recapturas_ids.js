// Recaptura de las vistas que muestran DNI/RUC tras pasar a identificadores sintéticos
const path = require('path');
const u = require('./odoo_ui');
const CARPETA = process.env.CARPETA_ARCHIVOS || path.join(__dirname, '..', 'archivos');

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  // Planilla de sueldos de julio (PDF)
  await u.irA(pagina, '/odoo/action-solse_pe_payroll.action_planilla_wizard');
  const f = pagina.locator('.modal .o_form_view, .o_form_view').last();
  await u.seleccion(pagina, f, 'mes', 'Julio');
  await u.escribir(f, 'anio', '2026');
  const [pdf] = await Promise.all([pagina.waitForEvent('download', { timeout: 90000 }), pagina.locator('button:visible', { hasText: 'Imprimir PDF' }).first().click()]);
  await pdf.saveAs(path.join(CARPETA, 'planilla_julio_2026.pdf'));
  // Boleta de pago PE de Carlos (julio)
  await pagina.goto(`${u.URL_BASE}/report/html/solse_pe_payroll.reporte_boleta_pago/3`, { waitUntil: 'networkidle' });
  await pagina.setViewportSize({ width: 1100, height: 900 });
  await u.captura(pagina, 'p08c_05_boleta_pago_pe', { completa: true });
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
