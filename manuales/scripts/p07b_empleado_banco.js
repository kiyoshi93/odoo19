// Capítulo 7 (cont.): cuentas bancarias de sueldo y CTS, género del derechohabiente
const u = require('./odoo_ui');
const ID_EMPLEADO = process.env.ID_EMPLEADO || '8';

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  await u.irA(pagina, `/odoo/employees/${ID_EMPLEADO}`);
  const f = pagina.locator('.o_form_view').first();

  // Género del derechohabiente
  await u.pestana(pagina, 'Nómina PE');
  const lista = u.campo(f, 'relative_ids');
  await lista.locator('.o_data_row').first().locator('td[name="gender"]').click();
  await pagina.waitForTimeout(500);
  await u.seleccion(pagina, lista.locator('.o_selected_row'), 'gender', 'Femenino');
  await lista.locator('thead').click();
  await u.guardar(pagina);

  // Cuentas bancarias desde la pestaña Personal
  const cuentas = [
    { numero: '19145781236018', banco: 'Banco De Credito', uso: 'Sueldo', cci: '00219119145781236018', paso: 'p07_08' },
    { numero: '8984578123610', banco: 'Banco Internacional', uso: 'CTS', cci: '00389889845781236100', paso: 'p07_09' },
  ];
  for (const cuenta of cuentas) {
    await u.pestana(pagina, 'Personal');
    const etiquetas = u.campo(f, 'bank_account_ids');
    const entrada = etiquetas.locator('input').first();
    await entrada.click();
    await entrada.fill(cuenta.numero);
    await pagina.locator('.o-autocomplete--dropdown-item', { hasText: /Crear y editar|Create and edit/ }).first().click();
    const dialogo = pagina.locator('.modal .o_form_view').last();
    await dialogo.waitFor();
    await pagina.waitForTimeout(800);
    await u.muchosAUno(pagina, dialogo, 'bank_id', cuenta.banco);
    await u.seleccion(pagina, dialogo, 'uso_cuenta', cuenta.uso);
    await u.escribir(dialogo, 'cci', cuenta.cci);
    await u.captura(pagina, `${cuenta.paso}_cuenta_bancaria_${cuenta.uso.toLowerCase()}`, { resaltar: [u.campo(dialogo, 'bank_id'), u.campo(dialogo, 'uso_cuenta'), u.campo(dialogo, 'cci')] });
    await pagina.locator('.modal-footer button:visible').filter({ hasText: /^\s*Guardar\s*$/ }).last().click();
    await pagina.waitForTimeout(1200);
    await u.guardar(pagina);
  }
  await u.pestana(pagina, 'Personal');
  await u.captura(pagina, 'p07_10_personal_cuentas', { resaltar: [u.campo(f, 'bank_account_ids')] });
  await u.pestana(pagina, 'Nómina PE');
  await u.alInicio(pagina);
  await u.captura(pagina, 'p07_11_nomina_pe_completa', { completa: false });
  await u.campo(f, 'relative_ids').scrollIntoViewIfNeeded();
  await u.captura(pagina, 'p07_12_nomina_pe_cuentas_derechohabientes', { resaltar: ['.o_notebook .tab-pane.active .o_inner_group:has(.o_field_widget[name="account_salary_bank"])'] });
  await u.pestana(pagina, 'Nómina');
  await u.captura(pagina, 'p07_13_nomina_contrato_guardado');
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
