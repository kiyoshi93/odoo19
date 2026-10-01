// Capítulo 10 (cont.): validar el periodo de nómina completo
const u = require('./odoo_ui');
const ID_LOTE = process.env.ID_LOTE || '1';

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  await u.irA(pagina, '/odoo/action-1445');
  await pagina.locator('.o_kanban_record', { hasText: 'Nómina Mensual' }).first().click();
  await u.esperarCarga(pagina, 2000);
  const validar = pagina.locator('button:visible', { hasText: /^\s*Validar\s*$/ }).first();
  await u.captura(pagina, 'p10_05_validar_periodo', { resaltar: [validar] });
  await validar.click();
  await u.esperarCarga(pagina, 3000);
  const dialogo = pagina.locator('.modal:visible');
  if (await dialogo.count()) {
    await u.captura(pagina, 'p10_05a_confirmar', { resaltar: [dialogo.locator('button:has-text("De acuerdo")')] });
    await dialogo.locator('button:has-text("De acuerdo")').click();
    await u.esperarCarga(pagina, 4000);
  }
  await u.captura(pagina, 'p10_06_periodo_validado');
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
