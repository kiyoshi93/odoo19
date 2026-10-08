// Capítulo 8: alta de un trabajador en FM SYSTEMS (datos sintéticos, DNI 99999901 / 99999902).
// Uso: node p08_alta_trabajador.js [1|2]   (1 = con capturas, 2 = segundo trabajador sin capturas)
const ui = require('./odoo_ui');

const TRABAJADORES = {
  1: {
    nombre: 'Lucía Fernanda Ramos Ticona', puesto: 'Analista Contable',
    dni: '99999901', nacimiento: '14/08/1991', sexo: 'Femenino',
    nombres: 'Lucía Fernanda', paterno: 'Ramos', materno: 'Ticona',
    educacion: 'UNIVERSITARIA COMPLETA', pension: 'SPP INTEGRA', cuspp: '612345LFRTI0',
    salud: 'ESSALUD REGULAR',
    hijo: { nombre: 'Mateo Quispe Ramos', nacimiento: '20/06/2019' },
    inicio: '01/01/2025', sueldo: '4500',
  },
  2: {
    nombre: 'Héctor Manuel Salas Quispe', puesto: 'Asistente de Almacén',
    dni: '99999902', nacimiento: '03/02/1996', sexo: 'Masculino',
    nombres: 'Héctor Manuel', paterno: 'Salas', materno: 'Quispe',
    educacion: 'SECUNDARIA COMPLETA', pension: 'ONP',
    salud: 'ESSALUD REGULAR',
    hijo: null,
    inicio: '01/03/2025', sueldo: '2200',
  },
};

(async () => {
  const numero = Number(process.argv[2] || 1);
  const t = TRABAJADORES[numero];
  const conCaptura = numero === 1;
  const captura = async (...args) => { if (conCaptura) await ui.captura(...args); };
  const { navegador, contexto, pagina } = await ui.abrir();
  try {
    await ui.asegurarLogin(pagina, contexto);
    await ui.irA(pagina, '/odoo/employees/new');
    const f = pagina.locator('.o_form_view').first();

    // 8.1 Datos principales
    await ui.escribir(f, 'name', t.nombre);
    await ui.escribir(f, 'job_title', t.puesto);
    await captura(pagina, 'p08_01_empleado_nuevo', { resaltar: [ui.campo(f, 'name'), ui.campo(f, 'job_title')] });

    // 8.2 Pestaña Personal: DNI, nacimiento y sexo
    await ui.pestana(pagina, 'Personal');
    await ui.escribir(f, 'identification_id', t.dni);
    await ui.fecha(f, 'birthday', t.nacimiento);
    await ui.seleccion(pagina, f, 'sex', t.sexo).catch((e) => console.log('sexo:', e.message));
    await ui.campo(f, 'private_email').click();
    await captura(pagina, 'p08_02_personal', { resaltar: [ui.campo(f, 'identification_id'), ui.campo(f, 'birthday')] });

    // 8.3 Pestaña Nómina PE: nombres separados, educación, pensión y salud
    await ui.pestana(pagina, 'Nómina PE');
    await ui.escribir(f, 'firstname', t.nombres);
    await ui.escribir(f, 'lastname', t.paterno);
    await ui.escribir(f, 'secondname', t.materno);
    await ui.muchosAUno(pagina, f, 'academic_degree_id', t.educacion, t.educacion);
    await ui.muchosAUno(pagina, f, 'pension_system_id', t.pension, t.pension);
    await pagina.waitForTimeout(800);
    if (t.cuspp) {
      await ui.escribir(f, 'cuspp', t.cuspp);
      const comision = ui.campo(f, 'commission_type');
      if (await comision.count()) await ui.seleccion(pagina, f, 'commission_type', 'Flujo').catch((e) => console.log('comision:', e.message));
    }
    await ui.muchosAUno(pagina, f, 'health_regime_id', t.salud, t.salud);
    await captura(pagina, 'p08_03_nomina_pe', { resaltar: [ui.campo(f, 'pension_system_id'), ui.campo(f, 'health_regime_id')] });

    // Derechohabiente (hijo menor) -> asignación familiar
    if (t.hijo) {
      const lista = ui.campo(f, 'relative_ids');
      await lista.scrollIntoViewIfNeeded();
      await lista.locator('.o_field_x2many_list_row_add a').first().click();
      await pagina.waitForTimeout(800);
      const fila = lista.locator('.o_data_row.o_selected_row');
      await ui.muchosAUno(pagina, fila, 'relation_id', 'Hijo', 'Hijo');
      await ui.escribir(fila, 'name', t.hijo.nombre);
      const genero = ui.campo(fila, 'gender').locator('select');
      if (await genero.count()) await genero.selectOption({ index: 1 });
      await ui.fecha(fila, 'date_of_birth', t.hijo.nacimiento, { enter: false });
      await lista.locator('thead').click();
      await pagina.waitForTimeout(600);
      await captura(pagina, 'p08_04_derechohabientes', { resaltar: [lista] });
    }

    // 8.4 Pestaña Nómina: contrato (hr.version en Odoo 19)
    await ui.pestana(pagina, 'Nómina');
    await ui.fecha(f, 'contract_date_start', t.inicio);
    await ui.escribir(f, 'wage', t.sueldo);
    await ui.muchosAUno(pagina, f, 'structure_type_id', 'Régimen General', 'Régimen General');
    await captura(pagina, 'p08_05_contrato', { resaltar: [ui.campo(f, 'contract_date_start'), ui.campo(f, 'wage'), ui.campo(f, 'structure_type_id')] });

    await ui.guardar(pagina);
    await captura(pagina, 'p08_06_empleado_guardado');
    console.log('URL', pagina.url());
  } finally {
    await navegador.close();
  }
})().catch((error) => { console.error(error); process.exit(1); });
