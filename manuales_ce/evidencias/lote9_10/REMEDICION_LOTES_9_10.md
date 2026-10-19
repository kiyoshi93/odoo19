# Re-medición de los lotes 9 y 10 de nómina CE — contable19

- **Fecha:** 2026-10-19, de 21:25 a 21:43 (hora del servidor, UTC).
- **Alcance:** solo medición.
- **Escrituras:** solo las corridas de los 13 casos. El PLAME de octubre y noviembre se generó con el asistente transitorio, que no guarda datos.

## Estado del despliegue (primera medición, 21:25)

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

## Lote 10 (medido tras el nuevo despliegue, 2026-10-19 21:50–21:56)

Gabriel volvió a desplegar el lote 10 (`log_u_lote10_actualizado.txt`, `-u` a las 21:49). Ahora sí está instalado:
- ce **19.0.1.26.2** y ce_demo **19.0.2.24.1**;
- existen `solse.pe.ubigeo.t28`, `solse.pe.carrera.t34` y `solse.payroll.tregistro.wizard`.

| # | Qué | Esperado | Medido | |
|---|---|---|---|---|
| 1 | Versiones | base 19.0.1.20.1 · ce 19.0.1.26.2 · ce_demo 19.0.2.24.1 | Iguales en disco y en base; asistencia 19.0.1.3.2 y plame_demo 19.0.1.4.1 sin cambio | OK |
| 2 | Log del `-u` | Sin ERROR; «Cuentas CE: 0 asignaciones»; cargas de T34 y T28 sin errores | **0 ERROR** y 0 CRITICAL; «Cuentas CE: **0** asignaciones» en las 8 pasadas; `loading solse_pe_payroll_ce/data/solse.pe.carrera.t34.csv` y `…/solse.pe.ubigeo.t28.csv` sin errores; termina en «Modules loaded» y «Registry loaded» | OK |
| 3 | Sin recalcular | FM idéntica al lote 9; Lucía 2 309,73 / 2 160,78 | Las 64 boletas son idénticas al lote 9. Sumas: 2 309,73 / 2 160,78 | OK |
| 4 | Los 14 casos | Los 13 del lote 9 con las mismas celdas y TREGISTRO 148 | PLAME-RXH 202 · NOMINA 525 · PLAME 121 · BOLETA 166 · BANCOS 407 · MICRO 83 · UTILIDADES 33 · AUMENTO 66 · SUBSIDIOS 344 · CESE 149 · INDEMNIZACION 63 · VIDALEY 58 · **TREGISTRO 148** (Archivos 140, Diagnóstico 8) · ASISTENCIA 73. Todos al 100 % | OK |
| 5a | Asistente: altas de octubre (SOLSE Demo) | 4 exportados (70001501, 70001502, 001234567, AB1234567); 70001507 «NO SE EXPORTA: falta el celular…»; sin 70001506 ni 70001505; ide 4 · tra 4 · per 17 · est 4 · cta 2 · edu 3 | «4 trabajador(es) exportado(s), 2 sin exportar. ide: 4, tra: 4, per: 17, est: 4, cta: 2, edu: 3». En el `.ide`: **001234567, 70001502, 70001501, AB1234567**. **70001507**: «NO SE EXPORTA: falta el celular (teléfono personal de 9 dígitos que empiece en 9; EPR1.65)». 70001506 y 70001505 no aparecen. **Otro propuesto:** 70000805 «Trabajador SUBSIDIOS sin derecho» (ingreso en octubre), no se exporta porque le faltan casi todos los datos (O-48). ZIP: `zips/altas_solse_oct2026_*.zip` | OK |
| 5b | Asistente: bajas de octubre | Un solo `RP_<RUC>.per` con `01\|70001505\|\|1\|1\|\|15/10/2026\|01\|\|` | Un solo archivo `RP_20603456786.per` con **`01\|70001505\|\|1\|1\|\|15/10/2026\|01\|\|`**. ZIP: `zips/bajas_solse_oct2026_*.zip` | OK |
| 5c | `.ide` de 70001501 | Campo 26 = 140101; termina en `\|1\|` | `01\|70001501\|\|15/03/1990\|PEÑA\|GÓMEZ\|MARÍA JOSÉ\|2\|\|\|987654321\|maria.pena@correo.com.pe\|01\|LOS ALAMOS\|123\|…\|01\|SANTA ROSA\|\|140101\|…\|1\|`: campo 26 = **140101** y termina en **`\|1\|`** | OK |
| 6 | Prueba en el PVS T-Registro | La hace Gabriel | No corresponde a esta sesión. Datos útiles: los 6 archivos van en **ISO-8859-1** (Ñ y tildes en un byte), con fin de línea **CRLF** y en mayúsculas | Pendiente (Gabriel) |
| 7 | Interfaz | Ficha con «Identificación T-Registro» (con tipo de documento), «Domicilio para el T-Registro» y «Estudios superiores (T-Registro)»; contrato con T8 y T24; T28 1 892 y T34 5 925 | Ficha de 70001501, pestaña «Nómina PE»: los **tres** grupos, con «Tipo de documento (T3) 01 · DNI». Contrato: «Tipo de trabajador (T8)» y «Categoría ocupacional (T24)». Maestros SUNAT: «Ubigeo RENIEC (T28)» **1 892** filas e «Instituciones y carreras (T34)» **5 925** (capturas) | OK |
| 8 | Impacto en FM (solo conteos) | Propuestos, exportados y «NO SE EXPORTA» por motivo | Altas del 01/01/2000 al 19/10/2026: **16 propuestos, 0 exportados, 16 «NO SE EXPORTA»**. Motivos (un trabajador puede tener varios): ver el detalle debajo de la tabla. Ni el ZIP (no se generó: 0 exportados) ni datos personales se guardaron; solo los conteos (`lote10/impacto_fm_tregistro_conteos.json`) | OK |
| 9 | O-31 | Sin versión antes y después | Antes **0 de 136**; después **0 de 136** | OK |

