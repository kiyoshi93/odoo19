// Capítulo 10: periodo (lote) de nómina — gratificación y mensual de julio 2026 para varios trabajadores
const u = require('./odoo_ui');
const ESTRUCTURA = process.env.ESTRUCTURA || 'Gratificaciones';
const PREFIJO = process.env.PREFIJO || 'p10a';
const EXCLUIR = (process.env.EXCLUIR || 'Carlos Alberto').split(',');

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  await u.irA(pagina, '/odoo/action-1445');
  await u.captura(pagina, `${PREFIJO}_01_periodos_nomina`, { resaltar: ['.o_control_panel_main_buttons button:has-text("Nuevo")'] });
  await pagina.locator('.o_control_panel_main_buttons button:has-text("Nuevo")').first().click();
  const d = pagina.locator('.modal .o_form_view').last();
  await d.waitFor(); await pagina.waitForTimeout(800);
  await u.muchosAUno(pagina, d, 'structure_id', ESTRUCTURA, ESTRUCTURA);
  await u.fecha(d, 'date_start', '01/07/2026');
  await u.fecha(d, 'date_end', '31/07/2026');
  await pagina.locator('.modal-title').last().click();
  await pagina.waitForTimeout(800);
  await u.captura(pagina, `${PREFIJO}_02_nuevo_periodo`, { resaltar: [u.campo(d, 'structure_id'), u.campo(d, 'date_start'), u.campo(d, 'date_end')] });
  await pagina.locator('.modal-footer button:visible', { hasText: 'Siguiente' }).last().click();
  await pagina.waitForTimeout(2500);
  const modal = pagina.locator('.modal:visible').last();
  // Paso 2: seleccionar empleados (excluir los que ya tienen recibo del periodo)
  const filas = modal.locator('.o_data_row');
  for (let i = 0; i < await filas.count(); i++) {
    const texto = await filas.nth(i).innerText();
    if (!EXCLUIR.some((x) => x && texto.includes(x))) await filas.nth(i).locator('.o_list_record_selector input').check();
  }
  await u.captura(pagina, `${PREFIJO}_03_seleccionar_empleados`, { resaltar: [modal.locator('.modal-footer button:has-text("Seleccionar")')] });
  await modal.locator('.modal-footer button:has-text("Seleccionar")').click();
  await u.esperarCarga(pagina, 3000);
  await u.captura(pagina, `${PREFIJO}_04_periodo_creado`);
  console.log('URL', pagina.url());
  console.log('BOTONES', await pagina.locator('.o_form_statusbar button:visible, .o_control_panel button:visible').allInnerTexts());
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
