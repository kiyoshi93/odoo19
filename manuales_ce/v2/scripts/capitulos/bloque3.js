// Manual v2, bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 21
  a(
    h1('21. Cambios de contrato dentro del mes'),
    p('En Odoo 19 cada cambio del contrato (sueldo, cargo, horario) es una **versión** del empleado con su **fecha efectiva**. La boleta del mes usa todas las versiones vigentes en el periodo: cada versión paga sus días (C-28, C-30) y los días y horas se cuentan una sola vez (C-33).'),
    h2('21.1 Aumento a mitad de mes'),
    pasos([
      'En la ficha del empleado, con la fecha del aumento, cree una versión nueva (botón de la fecha del contrato › **+**) o, desde el contrato, cambie el sueldo **con fecha efectiva** el día del aumento.',
      'Calcule la boleta del mes normalmente. La pestaña de días trabajados trae una línea por versión.',
    ]),
    ...figura('c21_03_versiones_del_contrato', 'Contratos del caso AUMENTO agrupados por trabajador: el aumento a mitad de mes tiene dos versiones (2 000 desde el 01/09 y 3 000 desde el 15/10).'),
    ...figura('c21_01_aumento_oct_dias', 'Octubre de 2026 del trabajador con aumento: «Días laborados» 10 días / 80 h con la versión del 1 de setiembre y 12 días / 96 h con la del 15 de octubre. Total 22 días / 176 h.'),
    p('Cada sueldo paga los días calendario en que rigió, con divisor 30, y el último tramo completa los 30 días del mes comercial: 2 000 / 30 × 14 + 3 000 / 30 × 16 = **2 533,33**.'),
    ...figura('c21_01_aumento_oct_calculo', 'Cálculo: remuneración básica 2 533,33, ONP 329,33, EsSalud 228,00 y neto 2 204,00.'),
    h2('21.2 Dos contratos en el mismo mes'),
    p('Si un contrato termina y empieza otro en el mismo mes (renovación con otro sueldo), la boleta también suma los dos: 11 días / 88 h con el primero y 11 días / 88 h con el segundo. Remuneración **2 500,00**; ONP 325,00; EsSalud 225,00; neto 2 175,00.'),
    ...figura('c21_02_dos_contratos_oct_dias', 'Octubre de 2026 con dos contratos: una línea de días por contrato.'),
    nota('Caso AUMENTO (66 celdas): los dos escenarios anteriores y una semana sin goce (capítulo 22). En el PLAME de octubre, el `.jor` declara **176 h** a cada uno (C-33); en el v1 se repetían días con dos versiones.', 'caso'),
    h2('21.3 Boletas sin versión'),
    p('Una boleta creada por importación o por código sin versión en la cabecera toma al calcular la versión vigente al final del periodo y calcula una sola vez (O-31). En el laboratorio, ninguna boleta queda sin versión: 0 de 137 medidas.'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-28, C-30, C-33, O-31'),
  );

  // ------------------------------------------------------------------ 22
  a(
    h1('22. Licencias sin goce, permisos por horas y meses sin remuneración'),
    p('El tipo de ausencia **Sin pagar** (código SINGOCE100, Tabla 21: 05) está marcado como «no pagado» en las estructuras mensual y semanal (C-31): sus días se descuentan de la remuneración y se declaran como suspensión. Ejemplos del ' + escenario.toLowerCase() + ', sueldo 2 500 y noviembre de 2026.'),
    ...figura('c22_04_ausencias_sin_goce', 'Las tres ausencias «Sin pagar» aprobadas: el 17/11 de 8:00 a 10:00 (2 horas), del 9 al 13/11 (40 horas) y todo noviembre (168 horas).'),
    h2('22.1 Una semana sin goce'),
    ...figura('c22_01_semana_sin_goce_dias', 'Días trabajados: «Sin pagar» −5 días / −40 h, sin marcar en «¿Pagado?».'),
    p('Remuneración = 2 500 / 30 × 25 = **2 083,33**. EsSalud **187,50** (9 % de la remuneración: con remuneración en el mes, el piso de la RMV no cambia nada). En el PLAME, el `.snl` declara `05|5`.'),
    h2('22.2 Permiso de dos horas'),
    p('Un permiso por horas descuenta la **fracción** del día: 2 horas = 0,25 día. Antes de C-31 descontaba un día entero.'),
    ...figura('c22_02_permiso_2_horas_calculo', 'Permiso de 2 horas: remuneración 2 479,17 (2 500 − 2 500 / 30 / 8 × 2), ONP 322,29, EsSalud 223,13 y neto 2 156,88.'),
    nota('Un permiso por horas no es un día entero de suspensión: no va al `.snl`.', 'nota'),
    h2('22.3 Un mes entero sin remuneración'),
    p('Si el trabajador no tiene remuneración en todo el mes, no corresponde aportar a EsSalud (C-32; SUNAT, Informe 003-2007-SUNAT/2B0000). La boleta queda **sin importes** y no se valida (C-18). El PLAME declara al trabajador en el `.jor` con 0 horas y en el `.snl` con `05|30`.'),
    ...figura('c22_03_mes_sin_goce_dias', 'Noviembre entero sin goce: «Sin pagar» −21 días / −168 h; la boleta no tiene importes.'),
    nota('Con días laborados en el mes, la base mínima de EsSalud sigue siendo la RMV (Informe 003-2007-SUNAT/2B0000, conclusión 1): un ingreso a fin de mes paga EsSalud sobre la RMV aunque su remuneración sea menor. Solo un mes **sin ninguna** remuneración no aporta.', 'importante'),
    nota('Caso AUMENTO: semana sin goce de 70000903 con `.snl` `05|5` y `.jor` 126 h; la trabajadora con todo noviembre sin goce no tiene mensual (sin importes) y su `.snl` declara `05|30`.', 'caso'),
    pieCapitulo(['base', 'ce'], 'C-09, C-31, C-32'),
  );

  // ------------------------------------------------------------------ 23
  a(
    h1('23. Subsidios: descanso médico y maternidad'),
    p('La versión 2 calcula los subsidios de EsSalud (N-01). El descanso se registra como **ausencia** del tipo que corresponde y la boleta lo reparte por la **Tabla 21**:'),
    tabla(['Código T21', 'Qué es', 'Tipo de ausencia', 'Quién paga'], [
      ['20', 'Incapacidad temporal: los primeros 20 días del año', 'Tiempo personal por enfermedad', 'El empleador (remuneración)'],
      ['21', 'Incapacidad temporal desde el día 21 (subsidio)', 'El mismo; la boleta separa los días', 'Subsidio de EsSalud: `SUB_INC_001`, PLAME 0916'],
      ['22', 'Maternidad: pre y post natal', 'Descanso por maternidad (pre y post natal)', 'Subsidio de EsSalud: `SUB_MAT_001`, PLAME 0915'],
    ], [1300, 3400, 2700, 2238]),
    p('El subsidio diario es el **promedio de las remuneraciones de los 12 meses anteriores** / 30. Los 20 días por año se cuentan por año calendario con las ausencias anteriores. El subsidio no paga ONP ni EsSalud; con AFP paga aporte y prima (categoría «Ingreso afecto AFP»).'),
    ...figura('c23_04_descanso_medico', 'Descanso médico de noviembre de 2026 (caso SUBSIDIOS): 21 días hábiles, del 1 al 30 de noviembre.'),
    h2('23.1 Descanso médico de 30 días'),
    ...figura('c23_01_descanso_nov_calculo', 'Caso SUBSIDIOS, noviembre: remuneración 2 000,00 por los 20 primeros días y subsidio por incapacidad 1 000,00 por los 10 siguientes (promedio diario 100,00); ONP 260,00 y EsSalud 180,00 sobre la remuneración; neto 2 740,00.'),
    tabla(['Trabajador (caso SUBSIDIOS)', 'Noviembre de 2026', 'Días T21', 'PLAME .rem'], [
      ['70000801 · descanso de 30 días', 'RB 2 000,00 · subsidio 1 000,00', '20|20 y 21|10', '0121 2 000,00 · 0916 1 000,00'],
      ['70000802 · 15 días en octubre y 30 en noviembre', 'RB 500,00 · subsidio 2 500,00', '20|5 y 21|25', '0121 500,00 · 0916 2 500,00'],
      ['70000803 · maternidad desde el 01/11', 'RB 0,00 · subsidio 3 000,00 (diciembre 3 100,00)', '22|30 (diciembre 22|31)', '0915 3 000,00'],
      ['70000804 · con AFP', 'RB 2 000,00 · subsidio 1 000,00; AFP 300,00 y prima 41,10', '20|20 y 21|10', 'AFPnet: asegurable 3 000,00'],
      ['70000805 · sin derecho', 'RB 2 000,00, sin subsidio y con aviso', '20|20 y 21|10', 'Solo 0121'],
    ], [2700, 3000, 1800, 2138]),
    ...figura('c23_02_maternidad_nov_calculo', 'Maternidad de noviembre: remuneración 0,00 y subsidio por maternidad 3 000,00, sin ONP ni EsSalud; neto 3 000,00.'),
    h2('23.2 Derecho al subsidio'),
    p('El subsidio exige **3 meses de aportes consecutivos o 4 no consecutivos** en los 6 meses calendario anteriores a la contingencia (en accidente basta la afiliación). La boleta lo comprueba con las boletas validadas. Lo que hace si falta lo decide la compañía con el control «Subsidio sin los aportes que dan derecho» (Avisar o Bloquear, capítulo 26).'),
    ...figura('c23_03_sin_derecho_nov_dias', 'Trabajador con un solo mes de aportes antes del descanso (caso SUBSIDIOS, 70000805): los días van como descanso, pero no se calcula subsidio.'),
    nota('En las boletas del caso, la línea de días del descanso médico se llama «Sick Time Off» con el código GLOBAL: es el nombre de la entrada de trabajo de Odoo, sin traducir (observación O-65). El cálculo y el `.snl` no se ven afectados.', 'nota'),
    nota('Caso SUBSIDIOS (344 celdas, 29 boletas): días por tipo de la Tabla 21, conceptos, `.snl` y `.rem` de noviembre de 2026 y de enero y febrero de 2027, promedio diario 100,00 y avisos de derecho.', 'caso'),
    nota('La vacacional no paga subsidios. La base de la prima de Vida Ley de un mes subsidiado está pendiente de confirmación (P-52).', 'limite'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'N-01, C-09'),
  );

  // ------------------------------------------------------------------ 24
  a(
    h1('24. Microempresa'),
    p('Un trabajador con régimen laboral **MICROEMPRESA** (T33) en su contrato no recibe gratificación ni CTS y tiene 15 días de vacaciones (`pe_regimen_factores` = 0,0 / 0 / 15). La compañía decide el régimen de salud y la asignación familiar (C-25), en **Nómina PE - Controles** (capítulo 9):'),
    tabla(['Opción de la compañía', 'Por defecto', 'Efecto medido (caso MICRO, junio de 2026, sueldo 1 500)'], [
      ['Microempresa: régimen de salud', '**SIS** (S/ 15 por trabajador)', 'Sin EsSalud y `SIS_MICRO_001` **15,00**. Con «EsSalud 9 %»: EsSalud **135,00**'],
      ['Microempresa: asignación familiar', '**No pagar**', 'Con un hijo: ASF **0,00**. Con «Pagar»: **113,00**'],
    ], [3000, 2100, 4538]),
    ...figura('c24_01_micro_jun_calculo', 'Trabajador de microempresa, junio de 2026: remuneración 1 500, ONP 195,00, SIS 15,00, SENATI 11,25, sin EsSalud; neto 1 305,00.'),
    p('El SIS se paga en el Banco de la Nación: no va al `.rem` del PLAME. En la planilla de sueldos sale en «Otros aportes». Si el trabajador tiene su propio **régimen de salud** (T32) en la ficha, ese manda: 21 = SIS microempresa.'),
    ...figura('c24_02_micro_liquidacion_calculo', 'Liquidación del trabajador de microempresa: vacaciones truncas 687,50 (15 días por año), sin gratificación ni CTS truncas; ONP 89,38; neto 598,12.'),
    nota('La CTS y la gratificación del trabajador de microempresa salen en 0,00 y no se validan: la localización avisa y ofrece eliminarlas (capítulo 10, C-18).', 'nota'),
    nota('Caso MICRO (83 celdas): régimen, factores, SIS 15,00, asignación familiar 0,00 por defecto y 113,00 con «Pagar», EsSalud 135,00 con «EsSalud 9 %», liquidación y el aviso de la CTS sin importes.', 'caso'),
    pieCapitulo(['ce', 'ce_demo'], 'C-25, C-18'),
  );

  // ------------------------------------------------------------------ 25
  a(
    h1('25. Rectificar una boleta'),
    p('Si una boleta validada tiene un error, no se edita: se **rectifica**. El botón **Rectificar** crea una boleta rectificativa (nota de crédito) con las líneas de la original y la valida; después se calcula y se valida la boleta correcta. Desde la versión 2 la rectificativa **resta** en todos los reportes (C-27): PLAME, AFPnet, pago a bancos, planilla y utilidades.'),
    p('Ejemplo del ' + escenario.toLowerCase() + ': la mensual de noviembre de 2026 se validó con sueldo 2 500 y el correcto era 2 700.'),
    pasos([
      'Abra la boleta validada y pulse **Rectificar**.',
      'Se crea «Rectificación: Boleta de …», marcada **Boleta rectificativa** y con el enlace a la **Boleta rectificada**. Queda validada con su asiento.',
      'Corrija el dato (aquí, el sueldo del contrato) y cree, calcule y valide la boleta nueva del mismo periodo.',
    ]),
    ...figura('c25_01_original_rectificar', 'Boleta original de noviembre (2 500): botón «Rectificar».'),
    ...figura('c25_02_rectificativa_calculo', 'Rectificativa: las mismas líneas de la original (remuneración 2 500,00, ONP 325,00, neto 2 175,00), marcada como boleta rectificativa.'),
    ...figura('c25_04_lista_boletas_rectificada', 'Las tres boletas del trabajador en noviembre: la original, la rectificativa y la nueva.'),
    tabla(['Reporte de noviembre de 2026', 'Resultado medido'], [
      ['PLAME `.rem`', 'Una sola línea: `01|70009104|0121|2700.00|2700.00|`'],
      ['PLAME `.jor`', '`01|70009104|168|0|0|0|` (una vez)'],
      ['Planilla de sueldos', 'Remuneración 2 700,00; ONP 351,00; neto 2 349,00'],
    ], [3200, 6438]),
    nota('Los controles de la compañía (capítulo 26) no bloquean una rectificativa. Rectificar una boleta del ejercicio cambia los acumulados de la renta de 5.ª: revise la 5.ª de los meses siguientes.', 'importante'),
    pieCapitulo(['base', 'ce'], 'C-27'),
  );

  // ------------------------------------------------------------------ 26
  a(
    h1('26. Avisos y controles'),
    p('La versión 2 avisa antes de que un error llegue a la boleta, al PLAME o a la contabilidad. Hay dos clases:'),
    vinetas([
      '**Bandas** (siempre activas): avisos amarillos en las listas de boletas y lotes y en el formulario de la boleta y del lote en borrador.',
      '**Controles al validar**, configurables por compañía en **Ajustes de la compañía › Nómina PE - Controles**: «Avisar» (banda y nota en el historial al validar), «Bloquear la validación» o «No controlar».',
    ]),
    tabla(['Aviso o control', 'Cuándo aparece', 'Dónde', 'Ítem / capítulo'], [
      ['RMA de AFP desactualizada o faltante', 'La RMA vigente a la fecha tiene más de 95 días o no existe', 'Banda', 'V-03 · 4'],
      ['UIT del año faltante', 'La UIT vigente es de un año anterior', 'Banda', 'V-03 · 4'],
      ['Feriados del año faltantes', 'Ningún feriado registrado en el año', 'Banda', 'V-05 · 18'],
      ['Vigencia faltante de un parámetro', 'Al calcular, una regla pide un parámetro sin vigencia a la fecha', 'Mensaje al calcular', 'V-02 · 4'],
      ['Sin contrato vigente', 'El periodo de la boleta no tiene contrato', 'Banda y advertencia', 'V-04'],
      ['Trabajador sin sistema pensionario', 'Sin ONP ni AFP y sin «No aporta pensión»', 'Control (Avisar)', 'V-04'],
      ['Gratificación y vacaciones de diciembre antes que la mensual', 'En diciembre, con la GRAT o la VAC del mes en borrador', 'Control (Avisar)', 'V-04 · 11'],
      ['Subsidio sin los aportes que dan derecho', 'Menos de 3 meses consecutivos o 4 no consecutivos', 'Control (Avisar)', 'N-01 · 23'],
      ['Boletas del año antes que la liquidación del cese', 'Boletas del año en borrador al liquidar', 'Control (Avisar)', 'N-04 · 16'],
      ['Trabajador sin póliza Vida Ley', 'Sin póliza vigente de su compañía', 'Control (No controlar por defecto)', 'N-05 · 6'],
      ['Boleta sin importes', 'Todas las líneas en 0,00', 'Mensaje al validar', 'C-18 · 10'],
    ], [2900, 3000, 1800, 1938]),
    ...figura('c09_04_compania_controles', 'Nómina PE - Controles: cada control con su opción. FM SYSTEMS tiene todos en «Avisar», salvo Vida Ley en «No controlar».'),
    h2('26.1 Ejemplos medidos'),
    ...figura('c26_04_sin_contrato_vigente', 'Boleta de octubre de un trabajador que ingresa el 25 de noviembre: «Sin contrato vigente en el periodo… la boleta no tendrá contrato, estructura ni días trabajados».'),
    ...figura('c26_02_sin_sistema_pensionario', 'Boleta nueva de un trabajador sin ONP ni AFP (escenario del manual): «… no tiene sistema pensionario (ONP o AFP): la boleta no calculará aportes de pensión. Regístrelo en su ficha … o marque «No aporta pensión» si corresponde».'),
    ...figura('c26_01_diciembre_grati_borrador_dias', 'Mensual de diciembre con la gratificación del mes en borrador (escenario del manual): «… está en borrador: valídela ANTES que esta boleta. En diciembre la renta de 5.ª ya no se corrige en otro mes».'),
    h3('Vigencia faltante (V-02)'),
    p('Si una regla pide un parámetro sin vigencia a la fecha de la boleta, el cálculo se detiene con un mensaje funcional. Medido con una boleta de diciembre de 2024 (antes de la primera vigencia):'),
    p('«Falta registrar «ONP - Tasa de aporte (D.L. 19990)» (pe_onp_tasa) vigente al 31/12/2024 (la primera vigencia registrada es desde el 01/01/2025). Regístrelo en Nómina › Nómina PE › Parámetros de Nómina PE. Boleta: …, regla ONP - Sistema Nacional de Pensiones (ONP_001).»'),
    ...figura('c26_03_vigencia_faltante', 'En el navegador, el mismo error se muestra como «¡Vaya! Ocurrió un error…»: el mensaje funcional queda al final de «Ver detalles técnicos» (hallazgo O-64).'),
    nota('Medido el 22/10/2026: por RPC el mensaje es el funcional, pero el cliente web no lo muestra como advertencia. La excepción `VigenciaFaltante` hereda de `UserError`, aunque el navegador la trata como un error de servidor y la muestra en el diálogo genérico. Mientras no se corrija (O-64, archivo de hallazgos), abra «Ver detalles técnicos» y lea la última línea: ahí está el parámetro que falta y la fecha.', 'importante'),
    pieCapitulo(['base', 'ce'], 'V-02, V-03, V-04, V-05'),
  );

  // ------------------------------------------------------------------ 27
  a(
    h1('27. Reportes y archivos legales'),
    p('Todas las salidas legales leen las **boletas validadas** del periodo (las rectificativas restan, capítulo 25) y se generan desde **Nómina › Nómina PE**.'),
    h2('27.1 Planilla de sueldos'),
    p('**Planilla de sueldos**: mes, año y «Incluir nómina semanal (obreros)». **Generar Excel** (o **Imprimir PDF**) produce `Planilla_<año>_<mes>.xlsx`, con una fila por trabajador: remuneración, asignación familiar, horas extra, otros ingresos, ONP, AFP, 5.ª, otros descuentos, neto, EsSalud y otros aportes (SENATI, SIS, Vida Ley).'),
    ...figura('c27_01_planilla_resultado', 'Planilla de noviembre de 2026 generada: Planilla_2026_11.xlsx.'),
    h2('27.2 PLAME (archivos del PDT 601)'),
    p('**PLAME (archivos PDT)** genera el ZIP con el `.rem` (ingresos y descuentos por concepto T22), el `.jor` (jornada), el `.snl` (suspensiones) y, con la casilla, el `.ps4` y el `.4ta` de recibos por honorarios. Las aportaciones (06xx y 08xx) las calcula el PDT y no se exportan, salvo los informativos como 0803 (Vida Ley).'),
    ...figura('c27_02_plame_resultado', 'PLAME de noviembre de 2026 de la compañía de laboratorio, con los escenarios del manual: 15 boletas, 13 trabajadores en el `.rem`, conceptos 0114, 0121, 0201, 0915 y 0916.'),
    tabla(['Archivo', 'Cambio de la versión 2', 'Ejemplo medido'], [
      ['`.rem`', 'Nuevos conceptos: 0915 (maternidad), 0916 (incapacidad), 0501 / 0503 (indemnización), 0928 (devolución de 5.ª), 0803 (Vida Ley). Tipo de documento de la ficha (T3)', '`01|70000801|0916|1000.00|1000.00|`'],
      ['`.jor`', '**6 campos**: ya no lleva «días» (C-24). Horas de la jornada cumplida', '`01|70000901|176|0|0|0|`'],
      ['`.snl`', 'Sale lleno: una línea por trabajador y tipo de suspensión de la Tabla 21 (C-09, N-01)', '`01|70000801|20|20|` · `01|70000801|21|10|`'],
    ], [1300, 5000, 3338]),
    nota('Caso PLAME (121 celdas): `.rem`, `.jor`, `.snl` y el anexo de 4.ª del ZIP de julio de 2026.', 'caso'),
    h2('27.3 AFPnet'),
    p('**AFPnet** genera el Excel de importación al portal (hoja TRABAJADOR) con los afiliados al SPP y su remuneración asegurable del mes. Julio de 2026 en el laboratorio: **6 trabajadores SPP**. Un subsidio con AFP suma a la remuneración asegurable (caso SUBSIDIOS: 3 000,00).'),
    ...figura('c27_03_afpnet_resultado', 'AFPnet de julio de 2026: AFPNET_2026_07.xlsx con 6 trabajadores del SPP.'),
    h2('27.4 Pago masivo a bancos'),
    p('**Pago masivo a bancos** genera el TXT de abono de **haberes** o de **CTS** para BCP (Telecrédito), Interbank o Scotiabank: mes, año, tipo, banco de cargo, cuenta de cargo de la empresa y fecha de pago. El resultado dice cuántos se abonan, el total y quiénes quedan **omitidos** y por qué.'),
    tabla(['Cambio', 'Qué hace ahora', 'Ítem'], [
      ['Banco por código SBS', 'Una cuenta del propio banco sale como abono propio (BCP «2A») y otra como interbancaria («2B», con CCI). El TXT de CTS del BCP ya no sale vacío', 'C-01'],
      ['Omitidos', 'Un trabajador sin cuenta, sin CCI o con CTS en otro banco no bloquea el archivo: queda fuera y se lista. «Modo estricto» vuelve a bloquear', 'C-08'],
      ['ASCII', 'Sin tildes ni Ñ (Ñañez → NANEZ) y con CRLF', 'C-12'],
      ['Scotiabank', 'Formato propio, con el aviso «formato sin validar» con el banco', 'C-13, N-06'],
      ['Totales exactos', 'Sin el sol de menos por redondeo', 'C-19'],
      ['CTS de otro banco', 'Por defecto se omite y se deposita con el archivo de ese banco; opción de abonar por CCI en Interbank', 'C-23'],
    ], [2200, 6000, 1438]),
    ...figura('c27_04_bcp_haberes_resultado', 'BCP haberes de mayo de 2026 (caso BANCOS): 4 abonados por S/ 7 918,00 y 1 omitido (sin cuenta sueldo) por S/ 1 566,00.'),
    ...figura('c27_05_interbank_cts_resultado', 'Interbank CTS de mayo de 2026: 1 abonado por S/ 833,33 y 4 omitidos (CTS en otro banco o sin cuenta CTS) por S/ 2 800,39.'),
    ...figura('c27_06_scotiabank_haberes_resultado', 'Scotiabank haberes: 3 abonados por S/ 6 003,88, 2 omitidos y el aviso «formato sin validar».'),
    nota('Caso BANCOS (407 celdas): cabeceras, registros, montos, omitidos y propiedades de los 6 archivos (BCP, Interbank y Scotiabank, haberes y CTS de mayo de 2026). Los archivos salen con CRLF y en ASCII.', 'caso'),
    nota('El formato de Scotiabank no está validado con la banca por internet del banco y no hay TXT del Banco de la Nación: los bancos entregan el formato al afiliar a la empresa (N-06, capítulo 31). Haga una carga de prueba antes del primer pago real.', 'limite'),
    pieCapitulo(['ce', 'ce_demo', 'plame_demo'], 'C-01, C-08, C-09, C-12, C-13, C-19, C-23, C-24, N-01, N-06'),
  );

  // ------------------------------------------------------------------ 28
  a(
    h1('28. Pago de la planilla, entrega de boletas y constancias'),
    h2('28.1 Registrar el pago'),
    p('Con el lote **validado**, **Registrar pago** (N-07) abre el asistente: diario de pago (banco), fecha, referencia (N.° de operación) y la lista de boletas con su importe **por pagar**. Al registrar se crea el asiento del pago, que concilia la 4111 de cada trabajador. Cada boleta queda pagada con su fecha, su asiento y su número de operación. Un segundo «Registrar pago» no vuelve a tomar las boletas pagadas.'),
    ...figura('c28_02_registrar_pago', 'Registrar pago del lote de noviembre de 2026 (escenario del manual): dos boletas por S/ 2 175,00 y S/ 2 610,00; total a pagar S/ 4 785,00.'),
    ...figura('c28_03_asiento_pago', 'Asiento del pago BNK1/2026/00001: debe 4111 de cada trabajador (2 175,00 y 2 610,00), haber banco 4 785,00; apuntes conciliados.'),
    ...figura('c28_04_boleta_pagada', 'Boleta pagada: fecha de pago 30/11, asiento del pago, N.° de operación OP-2026-11-30 y «Entregar hasta» 3 de diciembre.'),
    nota('Para que el pago concilie, las líneas 41x del asiento de la boleta llevan al trabajador como socio (capítulo 7). Medido: el saldo 41x de cada trabajador queda en 0,00 después del pago.', 'nota'),
    h2('28.2 Entrega de la boleta'),
    p('La boleta se entrega a más tardar el **tercer día hábil** después del pago (D.S. 001-98-TR): la boleta muestra la fecha límite en **Entregar hasta**. La entrega puede ser:'),
    vinetas([
      '**Física**: se imprime y el trabajador firma. Con **Confirmar recepción** se registra la fecha en que la recibió.',
      '**Por correo** (N-08): solo a los trabajadores con el **acuerdo de entrega electrónica** en su ficha (capítulo 8): «Boleta por correo», fecha del acuerdo y correo. **Enviar por correo** (en la boleta) o **Enviar boletas por correo** (en el lote) manda la boleta en PDF, y la liquidación del depósito si es de CTS, y deja la constancia en el historial. La respuesta del trabajador desde ese correo registra la recepción.',
    ]),
    ...figura('c28_05_enviar_boletas_sin_acuerdo', '«Enviar boletas por correo» pide confirmación: «Se enviará por correo a cada trabajador con acuerdo de entrega electrónica su boleta validada del lote que aún no se envió…». (Se canceló: los trabajadores del escenario no tienen acuerdo.)'),
    nota('El envío usa el servidor de correo saliente de la base. En la base de pruebas no se envió ningún correo: el manual no muestra el correo recibido. Los criterios del lote 8 lo midieron en una base local con correos ficticios.', 'nota'),
    h2('28.3 Constancias'),
    tabla(['Documento', 'Dónde', 'Capítulo'], [
      ['Boleta de pago (D.S. 001-98-TR)', 'Boleta › Imprimir › Boleta de Pago (PE)', '10'],
      ['Liquidación del depósito de CTS', 'Boleta de CTS › Imprimir › Liquidación de depósito de CTS (PE)', '15'],
      ['Certificado de rentas y retenciones de 5.ª', 'Nómina PE › Certificado de 5.ª categoría', '13'],
    ], [3600, 4500, 1538]),
    pieCapitulo(['ce'], 'N-07, N-08'),
  );

  // ------------------------------------------------------------------ 29
  a(
    h1('29. T-Registro'),
    p('**Nómina PE › T-Registro (carga masiva)** genera los archivos de la carga masiva del T-Registro con la estructura del **Manual del PVS T-Registro v2.22** (N-02). Hay cinco operaciones; cada una es un envío aparte:'),
    tabla(['Operación', 'Qué propone', 'Archivos', 'Se valida en'], [
      ['Altas', 'Los periodos laborales que **empiezan** en el rango', '`RP_<RUC>.ide`, `.tra`, `.per`, `.est`, `.cta`, `.edu` en un ZIP', 'PVS T-Registro, que arma el ZIP para SOL'],
      ['Bajas', 'Los que **terminan** en el rango, con su motivo', '`RP_<RUC>.per`', 'PVS'],
      ['Modificaciones', 'Un concepto por envío, desde la «fecha del cambio»', 'Los archivos del concepto', 'PVS'],
      ['Altas de derechohabientes', 'Los derechohabientes con **alta** en el rango (parentesco con código T19)', '`RD_<RUC>_<DDMMAAAA>_ALTA.TXT`', 'Directamente en SOL (no pasa por el PVS)'],
      ['Bajas de derechohabientes', 'Los que tienen **baja** en el rango', '`RD_<RUC>_<DDMMAAAA>_BAJA.TXT`', 'SOL'],
    ], [2100, 3000, 2600, 1938]),
    p('Plazos: el alta, el día del ingreso; la baja, al día siguiente del término; el alta de un derechohabiente, el día hábil siguiente a la fecha en que el trabajador lo comunicó.'),
    h2('29.1 Altas y bajas'),
    pasos([
      'Elija la **Operación** y el rango **Desde / Hasta**.',
      'El asistente propone a los trabajadores. Quite o agregue los que correspondan.',
      'Pulse **Generar archivos**. El resumen dice cuántos se exportan y cuántos no, con el motivo de cada uno.',
      'Descargue el ZIP, valídelo en el **PVS T-Registro** y súbalo a SOL desde el PVS.',
    ]),
    ...figura('c29_01_altas_resultado', 'Altas de octubre de 2026 (caso TREGISTRO): 4 exportados y 2 sin exportar; ide 4, tra 4, per 17, est 4, cta 2, edu 3.'),
    p('Antes de exportar, el asistente valida los datos que exige el PVS. Un trabajador incompleto **no se exporta** y el resumen dice qué le falta y con qué regla del manual del PVS. Por ejemplo, 70000805: «falta el tipo de trabajador (Tabla 8) en el contrato · faltan los apellidos y los nombres separados (EPE1.4 a EPE1.6) · falta la fecha de nacimiento · falta el sexo · falta el celular (9 dígitos que empiece en 9; EPR1.65) · falta un correo personal válido · falta el domicilio…».'),
    p('Las bajas de octubre: un solo archivo `RP_20603456786.per` con `01|70001505||1|1||15/10/2026|01||`, es decir, fin del periodo y motivo de baja 01.'),
    h2('29.2 Modificaciones'),
    p('Elija **Qué se modifica** y la **Fecha del cambio**: el valor anterior se cierra el día previo y el nuevo rige desde esa fecha. El tipo de trabajador y los datos del contrato se proponen solos (los trabajadores con una versión del contrato que empieza en esa fecha y cambia el dato); en los demás conceptos se eligen los trabajadores.'),
    ...figura('c29_03_modificacion_resultado', 'Modificación del tipo de trabajador con fecha del cambio 16/10/2026: 70001508 propuesto y 2 líneas en el `.per`.'),
    tabla(['Concepto', 'Archivos (caso TREGISTRO, 16/10/2026)'], [
      ['Tipo de trabajador', '`.per` 2: `01|70001508||1|2||15/10/2026|||` y `01|70001508||1|2|16/10/2026||21||`'],
      ['Datos del contrato', '`.tra` 1 (solo los campos que cambian), `.per` 1, `.cta` 1'],
      ['Cuenta de abono', '`.per` 1 y `.cta` 1 (`…|002|19187654321098|`)'],
      ['Régimen pensionario', '`.per` 3 (tipo de trabajador, cierre el 15/10 y nuevo régimen desde el 16/10) y `.tra` con el CUSPP'],
      ['Régimen de salud / EPS', '`.per` 3; el último `…|1|3|16/10/2026||01|2|`'],
      ['SCTR salud (Alta, Baja o Cambio de entidad)', '`.per` 2; el segundo `…|1|5|16/10/2026||1||`'],
      ['Establecimiento adicional', '`.est` 1 (`…|20603456786|0001|`)'],
      ['Situación educativa y estudios', '`.tra` 1, `.per` 1 y `.edu` 1'],
      ['Celular, correo y domicilio', '`.ide` 1 (41 campos, sin nombres ni sexo)'],
    ], [3200, 6438]),
    h2('29.3 Derechohabientes'),
    p('El registro de derechohabientes toma de la ficha (capítulo 8) el documento, los apellidos y nombres, el vínculo de la **Tabla 19**, la fecha de alta y el domicilio **del titular**. Exporta solo a quien tiene derecho: un hijo mayor de edad sin incapacidad permanente **no se exporta**.'),
    ...figura('c29_04_dh_altas_resultado', 'Altas de derechohabientes de octubre de 2026: 4 exportados en RD_20603456786_22102026_ALTA.TXT y 5 sin exportar (hijos de otros casos sin documento ni apellidos separados).'),
    tabla(['Derechohabiente (caso TREGISTRO)', 'Resultado'], [
      ['78001502 (hijo) y 40001502 (cónyuge) del titular 70001502', 'Exportados'],
      ['CD7654321, pasaporte con país 862, del titular 001234567', 'Exportado'],
      ['78001501 (hijo) del titular 70001501', 'Exportado'],
      ['71001502, hijo de 19 años', '«NO SE EXPORTA: hijo mayor de edad sin incapacidad permanente»'],
      ['40001510, cónyuge con baja el 15/10', 'No va en el alta; va en la **baja**: `01|70001510|01|40001510||04/04/1990|MENDOZA|SILVA|CARMEN|02|15/10/2026|04`'],
    ], [4600, 5038]),
    nota('Cada línea del TXT de altas tiene **46 campos** (45 separadores; el último campo va vacío). Los TXT de derechohabientes **no pasan por el PVS**: se suben en SOL (Mi RUC y Otros Registros › T-Registro › Registro de Derechohabientes › Carga masiva). No los suba con datos del laboratorio: una carga en SOL es un registro real.', 'importante'),
    nota('Caso TREGISTRO (262 celdas): altas, bajas, las 9 modificaciones y los derechohabientes. Las cifras de esta sección son las de la re-medición del lote 11 (22/10/2026).', 'caso'),
    nota('No cubre pensionistas, personal en formación, personal de terceros, el domicilio 2, borrar valores (por ejemplo el CUSPP al volver a la ONP) ni quitar establecimientos; tampoco la modificación masiva de derechohabientes. La prueba en el PVS v2.22 la hace el implementador con su versión del PVS (capítulo 31).', 'limite'),
    pieCapitulo(['ce', 'ce_demo'], 'N-02, U-04'),
  );

  return c;
};
