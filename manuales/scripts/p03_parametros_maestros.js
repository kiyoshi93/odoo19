// Capítulo 3-4: parámetros legales, maestros SUNAT y contabilidad de nómina
const { abrir, asegurarLogin, irA, captura, esperarCarga, alInicio } = require('./odoo_ui');

(async () => {
  const { navegador, contexto, pagina } = await abrir();
  await asegurarLogin(pagina, contexto);

  // 3.1 Parámetros de Nómina PE (agrupados por categoría)
  await irA(pagina, '/odoo/action-solse_pe_payroll.rule_parameter_pe_action');
  await captura(pagina, 'p03_01_parametros_grupos');
  // Expandir el grupo de parámetros generales (UIT, RMV, Asignación familiar)
  await pagina.locator('.o_group_header', { hasText: 'Generales' }).click();
  await pagina.waitForTimeout(800);
  await captura(pagina, 'p03_01_parametros_lista', { resaltar: ['th[data-name="valor_vigente"], th:has-text("Valor vigente")'] });

  // 3.2 Detalle de un parámetro con vigencias (RMA de AFP)
  await pagina.locator('.o_group_header', { hasText: 'Pensiones' }).click();
  await pagina.waitForTimeout(800);
  await pagina.locator('.o_data_row', { hasText: 'pe_afp_rma' }).first().click();
  await esperarCarga(pagina, 1000);
  await captura(pagina, 'p03_02_parametro_rma', { resaltar: ['.o_field_one2many .o_list_table'] });

  // 3.3 Parámetro UIT con dos vigencias
  await irA(pagina, '/odoo/action-solse_pe_payroll.rule_parameter_pe_action');
  await pagina.locator('.o_group_header', { hasText: 'Generales' }).click();
  await pagina.waitForTimeout(800);
  await pagina.locator('.o_data_row', { hasText: 'pe_uit' }).first().click();
  await esperarCarga(pagina, 1000);
  await captura(pagina, 'p03_03_parametro_uit', { resaltar: ['.o_field_one2many .o_list_table'] });

  // 4.1 Sistemas pensionarios (T11)
  await irA(pagina, '/odoo/action-solse_pe_payroll.pension_system_action');
  await captura(pagina, 'p04_01_sistemas_pensionarios');
  await pagina.locator('.o_data_row', { hasText: 'HABITAT' }).first().click();
  await esperarCarga(pagina, 800);
  await captura(pagina, 'p04_02_sistema_pensionario_habitat', { resaltar: ['div[name="clave_afp"]', 'div[name="cuspp"]'] });

  // 4.2 Regímenes laborales (T33)
  await irA(pagina, '/odoo/action-solse_pe_payroll.employee_regime_action');
  await captura(pagina, 'p04_03_regimenes_laborales', { resaltar: ['th[data-name="clave_regimen"]'] });

  // 4.3 Vínculos familiares (T19)
  await irA(pagina, '/odoo/action-solse_pe_payroll.relative_relation_action');
  await captura(pagina, 'p04_04_vinculos_familiares');

  // 4.4 Conceptos PLAME (T22)
  await irA(pagina, '/odoo/action-solse_pe_payroll.plame_lines_action');
  await captura(pagina, 'p04_05_conceptos_plame');

  // 5.1 Asignar cuentas contables
  await irA(pagina, '/odoo/action-solse_pe_payroll.asignar_cuentas_wizard_action');
  await captura(pagina, 'p05_01_asignar_cuentas', { resaltar: ['.modal-footer .btn-primary, .o_form_view button.btn-primary'] });
  await pagina.locator('.modal-footer .btn-primary, .o_form_view footer .btn-primary, button:has-text("Asignar cuentas")').first().click();
  await esperarCarga(pagina, 2500);
  await captura(pagina, 'p05_02_asignar_cuentas_resultado');

  // 5.2 Mapeo contable PCGE
  await irA(pagina, '/odoo/action-solse_pe_payroll.mapeo_contable_action');
  await captura(pagina, 'p05_03_mapeo_contable');

  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
