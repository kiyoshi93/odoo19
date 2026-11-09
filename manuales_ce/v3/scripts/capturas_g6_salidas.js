// Manual v3, grupo g6_salidas: capturas de los capítulos 2, 27, 29, 30 y del Anexo E. Solo lee; los asistentes
// (planilla, PLAME, AFPnet, bancos, T-Registro y recibos por honorarios) generan su archivo sin guardar nada y se cierran.
// Uso: cd v3/scripts && source entorno.sh && SESION_FILE=... NODE_PATH=$NPM_G node capturas_g6_salidas.js paso1,paso2
const fs = require('fs'); const path = require('path');
const u = require('../../scripts/odoo_ui');
const { cap, cia, tab, alta, limpio } = require('./capturas_bloque3');
const { rpc, hechos: hechosV3 } = require('./capturas_v3');
const HECHOS = path.join(__dirname, '..', 'medidas', 'ui_g6_salidas.json');
const hechos = fs.existsSync(HECHOS) ? JSON.parse(fs.readFileSync(HECHOS)) : {};
const DIR = process.env.CAPTURAS_DIR;
const ARCHIVOS = path.join(__dirname, '..', 'medidas', 'archivos');
const ACC = (x) => `/odoo/action-${x}`;
const py = (codigo) => require('child_process').execSync(`python3 -c "${codigo.replace(/"/g, '\\"')}"`);

