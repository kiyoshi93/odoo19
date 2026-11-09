// Manual v3: capturas nuevas. Los registros se buscan por empleado (DNI sintético), compañía y fecha, no por id fijo:
// los casos del laboratorio se vuelven a sembrar y sus ids cambian. Solo lee, salvo los asistentes (PLAME, T-Registro…)
// que generan archivos sin guardar nada y las boletas nuevas sin guardar (para mostrar avisos), que se descartan.
// Uso: source v3/scripts/entorno.sh; NODE_PATH=$NPM_G node capturas_v3.js paso1,paso2   (lista: node capturas_v3.js lista)
const fs = require('fs'); const path = require('path');
const u = require('../../scripts/odoo_ui');
const b3 = require('./capturas_bloque3');
const { boleta, informe, cap, cia, tab, alta, limpio, descartar } = b3;
const HECHOS = path.join(__dirname, '..', 'medidas', 'ui_v3.json');
const hechos = fs.existsSync(HECHOS) ? JSON.parse(fs.readFileSync(HECHOS)) : {};
const ACC = { boletas: 1005, lotes: 1007, contratos: 1009, plame: 1040 };

async function rpc(p, model, method, args, kwargs = {}) {
  return p.evaluate(async ([model, method, args, kwargs]) => {
    const r = await fetch('/web/dataset/call_kw', { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params: { model, method, args, kwargs } }) });
    const j = await r.json(); if (j.error) throw new Error(JSON.stringify(j.error).slice(0, 300)); return j.result;
  }, [model, method, args, kwargs]);
}
const ctx = (compania) => ({ context: { allowed_company_ids: [compania] } });
async function empleado(p, compania, dni) {
  const r = await rpc(p, 'hr.employee', 'search_read', [[['identification_id', '=', dni], ['company_id', '=', compania]]], { fields: ['id', 'name'], ...ctx(compania) });
  if (!r.length) throw new Error(`no hay empleado ${dni} en la compañía ${compania}`); return r[0];
}
async function idBoleta(p, compania, dni, desde, estructura = null) {
  const e = await empleado(p, compania, dni);
  const dom = [['employee_id', '=', e.id], ['date_from', '=', desde]];
  if (estructura) dom.push(['struct_id.name', 'ilike', estructura]);
  const r = await rpc(p, 'hr.payslip', 'search_read', [dom], { fields: ['id', 'name', 'state'], order: 'id desc', ...ctx(compania) });
  if (!r.length) throw new Error(`no hay boleta de ${dni} desde ${desde} ${estructura || ''}`); return r[0].id;
}
async function idVersion(p, compania, dni) {
  const e = await empleado(p, compania, dni);
  const r = await rpc(p, 'hr.version', 'search_read', [[['employee_id', '=', e.id]]], { fields: ['id'], order: 'date_version desc', ...ctx(compania) });
  return r[0].id;
}
// Una boleta nueva SIN guardar, para que se vean sus avisos (solo se calculan en borrador); se descarta.
async function borradorConAvisos(p, c, compania, nombreEmpleado, desde, hasta, nombre, estructura = null) {
  await cia(c, compania); await u.irA(p, `/odoo/action-${ACC.boletas}/new`); const f = p.locator('.o_form_view').first();
  await u.muchosAUno(p, f, 'employee_id', nombreEmpleado); await p.waitForTimeout(2000); await u.esperarCarga(p, 800);
  if (await p.locator('.modal:visible').count()) { await p.locator('.modal:visible button').filter({ hasText: /^\s*(Cerrar|Ok|Aceptar)\s*$/ }).last().click().catch(() => p.keyboard.press('Escape')); await p.waitForTimeout(800); }
  await u.rangoFechas(p, f, 'date_from', 'date_to', desde, hasta); await p.waitForTimeout(2500);
  if (estructura) { await u.muchosAUno(p, f, 'struct_id', estructura); await p.waitForTimeout(1800); }
  hechos[nombre] = limpio(await p.locator('.o_form_view .alert').allInnerTexts().then((x) => x.join(' || ')).catch(() => ''));
  await cap(p, nombre, { resaltar: ['.o_form_view .alert-warning'] });
  await descartar(p);
}
async function grupoCompania(p, c, compania, pestana, grupo, nombre, resaltar = []) {
  await cia(c, compania); await u.irA(p, `/odoo/action-base.action_res_company_form/${compania}`);
  if (pestana) await u.pestana(p, pestana);
  const g = p.locator('.o_inner_group, .o_group').filter({ has: p.locator(`.o_horizontal_separator, .o_form_label, h3, div`, { hasText: grupo }) });
  const sep = p.locator('.o_horizontal_separator').filter({ hasText: grupo }).first();
  if (await sep.count()) { await sep.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -80)); await p.waitForTimeout(500); }
  hechos[nombre] = limpio(await p.locator('.o_notebook .tab-pane.active, .o_form_sheet').first().innerText()).slice(0, 2500);
  await cap(p, nombre, { resaltar: resaltar.length ? resaltar : (await sep.count() ? [sep] : []) });
}
async function asistentePlame(p, c, compania, mes, anio, nombre) {
  await cia(c, compania); await u.irA(p, `/odoo/action-${ACC.plame}`);
  const m = p.locator('.modal').last();
  const wm = m.locator('.o_field_widget[name="mes"]').first();
  if (await wm.locator('select').count()) await wm.locator('select').selectOption({ label: mes });
  else { await wm.locator('input, .o_select_menu_toggler').first().click(); await p.locator('.o_select_menu_item, .dropdown-item').filter({ hasText: new RegExp('^\\s*' + mes + '\\s*$') }).first().click(); }
  const wa = m.locator('.o_field_widget[name="anio"] input').first(); await wa.click(); await wa.fill(String(anio)); await wa.press('Tab');
  await p.waitForTimeout(600);
  await m.locator('.modal-footer button, footer button').filter({ hasText: /Generar/ }).first().click();
  await p.waitForTimeout(4000); await u.esperarCarga(p, 1500).catch(() => {});
  hechos[nombre] = limpio(await p.locator('.modal').last().innerText().catch(() => '')).slice(0, 3000);
  await cap(p, nombre, { resaltar: ['.modal [name="resumen"]'] });
}

