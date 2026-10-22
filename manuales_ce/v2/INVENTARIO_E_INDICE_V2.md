# Manual v2 de la nómina Community: índice definitivo e inventario de capturas

- **Fecha:** 2026-10-22.
- **Base:** contable19, decisión 1 de Gabriel.
- **Versiones medidas:**

  | Módulo | Versión |
  |---|---|
  | base | 19.0.1.20.1 |
  | ce | 19.0.1.27.1 |
  | ce_demo | 19.0.2.25.1 |
  | asistencia | 19.0.1.4.1 |
  | asistencia_demo | 19.0.1.2.1 |
  | plame_demo | 19.0.1.4.1 |

- **Lote 12:** validado en datos (`evidencias/lote12/REMEDICION_LOTE12.md`). Solo falta el log del `-u`.
- **Fuentes:**
  - `INSTRUCCIONES_MANUAL_Y_VIDEOS_NOMINA_CE.md`;
  - la matriz del lote 12 (`MATRIZ_DOCUMENTACION_NOMINA_CE.md`, con C-35 en el cap. 19 y el 31);
  - el manual v1 (`Manual_Nomina_PE_Odoo19_Community.docx`: 53 figuras de 74 capturas).

## 1. Decisiones aplicadas

| # | Decisión | Efecto en el plan |
|---|---|---|
| 1 | Se trabaja en **contable19** | Ver §5: qué se escribe, dónde y con qué límites |
| 2 | Una sola copia de los módulos | Antes de cada sesión de capturas: las 6 versiones en Aplicaciones y los 14 casos al 100 % |
| 3 | C-35 corregido en el lote 12 | El **cap. 19**, su parte del **cap. 31** y el **E11** van al **bloque 4**. Hasta entonces no hay capturas de asistencias (nota de Gabriel) |
| 4 | Sin respuestas nuevas de la contadora | Lo pendiente va al Anexo A como «criterio según la norma, pendiente de confirmación (P-xx)» |
| 5 | Recorrido con Lucía y Héctor (FM) y lo nuevo con los casos de SOLSE Demo | Se pueden agregar trabajadores sintéticos si hace falta |

## 2. Índice definitivo del v2

Se mantiene la numeración propuesta (1–32 y Anexos A–E). Un solo ajuste de criterio: **en la matriz, el primer capítulo de cada fila es el principal**, donde el ítem se explica completo. Los demás capítulos citados solo lo mencionan y remiten al principal. Revisé las 65 filas (C-35 incluida) con esa regla y todas tienen un principal coherente. No hace falta renumerar.

| v2 | Capítulo | Bloque | Ítems principales (matriz) | Episodio |
|---|---|---|---|---|
| 1 | Introducción y novedades de la versión 2 | 1 | — | E01 |
| 2 | Instalación y actualización | 1 | C-14, C-15, Q-01 | E02 |
| 3 | Menú de Nómina | 1 | U-09 | E02 |
| 4 | Parámetros legales con vigencia | 1 | C-02, U-08, V-01, V-02, V-03 | E03 |
| 5 | Maestros SUNAT y tablas del T-Registro | 1 | U-04, U-05, Q-02 | E04 |
| 6 | Seguros: EPS, SCTR y Vida Ley | 1 | U-01, N-05 (la prima en la boleta, en el 12) | E04, E18 |
| 7 | Contabilidad de nómina | 1 | C-06, C-21 | E04, E06 |
| 8 | Alta de un trabajador | 1 | C-07, U-02, U-07, U-10, U-11 | E05 |
| 9 | Estructuras salariales | 1 | U-03, Q-03 | E05 |
| 10 | Boleta de pago individual | 2 | C-05, C-09, C-16, C-18, U-06 | E06 |
| 11 | Lote mensual y orden del proceso | 2 | C-17 | E07 |
| 12 | Aportes y retenciones | 2 | C-10, C-26 | E08 |
| 13 | Renta de 5.ª | 2 | C-03, C-11, N-04 | E09 |
| 14 | Gratificaciones | 2 | C-34 | E15 |
| 15 | CTS | 2 | C-23 (C-01 y N-08 remiten al 27 y al 28) | E15 |
| 16 | Liquidación por cese | 2 | C-20, N-03 | E16 |
| 17 | Vacaciones | 2 | C-04 | E10 |
| 18 | Feriados | 2 | V-05 (C-09 en el 10) | E10 |
| 19 | Asistencias: tardanzas, faltas y feriados | **4** | C-29, C-35 (C-10 se explica en el 12) | **E11** (bloque 4) |
| 20 | Horas extra, nocturnidad, movilidad, adelantos y utilidades | 2 | C-22 | E22 |
| 21 | Cambios de contrato dentro del mes | 3 | C-28, C-30, C-33, O-31 | E12 |
| 22 | Licencias sin goce, permisos por horas y meses sin remuneración | 3 | C-31, C-32 | E13 |
| 23 | Subsidios: descanso médico y maternidad | 3 | N-01 | E14 |
| 24 | Microempresa | 3 | C-25 | E17 |
| 25 | Rectificar una boleta | 3 | C-27 | E07 |
| 26 | Avisos y controles | 3 | V-04 (V-02, V-03 y V-05 remiten al 4 y al 18) | E03, E06, E10 |
| 27 | Reportes y archivos legales | 3 | C-01, C-08, C-12, C-13, C-19, C-24 | E19, E21 |
| 28 | Pago de la planilla, entrega de boletas y constancias | 3 | N-07, N-08 | E20 |
| 29 | T-Registro | 3 | N-02 | E23, E24 |
| 30 | Recibos por honorarios (4.ª) | 4 | — | E25 |
| 31 | Lo que la localización no cubre | 4 | N-06 (y las limitaciones de C-35) | — |
| 32 | Lista de verificación del cierre mensual y anual | 4 | — | E26 |
| A | Observaciones para implementadores | 4 | Cierre de A1–A12; abiertas: O-51, O-55, O-56, O-57, O-58, O-62 y las P-xx | — |
| B | Datos de prueba | 4 | — | — |
| C | Planilla medida de enero de 2025 a diciembre de 2026 | 4 | Ver §5 | — |
| D | Historial de versiones (lotes 1 a 12) | 4 | — | — |
| E | El laboratorio: 14 casos | 4 | Q-04, Q-05 | E02, E26 |

