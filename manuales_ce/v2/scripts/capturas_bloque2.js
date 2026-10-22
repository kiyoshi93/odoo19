// Manual v2, bloque 2 (capítulos 10 a 18 y 20). Lectura en FM SYSTEMS (boletas validadas del recorrido)
// y en SOLSE Demo (casos). Escenarios que escriben, SOLO en SOLSE Demo: lote de enero de 2027 y boleta
// con entradas; se borran después por RPC (limpiar_bloque2.py). En FM no se guarda nada.
const fs = require('fs'); const path = require('path');
const u = require('../../scripts/odoo_ui');
const HECHOS = path.join(__dirname, '..', 'medidas', 'ui_bloque2.json');
const hechos = fs.existsSync(HECHOS) ? JSON.parse(fs.readFileSync(HECHOS)) : {};
const limpio = (s) => (s || '').replace(/\s+/g, ' ').trim();
async function cia(ctx, v) { await ctx.addCookies([{ name: 'cids', value: String(v), url: u.URL_BASE }]); }
const cap = (p, n, o = {}) => u.captura(p, n, o);
async function tab(p, t) {
  const l = p.locator('.o_notebook .nav-link').filter({ hasText: new RegExp('^\\s*' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$') });
  if (await l.count()) { await l.first().click(); await p.waitForTimeout(700); return true; } return false;
}
async function texto(p) { return limpio(await p.locator('.o_notebook .tab-pane.active').innerText().catch(() => '')); }
async function boleta(p, c, compania, id, prefijo, pestanas = ['Días trabajados y entradas', 'Cálculo de la nómina']) {
  await cia(c, compania); await u.irA(p, '/odoo/action-1005/' + id);
  hechos[prefijo + '_botones'] = (await p.locator('.o_form_view .o_statusbar_buttons button:visible').allInnerTexts()).map(limpio);
  for (const [i, t] of pestanas.entries()) {
    if (!(await tab(p, t))) continue;
    hechos[prefijo + '_' + i] = (await texto(p)).slice(0, 4000);
    const alto = t === 'Cálculo de la nómina' ? 2600 : null;
    if (alto) { await p.setViewportSize({ width: 1600, height: alto }); await p.waitForTimeout(800); }
    await cap(p, prefijo + '_' + ['dias', 'calculo', 'contable', 'asistencias'][['Días trabajados y entradas', 'Cálculo de la nómina', 'Información contable', 'Asistencias'].indexOf(t)]);
    if (alto) { await p.setViewportSize({ width: 1600, height: Number(process.env.ALTO || 900) }); await p.waitForTimeout(300); }
  }
}
async function informe(p, c, compania, reporte, id, nombre) {
  await cia(c, compania); await p.goto(`${u.URL_BASE}/report/html/${reporte}/${id}`, { waitUntil: 'networkidle' });
  hechos[nombre] = limpio(await p.locator('body').innerText()).slice(0, 2500);
  await cap(p, nombre, { completa: true });
}
async function descartar(p) {
  const b = p.locator('.o_form_button_cancel').first();
  if (await b.isVisible().catch(() => false)) { await b.click(); await p.waitForTimeout(800); }
}

const pasos = {
  // ---------------------------------------------------------------- 10
  async c10_boleta(p, c) {
    await boleta(p, c, 4, 1808, 'c10_01', ['Días trabajados y entradas', 'Cálculo de la nómina', 'Información contable']);
    await informe(p, c, 4, 'solse_pe_payroll_ce.reporte_boleta_pago', 1808, 'c10_02_boleta_impresa');
    await cia(c, 4); await u.irA(p, '/odoo/action-account.action_move_journal_line/2408');
    hechos.c10_asiento = (await p.locator('.o_field_widget[name="line_ids"] .o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c10_03_asiento');
  },
  async c10_nueva(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/action-1005/new'); const f = p.locator('.o_form_view').first();
    await u.muchosAUno(p, f, 'employee_id', 'Trabajadora BOLETA'); await p.waitForTimeout(2000); await u.esperarCarga(p, 800);
    await u.rangoFechas(p, f, 'date_from', 'date_to', '01/12/2026', '31/12/2026'); await p.waitForTimeout(2500);
    hechos.c10_nueva = limpio(await f.innerText()).slice(0, 1500);
    await cap(p, 'c10_04_boleta_nueva');
    await descartar(p); await p.locator('.modal button').filter({ hasText: /Descartar/ }).first().click().catch(() => {});
  },
  async c10_sin_importes(p, c) {
    // C-18: la CTS en cero del trabajador MICRO (borrador del caso). Se muestra el aviso y se cierra SIN eliminar.
    await cia(c, 4); await u.irA(p, '/odoo/action-1005/1821');
    await p.locator('.o_statusbar_buttons button').filter({ hasText: /^\s*(Confirmar|Validar)\s*$/ }).first().click(); await p.waitForTimeout(3000);
    const m = p.locator('.modal').last();
    hechos.c10_sin_importes = limpio(await m.innerText().catch(() => ''));
    hechos.c10_sin_importes_botones = (await m.locator('button').allInnerTexts().catch(() => [])).map(limpio);
    await cap(p, 'c10_05_boleta_sin_importes');
    await m.locator('button').filter({ hasText: /^\s*(Cerrar|Cancelar|Descartar)\s*$/ }).first().click().catch(async () => { await p.keyboard.press('Escape'); });
    await p.waitForTimeout(800);
  },
  // ---------------------------------------------------------------- 11
  async c11_lote_fm(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1007');
    await cap(p, 'c11_01_lotes');
    await u.irA(p, '/odoo/action-1007/1');
    hechos.c11_lote_botones = (await p.locator('.o_form_view .o_statusbar_buttons button:visible, .o_form_view .oe_button_box button:visible').allInnerTexts()).map(limpio);
    hechos.c11_lote = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 1500);
    await cap(p, 'c11_02_lote_diciembre_fm');
  },
  async c11_lote_nuevo(p, c) {
    // Escenario en SOLSE Demo: lote de noviembre de 2026 con el trabajador sintético 70009001 (se borra después)
    await cia(c, 4); await u.irA(p, '/odoo/action-1007/new'); const f = p.locator('.o_form_view').first();
    await u.escribir(f, 'name', 'Planilla noviembre 2026 (manual v2)');
    await u.rangoFechas(p, f, 'date_start', 'date_end', '01/11/2026', '30/11/2026').catch(() => {});
    hechos.c11_nuevo = limpio(await f.innerText()).slice(0, 800);
    await cap(p, 'c11_03_lote_nuevo');
    await u.guardar(p);
    hechos.c11_url = p.url();
    await p.locator('.o_statusbar_buttons button').filter({ hasText: /Generar nóminas/ }).first().click(); await p.waitForTimeout(2000);
    let m = p.locator('.modal').last();
    hechos.c11_asistente = limpio(await m.innerText().catch(() => '')).slice(0, 800);
    await m.locator('.o_field_x2many_list_row_add a').first().click(); await p.waitForTimeout(1500);
    const sel = p.locator('.modal').last();
    await sel.locator('.o_searchview_input').fill('HORAS EXTRA'); await p.keyboard.press('Enter'); await p.waitForTimeout(1500);
    await sel.locator('.o_data_row').filter({ hasText: 'HORAS EXTRA' }).first().click(); await p.waitForTimeout(1500);
    m = p.locator('.modal').last();
    await cap(p, 'c11_04_generar_nominas');
    await m.locator('button').filter({ hasText: /^\s*Generar\s*$/ }).first().click(); await p.waitForTimeout(5000); await u.esperarCarga(p, 1500);
    hechos.c11_generado = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 1500);
    await cap(p, 'c11_05_lote_generado');
  },
  // ---------------------------------------------------------------- 12
  async c12_aportes(p, c) {
    await boleta(p, c, 4, 1781, 'c12_01_carlos', ['Cálculo de la nómina']);
    await boleta(p, c, 4, 1785, 'c12_02_ana', ['Cálculo de la nómina']);
    await boleta(p, c, 4, 1779, 'c12_03_nilda_vac', ['Cálculo de la nómina']);
    await boleta(p, c, 4, 1905, 'c12_04_vidaley', ['Cálculo de la nómina']);
  },
  // ---------------------------------------------------------------- 13
  async c13_renta(p, c) {
    await boleta(p, c, 1, 84, 'c13_01_lucia_ene2025', ['Cálculo de la nómina']);
    await boleta(p, c, 4, 1896, 'c13_02_cese_devolucion', ['Cálculo de la nómina']);
  },
  async c13_lucia(p, c) {
    // Solo la boleta de FM (recaptura tras regenerar las 64 boletas de FM, 22/10/2026)
    await boleta(p, c, 1, 84, 'c13_01_lucia_ene2025', ['Cálculo de la nómina']);
  },
  async c13_certificado(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1093');
    const m = p.locator('.modal').last();
    hechos.c13_cert = limpio(await m.innerText().catch(() => ''));
    await cap(p, 'c13_03_certificado_asistente');
  },
  // ---------------------------------------------------------------- 14, 15
  async c13_cert_pdf(p, c) {
    await informe(p, c, 1, 'solse_pe_payroll_ce.reporte_certificado_renta5', 27, 'c13_04_certificado_renta5_lucia_2025');
  },
  async c20_crear_boleta(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/action-1005/new'); const f = p.locator('.o_form_view').first();
    await u.muchosAUno(p, f, 'employee_id', 'HORAS EXTRA'); await p.waitForTimeout(2000); await u.esperarCarga(p, 800);
    await u.rangoFechas(p, f, 'date_from', 'date_to', '01/10/2026', '31/10/2026'); await p.waitForTimeout(2500);
    await u.guardar(p); hechos.c20_url = p.url();
  },
  async c14_grati(p, c) {
    await boleta(p, c, 1, 129, 'c14_01_lucia_grati_jul2026', ['Cálculo de la nómina']);
  },
  async c15_cts(p, c) {
    await boleta(p, c, 1, 140, 'c15_01_lucia_cts_nov2026', ['Cálculo de la nómina']);
    await informe(p, c, 1, 'solse_pe_payroll_ce.reporte_constancia_cts', 140, 'c15_02_liquidacion_deposito_cts');
  },
  // ---------------------------------------------------------------- 16
  async c16_liquidacion(p, c) {
    await boleta(p, c, 4, 1800, 'c16_01_carmen_liquidacion', ['Cálculo de la nómina']);
    await boleta(p, c, 4, 1897, 'c16_02_indemnizacion', ['Cálculo de la nómina']);
    await cia(c, 4); await u.irA(p, '/odoo/action-1009/541');
    const f = p.locator('.o_field_widget[name="pe_despido_arbitrario"]').first(); await f.scrollIntoViewIfNeeded().catch(() => {});
    hechos.c16_contrato = limpio(await p.locator('.o_notebook .tab-pane.active').innerText().catch(() => '')).slice(0, 1500);
    await cap(p, 'c16_03_contrato_despido', { resaltar: ['.o_field_widget[name="pe_despido_arbitrario"]', '.o_field_widget[name="pe_fin_pactado"]'] });
  },
  // ---------------------------------------------------------------- 17
  async c17_vacaciones(p, c) {
    await boleta(p, c, 1, 116, 'c17_01_lucia_vac_feb2026', ['Días trabajados y entradas', 'Cálculo de la nómina']);
    await boleta(p, c, 1, 117, 'c17_02_lucia_nme_feb2026', ['Días trabajados y entradas', 'Cálculo de la nómina']);
    await cia(c, 1); await u.irA(p, '/odoo/action-986?view_type=list');
    for (let i = 0; i < 4 && await p.locator('.o_searchview_facet').count(); i++) { await p.locator('.o_searchview_facet .o_facet_remove').first().click(); await u.esperarCarga(p, 800); }
    await u.esperarCarga(p, 1000);
    hechos.c17_asignaciones = (await p.locator('.o_data_row').allInnerTexts()).map(limpio).slice(0, 10);
    await cap(p, 'c17_03_asignaciones');
    await u.irA(p, '/odoo/action-979?view_type=list');
    for (let i = 0; i < 3; i++) await p.locator('.o_searchview_facet .o_facet_remove').first().click().catch(() => {});
    await u.esperarCarga(p, 1000);
    hechos.c17_ausencias = (await p.locator('.o_data_row').allInnerTexts()).map(limpio).slice(0, 10);
    await cap(p, 'c17_04_ausencias');
    await u.irA(p, '/odoo/action-982');
    hechos.c17_tipos = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c17_05_tipos_ausencia_tabla21');
  },
  // ---------------------------------------------------------------- 18
  async c17_oscar(p, c) {
    await boleta(p, c, 4, 1780, 'c17_06_oscar_vac_jul2026', ['Días trabajados y entradas']);
    await boleta(p, c, 4, 1790, 'c17_07_oscar_nme_jul2026', ['Días trabajados y entradas', 'Cálculo de la nómina']);
  },
  async c18_feriados(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-975');
    hechos.c18_feriados = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c18_01_dias_festivos');
    await cia(c, 4); await u.irA(p, '/odoo/action-1005');
    hechos.c18_banda_solse = limpio(await p.locator('.o_pe_alertas_nomina').first().innerText().catch(() => ''));
    await cap(p, 'c18_02_banda_sin_feriados', { resaltar: ['.o_pe_alertas_nomina'] });
  },
  // ---------------------------------------------------------------- 20
  async c20_entradas(p, c) {
    await boleta(p, c, 4, process.env.BOLETA_C20, 'c20_02_entradas', ['Días trabajados y entradas', 'Cálculo de la nómina']);
    const e = p.locator('.o_field_widget[name="input_line_ids"]').first();
    await tab(p, 'Días trabajados y entradas'); if (await e.count()) { await e.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await cap(p, 'c20_02_entradas_lista'); }
  },
  async c20_utilidades(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1043');
    hechos.c20_util = limpio(await p.locator('.modal').last().innerText().catch(() => ''));
    await cap(p, 'c20_01_reparto_utilidades');
    await p.keyboard.press('Escape');
  },
};

(async () => {
  const { navegador, contexto, pagina } = await u.abrir({ ancho: 1600, alto: Number(process.env.ALTO || 900) });
  await u.asegurarLogin(pagina, contexto);
  for (const n of process.argv[2].split(',')) {
    try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await u.captura(pagina, 'error_' + n).catch(() => {}); }
    fs.writeFileSync(HECHOS, JSON.stringify(hechos, null, 1));
  }
  await navegador.close();
})();
