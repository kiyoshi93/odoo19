// Manual v3, capítulo 27: reportes y archivos legales (planilla, PLAME, AFPnet y bancos). Origen: v2 (22/10/2026),
// actualizado con los lotes 14, 15, 16, 18, 19, 27b, 30, 31a, 31b, 38, 40, 43, 49c, 51, 54, 56 y 71. Cifras de los casos
// del laboratorio corridos el 08/11/2026 y del PLAME de junio de 2026 de «SOLSE Demo Consultora S.A.C.» (re-medición de
// los lotes 70 y 71).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 27
  a(
    h1('27. Reportes y archivos legales'),
    p('Todas las salidas legales se generan desde **Nómina › Nómina PE** y leen las **boletas validadas** del periodo de la **compañía activa** (las rectificativas restan, capítulo 25). Con varias compañías, elija la compañía en el selector antes de abrir el asistente: cada archivo es de una sola compañía y una boleta solo se ve en la suya (O-158, lote 40).'),
    p('Cada salida elige las boletas por el **Tipo de planilla** de su estructura (lote 16, capítulo 9), no por su nombre: una copia de la mensual hecha con «Duplicar» sale en las mismas salidas que la original.'),
    tabla(['Salida', 'Boletas que lee (tipo de planilla)'], [
      ['Planilla de sueldos', 'Mensual; más la semanal y las adicionales, si se marcan sus casillas'],
      ['PLAME, `.rem`', 'Mensual, semanal, gratificación, vacaciones, liquidación y adicional. La modalidad formativa va aparte (27.2)'],
      ['PLAME, `.jor` y `.snl`', 'Mensual y semanal, más quien estuvo suspendido todo el mes, sin boleta'],
      ['AFPnet', 'Mensual, semanal, vacaciones, liquidación y adicional'],
      ['Pago a bancos, haberes', 'Mensual, semanal y modalidad formativa; más la gratificación y las adicionales, si se marcan sus casillas'],
      ['Pago a bancos, CTS', 'CTS'],
      ['Reparto de utilidades', 'Todos salvo el adelanto, la CTS y la modalidad formativa (capítulo 20)'],
    ], [2600, 7038]),
    nota('Una boleta de una estructura **sin tipo de planilla** no entra en el PLAME, AFPnet, bancos, la planilla ni el reparto de utilidades. La boleta lo avisa al calcularla y deja el aviso en su historial al validarla (lote 16). Asigne el tipo en la estructura (capítulo 9).', 'importante'),

    h2('27.1 Planilla de sueldos'),
    p('**Planilla de sueldos**: Mes, Año, «Incluir nómina semanal (obreros)» e «Incluir planillas adicionales» (marcada por defecto, lote 16). **Generar Excel** (o **Imprimir PDF**) produce `Planilla_<año>_<mes>.xlsx`, con una fila por trabajador: remuneración, asignación familiar, horas extra, otros ingresos, ONP, AFP, 5.ª, otros descuentos, neto, EsSalud y otros aportes (SENATI, SIS, Vida Ley y el aporte voluntario del empleador al SPP, lote 15). El practicante no va en la planilla: su subvención no es remuneración (capítulo 31).'),
    ...figura('c27_01_planilla_resultado', 'Planilla de sueldos de noviembre de 2026 (año sin separador de miles) con «Incluir planillas adicionales» marcada: Planilla_2026_11.xlsx.'),
    nota('Caso ADICIONALES, noviembre de 2026: el trabajador 70001701, con mensual de 3 000,00 y comisiones de 500,00 en su planilla adicional, sale en una sola fila con ingresos 3 500,00, ONP 455,00 (390 + 65) y neto 3 045,00. La copia de la mensual (70001707) sale como la original: ingresos 3 000,00, ONP 390,00, neto 2 610,00.', 'caso'),

    h2('27.2 PLAME (archivos del PDT 601)'),
    pasos([
      'Abra **Nómina › Nómina PE › PLAME (archivos PDT)**.',
      'Elija **Mes** y **Año**. Con `solse_pe_plame_4ta`, la casilla **«Incluir 4ta categoría (.ps4 y .4ta)»** viene marcada (capítulo 30).',
      'Pulse **Generar archivos PLAME**. Descargue el ZIP `PLAME_0601AAAAMMRUC.zip` y lea el **Resumen**: dice cuántas boletas y trabajadores entraron, los conceptos de la Tabla 22 y todo lo que hay que revisar antes de importar.',
      'Importe los archivos en el PDT PLAME. Lo que el PDT no importa (el personal en formación) se digita.',
    ]),
    tabla(['Archivo', 'Qué lleva', 'Cuándo va', 'Ejemplo medido'], [
      ['`.rem`', 'Ingresos y descuentos por trabajador y concepto de la Tabla 22, devengado y pagado. Las aportaciones (06xx y 08xx) las calcula el PDT; van solo la retención de 5.ª (0605) y los aportes informativos marcados (27.2.2)', 'Siempre', '`04|000068005|0605|278.03|278.03|` (Consultora, junio de 2026)'],
      ['`.jor`', '**6 campos**: horas y minutos ordinarios trabajados y de sobretiempo (C-24). Sin días', 'Siempre', '`01|70006804|66|0|0|0|` (S4, a tiempo parcial)'],
      ['`.snl`', 'Una línea por trabajador y tipo de suspensión de la Tabla 21, con los días (C-09, N-01). Las de una boleta validada son las que guardó al validarse (lote 54)', 'Siempre (vacío si no hay suspensiones)', '`01|70000801|20|20|` · `01|70000801|21|10|` (SUBSIDIOS)'],
      ['`.or5`', 'Otras rentas de 5.ª (estructura 12): una línea por trabajador y RUC del otro empleador (lote 51)', 'Solo si la compañía retiene por un empleador simultáneo', 'por medir'],
      ['`.toc`', 'Otras condiciones del trabajador (estructura 26): una línea por no domiciliado, con «Domiciliado» = 2 (lote 71)', 'Solo si hay no domiciliados', '`04|000068002|0|0||2|` (Consultora)'],
      ['`…_personal_en_formacion.txt`', 'Un monto por practicante: lo pagado en el mes (lote 49c)', 'Solo si hay practicantes con boleta validada', '`01|70006801|1695.00|` (Consultora)'],
      ['`.ps4` y `.4ta`', 'Prestadores y recibos por honorarios pagados en el mes', 'Con la casilla de 4.ª', '8 prestadores y 9 comprobantes (PLAME, julio de 2026)'],
    ], [1700, 3938, 1800, 2200]),
    p('El ZIP de junio de 2026 de «SOLSE Demo Consultora S.A.C.» (caso EMPRESA_CONSULTORA) trae los cinco tipos de archivo de la nómina en un mes de cuatro trabajadores y una practicante. Su resumen:'),
    vinetas([
      '«Boletas del periodo: 4 · Trabajadores en .rem: 4 · Líneas .rem: 6 | Líneas .jor: 4 | Líneas .snl: 0 · Conceptos T22: 0121, 0605»;',
      '«Líneas .toc (otras condiciones del trabajador, estructura 26): 2, los no domiciliados con «Domiciliado» = 2.»;',
      '«Personal en formación (modalidades formativas): 1, monto pagado 1695.00, EsSalud de los que tienen el seguro EsSalud 152.55. Va en la sección «Personal en formación» del PDT, un monto por practicante (Anexo 1, ítem 5.2): el archivo 0601202606_personal_en_formacion.txt lo lista para digitarlo.»;',
      '«4ta categoría: no hay recibos por honorarios pagados en el periodo.»',
    ]),
    ...figura('c27_02_plame_resultado', 'PLAME de junio de 2026 de SOLSE Demo Consultora S.A.C.: PLAME_0601202606.zip (sin RUC: es una compañía de laboratorio), 4 boletas, conceptos 0121 y 0605, 2 líneas del .toc y 1 practicante con 1 695,00.'),
    nota('Caso PLAME (126 celdas, antes 121): el ZIP de julio de 2026 de SOLSE Demo Servicios, `PLAME_060120260720603456786.zip`, con 30 boletas, 13 trabajadores en el `.rem` (42 líneas), 13 en el `.jor`, 2 líneas del `.snl` (vacaciones, tipo 23: 30 y 15 días) y los conceptos 0115, 0118, 0121, 0201, 0312, 0406, 0605, 0701, 0702 y 0703. Las 5 celdas nuevas son del dominical de la semanal (lote 31b, 27.2.1).', 'caso'),

    h3('27.2.1 Los conceptos del .rem'),
    p('Desde el v2 el `.rem` lleva estos conceptos nuevos, todos medidos en un caso del laboratorio:'),
    tabla(['Concepto', 'De dónde sale', 'Ejemplo medido'], [
      ['0101, 0103, 0113, 0303, 0306, 0403, 0902', 'Alimentación, comisiones, prestaciones alimentarias, bono por productividad, bonificaciones regulares, gratificación extraordinaria y bono del sector público (lote 15)', 'CONCEPTOS 70001601: 300,00, 500,00, 150,00, 250,00, 200,00, 1 000,00 y 400,00'],
      ['0706 y 0707', 'Otros descuentos no deducibles (préstamo, EPS del trabajador) y el descuento deducible. El 0703 es solo el judicial y el adelanto es el 0701 (lote 30)', 'CONCEPTOS 70001602: 0706 350,00 (EPS 60 + otros 40 + préstamo 250) y 0707 30,00'],
      ['0103 en la adicional', 'Las planillas adicionales del mes van al mismo `.rem` (lote 16)', 'ADICIONALES 70001701: 0121 3 000,00 y 0103 500,00'],
      ['0605', 'La retención de 5.ª del mes, de todas las boletas', 'ADICIONALES 70001703: 1 071,50 (721,50 de la mensual y 350,00 de la de comisiones)'],
      ['0115, 0907 y 0107', 'Feriados y licencia con goce aparte de la básica (con la opción del lote 18) y el trabajo en feriado (TFER_001)', 'FERIADOS, diciembre de 2026: 70001901 0121 2 500,00, 0115 300,00 y 0907 200,00; 70001902 0107 200,00'],
      ['0115 de la semanal', 'El dominical y los feriados de la semanal (lote 31b; opción «Dominical y feriados de la semanal (PLAME)», por defecto «Aparte, en el 0115»). La boleta y el total no cambian', 'PLAME, julio de 2026, la obrera 46321478: 0121 1 440,00 y 0115 240,00 (antes 0121 1 680,00). FERIADOS 70001903: 0121 400,00 y 0115 300,00'],
      ['0115 del 1 de mayo', 'FMAY_001, el Día del Trabajo que cae en el descanso semanal (lote 31b)', 'por medir'],
      ['0407 y 0313', 'La gratificación trunca de la liquidación y su bonificación (lote 14). Quien cesa del 15 al 31/12 tiene la ordinaria: 0406 y 0312, aunque la pague la liquidación (lote 30)', 'DECLARACION 70001402: 0407 2 000,00 y 0313 180,00, sin 0406'],
      ['0908 y 0909', 'Movilidad de libre disposición y supeditada a la asistencia (lote 14)', 'DECLARACION 70001401: 200,00 y 100,00'],
      ['0910 y 0911', 'Utilidades antes y después de la declaración jurada anual. Con la fecha de la declaración en el reparto, el código se calcula (lote 30, capítulo 20)', 'DECLARACION: 70001404 0910 1 000,00 y 70001405 0911 800,00. ADICIONALES 70001706: 0911 20 000,00'],
      ['0915 y 0916', 'Subsidios de maternidad e incapacidad', 'SUBSIDIOS 70000801, noviembre de 2026: 0121 2 000,00 y 0916 1 000,00'],
    ], [1800, 4338, 3500]),
    h3('27.2.2 Aportes informativos en el .rem'),
    p('El PDT calcula EsSalud, la ONP y el SCTR de EsSalud (0806). Los aportes que el PDT no calcula ni cobra se pagan por su propio canal y pueden ir al `.rem` como **informativos**. En la ficha de la compañía, grupo **«PLAME: aportes informativos en el .rem»**, una casilla por código (lote 30):'),
    tabla(['Casilla', 'Por defecto', 'Ejemplo medido'], [
      ['0803 · Póliza Vida Ley (D.Leg. 688)', 'Marcada', 'VIDALEY (capítulo 6)'],
      ['0811 · SIS de la microempresa', 'Marcada', 'DECLARACION 70001403: `01|70001403|0811|15.00|15.00|`'],
      ['0810 · SCTR de salud con una EPS', 'Sin marcar', '—'],
      ['0813 · SCTR de pensión con la ONP', 'Sin marcar', '—'],
      ['0814 · SCTR de pensión con una aseguradora', 'Sin marcar', '—'],
      ['0801 · Aporte voluntario del empleador al SPP', 'Sin marcar', '—'],
      ['0609 · Aporte voluntario del trabajador al SPP', 'Sin marcar', '—'],
    ], [4000, 1600, 4038]),
    vinetas([
      'El SCTR informativo sale solo del trabajador que tiene en su ficha la entidad de ese código; si falta, el resumen lo nombra: «SCTR sin la entidad de la cobertura en la ficha (…)».',
      '**Antes de marcar una casilla, pruebe la importación en el PDT.** La importación de los cinco códigos sin marcar no se probó en el PDT 4.7.',
    ]),
    h3('27.2.3 Las horas del .jor'),
    p('Las horas ordinarias del `.jor` son las **efectivamente trabajadas**: las del horario menos ausencias, feriados y faltas. Dos opciones de la ficha de la compañía, grupo **«PLAME: horas del .jor»** (lote 31a):'),
    vinetas([
      '**«Horas ordinarias del .jor»**: «Solo las trabajadas» (por defecto) o «También las de los feriados no trabajados».',
      '**«Horas trabajadas en un feriado o día de descanso (.jor)»** (las de TFER_001 y FERIADO_TRABAJADO, si la boleta las paga): «A las horas ordinarias» (por defecto; no son sobretiempo, D.S. 007-2002-TR, art. 10), «Al sobretiempo» o «No se declaran (como antes del lote 31)».',
      'El sobretiempo son las horas extras (HE25_001 y HE35_001). Las vacaciones, los descansos médicos y las licencias van en el `.snl`, sin horas. El turno que termina a las 24:00 de un feriado cuenta sus horas completas (lote 43).',
    ]),
    nota('Caso AUMENTO: el `.jor` de octubre de 2026 da `01|70000901|176|0|0|0|` y el de noviembre, a quien estuvo con licencia sin goce todo el mes, `01|70000904|0|0|0|0|` con su `.snl` `01|70000904|05|30|`.', 'caso'),
    h3('27.2.4 Lo que el PLAME guarda y reparte'),
    vinetas([
      '**El `.snl` y el dominical de un mes presentado no cambian** (lotes 43 y 54): las suspensiones y el dominical de la semanal quedan guardados al validar la boleta. Si después se aprueba o se rechaza una ausencia, el resumen lo avisa: «Boletas validadas cuyas ausencias cambiaron después de validarlas (…)»; si la ausencia de hoy es la correcta, rectifique la boleta.',
      '**El subsidio de una boleta que cruza de mes** (la semanal del 26/10 al 01/11 con 7 días subsidiados): con «Subsidio de una boleta que cruza de mes (PLAME)» en «Por los días subsidiados de cada mes» (por defecto, lote 27b), el 0915 o el 0916 va a cada mes por sus días, 6/7 a octubre y 1/7 a noviembre, como el `.snl`. Rige para las boletas que empiezan desde la fecha «Subsidio que cruza de mes: desde», que la actualización puso en el 01/11/2026. El resto de la boleta y el AFPnet van al mes en que empieza.',
      '**Quien estuvo suspendido todo el mes**, sin boleta validada, va igual al `.jor` y al `.snl` con sus suspensiones.',
      '**Las ausencias sin «Tipo de suspensión (Tabla 21)»** se declaran como días laborados, y el resumen lo dice con el tipo de ausencia.',
    ]),
    h3('27.2.5 Otras rentas de 5.ª: el .or5'),
    p('Si la compañía retiene sobre el total por un empleador simultáneo (art. 44 b del Reglamento de la LIR: el registro de la ficha «Renta de 5.ª de otros empleadores» con «Este empleador retiene sobre el total», capítulo 13), el ZIP lleva `0601AAAAMMRUC.or5` (estructura 12), una línea por trabajador y RUC del otro empleador:'),
    vinetas([
      'el monto, según la opción «Otras rentas de 5.ª en el PLAME (.or5)» del grupo «PLAME»: «La renta del mes en el otro empleador» (por defecto) o «La acumulada del ejercicio hasta el mes» (P-154, con valor por defecto);',
      'avisa en el resumen si el trabajador no está en el PLAME del mes, si su tipo de trabajador no lleva el `.or5` o si su tipo de documento no lo admite la estructura (el 26, CPP, va con aviso: P-155);',
      'solo va si hay líneas.',
    ]),
    h3('27.2.6 El no domiciliado: el .toc'),
    p('El trabajador con «No domiciliado (Impuesto a la Renta)» en el contrato (capítulo 13) va en `0601AAAAMMRUC.toc` (estructura 26, «Trabajador - Otras condiciones»), una línea por no domiciliado del PLAME del periodo, también el que estuvo suspendido todo el mes. La línea es `tipo|número|0|0|campo 5|2|`: el último campo, «Domiciliado», va en 2. El andino con convenio «3 · Comunidad Andina» también va: retiene con la escala, pero no es domiciliado. Su retención va al 0605, como siempre.'),
    tabla(['Situación', 'Qué hace el .toc'], [
      ['Documento 01, 04, 07 o 09', 'Va'],
      ['Otro documento (por ejemplo, el PTP, 23)', 'No va; el resumen avisa y se marca en el PDT'],
      ['Tipo de trabajador 56', 'Va con «1» en el campo 5 (el FDSA) y avisa'],
      ['Tipo de trabajador 98', 'No va (el campo 5 exige la retención de la Ley 29903); avisa y se marca en el PDT'],
      ['Contrato con convenio y sin la marca', 'No va; avisa: el `.toc` no lo declara no domiciliado'],
      ['Sin no domiciliados', 'No hay `.toc`: el PDT toma a todos como domiciliados'],
    ], [4000, 5638]),
    nota('EMPRESA_CONSULTORA, junio de 2026: S2 (Venezuela, convenio «0»: retiene el 30 %, 2 400,00) y S5 (Colombia, convenio «3»: retiene con la escala, 278,03) dan `04|000068002|0|0||2|` y `04|000068005|0|0||2|`. S3, extranjera domiciliada desde 2024, no va. La importación del `.toc` en el PDT 4.7 está pendiente: el manual muestra el archivo, no la pantalla del PDT.', 'caso'),
    h3('27.2.7 El personal en formación'),
    p('El practicante **no va al `.rem`, al `.jor` ni al `.snl`**. El PLAME suma lo pagado en el mes de sus boletas de modalidad formativa validadas (la subvención, la media subvención y el descanso) y lo deja en `0601AAAAMMRUC_personal_en_formacion.txt` (`tipo|número|monto|`) para **digitarlo** en la sección «Personal en formación» del PDT, un monto por practicante. El resumen da también el EsSalud de los que tienen el seguro EsSalud. Si un practicante tiene convenio en el mes y su boleta no está validada, el resumen lo nombra: «no va en el personal en formación; valide su boleta y vuelva a generar, o declare el monto a mano» (capítulo 31).'),
    nota('El monto (todo lo pagado en el mes o solo la subvención mensual) es **criterio según la norma, pendiente de confirmación (P-150)**. El formato de importación del PDT para el personal en formación no se encontró: el archivo es para digitar.', 'limite'),

    h2('27.3 AFPnet'),
    p('**AFPnet (planilla previsional)** genera el Excel de importación al portal (hoja TRABAJADOR) con los afiliados al SPP y su remuneración asegurable del mes. **Generar Excel AFPnet** produce `AFPNET_AAAA_MM.xlsx`.'),
    vinetas([
      '**El régimen es el del cálculo de la boleta**, no el de hoy: un traspaso a la ONP después de validar no saca al trabajador del AFPnet de ese mes. Los indicadores de inicio y cese salen del vínculo en el mes (O-159, lote 40).',
      '**Suma las planillas adicionales** del mes (lote 16): caso ADICIONALES, 70001702 con mensual de 3 000,00 y comisiones de 500,00, asegurable **3 500,00**.',
      '**El descuento deducible** reduce la remuneración asegurable y **los aportes voluntarios** van en sus columnas: con fin previsional (AFPV_001), sin fin previsional (AFPVS_001) y del empleador (AFPVE_001) (lote 15). Caso CONCEPTOS, 70001602: asegurable 2 970,00, voluntarios 100,00, 50,00 y 80,00.',
      'Un subsidio con AFP suma a la remuneración asegurable (caso SUBSIDIOS: 3 000,00). El practicante no va.',
    ]),
    ...figura('c27_03_afpnet_resultado', 'AFPnet de julio de 2026 (caso NOMINA): AFPNET_2026_07.xlsx con 6 trabajadores del SPP.'),
    nota('Caso NOMINA, julio de 2026: 6 afiliados al SPP, entre ellos la obrera semanal 46321478 con asegurable 1 680,00 (las cuatro semanas) y 45781236 con 3 613,00.', 'caso'),
    h3('27.3.1 Registrar el pago de AFPnet'),
    p('Los aportes retenidos al trabajador del SPP quedan en la 417 y se pagan a cada AFP dentro de los primeros cinco días hábiles del mes siguiente (TUO de la Ley del SPP, art. 34). **Nómina › Nómina PE › AFPnet: registrar el pago** (también en **Facturación › Proveedores**, para quien registra los pagos sin tener nómina; lote 38):'),
    pasos([
      'Elija **Compañía**, **Mes** y **Año** del periodo. En **Solo estas AFP** puede limitarlo a una o varias; vacío, todas.',
      'Elija el **Diario de pago** (el banco), la **Fecha de pago** y, si quiere, la **Referencia** (el número de la planilla AFPnet o de la operación).',
      'Pulse **Registrar el pago**: un asiento por AFP, con debe a la 417 por lo retenido del periodo y haber al banco, conciliado con las boletas si la cuenta es conciliable.',
    ]),
    vinetas([
      'La AFP es la del cálculo de la boleta: un traspaso posterior no la cambia.',
      'Las boletas quedan con su «Pago de AFPnet»: una segunda vez no hay nada que pagar. Si el pago se anula o se revierte, se puede registrar otra vez.',
      'Pagado después del quinto día hábil, el asiento lo dice: «Pagado fuera del plazo: … (TUO de la Ley del SPP, art. 34)».',
    ]),
    nota('Medido en el laboratorio (re-medición del lote 38): julio de 2026 pagado el 03/11/2026 dio cuatro asientos, Habitat 2 358,03, Integra 1 232,60, Prima 217,88 y Profuturo 587,70, cada uno con «Pagado fuera del plazo» (hasta el 07/08/2026) y la 417 conciliada. El segundo pago del mismo mes se rechazó. Esos asientos de prueba se borraron después.', 'caso'),

    h2('27.4 Pago masivo a bancos'),
    p('**Pago masivo a bancos** genera el TXT de abono de **haberes** o de **CTS** para BCP (Telecrédito), Interbank o Scotiabank: Mes, Año, Tipo de pago, Banco de cargo, Cuenta de cargo de la empresa y Fecha de pago. En haberes, «Incluir gratificaciones del mes» (desmarcada) e «Incluir planillas adicionales» (marcada, lote 16). El resultado dice cuántos se abonan, el total y quiénes quedan **omitidos** y por qué.'),
    tabla(['Cambio', 'Qué hace', 'Ítem'], [
      ['Banco por código SBS', 'Una cuenta del propio banco sale como abono propio (BCP «2A») y otra como interbancaria («2B», con CCI). El TXT de CTS del BCP ya no sale vacío', 'C-01'],
      ['Omitidos', 'Un trabajador sin cuenta, sin CCI o con CTS en otro banco no bloquea el archivo: queda fuera y se lista. «Modo estricto» vuelve a bloquear', 'C-08'],
      ['ASCII', 'Sin tildes ni Ñ (Ñañez → NANEZ) y con CRLF', 'C-12'],
      ['Scotiabank', 'Formato propio, con el aviso «formato sin validar» con el banco', 'C-13, N-06'],
      ['Totales exactos', 'Sin el sol de menos por redondeo', 'C-19'],
      ['CTS de otro banco', 'Por defecto se omite y se deposita con el archivo de ese banco; opción de abonar por CCI en Interbank («Interbank: CTS en cuenta de otro banco»)', 'C-23'],
      ['Planillas adicionales', 'Entran en el archivo de haberes y el resumen dice cuántas: «Incluye N boleta(s) de planillas adicionales…». Si se pagan en otra fecha, desmarque la casilla', 'N-10 (lote 16)'],
      ['Practicante', 'Su subvención se abona con los haberes (boletas de modalidad formativa)', 'lote 49c'],
      ['Prestaciones alimentarias', 'Los vales (PRALI_001) se entregan fuera del neto: no van al banco', 'O-104 (lote 44)'],
    ], [2200, 5838, 1600]),
    ...figura('c27_04_bcp_haberes_resultado', 'BCP haberes de mayo de 2026 (caso BANCOS): 4 abonados por S/ 7 918,00 y 1 omitido (sin cuenta sueldo) por S/ 1 566,00. El asistente muestra «Incluir planillas adicionales» y el año sin separador.'),
    ...figura('c27_05_interbank_cts_resultado', 'Interbank CTS de mayo de 2026: 1 abonado por S/ 833,33 y 4 omitidos (CTS en otro banco o sin cuenta CTS) por S/ 2 800,39.'),
    ...figura('c27_06_scotiabank_haberes_resultado', 'Scotiabank haberes: 3 abonados por S/ 6 003,88, 2 omitidos y el aviso «formato sin validar».'),
    nota('Caso BANCOS (407 celdas): cabeceras, registros, montos, omitidos y propiedades de los 6 archivos (BCP, Interbank y Scotiabank, haberes y CTS de mayo de 2026). Los archivos salen con CRLF y en ASCII. Caso ADICIONALES: el trabajador con mensual y comisiones recibe **un** abono de 3 045,00 (2 610,00 + 435,00).', 'caso'),
    nota('El formato de Scotiabank no está validado con la banca por internet del banco y no hay TXT del Banco de la Nación: los bancos entregan el formato al afiliar a la empresa (N-06, capítulo 33). Haga una carga de prueba antes del primer pago real.', 'limite'),
    nota('Pendiente de la contadora, con valor por defecto: los códigos del SCTR y si se declaran (P-70, P-91), la tasa del SCTR de EsSalud que se registra en el PDT (P-92), el 0115 del dominical y de los feriados (P-68, P-85), las horas del `.jor` (P-31, P-87), el SIS informativo (P-64), los aportes voluntarios (P-73), el subsidio que cruza de mes (P-44), el monto del `.or5` (P-154 y P-155) y el convenio andino en el `.toc` (A-7.1). Criterio según la norma, pendiente de confirmación: el monto del personal en formación (P-150), el CITT en el `.snl` (P-45 c) y el 0911 del reparto por convenio en empresas de 20 trabajadores o menos (A-1.3).', 'nota'),
    pieCapitulo(['ce', 'ce_demo', 'plame_demo', 'plame_4ta'], 'C-01, C-08, C-09, C-12, C-13, C-19, C-23, C-24, N-01, N-06, C-37 a C-40 (lote 14), N-09 (15), C-42 y N-10 (16), C-43 y N-11 (18), N-12 (19), P-44 (27b), lote 30, P-31 y P-87 (31a), P-85 y P-88 (31b), P-53 d (38), O-158 y O-159 (40), O-111 (43), O-156 (49c), O-97 (51), O-167 (54), O-195 (71)'),
  );

  return c;
};