**Ajustes a la matriz:**
- **Q-03 y N-06 no tienen episodio**, y está bien:
  - Q-03 está cerrado porque no se reproduce, y se menciona en el cap. 9;
  - N-06 está bloqueado, va en el cap. 31 y se nombra en E19 como límite.
- **Numeración de observaciones.** O-51 a O-54 son mías, del informe del lote 11. O-55 a O-58 y O-62 son de tu lado. Las nuevas que salgan de la documentación van desde **O-63**.

**Orden de entrega:**

| Bloque | Capítulos | Videos |
|---|---|---|
| 1 | 1–9 | E02–E05 (E03 y E04 tocan el 26 y el 7, que ya están medidos) |
| 2 | 10–18 y 20 | E06–E10, E15, E16, E22 |
| 3 | 21–29 | E07 (completo con el 25), E12–E14, E17–E21, E23, E24 |
| 4 | 19, 30–32 y anexos | E11, E25, E26, y al final E01 (resumen) y E00 (promo) |

## 3. Inventario de las capturas del v1

**Regla:** todas las capturas del v1 se rehacen, porque muestran versiones anteriores (19.0.1.6.0 / 19.0.1.8.0) y el v2 no puede llevar ninguna pantalla vieja (regla 5). En la tabla, «Solo versión» quiere decir que la pantalla es igual y se recaptura sin cambiar el texto. «Cambia» quiere decir que el contenido es distinto por el ítem indicado.

