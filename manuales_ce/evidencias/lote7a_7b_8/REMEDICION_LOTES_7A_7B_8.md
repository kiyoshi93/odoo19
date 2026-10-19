# Re-medición de los lotes 7a, 7b y 8 de nómina CE — contable19

- **Fecha:** 2026-10-19, de 16:30 a 16:41 (hora del servidor, UTC).
- **Alcance:** solo medición. No se instaló nada, no se cambió código ni la biblia, y no se validó, pagó, envió ni canceló nada fuera de lo pedido.

Gabriel desplegó los tres lotes en orden antes de la medición (`-u` final: 2026-10-19 16:27). Por eso solo se pudo medir el **estado final (lote 8)**. Cada punto de los tres mensajes se midió sobre ese estado:
- los que dependen de un lote intermedio (versiones del 7a y del 7b, «idénticas al lote anterior») se verifican contra los zip y contra el lote 6;
- **no hubo log del `-u`** de ningún lote.

**Escrituras:** el botón 5 (punto 9 del 7a), corrido dos veces, y las corridas de los 13 casos. Para el certificado de 5.ª y el PLAME de octubre se usaron asistentes transitorios, que no dejan datos.

## Versiones

| Módulo | Zip 7a | Zip 7b | Zip 8 | Instalado (disco = base) |
|---|---|---|---|---|
| solse_pe_payroll_base | 19.0.1.17.3 | 19.0.1.19.1 | 19.0.1.19.1 | **19.0.1.19.1** |
| solse_pe_payroll_ce | 19.0.1.18.3 | 19.0.1.21.1 | 19.0.1.24.2 | **19.0.1.24.2** |
| solse_pe_payroll_ce_demo | 19.0.2.18.0 | 19.0.2.21.1 | 19.0.2.22.0 | **19.0.2.22.0** |
| solse_pe_payroll_asistencia | 19.0.1.3.2 | — | — | **19.0.1.3.2** |
| solse_pe_plame_demo | sin cambio | sin cambio | sin cambio | **19.0.1.4.1** |

Los manifiestos de cada zip coinciden con su mensaje y lo instalado es el lote 8 completo. No hay DESP-1.

## Laboratorio: los 13 casos (estado final)

Orden: botón 5 (dos veces) → «Sincronizar» → PLAME-RXH, NOMINA, PLAME, BOLETA, BANCOS, MICRO, UTILIDADES, AUMENTO, SUBSIDIOS, CESE, INDEMNIZACION, VIDALEY y ASISTENCIA al final.

| Caso | Esperado | Medido | |
|---|---|---|---|
| NOMINA | 525 | 525 · 100 % | OK |
| BOLETA | 166 | 166 · 100 % | OK |
| BANCOS | 407 | 407 · 100 % | OK |
| MICRO | 83 | 83 · 100 % | OK |
| UTILIDADES | 33 | 33 · 100 % | OK |
| ASISTENCIA | 73 | 73 · 100 % | OK |
| PLAME | 121 | 121 · 100 % | OK |
| PLAME-RXH | como siempre | 202 · 100 % | OK |
| AUMENTO (7a) | 57 | 57 · 100 % | OK |
| SUBSIDIOS (7b) | 344 | 344 · 100 % | OK |
| CESE (7b) | 149 | 149 · 100 % | OK |
| INDEMNIZACION (7b) | 63 | 63 · 100 % | OK |
| VIDALEY (8) | 58 | 58 · 100 % | OK |

Excel de comparación de los 13 casos en `vuelta1/COMPARACION_*.xlsx`.

---

## Lote 7a

