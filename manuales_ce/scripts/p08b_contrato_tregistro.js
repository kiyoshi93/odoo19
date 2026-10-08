// Capítulo 8 (continuación): datos del contrato (hr.version) para T-Registro / PLAME y diario de planillas.
const ui = require('./odoo_ui');

(async () => {
  const { navegador, contexto, pagina } = await ui.abrir();
  await contexto.addCookies([{ name: 'cids', value: '1', url: ui.URL_BASE }]);
  try {
    await ui.asegurarLogin(pagina, contexto);
    for (const [idVersion, conCaptura] of [[27, true], [28, false]]) {
      await ui.irA(pagina, `/odoo/action-1009/${idVersion}`);
      const f = pagina.locator('.o_form_view').first();
      const llenar = async (campo, texto) => {
        if (!(await ui.campo(f, campo).locator('input').count())) return;
        if (await ui.campo(f, campo).locator('input').inputValue()) return;
        await ui.muchosAUno(pagina, f, campo, texto).catch((e) => console.log(campo, e.message.split('\n')[0]));
      };
      await llenar('labor_regime_id', '728');
      await llenar('mintra_contract_id', 'INDETERMINADO');
      await llenar('work_occupation_id', idVersion === 27 ? 'CONTADOR' : 'ALMACEN');
      await llenar('payment_type_id', 'DEPOSITO');
      await llenar('journal_id', 'Planillas');
      if (conCaptura) {
        await ui.captura(pagina, 'p08_07_contrato_tregistro', { resaltar: [ui.campo(f, 'labor_regime_id'), ui.campo(f, 'mintra_contract_id'), ui.campo(f, 'work_occupation_id'), ui.campo(f, 'journal_id')] });
      }
      await ui.guardar(pagina);
      if (conCaptura) await ui.captura(pagina, 'p08_08_contrato_guardado');
    }
  } finally {
    await navegador.close();
  }
})().catch((error) => { console.error(error); process.exit(1); });
