// Utilidades Playwright para generar manuales de Odoo 19 con capturas.
const path = require('path');
const fs = require('fs');
const { chromium } = require(path.join(process.env.NPM_G || '', 'playwright'));

const URL_BASE = process.env.ODOO_URL || 'https://mkb.com.pe';
const BD = process.env.ODOO_DB || 'base19';
const CARPETA_CAPTURAS = path.join(__dirname, '..', 'capturas');
const ARCHIVO_SESION = process.env.SESION_FILE || path.join(__dirname, '.sesion.json');

async function abrir({ ancho = 1600, alto = 900 } = {}) {
  const argumentos = [];
  // En el contenedor de Claude: confiar solo en la CA del proxy (hash SPKI)
  const archivoSpki = process.env.SPKI_FILE;
  if (archivoSpki && fs.existsSync(archivoSpki)) {
    argumentos.push('--ignore-certificate-errors-spki-list=' + fs.readFileSync(archivoSpki, 'utf8').trim());
  }
  const opciones = { args: argumentos };
  if (process.env.HTTPS_PROXY) opciones.proxy = { server: process.env.HTTPS_PROXY };
  const navegador = await chromium.launch(opciones);
  const opcionesContexto = { viewport: { width: ancho, height: alto }, locale: 'es-PE', timezoneId: 'America/Lima' };
  if (fs.existsSync(ARCHIVO_SESION)) opcionesContexto.storageState = ARCHIVO_SESION;
  const contexto = await navegador.newContext(opcionesContexto);
  const pagina = await contexto.newPage();
  pagina.setDefaultTimeout(30000);
  return { navegador, contexto, pagina };
}

async function asegurarLogin(pagina, contexto) {
  await pagina.goto(`${URL_BASE}/odoo?db=${BD}`, { waitUntil: 'domcontentloaded' });
  if (pagina.url().includes('/web/login')) {
    await pagina.fill('input[name="login"]', process.env.ODOO_USUARIO);
    await pagina.fill('input[name="password"]', process.env.ODOO_CLAVE);
    await Promise.all([
      pagina.waitForURL('**/odoo**', { timeout: 60000 }),
      pagina.click('form.oe_login_form button[type="submit"]'),
    ]);
  }
  await esperarCarga(pagina);
  await contexto.storageState({ path: ARCHIVO_SESION });
}

async function esperarCarga(pagina, extra = 600) {
  await pagina.waitForSelector('.o_main_navbar, .o_home_menu', { timeout: 60000 });
  await pagina.waitForSelector('.o_home_menu, .o_action_manager .o_view_controller, .o_action_manager .o_action, .modal .o_form_view', { timeout: 60000 }).catch(() => {});
  // Esperar a que desaparezca el indicador "Cargando"
  await pagina.waitForFunction(() => !document.querySelector('.o_loading_indicator, .o_blockUI'), null, { timeout: 60000 }).catch(() => {});
  await pagina.waitForTimeout(extra);
}

async function irA(pagina, rutaRelativa) {
  await pagina.goto(`${URL_BASE}${rutaRelativa}`, { waitUntil: 'domcontentloaded' });
  await esperarCarga(pagina, 1200);
  await pagina.mouse.move(1, 1);
}

// Captura con resaltado opcional (recuadro rojo) sobre uno o varios selectores
async function captura(pagina, nombre, { resaltar = [], completa = false, elemento = null } = {}) {
  const selectores = Array.isArray(resaltar) ? resaltar : [resaltar];
  const marcados = [];
  for (const selector of selectores) {
    const localizador = typeof selector === 'string' ? pagina.locator(selector).first() : selector.first();
    if (await localizador.count()) {
      await localizador.scrollIntoViewIfNeeded().catch(() => {});
      await localizador.evaluate((nodo) => {
        nodo.dataset.estiloPrevio = nodo.getAttribute('style') || '';
        nodo.style.outline = '3px solid #e53935';
        nodo.style.outlineOffset = '2px';
        nodo.style.borderRadius = '4px';
      });
      marcados.push(localizador);
    }
  }
  fs.mkdirSync(CARPETA_CAPTURAS, { recursive: true });
  const ruta = path.join(CARPETA_CAPTURAS, `${nombre}.png`);
  if (elemento) await pagina.locator(elemento).first().screenshot({ path: ruta });
  else await pagina.screenshot({ path: ruta, fullPage: completa });
  for (const localizador of marcados) {
    await localizador.evaluate((nodo) => nodo.setAttribute('style', nodo.dataset.estiloPrevio || '')).catch(() => {});
  }
  console.log('captura:', ruta);
  return ruta;
}

