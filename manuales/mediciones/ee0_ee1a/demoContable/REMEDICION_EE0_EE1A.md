# Remedición de los lotes EE-0 y EE-1a — nómina Enterprise

**Base medida:** `demoContable` en el servidor de pruebas https://148.113.151.40.sslip.io (Odoo 19.0 Enterprise).

**Fecha:** 2026-10-26.

**Cómo se midió:** RPC y navegador, más el log y el script que corrió Gabriel en consola.
- Por indicación de Gabriel, además de lo que pide el encargo:
  - se pulsó «① Construir laboratorio», porque estaba vacío;
  - Gabriel instaló `solse_pe_plame_ee_demo`, `solse_pe_plame_4ta_ee`, `solse_pe_plame_rxh` y `solse_pe_plame_rxh_demo` para poder correr PLAME y PLAME-RXH.
- La prueba de la RMV del punto 3 se descartó, y luego se comprobó por datos que no se guardó.

## Resumen

| Punto | Estado | Medido |
|---|---|---|
| 1. Versiones | **OK** | `solse_pe_payroll` 19.0.1.1.4 · `solse_pe_payroll_demo` 19.0.1.5.2. |
| 2. Log del `-u` | **OK con observaciones** | Ningún ERROR de los módulos de nómina. Los 57 ERROR del log son de otros módulos de la base. No aparecen las líneas de migración, C-02 ni V-01: ver detalle. |
| 3. Parámetros | **OK** | 24 con tipo, ninguno «Libre». RMV, AF, RMA y comisión según lo esperado. «1 230» se rechaza con el mensaje de V-01. |
| 4. Tablero | **OK** | Sin el aviso de vigencias mal escritas (V-01 = 0 según el script). |
| 5. Laboratorio | **OK** | NOMINA 100 % (366) · ASISTENCIA 100 % (68) · PLAME-RXH 99,01 % (H-7) · PLAME 100 % (95). |
| 6. Q-01 | **OK** | Aviso de compañía real; solo se ve «4. Validación interna». |
| 7. Script de impacto | **OK** | 0 vigencias inválidas. Todas las vigencias con xmlid (ninguna manual). 0 boletas desde 10/2026. 5 borradores recalculados en un savepoint: ninguno cambia. |

## 1. Versiones — OK

- **Odoo:** «Odoo version 19.0» (primera línea del log); `server_version` 19.0+e.
- No es DESP-1: ninguna versión es menor que la entregada.

| Módulo | Estado | Versión |
|---|---|---|
| `solse_pe_payroll` | installed | **19.0.1.1.4** |
| `solse_pe_payroll_demo` | installed | **19.0.1.5.2** |
| `solse_pe_payroll_renta5` | installed | 19.0.1.0.0 |
| `solse_pe_payroll_asistencia_ee` | installed | 19.0.1.0.0 |
| `solse_pe_payroll_asistencia_ee_demo` | installed | 19.0.1.2.0 |
| `solse_pe_plame_ee_demo` | installed | 19.0.1.1.0 |
| `solse_pe_plame_4ta_ee` | installed | 19.0.1.0.0 |
| `solse_pe_plame_rxh` | installed | 19.0.1.2.0 |
| `solse_pe_plame_rxh_demo` | installed | 19.0.2.3.1 |
| `solse_pe_payroll_catalogo` | installed | 19.0.0.2 |
| `hr_payroll` | installed | 19.0.1.0 |
| `solse_pe_demo_suite_ee` | uninstalled | — |

## 2. Log del `-u solse_pe_payroll,solse_pe_payroll_demo`

Adjunto: `log_u_solse_pe_payroll.txt`.

- **Carga de los módulos:** `solse_pe_payroll` (366/430) y `solse_pe_payroll_demo` (394/430) cargan y actualizan sus datos sin error. No hay ningún ERROR ni WARNING propio de estos módulos.
- **Líneas de migración ausentes:** no aparecen «Running migration [>0.0.0] pre-migrate» ni «[$19.0.1.0.0] end-migrate», ni las líneas «C-02: …» y «V-01: …».
  - Lectura: cuando corrió este `-u`, la base ya estaba en 19.0.1.1.4, así que Odoo no vuelve a ejecutar las migraciones de versión.
  - La migración desde 19.0.0.45 corrió en un despliegue anterior, cuyo log no se conserva.
  - El resultado de C-02 y V-01 sí se verifica en los datos (puntos 3 y 7): todas las vigencias tienen su xmlid y hay 0 inválidas.
  - Si la línea principal necesita esas líneas, hay que pedirlas en el próximo cambio de versión.
- **docutils:** 2 líneas «(ERROR/3) Unexpected indentation» (líneas 230 y 444). Son las conocidas de los manifiestos y no son una falla.
- **ERROR del log (57), todos ajenos a nómina:**
  - 56 son «Model … has no table»: 7 modelos que se repiten 8 veces. Los modelos son `mkb.completa.codigo`, `mkb.duplicado.codigo`, `mkb.consolida.plantilla`, `smigracion.wizard.mapeo.plantillas`, `smigracion.wizard.mapeo.plantillas.linea`, `solse.mover.stock.fabricado` y `ai.embedding`.
  - 1 es «Some modules are not loaded»: `solse_multi_barcodes`, `solse_multi_barcodes_pricelist` y `solse_pricelist_item_search`.

## 3. Parámetros — OK

- **24 parámetros `pe_`:** monto 5, tasa 16, comisión por AFP 1, tramos de renta 1 y factores por régimen 1.
- **En «Libre»:** ninguno.