| # | Qué | Medido | |
|---|---|---|---|
| 1 | Versiones | El zip trae base 19.0.1.17.3 · ce 19.0.1.18.3 · ce_demo 19.0.2.18.0 · asistencia 19.0.1.3.2; luego el 7b y el 8 las suben (ver tabla) | OK |
| 2 | Log del `-u` | No se recibió | Pendiente |
| 3 | Sin recalcular | Las 64 boletas de FM son idénticas al lote 6 (líneas, días, estado y asiento). Lucía: 2 309,73 / 2 160,78 | OK |
| 4 | Los 9 casos (con AUMENTO 57) | Todos al 100 % (tabla de arriba) | OK |
| 5 | Detalle de AUMENTO | **A mitad de mes (70000901)**, octubre: RB **2 533,33** · ONP **329,33** · EsSalud **228,00** · neto **2 204,00**; versión de la boleta: la de **3 000** (Diagnóstico 3 = 3000.00). **Dos contratos (70000902)**: RB **2 500,00**. **Sin goce una semana (70000903)**, noviembre: RB **1 980,00**; boleta impresa «Días no laborados: **5**». **Sin goce todo el mes (70000904)**: no tiene mensual de noviembre (Diagnóstico 4 «no existe (sin importes)»); `.snl` `01\|70000904\|05\|30\|` y `.jor` `01\|70000904\|0\|0\|0\|0\|` | OK |
| 6 | «Sin pagar» | Tipo «Sin pagar»: código **SINGOCE100**, suspensión 05 (captura). NME y NSO: «Ausencias no pagadas» = Sin pagar + Vacaciones PE. `solse_pe_payroll_ce.c31_sin_goce_no_pagado` = **«3,4»** (ids de NME y NSO) | OK |
| 7 | Impacto en FM | Ausencias «Sin pagar» aprobadas en 2026: **ninguna**. Las únicas ausencias aprobadas de 2026 son dos vacaciones (Lucía 02–16/02 y Héctor 14–23/09). Boletas en borrador: **0**. Trabajadores con más de una versión o contrato: **ninguno** (17 versiones, 17 trabajadores) | OK |
| 8 | O-31 | SOLSE Demo **antes**: 78 de 78 boletas sin versión. **Después** de los casos: **0 de 136** | OK |
| 9 | Botón 5 antes de ASISTENCIA | **1.ª vez:** 78 → 74; borró las 4 mensuales de setiembre de ASISTENCIA (Carlos, Jorge, María y Óscar), porque ASISTENCIA ya se había corrido (O-36); «eliminadas: 39 · regeneradas y validadas: 35 (con el escenario de cese)». **2.ª vez:** 74 → 74, las mismas boletas; «eliminadas: 35 · regeneradas: 35 (con el escenario de cese)». ASISTENCIA se volvió a correr al final: 100 % | OK (O-37) |

## Lote 7b

| # | Qué | Medido | |
|---|---|---|---|
| 1 | Versiones | El zip trae base 19.0.1.19.1 · ce 19.0.1.21.1 · ce_demo 19.0.2.21.1; luego el 8 sube ce y ce_demo | OK |
| 2 | Log del `-u` | No se recibió | Pendiente |
| 3 | Sin recalcular | Las mismas 64 boletas de FM, idénticas al lote 6 (y por tanto al 7a). Lucía: 2 309,73 / 2 160,78 | OK |
| 4 | Los 12 casos (SUBSIDIOS 344, CESE 149, INDEMNIZACION 63) | Todos al 100 % | OK |
| 5 | Detalle de CESE | **70004501**: liquidación de abril con «Devolución de retención en exceso de 5ta categoría» **2 158,67** (DEV5_001), neto 13 132,00; PLAME de abril `01\|70004501\|0928\|2158.67\|2158.67\|`, sin 0605 en abril. **70004504**: mensual de abril con R5TA **856,09** (PLAME 0605 856,09). **70004505**: la nota «rectifíquela» está en el historial de la mensual de marzo (Diagnóstico 10 = SI) | OK |
| 6 | Detalle de INDEMNIZACION | 70000351: IND_001 **18 575,00** (0501) · 70000352: IND_MOD_001 **18 000,00** (0503) · 70000355 (modal renovado): **18 000,00** (0503) · 70000357: **18 750,00** (0501) · 70000354: **sin indemnización** (PLAME «(ninguna)»; Diagnóstico 3 = SI). El contrato de 70000352 muestra «Despido arbitrario (se indemniza)» marcado y «Fin pactado del contrato modal» 31/08 (captura) | OK |
| 7 | Controles de la compañía | «Subsidio sin los aportes que dan derecho» = **Avisar** y «Boletas del año antes que la liquidación del cese» = **Avisar**, en FM y en SOLSE Demo (captura). Además: «Trabajador sin póliza Vida Ley» = No controlar | OK |
| 8 | Impacto en FM | Ausencias de enfermedad, maternidad o suspensión 20/21/22 aprobadas en 2026: **ninguna**. Contratos con fin en 2026: **Carmen Rosa Vásquez León** (fin 31/08/2026); liquidaciones en borrador: **0**. Estructuras de liquidación propias: **ninguna**. Reglas con 0501/0503: solo las del módulo (IND_001 → 0501 e IND_MOD_001 → 0503, estructura Liquidación) | OK |
| 9 | O-31 | Igual que en el 7a: 0 de 136 sin versión tras los casos | OK |

