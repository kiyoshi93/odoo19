// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Cifras y pantallas medidas en contable19 el 2026-10-22.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 2
  a(
    h1('2. Instalación y actualización'),
    p('Instale desde **Aplicaciones** (modo desarrollador). `om_hr_payroll` y `om_hr_payroll_account` no vienen en los paquetes SOLSE: deben estar en el `addons_path`. Basta con instalar `solse_pe_payroll_ce`: arrastra a `solse_pe_payroll_base` y a los dos módulos de Odoo Mates.'),
    tabla(['Orden', 'Módulo', 'Para qué', '¿Obligatorio?'], [
      ['1', '`om_hr_payroll` + `om_hr_payroll_account`', 'Nómina base Community y su contabilización', 'Sí'],
      ['2', '`solse_pe_payroll_base`', 'Parámetros con vigencia, acumulados por SQL, días no pagados, avisos de vigencias', 'Sí'],
      ['3', '`solse_pe_payroll_ce`', 'Núcleo peruano: estructuras, reglas, maestros, PLAME, AFPnet, bancos, T-Registro, planilla, utilidades, pago y entrega de boletas', 'Sí'],
      ['4', '`solse_pe_payroll_asistencia`', 'Tardanzas, faltas y feriados desde Asistencias', 'Opcional'],
      ['5', '`solse_pe_plame_rxh` y `solse_pe_plame_4ta`', 'PLAME de recibos por honorarios; el segundo los agrega al ZIP de la planilla', 'Opcional'],
      ['6', '`solse_pe_payroll_ce_demo` y los `*_demo`', 'Laboratorio de casos y datos de prueba. Solo en bases de prueba', 'No (pruebas)'],
    ], [800, 3200, 4238, 1400]),
    ...figura('c02_01_aplicaciones_versiones', 'Aplicaciones filtradas por «Nómina Peruana», «Payroll» y «PLAME», solo las instaladas: cada módulo con su versión.'),
    nota('Las variantes Community y Enterprise **no se pueden mezclar**: `solse_pe_payroll_base` bloquea la instalación si encuentra la nómina Enterprise de SOLSE (`solse_pe_payroll`), porque ambas siembran los mismos parámetros. En Aplicaciones aparecen las dos; instale solo las «(Community)».', 'importante'),
    h2('2.1 Base nueva: sin pasos manuales'),
    p('En la versión 2 la nómina se instala en una base nueva **sin ningún paso manual** (C-14, C-15):'),
    vinetas([
      'La instalación desde cero ya no se detiene al convertir las cuentas de las reglas (C-14).',
      'Cuando la compañía carga su plan contable peruano, aunque sea después de la nómina, se crean para ella el diario **Planillas (PLLA)** y las cuentas de las reglas, respetando lo que ya tenga asignado (C-15). La primera boleta se contabiliza sin usar el asistente «Asignar cuentas».',
      'El contrato nuevo nace con la categoría «Régimen General» y su estructura (C-07), y la boleta toma el diario Planillas (C-06).',
    ]),
    h2('2.2 Qué hace cada actualización'),
    p('Al instalar y en **cada actualización** (`-u`), `solse_pe_payroll_ce` ejecuta su inicializador:'),
    vinetas([
      'crea o repara las estructuras NME, NSO, NQA, GRAT, CTS, VAC y LIQ y sus reglas;',
      'asigna las cuentas contables **solo donde faltan**: una cuenta cambiada a mano, por ejemplo una subcuenta 4111 por sede, se conserva (C-21);',
      'deja un registro en el log: con todo asignado, «Cuentas CE: 0 asignaciones» en cada compañía;',
      'archiva las reglas de India de `om_hr_payroll` (HRA, DA, viajes, comidas, gastos médicos) que ninguna estructura use (U-03).',
    ]),
    p('Algunas versiones traen **post-migraciones** que completan datos existentes sin pisar lo que el cliente cambió. Por ejemplo, la 19.0.1.27.0 pone el código de la Tabla 19 en los parentescos que siembra el módulo, solo donde está vacío.'),
    h3('Lista de despliegue'),
    pasos([
      'Detenga el servicio de Odoo.',
      'Reemplace las carpetas de los módulos **en una sola copia**. Si el `addons_path` tiene dos carpetas con los mismos módulos, Odoo carga la que esté primero en la ruta y puede cargar la versión vieja (medido en los lotes 9 a 11).',
      'Ejecute `odoo-bin -c <conf> -d <base> -u solse_pe_payroll_ce --stop-after-init` (o los módulos que traiga la entrega).',
      'Revise el log: sin líneas ERROR y con «Cuentas CE: 0 asignaciones».',
      '**Levante el servicio** y recargue el navegador. Con `--stop-after-init` el servicio queda detenido y el navegador recibe «502».',
      'En **Aplicaciones**, compruebe las versiones de la tabla 1.4 (figura anterior).',
      'Si usa el laboratorio: **Sincronizar casos** y correr los 14 casos (2.3). Todos deben quedar al 100 %.',
    ]),
    nota('El horario de trabajo (calendario) de cada compañía debe estar en la zona **America/Lima**: la conciliación de asistencias ubica las marcaciones en la zona del calendario. Si está en UTC, que es lo que crea una base nueva cuando el administrador no tiene zona, las tardanzas salen desplazadas 5 horas (O-62). Ponga también America/Lima en la preferencia de cada usuario: Odoo toma la fecha de «hoy» de la zona del usuario y, entre las 19:00 y las 24:00 de Lima, un usuario en UTC ve el día siguiente (por ejemplo, en el nombre de los TXT de derechohabientes).', 'implementador'),
    h2('2.3 El laboratorio de casos'),
    p('El laboratorio (`solse_pe_demo_libros` con `solse_pe_payroll_ce_demo`) vive en la aplicación **SOLSE Demo** y trabaja en compañías propias de prueba. Para la nómina, la compañía es **SOLSE Demo Servicios S.A.C.**'),
    ...figura('c02_02_laboratorio', 'Laboratorio SOLSE Perú: «② Sincronizar casos» actualiza la lista de casos después de cada actualización; arriba, 14 casos y 14 conformes.'),
    tabla(['Botón del laboratorio', 'Qué hace'], [
      ['① Construir laboratorio', 'Crea las compañías de prueba y su configuración (una vez por base).'],
      ['② Sincronizar casos', 'Registra los casos nuevos y actualiza nombre y estructuras de los existentes. Úselo después de cada `-u` (por ejemplo, el lote 12 amplió ASISTENCIA de 73 a 94 celdas).'],
      ['Diagnosticar', 'Revisa la configuración del laboratorio.'],
      ['Limpiar todo', 'Borra los datos sembrados por todos los casos.'],
    ], [3000, 6638]),
    ...figura('c02_03_casos_100', 'Casos de demostración: los 14 de la nómina, en estado «Comparado» y con 100,00 de coincidencia.'),
    p('Cada caso se corre con sus botones numerados. Siempre en este orden y, en el mismo día, **NOMINA antes que PLAME**:'),
    pasos([
      '**⑤ Limpiar**: borra los datos que el caso sembró antes.',
      '**① Sembrar datos**: crea los trabajadores sintéticos, contratos, pólizas, ausencias y marcaciones del caso.',
      '**② Generar**: calcula y valida las boletas y genera los archivos (PLAME, TXT, T-Registro…).',
      '**④ Comparar**: compara cada valor generado con el esperado, que sale de la norma, y deja la comparación con su Excel.',
    ]),
    ...figura('c02_04_caso_tregistro', 'Caso TREGISTRO conforme: 262 celdas comparadas, 0 diferencias. En «Comparaciones» se descarga el Excel.'),
    tabla(['Caso', 'Celdas', 'Qué prueba'], [
      ['NOMINA', '525', 'Planilla de julio con 13 trabajadores: aportes, 5.ª, gratificación, vacaciones, liquidación, AFPnet, asiento y parámetros'],
      ['BOLETA', '166', 'Boleta impresa: ingresos − descuentos = neto, al centavo'],
      ['BANCOS', '407', 'TXT de BCP, Interbank y Scotiabank, haberes y CTS, y omitidos'],
      ['MICRO', '83', 'Microempresa: SIS, sin gratificación ni CTS, vacaciones de 15 días'],
      ['UTILIDADES', '33', 'Reparto de utilidades y su tope'],
      ['AUMENTO', '66', 'Aumento a mitad de mes, dos contratos y licencia sin goce'],
      ['SUBSIDIOS', '344', 'Descanso médico (20 y 21), maternidad (22) y derecho al subsidio'],
      ['CESE', '149', 'Renta de 5.ª en el mes del cese: ajuste final y devolución'],
      ['INDEMNIZACION', '63', 'Indemnización por despido arbitrario'],
      ['VIDALEY', '58', 'Prima de Vida Ley: tasa, tope, importe fijo, póliza vencida y semanal'],
      ['TREGISTRO', '262', 'Altas, bajas, 9 modificaciones y derechohabientes del T-Registro'],
      ['ASISTENCIA', '94', 'Tardanzas, faltas, medias jornadas y feriados'],
      ['PLAME', '121', 'ZIP del PDT: `.rem`, `.jor`, `.snl` y la 4.ª'],
      ['PLAME-RXH', '202', 'PLAME de 4.ª categoría sin nómina: `.ps4` y `.4ta`'],
    ], [2000, 1000, 6638]),
    nota('Los casos se corrieron el 22/10/2026 después del lote 12: los 14 al 100 %, 2 573 celdas. El Anexo E detalla cada caso.', 'caso'),
    h2('2.4 Los datos de prueba no tocan una compañía real'),
    p('El asistente **Nómina › Nómina PE › Datos de prueba (demo)** solo carga datos en las compañías del laboratorio o en la compañía de una base nueva (Q-01). En una compañía real se abre, lo explica y solo deja **4. Validación interna**, que revisa la configuración sin escribir nada.'),
    ...figura('c02_05_datos_de_prueba_en_fm', 'Datos de prueba en FM SYSTEMS: es una compañía real y el asistente no carga datos.'),
    nota('Antes de esta corrección, una siembra antigua dejó a FM SYSTEMS afecta a SENATI. Se mantiene así a propósito, para que el recorrido conserve sus cifras: las boletas de FM llevan SENATI_001.', 'implementador'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-14, C-15, C-21, Q-01, Q-04, Q-05, O-51'),
  );


  return c;
};