| Fig. v1 | Captura v1 | Cap. v2 | Qué pasa | Por qué (ítem) |
|---|---|---|---|---|
| 1 | `01_menu_principal` | 3 | Solo versión | — |
| 2 | `p03_01_menu_nomina_pe` | 3 | **Cambia** | U-09; entradas nuevas: T-Registro, Certificado de 5.ª, T19, T28, T34, pólizas de Vida Ley, laboratorio |
| 3 | `p03_02_menu_configuracion` | 3 | **Cambia** | U-09, U-08 (editor) |
| 4 | `p04_01_parametros_lista` | 4 | **Cambia** | U-08, banda V-03 |
| 5 | `p04_02_rmv_nueva_vigencia` | 4 | **Cambia** | C-02: la RMV 1 230 y la AF 123 ya vienen cargadas; se muestra la vigencia, no se crea |
| 6 | `p04_03_rma_vigencias` | 4 | **Cambia** | C-02 (RMA trimestral completa) |
| 7 | `p05_01_maestro_t22` | 5 | **Cambia** | U-04 «[código] descripción» |
| 8 | `p05_02_maestro_t11` | 5 | **Cambia** | U-04 |
| 9 | `p06_01_planes_eps` | 6 | **Cambia** | U-01 (nombre y código T14) |
| 10 | `p07_01_mapeo_pcge` | 7 | **Cambia** | U-05 (mapeo legible) |
| 11 | `p07_02_asignar_cuentas` | 7 | **Cambia** | C-15 (cuentas al cargar el plan), C-21 |
| 12 | `p07_03_diario_planillas` | 7 | Solo versión | C-06 se explica en el texto |
| 13 | `p08_01_empleado_nuevo` | 8 | Solo versión | — |
| 14 | `p08_02_personal` | 8 | Solo versión | — |
| 15 | `p08_03_nomina_pe` | 8 | **Cambia** | N-02 (Identificación, Domicilio y Estudios del T-Registro), U-11 (edad entera), N-08 (entrega electrónica) |
| 16 | `p08_04_derechohabientes` | 8 | **Cambia** | N-02 fase 2 (documento, apellidos, nombres, alta) |
| 17 | `p08_05_contrato` | 8 | **Cambia** | C-07, U-07, U-10 |
| 18 | `p08_07_contrato_tregistro` | 8 | **Cambia** | N-02 (T8, T24); U-07 |
| 19 | `p08_06_empleado_guardado` | 8 | Solo versión | — |
| 20 | `p09_01_estructuras` | 9 | Solo versión | Hay que comprobar si la de microempresa (C-25) agrega filas |
| 21 | `p09_02_estructura_nme` | 9 | **Cambia** | U-03 (reglas agrupadas) |
| 22 | `p10_04_boleta_nueva` | 10 | **Cambia** | C-07, V-04 (avisos) |
| 23 | `p10_05_boleta_calculada` | 10 | **Cambia** | C-09 (días por norma), C-16 |
| 24 | `p10_06_boleta_confirmada` | 10 | **Cambia** | Botones nuevos: «Registrar pago», «Enviar por correo» (N-07, N-08) |
| 25 | `p10_07_boleta_pdf` | 10 | **Cambia** | C-05 (cuadra al centavo), U-06 |
| 26 | `p10_08_asiento` | 10/7 | **Cambia** | C-05: la cifra 5 870,78 se vuelve a medir |
| 27 | `p11_01_lote_nuevo` | 11 | Solo versión | — |
| 28 | `p11_03_lote_seleccion` | 11 | Solo versión | — |
| 29 | `p11_04_lote_generado` | 11 | **Cambia** | C-17 (no recalcula las validadas), V-04 (orden de diciembre) |
| 30 | `p11_05_lote_hecho` | 11 | **Cambia** | Botones «Registrar pago» y «Enviar boletas» (N-07, N-08) |
| 31 | `p13_01_r5ta_enero` | 13 | **Cambia** | C-03 (proyección con AF): la cifra de enero de 2025 se vuelve a medir |
| 32 | `p14_01_grati_julio` | 14 | Solo versión | C-34 no se ve en esta pantalla |
| 33 | `p15_01_cts_noviembre` | 15 | Solo versión | — |
| 34 | `p16_02_cese_contrato` | 16 | **Cambia** | N-03 (despido arbitrario, fin pactado) |
| 35 | `p16_01_liquidacion` | 16 | **Cambia** | C-20 (truncas con aportes), N-04 |
| 36 | `p17_05_asignaciones` | 17 | Solo versión | — |
| 37 | `p17_04_ausencias` | 17 | Solo versión | — |
| 38 | `p17_02_vac_mensual_dias` | 17 | **Cambia** | C-09, C-16 |
| 39 | `p17_01_vac_boleta` | 17 | **Cambia** | C-11, C-26 |
| 40 | `p18_01_feriados` | 18 | Solo versión | — |
| 41 | `p18_02_boleta_global` | 18 | **Cambia** | C-09: «23 días y línea GLOBAL» pasa a días por norma |
| 42 | `p19_04_ajustes_asistencia` | 19 | **Cambia** (bloque 4) | C-35, nota de zona horaria (O-62) |
| 43 | `p19_01_boleta_tardanzas` | 19 | **Cambia** (bloque 4) | C-10, C-35 (línea de totales con «Feriados: N») |
| 44 | `p19_03_boleta_faltas` | 19 | **Cambia** (bloque 4) | C-29 |
| 45 | `p20_01_entradas` | 20 | Solo versión | — |
| 46 | `p20_02_entradas_calculo` | 20 | **Cambia** | C-10: la base baja con la tardanza (la ONP 310,67 sobre 2 389,75 del v1 se vuelve a medir) |
| 47 | `p21_01_planilla_asistente` | 27 | Solo versión | — |
| 48 | `p21_02_plame_resultado` | 27 | **Cambia** | C-24 (`.jor` de 6 campos), `.snl` (C-09, N-01) |
| 49 | `p21_03_plame_4ta_resultado` | 27 | Solo versión | — |
| 50 | `p21_04_afpnet_asistente` | 27 | Solo versión | — |
| 51 | `p21_05_bancos_sueldo_asistente` (difuminada) | 27 | **Cambia** | C-08 (omitidos), C-13 (Scotiabank), C-23 |
| 52 | `p22_04_rxh_revision` | 30 | Solo versión | — |
| 53 | `p22_02_ajustes_4ta` | 30 | Solo versión | — |

