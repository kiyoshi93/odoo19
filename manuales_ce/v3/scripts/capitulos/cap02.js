// Manual v3, capítulo 2: instalación, actualización y laboratorio. Origen: v2 (22/10/2026), actualizado con los lotes
// 15, 16, 16b, 18, 39, 40, 57, 60 a 68 y 70. Cifras de las re-mediciones en contable19 (lotes 16, 39 a 42, 43 a 56 y
// 70-71) y de los 30 casos del laboratorio corridos el 08 y el 09/11/2026.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 2
  a(
    h1('2. Instalación y actualización'),
    p('Instale desde **Aplicaciones** (modo desarrollador). `om_hr_payroll` y `om_hr_payroll_account` no vienen en los paquetes SOLSE: deben estar en el `addons_path`. Basta con instalar `solse_pe_payroll_ce`: arrastra a `solse_pe_payroll_base` y a los dos módulos de Odoo Mates. El detalle de la renta de 5.ª es un módulo aparte, `solse_pe_payroll_renta5_ce`, que se instala después.'),
    tabla(['Orden', 'Módulo', 'Para qué', 'Versión del v3', '¿Obligatorio?'], [
      ['1', '`om_hr_payroll` + `om_hr_payroll_account`', 'Nómina base Community y su contabilización', '19.0.1.0 · 19.0.0.0', 'Sí'],
      ['2', '`solse_pe_payroll_base`', 'Parámetros con vigencia, acumulados por SQL, días no pagados, avisos de vigencias', '19.0.1.21.14', 'Sí'],
      ['3', '`solse_pe_payroll_ce`', 'Núcleo peruano: estructuras, reglas, maestros, PLAME, AFPnet, bancos, T-Registro, planilla, utilidades, provisiones, practicantes, pago y entrega de boletas', '19.0.1.39.202', 'Sí'],
      ['4', '`solse_pe_payroll_renta5_ce` (**nuevo**, lote 39)', 'Pestaña «Renta de 5ta» de la boleta con el cálculo paso a paso, la lista «Detalle de Renta de 5ta» y su PDF (capítulo 13). No cambia ningún importe', '19.0.1.0.4', 'Recomendado'],
      ['5', '`solse_pe_payroll_asistencia`', 'Tardanzas, faltas y feriados desde Asistencias', '19.0.1.5.4', 'Opcional'],
      ['6', '`solse_pe_plame_rxh` y `solse_pe_plame_4ta`', 'PLAME de recibos por honorarios; el segundo los agrega al ZIP de la planilla', '19.0.1.2.0 · 19.0.1.0.0', 'Opcional'],
      ['7', '`solse_pe_payroll_ce_demo` y los `*_demo`', 'Laboratorio de casos y datos de prueba. Solo en bases de prueba', '19.0.2.46.0 (ce_demo)', 'No (pruebas)'],
    ], [700, 2500, 3638, 1600, 1200]),
    ...figura('c02_01_aplicaciones_versiones', 'Aplicaciones filtradas por «Nómina Peruana», «Payroll» y «PLAME», solo las instaladas (12): núcleo 19.0.1.39.202, base 19.0.1.21.14, datos de prueba 19.0.2.46.0 y, en el recuadro, el detalle de 5.ª nuevo, 19.0.1.0.4.'),
    nota('Las variantes Community y Enterprise **no se pueden mezclar**: `solse_pe_payroll_base` bloquea la instalación si encuentra la nómina Enterprise de SOLSE (`solse_pe_payroll`), porque ambas siembran los mismos parámetros. En Aplicaciones aparecen las dos; instale solo las «(Community)». También el detalle de 5.ª tiene dos: instale «Nómina Peruana - Detalle de Renta de 5ta (Community)».', 'importante'),
    nota('Con el detalle de 5.ª instalado, cada boleta guarda su detalle al calcularse y al validarse. Las validadas **antes** de instalarlo quedan «5ta sin calcular»: búsquelas en la lista de boletas con el filtro «5ta sin calcular», márquelas y use la acción **Actualizar detalle de 5ta** (en una sola boleta, el botón **Actualizar detalle** de su pestaña «Renta de 5ta»). En contable19, al instalarlo (05/11/2026), las 113 validadas de la demo que estaban sin calcular quedaron, con las demás, en 158 «Coincide» y 43 «No aplica», ninguna «Difiere».', 'implementador'),

    h2('2.1 Base nueva: sin pasos manuales'),
    p('La nómina se instala en una base nueva **sin ningún paso manual** (C-14, C-15):'),
    vinetas([
      'La instalación desde cero no se detiene al convertir las cuentas de las reglas (C-14).',
      'Cuando la compañía carga su plan contable peruano, aunque sea después de la nómina, se crean para ella el diario **Planillas (PLLA)** y las cuentas de las reglas, respetando lo que ya tenga asignado (C-15). La primera boleta se contabiliza sin usar el asistente «Asignar cuentas». Es lo que usan las compañías de laboratorio por empresa (2.5): nacen sin nada y su caso compara el diario «PLLA».',
      'El contrato nuevo nace con la categoría «Régimen General» y su estructura (C-07), y la boleta toma el diario Planillas (C-06).',
      'Cada estructura de SOLSE trae su **Tipo de planilla** (mensual, semanal, adelanto, gratificación, vacaciones, liquidación, CTS, adicional o modalidad formativa), que decide en qué salidas entran sus boletas (capítulos 9 y 27).',
    ]),

    h2('2.2 Qué hace cada actualización'),
    p('Al instalar y en **cada actualización** (`-u`), `solse_pe_payroll_ce` ejecuta su inicializador:'),
    vinetas([
      'crea o repara las estructuras NME, NSO, NQA, GRAT, CTS, VAC y LIQ, las planillas adicionales (COMI, BONI y UTIL) y la «Subvención de modalidad formativa» (SMF), con sus reglas;',
      '**no vuelve a crear una regla que usted archivó** en una estructura (por ejemplo, MOVL_001 en la semanal; lote 14);',
      'asigna las cuentas contables **solo donde faltan**: una cuenta cambiada a mano, por ejemplo una subcuenta 4111 por sede, se conserva (C-21);',
      'deja un registro en el log: con todo asignado, «Cuentas CE: 0 asignaciones» en cada compañía;',
      'archiva las reglas de India de `om_hr_payroll` (HRA, DA, viajes, comidas, gastos médicos) que ninguna estructura use (U-03);',
      '**no recalcula boletas, repartos ni asientos**: lo validado no cambia. Lo que una corrección cambiaría al recalcular se ve con el script de impacto de la entrega (más abajo).',
    ]),
    h3('Cuándo se detiene la actualización'),
    p('Antes de crear conceptos nuevos, el `-u` comprueba que sus códigos estén libres. Si la base ya tiene una entrada o una regla propia con uno de ellos (por ejemplo, los 14 del lote 15: COM_001, PREST_001, AFPV_001…), **se detiene sin cambiar nada** y el log da la lista y la instrucción de cambiarles el código. Corrija los códigos y repita el `-u`.'),
    h3('Las post-migraciones'),
    p('Algunas versiones traen **post-migraciones** que completan los datos existentes sin pisar lo que el cliente cambió. Cada una deja su línea en el log. Las que más se notan:'),
    tabla(['Lote (versión)', 'Qué hace', 'Medido en contable19'], [
      ['v2 (19.0.1.27.0)', 'Pone el código de la Tabla 19 en los parentescos que siembra el módulo, solo donde está vacío', '—'],
      ['16 (19.0.1.31.0)', 'Pone el **Tipo de planilla** a las estructuras. Las de SOLSE, el suyo; las propias del cliente, según sus reglas: truncas o indemnización → liquidación; la básica mensual → mensual; la básica semanal → semanal; la gratificación, la CTS, las vacaciones o el adelanto → su tipo; comisiones, bonificaciones u otros ingresos de la adicional, o utilidades → adicional. Si no reconoce ninguna regla, la deja **sin tipo** y la nombra en el log: hay que asignarle el tipo a mano', '«Nómina PE (C-42): estructura «…» con tipo de planilla «…»» para las 7 de SOLSE, y «sin tipo de planilla (no entran en las salidas): Base for new structures (BASE), Reglas Básicas (0001)», que son plantillas'],
      ['27a', 'Deja en «No retener» la renta de 5.ª de la semanal en la compañía que ya tiene semanales validadas del ejercicio sin 5.ª', '—'],
      ['27b (19.0.1.39.120)', 'Pone «Subsidio que cruza de mes: desde» en el 01 del mes en curso: los meses ya declarados no cambian', '—'],
      ['43 (19.0.1.39.170)', 'Guarda el dominical (0115) de las semanales validadas', '18 semanales de la demo'],
      ['46a (19.0.1.39.180)', 'Guarda el detalle de la remuneración computable de las CTS validadas', '14 CTS de la demo'],
      ['54 (19.0.1.39.192)', 'Guarda las suspensiones (Tabla 21) de las mensuales y semanales validadas, que son las que declara el `.snl`', '195 boletas de la demo'],
      ['58 y 67', 'Las compañías que ya pagaban la asignación familiar a la pequeña empresa, o la CTS al trabajador a tiempo parcial, quedan en «Pagar»', '—'],
    ], [1900, 4938, 2800]),
    p('Las **opciones nuevas** nacen con su valor por defecto, que es el de antes del lote o el de la norma, y la post-migración solo las cambia en los casos de la tabla. Revíselas en la ficha de la compañía (2.3).'),
    nota('Cada entrega trae un **script de impacto** (`impacto_loteNN.py` o `impacto_lotes_NN_a_MM.py`), de solo lectura y solo conteos. Córralo **antes y después** del `-u`: dice, por compañía, qué boletas validadas conviene revisar (no se recalculan) y cuáles en borrador cambian al recalcular. Por ejemplo, el de los lotes 70 y 71, después del `-u` en contable19: 8 compañías de laboratorio, 0 sin dirección en su contacto, la tarea nocturna activa y «no domiciliados 0» en todas las compañías.', 'implementador'),
    h3('Lista de despliegue'),
    pasos([
      'Corra el script de impacto de la entrega (solo lectura) y guarde la salida.',
      'Detenga el servicio de Odoo.',
      'Reemplace las carpetas de los módulos **en una sola copia**. Si el `addons_path` tiene dos carpetas con los mismos módulos, Odoo carga la que esté primero en la ruta y puede cargar la versión vieja (medido en los lotes 9 a 11).',
      'Ejecute `odoo-bin -c <conf> -d <base> -u solse_pe_payroll_ce --stop-after-init` (o los módulos que traiga la entrega; con el detalle de 5.ª instalado, también `solse_pe_payroll_renta5_ce`).',
      'Revise el log: sin líneas ERROR de Odoo, con «Cuentas CE: 0 asignaciones» y con las líneas de las post-migraciones. Los dos «(ERROR/3) Unexpected indentation» son de docutils al leer las descripciones de los módulos y no afectan.',
      '**Levante el servicio** y recargue el navegador. Con `--stop-after-init` el servicio queda detenido y el navegador recibe «502».',
      'En **Aplicaciones**, compruebe las versiones de la tabla de arriba.',
      'Corra otra vez el script de impacto y compare.',
      'Si usa el laboratorio: **② Sincronizar casos** y corra los casos de la nómina (2.4). Todos deben quedar al 100 %.',
    ]),
    nota('El horario de trabajo (calendario) de cada compañía debe estar en la zona **America/Lima**: la conciliación de asistencias ubica las marcaciones en la zona del calendario. Si está en UTC, que es lo que crea una base nueva cuando el administrador no tiene zona, las tardanzas salen desplazadas 5 horas (O-62). Ponga también America/Lima en la preferencia de cada usuario: Odoo toma la fecha de «hoy» de la zona del usuario y, entre las 19:00 y las 24:00 de Lima, un usuario en UTC ve el día siguiente (por ejemplo, en el nombre de los TXT de derechohabientes).', 'implementador'),

    h2('2.3 Las opciones de la compañía'),
    p('Las decisiones de cada empresa están en la ficha de la compañía (**Ajustes › Compañías**), pestaña **«Nómina PE - Controles»**. Con el módulo de asistencias se agrega la pestaña «Nómina PE - Asistencias». Algunas, como las provisiones y la boleta por correo, se ven también en **Ajustes › Nómina PE**. Junto al RUC están «Afecta a SENATI» y, si está marcada, «Con 20 trabajadores o menos: SENATI» (capítulo 32).'),
    tabla(['Grupo de la pestaña', 'Qué decide', 'Capítulo'], [
      ['Controles al validar la boleta', 'Orden de diciembre, sistema pensionario, derecho al subsidio, orden del cese y Vida Ley', '26'],
      ['T-Registro · Pago a bancos · Boleta por correo', 'Código de establecimiento; la CTS de otro banco en Interbank; a quién se envía la boleta y el documento del trabajador en su contacto', '29, 27, 28'],
      ['PLAME', '«Declarar aparte los feriados (0115) y la licencia con goce (0907)» (lote 18, **apagada**); el subsidio que cruza de mes y su fecha «desde»; el monto del `.or5`', '18, 27'],
      ['PLAME: horas del .jor · Descanso semanal y 1 de mayo · PLAME: aportes informativos en el .rem', 'Las horas de los feriados en el `.jor`; el dominical de la semanal en el 0115; el 1 de mayo en el descanso; los 08xx y el 0609 que van al `.rem`', '18, 27'],
      ['Provisiones · Liquidación por cese · Indemnización · Conteo de meses y días · Gratificaciones · Remuneración computable', 'Los beneficios sociales', '7, 14 a 17'],
      ['Modalidades formativas (practicantes)', 'Subvención menor que el mínimo, inasistencias, EsSalud con la base mínima, descanso con doce meses', '31'],
      ['Seguro Vida Ley · Valor hora y feriados · Suspensiones · Renta de 5.ª · Conceptos configurados', 'Vida Ley, valor hora, subsidios, la 5.ª de la semanal y las prestaciones alimentarias', '6, 10, 13, 18, 22, 23'],
      ['Micro y pequeña empresa (REMYPE) · Utilidades (D.Leg. 892) · Tiempo parcial', 'Acreditación en el REMYPE, SIS, asignación familiar y utilidades de la MYPE; el umbral de los 20 trabajadores; la CTS a tiempo parcial', '24, 20, 15'],
    ], [3000, 5038, 1600]),
    nota('Una opción nueva nunca cambia lo ya validado: rige para lo que se calcule o se genere después. Por ejemplo, «Declarar aparte los feriados (0115) y la licencia con goce (0907)» viene apagada y, encendida, no cambia el total, los aportes ni la 5.ª, solo cómo se separa la básica (capítulo 18). Ninguna opción de los casos `EMPRESA_*` toca la compañía de servicios ni FM: cada caso escribe en su propia compañía.', 'nota'),

    h2('2.4 El laboratorio de casos'),
    p('El laboratorio (`solse_pe_demo_libros` con `solse_pe_payroll_ce_demo`) vive en la aplicación **SOLSE Demo** (el laboratorio, en **Configuración › Laboratorio**; los casos, en **Casos de demostración**) y trabaja en compañías propias de prueba: los **25 casos de siempre** en **SOLSE Demo Servicios S.A.C.** y los **5 casos `EMPRESA_*`**, cada uno en su compañía (2.5). Ninguno escribe en una compañía real (Q-01).'),
    ...figura('c02_02_laboratorio', 'Laboratorio SOLSE Perú: 33 casos registrados, 30 conformes y cobertura 90,91 %. Los 3 pendientes (DETRACCION, LC y ANTICIPOS) son de la contabilidad y la facturación, no de la nómina.'),
    tabla(['Botón del laboratorio', 'Qué hace'], [
      ['① Construir laboratorio', 'Crea las compañías de prueba y su configuración (una vez por base).'],
      ['② Sincronizar casos', 'Registra los casos nuevos y actualiza nombre y estructuras de los existentes. Úselo después de cada `-u`. Con la versión del v3 deja 33 casos: 30 de la nómina y 3 de la facturación.'],
      ['Diagnosticar', 'Revisa la configuración del laboratorio.'],
      ['Limpiar todo', 'Ejecuta «⑤ Limpiar» de todos los casos sembrados.'],
    ], [3000, 6638]),
    ...figura('c02_03_casos_100', 'Casos de demostración agrupados por rama: los 30 de «Nómina» en «Comparado» con 100,00 de coincidencia (en recuadro, el primero y el último de los cinco EMPRESA_*); los 3 de contabilidad y facturación, pendientes.'),
    p('Cada caso se corre con sus botones numerados. Siempre en este orden y, en el mismo día, **NOMINA antes que PLAME**:'),
    pasos([
      '**⑤ Limpiar**: borra los datos que el caso sembró antes (2.6).',
      '**① Sembrar datos**: crea los trabajadores sintéticos, contratos, pólizas, ausencias y marcaciones del caso; en los `EMPRESA_*`, también la compañía si no existe.',
      '**② Generar**: calcula y valida las boletas y genera los archivos (PLAME, TXT, T-Registro…).',
      '**④ Comparar**: compara cada valor generado con el esperado, que sale de la norma, y deja la comparación con su Excel.',
    ]),
    p('**Ejecutar todo** hace Sembrar, Generar y Comparar de corrido, sin Limpiar: púlselo después de «⑤ Limpiar». El porcentaje del caso vale solo cuando las cuatro fases terminan sin error: si una falla, el caso conserva el porcentaje de su comparación anterior.'),
    ...figura('c02_04_caso_tregistro', 'Caso TREGISTRO conforme: 262 celdas comparadas, 0 diferencias. En «Comparaciones» se descarga el Excel.'),
    tabla(['Grupo', 'Casos', 'Celdas'], [
      ['Planilla, boleta y archivos', 'NOMINA, BOLETA, BANCOS, PLAME, PLAME-RXH, TREGISTRO, DECLARACION, CONCEPTOS, ADICIONALES', '2 013'],
      ['Beneficios, cese y utilidades', 'MICRO, UTILIDADES, CESE, INDEMNIZACION, COMPUTABLE, DOCUMENTOS_CESE, UTILIDADES_REPARTO', '813'],
      ['Ausencias, feriados y seguros', 'ASISTENCIA, AUMENTO, SUBSIDIOS, VIDALEY, FERIADOS, SCTR', '707'],
      ['Provisiones', 'PROVISIONES, PROVISIONES_BOLETA, PROVISIONES_BENEFICIO', '1 208'],
      ['**25 casos de siempre**', 'Compañía SOLSE Demo Servicios S.A.C.', '**4 741**'],
      ['**Laboratorios por empresa**', 'EMPRESA_PEQUENA, EMPRESA_MICRO, EMPRESA_COMERCIO, EMPRESA_INDUSTRIA, EMPRESA_CONSULTORA', '**688**'],
    ], [2600, 5538, 1500]),
    nota('Corrida completa del 08/11/2026 con las versiones del v3: los 30 casos al 100 %, 5 429 celdas (4 741 + 688). El Anexo E detalla cada caso, sus hojas y sus capítulos.', 'caso'),

    h2('2.5 Los laboratorios por empresa (EMPRESA_*)'),
    p('Cada caso `EMPRESA_*` es **un mes completo de una empresa realista** en su propia compañía de laboratorio: usa las estructuras de siempre y el régimen del contrato decide el cálculo. La compañía es de laboratorio, sin RUC, en soles, con el plan contable peruano (que crea el diario Planillas y las cuentas) y el calendario de la compañía de servicios. Es el lugar para ver los regímenes sin tocar la compañía de servicios ni FM.'),
    tabla(['Caso', 'Compañía', 'Qué muestra', 'Celdas'], [
      ['EMPRESA_PEQUENA', 'SOLSE Demo Pequeña Empresa S.A.C.', 'Gratificación (P1: 1 200,00) y CTS (P1: 650,00) de la pequeña empresa, liquidación con despido (P3: indemnización 1 100,00), el REMYPE, la recontratación y el umbral de utilidades', '217'],
      ['EMPRESA_MICRO', 'SOLSE Demo Microempresa E.I.R.L.', 'SIS (15,00), sin gratificación ni CTS, indemnización de la micro (M3: 416,67), sin utilidades', '104'],
      ['EMPRESA_COMERCIO', 'SOLSE Demo Comercio S.A.C.', 'Horas extras, comisionista, nocturnas, utilidades al 8 %, la RMV, el tiempo parcial (K8: CTS 0,00) y el mes parcial en el divisor (K9: CTS 466,67)', '138'],
      ['EMPRESA_INDUSTRIA', 'SOLSE Demo Industria S.A.C.', 'Obrero semanal, cuota sindical, el SENATI (I3: 18,71) y «Fuera de la base», utilidades al 10 %', '92'],
      ['EMPRESA_CONSULTORA', 'SOLSE Demo Consultora S.A.C.', 'El practicante (S1: neto 1 695,00), el no domiciliado (S2: 30 %, 2 400,00), el andino con convenio (S5: 278,03), la extranjera domiciliada y el tiempo parcial', '137'],
    ], [2100, 2600, 3938, 1000]),
    vinetas([
      '**Se corren igual que los demás**: «② Sincronizar casos» y después Limpiar, Sembrar, Generar y Comparar. Los trabajadores son sintéticos (DNI 70006101 a 70006804 y, los extranjeros de la Consultora, documentos 000068002 a 000068005).',
      '**La primera vez, la compañía la crea un administrador**, porque crear una compañía y cargar su plan contable es de administrador. Un operador recibe: «La compañía de laboratorio «…» no existe y crearla (con su plan contable) es de un administrador: pídale que corra este caso la primera vez.» Después, cualquiera corre el caso. El usuario que lo corre y el administrador reciben la compañía entre las suyas.',
      '**Con la facturación instalada** (lote 70): la validación «Exigir dirección completa en contactos peruanos» ya no rechaza la compañía nueva. Su contacto nace con la dirección del laboratorio (Av. Demostración 123, Lima, Miraflores, 150122, una calle ficticia) y **sin tipo de documento**, porque no tiene RUC; después se puede editar. Una compañía de laboratorio que ya existe y tiene dirección la conserva y solo pierde el tipo de documento sin número: en contable19, las cinco quedaron sin tipo de documento y con su dirección.',
      'Si ya existe una compañía con ese nombre que **no** es de laboratorio (tiene RUC o no está marcada), el caso no la usa y lo dice.',
      '**«Limpiar»** borra lo del caso y deja la compañía.',
    ]),
    ...figura('c02_06_empresa_consultora', 'Caso EMPRESA_CONSULTORA conforme: la comparación del 09/11/2026 con 4 hojas, 137 celdas, 0 diferencias y 100,00 (la del 08/11 antes del lote 71 tenía 107). El caso escribe en SOLSE Demo Consultora S.A.C.; el campo «Compañía» del formulario muestra la del laboratorio.'),
    nota('Sus compañías no tienen RUC: el PLAME, AFPnet y el T-Registro de esas empresas se generan para mirarlos, no para presentarlos, y sus nombres salen sin RUC (el PLAME de junio de 2026 de la Consultora es `PLAME_0601202606.zip`). Los PDF también salen sin RUC.', 'limite'),

    h2('2.6 «Limpiar» y la tarea nocturna'),
    p('Odoo tiene una tarea programada que corre cada noche, **«Generate Missing Work Entries»**: crea entradas de trabajo para todos los trabajadores con contrato, también los del laboratorio. «⑤ Limpiar» de cada caso:'),
    vinetas([
      'borra primero las entradas de trabajo de los trabajadores del caso, también las validadas, y después a los trabajadores con su contacto, cuentas, contratos e hijos (lote 16b);',
      'si una limpieza anterior los dejó archivados, también los borra (lote 16b);',
      'borra también los asientos del pago de la planilla y de AFPnet de las boletas del caso (lote 40);',
      'conserva el plan «Vacaciones PE - Devengo mensual» si lo usa una asignación de cualquier compañía;',
      'solo toca a los trabajadores del caso en su compañía de laboratorio.',
    ]),
    p('**Desde el lote 70, «Limpiar» y la tarea no corren a la vez:**'),
    tabla(['Situación', 'Qué pasa'], [
      ['La tarea quiere correr mientras «Limpiar» trabaja', 'Espera y corre después'],
      ['La tarea ya está corriendo, u otra «Limpiar» está en curso', '«Limpiar» no borra nada y dice: «La tarea programada «Generate Missing Work Entries» está corriendo, o hay otra limpieza en curso. Limpiar a la vez dejaría trabajadores archivados sin borrar. No se borró nada: vuelva a pulsar «Limpiar» en unos minutos.»'],
      ['La tarea terminó mientras «Limpiar» empezaba', '«La tarea programada … acaba de correr. No se borró nada: vuelva a pulsar «Limpiar».»'],
      ['La tarea terminó antes de pulsar', '«Limpiar» borra normalmente, también las entradas que la tarea acaba de generar'],
      ['Otro usuario generó entradas a la vez (por ejemplo, con el calendario de las entradas abierto)', 'Solo ese trabajador queda archivado y el resumen lo dice: «N borrados, M archivados (no se pudieron borrar: vuelva a pulsar «Limpiar»)»'],
    ], [3600, 6038]),
    nota('Medido en contable19 el 08/11/2026. Sin la tarea, «Limpiar» de NOMINA dijo en una pasada: «asignaciones: 14, boletas: 40, contactos: 13, cuentas: 26, empleados: 13, entradas: 0, goce: 3, hijos: 1, plan_devengo: conservado (2 asignaciones ajenas)», sin archivados. Con la tarea forzada, tres pulsaciones seguidas respondieron «está corriendo… No se borró nada»; ya terminada la tarea, una pasada borró todo, con las **528** entradas que acababa de generar, y 0 archivados. EMPRESA_COMERCIO y EMPRESA_CONSULTORA borraron también las de la tarea (360 y 220).', 'caso'),
    nota('UTILIDADES y SUBSIDIOS comparten tres DNI (70000801 a 70000803, O-72): «Limpiar» de uno borra a los trabajadores del otro. Corra cada caso completo, de a uno.', 'importante'),

    h2('2.7 Los datos de prueba no tocan una compañía real'),
    p('El asistente **Nómina › Nómina PE › Datos de prueba (demo)** solo carga datos en las compañías del laboratorio o en la compañía de una base nueva (Q-01). En una compañía real se abre, lo explica y solo deja **4. Validación interna**, que revisa la configuración sin escribir nada.'),
    ...figura('c02_05_datos_de_prueba_en_fm', 'Datos de prueba en FM SYSTEMS: es una compañía real y el asistente no carga datos.'),
    nota('Antes de esta corrección, una siembra antigua dejó a FM SYSTEMS afecta a SENATI. Se mantiene así a propósito, para que el recorrido conserve sus cifras: las boletas de FM llevan SENATI_001.', 'implementador'),
    pieCapitulo(['base', 'ce', 'renta5', 'ce_demo'], 'C-14, C-15, C-21, Q-01, Q-04, Q-05, O-51, N-09 (lote 15), C-42 (lote 16), O-71 (lote 16b), C-43 (lote 18), lote 39, O-158 (lote 40), lote 57, lotes 60 a 68, lote 70'),
  );

  return c;
};
