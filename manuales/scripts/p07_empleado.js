// Capítulo 7: alta de un trabajador con datos peruanos (caso: Carlos Quispe, AFP Habitat, EPS, hija)
const u = require('./odoo_ui');

const trabajador = {
  nombre: 'Carlos Alberto Quispe Mamani', puesto: 'Analista Comercial',
  dni: '99999901', nacimiento: '12/05/1990',
  nombres: 'Carlos Alberto', paterno: 'Quispe', materno: 'Mamani',
  educacion: 'UNIVERSITARIA COMPLETA', pension: 'SPP HABITAT', cuspp: '578412CAQM5',
  salud: 'ESSALUD REGULAR Y EPS',
  hijo: { nombre: 'Valentina Quispe Soto', nacimiento: '15/03/2018' },
  inicio: '01/01/2025', sueldo: '3500', categoria: 'Régimen General',
};

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  await u.irA(pagina, '/odoo/employees/new');
  const f = pagina.locator('.o_form_view').first();

  // 7.1 Datos principales
  await u.escribir(f, 'name', trabajador.nombre);
  await u.escribir(f, 'job_title', trabajador.puesto);
  await u.captura(pagina, 'p07_01_empleado_nuevo', { resaltar: [u.campo(f, 'name'), u.campo(f, 'job_title')] });

  // 7.2 Pestaña Personal: DNI y fecha de nacimiento
  await u.pestana(pagina, 'Personal');
  await u.escribir(f, 'identification_id', trabajador.dni);
  await u.fecha(f, 'birthday', trabajador.nacimiento);
  await u.campo(f, 'private_email').click();
  await u.captura(pagina, 'p07_02_personal_nacimiento', { resaltar: [u.campo(f, 'birthday')] });
  await u.captura(pagina, 'p07_02b_personal_dni', { resaltar: [u.campo(f, 'identification_id')] });

  // 7.3 Pestaña Nómina PE
  await u.pestana(pagina, 'Nómina PE');
  await u.escribir(f, 'firstname', trabajador.nombres);
  await u.escribir(f, 'lastname', trabajador.paterno);
  await u.escribir(f, 'secondname', trabajador.materno);
  await u.muchosAUno(pagina, f, 'academic_degree_id', 'UNIVERSITARIA COMPLETA', 'UNIVERSITARIA COMPLETA');
  await u.muchosAUno(pagina, f, 'pension_system_id', 'HABITAT', 'SPP HABITAT');
  await pagina.waitForTimeout(800);
  await u.escribir(f, 'cuspp', trabajador.cuspp);
  await u.captura(pagina, 'p07_03_nomina_pe_identificacion_pension', { resaltar: ['.o_notebook .tab-pane.active .o_inner_group:nth-of-type(1)', '.o_notebook .tab-pane.active .o_inner_group:nth-of-type(2)'] });

  await u.muchosAUno(pagina, f, 'health_regime_id', 'EPS', 'ESSALUD REGULAR Y EPS');
  await u.muchosAUno(pagina, f, 'management_eps', '');
  await u.campo(f, 'health_regime_id').scrollIntoViewIfNeeded();
  await u.captura(pagina, 'p07_04_nomina_pe_salud', { resaltar: [u.campo(f, 'health_regime_id'), u.campo(f, 'management_eps')] });

  // Derechohabiente (hija) -> genera asignación familiar
  const lista = u.campo(f, 'relative_ids');
  await lista.scrollIntoViewIfNeeded();
  await lista.locator('.o_field_x2many_list_row_add a').first().click();
  await pagina.waitForTimeout(800);
  const fila = lista.locator('.o_data_row.o_selected_row');
  await u.muchosAUno(pagina, fila, 'relation_id', 'Hijo', 'Hijo');
  await u.escribir(fila, 'name', trabajador.hijo.nombre);
  console.log('GENERO:', await u.campo(fila, 'gender').innerHTML().catch(() => 'sin campo'));
  const genero = u.campo(fila, 'gender').locator('select');
  if (await genero.count()) { console.log(await genero.locator('option').allInnerTexts()); await genero.selectOption({ index: 2 }); }
  await u.fecha(fila, 'date_of_birth', trabajador.hijo.nacimiento, { enter: false });
  await lista.locator('thead').click();
  await pagina.waitForTimeout(600);
  await u.captura(pagina, 'p07_05_nomina_pe_derechohabientes', { resaltar: [lista] });

  // 7.4 Pestaña Nómina: contrato
  await u.pestana(pagina, 'Nómina');
  await u.fecha(f, 'contract_date_start', trabajador.inicio);
  await u.escribir(f, 'wage', trabajador.sueldo);
  await u.muchosAUno(pagina, f, 'structure_type_id', 'Régimen General', 'Régimen General');
  await u.captura(pagina, 'p07_06_nomina_contrato', { resaltar: [u.campo(f, 'contract_date_start'), u.campo(f, 'wage'), u.campo(f, 'structure_type_id')] });

  await u.guardar(pagina);
  await u.captura(pagina, 'p07_07_empleado_guardado');
  console.log('URL', pagina.url());
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