**Capturas del v1 que no se usaron** (21): `p08_08`, `p09_03_reglas_salariales`, `p10_01`–`p10_03`, `p11_02`, `p17_03`, `p19_02`, los otros `p21_*` y `p22_01`, `p22_03`, `p22_05`. Se descartan. La única que vuelve, rehecha, es `p09_03_reglas_salariales`, porque ahora muestra U-03.

**Resumen:** de las 53 figuras del v1, **19 son solo versión** y **34 cambian**. Las 53 se rehacen.

## 4. Capturas que faltan (nuevas en el v2)

Nombres: `c<cap>_<nn>_<tema>`.

**Fuentes de los datos:**
- **FM:** recorrido de Lucía y Héctor.
- **CASO:** un caso de SOLSE Demo después de correrlo.
- **ESC:** un escenario armado a mano en SOLSE Demo con los pasos de un script de criterios (ver §5).

### Bloque 1 (capítulos 1–9)

| Captura | Muestra | Fuente | Ítem |
|---|---|---|---|
| `c02_01_aplicaciones_versiones` | Las 6 versiones en Aplicaciones | FM | §0 |
| `c02_02_laboratorio_sincronizar` | Laboratorio › «Sincronizar casos» | CASO | Anexo E |
| `c02_03_casos_100` | Los 14 casos al 100 % | CASO | Q-04, Q-05 |
| `c02_04_datos_de_prueba_laboratorio` | El asistente de datos de prueba solo escribe en las compañías de laboratorio | FM / CASO | Q-01 |
| `c03_03_menu_maestros_sunat` | Maestros SUNAT con T19, T28 y T34 | FM | N-02 |
| `c04_04_editor_parametros` | Editor de parámetros estructurados en tabla | FM | U-08 |
| `c04_05_valor_rechazado` | «1,230» rechazado al guardar (se descarta) | FM | V-01 |
| `c04_06_banda_rma_uit` | Banda de RMA y UIT | FM | V-03 |
| `c04_07_aviso_vigencia_faltante` | Mensaje de vigencia faltante | ESC (`criterios_lote4.py`, V-02) | V-02 |
| `c05_03_busqueda_por_codigo` | Búsqueda por código en un maestro | FM | U-04 |
| `c05_04_t12_anexo2` | T12 con los datos del Anexo 2 | FM | Q-02 |
| `c05_05_t19` / `c05_06_t28` / `c05_07_t34` | Vínculos familiares (T19), Ubigeo RENIEC (T28, 1 892), Instituciones y carreras (T34, 5 925) | FM | N-02 |
| `c06_02_sctr_entidad` | Entidad del SCTR en la ficha o la compañía | FM | — |
| `c06_03_polizas_vida_ley` | Pólizas de Vida Ley: tasa, tope, «Calcular en la planilla» | CASO VIDALEY | N-05 |
| `c07_04_cuenta_manual_4111` | Regla con la cuenta de crédito manual que el `-u` respeta | ESC (C-21) o FM, solo lectura | C-21 |
| `c08_08_lista_contratos` | Lista de contratos con el trabajador | FM | U-02 |
| `c08_09_categoria_pago` | Desplegable «Categoría del pago» con los tipos peruanos primero | FM (se descarta) | U-10 |
| `c08_10_ficha_tregistro_1..3` | Identificación, Domicilio y Estudios del T-Registro | CASO TREGISTRO | N-02 |
| `c08_11_derechohabientes_dh` | Derechohabientes con documento, T19 y alta | CASO TREGISTRO (70001502) | N-02 |
| `c08_12_entrega_electronica` | Acuerdo de entrega electrónica en la ficha y representante del empleador en la compañía | CASO / FM | N-08 |
| `c09_03_reglas_agrupadas` | Reglas agrupadas por estructura | FM | U-03 |
| `c09_04_estructura_micro` | Estructura o configuración de microempresa | CASO MICRO | C-25 |

