// Graba los clips del video resumen (Playwright recordVideo) con rótulo y resaltado.
// Uso (desde manuales_ce/video): NPM_G=$(npm root -g) SESION_FILE=... node scripts/grabar.js [clip,clip]
const fs = require('fs'); const path = require('path');
const u = require('../../scripts/odoo_ui');
const { chromium } = require(path.join(process.env.NPM_G, 'playwright'));
const W = 1600, H = 900;
const BASE = path.join(__dirname, '..');

async function rotulo(p, texto) {
  await p.evaluate((t) => {
    let d = document.getElementById('rotulo-video');
    if (!d) { d = document.createElement('div'); d.id = 'rotulo-video'; document.body.appendChild(d); }
    d.style.cssText = 'position:fixed;left:24px;bottom:24px;z-index:99999;background:rgba(30,38,64,.92);color:#F6F4EF;font:600 22px/1.3 Arial,sans-serif;padding:12px 20px;border-radius:10px;border-left:6px solid #F2B84B;max-width:1100px';
    d.textContent = t;
  }, texto);
}
async function resaltar(p, loc, ms = 1400) {
  const l = typeof loc === 'string' ? p.locator(loc).first() : loc.first();
  if (!(await l.count())) return;
  await l.scrollIntoViewIfNeeded().catch(() => {});
  await l.evaluate((n) => { n.dataset.prev = n.getAttribute('style') || ''; n.style.outline = '4px solid #e53935'; n.style.outlineOffset = '3px'; n.style.borderRadius = '4px'; });
  await p.waitForTimeout(ms);
  await l.evaluate((n) => n.setAttribute('style', n.dataset.prev || '')).catch(() => {});
}
const pausa = (p, s) => p.waitForTimeout(s * 1000);
let T0 = 0; let CORTES = [];
const ahora = () => (Date.now() - T0) / 1000;
// Las cargas de página se marcan como cortes para recortarlas en el montaje
async function ir(p, ruta) { const a = ahora(); await u.irA(p, ruta); CORTES.push([a, ahora() - 0.4]); }
async function irUrl(p, url) { const a = ahora(); await p.goto(url, { waitUntil: 'networkidle' }); CORTES.push([a, ahora() - 0.4]); }
const fila = (texto) => `.o_data_row:has-text("${texto}")`;

