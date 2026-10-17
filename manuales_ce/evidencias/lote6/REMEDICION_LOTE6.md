# Re-medición del lote 6 de nómina CE (respuestas de la contadora) — contable19

- **Fecha:** 2026-10-17, de 16:41 a 16:48 (hora del servidor, UTC).
- **Alcance:** solo medición. No se instaló nada, no se cambió código ni la biblia, y no se validó ni canceló nada fuera de lo pedido.
- **Escrituras:** las del botón 5 (punto 5), corrido dos veces; ver el detalle en ese punto.

## Antes del despliegue: asistencia y plame_demo

Cuando llegó el pedido, el lote 6 **ya estaba desplegado** (`-u` 2026-10-17 16:40), así que no se pudo ver la versión instalada justo antes de reemplazar las carpetas. Últimas versiones medidas en contable19:

| Módulo | Esperado antes | Última medición | Cuándo |
|---|---|---|---|
| solse_pe_payroll_asistencia | 19.0.1.0.0 | **19.0.1.0.0** | 2026-10-13, re-medición del lote 2 |
| solse_pe_plame_demo | 19.0.1.2.0 | **19.0.1.2.0** | 2026-10-12, re-medición H-19 (`-u` del 12/10 23:02) |

No hay indicios de que la línea principal las haya cambiado entre esas fechas y el despliegue, pero no se midió en el momento exacto.

## Resultado por punto

| # | Qué | Esperado | Medido | |
|---|---|---|---|---|
| 1 | Versiones | base 19.0.1.14.0 · ce 19.0.1.15.5 · ce_demo 19.0.2.17.1 · asistencia 19.0.1.2.1 · plame_demo 19.0.1.4.1 | Iguales en disco y en base. Sin cambio: asistencia_demo 19.0.1.1.1, demo_libros 19.0.1.38 y plame_rxh_demo 19.0.2.3.1 | OK |
| 2 | Log del `-u` (C-21, Tabla 21, C-25) | — | **No verificable**: no hay acceso al log | Pendiente |
| 3 | Sin recalcular | FM idéntica al lote 6a; Lucía 2 309,73 / 2 160,78 | Las 64 boletas son idénticas al lote 6a (líneas, días, estado y asiento). Sumas: 2 309,73 / 2 160,78 | OK |
| 4 | «Sincronizar» y los 8 casos (NOMINA antes que PLAME) | NOMINA 525 · BOLETA 166 · BANCOS 407 · MICRO 83 · UTILIDADES 33 · ASISTENCIA 73 · PLAME 121 · PLAME-RXH como siempre | NOMINA **525** (Aportes 126, Vacaciones 80) · BOLETA **166** (Boleta impresa 48) · BANCOS **407** · MICRO **83** · UTILIDADES **33** · ASISTENCIA **73** · PLAME **121** (JOR 20, SNL 10, Diagnóstico 10) · PLAME-RXH **202**. Todas las celdas «ok». Ana: 173,62 · 1 267,25 · 11 838,63 | OK |
| 4a | Detalle de PLAME | `.jor` de 6 campos con Nilda 8 h y Óscar 96 h; SNL 23\|30 y 23\|15; diagnóstico 31 y 30 | `.jor`: 6 campos en todas las filas; Nilda 8 h, Óscar 96 h. SNL: Nilda 23\|30 y Óscar 23\|15. Diagnóstico: 31 validadas en el periodo y 30 recogidas | OK |
| 4b | Detalle de MICRO | SIS, régimen, trabajador con hijo, liquidación con ONP 89,38 | SIS_MICRO_001 15,00 · régimen: salud por defecto «sis», AF por defecto «no_pagar», factores 0.0/0/15 · con hijo: ASF 0,00 (con «Pagar»: 113,00; con «EsSalud 9 %»: 135,00) · LIQ: ONP_001 **89,38** | OK |
| 5 | «5. Reiniciar boletas demo» (SOLSE Demo sola) | Mismas boletas antes y después; «Boletas regeneradas y validadas: 35 (con el escenario de cese)» | **1.ª vez:** 74 → 73; «eliminadas: 36 · regeneradas y validadas: 35 (con el escenario de cese)». **2.ª vez:** 73 → 73, las mismas boletas (comparadas por trabajador, fechas y estructura); «eliminadas: 35 · regeneradas: 35 (con el escenario de cese)». La boleta que faltó en la 1.ª vez es la mensual de julio de Nilda, regenerada antes con el código del 6a. Ahora Nilda solo tiene la vacacional de julio. FM: 64 → 64 | OK (O-29) |
| 6 | Tipos de ausencia | Lista con «Tipo de suspensión (Tabla 21)»; códigos de Vacaciones PE, Sin pagar, enfermedad y compensatorios | La columna está en la lista por defecto. **Vacaciones PE (D.Leg. 713) = 23** · **Sin pagar = 05** · **Tiempo personal por enfermedad = 20** · **Días compensatorios = 27**. Sin código: Tiempo personal pagado, Tiempo personal adicional y Horas extra (O-30) | OK |
| 7 | Boleta impresa de Óscar, mensual de julio 2026 | «Días laborados: 16», «Días no laborados: 15» y horas | Boleta 1005: «Días laborados: 16 · Días no laborados: 15 · Horas: 96.0». RB 1 500,00 · ONP 195,00 · neto 1 305,00 · EsSalud 135,00 · SENATI 11,25 | OK |
| 8 | Días trabajados de esa boleta | Una sola columna «¿Pagado?»; VACPE100 sin marcar | Columnas: Descripción · Código · Número de días · Número de horas · **¿Pagado?** (una) · Contrato · Secuencia. WORK100 23/184 marcado; **VACPE100 −11/−88 sin marcar** | OK |
| 9 | C-28 (solo medir) | Trabajadores de compañías reales con más de una versión activa y, para cada uno, si sus boletas validadas tienen la versión vigente | Compañías reales: solo FM SYSTEMS (las otras tres tienen la marca de laboratorio). FM tiene 17 versiones (ninguna archivada) de 17 trabajadores distintos: **ningún trabajador con más de una versión**, así que no hay boletas que revisar. Las 64 boletas de FM tienen versión | OK (O-31) |

