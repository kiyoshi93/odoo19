// Manual v2, bloque 1 (capítulos 1 a 9): capturas. En FM solo se lee o se descarta;
// el único escenario que escribe (V-02) va en SOLSE Demo Servicios y se borra después por RPC.
// Uso: CAPTURAS_DIR=<v2/capturas> NPM_G=$(npm root -g) SESION_FILE=... node capturas_bloque1.js paso1,paso2
const fs = require('fs'); const path = require('path');
const u = require('../../scripts/odoo_ui');
const DIR = process.env.CAPTURAS_DIR;
const HECHOS = path.join(__dirname, '..', 'medidas', 'ui_bloque1.json');
const hechos = fs.existsSync(HECHOS) ? JSON.parse(fs.readFileSync(HECHOS)) : {};
const limpio = (s) => (s || '').replace(/\s+/g, ' ').trim();
async function cia(ctx, v) { await ctx.addCookies([{ name: 'cids', value: String(v), url: u.URL_BASE }]); }
async function menu(p, texto) {
  await p.locator('.o_menu_sections .dropdown-toggle, .o_menu_sections button').filter({ hasText: texto }).first().click();
  await p.waitForTimeout(700);
}
async function descartar(p) {
  const b = p.locator('.o_form_button_cancel').first();
  if (await b.isVisible().catch(() => false)) { await b.click(); await p.waitForTimeout(800); }
}
const cap = (p, n, o = {}) => u.captura(p, n, o);

