# Remedición de la corrección del lote EE-2 (RM-1, RM-2) — nómina Enterprise

**Base medida:** `demoContable` en https://148.113.151.40.sslip.io (Odoo 19.0 Enterprise).

**Fecha:** 2026-10-27.

**Cómo se midió:** RPC y navegador, con el usuario administrador (id 2, sin superusuario), igual que el botón del Laboratorio, más el log del `-u` de Gabriel. No se instaló ni cambió nada.

## Resumen

| Punto | Estado | Medido |
|---|---|---|
| 1. Versiones | **OK** | `solse_pe_payroll` 19.0.1.16.5 y `solse_pe_payroll_demo` 19.0.1.6.5. Las 4 sin cambio, con su versión. |
| 2. Log del `-u` | **OK** | Ningún ERROR de nómina. Ninguna migración de versión nueva (solo la `[>0.0.0] pre-migrate` de siempre). Sale dos veces «Nómina PE: inicialización de estructuras completada.». |
| 3. Laboratorio | **OK** | NOMINA 100 % (366) · ASISTENCIA 100 % (68) · PLAME-RXH 99,01 % (H-7) · PLAME 100 % (95). Sin AccessError (RM-1 OK). DNI 99998001 a 99998013 y nombres de boleta correctos. |
| 4. TXT del BCP | **OK** | 1 cabecera y 12 «2A», ningún «2B». S/ 38357.44 en el resumen y la cabecera. Omitidos vacío. ASCII. |
| 5. Ficha del trabajador | **OK con observación** | Edad 38; régimen de salud y situación educativa con «[código] descripción». El T12 está en los datos con «[01] …», **pero no aparece en la ficha del trabajador**. |

## 1. Versiones — OK

| Módulo | Versión |
|---|---|
| `solse_pe_payroll` | **19.0.1.16.5** |
| `solse_pe_payroll_demo` | **19.0.1.6.5** |
| `solse_pe_payroll_catalogo` | 19.0.0.3 |
| `solse_pe_payroll_renta5` | 19.0.1.0.1 |
| `solse_pe_payroll_asistencia_ee_demo` | 19.0.1.2.1 |
| `solse_pe_plame_ee_demo` | 19.0.1.1.1 |

## 2. Log del `-u` — OK

Adjunto: `log_u_lote_ee2_rm.txt`.

- **Migraciones:** solo `Running upgrade [>0.0.0] pre-migrate` («C-02: 0 vigencia(s) del cliente adoptada(s).»), que corre en cada cambio de versión. Ninguna migración de versión nueva.
- **Inicialización:** «Nómina PE: inicialización de estructuras completada.» (líneas 277 y 446).
- **ERROR (48), todos ajenos a nómina:** `ai.embedding`, `mkb.*` y `smigracion.*` sin tabla.

## 3. Laboratorio — OK

Se sincronizaron los casos y se corrieron NOMINA, ASISTENCIA, PLAME-RXH y PLAME, en ese orden: Limpiar, Sembrar, Generar y Comparar.

- ASISTENCIA se cortó la primera vez por una caída de la conexión, antes de ejecutar algún paso.
- Se repitieron ASISTENCIA, PLAME-RXH y PLAME en orden, y los resultados de abajo son de esa corrida.

| Caso | Siembra / genera | Resultado | Celdas | Estructuras |
|---|---|---|---|---|
| NOMINA | 13 empleados / 36 boletas validadas | **100 % · CONFORME** | **366/366** | 6/6 |
| ASISTENCIA | marcaciones y vacación / 4 boletas | **100 % · CONFORME** | **68/68** | 4/4 |
| PLAME-RXH | 8 prestadores, 10 recibos / 9 comprobantes | **99,01 %** (H-7) | 200/202 | 3/4 |
| PLAME | 35 boletas, 10 recibos de 4.ª / ZIP con 5 archivos | **100 % · CONFORME** | **95/95** | 5/5 |

