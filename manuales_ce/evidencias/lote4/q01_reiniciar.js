// Q-01: botón 5 en FM SYSTEMS, aceptando la confirmación; debe rechazarse por «compañía real».
const fs = require('fs'); const path = require('path');
const u = require('/home/user/odoo19/manuales_ce/scripts/odoo_ui');
(async () => {
  const { navegador, contexto, pagina: p } = await u.abrir();
  await u.asegurarLogin(p, contexto); await contexto.addCookies([{ name: 'cids', value: '1', url: u.URL_BASE }]);
  await u.irA(p, '/odoo/action-1044');
  await p.locator('.modal button').filter({ hasText: '5. Reiniciar boletas demo' }).first().click(); await p.waitForTimeout(1000);
  await p.locator('.modal button').filter({ hasText: 'De acuerdo' }).last().click(); await p.waitForTimeout(3000);
  const err = p.locator('.modal-body:has-text("compañía real")');
  const texto = (await err.count()) ? (await err.last().innerText()).replace(/\s+/g, ' ').trim() : 'SIN ERROR';
  await p.screenshot({ path: path.join(__dirname, 'out', 'capturas', 'q01_reiniciar_boletas_tras_confirmar.png') });
  const archivo = path.join(__dirname, 'out', 'ui_hechos.json'); const h = JSON.parse(fs.readFileSync(archivo));
  h.q01.resultados['Reiniciar boletas'] = texto + ' (tras aceptar la confirmación «Se cancelarán y eliminarán TODAS las boletas…»)';
  fs.writeFileSync(archivo, JSON.stringify(h, null, 1)); console.log(texto);
  await navegador.close();
})();
