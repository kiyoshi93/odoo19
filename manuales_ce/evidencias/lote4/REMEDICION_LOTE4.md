# Re-medición del lote 4 de nómina CE — contable19

- **Fecha:** 2026-10-14, de 16:33 a 17:10 (hora del servidor, UTC).
- **Alcance:** solo medición. No se instaló nada ni se cambió código ni la biblia.
- **Despliegue medido:** el de Gabriel (`-u` 16:29–16:30).
- **Pruebas:** solo con trabajadores de prueba sintéticos, nunca con Lucía ni Héctor. Todo se deshizo al terminar (ver «Limpieza»).

## Resultado por punto

| # | Qué | Esperado | Medido | |
|---|---|---|---|---|
| 1 | Versiones | base 19.0.1.11.7 · ce 19.0.1.12.9 · ce_demo 19.0.2.6.2 | Iguales en disco y en base; om sin cambio | OK |
| 2 | Log del `-u` | Sin ERROR; «Q-02: T12 código 20 (agrario) archivado; contratos que lo usan: N» | **No verificable**: no hay acceso al log. El efecto sí se ve: código 20 «AGRARIO - LEY 27360» con active = False; contratos con ese código (`labor_condition_id`): **0** | Pendiente (log) |
| 3 | Laboratorio | Los 4 casos al 100 %; Ana AFP_PRI 173,62 · R5TA 1 267,25 · NET 11 838,63 | PLAME-RXH 100 % (202) · PLAME 100 % (95) · ASISTENCIA 100 % (73) · NOMINA 100 % (366). Ana: 173,62 · 1 267,25 · 11 838,63 | OK |
| 4 | Sin cambios de importes | Lucía R5TA 2025 = 2 309,73 y 2026 = 2 160,78, sin recalcular | Las 64 boletas de Lucía y Héctor son idénticas al lote 3 (líneas, estado y asiento). Sumas: 2 309,73 / 2 160,78 | OK |
| 5a | V-03 · listas | Sin banda amarilla con la RMA del 01/10/2026 | «Nóminas del empleado» y «Procesamientos de nóminas»: sin banda. `pe_alertas_parametros()` a hoy: `[]` | OK |
| 5b | V-03 · boleta de enero 2027 | «Falta la UIT de 2027: al 31/01/2027 se usaría la de 2026 (5500)…» | «Falta la UIT de 2027: al 31/01/2027 se usaría la de 2026 (5500). Regístrela en Nómina › Nómina PE › Parámetros de Nómina PE.» Además, el aviso de RMA (ver O-12) | OK |
| 6 | V-02 | Mensaje con formato «Falta registrar … vigente al 31/07/2024 (la primera vigencia registrada es desde el 01/01/2025)…»; sin «Wrong python code» | «Falta registrar «AFP - Aporte obligatorio al fondo» (pe_afp_aporte) vigente al 31/07/2024 (la primera vigencia registrada es desde el 01/01/2025). Regístrelo en Nómina › Nómina PE › Parámetros de Nómina PE. Boleta: Prueba L4 V02 Sintético (Boleta de Prueba L4 V02 Sintético – julio 2024), regla AFP - Aporte obligatorio (AFP_APO_001).» | OK |
| 7a | V-04 · pestaña de controles | Dos controles en «Avisar» | «Nómina PE - Controles»: «Gratificación y vacaciones de diciembre antes que la mensual: Avisar» y «Trabajador sin sistema pensionario: Avisar» | OK |
| 7b | V-04 · O-7 | Trabajador sin fecha de inicio de contrato → mensaje «… no tiene contrato vigente entre el … y el …» y banda | Mensaje emergente al elegir al trabajador y banda en la boleta nueva y en la guardada: «Prueba L4 O7 Sintético no tiene contrato vigente entre el 01/10/2026 y el 31/10/2026: la boleta no tendrá contrato, estructura ni días trabajados. Registre la fecha de inicio del contrato en su ficha (pestaña Nómina) o revise las fechas de la boleta.» | OK |
| 7c | V-04 · O-8 Avisar | Banda; al validar, nota «Validada con avisos» | Banda «El trabajador … no tiene sistema pensionario (ONP o AFP)…». Validada; historial: «Validada con avisos: …» | OK |
| 7d | V-04 · O-8 Bloquear | No valida, con el motivo | «No se puede validar: Boleta de Prueba C07 Sintético Dos – diciembre 2026: - El trabajador … no tiene sistema pensionario… El control se configura en la compañía (pestaña «Nómina PE - Controles»).» La boleta sigue en borrador. Control devuelto a «Avisar» | OK |
| 7e | V-04 · Diciembre | GRAT en borrador → banda en la mensual; validada la GRAT, la banda desaparece | Banda: «La boleta de Gratificaciones del 01/12/2026 al 31/12/2026 (…) está en borrador: valídela ANTES que esta boleta. En diciembre la renta de 5.ª ya no se corrige en otro mes.» Validada la GRAT: sin banda (`pe_avisos` vacío) | OK |
| 8 | C-17 | La validada conserva cifras y tiene un solo asiento; la otra se valida con su asiento | Lote «Prueba L4 C-17» (nov-2026, diario Planillas). n1 validada suelta y luego su sueldo cambiado de 2 000 a 2 500. «Marcar como hecho»: n1 con las mismas líneas (RB 2 000) y **un** asiento (PLLA/2026/11/0002); n2 validada con PLLA/2026/11/0003; lote «Hecho». Sueldo devuelto a 2 000 | OK |
| 9 | U-10 | Empieza por «Régimen General»; al final los dos genéricos | Régimen General · Obreros - Semanal · Quincenal - Adelanto · Beneficios Sociales · General · Empleado (genérico, sin planilla PE) · Obrero (genérico, sin planilla PE) | OK (O-15) |
| 10 | Q-01 | Los 5 botones que escriben → «… es una compañía real …»; Validar funciona; FM SYSTEMS afecta a SENATI | Sembrar empleados, Escenario demo, Escenario de cese, Reiniciar boletas (tras aceptar su confirmación) y Devengar vacaciones: «… «FM SYSTEMS SOLUTIONS EIRL» es una compañía real: cambie a una compañía del laboratorio.» «4. Validación interna» corre y muestra su resultado. Empleados de FM (20) y boletas sin cambio. `afecto_senati` = True (Información general) | OK (O-14, O-16) |
| 11 | Q-02 | «Tipos de contrato (T12)»: 25 filas; «Desactivados» → 20 AGRARIO; sin menú «Contratos MINTRA»; contrato con «Tipo de contrato (T12)» | Menú Nómina PE › Maestros SUNAT › Tipos de contrato (T12): 25 filas (Código · Abreviatura · Descripción). Filtro «Desactivados»: «20 AGRARIO - LEY 27360». Ningún menú MINTRA. Contrato: «Tipo de contrato (T12)» | OK |
| 12a | U-08 · Nueva vigencia (AFP comisión sobre flujo) | Habitat 1.4700 · Integra 1.5500 · Prima 1.6000 · Profuturo 1.6900; texto igual al vigente; Habitat 1.37 → 0.0137; Cancelar | Tabla Concepto · Tasa (%) con esos 4 valores; «Texto que se guardará» `{'habitat': 0.0147, 'integra': 0.0155, 'prima': 0.016, 'profuturo': 0.0169}`. Habitat 1.37 → `'habitat': 0.0137`. Cancelado: las vigencias (2025 y 2026) siguen igual | OK |
| 12b | U-08 · Editar en tabla → Cancelar | Nada cambia | «Corregir vigencia…» con los mismos valores; cancelado; vigencias sin cambio (comprobado por RPC) | OK |
| 12c | U-08 · Renta 5ta - Tramos | 5 filas, Hasta (UIT) y Tasa (%), permite agregar | 5 filas: 5/8 · 20/14 · 35/17 · 45/20 · 0 («sin tope», según la ayuda)/30; «Agregar una línea»; texto `[(5, 0.08), (20, 0.14), (35, 0.17), (45, 0.2), (None, 0.3)]`. Cancelado | OK |
| 13 | C-15 | No aplica en contable19 | No medido | — |

