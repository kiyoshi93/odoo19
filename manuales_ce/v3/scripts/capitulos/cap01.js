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
      'Capítulos **2 a 9**: **configuración**. Se hacen una vez, al implementar: instalación, menú, parámetros, maestros, seguros, contabilidad, alta del trabajador y estructuras.',
      'Capítulos **10 a 20**: el **proceso del mes**: boleta, lote, aportes, renta de 5.ª, gratificaciones, CTS, liquidación, vacaciones, feriados, asistencias y novedades.',
      'Capítulos **21 a 26**: situaciones que el v1 no trataba: cambios de contrato en el mes, licencias sin goce, subsidios, microempresa, rectificativas, avisos y controles.',
      'Capítulos **27 a 30**: las **salidas legales**: PLAME, AFPnet, bancos, pago de la planilla, entrega de boletas, T-Registro y recibos por honorarios.',
      'Capítulos **31 y 32**: lo que la localización **no cubre** y la lista de cierre mensual y anual.',
      '**Anexos**: observaciones para implementadores (A), datos de prueba (B), la planilla medida de 2025 y 2026 (C), el historial de versiones (D) y el laboratorio de 14 casos (E).',
    ]),
    p('Los recuadros tienen un significado fijo:'),
    tabla(['Recuadro', 'Para qué'], [
      ['**Nota**', 'Aclaración de uso.'],
      ['**Importante**', 'Algo que, si se omite, da una cifra equivocada o un archivo rechazado.'],
      ['**Para implementadores**', 'Configuración, despliegue o comportamiento medido que conviene conocer antes de salir a producción.'],
      ['**Compruébelo con el laboratorio**', 'El caso del laboratorio que reproduce la cifra: el lector puede correrlo y obtener el mismo resultado.'],
      ['**Límite**', 'Lo que la localización no hace (detalle en el capítulo 31).'],
    ], [3000, 6638]),
    h2('1.2 La regla de oro: los acumulados leen boletas VALIDADAS'),
    p('La renta de 5.ª, el sexto de gratificación de la CTS, el descuento del adelanto, el derecho al subsidio y el tope de la prima de Vida Ley se calculan con acumulados que **solo leen boletas en estado Hecho**. Por eso el orden del proceso importa: primero se validan adelantos, gratificaciones y vacaciones, y después la mensual (capítulo 11). En diciembre la localización avisa si se invierte el orden (capítulo 26).'),
    h2('1.3 De dónde salen las cifras'),
    p('Todas las cifras de este manual salen de una **corrida real** en la base de pruebas `contable19` el 22 de octubre de 2026, con las versiones de la tabla 1.4. Ninguna se dedujo a mano. Hay dos fuentes:'),
    tabla(['Fuente', 'Dónde', 'Qué muestra'], [
      ['Recorrido del manual', 'FM SYSTEMS SOLUTIONS EIRL', 'Dos trabajadores **ficticios** con DNI **sintéticos**: Lucía Fernanda Ramos Ticona (`99999901`) y Héctor Manuel Salas Quispe (`99999902`), con su planilla completa de enero de 2025 a diciembre de 2026 (64 boletas). Es la continuidad del manual v1.'],
      ['Laboratorio de casos', 'SOLSE Demo Servicios S.A.C. (compañía de laboratorio)', '14 casos que siembran trabajadores sintéticos, generan las boletas y los archivos, y los comparan celda por celda con lo que exige la norma. Los 14 están al **100 %** (2 573 celdas). Las funciones nuevas de la versión 2 se muestran con estos casos.'],
    ], [2200, 2600, 4838]),
    p('Cuando una cifra del manual coincide con un caso, el texto lo cita (por ejemplo, «caso TREGISTRO»). Para reproducirla, corra el caso como se explica en el capítulo 2 y en el Anexo E.'),
    h2('1.4 Novedades de la versión 2'),
    p('El manual v1 (7–8 de octubre de 2026) documentó `solse_pe_payroll_base` 19.0.1.6.0 y `solse_pe_payroll_ce` 19.0.1.8.0. Desde entonces se hicieron **65 cambios** en 12 lotes, todos validados en `contable19`. Las versiones que documenta este manual son:'),
    tabla(['Módulo', 'Para qué', 'Versión'], [
      ['`om_hr_payroll` / `om_hr_payroll_account`', 'Nómina base Community y su contabilización (Odoo Mates)', '19.0.1.0 / 19.0.0.0'],
      ['`solse_pe_payroll_base`', 'Parámetros con vigencia, acumulados, días no pagados, avisos', '**19.0.1.20.1**'],
      ['`solse_pe_payroll_ce`', 'Núcleo peruano: estructuras, reglas, maestros y todas las salidas legales', '**19.0.1.27.1**'],
      ['`solse_pe_payroll_ce_demo`', 'Datos de prueba y los casos del laboratorio', '**19.0.2.25.1**'],
      ['`solse_pe_payroll_asistencia`', 'Tardanzas, faltas y feriados desde Asistencias', '**19.0.1.4.1**'],
      ['`solse_pe_payroll_asistencia_demo`', 'Caso ASISTENCIA', '19.0.1.2.1'],
      ['`solse_pe_plame_demo`', 'Caso PLAME', '19.0.1.4.1'],
      ['`solse_pe_plame_rxh` / `solse_pe_plame_4ta`', 'PLAME de recibos por honorarios', '19.0.1.2.0 / 19.0.1.0.0 (sin cambios funcionales)'],
    ], [3300, 4200, 2138]),
    h3('Lo que el v1 declaraba «no cubierto» y ahora existe'),
    tabla(['Función', 'Capítulo'], [
      ['Subsidios por descanso médico y maternidad, con su `.snl`', '23'],
      ['T-Registro: altas, bajas, modificaciones y derechohabientes', '29'],
      ['Indemnización por despido arbitrario', '16'],
      ['Regularización de la renta de 5.ª al cese y devolución', '13 y 16'],
      ['Prima de Vida Ley calculada en la planilla', '6 y 12'],
      ['Pago de la planilla con asiento conciliado', '28'],
      ['Boleta por correo, constancias, liquidación del depósito de CTS y certificado de 5.ª', '28'],
    ], [7000, 2638]),
    h3('Comportamientos nuevos'),
    vinetas([
      'Cambios de contrato dentro del mes: cada sueldo paga sus días (capítulo 21).',
      'Licencias sin goce, permisos por horas y meses sin remuneración (capítulo 22).',
      'Microempresa con SIS y asignación familiar voluntaria (capítulos 9 y 24).',
      'Boletas rectificativas que restan en todos los reportes (capítulo 25).',
      'Avisos y controles configurables por compañía (capítulo 26) y editor de parámetros en tabla (capítulo 4).',
      'Feriados en la conciliación de asistencias: el feriado ya no es falta (capítulo 19).',
    ]),
    h3('Cambios de formato en los archivos legales'),
    vinetas([
      'El `.jor` del PLAME tiene 6 campos: ya no lleva el campo «días» (capítulo 27).',
      'El `.snl` sale lleno con los subsidios y las suspensiones (capítulos 23 y 27).',
      'El TXT bancario sale en ASCII, con los trabajadores omitidos aparte y con un formato propio de Scotiabank (capítulo 27).',
      'El PLAME toma el tipo de documento de la ficha del trabajador (capítulo 8).',
    ]),
    h2('1.5 La matriz y el laboratorio'),
    p('Cada cambio de la versión 2 tiene un código: **C** (corrección), **U** (interfaz), **V** (validación), **Q** (calidad), **O** (observación) y **N** (funcionalidad nueva). Al pie de cada capítulo se indican los ítems que trata, y el Anexo D los lista por lote. La matriz de documentación (`MATRIZ_DOCUMENTACION_NOMINA_CE.md`) dice, para cada ítem, el capítulo, el episodio de video, el caso que lo prueba y sus cifras.'),
    pieCapitulo(['base', 'ce', 'ce_demo', 'asistencia']),
  );


  return c;
};
