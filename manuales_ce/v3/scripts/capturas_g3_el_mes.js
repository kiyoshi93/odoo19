// Manual v3 · capturas del grupo g3_el_mes (capítulos 10, 12, 18, 19 y 22). Solo lee: las boletas nuevas se descartan sin
// guardar y no se pulsa ningún botón que escriba. Registros por DNI y fecha (los ids cambian al sembrar).
// Uso: cd v3/scripts && source entorno.sh && export SESION_FILE=…/sesion_g3_el_mes.json NODE_PATH=$NPM_G && node capturas_g3_el_mes.js paso1,paso2
const fs = require('fs'); const path = require('path');
const u = require('../../scripts/odoo_ui');
const { cap, cia, tab, alta, limpio, descartar } = require('./capturas_bloque3');
const { rpc, empleado, idBoleta, borradorConAvisos } = require('./capturas_v3');
const HECHOS = path.join(__dirname, '..', 'medidas', 'ui_g3_el_mes.json');
const hechos = fs.existsSync(HECHOS) ? JSON.parse(fs.readFileSync(HECHOS)) : {};
const ACC = { boletas: 1005 };
const sh = (cmd) => require('child_process').execSync(cmd);
const png = (n) => path.join(process.env.CAPTURAS_DIR, `${n}.png`);

async function recortarForm(nombre, ancho = 1040) {
  sh(`python3 -c "
from PIL import Image
r='${png(nombre)}'; im=Image.open(r); im.crop((0,0,min(${ancho},im.width),im.height)).save(r)"`);
  sh(`python3 ${path.join(__dirname, 'recortar.py')} ${png(nombre)}`);
}
async function boletaCalculo(p, c, compania, id, nombre, { ancho = 1040, resaltar = [], antes = null } = {}) {
  await cia(c, compania); await u.irA(p, `/odoo/action-${ACC.boletas}/${id}`);
  if (antes) await antes();
  await tab(p, 'Cálculo de la nómina');
  hechos[nombre] = limpio(await p.locator('.o_notebook .tab-pane.active').innerText().catch(() => '')).slice(0, 3000);
  const marcas = [];
  for (const cod of resaltar) marcas.push(p.locator('.o_notebook .tab-pane.active .o_data_row').filter({ hasText: cod }).first());
  await alta(p, () => cap(p, nombre, { resaltar: marcas }));
  await recortarForm(nombre, ancho);
}
async function grupos(p, c, compania, grupo, nombre, resaltar = [], { alto = 0 } = {}) {
  await cia(c, compania); await u.irA(p, `/odoo/action-base.action_res_company_form/${compania}`);
  await u.pestana(p, 'Nómina PE - Controles');
  const sep = p.locator('.o_horizontal_separator').filter({ hasText: grupo }).first();
  await sep.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -70)); await p.waitForTimeout(500);
  if (alto) { await p.setViewportSize({ width: 1600, height: alto }); await p.waitForTimeout(500); await sep.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, -70)); }
  hechos[nombre] = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 4000);
  await p.mouse.move(1300, 700); await p.waitForTimeout(600);
  await cap(p, nombre, { resaltar: resaltar.map((f) => `.o_field_widget[name="${f}"]`) });
  if (alto) await p.setViewportSize({ width: 1600, height: Number(process.env.ALTO || 900) });
}

