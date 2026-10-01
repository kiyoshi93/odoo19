// Feriados: registrar un día festivo y ver su línea en la boleta (octubre 2026)
const u = require('./odoo_ui');

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  if (!process.env.SIN_FERIADO) {
    await u.irA(pagina, '/odoo/action-hr_holidays.open_view_public_holiday');
    await u.captura(pagina, 'p18_01_dias_festivos_lista');
    await pagina.locator('.o_list_button_add, .o_control_panel_main_buttons button:has-text("Nuevo")').first().click();
    await pagina.waitForTimeout(1200);
    const fila = pagina.locator('.o_data_row.o_selected_row').first();
    const campos = await fila.locator('.o_field_widget[name]').evaluateAll((n) => n.map((x) => x.getAttribute('name')));
    console.log('CAMPOS', campos.join(','));
    await u.escribir(fila, 'name', 'Combate de Angamos');
    // Fechas: por defecto el día de hoy 00:00-23:59; se elige el día 8 en el calendario de cada extremo
    for (const extremo of ['date_from', 'date_to']) {
      await pagina.locator(`.o_data_row.o_selected_row [data-field="${extremo}"]`).first().click();
      await pagina.waitForTimeout(500);
      await pagina.locator('.o_datetime_picker:visible .o_date_item_cell:not(.o_out_of_range)').filter({ hasText: /^8$/ }).first().click();
      await pagina.waitForTimeout(400);
      // Cerrar el calendario sin Escape (Escape descarta la línea en una lista editable)
      await pagina.locator('.o_data_row.o_selected_row td[name="name"] input').first().click();
      await pagina.waitForTimeout(500);
    }
    await pagina.waitForTimeout(800);
    await u.captura(pagina, 'p18_02_dia_festivo_nuevo', { resaltar: [fila] });
    await pagina.locator('.o_list_button_save, .modal-footer button:has-text("Guardar")').first().click().catch(() => {});
    await u.esperarCarga(pagina, 1500);
    await u.captura(pagina, 'p18_03_dia_festivo_guardado');
  }
  if (process.env.TIPO_ENTRADA) {
    // Asignar al feriado un tipo de entrada de trabajo PAGADO (sin tipo, el día queda en conflicto)
    await u.irA(pagina, '/odoo/action-hr_holidays.open_view_public_holiday');
    const filaFeriado = pagina.locator('.o_data_row', { hasText: 'Combate de Angamos' }).first();
    await filaFeriado.locator('td[name="work_entry_type_id"]').click();
    await pagina.waitForTimeout(600);
    const editada = pagina.locator('.o_data_row.o_selected_row').first();
    await u.muchosAUno(pagina, editada, 'work_entry_type_id', process.env.TIPO_ENTRADA, process.env.TIPO_ENTRADA);
    await u.captura(pagina, 'p18_03_dia_festivo_tipo_entrada', { resaltar: [editada] });
    await pagina.locator('.o_list_button_save').first().click();
    await u.esperarCarga(pagina, 1500);
  }

  // Regenerar las entradas de trabajo del mes (las existentes se crearon antes del feriado)
  await u.irA(pagina, '/odoo/work-entries');
  await u.captura(pagina, 'p18_04a_entradas_trabajo_antes', { resaltar: ['.o_control_panel button:has-text("Restablecer")'] });
  await pagina.locator('.o_control_panel button:has-text("Restablecer")').first().click();
  const d = pagina.locator('.modal .o_form_view').last();
  await d.waitFor(); await pagina.waitForTimeout(800);
  console.log('CAMPOS REGEN', await d.locator('.o_field_widget[name]').evaluateAll((n) => n.map((x) => x.getAttribute('name'))));
  console.log('BOTONES REGEN', await pagina.locator('.modal-footer button:visible').allInnerTexts());
  await u.muchosAUno(pagina, d, 'employee_ids', 'Carlos Alberto Quispe', 'Carlos Alberto Quispe');
  await pagina.locator('.modal-title').last().click();
  await pagina.waitForTimeout(800);
  const regenerar = pagina.locator('.modal-footer button:visible:not(.disabled)', { hasText: 'Volver a generar' }).first();
  await u.captura(pagina, 'p18_04b_restablecer_entradas', { resaltar: [u.campo(d, 'employee_ids'), u.campo(d, 'date_from'), regenerar] });
  await regenerar.click();
  await u.esperarCarga(pagina, 3000);
  await u.captura(pagina, 'p18_04c_entradas_trabajo_despues');

  // Recibo mensual de octubre (borrador) para ver la línea del feriado
  await u.irA(pagina, '/odoo/action-hr_payroll.action_view_hr_payslip_month_form/new');
  const f = pagina.locator('.o_form_view').first();
  await u.muchosAUno(pagina, f, 'employee_id', 'Carlos Alberto Quispe', 'Carlos Alberto Quispe');
  await pagina.waitForTimeout(1200);
  await u.muchosAUno(pagina, f, 'struct_id', 'Nómina Mensual Empleados', 'Nómina Mensual Empleados');
  await u.fecha(f, 'date_from', '01/10/2026');
  await u.fecha(f, 'date_to', '31/10/2026');
  await u.guardar(pagina);
  await pagina.reload(); await u.esperarCarga(pagina, 1500);
  await pagina.locator('.o_form_statusbar button', { hasText: 'Calcular hoja' }).first().click();
  await u.esperarCarga(pagina, 2500);
  await u.pestana(pagina, 'Días trabajados');
  console.log('DIAS:', (await pagina.locator('.o_notebook .tab-pane.active .o_data_row').allInnerTexts()).map((l) => l.replace(/\s+/g, ' ')).join(' || '));
  await u.captura(pagina, 'p18_05_recibo_linea_feriado', { resaltar: ['.o_notebook .tab-pane.active .o_list_table'] });
  await u.pestana(pagina, 'Cálculo del salario');
  console.log((await pagina.locator('.o_notebook .tab-pane.active .o_data_row').allInnerTexts()).filter((l) => /básica|Neto/.test(l)).map((l) => l.replace(/\s+/g, ' ')).join(' || '));
  console.log('URL', pagina.url());
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
