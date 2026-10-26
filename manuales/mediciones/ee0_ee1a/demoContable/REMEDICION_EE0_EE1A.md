# Remedición de los lotes EE-0 y EE-1a — nómina Enterprise

**Base medida:** `demoContable` en el servidor de pruebas https://148.113.151.40.sslip.io (el mismo servidor tiene también la base `demoEE`).

**Fecha:** 2026-10-26.

**Cómo se midió:** por RPC y en el navegador.
- Por indicación de Gabriel, además de lo que pide el encargo, se pulsó «① Construir laboratorio», porque el Laboratorio estaba vacío.
- No se instaló ningún módulo.
- La prueba de la RMV del punto 3 se descartó, y luego se comprobó por datos que no se guardó.

## Resumen

| Punto | Estado | Medido |
|---|---|---|
| 1. Versiones | **OK** | `solse_pe_payroll` 19.0.1.1.4 · `solse_pe_payroll_demo` 19.0.1.5.2. |
| 2. Log del `-u` | **PENDIENTE** | Requiere consola: lo debe adjuntar Gabriel. |
| 3. Parámetros | **OK** | 24 con tipo, ninguno «Libre». RMV, AF, RMA y comisión según lo esperado. «1 230» se rechaza con el mensaje de V-01. |
| 4. Tablero | **OK** | Sin el aviso de vigencias mal escritas. |
| 5. Laboratorio | **OK parcial** | NOMINA: 100 %, 366 celdas, Ana correcta. ASISTENCIA: 100 %, 68 celdas. PLAME y PLAME-RXH no se pudieron medir: sus módulos demo no están instalados. |
| 6. Q-01 | **OK** | Aviso de compañía real; solo se ve «4. Validación interna». |
| 7. Script de impacto | **PENDIENTE** | Requiere `odoo-bin shell`. Se adelantan conteos por RPC. |

## 1. Versiones — OK

- **Odoo:** `19.0+e`, según `server_version` en la sesión. La versión exacta (fecha de la build) aparece en la primera línea del log.
- No es DESP-1: ninguna versión es menor que la entregada.

| Módulo | Estado | Versión |
|---|---|---|
| `solse_pe_payroll` | installed | **19.0.1.1.4** |
| `solse_pe_payroll_demo` | installed | **19.0.1.5.2** |
| `solse_pe_payroll_renta5` | installed | 19.0.1.0.0 |
| `solse_pe_payroll_asistencia_ee` | installed | 19.0.1.0.0 |
| `solse_pe_payroll_asistencia_ee_demo` | installed | 19.0.1.2.0 |
| `solse_pe_payroll_catalogo` | installed | 19.0.0.2 |
| `solse_pe_demo_libros` | installed | 19.0.1.38 |
| `hr_payroll` | installed | 19.0.1.0 |
| `solse_pe_plame_ee_demo` | **uninstalled** | — (código 19.0.1.1.0) |
| `solse_pe_plame_rxh` y `solse_pe_plame_rxh_demo` | **uninstalled** | — |
| `solse_pe_demo_suite_ee` | uninstalled | — |

## 2. Log del `-u solse_pe_payroll,solse_pe_payroll_demo`

PENDIENTE: lo debe adjuntar Gabriel. Hay que copiar estas líneas:

- `Running migration [>0.0.0] pre-migrate`;
- `[$19.0.1.0.0] end-migrate`, si esta base venía de 19.0.0.45;
- `C-02: N vigencia(s) del cliente adoptada(s).`;
- `V-01: N vigencia(s) inválida(s) entre las guardadas.`

## 3. Parámetros — OK

- **24 parámetros `pe_`:** monto 5, tasa 16, comisión por AFP 1, tramos de renta 1 y factores por régimen 1.
- **En «Libre»:** ninguno.

| Parámetro | Vigencias | Estado |
|---|---|---|
| RMV | 2025-01-01 = 1130 · **2026-10-01 = 1230** | OK |
| Asignación familiar | 2025-01-01 = 113.0 · **2026-10-01 = 123.0** | OK |
| RMA AFP | 2025-01-01 12027.91 · 2025-04-01 12137.47 · 2025-07-01 12184.88 · 2025-10-01 12178.56 · 2026-01-01 12209.11 · 2026-04-01 12598.91 · 2026-07-01 12672.65 · **2026-10-01 12732.70** | OK |
| Comisión sobre el flujo | 2025-01-01 y 2026-01-01 (habitat 0.0147 · integra 0.0155 · prima 0.0160 · profuturo 0.0169) | OK |

**Prueba V-01:** se agregó en la RMV una vigencia desde 01/01/2030 con `1 230`. Respuesta al guardar:

> Error de validación — Parámetro «RMV - Remuneración Mínima Vital» (pe_rmv), vigencia desde 01/01/2030: Use punto decimal y sin separador de miles: escriba «1 230» sin espacios ni comas entre las cifras. Ejemplo: 1230 · 5500 · 12672.65

