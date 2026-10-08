// Sondeo: lista pestañas y campos visibles de un formulario (apoyo para escribir los scripts del manual).
// Uso: node sondear_formulario.js /odoo/employees/new salida.png
const ui = require('./odoo_ui');
(async () => {
  const [ruta, archivo] = process.argv.slice(2);
  const { navegador, contexto, pagina } = await ui.abrir();
  try {
    await ui.asegurarLogin(pagina, contexto);
    await ui.irA(pagina, ruta);
    const pestanas = await pagina.locator('.o_notebook .nav-link').allInnerTexts();
    const resultado = {};
    const cantidad = Math.max(pestanas.length, 1);
    for (let i = 0; i < cantidad; i++) {
      if (pestanas.length) { await pagina.locator('.o_notebook .nav-link').nth(i).click(); await pagina.waitForTimeout(500); }
      resultado[pestanas[i] || 'formulario'] = await pagina.locator('.o_form_view .o_field_widget[name]:visible').evaluateAll((nodos) => nodos.map((n) => n.getAttribute('name')));
    }
    console.log(JSON.stringify(resultado));
    if (archivo) await pagina.screenshot({ path: archivo, fullPage: true });
  } finally { await navegador.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
