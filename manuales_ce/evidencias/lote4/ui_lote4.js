// Lote 4: capturas y lecturas de interfaz. Lo que se abre como nuevo se descarta; los diálogos se cancelan.
const fs = require('fs'); const path = require('path');
const u = require('/home/user/odoo19/manuales_ce/scripts/odoo_ui');
const SALIDA = path.join(__dirname, 'out'); const CAPTURAS = path.join(SALIDA, 'capturas');
fs.mkdirSync(CAPTURAS, { recursive: true });
const ARCHIVO = path.join(SALIDA, 'ui_hechos.json');
const hechos = fs.existsSync(ARCHIVO) ? JSON.parse(fs.readFileSync(ARCHIVO)) : {};
const reg = JSON.parse(fs.readFileSync(path.join(SALIDA, 'registros_prueba.json')));
const ids = JSON.parse(fs.readFileSync(path.join(SALIDA, 'o8_dic_parcial.json')));
const v0 = JSON.parse(fs.readFileSync(path.join(SALIDA, 'v02_v03_o7.json')));
const foto = (p, n) => p.screenshot({ path: path.join(CAPTURAS, n + '.png') });
const banda = async (p) => (await p.locator('.alert-warning, .o_pe_avisos, [class*="pe_aviso"], [class*="pe-aviso"]').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim()).filter(Boolean);
const encabezados = (p) => p.locator('.o_list_view thead th').evaluateAll((t) => t.map((x) => x.innerText.trim()).filter(Boolean));
async function descartar(p) {
  const b = p.locator('.o_form_button_cancel').first();
  if (await b.isVisible().catch(() => false)) { await b.click(); await p.waitForTimeout(800); }
  const ok = p.locator('.modal button:has-text("Descartar")'); if (await ok.count()) await ok.first().click().catch(() => {});
}
async function cancelarDialogo(p) {
  const b = p.locator('.modal-footer button:has-text("Cancelar"), .modal-footer button:has-text("Descartar"), .modal .btn-close').first();
  if (await b.isVisible().catch(() => false)) { await b.click(); await p.waitForTimeout(800); }
}

