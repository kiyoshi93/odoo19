// Manual v3, capítulo 29: T-Registro. Origen: v2 (22/10/2026), actualizado con los lotes 49c (el practicante),
// 55 (la liquidación que cierra el periodo) y 71 (el convenio en el campo 22 del .tra). Cifras del caso TREGISTRO
// (262 celdas, corrido el 08/11/2026 con los mismos valores que en la re-medición del lote 11) y de EMPRESA_CONSULTORA.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 29
  a(
    h1('29. T-Registro'),
    p('**Nómina PE › T-Registro (carga masiva)** genera los archivos de la carga masiva del T-Registro con la estructura del **Manual del PVS T-Registro v2.22** (N-02). Hay cinco operaciones; cada una es un envío aparte:'),
    tabla(['Operación', 'Qué propone', 'Archivos', 'Se valida en'], [
      ['Altas', 'Los periodos laborales que **empiezan** en el rango', 'Trabajador: `RP_<RUC>.ide`, `.tra`, `.per`, `.est`, `.cta`, `.edu`. Practicante: `.ide`, `.pfl`, `.per`, `.lug`', 'PVS T-Registro, que arma el ZIP para SOL'],
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
    h3('Una liquidación en medio cierra el periodo (lote 55)'),
    p('Un **periodo laboral** es el tiempo con contratos seguidos. Una renovación sin interrupción (el contrato nuevo empieza a más tardar el día siguiente al fin del anterior) no es alta ni baja. Pero si entre los dos contratos hay una **liquidación validada** que cierra el primero, son dos periodos: con cese el 30/06 y contrato nuevo el 01/07, salen una baja el 30/06 y un alta el 01/07. Antes salía un solo periodo, sin alta en julio.'),
    vinetas([
      'Si la liquidación se anula con su nota de crédito, vuelve a ser un solo periodo.',
      'El cambio de régimen laboral (por ejemplo, de la micro a la pequeña empresa) no cierra el periodo.',
      'El convenio de prácticas seguido de un contrato de trabajo también son dos periodos (abajo).',
    ]),
    h3('El practicante (lote 49c)'),
    p('El practicante (la versión del contrato con «¿Es practicante?», capítulo 31) se exporta como **personal en formación, categoría 5**:'),
    tabla(['Archivo', 'Qué lleva'], [
      ['`.ide`', 'Sus datos personales, como el de un trabajador'],
      ['`.pfl`', 'La modalidad formativa (Tabla 18, obligatoria; con dos dígitos, «03»), el seguro médico (1 EsSalud, 2 privado), la situación educativa (Tabla 9), la ocupación (Tabla 10), «madre con responsabilidad familiar» (solo mujeres), la discapacidad, el tipo de centro de formación y el horario nocturno'],
      ['`.per`', 'El periodo con la categoría 5, solo el tipo de registro 1'],
      ['`.lug`', 'El establecimiento donde se forma, con la categoría 5'],
    ], [1400, 8238]),
    vinetas([
      'No lleva `.tra`, `.est`, `.cta` ni `.edu`.',
      'La **baja** va en el `.per` con la categoría 5. Sin motivo en el convenio, sale con el **07** (término del convenio) y el aviso: «sin motivo de baja en el convenio: va el 07 (fin del plazo de la formación); si terminó por renuncia (01) o mutuo disenso (08), regístrelo en el contrato».',
      'El paso de practicante a trabajador **va en un contrato nuevo**. Si un mismo contrato mezcla versiones de practicante y de trabajador, no se exporta: «el periodo mezcla versiones de practicante y de trabajador del mismo contrato: el paso va en un contrato nuevo (ponga el fin del convenio el día anterior y cree el contrato de trabajo)».',
      'Faltan la modalidad, el seguro o la situación educativa: el resumen lo dice con el campo de la E09.',
    ]),
    nota('El alta del practicante no tiene todavía una medición en un caso del laboratorio: EMPRESA_CONSULTORA no tiene RUC y el caso TREGISTRO no tiene practicantes. El código de la modalidad con dos dígitos («03») se confirma con el validador del PVS antes de la primera carga real.', 'limite'),

    h2('29.2 Modificaciones'),
    p('Elija **Qué se modifica** y la **Fecha del cambio**: el valor anterior se cierra el día previo y el nuevo rige desde esa fecha. El tipo de trabajador y los datos del contrato se proponen solos (los trabajadores con una versión del contrato que empieza en esa fecha y cambia el dato); en los demás conceptos se eligen los trabajadores.'),
    ...figura('c29_03_modificacion_resultado', 'Modificación del tipo de trabajador con fecha del cambio 16/10/2026: 70001508 propuesto y 2 líneas en el `.per`.'),
    tabla(['Concepto', 'Archivos (caso TREGISTRO, 16/10/2026)'], [
      ['Tipo de trabajador', '`.per` 2: `01|70001508||1|2||15/10/2026|||` y `01|70001508||1|2|16/10/2026||21||`'],
      ['Datos del contrato', '`.tra` 1 (solo los campos que cambian, también el convenio del campo 22), `.per` 1, `.cta` 1'],
      ['Cuenta de abono', '`.per` 1 y `.cta` 1 (`…|002|19187654321098|`)'],
      ['Régimen pensionario', '`.per` 3 (tipo de trabajador, cierre el 15/10 y nuevo régimen desde el 16/10) y `.tra` con el CUSPP'],
      ['Régimen de salud / EPS', '`.per` 3; el último `…|1|3|16/10/2026||01|2|`'],
      ['SCTR salud (Alta, Baja o Cambio de entidad)', '`.per` 2; el segundo `…|1|5|16/10/2026||1||`'],
      ['Establecimiento adicional', '`.est` 1 (`…|20603456786|0001|`)'],
      ['Situación educativa y estudios', '`.tra` 1, `.per` 1 y `.edu` 1'],
      ['Celular, correo y domicilio', '`.ide` 1 (41 campos, sin nombres ni sexo)'],
    ], [3200, 6438]),
    h3('El convenio para evitar la doble tributación: campo 22 del .tra (lote 71)'),
    p('El campo 22 del `.tra` lleva el **«Convenio para evitar la doble tributación»** del contrato (Tabla 25), el del trabajador **no domiciliado** (capítulo 13):'),
    vinetas([
      '**En el alta**, con «0 · Ninguno» va vacío, como antes (el campo no es obligatorio); con otro convenio, su código.',
      '**En la modificación «Datos del contrato»**, si el convenio cambia, va el nuevo; si vuelve a «0 · Ninguno», va «0», porque vacío diría «no se modifica».',
      'Si el contrato tiene convenio y **no** tiene «No domiciliado (Impuesto a la Renta)», avisa: «el contrato tiene el convenio N (Tabla 25) y no «No domiciliado»: el convenio es del trabajador no domiciliado; revíselo».',
      'Japón tiene un convenio vigente, pero no tiene código en la Tabla 25: ese trabajador va con «0 · Ninguno» (capítulo 33).',
    ]),
    nota('Caso EMPRESA_CONSULTORA: S5, de Colombia, con «No domiciliado» y el convenio «3 · Comunidad Andina», da **3** en el campo 22 de su `.tra` (celda «T-Registro de S5: campo 22 del .tra»). S2, de Venezuela, con «0», lo deja vacío. Que el residente andino vaya con el convenio «3» es criterio con valor por defecto (A-7.1).', 'caso'),

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
    nota('Caso TREGISTRO (262 celdas): altas, bajas, las 9 modificaciones y los derechohabientes. Corrido el 08/11/2026 con las versiones del v3: 100 %, con los mismos valores de la re-medición del lote 11.', 'caso'),
    nota('No cubre pensionistas, personal de terceros, el domicilio 2, borrar valores (por ejemplo el CUSPP al volver a la ONP) ni quitar establecimientos; tampoco la modificación masiva de derechohabientes. La prueba en el PVS v2.22 la hace el implementador con su versión del PVS (capítulo 33).', 'limite'),
    pieCapitulo(['ce', 'ce_demo'], 'N-02, U-04, O-156 (lote 49c), O-163 (lote 55), O-195 (lote 71)'),
  );

  return c;
};