async function cerrarModal(p) {
  const b = p.locator('.modal:visible .modal-footer button, .modal:visible footer button').filter({ hasText: /^\s*(Cancelar|Descartar|Cerrar)\s*$/ });
  if (await b.count()) await b.last().click(); else await p.keyboard.press('Escape');
  await p.waitForTimeout(800);
}
// Una fecha de botón con calendario, dentro de un asistente: sin Escape al final (cerraría el asistente)
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
async function fechaCalendario(p, raiz, campo, valor) {
  await raiz.locator(`[data-field="${campo}"]`).first().click();
  const sel = p.locator('.o_datetime_picker:has(.o_header_part)').first(); await sel.waitFor({ timeout: 6000 });
  const [dia, mes, anio] = valor.split('/').map(Number);
  for (let i = 0; i < 36; i++) {
    const [nm, am] = (await sel.locator('.o_header_part').first().innerText()).toLowerCase().trim().split(/\s+/);
    const ind = nm.startsWith('set') ? 8 : MESES.findIndex((m) => nm.startsWith(m.slice(0, 4)));
    const dif = (anio - Number(am)) * 12 + (mes - 1 - ind);
    if (dif === 0) break;
    await sel.locator(dif < 0 ? '.o_previous' : '.o_next').click(); await p.waitForTimeout(200);
  }
  await sel.locator('.o_date_item_cell:not(.o_out_of_range)').filter({ hasText: new RegExp(`^${dia}$`) }).first().click();
  await p.waitForTimeout(800);
  if (await p.locator('.o_datetime_picker:visible').count()) { await raiz.locator('.modal-title, .o_form_label').first().click().catch(() => {}); await p.waitForTimeout(400); }
}
async function poner(p, raiz, campo, tipo, valor) {
  if (process.env.DEPURAR) console.log('  poner', campo, valor, await p.locator('.modal').count());
  const w = raiz.locator(`.o_field_widget[name="${campo}"]`).first();
  if (tipo === 'sel') {
    if (await w.locator('select').count()) await w.locator('select').selectOption({ label: valor });
    else { await w.locator('input, .o_select_menu_toggler').first().click(); await p.locator('.o_select_menu_item, .dropdown-item').filter({ hasText: new RegExp('^\\s*' + valor.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$') }).first().click(); }
  } else if (tipo === 'txt') { const i = w.locator('input').first(); await i.click(); await i.fill(String(valor)); await i.press('Tab'); }
  else if (tipo === 'fecha') {
    // las fechas del T-Registro son botones con calendario (sin entrada de texto): se eligen en el calendario
    if (await w.locator('input').count()) await u.fecha(raiz, campo, valor);
    else await fechaCalendario(p, raiz, campo, valor);
  }
  else if (tipo === 'chk') { const i = w.locator('input[type=checkbox]'); if ((await i.isChecked()) !== valor) await i.click(); }
  await p.waitForTimeout(700);
}
// Un asistente que genera un archivo: llena, pulsa el botón, guarda la descarga (si la hay) y captura el resultado.
async function asistente(p, c, compania, accion, valores, boton, nombre, { resaltar = [], alto = 0 } = {}) {
  await cia(c, compania); await u.irA(p, ACC(accion));
  const m = () => p.locator('.modal').last();
  for (const [campo, tipo, valor] of valores) await poner(p, m(), campo, tipo, valor);
  const descarga = p.waitForEvent('download', { timeout: 12000 }).catch(() => null);
  await m().locator('.modal-footer button, footer button').filter({ hasText: new RegExp(boton) }).first().click();
  const archivo = await descarga;
  if (archivo) { fs.mkdirSync(ARCHIVOS, { recursive: true }); hechos[nombre + '_descarga'] = archivo.suggestedFilename(); await archivo.saveAs(path.join(ARCHIVOS, nombre + '__' + archivo.suggestedFilename())); }
  await p.waitForTimeout(3500); await u.esperarCarga(p, 1500).catch(() => {});
  hechos[nombre] = limpio(await m().innerText().catch(() => '')).slice(0, 4000);
  if (alto) await p.setViewportSize({ width: 1600, height: alto });
  await p.waitForTimeout(500);
  await cap(p, nombre, { resaltar: resaltar.map((s) => (typeof s === 'string' ? m().locator(s) : s)) });
  if (alto) await p.setViewportSize({ width: 1600, height: Number(process.env.ALTO || 900) });
  await cerrarModal(p);
}
// Rectángulos grises sobre datos (coordenadas en píxeles de la captura)
function ofuscar(nombre, cajas) {
  if (!cajas.length) return;
  py(`from PIL import Image, ImageDraw
r='${path.join(DIR, nombre)}.png'; im=Image.open(r).convert('RGB'); d=ImageDraw.Draw(im)
for c in ${JSON.stringify(cajas)}: d.rectangle(c, fill=(200,200,200))
im.save(r)`);
}
async function cajasDe(p, loc) {
  const r = []; for (const e of await loc.all()) { const b = await e.boundingBox(); if (b && b.width > 0) r.push([Math.floor(b.x) - 2, Math.floor(b.y) - 2, Math.ceil(b.x + b.width) + 2, Math.ceil(b.y + b.height) + 2]); } return r;
}
async function casoForm(p, c, codigo, nombre) {
  const r = await rpc(p, 'solse.demo.caso', 'search_read', [[['codigo', '=', codigo]]], { fields: ['id'] });
  await cia(c, 4); await u.irA(p, ACC(`solse_pe_demo_libros.action_demo_caso/${r[0].id}`));
  await tab(p, 'Comparaciones');
  hechos[nombre] = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 3000);
  await alta(p, () => cap(p, nombre, { resaltar: ['.o_notebook .tab-pane.active .o_data_row'] }));
  py(`from PIL import Image
r='${path.join(DIR, nombre)}.png'; im=Image.open(r); im.crop((0,0,1400,im.height)).save(r)`);
  require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(DIR, nombre)}.png`);
}

const pasos = {
  // ---------------------------------------------------------------- 2 · instalación y laboratorio
  async c02_apps(p, c) {
    await cia(c, 4); await u.irA(p, '/odoo/action-base.open_module_tree?view_type=list');
    await p.locator('.o_searchview_facet .o_facet_remove').first().click().catch(() => {}); await u.esperarCarga(p, 600);
    for (const t of ['Nómina Peruana', 'Payroll', 'PLAME']) { await p.locator('.o_searchview_input').fill(t); await p.keyboard.press('Enter'); await u.esperarCarga(p, 800); }
    await p.locator('.o_searchview_dropdown_toggler').click(); await p.waitForTimeout(500);
    await p.locator('.o_filter_menu .o_menu_item, .o_dropdown_container .o-dropdown-item, .o-dropdown-item').filter({ hasText: /^\s*Instalad/ }).first().click(); await u.esperarCarga(p, 1200);
    await p.keyboard.press('Escape');
    hechos.c02_01 = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    // sin la columna «Sitio web», para que la versión se lea entera
    await p.addStyleTag({ content: 'th[data-name="website"], td[name="website"] { display: none !important; } th[data-name="latest_version"] { min-width: 160px !important; width: 160px !important; }' });
    await p.waitForTimeout(800);
    const fila = p.locator('.o_data_row').filter({ hasText: 'Detalle de Renta de 5ta' }).first();
    const marca = (await fila.count()) ? [fila] : [];
    await p.setViewportSize({ width: 1600, height: 640 }); await p.mouse.move(800, 630); await p.waitForTimeout(900);
    await cap(p, 'c02_01_aplicaciones_versiones', { resaltar: marca });
    await p.setViewportSize({ width: 1600, height: Number(process.env.ALTO || 900) });
  },
  async c02_lab(p, c) {
    await cia(c, 4); await u.irA(p, ACC('solse_pe_demo_libros.action_demo_laboratorio/1'));
    hechos.c02_02 = limpio(await p.locator('.o_form_view').first().innerText()).slice(0, 1500);
    await cap(p, 'c02_02_laboratorio', { resaltar: ['button[name="accion_sincronizar_casos"]'] });
  },
  async c02_casos(p, c) {
    await cia(c, 4); await u.irA(p, ACC('solse_pe_demo_libros.action_demo_caso'));
    for (const g of await p.locator('.o_group_header').all()) { await g.click().catch(() => {}); await p.waitForTimeout(600); }
    await u.esperarCarga(p, 800);
    hechos.c02_03 = (await p.locator('.o_data_row').allInnerTexts()).map(limpio);
    const empresas = p.locator('.o_data_row').filter({ hasText: 'EMPRESA_' });
    await alta(p, () => cap(p, 'c02_03_casos_100', { resaltar: [empresas.first(), empresas.last()] }));
    require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(DIR, 'c02_03_casos_100')}.png`);
  },
  async c02_caso(p, c) {
    await casoForm(p, c, 'TREGISTRO', 'c02_04_caso_tregistro');
    await casoForm(p, c, 'EMPRESA_CONSULTORA', 'c02_06_empresa_consultora');
  },
  async c02_demo_fm(p, c) {
    await cia(c, 1); await u.irA(p, ACC('solse_pe_payroll_ce_demo.regenerar_demo_wizard_action'));
    hechos.c02_05 = limpio(await p.locator('.modal').last().innerText().catch(() => ''));
    await cap(p, 'c02_05_datos_de_prueba_en_fm');
    await cerrarModal(p);
  },
  // ---------------------------------------------------------------- 27 · reportes y archivos legales
  async c27(p, c) {
    await asistente(p, c, 4, 'solse_pe_payroll_ce.action_planilla_wizard', [['mes', 'sel', 'Noviembre'], ['anio', 'txt', 2026], ['incluir_semanales', 'chk', true], ['incluir_adicionales', 'chk', true]], 'Generar Excel', 'c27_01_planilla_resultado', { resaltar: ['.o_field_widget[name="incluir_adicionales"]'] });
    await asistente(p, c, 16, 'solse_pe_payroll_ce.action_plame_wizard', [['mes', 'sel', 'Junio'], ['anio', 'txt', 2026]], 'Generar', 'c27_02_plame_resultado', { resaltar: ['[name="resumen"]'], alto: 1100 });
    await asistente(p, c, 4, 'solse_pe_payroll_ce.action_afpnet_wizard', [['mes', 'sel', 'Julio'], ['anio', 'txt', 2026]], 'Generar', 'c27_03_afpnet_resultado');
    const comun = [['mes', 'sel', 'Mayo'], ['anio', 'txt', 2026]];
    await asistente(p, c, 4, 'solse_pe_payroll_ce.action_bancos_wizard', [...comun, ['tipo', 'sel', 'Haberes (sueldo)'], ['banco', 'sel', 'BCP - Telecrédito'], ['cuenta_cargo', 'txt', '19100000000011'], ['fecha_pago', 'fecha', '29/05/2026']], 'Generar', 'c27_04_bcp_haberes_resultado', { resaltar: ['.o_field_widget[name="incluir_adicionales"]'], alto: 1000 });
    await asistente(p, c, 4, 'solse_pe_payroll_ce.action_bancos_wizard', [...comun, ['tipo', 'sel', 'CTS'], ['banco', 'sel', 'Interbank'], ['cuenta_cargo', 'txt', '2003001234567'], ['fecha_pago', 'fecha', '29/05/2026']], 'Generar', 'c27_05_interbank_cts_resultado', { alto: 1100 });
    await asistente(p, c, 4, 'solse_pe_payroll_ce.action_bancos_wizard', [...comun, ['tipo', 'sel', 'Haberes (sueldo)'], ['banco', 'sel', 'Scotiabank'], ['cuenta_cargo', 'txt', '0001234567'], ['fecha_pago', 'fecha', '29/05/2026']], 'Generar', 'c27_06_scotiabank_haberes_resultado', { alto: 1100 });
  },
  // ---------------------------------------------------------------- 29 · T-Registro
  async c29(p, c) {
    const rango = [['fecha_desde', 'fecha', '01/10/2026'], ['fecha_hasta', 'fecha', '22/10/2026']];
    await asistente(p, c, 4, 'solse_pe_payroll_ce.action_tregistro_wizard', [['operacion', 'sel', 'Altas'], ...rango], 'Generar archivos', 'c29_01_altas_resultado', { alto: 1300 });
    await asistente(p, c, 4, 'solse_pe_payroll_ce.action_tregistro_wizard', [['operacion', 'sel', 'Modificaciones'], ...rango, ['concepto', 'sel', 'Tipo de trabajador'], ['fecha_cambio', 'fecha', '16/10/2026']], 'Generar archivos', 'c29_03_modificacion_resultado', { alto: 1100 });
    await asistente(p, c, 4, 'solse_pe_payroll_ce.action_tregistro_wizard', [['operacion', 'sel', 'Altas de derechohabientes'], ...rango], 'Generar archivos', 'c29_04_dh_altas_resultado', { alto: 1300 });
  },
  // ---------------------------------------------------------------- 30 · recibos por honorarios
  async c30(p, c) {
    await cia(c, 4); await u.irA(p, ACC('solse_pe_plame_rxh.action_plame_rxh_exportar'));
    const raiz = (await p.locator('.modal').count()) ? p.locator('.modal').last() : p.locator('.o_form_view').first();
    const ej = raiz.locator('.o_field_widget[name="ejercicio"] input'); if (await ej.count()) { await ej.fill('2026'); await ej.press('Tab'); }
    await poner(p, raiz, 'mes', 'sel', 'Julio');
    await raiz.locator('button:visible').filter({ hasText: /Revisar periodo/ }).first().click(); await p.waitForTimeout(4000); await u.esperarCarga(p, 1500);
    const r = (await p.locator('.modal').count()) ? p.locator('.modal').last() : p.locator('.o_form_view').first();
    hechos.c30_02 = limpio(await r.innerText()).slice(0, 3000);
    await p.setViewportSize({ width: 1600, height: 1250 }); await p.waitForTimeout(600);
    // los prestadores (documento, nombre y tipo) pueden ser datos reales: se difuminan
    const celdas = r.locator('.o_data_row td[name="numero_documento"], .o_data_row td[name="partner_id"], .o_data_row td[name="move_id"]');
    const cajas = await cajasDe(p, celdas);
    await cap(p, 'c30_02_rxh_revision');
    ofuscar('c30_02_rxh_revision', cajas);
    await p.setViewportSize({ width: 1600, height: Number(process.env.ALTO || 900) });
    await cerrarModal(p);
    await cia(c, 4); await u.irA(p, '/odoo/action-base.action_res_company_form/4'); await tab(p, 'Nómina PE - 4ta Categoría');
    hechos.c30_03 = limpio(await p.locator('.o_notebook .tab-pane.active').innerText());
    await cap(p, 'c30_03_ajustes_4ta', { resaltar: ['.o_field_widget[name="plame4ta_modo_retencion"]', '.o_field_widget[name="plame4ta_umbral"]'] });
  },
};

module.exports = { pasos };
if (require.main === module) {
  (async () => {
    if (process.argv[2] === 'lista') { console.log(Object.keys(pasos).join(',')); return; }
    const { navegador, contexto, pagina } = await u.abrir({ ancho: 1600, alto: Number(process.env.ALTO || 900) });
    await u.asegurarLogin(pagina, contexto);
    for (const n of process.argv[2].split(',')) {
      try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await u.captura(pagina, 'error_g6_' + n).catch(() => {}); }
      fs.writeFileSync(HECHOS, JSON.stringify(hechos, null, 1));
    }
    await navegador.close();
  })();
}