const pasos = {
  // ---------------------------------------------------------------- 24 · micro y pequeña empresa
  async c24(p, c) {
    await grupoCompania(p, c, 12, 'Nómina PE - Controles', 'Micro y pequeña empresa', 'c24_03_compania_remype');
    await boleta(p, c, 13, await idBoleta(p, 13, '70006203', '2026-09-01', 'Liquidaci'), 'c24_04_micro_liquidacion_m3', ['Cálculo de la nómina']);
    fs.renameSync(path.join(process.env.CAPTURAS_DIR, 'c24_04_micro_liquidacion_m3_calculo.png'), path.join(process.env.CAPTURAS_DIR, 'c24_04_micro_liquidacion_m3.png'));
    await boleta(p, c, 12, await idBoleta(p, 12, '70006101', '2026-07-01', 'Gratific'), 'c24_05_pequena_grati_p1', ['Cálculo de la nómina']);
    fs.renameSync(path.join(process.env.CAPTURAS_DIR, 'c24_05_pequena_grati_p1_calculo.png'), path.join(process.env.CAPTURAS_DIR, 'c24_05_pequena_grati_p1.png'));
    await boleta(p, c, 12, await idBoleta(p, 12, '70006103', '2026-10-01', 'Liquidaci'), 'c24_06_pequena_liquidacion_p3', ['Cálculo de la nómina']);
    fs.renameSync(path.join(process.env.CAPTURAS_DIR, 'c24_06_pequena_liquidacion_p3_calculo.png'), path.join(process.env.CAPTURAS_DIR, 'c24_06_pequena_liquidacion_p3.png'));
    const p4 = await empleado(p, 12, '70006104');
    await borradorConAvisos(p, c, 12, p4.name, '01/07/2026', '31/07/2026', 'c24_07_aviso_remype');
  },
  // ---------------------------------------------------------------- 31 · practicante
  async c31(p, c) {
    await cia(c, 16); await u.irA(p, `/odoo/action-${ACC.contratos}/${await idVersion(p, 16, '70006801')}`);
    const l = p.locator('.o_field_widget[name="is_practitioner"]').first(); if (await l.count()) { await l.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); }
    hechos.c31_contrato = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 2500);
    await cap(p, 'c31_01_contrato_practicante', { resaltar: ['.o_field_widget[name="is_practitioner"]', '.o_field_widget[name="pe_pf_modalidad"]'] });
    await boleta(p, c, 16, await idBoleta(p, 16, '70006801', '2026-06-01'), 'c31_02_boleta_junio_s1', ['Cálculo de la nómina']);
    fs.renameSync(path.join(process.env.CAPTURAS_DIR, 'c31_02_boleta_junio_s1_calculo.png'), path.join(process.env.CAPTURAS_DIR, 'c31_02_boleta_junio_s1.png'));
    await grupoCompania(p, c, 16, 'Nómina PE - Controles', 'Modalidades formativas', 'c31_03_compania_practicantes');
    await asistentePlame(p, c, 16, 'Junio', 2026, 'c31_04_plame_personal_formacion');
  },
  // ---------------------------------------------------------------- 32 · SENATI
  async c32(p, c) {
    await cia(c, 15); await u.irA(p, '/odoo/action-base.action_res_company_form/15');
    const s = p.locator('.o_field_widget[name="afecto_senati"]').first(); if (await s.count()) { await s.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); }
    await cap(p, 'c32_01_compania_senati', { resaltar: ['.o_field_widget[name="afecto_senati"]', '.o_field_widget[name="pe_senati_hasta_20"]'] });
    await cia(c, 15); await u.irA(p, `/odoo/action-${ACC.contratos}/${await idVersion(p, 15, '70006504')}`);
    const f = p.locator('.o_field_widget[name="pe_fuera_de_senati"]').first(); if (await f.count()) { await f.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); }
    await cap(p, 'c32_02_contrato_fuera_senati', { resaltar: ['.o_field_widget[name="pe_fuera_de_senati"]'] });
    await boleta(p, c, 15, await idBoleta(p, 15, '70006503', '2026-06-01'), 'c32_03_boleta_senati_i3', ['Cálculo de la nómina']);
    fs.renameSync(path.join(process.env.CAPTURAS_DIR, 'c32_03_boleta_senati_i3_calculo.png'), path.join(process.env.CAPTURAS_DIR, 'c32_03_boleta_senati_i3.png'));
    const i3 = await empleado(p, 15, '70006503');
    await borradorConAvisos(p, c, 15, i3.name, '01/07/2026', '31/07/2026', 'c32_04_aviso_senati');
  },
};
module.exports = { pasos, rpc, empleado, idBoleta, idVersion, borradorConAvisos, grupoCompania, asistentePlame, hechos };
if (require.main === module) {
  (async () => {
    if (process.argv[2] === 'lista') { console.log(Object.keys(pasos).join(',')); return; }
    const { navegador, contexto, pagina } = await u.abrir({ ancho: 1600, alto: Number(process.env.ALTO || 900) });
    await u.asegurarLogin(pagina, contexto);
    for (const n of process.argv[2].split(',')) {
      try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await u.captura(pagina, 'error_' + n).catch(() => {}); }
      fs.writeFileSync(HECHOS, JSON.stringify(hechos, null, 1));
    }
    await navegador.close();
  })();
}
