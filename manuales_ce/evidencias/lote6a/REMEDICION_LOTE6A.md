# Re-medición del lote 6a de nómina CE — contable19

- **Fecha:** 2026-10-15, de 21:30 a 21:35 (hora del servidor, UTC).
- **Alcance:** solo medición. No se instaló nada ni se cambió código ni la biblia.
- **Escrituras:** las pedidas en los puntos 6 (la boleta de prueba de C-18, que se elimina) y 8 (botón 5).
- **Punto 10 (script de limpieza):** omitido por indicación; se hará aparte.

## Resultado por punto

| # | Qué | Esperado | Medido | |
|---|---|---|---|---|
| 1 | Versiones | base 19.0.1.11.10 · ce 19.0.1.12.16 · ce_demo 19.0.2.15.2 | Iguales en disco y en base (`-u` 21:29). demo_libros 19.0.1.38 sin cambio | OK |
| 2 | Log del `-u` (C-21: «Cuentas CE: 0 asignaciones», sin «account_credit = 4111000») | — | **No verificable**: no hay acceso al log | Pendiente |
| 3 | Sin cambios de importes | FM idéntica a `fm_lote5_sin_recalcular.json`; Lucía 2 309,73 / 2 160,78 | Las 64 boletas de Lucía y Héctor son idénticas (líneas, días, estado y asiento). Solo falta la 480, la boleta de prueba borrada en el punto 13 del lote 5. Sumas: 2 309,73 / 2 160,78 | OK |
| 4 | «Sincronizar casos» y los 8 casos al 100 % | NOMINA 450 · BOLETA 154 · BANCOS 407 · MICRO 45 · UTILIDADES 33 · ASISTENCIA, PLAME y PLAME-RXH al 100 % | NOMINA **450** · BOLETA **154** · BANCOS **407** (+ Interbank CTS 30; Archivos 36; Omitidos 64) · MICRO **45** (Diagnóstico 8) · UTILIDADES **33** (Tope 8) · ASISTENCIA 73 · PLAME 95 · PLAME-RXH 202. Todas las celdas «ok». Ana: AFP_PRI 173,62 · R5TA 1 267,25 · NET 11 838,63 | OK |
| 5 | C-18 en el Excel de MICRO | «3 · validar la CTS sin importes (C-18)» = «aviso: no tiene importes»; «4 · el botón del aviso la elimina (C-18)» = «eliminada» | Hoja «Diagnóstico» de `COMPARACION_MICRO.xlsx`: ESPERADO y GENERADO iguales en las dos filas | OK |
| 6 | C-18 en el navegador (SOLSE Demo) | Aviso «La boleta no tiene importes…» con «Eliminar la boleta sin importes» y «Cerrar»; al pulsar, «Se eliminó la boleta sin importes.» y vuelta a la lista | Boleta «Liquidación CTS de Trabajador MICRO (microempresa) – noviembre 2026» (id 909), estructura CTS, 01/11–30/11/2026, calculada. «Confirmar» → «La boleta no tiene importes: todas sus líneas salen en 0,00 (por ejemplo, la CTS o la gratificación de un trabajador de microempresa). No hay nada que pagar ni que contabilizar, así que no se valida: - Liquidación CTS de Trabajador MICRO (microempresa) – noviembre 2026», con los botones «Eliminar la boleta sin importes» y «Cerrar». Al pulsar: notificación «Se eliminó la boleta sin importes.» y la lista «Nóminas del empleado». La 909 ya no existe; boletas de SOLSE Demo 74 → 74 | OK |
| 7 | C-23 | FM: «Interbank: CTS en cuenta de otro banco» = «Omitir: se deposita con el archivo del banco de la cuenta» | Pestaña «Nómina PE - Controles», grupo «Pago a bancos»: ese valor (`omitir`). No se cambió | OK |
| 8 | O-21 | Mismas boletas antes y después; «Boletas regeneradas y validadas: N (con el escenario de cese)» | SOLSE Demo sola: **74 antes y 74 después**. «Boletas demo eliminadas: 36 · Boletas regeneradas y validadas: **36 (con el escenario de cese)** · Errores: -». FM: 64 → 64 | OK |
| 9 | O-23 · Plantillas de contrato sin nombre (SOLSE Demo) | Anotar antes; no aumentan tras los casos | **137 antes y 137 después** de los 8 casos (todas sin nombre, ninguna archivada) | OK |
| 10 | Script de limpieza | — | Omitido por indicación | — |

**Resultado: 8 OK, 1 pendiente que no se puede medir desde la sesión (log del `-u`) y 1 omitido. Ninguna FALLA.**

Orden de la medición: plantillas (antes) → O-21 → «Sincronizar» y los 8 casos → plantillas (después) → C-18 en el navegador → C-23.

## Observaciones (no son fallas)

- **O-24 · Festivos de 2026 en SOLSE Demo.** La lista de boletas de SOLSE Demo muestra la banda de V-05 «Faltan los días festivos de 2026: no hay ninguno registrado…». Los días festivos son por compañía: FM SYSTEMS tiene 16 en 2026 y SOLSE Demo, 0. Las boletas del laboratorio se calculan sin la línea de feriados. Si es lo esperado por los casos, el aviso es correcto, pero en la compañía del laboratorio aparece siempre.
- **O-25 · Ruta tras eliminar la boleta (C-18).** Después de «Eliminar la boleta sin importes», la URL queda como `/odoo/909/action-1005`, con el id de la boleta borrada delante de la acción. La pantalla muestra bien la lista; es solo cosmético. Un F5 en esa ruta no se probó.
- **O-26 · Plantillas sin nombre.** Las 137 plantillas sin nombre de SOLSE Demo no aumentan con los casos, pero siguen ahí hasta que corra el script del punto 10.
- **O-27 · Lista de boletas del trabajador MICRO.** La CTS de prueba se nombró «Liquidación CTS de …», y no «Boleta de CTS de …» como las demás estructuras complementarias del lote 3 («Boleta de Gratificación de …», «Boleta de Vacaciones de …»). Solo se anota la diferencia de estilo.

## Evidencia (esta carpeta)

- **Casos:** `casos_tras_sincronizar.json` y `vuelta1/resultado.json`. Los Excel de comparación de los 8 casos están en `vuelta1/COMPARACION_*.xlsx`, incluidos NOMINA, BOLETA, BANCOS, MICRO y UTILIDADES.
- **Ana:** `ana.json`.
- **Importes sin cambio:** `fm_lote6_sin_recalcular.json`.
- **O-21:** `o21_antes.txt` y `o21_despues.txt`.
- **Plantillas:** `plantillas_antes.json` y `plantillas_despues_casos.json`.
- **C-18:** `c18_antes.txt`.
- **Lecturas de pantalla:** `ui_hechos.json`.
- **Capturas** (`capturas/`):
  - C-18: `c18_01_cts_micro_calculada`, `c18_02_aviso_boleta_sin_importes` y `c18_03_notificacion_eliminada`;
  - C-23: `c23_01_fm_pago_a_bancos_interbank_cts`;
  - O-21: `o21_01_reiniciar_boletas_resultado`.
