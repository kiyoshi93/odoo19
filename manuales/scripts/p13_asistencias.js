// Capítulo 13: asistencias y su conciliación en la boleta (septiembre 2026)
const u = require('./odoo_ui');

async function reciboConAsistencias(pagina, empleado, prefijo, idExistente = null) {
  const f = pagina.locator('.o_form_view').first();
  if (idExistente) {
    await u.irA(pagina, `/odoo/payslips/${idExistente}`);
  } else {
  await u.irA(pagina, '/odoo/action-hr_payroll.action_view_hr_payslip_month_form/new');
  await u.muchosAUno(pagina, f, 'employee_id', empleado);
  await pagina.waitForTimeout(1200);
  await u.muchosAUno(pagina, f, 'struct_id', 'Nómina Mensual Empleados', 'Nómina Mensual Empleados');
  await u.fecha(f, 'date_from', '01/09/2026');
  await u.fecha(f, 'date_to', '30/09/2026');
  await u.guardar(pagina);
  // Recargar para que el widget de periodo muestre las fechas guardadas
  await pagina.reload(); await u.esperarCarga(pagina, 1500);
  }
  const cargar = pagina.locator('.o_form_statusbar button', { hasText: 'Cargar asistencias' }).first();
  await u.captura(pagina, `${prefijo}_01_recibo_septiembre`, { resaltar: [cargar, u.campo(f, 'date_from')] });
  await cargar.click();
  await u.esperarCarga(pagina, 2500);
  await u.pestana(pagina, 'Días trabajados');
  await u.captura(pagina, `${prefijo}_02_dias_trabajados`, { resaltar: ['.o_notebook .tab-pane.active .o_list_table'] });
  await u.pestana(pagina, 'Entradas salariales');
  await u.captura(pagina, `${prefijo}_03_entradas`, { resaltar: ['.o_notebook .tab-pane.active .o_list_table'] });
  await u.pestana(pagina, 'Asistencias');
  await u.captura(pagina, `${prefijo}_04_resumen_asistencias`, { resaltar: ['.o_notebook .tab-pane.active'] });
  await pagina.locator('.o_form_statusbar button', { hasText: 'Calcular hoja' }).first().click();
  await u.esperarCarga(pagina, 2500);
  await u.pestana(pagina, 'Cálculo del salario');
  await u.captura(pagina, `${prefijo}_05_calculo`, { resaltar: ['.o_data_row:has-text("Remuneración básica"), .o_data_row:has-text("tardanzas")'] });
  const lineas = await pagina.locator('.o_notebook .tab-pane.active .o_data_row').allInnerTexts();
  console.log(empleado, '\n' + lineas.filter((l) => /básica|tardanza|Neto|Falta/i.test(l)).map((l) => l.replace(/\s+/g, ' ')).join('\n'));
  console.log('URL', pagina.url());
}

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);

  if (process.env.SOLO_RECIBOS) {
    const [idJorge, idCarlos] = process.env.SOLO_RECIBOS.split(',');
    await reciboConAsistencias(pagina, 'Jorge Luis Fernández', 'p13a', idJorge);
    await reciboConAsistencias(pagina, 'Carlos Alberto Quispe', 'p13b', idCarlos);
    await navegador.close();
    return;
  }
  // 13.1 Registro manual de una marcación (llegada tarde)
  await u.irA(pagina, '/odoo/action-hr_attendance.hr_attendance_action/new');
  const f = pagina.locator('.o_form_view').first();
  await u.muchosAUno(pagina, f, 'employee_id', 'Carlos Alberto Quispe');
  await u.fecha(f, 'check_in', '02/09/2026 08:25:00');
  await u.fecha(f, 'check_out', '02/09/2026 17:00:00');
  await pagina.locator('.o_form_sheet').first().click({ position: { x: 5, y: 5 } });
  await u.captura(pagina, 'p13_01_marcacion_manual', { resaltar: [u.campo(f, 'employee_id'), u.campo(f, 'check_in'), u.campo(f, 'check_out')] });
  await u.guardar(pagina);

  // 13.2 Lista de asistencias del mes
  await u.irA(pagina, '/odoo/action-hr_attendance.hr_attendance_action');
  const vistaLista = pagina.locator('.o_switch_view.o_list');
  if (await vistaLista.count()) { await vistaLista.click(); await u.esperarCarga(pagina, 1500); }
  await u.captura(pagina, 'p13_02_lista_asistencias');

  // 13.3 Recibos con conciliación de asistencias
  await reciboConAsistencias(pagina, 'Jorge Luis Fernández', 'p13a');
  await reciboConAsistencias(pagina, 'Carlos Alberto Quispe', 'p13b');
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
