# Re-medición del lote 12 de nómina CE (C-35) — contable19

- **Fecha:** 2026-10-22, después del `-u` de las 18:00 (hora del servidor).
- **Alcance:** solo medición. Las únicas escrituras son las corridas de los 14 casos del laboratorio (SOLSE Demo Servicios).
- **FM SYSTEMS:** solo se leyó.
- **Copias de los módulos:** según Gabriel, ya hay una sola en el `addons_path` (O-51).

| # | Qué | Esperado | Medido | |
|---|---|---|---|---|
| 1 | Versiones | asistencia 19.0.1.4.1 · asistencia_demo 19.0.1.2.1; el resto sin cambio | asistencia **19.0.1.4.1** y asistencia_demo **19.0.1.2.1** (`write_date` 18:00). base 19.0.1.20.1 · ce 19.0.1.27.1 · ce_demo 19.0.2.25.1 · plame_demo 19.0.1.4.1 sin cambio (`write_date` 11:49). La versión en disco coincide con la de la base | OK |
| 2 | Log del `-u` | Sin ERROR | `log_u_lote12_2109.txt` (22/10 21:09, `-u` de asistencia y asistencia_demo): `addons_path` con una sola copia de la nómina (`/opt/odoo19/solse_peru_contabilidad`); los dos módulos cargan (1,15 s y 0,26 s), «203 modules loaded» y «Registry loaded in 8.421s». Sin líneas `ERROR` de Odoo. «Cuentas CE: 0 asignaciones»: el `-u` no tocó cuentas (C-21). Solo advertencias ajenas a la nómina (farmacia, CPE, POS) y una línea `(ERROR/3) Unexpected indentation` de docutils: es el texto `description` del manifiesto de asistencia (una lista sin línea en blanco antes), que solo afecta cómo se ve la descripción en Aplicaciones (O-66) | OK |
| 3 | Sin recalcular | FM idéntica al lote 11; Lucía 2 309,73 / 2 160,78 | Las 64 boletas son idénticas al lote 11: 0 distintas, 0 faltantes, 0 nuevas. Sumas: **2 309,73 / 2 160,78** | OK |
| 4 | 14 casos | Todos al 100 %; los 13 de siempre con las mismas celdas; ASISTENCIA 94 con el nombre nuevo | «Asistencias — tardanzas, faltas, medias jornadas y feriados»: **94** celdas (Combinado 20, Diagnóstico 14, Faltas 35, **Feriado 15**, Tardanzas 10). Los otros 13 tienen el mismo desglose que el lote 11. Todos al 100 % | OK |
| 4a | Hoja «Feriado» (Jorge, 47852169) | RB_001 1130.00 · FALTA 0.00 · feriados 1.00 | Esperado y generado iguales: **1130.00 · 0.00 · 1.00** | OK |
| 4b | Hoja «Diagnóstico» | 7 filas; la 4 «ninguno», la 5 «SI», la 6 «1», la 7 «21» | 7 filas: 4 = **ninguno**, 5 = **SI**, 6 = **1**, 7 = **21** | OK |
| 5 | Boleta de octubre de Jorge (solo mirar) | Borrador; los totales, el feriado y los ✔ esperados; RB 1 130,00; sin FALTA | «Asistencias octubre 2026 - Jorge Luis Fernández Rojas» (id 1925), **borrador**, SOLSE Demo. Totales «**Días laborables evaluados: 21 · Faltas: 0 · Tardanza acumulada: 0 min · Feriados: 1**». «**2026-10-08  ◇ feriado**». Los otros **21** días con «✔», ninguno con otra marca. RB_001 **1 130,00**; **ninguna** línea FALTA | OK |
| 6a | Hoja de Angamos | Un solo registro con el recurso de Jorge, del 08/10 05:00 al 09/10 04:59 UTC, en el calendario del caso | **1** registro (id 141): recurso Jorge, **2026-10-08 05:00:00 → 2026-10-09 04:59:00**, calendario «Caso ASISTENCIA · día no laborable de Jorge (sin uso)», `time_type` leave, sin solicitud | OK |
| 6b | Feriados sin recurso en SOLSE Demo, octubre de 2026 | Ninguno | **0** | OK |
| 6c | Zona horaria de los calendarios | America/Lima | SOLSE Demo («Estándar de 40 horas a la semana») y FM («Standard 40 hours/week»): **America/Lima** | OK |
| 7 | Impacto en FM | Conteos | Ver la salida debajo de la tabla. **0 boletas de FM con conciliación de asistencias**, así que ninguna cambia | OK (por RPC) |
| — | O-31 | Sin versión | Antes **0 de 136**; después **0 de 137**. La boleta nueva es la de octubre de Jorge | OK |

**Resultado del lote 12: todo OK, incluido el log del `-u` (punto 2). Lote cerrado.**

## Punto 7 · salida (FM SYSTEMS, solo lectura)

No tengo `odoo-bin shell`, así que medí lo mismo por RPC (`impacto_c35_rpc.py`). Hay una diferencia con el script del paquete: los feriados se toman de `resource.calendar.leaves` y no de `_conciliar_periodo`, que es un método privado. Como FM no tiene ninguna boleta con resumen de asistencias, el resultado no cambia. Si Gabriel quiere la salida oficial, puede correr `medir_impacto_c35.py` en el servidor.

```
== FM SYSTEMS (id 1)
  versión de solse_pe_payroll_asistencia: 19.0.1.4.1
  ajustes: cargar al calcular False · evaluar por horas False · descontar tardanzas True · tolerancia 10 min
  checadas (hr.attendance) de 2025-2026: 65
  días no laborables sin solicitud 2025-2026: 32 sin recurso (feriados) · 0 de trabajadores
  fechas de los feriados: 2025-01-01, 2025-04-17, 2025-04-18, 2025-05-01, 2025-06-07, 2025-06-29, 2025-07-23, 2025-07-28, 2025-07-29, 2025-08-06, 2025-08-30, 2025-10-08, 2025-11-01, 2025-12-08, 2025-12-09, 2025-12-25, 2026-01-01, 2026-04-02, 2026-04-03, 2026-05-01, 2026-06-07, 2026-06-29, 2026-07-23, 2026-07-28, 2026-07-29, 2026-08-06, 2026-08-30, 2026-10-08, 2026-11-01, 2026-12-08, 2026-12-09, 2026-12-25
  boletas con conciliación de asistencias: 0 {}
  boletas con un feriado que su resumen trae como falta, tardanza o parcial: {} · días: {}
== fin (solo lectura)
```

## Observaciones

- Ninguna observación nueva. O-51 queda cerrada según Gabriel (una sola copia): la versión en disco de los seis módulos coincide con la de la base.

## Evidencia (esta carpeta)

- `antes.txt`, `despues.txt` y `fm_lote12_sin_recalcular.json`.
- `casos_tras_sincronizar.json` y `vuelta1/` (`resultado.json` y los 14 Excel, incluido `COMPARACION_ASISTENCIA.xlsx`).
- `p5_p6.json`: la boleta de Jorge con su resumen completo, la hoja de Angamos, los feriados sin recurso y las zonas horarias.
- `impacto_c35_rpc.py` e `impacto_c35_fm_rpc.txt`: el punto 7.
