// Capítulo 8: recibo de nómina individual (gratificación y mensual de julio 2026)
const u = require('./odoo_ui');
const EMPLEADO = process.env.EMPLEADO || 'Carlos Alberto Quispe';
const recibos = [
  { prefijo: 'p08a', estructura: 'Gratificaciones', desde: '01/07/2026', hasta: '31/07/2026', validar: true },
  { prefijo: 'p08b', estructura: 'Nómina Mensual Empleados', desde: '01/07/2026', hasta: '31/07/2026', validar: true },
];

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  const existentes = (process.env.RECIBOS_EXISTENTES || '').split(',');
  for (const [i, r] of recibos.entries()) {
    const f = pagina.locator('.o_form_view').first();
    if (existentes[i]) {
      await u.irA(pagina, `/odoo/payslips/${existentes[i]}`);
    } else {
    await u.irA(pagina, '/odoo/action-hr_payroll.action_view_hr_payslip_month_form/new');
    await u.muchosAUno(pagina, f, 'employee_id', EMPLEADO);
    await pagina.waitForTimeout(1200);
    await u.muchosAUno(pagina, f, 'struct_id', r.estructura, r.estructura);
    await u.fecha(f, 'date_from', r.desde);
    await u.fecha(f, 'date_to', r.hasta);
    await pagina.waitForTimeout(1000);
    await u.captura(pagina, `${r.prefijo}_01_recibo_nuevo`, { resaltar: [u.campo(f, 'employee_id'), u.campo(f, 'struct_id'), u.campo(f, 'date_from')] });
    await u.guardar(pagina);
    }
    await pagina.locator('.o_form_statusbar button', { hasText: 'Calcular hoja' }).first().click();
    await u.esperarCarga(pagina, 2000);
    await u.pestana(pagina, 'Cálculo del salario');
    await u.captura(pagina, `${r.prefijo}_02_calculo`, { resaltar: ['.o_form_statusbar button:has-text("Validate")'] });
    console.log(r.estructura, 'BOTONES:', await pagina.locator('.o_form_statusbar .o_statusbar_buttons button:visible').allInnerTexts());
    const lineas = await pagina.locator('.o_notebook .tab-pane.active .o_data_row').allInnerTexts();
    console.log(lineas.map((l) => l.replace(/\s+/g, ' ')).join('\n'));
    if (r.validar) {
      await pagina.locator('.o_form_statusbar button', { hasText: /^\s*(Validar|Validate)\s*$/ }).first().click();
      await u.esperarCarga(pagina, 2500);
      const dialogo = pagina.locator('.modal:visible');
      if (await dialogo.count()) {
        await u.captura(pagina, `${r.prefijo}_03a_confirmar`, { resaltar: [dialogo.locator('button:has-text("De acuerdo")')] });
        await dialogo.locator('button:has-text("De acuerdo")').click();
        await u.esperarCarga(pagina, 3000);
      }
      await u.captura(pagina, `${r.prefijo}_03_validado`, { resaltar: ['.o_statusbar_status .o_arrow_button_current, .o_statusbar_status button.active'] });
      console.log('URL', pagina.url());
    }
  }
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
