# Re-medición del lote 5 de nómina CE — contable19

- **Fecha:** 2026-10-14, de 20:48 a 20:58 (hora del servidor, UTC).
- **Alcance:** solo medición. No se instaló nada ni se cambió código ni la biblia.
- **Escrituras fuera de la medición:** solo el borrado del punto 13. Las pruebas de V-05 y de Q-01 escribieron lo que pide cada punto y se deshicieron.

## Resultado por punto

| # | Qué | Esperado | Medido | |
|---|---|---|---|---|
| 1 | Versiones | base 19.0.1.11.8 · ce 19.0.1.12.12 · ce_demo 19.0.2.12.3 | Iguales en disco y en base (`-u` 20:45–20:47). demo_libros sin cambio (19.0.1.38) | OK |
| 2 | Log del `-u` | Sin ERROR | **No verificable**: no hay acceso al log | Pendiente |
| 3 | «Sincronizar casos» | BOLETA, BANCOS, MICRO y UTILIDADES en «SOLSE Demo Servicios» | Los 4 casos nuevos aparecen, con compañía «servicios» (SOLSE Demo Servicios), rama nómina y categoría 3 | OK |
| 4 | Los 8 casos al 100 % (1.ª vuelta) | NOMINA 450 (con AFPnet 78 y Parámetros 6) · BOLETA 154 · BANCOS 355 · MICRO 41 · UTILIDADES 25 · ASISTENCIA, PLAME y PLAME-RXH al 100 % | NOMINA **450**: AFPnet 78 · Parámetros 6 · Aportes 91 · Asiento 12 · Boletas 189 · Configuración 16 · Diagnóstico 18 · Vacaciones 40. BOLETA **154** · BANCOS **355** · MICRO **41** · UTILIDADES **25** · ASISTENCIA 73 · PLAME 95 · PLAME-RXH 202. Todas las celdas «ok». Ana: AFP_PRI 173,62 · R5TA 1 267,25 · NET 11 838,63 | OK |
| 5 | 2.ª vuelta de BOLETA, BANCOS, MICRO, UTILIDADES y NOMINA | 100 % y sin contactos duplicados por la 2.ª vuelta | Los 5 al 100 % con las mismas celdas. Contactos de los 23 trabajadores del laboratorio: **ninguno aumentó** entre vueltas; el contacto de la 1.ª vuelta se borra al limpiar. Hay restos anteriores al lote (O-18) | OK |
| 6 | Sin cambios de importes | Lucía R5TA 2025 = 2 309,73 y 2026 = 2 160,78, sin recalcular | Las 65 boletas de FM SYSTEMS son idénticas al lote 4 (líneas, días, estado y asiento). Sumas: 2 309,73 / 2 160,78 | OK |
| 7 | O-14 | FM: banda azul «… es una compañía real …» y solo «4. Validación interna» y «Cerrar». SOLSE Demo: los seis botones | FM: banda `alert-info` (azul) ««FM SYSTEMS SOLUTIONS EIRL» es una compañía real: los datos de prueba solo se cargan en compañías del laboratorio (o en la de una base nueva). «4. Validación interna» revisa aquí solo la configuración de la nómina.» Botones: «4. Validación interna (banderas)» y «Cerrar». SOLSE Demo: botones 1 a 6 y «Cerrar», sin banda | OK |
| 8 | O-16 | «ℹ «FM SYSTEMS…» es una compañía real: la matriz de prueba y el asiento de referencia de la demo NO APLICAN aquí. Configuración de la nómina: N correctas · 0 con falla.»; sin «⛔ HAY FALLAS» | «ℹ «FM SYSTEMS SOLUTIONS EIRL» es una compañía real: la matriz de prueba y el asiento de referencia de la demo NO APLICAN aquí. Configuración de la nómina: **5 correctas · 0 con falla**.» y las 5 comprobaciones ✔. Sin «⛔» | OK |
| 9 | Revisión de Q-01 | Con SOLSE Demo activa y FM marcada, «5. Reiniciar boletas demo» no toca FM | Selector: SOLSE Demo activa + FM marcada (`cids=4-1`), asistente con los 6 botones. Resultado: «Boletas demo eliminadas: 36 · Boletas regeneradas y validadas: 33 · Errores: -». Boletas de FM SYSTEMS: **66 antes y 66 después**. El selector volvió a FM sola. La sesión del navegador de prueba es independiente de la tuya | OK (O-20) |
| 10 | O-15 | Empieza por «Régimen General»; los tres últimos: General (reglas base, sin planilla PE) · Empleado (genérico…) · Obrero (genérico…) | Régimen General · Obreros - Semanal · Quincenal - Adelanto · Beneficios Sociales · **General (reglas base, sin planilla PE)** · **Empleado (genérico, sin planilla PE)** · **Obrero (genérico, sin planilla PE)** | OK |
| 11 | V-05 | Boleta de enero 2027 con «Faltan los días festivos de 2027: no hay ninguno registrado…» además de RMA y UIT; al registrar el 01/01/2027, esa línea desaparece | Sin festivos: RMA + «Faltan los días festivos de 2027: no hay ninguno registrado y las boletas de ese año no tendrán la línea de feriados en los días trabajados. Regístrelos en Vacaciones › Configuración › Días festivos.» + UIT. Con «Año Nuevo 2027 (prueba V-05)» registrado: solo RMA y UIT. Feriado y boleta borrados después (0 y 0) | OK |
| 12 | C-19 | Total de la cabecera (posiciones 42-58) = suma del detalle | TXT de haberes del BCP de FM SYSTEMS. **Dic-2026**: cabecera `00000000005758.66` = 1 914,00 + 3 844,66 = 5 758,66. Nov y oct-2026: `5759.49` = 1 914,00 + 3 845,49. Los tres iguales (`c19_verificacion.json`) | OK |
| 13 | O-17: borrar 94, 95, 109, 110 y 111 | Borrados (si alguno no se deja, anotar el mensaje y dejarlo archivado) | 109, 110 y 111: **borrados**. Boletas de prueba 480 y 481 (canceladas, sin asiento): borradas. **94 y 95 no se dejan borrar**: «Another model is using the record you are trying to delete. The troublemaker is: 'Entrada de trabajo de RR. HH.' (hr.work.entry) … How about archiving the record instead?» (86 entradas de trabajo). Quedan **archivados** | OK (O-19) |