const pasos = {
  // ---------------------------------------------------------------- 10
  async c10_impresa(p, c) {
    const id = await idBoleta(p, 4, '70000501', '2026-12-01', 'Mensual');
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACC.boletas}/${id}`); await p.waitForTimeout(1000);
    await p.goto(`${u.URL_BASE}/report/html/solse_pe_payroll_ce.reporte_boleta_pago/${id}?context=${encodeURIComponent(JSON.stringify({ allowed_company_ids: [4] }))}`, { waitUntil: 'networkidle' });
    hechos.c10_02_boleta_impresa = limpio(await p.locator('body').innerText()).slice(0, 3000);
    await cap(p, 'c10_02_boleta_impresa', { completa: true });
    sh(`python3 ${path.join(__dirname, 'recortar.py')} ${png('c10_02_boleta_impresa')}`);
  },
  async c10_asiento(p, c) {
    const id = await idBoleta(p, 4, '70000501', '2026-12-01', 'Mensual');
    const mv = await rpc(p, 'hr.payslip', 'read', [[id]], { fields: ['move_id'], context: { allowed_company_ids: [4] } });
    await cia(c, 4); await u.irA(p, `/odoo/action-account.action_move_journal_line/${mv[0].move_id[0]}`);
    hechos.c10_03_asiento = (await p.locator('.o_field_widget[name="line_ids"] .o_data_row').allInnerTexts()).map(limpio);
    hechos.c10_03_nombre = limpio(await p.locator('.o_form_view .oe_title, .o_form_view h1').first().innerText().catch(() => ''));
    await p.setViewportSize({ width: 1600, height: 1900 }); await p.waitForTimeout(800);
    await cap(p, 'c10_03_asiento');
    await p.setViewportSize({ width: 1600, height: Number(process.env.ALTO || 900) });
    await recortarForm('c10_03_asiento');
  },
  async c10_nueva(p, c) {
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACC.boletas}/new`); const f = p.locator('.o_form_view').first();
    await u.muchosAUno(p, f, 'employee_id', 'Trabajadora BOLETA'); await p.waitForTimeout(2000); await u.esperarCarga(p, 800);
    await u.rangoFechas(p, f, 'date_from', 'date_to', '01/12/2026', '31/12/2026'); await p.waitForTimeout(2500);
    hechos.c10_04_boleta_nueva = limpio(await f.innerText()).slice(0, 1500);
    hechos.c10_04_avisos = limpio(await p.locator('.o_form_view .alert').allInnerTexts().then((x) => x.join(' || ')).catch(() => ''));
    await cap(p, 'c10_04_boleta_nueva');
    await descartar(p);
  },
  async c10_vales(p, c) {
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70001601', '2026-11-01', 'Mensual'), 'c10_06_conceptos_vales', { resaltar: ['PRALI_001', 'PRALI_ENT_001'] });
  },
  async c10_rmv(p, c) {
    const k6 = await empleado(p, 14, '70006306');
    await borradorConAvisos(p, c, 14, k6.name, '01/10/2026', '31/10/2026', 'c10_07_aviso_rmv');
  },
  // ---------------------------------------------------------------- 12
  async c12_sctr(p, c) {
    const id = await idBoleta(p, 4, '70002002', '2026-11-01', 'Mensual');
    await boletaCalculo(p, c, 4, id, 'c12_05_sctr_lineas', {
      resaltar: ['SCTR_SAL_001', 'SCTR_PEN_001'],
      antes: async () => {
        await tab(p, 'Cálculo de la nómina');
        // columnas opcionales «Póliza SCTR» y «Tasa SCTR (%)» (solo la vista, no escribe)
        const t = p.locator('.o_notebook .tab-pane.active .o_optional_columns_dropdown button, .o_notebook .tab-pane.active .o_optional_columns_dropdown_toggle').first();
        if (await t.count()) {
          await t.click(); await p.waitForTimeout(600);
          for (const etq of ['Póliza SCTR', 'Tasa SCTR']) {
            const it = p.locator('.o-dropdown--menu .dropdown-item, .dropdown-menu .dropdown-item').filter({ hasText: etq }).first();
            if (await it.count()) { const chk = it.locator('input[type="checkbox"]'); if (!(await chk.isChecked().catch(() => false))) { await it.click(); await p.waitForTimeout(500); } }
          }
          await p.keyboard.press('Escape'); await p.waitForTimeout(500);
        }
      },
    });
  },
  // ---------------------------------------------------------------- 18
  async c18_feriados(p, c) {
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70001902', '2026-12-01', 'Mensual'), 'c18_03_feriados_aparte', { resaltar: ['FER_001', 'TFER_001'] });
  },
  async c18_opciones(p, c) {
    await grupos(p, c, 4, 'Valor hora y feriados', 'c18_04a_opciones_feriados', ['pe_valor_hora', 'pe_subsidio_feriado'], { alto: 1000 });
    await grupos(p, c, 4, 'PLAME: horas del .jor', 'c18_04b_opciones_feriados', ['pe_plame_jor_feriados', 'pe_plame_jor_feriado_trabajado', 'pe_plame_dominical', 'pe_primero_mayo_descanso', 'pe_primero_mayo_en_ausencia'], { alto: 1000 });
    await grupos(p, c, 4, 'PLAME', 'c18_04c_opciones_feriados', ['pe_separar_feriados_licencias']);
  },
  // ---------------------------------------------------------------- 19
  async c19_ajustes(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-base.action_res_company_form/1');
    await tab(p, 'Nómina PE - Asistencias');
    hechos.c19_01_ajustes_asistencias = limpio(await p.locator('.o_notebook .tab-pane.active').innerText());
    await cap(p, 'c19_01_ajustes_asistencias', { resaltar: ['.o_field_widget[name="asistencia_pagar_feriado_trabajado"]'] });
  },
  // ---------------------------------------------------------------- 22
  async c22_suspensiones(p, c) {
    await grupos(p, c, 4, 'Suspensiones', 'c22_05_opciones_suspensiones', ['pe_asignacion_sin_goce', 'pe_dias_mes_con_suspension']);
  },
};

