// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después). Los avisos nuevos
// (lotes 15 a 71) salen del código de solse_pe_payroll_ce 19.0.1.39.202 (las claves que devuelve `_pe_avisos`) y de la
// hoja «Avisos» de los casos EMPRESA_* (re-medición del lote 71, 100 %).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const anchos = [2300, 5300, 2038];

  // ------------------------------------------------------------------ 26
  a(
    h1('26. Avisos y controles'),
    p('La localización avisa antes de que un error llegue a la boleta, al PLAME o a la contabilidad. Hay tres clases:'),
    vinetas([
      '**Bandas** (siempre activas): avisos amarillos en las listas de boletas y lotes, y arriba del formulario de la boleta y del lote en borrador, sobre los parámetros y los feriados del año (26.1).',
      '**Avisos de la boleta** (26.3): la banda amarilla del formulario de la boleta en borrador. Cada aviso tiene un **código** (la «clave» que se cita en este manual, como «rmv» o «senati»). Casi ninguno bloquea; varios quedan en el historial al validar (26.4).',
      '**Controles al validar**, configurables por compañía en la ficha de la compañía, pestaña **Nómina PE - Controles**, grupo «Controles al validar la boleta»: «Avisar» (banda y nota en el historial al validar), «Bloquear la validación» o «No controlar» (26.2).',
    ]),
    h2('26.1 Bandas de las listas'),
    tabla(['Aviso', 'Cuándo aparece', 'Ítem · capítulo'], [
      ['RMA de AFP desactualizada o faltante', 'La RMA vigente a la fecha tiene más de 95 días o no existe', 'V-03 · 4'],
      ['UIT del año faltante', 'La UIT vigente es de un año anterior', 'V-03 · 4'],
      ['UIT distinta en el catálogo de la facturación', 'Con el catálogo instalado («UIT por año»), la UIT del año no es la del parámetro `pe_uit`. Avisa, no corrige: no se sabe cuál está mal', 'Lote 59 · 4'],
      ['Feriados del año faltantes', 'Ningún feriado registrado en el año para la compañía', 'V-05 · 18'],
      ['Vigencia faltante de un parámetro', 'Al calcular, una regla pide un parámetro sin vigencia a la fecha', 'V-02 · 4 (mensaje al calcular)'],
    ], [2900, 4800, 1938]),
    h2('26.2 Controles al validar'),
    tabla(['Control', 'Cuándo aparece', 'Por defecto', 'Ítem · capítulo'], [
      ['Gratificación y vacaciones de diciembre antes que la mensual', 'En diciembre, con la GRAT o la VAC del mes en borrador («diciembre»)', 'Avisar', 'V-04 · 11'],
      ['Trabajador sin sistema pensionario', 'Sin ONP ni AFP y sin «No aporta pensión» («pension»)', 'Avisar', 'V-04 · 8'],
      ['Subsidio sin los aportes que dan derecho', 'Menos de 3 meses consecutivos o 4 no consecutivos («derecho_subsidio»)', 'Avisar', 'N-01 · 23'],
      ['Boletas del año antes que la liquidación del cese', 'Boletas del año en borrador al liquidar («cese_orden»)', 'Avisar', 'N-04 · 16'],
      ['Trabajador sin póliza Vida Ley', 'Sin póliza vigente de su compañía («vida_ley»)', 'No controlar', 'N-05 · 6'],
    ], [2900, 3600, 1400, 1738]),
    ...figura('c09_04_compania_controles', 'Nómina PE - Controles, grupo «Controles al validar la boleta»: cada control con su opción. FM SYSTEMS tiene todos en «Avisar», salvo Vida Ley en «No controlar».'),
    p('Además se bloquea siempre, sin opción: la boleta sin importes (C-18, capítulo 10) y la del practicante con una estructura que no es la suya, o la de modalidad formativa con un trabajador («practicante_estructura», «formativa_no_practicante», «formativa_mixta»; capítulo 31). La pestaña «Nómina PE - Controles» tiene, debajo de los controles, las **opciones** de cálculo de cada capítulo (feriados, valor hora, suspensiones, provisiones, renta de 5.ª, conceptos, PLAME, MYPE, utilidades, tiempo parcial, SENATI…): no son controles, y cada una se explica en su capítulo.'),

    h2('26.3 Avisos de la boleta, por código'),
    p('Ninguno de esta sección bloquea, salvo los tres del practicante marcados. Con «→ historial», el aviso queda además en el historial de la boleta al validarla.'),
    h3('Generales'),
    tabla(['Código', 'Qué avisa', 'Lote · capítulo'], [
      ['parametros', 'Las bandas de 26.1, también en el formulario', 'V-03 · 4'],
      ['contrato', 'Sin contrato vigente en el periodo: la boleta no tendrá contrato, estructura ni días trabajados', 'V-04 · 8'],
      ['sin_tipo → historial', 'La estructura no tiene tipo de planilla: la boleta no entra en el PLAME, AFPnet, bancos, la planilla ni las utilidades', '16 · 9 y 11'],
      ['pension → historial · diciembre → historial', 'Los controles de 26.2', 'V-04'],
      ['vinculo_nuevo_tras_liquidacion', 'El contrato empieza al día siguiente de un cese con liquidación validada: es otro vínculo', '22b · 16'],
      ['renta5_otro_empleador', 'No retiene 5.ª: la retiene el otro empleador simultáneo que paga más', '26b · 13'],
    ], anchos),
    h3('Remuneración mínima, jornada y tiempo parcial'),
    tabla(['Código', 'Qué avisa', 'Lote · capítulo'], [
      ['rmv', 'El sueldo del contrato (o lo remunerativo del comisionista o el destajero) es menor que la RMV del periodo, o que su parte proporcional con menos de 4 horas diarias', '64 · 10'],
      ['rmv_nocturna', 'Con «Trabajo en horario nocturno», fuera del régimen MYPE: el sueldo es menor que la RMV más el 35 %', '64 · 10'],
      ['valor_hora', 'El horario pasa de 48 horas semanales: el valor hora usa 48 ÷ los días del horario', '24 · 10'],
      ['tiempo_parcial', 'En la CTS, la liquidación y las vacaciones: trabaja menos de 4 horas diarias; la CTS no se calcula (o sí, con «Pagar») y las vacaciones se calculan como a cualquiera', '67 · 15 y 17'],
      ['tiempo_parcial_copia · tiempo_parcial_t12', 'La CTS sale en una estructura copiada antes del lote; la Tabla 12 y el horario no dicen lo mismo', '67 · 15'],
    ], anchos),
    h3('Micro y pequeña empresa'),
    tabla(['Código', 'Qué avisa', 'Lote · capítulo'], [
      ['mype_remype → historial', 'Contrato del régimen especial que empezó antes de la «Acreditación en el REMYPE» de la compañía', '58 · 24'],
      ['mype_recontratado → historial', 'Cesó en el régimen general y fue recontratado en el especial antes de un año', '58 · 24'],
      ['mype_cambio → historial', 'El contrato empezó en el régimen general y una versión posterior lo pasa a la micro o pequeña empresa', '58 · 24'],
      ['mype_nocturna → historial', 'Sobretasa nocturna en la micro o pequeña empresa: no corresponde si la jornada es habitualmente nocturna', '58 · 24'],
    ], anchos),
    h3('El practicante (modalidades formativas)'),
    tabla(['Código', 'Qué avisa', 'Lote · capítulo'], [
      ['practicante_estructura (**bloquea**)', 'Practicante con una estructura que no es «Subvención de modalidad formativa»', '49 · 31'],
      ['formativa_no_practicante · formativa_mixta (**bloquean**)', 'La estructura de modalidad formativa con quien no es practicante, o con días de trabajador en el periodo', '49 · 31'],
      ['formativa_datos', 'El contrato no tiene la modalidad o el seguro médico', '49 · 31'],
      ['subvencion_minima', 'La subvención pactada (o la entrada SUBV_001) es menor que el mínimo de la modalidad', '49 · 31'],
      ['formativa_jornada · formativa_horas_extra · formativa_docentes', 'Jornada del convenio sobre la máxima; entradas de horas extra; pasantía de docentes con subvención', '49 · 31'],
      ['media_subvencion · media_subvencion_anterior', 'Se cumplieron seis meses (o un múltiplo): la media subvención se paga en el plazo; o se cumplieron antes de la primera boleta', '49 · 31'],
      ['fin_del_convenio', 'El convenio termina: lo que falte se paga dentro de las 48 horas', '49 · 31'],
      ['descanso_sin_derecho · descanso_ya_pagado · descanso_tope · descanso_despues_del_goce · descanso_por_vencer', 'El descanso de 15 días: antes de los doce meses, ya pagado como no gozado, más de 15 días, pagado después del goce o sin programar', '49 · 31'],
    ], anchos),
    h3('El extranjero y el no domiciliado'),
    tabla(['Código', 'Qué avisa', 'Lote · capítulo'], [
      ['no_domiciliado_sin_marca', 'Documento de extranjero, sin la marca «No domiciliado» y 183 días o menos en la compañía al 31/12 anterior: si llegó hace poco, su 5.ª es el 30 %', '69 · 13'],
      ['no_domiciliado', 'Con la marca, pero con más de 183 días en el país al 31/12 anterior: desde el 1 de enero sería domiciliado', '69 · 13'],
      ['no_domiciliado_andino', 'Retiene el 30 % y su país es de la Comunidad Andina: ¿residía allí? (convenio «3 · Comunidad Andina»)', '71 · 13'],
      ['no_domiciliado_cambio · no_domiciliado_tope · no_domiciliado_copia · no_domiciliado_devolucion', 'La marca o el convenio cambian en el año; la boleta no puede retener todo el 30 %; R5TA_001 copiada antes del lote; DEV5_001 a un no domiciliado', '69 y 71 · 13'],
      ['extranjero_sin_regimen', 'Documento de extranjero y «Sin régimen pensionario» (Tabla 11, 99)', '69 · 8'],
    ], anchos),
    h3('Aportes y seguros'),
    tabla(['Código', 'Qué avisa', 'Lote · capítulo'], [
      ['senati', '«Afecta a SENATI» y el año anterior tuvo 20 trabajadores o menos en promedio en la actividad industrial (o no hay contratos en todos los meses)', '66 · 12 y 32'],
      ['senati_copia', 'Contrato «Fuera de la base del SENATI» y la boleta igual lleva SENATI_001 (regla copiada antes del lote)', '66 · 32'],
      ['sctr_entidad · sctr_poliza · sctr_tasa', 'Sin la entidad SCTR en la ficha; sin póliza vigente de la entidad (usa la tasa referencial); tasa de la póliza sobre el 5 %', '19 · 6 y 12'],
      ['sctr_estructura · sctr_formula · sctr_cuenta · sctr_historia', 'La estructura sin la regla de la entidad o con la fórmula anterior; SCTR_SAL_001 o SCTR_PEN_001 con pasivo 4031 o 4032; la ficha cambió después del periodo', '19 · 12'],
      ['sctr_gratificacion', 'La póliza cobra el SCTR sobre la gratificación ordinaria (también la del cese)', '34a, 45 · 12'],
      ['credito_eps → historial', 'El crédito EPS de la compañía en el mes pasa el 10 % de la UIT por trabajador cubierto', '34a · 12'],
      ['eps_no_vigente → historial · eps_formula → historial', 'El plan EPS no está vigente en el mes; la estructura tiene una copia vieja de EPS_CRED_001', '45 · 12'],
      ['vida_ley', 'Sin póliza, póliza de otra compañía, sin la regla VIDA_001, sin tasa ni importe, días de inhabilitación', 'N-05, 34b · 6 y 12'],
      ['aporte_voluntario', 'Aporte voluntario al SPP a quien no es afiliado: no se calcula', '15 · 12'],
    ], anchos),
    h3('Conceptos, feriados y asistencias'),
    tabla(['Código', 'Qué avisa', 'Lote · capítulo'], [
      ['prestaciones_alimentarias', 'Con «Solo avisar»: los vales pasan el tope (el menor entre el 20 % de la remuneración ordinaria y 2 RMV)', '15, 29 · 10'],
      ['prestaciones_sin_regla · prestaciones_neto_sin_regla · prestaciones_sin_ordinaria', 'La estructura no tiene PRALI_EXC_001 o PRALI_ENT_001; vales en una boleta sin remuneración ordinaria', '29, 44 · 10'],
      ['trabajo_en_feriado · primero_mayo_sin_regla', 'Horas de feriado o el 1 de mayo en el descanso, y la estructura no tiene TFER_001 o FMAY_001', '18, 31b · 18'],
      ['feriado_hora', 'Un feriado no empieza a las 00:00 en la zona del horario', '18 · 18'],
      ['sin_descanso_semanal', 'El horario trabaja los 7 días: no se sabe cuál es el descanso semanal', '31b · 18'],
      ['feriado_trabajado · feriado_pagado · feriado_doble', 'Asistencias: marcó en un feriado (sin la opción); horas de feriado pagadas desde las asistencias; horas a mano y de las asistencias a la vez', '18 · 19'],
    ], anchos),
    h3('Remuneración computable, provisiones y subsidios'),
    tabla(['Código', 'Qué avisa', 'Lote · capítulo'], [
      ['computable', 'El detalle de las variables regulares por beneficio y concepto (al validar, «Remuneración computable al validar»)', '17 · 14'],
      ['principal_imprecisa', 'Comisiones mayores que el sueldo con la marca «Fija», o la marca del contrato distinta del T-Registro', '33b · 14'],
      ['provision_estructura → historial · provision_adicionales → historial', 'La estructura sin las reglas de provisión; planillas adicionales del mes en borrador', '20b · 7'],
      ['provision_por_asiento · provision_ajuste', 'La semanal no provisiona («Por el asiento mensual»); el asiento de provisiones del mes ya está contabilizado', '20b, 36 · 7'],
      ['adelanto_vacaciones · vacaciones_orden → historial', 'Días de goce a cuenta de un récord no cumplido (requiere acuerdo escrito); vacacional anterior a otra ya validada', '35a, 46b · 17'],
      ['subsidio · subsidio_no_pagado', 'Sin remuneraciones en los 12 meses anteriores (usa el contrato); tipos de subsidio marcados «no pagados» en la estructura', 'N-01 · 23'],
      ['semanal_orden · semanal_sin_retener · renta5_tope', 'Renta de 5.ª de la semanal: una semanal anterior del mes en borrador; semanales validadas sin retener; la retención llegó al tope', '27a · 13'],
    ], anchos),
    p('Los avisos de la **liquidación** (los que empiezan por «cese_», «indemnizacion», «incentivo_cese», «gratificacion_trunca_pagada» y «no_domiciliado_cese») están en el capítulo 16. Los «cese_» quedan en el historial al validar.'),

    h2('26.4 Lo que queda en el historial al validar'),
    p('Al validar, la boleta deja en su historial la nota «Validada con avisos:» con los avisos marcados «→ historial» arriba (y todos los «cese_» y «mype_»), y dos notas propias:'),
    vinetas([
      '**«Remuneración computable al validar:»** con el detalle de las variables regulares que usó la boleta (lote 17).',
      '**Los días trabajados que no coinciden con las ausencias aprobadas de hoy** (una licencia aprobada, cambiada o rechazada después de crear la boleta): la boleta paga con sus días y el `.snl` declara los guardados (lote 54; capítulo 22).',
      'Además, en otras boletas: **«Entradas con el mismo código unidas en una»** al calcular (lote 44), y la nota a la boleta validada que contó un borrador del mes que después se borró o se canceló (lote 45, O-137; capítulo 12).',
    ]),

    h2('26.5 Ejemplos medidos'),
    tabla(['Caso (hoja «Avisos», re-medición del lote 71)', 'Boleta', 'Código'], [
      ['EMPRESA_COMERCIO, K5, vigilante nocturno de 1 600', 'Octubre de 2026 (RMV 1 230)', 'rmv_nocturna'],
      ['EMPRESA_COMERCIO, K6, 1 200 / K7, 44 h semanales / K8, 15 h semanales', 'Octubre de 2026', 'rmv'],
      ['EMPRESA_COMERCIO, K8, 3 horas diarias', 'CTS de mayo de 2026', 'tiempo_parcial'],
      ['EMPRESA_PEQUENA, P4 (contrato anterior al REMYPE) / P5 (recontratada antes del año)', 'Su mensual', 'mype_remype / mype_recontratado'],
      ['EMPRESA_INDUSTRIA, I2 e I1 (en 2025, 3 trabajadores del SENATI)', 'Junio de 2026 y semanal del 01/06/2026', 'senati'],
      ['EMPRESA_INDUSTRIA, I4, «Fuera de la base del SENATI»', 'Junio de 2026', '(ninguno)'],
      ['EMPRESA_CONSULTORA, S2, extranjero llegado el 04/05/2026', 'Junio de 2026 / enero de 2027', '(ninguno) / no_domiciliado'],
    ], [4600, 2800, 2238]),
    p('El texto del aviso de la RMV, medido en la re-medición del lote 64: «El sueldo del contrato de <trabajador> (1 130,00, sin otros conceptos) es menor que la remuneración mínima vital del periodo, 1 230,00. Revise el sueldo del contrato.» En FM SYSTEMS, 2 contratos vigentes avisarían «rmv» en su próxima mensual (impacto del lote 64).'),
    ...figura('c26_04_sin_contrato_vigente', 'Boleta nueva (sin guardar) de agosto de 2026 de un trabajador del caso AUMENTO cuyo contrato empieza el 01/09/2026: «… no tiene contrato vigente entre el 01/08/2026 y el 31/08/2026: la boleta no tendrá contrato, estructura ni días trabajados…».'),
    ...figura('c26_02_sin_sistema_pensionario', 'Boleta nueva (sin guardar) de noviembre de 2026 de un trabajador de la compañía de laboratorio sin ONP ni AFP y sin contrato: los dos avisos, «… no tiene contrato vigente…» y «… no tiene sistema pensionario (ONP o AFP): la boleta no calculará aportes de pensión. Regístrelo en su ficha (Nómina PE › Sistema pensionario) o marque «No aporta pensión» si corresponde».'),
    ...figura('c26_01_diciembre_grati_borrador_dias', 'Mensual nueva de diciembre de 2026 (caso AUMENTO) con la gratificación del mes en borrador, creada para la captura y borrada después: «La boleta de Gratificaciones del 01/12/2026 al 31/12/2026 (…) está en borrador: valídela ANTES que esta boleta. En diciembre la renta de 5.ª ya no se corrige en otro mes».'),
    h3('Vigencia faltante (V-02)'),
    p('Si una regla pide un parámetro sin vigencia a la fecha de la boleta, el cálculo se detiene con un mensaje funcional. Medido el 09/11/2026 con una boleta de diciembre de 2024 de una trabajadora con contrato desde 2016 (antes de la primera vigencia; creada para la medición y borrada después):'),
    p('«Falta registrar «Asignación familiar (10% RMV)» (pe_asig_familiar) vigente al 31/12/2024 (la primera vigencia registrada es desde el 01/01/2025). Regístrelo en Nómina › Nómina PE › Parámetros de Nómina PE. Boleta: …, regla Asignación familiar (ASF_001).»'),
    ...figura('c26_03_vigencia_faltante', 'En el navegador, el error se muestra como «¡Vaya! Ocurrió un error…»; arriba, las bandas de la RMA y los feriados de 2024. El mensaje funcional queda al final de «Ver detalles técnicos» (O-64, sigue igual el 09/11/2026).'),
    ...figura('c26_03b_vigencia_detalle', 'Ver detalles técnicos: la última línea del error es «VigenciaFaltante: Falta registrar «Asignación familiar (10% RMV)» (pe_asig_familiar) vigente al 31/12/2024…».'),
    nota('Medido el 22/10/2026 y otra vez el 09/11/2026: por RPC el mensaje es el funcional, pero el cliente web no lo muestra como advertencia. La excepción `VigenciaFaltante` hereda de `UserError`, aunque el navegador la trata como un error de servidor y la muestra en el diálogo genérico. Mientras no se corrija (O-64, archivo de hallazgos; la versión 19.0.1.21.14 de la base no lo cambia), abra «Ver detalles técnicos» y lea la última línea: ahí está el parámetro que falta y la fecha.', 'importante'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'V-02, V-03, V-04, V-05, C-42 (16), C-41 (17), C-43 y N-11 (18), N-12 (19), N-13 (20b), C-47 (24), P-84 (33b), C-46 (34a), O-105 (44), O-133, O-135 y O-137 (45), O-156 (49), O-167 (54), O-180 y O-181 (58), lote 59, O-189 (64), O-192 (66), O-193 (67), O-194 (69), O-195 (71)'),
  );


  return c;
};
