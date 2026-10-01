// Capítulo 11: reportes y archivos legales de julio 2026
const path = require('path');
const u = require('./odoo_ui');
const CARPETA = process.env.CARPETA_ARCHIVOS || path.join(__dirname, '..', 'archivos');

async function abrirAsistente(pagina, accion) {
  await u.irA(pagina, `/odoo/action-solse_pe_payroll.${accion}`);
  const f = pagina.locator('.modal .o_form_view, .o_form_view').last();
  await f.waitFor();
  return f;
}

async function descargar(pagina, disparador, nombre) {
  const [descarga] = await Promise.all([pagina.waitForEvent('download', { timeout: 90000 }), disparador()]);
  const destino = path.join(CARPETA, nombre || descarga.suggestedFilename());
  await descarga.saveAs(destino);
  console.log('descarga:', destino);
  return destino;
}

async function periodo(pagina, f) {
  await u.seleccion(pagina, f, 'mes', 'Julio');
  await u.escribir(f, 'anio', '2026');
}

(async () => {
  require('fs').mkdirSync(CARPETA, { recursive: true });
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  const boton = (texto) => pagina.locator('.modal-footer button:visible, .o_form_view footer button:visible', { hasText: texto }).first();

  // 11.1 Planilla de sueldos
  let f = await abrirAsistente(pagina, 'action_planilla_wizard');
  await periodo(pagina, f);
  await u.captura(pagina, 'p11_01_planilla_asistente', { resaltar: [boton('Imprimir PDF'), boton('Generar Excel')] });
  await descargar(pagina, () => boton('Imprimir PDF').click(), 'planilla_julio_2026.pdf');
  f = await abrirAsistente(pagina, 'action_planilla_wizard');
  await periodo(pagina, f);
  await boton('Generar Excel').click();
  await pagina.waitForTimeout(3000);
  await u.captura(pagina, 'p11_02_planilla_excel_generado', { resaltar: [u.campo(f, 'archivo')] });
  await descargar(pagina, () => u.campo(f, 'archivo').locator('a, button').first().click(), 'planilla_julio_2026.xlsx').catch((e) => console.log('sin descarga excel', e.message));

  // 11.2 PLAME (archivos PDT) + 4ta categoría
  f = await abrirAsistente(pagina, 'action_plame_wizard');
  await periodo(pagina, f);
  await u.captura(pagina, 'p11_03_plame_asistente', { resaltar: [u.campo(f, 'incluir_4ta'), boton('Generar archivos PLAME')] });
  await boton('Generar archivos PLAME').click();
  await pagina.waitForTimeout(4000);
  await u.captura(pagina, 'p11_04_plame_generado', { resaltar: [u.campo(f, 'archivo'), u.campo(f, 'resumen')] });
  await descargar(pagina, () => u.campo(f, 'archivo').locator('a, button').first().click(), 'plame_julio_2026.zip').catch((e) => console.log('sin descarga plame', e.message));

  // 11.3 AFPnet
  f = await abrirAsistente(pagina, 'action_afpnet_wizard');
  await periodo(pagina, f);
  await boton('Generar Excel AFPnet').click();
  await pagina.waitForTimeout(3000);
  await u.captura(pagina, 'p11_05_afpnet_generado', { resaltar: [u.campo(f, 'archivo'), u.campo(f, 'resumen')] });
  await descargar(pagina, () => u.campo(f, 'archivo').locator('a, button').first().click(), 'afpnet_julio_2026.xlsx').catch((e) => console.log('sin descarga afpnet', e.message));

  // 11.4 Pago masivo a bancos (haberes por BCP)
  f = await abrirAsistente(pagina, 'action_bancos_wizard');
  await periodo(pagina, f);
  await u.seleccion(pagina, f, 'tipo', 'Haberes (sueldo)');
  await u.seleccion(pagina, f, 'banco', 'BCP - Telecrédito');
  await u.escribir(f, 'cuenta_cargo', '3801574984010');
  await u.fecha(f, 'fecha_pago', '31/07/2026');
  await u.captura(pagina, 'p11_06_bancos_asistente', { resaltar: [u.campo(f, 'tipo'), u.campo(f, 'banco'), u.campo(f, 'cuenta_cargo'), u.campo(f, 'fecha_pago')] });
  await boton('Generar TXT').click();
  await pagina.waitForTimeout(3000);
  const error = pagina.locator('.o_error_dialog, .modal:visible .o_dialog_warning, .o_notification');
  if (await error.count()) console.log('AVISO BANCOS:', await error.first().innerText());
  await u.captura(pagina, 'p11_07_bancos_generado', { resaltar: [u.campo(f, 'archivo'), u.campo(f, 'resumen')] });
  await descargar(pagina, () => u.campo(f, 'archivo').locator('a, button').first().click(), 'bancos_bcp_julio_2026.txt').catch((e) => console.log('sin descarga bancos', e.message));

  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
