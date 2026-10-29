# Medición del lote EE-3 («Cálculo») con su revisión independiente — nómina Enterprise

**Base medida:** `demoContable` en https://148.113.151.40.sslip.io (Odoo 19.0 Enterprise).

**Fecha:** 2026-10-29.

**Cómo se midió:**
- RPC y navegador con el administrador (id 2, sin superusuario) y «SOLSE Demo Servicios S.A.C.» activa;
- el log del `-u` y la salida de los tres scripts que corrió Gabriel con `odoo-bin shell`.

No se instaló ni cambió nada. Solo se corrió lo pedido: los cuatro casos del Laboratorio y el TXT del BCP, que no se adjunta.

## Resumen

| Punto | Estado | Medido |
|---|---|---|
| 1. Versiones | **OK** | Las cinco con la versión de la tabla. Las dos que no cambian, igual. |
| 2. Log del `-u` | **OK** | Ningún ERROR de nómina. Migración H-1 con **N = 1**, **M = 1**. |
| 3. `medir_impacto_ee3.py` | **OK antes** · después **pendiente** | Antes de los casos, todo lo esperado y 1 «C-18 sin importes» en Servicios. La corrida de después la tiene que hacer Gabriel; por RPC, las 5 borradores de Servicios no tienen advertencias. |
| 4. Criterios | **OK** | `criterios_ee3.py` 47 criterios, 0 fallas · `criterios_ee3_rev.py` 15 criterios, 0 fallas. |
| 5. Laboratorio | **OK** | NOMINA 100 % (366) · ASISTENCIA 100 % (**83**) · PLAME-RXH 99,01 % (las 2 de siempre) · PLAME 100 % (95). |
| 6. TXT del BCP de julio | **OK** | 1 cabecera y 12 «2A», ningún «2B»; S/ 38 357,44; ASCII. |
| 7. Pantallas | **OK** | Controles en «Avisar»; adelanto de Teresa con ADEL_001 1 800,00 y sin advertencia roja; mensual de septiembre de Carlos con los importes pedidos y la fila «Tardanzas del mes» 10,94. |

## 1. Versiones — OK

Leídas por RPC (`ir.module.module`, todas `installed`). Coinciden con el script.

| Módulo | Versión |
|---|---|
| `solse_pe_payroll` | **19.0.1.22.7** |
| `solse_pe_payroll_renta5` | **19.0.1.3.0** |
| `solse_pe_payroll_asistencia_ee` | **19.0.1.1.0** |
| `solse_pe_payroll_asistencia_ee_demo` | **19.0.1.3.0** |
| `solse_pe_payroll_demo` | **19.0.1.6.6** |
| `solse_pe_payroll_catalogo` | 19.0.0.3 (sin cambio) |
| `solse_pe_plame_ee_demo` | 19.0.1.1.1 (sin cambio) |

## 2. Log del `-u` — OK

Adjunto: `log_u_lote_ee3.txt`.

- **Migraciones:**
  - `Running upgrade [>0.0.0] pre-migrate` («C-02: 0 vigencia(s) del cliente adoptada(s).»), la de siempre;
  - `Running upgrade [19.0.1.22.1>] post-migrate` (línea 294);
  - línea 295: «H-1 (EE-3): advertencias recalculadas en **1** boleta(s) en borrador; con «danger» ahora: **1**». Es el adelanto viejo de Teresa sin importe, el mismo que marca el punto 3.
- **Inicialización:** dos veces «Nómina PE: inicialización de estructuras completada.» (líneas 293 y 467).
- **ERROR (48), todos ajenos a nómina:** `ai.embedding`, `mkb.*` y `smigracion.*` sin tabla, 8 veces cada uno.
- **WARNING:** ninguno de nómina.
- El log termina en «Stopping workers gracefully». El servicio no quedó levantado y Gabriel lo levantó después.

## 3. `medir_impacto_ee3.py` — OK antes de los casos; la corrida de después está pendiente

Adjunto: `medir_impacto_ee3_antes.txt`.

| Control | Esperado | Obtenido |
|---|---|---|
| R5TA_001 | 3 con C-03, C-11 y C-10 | 3 reglas; C-03 en 3, C-11 en 3, C-10 en 3 |
| Bases (ONP, AFP, EsSalud, EPS, SCTR, SENATI, BAR5) | 42 sin ninguna «sin restar DA_001» | 42 reglas; sin restar DA_001: ninguna |
| TARD_001 | DA_001, secuencia 101, 0704 | 4 reglas · DA_001 · 101 · 0704 |
| TAR_001 | DA_001, secuencia 102, 0704 | 4 reglas · DA_001 · 102 · 0704 |
| RB_001 «wage / 30.0» (C-05) | 2 de 2 | 2 de 2 |
| Controles V-04 | «aviso» | Servicios: sin sistema pensionario «aviso» · diciembre «aviso» |
| Acción de C-18 | existe | existe |
| C-18 sin importes en Servicios | puede salir 1 | **1** (el adelanto viejo de Teresa) |
| renta5 en Servicios | — | coincide 13 · no aplica 23 · campos nuevos `pe_r5_base_grati`, `pe_r5_vacaciones_devengadas`, `pe_r5_tardanzas` |

