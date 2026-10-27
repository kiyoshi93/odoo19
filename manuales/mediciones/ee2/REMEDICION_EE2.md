# Remedición del lote EE-2 («Interfaz») — nómina Enterprise

**Base medida:** `demoContable` en https://148.113.151.40.sslip.io (Odoo 19.0 Enterprise).

**Fecha:** 2026-10-27.

**Cómo se midió:** RPC y navegador, con la compañía «SOLSE Demo Servicios S.A.C.» activa y en español, más el log del `-u` y el script que corrió Gabriel. No se instaló ni cambió nada.

## Resumen

| Punto | Estado | Medido |
|---|---|---|
| 1. Versiones | **OK** | Las seis con la versión entregada. |
| 2. Log del `-u` | **OK** | Ningún ERROR de nómina. Salen todas las líneas pedidas (U-04, Q-02, U-06 ×3 y D-6 ×3). Ningún WARNING de «no es compañía del laboratorio». |
| 3. Pantallas | **OK con observación** | U-02, U-03, U-10 y el tablero, bien. U-04/U-11: los maestros muestran el código; la ficha de la demo no lo puede mostrar porque sus trabajadores no tienen esos datos. |
| 4. Laboratorio | **FALLA** | **Sembrar de NOMINA falla con AccessError** al leer «Tipo de estructura salarial». ASISTENCIA y PLAME no corren porque dependen de NOMINA. PLAME-RXH: 99,01 % (H-7). |
| 5. TXT del BCP | **NO MEDIBLE** | Sin la siembra de NOMINA no hay boletas en el laboratorio. Limpiar sí borró los datos anteriores. |
| 6. Script de impacto | **OK** | Lo esperado en todos los ítems. |

## 1. Versiones — OK

| Módulo | Estado | Versión |
|---|---|---|
| `solse_pe_payroll` | installed | **19.0.1.16.4** |
| `solse_pe_payroll_catalogo` | installed | **19.0.0.3** |
| `solse_pe_payroll_renta5` | installed | **19.0.1.0.1** |
| `solse_pe_payroll_demo` | installed | **19.0.1.6.4** |
| `solse_pe_payroll_asistencia_ee_demo` | installed | **19.0.1.2.1** |
| `solse_pe_plame_ee_demo` | installed | **19.0.1.1.1** |
| `solse_pe_payroll_asistencia_ee` | installed | 19.0.1.0.0 (no cambia) |
| `hr_payroll` | installed | 19.0.1.0 |

## 2. Log del `-u` — OK

Adjunto: `log_u_lote_ee2.txt`.

**`solse_pe_payroll`:**

```
Running upgrade [>0.0.0] pre-migrate — C-02: 0 vigencia(s) del cliente adoptada(s).
Nómina PE (U-06): Validate traducido en hr_payroll_account.hr_payslip_view_form (es_PE).
Nómina PE (U-06): Validate traducido en hr_payroll_account.hr_payslip_run_view_kanban (es_PE).
Running upgrade [19.0.1.7.0>] post-migrate — U-04: vínculo familiar «Cónyugue» corregido a «Cónyuge».
Running upgrade [19.0.1.9.0>] post-migrate — Q-02: T12 código 20 (agrario) archivado; contratos que lo usan: 0
Running upgrade [19.0.1.12.0>] post-migrate — U-06: nombre de boleta en NME → «Boleta de Pago», NSO → «Boleta de Pago», NQA → «Adelanto Quincenal».
```

**`solse_pe_payroll_demo`:**

```
Running upgrade [19.0.1.6.0>] post-migrate
Nómina PE demo (D-6): 8 comparaciones guardadas de ASISTENCIA, NOMINA, PLAME se borran porque 1272 de sus líneas tienen un DNI anterior; «Comparar» las rehace.
Nómina PE demo (D-6): 6 CUSPP de la demo pasan a los derivados del DNI sintético.
Nómina PE demo (D-6): 13 versiones de 13 trabajadores y 26 cuentas pasan a DNI sintéticos en 1 compañías del laboratorio.
```