**Resultado: 16 OK, 1 pendiente que no se puede medir desde la sesión (log del `-u`) y 1 que no aplica. Ninguna FALLA.**

## Observaciones (no son fallas)

- **O-12 · Aviso de RMA en enero 2027.** La banda de la boleta de enero 2027 trae, además de la UIT, «RMA de AFP posiblemente desactualizada: la vigente al 31/01/2027 es del 01/10/2026…». Es coherente con la regla de 95 días (122 días), pero el encargo solo esperaba la UIT.
- **O-13 · Feriados de 2027.** No hay feriados cargados para 2027 (`resource.calendar.leaves` globales: 16 en 2026 y 0 en 2027). La boleta de enero 2027 no trae la línea «Feriados» del 01/01. V-03 avisa de UIT y RMA, pero no de feriados del año. Puede valer un aviso parecido.
- **O-14 · Q-01, botón 5.** «Reiniciar boletas demo» pide primero la confirmación «Se cancelarán y eliminarán TODAS las boletas de los 10 empleados demo…» y solo después avisa que la compañía es real. En una compañía real el usuario confirma un mensaje destructivo antes de saber que está bloqueado. Sugerencia: ocultar o deshabilitar los botones de escritura fuera del laboratorio.
- **O-15 · U-10.** «General» (el tipo de las Reglas Básicas, sin planilla) aparece 5.º, antes de los genéricos, y su nombre no dice que no tiene planilla PE, a diferencia de los otros dos.
- **O-16 · Q-01, botón 4.** En FM SYSTEMS, «Validación interna» muestra «⛔ HAY FALLAS — 5 correctas · 1 con falla · 41 sin datos» (plan de acumulación sin asignaciones; matriz demo sin boletas). Es lógico en una compañía real, pero puede alarmar a un cliente.
- **O-17 · Datos de prueba que quedan.**
  - Los trabajadores de prueba del lote 4 están archivados: 109 V02, 110 Dic y 111 O7.
  - Siguen los del lote 3: 94 y 95.
  - Ninguna boleta, asiento ni lote de prueba del lote 4 sigue en la base.

