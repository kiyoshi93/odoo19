// Capítulo 21: reportes y archivos legales (planilla, PLAME, AFPnet, TXT bancarios).
// Descarga cada archivo generado a manuales_ce/evidencias/archivos/ para abrirlo y medirlo.
const path = require('path');
const fs = require('fs');
const ui = require('./odoo_ui');

const CARPETA = path.join(__dirname, '..', 'evidencias', 'archivos');

const TAREAS = [
  { nombre: 'p21_01_planilla', accion: 1039, mes: 'Diciembre', anio: 2026, boton: 'Generar Excel' },
  { nombre: 'p21_02_plame', accion: 1040, mes: 'Diciembre', anio: 2026, boton: 'Generar archivos PLAME' },
  { nombre: 'p21_03_plame_4ta', accion: 1040, mes: 'Julio', anio: 2026, cids: 4, casilla: 'incluir_4ta', boton: 'Generar archivos PLAME' },
  { nombre: 'p21_04_afpnet', accion: 1042, mes: 'Diciembre', anio: 2026, boton: 'Generar Excel AFPnet' },
  { nombre: 'p21_05_bancos_sueldo', accion: 1041, mes: 'Diciembre', anio: 2026, cuenta: '1919999999001', boton: 'Generar TXT' },
  { nombre: 'p21_06_bancos_cts', accion: 1041, mes: 'Noviembre', anio: 2026, tipo: 'CTS', cuenta: '1919999999001', boton: 'Generar TXT' },
];

(async () => {
  fs.mkdirSync(CARPETA, { recursive: true });
  const { navegador, contexto, pagina } = await ui.abrir();
  try {
    await ui.asegurarLogin(pagina, contexto);
    const solo = process.env.SOLO;
    for (const t of TAREAS.filter((x) => !solo || x.nombre.includes(solo))) {
      try {
        await contexto.addCookies([{ name: 'cids', value: String(t.cids || 1), url: ui.URL_BASE }]);
        await ui.irA(pagina, `/odoo/action-${t.accion}`);
        const f = pagina.locator('.modal .o_form_view, .o_form_view').last();
        await ui.seleccion(pagina, f, 'mes', t.mes);
        await ui.escribir(f, 'anio', t.anio);
        if (t.tipo) await ui.seleccion(pagina, f, 'tipo', t.tipo);
        if (t.cuenta) await ui.escribir(f, 'cuenta_cargo', t.cuenta);
        if (t.casilla) await ui.casilla(f, t.casilla, true);
        await ui.captura(pagina, `${t.nombre}_asistente`);
        const descarga = pagina.waitForEvent('download', { timeout: 15000 }).catch(() => null);
        await pagina.locator('.modal button, .o_form_view button').filter({ hasText: t.boton }).first().click();
        await ui.esperarCarga(pagina, 2000);
        let archivo = await descarga;
        if (!archivo) {
          // El archivo queda en un campo binario: se descarga con su enlace
          const enlace = pagina.locator('.modal .o_field_binary a, .modal a.o_form_uri, .o_field_binary a').first();
          if (await enlace.count()) {
            const segunda = pagina.waitForEvent('download', { timeout: 15000 });
            await enlace.click();
            archivo = await segunda.catch(() => null);
          }
        }
        if (archivo) {
          const destino = path.join(CARPETA, `${t.nombre}__${archivo.suggestedFilename()}`);
          await archivo.saveAs(destino);
          console.log('archivo', destino);
        } else console.log('sin descarga', t.nombre);
        await ui.captura(pagina, `${t.nombre}_resultado`);
      } catch (error) {
        console.log('FALLÓ', t.nombre, error.message.split('\n')[0]);
      }
    }
  } finally {
    await navegador.close();
  }
})().catch((error) => { console.error(error); process.exit(1); });