- Ningún WARNING «… no es compañía del laboratorio».
- **docutils:** solo las dos líneas de `solse_pe_payroll_asistencia_ee` (`:16 Definition list ends…` y `:18 Unexpected indentation`). Las de `solse_pe_payroll` ya no salen (R-9 OK).
- **ERROR (48), todos ajenos a nómina:** `mkb.*`, `smigracion.*` y `ai.embedding` sin tabla. Ya no aparece el de `solse_multi_barcodes`.

## 3. Pantallas — OK con observación

- **U-02, Registros de los empleados:**
  - columnas: Empleado (primera), Fecha efectiva, Iniciar, Fin, Régimen Laboral, Nota, Salario, Tipo de contrato, Tipo de estructura salarial, Puesto, Departamento, Horas laborables;
  - abre agrupada por «Empleado» (faceta «Empleado», 13 grupos).
  - Captura: `p3_u02_registros.png`.
- **U-03, Reglas salariales:** abre con las facetas «Estructuras peruanas» y «Estructura salarial» (agrupación). Captura: `p3_u03_reglas.png`.
- **U-10, Tipos de estructura**, en este orden:
  1. Régimen General → NME;
  2. Obreros - Semanal → NSO;
  3. Quincenal - Adelanto → NME;
  4. Beneficios Sociales;
  5. General (reglas base, sin planilla PE);
  6. Empleado (genérico, sin planilla PE);
  7. Obrero (genérico, sin planilla PE).

  Los belgas (97 y 98, según el script) no se listan: la regla multiempresa nativa los oculta, porque ninguna compañía es de Bélgica. Captura: `p3_u10_tipos.png`.
- **U-04, maestros SUNAT:** las listas de T12, T9, T17 y T35 muestran la columna «Código» antes de la abreviatura y la descripción. El script confirma que el nombre visible de cada registro es «[código] descripción»: health.regime 8/8, academic.degree 21/21, low.reason 21/21, special.situation 9/9, type.contract 26/26 y payment.type 3/3. Vínculos (T19): «Cónyuge», sin la errata. Captura: `p3_u04_t12.png`.
- **U-04/U-11 en la ficha de un trabajador de la demo — observación:** los 13 trabajadores sembrados no tienen fecha de nacimiento, régimen de salud, situación educativa ni tipo de contrato (T12). Por eso:
  - en su ficha esos campos salen vacíos y no se puede ver en pantalla el «[código] descripción»;
  - la edad sale **0**: entera, como pide U-11, pero 0 por falta de fecha.
  - El campo `age` es entero según el script.
  - Captura: `p3_u04_u11_ficha_nomina_pe.png`.
- **Tablero (H-6):**
  - con «servicios» activa no aparece el aviso «Contratos con un tipo de estructura sin planilla peruana…»;
  - coincide con el script, que da 0 contratos sin planilla en las 5 compañías;
  - no se pudo probar el clic del aviso porque no aparece.
  - Captura: `p3_tablero.png`.

## 4. Laboratorio — FALLA

«② Sincronizar casos» registra NOMINA, ASISTENCIA, PLAME-RXH, PLAME y ANTICIPOS. Se corrieron en el orden pedido:

| Caso | Resultado |
|---|---|
| NOMINA | Limpiar OK (borró los 13 trabajadores, sus boletas y sus cuentas). **Sembrar: ERROR** `AccessError` — «Administrador (id=2) no tiene acceso 'leer' a: Tipo de estructura salarial (hr.payroll.structure.type)». |
| ASISTENCIA | Sembrar: UserError «Antes de ejecutar este caso hay que sembrar: NOMINA». |
| PLAME-RXH | **99,01 %** (200/202 celdas, 3/4 estructuras). Las 2 celdas del «Diagnóstico» de H-7, como antes. Adjunto: `COMPARACION_PLAME-RXH.xlsx`. |
| PLAME | Sembrar: UserError «… hay que sembrar: NOMINA». |

**Causa** (traza del servidor):

```
solse_pe_demo_libros/models/demo_caso.py:406 accion_sembrar
→ solse_pe_payroll_demo/models/seeder_nomina.py:248 sembrar → inicializador.inicializar_todo()
→ solse_pe_payroll/models/inicializar_estructuras.py:418 inicializar_todo
→ inicializar_estructuras.py:355 ordenar_tipos_genericos   ← nuevo en EE-2 (U-10)
→ fetch de hr.payroll.structure.type → AccessError (ir.rule)
```

