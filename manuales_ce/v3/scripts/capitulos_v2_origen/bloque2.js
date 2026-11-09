// Manual v2, bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19 el 2026-10-22: casos del laboratorio (SOLSE Demo) y recorrido de FM SYSTEMS.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 10
  a(
    h1('10. Boleta de pago individual'),
    p('La boleta se crea en **Nómina › Nóminas del empleado › Nuevo**. Este capítulo usa la boleta de diciembre de 2026 de la trabajadora del **caso BOLETA** (DNI 70000501, sueldo 4 500, AFP Integra y un hijo), calculada con las versiones de este manual.'),
    h2('10.1 Crear y calcular'),
    pasos([
      'Elija el **Empleado**. La boleta toma su contrato vigente y la **Estructura** del contrato (C-07).',
      'Elija el **Periodo**. Al cambiarlo se recalculan los días trabajados y el nombre: «Boleta de <trabajador> – <mes año>» (U-06).',
      'Revise la pestaña **Días trabajados y entradas** y agregue las **Otras entradas** del mes (horas extra, movilidad, tardanzas…: capítulo 20).',
      'Pulse **Calcular hoja**. Si la compañía tiene asistencias, **Cargar asistencias** concilia las marcaciones antes (capítulo 19).',
      'Revise **Cálculo de la nómina** y pulse **Confirmar** para validarla: se genera el asiento en el diario Planillas.',
    ]),
    ...figura('c10_04_boleta_nueva', 'Boleta nueva de diciembre de 2026 (sin guardar): estructura del contrato, nombre en español y días laborados 23 / 184 h. La banda avisa que la compañía de laboratorio no tiene feriados de 2026.'),
    p('Los botones cambian con el estado:'),
    tabla(['Estado', 'Botones', 'Para qué'], [
      ['Borrador', 'Confirmar · Calcular hoja · Cargar asistencias · Cancelar nómina', 'Calcular y validar'],
      ['Hecho', 'Rectificar · Cancelar nómina · **Enviar por correo** · **Confirmar recepción**', 'Boleta rectificativa (capítulo 25); envío y constancia de entrega (capítulo 28)'],
    ], [1600, 4800, 3238]),
    p('La boleta validada muestra además **Por pagar** (el neto pendiente), **Fecha de pago** y **N.° de operación**, que se llenan al registrar el pago (capítulo 28).'),
    h2('10.2 Días trabajados'),
    ...figura('c10_01_dias', 'Días trabajados de diciembre de 2026: «Días laborados (100 %)» 23 días y 184 horas, con «¿Pagado?» visible.'),
    p('La lista de días trabajados trae los días **hábiles** del calendario del contrato y sus horas, con una línea por tipo de ausencia. Desde la versión 2 tiene la columna **¿Pagado?** y lo que se marca se guarda (C-16). Cuando la estructura no paga una ausencia, por ejemplo las vacaciones en la mensual, la línea queda sin marcar.'),
    p('Los **días que se declaran** (boleta impresa y PLAME) siguen la norma (C-09): días calendario del periodo dentro del vínculo menos los días de suspensión. Los feriados y el descanso semanal **cuentan como laborados**. Las horas son las de la jornada cumplida. Por eso la boleta impresa de diciembre dice «Días laborados: 31 · Días no laborados: 0 · Horas: 184».'),
    h2('10.3 Cálculo'),
    ...figura('c10_01_calculo', 'Cálculo de la boleta de diciembre de 2026 (caso BOLETA): remuneración 4 500, asignación familiar 123, AFP, EsSalud, SENATI y neto 4 025,70.'),
    tabla(['Concepto', 'Código', 'Importe', 'Cómo se calcula'], [
      ['Remuneración básica', 'RB_001', '4 500,00', 'Sueldo del contrato'],
      ['Asignación familiar', 'ASF_001', '123,00', '10 % de la RMV vigente (1 230 desde octubre de 2026)'],
      ['**Total ingresos**', 'GROSS', '**4 623,00**', ''],
      ['AFP aporte', 'AFP_APO_001', '462,30', '10 % de 4 623,00'],
      ['AFP comisión (Integra, flujo)', 'AFP_COM_001', '71,66', '1,55 %'],
      ['AFP prima de seguro', 'AFP_PRI_001', '63,34', '1,37 % (hasta la RMA)'],
      ['**Neto a pagar**', 'NET', '**4 025,70**', '4 623,00 − 597,30'],
      ['EsSalud (empleador)', 'ESSALUD_001', '416,07', '9 %'],
      ['SENATI (empleador)', 'SENATI_001', '34,67', '0,75 %'],
    ], [3000, 1900, 1400, 3338]),
    nota('Caso BOLETA (166 celdas): las 6 boletas de la trabajadora 70000501 (agosto a diciembre de 2026 y la gratificación de diciembre) cuadran al centavo: ingresos − descuentos = neto, y la suma de las líneas impresas es igual al total.', 'caso'),
    h2('10.4 Boleta impresa (D.S. 001-98-TR)'),
    p('Desde la boleta, **Imprimir › Boleta de Pago (PE)**. Ahora cuadra al centavo con el asiento (C-05): se imprimen los importes redondeados de cada línea.'),
    ...figura('c10_02_boleta_impresa', 'Boleta de diciembre de 2026: días laborados 31, no laborados 0, horas 184; ingresos 4 623,00, descuentos 597,30, aportes del empleador 450,74 y neto 4 025,70.'),
    h2('10.5 Asiento contable'),
    ...figura('c10_01_contable', 'Información contable: diario Planillas y asiento PLLA/2026/12/0022.'),
    ...figura('c10_03_asiento', 'Asiento PLLA/2026/12/0022: 5 671,04 al debe y al haber. El trabajador figura como socio en las líneas de la cuenta 4111.'),
    p('El asiento suma **5 671,04**: remuneraciones 4 623,00 (6211 / 4111), descuentos 597,30 (4111 / 4170), EsSalud 416,07 (6271 / 4031) y SENATI 34,67 (6277 / 4033). El saldo de la 4111 del trabajador es **4 025,70**, igual al neto.'),
    h2('10.6 Una boleta sin importes no se valida'),
    p('Una boleta en la que todas las líneas salen en 0,00 no tiene nada que pagar ni que contabilizar: por ejemplo, la CTS o la gratificación de un trabajador de microempresa. Al confirmarla, la localización lo explica y ofrece **Eliminar la boleta sin importes** (C-18). Desde un lote, el aviso lista todas las vacías y el botón las elimina y valida el resto.'),
    ...figura('c10_05_boleta_sin_importes', 'CTS de noviembre de 2026 del trabajador del caso MICRO: «La boleta no tiene importes… no se valida», con el botón para eliminarla. (Se cerró sin eliminar.)'),
    nota('Las 64 boletas del recorrido de FM SYSTEMS (enero de 2025 a diciembre de 2026) se regeneraron el 22/10/2026 con las versiones finales: se cancelaron, se recalcularon con los días, el nombre y el diario que pone hoy el formulario y se volvieron a validar, mes por mes. Ningún importe cambió (la renta de 5.ª de Lucía sigue en 2 309,73 en 2025 y 2 160,78 en 2026). Cambiaron los nombres (U-06), el diario (Planillas, C-06) y la marca «¿Pagado?» de las vacaciones en la mensual (C-16). Detalle en el Anexo C.', 'implementador'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-05, C-07, C-09, C-16, C-18, U-06, N-07, N-08'),
  );

  // ------------------------------------------------------------------ 11
  a(
    h1('11. Lote mensual y orden del proceso'),
    p('**Nómina › Procesamientos de nóminas** agrupa las boletas de un periodo. El lote nace con el diario **Planillas** (C-06).'),
    ...figura('c11_01_lotes', 'Lista de lotes.'),
    h2('11.1 Generar el lote'),
    pasos([
      '**Nuevo**: nombre y periodo. El diario Planillas viene por defecto.',
      'Guarde y pulse **Generar nóminas**. En el asistente, **Agregar una línea** para elegir a los trabajadores y pulse **Generar**.',
      'El lote crea una boleta por trabajador, con la estructura de su contrato, y las calcula.',
      'Revise las boletas y valide con **Marcar como hecho**, que confirma todas las boletas del lote.',
    ]),
    ...figura('c11_03_lote_nuevo', 'Lote nuevo de noviembre de 2026 en la compañía de laboratorio.'),
    ...figura('c11_04_generar_nominas', 'Asistente «Generar nóminas» con el trabajador elegido.'),
    ...figura('c11_05_lote_generado', 'Lote con la boleta generada: «Boleta de Trabajador HORAS EXTRA (manual v2) – noviembre 2026», en borrador.'),
    nota('El lote **no vuelve a calcular ni a contabilizar las boletas ya validadas** (C-17). Antes, generar o marcar como hecho un lote con boletas validadas las recalculaba y duplicaba su asiento. Las boletas que el lote nunca calculó se calculan antes de validar.', 'importante'),
    ...figura('c11_02_lote_diciembre_fm', 'Lote «Planilla diciembre 2026» de FM SYSTEMS, en estado Hecho, con los botones «Registrar pago» y «Enviar boletas por correo» (capítulo 28). La boleta lleva el nombre en español de U-06 («Boleta de … – diciembre 2026»).'),
    h2('11.2 Orden del mes'),
    p('Los acumulados leen boletas **validadas** (1.2). El orden es:'),
    pasos([
      '**Adelanto quincenal** (NQA), si lo hay: la mensual lo descuenta.',
      '**Gratificación** (julio y diciembre), **CTS** (mayo y noviembre) y **vacaciones** del mes.',
      '**Mensual** (NME) y **semanales** (NSO). La renta de 5.ª de la mensual cuenta la gratificación y las vacaciones ya validadas.',
      'Si hay un cese: las boletas del año antes que la **liquidación** (capítulo 16).',
    ]),
    nota('En diciembre no queda mes para corregir la renta de 5.ª. Por eso la compañía tiene el control «Gratificación y vacaciones de diciembre antes que la mensual» (V-04): con «Avisar», la mensual de diciembre muestra una banda si la gratificación o las vacaciones del mes siguen en borrador; con «Bloquear», no deja validarla. Los controles están en el capítulo 26.', 'importante'),
    pieCapitulo(['base', 'ce'], 'C-06, C-17, V-04, N-07, N-08'),
  );

  // ------------------------------------------------------------------ 12
  a(
    h1('12. Aportes y retenciones'),
    p('Las cifras de este capítulo son del **caso NOMINA** (planilla de julio de 2026, 525 celdas al 100 %) y del **caso VIDALEY**.'),
    tabla(['Concepto', 'Regla', 'Base y tasa', 'Ejemplo medido'], [
      ['ONP', 'ONP_001', '13 % de la base afecta', 'Jorge, sueldo 1 130: **146,90**'],
      ['AFP aporte', 'AFP_APO_001', '10 %', 'Carlos, base 3 613: **361,30**'],
      ['AFP comisión sobre flujo', 'AFP_COM_001', 'Tasa de su AFP (Habitat 1,47 %)', 'Carlos: **53,11**. Con comisión **mixta**: 0,00 (María)'],
      ['AFP prima de seguro', 'AFP_PRI_001', '1,37 % con tope en la RMA **del mes**', 'Carlos: **49,50**. Ana, sueldo 15 000: **173,62** (topeada en la RMA 12 672,65 de julio–setiembre)'],
      ['EsSalud', 'ESSALUD_001', '9 % con base mínima de la RMV **del mes**', 'Carlos: **325,17**'],
      ['EPS: aporte y crédito', 'EPS_APO_001 / EPS_CRED_001', 'Tasa del plan; crédito contra EsSalud hasta 25 %', 'Carlos: **162,59** y **−81,29**'],
      ['SENATI', 'SENATI_001', '0,75 % (si la compañía está afecta)', 'Carlos: **27,10**'],
      ['SCTR salud', 'SCTR_SAL_001', 'Tasa de la póliza', 'Rosa (semanal): **5,46**'],
      ['Vida Ley (empleador)', 'VIDA_001', 'Tasa de la póliza con tope de la RMA', 'Caso VIDALEY, sueldo 3 000 al 0,53 %: **15,90**'],
      ['SIS de la microempresa', 'SIS_MICRO_001', 'S/ 15 por trabajador', 'Capítulo 24'],
    ], [2100, 2100, 2700, 2738]),
    ...figura('c12_01_carlos_calculo', 'Carlos, julio de 2026 (caso NOMINA): AFP Habitat, EsSalud, EPS con su crédito, SENATI y neto 3 149,09.'),
    ...figura('c12_02_ana_calculo', 'Ana, sueldo 15 000 (caso NOMINA): la prima de seguro AFP se topa en la RMA y sale 173,62; renta de 5.ª 1 267,25 en dos tramos; neto 11 838,63.'),
    h2('12.1 Topes y bases del mes'),
    p('La base mínima de EsSalud (la RMV) y el tope de la prima AFP (la RMA) se aplican **al total del mes**, no a cada boleta (C-26). Cuando en el mes hay mensual y vacacional, la segunda boleta paga lo que falta para llegar al importe del mes.'),
    ...figura('c12_03_nilda_vac_calculo', 'Nilda (caso NOMINA), vacaciones todo julio: la vacacional de 3 000 paga EsSalud 270,00, que es el 9 % del mes. La mensual queda sin importes y no se valida (C-18).'),
    nota('Caso NOMINA: «ESSALUD_001 del mes» de Nilda y de Óscar = **270,00**. Óscar, con 11 días de goce, paga 135,00 en la vacacional y 135,00 en la mensual. Antes de C-26, Nilda pagaba 371,70: 270,00 en la vacacional más 101,70 de base mínima en una mensual en cero.', 'caso'),
    h2('12.2 La tardanza reduce la base'),
    p('El descuento por tardanza (`TARD_001`) es un «Descuento que reduce la base afecta» (C-10): la base de ONP, AFP, EsSalud y renta de 5.ª es el total de ingresos afectos **menos la tardanza**. En el ejemplo del capítulo 20, 45 minutos (7,50) bajan la base de 2 537,00 a 2 529,50.'),
    h2('12.3 Prima de Vida Ley'),
    ...figura('c12_04_vidaley_calculo', 'Caso VIDALEY, junio de 2026: «Seguro Vida Ley (aporte del empleador)» 15,90 con sueldo 3 000 y tasa 0,53 %. El neto no cambia: 2 610,00.'),
    tabla(['Escenario del caso VIDALEY', 'Prima'], [
      ['Tasa 0,53 %, sueldo 3 000', '15,90'],
      ['Sueldo 15 000 (tope de la RMA)', '66,77'],
      ['Importe fijo de la póliza', '25,00 una vez al mes'],
      ['Póliza vencida', 'Sin prima y con aviso'],
      ['Semanal, cuatro semanas', '14,84 en el mes'],
      ['Vacacional de 7 500 y mensual de 15 000', '39,75 en la vacacional; 66,77 en el mes'],
    ], [6000, 3638]),
    p('La prima va al PLAME en el concepto **0803** (informativo) y al asiento en **6274 / 4699**. Las gratificaciones, las utilidades, los subsidios y las vacaciones truncas no son base.'),
    pieCapitulo(['ce'], 'C-10, C-26, C-32, N-05'),
  );

  // ------------------------------------------------------------------ 13
  a(
    h1('13. Renta de 5.ª categoría'),
    p('La regla `R5TA_001` proyecta la renta anual del trabajador y retiene la parte del mes:'),
    pasos([
      'Renta proyectada = remuneraciones del año ya validadas + sueldo del mes × meses que faltan + gratificaciones de julio y diciembre proyectadas, **con la asignación familiar** (C-03).',
      'Menos 7 UIT (37 450 en 2025; 38 500 en 2026).',
      'Impuesto anual con los tramos (8 %, 14 %, 17 %, 20 % y 30 %).',
      'Menos lo ya retenido en el año, dividido entre el divisor del mes (12 en enero a marzo, 9 en abril, 8 en mayo a julio, 5 en agosto, 4 en setiembre a noviembre; en diciembre, el saldo).',
    ]),
    ...figura('c13_01_lucia_ene2025_calculo', 'Lucía, enero de 2025: base afecta 4 613,00 y retención de 5.ª 192,48.'),
    h2('13.1 Retenciones medidas de Lucía'),
    tabla(['Año', 'Retención mensual', 'Total del año'], [
      ['2025', '192,48 (enero a julio), 192,47 (agosto a noviembre), 192,49 (diciembre)', '**2 309,73**'],
      ['2026', '179,42 (enero), 183,73 (febrero, mes de vacaciones), 179,79 (marzo), 179,39 a 179,40 (abril a setiembre), 180,21 (octubre y noviembre), 181,04 (diciembre)', '**2 160,78**'],
    ], [900, 6500, 2238]),
    p('Desde octubre de 2026 la asignación familiar es 123 (RMV 1 230) y la retención sube a 180,21. En febrero de 2026, el mes de vacaciones, la 5.ª se calcula en la mensual sumando la vacacional ya validada (C-11).'),
    h2('13.2 Certificado de 5.ª categoría'),
    p('**Nómina PE › Certificado de 5.ª categoría** imprime el certificado anual de rentas y retenciones (R.S. 010-2006/SUNAT, art. 2) de los trabajadores elegidos. Si no se elige ninguno, se imprimen todos los que tuvieron renta de 5.ª en el ejercicio. Opción **Por duplicado** (N-08).'),
    ...figura('c13_03_certificado_asistente', 'Asistente del certificado: compañía, ejercicio (por defecto, el año anterior), trabajadores y duplicado.'),
    ...figura('c13_04_certificado_renta5_lucia_2025', 'Certificado de Lucía, ejercicio 2025: renta bruta 65 412,34; deducción de 7 UIT 37 450,00; renta neta 27 962,34; impuesto y retención 2 309,73.'),
    nota('El certificado lo firma el representante del empleador: el empleado marcado **Firma como empleador** (capítulo 8). Si la compañía no tiene ninguno, el asistente no imprime y lo dice («… no tiene representante del empleador: marque «Empleador» en la ficha de quien firma el certificado»). FM SYSTEMS no tiene representante: la figura es la vista previa del informe, con el texto de reemplazo en lugar del nombre. Márquelo antes de imprimir.', 'importante'),
    h2('13.3 Regularización al cese y devolución'),
    p('La liquidación del cese ajusta la renta de 5.ª de todo el ejercicio con las boletas validadas (N-04). Si el trabajador retuvo de más, la liquidación le **devuelve** el exceso (`DEV5_001`, PLAME 0928). Si retuvo de menos, retiene la diferencia.'),
    ...figura('c13_02_cese_devolucion_calculo', 'Caso CESE, liquidación de abril de 2026: devolución de retención 2 158,67 y neto 13 132,00.'),
    tabla(['Trabajador del caso CESE', 'Qué pasa', 'Cifra'], [
      ['70004501 (devolución)', 'Retuvo 736,80 en enero, febrero y marzo; cesa el 30/04', 'Liquidación: R5TA 0,00 y **DEV5 2 158,67**; PLAME de abril 0928 2 158,67'],
      ['70004502 (retención)', 'Utilidades de 50 000 en marzo', 'Mensual de marzo: R5TA **1 586,14**; liquidación R5TA **190,80**'],
      ['70004503 (renovación)', 'Renueva el contrato sin interrupción', 'No hay cese ni ajuste'],
      ['70004504 (reingreso)', 'Cesa en febrero y reingresa en abril', 'Devolución 736,80 en febrero; abril R5TA 856,09'],
      ['70004505 (orden invertido)', 'Liquidación validada antes que la mensual de marzo', 'DEV5 5 257,17 y nota «rectifíquela» en la mensual'],
    ], [2600, 3800, 3238]),
    nota('Caso CESE (149 celdas): las cifras de la tabla, el ajuste final en 0,00 después de la devolución y el asiento de la liquidación con 2 158,67 al debe de la 40173.', 'caso'),
    pieCapitulo(['base', 'ce'], 'C-03, C-11, N-04, N-08'),
  );

  // ------------------------------------------------------------------ 14
  a(
    h1('14. Gratificaciones'),
    p('La estructura **GRAT** paga la gratificación de julio y diciembre: un sexto por mes completo del semestre, sobre la remuneración computable (sueldo + asignación familiar), más la **bonificación extraordinaria** (Ley 30334): 9 % (EsSalud) o 6,75 % (EPS). La pequeña empresa paga la mitad (factor 0,5) y la microempresa no paga gratificación.'),
    ...figura('c14_01_lucia_grati_jul2026_calculo', 'Lucía, gratificación de julio de 2026: 4 613,00 + bonificación 415,17 = 5 028,17.'),
    tabla(['Trabajador', 'Periodo', 'Gratificación', 'Bonificación', 'Neto', 'Fuente'], [
      ['Lucía (4 500 + AF)', 'Julio 2026', '4 613,00', '415,17 (9 %)', '5 028,17', 'FM'],
      ['Lucía', 'Diciembre 2026', '4 623,00 (AF 123)', '416,07', '5 039,07', 'FM'],
      ['Héctor (2 200), ingresó el 01/03/2025', 'Julio 2025', '1 466,67 (4/6)', '132,00', '1 598,67', 'FM'],
      ['María (8 000)', 'Julio 2026', '8 000,00', '720,00', '', 'NOMINA'],
      ['Carlos (EPS)', 'Julio 2026', '', '243,88 (6,75 %)', '', 'NOMINA'],
      ['José (pequeña empresa)', 'Julio 2026', '750,00 (factor 0,5)', '', '', 'NOMINA'],
    ], [2700, 1300, 1700, 1500, 1100, 1338]),
    h2('14.1 Una sola vez por semestre y contrato'),
    p('El semestre se paga **una sola vez** por contrato (C-34, Ley 27735): con la gratificación ordinaria validada, la liquidación no paga la trunca de ese semestre (trunca y bonificación 0,00, con aviso); y con la trunca validada, la ordinaria sale en 0,00. El orden no importa: vale en los dos sentidos. La entrada `GRATI_TRUNCA_001` fija el importe, también en 0.'),
    nota('Caso NOMINA: Carmen cobra la ordinaria de julio (2 500,00 + 225,00) y cesa el 31/08. La liquidación de agosto paga la gratificación trunca de 2/6 (julio y agosto): 833,33 + bonificación 75,00. Ninguna de las 14 liquidaciones del laboratorio repite el semestre ya pagado.', 'caso'),
    pieCapitulo(['ce'], 'C-34'),
  );

  // ------------------------------------------------------------------ 15
  a(
    h1('15. CTS'),
    p('La estructura **CTS** calcula el depósito de mayo (noviembre–abril) y noviembre (mayo–octubre): remuneración computable (sueldo + asignación familiar + 1/6 de la gratificación validada del semestre) × meses del periodo / 12. La pequeña empresa deposita 15 días por año (factor del parámetro `pe_regimen_factores`) y la microempresa no deposita.'),
    ...figura('c15_01_lucia_cts_nov2026_calculo', 'Lucía, CTS de noviembre de 2026: 2 695,92.'),
    tabla(['Trabajador', 'Mayo 2025', 'Noviembre 2025', 'Mayo 2026', 'Noviembre 2026'], [
      ['Lucía', '1 537,67', '2 690,92', '2 690,92', '2 695,92'],
      ['Héctor', '366,67', '1 222,22', '1 283,33', '1 283,33'],
    ], [2200, 1850, 1850, 1850, 1888]),
    h2('15.1 Liquidación del depósito de CTS'),
    p('Desde la boleta de CTS, **Imprimir › Liquidación de depósito de CTS (PE)** entrega al trabajador el detalle del depósito: remuneración computable, periodo, tiempo computable, entidad, cuenta y monto (N-08). También se envía por correo con la boleta (capítulo 28).'),
    ...figura('c15_02_liquidacion_deposito_cts', 'Liquidación del depósito de noviembre de 2026 de Lucía: remuneración computable 5 391,83 (4 500 + 123 + 1/6 de gratificación 768,83), periodo 01/05/2026–31/10/2026 (6 meses), Banco de Crédito, monto depositado 2 695,92.'),
    p('Los TXT de CTS para el banco están en el capítulo 27. La CTS de un trabajador cuya cuenta CTS es de **otro banco** ya no se abona por CCI en el archivo de Interbank: por defecto va a «Omitidos» y se deposita con el archivo del banco de su cuenta (C-23, opción de la compañía).'),
    pieCapitulo(['ce'], 'C-01, C-23, N-08'),
  );

  // ------------------------------------------------------------------ 16
  a(
    h1('16. Liquidación por cese'),
    p('Para cesar a un trabajador, ponga en el contrato la **fecha de fin** y el **motivo de baja** (T17). La liquidación (estructura **LIQ**) calcula las vacaciones, la gratificación y la CTS truncas, la indemnización si corresponde y el ajuste de la renta de 5.ª.'),
    ...figura('c16_03_contrato_despido', 'Contrato de la trabajadora modal del caso INDEMNIZACION: motivo de baja [03] DESPIDO O DESTITUCIÓN, «Despido arbitrario (se indemniza)» marcado y «Fin pactado del contrato modal» 31 ago.'),
    h2('16.1 Truncas con aportes'),
    p('Las **vacaciones truncas** son remunerativas: pagan ONP o AFP y EsSalud (C-20). La gratificación trunca y su bonificación, la CTS trunca y la indemnización no pagan aportes.'),
    ...figura('c16_01_carmen_liquidacion_calculo', 'Liquidación de Carmen (caso NOMINA), cese el 31/08/2026: vacaciones truncas 1 666,67 con AFP y EsSalud, gratificación trunca 833,33, bonificación 75,00, CTS trunca 972,22 y neto 3 331,89.'),
    tabla(['Concepto', 'Cálculo', 'Importe'], [
      ['Vacaciones truncas', '8/12 de 2 500', '1 666,67'],
      ['Gratificación trunca', '2/6 (julio y agosto)', '833,33'],
      ['Bonificación sobre la trunca', '9 %', '75,00'],
      ['CTS trunca', '4/12, con el sexto de gratificación sin la bonificación', '972,22'],
      ['AFP (aporte, comisión, prima)', 'Sobre las vacaciones truncas', '166,67 · 25,83 · 22,83'],
      ['EsSalud', '9 % de las vacaciones truncas', '150,00'],
      ['**Neto**', '', '**3 331,89**'],
    ], [3200, 4200, 2238]),
    h2('16.2 Indemnización por despido arbitrario'),
    p('Marque **Despido arbitrario (se indemniza)** en el contrato (N-03). La liquidación paga la indemnización del art. 38 del D.S. 003-97-TR: en plazo indeterminado, 1,5 remuneraciones por año completo y la parte proporcional, con tope de 12 remuneraciones; en la micro y la pequeña empresa, 10 o 20 remuneraciones diarias por año, con tope de 90 o 120 (`IND_001`, PLAME 0501). Se cuenta desde el inicio del vínculo continuo y solo si se superó el periodo de prueba. En un contrato **modal**, si se resuelve antes del **Fin pactado**, se paga 1,5 remuneraciones por cada mes que falta, con el mismo tope (`IND_MOD_001`, PLAME 0503). La indemnización no paga aportes ni entra en la base de la renta de 5.ª, y se asienta en la 623.'),
    ...figura('c16_02_indemnizacion_calculo', 'Caso INDEMNIZACION, plazo indeterminado: indemnización 18 575,00 sumada a las truncas; la base de 5.ª solo son las truncas (2 571,67); neto 22 595,75.'),
    tabla(['Trabajador del caso', 'Situación', 'Indemnización'], [
      ['70000351', 'Plazo indeterminado', 'IND_001 **18 575,00**'],
      ['70000352', 'Contrato modal resuelto antes del fin pactado', 'IND_MOD_001 **18 000,00**'],
      ['70000353', 'Pequeña empresa', 'IND_001 **4 083,33**'],
      ['70000354', 'En periodo de prueba', 'Sin indemnización y con aviso'],
      ['70000357 / 70000358', 'Tope de 12 remuneraciones', 'IND_001 **18 750,00** / **37 356,00**'],
    ], [2400, 4400, 2838]),
    nota('Caso INDEMNIZACION (63 celdas): las 8 liquidaciones validadas, el PLAME con 0501 / 0503 y el asiento de 70000351 con 18 575,00 al debe de la 623.', 'caso'),
    p('La **renta de 5.ª del cese** (ajuste y devolución) está en el 13.3. Si la compañía tiene el control «Boletas del año antes que la liquidación del cese» en «Avisar», la liquidación avisa si quedan boletas del año en borrador (capítulo 26).'),
    pieCapitulo(['base', 'ce'], 'C-20, C-34, N-03, N-04'),
  );

  // ------------------------------------------------------------------ 17
  a(
    h1('17. Vacaciones'),
    p('Las vacaciones se devengan como **asignaciones** del tipo **Vacaciones PE (D.Leg. 713)** (2,5 días por mes en el régimen general) y se gozan con una **ausencia** aprobada del mismo tipo.'),
    ...figura('c17_03_asignaciones', 'Asignaciones de FM SYSTEMS: Lucía 52,5 días (21 meses) y Héctor 47,5 días (19 meses).'),
    ...figura('c17_04_ausencias', 'Ausencias aprobadas: Lucía del 2 al 16 de febrero de 2026 (11 días hábiles) y Héctor del 14 al 23 de setiembre de 2026 (8 días hábiles).'),
    h2('17.1 Tipos de ausencia y Tabla 21'),
    p('Cada tipo de ausencia tiene su **Tipo de suspensión (Tabla 21)** (C-09). Con ese código, la boleta descuenta los días declarados y el PLAME los lleva al `.snl`. Por defecto: Vacaciones PE 23, «Sin pagar» 05, Enfermedad 20, Días compensatorios 27 y Maternidad 22.'),
    ...figura('c17_05_tipos_ausencia_tabla21', 'Tipos de ausencia con su código de la Tabla 21.'),
    h2('17.2 Boleta de vacaciones y mensual del mes'),
    p('En el mes de goce se calculan dos boletas: la **vacacional** (estructura VAC) por los días de goce y la **mensual** por el resto. Ejemplo del caso NOMINA: Óscar (sueldo 3 000) goza del 1 al 15 de julio de 2026.'),
    ...figura('c17_06_oscar_vac_jul2026_dias', 'Vacacional de Óscar: «Vacaciones PE» −11 días / −88 h pagada.'),
    ...figura('c17_07_oscar_nme_jul2026_dias', 'Mensual de Óscar: la misma línea de vacaciones, **no pagada** (¿Pagado? sin marcar, C-16).'),
    tabla(['Boleta', 'Remuneración', 'ONP', 'EsSalud', 'Neto'], [
      ['Vacacional (1–15 jul.)', 'VAC_001 1 500,00', '195,00', '135,00', '1 305,00'],
      ['Mensual (16–31 jul.)', 'RB_001 1 500,00', '195,00', '135,00', '1 305,00'],
      ['**Mes**', '**3 000,00**', '**390,00**', '**270,00**', ''],
    ], [2600, 2200, 1400, 1400, 2038]),
    p('En el recorrido de FM, Lucía goza 15 días en febrero de 2026: vacacional **2 306,50** ((4 500 + 113) / 30 × 15) y mensual con remuneración 2 250,00 y asignación familiar 113,00 completa. La asignación familiar del mes de goce parcial va completa en la mensual y proporcional en la vacacional: según la contadora es correcto (C-04, P-19). Total del mes: 4 669,50.'),
    ...figura('c17_01_lucia_vac_feb2026_calculo', 'Lucía, vacacional de febrero de 2026: 2 306,50 con AFP, EsSalud y SENATI; neto 2 008,50.'),
    ...figura('c17_02_lucia_nme_feb2026_calculo', 'Lucía, mensual de febrero de 2026: remuneración 2 250,00, asignación familiar 113,00 y renta de 5.ª del mes de vacaciones 183,73 (C-11).'),
    ...figura('c17_02_lucia_nme_feb2026_dias', 'Mensual de Lucía, febrero de 2026: «Vacaciones PE (D.Leg. 713)» −11 días sin «¿Pagado?» (C-16), igual que la de Óscar.'),
    nota('Un mes **entero** de goce deja la mensual sin importes, porque EsSalud y la prima ya se pagaron en la vacacional (C-26). Esa mensual no se valida: elimínela (C-18). Caso NOMINA: Nilda, 1 al 30 de julio.', 'nota'),
    pieCapitulo(['base', 'ce'], 'C-04, C-09, C-11, C-16, C-26'),
  );

  // ------------------------------------------------------------------ 18
  a(
    h1('18. Feriados'),
    p('Los feriados nacionales se registran cada año en **Vacaciones › Configuración › Días festivos**, sin recurso (valen para toda la compañía). En FM SYSTEMS están los 16 feriados de 2025 y los 16 de 2026.'),
    ...figura('c18_01_dias_festivos', 'Días festivos de 2026 de FM SYSTEMS (filtro «Periodo: 2026»).'),
    h2('18.1 Efecto en la boleta y en el PLAME'),
    vinetas([
      'Los feriados **no descuentan**: el feriado es descanso remunerado (D.Leg. 713) y el sueldo mensual no cambia.',
      'Los **días laborados** declarados incluyen los feriados (C-09): diciembre de 2026 completo = 31 días, 0 no laborados. En el v1 la boleta declaraba 20 días.',
      'Las **horas** del `.jor` son las de la jornada cumplida: los feriados no suman horas (C-24, capítulo 27).',
      'En la conciliación de asistencias, el feriado sin marcas **no es falta** (C-35, capítulo 19).',
    ]),
    h2('18.2 Aviso de feriados del año sin cargar'),
    p('Si no hay ningún feriado registrado en el año de la boleta, la banda de avisos lo dice (V-05): sin ellos, las boletas de ese año no tienen la línea de feriados en los días trabajados y las horas y la asistencia salen mal.'),
    ...figura('c18_02_banda_sin_feriados', 'Compañía de laboratorio sin feriados de 2026: «Faltan los días festivos de 2026…» arriba de la lista de boletas.'),
    nota('Cargue los feriados del año siguiente en diciembre. Los feriados de otro calendario o de otra compañía no cuentan para el trabajador.', 'implementador'),
    pieCapitulo(['base', 'ce'], 'C-09, C-24, V-05'),
  );

  // ------------------------------------------------------------------ 19 (bloque 4, si ya está escrito)
  if (require('fs').existsSync(require('path').join(__dirname, 'cap19.js')) && process.env.SIN_CAP19 !== '1') a(require('./cap19.js')(h));

  // ------------------------------------------------------------------ 20
  a(
    h1('20. Horas extra, nocturnidad, movilidad, adelantos y utilidades'),
    p('Estos conceptos se registran como **Otras entradas** de la boleta (pestaña Días trabajados y entradas). El ejemplo es un trabajador sintético de la compañía de laboratorio (sueldo 2 400, ONP, octubre de 2026), armado para este manual y borrado después.'),
    ...figura('c20_02_entradas_lista', 'Otras entradas: 6 horas extra al 25 %, 2 al 35 %, 10 horas nocturnas, movilidad 200 y 45 minutos de tardanza.'),
    tabla(['Entrada', 'Código', 'Regla', 'Cálculo', 'Importe'], [
      ['Horas extra 25 % (horas)', 'HE25_001', 'Sueldo / 30 / 8 × 1,25', '6 × 10,00 × 1,25', '75,00'],
      ['Horas extra 35 % (horas)', 'HE35_001', 'Sueldo / 30 / 8 × 1,35', '2 × 10,00 × 1,35', '27,00'],
      ['Horas nocturnas (horas)', 'BNOC_001', 'Valor hora (mínimo RMV / 240) × 35 %', '10 × 10,00 × 0,35', '35,00'],
      ['Movilidad de libre disposición', 'MOV_001', 'Importe; no afecta', '', '200,00'],
      ['Tardanzas (minutos)', 'TARD_001', 'Sueldo / 240 / 60 por minuto; reduce la base', '45 × 0,1667', '7,50'],
    ], [2400, 1300, 2700, 1900, 1338]),
    ...figura('c20_02_entradas_calculo', 'Cálculo: total ingresos 2 737,00; base afecta 2 529,50 (sin la movilidad y menos la tardanza); ONP 328,84; EsSalud 227,66; neto 2 400,66.'),
    p('La base afecta (2 529,50) es el total de ingresos menos la movilidad (no remunerativa) menos la tardanza (C-10). Sobre ella se calculan la ONP (13 % = 328,84) y EsSalud (9 % = 227,66).'),
    h2('20.1 Adelantos, descuento judicial y cuota sindical'),
    tabla(['Concepto', 'Cómo', 'Caso NOMINA'], [
      ['Adelanto quincenal', 'Estructura NQA con el «Porcentaje de adelanto» del contrato; la mensual lo descuenta (DESC_ADEL_001)', 'Luis: adelanto 40 % **1 800,00** y descuento de 1 800,00 en la mensual; neto 2 112,30'],
      ['Descuento judicial', '«¿Tiene beneficiario?» en la ficha', 'Miguel: **522,00** (20 % del disponible)'],
      ['Cuota sindical', '«Sindicalizado» en el contrato; parámetro `pe_cuota_sindical`', 'Rosa (semanal): **4,20**'],
    ], [2200, 4000, 3438]),
    h2('20.2 Reparto de utilidades'),
    p('**Nómina PE › Reparto de utilidades** reparte la participación del D.Leg. 892: 50 % por días laborados y 50 % por remuneraciones del ejercicio, con tope individual de 18 sueldos. Días y remuneraciones salen de las boletas validadas del año. Se indica la renta neta y el porcentaje según la actividad (CIIU); el resultado es un Excel y el importe se paga con la entrada `UTIL_001`.'),
    ...figura('c20_01_reparto_utilidades', 'Asistente del reparto de utilidades: ejercicio, renta neta y porcentaje.'),
    tabla(['Trabajador (caso UTILIDADES)', 'Remuneraciones', 'Por días', 'Por remuneraciones', 'A pagar'], [
      ['70000801', '12 000,00', '833,33', '500,00', '1 333,33'],
      ['70000802', '18 000,00', '833,33', '750,00', '1 583,33'],
      ['70000803', '30 000,00', '833,33', '1 250,00', '2 083,33'],
    ], [2600, 1800, 1500, 1900, 1838]),
    p('Monto a repartir 5 000,00 entre 3 trabajadores con los mismos días, sin remanente por topes. El **tope** de 18 sueldos usa el sueldo **vigente al cierre del ejercicio**, no el de hoy (C-22). En el escenario de tope del caso, el remanente es 320 000,00.'),
    nota('Qué cuenta como días laborados y como remuneración para el reparto, y si los días de vacaciones y de subsidio se incluyen, está pendiente de confirmación por la contadora (P-25, P-26 y P-29). Hoy se usan las líneas pagadas de los días trabajados. Ver el Anexo A.', 'importante'),
    pieCapitulo(['ce', 'ce_demo'], 'C-10, C-22'),
  );

  return c;
};
