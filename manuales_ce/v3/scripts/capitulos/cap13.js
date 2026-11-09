// Manual v3, capítulo 13: renta de 5.ª categoría. Origen: v2 (cifras de FM y del caso CESE, 22/10/2026), más los lotes
// 15, 16, 22b, 23b, 26a, 26b, 27a, 29, 39, 51, 57, 69 y 71 (nota RENTA5_Y_PLAME). Cifras de los casos medidas en
// contable19 el 09/11/2026 (NOMINA, CONCEPTOS, ADICIONALES, CESE, UTILIDADES_REPARTO y EMPRESA_CONSULTORA).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 13
  a(
    h1('13. Renta de 5.ª categoría'),
    p('La regla `R5TA_001` proyecta la renta anual del trabajador y retiene la parte del mes (Reglamento de la LIR, art. 40):'),
    pasos([
      'Renta proyectada = remuneraciones del año ya validadas + sueldo del mes × meses que faltan + gratificaciones de julio y diciembre proyectadas, **con la asignación familiar** (C-03). Las gratificaciones se proyectan con los meses del **vínculo**: una renovación sin interrupción no las corta (lote 22b).',
      'Menos 7 UIT (37 450 en 2025; 38 500 en 2026).',
      'Impuesto anual con los tramos (8 %, 14 %, 17 %, 20 % y 30 %).',
      'Menos lo ya retenido en el año, dividido entre el divisor del mes (12 en enero a marzo, 9 en abril, 8 en mayo a julio, 5 en agosto, 4 en setiembre a noviembre; en diciembre, el saldo).',
      'Más, en el mes en que se pagan, el impuesto de los **ingresos extraordinarios** (13.3).',
    ]),
    ...figura('c13_01_lucia_ene2025_calculo', 'Lucía, enero de 2025: base afecta 4 613,00 y retención de 5.ª 192,48.'),
    h2('13.1 Retenciones medidas de Lucía'),
    tabla(['Año', 'Retención mensual', 'Total del año'], [
      ['2025', '192,48 (enero a julio), 192,47 (agosto a noviembre), 192,49 (diciembre)', '**2 309,73**'],
      ['2026', '179,42 (enero), 183,73 (febrero, mes de vacaciones), 179,79 (marzo), 179,39 a 179,40 (abril a setiembre), 180,21 (octubre y noviembre), 181,04 (diciembre)', '**2 160,78**'],
    ], [900, 6500, 2238]),
    p('Desde octubre de 2026 la asignación familiar es 123 (RMV 1 230) y la retención sube a 180,21. En febrero de 2026, el mes de vacaciones, la 5.ª se calcula en la mensual sumando la vacacional ya validada (C-11): **la vacacional no retiene**; lo que paga cuenta en la mensual del mes. Las boletas validadas de FM SYSTEMS no cambiaron con los lotes 13 a 71: los totales siguen en 2 309,73 y 2 160,78.'),

    h2('13.2 El detalle de la renta de 5.ª por boleta'),
    p('El módulo **`solse_pe_payroll_renta5_ce`** (lote 39; se instala aparte, capítulo 2) agrega a la boleta la pestaña **«Renta de 5ta»**, con el cálculo paso a paso. Lo arma la propia regla `R5TA_001` al calcular la hoja: no cambia ningún importe y no puede diferir de la línea de la boleta (si alguien la edita a mano, el detalle lo dice).'),
    tabla(['Sección de la pestaña', 'Qué muestra'], [
      ['Parámetros', 'Cálculo (Mensual, Planilla adicional, Planilla semanal, Mes del cese, Liquidación del cese o No domiciliado), UIT, régimen laboral, factor de gratificación y tasa de la bonificación'],
      ['1. Proyección anual (art. 40 a)', 'Remuneración del mes, meses por proyectar, remuneraciones proyectadas, gratificaciones por percibir y proyectadas, percibido en meses anteriores, rentas de otros empleadores y la **renta bruta anual proyectada**'],
      ['2. Deducción (art. 46 de la LIR)', 'Las 7 UIT y la **renta neta anual**'],
      ['3. Impuesto anual por tramos (art. 53 de la LIR)', 'Una fila por tramo con su base y su impuesto; la suma es el impuesto anual'],
      ['4. Retención del mes', 'La regla del mes (el texto del art. 40 d), las retenciones que se restan, el divisor, los ingresos extraordinarios y su impuesto, y la retención en la boleta'],
    ], [3300, 6338]),
    ...figura('c13_05_renta5_detalle_maria_jul2026', 'Pestaña «Renta de 5ta» de la mensual de julio de 2026 de María (caso NOMINA, sueldo 8 000): remuneraciones proyectadas 48 000,00, gratificaciones proyectadas 17 440,00, renta bruta 65 440,00, deducción 38 500,00, renta neta 26 940,00, impuesto 2 155,20 (un tramo al 8 %) y «Retención de julio: 2 155,20 ÷ 8 = 269,40».'),
    vinetas([
      '**Imprimir detalle** saca el PDF «Detalle de Renta de 5ta» de la boleta.',
      '**Actualizar detalle** (en la pestaña) y la acción **Actualizar detalle de 5ta** (en la lista de boletas) guardan el detalle de las boletas calculadas antes de instalar el módulo, sin tocar sus líneas.',
      '**Nómina PE › Detalle de Renta de 5ta** lista las boletas con su renta bruta, renta neta, impuesto y retención, con los filtros «Con detalle de 5ta», «5ta por revisar» y «5ta sin calcular». La columna «Detalle de 5ta» dice «Coincide con la boleta» o «Difiere de la boleta».',
      'La nota de crédito tiene su propio detalle. Con renta neta 0, el detalle toma el divisor de la regla del mes (lote 57).',
    ]),
    nota('Caso NOMINA (contable19, 09/11/2026): la mensual de julio de 2026 de María retiene 269,40 y la de agosto, (2 155,20 − 269,40) ÷ 5 = 377,16. El caso solo tiene boletas desde julio: lo percibido antes no existe en la base y la proyección arranca ahí (la regla de oro del capítulo 1).', 'caso'),

    h2('13.3 Ingresos extraordinarios y planillas adicionales'),
    p('La regla salarial tiene la casilla **«Ingreso extraordinario para la renta de 5.ª»** (lote 15, C-44). Viene marcada en las utilidades (`UTIL_001` y `UTIL_ANT_001`), la gratificación extraordinaria (`GRATEX_001`) y los bonos de productividad (`BPRODR_001` y `BPROD_001`). En el mes en que se pagan:'),
    vinetas([
      'no se proyectan a los meses que faltan;',
      'la retención del mes suma su impuesto: el impuesto anual **con** ellos menos el impuesto **sin** ellos;',
      'desde el mes siguiente cuentan como percibido.',
    ]),
    p('Si el bono se paga todos los meses, desmarque la casilla en la regla de esa estructura: así se proyecta como la remuneración. Lo que se paga en la vacacional validada del mes también cuenta.'),
    tabla(['Caso', 'Situación', 'Retención medida'], [
      ['CONCEPTOS, 70001603', 'Sueldo 30 000; utilidades de 20 000 en marzo de 2026', 'Enero y febrero 6 716,25; **marzo 12 716,25** (6 716,25 + 6 000,00 de las utilidades); abril 6 716,25'],
      ['CONCEPTOS, 70001604', 'Ingreso el 01/12/2026, sueldo 30 000 y 20 000 de utilidades en diciembre', '**1 356,00** (antes del lote 15, 0,00)'],
      ['ADICIONALES, 70001703 a 70001705', 'Sueldo 30 000 y comisiones de 5 000 en la planilla de comisiones', 'Mensual **721,50** y comisiones **350,00** en los tres órdenes de validación (`.rem` 0605 1 071,50)'],
      ['ADICIONALES, 70001706', 'Planilla de utilidades de 20 000 validada antes que la mensual', 'Utilidades **2 800,00**; mensual 721,50'],
    ], [2400, 3700, 3538]),
    p('**Con planillas adicionales** (lote 16) la retención del mes se calcula una vez sobre la mensual y las adicionales del mes, y cada boleta retiene lo que falta: la mensual, la retención del mes menos lo que ya retuvieron las adicionales validadas; una adicional validada después, la diferencia; una adicional validada antes, el impuesto de sus propios ingresos. El total no depende del orden.'),
    p('**El descuento deducible** (`DESC_D_001`, PLAME 0707) reduce por defecto la base de los aportes **y** la de la 5.ª (lote 29). Caso CONCEPTOS, 70001602: sueldo 3 000 con 30 de descuento deducible, base de 5.ª 2 970,00. La opción **«Descuento deducible (0707) en la renta de 5.ª»** (compañía, pestaña «Nómina PE - Controles», grupo «Renta de 5.ª») = «Solo los aportes» calcula la 5.ª como si no hubiera descuento.'),

    h2('13.4 La planilla semanal'),
    p('Desde el lote 27a la planilla semanal retiene 5.ª. La opción **«Renta de 5.ª en la planilla semanal»** (grupo «Renta de 5.ª» de la compañía):'),
    tabla(['Valor', 'Qué hace'], [
      ['**Proporcional en cada semanal del mes** (por defecto)', 'El impuesto del mes se calcula como en la mensual y se fracciona entre las semanales del mes (Reglamento de la LIR, art. 40 f); la última ajusta con lo real'],
      ['Todo en la última semanal del mes', 'Las anteriores no retienen; la última retiene el impuesto del mes'],
      ['No retener en la semanal', 'Como antes del lote 27a: la liquidación del cese regulariza el ejercicio'],
    ], [3600, 6038]),
    vinetas([
      'La semanal pertenece al mes en que **empieza** (la del 26/01 al 01/02 es la última de enero) y usa la UIT de ese ejercicio.',
      'El impuesto de un ingreso extraordinario se retiene en la semanal que lo paga.',
      'Ninguna semanal retiene más de lo que puede descontar: lo que falta lo retienen las siguientes, con aviso.',
    ]),
    p('Ejemplo del lote 27a (criterio medido en el laboratorio): obrero con 2 800 por semana desde 2025, las cuatro semanales de enero de 2026 retienen **329,17** cada una (1 316,68 en el mes); con 20 000 de gratificación extraordinaria en la segunda, esa retiene **3 729,17**. Con «Todo en la última»: 0, 0, 0 y 1 316,68.'),
    nota('Una compañía con semanales validadas en el ejercicio sin retención quedó en «No retener» al actualizar: activarla a mitad de año hace retener en las semanas que faltan el impuesto de todo el ejercicio (art. 40). Lo recomendable es activarla desde enero. En contable19, SOLSE Demo Servicios quedó en «No retener»; FM SYSTEMS, sin semanales, en «Proporcional».', 'importante'),

    h2('13.5 Rentas de otros empleadores'),
    p('En la ficha del trabajador, pestaña **Nómina PE**, sección **«Renta de 5.ª de otros empleadores»** (lote 26b; solo el usuario de nómina), un registro por otro empleador y ejercicio: **Ejercicio**, **Tipo**, **RUC del otro empleador** (con su dígito verificador), razón social, **Acreditado con** (el reporte de SUNAT Operaciones en Línea o la declaración jurada del trabajador), **Fecha de acreditación**, **Renta bruta de 5.ª** y **Retención de 5.ª**. Del empleador simultáneo, además: **Quién retiene**, su remuneración mensual, su gratificación y su último mes.'),
    tabla(['Tipo', 'Qué hace la retención'], [
      ['**Empleador anterior** (art. 41 c)', 'Desde el mes de la acreditación, su renta se suma a lo percibido y su retención a lo retenido. Sin acreditación no se considera'],
      ['**Empleador simultáneo**, «Este empleador retiene sobre el total»', 'Su remuneración y sus gratificaciones se suman y se proyectan hasta su último mes (art. 44 b)'],
      ['**Empleador simultáneo**, «Retiene el otro empleador»', 'Esta compañía no retiene ni devuelve; la boleta lo avisa'],
    ], [3800, 5838]),
    p('Ejemplos del lote 26b (criterio medido en el laboratorio), ingreso el 01/07/2026 con sueldo 6 000: sin otros empleadores julio retiene 40,40; con un empleador anterior de 60 000 y 3 000 acreditado el 10/07, **539,45**; acreditado el 03/08, 40,40 en julio (lo considera agosto); con un simultáneo de 4 000 al mes por el que retiene esta compañía, **437,05**. El certificado de 5.ª muestra las rentas y retenciones acreditadas, y el PLAME lleva el archivo `.or5` cuando esta compañía retiene por un simultáneo (lote 51, capítulo 27).'),

    h2('13.6 El trabajador no domiciliado y el convenio de la Comunidad Andina'),
    p('En el contrato (capítulo 8) hay dos campos (lotes 69 y 71):'),
    vinetas([
      '**«No domiciliado (Impuesto a la Renta)»**: el extranjero que no pasó más de 183 días en el Perú en 12 meses (LIR, art. 7 b). La condición cambia el 1 de enero (art. 8).',
      '**«Convenio para evitar la doble tributación»** (Tabla 25): «0 · Ninguno» por defecto, «3 · Comunidad Andina (Bolivia, Colombia y Ecuador)» y los demás. Se ve con la marca o si ya tiene un valor.',
    ]),
    tabla(['Situación', 'Retención'], [
      ['No domiciliado, sin convenio o con un convenio que no es el de la CAN', '**30 % de lo que percibe** (art. 54), sin las 7 UIT, sin la escala y sin proyección. Retiene cada boleta (mensual, semanal, adicional, gratificación, vacacional y liquidación): el 30 % de lo percibido desde que rige la marca menos lo ya retenido. No pasa de lo que la boleta puede descontar; el resto lo retiene la siguiente. La liquidación no hace ajuste final ni devuelve'],
      ['No domiciliado con «3 · Comunidad Andina»', 'Con las 7 UIT y la escala, como un domiciliado (Decisión 578, art. 18). Al cese, ajuste final y devolución del exceso'],
      ['Domiciliado (extranjero o no)', 'Con las 7 UIT y la escala'],
    ], [3600, 6038]),
    p('**Caso EMPRESA_CONSULTORA** («SOLSE Demo Consultora S.A.C.», medido en contable19): S2 (Venezuela, sin convenio) y S5 (Colombia, convenio «3») tienen los mismos datos, 8 000 desde el 04/05/2026 con ONP.'),
    tabla(['Boleta', 'S2, no domiciliado al 30 %', 'S5, andino con la escala', 'S3, domiciliada (España), 2 500'], [
      ['Junio de 2026', 'R5TA **2 400,00** (30 % de 8 000); ONP 1 040,00; neto 4 560,00', 'R5TA **278,03** («Retención de junio: 2 224,27 ÷ 8»); neto 6 681,97', 'R5TA 0,00; neto 2 175,00'],
      ['Gratificación de julio (1 333,33 + 120,00)', 'R5TA **436,00** (30 % de 8 000 + 1 453,33, menos 2 400,00); neto 1 017,33', 'Sin línea de R5TA; neto 1 453,33', '—'],
      ['Julio de 2026', 'R5TA 2 400,00', '—', '—'],
      ['Enero de 2027', 'R5TA 2 400,00 y aviso «no_domiciliado» (242 días en 2026)', '—', '—'],
    ], [2200, 2800, 2500, 2138]),
    ...figura('c13_06_renta5_no_domiciliado_s2', 'Pestaña «Renta de 5ta» de la gratificación de julio de 2026 de S2 (EMPRESA_CONSULTORA): «No domiciliado (LIR, art. 54): 30 % de (8 000,00 percibido en el tramo + 1 453,33 de esta boleta) − retenido 2 400,00 = 436,00», tasa 30 %, rige la marca desde el 4 de mayo, retención en la boleta 436,00.'),
    p('La retención va al 0605 del PLAME, como siempre. El ZIP del PLAME lleva el archivo `.toc` con una línea por no domiciliado (el andino también, con «Domiciliado» = 2: `04|000068005|0|0||2|`), y el campo 22 del T-Registro lleva el convenio («3» para S5): capítulos 27 y 29. El certificado de 5.ª separa la renta al 30 % (sin deducción) de la que va con la escala.'),
    tabla(['Aviso', 'Cuándo'], [
      ['`no_domiciliado`', 'Por el inicio del contrato pasaría los 183 días al 31/12: desde el 1 de enero sería domiciliado'],
      ['`no_domiciliado_sin_marca`', 'Documento de extranjero sin la marca y con 183 días o menos al 31/12. Si su país es Bolivia, Colombia o Ecuador, sugiere el convenio «3» si residía allí'],
      ['`no_domiciliado_andino`', 'Retiene el 30 % y su país es de la CAN: pregunta si residía allí al contratarlo'],
      ['`no_domiciliado_cambio`', 'El 30 % cambia en el año, por la marca o por el convenio'],
      ['`no_domiciliado_tope`', 'La boleta no puede descontar todo el 30 %'],
      ['`no_domiciliado_copia`', 'La `R5TA_001` de la estructura del cliente es una copia anterior al lote 69'],
      ['`no_domiciliado_devolucion`', 'Hay una entrada `DEV5_001` para un no domiciliado'],
      ['`no_domiciliado_cese`', 'El mes del cese de un no domiciliado: no hay ajuste final'],
      ['`extranjero_sin_regimen`', 'Documento de extranjero con «Sin régimen pensionario» (Tabla 11, 99)'],
    ], [3000, 6638]),
    nota('Decide la **residencia** al contratarlo, no la nacionalidad: guarde el sustento de la residencia andina (A-7.7). Los demás convenios de doble imposición no dan el trato de la CAN: van al 30 % (A-7.9; Informe 000052-2025-SUNAT/7T0000). Japón tiene convenio vigente pero no tiene código en la Tabla 25: se deja «0» (capítulo 33). Son criterios según la norma, pendientes de confirmación: el trabajo en el exterior (A-7.2), la salida del país a mitad de año (A-7.3), el convenio de seguridad social (A-7.4), la fecha de llegada (A-7.5) y la devolución al andino en el cese (A-7.8). La cuenta del 30 % es la 40173 (A-7.6).', 'importante'),

    h2('13.7 Certificado de 5.ª categoría'),
    p('**Nómina PE › Certificado de 5.ª categoría** imprime el certificado anual de rentas y retenciones (R.S. 010-2006/SUNAT, art. 2) de los trabajadores elegidos. Si no se elige ninguno, se imprimen todos los que tuvieron renta de 5.ª en el ejercicio. Opción **Por duplicado** (N-08). Desde los lotes 26b y 69 muestra además las rentas y retenciones acreditadas de otros empleadores y separa la renta del no domiciliado al 30 %. Los importes llevan separador de miles y el ejercicio sale sin coma (lote 59).'),
    ...figura('c13_03_certificado_asistente', 'Asistente del certificado: compañía, ejercicio (por defecto, el año anterior), trabajadores y duplicado.'),
    ...figura('c13_04_certificado_renta5_lucia_2025', 'Certificado de Lucía, ejercicio 2025 (RUC y domicilio del empleador tapados): renta bruta 65 412,34; deducción de 7 UIT 37 450,00; renta neta 27 962,34; impuesto y retención 2 309,73.'),
    nota('El certificado lo firma el representante del empleador: el empleado marcado **Firma como empleador** (capítulo 8). Si la compañía no tiene ninguno, el asistente no imprime y lo dice («… no tiene representante del empleador: marque «Empleador» en la ficha de quien firma el certificado»). Márquelo antes de imprimir.', 'importante'),

    h2('13.8 El cese: ajuste final, devolución e incentivo'),
    p('La liquidación del cese ajusta la renta de 5.ª de todo el ejercicio con las boletas validadas (N-04; Reglamento de la LIR, art. 41 d). Si el trabajador retuvo de más, la liquidación le **devuelve** el exceso (`DEV5_001`, PLAME 0928); si retuvo de menos, retiene la diferencia. En el mes del cese manda el ajuste final también para los ingresos extraordinarios. El ajuste suma la renta y la retención acreditadas de otros empleadores; la devolución no pasa de lo que retuvo esta compañía (art. 42 a): el resto lo pide el trabajador a SUNAT.'),
    ...figura('c13_02_cese_devolucion_calculo', 'Caso CESE, liquidación de abril de 2026: devolución de retención 2 158,67 y neto 13 132,00.'),
    tabla(['Trabajador del caso CESE', 'Qué pasa', 'Cifra'], [
      ['70004501 (devolución)', 'Retuvo 736,80 en enero, febrero y marzo; cesa el 30/04', 'Liquidación: R5TA 0,00 y **DEV5 2 158,67**; PLAME de abril 0928 2 158,67'],
      ['70004502 (retención)', 'Utilidades de 50 000 en marzo', 'Mensual de marzo: R5TA **1 586,14**; liquidación R5TA **190,80**'],
      ['70004503 (renovación)', 'Renueva el contrato sin interrupción', 'No hay cese ni ajuste'],
      ['70004504 (reingreso)', 'Cesa en febrero y reingresa en abril', 'Devolución 736,80 en febrero; abril R5TA 856,09'],
      ['70004505 (orden invertido)', 'Liquidación validada antes que la mensual de marzo', 'DEV5 5 257,17 y nota «rectifíquela» en la mensual'],
    ], [2600, 3800, 3238]),
    nota('Caso CESE (149 celdas): las cifras de la tabla, el ajuste final en 0,00 después de la devolución y el asiento de la liquidación con 2 158,67 al debe de la 40173.', 'caso'),
    p('**El incentivo por cese** (lote 26a; entrada `INC_CESE_001` de la liquidación, PLAME 0906) no es remuneración: no paga EsSalud ni ONP/AFP. Por defecto está **gravado con la 5.ª por el total** (LIR, art. 34 a) y entra en el ajuste final. Con la marca del contrato **«Incentivo por cese inafecto (art. 18 a de la LIR)»** es inafecto hasta la indemnización que le correspondería por despido, menos la que pague la misma liquidación. Ejemplo del lote 26a (criterio medido en el laboratorio), sueldo 8 000 del 01/09/2024 al 31/08/2026 con un incentivo de 60 000: sin la marca, 60 000,00 gravados (la retención sube 2 886,93); con la marca, 24 000,00 inafectos y 36 000,00 gravados. El detalle de la liquidación está en el capítulo 16.'),

    h2('13.9 Decisiones y criterios pendientes'),
    tabla(['Tema', 'Qué hace el sistema', 'Estado'], [
      ['La devolución del exceso al cese (P-46 a)', 'En la liquidación del mes del cese (0928); la mensual solo avisa (arts. 41 d y 42 a)', 'Valor por defecto'],
      ['Un mes con subsidio (P-45 a)', 'Proyecta con la remuneración del mes, sin el subsidio (LIR, art. 18 e)', 'Criterio según la norma, pendiente de confirmación (P-45)'],
      ['Junio y julio después de un extraordinario de mayo (P-78)', 'De mayo a julio se restan solo las retenciones de enero a abril (art. 40 d, texto literal)', 'Criterio según la norma, pendiente de confirmación (P-78)'],
      ['El mes del pago de utilidades (P-72) y los ingresos extraordinarios (P-76)', 'La casilla de la regla (13.3)', 'Valor por defecto'],
      ['El 0707 en la 5.ª (P-74)', 'Reduce la 5.ª; opción «Solo los aportes»', 'Valor por defecto'],
      ['El certificado (P-56)', 'Impreso a pedido; firma el trabajador marcado «Empleador»', 'Valor por defecto'],
    ], [3000, 4200, 2438]),
    pieCapitulo(['base', 'ce', 'ce_demo', 'renta5'], 'C-03, C-11, N-04, N-08, C-44 (lote 15), N-10 (16), C-48 (22b), P-46 c (26a), P-46 b (26b), C-45 (27a), P-74 (29), lote 39, O-97 (51), O-175 (57), O-194 (69), O-195 (71)'),
  );


  return c;
};
