# Re-medición de los lotes 9 y 10 de nómina CE — contable19

- **Fecha:** 2026-10-19, de 21:25 a 21:35 (hora del servidor, UTC).
- **Alcance:** solo medición.
- **Escrituras:** solo las corridas de los 13 casos. El PLAME de octubre y noviembre se generó con el asistente transitorio, que no guarda datos.

## Estado del despliegue

**El lote 10 NO está desplegado (DESP-1).** Tras el reinicio, el servidor tiene las versiones del **lote 9**:

| Módulo | Lote 9 (zip) | Lote 10 (zip) | Instalado (disco = base) |
|---|---|---|---|
| solse_pe_payroll_base | 19.0.1.20.1 | 19.0.1.20.1 | 19.0.1.20.1 |
| solse_pe_payroll_ce | 19.0.1.25.1 | 19.0.1.26.2 | **19.0.1.25.1** |
| solse_pe_payroll_ce_demo | 19.0.2.23.1 | 19.0.2.24.1 | **19.0.2.23.1** |
| solse_pe_payroll_asistencia | — | — | 19.0.1.3.2 |
| solse_pe_plame_demo | — | — | 19.0.1.4.1 |

No existen los modelos del ubigeo (T28) ni de las carreras (T34), ni el asistente `solse.payroll.tregistro.wizard`.

El log «lote 10» (`log_u_lote10.txt`, 21:17) es prácticamente idéntico al del lote 9 (`log_u_lote9.txt`, 21:15):
- mismas 51 cargas de `solse_pe_payroll_ce`;
- **no carga** `solse.pe.carrera.t34.csv` ni `solse.pe.ubigeo.t28.csv`, que el manifiesto del lote 10 sí declara.

El segundo `-u` corrió con las carpetas del lote 9: las del lote 10 no se habían copiado. **El lote 10 no se midió.** Hay que copiar sus tres carpetas, correr el `-u` y luego medirlo.

## Lote 9

| # | Qué | Esperado | Medido | |
|---|---|---|---|---|
| 1 | Versiones | base 19.0.1.20.1 · ce 19.0.1.25.1 · ce_demo 19.0.2.23.1 | Iguales en disco y en base; coinciden con el zip | OK |
| 2 | Log del `-u` | Sin ERROR; «Cuentas CE: 0 asignaciones» en cada compañía | `log_u_lote9.txt`: **0 ERROR** y 0 CRITICAL; «Cuentas CE: **0** asignaciones» en las 8 pasadas (4 compañías × 2); ninguna línea «account_… =»; termina en «Modules loaded» y «Registry loaded» | OK |
| 3 | Sin recalcular | FM idéntica al lote 8; Lucía 2 309,73 / 2 160,78 | Las 64 boletas son idénticas al lote 8 (líneas, días, estado y asiento). Sumas: 2 309,73 / 2 160,78 | OK |
| 4 | Los 13 casos | Mismas celdas que en el lote 8, con AUMENTO 66 | NOMINA 525 · BOLETA 166 · BANCOS 407 · MICRO 83 · UTILIDADES 33 · ASISTENCIA 73 · PLAME 121 · PLAME-RXH 202 · **AUMENTO 66** · SUBSIDIOS 344 · CESE 149 · INDEMNIZACION 63 · VIDALEY 58. Todos al 100 % | OK |
| 5 | AUMENTO (C-33) | Dos WORK100 que suman 22 días / 176 h; RB sin cambio; boleta impresa con 176 h; `.jor` de 176 y 126 | Antes del caso, SOLSE Demo **no tiene feriados** en octubre (0 en todo 2026). **70000901**, boleta 1370: WORK100 10 d / 80 h (versión del 01/09) + 12 d / 96 h (versión del 15/10) = **22 / 176**; RB **2 533,33**; impresa «Horas: **176.0**». **70000902**, boleta 1371: 11 / 88 + 11 / 88 = **22 / 176**; RB **2 500,00**; «Horas: 176.0». PLAME de octubre: `01\|70000901\|176\|0\|0\|0\|` y `01\|70000902\|176\|0\|0\|0\|`. Noviembre: `01\|70000903\|126\|0\|0\|0\|` (168 − 42) y `.snl` 05\|5 y 05\|30 (captura) | OK |
| 6 | C-34 (solo mirar) | Liquidaciones de CESE y NOMINA sin cambio; anotar avisos «ya está validada» | CESE 149 y NOMINA 525 al 100 %. Carmen (NOMINA): GRATI_TRUNCA_001 **833,33** (+ bonificación 75,00). Ninguna de las 14 liquidaciones del laboratorio tiene el aviso «La gratificación ordinaria del semestre ya está validada…» | OK |
| 7 | Impacto en FM (C-34) | Trabajadores con gratificación ordinaria y trunca validadas en el mismo semestre del mismo contrato | **Ninguno.** FM tiene 8 líneas GRATI_001 validadas (Lucía y Héctor, julio y diciembre de 2025 y 2026) y **0** GRATI_TRUNCA_001 | OK |
| 8 | O-31 | Sin versión antes y después | Antes: **0 de 136**. Después: **0 de 136** | OK |

**Resultado del lote 9: los 8 puntos OK. Ninguna FALLA.** C-33 (tu O-38) queda resuelto: el `.jor` ya declara 176 h.

## Lote 10

No medido: DESP-1 (ver «Estado del despliegue»). Los 9 puntos quedan pendientes hasta que se despliegue.

## Observaciones

- **O-45 · Despliegue del lote 10.** El log del segundo `-u` se pasó como «lote 10», pero corresponde al código del lote 9. Conviene comprobar en `/opt/odoo19/...` que las carpetas `solse_pe_payroll_ce` y `solse_pe_payroll_ce_demo` sean las del zip del lote 10 (19.0.1.26.2 y 19.0.2.24.1) antes del `-u`.
- **O-46 · El servicio quedó apagado** tras el `-u` (502 durante más de 15 minutos) hasta que Gabriel lo levantó. Es normal con `--stop-after-init`, pero vale incluir «levantar el servicio» en la lista de despliegue, como estaba en los VERSIONES.txt anteriores.
- **O-47 · «Sin goce una semana»** (sigue O-39): 70000903 tiene SINGOCE100 con −5,25 días / −42 h. El `.jor` de 126 h y el `.snl` de 5 días son coherentes con lo esperado; los 5,25 días siguen saliendo de 42 h / 8.

## Evidencia (esta carpeta)

- **Logs:** `log_u_lote9.txt` y `log_u_lote10.txt`.
- **Antes de los casos:** `antes.txt` (FM, O-31 y feriados) y `fm_lote9_sin_recalcular.json`.
- **Casos:** `casos_tras_sincronizar.json` y `vuelta1/` (`resultado.json` y los 13 Excel de comparación, incluido `COMPARACION_AUMENTO.xlsx`).
- **Detalle de C-33, PLAME, C-34 y O-31:** `detalle_lote9.json`.
- **Boletas de octubre:** `boleta_1370_70000901.pdf`, `boleta_1371_70000902.pdf` y `boleta_1372_70000903.pdf`.
- **Impacto en FM (C-34):** `impacto_fm_c34.json`.
- **Captura:** `capturas/l9_p5_dias_trabajados_aumento_oct2026_70000901.png`.
