// Capítulo 12 (cont.): exportar PLAME 4ta (.ps4/.4ta) y ZIP PLAME de nómina con 4ta incluida
const path = require('path');
const u = require('./odoo_ui');
const CARPETA = process.env.CARPETA_ARCHIVOS || path.join(__dirname, '..', 'archivos');

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  await u.irA(pagina, '/odoo/action-solse_pe_plame_rxh.action_plame_rxh_exportar');
  const f = pagina.locator('.modal .o_form_view, .o_form_view').last();
  await f.waitFor();
  const campos = await f.locator('.o_field_widget[name]').evaluateAll((n) => n.map((x) => x.getAttribute('name')));
  console.log('CAMPOS', campos.join(','));
  await u.escribir(f, 'ejercicio', '2026').catch(async () => u.seleccion(pagina, f, 'ejercicio', '2026'));
  await u.seleccion(pagina, f, 'mes', 'Julio').catch(async () => u.seleccion(pagina, f, 'mes', 'julio'));
  await pagina.waitForTimeout(800);
  const boton = (t) => pagina.locator('button:visible', { hasText: t }).first();
  await u.captura(pagina, 'p12_08_exportar_rxh_asistente', { resaltar: [u.campo(f, 'ejercicio'), u.campo(f, 'mes'), boton('Revisar periodo')] });
  await boton('Revisar periodo').click();
  await u.esperarCarga(pagina, 2500);
  await u.captura(pagina, 'p12_09_exportar_rxh_revision', { resaltar: [u.campo(f, 'linea_ids')] });
  await u.pestana(pagina, 'Validaciones').catch(() => {});
  await u.captura(pagina, 'p12_10_exportar_rxh_validaciones', { resaltar: [u.campo(f, 'resumen')] });
  await boton('Generar archivos').click();
  await u.esperarCarga(pagina, 2500);
  await u.captura(pagina, 'p12_11_exportar_rxh_archivos');
  const enlaces = f.locator('.o_field_binary a, .o_field_binary button.o_download, .o_field_widget[name^="archivo"] a');
  console.log('ENLACES', await enlaces.count());
  for (let i = 0; i < await enlaces.count(); i++) {
    const [descarga] = await Promise.all([pagina.waitForEvent('download', { timeout: 60000 }), enlaces.nth(i).click()]);
    await descarga.saveAs(path.join(CARPETA, descarga.suggestedFilename()));
    console.log('descarga:', descarga.suggestedFilename());
  }

  // ZIP PLAME de nómina con el anexo de 4ta
  await u.irA(pagina, '/odoo/action-solse_pe_payroll.action_plame_wizard');
  const p = pagina.locator('.modal .o_form_view, .o_form_view').last();
  await u.seleccion(pagina, p, 'mes', 'Julio');
  await u.escribir(p, 'anio', '2026');
  await pagina.locator('button:visible', { hasText: 'Generar archivos PLAME' }).first().click();
  await pagina.waitForTimeout(4000);
  await u.captura(pagina, 'p12_12_plame_nomina_con_4ta', { resaltar: [u.campo(p, 'resumen'), u.campo(p, 'archivo')] });
  const [zip] = await Promise.all([pagina.waitForEvent('download', { timeout: 60000 }), u.campo(p, 'archivo').locator('a, button').first().click()]);
  await zip.saveAs(path.join(CARPETA, 'plame_julio_2026_con_4ta.zip'));
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
