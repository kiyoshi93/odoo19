// Login en Odoo y captura del menú principal.
// Uso: ODOO_URL=https://mkb.com.pe ODOO_USUARIO=... ODOO_CLAVE=... node manuales/scripts/login.js
const path = require('path');
const fs = require('fs');
const { chromium } = require(path.join(process.env.NPM_G || '', 'playwright'));

const urlBase = process.env.ODOO_URL || 'https://mkb.com.pe';
const usuario = process.env.ODOO_USUARIO;
const clave = process.env.ODOO_CLAVE;
const carpetaCapturas = path.join(__dirname, '..', 'capturas');

(async () => {
  const argumentos = [];
  // En el contenedor de Claude: confiar solo en la CA del proxy (hash SPKI en spki.txt)
  const archivoSpki = process.env.SPKI_FILE;
  if (archivoSpki && fs.existsSync(archivoSpki)) {
    argumentos.push('--ignore-certificate-errors-spki-list=' + fs.readFileSync(archivoSpki, 'utf8').trim());
  }
  const opciones = { args: argumentos };
  if (process.env.HTTPS_PROXY) opciones.proxy = { server: process.env.HTTPS_PROXY };

  const navegador = await chromium.launch(opciones);
  const contexto = await navegador.newContext({ viewport: { width: 1920, height: 1080 }, locale: 'es-PE' });
  const pagina = await contexto.newPage();

  await pagina.goto(`${urlBase}/web/login`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await pagina.fill('input[name="login"]', usuario);
  await pagina.fill('input[name="password"]', clave);
  await Promise.all([
    pagina.waitForURL('**/odoo**', { timeout: 60000 }),
    pagina.click('form.oe_login_form button[type="submit"]'),
  ]);
  await pagina.waitForSelector('.o_home_menu .o_app', { timeout: 60000 });
  await pagina.waitForTimeout(1500);
  await pagina.screenshot({ path: path.join(carpetaCapturas, '02_menu_principal.png') });
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
