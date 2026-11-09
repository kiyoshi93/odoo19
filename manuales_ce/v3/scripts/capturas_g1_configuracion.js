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
      for (const t of ['Póliza SCTR', 'Tasa SCTR']) {
        const it = p.locator('.o-dropdown--menu .dropdown-item, .dropdown-menu:visible .dropdown-item').filter({ hasText: t }).first();
        if (await it.count()) { const cb = it.locator('input[type="checkbox"]'); if (!(await cb.isChecked().catch(() => false))) { await it.click(); await p.waitForTimeout(600); } }
      }
      await p.keyboard.press('Escape'); await p.waitForTimeout(500);
    }
    hechos.c06_07 = limpio(await panel.innerText()).slice(0, 3000);
    const marcas = ['SCTR_SAL_001', 'SCTR_PEN_001'].map((cod) => panel.locator('.o_data_row').filter({ hasText: cod }).first());
    await alta(p, () => cap(p, 'c06_07_boleta_sctr', { resaltar: marcas }));
    await recortarForm('c06_07_boleta_sctr', 1040);
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