const clips = {
  async a_menu(p) {
    await ir(p, '/odoo/action-1005'); await rotulo(p, 'Nómina › Nóminas del empleado (FM SYSTEMS, datos ficticios)'); await pausa(p, 4);
    await p.locator('.o_menu_sections button:has-text("Nómina PE")').click(); await rotulo(p, 'Menú Nómina PE: parámetros, maestros SUNAT, seguros, reportes legales y contabilidad'); await pausa(p, 8);
    await p.keyboard.press('Escape');
  },
  async b_parametros(p) {
    await ir(p, '/odoo/action-solse_pe_payroll_base.rule_parameter_pe_action/2'); await u.pestana(p, 'Vigencias');
    await rotulo(p, 'RMV con vigencias: 1,130 desde 2025 y 1,230 desde el 01/10/2026'); await resaltar(p, '.o_field_widget[name="parameter_version_ids"]', 4000); await pausa(p, 2);
    await ir(p, '/odoo/action-solse_pe_payroll_base.rule_parameter_pe_action/7'); await u.pestana(p, 'Vigencias');
    await rotulo(p, 'RMA: una fila por cada actualización trimestral'); await resaltar(p, '.o_field_widget[name="parameter_version_ids"]', 4000); await pausa(p, 2);
  },
  async c_empleado(p) {
    await ir(p, '/odoo/employees/27'); await rotulo(p, 'Ficha del trabajador: Lucía Fernanda Ramos Ticona (DNI sintético 99999901)'); await pausa(p, 4);
    await u.pestana(p, 'Nómina PE'); await rotulo(p, 'Nómina PE: datos T-Registro, AFP Integra con CUSPP y régimen de salud'); await pausa(p, 6);
    await p.locator('.o_field_widget[name="relative_ids"]').scrollIntoViewIfNeeded(); await rotulo(p, 'Derechohabientes: el hijo menor genera la asignación familiar'); await resaltar(p, '.o_field_widget[name="relative_ids"]', 3500); await pausa(p, 2);
    await ir(p, '/odoo/action-1009/27'); await rotulo(p, 'Contrato: estructura mensual, diario Planillas y datos T-Registro'); await resaltar(p, '.o_field_widget[name="struct_id"]', 2000); await resaltar(p, '.o_field_widget[name="journal_id"]', 2000); await pausa(p, 3);
  },
  async d_boleta(p) {
    await ir(p, '/odoo/action-1005/148'); await rotulo(p, 'Boleta de diciembre 2026, confirmada'); await pausa(p, 3);
    await u.pestana(p, 'Cálculo de la nómina'); await rotulo(p, 'Cálculo: básica, asignación familiar, AFP, renta de 5ta y neto a pagar'); await pausa(p, 4);
    await resaltar(p, fila('Neto'), 3000); await pausa(p, 1);
    await ir(p, '/odoo/action-account.action_move_journal_line/601'); await rotulo(p, 'Asiento en el diario Planillas con cuentas del PCGE'); await pausa(p, 7);
    await irUrl(p, `${u.URL_BASE}/report/html/solse_pe_payroll_ce.reporte_boleta_pago/148`); await rotulo(p, 'Boleta de Pago de Remuneraciones (D.S. 001-98-TR)'); await pausa(p, 8);
  },
  async e_lote(p) {
    await ir(p, '/odoo/action-1007/1'); await rotulo(p, 'Lote mensual: se generan las boletas de todos los trabajadores y se marcan como hechas'); await pausa(p, 4);
    await resaltar(p, '.o_field_widget[name="slip_ids"]', 3500); await pausa(p, 3);
  },
  async f_beneficios(p) {
    await ir(p, '/odoo/action-1005/129'); await u.pestana(p, 'Cálculo de la nómina'); await rotulo(p, 'Gratificación de julio: 4,613 + bonificación extraordinaria de 9 %'); await pausa(p, 6);
    await ir(p, '/odoo/action-1005/140'); await u.pestana(p, 'Cálculo de la nómina'); await rotulo(p, 'CTS de noviembre: incluye un sexto de la gratificación validada'); await pausa(p, 6);
  },
  async g_vacaciones(p) {
    await ir(p, '/odoo/action-979/4'); await rotulo(p, 'Vacaciones aprobadas: 2 al 16 de febrero de 2026'); await pausa(p, 5);
    await ir(p, '/odoo/action-1005/117'); await rotulo(p, 'Mensual de febrero: los días de vacaciones no se pagan aquí'); await resaltar(p, '.o_field_widget[name="worked_days_line_ids"]', 3500); await pausa(p, 2);
    await u.pestana(p, 'Cálculo de la nómina'); await rotulo(p, 'Remuneración básica: 4,500 × (30 − 15) / 30 = 2,250'); await resaltar(p, fila('RB_001'), 3500); await pausa(p, 2);
    await ir(p, '/odoo/action-1005/116'); await u.pestana(p, 'Cálculo de la nómina'); await rotulo(p, 'Boleta de vacaciones: 15 días = 2,306.50'); await pausa(p, 5);
  },
  async h_asistencias(p) {
    await ir(p, '/odoo/action-1005/80'); await rotulo(p, 'Laboratorio: «Cargar asistencias» convierte marcaciones en tardanzas y faltas'); await pausa(p, 3);
    await resaltar(p, 'button:has-text("Cargar asistencias")', 2500);
    await u.pestana(p, 'Cálculo de la nómina'); await rotulo(p, 'Tardanzas de Carlos: tres de 25 minutos con 10 de tolerancia'); await pausa(p, 2);
    await resaltar(p, fila('TAR_001'), 4000); await pausa(p, 1);
  },
  async i_plame(p) {
    await ir(p, '/odoo/action-1040');
    const f = p.locator('.modal .o_form_view, .o_form_view').last();
    await rotulo(p, 'PLAME: se elige el mes y se generan los archivos para el PDT'); await pausa(p, 2);
    await u.seleccion(p, f, 'mes', 'Diciembre'); await u.escribir(f, 'anio', '2026'); await pausa(p, 1);
    const b = p.locator('button:visible', { hasText: 'Generar archivos PLAME' }).first();
    await resaltar(p, b, 1200); await b.click(); await pausa(p, 3);
    await rotulo(p, 'ZIP con .rem, .jor y .snl desde las boletas validadas'); await resaltar(p, u.campo(f, 'resumen'), 4000); await pausa(p, 3);
  },
  async j_rxh(p) {
    await ir(p, '/odoo/action-1078');
    const f = p.locator('.modal .o_form_view, .o_form_view').last();
    await u.seleccion(p, f, 'mes', 'Julio');
    await rotulo(p, 'Recibos por honorarios: se declaran los pagados en el mes (laboratorio)'); await pausa(p, 2);
    const b = p.locator('button:visible', { hasText: 'Revisar periodo' }).first(); await resaltar(p, b, 1200); await b.click(); await pausa(p, 6);
  },
};
// Compañía de cada clip: FM SYSTEMS (1) salvo los del laboratorio (4)
const COMPANIA = { h_asistencias: 4, j_rxh: 4 };

(async () => {
  process.chdir(BASE);
  fs.mkdirSync('crudo', { recursive: true });
  { const { navegador, contexto, pagina } = await u.abrir(); await u.asegurarLogin(pagina, contexto); await navegador.close(); }
  const opts = {}; if (process.env.HTTPS_PROXY) opts.proxy = { server: process.env.HTTPS_PROXY };
  const b = await chromium.launch(opts);
  const tiempos = {};
  const solo = process.argv[2] ? process.argv[2].split(',') : null;
  for (const [nombre, fn] of Object.entries(clips)) {
    if (solo && !solo.includes(nombre)) continue;
    const ctx = await b.newContext({ viewport: { width: W, height: H }, locale: 'es-PE', timezoneId: 'America/Lima', storageState: process.env.SESION_FILE, recordVideo: { dir: 'crudo', size: { width: W, height: H } } });
    await ctx.addCookies([{ name: 'cids', value: String(COMPANIA[nombre] || 1), url: u.URL_BASE }]);
    const p = await ctx.newPage(); p.setDefaultTimeout(30000);
    T0 = Date.now(); CORTES = [];
    await u.irA(p, '/odoo/action-1005');  // primera carga fuera de cámara (se recorta)
    const inicio = ahora();
    try { await fn(p); } catch (e) { console.log('FALLÓ', nombre, e.message.split('\n')[0]); }
    const fin = ahora();
    const v = p.video(); await ctx.close();
    const destino = `crudo/${nombre}.webm`; await v.saveAs(destino); await v.delete();
    tiempos[nombre] = { inicio, fin, cortes: CORTES, archivo: destino };
    console.log(nombre, inicio.toFixed(1), fin.toFixed(1));
  }
  const previo = fs.existsSync('tiempos.json') ? JSON.parse(fs.readFileSync('tiempos.json')) : {};
  fs.writeFileSync('tiempos.json', JSON.stringify({ ...previo, ...tiempos }, null, 1));
  await b.close();
})().catch((e) => { console.error(e); process.exit(1); });