- REV-3 OK: no aparece el error técnico «invalid syntax».
- Se descartó el cambio. Por RPC, la RMV sigue con 2 vigencias.
- Capturas: `p3_rmv_error.png` y `p3_rmv_descartado.png`.

## 4. Tablero de Nómina — OK

- No aparece «Vigencias de parámetros de Nómina PE con un valor mal escrito».
- Solo las advertencias nativas (contratos, cuentas bancarias, identificación).
- Captura: `p4_tablero.png`.

## 5. Laboratorio — OK parcial

**Estado inicial:** Laboratorio en estado «vacío» y sin casos.

**① Construir laboratorio** (pedido por Gabriel), en 1 min 18 s:
- creó 3 compañías de demostración:
  - SOLSE Demo Principal S.A.C. (RUC 20601234565);
  - SOLSE Demo Comercial E.I.R.L. (20602345671);
  - SOLSE Demo Servicios S.A.C. (20603456786);
- cargó en ellas el plan contable;
- quedó en estado «listo».

En la bitácora aparece «sin impuestos peruanos detectables; afectaciones pendientes del asistente manual» para las tres. No afecta a la nómina.

**② Sincronizar casos:** solo registra **NOMINA** y **ASISTENCIA**. PLAME y PLAME-RXH no se registran porque `solse_pe_plame_ee_demo` y `solse_pe_plame_rxh_demo` no están instalados.

| Caso | Limpiar / Sembrar / Generar / Comparar | Resultado | Celdas |
|---|---|---|---|
| NOMINA | OK / OK (13 empleados) / OK (36 boletas validadas) / OK | **100 % · CONFORME** | **366** ok, 0 distintas, 0 faltantes, 0 sobrantes · 6/6 estructuras |
| ASISTENCIA | OK / OK / OK (4 boletas calculadas) / OK | **100 % · CONFORME** | **68** ok, 0 distintas |
| PLAME | — | NO MEDIBLE | módulo demo no instalado |
| PLAME-RXH | — | NO MEDIBLE | módulo demo no instalado |

**Boleta mensual de Ana, julio de 2026** (comparación de NOMINA):
- AFP_PRI_001 = **173.62**, igual a lo esperado (concepto «Ana AFP prima TOPEADA por RMA»);
- NET = **11838.63**, igual a lo esperado.

**E-06:** los 13 trabajadores de NOMINA quedan con su tipo de estructura, ninguno con «General»:
- Régimen General: 9;
- Quincenal - Adelanto: 2;
- Obreros - Semanal: 2.

**Adjuntos:** `COMPARACION_NOMINA.xlsx` y `COMPARACION_ASISTENCIA.xlsx`.

**Observación:** el encargo dice que las pruebas usan trabajadores con DNI 9999…, pero los 13 trabajadores sembrados por NOMINA tienen DNI de 8 dígitos que **no** empiezan con 9999. Conviene confirmar que son ficticios. Si pudieran coincidir con personas reales, pasa lo mismo que con el hallazgo H-MAN-1 del manual EE.

## 6. Q-01 — OK

- Las dos compañías de la base tienen `solse_es_demo = False` (compañías reales para Q-01): «Empresa 01 SAC» y «Empresa 02 SAC».
- Con «Empresa 02 SAC» activa se abrió Nómina › Nómina PE › «Datos de prueba (demo)»:
  - **Aviso azul:** «"Empresa 02 SAC" es una compañía real: los datos de prueba solo se cargan en compañías del laboratorio (o en la de una base nueva). "4. Validación interna" revisa aquí solo la configuración de la nómina.»
  - **Botones visibles:** solo «4. Validación interna (banderas)» y «Cerrar». No aparecen el 1, 2, 3, 5 ni 6.
- Se cerró sin pulsar nada. Captura: `p6_q01_compania_1.png`.

## 7. Efecto en la base

PENDIENTE: Gabriel debe correr `odoo-bin shell -c <conf> -d demoContable --logfile=/dev/null < medir_impacto_ee1a.py`. Lo que se pudo contar por RPC:

| Compañía | Boletas | Desde 10/2026 |
|---|---|---|
| Empresa 01 / 02 SAC | ninguna | 0 |
| SOLSE Demo Servicios (laboratorio) | 35 validadas + 5 en borrador (las de los casos) | 0 |

No hay boletas de octubre de 2026 en adelante, así que no se puede observar el paso de ASF_001 de 113 a 123.

## Pendiente de Gabriel

1. El log del `-u` (punto 2).
2. La salida de `medir_impacto_ee1a.py` sobre `demoContable` (punto 7).
3. Para medir PLAME y PLAME-RXH, instalar `solse_pe_plame_ee_demo` y `solse_pe_plame_rxh_demo` (con `solse_pe_plame_rxh`), o indicar si se miden en `demoEE`.
4. Confirmar que los DNI de los trabajadores de NOMINA son ficticios (observación del punto 5).