## Lote 8

| # | Qué | Medido | |
|---|---|---|---|
| 1 | Versiones | base 19.0.1.19.1 · ce 19.0.1.24.2 · ce_demo 19.0.2.22.0 · asistencia 19.0.1.3.2 · plame_demo 19.0.1.4.1 | OK |
| 2 | Log del `-u` | No se recibió | Pendiente |
| 3 | Sin recalcular | Las 64 boletas de FM son idénticas. Lucía: 2 309,73 / 2 160,78 | OK |
| 4 | Los 13 casos (VIDALEY 58) | Todos al 100 % | OK |
| 5 | Detalle de VIDALEY | **70000561**: «Seguro Vida Ley (aporte del empleador)» **15,90**, neto **2 610,00** (la prima no se descuenta). **70000562**: **66,77**. **70000568**: vacacional 01–15/06 **39,75** + mensual **27,02** = 66,77. **70000565**: **sin prima** (Diagnóstico 3 = SI). PLAME de junio: 0803 de 561 15,90 · 562 66,77 · 568 66,77; 565 «(ninguna)». Asiento de 561: debe 6274 **15,90** y haber 4699 **15,90** (captura de la boleta impresa) | OK |
| 6 | Pago de la planilla (N-07) | Boleta de 561: «Por pagar» **2 610,00**. Asiento PLLA/2026/06/0003: las dos líneas de la **4111** (haber 3 000,00 y debe 390,00 por la ONP) llevan al trabajador como socio; 6211, 4032, 6271, 4031, 6277, 4033, **6274** y **4699** sin socio (captura) | OK |
| 7 | Envío y constancias (N-08) | Boleta validada: botones Rectificar · Cancelar nómina · **Enviar por correo** · **Confirmar recepción**; no aparece «Send E-Mail». Ficha de 70000561, pestaña «Nómina PE»: grupo **«Entrega de la boleta»** con «Boleta por correo»; «Acuerdo firmado el» y «Correo para la boleta» aparecen al marcarlo (`invisible="not pe_boleta_electronica"`). **Liquidación de depósito de CTS** (boleta 1186, BANCOS): remuneración computable (básica, asignación familiar y 1/6 de la gratificación), periodo 01/11/2025–30/04/2026, tiempo computable 4 meses, cuenta CTS BCP, fecha y n.° de operación «—», monto 733,38 (captura). **Certificado de 5.ª** 2026 de «Trabajador CESE devolución»: «SOLSE Demo Servicios S.A.C. no tiene representante del empleador: marque «Empleador» en la ficha de quien firma el certificado (R.S. 010-2006/SUNAT, art. 2).» No se marcó a nadie | OK |
| 8 | Pólizas de Vida Ley | Aseguradora VIDALEY (tasa) 0,53 % · (importe fijo) 25,00 · (vencida, 01/06/2025–31/05/2026): las tres con «Calcular la prima en la planilla» marcado. No hay otras pólizas en FM SYSTEMS ni en SOLSE Demo (las otras dos compañías del laboratorio no se revisaron) (captura) | OK |
| 9 | Impacto en FM | Pólizas de Vida Ley de FM: **ninguna**. Trabajadores marcados «Firma como empleador»: **ninguno** en ninguna compañía. Lotes validados o cerrados: **1** («Planilla diciembre 2026», Hecho) | OK |
| 10 | O-31 | 0 de 136 sin versión tras los casos | OK |

**Resultado de los tres lotes: todos los puntos medibles OK, ninguna FALLA. Pendiente solo el log del `-u` de cada lote (no se recibió).**

## Observaciones (no son fallas de los puntos pedidos)

