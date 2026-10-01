// Reemplaza por la UI los DNI/RUC de prueba por identificadores sintéticos (no existen en RENIEC/SUNAT)
const u = require('./odoo_ui');
const empleados = [['8', '99999901'], ['9', '99999902'], ['10', '99999903']];
const prestadores = [['4330', '10999999048'], ['4331', '10999999056']];

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  for (const [id, dni] of empleados) {
    await u.irA(pagina, `/odoo/employees/${id}`);
    const f = pagina.locator('.o_form_view').first();
    await u.pestana(pagina, 'Personal');
    await u.escribir(f, 'identification_id', dni);
    await u.guardar(pagina);
    if (id === '8') await u.captura(pagina, 'p07_02b_personal_dni', { resaltar: [u.campo(f, 'identification_id')] });
  }
  for (const [id, ruc] of prestadores) {
    await u.irA(pagina, `/odoo/vendors/${id}`);
    const f = pagina.locator('.o_form_view').first();
    await u.casilla(f, 'busqueda_automatica', false);
    await u.escribir(f, 'vat', ruc);
    await pagina.waitForTimeout(1500);
    await u.guardar(pagina);
    if (id === '4330') await u.captura(pagina, 'p12_05_prestador_datos', { resaltar: [u.campo(f, 'name'), u.campo(f, 'vat')] });
  }
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