| Parámetro | Vigencias | Estado |
|---|---|---|
| RMV | 2025-01-01 = 1130 · **2026-10-01 = 1230** | OK |
| Asignación familiar | 2025-01-01 = 113.0 · **2026-10-01 = 123.0** | OK |
| RMA AFP | 2025-01-01 12027.91 · 2025-04-01 12137.47 · 2025-07-01 12184.88 · 2025-10-01 12178.56 · 2026-01-01 12209.11 · 2026-04-01 12598.91 · 2026-07-01 12672.65 · **2026-10-01 12732.70** | OK |
| Comisión sobre el flujo | 2025-01-01 y 2026-01-01 (habitat 0.0147 · integra 0.0155 · prima 0.0160 · profuturo 0.0169) | OK |

**Prueba V-01 en la RMV** (vigencia desde 01/01/2030 con `1 230`). Mensaje al guardar:

> Error de validación — Parámetro «RMV - Remuneración Mínima Vital» (pe_rmv), vigencia desde 01/01/2030: Use punto decimal y sin separador de miles: escriba «1 230» sin espacios ni comas entre las cifras. Ejemplo: 1230 · 5500 · 12672.65

- REV-3 OK: no aparece el error técnico «invalid syntax».
- Se descartó el cambio y la RMV sigue con 2 vigencias.
- Capturas: `p3_rmv_error.png` y `p3_rmv_descartado.png`.

## 4. Tablero de Nómina — OK

- No aparece el aviso «Vigencias de parámetros de Nómina PE con un valor mal escrito». Es coherente con «vigencias que no cumplen su tipo: 0» del script.
- Captura: `p4_tablero.png`.

## 5. Laboratorio — OK

**① Construir laboratorio** creó 3 compañías de demostración con RUC sintéticos:
- SOLSE Demo Principal S.A.C.;
- SOLSE Demo Comercial E.I.R.L.;
- SOLSE Demo Servicios S.A.C.

**② Sincronizar casos** registra los 4 casos. Se corrieron en el orden pedido, cada uno con Limpiar, Sembrar, Generar y Comparar:

| Caso | Siembra / genera | Resultado | Celdas | Estructuras |
|---|---|---|---|---|
| NOMINA | 13 empleados / 36 boletas validadas | **100 % · CONFORME** | **366/366** | 6/6 |
| ASISTENCIA | marcaciones y vacación / 4 boletas | **100 % · CONFORME** | **68/68** | 4/4 |
| PLAME-RXH | 8 prestadores, 10 recibos / 9 comprobantes | **99,01 %** · con diferencias | 200/202 | 3/4 |
| PLAME | 35 boletas, 10 recibos de 4.ª / ZIP con 5 archivos | **100 % · CONFORME** | **95/95** | 5/5 |

**Boleta mensual de Ana, julio de 2026** (NOMINA):
- AFP_PRI_001 = **173.62**, igual a lo esperado;
- NET = **11838.63**, igual a lo esperado.

**E-06:** los 13 trabajadores con su tipo de estructura, ninguno con «General»:
- Régimen General: 9;
- Quincenal - Adelanto: 2;
- Obreros - Semanal: 2.

**PLAME-RXH (99,01 %, el valor esperado por H-7):** son 2 celdas de la estructura «Diagnóstico»:
- «3 · con algún pago registrado» → cantidad 8 esperada, 9 obtenida;
- «3c · search: + payment_state» → cantidad 8 esperada, 9 obtenida.

**Adjuntos:** `COMPARACION_NOMINA.xlsx`, `COMPARACION_ASISTENCIA.xlsx`, `COMPARACION_PLAME-RXH.xlsx` y `COMPARACION_PLAME.xlsx`.

**Observación:** el encargo dice que las pruebas usan DNI 9999…, pero los 13 trabajadores de NOMINA tienen DNI de 8 dígitos que no empiezan con 9999. Conviene confirmar que son ficticios (mismo riesgo que el hallazgo H-MAN-1 del manual EE).

## 6. Q-01 — OK

- Las dos compañías propias de la base tienen `solse_es_demo = False`, es decir, son reales para Q-01.
- Con «Empresa 02 SAC» activa, en Nómina › Nómina PE › «Datos de prueba (demo)»:
  - **Aviso azul:** «"Empresa 02 SAC" es una compañía real: los datos de prueba solo se cargan en compañías del laboratorio (o en la de una base nueva)…»
  - **Botones:** solo «4. Validación interna (banderas)» y «Cerrar». Los botones 1, 2, 3, 5 y 6 no aparecen.
- Se cerró sin pulsar nada. Captura: `p6_q01_compania_1.png`.

## 7. Efecto en la base — OK

Adjunto: `salida_medir_impacto_ee1a.txt`.

- **Módulos:** los esperados, con sus versiones.
- **V-01:** 24 parámetros; por tipo {monto 5, tasa 16, comision_afp 1, tramos_renta 1, factores_regimen 1}; **0** vigencias que no cumplen su tipo.
  - La línea «aviso del tablero: …» del script solo nombra el aviso, no indica que esté activo. El punto 4 confirma que no aparece.
- **C-02:** las 14 vigencias de RMV, AF, RMA y comisión tienen xmlid de `solse_pe_payroll`, todas noupdate. **Ninguna «sin xmlid (manual)»**.
  - Valores vigentes: RMV al 31/10/2026 = 1230; AF = 123.0; RMA al 31/03/2026 = 12209.11 y al 26/10/2026 = 12732.7.
- **Por compañía:**
  - Empresa 01 SAC, Empresa 02 SAC, Demo Principal y Demo Comercial: 0 boletas.
  - Demo Servicios: 40 boletas (35 validadas y 5 en borrador).
  - En todas: 0 boletas desde octubre de 2026 y 0 con ASF_001 = 113,00.
  - De los 5 borradores recalculados en el savepoint, **ninguno cambia** y ninguno falla.
