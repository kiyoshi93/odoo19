// Vacaciones: boleta VAC del goce y efecto en la mensual (también faltas + vacaciones el mismo mes)
const u = require('./odoo_ui');

async function nuevoRecibo(pagina, empleado, estructura, desde, hasta) {
  await u.irA(pagina, '/odoo/action-hr_payroll.action_view_hr_payslip_month_form/new');
  const f = pagina.locator('.o_form_view').first();
  await u.muchosAUno(pagina, f, 'employee_id', empleado, empleado);
  await pagina.waitForTimeout(1200);
  await u.muchosAUno(pagina, f, 'struct_id', estructura, estructura);
  await u.fecha(f, 'date_from', desde);
  await u.fecha(f, 'date_to', hasta);
  await u.guardar(pagina);
  await pagina.reload(); await u.esperarCarga(pagina, 1500);
  return f;
}

async function calcular(pagina) {
  await pagina.locator('.o_form_statusbar button', { hasText: 'Calcular hoja' }).first().click();
  await u.esperarCarga(pagina, 2500);
}

async function validar(pagina) {
  await pagina.locator('.o_form_statusbar button:visible', { hasText: /^\s*(Validar|Validate)\s*$/ }).first().click();
  await u.esperarCarga(pagina, 2000);
  const dialogo = pagina.locator('.modal:visible');
  if (await dialogo.count()) { await dialogo.locator('button:has-text("De acuerdo")').click(); await u.esperarCarga(pagina, 3000); }
}

async function lineas(pagina, etiqueta) {
  await u.pestana(pagina, 'Cálculo del salario');
  const filas = await pagina.locator('.o_notebook .tab-pane.active .o_data_row').allInnerTexts();
  console.log(etiqueta, '\n' + filas.filter((l) => /básica|Vacac|Neto|Asignación|Renta/i.test(l)).map((l) => l.replace(/\s+/g, ' ')).join('\n'));
}

async function diasTrabajados(pagina, etiqueta) {
  await u.pestana(pagina, 'Días trabajados');
  const filas = await pagina.locator('.o_notebook .tab-pane.active .o_data_row').allInnerTexts();
  console.log(etiqueta, 'DIAS:', filas.map((l) => l.replace(/\s+/g, ' ')).join(' || '));
}

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  const solo = process.env.SOLO || 'maria,jorge';

  if (solo.includes('maria')) {
    // María: goce del 1 al 15 de agosto (sueldo 8,000)
    await nuevoRecibo(pagina, 'María Elena Torres', 'Vacaciones', '01/08/2026', '15/08/2026');
    await calcular(pagina);
    await lineas(pagina, 'VAC MARIA');
    await u.captura(pagina, 'p17a_01_boleta_vacaciones', { resaltar: ['.o_data_row:has-text("Remuneración vacacional")', '.o_field_widget[name="struct_id"]'] });
    await validar(pagina);
    console.log('URL', pagina.url());

    await nuevoRecibo(pagina, 'María Elena Torres', 'Nómina Mensual Empleados', '01/08/2026', '31/08/2026');
    await calcular(pagina);
    await diasTrabajados(pagina, 'NME MARIA');
    await u.captura(pagina, 'p17a_02_mensual_dias_trabajados', { resaltar: ['.o_notebook .tab-pane.active .o_list_table'] });
    await lineas(pagina, 'NME MARIA');
    await u.captura(pagina, 'p17a_03_mensual_calculo', { resaltar: ['.o_data_row:has-text("Remuneración básica")'] });
    await validar(pagina);
    console.log('URL', pagina.url());
  }

  if (solo.includes('jorge')) {
    // Jorge: vacaciones del 21 al 23 de septiembre + 2 faltas (sueldo 1,130)
    if (!process.env.SIN_VAC_JORGE) {
    await nuevoRecibo(pagina, 'Jorge Luis Fernández', 'Vacaciones', '21/09/2026', '23/09/2026');
    await calcular(pagina);
    await lineas(pagina, 'VAC JORGE');
    await validar(pagina);
    console.log('URL', pagina.url());

    }
    // Mensual creada DESPUÉS de aprobar la vacación: las líneas de días trabajados la incluyen
    await nuevoRecibo(pagina, 'Jorge Luis Fernández', 'Nómina Mensual Empleados', '01/09/2026', '30/09/2026');
    await pagina.locator('.o_form_statusbar button', { hasText: 'Cargar asistencias' }).first().click();
    await u.esperarCarga(pagina, 2500);
    await calcular(pagina);
    await diasTrabajados(pagina, 'NME JORGE');
    await u.captura(pagina, 'p17b_01_faltas_y_vacaciones_dias', { resaltar: ['.o_notebook .tab-pane.active .o_list_table'] });
    await lineas(pagina, 'NME JORGE');
    await u.captura(pagina, 'p17b_02_faltas_y_vacaciones_calculo', { resaltar: ['.o_data_row:has-text("Remuneración básica")'] });
  }
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
