// Capítulo de vacaciones: asignación, solicitud aprobada, boleta VAC y efecto en la mensual
const u = require('./odoo_ui');
const casos = [
  { prefijo: 'p16a', empleado: 'María Elena Torres', dias: '30', desde: '01/08/2026', hasta: '15/08/2026', capturar: true },
  { prefijo: 'p16b', empleado: 'Jorge Luis Fernández', dias: '30', desde: '21/09/2026', hasta: '23/09/2026', capturar: false },
];

async function aprobar(pagina, prefijo, capturar, nombre) {
  const boton = pagina.locator('.o_form_statusbar button:visible', { hasText: /^\s*(Aprobar|Validar|Approve|Validate)\s*$/ }).first();
  console.log('BOTONES', await pagina.locator('.o_form_statusbar button:visible').allInnerTexts());
  if (capturar) await u.captura(pagina, `${prefijo}_${nombre}`, { resaltar: [boton] });
  await boton.click();
  await u.esperarCarga(pagina, 1500);
  const segundo = pagina.locator('.o_form_statusbar button:visible', { hasText: /^\s*(Validar|Validate)\s*$/ }).first();
  if (await segundo.count()) { await segundo.click(); await u.esperarCarga(pagina, 1500); }
}

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  for (const c of casos) {
    // 1. Asignación de días de vacaciones
    let f;
    if (!(process.env.SALTAR_ASIGNACION || '').includes(c.prefijo)) {
    await u.irA(pagina, '/odoo/action-hr_holidays.hr_leave_allocation_action_approve_department/new');
    f = pagina.locator('.o_form_view').first();
    await u.muchosAUno(pagina, f, 'holiday_status_id', 'Vacaciones PE', 'Vacaciones PE');
    await u.muchosAUno(pagina, f, 'employee_id', c.empleado, c.empleado);
    await u.fecha(f, 'date_from', '01/01/2026');
    await u.escribir(f, 'number_of_days_display', c.dias);
    if (c.capturar) await u.captura(pagina, `${c.prefijo}_01_asignacion`, { resaltar: [u.campo(f, 'holiday_status_id'), u.campo(f, 'employee_id'), u.campo(f, 'number_of_days_display')] });
    await u.guardar(pagina);
    await aprobar(pagina, c.prefijo, c.capturar, '02_asignacion_aprobar');
    console.log('asignación', pagina.url());
    }

    // 2. Solicitud de vacaciones (goce)
    await u.irA(pagina, '/odoo/action-hr_holidays.hr_leave_action_action_approve_department/new');
    f = pagina.locator('.o_form_view').first();
    await u.muchosAUno(pagina, f, 'employee_id', c.empleado, c.empleado);
    await u.muchosAUno(pagina, f, 'holiday_status_id', 'Vacaciones PE', 'Vacaciones PE');
    await u.rangoFechas(pagina, f, 'request_date_from', 'request_date_to', c.desde, c.hasta);
    await pagina.waitForTimeout(1000);
    console.log('rango', (await u.campo(f, 'request_date_from').innerText()).replace(/\s+/g, ' '), await u.campo(f, 'duration_display').innerText());
    if (c.capturar) await u.captura(pagina, `${c.prefijo}_03_solicitud`, { resaltar: [u.campo(f, 'holiday_status_id'), u.campo(f, 'request_date_from'), u.campo(f, 'duration_display')] });
    await u.guardar(pagina);
    await aprobar(pagina, c.prefijo, c.capturar, '04_solicitud_aprobar');
    if (c.capturar) await u.captura(pagina, `${c.prefijo}_05_solicitud_aprobada`, { resaltar: ['.o_statusbar_status'] });
    console.log('solicitud', pagina.url());
  }
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
