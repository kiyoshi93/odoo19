# Remedición del lote EE-1b — nómina Enterprise

**Base medida:** `demoContable` en https://148.113.151.40.sslip.io (Odoo 19.0 Enterprise).

**Fecha:** 2026-10-27.

**Cómo se midió:**
- RPC y navegador, más el log del `-u` y el script que corrió Gabriel en consola.
- No se instaló ni cambió nada.
- El TXT del punto 5 se generó solo para descargarlo, no se envió a ningún banco, y no se conserva.

## Resumen

| Punto | Estado | Medido |
|---|---|---|
| 1. Versiones | **OK** | `solse_pe_payroll` 19.0.1.5.3 · `solse_pe_payroll_demo` 19.0.1.5.3. |
| 2. Log del `-u` | **OK** | Ningún ERROR de nómina. Salen las líneas de upgrade, C-02, C-31 y C-07. Los 49 ERROR son de otros módulos de la base. |
| 3. Configuración | **OK** | LEAVE90 no pagado en NME y NSO. Estructuras por defecto según lo pedido; «General» al final. C-23 = «Omitir» en el laboratorio. |
| 4. Laboratorio | **OK** | NOMINA 100 % (366) · ASISTENCIA 100 % (68) · PLAME-RXH 99,01 % (H-7) · PLAME 100 % (95). |
| 5. TXT del BCP | **OK** | `ABONO_BCP_SUELDO_202607.txt`: 1 cabecera y 12 «2A», ningún «2B». Total S/ 38357.44 igual en el resumen y la cabecera. Omitidos vacío. ASCII. |
| 6. Script de impacto | **OK** | Lo esperado. H-5: 21 mensuales validadas antes del `-u` con entradas en borrador, que es el cambio de comportamiento anunciado. |

## 1. Versiones — OK

- **Odoo:** 19.0 (primera línea del log). No es DESP-1.

| Módulo | Estado | Versión |
|---|---|---|
| `solse_pe_payroll` | installed | **19.0.1.5.3** |
| `solse_pe_payroll_demo` | installed | **19.0.1.5.3** |
| `solse_pe_payroll_renta5` | installed | 19.0.1.0.0 |
| `solse_pe_payroll_asistencia_ee` | installed | 19.0.1.0.0 |
| `solse_pe_payroll_asistencia_ee_demo` | installed | 19.0.1.2.0 |
| `solse_pe_plame_ee_demo` | installed | 19.0.1.1.0 |
| `solse_pe_plame_4ta_ee` · `solse_pe_plame_rxh` · `solse_pe_plame_rxh_demo` | installed | 19.0.1.0.0 · 19.0.1.2.0 · 19.0.2.3.1 |
| `hr_payroll` · `hr_payroll_holidays` | installed | 19.0.1.0 |
| `solse_pe_demo_suite_ee` | uninstalled | — |

## 2. Log del `-u solse_pe_payroll,solse_pe_payroll_demo` — OK

Adjunto: `log_u_lote_ee1b.txt`. Líneas pedidas:

```
module solse_pe_payroll: Running upgrade [>0.0.0] pre-migrate
C-02: 0 vigencia(s) del cliente adoptada(s).
Nómina PE (C-31): «Unpaid» (LEAVE90) no se paga en «Nómina Mensual Empleados» ni en «Nómina Semanal Obreros».
Nómina PE (C-07): estructura por defecto en «Régimen General» → NME, «Quincenal - Adelanto» → NME, «Obreros - Semanal» → NSO, «General» → ninguna.
```

- **Texto de la línea de upgrade:** Odoo 19 escribe «Running **upgrade** [>0.0.0] pre-migrate», no «Running migration». Conviene ajustar el texto que se pide en los próximos encargos.
  - Se revisó también el log de EE-0/EE-1a: ahí no había ninguna de las dos formas, así que lo informado entonces sigue en pie.
- **docutils:** 2 líneas «(ERROR/3) Unexpected indentation» (líneas 242 y 456). Son las conocidas, no una falla.
- **ERROR del log (49), todos ajenos a nómina:**
  - 48 son «Model … has no table», de `mkb.*`, `smigracion.*` y `ai.embedding`;
  - 1 es «Some modules are not loaded» (`solse_multi_barcodes` y sus dependientes).
  - Ya no aparece `solse.mover.stock.fabricado`.
  - El resto está en la lista de limpieza entregada con EE-0/EE-1a.

## 3. Configuración — OK

**Estructuras, «Tipos de entrada de trabajo no pagados»:**

| Estructura | Lista completa |
|---|---|
| Nómina Mensual Empleados (NME) | LEAVE90 «Sin pagar» · VACPE100 «Vacaciones PE» · FALTA «Falta injustificada (asistencias)» · FALTA_PARCIAL «Horas no trabajadas (asistencias)» |
| Nómina Semanal Obreros (NSO) | LEAVE90 «Sin pagar» · VACPE100 «Vacaciones PE» · FALTA · FALTA_PARCIAL |

**Tipos de estructura PE** (orden de la lista):

| Secuencia | Tipo | Estructura por defecto |
|---|---|---|
| 10 | Régimen General | NME |
| 20 | Obreros - Semanal | NSO |
| 30 | Quincenal - Adelanto | NME |
| 40 | Beneficios Sociales | — |
| 90 | General | — (al final) |

Los tipos nativos Employee y Worker, sin país, siguen en la secuencia 10 con «Pago regular» y «Pago de trabajadores».

**C-23:** en «SOLSE Demo Servicios S.A.C.», pestaña «Nómina PE - Controles», grupo «Pago a bancos», el campo «Interbank: CTS en cuenta de otro banco» = «Omitir: se deposita con el archivo del banco de la cuenta». Las otras 4 compañías también tienen «omitir». Captura: `p3_c23_compania_servicios.png`.

