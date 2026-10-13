# Re-medición del lote 3 de nómina CE — contable19

- **Fecha:** 2026-10-13, de 20:40 a 21:00 (hora del servidor, UTC).
- **Alcance:** solo medición. No se instaló nada ni se cambió código ni la biblia.
- **Despliegue medido:** el de Gabriel (`-u` 20:36).

## 1 · Versiones (manifiesto en disco = base)

| Módulo | Esperado | Medido | |
|---|---|---|---|
| solse_pe_payroll_base | 19.0.1.10.5 | 19.0.1.10.5 | OK |
| solse_pe_payroll_ce | 19.0.1.11.10 | 19.0.1.11.10 | OK |
| solse_pe_payroll_ce_demo | 19.0.2.5.0 | 19.0.2.5.0 | OK |
| om_hr_payroll / om_hr_payroll_account | sin cambio | 19.0.1.0 / 19.0.0.0 | OK |

No hay DESP-1.

## 2 · Laboratorio

| Caso | Resultado | |
|---|---|---|
| PLAME-RXH | 100 % (202 celdas, comparación 19) | OK |
| PLAME | 100 % (95 celdas, comparación 20) | OK |
| ASISTENCIA | 100 % (73 celdas, comparación 21) | OK |
| NOMINA | 100 % (366 celdas, comparación 22) | OK |
| Ana (jul-2026) | AFP_PRI_001 **173,62** · R5TA_001 **1 267,25** · NET **11 838,63**, ya guardados redondeados (antes 173,615305) | OK |

## 3 · C-05: PDF de Lucía, diciembre 2026, ANTES de recalcular (boleta 148)

| Ingresos | Descuentos | Neto impreso | Ingresos − descuentos | |
|---|---|---|---|---|
| 4 623,00 | 797,04 (462,30 + 71,66 + 63,34 + 199,74) | 3 825,96 | 3 825,96 | **OK** (antes 797,03) |

Después del recálculo: 4 623,00 − 778,34 = **3 844,66**, igual al neto esperado del lote 3 (`boleta_148_lucia_dic2026_tras_recalculo.pdf`).

## 4 · C-03 y C-11: recálculo EN SITIO de las 64 boletas de FM SYSTEMS

- **Método:** cancelar → borrador → calcular → validar.
- **Orden:** mes por mes; dentro del mes, GRAT, VAC y CTS antes de la NME.
- **Resultado:** 64 de 64 sin errores (`bitacora_recalculo_lote3.json`).
- **Foto previa:** `fm_antes_recalculo_lote3.json`.
- **Resultado:** `anio_completo_fm_lote3.json`, con el formato de `anio_completo_fm.json` (sin líneas en cero); la versión con estado, asiento y líneas en cero está en `anio_completo_fm_lote3_completo.json`.

### Lucía (NME)

| Mes | Boleta | R5TA esperado | R5TA medido | NET esperado | NET medido | |
|---|---|---|---|---|---|---|
| 2025-01 | 84 | 192.48 | 192.48 | 3824.52 | 3824.52 | OK |
| 2025-02 | 85 | 192.48 | 192.48 | 3824.52 | 3824.52 | OK |
| 2025-03 | 86 | 192.48 | 192.48 | 3824.52 | 3824.52 | OK |
| 2025-04 | 88 | 192.48 | 192.48 | 3824.52 | 3824.52 | OK |
| 2025-05 | 91 | 192.48 | 192.48 | 3824.52 | 3824.52 | OK |
| 2025-06 | 94 | 192.48 | 192.48 | 3824.52 | 3824.52 | OK |
| 2025-07 | 97 | 192.48 | 192.48 | 3824.52 | 3824.52 | OK |
| 2025-08 | 100 | 192.47 | 192.47 | 3824.53 | 3824.53 | OK |
| 2025-09 | 102 | 192.47 | 192.47 | 3824.53 | 3824.53 | OK |
| 2025-10 | 104 | 192.47 | 192.47 | 3824.53 | 3824.53 | OK |
| 2025-11 | 107 | 192.47 | 192.47 | 3824.53 | 3824.53 | OK |
| 2025-12 | 111 | 192.49 | 192.49 | 3824.51 | 3824.51 | OK |
| 2026-01 | 114 | 179.42 | 179.42 | 3837.58 | 3837.58 | OK |
| 2026-02 | 117 | 183.73 | 183.73 | 1873.97 | 1873.97 | OK |
| 2026-03 | 119 | 179.79 | 179.79 | 3837.21 | 3837.21 | OK |
| 2026-04 | 121 | 179.40 | 179.40 | 3837.60 | 3837.60 | OK |
| 2026-05 | 124 | 179.40 | 179.40 | 3837.60 | 3837.60 | OK |
| 2026-06 | 127 | 179.40 | 179.40 | 3837.60 | 3837.60 | OK |
| 2026-07 | 130 | 179.40 | 179.40 | 3837.60 | 3837.60 | OK |
| 2026-08 | 133 | 179.39 | 179.39 | 3837.61 | 3837.61 | OK |
| 2026-09 | 135 | 179.39 | 179.39 | 3837.61 | 3837.61 | OK |
| 2026-10 | 138 | 180.21 | 180.21 | 3845.49 | 3845.49 | OK |
| 2026-11 | 141 | 180.21 | 180.21 | 3845.49 | 3845.49 | OK |
| 2026-12 | 148 | 181.04 | 181.04 | 3844.66 | 3844.66 | OK |
| **2025** | | **2 309,73** | **2,309.73** | | | OK |
| **2026** | | **2 160,78** | **2,160.78** | | | OK |

