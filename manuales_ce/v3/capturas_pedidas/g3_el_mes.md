# Capturas pedidas · grupo g3_el_mes (capítulos 10, 11, 12, 18, 19, 21, 22, 25 y 26)

Base contable19, versiones del v3 (`solse_pe_payroll_ce` 19.0.1.39.202). Ninguna captura debe validar, cancelar ni
borrar nada: las boletas «nuevas» se dejan **sin guardar** (o se descartan) después de capturar.

## Rehacer (4)

### c10_02_boleta_impresa (cap. 10.6)
- **Qué debe verse:** el PDF «Boleta de Pago (PE)» de la mensual de diciembre de 2026 del caso BOLETA, entero.
- **Compañía:** 4 SOLSE Demo Servicios S.A.C.
- **Registro:** `hr.payslip` id 9544 (empleado «Trabajadora BOLETA (perfil C-05)», DNI 70000501, 01/12/2026 al 31/12/2026, «Nómina Mensual Empleados»). Imprimir › Boleta de Pago (PE).
- **Resaltar:** los importes con coma de miles («4,623.00», «4,025.70»; lote 59), el «SON: … SOLES Y SETENTA CÉNTIMOS» (lote 38), días laborados 31 / no laborados 0 / horas 184, aportes del empleador 450.74. Que no aparezca ningún bloque de provisiones.

### c10_03_asiento (cap. 10.7)
- **Qué debe verse:** el asiento de la boleta anterior, con sus líneas.
- **Compañía:** 4. **Registro:** `account.move` PLLA/2026/12/0373 (id 11075), diario Planillas, 31/12/2026, total 5 671,04.
- **Resaltar:** el número PLLA/2026/12/0373 (en el v2 era 0022), el total 5 671,04 al debe y al haber, y el socio del trabajador en las líneas de la 4111.

### c10_04_boleta_nueva (cap. 10.1)
- **Qué debe verse:** una boleta **nueva sin guardar** de la trabajadora del caso BOLETA, periodo 01/12/2026–31/12/2026, pestaña «Días trabajados y entradas».
- **Compañía:** 4. **Cómo:** Nómina › Nóminas del empleado › Nuevo; empleado «Trabajadora BOLETA (perfil C-05)»; fechas de diciembre de 2026. Descartar al terminar.
- **Por qué se rehace:** la del v2 muestra la banda «Faltan los días festivos de 2026», que hoy ya no sale en la compañía 4 (tiene feriados de 2026 en los horarios de los casos; ver hallazgo 1). Si la banda aparece, avisar.
- **Resaltar:** Estructura «Nómina Mensual Empleados», nombre «Boleta de Trabajadora BOLETA (perfil C-05) – diciembre 2026», WORK100 23 días / 184 h con «¿Pagado?».

### c19_01_ajustes_asistencias (cap. 19.1)
- **Qué debe verse:** la ficha de la compañía FM SYSTEMS SOLUTIONS EIRL (id 1), pestaña «Nómina PE - Asistencias», los dos grupos.
- **Por qué se rehace:** la del v2 no tiene la casilla nueva «Pagar el trabajo en feriado desde las asistencias» (lote 18).
- **Resaltar:** tolerancia 10, «Descontar tardanzas en la boleta» marcada, «Conciliar asistencias al calcular la boleta» y «Pagar el trabajo en feriado desde las asistencias» sin marcar; «Evaluar horas trabajadas por día» sin marcar. Ofuscar logo/datos de FM si se considera necesario (decisión 3 de Gabriel: FM se muestra).

## Nuevas (6)

### c10_06_conceptos_vales (cap. 10.4)
- **Qué debe verse:** pestaña «Cálculo de la nómina» de la mensual de noviembre de 2026 del trabajador «Trabajador CONCEPTOS ingresos» (DNI 70001601).
- **Compañía:** 4. **Registro:** `hr.payslip` id 9654 (validada).
- **Resaltar:** PRALI_001 150,00 en los ingresos, PRALI_ENT_001 «Prestaciones alimentarias entregadas (fuera del neto)» 150,00, ONP 552,50, EsSalud 382,50 y NET 5 097,50. Que se vean también ALIM_001 300, COM_001 500, BONREG_001 200, BPRODR_001 250, GRATEX_001 1 000 y BPROD_001 400.

