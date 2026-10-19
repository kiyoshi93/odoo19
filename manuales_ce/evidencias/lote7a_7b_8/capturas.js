// Lotes 7a, 7b y 8: capturas pedidas (solo lectura; nada se guarda).
const fs = require('fs'); const path = require('path');
const u = require('/home/user/odoo19/manuales_ce/scripts/odoo_ui');
const SALIDA = path.join(__dirname, 'out'); const CAPTURAS = path.join(SALIDA, 'capturas');
fs.mkdirSync(CAPTURAS, { recursive: true });
const ARCHIVO = path.join(SALIDA, 'ui_capturas.json');
const hechos = fs.existsSync(ARCHIVO) ? JSON.parse(fs.readFileSync(ARCHIVO)) : {};
const foto = (p, n) => p.screenshot({ path: path.join(CAPTURAS, n + '.png'), fullPage: false });
const limpio = (s) => (s || '').replace(/\s+/g, ' ').trim();
async function cids(ctx, v) { await ctx.addCookies([{ name: 'cids', value: v, url: u.URL_BASE }]); }
async function informe(p, nombre, id, archivo) { await p.goto(`${u.URL_BASE}/report/html/${nombre}/${id}`, { waitUntil: 'networkidle' }); hechos[archivo] = limpio(await p.locator('body').innerText()).slice(0, 1200); await foto(p, archivo); }
async function pestana(p, re) { const t = p.locator('.o_notebook .nav-link').filter({ hasText: re }); if (await t.count()) { await t.first().click(); await p.waitForTimeout(600); } }

const pasos = {
  async l7a_boleta_aumento(p, c) { await cids(c, '4'); await informe(p, 'solse_pe_payroll_ce.reporte_boleta_pago', 1212, 'l7a_p5_boleta_impresa_aumento_oct2026'); },
  async l7a_tipos(p, c) { await cids(c, '4'); await u.irA(p, '/odoo/action-982'); hechos.l7a_tipos = (await p.locator('.o_data_row').allInnerTexts()).map(limpio); await foto(p, 'l7a_p6_tipos_ausencia_singoce100'); },
  async l7a_estructura(p, c) {
    await cids(c, '4'); await u.irA(p, '/odoo/action-'+(process.env.ACC_EST||'1001')+'/3').catch(() => {});
    const t = await p.locator('.o_form_view').first().innerText().catch(() => ''); hechos.l7a_estructura_nme = limpio(t).slice(0, 600);
    const campo = p.locator('.o_field_widget[name="pe_tipos_ausencia_no_pagada_ids"]'); if (await campo.count()) await campo.first().scrollIntoViewIfNeeded();
    await foto(p, 'l7a_p6_estructura_nme_ausencias_no_pagadas');
  },
  async l7b_liquidacion(p, c) { await cids(c, '4'); await informe(p, 'solse_pe_payroll_ce.reporte_boleta_pago', 1264, 'l7b_p5_liquidacion_abril_70004501'); },
  async l7b_contrato(p, c) {
    await cids(c, '4'); await u.irA(p, '/odoo/action-1009/276');
    for (const t of await p.locator('.o_notebook .nav-link').allInnerTexts()) {
      if (await p.locator('.o_field_widget[name="pe_despido_arbitrario"]').first().isVisible().catch(() => false)) break;
      await pestana(p, new RegExp('^\\s*' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$'));
    }
    const f = p.locator('.o_field_widget[name="pe_despido_arbitrario"]'); if (await f.count()) await f.first().scrollIntoViewIfNeeded();
    hechos.l7b_contrato_campos = { despido: await f.count(), fin_pactado: await p.locator('.o_field_widget[name="pe_fin_pactado"]').count(),
      etiquetas: (await p.locator('.o_form_label').allInnerTexts()).map(limpio).filter((x) => /Despido|pactado|prueba/i.test(x)) };
    await foto(p, 'l7b_p6_contrato_despido_y_fin_pactado');
  },
  async l7b_controles(p, c) {
    await cids(c, '1'); await u.irA(p, '/odoo/action-base.action_res_company_form/1');
    await pestana(p, /Nómina PE - Controles/); hechos.l7b_controles = limpio(await p.locator('.o_notebook .tab-pane.active').innerText());
    await foto(p, 'l7b_p7_controles_fm');
  },
  async l8_boleta(p, c) { await cids(c, '4'); await informe(p, 'solse_pe_payroll_ce.reporte_boleta_pago', 1273, 'l8_p5_boleta_impresa_vidaley_70000561'); },
  async l8_asiento(p, c) {
    await cids(c, '4'); await u.irA(p, '/odoo/action-account.action_move_journal_line/1830');
    hechos.l8_asiento = (await p.locator('.o_field_widget[name="line_ids"] .o_data_row').allInnerTexts()).map(limpio);
    await foto(p, 'l8_p6_asiento_vidaley_70000561');
  },
  async l8_boleta_form(p, c) {
    await cids(c, '4'); await u.irA(p, '/odoo/action-1005/1273');
    hechos.l8_botones = (await p.locator('.o_form_view .o_statusbar_buttons button:visible').allInnerTexts()).map(limpio);
    hechos.l8_por_pagar = limpio(await p.locator('.o_field_widget[name="pe_por_pagar"]').first().innerText().catch(() => ''));
    await foto(p, 'l8_p6_p7_boleta_validada_botones_por_pagar');
  },
  async l8_ficha(p, c) {
    await cids(c, '4'); await u.irA(p, '/odoo/employees/276'); await pestana(p, /^\s*Nómina PE\s*$/);
    const g = p.locator('.o_field_widget[name="pe_boleta_electronica"]'); if (await g.count()) await g.first().scrollIntoViewIfNeeded();
    hechos.l8_ficha = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).match(/ENTREGA DE LA BOLETA.{0,200}/i);
    await foto(p, 'l8_p7_ficha_entrega_de_la_boleta');
  },
  async l8_cts(p, c) { await cids(c, '4'); await informe(p, 'solse_pe_payroll_ce.reporte_constancia_cts', 1186, 'l8_p7_liquidacion_deposito_cts'); },
  async l8_vidaley(p, c) {
    await cids(c, '4'); await u.irA(p, '/odoo/action-1032');
    hechos.l8_vidaley_columnas = await p.locator('.o_list_view thead th').evaluateAll((t) => t.map((x) => x.innerText.trim()).filter(Boolean));
    hechos.l8_vidaley_filas = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await foto(p, 'l8_p8_polizas_vida_ley');
  },
};

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  for (const n of process.argv[2].split(',')) {
    try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await foto(pagina, 'error_' + n).catch(() => {}); }
    fs.writeFileSync(ARCHIVO, JSON.stringify(hechos, null, 1));
  }
  await navegador.close();
})();