async function alInicio(pagina) {
  await pagina.evaluate(() => document.querySelectorAll('.o_content, .o_action_manager, .o_form_renderer').forEach((nodo) => nodo.scrollTo(0, 0)));
  await pagina.waitForTimeout(300);
}

// ---- Llenado de campos en formularios Odoo 19 ----
function campo(raiz, nombre) {
  return raiz.locator(`.o_field_widget[name="${nombre}"]`).first();
}

async function escribir(raiz, nombre, valor) {
  const entrada = campo(raiz, nombre).locator('input, textarea').first();
  await cerrarSelectorFecha(entrada.page());
  await entrada.click();
  await entrada.fill(String(valor));
  await entrada.press('Tab').catch(() => {});
}

async function fecha(raiz, nombre, valor, { enter = true } = {}) {
  // valor en formato dd/mm/aaaa. Soporta input directo y el botón de rango de fechas de Odoo 19
  const widget = campo(raiz, nombre);
  const pagina = widget.page();
  await cerrarSelectorFecha(pagina);
  let entrada = widget.locator('input').first();
  if (!(await entrada.count())) {
    await widget.locator('.o_input').first().click();
    await pagina.waitForTimeout(400);
    entrada = widget.locator('input').first();
  }
  if (await entrada.count()) {
    await entrada.click();
    await entrada.fill(valor);
  } else {
    await pagina.keyboard.press('Control+A');
    await pagina.keyboard.type(valor);
  }
  if (enter) await pagina.keyboard.press('Enter');
  await cerrarSelectorFecha(pagina);
}

async function cerrarSelectorFecha(pagina) {
  if (await pagina.locator('.o_datetime_picker').count()) { await pagina.keyboard.press('Escape'); await pagina.waitForTimeout(300); }
}

async function muchosAUno(pagina, raiz, nombre, texto, opcion = null) {
  await pagina.mouse.move(1, 1);
  const entrada = campo(raiz, nombre).locator('input').first();
  await cerrarSelectorFecha(pagina);
  await entrada.click();
  await entrada.fill(texto);
  const desplegable = pagina.locator('.o-autocomplete--dropdown-menu .o-autocomplete--dropdown-item');
  await desplegable.first().waitFor();
  await pagina.waitForTimeout(500);
  if (opcion) await desplegable.filter({ hasText: opcion }).first().click();
  else await desplegable.first().click();
  await pagina.waitForTimeout(400);
}

async function seleccion(pagina, raiz, nombre, etiqueta) {
  const widget = campo(raiz, nombre);
  if (await widget.locator('select').count()) { await widget.locator('select').selectOption({ label: etiqueta }); return; }
  // Odoo 19: selección con menú desplegable (o_select_menu)
  await widget.locator('input, .o_select_menu_toggler').first().click();
  await pagina.locator('.o_select_menu_item', { hasText: etiqueta }).first().click();
  await pagina.waitForTimeout(400);
}

async function casilla(raiz, nombre, marcar = true) {
  const caja = campo(raiz, nombre).locator('input[type="checkbox"]');
  if ((await caja.isChecked()) !== marcar) await caja.click();
}

async function pestana(pagina, texto) {
  const exacto = new RegExp('^\\s*' + texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*$');
  await pagina.locator('.o_notebook .nav-link').filter({ hasText: exacto }).first().click();
  await pagina.waitForTimeout(600);
}

async function guardar(pagina) {
  const boton = pagina.locator('.o_form_button_save').first();
  if (await boton.isVisible()) { await boton.click(); await pagina.waitForTimeout(1500); }
  const error = pagina.locator('.o_notification.border-danger, .o_error_dialog, .modal .o_dialog_warning');
  if (await error.count()) throw new Error('Error al guardar: ' + (await error.first().innerText()));
}

module.exports = { campo, escribir, fecha, muchosAUno, seleccion, casilla, pestana, guardar, alInicio, abrir, asegurarLogin, esperarCarga, irA, captura, URL_BASE, BD };
