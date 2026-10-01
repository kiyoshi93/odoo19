// Capítulo 6: Seguros y EPS — crear un plan EPS
const u = require('./odoo_ui');

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  await u.irA(pagina, '/odoo/action-solse_pe_payroll.eps_management_action');
  await u.captura(pagina, 'p06_01_planes_eps_lista', { resaltar: ['.o_list_button_add, button.o-kanban-button-new'] });
  await pagina.locator('.o_list_button_add, button.o-kanban-button-new').first().click();
  await u.esperarCarga(pagina, 800);
  const formulario = pagina.locator('.o_form_view').first();
  await u.escribir(formulario, 'entity', 'PACIFICO EPS');
  await u.escribir(formulario, 'insurance', 'POL-2025-001');
  await u.fecha(formulario, 'star_date', '01/01/2025');
  await u.fecha(formulario, 'finish_date', '31/12/2026');
  await u.escribir(formulario, 'rate_employer', '0.045');
  await u.escribir(formulario, 'rate_worker', '0.02');
  await u.captura(pagina, 'p06_02_plan_eps_formulario', { resaltar: ['.o_form_sheet'] });
  await u.guardar(pagina);
  await u.captura(pagina, 'p06_03_plan_eps_guardado');
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
