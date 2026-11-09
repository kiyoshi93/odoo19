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