- **O-37 · Botón 5 y ASISTENCIA (confirma O-36).** Como ASISTENCIA ya se había corrido antes de la medición, el primer reinicio borró sus 4 mensuales de setiembre (78 → 74). Desde el segundo reinicio el número es estable. El mensaje del 7a esperaba 73; aquí quedan **74**, sin diferencias entre antes y después.
- **O-38 · IMPORTANTE: horas y días de la boleta con dos versiones en el mes (C-30 / O-31).** En la mensual de octubre de 70000901 (aumento el 15/10), el **importe** paga los dos tramos (RB 2 533,33), pero los **días trabajados** tienen una sola línea, la de la versión del 15/10: WORK100 **12 días / 96 h**. Por eso:
  - la boleta impresa dice «Horas: 96.0» en un mes completo;
  - el **`.jor` de octubre declara 96 h** (`01|70000901|96|0|0|0|`), cuando el mes tuvo 22 días hábiles;
  - lo mismo pasa con 70000902 (dos contratos): 11 días / **88 h** en el `.jor`.

  Los `.rem` están bien (2 533,33 y 2 500,00). El caso AUMENTO no compara el `.jor` de octubre. Conviene revisarlo: el `.jor` subdeclara las horas ordinarias de quien cambia de versión a mitad de mes.
- **O-39 · «Sin goce una semana».** La boleta de 70000903 tiene SINGOCE100 con **−5,25 días / −42 h**. La boleta impresa dice 5 días no laborados y el `.snl` 5. Los 5,25 días vendrían de horas (42/8). Si fue una semana completa, se esperaría −5 días / −40 h.
- **O-40 · Ficha del trabajador.** «Acuerdo firmado el» y «Correo para la boleta» solo se ven al marcar «Boleta por correo». Es correcto, pero el mensaje del lote 8 los esperaba visibles en el grupo.
- **O-41 · Liquidación de depósito de CTS de BANCOS.** El trabajador de la boleta 1186 entró en 2026, así que su asignación familiar y su 1/6 de gratificación salen en 0,00 y la básica en 2 200,14. Para el manual conviene usar una CTS con los tres conceptos con importe.
- **O-42 · Cuenta 4699.** Su nombre en el plan dice «Otras cuentas por pagar diversas - Other accounts payable» (mezcla de idiomas en el dato de la cuenta).
- **O-43 · Textos en inglés del núcleo.** El historial muestra «Employee creado» y «Employee Contract creado». En cambio, el calendario ya se ve como «Estándar de 40 horas a la semana».
- **O-44 · Lote de FM.** «Planilla diciembre 2026» es el único lote validado o cerrado de FM. Si se usa «Registrar pago» (N-07) sobre él, se generaría el pago de esas boletas. No se tocó.

## Evidencia (esta carpeta)

- **Antes de los casos:** `paso_A_B.txt` (FM y O-31) y `fm_lote8_sin_recalcular.json`.
- **Botón 5:** `demo_boletas_boton5_*` y `demo_boletas_boton5b_*` (antes y después de cada corrida).
- **Casos:** `casos_tras_sincronizar.json` y `vuelta1/` (`resultado.json` y los 13 Excel, incluidos AUMENTO, SUBSIDIOS, CESE, INDEMNIZACION y VIDALEY).
- **Detalle de boletas:** `detalle_casos.json` y `detalle.txt` (incluye O-31 después).
- **Configuración:** `config.json` (tipos de ausencia, estructuras, parámetro C-31, controles, pólizas y asiento de 561).
- **Impacto en FM:** `impacto_fm.json`.
- **Certificado de 5.ª:** `certificado_5ta.json`.
- **PLAME de octubre (O-38):** `plame_oct2026_aumento.json`.
- **PDF:**
  - `boleta_1212_aumento_oct2026.pdf`;
  - `boleta_1214_aumento_sin_goce_nov2026.pdf`;
  - `liquidacion_1264_cese_devolucion_abr2026.pdf`;
  - `boleta_1273_vidaley_jun2026.pdf`;
  - `constancia_cts_1186.pdf`.
- **Capturas** (`capturas/`):
  - 7a, punto 5: `l7a_p5_*`;
  - 7a, punto 6: `l7a_p6_*`;
  - 7b, puntos 5, 6 y 7: `l7b_p5_*`, `l7b_p6_*` y `l7b_p7_*`;
  - 8, punto 5: `l8_p5_*`;
  - 8, puntos 6 y 7: `l8_p6_*` y `l8_p7_*`;
  - 8, punto 8: `l8_p8_*`;
  - botón 5, 1.ª vez: `boton5_vuelta1`.