**Resultado: 12 OK y 1 pendiente que no se puede medir desde la sesión (log del `-u`). Ninguna FALLA.**

Además, tras la revisión de Q-01 (que regenera boletas demo en SOLSE Demo) se corrieron otra vez los 8 casos: todos al 100 % con las mismas celdas (`vuelta3/`).

## Observaciones (no son fallas)

- **O-18 · Contactos duplicados anteriores al lote.** En la compañía del laboratorio hay 6 o 7 contactos por cada trabajador de los casos, creados en las corridas del 07, 12 y 13/10 y sin empleado asociado. Son restos de antes del lote 5: 111 contactos activos para 23 nombres. Además, cada nombre de la matriz demo tiene un contacto en FM SYSTEMS, creado el 10/08 por una siembra antigua en la compañía real. Sus 10 empleados de la matriz en FM están archivados y sin boletas. Una limpieza puntual vendría bien.
- **O-19 · Trabajadores 94 y 95.** No se pueden borrar porque Odoo generó 86 entradas de trabajo (`hr.work.entry`) para ellos; quedan archivados. Los **contactos de trabajo** de los cinco trabajadores (211, 212, 234, 235 y 236) siguen activos en FM SYSTEMS: Odoo no los borra con el empleado y no se tocaron, porque el punto 13 no los incluía.
- **O-20 · Alcance de la prueba de Q-01.** En contable19, FM SYSTEMS no tiene boletas de trabajadores de la matriz demo (0), así que «66 antes y 66 después» confirma que no toca FM, pero no reproduce el caso del defecto. «6. Devengar vacaciones» no se midió con FM marcada.
- **O-21 · Efecto de «Reiniciar boletas demo».** En SOLSE Demo borra 36 boletas y regenera 33. Las 3 de diferencia no se investigaron: probablemente sean boletas de los casos del laboratorio, que se rehacen al sembrar. Tras el reinicio, los 8 casos volvieron a dar 100 %.
- **O-22 · Selector de compañías.** Para Q-01 el selector se marca con la cookie `cids=4-1` (guion). Con `4,1` Odoo 19 tomó FM como activa y el asistente solo mostró el botón 4. Sirve para quien automatice las pruebas.

## Evidencia (esta carpeta)

- **Casos tras sincronizar:** `casos_tras_sincronizar.json`.
- **Laboratorio:** `vuelta1/`, `vuelta2/` y `vuelta3/`, con el `resultado.json` de cada vuelta. En `vuelta1/` están los Excel de comparación de los 8 casos: `COMPARACION_*.xlsx`, que incluyen NOMINA, BOLETA, BANCOS, MICRO y UTILIDADES.
- **Ana:** `ana.json`.
- **Importes sin cambio:** `fm_lote5_sin_recalcular.json`.
- **C-19:** `c19_*_ABONO_BCP_SUELDO_*.txt` (TXT descargados) y `c19_verificacion.json`.
- **V-05:** `v05.json`.
- **Revisión Q-01:** `q01_antes.json` y `q01_despues.json`.
- **Borrado del punto 13:** `o17_borrado.json`.
- **Lecturas de pantalla:** `ui_hechos.json`.
- **Capturas** (`capturas/`):
  - O-14: `o14_*`;
  - O-16: `o16_*`;
  - V-05: `v05_*`;
  - O-15: `o15_*`;
  - revisión Q-01: `q01_rev_*`.
- **Scripts de medición:** `correr_casos.py`, `prueba.py`, `ui_lote5.js` y `contar_q01.py`.
