// Manual v3, grupo g1_configuracion: capturas de los capítulos 3, 4, 6, 8 y 9 (pedidos en capturas_pedidas/g1_configuracion.md).
// Solo lee: abre listas, formularios y menús; no guarda nada. Los registros se buscan por DNI, código o número.
// Uso: source entorno.sh; SESION_FILE=… NODE_PATH=$NPM_G node capturas_g1_configuracion.js paso1,paso2   (lista: … lista)
const fs = require('fs'); const path = require('path');
const u = require('../../scripts/odoo_ui');
const { rpc, empleado, idBoleta, idVersion } = require('./capturas_v3');
const { cap, cia, tab, alta, limpio } = require('./capturas_bloque3');
const HECHOS = path.join(__dirname, '..', 'medidas', 'ui_g1_configuracion.json');
const hechos = fs.existsSync(HECHOS) ? JSON.parse(fs.readFileSync(HECHOS)) : {};
const ACC = { boletas: 1005, contratos: 1009 };
const ALTO = Number(process.env.ALTO || 900);
const ctx = (compania) => ({ context: { allowed_company_ids: [compania] } });

async function recortarForm(nombre, ancho = 1040) {
  require('child_process').execSync(`python3 -c "
from PIL import Image
r='${path.join(process.env.CAPTURAS_DIR, nombre)}.png'; im=Image.open(r); im.crop((0,0,min(${ancho},im.width),im.height)).save(r)"`);
  require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(process.env.CAPTURAS_DIR, nombre)}.png`);
}
async function alto(p, h) { await p.setViewportSize({ width: 1600, height: h }); await p.waitForTimeout(700); }
async function hasta(p, selector, arriba = 90) {
  const l = p.locator(selector).first();
  if (await l.count()) { await l.scrollIntoViewIfNeeded(); await p.evaluate((d) => window.scrollBy(0, -d), arriba); await p.waitForTimeout(500); }
  return l;
}
async function separador(p, texto, arriba = 70) {
  const s = p.locator('.o_horizontal_separator').filter({ hasText: texto }).first();
  if (await s.count()) {
    await s.evaluate((n, d) => { n.scrollIntoView({ block: 'start' }); const c = n.closest('.o_content') || document.scrollingElement; c.scrollBy(0, -d); }, arriba);
    await p.waitForTimeout(600);
  }
  return s;
}
async function ficha(p, c, compania, dni) {
  const e = await empleado(p, compania, dni);
  await cia(c, compania); await u.irA(p, `/odoo/employees/${e.id}`); await u.pestana(p, 'Nómina PE');
  return e;
}
async function contrato(p, c, compania, dni) {
  await cia(c, compania); await u.irA(p, `/odoo/action-${ACC.contratos}/${await idVersion(p, compania, dni)}`);
}

const pasos = {
  // ---------------------------------------------------------------- 3 · menú
  async c03_02(p, c) {
    await cia(c, 1); await alto(p, 1250); await u.irA(p, `/odoo/action-${ACC.boletas}`);
    await p.locator('.o_main_navbar .o_menu_sections button, .o_main_navbar .o_menu_sections .dropdown-toggle').filter({ hasText: /^\s*Nómina PE\s*$/ }).first().click();
    await p.waitForTimeout(1200);
    hechos.c03_02 = (await p.locator('.o-dropdown--menu, .dropdown-menu:visible').allInnerTexts()).map(limpio);
    const marcas = ['Pólizas SCTR', 'AFPnet: registrar el pago', 'Trabajadores del reparto de utilidades', 'Detalle de Renta de 5ta', 'Provisiones del mes', 'Provisiones de beneficios']
      .map((t) => p.locator('.o-dropdown--menu .dropdown-item, .dropdown-menu:visible .dropdown-item').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }));
    await cap(p, 'c03_02_menu_nomina_pe', { resaltar: marcas });
    await p.keyboard.press('Escape'); await alto(p, ALTO);
  },
  // ---------------------------------------------------------------- 4 · parámetros
  async c04_01(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-solse_pe_payroll_base.rule_parameter_pe_action');
    // abrir los grupos cerrados (si la lista abre agrupada)
    for (let i = 0; i < 12; i++) {
      const g = p.locator('.o_group_header:not(.o_group_open)').first();
      if (!(await g.count())) break; await g.click(); await p.waitForTimeout(700);
    }
    await u.esperarCarga(p, 800);
    hechos.c04_01 = limpio(await p.locator('.o_list_view, .o_list_renderer').first().innerText()).slice(0, 4000);
    await alta(p, () => cap(p, 'c04_01_parametros_lista', { resaltar: [p.locator('.o_data_row').filter({ hasText: 'pe_feriado_sobretasa' }), p.locator('.o_data_row').filter({ hasText: 'pe_renta5_tasa_no_domiciliado' })] }));
    require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(process.env.CAPTURAS_DIR, 'c04_01_parametros_lista')}.png`);
  },
  // ---------------------------------------------------------------- 6 · SCTR
  async c06_04(p, c) {
    await ficha(p, c, 4, '70002001');
    await hasta(p, '.o_field_widget[name="health_regime_id"]', 120);
    hechos.c06_04 = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 1500);
    await cap(p, 'c06_04_sctr_en_la_ficha', { resaltar: ['.o_field_widget[name="pension_sctr"]', '.o_field_widget[name="pe_sctr_salud"]', '.o_field_widget[name="pe_sctr_pension"]'] });
  },
  async c06_05(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/action-solse_pe_payroll_ce.sctr_poliza_action');
    hechos.c06_05 = limpio(await p.locator('.o_list_renderer').first().innerText()).slice(0, 2000);
    await cap(p, 'c06_05_polizas_sctr');
    require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(process.env.CAPTURAS_DIR, 'c06_05_polizas_sctr')}.png`);
  },
  async c06_06(p, c) {
    const r = await rpc(p, 'solse.pe.sctr.poliza', 'search_read', [[['entidad', '=', 'eps'], ['numero', 'ilike', 'Caso SCTR']]], { fields: ['id'], ...ctx(4) });
    await cia(c, 4); await u.irA(p, `/odoo/action-solse_pe_payroll_ce.sctr_poliza_action/${r[0].id}`);
    hechos.c06_06 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 1500);
    await cap(p, 'c06_06_poliza_sctr', { resaltar: ['.o_field_widget[name="pe_sobre_gratificacion"]', '.o_field_widget[name="tasa"]'] });
  },
  async c06_07(p, c) {
    const id = await idBoleta(p, 4, '70002002', '2026-11-01');
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACC.boletas}/${id}`);
    await tab(p, 'Cálculo de la nómina');
    const panel = p.locator('.o_notebook .tab-pane.active');
    const tog = panel.locator('.o_optional_columns_dropdown_toggle, .o_optional_columns_dropdown button').first();
    if (await tog.count()) {
      await tog.click(); await p.waitForTimeout(700);
      hechos.c06_07_opcionales = (await p.locator('.o-dropdown--menu, .dropdown-menu:visible').allInnerTexts()).map(limpio);
      for (const [t, ver] of [['Póliza SCTR', true], ['Tasa SCTR', true], ['Secuencia', false], ['Cantidad', false], ['Regla', false], ['Tasa (%)', false]]) {
        const it = p.locator('.o-dropdown--menu .dropdown-item, .dropdown-menu:visible .dropdown-item').filter({ hasText: new RegExp('^\\s*' + t.replace(/[()]/g, '\\$&') + '\\s*$') }).first();
        if (await it.count()) { const cb = it.locator('input[type="checkbox"]'); if ((await cb.isChecked().catch(() => false)) !== ver) { await it.click(); await p.waitForTimeout(600); } }
      }
      await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    }
    hechos.c06_07 = limpio(await panel.innerText()).slice(0, 3000);
    const marcas = ['SCTR_SAL_001', 'SCTR_PEN_001'].map((cod) => panel.locator('.o_data_row').filter({ hasText: cod }).first());
    // más ancho para que entren las columnas «Póliza SCTR» y «Tasa SCTR (%)»; se recorta al formulario
    await p.setViewportSize({ width: 2100, height: 2600 }); await p.waitForTimeout(900);
    const ancho = Math.round(await p.locator('.o_form_sheet_bg, .o_form_renderer > .o_form_sheet_bg').first().evaluate((n) => n.getBoundingClientRect().right).catch(() => 1400));
    hechos.c06_07_ancho = ancho;
    await cap(p, 'c06_07_boleta_sctr', { resaltar: marcas });
    await p.setViewportSize({ width: 1600, height: ALTO });
    await recortarForm('c06_07_boleta_sctr', ancho + 4);
  },
  // ---------------------------------------------------------------- 8 · ficha y contrato
  async c08_16(p, c) {
    await contrato(p, c, 4, '70001501');
    await hasta(p, '.o_field_widget[name="labor_regime_id"]', 110);
    await alto(p, 1150);
    await hasta(p, '.o_field_widget[name="labor_regime_id"]', 110);
    hechos.c08_16 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 3000);
    await cap(p, 'c08_16_contrato_t8_t24', { resaltar: ['.o_field_widget[name="pe_remuneracion_principal"]', '.o_field_widget[name="pe_fuera_de_senati"]', '.o_field_widget[name="pe_no_domiciliado"]', '.o_field_widget[name="is_practitioner"]'] });
    await alto(p, ALTO);
  },
  async c08_17(p, c) {
    await ficha(p, c, 1, '99999901');
    await hasta(p, '.o_field_widget[name="health_regime_id"]', 120);
    hechos.c08_17 = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 1500);
    await cap(p, 'c08_17_salud_cuentas_firma', { resaltar: ['.o_field_widget[name="pension_sctr"]'] });
  },
  async c08_18(p, c) {
    await contrato(p, c, 16, '000068005');
    await alto(p, 1150);
    await hasta(p, '.o_field_widget[name="labor_regime_id"]', 110);
    hechos.c08_18 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 3000);
    await cap(p, 'c08_18_contrato_no_domiciliado', { resaltar: ['.o_field_widget[name="pe_no_domiciliado"]', '.o_field_widget[name="pe_convenio_doble_tributacion"]'] });
    await alto(p, ALTO);
  },
  // ---------------------------------------------------------------- 9 · estructuras, reglas y opciones
  async c09_01(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-999');
    hechos.c09_01 = limpio(await p.locator('.o_list_renderer').first().innerText()).slice(0, 3000);
    await cap(p, 'c09_01_estructuras', { resaltar: ['th[data-name="pe_tipo_planilla"]'] });
    require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(process.env.CAPTURAS_DIR, 'c09_01_estructuras')}.png`);
  },
  async c09_05(p, c) {
    const r = await rpc(p, 'hr.salary.rule', 'search_read', [[['code', '=', 'MOVL_001'], ['struct_id.code', '=', 'NME']]], { fields: ['id'], ...ctx(1) });
    await cia(c, 1); await u.irA(p, `/odoo/action-1002/${r[0].id}`);
    await hasta(p, '.o_field_widget[name="utilities"]', 260);
    hechos.c09_05 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 2500);
    await cap(p, 'c09_05_regla_casillas', { resaltar: ['.o_field_widget[name="utilities"]', '.o_field_widget[name="pe_renta5_extraordinario"]', '.o_field_widget[name="pe_variable_computable"]', '.o_field_widget[name="pe_forma_computable"]'] });
  },
  async c09_06(p, c) {
    await cia(c, 1); await alto(p, 1300); await u.irA(p, '/odoo/action-base.action_res_company_form/1');
    await u.pestana(p, 'Nómina PE - Controles');
    const s = await separador(p, 'Seguro Vida Ley', 20);
    hechos.c09_06 = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 4000);
    await cap(p, 'c09_06_opciones_compania');
    await alto(p, ALTO);
  },
  // ---------------------------------------------------------------- retomas para los videos (mismas pantallas del v2, en noviembre de 2026)
  async c04_retomar(p, c) {
    const id = async (codigo) => (await rpc(p, 'hr.rule.parameter', 'search_read', [[['code', '=', codigo]]], { fields: ['id'], ...ctx(1) }))[0].id;
    const acc = '/odoo/action-solse_pe_payroll_base.rule_parameter_pe_action/';
    await cia(c, 1); await u.irA(p, acc + await id('pe_rmv'));
    hechos.c04_02 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 1500);
    await cap(p, 'c04_02_parametro_rmv');
    await u.irA(p, acc + await id('pe_afp_rma'));
    hechos.c04_03 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 1500);
    await cap(p, 'c04_03_parametro_rma');
    await u.irA(p, acc + await id('pe_afp_comision_flujo'));
    await cap(p, 'c04_04_parametro_comision_afp', { resaltar: ['button[name="action_nueva_vigencia"]'] });
    await p.locator('button[name="action_nueva_vigencia"]').first().click();
    await p.locator('.modal .o_data_row').first().waitFor(); await p.waitForTimeout(800);
    hechos.c04_05 = limpio(await p.locator('.modal').last().innerText());
    await cap(p, 'c04_05_nueva_vigencia_comision_afp');
    await p.locator('.modal button[special="cancel"], .modal .btn-close').first().click(); await p.waitForTimeout(600);
    await u.irA(p, acc + await id('pe_renta5_tramos'));
    await p.locator('.o_field_one2many .o_data_row button[name="action_editar_en_tabla"]').first().click();
    await p.locator('.modal .o_data_row').first().waitFor(); await p.waitForTimeout(800);
    hechos.c04_06 = limpio(await p.locator('.modal').last().innerText());
    await cap(p, 'c04_06_editar_tramos_en_tabla');
    await p.locator('.modal button[special="cancel"], .modal .btn-close').first().click(); await p.waitForTimeout(600);
    // banda de avisos de una boleta de enero de 2027 SIN guardar (se descarta)
    await cia(c, 1); await u.irA(p, `/odoo/action-${ACC.boletas}/new`); const f = p.locator('.o_form_view').first();
    await u.muchosAUno(p, f, 'employee_id', 'Lucía'); await p.waitForTimeout(2000); await u.esperarCarga(p, 800);
    await u.rangoFechas(p, f, 'date_from', 'date_to', '01/01/2027', '31/01/2027'); await p.waitForTimeout(2500);
    hechos.c04_08 = limpio(await p.locator('.o_form_view .alert').allInnerTexts().then((x) => x.join(' || ')).catch(() => ''));
    await cap(p, 'c04_08_boleta_2027_alertas_rma_uit', { resaltar: ['.o_form_view .alert-warning'] });
    const d = p.locator('.o_form_button_cancel').first(); if (await d.isVisible().catch(() => false)) { await d.click(); await p.waitForTimeout(800); }
    await p.locator('.modal button').filter({ hasText: /Descartar/ }).first().click().catch(() => {});
  },
  async c05_retomar(p, c) {
    await cia(c, 1);
    for (const [acc, n] of [['plame_lines_action', 'c05_01_t22_conceptos_plame'], ['pension_system_action', 'c05_02_t11_sistemas_pensionarios'], ['relative_relation_action', 'c05_05_t19_vinculos'], ['ubigeo_t28_action', 'c05_06_t28_ubigeo'], ['carrera_t34_action', 'c05_07_t34_carreras']]) {
      await u.irA(p, '/odoo/action-solse_pe_payroll_ce.' + acc);
      hechos[n] = { total: limpio(await p.locator('.o_pager_counter').first().innerText().catch(() => '')), filas: (await p.locator('.o_data_row').allInnerTexts()).slice(0, 6).map(limpio) };
      await cap(p, n);
    }
    await u.irA(p, '/odoo/action-solse_pe_payroll_ce.plame_lines_action');
    await p.locator('.o_searchview_input').fill('0121'); await p.waitForTimeout(800);
    await p.keyboard.press('Enter'); await u.esperarCarga(p, 1000);
    hechos.c05_03 = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c05_03_busqueda_por_codigo');
  },
  async c06_retomar(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/action-solse_pe_payroll_ce.eps_management_action');
    hechos.c06_01 = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c06_01_planes_eps');
    await u.irA(p, '/odoo/action-solse_pe_payroll_ce.life_insurance_action');
    hechos.c06_02 = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c06_02_polizas_vida_ley');
    await p.locator('.o_data_row').filter({ hasText: 'VL-TASA' }).first().click(); await u.esperarCarga(p, 1000);
    hechos.c06_03 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 1500);
    await cap(p, 'c06_03_poliza_vida_ley', { resaltar: ['.o_field_widget[name="pe_calcular_en_planilla"]'] });
    const id = await idBoleta(p, 4, '70000561', '2026-06-01', 'Mensual');
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACC.boletas}/${id}`); await tab(p, 'Cálculo de la nómina');
    const panel = p.locator('.o_notebook .tab-pane.active');
    hechos.c06_08 = limpio(await panel.innerText()).slice(0, 3000);
    await alta(p, () => cap(p, 'c06_08_boleta_vida_ley', { resaltar: [panel.locator('.o_data_row').filter({ hasText: 'VIDA_001' }).first(), panel.locator('.o_data_row').filter({ hasText: /^\s*Neto/ }).first()] }));
    await recortarForm('c06_08_boleta_vida_ley', 1040);
  },
  async c08_retomar(p, c) {
    const e = await empleado(p, 1, '99999901');
    await cia(c, 1); await u.irA(p, `/odoo/employees/${e.id}`);
    await cap(p, 'c08_01_ficha_lucia');
    await u.pestana(p, 'Nómina PE');
    hechos.c08_03 = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 2500);
    await cap(p, 'c08_03_nomina_pe_1');
    const l = p.locator('[name="relative_ids"]').first(); if (await l.count()) { await l.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); }
    await p.mouse.move(1300, 850); await p.waitForTimeout(800);
    await cap(p, 'c08_06_derechohabientes', { resaltar: ['[name="relative_ids"] .o_data_row'] });
    await contrato(p, c, 1, '99999901');
    hechos.c08_13 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 2500);
    await cap(p, 'c08_13_contrato_lucia');
  },
  // ---------------------------------------------------------------- manual al día: el resto de pantallas de los capítulos 3 a 9
  async c03_resto(p, c) {
    await cia(c, 1); await u.irA(p, `/odoo/action-${ACC.boletas}`);
    await p.locator('.o_navbar_apps_menu button, .o_menu_toggle').first().click(); await p.waitForTimeout(1200);
    hechos.c03_01 = limpio(await p.locator('.o-dropdown--menu, .o_home_menu, .dropdown-menu:visible').first().innerText().catch(() => '')).slice(0, 1500);
    await cap(p, 'c03_01_menu_principal'); await p.keyboard.press('Escape');
    for (const [m, n] of [['Configuración', 'c03_03_menu_configuracion'], ['Empleados', 'c03_04_menu_empleados']]) {
      await u.irA(p, `/odoo/action-${ACC.boletas}`);
      await p.locator('.o_main_navbar .o_menu_sections button, .o_main_navbar .o_menu_sections .dropdown-toggle').filter({ hasText: new RegExp('^\\s*' + m + '\\s*$') }).first().click();
      await p.waitForTimeout(900);
      hechos[n] = (await p.locator('.o-dropdown--menu .dropdown-item, .dropdown-menu:visible .dropdown-item').allInnerTexts()).map(limpio);
      await cap(p, n); await p.keyboard.press('Escape');
    }
  },
  async c04_07(p, c) {
    // V-01: «1,230» se rechaza al guardar (la validación falla y no graba nada); después se descarta
    const id = (await rpc(p, 'hr.rule.parameter', 'search_read', [[['code', '=', 'pe_rmv']]], { fields: ['id'], ...ctx(1) }))[0].id;
    await cia(c, 1); await u.irA(p, `/odoo/action-solse_pe_payroll_base.rule_parameter_pe_action/${id}`);
    await p.locator('.o_field_one2many .o_field_x2many_list_row_add a').first().click(); await p.waitForTimeout(800);
    const fila = p.locator('.o_field_one2many .o_data_row.o_selected_row').first();
    await fila.locator('[name="date_from"] input').fill('01/01/2027'); await p.keyboard.press('Escape').catch(() => {});
    await fila.locator('[name="parameter_value"] input, [name="parameter_value"] textarea').first().fill('1,230');
    await p.locator('.o_form_button_save').first().click(); await p.waitForTimeout(1800);
    hechos.c04_07 = limpio(await p.locator('.modal, .o_notification').last().innerText().catch(() => ''));
    await cap(p, 'c04_07_valor_rechazado');
    await p.locator('.modal button').filter({ hasText: /Cerrar|Aceptar|De acuerdo|Ok/i }).first().click().catch(() => {});
    const d = p.locator('.o_form_button_cancel').first(); if (await d.isVisible().catch(() => false)) { await d.click(); await p.waitForTimeout(800); }
    await p.locator('.modal button').filter({ hasText: /Descartar/ }).first().click().catch(() => {});
    const quedan = await rpc(p, 'hr.rule.parameter.value', 'search_count', [[['rule_parameter_id', '=', id]]], ctx(1));
    hechos.c04_07_vigencias_despues = quedan; console.log('  vigencias de pe_rmv después:', quedan);
  },
  async c05_resto(p, c) {
    await cia(c, 1);
    for (const [acc, n] of [['type_contract_action', 'c05_04_t12_tipos_contrato'], ['employee_regime_action', 'c05_08_t33_regimenes']]) {
      await u.irA(p, '/odoo/action-solse_pe_payroll_ce.' + acc);
      hechos[n] = { total: limpio(await p.locator('.o_pager_counter').first().innerText().catch(() => '')), filas: (await p.locator('.o_data_row').allInnerTexts()).slice(0, 6).map(limpio) };
      await cap(p, n);
    }
  },
  async c07_resto(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-solse_pe_payroll_ce.asignar_cuentas_wizard_action');
    hechos.c07_02 = limpio(await p.locator('.modal, .o_form_view').last().innerText().catch(() => ''));
    await cap(p, 'c07_02_asignar_cuentas');
    const b = p.locator('.modal:visible .modal-footer button, .modal:visible footer button').filter({ hasText: /^\s*(Cancelar|Descartar|Cerrar)\s*$/ });
    if (await b.count()) await b.last().click(); else await p.keyboard.press('Escape');
    const dj = await rpc(p, 'account.journal', 'search_read', [[['code', '=', 'PLLA'], ['company_id', '=', 1]]], { fields: ['id'], ...ctx(1) });
    await u.irA(p, `/odoo/action-account.action_account_journal_form/${dj[0].id}`);
    hechos.c07_03 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 800);
    await cap(p, 'c07_03_diario_planillas');
    const r = await rpc(p, 'hr.salary.rule', 'search_read', [[['code', '=', 'RB_001'], ['struct_id.code', '=', 'NME']]], { fields: ['id'], ...ctx(1) });
    await u.irA(p, `/odoo/action-1002/${r[0].id}`); await tab(p, 'Contabilidad');
    hechos.c07_04 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 1500);
    await cap(p, 'c07_04_regla_cuentas', { resaltar: ['.o_field_widget[name="account_debit"]', '.o_field_widget[name="account_credit"]'] });
  },
  async c08_resto(p, c) {
    const lu = await empleado(p, 1, '99999901');
    await cia(c, 1); await u.irA(p, `/odoo/employees/${lu.id}`); await u.pestana(p, 'Personal');
    hechos.c08_02 = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 1200);
    await cap(p, 'c08_02_personal', { resaltar: ['.o_field_widget[name="identification_id"]', '.o_field_widget[name="birthday"]'] });
    await ficha(p, c, 4, '70001501');
    hechos.c08_07 = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 3000);
    await p.mouse.move(1300, 850);
    await cap(p, 'c08_07_tregistro_identificacion');
    for (const [sel, n] of [['[name="pe_ubigeo_t28_id"]', 'c08_08_tregistro_domicilio'], ['[name="pe_carrera_t34_id"], [name="pe_estudio_peru"]', 'c08_09_tregistro_estudios'], ['[name="pe_boleta_electronica"]', 'c08_10_entrega_electronica'], ['[name="relative_ids"]', 'c08_11_tregistro_derechohabientes']]) {
      const l = p.locator(sel).first(); if (await l.count()) { await l.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await p.mouse.move(1300, 850); await p.waitForTimeout(400); await cap(p, n); }
    }
    await cia(c, 1); await u.irA(p, `/odoo/action-${ACC.contratos}`);
    await p.locator('.o_searchview_facet .o_facet_remove').first().click().catch(() => {}); await u.esperarCarga(p, 1000);
    hechos.c08_12 = { columnas: await p.locator('.o_list_view thead th').evaluateAll((t) => t.map((x) => x.innerText.trim()).filter(Boolean)), filas: (await p.locator('.o_data_row').allInnerTexts()).map(limpio).slice(0, 8) };
    await cap(p, 'c08_12_lista_contratos');
    await contrato(p, c, 1, '99999901');
    const cat = p.locator('.o_field_widget[name="structure_type_id"] input').first();
    if (await cat.count()) {
      await cat.scrollIntoViewIfNeeded(); await cat.click(); await p.waitForTimeout(1000);
      hechos.c08_15 = (await p.locator('.o-autocomplete--dropdown-menu .dropdown-item').allInnerTexts()).map(limpio);
      await cap(p, 'c08_15_categoria_del_pago'); await p.keyboard.press('Escape');
    }
    const d = p.locator('.o_form_button_cancel').first(); if (await d.isVisible().catch(() => false)) { await d.click(); await p.waitForTimeout(800); }
    await p.locator('.modal button').filter({ hasText: /Descartar/ }).first().click().catch(() => {});
  },
  async c09_resto(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-999');
    await p.locator('.o_data_row').filter({ hasText: /\bNME\b/ }).first().click(); await u.esperarCarga(p, 1000);
    hechos.c09_02 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 3000);
    await cap(p, 'c09_02_estructura_nme');
    await u.irA(p, '/odoo/action-1002');
    await p.locator('.o_group_header').filter({ hasText: 'Nómina Mensual Empleados' }).first().click(); await u.esperarCarga(p, 1000);
    hechos.c09_03 = (await p.locator('.o_group_header, .o_data_row').allInnerTexts()).map(limpio).slice(0, 40);
    await cap(p, 'c09_03_reglas_agrupadas');
  },
};

module.exports = { pasos };
if (require.main === module) {
  (async () => {
    if (process.argv[2] === 'lista') { console.log(Object.keys(pasos).join(',')); return; }
    const { navegador, contexto, pagina } = await u.abrir({ ancho: 1600, alto: ALTO });
    await u.asegurarLogin(pagina, contexto);
    const lista = process.argv[2] === 'todo' ? Object.keys(pasos) : process.argv[2].split(',');
    for (const n of lista) {
      try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await u.captura(pagina, 'error_g1_' + n).catch(() => {}); }
      fs.writeFileSync(HECHOS, JSON.stringify(hechos, null, 1));
    }
    await navegador.close();
  })();
}