- **La regla nativa** «HR Payroll Structure Type: Multi Company» (`['|', ('country_id','=',False), ('country_id','in', user.env.companies.mapped('country_id').ids)]`) oculta al usuario los tipos belgas «CP200 BE» y «CP200 PFI BE», porque ninguna compañía es de Bélgica.
- **Por qué falla aquí:** `ordenar_tipos_genericos` lee esos tipos sin `sudo()`. En el `-u` corre como superusuario y no falla. Desde el Laboratorio corre como el usuario y falla.
- **Alcance:** afecta a cualquier llamada a `inicializar_todo()` hecha por un usuario normal, no solo a la demo.
- **Corrección sugerida:** hacer en `sudo()` la búsqueda y escritura de secuencias de `ordenar_tipos_genericos`, o limitarla a los tipos PE y a los genéricos sin país.

**Estado en que queda la base:**
- la compañía «servicios» del laboratorio tiene 0 trabajadores y 0 boletas;
- NOMINA, ASISTENCIA y PLAME quedan «pendiente».

Con la corrección desplegada se vuelve a correr todo el punto 4. Tampoco se pudo verificar en la comparación de NOMINA que los DNI sean 99998001 a 99998013 y que las boletas se llamen «Boleta de Pago - …». El script los midió antes de la limpieza: 13 sintéticos y 0 anteriores.

## 5. TXT del BCP — NO MEDIBLE

Sin la siembra de NOMINA no hay boletas de julio de 2026 en el laboratorio. Se mide en cuanto NOMINA vuelva a sembrar.

## 6. Efecto en la base — OK

Adjunto: `salida_medir_impacto_ee2.txt`. El script se corrió antes de la limpieza del punto 4.

- **Nombres de registro:** ningún «modelo,id» en los 11 modelos.
  - mapeo contable: «RB_001 → 6211 / —»;
  - tramo de 5.ª: «Tramo 1 · 8 %»;
  - EPS: «PACIFICO EPS (DEMO)», sin «– póliza» porque no tiene número de póliza;
  - «Cónyugue»: 0.
- **T12 código 20:** 1 registro, 0 activos, 0 versiones que lo usan.
- **Acciones:** U-02 con `search_default_group_by_employee`; U-03 con `search_default_estructuras_peruanas` y agrupación por estructura.
- **U-06:**
  - nombres de boleta: NME y NSO «Boleta de Pago»; NQA «Adelanto Quincenal»; GRAT «Boleta de Gratificación»; VAC «Boleta de Vacaciones»; CTS «Liquidación CTS»; LIQ «Liquidación de Beneficios»;
  - «Validar» en la boleta y en el kanban de lotes; «Validate» en 0.
- **U-09:** los dos menús se llaman «Parámetros de Nómina PE» y solo los ve «Nómina / Administrador».
- **U-10:** tipos PE en 10, 20, 30 y 40; los «sin planilla PE» en 94, 95 y 96; los belgas en 97 y 98. **U-11:** `age` es entero.
- **H-6:** existe el aviso; 0 contratos sin planilla en las 5 compañías. En «Empresa 01 SAC», las versiones Employee/General que vio EE-1b no son contratos vigentes con fecha de inicio.
- **D-6:**
  - «servicios»: 13 sintéticos (13 trabajadores), 0 anteriores, 26 cuentas, 0 con DNI anterior;
  - las demás compañías: 0;
  - chatter con DNI anterior en toda la base: 0.

## Pendiente

1. **Corregir el AccessError de `ordenar_tipos_genericos`** (punto 4) y volver a entregar.
2. Después, repetir los puntos 4 y 5: NOMINA, ASISTENCIA, PLAME y PLAME-RXH, con los DNI 9999800x y las boletas «Boleta de Pago - …» en el detalle, y el TXT del BCP.
3. **Observación de la demo:** los trabajadores no tienen fecha de nacimiento, régimen de salud ni T12. Para que la ficha muestre U-04/U-11 en pantalla (y para el T-Registro), conviene que la siembra los complete.
