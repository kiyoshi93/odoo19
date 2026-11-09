// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
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


  return c;
};