// ---------------------------------------------------------------- para los videos (E06, E07, E08, E11, E12, E13): rehacer en el v3
const { boleta } = require('./capturas_bloque3');
async function lista(p, c, compania, ruta, buscar, nombre, quitar = true) {
  await cia(c, compania); await u.irA(p, ruta);
  if (buscar) {
    for (let i = 0; i < (quitar ? 3 : 0); i++) { const x = p.locator('.o_searchview_facet .o_facet_remove').first(); if (await x.count()) { await x.click(); await p.waitForTimeout(700); } }
    const s = p.locator('.o_searchview_input'); await s.fill(buscar); await p.waitForTimeout(600); await p.keyboard.press('Enter'); await u.esperarCarga(p, 1200);
    await p.keyboard.press('Escape'); await p.mouse.click(1300, 600); await p.waitForTimeout(600);
    for (let k = 0; k < 2; k++) { const g = p.locator('.o_group_header:not(.o_group_open)').first(); if (await g.count()) { await g.click(); await p.waitForTimeout(900); } }
  }
  hechos[nombre] = limpio(await p.locator('.o_list_view, .o_content').first().innerText().catch(() => '')).slice(0, 2500);
  await cap(p, nombre);
}
Object.assign(pasos, {
  async v_e06(p, c) {
    const id = await idBoleta(p, 4, '70000501', '2026-12-01', 'Mensual');
    await boletaCalculo(p, c, 4, id, 'c10_01_calculo', { resaltar: ['ASF_001', 'NET'] });
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACC.boletas}/${id}`); await tab(p, 'Días trabajados y entradas');
    await cap(p, 'c10_01_dias');
  },
  async v_e07(p, c) {
    await lista(p, c, 1, '/odoo/action-1007', null, 'c11_01_lotes');
    await cia(c, 1); await u.irA(p, '/odoo/action-1007/1'); await cap(p, 'c11_02_lote_diciembre_fm');
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70001701', '2026-11-01', 'comisiones'), 'c11_06_adicional_comisiones', { resaltar: ['COM_001', 'ONP_001', 'ESSALUD_001'] });
  },
  async v_e08(p, c) {
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '45781236', '2026-07-01', 'Mensual'), 'c12_01_carlos_calculo', { resaltar: ['EPS_CRED_001', 'NET'] });
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '40125836', '2026-07-01', 'Mensual'), 'c12_02_ana_calculo', { resaltar: ['AFP_PRI_001', 'R5TA_001'] });
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '42736514', '2026-07-01', 'Vacaciones'), 'c12_03_nilda_vac_calculo', { resaltar: ['ESSALUD_001'] });
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70001602', '2026-11-01', 'Mensual'), 'c12_06_deducible_voluntarios', { resaltar: ['DESC_D_001', 'AFPV_001', 'AFPVE_001'] });
    await boletaCalculo(p, c, 16, await idBoleta(p, 16, '70006804', '2026-06-01', 'Mensual'), 'c12_07_tiempo_parcial_s4', { resaltar: ['ESSALUD_001'] });
  },
  async v_e11(p, c) {
    // c19_07 (checadas de Jorge) no se rehace: Jorge está archivado en FM y sus asistencias no se ven en la lista
    const cal = await rpc(p, 'resource.calendar', 'search_read', [[['company_id', '=', 1]]], { fields: ['id', 'name', 'tz'], limit: 1, context: { allowed_company_ids: [1] } });
    await cia(c, 1); await u.irA(p, `/odoo/action-resource.action_resource_calendar_form/${cal[0].id}`);
    await cap(p, 'c19_08_calendario_zona_horaria', { resaltar: ['.o_field_widget[name="tz"]'] });
  },
  async v_e12(p, c) {
    await boleta(p, c, 4, await idBoleta(p, 4, '70000901', '2026-10-01', 'Mensual'), 'c21_01_aumento_oct');
    await recortarForm('c21_01_aumento_oct_calculo');
    await boleta(p, c, 4, await idBoleta(p, 4, '70000902', '2026-10-01', 'Mensual'), 'c21_02_dos_contratos_oct');
    await recortarForm('c21_02_dos_contratos_oct_calculo');
  },
  async v_e13(p, c) {
    await boleta(p, c, 4, await idBoleta(p, 4, '70000903', '2026-11-01', 'Mensual'), 'c22_06_aumento_sin_goce');
    await recortarForm('c22_06_aumento_sin_goce_calculo');
    await lista(p, c, 4, '/odoo/action-hr_holidays.hr_leave_action_action_approve_department?view_type=list', 'AUMENTO', 'c22_07_ausencias_aumento');
  },
});

// ---------------------------------------------------------------- rehacer las capturas del v2 (permiso del coordinador del 09/11:
// en la compañía 4 se pueden crear boletas o lotes en borrador para la captura y borrarlos después; «Rectificar» en un caso y
// restablecerlo con correr_casos.py). En FM y las demás compañías, solo lectura.
const CREADOS = [];
async function nuevaBoleta(p, c, compania, empleadoNombre, desde, hasta, estructura = null) {
  await cia(c, compania); await u.irA(p, `/odoo/action-${ACC.boletas}/new`); const f = p.locator('.o_form_view').first();
  await u.muchosAUno(p, f, 'employee_id', empleadoNombre); await p.waitForTimeout(2000); await u.esperarCarga(p, 800);
  if (await p.locator('.modal:visible').count()) { await p.locator('.modal:visible button').filter({ hasText: /^\s*(Cerrar|Ok|Aceptar)\s*$/ }).last().click().catch(() => p.keyboard.press('Escape')); await p.waitForTimeout(800); }
  await u.rangoFechas(p, f, 'date_from', 'date_to', desde, hasta); await p.waitForTimeout(2500);
  if (estructura) { await u.muchosAUno(p, f, 'struct_id', estructura); await p.waitForTimeout(1800); }
  return f;
}
async function guardarCreada(p) { await u.guardar(p); await p.waitForTimeout(1200); const id = Number(p.url().split('/').pop()); CREADOS.push(['hr.payslip', id]); return id; }
async function borrarCreados(p) {
  while (CREADOS.length) {
    const [m, id] = CREADOS.pop();
    try {
      if (m === 'hr.payslip.run') { const r = await rpc(p, m, 'read', [[id]], { fields: ['slip_ids'], context: { allowed_company_ids: [4] } }); if (r[0].slip_ids.length) await rpc(p, 'hr.payslip', 'unlink', [r[0].slip_ids], { context: { allowed_company_ids: [4] } }); }
      await rpc(p, m, 'unlink', [[id]], { context: { allowed_company_ids: [4] } }); console.log('borrado', m, id);
    } catch (e) { console.log('NO SE BORRÓ', m, id, e.message.slice(0, 200)); }
  }
}
async function botonEstado(p, texto) { await p.locator('.o_statusbar_buttons button').filter({ hasText: texto }).first().click(); await p.waitForTimeout(3500); await u.esperarCarga(p, 1000).catch(() => {}); }
Object.assign(pasos, {
  async r_lectura(p, c) {
    const bol = await idBoleta(p, 4, '70000501', '2026-12-01', 'Mensual');
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACC.boletas}/${bol}`); await tab(p, 'Información contable');
    hechos.c10_01_contable = limpio(await p.locator('.o_notebook .tab-pane.active').innerText().catch(() => '')); await cap(p, 'c10_01_contable');
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70000561', '2026-06-01', 'Mensual'), 'c12_04_vidaley_calculo', { resaltar: ['VIDA_001'] });
    await cia(c, 1); await u.irA(p, '/odoo/action-975'); hechos.c18_01 = (await p.locator('.o_data_row').allInnerTexts()).map(limpio); await cap(p, 'c18_01_dias_festivos');
    await cia(c, 13); await u.irA(p, `/odoo/action-${ACC.boletas}`); await p.waitForTimeout(1500);
    hechos.c18_02 = limpio(await p.locator('.o_pe_alertas_nomina').first().innerText().catch(() => ''));
    await cap(p, 'c18_02_banda_sin_feriados', { resaltar: ['.o_pe_alertas_nomina'] });
    await cia(c, 1); await u.irA(p, '/odoo/action-base.action_res_company_form/1'); await u.pestana(p, 'Nómina PE - Controles');
    hechos.c09_04 = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 1500); await cap(p, 'c09_04_compania_controles');
  },
  async r_contratos(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/action-1009'); const s = p.locator('.o_searchview_input'); await s.fill('AUMENTO'); await p.waitForTimeout(1200); await p.keyboard.press('Enter'); await u.esperarCarga(p, 1500);
    await p.keyboard.press('Escape'); await p.mouse.click(1300, 800); await p.waitForTimeout(500);
    const n = await p.locator('.o_group_header').count();
    for (let i = 0; i < n; i++) { await p.locator('.o_group_header').nth(i).click(); await p.waitForTimeout(700); }
    hechos.c21_03 = (await p.locator('.o_data_row').allInnerTexts()).map(limpio); await cap(p, 'c21_03_versiones_del_contrato');
  },
  async r_asistencias(p, c) {
    const jo = await idBoleta(p, 4, '47852169', '2026-10-01', 'Mensual');
    await boleta(p, c, 4, jo, 'c19_02_jorge_oct_feriado', ['Asistencias', 'Días trabajados y entradas', 'Cálculo de la nómina']);
    await recortarForm('c19_02_jorge_oct_feriado_calculo');
    await cap(p, 'c19_02_jorge_oct_boton', { resaltar: ['.o_statusbar_buttons button:has-text("Cargar asistencias")'] });
    await boleta(p, c, 4, await idBoleta(p, 4, '45781236', '2026-09-01', 'Mensual'), 'c19_03_carlos_tardanzas', ['Asistencias', 'Cálculo de la nómina']);
    await recortarForm('c19_03_carlos_tardanzas_calculo');
    await boleta(p, c, 4, await idBoleta(p, 4, '47852169', '2026-09-01', 'Mensual'), 'c19_04_jorge_set_faltas', ['Asistencias', 'Días trabajados y entradas']);
    await boleta(p, c, 4, await idBoleta(p, 4, '41236547', '2026-09-01', 'Mensual'), 'c19_05_maria_parcial', ['Asistencias']);
    await boleta(p, c, 4, await idBoleta(p, 4, '43815927', '2026-09-01', 'Mensual'), 'c19_06_oscar_combinado', ['Asistencias']);
    await cia(c, 4); await u.irA(p, '/odoo/action-1050?view_type=list');
    for (let i = 0; i < 4 && await p.locator('.o_searchview_facet').count(); i++) { await p.locator('.o_searchview_facet .o_facet_remove').first().click(); await u.esperarCarga(p, 700); }
    await p.locator('.o_searchview_input').fill('Jorge Luis'); await p.keyboard.press('Enter'); await u.esperarCarga(p, 1000); await p.mouse.click(1300, 700);
    hechos.c19_07 = (await p.locator('.o_data_row').allInnerTexts()).map(limpio).slice(0, 8); await cap(p, 'c19_07_checadas_jorge');
  },
  async r_sin_importes(p, c) {
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACC.boletas}/${await idBoleta(p, 4, '70000701', '2026-11-01', 'CTS')}`);
    await botonEstado(p, /^\s*Confirmar\s*$/);
    hechos.c10_05 = limpio(await p.locator('.modal').last().innerText().catch(() => '')); await cap(p, 'c10_05_boleta_sin_importes');
    await p.keyboard.press('Escape'); await p.waitForTimeout(800);
  },
  async r_lote(p, c) {
    try {
      await cia(c, 4); await u.irA(p, '/odoo/action-1007/new'); const f = p.locator('.o_form_view').first();
      await u.escribir(f, 'name', 'Planilla enero 2027 (manual v3)');
      await u.rangoFechas(p, f, 'date_start', 'date_end', '01/01/2027', '31/01/2027').catch(() => {});
      hechos.c11_03 = limpio(await f.innerText()).slice(0, 800); await cap(p, 'c11_03_lote_nuevo');
      await u.guardar(p); await p.waitForTimeout(1000); CREADOS.push(['hr.payslip.run', Number(p.url().split('/').pop())]);
      await botonEstado(p, /Generar nóminas/);
      let m = p.locator('.modal').last();
      await m.locator('.o_field_x2many_list_row_add a').first().click(); await p.waitForTimeout(1500);
      const sel = p.locator('.modal').last();
      await sel.locator('.o_searchview_input').fill('Trabajadora BOLETA'); await p.keyboard.press('Enter'); await p.waitForTimeout(1500);
      await sel.locator('.o_data_row').filter({ hasText: 'BOLETA' }).first().click(); await p.waitForTimeout(1500);
      m = p.locator('.modal').last(); await cap(p, 'c11_04_generar_nominas');
      await m.locator('button').filter({ hasText: /^\s*Generar\s*$/ }).first().click(); await p.waitForTimeout(6000); await u.esperarCarga(p, 1500);
      hechos.c11_05 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 1500); await cap(p, 'c11_05_lote_generado');
    } finally { await borrarCreados(p); }
  },
  async r_sin_goce(p, c) {
    const id = await idBoleta(p, 4, '70000903', '2026-11-01', 'Mensual');
    await boleta(p, c, 4, id, 'c22_01_semana_sin_goce', ['Días trabajados y entradas']);
    await boletaCalculo(p, c, 4, id, 'c22_02_permiso_2_horas_calculo', { resaltar: ['RB_001', 'NET'] });
    await lista(p, c, 4, '/odoo/action-hr_holidays.hr_leave_action_action_approve_department?view_type=list', 'AUMENTO', 'c22_04_ausencias_sin_goce');
    try {
      const e = await empleado(p, 4, '70000904');
      await nuevaBoleta(p, c, 4, e.name, '01/11/2026', '30/11/2026'); await guardarCreada(p);
      await botonEstado(p, /Calcular hoja/);
      await tab(p, 'Días trabajados y entradas'); hechos.c22_03 = limpio(await p.locator('.o_notebook .tab-pane.active').innerText().catch(() => ''));
      await cap(p, 'c22_03_mes_sin_goce_dias');
    } finally { await borrarCreados(p); }
  },
  async r_avisos(p, c) {
    try {
      const e1 = await empleado(p, 4, '70000901');
      await nuevaBoleta(p, c, 4, e1.name, '01/12/2026', '31/12/2026', 'Gratificaciones'); await guardarCreada(p);
      await nuevaBoleta(p, c, 4, e1.name, '01/12/2026', '31/12/2026');
      hechos.c26_01 = limpio(await p.locator('.o_form_view .alert').allInnerTexts().then((x) => x.join(' || ')).catch(() => ''));
      await cap(p, 'c26_01_diciembre_grati_borrador_dias', { resaltar: ['.o_form_view .alert-warning'] }); await descartar(p);
      await nuevaBoleta(p, c, 4, 'Gerardo Luis Salazar Prado', '01/11/2026', '30/11/2026', 'Nómina Mensual Empleados');
      hechos.c26_02 = limpio(await p.locator('.o_form_view .alert').allInnerTexts().then((x) => x.join(' || ')).catch(() => ''));
      await cap(p, 'c26_02_sin_sistema_pensionario', { resaltar: ['.o_form_view .alert-warning'] }); await descartar(p);
      const e3 = await empleado(p, 4, '70000903');
      await nuevaBoleta(p, c, 4, e3.name, '01/08/2026', '31/08/2026');
      hechos.c26_04 = limpio(await p.locator('.o_form_view .alert').allInnerTexts().then((x) => x.join(' || ')).catch(() => ''));
      await cap(p, 'c26_04_sin_contrato_vigente', { resaltar: ['.o_form_view .alert-warning'] }); await descartar(p);
      await nuevaBoleta(p, c, 4, 'Trabajadora INDEMNIZACION tope con un hijo', '01/12/2024', '31/12/2024'); await guardarCreada(p);
      await botonEstado(p, /Calcular hoja/);
      const m = p.locator('.modal').last();
      hechos.c26_03 = limpio(await m.innerText().catch(() => '')); await cap(p, 'c26_03_vigencia_faltante');
      await m.locator('button, a').filter({ hasText: /Ver detalles/ }).first().click().catch(() => {}); await p.waitForTimeout(1000);
      await p.evaluate(() => document.querySelectorAll('.modal pre, .modal .o_error_detail, .modal code').forEach((e) => { e.scrollTop = e.scrollHeight; let q = e.parentElement; while (q) { q.scrollTop = q.scrollHeight; q = q.parentElement; } })); await p.waitForTimeout(500);
      hechos.c26_03b = limpio(await m.innerText().catch(() => '')).slice(0, 2000); await cap(p, 'c26_03b_vigencia_detalle');
      await p.keyboard.press('Escape'); await p.waitForTimeout(600);
      await p.locator('.modal button').filter({ hasText: /Cerrar|De acuerdo|Aceptar/ }).first().click().catch(() => {});
    } finally { await borrarCreados(p); }
  },
  async r_rectificar(p, c) {
    const id = await idBoleta(p, 4, '70001707', '2026-11-01', 'Mensual');
    await boleta(p, c, 4, id, 'c25_01_original', []);
    await cap(p, 'c25_01_original_rectificar', { resaltar: ['.o_statusbar_buttons button:has-text("Rectificar")'] });
    await botonEstado(p, /^\s*Rectificar\s*$/);
    const notas = await rpc(p, 'hr.payslip', 'search_read', [[['pe_boleta_origen_id', '=', id], ['credit_note', '=', true]]], { fields: ['id'], context: { allowed_company_ids: [4] } });
    hechos.c25_nota = notas.map((x) => x.id);
    await boletaCalculo(p, c, 4, notas[0].id, 'c25_02_rectificativa_calculo', { resaltar: ['RB_001', 'NET'] });
    try {
      const e = await empleado(p, 4, '70001707');
      await nuevaBoleta(p, c, 4, e.name, '01/11/2026', '30/11/2026', 'copia del caso ADICIONALES'); const nueva = await guardarCreada(p);
      await botonEstado(p, /Calcular hoja/);
      await boletaCalculo(p, c, 4, nueva, 'c25_03_reemplazo_calculo', { resaltar: ['RB_001', 'NET'] });
      await lista(p, c, 4, `/odoo/action-${ACC.boletas}?view_type=list`, e.name, 'c25_04_lista_boletas_rectificada');
    } finally { await borrarCreados(p); }
  },
});

pasos.todo = async (p, c) => { for (const n of Object.keys(pasos).filter((x) => x !== 'todo')) { try { await pasos[n](p, c); console.log('OK', n); } catch (e) { console.log('FALLÓ', n, e.message.split('\n')[0]); } } };

module.exports = { pasos };
if (require.main === module) {
  (async () => {
    if (process.argv[2] === 'lista') { console.log(Object.keys(pasos).join(',')); return; }
    const { navegador, contexto, pagina } = await u.abrir({ ancho: 1600, alto: Number(process.env.ALTO || 900) });
    await u.asegurarLogin(pagina, contexto);
    for (const n of process.argv[2].split(',')) {
      try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await u.captura(pagina, 'error_g3_' + n).catch(() => {}); }
      fs.writeFileSync(HECHOS, JSON.stringify(hechos, null, 1));
    }
    await navegador.close();
  })();
}
