// Manual v3, capturas del grupo g4_beneficios (capítulos 13, 15 y 20). Solo lee: abre boletas, informes y el asistente
// del reparto de utilidades (que se cancela sin calcular). Los registros se buscan por DNI sintético y fecha.
// Uso: source entorno.sh; SESION_FILE=… NODE_PATH=$NPM_G node capturas_g4_beneficios.js c13,c15,c20
const fs = require('fs'); const path = require('path');
const u = require('../../scripts/odoo_ui');
const { cap, cia, tab, alta, limpio, informe } = require('./capturas_bloque3');
const { rpc, idBoleta, hechos } = require('./capturas_v3');
const HECHOS = path.join(__dirname, '..', 'medidas', 'ui_g4_beneficios.json');
const ACC = { boletas: 1005 };
const CAP = (n) => path.join(process.env.CAPTURAS_DIR, `${n}.png`);

async function recortarForm(nombre, ancho = 1040) {
  require('child_process').execSync(`python3 -c "
from PIL import Image
r='${CAP(nombre)}'; im=Image.open(r); im.crop((0,0,min(${ancho},im.width),im.height)).save(r)"`);
  require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${CAP(nombre)}`);
}
// Una pestaña de la boleta, con la ventana alta y recortada al formulario
async function boletaPestana(p, c, compania, id, pestana, nombre, { resaltar = [], ancho = 1040 } = {}) {
  await cia(c, compania); await u.irA(p, `/odoo/action-${ACC.boletas}/${id}`);
  if (!(await tab(p, pestana))) throw new Error(`no hay pestaña ${pestana}`);
  await p.waitForTimeout(800);
  hechos[nombre] = limpio(await p.locator('.o_notebook .tab-pane.active').innerText().catch(() => '')).slice(0, 3000);
  const marcas = resaltar.map((r) => (typeof r === 'string' && r.startsWith('fila:'))
    ? p.locator('.o_notebook .tab-pane.active .o_data_row').filter({ hasText: r.slice(5) }).first() : r);
  await alta(p, () => cap(p, nombre, { resaltar: marcas }));
  await recortarForm(nombre, ancho);
}
// Tapa con un rectángulo gris (en la página, antes de capturar) el texto que coincide con los patrones
async function tapar(p, patrones) {
  return p.evaluate((fuentes) => {
    const res = fuentes.map((f) => new RegExp(f, 'g')); let n = 0;
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); const nodos = [];
    while (w.nextNode()) nodos.push(w.currentNode);
    for (const t of nodos) {
      let html = null; const s = t.nodeValue;
      for (const re of res) { re.lastIndex = 0; if (re.test(s)) { html = (html ?? s.replace(/&/g, '&amp;').replace(/</g, '&lt;')); re.lastIndex = 0; html = html.replace(re, (m) => { n += 1; return `<span style="background:#9a9a9a;color:#9a9a9a">${m}</span>`; }); } }
      if (html !== null) { const sp = document.createElement('span'); sp.innerHTML = html; t.parentNode.replaceChild(sp, t); }
    }
    return n;
  }, patrones);
}
async function informeTapado(p, c, compania, reporte, id, nombre, patrones) {
  // primero el formulario en la compañía, para que el cliente web deje la compañía activa (si no, el informe da 403)
  await cia(c, compania); await u.irA(p, `/odoo/action-${ACC.boletas}/${id}`).catch(() => {});
  if (reporte.includes('certificado')) await u.irA(p, `/odoo/employees/${id}`).catch(() => {});
  await cia(c, compania); await p.goto(`${u.URL_BASE}/report/html/${reporte}/${id}`, { waitUntil: 'networkidle' });
  hechos[nombre] = limpio(await p.locator('body').innerText()).slice(0, 3000);
  if (patrones.length) hechos[nombre + '_tapados'] = await tapar(p, patrones);
  await cap(p, nombre, { completa: true });
}
// FM SYSTEMS: RUC, domicilio y cuentas bancarias (números de 10 o más dígitos que no sean el DNI sintético)
const FM = ['20614285525', 'MZ\\. ?11[^,;)]*?(Lambayeque|LAMBAYEQUE)', 'MZ\\. ?11 LT\\. ?4[^,;)]*', '\\b(?!9999)\\d[\\d-]{9,}\\d\\b'];

const pasos = {
  // ---------------------------------------------------------------- 13 · renta de 5.ª
  async c13(p, c) {
    await boletaPestana(p, c, 4, await idBoleta(p, 4, '41236547', '2026-07-01', 'Mensual'), 'Renta de 5ta', 'c13_05_renta5_detalle_maria_jul2026',
      { resaltar: ['.o_field_widget[name="pe_r5_renta_neta"]', '.o_field_widget[name="pe_r5_impuesto_anual"]', '.o_field_widget[name="pe_r5_retencion_boleta"]'] });
    await boletaPestana(p, c, 16, await idBoleta(p, 16, '000068002', '2026-07-01', 'Gratific'), 'Renta de 5ta', 'c13_06_renta5_no_domiciliado_s2',
      { resaltar: ['.o_field_widget[name="pe_r5_nd_tasa"]', '.o_field_widget[name="pe_r5_retencion_boleta"]'] });
    await informeTapado(p, c, 1, 'solse_pe_payroll_ce.reporte_certificado_renta5', 27, 'c13_04_certificado_renta5_lucia_2025', FM);
  },
  // ---------------------------------------------------------------- 15 · CTS
  async c15k9(p, c) {
    await informeTapado(p, c, 14, 'solse_pe_payroll_ce.reporte_constancia_cts', await idBoleta(p, 14, '70006309', '2025-11-01', 'CTS'), 'c15_03_constancia_cts_k9_divisor', []);
  },
  async c15(p, c) {
    await informeTapado(p, c, 14, 'solse_pe_payroll_ce.reporte_constancia_cts', await idBoleta(p, 14, '70006309', '2025-11-01', 'CTS'), 'c15_03_constancia_cts_k9_divisor', []);
    await informeTapado(p, c, 1, 'solse_pe_payroll_ce.reporte_constancia_cts', await idBoleta(p, 1, '99999901', '2026-11-01', 'CTS'), 'c15_02_liquidacion_deposito_cts', FM);
  },
  // ---------------------------------------------------------------- 20 · horas extra y utilidades
  async c20(p, c) {
    const k1 = await idBoleta(p, 14, '70006301', '2026-06-01', 'Mensual');
    await boletaPestana(p, c, 14, k1, 'Días trabajados y entradas', 'c20_02_entradas_lista', { resaltar: ['fila:HE25_001', 'fila:HE35_001', 'fila:TARD_001'] });
    await boletaPestana(p, c, 14, k1, 'Cálculo de la nómina', 'c20_02_entradas_calculo', { resaltar: ['fila:HE25_001', 'fila:HE35_001', 'fila:Base afecta'] });
    // el reparto guardado de UTILIDADES_REPARTO (ejercicio 2031)
    const rep = await rpc(p, 'solse.pe.utilidades', 'search_read', [[['company_id', '=', 4], ['anio', '=', 2031]]], { fields: ['id'], context: { allowed_company_ids: [4] } });
    await cia(c, 4); await u.irA(p, `/odoo/action-solse_pe_payroll_ce.action_utilidades_reparto/${rep[0].id}`);
    hechos.c20_03 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 3000);
    await alta(p, () => cap(p, 'c20_03_reparto_guardado', { resaltar: ['.o_field_widget[name="remanente"]', '.o_field_widget[name="tope_base"]'] }));
    await recortarForm('c20_03_reparto_guardado', 1600);
    // el asistente «Calcular un ejercicio» en la pequeña empresa: se llena y se cierra SIN calcular
    await cia(c, 12); await u.irA(p, '/odoo/action-solse_pe_payroll_ce.action_utilidades_reparto');
    await p.locator('button').filter({ hasText: /Calcular un ejercicio/ }).first().click(); await p.waitForTimeout(2000);
    const m = p.locator('.modal').last();
    const wa = m.locator('.o_field_widget[name="anio"] input').first(); await wa.click(); await wa.fill('2026'); await wa.press('Tab');
    const wr = m.locator('.o_field_widget[name="renta_neta"] input').first(); await wr.click(); await wr.fill('100000'); await wr.press('Tab');
    const wp = m.locator('.o_field_widget[name="porcentaje"]').first();
    if (await wp.locator('select').count()) await wp.locator('select').selectOption({ label: '5% - Otras actividades' });
    else { await wp.locator('input, .o_select_menu_toggler').first().click(); await p.locator('.o_select_menu_item, .dropdown-item').filter({ hasText: /5% - Otras/ }).first().click(); }
    await p.waitForTimeout(800);
    hechos.c20_01 = limpio(await m.innerText().catch(() => ''));
    await cap(p, 'c20_01_reparto_utilidades');
    const cerrar = m.locator('.modal-footer button, footer button').filter({ hasText: /^\s*(Cerrar|Cancelar|Descartar)\s*$/ });
    if (await cerrar.count()) await cerrar.last().click(); else await p.keyboard.press('Escape');
    await p.waitForTimeout(800);
  },
};

module.exports = { pasos };
if (require.main === module) {
  (async () => {
    const { navegador, contexto, pagina } = await u.abrir({ ancho: 1600, alto: Number(process.env.ALTO || 900) });
    await u.asegurarLogin(pagina, contexto);
    for (const n of process.argv[2].split(',')) {
      try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await u.captura(pagina, 'error_' + n).catch(() => {}); }
      fs.writeFileSync(HECHOS, JSON.stringify(hechos, null, 1));
    }
    await navegador.close();
  })();
}