**Observación menor:** el bloque de boletas y controles solo lista «SOLSE Demo Servicios S.A.C.», no cada compañía. Lo más probable es que liste solo las compañías con boletas. Las otras compañías no aparecen en la salida.

**Después de los casos:** pendiente de que Gabriel vuelva a correr el script. Lo medido por RPC con el administrador:
- Servicios tiene 35 boletas validadas y 5 en borrador: el adelanto nuevo de Teresa y las 4 de ASISTENCIA;
- las 5 tienen `error_count` 0 y `warning_count` 0;
- el adelanto viejo sin importe ya no existe, porque Limpiar de NOMINA lo eliminó y Sembrar creó el nuevo con 1 800,00.

Así que se espera «sin advertencias de EE-3».

## 4. Criterios del lote — OK

Adjuntos: `criterios_ee3.txt` y `criterios_ee3_rev.txt`.

- **`criterios_ee3.py`: 47 criterios, 0 fallas.**
  - C-05: 5 OK.
  - C-03: 2 OK, con sus RENTA5.
  - C-11: 5 escenarios OK, con sus RENTA5 (dentro de febrero, cruza de mes, 60 días, cruza de año, vacacional futura ya validada).
  - C-10: 6 OK, con RENTA5 de enero.
  - C-18: 7 OK.
  - E-15: 1 OK.
  - V-04: 13 OK.
- **`criterios_ee3_rev.py`: 15 criterios, 0 fallas.** H3-1 (3), H3-2 (5), H3-4 (2), H3-5, H3-6, H3-8 (2) y H3-9.

## 5. Laboratorio — OK

Se sincronizaron los casos y se corrieron NOMINA, ASISTENCIA, PLAME-RXH y PLAME, en ese orden: Limpiar, Sembrar, Generar y Comparar. Ningún paso dio error.

| Caso | Siembra / genera | Resultado | Celdas |
|---|---|---|---|
| NOMINA | 13 empleados / 36 boletas validadas | **100 % · CONFORME** | **366/366** |
| ASISTENCIA | marcaciones y vacación / 4 boletas calculadas | **100 % · CONFORME** | **83/83** |
| PLAME-RXH | 8 prestadores, 10 recibos / 9 comprobantes | **99,01 %** | 200/202 |
| PLAME | 35 boletas, 10 recibos de 4.ª / ZIP con 5 archivos | **100 % · CONFORME** | **95/95** |

**PLAME-RXH:** las 2 diferencias de siempre (H-7, «Diagnóstico»):
- «3 · con algún pago registrado»: cantidad esperada 8, obtenida 9;
- «3c · search: + payment_state»: cantidad esperada 8, obtenida 9.

Adjunto: `COMPARACION_PLAME-RXH.xlsx`.

## 6. TXT del BCP de julio — OK

**Parámetros:** compañía «servicios»; Haberes (sueldo), BCP, julio de 2026; cuenta de cargo de prueba.

- **Archivo:** `ABONO_BCP_SUELDO_202607.txt`.
- **Registros:** 1 cabecera y **12 «2A»**; ningún «2B».
- **Resumen:** «Abonados: 12 trabajadores | Total: S/ 38357.44».
- **Cabecera:** 00000038357.44, igual al resumen.
- **Omitidos:** ninguno.
- **Codificación:** 100 % ASCII.
- No se adjunta el TXT.

## 7. Pantallas — OK

| Captura | Medido |
|---|---|
| `p7_compania_controles.png` | Compañía «servicios», pestaña «Nómina PE - Controles», grupo **Boleta**: «Trabajador sin sistema pensionario» = **Avisar** y «Gratificación y vacaciones de diciembre antes que la mensual» = **Avisar**. |
| `p7_adelanto_teresa.png` | Adelanto Quincenal de Teresa (99998013), del 1 al 15 de julio, **Borrador**. **ADEL_001 1 800,00**, total adelanto 1 800,00 y neto 1 800,00. **Sin advertencia roja**: 0 alertas danger, error 0 y aviso 0. |
| `p7_carlos_calculo.png` | Mensual de septiembre de Carlos (99998001), caso ASISTENCIA, «Cálculo del salario»: **TAR_001 10,94** · **BAR5_001 3 602,06** · **AFP_APO_001 360,21** · **ESSALUD_001 324,19**. |
| `p7_carlos_renta5.png` | La misma boleta, pestaña «Renta de 5ta»: «El detalle reproduce la retención de la boleta.»; remuneración afecta del mes 3 602,06; **«Tardanzas del mes» 10,94**. |
