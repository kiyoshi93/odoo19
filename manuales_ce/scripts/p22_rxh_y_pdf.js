// Capítulo 22: exportador PLAME de recibos por honorarios (julio 2026, compañía servicios del laboratorio)
// y capítulo 10: boleta de pago en PDF (Lucía, diciembre 2026) convertida a imagen.
const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');
const ui = require('./odoo_ui');

const EVIDENCIAS = path.join(__dirname, '..', 'evidencias', 'archivos');

(async () => {
  const [idBoleta = '148', idPlanilla] = process.argv.slice(2);
  const { navegador, contexto, pagina } = await ui.abrir();
  try {
    await ui.asegurarLogin(pagina, contexto);

    // --- Boleta PDF ---
    await contexto.addCookies([{ name: 'cids', value: '1', url: ui.URL_BASE }]);
    const respuesta = await contexto.request.get(`${ui.URL_BASE}/report/pdf/solse_pe_payroll_ce.reporte_boleta_pago/${idBoleta}`);
    const archivoPdf = path.join(EVIDENCIAS, `boleta_${idBoleta}.pdf`);
    fs.writeFileSync(archivoPdf, await respuesta.body());
    execFileSync('pdftoppm', ['-png', '-r', '110', '-f', '1', '-l', '1', archivoPdf, path.join(__dirname, '..', 'capturas', 'p10_07_boleta_pdf')]);
    console.log('pdf', archivoPdf, respuesta.status());

    // --- Exportador RxH ---
    await contexto.addCookies([{ name: 'cids', value: '4', url: ui.URL_BASE }]);
    await ui.irA(pagina, '/odoo/action-1078');
    const f = pagina.locator('.modal .o_form_view, .o_form_view').last();
    await ui.seleccion(pagina, f, 'mes', 'Julio');
    await ui.captura(pagina, 'p22_03_rxh_periodo');
    await pagina.locator('.modal button, .o_form_view button').filter({ hasText: 'Revisar periodo' }).first().click();
    await ui.esperarCarga(pagina, 2500);
    await ui.captura(pagina, 'p22_04_rxh_revision');
    await pagina.locator('.modal button, .o_form_view button').filter({ hasText: 'Generar archivos' }).first().click();
    await ui.esperarCarga(pagina, 2500);
    await ui.captura(pagina, 'p22_05_rxh_archivos');
  } finally {
    await navegador.close();
  }
})().catch((error) => { console.error(error); process.exit(1); });
