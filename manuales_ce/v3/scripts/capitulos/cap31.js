// Manual v3, capítulo 31 (nuevo): modalidades formativas, el practicante (lotes 49a, 49b y 49c).
// Cifras del caso EMPRESA_CONSULTORA (compañía «SOLSE Demo Consultora S.A.C.»), medidas en contable19 el 09/11/2026.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  a(
    h1('31. Modalidades formativas: el practicante'),
    p('El practicante (Ley 28518 y su reglamento, D.S. 007-2005-TR) **no es trabajador**: recibe una **subvención económica**, no una remuneración (art. 47). Por eso no tiene AFP ni ONP, ni renta de 5.ª, ni gratificación, ni CTS, ni provisiones; sí tiene la media subvención cada seis meses, un descanso de 15 días y el seguro (EsSalud o privado). Hasta la versión 2 el manual lo declaraba «no cubierto»: desde los lotes 49a a 49c la localización lo calcula y lo declara.'),
    nota('Caso **EMPRESA_CONSULTORA**, trabajadora **S1** «Practicante CONSULTORA profesional» (DNI sintético 70006801): prácticas profesionales desde el 01/01/2026, subvención pactada **1 130,00**, seguro EsSalud. Corra el caso (Anexo E) y abra su boleta de junio de 2026.', 'caso'),

    h2('31.1 El convenio en la ficha'),
    p('El convenio se registra en la **versión del contrato** del practicante, en el grupo de datos laborales. Al marcar **«¿Es practicante?»** aparecen los datos de la modalidad y la versión propone el tipo **«Modalidades formativas»** y la estructura **«Subvención de modalidad formativa»** (SMF). La **subvención pactada** es el sueldo de la versión.'),
    tabla(['Campo', 'Para qué', 'S1'], [
      ['**Modalidad formativa** (Tabla 18)', 'Aprendizaje, prácticas preprofesionales, prácticas profesionales, capacitación laboral juvenil, pasantía, pasantía de docentes o actualización para la reinserción. Fija el factor del mínimo y la jornada máxima', 'Prácticas profesionales'],
      ['**Jornada semanal del convenio (horas)**', 'Con la jornada máxima de la modalidad da la proporción del mínimo. Vacía = la jornada máxima', 'vacía (48 horas)'],
      ['**Seguro médico del practicante**', 'EsSalud (la compañía paga el 9 %) o seguro privado', 'EsSalud'],
      ['**Tipo de centro de formación**', 'Va al T-Registro', 'Universidad'],
      ['**Madre con responsabilidad familiar**', 'Va al T-Registro', 'no'],
      ['**Tipo de pasantía**', 'Solo en la pasantía en la empresa: general, de secundaria o curso obligatorio (cambia el factor: 30 %, 5 % o 0 %)', '—'],
    ], [3100, 4800, 1738]),
    ...figura('c31_01_contrato_practicante', 'Versión del contrato de S1: «¿Es practicante?», prácticas profesionales, seguro EsSalud, estructura «Subvención de modalidad formativa» y subvención 1 130,00.'),
    nota('Si a un practicante se le hace la boleta con otra estructura (por ejemplo, la mensual de empleados), **la boleta avisa y no deja validar**: la subvención no es remuneración y no puede llevar aportes ni 5.ª. Un mismo contrato no mezcla versiones de practicante y de trabajador: un convenio seguido de un contrato de trabajo son **dos contratos** (y dos periodos en el T-Registro).', 'importante'),

    h2('31.2 Qué calcula la boleta'),
    tabla(['Código', 'Concepto', 'Cómo'], [
      ['`SUBV_001`', 'Subvención del mes', 'La **mayor** entre la pactada y el **mínimo**, por los días del mes ÷ 30. Mínimo = RMV × factor de la modalidad × (jornada del convenio ÷ jornada máxima). Jornada máxima: 30 horas en las preprofesionales y 48 en las demás (reglamento, art. 33). Factores: 100 % en aprendizaje, prácticas y capacitación juvenil; 30 % en la pasantía general; 200 % en la actualización para la reinserción'],
      ['`SUBV_ADI_001`', 'Media subvención', 'En la boleta del mes en que la persona **cumple seis meses** de formación en la compañía, o un múltiplo, una sola vez por bloque. Los convenios seguidos o con interrupciones se suman (art. 42 inc. 6; reglamento, art. 34)'],
      ['`SUBV_DES_001`', 'Descanso de 15 días', 'Con la ausencia «Descanso de modalidad formativa (15 días)». Paga esos días en lugar de `SUBV_001`, así que el total del mes no cambia. Avisa si el descanso empieza antes de los doce meses'],
      ['`SUBV_DES_NG_001`', 'Descanso adquirido y no gozado', 'En la boleta del término del convenio (reglamento, art. 39)'],
      ['`ESSALUD_PF_001`', 'EsSalud del practicante', '9 % de lo pagado en el mes, **sin** la base mínima de la RMV (solo con seguro EsSalud)'],
    ], [1900, 2200, 5538]),
    p('**Caso EMPRESA_CONSULTORA, S1, junio de 2026.** En junio cumple seis meses (desde el 01/01/2026), así que la boleta paga la media subvención:'),
    tabla(['Concepto', 'Importe'], [
      ['`SUBV_001` · subvención (pactada 1 130,00 = mínimo con la RMV de 1 130)', '1 130,00'],
      ['`SUBV_ADI_001` · media subvención (cumple seis meses)', '565,00'],
      ['Total pagado', '1 695,00'],
      ['`ESSALUD_PF_001` · 9 % de 1 695,00 (a cargo de la compañía)', '152,55'],
      ['**Neto**', '**1 695,00**'],
    ], [7400, 2238]),
    ...figura('c31_02_boleta_junio_s1', 'Boleta de junio de 2026 de S1 con la estructura SMF: subvención 1 130,00, media subvención 565,00, EsSalud del practicante 152,55 y neto 1 695,00, sin AFP, ONP ni 5.ª.'),
    p('**Lo que no lleva:** AFP, ONP, renta de 5.ª, gratificación, CTS, asignación familiar ni provisiones. No entra en la planilla de sueldos, el `.rem` del PLAME, AFPnet ni el reparto de utilidades (tampoco cuenta para el umbral de los 20 trabajadores, capítulo 20). **Sí** entra en el archivo de pago a bancos.'),

    h2('31.3 Las opciones de la compañía'),
    p('En **Ajustes de la compañía › Nómina PE - Controles**, grupo **«Modalidades formativas (practicantes)»**:'),
    tabla(['Opción', 'Por defecto', 'Efecto'], [
      ['Subvención pactada menor que el mínimo', '**Pagar el mínimo y avisar**', 'Con «Solo avisar (pagar la pactada)», paga lo pactado y avisa'],
      ['Inasistencias del practicante', '**No se descuentan**', 'Con «Descontar los días no pagados», las faltas y licencias sin goce reducen la subvención'],
      ['EsSalud del practicante con la base mínima de la RMV', 'apagada', 'Encendida, el 9 % se calcula al menos sobre la RMV'],
      ['Jornada semanal habitual de la empresa (horas)', '48', 'Referencia de la jornada'],
      ['Descanso del practicante con doce meses cumplidos', 'apagada', 'Encendida, el convenio de doce meses exactos ya tiene descanso (criterio de SUNAFIL)'],
    ], [3500, 2400, 3738]),
    ...figura('c31_03_compania_practicantes', 'Grupo «Modalidades formativas (practicantes)» de la compañía con sus valores por defecto.'),

    h2('31.4 El practicante en el PLAME y en el T-Registro'),
    vinetas([
      '**PLAME.** El practicante **no va al `.rem`**. El asistente del PLAME suma lo pagado en el mes y lo deja en un archivo aparte, `0601AAAAMM_personal_en_formacion.txt`, para digitarlo en la sección **«Personal en formación»** del PDT (un monto por practicante), y lo dice en el resumen. En el caso EMPRESA_CONSULTORA, junio de 2026: «Personal en formación (modalidades formativas): 1, monto pagado 1695.00, EsSalud … 152.55», y el archivo trae la línea `01|70006801|1695.00|` (capítulo 27).',
      '**T-Registro.** El alta del practicante se exporta con la **categoría 5** (personal en formación): `.ide`, `.pfl`, `.per` y `.lug`, sin `.tra` ni `.est`. La baja sin motivo sale con el motivo **07** (término del convenio). Un convenio seguido de un contrato de trabajo son dos periodos (capítulo 29).',
    ]),
    ...figura('c31_04_plame_personal_formacion', 'PLAME de junio de 2026 de SOLSE Demo Consultora: el resumen con el personal en formación (1, monto 1 695,00, EsSalud 152,55) y el archivo para el PDT.'),
    nota('El código de la modalidad en el T-Registro («3» o «03») se confirma con el validador del PVS, y el formato de importación del PDT para el personal en formación no se publicó: por eso el archivo es para **digitar**, no para importar.', 'limite'),

    h2('31.5 Criterios pendientes de la contadora'),
    p('Lo que puede cambiar el cálculo va como **criterio según la norma, pendiente de confirmación**:'),
    tabla(['ID', 'Tema', 'Qué hace hoy'], [
      ['P-141', 'Periodos intermitentes de formación', 'Suma todas las modalidades, sin tope entre convenios, por meses calendario y días sueltos (30 = un mes)'],
      ['P-142', 'Subvención de la media subvención', 'La vigente el día en que se cumplen los seis meses'],
      ['P-145', 'Descanso en convenios de más de 24 meses', 'Un solo descanso'],
      ['P-148', 'Cuentas de la subvención, el descanso, su pasivo y el EsSalud', 'Mapeo por prefijo: 6220, 6271/4031; neto a la 4111'],
      ['P-150', 'Monto del PLAME del personal en formación', 'Todo lo pagado en el mes (mensual, media subvención y descanso)'],
    ], [900, 3600, 5138]),
    p('Con valor por defecto (la contadora puede cambiar la opción): P-140 (convenio de doce meses exactos: sin descanso), P-143 (mes incompleto por días ÷ 30, inasistencias sin descuento), P-144 (EsSalud al 9 % de lo pagado, sin base mínima), P-146 (sin aporte facultativo a pensiones), P-147 (sin SCTR) y P-149 (pagar el mínimo y avisar).'),
    pieCapitulo(['ce', 'ce_demo'], 'O-156 (lote 49a), lote 49b, lote 49c'),
  );

  return c;
};
