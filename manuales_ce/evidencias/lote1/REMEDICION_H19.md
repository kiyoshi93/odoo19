# Re-medición de H-19 (PLAME-RXH no siembra) — contable19, 2026-10-12 22:08–22:10

Objetivo: verificar la corrección de la línea principal en `solse_pe_plame_rxh_demo` 19.0.2.3.0. Sin tocar código.

## 1. Versiones instaladas

| Módulo | Esperado | Medido (`latest_version` = `installed_version` en disco) | |
|---|---|---|---|
| solse_pe_plame_rxh_demo | 19.0.2.3.0 | **19.0.2.2.0** (write_date 22:07:58) | ✗ |
| solse_pe_sire_compra_8_5 | 19.0.2.5 | 19.0.2.5 | ✓ |
| solse_pe_payroll_base | 19.0.1.8.2 | 19.0.1.8.2 | ✓ |
| solse_pe_payroll_ce | 19.0.1.9.4 | 19.0.1.9.4 | ✓ |

La nómina coincide con lo validado en el lote 1. El manifiesto que lee el servidor
de `solse_pe_plame_rxh_demo` sigue diciendo 19.0.2.2.0: la 19.0.2.3.0 no está en la
ruta de addons que carga Odoo, o hay otra copia del módulo antes en `addons_path`.

## 2–6. Resultados

| Paso | Resultado |
|---|---|
| 2. PLAME-RXH | Limpiar OK · **Sembrar FALLA**: `Wrong value for account.move.nd_exoneracion: '00'` (mismo error que antes; el código nuevo ya no envía esa clave) |
| 3. PLAME | Limpiar OK · Sembrar FALLA: «Antes de ejecutar este caso hay que sembrar: PLAME-RXH» |
| 4. Recibo E001-110 | No verificable: no existe (la siembra se revierte) |
| 5. Warnings «[demo PLAME-RXH] … se omite» | No verificable: la siembra no llega a esa lógica; el log del servidor no es accesible desde la sesión |
| 6. ASISTENCIA | 100 % · CONFORME (comparación 7, 22:09:42) |
| 6. NOMINA | 100 % · CONFORME (comparación 8, 22:10:02) |

No hubo diferencias de esperados que reportar: PLAME-RXH no llegó a comparar.

## Para cerrar H-19

1. Copiar `solse_pe_plame_rxh_demo` 19.0.2.3.0 en la ruta que usa el servidor (revisar `addons_path` por copias duplicadas).
2. Reiniciar Odoo y actualizar con `-u solse_pe_plame_rxh_demo -d contable19`.
3. Confirmar en Aplicaciones que muestra 19.0.2.3.0.
4. Repetir los pasos 2 a 5.
