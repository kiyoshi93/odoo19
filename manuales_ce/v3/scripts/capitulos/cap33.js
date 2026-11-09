// Manual v3, capítulo 33 (era el 31 en el v2): lo que la localización no cubre. Reúne los límites que encontraron los
// capítulos del v3 (lotes 12 a 71) y los criterios que esperan a la contadora.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  a(
    h1('33. Lo que la localización no cubre'),
    p('Lo que la versión 1 declaraba «no cubierto» (subsidios, T-Registro, indemnización, regularización de 5.ª, Vida Ley y pago de la planilla) ya existía en la versión 2. La versión 3 suma lo que la 2 todavía dejaba fuera: el **practicante** (capítulo 31), el **trabajo en feriado** con su sobretasa (capítulos 18 y 19), la **pequeña empresa** (capítulo 24), el **SENATI** con su umbral (capítulo 32), el **no domiciliado** (capítulo 13) y las **provisiones** (capítulo 7). Queda fuera:'),

    h2('33.1 Salidas legales y bancos'),
    tabla(['Tema', 'Estado'], [
      ['TXT del Banco de la Nación y formato oficial de Scotiabank', '**Bloqueado** (N-06): los bancos no publican el formato, lo entregan al afiliar a la empresa. Scotiabank sale con un formato propio y el aviso «sin validar»'],
      ['T-Registro: pensionistas, personal de terceros y domicilio 2', 'No cubierto. El personal en formación sí se exporta desde la versión 3 (capítulo 29)'],
      ['T-Registro: borrar valores (el CUSPP al volver a la ONP, una situación especial) y quitar establecimientos', 'No cubierto: no hay una forma documentada por carga masiva; se hace en SOL'],
      ['Derechohabientes: modificación masiva, domicilio propio y segundo domicilio', 'La modificación es solo individual en SOL; el domicilio exportado es el del titular'],
      ['Pruebas externas', 'Los archivos del T-Registro se validan en el PVS del implementador; los TXT de derechohabientes no tienen validador fuera de SOL. La importación al PDT 4.7 del `.or5`, del `.toc` y del archivo del personal en formación, y el PLE 3.11 con el validador de SUNAT, no se probaron en la base de pruebas'],
      ['Personal en formación en el PDT', 'No hay formato de importación publicado: el archivo es para **digitar** (capítulo 31)'],
      ['Tabla 25 del T-Registro', 'No tiene el convenio con **Japón** (O-197): ese trabajador va con «0 · Ninguno» y retiene el 30 %'],
      ['Firma digital certificada de la boleta', 'No: la boleta lleva la imagen de la firma del representante del empleador'],
    ], [3800, 5838]),

    h2('33.2 Cálculo'),
    tabla(['Tema', 'Estado'], [
      ['Tope de 90 remuneraciones diarias de la CTS de la pequeña empresa', '**No se aplica** (O-178). Si es acumulado o por periodo: criterio pendiente de la contadora (P-159). Capítulos 15 y 24'],
      ['La parte de pequeña empresa de un semestre con cambio de régimen', 'Criterio pendiente (P-126)'],
      ['Dominical proporcional (O-112) y el 1 de mayo del destajero', 'No se calculan'],
      ['Dos mensuales en el mismo mes', 'No ajustan la básica a 30 días: use una sola mensual (capítulo 21). El valor hora con dos versiones del contrato en el mes usa la de cada boleta'],
      ['Básica de un mes con suspensiones', 'El piso del lote 25b no cubre todos los casos (capítulo 22)'],
      ['Asistencias', 'El descanso semanal trabajado y el feriado en un día libre del horario no salen de las asistencias; el calendario de dos semanas suma las horas de las dos (O-57); los turnos que cruzan la medianoche se concilian por día calendario (O-58); las faltas de la conciliación no cuentan para el piso de la básica'],
      ['SCTR', 'Sin tasa por trabajador o por actividad; la ficha no guarda historia; la factura de la aseguradora y la conciliación con el PDT quedan fuera'],
      ['Vida Ley', 'Una sola póliza por trabajador (N-05); en la semanal, la prima se reparte entre las 4 o 5 boletas del mes'],
      ['Renta de 5.ª de otros empleadores', 'El registro no guarda historia de sus cambios'],
    ], [3800, 5838]),

    h2('33.3 Provisiones'),
    vinetas([
      'No se provisionan las subvenciones del practicante (P-99) ni se distingue al gerente que decide no gozar el descanso (P-153).',
      'La gratificación y la CTS no se remiden al cierre (solo las vacaciones, capítulo 7).',
      'El adelanto de vacaciones no deja un saldo deudor en una cuenta de activo.',
      'Con más de un ejercicio anterior sin cerrar, el saldo inicial va entero al último día del inmediato anterior.',
    ]),

    h2('33.4 Lo que se observó al documentar la versión 3'),
    p('Se informó al equipo de desarrollo (archivo de hallazgos del manual) y puede cambiar en una versión siguiente:'),
    vinetas([
      '**«Registrar pago» con provisiones en la boleta.** Con «Provisión mensual de beneficios» = «En la boleta mensual», o con la aplicación de lo provisionado en la boleta del beneficio, el saldo por pagar suma las líneas de provisión y de aplicación (cuentas 4114, 4115 y 4151 con el trabajador como socio) y ya no coincide con el neto: esas planillas no se pagan con el asistente (capítulo 28). Con el asiento mensual de provisiones no pasa.',
      'Con «Avisar» en las vacaciones no gozadas al cese, la liquidación descarga del pasivo un récord que no paga.',
      'La banda de feriados del año sin cargar se apaga cuando hay feriados registrados en un solo horario.',
      'La CTS y la CTS trunca no tienen concepto PLAME (no se declaran en el PDT, como corresponde; está por confirmar si conviene el 0904 informativo).',
      'Los contratos de los casos `EMPRESA_*` no tienen tipo de trabajador (T8): su T-Registro sale «no se exporta». Las compañías de laboratorio no tienen RUC: sirven para mirar, no para presentar.',
    ]),

    h2('33.5 Criterios pendientes de la contadora'),
    p('Lo que puede cambiar un cálculo o una pantalla se aplica **según la norma** y se marca en cada capítulo como **«criterio según la norma, pendiente de confirmación»**, con su código (P-xx o A-x.x). La lista completa, con lo que hace hoy el sistema, está en el Anexo A.'),
    pieCapitulo(['ce', 'asistencia'], 'N-06, O-57, O-58, O-112, O-178, O-197'),
  );

  return c;
};
