// Capítulo 12 (cont.): marcar "Retención de renta de 4ta categoría" en Opciones avanzadas
const u = require('./odoo_ui');
(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  await u.irA(pagina, `/odoo/taxes/${process.env.ID_IMPUESTO || '70'}`);
  const f = pagina.locator('.o_form_view').first();
  await u.pestana(pagina, 'Opciones avanzadas');
  await u.casilla(f, 'es_retencion_cuarta', true);
  await u.captura(pagina, 'p12_04_impuesto_marcar_retencion_4ta', { resaltar: [u.campo(f, 'es_retencion_cuarta'), u.campo(f, 'tax_group_id')] });
  await u.guardar(pagina);
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