## Limpieza (`limpieza.txt`)

- **Boletas:** 9 de prueba.
  - Las validadas (525, 527, 529 y 530) se cancelaron, lo que borró sus asientos, y luego se borraron.
  - Los borradores (522, 523, 524, 526 y 528) se borraron.
- **Lote de prueba:** el 2 se pasó a borrador y se borró.
- **Controles de la compañía:** los dos en «Avisar».
- **Sueldo de T1:** 2 000.
- **Totales tras la limpieza:** 102 boletas y 1 lote.

## Evidencia (esta carpeta)

- **Laboratorio:** `laboratorio.txt` y `comparaciones_laboratorio.csv`.
- **Importes sin cambio:** `fm_lote4_sin_recalcular.json`.
- **V-02, V-03, O-7, O-8 y diciembre:** `v02_v03_o7.json` y `o8_dic_parcial.json`.
- **C-17:** `c17.json`.
- **Q-01:** `q01_antes.txt` y `q01_despues.txt`.
- **U-08:** `u08_antes.json` (vigencias antes de abrir el editor).
- **Lecturas de pantalla:** `ui_hechos.json`.
- **Registros de prueba:** `registros_prueba.json`.
- **Capturas** (`capturas/`):
  - V-03: `v03_*`;
  - V-04 (las tres bandas, el mensaje emergente, el historial y la pestaña de controles): `v04_*`;
  - U-10: `u10_*`;
  - Q-01: `q01_*`;
  - Q-02: `q02_*`;
  - U-08: `u08_*`.
- **Scripts de medición:** `prueba.py`, `ui_lote4.js` y `q01_reiniciar.js`.