### c10_07_aviso_rmv (cap. 10.5)
- **Qué debe verse:** la banda amarilla de una boleta **nueva sin guardar** con el aviso «rmv».
- **Compañía:** 14 SOLSE Demo Comercio S.A.C. **Cómo:** Nómina › Nóminas del empleado › Nuevo; empleado K6 del caso EMPRESA_COMERCIO, «Repartidor COMERCIO con el sueldo de la RMV anterior» (DNI 70006306, sueldo 1 200); periodo 01/10/2026–31/10/2026; estructura mensual. No calcular ni guardar.
- **Resaltar:** «El sueldo del contrato de … (1 200,00, sin otros conceptos) es menor que la remuneración mínima vital del periodo, 1 230,00. Revise el sueldo del contrato.» Si el texto difiere, anotar el texto real en el pie.

### c12_05_sctr_lineas (cap. 12.5)
- **Qué debe verse:** «Cálculo de la nómina» de la mensual de noviembre de 2026 de «Trabajadora SCTR EPS y compañía» (DNI 70002002), con las columnas opcionales «Póliza SCTR» y «Tasa SCTR (%)» activadas en la lista de líneas.
- **Compañía:** 4. **Registro:** `hr.payslip` id 9713.
- **Resaltar:** SCTR_SAL_001 «SCTR Salud - EPS» 36,00 (tasa 1,20) y SCTR_PEN_001 «SCTR Pensión - Compañía de seguros» 31,50 (tasa 1,05), con su póliza.

### c18_03_feriados_aparte (cap. 18.2)
- **Qué debe verse:** «Cálculo de la nómina» de la mensual de diciembre de 2026 de «Trabajador FERIADOS trabajó el 8» (DNI 70001902).
- **Compañía:** 4. **Registro:** `hr.payslip` id 9709.
- **Resaltar:** FER_001 300,00, RB_001 2 700,00, TFER_001 200,00, GROSS 3 200,00, ONP 416,00 y NET 2 784,00. Si cabe, la pestaña de entradas con TFER_001 = 8.

### c18_04a / c18_04b / c18_04c_opciones_feriados (cap. 18.5) · tomadas en tres recortes
- **Qué debe verse:** la ficha de la compañía SOLSE Demo Servicios S.A.C. (id 4), pestaña «Nómina PE - Controles», los grupos «PLAME» (casilla «Declarar aparte los feriados (0115) y la licencia con goce (0907)», marcada en esta compañía), «Valor hora y feriados» (solo las dos primeras opciones), «PLAME: horas del .jor» y «Descanso semanal y 1 de mayo».
- **Resaltar:** «Valor hora» = «Sueldo ÷ 30 ÷ las horas diarias de la jornada del trabajador…», «Trabajo en feriado en el promedio del subsidio» = «Siempre…», «Horas ordinarias del .jor» = «Solo las trabajadas», «Horas trabajadas en un feriado o día de descanso (.jor)» = «A las horas ordinarias», «Dominical y feriados de la semanal (PLAME)» = «Aparte, en el 0115», «1 de mayo en el día de descanso semanal» = «Pagar un día adicional» y «Pagar el 1 de mayo también en una ausencia» sin marcar. Pueden ser dos capturas recortadas si no entra en una (c18_04a / c18_04b).

### c22_05_opciones_suspensiones (cap. 22.5)
- **Qué debe verse:** la misma pestaña «Nómina PE - Controles» de la compañía 4, grupo «Suspensiones».
- **Resaltar:** «Asignación familiar en un mes entero sin goce» = «No pagarla en un mes entero en suspensión perfecta (TUO D.Leg. 728, art. 11)» y «Básica de un mes con suspensiones» = «Mes comercial: 30 − los días suspendidos».

## Se reutilizan del v2 sin cambio (verificado que la pantalla sigue siendo correcta)
c10_01_dias, c10_01_calculo, c10_01_contable, c10_05_boleta_sin_importes, c11_01 a c11_05, c12_01 a c12_04, c18_01,
c18_02, c19_02 a c19_08, c21_01 a c21_03, c22_01 a c22_04, c25_01 a c25_04, c26_01 a c26_04 y c09_04_compania_controles
(el grupo «Controles al validar la boleta» de FM sigue con los cinco controles: cuatro en «Avisar» y Vida Ley en «No
controlar», leído el 09/11/2026).

## Estado (09/11/2026)
Las 10 pedidas están tomadas con `scripts/capturas_g3_el_mes.js` (c18_04 en tres: a, b y c). Ninguna escribió nada.
