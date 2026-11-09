// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después). Lo que la
// rectificativa hace desde los lotes 15 a 54 sale del código de la versión 19.0.1.39.202 y de las notas de cada lote.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 25
  a(
    h1('25. Rectificar una boleta'),
    p('Si una boleta validada tiene un error, no se edita: se **rectifica**. El botón **Rectificar** crea una boleta rectificativa (nota de crédito) con las líneas de la original y la valida; después se calcula y se valida la boleta correcta. Desde la versión 2 la rectificativa **resta** en todos los reportes (C-27): PLAME, AFPnet, pago a bancos, planilla y utilidades.'),
    p('Las capturas son de una mensual del caso ADICIONALES (70001707, noviembre de 2026, sueldo 3 000), rectificada para este manual y restablecida después con el laboratorio (100 %). La tabla de reportes es del ' + escenario.toLowerCase() + ' de la versión 2: la mensual de noviembre se validó con sueldo 2 500 y el correcto era 2 700.'),
    pasos([
      'Abra la boleta validada y pulse **Rectificar**.',
      'Se crea «Rectificación: Boleta de …», marcada **Boleta rectificativa** y con el enlace a la **Boleta rectificada**. Queda validada con su asiento.',
      'Corrija el dato (aquí, el sueldo del contrato) y cree, calcule y valide la boleta nueva del mismo periodo.',
    ]),
    ...figura('c25_01_original_rectificar', 'Mensual de noviembre de 2026 del caso ADICIONALES (sueldo 3 000, por pagar 2 610,00), validada: botón «Rectificar».'),
    ...figura('c25_02_rectificativa_calculo', 'Rectificativa: «Rectificación: Recibo de salario – …», marcada «Boleta rectificativa», con el enlace a la «Boleta rectificada» y las mismas líneas de la original (remuneración 3 000,00, ONP 390,00, EsSalud 270,00, neto 2 610,00).'),
    ...figura('c25_04_lista_boletas_rectificada', 'Las tres boletas del trabajador en noviembre: la original y la rectificativa, validadas, y la nueva en borrador.'),
    tabla(['Reporte de noviembre de 2026', 'Resultado medido'], [
      ['PLAME `.rem`', 'Una sola línea: `01|70009104|0121|2700.00|2700.00|`'],
      ['PLAME `.jor`', '`01|70009104|168|0|0|0|` (una vez)'],
      ['Planilla de sueldos', 'Remuneración 2 700,00; ONP 351,00; neto 2 349,00'],
    ], [3200, 6438]),
    nota('Los controles de la compañía (capítulo 26) no bloquean una rectificativa, y la banda de avisos no se muestra en ella: copia una boleta ya validada. Rectificar una boleta del ejercicio cambia los acumulados de la renta de 5.ª: revise la 5.ª de los meses siguientes.', 'importante'),

    h2('25.1 Qué copia y qué revierte la rectificativa'),
    p('La rectificativa no se recalcula: copia las líneas de la original con su signo contrario en los reportes. Con los lotes de la versión 3, además:'),
    tabla(['Qué', 'Cómo lo trata la rectificativa', 'Lote'], [
      ['El pago', 'Su asiento se concilia con el de la original, cuenta por cuenta: la original deja de tener saldo y no se paga. Si ya estaba pagada, el saldo queda como cuenta por cobrar al trabajador y la original pierde la marca de pagada si el pago ya no la salda', 'Capítulo 28'],
      ['El régimen pensionario', 'El de la original («Régimen pensionario del cálculo»), aunque el trabajador se haya cambiado de AFP o pasado a la ONP: AFPnet resta en la AFP correcta (O-159)', '40'],
      ['Los aportes voluntarios al SPP', 'AFPnet resta también AFPV_001, AFPVS_001 y AFPVE_001', '15'],
      ['Las provisiones en la boleta', 'Revierte lo que la original registró en «Provisiones de beneficios»; la rectificativa impresa lo dice: «Provisiones del empleador que esta rectificativa revierte». La nota de una adicional validada antes de la mensual también registra la diferencia del mes', '20b y 37'],
      ['La prima de Vida Ley', 'Una nota de crédito hecha a mano también revierte la prima (O-138)', '45'],
      ['Las suspensiones del `.snl` y el dominical', 'Usa las que guardó la boleta que rectifica; la boleta nueva guarda las suyas al validarse (O-111, O-167)', '43 y 54'],
    ], [2400, 6038, 1200]),
    h2('25.2 Cuándo conviene rectificar'),
    vinetas([
      '**Una ausencia aprobada, cambiada o rechazada después de validar** (capítulo 22): la boleta validada paga con sus días y el `.snl` declara los guardados. Si el mes debe reflejar la ausencia, rectifique y haga la boleta nueva.',
      '**Una boleta validada que contó un borrador que después se borró o se canceló** (capítulo 12): recibe una nota en su historial para revisar el EsSalud, el crédito EPS y la Vida Ley del mes; si no cuadran, rectifíquela.',
      '**Un dato del trabajador que cambió el cálculo** (el sueldo, la entidad SCTR, la asignación familiar): las boletas validadas no se recalculan nunca solas, ni con la actualización de los módulos.',
    ]),
    pieCapitulo(['base', 'ce'], 'C-27, N-09 (15), N-13 (20b), P-104 (37), O-159 (40), O-111 (43), O-137 y O-138 (45), O-167 (54)'),
  );


  return c;
};