const pasos = {
  async v03_listas(p) {
    await u.irA(p, '/odoo/action-1005'); hechos.v03_lista_boletas = await banda(p); await foto(p, 'v03_01_lista_boletas_sin_banda');
    await u.irA(p, '/odoo/action-1007'); hechos.v03_lista_lotes = await banda(p); await foto(p, 'v03_02_lista_lotes_sin_banda');
  },
  async v03_boleta(p) { await u.irA(p, `/odoo/action-1005/${v0.v03_boleta_ene2027.id}`); hechos.v03_boleta = await banda(p); await foto(p, 'v03_03_boleta_enero_2027'); },
  async o7(p) {
    await u.irA(p, '/odoo/action-1005/new'); const f = p.locator('.o_form_view').first();
    await u.muchosAUno(p, f, 'employee_id', 'Prueba L4 O7'); await p.waitForTimeout(2500);
    const dlg = p.locator('.modal .modal-body'); hechos.o7_emergente = (await dlg.count()) ? (await dlg.first().innerText()).trim() : null;
    await foto(p, 'v04_01_o7_mensaje_emergente');
    const cerrar = p.locator('.modal-footer button').first(); if (await cerrar.isVisible().catch(() => false)) await cerrar.click();
    await p.waitForTimeout(800); hechos.o7_banda_nueva = await banda(p); await foto(p, 'v04_02_o7_banda_boleta_nueva'); await descartar(p);
    await u.irA(p, `/odoo/action-1005/${v0.o7.id}`); hechos.o7_banda_guardada = await banda(p); await foto(p, 'v04_03_o7_banda_boleta_guardada');
  },
  async o8(p) {
    await u.irA(p, `/odoo/action-1005/${ids.o8_bloquear.id}`); hechos.o8_banda = await banda(p); await foto(p, 'v04_04_o8_banda_sin_sistema_pensionario');
    await u.irA(p, `/odoo/action-1005/${ids.o8_avisar.id}`); hechos.o8_validada_historial = (await p.locator('.o-mail-Message').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim()).slice(0, 3); await foto(p, 'v04_05_o8_validada_con_avisos_historial');
  },
  async dic(p) { await u.irA(p, `/odoo/action-1005/${ids.dic.mensual}`); hechos.dic_banda = await banda(p); await foto(p, 'v04_06_dic_banda_mensual_grat_en_borrador'); },
  async dic_despues(p) { await u.irA(p, `/odoo/action-1005/${ids.dic.mensual}`); hechos.dic_banda_tras_validar_grat = await banda(p); await foto(p, 'v04_07_dic_sin_banda_tras_validar_grat'); },
  async controles(p) {
    await u.irA(p, '/odoo/action-base.action_res_company_form/1');
    await p.locator('.o_notebook .nav-link').filter({ hasText: /Nómina PE - Controles/ }).first().click(); await p.waitForTimeout(600);
    hechos.controles = (await p.locator('.o_notebook .tab-pane.active').innerText()).replace(/\s+/g, ' ').trim();
    await foto(p, 'v04_08_compania_pestana_controles');
    await p.locator('.o_notebook .nav-link').filter({ hasText: /^\s*Nómina PE\s*$|Nómina/ }).first().click().catch(() => {});
    hechos.senati_visible = (await p.locator('.o_form_view').first().innerText()).includes('SENATI');
  },
  async u10(p) {
    await u.irA(p, `/odoo/action-1009/${reg['Prueba L4 Dic Sintético'].version}`); const f = p.locator('.o_form_view').first();
    const c = u.campo(f, 'structure_type_id'); await c.scrollIntoViewIfNeeded(); await c.locator('input').click(); await p.waitForTimeout(1000);
    const mas = p.locator('.o-autocomplete--dropdown-menu .o_m2o_dropdown_option_search_more');
    hechos.u10_desplegable = (await p.locator('.o-autocomplete--dropdown-menu .dropdown-item').allInnerTexts()).map((x) => x.trim());
    await foto(p, 'u10_01_categoria_pago_desplegable');
    if (await mas.count()) { await mas.first().click(); await p.waitForTimeout(1200); hechos.u10_buscar_mas = (await p.locator('.modal .o_data_row').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim()); await foto(p, 'u10_02_categoria_pago_buscar_mas'); await cancelarDialogo(p); }
    await p.keyboard.press('Escape'); await descartar(p);
  },
  async q01(p) {
    hechos.q01 = { resultados: {} };
    const BOTONES = [['Generar empleados', '1. Sembrar empleados'], ['Escenario', '2. Escenario demo'], ['Liquidación', '3. Escenario de cese'],
      ['Reiniciar boletas', '5. Reiniciar boletas demo'], ['Devengar vacaciones', '6. Devengar vacaciones'], ['Validar', '4. Validación interna']];
    for (const [nombre, etiqueta] of BOTONES) {
      await u.irA(p, '/odoo/action-1044');
      if (!hechos.q01.botones) { hechos.q01.botones = (await p.locator('button:visible').allInnerTexts()).map((x) => x.trim()).filter((x) => /^\d\./.test(x)); await foto(p, 'q01_01_asistente_datos_prueba'); }
      const boton = p.locator('.modal button').filter({ hasText: etiqueta }).first();
      if (!(await boton.count())) { hechos.q01.resultados[nombre] = 'botón no encontrado'; continue; }
      await boton.click(); await p.waitForTimeout(3000);
      const err = p.locator('.o_error_dialog .modal-body, .modal:has(.o_dialog_warning) .modal-body, .modal-body:has-text("compañía real")');
      hechos.q01.resultados[nombre] = (await err.count()) ? (await err.last().innerText()).replace(/\s+/g, ' ').trim() : 'sin error: ' + (await p.locator('.o_form_view, .modal .o_form_view').last().innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 600);
      await foto(p, 'q01_' + nombre.replace(/\s+/g, '_').toLowerCase());
      await p.keyboard.press('Escape'); await p.waitForTimeout(400); await p.keyboard.press('Escape'); await p.waitForTimeout(400);
      await p.goto('about:blank');
    }
  },
  async q02(p) {
    const menus = await p.evaluate(async () => (await (await fetch('/web/dataset/call_kw', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ jsonrpc: '2.0', method: 'call', params: { model: 'ir.ui.menu', method: 'search_read', args: [[['name', 'ilike', 'T12']]], kwargs: { fields: ['complete_name', 'action'] } } }) })).json()).result);
    hechos.q02_menus = menus.map((m) => m.complete_name + ' | ' + m.action);
    const accion = (menus.find((m) => /Tipos de contrato \(T12\)/.test(m.complete_name)) || {}).action;
    if (accion) {
      await u.irA(p, '/odoo/action-' + accion.split(',')[1]);
      hechos.q02_lista = { columnas: await encabezados(p), filas: await p.locator('.o_data_row').count(), pie: await p.locator('.o_pager_counter').innerText().catch(() => '') };
      await foto(p, 'q02_01_t12_lista');
      await p.locator('.o_searchview_dropdown_toggler').click(); await p.waitForTimeout(600);
      const opc = p.locator('.o_search_bar_menu .dropdown-item, .o-dropdown--menu .o_menu_item').filter({ hasText: /Desactivad|Archivad|Inactiv/ });
      hechos.q02_filtro = await opc.first().innerText().catch(() => null);
      if (await opc.count()) { await opc.first().click(); await u.esperarCarga(p, 1000); await p.keyboard.press('Escape'); hechos.q02_desactivados = (await p.locator('.o_data_row').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim()); await foto(p, 'q02_02_t12_desactivados'); }
    }
    await u.irA(p, `/odoo/action-1009/${reg['Prueba L4 Dic Sintético'].version}`);
    hechos.q02_contrato_etiqueta = (await p.locator('.o_form_view .o_form_label').allInnerTexts()).map((x) => x.trim()).filter((x) => /T12|MINTRA|Tipo de contrato/.test(x));
    const lbl = p.locator('.o_form_view .o_form_label').filter({ hasText: /T12/ }).first(); if (await lbl.count()) await lbl.scrollIntoViewIfNeeded();
    await foto(p, 'q02_03_contrato_tipo_t12');
  },
  async u08(p) {
    await u.irA(p, '/odoo/action-1016/8');
    hechos.u08 = { url: p.url() };
    await p.locator('button:visible').filter({ hasText: 'Nueva vigencia' }).first().click(); await u.esperarCarga(p, 1500);
    const m = p.locator('.modal').last();
    const filas = async () => (await m.locator('.o_data_row').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim());
    const texto = async () => (await m.locator('.o_field_widget[name*="texto"], .o_field_widget[name*="valor"] textarea, .o_field_widget[name*="vista"]').allInnerTexts().catch(() => [])).join(' | ').replace(/\s+/g, ' ');
    hechos.u08.nueva = { filas: await filas(), texto: await texto(), cuerpo: (await m.innerText()).replace(/\s+/g, ' ').slice(0, 1500) };
    await foto(p, 'u08_01_nueva_vigencia');
    const habitat = m.locator('.o_data_row').filter({ hasText: /Habitat|HABITAT/i }).first();
    const celdaTasa = habitat.locator('td.o_data_cell').last(); await celdaTasa.click(); await p.waitForTimeout(500);
    const inp = habitat.locator('input').last(); await inp.fill('1.37'); await p.keyboard.press('Tab'); await p.waitForTimeout(1200);
    hechos.u08.tras_137 = { filas: await filas(), texto: await texto(), cuerpo: (await m.innerText()).replace(/\s+/g, ' ').slice(0, 1500) };
    await foto(p, 'u08_02_habitat_137');
    await cancelarDialogo(p); await p.waitForTimeout(800);
    hechos.u08.vigencias_tras_cancelar = (await p.locator('.o_field_widget[name="parameter_version_ids"] .o_data_row').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim());
    // Editar en tabla sobre la última vigencia → Cancelar
    await u.pestana(p, 'Vigencias').catch(() => {});
    const editar = p.locator('.o_field_widget[name="parameter_version_ids"] button').filter({ hasText: /Editar en tabla/ });
    hechos.u08.botones_editar = await editar.count();
    if (await editar.count()) { await editar.last().click(); await u.esperarCarga(p, 1200); await foto(p, 'u08_03_editar_en_tabla'); hechos.u08.editar = (await p.locator('.modal').last().innerText()).replace(/\s+/g, ' ').slice(0, 800); await cancelarDialogo(p); }
    hechos.u08.vigencias_final = (await p.locator('.o_field_widget[name="parameter_version_ids"] .o_data_row').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim());
    // Renta 5ta - Tramos
    await u.irA(p, '/odoo/action-1016/12');
    await u.pestana(p, 'Vigencias').catch(() => {});
    const ed2 = p.locator('.o_field_widget[name="parameter_version_ids"] button').filter({ hasText: /Editar en tabla/ });
    if (await ed2.count()) {
      await ed2.last().click(); await u.esperarCarga(p, 1200); const m2 = p.locator('.modal').last();
      hechos.u08.tramos = { columnas: await m2.locator('thead th').evaluateAll((t) => t.map((x) => x.innerText.trim()).filter(Boolean)), filas: (await m2.locator('.o_data_row').allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim()), agregar: await m2.locator('.o_field_x2many_list_row_add a').count() };
      await foto(p, 'u08_04_tramos_editar_en_tabla'); await cancelarDialogo(p);
    }
  },
};

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  await contexto.addCookies([{ name: 'cids', value: '1', url: u.URL_BASE }]);
  for (const n of process.argv[2].split(',')) {
    try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await foto(pagina, 'error_' + n).catch(() => {}); }
    fs.writeFileSync(ARCHIVO, JSON.stringify(hechos, null, 1));
  }
  await navegador.close();
})();
