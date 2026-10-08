// Capturas de vistas simples a partir de una lista JSON (sin cargar datos).
// Uso: node capturar_vistas.js especificacion.json
// Cada elemento: { nombre, ruta, menu?, pestana?, resaltar?: [css], expandirGrupos?, abrirPrimero?, desplazar? }
const fs = require('fs');
const ui = require('./odoo_ui');

(async () => {
  const especificacion = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const { navegador, contexto, pagina } = await ui.abrir();
  try {
    await ui.asegurarLogin(pagina, contexto);
    for (const vista of especificacion) {
      try {
        // Compañía activa (cookie cids de Odoo 17+): por defecto FM SYSTEMS (1)
        await contexto.addCookies([{ name: 'cids', value: String(vista.cids || 1), url: ui.URL_BASE }]);
        await ui.irA(pagina, vista.ruta);
        if (vista.expandirGrupos) {
          const grupos = pagina.locator('.o_group_header');
          const cantidad = await grupos.count();
          for (let i = 0; i < Math.min(cantidad, vista.expandirGrupos); i++) { await grupos.nth(i).click(); await pagina.waitForTimeout(400); }
        }
        if (vista.abrirPrimero) { await pagina.locator('.o_data_row').first().click(); await ui.esperarCarga(pagina, 800); }
        if (vista.menu) {
          await pagina.locator('.o_menu_sections .dropdown-toggle, .o_menu_sections button').filter({ hasText: vista.menu }).first().click();
          await pagina.waitForTimeout(600);
        }
        if (vista.pestana) await ui.pestana(pagina, vista.pestana);
        if (vista.desplazar) { await pagina.locator(vista.desplazar).first().scrollIntoViewIfNeeded(); await pagina.waitForTimeout(300); }
        await pagina.mouse.move(1, 1);
        await ui.captura(pagina, vista.nombre, { resaltar: vista.resaltar || [] });
      } catch (error) {
        console.log('FALLÓ', vista.nombre, error.message.split('\n')[0]);
      }
    }
  } finally {
    await navegador.close();
  }
})().catch((error) => { console.error(error); process.exit(1); });
