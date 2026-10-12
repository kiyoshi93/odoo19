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

---

# Segunda re-medición (servidor corregido) — 2026-10-12 22:19–22:22

## 1. Versiones (`installed_version` = manifiesto en disco · `latest_version` = base)

| Módulo | Esperado | Disco | Base | |
|---|---|---|---|---|
| solse_pe_plame_rxh_demo | 19.0.2.3.0 | 19.0.2.3.0 | 19.0.2.3.0 | ✓ |
| solse_pe_sire_compra_8_5 | 19.0.2.5 | 19.0.2.5 | 19.0.2.5 | ✓ |
| solse_pe_payroll_base | 19.0.1.8.2 | **19.0.1.6.0** | 19.0.1.8.2 | ✗ |
| solse_pe_payroll_ce | 19.0.1.9.4 | **19.0.1.8.0** | 19.0.1.9.4 | ✗ |

**Nómina NO coincide con el lote 1.** En este servidor el código de nómina es anterior
al lote 1: `solse.payroll.bancos.wizard` ya no tiene el campo del «Modo estricto».
Por la regla del encargo, la medición se detuvo aquí. El paso 6 (NOMINA y ASISTENCIA)
no se ejecutó.

## 2–5. H-19 (ya medido antes de detectar lo anterior)

| Paso | Resultado |
|---|---|
| 2. PLAME-RXH | Limpiar, Sembrar, Generar y Comparar OK · **100 % CONFORME** (comparación 9, 22:19:58) |
| 3. PLAME | Limpiar, Sembrar, Generar y Comparar OK · **100 % CONFORME** (comparación 10, 22:20:00) |
| 4. Recibo E001-110 (id 758, ROSSI BIANCHI MARCO ANTONIO, pasaporte, Chile) | convenio **02** · renta **19** · modalidad **3** · exoneración **vacía** · vinculación **00** · anotación 0 ✓ |
| 5. Warnings «se omite» | Log no accesible. Evidencia indirecta: los 5 valores llegaron al recibo, así que no se omitió ninguno |

PLAME-RXH no tuvo esperados que dependan del convenio o la renta con diferencias (0 celdas distintas).

**H-19: corregido por la línea principal en `solse_pe_plame_rxh_demo` 19.0.2.3.0 — verificado.**

---

# Tercera re-medición (versiones corregidas) — 2026-10-12 23:06–23:08 · RESULTADO FINAL

La medición anterior se hizo con módulos de nómina de un chat previo, por un error de carga. Ya está corregido.

## Versiones (disco = base)

| Módulo | Versión |
|---|---|
| solse_pe_payroll_base | 19.0.1.8.2 ✓ |
| solse_pe_payroll_ce | 19.0.1.9.4 ✓ (el asistente de bancos tiene `modo_estricto` y `hay_omitidos`) |
| solse_pe_payroll_ce_demo | 19.0.2.5.0 ✓ |
| solse_pe_payroll_asistencia / _demo | 19.0.1.0.0 / 19.0.1.1.1 ✓ |
| solse_pe_plame_rxh_demo | **19.0.2.3.1** (se pidió 19.0.2.3.0; es una revisión posterior de la línea principal) |
| solse_pe_sire_compra_8_5 | 19.0.2.5 ✓ |
| solse_pe_plame_demo · solse_pe_demo_libros | 19.0.1.2.0 · 19.0.1.38 |

## Resultados

| Paso | Resultado |
|---|---|
| PLAME-RXH | **100 % CONFORME** (comparación 11, 23:06:42) |
| PLAME | **100 % CONFORME** (comparación 12, 23:06:45) |
| E001-110 (id 777) | convenio 02 · renta 19 · modalidad 3 · exoneración vacía · vinculación 00 · anotación 0 ✓ |
| Warnings «se omite» | Log no accesible. Los 5 valores llegaron al recibo, así que no se omitió ninguno |
| ASISTENCIA | **100 % CONFORME** (comparación 13, 23:06:50) |
| NOMINA | **100 % CONFORME** (comparación 14, 23:07:09) |
| TXT lote 1 (regenerados y comparados byte a byte con los de esta carpeta) | BCP haberes dic: idéntico · Scotiabank dic: idéntico · CTS BCP nov: idéntico salvo la fecha de pago (no se indicó en la prueba), omitidos = sí · Interbank dic: idéntico salvo la hora de generación |

Ningún esperado depende del convenio o la renta con diferencias: 0 celdas distintas en todos los casos.

**H-19: corregido por la línea principal en `solse_pe_plame_rxh_demo` (19.0.2.3.x) — verificado. Lote 1 de nómina: sigue validado.**
