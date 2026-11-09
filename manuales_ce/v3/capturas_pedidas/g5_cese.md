# Capturas pedidas · g5_cese (capítulos 16 y 23)

Todas en contable19, compañía **4 · SOLSE Demo Servicios S.A.C.** (activa sola), usuario con Nómina / Administrador, idioma es_PE.
Las boletas están validadas («Hecho»); no hay que recalcular ni validar nada.

## Capítulo 16

### c16_02_indemnizacion_calculo (REHACER: cambiaron las cifras por el lote 32b)
- **Qué:** la liquidación de 70000351 «Trabajador INDEMNIZACION indeterminado», pestaña «Cálculo de la nómina».
- **Registro:** `hr.payslip` id 9597, estructura «Liquidación», periodo 01/04/2026–30/04/2026, contrato desde el 15/03/2022.
- **Debe verse:** VAC_TRUNCA_001 383,33 · GRATI_TRUNCA_001 2 000,00 · BONO_GRATI_TRUNCA_001 180,00 · CTS_TRUNCA_001 1 500,00 ·
  IND_001 18 575,00 · GROSS 22 638,33 · BAR5_001 2 563,33 · ONP_001 49,83 · ESSALUD_001 101,70 · NET 22 588,50; «Por pagar» 22 588,50.
- **Resaltar:** IND_001 18 575,00 y BAR5_001 2 563,33 (la indemnización no entra en la base de 5.ª).
- La del v2 decía 391,67 / 2 571,67 / 22 595,75: ya no vale.

### c16_04_opciones_cese (NUEVA)
- **Qué:** Ajustes › Usuarios y compañías › Compañías › «SOLSE Demo Servicios S.A.C.», pestaña **«Nómina PE - Controles»**.
- **Debe verse (una o dos capturas unidas, bajando):** los grupos «Liquidación por cese (N-15)» («Vacaciones ganadas y no gozadas al cese»:
  «Avisar: se registran con las entradas VAC_ADQ_001 e IND_VAC_001»), «Indemnización por despido arbitrario» (las seis opciones con sus
  valores por defecto: «Con las variables regulares», casilla del 1/6 desmarcada, «La mayor entre el art. 76 y la del régimen», «Por el
  art. 76, por analogía», «Desde el inicio del primer contrato», «El de cada modalidad y 5 años en conjunto»), «Conteo de meses y días»
  (las dos «De fecha a fecha…») y «Gratificaciones» («Completa…», «Hasta el mes anterior al cese…»).
- **Resaltar:** «Plazo máximo de los contratos modales» y «Vacaciones ganadas y no gozadas al cese».

### c16_05_hoja_liquidacion (NUEVA)
- **Qué:** el PDF «Hoja de liquidación de beneficios sociales (PE)» (Imprimir) de la liquidación de 70002402
  «Trabajador DOCUMENTOS_CESE despido».
- **Registro:** `hr.payslip` id 9768, periodo 01/08/2030–31/08/2030, cese el 31/08/2030, ingreso el 01/03/2028.
- **Debe verse:** la primera página con el vínculo (ingreso, cese, motivo, tiempo de servicios), los bloques de vacaciones truncas
  (1 500,00, con «(de fecha a fecha)»), vacaciones adquiridas no gozadas (dos récords, 6 000,00), indemnización vacacional 3 000,00 e
  indemnización por despido arbitrario 11 250,00 (art. 38, remuneración y tiempo); si cabe, el total y el neto 22 865,00.
- **Resaltar:** el bloque de la indemnización y el de los récords no gozados.
- **Ofuscar:** nada (datos sintéticos), pero revisar que el domicilio y el RUC del empleador sean los de la compañía demo.

### Se reutilizan sin cambio
- c16_01_carmen_liquidacion_calculo (las cifras siguen iguales: neto 3 331,89).
- c16_03_contrato_despido (70000352, fin pactado 31 ago.).

## Capítulo 23

### c23_04_descanso_medico (REHACER: ahora tiene la casilla del lote 28a)
- **Qué:** la ausencia de 70000801 «Trabajador SUBSIDIOS descanso», del 01/11/2026 al 30/11/2026, tipo «Tiempo personal por enfermedad».
- **Dónde:** Vacaciones › Gestión › Vacaciones, filtrar por el trabajador (quitar el filtro por defecto si no aparece), abrir la ausencia.
- **Debe verse:** el formulario con la casilla **«Accidente (común o de trabajo)»** (desmarcada) debajo del tipo.
- **Resaltar:** la casilla.

### c23_03_sin_derecho_aviso (NUEVA; reemplaza a c23_03_sin_derecho_nov_dias, cuyo pie del v2 era incorrecto)
- **Qué:** la boleta mensual de noviembre de 2026 de 70000805 «Trabajador SUBSIDIOS sin derecho».
- **Registro:** `hr.payslip` id 9625, «Nómina Mensual Empleados», 01/11/2026–30/11/2026.
- **Debe verse:** pestaña «Cálculo de la nómina» con RB_001 2 000,00, SUB_INC_001 1 000,00, ONP_001 260,00 y NET 2 740,00 y, abajo, el
  historial con la nota «Validada con avisos: … no cumple los aportes que dan derecho al subsidio por incapacidad … EsSalud no
  reembolsará el subsidio …».
- **Resaltar:** SUB_INC_001 y la nota del historial.

### c23_05_promedios_fijados (NUEVA)
- **Qué:** la ficha del empleado 70000802 «Trabajadora SUBSIDIOS días previos», pestaña **«Nómina PE»**, bajar hasta la sección
  **«Promedios fijados del subsidio»**.
- **Debe verse:** dos filas de incapacidad temporal: inicio 12/10/2026 y 01/11/2026, promedio 100,00 cada una, con la boleta que lo fijó.
- **Resaltar:** la sección completa.

### Se reutilizan sin cambio
- c23_01_descanso_nov_calculo (neto 2 740,00) y c23_02_maternidad_nov_calculo (3 000,00).
- Ya no se usa: c23_03_sin_derecho_nov_dias.