## 4. Laboratorio — OK

«② Sincronizar casos» registra además un caso nuevo, **ANTICIPOS** (pendiente). No se corrió porque el encargo no lo pide.

| Caso | Siembra / genera | Resultado | Celdas | Estructuras |
|---|---|---|---|---|
| NOMINA | 13 empleados / 36 boletas validadas | **100 % · CONFORME** | **366/366** | 6/6 |
| ASISTENCIA | marcaciones y vacación / 4 boletas | **100 % · CONFORME** | **68/68** | 4/4 |
| PLAME-RXH | 8 prestadores, 10 recibos / 9 comprobantes | **99,01 %** (H-7) | 200/202 | 3/4 |
| PLAME | 35 boletas, 10 recibos de 4.ª / ZIP con 5 archivos | **100 % · CONFORME** | **95/95** | 5/5 |

- **Ana, julio de 2026:** AFP_PRI_001 173.62 y NET 11838.63, iguales a lo esperado.
- **H-3:** tras sembrar desde cero, los 13 trabajadores quedan con el tipo de su matriz: Régimen General 9, Quincenal - Adelanto 2 y Obreros - Semanal 2.
- **Boletas del laboratorio:** 35 validadas y 5 en borrador. Ninguna sin estructura; 25 son regulares.
- **Entradas de trabajo del laboratorio tras la siembra nueva:** 335 validadas, 172 en borrador y 1 cancelada. Las mensuales y semanales validadas ahora dejan sus entradas validadas (comportamiento nativo anunciado).
- **PLAME-RXH:** las 2 celdas distintas son del «Diagnóstico»: «3 · con algún pago registrado» y «3c · search: + payment_state», con 8 esperado y 9 obtenido. Es el H-7 conocido.
- **Adjuntos:** `COMPARACION_NOMINA.xlsx`, `COMPARACION_PLAME-RXH.xlsx`, `COMPARACION_ASISTENCIA.xlsx` y `COMPARACION_PLAME.xlsx`.

## 5. TXT del BCP de NOMINA — OK

**Parámetros del asistente:** compañía «SOLSE Demo Servicios» activa; Sueldos, BCP, julio de 2026; cuenta de cargo de prueba; fecha de pago 31/07/2026. Gratificaciones y modo estricto quedaron apagados (sus valores por defecto).

- **Archivo:** `ABONO_BCP_SUELDO_202607.txt`.
- **Registros:** 1 cabecera y **12 «2A»**; **ningún «2B»**.
- **Resumen:** «Abonados: 12 trabajadores | Total: S/ 38357.44».
- **Cabecera:** monto 00000000038357.44, igual al resumen.
- **Omitidos:** vacío.
- **Codificación:** 100 % ASCII (0 bytes fuera de ASCII), sin tildes ni Ñ.
- **Nombres:** en MAYÚSCULAS en los 12 registros. Las únicas minúsculas son los textos fijos del formato, «Referencia Beneficiario» y «Ref Emp», iguales en todas las líneas.
- No se adjunta el TXT: tiene cuentas y DNI de la demo.

## 6. Efecto en la base — OK

Adjunto: `salida_medir_impacto_ee1b.txt`. El script se corrió antes de volver a sembrar los casos.

- **C-31:** NME y NSO con FALTA, FALTA_PARCIAL, LEAVE90 y VACPE100. Parámetro `c31_sin_goce_no_pagado` = '5,6'.
- **C-07:** Régimen General 10 → NME · Obreros 20 → NSO · Quincenal 30 → NME · Beneficios 40 → — · General 90 → —. Parámetro `c07_estructura_por_defecto` = '5,6,7,8'.
- **C-23:** «omitir» en las 5 compañías.
- **SOLSE Demo Servicios:**
  - versiones: Régimen General 9, Quincenal 2, Obreros 2;
  - boletas: 40 (35 validadas y 5 en borrador), 0 sin estructura, 25 regulares;
  - entradas: 507, todas en borrador;
  - cuentas: sueldo en BCP 13 y CTS en Interbank 13.
- **H-2:** 0 trabajadores con cuentas vinculadas en la ficha, así que la cuenta del TXT no cambia para nadie.
- **H-5:** 21 mensuales validadas antes del `-u` tienen entradas en borrador. Es el caso anunciado en «Cambios de comportamiento»: siguen en borrador y, si se cambia una ausencia de ese mes, sale «El pago del mes ya está validado…».
- **H-4:** 0 ausencias «por diferir». **El responsable de ausencias diferidas no está configurado en ninguna compañía**, así que la actividad iría al administrador.
- **Borradores recalculados en el savepoint:** 5, ninguno cambia y ninguno falla.
- **Empresa 01, Empresa 02 y las otras dos compañías del laboratorio:** sin boletas, sin entradas y sin ausencias «Sin pagar».

## Observaciones para desarrollo

1. **Texto del log:** en Odoo 19 la línea es «Running upgrade [>0.0.0] pre-migrate». Hay que ajustarlo en los encargos.
2. **Responsable de ausencias diferidas** sin configurar en las 5 compañías. Conviene que el laboratorio lo configure al construir, o que el manual lo indique, para que la actividad de H-4 no vaya al administrador.
3. **D-6:** los 13 trabajadores de NOMINA siguen sin DNI 9999…; está pendiente de decisión según VERSIONES.
4. **ANTICIPOS:** aparece un caso nuevo en el laboratorio. Si debe medirse, que se incluya en el próximo encargo.
