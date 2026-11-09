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

// ---------------------------------------------------------------- utilidades del v3 (2)
async function recortarForm(nombre, ancho = 1040) {
  // la boleta sin el historial de la derecha y sin el espacio vacío de abajo, como las del v2
  require('child_process').execSync(`python3 -c "
from PIL import Image
r='${path.join(process.env.CAPTURAS_DIR, nombre)}.png'; im=Image.open(r); im.crop((0,0,min(${ancho},im.width),im.height)).save(r)"`);
  require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(process.env.CAPTURAS_DIR, nombre)}.png`);
}
async function boletaCalculo(p, c, compania, id, nombre, { ancho = 1040, resaltar = [] } = {}) {
  await cia(c, compania); await u.irA(p, `/odoo/action-${ACC.boletas}/${id}`);
  await tab(p, 'Cálculo de la nómina');
  hechos[nombre] = limpio(await p.locator('.o_notebook .tab-pane.active').innerText().catch(() => '')).slice(0, 3000);
  const marcas = [];
  for (const cod of resaltar) marcas.push(p.locator('.o_notebook .tab-pane.active .o_data_row').filter({ hasText: cod }).first());
  await alta(p, () => cap(p, nombre, { resaltar: marcas }));
  await recortarForm(nombre, ancho);
}
async function registro(p, c, compania, accion, id, nombre, { resaltar = [], altura = 0 } = {}) {
  await cia(c, compania); await u.irA(p, `/odoo/action-${accion}/${id}`);
  hechos[nombre] = limpio(await p.locator('.o_form_view').first().innerText().catch(() => '')).slice(0, 3000);
  if (altura) { await p.setViewportSize({ width: 1600, height: altura }); await p.waitForTimeout(600); }
  await cap(p, nombre, { resaltar });
  if (altura) await p.setViewportSize({ width: 1600, height: Number(process.env.ALTO || 900) });
}
async function abrirBoton(p, nombreBoton) {
  await p.locator(`button[name="${nombreBoton}"]`).first().click(); await p.waitForTimeout(2500); await u.esperarCarga(p, 800).catch(() => {});
}
async function cerrarModal(p) {
  const b = p.locator('.modal:visible .modal-footer button, .modal:visible footer button').filter({ hasText: /^\s*(Cancelar|Descartar|Cerrar)\s*$/ });
  if (await b.count()) await b.last().click(); else await p.keyboard.press('Escape');
  await p.waitForTimeout(800);
}
async function filaLista(p, texto) { return p.locator('.o_data_row').filter({ hasText: texto }).first(); }
const ACCX = (x) => `solse_pe_payroll_ce.${x}`;

Object.assign(pasos, {
  // ---------------------------------------------------------------- 16 · cese (g5)
  async c16(p, c) {
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70000351', '2026-04-01', 'Liquidaci'), 'c16_02_indemnizacion_calculo', { resaltar: ['IND_001', 'BAR5_001'] });
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70000301', '2026-11-01', 'Liquidaci').catch(() => 0) || 0, 'c16_01_carmen_liquidacion_calculo').catch((e) => console.log('  c16_01:', e.message));
    await cia(c, 4); await u.irA(p, '/odoo/action-base.action_res_company_form/4'); await u.pestana(p, 'Nómina PE - Controles');
    const sep = p.locator('.o_horizontal_separator').filter({ hasText: 'Liquidación por cese' }).first();
    await sep.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -60));
    await alta(p, async () => { await sep.scrollIntoViewIfNeeded(); await cap(p, 'c16_04_opciones_cese', { resaltar: ['.o_field_widget[name="pe_vacaciones_no_gozadas_cese"]', '.o_field_widget[name="pe_plazo_maximo_modal"]'] }); });
    require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(process.env.CAPTURAS_DIR, 'c16_04_opciones_cese')}.png`);
    await informe(p, c, 4, 'solse_pe_payroll_ce.reporte_liquidacion_beneficios', await idBoleta(p, 4, '70002402', '2030-08-01', 'Liquidaci'), 'c16_05_hoja_liquidacion');
  },
  // ---------------------------------------------------------------- 23 · subsidios (g5)
  async c23(p, c) {
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70000801', '2026-11-01', 'Mensual'), 'c23_01_descanso_nov_calculo', { resaltar: ['SUB_INC_001'] });
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70000805', '2026-11-01', 'Mensual'), 'c23_03_sin_derecho_aviso', { ancho: 1600, resaltar: ['SUB_INC_001'] });
    const e1 = await empleado(p, 4, '70000801');
    const aus = await rpc(p, 'hr.leave', 'search_read', [[['employee_id', '=', e1.id], ['request_date_from', '<=', '2026-11-30'], ['request_date_to', '>=', '2026-11-01']]], { fields: ['id'], ...ctx(4) });
    if (aus.length) { await cia(c, 4); await u.irA(p, `/odoo/action-hr_holidays.hr_leave_action_action_approve_department/${aus[0].id}`);
      await cap(p, 'c23_04_descanso_medico', { resaltar: ['.o_field_widget[name="pe_accidente"]'] }); }
    const e2 = await empleado(p, 4, '70000802');
    await cia(c, 4); await u.irA(p, `/odoo/employees/${e2.id}`); await u.pestana(p, 'Nómina PE');
    const s = p.locator('.o_horizontal_separator, .o_form_label, h3').filter({ hasText: 'Promedios fijados' }).first();
    if (await s.count()) { await s.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -80)); await p.waitForTimeout(500); }
    await cap(p, 'c23_05_promedios_fijados', { resaltar: (await s.count()) ? [s] : [] });
  },
  // ---------------------------------------------------------------- 7 · contabilidad y provisiones (g2)
  async c07(p, c) {
    await cia(c, 1); await u.irA(p, `/odoo/action-${ACCX('mapeo_contable_action')}`);
    await cap(p, 'c07_01_mapeo_pcge');
    await grupoCompania(p, c, 4, 'Nómina PE - Controles', 'Provisiones (N-13)', 'c07_05_opciones_provisiones');
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACCX('provision_wizard_action')}`);
    const m = p.locator('.modal').last();
    const wm = m.locator('.o_field_widget[name="mes"]').first();
    if (await wm.count()) { if (await wm.locator('select').count()) await wm.locator('select').selectOption({ label: 'Enero' }); else { await wm.locator('input, .o_select_menu_toggler').first().click(); await p.locator('.o_select_menu_item, .dropdown-item').filter({ hasText: /^\s*Enero\s*$/ }).first().click(); } }
    const wa = m.locator('.o_field_widget[name="anio"] input').first(); if (await wa.count()) { await wa.click(); await wa.fill('2027'); await wa.press('Tab'); }
    await p.waitForTimeout(800); hechos.c07_06 = limpio(await m.innerText().catch(() => ''));
    await cap(p, 'c07_06_asistente_provisiones'); await cerrarModal(p);
    const asientoEnero = await rpc(p, 'account.move', 'search_read', [[['company_id', '=', 4], ['ref', 'ilike', 'Provisiones de nómina 01/2027']]], { fields: ['id'], ...ctx(4) });
    const idEnero = asientoEnero.length ? asientoEnero[0].id : 11242;
    await registro(p, c, 4, 'account.action_move_journal_line', idEnero, 'c07_07_asiento_provisiones_enero', { altura: 1500 });
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACCX('provision_action')}`);
    await p.locator('.o_searchview_input').fill('70002101'); await p.keyboard.press('Enter'); await u.esperarCarga(p, 1200);
    const gr = p.locator('.o_group_header').filter({ hasText: /CTS/ }).first(); if (await gr.count()) { await gr.click(); await u.esperarCarga(p, 1000); }
    await cap(p, 'c07_08_registro_provisiones');
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70002201', '2028-01-01', 'Mensual'), 'c07_09_boleta_lineas_provision', { resaltar: ['PRO_GRATI_001', 'PRO_CTS_001', 'PRO_VAC_001'] });
    const grat = await idBoleta(p, 4, '70002301', '2029-07-01', 'Gratific');
    const mv = await rpc(p, 'hr.payslip', 'read', [[grat]], { fields: ['move_id'], ...ctx(4) });
    await registro(p, c, 4, 'account.action_move_journal_line', mv[0].move_id[0], 'c07_10_asiento_gratificacion_aplicacion', { altura: 1300 });
  },
  // ---------------------------------------------------------------- 28 · pago y entrega (g2)
  async c28(p, c) {
    await cia(c, 1); await u.irA(p, `/odoo/action-${ACC.lotes}/1`);
    await abrirBoton(p, 'action_pe_registrar_pago');
    hechos.c28_02 = limpio(await p.locator('.modal').last().innerText().catch(() => '')).slice(0, 2000);
    await cap(p, 'c28_02_registrar_pago', { resaltar: ['.modal .o_field_widget[name="por_trabajador"]'] });
    await cerrarModal(p);
    await cia(c, 1); await u.irA(p, `/odoo/action-${ACCX('action_afpnet_pago_wizard')}`);
    const m = p.locator('.modal').last(); const wm = m.locator('.o_field_widget[name="mes"]').first();
    if (await wm.count()) { if (await wm.locator('select').count()) await wm.locator('select').selectOption({ label: 'Noviembre' }); else { await wm.locator('input, .o_select_menu_toggler').first().click(); await p.locator('.o_select_menu_item, .dropdown-item').filter({ hasText: /^\s*Noviembre\s*$/ }).first().click(); } }
    const wa = m.locator('.o_field_widget[name="anio"] input').first(); if (await wa.count()) { await wa.click(); await wa.fill('2026'); await wa.press('Tab'); }
    await p.waitForTimeout(800); hechos.c28_06 = limpio(await m.innerText().catch(() => ''));
    await cap(p, 'c28_06_afpnet_pago'); await cerrarModal(p);
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACC.boletas}/${await idBoleta(p, 4, '70002401', '2030-08-01', 'Liquidaci')}`);
    const imp = p.locator('.o_cp_action_menus button, button:has(.fa-print), .o_control_panel button').filter({ hasText: /Imprimir/ }).first();
    if (await imp.count()) await imp.click(); else await p.locator('.o_cp_action_menus .dropdown-toggle, .o_control_panel .fa-cog').first().click();
    await p.waitForTimeout(1000);
    const imp2 = p.locator('.dropdown-menu:visible .dropdown-item, .o-dropdown--menu .dropdown-item').filter({ hasText: /Imprimir/ }).first();
    if (await imp2.count()) { await imp2.hover(); await p.waitForTimeout(800); }
    hechos.c28_07 = (await p.locator('.dropdown-menu:visible, .o-dropdown--menu').allInnerTexts()).map(limpio);
    await cap(p, 'c28_07_documentos_cese_imprimir'); await p.keyboard.press('Escape');
    await grupoCompania(p, c, 4, 'Nómina PE - Controles', 'Boleta por correo', 'c28_08_opcion_boleta_correo');
  },
});

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
