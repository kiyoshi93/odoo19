// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

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
