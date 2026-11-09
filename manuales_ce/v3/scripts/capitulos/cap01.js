// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Cifras y pantallas medidas en contable19 el 2026-10-22.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 1
  a(
    h1('1. Introducción'),
    p('Este manual explica cómo procesar la planilla peruana en **Odoo 19 Community** con la localización SOLSE. Community no trae nómina: la base es el módulo comunitario `om_hr_payroll` (Odoo Mates) y SOLSE le agrega la capa peruana: parámetros legales con vigencia, reglas salariales, maestros SUNAT, archivos PLAME, AFPnet, T-Registro, TXT bancarios, boletas, constancias y el laboratorio de casos que comprueba cada cálculo.'),
    h2('1.1 Cómo leer este manual'),
    vinetas([
      'Capítulos **2 a 9**: **configuración**. Se hacen una vez, al implementar: instalación, menú, parámetros, maestros, seguros, contabilidad (con las provisiones), alta del trabajador y estructuras.',
      'Capítulos **10 a 20**: el **proceso del mes**: boleta, lote, aportes, renta de 5.ª, gratificaciones, CTS, liquidación, vacaciones, feriados, asistencias, novedades y utilidades.',
      'Capítulos **21 a 26**: situaciones especiales: cambios de contrato en el mes, licencias sin goce, subsidios, **micro y pequeña empresa**, rectificativas, avisos y controles.',
      'Capítulos **27 a 30**: las **salidas legales**: PLAME, AFPnet, bancos, pago de la planilla, entrega de boletas y documentos del cese, T-Registro y recibos por honorarios.',
      'Capítulos **31 y 32** (nuevos): el **practicante** (modalidades formativas) y el **SENATI**.',
      'Capítulos **33 y 34**: lo que la localización **no cubre** y la lista de cierre mensual y anual.',
      '**Anexos**: observaciones para implementadores (A), datos de prueba (B), la planilla medida de 2025 y 2026 (C), el historial de versiones (D), el laboratorio (E) y la serie de videos (F).',
    ]),
    p('Los recuadros tienen un significado fijo:'),
    tabla(['Recuadro', 'Para qué'], [
      ['**Nota**', 'Aclaración de uso.'],
      ['**Importante**', 'Algo que, si se omite, da una cifra equivocada o un archivo rechazado.'],
      ['**Para implementadores**', 'Configuración, despliegue o comportamiento medido que conviene conocer antes de salir a producción.'],
      ['**Compruébelo con el laboratorio**', 'El caso del laboratorio que reproduce la cifra: el lector puede correrlo y obtener el mismo resultado.'],
      ['**Límite**', 'Lo que la localización no hace (detalle en el capítulo 33).'],
    ], [3000, 6638]),

    h2('1.2 La regla de oro: los acumulados leen boletas VALIDADAS'),
    p('La renta de 5.ª, el sexto de gratificación de la CTS, el descuento del adelanto, el derecho al subsidio y el tope de la prima de Vida Ley se calculan con acumulados que **solo leen boletas en estado Hecho**. Por eso el orden del proceso importa: primero se validan adelantos, gratificaciones y vacaciones, y después la mensual (capítulo 11). En diciembre la localización avisa si se invierte el orden (capítulo 26).'),
    h2('1.3 De dónde salen las cifras'),
    p('Todas las cifras de este manual salen de una **corrida real** en la base de pruebas `contable19`, en noviembre de 2026, con las versiones de la tabla 1.4. Ninguna se dedujo a mano. Hay tres fuentes:'),
    tabla(['Fuente', 'Dónde', 'Qué muestra'], [
      ['Recorrido del manual', 'FM SYSTEMS SOLUTIONS EIRL', 'Dos trabajadores **ficticios** con DNI **sintéticos**: Lucía Fernanda Ramos Ticona (`99999901`) y Héctor Manuel Salas Quispe (`99999902`), con su planilla completa de enero de 2025 a diciembre de 2026 (64 boletas). Es la continuidad de los manuales v1 y v2.'],
      ['Laboratorio de casos', 'SOLSE Demo Servicios S.A.C. (compañía de laboratorio)', '**25 casos** que siembran trabajadores sintéticos, generan las boletas y los archivos, y los comparan celda por celda con lo que exige la norma: **4 741 celdas**, todas al **100 %**.'],
      ['Laboratorios por empresa', 'SOLSE Demo Pequeña Empresa, Microempresa, Comercio, Industria y Consultora', 'Cinco casos `EMPRESA_*`, cada uno con su compañía propia: un mes completo de una empresa de cada tipo (**688 celdas**, al 100 %). Muestran la pequeña empresa, la microempresa, el comercio con el tiempo parcial, la industria con el SENATI y la consultora con el practicante y el no domiciliado.'],
    ], [2200, 2600, 4838]),
    p('Cuando una cifra del manual coincide con un caso, el texto lo cita (por ejemplo, «caso EMPRESA_PEQUENA, P3»). Para reproducirla, corra el caso como se explica en el capítulo 2 y en el Anexo E.'),
    h2('1.4 Novedades de la versión 3'),
    p('La versión 2 (22 de octubre de 2026) documentó los lotes 1 a 12. La versión 3 suma **los lotes 13 a 71**, todos re-medidos y validados en `contable19` (el detalle por lote está en el Anexo D). Las versiones que documenta este manual son:'),
    tabla(['Módulo', 'Para qué', 'Versión'], [
      ['`om_hr_payroll` / `om_hr_payroll_account`', 'Nómina base Community y su contabilización (Odoo Mates)', '19.0.1.0 / 19.0.0.0'],
      ['`solse_pe_payroll_base`', 'Parámetros con vigencia, acumulados, días no pagados, avisos', `**${h.VERSIONES.base}**`],
      ['`solse_pe_payroll_ce`', 'Núcleo peruano: estructuras, reglas, maestros y todas las salidas legales', `**${h.VERSIONES.ce}**`],
      ['`solse_pe_payroll_ce_demo`', 'Datos de prueba y los casos del laboratorio', `**${h.VERSIONES.ce_demo}**`],
      ['`solse_pe_payroll_renta5_ce` (**nuevo**, lote 39)', 'El detalle de la renta de 5.ª por boleta', `**${h.VERSIONES.renta5}**`],
      ['`solse_pe_payroll_asistencia`', 'Tardanzas, faltas y feriados desde Asistencias', `**${h.VERSIONES.asistencia}**`],
      ['`solse_pe_payroll_asistencia_demo`', 'Caso ASISTENCIA', h.VERSIONES.asistencia_demo],
      ['`solse_pe_plame_demo`', 'Caso PLAME', h.VERSIONES.plame_demo],
      ['`solse_pe_plame_rxh` / `solse_pe_plame_4ta`', 'PLAME de recibos por honorarios', `${h.VERSIONES.plame_rxh} / ${h.VERSIONES.plame_4ta} (sin cambios funcionales)`],
    ], [3300, 4200, 2138]),
    h3('Tipos de trabajador y regímenes'),
    tabla(['Novedad', 'Capítulo'], [
      ['**El practicante** (modalidades formativas): subvención, media subvención, descanso, EsSalud, PLAME y T-Registro', '31'],
      ['**La pequeña empresa** y las opciones del REMYPE (asignación familiar, utilidades de la micro, acreditación y recontratación)', '24'],
      ['**El SENATI**: «Fuera de la base» y el umbral de los 20 trabajadores', '32'],
      ['**El trabajador a tiempo parcial**: sin CTS por defecto, EsSalud con la base mínima', '15 y 17'],
      ['**El no domiciliado** y el convenio para evitar la doble tributación (Comunidad Andina)', '13'],
      ['El comisionista y el destajero («Remuneración principal»)', '8 y 14'],
    ], [7400, 2238]),
    h3('Beneficios y cese'),
    tabla(['Novedad', 'Capítulo'], [
      ['Las **variables regulares** en la remuneración computable, con su forma (variable, fija mensual, periódica)', '9, 14, 15 y 17'],
      ['El **vínculo continuo**: una renovación sin interrupción no reinicia los beneficios', '14 a 17'],
      ['La gratificación de un cese en julio o en diciembre, la trunca con las variables del mes del cese', '14 y 16'],
      ['La **indemnización** con su base completa, el conteo de meses y días, el incentivo por cese y el reingreso', '16'],
      ['El adelanto de vacaciones y los récords al cese', '17'],
      ['Los **documentos del cese**: hoja de liquidación, certificado de trabajo y constancia para el retiro de la CTS', '28'],
      ['Las **utilidades** guardadas por ejercicio, con su hoja de liquidación, el tope con la asignación familiar y el umbral de los 20 trabajadores', '20'],
    ], [7400, 2238]),
    h3('El mes'),
    tabla(['Novedad', 'Capítulo'], [
      ['Las **provisiones** de gratificación, CTS y vacaciones: en un asiento mensual o en la boleta, y su aplicación al pagar', '7'],
      ['Feriados y licencia con goce aparte (0115 y 0907), el trabajo en feriado y el valor hora con la jornada del trabajador', '10, 18 y 20'],
      ['Las **planillas adicionales** (comisiones, bonificaciones y utilidades) y el tipo de planilla de cada estructura', '9 y 11'],
      ['Los conceptos configurados de RRHH, las prestaciones alimentarias y los aportes voluntarios al SPP', '9 y 12'],
      ['El **SCTR por entidad**, el crédito EPS del mes y la Vida Ley sobre la remuneración habitual', '6 y 12'],
      ['La renta de 5.ª en la planilla semanal, con otros empleadores y en el mes de un ingreso extraordinario', '13'],
      ['Los subsidios: el promedio por días de afiliación, el redondeo y la boleta que cruza de mes', '23'],
      ['El aviso de la **remuneración mínima** y los avisos nuevos de cada tema', '10 y 26'],
    ], [7400, 2238]),
    h3('Salidas legales y laboratorio'),
    tabla(['Novedad', 'Capítulo'], [
      ['PLAME: los aportes informativos del `.rem`, el `.jor` con feriados, el `.or5` de otras rentas de 5.ª, el `.toc` de los no domiciliados y el personal en formación', '27'],
      ['AFPnet por compañía y su pago; el pago de la planilla por trabajador', '27 y 28'],
      ['T-Registro del practicante y el convenio en el campo 22', '29'],
      ['El laboratorio: de 14 a **25 casos** y cinco **laboratorios por empresa**, y «Limpiar» seguro con la tarea nocturna', '2 y Anexo E'],
    ], [7400, 2238]),
    h2('1.5 La matriz y el laboratorio'),
    p('Cada cambio tiene un código: **C** (corrección), **U** (interfaz), **V** (validación), **Q** (calidad), **O** (observación), **N** (funcionalidad nueva) y **P** (pregunta de la contadora). Al pie de cada capítulo se indican los ítems que trata, y el Anexo D los lista por lote. Lo que todavía espera la respuesta de la contadora se escribe como **«criterio según la norma, pendiente de confirmación»**, con su código (Anexo A).'),

    pieCapitulo(['base', 'ce', 'ce_demo', 'renta5', 'asistencia']),
  );


  return c;
};
