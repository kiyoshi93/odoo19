// Pasos de captura del bloque 3 (se cargan con PASOS_EXTRA en capturas_bloque3.js).
const u = require('../../scripts/odoo_ui');
const b3 = require('./capturas_bloque3');
const { hechos, boleta, cap, cia, tab, alta, limpio, descartar } = b3;
async function quitarFiltros(p) { for (let i = 0; i < 4 && await p.locator('.o_searchview_facet').count(); i++) { await p.locator('.o_searchview_facet .o_facet_remove').first().click(); await u.esperarCarga(p, 700); } }
async function buscar(p, t) { await p.locator('.o_searchview_input').fill(t); await p.keyboard.press('Enter'); await u.esperarCarga(p, 1000); }
module.exports = {
  // ---------------------------------------------------------------- 21
  async c21(p, c) {
    await boleta(p, c, 4, 1844, 'c21_01_aumento_oct');
    await boleta(p, c, 4, 1845, 'c21_02_dos_contratos_oct');
    await cia(c, 4); await u.irA(p, '/odoo/action-1009'); await buscar(p, 'AUMENTO');
    for (const g of await p.locator('.o_group_header').all()) { await g.click(); await p.waitForTimeout(500); }
    hechos.c21_contratos = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c21_03_versiones_del_contrato');
  },
  // ---------------------------------------------------------------- 22
  async c22(p, c) {
    await boleta(p, c, 4, 1930, 'c22_01_semana_sin_goce');
    await boleta(p, c, 4, 1931, 'c22_02_permiso_2_horas');
    await boleta(p, c, 4, 1932, 'c22_03_mes_sin_goce');
    await cia(c, 4); await u.irA(p, '/odoo/action-979?view_type=list'); await quitarFiltros(p); await buscar(p, 'manual v2');
    hechos.c22_ausencias = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c22_04_ausencias_sin_goce');
  },
  // ---------------------------------------------------------------- 23
  async c23(p, c) {
    await boleta(p, c, 4, 1864, 'c23_01_descanso_nov');
    await boleta(p, c, 4, 1866, 'c23_02_maternidad_nov');
    await boleta(p, c, 4, 1868, 'c23_03_sin_derecho_nov', ['Días trabajados y entradas']);
    await cia(c, 4); await u.irA(p, '/odoo/action-979/99');
    hechos.c23_ausencia = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 800);
    await cap(p, 'c23_04_descanso_medico');
  },
  // ---------------------------------------------------------------- 24
  async c24(p, c) {
    await boleta(p, c, 4, 1819, 'c24_01_micro_jun', ['Cálculo de la nómina']);
    await boleta(p, c, 4, 1823, 'c24_02_micro_liquidacion', ['Cálculo de la nómina']);
  },
  // ---------------------------------------------------------------- 25
  async c25(p, c) {
    await boleta(p, c, 4, 1933, 'c25_01_original', []);
    await cap(p, 'c25_01_original_rectificar', { resaltar: ['.o_statusbar_buttons button:has-text("Rectificar")'] });
    await boleta(p, c, 4, 1939, 'c25_02_rectificativa', ['Cálculo de la nómina']);
    await boleta(p, c, 4, 1940, 'c25_03_reemplazo', ['Cálculo de la nómina']);
    await cia(c, 4); await u.irA(p, '/odoo/action-1005'); await quitarFiltros(p); await buscar(p, 'RECTIFICATIVA');
    hechos.c25_lista = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c25_04_lista_boletas_rectificada');
  },
  // ---------------------------------------------------------------- 26
  async c26(p, c) {
    await boleta(p, c, 4, 1937, 'c26_01_diciembre_grati_borrador', ['Días trabajados y entradas']);
    await cia(c, 4); await u.irA(p, '/odoo/action-1005/new'); const f = p.locator('.o_form_view').first();
    await u.muchosAUno(p, f, 'employee_id', 'SIN PENSIÓN'); await p.waitForTimeout(2000); await u.esperarCarga(p, 800);
    await u.rangoFechas(p, f, 'date_from', 'date_to', '01/11/2026', '30/11/2026'); await p.waitForTimeout(2500);
    hechos.c26_sin_pension = limpio(await p.locator('.o_form_view .alert').allInnerTexts().then((x) => x.join(' || ')).catch(() => ''));
    await cap(p, 'c26_02_sin_sistema_pensionario', { resaltar: ['.o_form_view .alert-warning'] });
    await descartar(p);
    await u.irA(p, '/odoo/action-1005/1938');
    await p.locator('.o_statusbar_buttons button').filter({ hasText: /Calcular hoja/ }).first().click(); await p.waitForTimeout(3000);
    hechos.c26_vigencia = limpio(await p.locator('.modal').last().innerText().catch(() => ''));
    await cap(p, 'c26_03_vigencia_faltante');
    await p.locator('.modal button').filter({ hasText: /Cerrar|De acuerdo|Aceptar/ }).first().click().catch(() => p.keyboard.press('Escape'));
  },
};
module.exports.c26_vigencia_detalle = async (p, c) => {
  await cia(c, 4); await u.irA(p, '/odoo/action-1005/1938');
  await p.locator('.o_statusbar_buttons button').filter({ hasText: /Calcular hoja/ }).first().click(); await p.waitForTimeout(3000);
  const m = p.locator('.modal').last();
  hechos.c26_vigencia_titulo = limpio(await m.locator('.modal-title, h4').first().innerText().catch(() => ''));
  await m.locator('button, a').filter({ hasText: /Ver detalles/ }).first().click().catch(() => {}); await p.waitForTimeout(1000);
  hechos.c26_vigencia_detalle = limpio(await m.innerText().catch(() => '')).slice(0, 1500);
  await cap(p, 'c26_03b_vigencia_detalle');
  await p.keyboard.press('Escape');
};
async function asistente(p, c, compania, accion, valores, boton, nombre) {
  await cia(c, compania); await u.irA(p, '/odoo/action-' + accion);
  const m = () => p.locator('.modal').last();
  for (const [campo, tipo, valor] of valores) {
    const w = m().locator(`.o_field_widget[name="${campo}"]`).first();
    if (tipo === 'sel') {
      if (await w.locator('select').count()) await w.locator('select').selectOption({ label: valor });
      else { await w.locator('input, .o_select_menu_toggler').first().click(); await p.locator('.o_select_menu_item, .dropdown-item').filter({ hasText: new RegExp('^\\s*' + valor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$') }).first().click(); }
    } else if (tipo === 'txt') { const i = w.locator('input').first(); await i.click(); await i.fill(String(valor)); await i.press('Tab'); }
    else if (tipo === 'fecha') { await u.fecha(m(), campo, valor); }
    else if (tipo === 'chk') { const i = w.locator('input[type=checkbox]'); if ((await i.isChecked()) !== valor) await i.click(); }
    else if (tipo === 'm2o') { await u.muchosAUno(p, m(), campo, valor); }
    await p.waitForTimeout(500);
  }
  hechos[nombre + '_antes'] = limpio(await m().innerText().catch(() => '')).slice(0, 1500);
  await cap(p, nombre + '_asistente');
  const descarga = p.waitForEvent('download', { timeout: 12000 }).catch(() => null);
  await m().locator('.modal-footer button, footer button').filter({ hasText: new RegExp(boton) }).first().click();
  const archivo = await descarga;
  if (archivo) { hechos[nombre + '_descarga'] = archivo.suggestedFilename(); await archivo.saveAs(require('path').join(__dirname, '..', 'medidas', 'archivos', nombre + '__' + archivo.suggestedFilename())); }
  await p.waitForTimeout(3000); await u.esperarCarga(p, 1500).catch(() => {});
  hechos[nombre] = limpio(await m().innerText().catch(() => '')).slice(0, 3000);
  await cap(p, nombre + '_resultado');
}
Object.assign(module.exports, {
  async c27(p, c) {
    await asistente(p, c, 4, 1039, [['mes', 'sel', 'Noviembre'], ['anio', 'txt', 2026]], 'Generar', 'c27_01_planilla');
    await asistente(p, c, 4, 1040, [['mes', 'sel', 'Noviembre'], ['anio', 'txt', 2026]], 'Generar', 'c27_02_plame');
    await asistente(p, c, 4, 1042, [['mes', 'sel', 'Julio'], ['anio', 'txt', 2026]], 'Generar', 'c27_03_afpnet');
    await asistente(p, c, 4, 1041, [['mes', 'sel', 'Mayo'], ['anio', 'txt', 2026], ['tipo', 'sel', 'Haberes (sueldo)'], ['banco', 'sel', 'BCP - Telecrédito'], ['cuenta_cargo', 'txt', '19100000000011'], ['fecha_pago', 'fecha', '29/05/2026']], 'Generar', 'c27_04_bcp_haberes');
    await asistente(p, c, 4, 1041, [['mes', 'sel', 'Mayo'], ['anio', 'txt', 2026], ['tipo', 'sel', 'CTS'], ['banco', 'sel', 'Interbank'], ['cuenta_cargo', 'txt', '2003001234567'], ['fecha_pago', 'fecha', '29/05/2026']], 'Generar', 'c27_05_interbank_cts');
    await asistente(p, c, 4, 1041, [['mes', 'sel', 'Mayo'], ['anio', 'txt', 2026], ['tipo', 'sel', 'Haberes (sueldo)'], ['banco', 'sel', 'Scotiabank'], ['cuenta_cargo', 'txt', '0001234567'], ['fecha_pago', 'fecha', '29/05/2026']], 'Generar', 'c27_06_scotiabank_haberes');
  },
  async c29(p, c) {
    await asistente(p, c, 4, 1095, [['operacion', 'sel', 'Altas']], 'Generar archivos', 'c29_01_altas');
    await asistente(p, c, 4, 1095, [['operacion', 'sel', 'Bajas']], 'Generar archivos', 'c29_02_bajas');
    await asistente(p, c, 4, 1095, [['operacion', 'sel', 'Modificaciones'], ['concepto', 'sel', 'Tipo de trabajador'], ['fecha_cambio', 'fecha', '16/10/2026']], 'Generar archivos', 'c29_03_modificacion');
    await asistente(p, c, 4, 1095, [['operacion', 'sel', 'Altas de derechohabientes']], 'Generar archivos', 'c29_04_dh_altas');
  },
});
module.exports.c28 = async (p, c) => {
  await cia(c, 4); await u.irA(p, '/odoo/action-1007/5');
  await cap(p, 'c28_01_lote_hecho');
  await p.locator('.o_statusbar_buttons button').filter({ hasText: /Registrar pago/ }).first().click(); await p.waitForTimeout(2000);
  const m = p.locator('.modal').last();
  const ref = m.locator('.o_field_widget[name="referencia"] input');
  if (await ref.count()) { await ref.fill('OP-2026-11-30'); await ref.press('Tab'); }
  const fe = m.locator('.o_field_widget[name="fecha"]');
  if (await fe.count()) await u.fecha(m, 'fecha', '30/11/2026');
  hechos.c28_pago_asistente = limpio(await m.innerText()).slice(0, 1500);
  await cap(p, 'c28_02_registrar_pago');
  await m.locator('.modal-footer button').first().click(); await p.waitForTimeout(4000); await u.esperarCarga(p, 1500);
  hechos.c28_pago_url = p.url();
  hechos.c28_pago_resultado = limpio(await p.locator('.o_form_view').first().innerText().catch(() => '')).slice(0, 2000);
  await cap(p, 'c28_03_asiento_pago');
  await u.irA(p, '/odoo/action-1005/1934');
  hechos.c28_boleta_pagada = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 1200);
  await cap(p, 'c28_04_boleta_pagada');
  await u.irA(p, '/odoo/action-1007/5');
  await p.locator('.o_statusbar_buttons button').filter({ hasText: /Enviar boletas/ }).first().click(); await p.waitForTimeout(3000);
  hechos.c28_envio = limpio(await p.locator('.modal, .o_notification').last().innerText().catch(() => '')).slice(0, 1500);
  await cap(p, 'c28_05_enviar_boletas_sin_acuerdo');
  await p.keyboard.press('Escape');
};
