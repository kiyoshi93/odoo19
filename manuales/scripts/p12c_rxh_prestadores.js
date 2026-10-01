// Capítulo 12 (cont.): prestadores de servicios de 4ta categoría
const u = require('./odoo_ui');
const prestadores = [
  { ruc: '10999999048', nombre: 'FLORES PAREDES ROSA ELENA', paterno: 'FLORES', materno: 'PAREDES', nombres: 'ROSA ELENA', captura: true },
  { ruc: '10999999056', nombre: 'QUISPE HUAMAN ANA LUCIA', paterno: 'QUISPE', materno: 'HUAMAN', nombres: 'ANA LUCIA' },
];

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  for (const p of prestadores) {
    await u.irA(pagina, '/odoo/action-account.res_partner_action_supplier/new');
    const f = pagina.locator('.o_form_view').first();
    // Persona natural
    const individuo = f.locator('.o_field_widget[name="company_type"] input[value="person"], .o_field_widget[name="company_type"] label:has-text("Individual"), .o_field_widget[name="company_type"] label:has-text("Persona")').first();
    if (await individuo.count()) await individuo.click();
    // Desactivar la consulta automática a SUNAT (los datos del manual son ficticios)
    await u.casilla(f, 'busqueda_automatica', false);
    await u.escribir(f, 'name', p.nombre);
    if (await u.campo(f, 'l10n_latam_identification_type_id').count()) await u.muchosAUno(pagina, f, 'l10n_latam_identification_type_id', 'RUC', 'RUC');
    await u.escribir(f, 'vat', p.ruc);
    await pagina.waitForTimeout(2500);
    const persona = f.locator('.o_field_widget[name="company_type"] input[type="radio"]').first();
    if (!(await persona.isChecked())) await persona.check();
    await pagina.waitForTimeout(800);
    if ((await u.campo(f, 'name').locator('input, textarea').first().inputValue()) !== p.nombre) throw new Error('El nombre fue reemplazado por la consulta SUNAT');
    if (p.captura) await u.captura(pagina, 'p12_05_prestador_datos', { resaltar: [u.campo(f, 'name'), u.campo(f, 'vat'), u.campo(f, 'busqueda_automatica')] });
    await u.guardar(pagina);
    await pagina.reload(); await u.esperarCarga(pagina, 1500);
    console.log('PESTAÑAS', await pagina.locator('.o_notebook .nav-link').allInnerTexts());
    await u.pestana(pagina, 'PLAME 4ta categoría');
    const boton = f.locator('button', { hasText: 'Separar' }).first();
    if (await boton.count()) await boton.click().catch(() => {});
    await pagina.waitForTimeout(1200);
    await u.escribir(f, 'plame_apellido_paterno', p.paterno);
    await u.escribir(f, 'plame_apellido_materno', p.materno);
    await u.escribir(f, 'plame_nombres', p.nombres);
    await pagina.waitForTimeout(800);
    if (p.captura) await u.captura(pagina, 'p12_06_prestador_pestana_plame', { resaltar: ['.o_notebook .tab-pane.active'] });
    await u.guardar(pagina);
    console.log(p.nombre, pagina.url());
  }
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