**Resultado del lote 10: 8 puntos OK y 1 a cargo de Gabriel (prueba en el PVS). Ninguna FALLA.**

Motivos de «NO SE EXPORTA» en FM (punto 8):
- en los 16: tipo de trabajador (T8), celular, correo personal, domicilio (distrito y vía), categoría ocupacional (T24), tipo de contrato (T12) y tipo de pago (T16);
- fecha de nacimiento: 14;
- sexo: 14;
- situación educativa: 13;
- régimen de salud: 13;
- CUSPP de 12 caracteres: 6;
- número de documento vacío para el tipo 01: 4;
- apellidos y nombres separados: 4;
- régimen laboral: 4;
- régimen pensionario: 3;
- institución, carrera y año de egreso: 1.

## Observaciones

- **O-45 · Despliegue del lote 10.** El log del segundo `-u` se pasó como «lote 10», pero corresponde al código del lote 9. Conviene comprobar en `/opt/odoo19/...` que las carpetas `solse_pe_payroll_ce` y `solse_pe_payroll_ce_demo` sean las del zip del lote 10 (19.0.1.26.2 y 19.0.2.24.1) antes del `-u`.
- **O-46 · El servicio quedó apagado** tras el `-u` (502 durante más de 15 minutos) hasta que Gabriel lo levantó. Es normal con `--stop-after-init`, pero vale incluir «levantar el servicio» en la lista de despliegue, como estaba en los VERSIONES.txt anteriores.
- **O-48 · Otro trabajador en las altas de octubre.** «Trabajador SUBSIDIOS sin derecho» (70000805, del caso SUBSIDIOS) tiene ingreso en octubre, así que el asistente lo propone. No se exporta porque le faltan casi todos los datos del T-Registro. No afecta al caso TREGISTRO (148 al 100 %), pero sale en la lista de quien exporte las altas de octubre de SOLSE Demo.
- **O-49 · FM no está lista para el T-Registro.** Ninguno de sus 16 trabajadores tiene completos los datos nuevos (T8, T24, celular, correo, domicilio, tipo de contrato y de pago). Si se va a usar la exportación, hay que completar las fichas y los contratos.
- **O-50 · Edad en la ficha.** Se muestra con decimales («Edad 36.58»).
- **O-47 · «Sin goce una semana»** (sigue O-39): 70000903 tiene SINGOCE100 con −5,25 días / −42 h. El `.jor` de 126 h y el `.snl` de 5 días son coherentes con lo esperado; los 5,25 días siguen saliendo de 42 h / 8.

## Evidencia (esta carpeta)

- **Logs:** `log_u_lote9.txt`, `log_u_lote10.txt` (el `-u` que corrió con el código del 9) y `log_u_lote10_actualizado.txt` (el despliegue real del lote 10).
- **Lote 10:** carpeta `lote10/`:
  - antes y después: `antes.txt`, `despues.txt` y `fm_lote10_sin_recalcular.json`;
  - casos: `vuelta1/` (los 14 Excel, incluido `COMPARACION_TREGISTRO.xlsx`);
  - asistente: `altas_solse_oct2026.json` y `bajas_solse_oct2026.json`, y los dos ZIP en `zips/`;
  - FM: `impacto_fm_tregistro_conteos.json`;
  - capturas: `capturas/l10_p7_*`.
- **Antes de los casos:** `antes.txt` (FM, O-31 y feriados) y `fm_lote9_sin_recalcular.json`.
- **Casos:** `casos_tras_sincronizar.json` y `vuelta1/` (`resultado.json` y los 13 Excel de comparación, incluido `COMPARACION_AUMENTO.xlsx`).
- **Detalle de C-33, PLAME, C-34 y O-31:** `detalle_lote9.json`.
- **Boletas de octubre:** `boleta_1370_70000901.pdf`, `boleta_1371_70000902.pdf` y `boleta_1372_70000903.pdf`.
- **Impacto en FM (C-34):** `impacto_fm_c34.json`.
- **Captura:** `capturas/l9_p5_dias_trabajados_aumento_oct2026_70000901.png`.
