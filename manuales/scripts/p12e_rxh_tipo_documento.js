// Capítulo 12 (cont.): tipo de documento 02 - Recibo por Honorarios para compras de la compañía
const u = require('./odoo_ui');
(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  const ID_TIPO = process.env.ID_TIPO;
  await u.irA(pagina, ID_TIPO ? `/odoo/action-373/${ID_TIPO}` : '/odoo/action-l10n_latam_invoice_document.action_document_type/new');
  const f = pagina.locator('.o_form_view').first();
  if (ID_TIPO) {
    await u.seleccion(pagina, f, 'sub_type', 'Compra');
    await u.captura(pagina, 'p12_00_tipo_documento_rxh', { resaltar: [u.campo(f, 'code'), u.campo(f, 'internal_type'), u.campo(f, 'sub_type'), u.campo(f, 'company_id')] });
    await u.guardar(pagina);
    await navegador.close();
    return;
  }
  const campos = await f.locator('.o_field_widget[name]').evaluateAll((n) => n.map((x) => x.getAttribute('name')));
  console.log('CAMPOS', campos.join(','));
  await u.escribir(f, 'name', 'Recibo por Honorarios');
  await u.escribir(f, 'code', '02');
  if (campos.includes('doc_code_prefix')) await u.escribir(f, 'doc_code_prefix', 'E');
  if (campos.includes('country_id')) await u.muchosAUno(pagina, f, 'country_id', 'Per', 'Perú');
  if (campos.includes('internal_type')) await u.seleccion(pagina, f, 'internal_type', 'Factura');
  if (campos.includes('sub_type')) await u.seleccion(pagina, f, 'sub_type', 'Compra');
  for (const c of ['inc_sire_compras', 'inc_ple_compras']) if (campos.includes(c)) await u.casilla(f, c, true);
  await u.captura(pagina, 'p12_00_tipo_documento_rxh', { resaltar: ['.o_form_sheet'] });
  await u.guardar(pagina);
  console.log('URL', pagina.url());
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
