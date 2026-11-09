// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19: caso BOLETA (22/10/2026, re-leído el 09/11/2026), casos CONCEPTOS, ADICIONALES, FERIADOS,
// SCTR y EMPRESA_COMERCIO (lotes 15 a 64; re-medición del lote 71: los 30 casos al 100 %).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 10
  a(
    h1('10. Boleta de pago individual'),
    p('La boleta se crea en **Nómina › Nóminas del empleado › Nuevo**. Este capítulo usa la boleta de diciembre de 2026 de la trabajadora del **caso BOLETA** (DNI 70000501, sueldo 4 500, AFP Integra y un hijo), calculada con las versiones de este manual. Los conceptos nuevos de la versión 3 se muestran con los casos CONCEPTOS, FERIADOS, SCTR y EMPRESA_COMERCIO.'),
    nota('Desde el lote 40 (O-158), las boletas, sus líneas, sus días, sus entradas y los lotes **solo se ven en su compañía**. Un usuario con varias compañías ve las boletas de la compañía activa (o de las que marque en el selector de compañías); antes, la lista mezclaba las de todas.', 'nota'),
    h2('10.1 Crear y calcular'),
    pasos([
      'Elija el **Empleado**. La boleta toma su contrato vigente y la **Estructura** del contrato (C-07).',
      'Elija el **Periodo**. Al cambiarlo se recalculan los días trabajados y el nombre: «Boleta de <trabajador> – <mes año>» (U-06).',
      'Revise la pestaña **Días trabajados y entradas** y agregue las **Otras entradas** del mes (horas extra, comisiones, vales, tardanzas…: 10.4 y capítulo 20).',
      'Pulse **Calcular hoja**. Si la compañía tiene asistencias, **Cargar asistencias** concilia las marcaciones antes (capítulo 19).',
      'Revise la banda de avisos (10.5) y **Cálculo de la nómina**, y pulse **Confirmar** para validarla: se genera el asiento en el diario Planillas.',
    ]),
    ...figura('c10_04_boleta_nueva', 'Boleta nueva de diciembre de 2026 (sin guardar): estructura del contrato, nombre en español y días laborados 23 / 184 h.'),
    p('Los botones cambian con el estado:'),
    tabla(['Estado', 'Botones', 'Para qué'], [
      ['Borrador', 'Confirmar · Calcular hoja · Cargar asistencias · Cancelar nómina', 'Calcular y validar'],
      ['Hecho', 'Rectificar · Cancelar nómina · **Enviar por correo** · **Confirmar recepción**', 'Boleta rectificativa (capítulo 25); envío y constancia de entrega (capítulo 28)'],
    ], [1600, 4800, 3238]),
    p('La boleta validada muestra además **Por pagar** (el neto pendiente), **Fecha de pago** y **N.° de operación**, que se llenan al registrar el pago (capítulo 28).'),
    nota('**Entradas repetidas (lote 44, O-105).** Si la boleta tiene dos entradas con el mismo código (por ejemplo, dos proveedores de vales, PRALI_001 de 600 y de 400), al calcular se unen en una con la suma (1 000) y los dos nombres, y el historial de la boleta lo dice: «Entradas con el mismo código unidas en una…». Antes, la regla leía solo la última.', 'nota'),
    h2('10.2 Días trabajados'),
    ...figura('c10_01_dias', 'Días trabajados de diciembre de 2026: «Días laborados (100 %)» 23 días y 184 horas, con «¿Pagado?» visible.'),
    p('La lista de días trabajados trae los días **hábiles** del calendario del contrato y sus horas, con una línea por tipo de ausencia. Desde la versión 2 tiene la columna **¿Pagado?** y lo que se marca se guarda (C-16). Cuando la estructura no paga una ausencia, por ejemplo las vacaciones en la mensual, la línea queda sin marcar.'),
    p('Los **días que se declaran** (boleta impresa y PLAME) siguen la norma (C-09): días calendario del periodo dentro del vínculo menos los días de suspensión. Los feriados y el descanso semanal **cuentan como laborados**. Las horas son las de la jornada cumplida. Por eso la boleta impresa de diciembre dice «Días laborados: 31 · Días no laborados: 0 · Horas: 184».'),
    p('Al validar una mensual o una semanal, las suspensiones de cada día (Tabla 21) quedan **guardadas** en la boleta (lote 54, O-167): una licencia que se aprueba o se rechaza después ya no cambia el `.snl` ni los días impresos de un mes pagado (capítulo 22).'),
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
      ['SENATI (empleador)', 'SENATI_001', '34,67', '0,75 % (capítulo 32)'],
    ], [3000, 1900, 1400, 3338]),
    nota('Caso BOLETA (166 celdas): las 6 boletas de la trabajadora 70000501 (agosto a diciembre de 2026 y la gratificación de diciembre) cuadran al centavo: ingresos − descuentos = neto, y la suma de las líneas impresas es igual al total. Releídas el 09/11/2026 con las versiones de este manual: las mismas cifras de la versión 2.', 'caso'),
    p('**La asignación familiar se mide con la edad del hijo en el periodo** de la boleta, no con la de hoy (lote 22a; Ley 25129, art. 2). Con un hijo nacido el 10/03/2008, la mensual de febrero de 2026 lleva la asignación, la de marzo también (el mes en que cumple 18 años todavía se paga) y la de abril ya no. Antes, una boleta de un mes pasado calculada hoy la perdía. Es «criterio según la norma, pendiente de confirmación (P-124)».'),

    // ------------------------------------------------------------ 10.4
    h2('10.4 Conceptos del mes que se ingresan como entrada'),
    p('Desde el lote 15 (N-09), la mensual y la semanal (y las planillas adicionales del capítulo 11) tienen catorce entradas de importe. Cada una deja línea solo si se ingresa. La regla dice qué paga:'),
    tabla(['Entrada', 'Concepto', 'Paga', 'PLAME'], [
      ['ALIM_001', 'Alimentación principal en dinero', 'Todo (EsSalud, ONP/AFP, renta)', '0101'],
      ['COM_001', 'Comisiones o destajo', 'Todo', '0103'],
      ['BONREG_001', 'Bonificaciones regulares', 'Todo', '0306'],
      ['BPRODR_001', 'Bono por productividad o metas (remunerativo)', 'Todo; ingreso extraordinario para la 5.ª', '0303'],
      ['PRALI_001', 'Prestaciones alimentarias (suministro indirecto)', 'Solo renta de 5.ª', '0113'],
      ['GRATEX_001', 'Gratificación extraordinaria (liberalidad ocasional)', 'Solo renta; extraordinaria', '0403'],
      ['BPROD_001', 'Bono de productividad – convenio de gestión (sector público)', 'Solo renta; extraordinario', '0902'],
      ['DESC_D_001', 'Otro descuento deducible', 'Reduce la base de los aportes y, por defecto, de la 5.ª', '0707'],
      ['AFPV_001 · AFPVS_001', 'Aporte voluntario al SPP con y sin fin previsional', 'Descuento del neto', 'AFPnet'],
      ['AFPVE_001', 'Aporte voluntario al SPP del empleador', 'Aporte de la empresa', 'AFPnet'],
      ['EPSD_001 · DESC_ND_001 · PREST_001', 'Descuento EPS, otros no deducibles y préstamo', 'Descuento del neto', '0706'],
    ], [2300, 3500, 2600, 1238]),
    p('En una empresa privada, el bono por productividad o metas es remuneración (BPRODR_001, 0303); si es una liberalidad ocasional, GRATEX_001 (0403). El 0902 es solo del sector público con convenio de gestión. Las remunerativas (ALIM, COM, BONREG y BPRODR) nacen marcadas «¿Aplica para utilidades?» y como variables regulares (capítulo 14).'),
    tabla(['Caso CONCEPTOS, noviembre de 2026', 'Resultado medido'], [
      ['70001601, sueldo 3 000; ALIM 300, COM 500, BONREG 200, BPRODR 250, PRALI 150, GRATEX 1 000, BPROD 400', 'Ingresos 5 800,00; ONP 552,50 y EsSalud 382,50 sobre 4 250 (lo remunerativo); base de 5.ª 5 800,00; vales entregados (PRALI_ENT_001) 150,00; **neto 5 097,50**'],
      ['70001602, sueldo 3 000, AFP; descuento deducible 30', 'Base de aportes 2 970: AFP 297,00 y EsSalud 267,30; aportes voluntarios 100,00 y 50,00; EPS 60, otros 40 y préstamo 250 (0706 350.00); aporte voluntario del empleador 80,00; **neto 2 086,27**'],
    ], [4200, 5438]),
    h3('Las prestaciones alimentarias'),
    p('Los vales (PRALI_001) **no se pagan por banco** (lote 44, O-104): la regla **PRALI_ENT_001 «Prestaciones alimentarias entregadas (fuera del neto)»** los descuenta del neto, y el asiento los abona a la 4699 (el proveedor de los vales; capítulo 7). Así lo muestra 70001601: 150,00 de vales y el neto sin ellos. La opción de la compañía **«Prestaciones alimentarias en el neto»** viene en «Fuera del neto: se entregan aparte (vales, tarjeta o suministro directo)»; «En el neto pagado» es lo de antes del lote.'),
    p('Su tope es el menor entre el 20 % de la remuneración ordinaria del periodo (básica, asignación familiar, feriados y licencia con goce) y 2 RMV (Ley 28051, art. 9; D.S. 013-2003-TR, art. 6). Por defecto, el exceso se paga en su propia línea, **PRALI_EXC_001 «Prestaciones alimentarias - exceso sobre el tope (remuneración)»** (0116, cuenta 6213), que paga aportes y renta de 5.ª y entra en los beneficios (lote 29). Con sueldo 3 000 y vales de 1 000 (tope 600): 0113 600 y 0116 400, ONP 442,00 y EsSalud 306,00. Con sueldo 20 000 y vales de 3 000, el tope es 2 RMV (2 460) y el exceso 540. La opción **«Exceso de las prestaciones alimentarias»** tiene también «Solo avisar» (valor por defecto de hoy: «Se paga como remuneración (0116)»; P-75).'),
    ...figura('c10_06_conceptos_vales', 'Caso CONCEPTOS, 70001601, noviembre de 2026: PRALI_001 150,00 en los ingresos y PRALI_ENT_001 150,00 que lo saca del neto; neto 5 097,50.'),
    h3('Otras líneas nuevas de la boleta'),
    tabla(['Líneas', 'Cuándo salen', 'Dónde se explica'], [
      ['FER_001 «Remuneración de feriados» (0115) y LCG_001 «Licencia con goce de haber» (0907)', 'Con «Declarar aparte los feriados (0115) y la licencia con goce (0907)» en la compañía (lote 18)', 'Capítulo 18'],
      ['TFER_001 «Trabajo en feriado o día de descanso» (0107) y FMAY_001 (1 de mayo en el descanso)', 'Con la entrada TFER_001 o las asistencias; el 1 de mayo en el descanso semanal (lotes 18 y 31b)', 'Capítulos 18 y 19'],
      ['SCTR_ESS_001, SCTR_SAL_001, SCTR_ONP_001 y SCTR_PEN_001', 'Con «Cubierto por SCTR» en la ficha, una por cobertura (lote 19)', 'Capítulo 12'],
      ['PRO_* y APL_* (provisiones y su aplicación)', 'Con «Provisión mensual de beneficios» = «En la boleta mensual» (lote 20b): no suman al neto, a los aportes ni al PLAME', 'Capítulo 7'],
      ['SUBV_001 y demás de la subvención', 'Solo en la estructura «Subvención de modalidad formativa» (lote 49a)', 'Capítulo 31'],
    ], [3600, 3800, 2238]),
    h3('El valor hora (lote 24, C-47)'),
    p('Las horas extras, el trabajo en feriado, la sobretasa nocturna y las tardanzas se valoran con **sueldo ÷ 30 ÷ las horas diarias de la jornada del trabajador** (D.S. 007-2002-TR, art. 12): el «Promedio de horas por día» del horario de su contrato (si no hay, el del trabajador o el de la compañía; sin ninguno, 8), con tope de 48 ÷ los días por semana del horario. La nocturna conserva su piso (RMV ÷ 240). La opción de la compañía **«Valor hora»** (grupo «Valor hora y feriados») permite volver a «Sueldo ÷ 30 ÷ 8». Con sueldo 3 000 (criterios del lote 24):'),
    tabla(['Jornada', 'Valor hora', '2 horas extras al 25 %', '4 horas en un feriado', 'Una hora de tardanza'], [
      ['8 h (6 días)', '12,50', '31,25', '100,00', '12,50'],
      ['48 h en 5 días (9,6 h)', '10,42', '26,04 (antes 31,25)', '83,33 (antes 100,00)', '10,42 (antes 12,50)'],
      ['Tiempo parcial de 4 h', '25,00', '62,50 (antes 31,25)', '200,00 (antes 100,00)', '25,00 (antes 12,50)'],
    ], [2100, 1500, 2000, 2000, 2038]),
    nota('El resultado depende del horario del contrato: revise que sea la jornada real de cada trabajador. Un trabajador de 4 horas con el horario estándar de 8 sigue dividiendo entre 8. Con dos versiones en el mes, todas las horas se valoran con el horario de la versión de la boleta. Es «criterio según la norma, pendiente de confirmación (P-89)».', 'importante'),

    // ------------------------------------------------------------ 10.5
    h2('10.5 Avisos de la boleta'),
    p('La banda amarilla del formulario muestra, mientras la boleta está en borrador, lo que conviene revisar antes de validar. Ningún aviso de esta sección bloquea. Varios quedan además en el historial al validar («Validada con avisos:»). La lista completa, con su código, está en el capítulo 26; los que más se ven en la boleta del mes son estos:'),
    tabla(['Código', 'Qué dice', 'Desde'], [
      ['sin_tipo', 'La estructura no tiene tipo de planilla: la boleta no entra en el PLAME, AFPnet, bancos, la planilla ni el reparto de utilidades', 'Lote 16 (C-42)'],
      ['computable', '«Remuneración computable de …: variables del … al …»: por concepto, en cuántos meses hubo importe, el total, el divisor y lo que suma (o que no es regular). Al validar queda en el historial bajo «Remuneración computable al validar»', 'Lote 17 (C-41)'],
      ['principal_imprecisa', 'Trabajador con sueldo y la marca «Fija» cuyas comisiones superan al sueldo en algún mes, o la marca del contrato distinta del T-Registro', 'Lote 33b (P-84)'],
      ['aporte_voluntario', 'Aporte voluntario al SPP ingresado a quien no es afiliado: no se calcula ni se descuenta', 'Lote 15'],
      ['prestaciones_*', 'Vales sobre el tope (con «Solo avisar»), sin la regla del exceso o sin PRALI_ENT_001 en una estructura copiada', 'Lotes 15, 29 y 44'],
      ['rmv · rmv_nocturna', 'El sueldo del contrato es menor que la RMV (o que la RMV más el 35 % con «Trabajo en horario nocturno»)', 'Lote 64'],
      ['valor_hora', 'El horario pasa de 48 horas semanales: el valor hora usa 48 ÷ los días del horario', 'Lote 24'],
      ['feriado_hora · trabajo_en_feriado', 'Un feriado que no empieza a las 00:00 en la zona del horario; horas de feriado sin la regla TFER_001', 'Lote 18'],
    ], [2100, 5900, 1638]),
    h3('La remuneración mínima (lote 64)'),
    p('La mensual y la primera semanal del mes avisan, **sin bloquear**, si el sueldo del contrato es menor que la RMV del periodo o, con «Trabajo en horario nocturno» y fuera del régimen MYPE, menor que la RMV más el 35 % (D.S. 007-2002-TR, art. 8). Con 4 horas diarias o más en promedio se exige la RMV entera; con menos, la parte proporcional a la jornada de la compañía (R.M. 091-92-TR, art. 3). No avisa a los practicantes (tienen su propio aviso, capítulo 31) ni en una compañía que no lleva soles. El comisionista y el destajero se miden con lo remunerativo de su mensual.'),
    tabla(['EMPRESA_COMERCIO', 'Junio de 2026 (RMV 1 130)', 'Octubre de 2026 (RMV 1 230)'], [
      ['K5, vigilante nocturno, 1 600', 'sin aviso', '«rmv_nocturna» (mínimo 1 660,50)'],
      ['K6, 1 200', 'sin aviso', '«rmv»'],
      ['K8, 450 con 15 horas semanales', '—', '«rmv» (1 230 × 15 ÷ 40 = 461,25)'],
    ], [3400, 2700, 3538]),
    p('El texto, medido en contable19 (re-medición del lote 64): «El sueldo del contrato de <trabajador> (1 130,00, sin otros conceptos) es menor que la remuneración mínima vital del periodo, 1 230,00. Revise el sueldo del contrato.» Hoy compara solo el sueldo del contrato (la asignación familiar no cuenta) y, con menos de 4 horas diarias, la RMV proporcional (A-2.1 y A-2.2, con valor por defecto).'),
    ...figura('c10_07_aviso_rmv', 'EMPRESA_COMERCIO, K6 (repartidor con el sueldo de la RMV anterior), boleta nueva de octubre de 2026 sin guardar: «El sueldo del contrato de Repartidor COMERCIO con el sueldo de la RMV anterior (1 200,00, sin otros conceptos) es menor que la remuneración mínima vital del periodo, 1 230,00. Revise el sueldo del contrato.» Arriba, la banda de los feriados de 2026, que esta compañía de laboratorio no tiene.'),
    nota('Caso EMPRESA_COMERCIO, hoja «Avisos» (re-medición del lote 71, 100 %): K5 junio «(ninguno)» y octubre «rmv_nocturna»; K6 junio «(ninguno)» y octubre «rmv»; K7 (44 h semanales) y K8 (15 h) en octubre «rmv»; K4, mensual validada de junio con 1 000 < 1 130, «rmv».', 'caso'),

    // ------------------------------------------------------------ 10.6
    h2('10.6 Boleta impresa (D.S. 001-98-TR)'),
    p('Desde la boleta, **Imprimir › Boleta de Pago (PE)**. Cuadra al centavo con el asiento (C-05): se imprimen los importes redondeados de cada línea. En la versión 3 cambian tres cosas:'),
    vinetas([
      '**Los importes llevan coma de miles** (lote 59, O-183), como el resto de Odoo en es_PE: el neto del caso BOLETA sale «4,025.70». En este manual las cifras se escriben con espacio de miles y coma decimal.',
      '**«SON: … SOLES»** (lote 38, O-84): la unidad va en plural (Ley 30381). La boleta del caso BOLETA dice «SON: CUATRO MIL VEINTICINCO Y 70/100 SOLES» (medido el 09/11/2026); antes decía «SOL». La hoja de liquidación y la constancia de la CTS también llevan el plural.',
      '**Las provisiones no se imprimen** por defecto (lote 37, P-106): la boleta acredita lo que se paga. La opción **«Provisiones en la boleta impresa»** (capítulo 7) tiene «No», «Solo la provisión del mes» y «Provisión y aplicación»; con las dos últimas van debajo del neto, en un bloque aparte e informativo.',
    ]),
    ...figura('c10_02_boleta_impresa', 'Boleta de diciembre de 2026 (caso BOLETA): días laborados 31, no laborados 0, horas 184.0; total ingresos 4,623.00, total descuentos 597.30, total aportes 450.74, neto a pagar S/ 4,025.70 y «SON: CUATRO MIL VEINTICINCO Y 70/100 SOLES».'),
    h2('10.7 Asiento contable'),
    ...figura('c10_01_contable', 'Información contable: diario Planillas y el asiento de la boleta.'),
    ...figura('c10_03_asiento', 'Asiento PLLA/2026/12/0373 de la boleta de diciembre del caso BOLETA: 5 671,04 al debe y al haber. El trabajador figura como socio en las líneas de la cuenta 4111.'),
    p('El asiento suma **5 671,04**: remuneraciones 4 623,00 (6211 / 4111), descuentos 597,30 (4111 / 4170), EsSalud 416,07 (6271 / 4031) y SENATI 34,67 (6277 / 4033). El saldo de la 4111 del trabajador es **4 025,70**, igual al neto. El laboratorio se regeneró después de la versión 2: el número del asiento pasó de PLLA/2026/12/0022 a **PLLA/2026/12/0373**; los importes son los mismos.'),
    h2('10.8 Una boleta sin importes no se valida'),
    p('Una boleta en la que todas las líneas salen en 0,00 no tiene nada que pagar ni que contabilizar: por ejemplo, la CTS o la gratificación de un trabajador de microempresa. Al confirmarla, la localización lo explica y ofrece **Eliminar la boleta sin importes** (C-18). Desde un lote, el aviso lista todas las vacías y el botón las elimina y valida el resto.'),
    ...figura('c10_05_boleta_sin_importes', 'CTS de noviembre de 2026 del trabajador del caso MICRO: «La boleta no tiene importes… no se valida», con el botón para eliminarla. (Se cerró sin eliminar.)'),
    nota('Las 64 boletas del recorrido de FM SYSTEMS (enero de 2025 a diciembre de 2026) se regeneraron el 22/10/2026 con las versiones de la versión 2: se cancelaron, se recalcularon con los días, el nombre y el diario que pone hoy el formulario y se volvieron a validar, mes por mes. Ningún importe cambió (la renta de 5.ª de Lucía sigue en 2 309,73 en 2025 y 2 160,78 en 2026). Las re-mediciones de los lotes 43 a 71 no las recalcularon: siguen idénticas. Detalle en el Anexo C.', 'implementador'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-05, C-07, C-09, C-16, C-18, U-06, N-07, N-08, N-09 (15), C-42 (16), C-41 (17), C-43 y N-11 (18), N-12 (19), N-13 (20b), lote 22a, C-47 (24), P-75 (29), P-84 (33b), P-106 (37), O-84 (38), O-158 (40), O-104 y O-105 (44), O-167 (54), O-183 (59), O-189 (64)'),
  );


  return c;
};