- **RM-1:** Sembrar de NOMINA ya no da `AccessError` con el administrador.
- **DNI en el detalle de NOMINA:** exactamente 99998001 a 99998013 (13). Los 13 trabajadores del laboratorio tienen esos DNI.
- **Ana, julio de 2026:** AFP_PRI_001 173.62 y NET 11838.63.
- **Nombres de boleta en el laboratorio:**

| Estructura | Nombre | Cantidad |
|---|---|---|
| Nómina Mensual Empleados | «Boleta de Pago - …» | 13 |
| Nómina Semanal Obreros | «Boleta de Pago - …» | 8 |
| Nómina Quincenal / Adelanto | «Adelanto Quincenal - …» | 2 |
| Gratificaciones | «Boleta de Gratificación - …» | 10 |
| Vacaciones | «Boleta de Vacaciones - …» | 2 |
| Liquidación | «Liquidación de Beneficios - …» | 1 |

  Las otras 4 mensuales, «Asistencias septiembre 2026 …», son del caso ASISTENCIA, no de NOMINA.
- **PLAME-RXH:** las 2 celdas del «Diagnóstico» de H-7, como antes.
- **Adjuntos:** `COMPARACION_NOMINA.xlsx` y `COMPARACION_PLAME-RXH.xlsx`, más los de ASISTENCIA y PLAME.

## 4. TXT del BCP — OK

**Parámetros:** compañía «servicios»; Sueldos, BCP, julio de 2026; cuenta de cargo de prueba.

- **Archivo:** `ABONO_BCP_SUELDO_202607.txt`.
- **Registros:** 1 cabecera y **12 «2A»**; **ningún «2B»**.
- **Resumen:** «Abonados: 12 trabajadores | Total: S/ 38357.44».
- **Cabecera:** 00000000038357.44, igual al resumen.
- **Omitidos:** vacío.
- **Codificación:** 100 % ASCII; los nombres van en mayúsculas en los 12 registros.
- No se adjunta el TXT.

## 5. Ficha de un trabajador de la demo — OK con observación

Carlos (99998001), con «servicios» activa:

| Dato | En la ficha |
|---|---|
| Fecha de nacimiento | 12 abr. 1988 (pestaña Personal) |
| Edad (U-11) | **38**, entera |
| Régimen de salud (T32) | **[01] ESSALUD REGULAR Y EPS/SERV. PROPIOS** |
| Situación educativa (T9) | **[13] EDUCACIÓN UNIVERSITARIA COMPLETA (4)** |
| Tipo de contrato (T12) | En los datos: **[01] A PLAZO INDETERMINADO - D.LEG. 728**. **No aparece en la ficha del trabajador.** |

Capturas: `p5_ficha_carlos_nomina_pe.png` y `p5_ficha_carlos_personal.png`.

**Observación T12:** el campo «Tipo de contrato (T12)» (`labor_condition_id` de `hr.version`) solo está en la vista de **plantillas de contrato** (`hr.contract.template.view.form.inherit.solse_pe_payroll`). No está en la ficha del empleado, en ninguna de sus 7 pestañas, ni en «Registros de los empleados». Su columna «Tipo de contrato» es el campo nativo `contract_type_id`, no la T12. Un usuario no puede ver ni cambiar la T12 de un trabajador desde su ficha. Conviene agregar el campo en la pestaña «Nómina» o «Nómina PE» de la ficha.

**Observación menor:**
- En la pestaña «Nómina PE», los campos «Cuenta sueldo», «Banco sueldo», «Cuenta CTS» y «Banco CTS» salen vacíos, aunque el trabajador tiene sus 2 cuentas en el contacto.
- El TXT las toma bien (H-2: sin cuentas vinculadas en la ficha, usa las del contacto), pero la ficha no las muestra.
- Si esos campos deben reflejar las cuentas, es un ajuste de la siembra o de la vista.
