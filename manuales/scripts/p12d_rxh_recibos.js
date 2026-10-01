// Capítulo 12 (cont.): registrar recibos por honorarios (doc. 02) y su pago
const u = require('./odoo_ui');
const recibos = [
  { id: process.env.ID_FLORES, prestador: 'FLORES PAREDES', numero: 'E001-103', emision: '05/07/2026', pago: '12/07/2026', concepto: 'Servicio de diseño de colección', monto: '3000', retencion: true, prefijo: 'p12_07' },
  { id: process.env.ID_QUISPE, prestador: 'QUISPE HUAMAN', numero: 'E001-101', emision: '03/07/2026', pago: '10/07/2026', concepto: 'Asesoría en control de calidad', monto: '800', retencion: false, prefijo: null },
];

(async () => {
  const { navegador, contexto, pagina } = await u.abrir();
  await u.asegurarLogin(pagina, contexto);
  for (const r of recibos) {
    const f = pagina.locator('.o_form_view').first();
    if (r.id) {
      await u.irA(pagina, `/odoo/bills/${r.id}`);
    } else {
    await u.irA(pagina, '/odoo/action-account.action_move_in_invoice_type/new');
    await u.muchosAUno(pagina, f, 'partner_id', r.prestador);
    await pagina.waitForTimeout(1200);
    await u.muchosAUno(pagina, f, 'l10n_latam_document_type_id', 'Honorarios', 'Recibo por Honorarios');
    await pagina.waitForTimeout(800);
    await u.escribir(f, 'l10n_latam_document_number', r.numero);
    await u.escribir(f, 'ref', r.numero);
    await u.fecha(f, 'invoice_date', r.emision);
    // Línea del servicio
    const lineas = u.campo(f, 'invoice_line_ids');
    await lineas.locator('.o_field_x2many_list_row_add a').first().click();
    await pagina.waitForTimeout(800);
    const fila = lineas.locator('.o_data_row.o_selected_row');
    await u.escribir(fila, 'name', r.concepto);
    await u.escribir(fila, 'price_unit', r.monto);
    const impuestos = u.campo(fila, 'tax_ids');
    if (!(await impuestos.isVisible())) { await fila.locator('td[name="tax_ids"]').click(); await pagina.waitForTimeout(300); }
    while (await impuestos.locator('.o_delete').count()) { await impuestos.locator('.o_delete').first().click(); await pagina.waitForTimeout(300); }
    if (r.retencion) await u.muchosAUno(pagina, fila, 'tax_ids', 'Retención Renta 4ta', 'Retención Renta 4ta');
    await lineas.locator('thead').first().click();
    await pagina.waitForTimeout(1200);
    if (r.prefijo) await u.captura(pagina, `${r.prefijo}_recibo_honorarios`, { resaltar: [u.campo(f, 'ref'), u.campo(f, 'l10n_latam_document_type_id'), u.campo(f, 'l10n_latam_document_number'), u.campo(f, 'invoice_date'), lineas, u.campo(f, 'tax_totals')] });
    await u.guardar(pagina);

    await pagina.locator('.o_form_statusbar button', { hasText: /^\s*Confirmar\s*$/ }).first().click();
    await u.esperarCarga(pagina, 2000);

    }
    console.log('BOTONES', await pagina.locator('.o_form_statusbar .o_statusbar_buttons button:visible').allInnerTexts());
    // Registrar pago
    const pagar = pagina.locator('.o_form_statusbar button:visible', { hasText: /^\s*(Registrar pago|Pagar)\s*$/ }).first();
    if (r.prefijo) await u.captura(pagina, `${r.prefijo}a_recibo_confirmado`, { resaltar: [pagar] });
    await pagar.click();
    const d = pagina.locator('.modal .o_form_view').last();
    await d.waitFor(); await pagina.waitForTimeout(800);
    await u.muchosAUno(pagina, d, 'journal_id', 'BCP - Cta', 'BCP - Cta. corriente');
    await u.fecha(d, 'payment_date', r.pago, { enter: false });
    await pagina.locator('.modal-title').last().click();
    await u.seleccion(pagina, d, 'l10n_pe_payment_method_code', 'TRANSFERENCIA DE FONDOS');
    await pagina.locator('.modal-title').last().click();
    await pagina.waitForTimeout(800);
    if (r.prefijo) await u.captura(pagina, `${r.prefijo}b_registrar_pago`, { resaltar: [u.campo(d, 'journal_id'), u.campo(d, 'payment_date'), u.campo(d, 'amount'), u.campo(d, 'l10n_pe_payment_method_code')] });
    await pagina.locator('.modal-footer button:visible', { hasText: /Crear pago|Create Payment/ }).last().click();
    await u.esperarCarga(pagina, 2500);
    if (await pagina.locator('.o_notification:has-text("obligatorio")').count()) throw new Error('Pago: faltan campos obligatorios');
    if (r.prefijo) await u.captura(pagina, `${r.prefijo}c_recibo_pagado`);
    console.log(r.numero, pagina.url());
  }
  await navegador.close();
})().catch((error) => { console.error(error); process.exit(1); });
