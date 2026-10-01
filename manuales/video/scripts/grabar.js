// Graba clips de demostración en la base (Playwright recordVideo), con rótulo y resaltado
const fs = require('fs'); const path = require('path');
const u = require('/home/user/odoo19/manuales/scripts/odoo_ui');
const { chromium } = require(path.join(process.env.NPM_G, 'playwright'));
const W = 1600, H = 900;

async function rotulo(p, texto) {
  await p.evaluate((t) => {
    let d = document.getElementById('rotulo-video');
    if (!d) { d = document.createElement('div'); d.id = 'rotulo-video'; document.body.appendChild(d); }
    d.style.cssText = 'position:fixed;left:24px;bottom:24px;z-index:99999;background:rgba(30,38,64,.92);color:#F6F4EF;font:600 22px/1.3 Arial,sans-serif;padding:12px 20px;border-radius:10px;border-left:6px solid #8FD3D6;max-width:1100px';
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
async function ir(p, ruta) { const a = ahora(); await u.irA(p, ruta); CORTES.push([a, ahora() - 0.4]); }
async function irUrl(p, url) { const a = ahora(); await p.goto(url, { waitUntil: 'networkidle' }); CORTES.push([a, ahora() - 0.4]); }

const clips = {
  async a_menu(p) {
    await ir(p, '/odoo/payroll'); await rotulo(p, 'Nómina › Tablero: advertencias y accesos'); await pausa(p, 5);
    await resaltar(p, '.o_menu_sections button:has-text("Nómina PE")');
    await p.locator('.o_menu_sections button:has-text("Nómina PE")').click(); await rotulo(p, 'Menú Nómina PE: parámetros, maestros SUNAT, reportes legales y contabilidad'); await pausa(p, 9);
    await p.keyboard.press('Escape');
  },
  async b_empleado(p) {
    await ir(p, '/odoo/employees/8'); await rotulo(p, 'Ficha del trabajador (datos ficticios)'); await pausa(p, 4);
    await u.pestana(p, 'Personal'); await rotulo(p, 'Personal: DNI, fecha de nacimiento y cuentas bancarias'); await resaltar(p, '.o_field_widget[name="bank_account_ids"]', 2500); await pausa(p, 4);
    await u.pestana(p, 'Nómina PE'); await rotulo(p, 'Nómina PE: datos T-Registro, AFP con CUSPP, salud y EPS'); await pausa(p, 7);
    await p.locator('.o_field_widget[name="relative_ids"]').scrollIntoViewIfNeeded(); await rotulo(p, 'Derechohabientes: la hija menor genera la asignación familiar'); await resaltar(p, '.o_field_widget[name="relative_ids"]', 3000); await pausa(p, 3);
    await u.pestana(p, 'Nómina'); await u.alInicio(p); await rotulo(p, 'Nómina: inicio de contrato, sueldo y categoría de pago'); await resaltar(p, '.o_field_widget[name="wage"]', 2500); await pausa(p, 5);
  },
  async c_recibo(p) {
    await ir(p, '/odoo/payslips/3'); await rotulo(p, 'Recibo mensual de julio, validado'); await pausa(p, 5);
    await u.pestana(p, 'Cálculo del salario'); await rotulo(p, 'Cálculo: ingresos, AFP, EsSalud, EPS, SENATI y neto a pagar'); await pausa(p, 6);
    await resaltar(p, '.o_data_row:has-text("Neto a pagar")', 3000); await pausa(p, 2);
    await rotulo(p, 'Al validar se genera el asiento contable'); await resaltar(p, '.oe_stat_button:has-text("Asiento")', 2500);
    await ir(p, '/odoo/action-account.action_move_journal_line/3429'); await rotulo(p, 'Asiento PCGE en el diario Salarios'); await pausa(p, 8);
    await irUrl(p, `${u.URL_BASE}/report/html/solse_pe_payroll.reporte_boleta_pago/3`);
    await rotulo(p, 'Boleta de Pago de Remuneraciones (D.S. 001-98-TR)'); await pausa(p, 9);
  },
  async d_vacaciones(p) {
    await ir(p, '/odoo/time-off-approval/3'); await rotulo(p, 'Vacación aprobada: 1 al 15 de agosto'); await pausa(p, 7);
    await ir(p, '/odoo/payslips/13'); await rotulo(p, 'Septiembre de Jorge: vacaciones, asistencia y faltas en el mismo mes'); await pausa(p, 3);
    await u.pestana(p, 'Días trabajados'); await resaltar(p, '.o_notebook .tab-pane.active .o_list_table', 3500); await pausa(p, 3);
    await u.pestana(p, 'Cálculo del salario'); await rotulo(p, 'Remuneración básica: 1,130 / 30 × (30 − 2 − 3) = 941.67'); await resaltar(p, '.o_data_row:has-text("Remuneración básica")', 4000); await pausa(p, 3);
  },
  async e_plame(p) {
    await ir(p, '/odoo/action-solse_pe_payroll.action_plame_wizard');
    const f = p.locator('.modal .o_form_view, .o_form_view').last();
    await rotulo(p, 'PLAME: se elige el mes y se generan los archivos'); await pausa(p, 3);
    await u.seleccion(p, f, 'mes', 'Julio'); await u.escribir(f, 'anio', '2026'); await pausa(p, 2);
    const b = p.locator('button:visible', { hasText: 'Generar archivos PLAME' }).first();
    await resaltar(p, b, 1500); await b.click(); await pausa(p, 3);
    await rotulo(p, 'ZIP con .rem, .jor, .snl y el anexo de 4ta categoría'); await resaltar(p, u.campo(f, 'resumen'), 4000); await pausa(p, 4);
  },
  async f_rxh(p) {
    await ir(p, '/odoo/bills/3434'); await rotulo(p, 'Recibo por honorarios: factura de proveedor tipo 02 con retención de 8 %'); await pausa(p, 7);
    await ir(p, '/odoo/action-solse_pe_plame_rxh.action_plame_rxh_exportar');
    const f = p.locator('.modal .o_form_view, .o_form_view').last();
    await u.escribir(f, 'ejercicio', '2026'); await u.seleccion(p, f, 'mes', 'Julio');
    await rotulo(p, 'PLAME 4ta: se declaran los recibos pagados en el mes'); await pausa(p, 2);
    const b = p.locator('button:visible', { hasText: 'Revisar periodo' }).first(); await resaltar(p, b, 1200); await b.click(); await pausa(p, 6);
  },
};

(async () => {
  const opts = { args: [] };
  if (process.env.SPKI_FILE) opts.args.push('--ignore-certificate-errors-spki-list=' + fs.readFileSync(process.env.SPKI_FILE, 'utf8').trim());
  if (process.env.HTTPS_PROXY) opts.proxy = { server: process.env.HTTPS_PROXY };
  const b = await chromium.launch(opts);
  // sesión válida
  { const { navegador, contexto, pagina } = await u.abrir(); await u.asegurarLogin(pagina, contexto); await navegador.close(); }
  const tiempos = {};
  for (const [nombre, fn] of Object.entries(clips)) {
    if (process.env.SOLO && !process.env.SOLO.split(',').includes(nombre)) continue;
    const ctx = await b.newContext({ viewport: { width: W, height: H }, locale: 'es-PE', timezoneId: 'America/Lima', storageState: '/home/user/odoo19/manuales/scripts/.sesion.json', recordVideo: { dir: 'crudo', size: { width: W, height: H } } });
    const p = await ctx.newPage(); p.setDefaultTimeout(30000);
    T0 = Date.now(); CORTES = [];
    // primera carga fuera de cámara (se recorta)
    await u.irA(p, '/odoo/payroll');
    const inicio = ahora();
    await fn(p);
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