### Resto

| Qué | Esperado | Medido | |
|---|---|---|---|
| Héctor: R5TA en todas sus boletas | 0 | 0 en las 32 | OK |
| Otras líneas frente a `anio_completo_fm.json` | Solo el redondeo de C-05 | 116 líneas cambian solo por redondeo a 2 decimales; ninguna otra diferencia. Días trabajados iguales. Las 64 en estado Hecho y con asiento | OK |
| Ejemplo del encargo: ESSALUD de la VAC de feb-2026 (boleta 116) | 207,585 → 207,59 | 207,59. La línea base guarda 207,58499999999995 (flotante); el script la marca, pero es el redondeo esperado | OK |

## 5 · C-06: diario por defecto

| Qué | Esperado | Medido | |
|---|---|---|---|
| Boleta nueva desde el formulario, sin tocar el diario (trabajador de prueba «Dos», contrato sin diario) | Planillas (PLLA) | Planillas | OK |
| Lote nuevo | PLLA | Planillas | OK |
| Contrato con diario elegido («Operaciones misceláneas», trabajador «Uno») → boleta nueva | El del contrato | Operaciones misceláneas | OK |
| Asientos del recálculo y de la rectificación | — | PLLA/2026/10/0001 y 0002 en Planillas | — |

## 6 · C-07: trabajadores NUEVOS desde la ficha

Se crearon «Prueba C07 Sintético Uno» (empleado 94) y «Prueba C07 Sintético Dos» (95) en FM SYSTEMS.

| Qué | Esperado | Medido | |
|---|---|---|---|
| Contrato al nacer | Régimen General + NME | Régimen General + Nómina Mensual Empleados, en los dos | OK |
| Tipo → «Obreros - Semanal» | NSO | NSO en pantalla y al guardar | OK |
| Tipo → «Quincenal - Adelanto» | NME (no NQA) | NME en pantalla y al guardar | OK |
| Boleta nueva del trabajador | NME y días trabajados | NME · «Días laborados (100 %)» WORK100 22 / 176 y «Feriados» GLOBAL −1 / −8 · nombre «Boleta de Prueba C07 Sintético Uno – octubre 2026». **Requiere cargar antes la fecha de inicio del contrato en la ficha (ver O-7)** | OK |
| Vacaciones y luego cambio de fechas (13–27/10/2026) | Sigue en Vacaciones; «Boleta de Vacaciones de …» | Sigue en Vacaciones · «Boleta de Vacaciones de Prueba C07 Sintético Uno – octubre 2026» · días WORK100 11 / 88 | OK |
| Contratos sin estructura (con inactivos) | No cambia | Antes 75 de 93 → después 75 de 95; los 2 nuevos tienen NME | OK |

## 7 · Rectificación (trabajador de prueba «Dos», sueldo 3 000; ni Lucía ni Héctor)

