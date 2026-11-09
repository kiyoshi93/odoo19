// Manual v3, capturas del grupo g2_contabilidad (capítulos 7 y 28) que rehace el grupo: solo lectura (abre y mira).
// Uso: source entorno.sh; SESION_FILE=…/sesion_g2_contabilidad.json NODE_PATH=$NPM_G node capturas_g2_contabilidad.js c07_08,c28_03,c28_04
const path = require('path');
const u = require('../../scripts/odoo_ui');
const { cap, cia, alta } = require('./capturas_bloque3');
const { rpc, empleado, idBoleta } = require('./capturas_v3');
const ACC = { boletas: 1005 };
const ctx = (c) => ({ context: { allowed_company_ids: [c] } });

async function recortarForm(nombre, ancho = 1040) {
  require('child_process').execSync(`python3 -c "
from PIL import Image
r='${path.join(process.env.CAPTURAS_DIR, nombre)}.png'; im=Image.open(r); im.crop((0,0,min(${ancho},im.width),im.height)).save(r)"`);
  require('child_process').execSync(`python3 ${path.join(__dirname, 'recortar.py')} ${path.join(process.env.CAPTURAS_DIR, nombre)}.png`);
}

const pasos = {
  // El registro de un solo trabajador (70002101, caso PROVISIONES) con su grupo CTS abierto
  async c07_08(p, c) {
    const e = await empleado(p, 4, '70002101');
    await cia(c, 4); await u.irA(p, '/odoo/action-solse_pe_payroll_ce.provision_action');
    const s = p.locator('.o_searchview_input'); await s.fill(e.name); await p.waitForTimeout(800);
    const op = p.locator('.o_searchview_autocomplete .o-dropdown-item, .o_searchview_autocomplete li').filter({ hasText: /Trabajador/ }).first();
    if (await op.count()) await op.click(); else await s.press('Enter');
    await u.esperarCarga(p, 1200);
    const g1 = p.locator('.o_group_header').filter({ hasText: e.name }).first();
    if (await g1.count()) { await g1.click(); await u.esperarCarga(p, 1000); }
    const g2 = p.locator('.o_group_header').filter({ hasText: /^\s*CTS/ }).first();
    if (await g2.count()) { await g2.click(); await u.esperarCarga(p, 1000); }
    await cap(p, 'c07_08_registro_provisiones');
  },
  // El asiento del pago de AFPnet de Lucía (FM, octubre de 2026): debe 417, haber banco
  async c28_03(p, c) {
    const b = await rpc(p, 'hr.payslip', 'search_read', [[['company_id', '=', 1], ['pe_pago_afp_move_id', '!=', false], ['date_from', '=', '2026-10-01']]], { fields: ['pe_pago_afp_move_id'], ...ctx(1) });
    await cia(c, 1); await u.irA(p, `/odoo/action-account.action_move_journal_line/${b[0].pe_pago_afp_move_id[0]}`);
    await cap(p, 'c28_03_asiento_pago_afpnet');
  },
  // Boleta pagada: la de utilidades de 70002501 (UTILIDADES_REPARTO), con su fecha de pago y operación
  async c28_04(p, c) {
    const id = await idBoleta(p, 4, '70002501', '2032-04-01');
    await cia(c, 4); await u.irA(p, `/odoo/action-${ACC.boletas}/${id}`);
    await cap(p, 'c28_04_boleta_pagada', { resaltar: ['.o_field_widget[name="pe_fecha_pago"]', '.o_field_widget[name="pe_operacion_pago"]', '.o_field_widget[name="pe_fecha_limite_entrega"]'] });
    await recortarForm('c28_04_boleta_pagada');
  },
  // «Enviar boletas por correo» del lote de FM: solo se abre el diálogo de confirmación y se cancela (no se envía nada)
  async c28_05(p, c) {
    await cia(c, 1); await u.irA(p, '/odoo/action-1007/1');
    await p.locator('button[name="action_pe_enviar_boletas"]').first().click(); await p.waitForTimeout(1200);
    const m = p.locator('.modal:visible').last();
    if (!(await m.count())) throw new Error('no apareció la confirmación');
    await cap(p, 'c28_05_enviar_boletas_sin_acuerdo');
    await m.locator('button').filter({ hasText: /^\s*Cancelar\s*$/ }).first().click(); await p.waitForTimeout(800);
    if (await p.locator('.modal:visible').count()) throw new Error('el diálogo sigue abierto');
  },
};

if (require.main === module) {
  (async () => {
    const { navegador, contexto, pagina } = await u.abrir({ ancho: 1600, alto: 900 });
    await u.asegurarLogin(pagina, contexto);
    for (const n of process.argv[2].split(',')) {
      try { await pasos[n](pagina, contexto); console.log('OK', n); } catch (e) { console.log('FALLÓ', n, e.message.split('\n')[0]); }
    }
    await navegador.close();
  })();
}
module.exports = { pasos };
