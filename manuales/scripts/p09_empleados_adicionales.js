// Capítulo 9: alta rápida de más trabajadores (ONP y AFP comisión mixta) para el lote
const u = require('./odoo_ui');

const trabajadores = [
  { nombre: 'Jorge Luis Fernández Rojas', puesto: 'Operario de Confección', dni: '99999902', nacimiento: '20/08/1995',
    nombres: 'Jorge Luis', paterno: 'Fernández', materno: 'Rojas', pension: 'ONP', pensionOpcion: 'ONP',
    salud: 'ESSALUD REGULAR', inicio: '01/01/2025', sueldo: '1130', cuenta: '19147852169011', cci: '00219119147852169011' },
  { nombre: 'María Elena Torres Vega', puesto: 'Jefa de Administración', dni: '99999903', nacimiento: '03/02/1985',
    nombres: 'María Elena', paterno: 'Torres', materno: 'Vega', pension: 'INTEGRA', pensionOpcion: 'SPP INTEGRA', cuspp: '412365MTVE8', mixta: true,
    salud: 'ESSALUD REGULAR', inicio: '01/01/2025', sueldo: '8000', cuenta: '19141236547012', cci: '00219119141236547012' },
];

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  for (const t of trabajadores) {
    await u.irA(pagina, '/odoo/employees/new');
    const f = pagina.locator('.o_form_view').first();
    await u.escribir(f, 'name', t.nombre);
    await u.escribir(f, 'job_title', t.puesto);
    await u.pestana(pagina, 'Personal');
    await u.escribir(f, 'identification_id', t.dni);
    await u.fecha(f, 'birthday', t.nacimiento);
    await u.pestana(pagina, 'Nómina PE');
    await u.escribir(f, 'firstname', t.nombres);
    await u.escribir(f, 'lastname', t.paterno);
    await u.escribir(f, 'secondname', t.materno);
    await u.muchosAUno(pagina, f, 'pension_system_id', t.pension, t.pensionOpcion);
    await pagina.waitForTimeout(800);
    if (t.cuspp) await u.escribir(f, 'cuspp', t.cuspp);
    if (t.mixta) await u.seleccion(pagina, f, 'commission_type', 'Mixta');
    await u.muchosAUno(pagina, f, 'health_regime_id', t.salud, t.salud);
    const sufijo = t.paterno.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    await u.captura(pagina, `p09_01_nomina_pe_${sufijo}`, { resaltar: ['.o_notebook .tab-pane.active .o_inner_group:has(.o_field_widget[name="pension_system_id"])'] });
    await u.pestana(pagina, 'Nómina');
    await u.fecha(f, 'contract_date_start', t.inicio);
    await u.escribir(f, 'wage', t.sueldo);
    await u.muchosAUno(pagina, f, 'structure_type_id', 'Régimen General', 'Régimen General');
    await u.guardar(pagina);
    // Cuenta sueldo
    await u.pestana(pagina, 'Personal');
    const entrada = u.campo(f, 'bank_account_ids').locator('input').first();
    await entrada.click(); await entrada.fill(t.cuenta);
    await pagina.locator('.o-autocomplete--dropdown-item', { hasText: /Crear y editar|Create and edit/ }).first().click();
    const dialogo = pagina.locator('.modal .o_form_view').last();
    await dialogo.waitFor(); await pagina.waitForTimeout(800);
    await u.muchosAUno(pagina, dialogo, 'bank_id', 'Banco De Credito');
    await u.seleccion(pagina, dialogo, 'uso_cuenta', 'Sueldo');
    await u.escribir(dialogo, 'cci', t.cci);
    await pagina.locator('.modal-footer button:visible').filter({ hasText: /^\s*Guardar\s*$/ }).last().click();
    await pagina.waitForTimeout(1200);
    await u.guardar(pagina);
    console.log(t.nombre, pagina.url());
  }
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
