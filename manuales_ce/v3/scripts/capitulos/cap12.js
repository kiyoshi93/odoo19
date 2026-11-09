// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19: casos NOMINA y VIDALEY (22/10/2026, re-leídos el 09/11/2026), CONCEPTOS, ADICIONALES, SCTR,
// EMPRESA_CONSULTORA y EMPRESA_INDUSTRIA (re-medición del lote 71: los 30 casos al 100 %).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 12
  a(
    h1('12. Aportes y retenciones'),
    p('Las cifras de este capítulo son del **caso NOMINA** (planilla de julio de 2026, 525 celdas al 100 %), del **caso VIDALEY** y de los casos de la versión 3 que se citan en cada sección.'),
    tabla(['Concepto', 'Regla', 'Base y tasa', 'Ejemplo medido'], [
      ['ONP', 'ONP_001', '13 % de la base afecta', 'Jorge, sueldo 1 130: **146,90**'],
      ['AFP aporte', 'AFP_APO_001', '10 %', 'Carlos, base 3 613: **361,30**'],
      ['AFP comisión sobre flujo', 'AFP_COM_001', 'Tasa de su AFP (Habitat 1,47 %)', 'Carlos: **53,11**. Con comisión **mixta**: 0,00 (María)'],
      ['AFP prima de seguro', 'AFP_PRI_001', '1,37 % con tope en la RMA **del mes**', 'Carlos: **49,50**. Ana, sueldo 15 000: **173,62** (topeada en la RMA 12 672,65 de julio–setiembre)'],
      ['EsSalud', 'ESSALUD_001', '9 % con base mínima de la RMV **del mes**', 'Carlos: **325,17**'],
      ['EPS: aporte y crédito', 'EPS_APO_001 / EPS_CRED_001', 'Tasa del plan; crédito del mes contra EsSalud (12.4)', 'Carlos: **162,59** y **−81,29**'],
      ['SENATI', 'SENATI_001', '0,75 % (si la compañía está afecta; 12.7)', 'Carlos: **27,10**'],
      ['SCTR (cuatro líneas)', 'SCTR_ESS_001 · SCTR_SAL_001 · SCTR_ONP_001 · SCTR_PEN_001', 'Tasa de la póliza de cada entidad (12.5)', 'Caso SCTR, 3 000: **15,90** y **27,60**'],
      ['Vida Ley (empleador)', 'VIDA_001', 'Tasa de la póliza con tope de la RMA', 'Caso VIDALEY, sueldo 3 000 al 0,53 %: **15,90**'],
      ['SIS de la microempresa', 'SIS_MICRO_001', 'S/ 15 por trabajador', 'Capítulo 24'],
    ], [2100, 2100, 2700, 2738]),
    ...figura('c12_01_carlos_calculo', 'Carlos, julio de 2026 (caso NOMINA): AFP Habitat, EsSalud, EPS con su crédito, SENATI y neto 3 149,09.'),
    ...figura('c12_02_ana_calculo', 'Ana, sueldo 15 000 (caso NOMINA): la prima de seguro AFP se topa en la RMA y sale 173,62; renta de 5.ª 1 267,25 en dos tramos; neto 11 838,63.'),
    nota('Caso NOMINA, julio de 2026, releído el 09/11/2026 con las versiones de este manual: Carlos (AFP 361,30 · 53,11 · 49,50; EsSalud 325,17; EPS 162,59 y −81,29; SENATI 27,10; neto 3 149,09), Ana (prima 173,62; 5.ª 1 267,25; neto 11 838,63) y Jorge (ONP 146,90; neto 983,10): las mismas cifras de la versión 2.', 'caso'),

    h2('12.1 Topes y bases del mes'),
    p('La base mínima de EsSalud (la RMV), el tope de la prima AFP (la RMA), el crédito EPS y la prima de Vida Ley se aplican **al total del mes**, no a cada boleta (C-26). Cuando en el mes hay mensual y vacacional, o mensual y una planilla adicional (capítulo 11), la segunda boleta paga lo que falta para llegar al importe del mes.'),
    ...figura('c12_03_nilda_vac_calculo', 'Nilda (caso NOMINA), vacaciones todo julio: la vacacional de 3 000 paga EsSalud 270,00, que es el 9 % del mes. La mensual queda sin importes y no se valida (C-18).'),
    nota('Caso NOMINA: «ESSALUD_001 del mes» de Nilda y de Óscar = **270,00**. Óscar, con 11 días de goce, paga 135,00 en la vacacional y 135,00 en la mensual. Caso ADICIONALES (lote 16), 70001701 con sueldo 3 000 y comisiones 500 en su planilla: ONP 390,00 + 65,00 y EsSalud 270,00 + 45,00; la adicional no repite la base mínima.', 'caso'),
    p('Por eso el orden importa: si se borra o se cancela un borrador del mes que una boleta validada después ya contó (por ejemplo, una vacacional en borrador cuando se validó la mensual), esa boleta queda con el reparto anterior y **recibe una nota en su historial** para revisar sus aportes (lote 45, O-137). Si hace falta, se rectifica (capítulo 25).'),
    h3('Sin remuneración en el mes'),
    p('Con días laborados, la base mínima de EsSalud es la RMV aunque la remuneración sea menor (capítulo 22). Un mes **sin ninguna** remuneración no aporta (C-32; SUNAT, Informe 003-2007-SUNAT/2B0000). Desde el lote 22a, lo mismo en la **liquidación**: si en el mes no hay remuneración afecta, ni en la liquidación ni en las demás boletas del trabajador (una liquidación sin truncas en un mes sin mensual), no carga el 9 % de la RMV. Con truncas o con la mensual del mes, el EsSalud se calcula como siempre.'),
    h3('El trabajador a tiempo parcial'),
    p('El trabajador de menos de 4 horas diarias (capítulos 15 y 17) aporta EsSalud **con la base mínima de la RMV** y su pensión sobre lo que gana (lote 67). Caso EMPRESA_CONSULTORA, S4, sueldo 500 con 3 horas diarias, junio de 2026: **ONP 65,00**, **EsSalud 101,70** (9 % de 1 130) y neto 435,00. Es «criterio según la norma, pendiente de confirmación (A-6.2 y A-6.3)», que deciden cómo se detecta el tiempo parcial. El practicante no: su EsSalud (ESSALUD_PF_001) es el 9 % de lo pagado, sin base mínima (capítulo 31).'),

    h2('12.2 Lo que reduce la base: tardanza y descuento deducible'),
    p('El descuento por tardanza (`TARD_001`) es un «Descuento que reduce la base afecta» (C-10): la base de ONP, AFP, EsSalud y renta de 5.ª es el total de ingresos afectos **menos la tardanza**. En el ejemplo del capítulo 20, 45 minutos (7,50) bajan la base de 2 537,00 a 2 529,50. La tardanza se valora con la jornada del trabajador (lote 24; capítulo 10).'),
    p('El **otro descuento deducible** (`DESC_D_001`, 0707; lote 15) es un descuento por una suspensión perfecta que no está en las tardanzas ni en las inasistencias. Siempre reduce la base de los aportes. Caso CONCEPTOS, 70001602 (AFP, sueldo 3 000, deducible 30, noviembre de 2026): base 2 970, **AFP 297,00**, **EsSalud 267,30**, y AFPnet declara 2 970,00 de remuneración asegurable. Por defecto reduce también la renta de 5.ª, como la tardanza; la opción **«Descuento deducible (0707) en la renta de 5.ª»** tiene «Solo los aportes» (lote 29; P-74, con valor por defecto «Reduce los aportes y la renta de 5.ª»).'),

    h2('12.3 Lo que no es base: prestaciones alimentarias y aportes voluntarios'),
    vinetas([
      '**Prestaciones alimentarias** (PRALI_001, 0113): solo renta de 5.ª, y se entregan fuera del neto (capítulo 10). Lo que pasa del tope se paga en PRALI_EXC_001 (0116), que **sí** paga EsSalud, ONP o AFP, SCTR y renta: con sueldo 3 000 y vales de 1 000, ONP 442,00 y EsSalud 306,00 en vez de 390,00 y 270,00 (lote 29; P-75, con valor por defecto «Se paga como remuneración (0116)»).',
      '**Aportes voluntarios del trabajador al SPP** (AFPV_001 con fin previsional, AFPVS_001 sin fin previsional; 0609): se descuentan del neto y van a AFPnet. No reducen ninguna base: la Ley del Impuesto a la Renta no los deduce (arts. 46 y 49). Solo para afiliados al SPP: a un trabajador de la ONP la boleta no los calcula y avisa («aporte_voluntario»).',
      '**Aporte voluntario del empleador** (AFPVE_001; AFPnet, columna O): aporte de la empresa (6272 / 4170). No es remuneración ni renta de 5.ª (TUO de la Ley del SPP, art. 74).',
    ]),
    nota('Caso CONCEPTOS, 70001602, noviembre de 2026: AFPV_001 100,00, AFPVS_001 50,00 y AFPVE_001 80,00; en AFPnet, 2 970,00 de remuneración asegurable y 100,00, 50,00 y 80,00 en las columnas de los aportes voluntarios; neto 2 086,27. Por defecto van solo a AFPnet; el `.rem` los lleva como informativos si se marcan las casillas «PLAME: aportes informativos en el .rem» de la compañía (P-73, capítulo 27).', 'caso'),

    h2('12.4 El crédito EPS del mes (lotes 34a, 45 y 52)'),
    p('El crédito EPS es **del mes del trabajador** (Ley 26790, arts. 15 y 16; D.S. 009-97-SA, art. 40). Cada boleta lleva el 25 % del EsSalud del mes, contando todas sus boletas (mensual, comisiones, vacacional, liquidación), sin pasar de lo pagado a la EPS en el mes, menos el crédito que ya llevan sus otras boletas del mes. El total ya no depende del orden. Con los criterios del lote 34a:'),
    tabla(['Situación', 'Antes', 'Ahora'], [
      ['Sueldo 3 000 y comisiones de 1 000 validadas antes: crédito EPS del mes', '−87,08 (−22,50 y −64,58)', '**−90,00**'],
      ['Plan EPS por importe fijo de 67,50, sin tasa', 'Aporte 0 y crédito 0', 'Aporte 67,50 y crédito −67,50'],
      ['Un cubierto con sueldo alto y crédito del mes de 2 250', 'Sin aviso', 'Aviso del tope (1 × 550,00), en el historial'],
    ], [4600, 2500, 2538]),
    vinetas([
      '**El tope de la UIT es de la empresa y del mes:** el 10 % de la UIT por trabajador cubierto (2026: 550 × cubiertos; art. 16 b). Si el crédito de la compañía en el mes lo pasa, la boleta avisa («credito_eps») y el aviso queda en el historial al validar; se ajusta al declarar (PLAME, casilla 602). El aviso usa la UIT del mes del crédito: una semanal del 28/12 al 03/01 usa la de diciembre (lote 52, O-134).',
      '**El tope de lo pagado a la EPS es por trabajador** (lote 45, O-136): nunca da de más. Es «criterio según la norma, pendiente de confirmación (P-137)»; la alternativa (el total de la empresa) solo cambia algo con planes de distinta tasa.',
      '**El plan EPS cuenta solo mientras está vigente** (lote 45, O-135): un plan que vence el 30/06 deja de dar aporte y crédito en julio, y la bonificación de la gratificación vuelve al 9 %. La boleta lo avisa («eps_no_vigente»).',
      '**Una estructura propia con su copia vieja de EPS_CRED_001** sigue calculando por boleta y da de menos: la boleta avisa «eps_formula» para copiar la regla de «Reglas Básicas» (lote 45, O-133).',
    ]),

    h2('12.5 SCTR (lotes 19, 34a, 45 y 52)'),
    p('Con «Cubierto por SCTR» en la ficha (pestaña «Nómina PE», grupo «Salud»), la boleta lleva una línea por cobertura, según la entidad que dice la ficha en «SCTR salud» y «SCTR pensión (entidad)», con la tasa de la póliza de esa entidad vigente al fin del periodo (**Nómina › Nómina PE › Seguros y EPS › Pólizas SCTR**; capítulo 6). La base es la remuneración afecta (menos tardanzas, más subsidios), sin tope. Gasto 6273.'),
    tabla(['Entidad', 'Línea', 'PLAME', 'Pasivo', 'Caso SCTR, noviembre de 2026, sueldo 3 000'], [
      ['Salud, EsSalud', 'SCTR_ESS_001 «SCTR Salud - EsSalud»', '0806', '4031', '70002001, póliza 0,53 %: **15,90**'],
      ['Salud, EPS', 'SCTR_SAL_001 «SCTR Salud - EPS»', '0810', '4699', '70002002, póliza 1,20 %: **36,00**'],
      ['Pensión, ONP', 'SCTR_ONP_001 «SCTR Pensión - ONP»', '0813', '4032', '70002001, póliza 0,92 %: **27,60**'],
      ['Pensión, compañía de seguros', 'SCTR_PEN_001 «SCTR Pensión - Compañía de seguros»', '0814', '4699', '70002002, póliza 1,05 %: **31,50**'],
    ], [1800, 2800, 900, 900, 3238]),
    vinetas([
      'Sin la entidad en la ficha, SCTR_SAL_001 y SCTR_PEN_001 usan la tasa referencial de los parámetros (1,30 % y 1,70 %) y la boleta avisa: 70002003 paga 39,00 y 51,00. Así sale también Rosa (caso NOMINA, semanal de 420): 5,46 y 7,14.',
      'En la semanal se calcula igual: 70002004, obrero de la semana del 2 al 8 de noviembre (700,00), EsSalud y compañía: 3,71 y 7,35.',
      'Cada línea guarda la póliza y la tasa con que se calculó: columnas opcionales «Póliza SCTR» y «Tasa SCTR (%)» en las líneas de la boleta.',
      '**La gratificación no paga SCTR** por defecto, con ninguna entidad (Ley 30334). Si el condicionado de la póliza de la ONP, la EPS o la compañía lo exige, se marca en la póliza **«Cobra la prima sobre la gratificación ordinaria»** (con EsSalud no aparece): la gratificación calcula el SCTR de esa entidad (no sobre la bonificación extraordinaria), con aviso. Gratificación de julio de 3 000 y póliza EPS al 1 %: 30,00 (lote 34a). La póliza se busca a la **fecha de pago**, el 15, y no al fin del mes (lote 52, O-132), y la liquidación de un cese del 15 al 31/12 que paga la gratificación ordinaria también lo cobra (lote 45, O-131).',
    ]),
    ...figura('c12_05_sctr_lineas', 'Caso SCTR, 70002002, noviembre de 2026: SCTR Salud - EPS 36,00 y SCTR Pensión - Compañía de seguros 31,50, con las columnas «Póliza SCTR» y «Tasa SCTR (%)» visibles.'),
    nota('Caso SCTR (82 celdas, lote 19), releído el 09/11/2026: 70002001 15,90 y 27,60; 70002002 36,00 y 31,50; 70002003 39,00 y 51,00 con el aviso; 70002004 3,71 y 7,35. El `.rem` del PLAME no lleva los 08xx del SCTR salvo que se marquen las casillas de «PLAME: aportes informativos en el .rem» (capítulo 27). Por defecto esas casillas vienen sin marcar (P-91), y la tasa de cada trabajador para el 0806 se registra en el PDT, porque el sistema no la exporta (P-92).', 'caso'),

    h2('12.6 Prima de Vida Ley'),
    ...figura('c12_04_vidaley_calculo', 'Caso VIDALEY, junio de 2026: «Seguro Vida Ley (aporte del empleador)» 15,90 con sueldo 3 000 y tasa 0,53 %. El neto no cambia: 2 610,00.'),
    tabla(['Escenario del caso VIDALEY', 'Prima'], [
      ['Tasa 0,53 %, sueldo 3 000', '15,90'],
      ['Sueldo 15 000 (tope de la RMA)', '66,77'],
      ['Importe fijo de la póliza', '25,00 una vez al mes'],
      ['Póliza vencida', 'Sin prima y con aviso'],
      ['Semanal, cuatro semanas', '14,84 en el mes'],
      ['Vacacional de 7 500 y mensual de 15 000', '39,75 en la vacacional; 66,77 en el mes'],
    ], [6000, 3638]),
    p('La prima va al PLAME en el concepto **0803** (informativo) y al asiento en **6274 / 4699**. Las gratificaciones, las utilidades, los subsidios y las vacaciones truncas no son base. En un mes con suspensión, la compañía elige en el grupo «Seguro Vida Ley» si los días suspendidos van a la última remuneración (por defecto) o solo lo percibido (capítulo 6). Una nota de crédito hecha a mano revierte la prima (lote 45, O-138; capítulo 25).'),

    h2('12.7 SENATI'),
    p('Con **«Afecta a SENATI»** en la compañía, la boleta calcula el 0,75 % (SENATI_001) sobre la remuneración afecta. Desde el lote 66 hay dos cosas nuevas: la casilla **«Fuera de la base del SENATI»** del contrato, para el personal de una actividad que no es la industrial (el vendedor de la tienda de la fábrica), y el aviso **«senati»** cuando el año anterior la compañía tuvo 20 trabajadores o menos en promedio en esas actividades (Ley 26272, art. 13). El detalle, las opciones y los casos están en el **capítulo 32**.'),
    tabla(['EMPRESA_INDUSTRIA, junio de 2026', 'SENATI'], [
      ['I1, obrero semanal (350,00 de la semana)', '2,63 y aviso «senati»'],
      ['I2, sueldo 2 000, sindicalizado', '15,00 y aviso «senati»'],
      ['I3, sueldo 2 500, con 30 minutos de tardanza', '18,71 (0,75 % de 2 494,79)'],
      ['I4, vendedor de la tienda, «Fuera de la base del SENATI»', 'Sin línea'],
    ], [6000, 3638]),
    pieCapitulo(['ce', 'ce_demo'], 'C-10, C-26, C-32, N-05, N-09 (15), N-10 (16), N-12 (19), lote 22a, P-74 y P-75 (29), C-46 y P-93 (34a), O-131, O-133, O-135, O-136, O-137 y O-138 (45), O-132 y O-134 (52), O-192 (66), O-193 (67)'),
  );


  return c;
};
