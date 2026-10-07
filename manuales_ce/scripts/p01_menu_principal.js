// Inicio de sesión en contable19 y captura del menú principal (manual de nómina Community).
const ui = require('./odoo_ui');

(async () => {
  const { navegador, contexto, pagina } = await ui.abrir();
  try {
    await pagina.goto(`${ui.URL_BASE}/web/login?db=${ui.BD}`, { waitUntil: 'domcontentloaded' });
    await ui.asegurarLogin(pagina, contexto);
    await ui.irA(pagina, '/odoo');
    // En Community el menú de aplicaciones es el desplegable de la cuadrícula
    await pagina.locator('.o_navbar_apps_menu button').first().click();
    await pagina.waitForSelector('.o-dropdown--menu .o_app, .dropdown-menu .o_app', { timeout: 30000 });
    await pagina.waitForTimeout(800);
    const aplicaciones = await pagina.locator('.o-dropdown--menu .o_app, .dropdown-menu .o_app').allInnerTexts();
    const compania = await pagina.locator('.o_switch_company_menu, .o_menu_systray').first().innerText().catch(() => '');
    console.log(JSON.stringify({ url: pagina.url(), aplicaciones: aplicaciones.map((texto) => texto.trim()), compania }, null, 1));
    await ui.captura(pagina, '01_menu_principal');
  } finally {
    await navegador.close();
  }
})().catch((error) => { console.error(error); process.exit(1); });