**Resultado: 9 OK y 1 pendiente que no se puede medir desde la sesión (log del `-u`). Ninguna FALLA.**

Orden de la medición: versiones → foto de FM → botón 5 (dos veces) → «Sincronizar» y los 8 casos → detalle → tipos de ausencia → boleta impresa → días trabajados → C-28.

## Observaciones (no son fallas)

- **O-28 · Versiones previas al despliegue.** No se pudieron medir en el momento: el lote ya estaba desplegado. Se reportan las últimas medidas (tabla de arriba).
- **O-29 · Primera corrida del botón 5.** Pasó de 74 a 73 boletas porque la mensual de julio de Nilda, creada antes con el código del 6a, ya no se regenera (C-26). Desde la segunda corrida el número es estable (73 → 73).
- **O-30 · Tipos de ausencia sin código de la Tabla 21.** «Tiempo personal pagado», «Tiempo personal adicional» y «Horas extra» (de hr) no tienen código. Si se usan para ausencias de nómina, no aparecerán en el `.snl`. Conviene confirmar con la contadora si alguno debe llevar código (por ejemplo, licencia con goce).
- **O-31 · Versión en las boletas del laboratorio.** Las 71 boletas validadas de SOLSE Demo tienen `version_id` vacío en la cabecera («Contrato» en blanco en el formulario), aunque sus líneas de días sí apuntan a la versión. Ejemplo: boleta 1005 de Óscar, días con «1 ene. 2025». En FM las 64 tienen versión. No afecta los importes medidos, pero C-28 trata justamente de la versión de la boleta. Vale revisar si la siembra de los casos debe ponerla.
- **O-32 · Dos bases de días en la misma boleta.** En la mensual de Óscar, los días trabajados son hábiles (WORK100 23 − VACPE100 11 = 12 días, 96 h), mientras la boleta impresa muestra días calendario (16 laborados y 15 no laborados), como pide C-09. Es coherente, pero conviene explicarlo en el manual (capítulo 10).
- **O-33 · Feriados de 2026 en SOLSE Demo** (sigue O-24). La compañía del laboratorio no tiene feriados de 2026, así que julio cuenta 23 días hábiles sin la línea «Feriados» (28 y 29/07).
- **O-34 · Textos en inglés.** El historial de las boletas del laboratorio dice «Pay Slip creado».

## Evidencia (esta carpeta)

- **Casos:** `casos_tras_sincronizar.json`, `vuelta1/resultado.json` y los Excel de comparación `vuelta1/COMPARACION_*.xlsx` (los 8, incluidos NOMINA, BOLETA, MICRO y PLAME).
- **Detalle de PLAME, MICRO y Ana:** `detalle_casos.json`.
- **Importes sin cambio:** `fm_lote6_sin_recalcular.json`.
- **Botón 5:** `o21_antes.txt` y `o21_despues.txt` (1.ª vez), y `demo_boletas_vuelta2_antes.json` y `demo_boletas_vuelta2_despues.json` (2.ª vez).
- **Tipos de ausencia:** `tipos_ausencia.json`.
- **Boleta de Óscar:** `boleta_1005_oscar_jul2026.pdf`.
- **C-28:** `c28.json`.
- **Lecturas de pantalla:** `ui_hechos.json`.
- **Capturas** (`capturas/`):
  - punto 6: `p6_01_tipos_de_ausencia_tabla21`;
  - punto 7: `p7_01_boleta_impresa_oscar_julio_2026`;
  - punto 8: `p8_01_dias_trabajados_pagado`;
  - botón 5, 1.ª vez: `o21_01_vuelta1`.
