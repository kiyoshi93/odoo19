// Manual v3, capturas del grupo g5_cese (capítulos 16 y 23). Solo lectura: abre registros validados y el informe HTML.
// Uso: cd v3/scripts && source entorno.sh && SESION_FILE=… NODE_PATH=$NPM_G node capturas_g5_cese.js g16,g23
const fs = require('fs'); const path = require('path');
const u = require('../../scripts/odoo_ui');
const { cap, cia, tab, alta, limpio } = require('./capturas_bloque3');
const { rpc, empleado, idBoleta, idVersion, hechos } = require('./capturas_v3');
const HECHOS = path.join(__dirname, '..', 'medidas', 'ui_g5_cese.json');
const DIR = process.env.CAPTURAS_DIR;
const py = (codigo) => require('child_process').execSync(`python3 -c "${codigo.replace(/"/g, '\\"')}"`);

async function recortarForm(nombre, ancho = 1040) {
  py(`from PIL import Image\nr='${path.join(DIR, nombre)}.png'; im=Image.open(r); im.crop((0,0,min(${ancho},im.width),im.height)).save(r)`);
  require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(DIR, nombre)}.png`);
}
async function boletaCalculo(p, c, compania, id, nombre, { ancho = 1040, resaltar = [] } = {}) {
  await cia(c, compania); await u.irA(p, `/odoo/action-1005/${id}`);
  await tab(p, 'Cálculo de la nómina');
  hechos[nombre] = limpio(await p.locator('.o_notebook .tab-pane.active').innerText().catch(() => '')).slice(0, 3000);
  const marcas = resaltar.map((cod) => p.locator('.o_notebook .tab-pane.active .o_data_row').filter({ hasText: cod }).first());
  await alta(p, () => cap(p, nombre, { resaltar: marcas }));
  await recortarForm(nombre, ancho);
}

const pasos = {
  async g16(p, c) {
    // Carmen (caso NOMINA), liquidación de agosto de 2026
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '45896327', '2026-08-01', 'Liquidaci'), 'c16_01_carmen_liquidacion_calculo', { resaltar: ['VAC_TRUNCA_001', 'NET'] });
    // Contrato de la modal del caso INDEMNIZACION
    await cia(c, 4); await u.irA(p, `/odoo/action-1009/${await idVersion(p, 4, '70000352')}`);
    const f = p.locator('.o_field_widget[name="pe_fin_pactado"]').first();
    if (await f.count()) { await f.scrollIntoViewIfNeeded(); await p.evaluate(() => window.scrollBy(0, 250)); await p.waitForTimeout(500); }
    hechos.c16_03 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 2500);
    await cap(p, 'c16_03_contrato_despido', { resaltar: ['.o_field_widget[name="pe_despido_arbitrario"]', '.o_field_widget[name="pe_fin_pactado"]', '.o_field_widget[name="reason_low_id"]'] });
    await recortarForm('c16_03_contrato_despido');
    // Hoja de liquidación (HTML del informe, con la compañía en el contexto)
    const id = await idBoleta(p, 4, '70002402', '2030-08-01', 'Liquidaci');
    await cia(c, 4);
    const contexto = encodeURIComponent(JSON.stringify({ allowed_company_ids: [4], lang: 'es_PE' }));
    await p.goto(`${u.URL_BASE}/report/html/solse_pe_payroll_ce.reporte_liquidacion_beneficios/${id}?context=${contexto}`, { waitUntil: 'networkidle' });
    hechos.c16_05 = limpio(await p.locator('body').innerText()).slice(0, 4000);
    await cap(p, 'c16_05_hoja_liquidacion', { completa: true });
    require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(DIR, 'c16_05_hoja_liquidacion')}.png`);
  },
  async g23(p, c) {
    await boletaCalculo(p, c, 4, await idBoleta(p, 4, '70000803', '2026-11-01', 'Mensual'), 'c23_02_maternidad_nov_calculo', { resaltar: ['SUB_MAT_001'] });
  },
  // c16_04 (tomada por el coordinador): solo los cuatro grupos del cese, sin el resto de la pestaña
  async g16_recorte() {
    py(`from PIL import Image\nr='${path.join(DIR, 'c16_04_opciones_cese')}.png'; im=Image.open(r)\nif im.height>2000: im.crop((0,485,1040,1600)).save(r)`);
  },
};

module.exports = { pasos };
if (require.main === module) {
  (async () => {
    const { navegador, contexto, pagina } = await u.abrir({ ancho: 1600, alto: Number(process.env.ALTO || 900) });
    await u.asegurarLogin(pagina, contexto);
    for (const n of process.argv[2].split(',')) {
      try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await u.captura(pagina, 'error_' + n).catch(() => {}); }
      fs.writeFileSync(HECHOS, JSON.stringify(hechos, null, 1));
    }
    await navegador.close();
  })();
}