const pasos = {
  async c02_aplicaciones(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-base.open_module_tree?view_type=list');
    await p.locator('.o_searchview_facet .o_facet_remove').first().click().catch(() => {});
    for (const t of ['Nómina Peruana', 'Payroll', 'PLAME']) { await p.locator('.o_searchview_input').fill(t); await p.keyboard.press('Enter'); await u.esperarCarga(p, 800); }
    await p.locator('.o_searchview_dropdown_toggler').click(); await p.waitForTimeout(500);
    await p.locator('.o_filter_menu .o_menu_item, .o_dropdown_container .o-dropdown-item').filter({ hasText: /^\s*Instalad/ }).first().click(); await u.esperarCarga(p, 1200);
    await p.keyboard.press('Escape');
    hechos.c02_aplicaciones = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c02_01_aplicaciones_versiones');
  },
  async c02_laboratorio(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/action-1079');
    if (await p.locator('.o_data_row').count()) { await p.locator('.o_data_row').first().click(); await u.esperarCarga(p, 1000); }
    hechos.c02_lab_botones = (await p.locator('.o_form_view button:visible').allInnerTexts()).map(limpio).filter(Boolean);
    await cap(p, 'c02_02_laboratorio', { resaltar: ['button[name="accion_sincronizar_casos"]'] });
  },
  async c02_casos(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/action-1080');
    await p.locator('.o_group_header').first().click(); await u.esperarCarga(p, 1000);
    hechos.c02_casos = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c02_03_casos_100');
    await p.locator('.o_data_row').filter({ hasText: 'TREGISTRO' }).first().click(); await u.esperarCarga(p, 1000);
    hechos.c02_caso_botones = (await p.locator('.o_form_view .o_statusbar_buttons button:visible, .o_form_view header button:visible').allInnerTexts()).map(limpio).filter(Boolean);
    await cap(p, 'c02_04_caso_tregistro');
  },
  async c02_datos_prueba(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1044');
    const m = p.locator('.modal').last();
    hechos.c02_datos_prueba_fm = limpio(await m.innerText().catch(() => ''));
    await cap(p, 'c02_05_datos_de_prueba_en_fm');
    await p.keyboard.press('Escape');
  },
  async c03_menus(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1005');
    await p.locator('.o_navbar_apps_menu button, .o_menu_toggle').first().click(); await p.waitForTimeout(1200);
    await cap(p, 'c03_01_menu_principal'); await p.keyboard.press('Escape');
    await u.irA(p, '/odoo/action-1005');
    await menu(p, 'Nómina PE'); hechos.c03_nomina_pe = (await p.locator('.dropdown-menu:visible .dropdown-item, .dropdown-menu:visible .dropdown-header').allInnerTexts()).map(limpio);
    await cap(p, 'c03_02_menu_nomina_pe'); await p.keyboard.press('Escape');
    await menu(p, 'Configuración'); hechos.c03_configuracion = (await p.locator('.dropdown-menu:visible .dropdown-item').allInnerTexts()).map(limpio);
    await cap(p, 'c03_03_menu_configuracion'); await p.keyboard.press('Escape');
    await menu(p, 'Empleados'); await cap(p, 'c03_04_menu_empleados'); await p.keyboard.press('Escape');
  },
  async c04_parametros(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1016');
    for (const g of await p.locator('.o_group_header').all()) { await g.click(); await p.waitForTimeout(500); }
    hechos.c04_lista = (await p.locator('.o_data_row, .o_group_header').allInnerTexts()).map(limpio);
    await cap(p, 'c04_01_parametros_lista');
    await u.irA(p, '/odoo/action-1016/2');
    hechos.c04_rmv = limpio(await p.locator('.o_form_view').first().innerText());
    await cap(p, 'c04_02_parametro_rmv');
  },
  async c04_rma(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1016/7');
    hechos.c04_rma = limpio(await p.locator('.o_form_view').first().innerText());
    await cap(p, 'c04_03_parametro_rma');
  },
  async c04_editor_afp(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1016/8');
    hechos.c04_comision = limpio(await p.locator('.o_form_view').first().innerText());
    await cap(p, 'c04_04_parametro_comision_afp', { resaltar: ['button[name="action_nueva_vigencia"]'] });
    await p.locator('button[name="action_nueva_vigencia"]').first().click();
    await p.locator('.modal .o_data_row').first().waitFor(); await p.waitForTimeout(800);
    hechos.c04_dialogo_afp = limpio(await p.locator('.modal').last().innerText());
    await cap(p, 'c04_05_nueva_vigencia_comision_afp');
    await p.locator('.modal button[special="cancel"], .modal .btn-close').first().click(); await p.waitForTimeout(600);
  },
  async c04_editor_tramos(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1016/12');
    await p.locator('.o_field_one2many .o_data_row button[name="action_editar_en_tabla"]').first().click();
    await p.locator('.modal .o_data_row').first().waitFor(); await p.waitForTimeout(800);
    hechos.c04_dialogo_tramos = limpio(await p.locator('.modal').last().innerText());
    await cap(p, 'c04_06_editar_tramos_en_tabla');
    await p.locator('.modal button[special="cancel"], .modal .btn-close').first().click(); await p.waitForTimeout(600);
  },
  async c04_rechazo(p, c) {
    // V-01: el valor «1,230» se rechaza al guardar; se descarta (nada se graba)
    await cia(c, 1); await u.irA(p, '/odoo/action-1016/2');
    await p.locator('.o_field_one2many .o_field_x2many_list_row_add a').first().click(); await p.waitForTimeout(800);
    const fila = p.locator('.o_field_one2many .o_data_row.o_selected_row').first();
    await fila.locator('[name="date_from"] input').fill('01/01/2027'); await p.keyboard.press('Escape').catch(() => {});
    await fila.locator('[name="parameter_value"] input, [name="parameter_value"] textarea').first().fill('1,230');
    await p.locator('.o_form_button_save').first().click(); await p.waitForTimeout(1500);
    hechos.c04_rechazo = limpio(await p.locator('.modal, .o_notification').last().innerText().catch(() => ''));
    await cap(p, 'c04_07_valor_rechazado');
    await p.locator('.modal button').filter({ hasText: /Cerrar|Aceptar|De acuerdo|Ok/i }).first().click().catch(() => {});
    await descartar(p);
    hechos.c04_rechazo_descartado = true;
  },

  async c05_maestros(p, c) {
    await cia(c, 1);
    for (const [acc, n] of [[1026, 'c05_01_t22_conceptos_plame'], [1023, 'c05_02_t11_sistemas_pensionarios'], [1027, 'c05_04_t12_tipos_contrato'], [1034, 'c05_05_t19_vinculos'], [1097, 'c05_06_t28_ubigeo'], [1096, 'c05_07_t34_carreras'], [1024, 'c05_08_t33_regimenes']]) {
      await u.irA(p, '/odoo/action-' + acc);
      hechos[n] = { total: limpio(await p.locator('.o_pager_counter').first().innerText().catch(() => '')), filas: (await p.locator('.o_data_row').allInnerTexts()).slice(0, 6).map(limpio) };
      await cap(p, n);
    }
    await u.irA(p, '/odoo/action-1026');
    await p.locator('.o_searchview_input').fill('0121'); await p.waitForTimeout(800);
    hechos.c05_busqueda_opciones = (await p.locator('.o_searchview_autocomplete li').allInnerTexts()).map(limpio);
    await p.keyboard.press('Enter'); await u.esperarCarga(p, 1000);
    hechos.c05_busqueda = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c05_03_busqueda_por_codigo');
  },
  async c06_seguros(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1033');
    hechos.c06_eps = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c06_01_planes_eps');
    await cia(c, 4); await u.irA(p, '/odoo/action-1032');
    hechos.c06_vidaley = { columnas: await p.locator('.o_list_view thead th').evaluateAll((t) => t.map((x) => x.innerText.trim()).filter(Boolean)), filas: (await p.locator('.o_data_row').allInnerTexts()).map(limpio) };
    await cap(p, 'c06_02_polizas_vida_ley');
    await p.locator('.o_data_row').first().click(); await u.esperarCarga(p, 1000);
    hechos.c06_vidaley_form = limpio(await p.locator('.o_form_view').first().innerText());
    await cap(p, 'c06_03_poliza_vida_ley');
  },
  async c07_contabilidad(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1035');
    hechos.c07_mapeo = { total: limpio(await p.locator('.o_pager_counter').first().innerText().catch(() => '')), filas: (await p.locator('.o_data_row').allInnerTexts()).map(limpio) };
    await cap(p, 'c07_01_mapeo_pcge');
    await u.irA(p, '/odoo/action-1036');
    hechos.c07_asignar = limpio(await p.locator('.modal, .o_form_view').last().innerText().catch(() => ''));
    await cap(p, 'c07_02_asignar_cuentas'); await p.keyboard.press('Escape');
    await u.irA(p, '/odoo/action-account.action_account_journal_form/13');
    hechos.c07_diario = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 500);
    await cap(p, 'c07_03_diario_planillas');
    await u.irA(p, '/odoo/action-1002/' + process.env.REGLA_RB);
    for (const t of ['Contabilidad', 'Accounting']) { const tab = p.locator('.o_notebook .nav-link').filter({ hasText: new RegExp('^\\s*' + t + '\\s*$') }); if (await tab.count()) { await tab.first().click(); await p.waitForTimeout(600); } }
    hechos.c07_regla = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 900);
    await cap(p, 'c07_04_regla_cuentas');
  },
  async c08_ficha(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/employees/27');
    await cap(p, 'c08_01_ficha_lucia');
    await u.pestana(p, 'Personal'); hechos.c08_personal = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 900);
    await cap(p, 'c08_02_personal');
    await u.pestana(p, 'Nómina PE'); hechos.c08_nomina_pe = limpio(await p.locator('.o_notebook .tab-pane.active').innerText());
    await cap(p, 'c08_03_nomina_pe_1');
    for (const [sel, n] of [['[name="pe_tipo_via"], [name="pe_ubigeo_t28_id"]', 'c08_04_nomina_pe_domicilio'], ['[name="pe_estudio_peru"]', 'c08_05_nomina_pe_estudios'], ['[name="relative_ids"]', 'c08_06_derechohabientes']]) {
      const l = p.locator(sel).first(); if (await l.count()) { await l.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await cap(p, n); }
    }
  },
  async c08_ficha_tregistro(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/employees/' + process.env.EMP_TR);
    await u.pestana(p, 'Nómina PE');
    hechos.c08_tr = limpio(await p.locator('.o_notebook .tab-pane.active').innerText());
    await cap(p, 'c08_07_tregistro_identificacion');
    for (const [sel, n] of [['[name="pe_ubigeo_t28_id"]', 'c08_08_tregistro_domicilio'], ['[name="pe_carrera_t34_id"], [name="pe_estudio_peru"]', 'c08_09_tregistro_estudios'], ['[name="pe_boleta_electronica"]', 'c08_10_entrega_electronica'], ['[name="relative_ids"]', 'c08_11_tregistro_derechohabientes']]) {
      const l = p.locator(sel).first(); if (await l.count()) { await l.scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await cap(p, n); }
    }
  },
  async c08_contrato(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1009');
    await p.locator('.o_searchview_facet .o_facet_remove').first().click().catch(() => {}); await u.esperarCarga(p, 1000);
    hechos.c08_contratos = { columnas: await p.locator('.o_list_view thead th').evaluateAll((t) => t.map((x) => x.innerText.trim()).filter(Boolean)), filas: (await p.locator('.o_data_row').allInnerTexts()).map(limpio).slice(0, 5) };
    await cap(p, 'c08_12_lista_contratos');
    await u.irA(p, '/odoo/action-1009/27');
    hechos.c08_contrato_tabs = (await p.locator('.o_notebook .nav-link').allInnerTexts()).map(limpio);
    hechos.c08_contrato = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 2500);
    await cap(p, 'c08_13_contrato_lucia');
    for (const t of hechos.c08_contrato_tabs) {
      const tab = p.locator('.o_notebook .nav-link').filter({ hasText: new RegExp('^\\s*' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$') });
      await tab.first().click(); await p.waitForTimeout(600);
      hechos['c08_contrato_tab_' + t] = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 1500);
      await cap(p, 'c08_14_contrato_' + t.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '_'));
    }
    const cat = p.locator('.o_field_widget[name="structure_type_id"] input').first();
    if (await cat.count()) {
      await cat.scrollIntoViewIfNeeded(); await cat.click(); await p.waitForTimeout(1000);
      hechos.c08_categoria_pago = (await p.locator('.o-autocomplete--dropdown-menu .dropdown-item').allInnerTexts()).map(limpio);
      await cap(p, 'c08_15_categoria_del_pago'); await p.keyboard.press('Escape');
    }
    await descartar(p);
  },
  async c08_contrato_tregistro(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/action-1009/' + process.env.VER_TR);
    hechos.c08_tr_contrato_tabs = (await p.locator('.o_notebook .nav-link').allInnerTexts()).map(limpio);
    const t8 = p.locator('.o_field_widget[name="pe_tipo_trabajador"]').first();
    for (const t of hechos.c08_tr_contrato_tabs) {
      if (await t8.isVisible().catch(() => false)) break;
      await p.locator('.o_notebook .nav-link').filter({ hasText: new RegExp('^\\s*' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$') }).first().click(); await p.waitForTimeout(500);
    }
    if (await t8.count()) await t8.scrollIntoViewIfNeeded();
    hechos.c08_tr_contrato = limpio(await p.locator('.o_notebook .tab-pane.active').innerText()).slice(0, 2000);
    await cap(p, 'c08_16_contrato_t8_t24');
  },
  async c09_estructuras(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-999');
    hechos.c09_estructuras = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    await cap(p, 'c09_01_estructuras');
    await p.locator('.o_data_row').filter({ hasText: 'NME' }).first().click(); await u.esperarCarga(p, 1000);
    hechos.c09_nme = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 3000);
    await cap(p, 'c09_02_estructura_nme');
    await u.irA(p, '/odoo/action-1002');
    hechos.c09_reglas = (await p.locator('.o_group_header, .o_data_row').allInnerTexts()).map(limpio).slice(0, 40);
    await cap(p, 'c09_03_reglas_agrupadas');
  },
  async c02_menu_alto(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1005'); await menu(p, 'Nómina PE');
    await cap(p, 'c03_02_menu_nomina_pe'); await p.keyboard.press('Escape');
  },

  async c08_salud(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/employees/27'); await u.pestana(p, 'Nómina PE');
    const l = p.locator('.o_field_widget[name="pe_regimen_salud"], .o_field_widget[name="management_eps"]').first();
    await l.scrollIntoViewIfNeeded(); await p.mouse.wheel(0, 250); await p.waitForTimeout(500);
    await cap(p, 'c08_17_salud_cuentas_firma');
  },
  async c06_sctr(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/employees/' + process.env.EMP_SCTR); await u.pestana(p, 'Nómina PE');
    const l = p.locator('.o_field_widget[name="pe_sctr_salud"]').first(); await l.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
    await cap(p, 'c06_04_sctr_en_la_ficha', { resaltar: ['.o_field_widget[name="pension_sctr"]'] });
  },
  async c09_reglas_abiertas(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1002');
    await p.locator('.o_group_header').filter({ hasText: 'Nómina Mensual Empleados' }).first().click(); await u.esperarCarga(p, 1000);
    await cap(p, 'c09_03_reglas_agrupadas');
  },
  async c09_controles(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-base.action_res_company_form/1');
    hechos.c09_tabs_compania = (await p.locator('.o_notebook .nav-link').allInnerTexts()).map(limpio);
    await u.pestana(p, 'Nómina PE - Controles');
    hechos.c09_controles = limpio(await p.locator('.o_notebook .tab-pane.active').innerText());
    await cap(p, 'c09_04_compania_controles');
  },
  async c04_banda(p, c) {
    // V-03: en FM no hay alertas a hoy; con una boleta nueva de enero de 2027 (sin guardar) aparecen
    await cia(c, 1); await u.irA(p, '/odoo/action-1005');
    hechos.c04_banda_fm_hoy = limpio(await p.locator('.o_pe_alertas_nomina').first().innerText().catch(() => ''));
    await u.irA(p, '/odoo/action-1005/new'); const f = p.locator('.o_form_view').first();
    await u.muchosAUno(p, f, 'employee_id', 'Lucía'); await p.waitForTimeout(2000); await u.esperarCarga(p, 800);
    await u.rangoFechas(p, f, 'date_from', 'date_to', '01/01/2027', '31/01/2027'); await p.waitForTimeout(2500);
    hechos.c04_banda_2027 = limpio(await p.locator('.o_form_view .alert').allInnerTexts().then((x) => x.join(' || ')).catch(() => ''));
    await cap(p, 'c04_08_boleta_2027_alertas_rma_uit', { resaltar: ['.o_form_view .alert-warning'] });
    await descartar(p);
    await p.locator('.modal button').filter({ hasText: /Descartar/ }).first().click().catch(() => {});
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
