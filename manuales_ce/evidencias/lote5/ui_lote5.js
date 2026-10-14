// Lote 5: capturas y lecturas de interfaz (V-05, O-14, O-16, O-15, revisión Q-01).
const fs = require('fs'); const path = require('path');
const u = require('/home/user/odoo19/manuales_ce/scripts/odoo_ui');
const SALIDA = path.join(__dirname, 'out'); const CAPTURAS = path.join(SALIDA, 'capturas');
fs.mkdirSync(CAPTURAS, { recursive: true });
const ARCHIVO = path.join(SALIDA, 'ui_hechos.json');
const hechos = fs.existsSync(ARCHIVO) ? JSON.parse(fs.readFileSync(ARCHIVO)) : {};
const foto = (p, n) => p.screenshot({ path: path.join(CAPTURAS, n + '.png') });
const texto = async (l) => (await l.allInnerTexts()).map((x) => x.replace(/\s+/g, ' ').trim()).filter(Boolean);
async function companias(ctx, valor) { await ctx.addCookies([{ name: 'cids', value: valor, url: u.URL_BASE }]); }
async function asistente(p) {
  await u.irA(p, '/odoo/action-1044'); const m = p.locator('.modal').last();
  return { m, botones: (await m.locator('button').allInnerTexts()).map((x) => x.trim()).filter(Boolean),
    bandas: await texto(m.locator('.alert')) };
}
async function descartar(p) {
  const b = p.locator('.o_form_button_cancel').first();
  if (await b.isVisible().catch(() => false)) { await b.click(); await p.waitForTimeout(800); }
}

const pasos = {
  async v05_antes(p) { await u.irA(p, `/odoo/action-1005/${process.env.BOLETA}`); hechos.v05_antes = await texto(p.locator('.alert-warning')); await foto(p, 'v05_01_boleta_enero_2027_sin_festivos'); },
  async v05_despues(p) { await u.irA(p, `/odoo/action-1005/${process.env.BOLETA}`); hechos.v05_despues = await texto(p.locator('.alert-warning')); await foto(p, 'v05_02_boleta_enero_2027_con_01_01_registrado'); },
  async v05_festivo(p) { await u.irA(p, '/odoo/action-975'); await foto(p, 'v05_03_dias_festivos_con_01_01_2027'); },
  async o14_o16_fm(p, ctx) {
    await companias(ctx, '1');
    const { m, botones, bandas } = await asistente(p);
    hechos.o14_fm = { botones, bandas }; await foto(p, 'o14_01_fm_asistente');
    await m.locator('button').filter({ hasText: '4. Validación interna' }).first().click(); await p.waitForTimeout(3000);
    const m2 = p.locator('.modal').last();
    hechos.o16_fm = (await m2.innerText()).replace(/\s+/g, ' ').slice(0, 2500); await foto(p, 'o16_01_fm_validacion_interna');
  },
  async o14_demo(p, ctx) {
    await companias(ctx, '4');
    const { botones, bandas } = await asistente(p);
    hechos.o14_demo = { botones, bandas }; await foto(p, 'o14_02_solse_demo_asistente');
    await companias(ctx, '1');
  },
  async q01_revision(p, ctx) {
    await companias(ctx, '4-1');
    hechos.q01_rev_selector = await p.locator('.o_switch_company_menu, .o_menu_systray').first().innerText().catch(() => '');
    const { m, botones } = await asistente(p);
    hechos.q01_rev = { botones_con_4_y_1: botones };
    await m.locator('button').filter({ hasText: '5. Reiniciar boletas demo' }).first().click(); await p.waitForTimeout(1000);
    await p.locator('.modal button').filter({ hasText: 'De acuerdo' }).last().click();
    await p.waitForTimeout(5000); await u.esperarCarga(p, 2000).catch(() => {});
    hechos.q01_rev.resultado = (await p.locator('.modal').last().innerText().catch(() => '')).replace(/\s+/g, ' ').slice(0, 1500);
    await foto(p, 'q01_rev_reiniciar_con_fm_marcada');
    await companias(ctx, '1');
  },
  async o15(p, ctx) {
    await companias(ctx, '1');
    await u.irA(p, '/odoo/action-1009/27'); const f = p.locator('.o_form_view').first();
    const c = u.campo(f, 'structure_type_id'); await c.scrollIntoViewIfNeeded(); await c.locator('input').click(); await p.waitForTimeout(1000);
    hechos.o15 = (await p.locator('.o-autocomplete--dropdown-menu .dropdown-item').allInnerTexts()).map((x) => x.trim());
    await foto(p, 'o15_01_categoria_pago'); await p.keyboard.press('Escape'); await descartar(p);
  },
};

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto); await companias(contexto, '1');
  for (const n of process.argv[2].split(',')) {
    try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { hechos['error_' + n] = e.message.split('\n')[0]; console.log('FALLÓ', n, e.message.split('\n')[0]); await foto(pagina, 'error_' + n).catch(() => {}); }
    fs.writeFileSync(ARCHIVO, JSON.stringify(hechos, null, 1));
  }
  await navegador.close();
})();