| Qué | Esperado | Medido | |
|---|---|---|---|
| Rectificar una mensual validada | Nota de crédito | Acción «Boleta rectificativa» → nota 481 «Rectificación: Boleta de Prueba C07 Sintético Dos – octubre 2026», credit_note, Hecho, SLIP/240 | OK |
| Líneas e importes | Iguales a la original | 14 líneas idénticas (RB 3 000, ESSALUD 270, SENATI 22,5, NET 3 000…) | OK |
| Asiento | Espejo | PLLA/2026/10/0002: cada débito y crédito invertido respecto de PLLA/2026/10/0001 | OK |
| Limpieza | Nota y boleta canceladas | Las dos en «cancel»; om borró sus asientos (0 restantes) | OK |

Detalle en `rectificacion.json`.

## 8 · O-1, O-2 y O-3

| Qué | Esperado | Medido | |
|---|---|---|---|
| O-1 · T8 | Columna «Descripción» | Código · Abreviatura · Descripción | OK |
| O-2 · Lote | Estado «Cerrado» y botón «Cerrar» | Barra: Borrador · Hecho · Cerrado. Botones: Generar nóminas · Cambiar a borrador · Marcar como hecho · Cerrar | OK |
| O-3 · Menú | «Plantillas de beneficios del contrato» | Nómina › Configuración › Plantillas de beneficios del contrato | OK |

**Resultado: todos los puntos OK, sin FALLAS.**

## Observaciones (no son fallas)

- **O-7 · Alta desde la ficha sin fecha de inicio de contrato.** El empleado nuevo nace con su versión (Régimen General + NME), pero con «Contrato: No empleado» (`contract_date_start` vacío, `is_in_contract` = False). La boleta nueva de ese trabajador sale sin contrato, sin estructura, sin días y sin ningún aviso. El aviso de C-07 solo aparece cuando hay contrato sin estructura. Al poner la fecha de inicio en la ficha (Nómina › Contrato), todo funciona. Sugerencia: avisar también cuando no hay contrato en el periodo, o documentarlo en el manual (capítulo 8). Medido el 13/10 a las 20:45 con el trabajador «Uno».
- **O-8 · Trabajador sin sistema pensionario.** La boleta de prueba (sueldo 3 000, sin AFP/ONP) se validó sin aporte pensionario y sin aviso: NET = GROSS = 3 000. Puede ser correcto para alguien sin afiliar, pero un alta incompleta pasa sin advertencia.
- **O-9 · Textos del núcleo en inglés.**
  - El historial de la ficha dice «Modified on the Version '13 oct. 2026'».
  - Los tipos de estructura «Employee» y «Worker» de hr aparecen en el selector de «Categoría del pago», con secuencia 10, junto a «Régimen General».
  - El calendario se llama «Standard 40 hours/week».
- **O-10 · Lote «Planilla diciembre 2026».** Solo contiene la boleta de Héctor (SLIP/109), con nombre «Salary Slip of …». Las boletas ya emitidas conservan su nombre, como se esperaba según el lote 2.
- **O-11 · Datos de prueba que quedan en contable19.**
  - Los empleados 94 y 95 (tipo Quincenal y Régimen General), con sueldo 0 y 3 000.
  - El contrato del 94 queda con diario «Operaciones misceláneas».
  - La boleta 480 y la nota 481, canceladas.
  - Se pueden archivar si molestan.

## Evidencia (esta carpeta)

- **Laboratorio:** `laboratorio.txt` y `comparaciones_laboratorio.csv`.
- **PDF de Lucía:** `boleta_148_lucia_dic2026.pdf` (antes) y `boleta_148_lucia_dic2026_tras_recalculo.pdf` (después).
- **Recálculo:**
  - fotos `fm_antes_recalculo_lote3.json` y `anio_completo_fm_lote3*.json`;
  - `bitacora_recalculo_lote3.json`;
  - `comparacion_lote3.json`.
- **Rectificación:** `rectificacion.json`.
- **Conteos de C-07:** `c07_conteo_antes.txt` y `c07_conteo_despues.txt`.
- **Lecturas de pantalla:** `ui_hechos*.json`.
- **Capturas** (`capturas/`):
  - C-07: `c07_01` a `c07_10`;
  - C-06: `c06_01` a `c06_05`;
  - O-1 a O-3: `o1_t8`, `o2_lote_estado` y `o3_menu_configuracion`.
- **Scripts de medición:** `recalcular_en_orden.py`, `comparar_lote3.py` y `rectificacion.py`.