### Bloques 2 a 4 (resumen; el detalle va con cada bloque)

- **Cap. 10** (C-18, U-06, N-08):
  - boleta sin importes con su mensaje (ESC C-18);
  - «Enviar por correo» con un correo ficticio.
- **Cap. 11** (C-17, V-04, N-07, N-08):
  - lote de diciembre con el orden GRAT → mensual;
  - aviso de orden;
  - botones del lote.
- **Cap. 12** (C-26, C-32, C-25, N-05): Nilda con la base mínima y el tope de la prima (CASO NOMINA); 0803 de Vida Ley (CASO VIDALEY).
- **Cap. 13** (N-04, N-08): cese con DEV5 (CASO CESE); certificado de 5.ª de Lucía (FM, solo el PDF, sin enviar).
- **Cap. 14 y 16** (C-34, N-03): Carmen (CASO NOMINA); indemnización (CASO INDEMNIZACION); contrato con despido.
- **Cap. 15** (N-08): liquidación del depósito de CTS (CASO NOMINA o BANCOS).
- **Cap. 18** (V-05): banda de feriados del año sin cargar (ESC V-05, en una compañía de laboratorio).
- **Cap. 20** (C-22): reparto y tope (CASO UTILIDADES).
- **Cap. 21** (C-28, C-30, C-33, O-31): AUMENTO, con dos WORK100 y el `.jor` de 176 h.
- **Cap. 22** (C-31, C-32): semana sin goce 2 083,33; 2 h 2 479,17; mes sin EsSalud (ESC `criterios_lote7a.py`).
- **Cap. 23** (N-01): Tabla 21, `.snl`, 0916 y 0915 (CASO SUBSIDIOS).
- **Cap. 24** (C-25): SIS y AF voluntaria (CASO MICRO).
- **Cap. 25** (C-27): rectificativa en PLAME, AFPnet y bancos (ESC `criterios_lote6_contadora.py`).
- **Cap. 26** (V-02 a V-05): controles de la compañía, con la configuración Avisar / Bloquear.
- **Cap. 27** (C-24, C-01, C-08, C-12, C-13, C-19, C-23): TXT de BCP, Interbank y Scotiabank, omitidos, `.rem` con los códigos nuevos (CASO BANCOS y PLAME).
- **Cap. 28** (N-07, N-08):
  - «Registrar pago» con el asiento conciliado (ESC `criterios_n07.py`, 4 785,00);
  - envío con constancia y plazo, liquidación de CTS (ESC `criterios_n08.py`).
- **Cap. 29** (N-02):
  - asistente de altas, bajas, 9 modificaciones y derechohabientes (CASO TREGISTRO; los ZIP y TXT del lote 11);
  - el TXT de derechohabientes **no se sube**.
- **Cap. 19, bloque 4** (C-35):
  - boleta de octubre de Jorge con «◇ feriado» (CASO ASISTENCIA, «Feriado»);
  - zona horaria del calendario (O-62).

## 5. Escrituras en contable19 y límites

Las escrituras que pide la documentación, por orden de riesgo:

1. **Correr los 14 casos.** Escribe en SOLSE Demo y ya se hace en cada medición. Sin riesgo.
2. **Escenarios ESC**, para lo que no tiene caso:
   - pasos de los scripts de criterios armados a mano en **SOLSE Demo Servicios**, con trabajadores sintéticos nuevos (DNI 7009xxxx);
   - se borran al terminar cada capítulo, dejando en borrador o cancelando lo que no se pueda borrar;
   - **no los corro como script**: el LEEME pide no correrlos en contable19 y aquí no tengo `odoo-bin shell`.
3. **Anexo C**: regenerar las 64 boletas de FM (2025–2026) con las versiones finales. Reescribe boletas validadas y sus asientos de la compañía real.
4. **N-07 y N-08**:
   - «Registrar pago» crea pagos y conciliaciones;
   - «Enviar boletas» manda correos.

   Los hago **solo en SOLSE Demo**, con correos `@ejemplo.pe`, y con el correo saliente comprobado.

**Lo que no se hace sin autorización expresa:**
- el punto 3;
- cualquier pago o envío en FM;
- subir TXT a SOL.
