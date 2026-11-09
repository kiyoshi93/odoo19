// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Etiquetas releídas en contable19 el 2026-11-09 (fields_get, es_PE);
// cifras de los casos EMPRESA_CONSULTORA, EMPRESA_INDUSTRIA y SCTR medidas en la base ese día.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 8
  a(
    h1('8. Alta de un trabajador'),
    p('Ejemplo del recorrido: **Lucía Fernanda Ramos Ticona**, DNI sintético `99999901`, analista contable, ingreso el 01/01/2025, sueldo 4 500, SPP Integra con comisión sobre flujo, EsSalud regular y un hijo menor, que da derecho a la asignación familiar. Para los datos del T-Registro se usa además una trabajadora del caso TREGISTRO, y para lo nuevo de la versión 3 (el tiempo parcial, el SENATI, el extranjero y el practicante), los trabajadores de los laboratorios EMPRESA_CONSULTORA y EMPRESA_INDUSTRIA, cada uno en su compañía de prueba.'),
    h2('8.1 Ficha: datos principales y personales'),
    pasos([
      '**Empleados › Nuevo**: nombre completo y puesto.',
      'Pestaña **Personal**: **Número de identificación** (el DNI u otro documento) y **Cumpleaños**.',
    ]),
    ...figura('c08_01_ficha_lucia', 'Ficha de Lucía Fernanda Ramos Ticona.'),
    ...figura('c08_02_personal', 'Pestaña Personal de Lucía: «Cumpleaños» 14/08/1991 y, en Ciudadanía, el «Número de identificación» 99999901 (DNI sintético).'),
    h2('8.2 Pestaña Nómina PE'),
    p('La pestaña **Nómina PE** reúne todo lo que piden la boleta, el PLAME y el T-Registro:'),
    tabla(['Grupo', 'Campos', 'Para qué'], [
      ['Identificación T-Registro', '**Tipo de documento (T3)**, nombres, apellido paterno y materno por separado, situación educativa, discapacidad, rentas de 5.ª exoneradas, **edad**', 'El PLAME y el T-Registro toman el tipo de documento de aquí. Si es pasaporte (07) o documento extranjero (24), se pide el país emisor (T26). La edad sale en **años cumplidos**, como entero (U-11)'],
      ['Sistema pensionario', 'Sistema (T11), CUSPP, tipo de comisión AFP (flujo o mixta), «No aplica prima de seguro AFP», «No aporta pensión»', 'Aportes de pensión (capítulo 12)'],
      ['Salud', 'Régimen de salud, plan EPS, casilla **Cubierto por SCTR** y, si está marcada, **SCTR salud** (EsSalud o EPS) y **SCTR pensión (entidad)** (ONP o compañía de seguros privada); póliza de **Vida Ley**', 'Aportes del empleador y T-Registro. Con la entidad, la boleta usa la póliza SCTR de esa entidad (capítulo 6)'],
      ['Cuentas bancarias', 'Cuenta y banco de sueldo; cuenta y banco de CTS', 'TXT bancarios (capítulo 27)'],
      ['Descuento judicial', '¿Tiene beneficiario?', 'Retención judicial'],
      ['Firma de boletas', 'Firma como empleador', 'Marca al representante del empleador: su firma aparece en las boletas (N-08) y en los documentos del cese (capítulo 16)'],
      ['Entrega de la boleta', 'Boleta por correo, fecha del acuerdo y correo para la boleta', 'Entrega electrónica (D.S. 001-98-TR, art. 19): con el acuerdo del trabajador o, si la compañía lo elige, a quien cobra en cuenta (capítulo 28)'],
      ['Domicilio para el T-Registro', 'Tipo y nombre de vía, número, dpto., interior, manzana, lote, km, block, etapa, tipo y nombre de zona, referencia y **distrito (T28)**', 'Alta en el T-Registro. «SN» si no tiene número (entonces la referencia es obligatoria)'],
      ['Estudios superiores (T-Registro)', 'Estudios concluidos en el Perú, **institución y carrera (T34)**, año de egreso', 'Alta en el T-Registro (archivo `.edu`)'],
      ['Derechohabientes', 'Parentesco, nombre, género, nacimiento, **tipo y número de documento, apellidos, nombres, alta como derechohabiente**', 'Asignación familiar y registro de derechohabientes (capítulo 29)'],
      ['**Renta de 5.ª de otros empleadores**', 'Ejercicio, tipo, RUC, razón social, acreditado con, fecha de acreditación, renta y retención; en el simultáneo, quién retiene, su remuneración mensual, su gratificación y su último mes', 'Lote 26b: la 5.ª suma lo del empleador anterior o simultáneo (8.3 y capítulo 13). Solo la ve el usuario de nómina'],
      ['**Promedios fijados del subsidio**', 'Código, inicio, promedio y boleta (solo lectura)', 'Lote 28b: el promedio queda fijo desde el inicio de la contingencia (capítulo 23)'],
    ], [2300, 4100, 3238]),
    ...figura('c08_03_nomina_pe_1', 'Nómina PE de Lucía: Identificación T-Registro (DNI, nombres y apellidos separados, situación educativa, edad 35) y sistema pensionario SPP Integra con comisión por flujo.'),
    ...figura('c08_17_salud_cuentas_firma', 'Salud (régimen, EPS, «Cubierto por SCTR», Vida Ley), cuentas bancarias, descuento judicial, firma de boletas y entrega de la boleta.'),
    nota('El recorrido de FM SYSTEMS se cargó para el manual v1: Lucía no tiene domicilio, estudios ni tipo de trabajador (T8) para el T-Registro, y su hijo no tiene documento. Calcula bien su planilla, pero **no podría exportarse al T-Registro**: el asistente la marcaría «NO SE EXPORTA» con la lista de lo que falta. Las pantallas del T-Registro de este capítulo son de una trabajadora del caso TREGISTRO, que tiene todo completo.', 'importante'),
    h3('Datos del T-Registro completos (caso TREGISTRO)'),
    ...figura('c08_07_tregistro_identificacion', 'Trabajadora del caso TREGISTRO (DNI 70001501): tipo de documento 01 · DNI, nombres y apellidos separados, situación educativa [15] Titulado, edad 36 (entero).'),
    ...figura('c08_08_tregistro_domicilio', 'Domicilio para el T-Registro con el distrito del ubigeo RENIEC (LIMA - LIMA - LIMA [140101]) y su derechohabiente.'),
    ...figura('c08_09_tregistro_estudios', 'Estudios superiores concluidos en el Perú: institución y carrera de la T34 ([160000001] Universidad Naciona…) y año de egreso 2012. Arriba, «Entrega de la boleta»: esta trabajadora no tiene marcada «Boleta por correo»; al marcarla aparecen la fecha del acuerdo y el correo para la boleta.'),
    nota('**El documento en el contacto de trabajo** (P-53 c, lote 38). Con la opción de la compañía «Documento del trabajador en su contacto de trabajo» (grupo «Boleta por correo», apagada por defecto), al crear el empleado o cambiar su documento, su contacto de trabajo recibe el número y el tipo; al marcarla se completan los que ya estaban. Un contacto que ya tiene otro número (el RUC del trabajador que también emite recibos) se deja como está. El documento escrito en la versión del contrato también pasa al contacto (O-160, lote 40). El contacto lo ve cualquier usuario interno: márquela solo cuando haga falta. El formato 3.11 del PLE ya toma el documento de la ficha si el contacto no lo tiene (lote 56, capítulo 7).', 'implementador'),
    h2('8.3 Derechohabientes y otros empleadores'),
    p('Los derechohabientes se registran en la misma pestaña. Para la **asignación familiar** basta el parentesco **Hijo(a)** y la fecha de nacimiento: se paga mientras sea menor de 18 años (o de la «Edad máx.» del pariente, por estudios superiores) o tenga discapacidad. Para el **registro de derechohabientes del T-Registro** se agregan el tipo y número de documento, los apellidos y nombres separados y la fecha de **Alta como derechohabiente**. Una línea nueva trae la fecha de hoy.'),
    ...figura('c08_06_derechohabientes', 'Derechohabiente de Lucía: Hijo(a), nacido el 20/06/2019. Da derecho a la asignación familiar.'),
    ...figura('c08_11_tregistro_derechohabientes', 'Derechohabiente completo del caso TREGISTRO: Hijo(a), nacida el 20/08/2020, DNI 78001501, apellidos y nombres separados y alta el 16 de octubre; debajo, la sección vacía «Renta de 5.ª de otros empleadores».'),
    p('**La edad que cuenta es la del periodo que se paga** (O-80, lote 22a; Ley 25129, art. 2). La columna «Edad» de la lista muestra la de hoy, con decimales; la boleta mide la edad del hijo el **primer día de su mes**, así que una boleta de un mes pasado calculada hoy no pierde la asignación. La semanal mide en el mes de devengue (el que tiene 4 o más de sus días) y el depósito de CTS, en abril u octubre. Ejemplo: un hijo nacido el 10/03/2008 da asignación en la mensual de febrero de 2026 y en la de marzo, el mes en que cumple 18 años; en la de abril, no.'),
    nota('Que el mes en que el hijo cumple 18 años todavía se pague es un criterio según la norma, pendiente de confirmación (P-124). **Un mes entero sin goce** (todo el mes en suspensión perfecta) no paga la asignación familiar por defecto: opción de la compañía «Asignación familiar en un mes entero sin goce», grupo «Suspensiones», con «Pagarla» como lo de antes del lote 25a (criterio según la norma, pendiente de confirmación, P-39). En la micro y la pequeña empresa, la asignación depende además de sus opciones (capítulo 24). El parentesco debe tener código de la Tabla 19 para exportarse (capítulo 5).', 'importante'),
    h3('Rentas de 5.ª de otros empleadores (lote 26b)'),
    p('En la misma pestaña, la sección **Renta de 5.ª de otros empleadores** guarda un registro por otro empleador y ejercicio. La ve solo el usuario de nómina. Se llena cuando el trabajador entrega el reporte de rentas y retenciones de SUNAT Operaciones en Línea o su declaración jurada:'),
    tabla(['Campo', 'Para qué'], [
      ['Ejercicio, **Tipo**', '«Empleador anterior (art. 41 c)» o «Empleador simultáneo (art. 44 b)»'],
      ['**RUC del otro empleador** y razón social', 'El RUC se valida con su dígito verificador y no puede ser el de esta compañía'],
      ['**Acreditado con** y **Fecha de acreditación**', 'Reporte de rentas y retenciones (SUNAT Operaciones en Línea) o declaración jurada del trabajador. Lo consideran las boletas desde el mes de la acreditación; sin ella no se considera nada'],
      ['**Renta bruta de 5.ª** y **Retención de 5.ª**', 'Lo percibido y lo retenido por el otro empleador en el ejercicio'],
      ['Solo el simultáneo: **Quién retiene**', '«Este empleador retiene sobre el total (paga la mayor remuneración)» o «Retiene el otro empleador: aquí no se retiene» (la boleta lo avisa)'],
      ['Si retiene esta compañía: remuneración mensual, gratificación ordinaria y **último mes** en el otro empleador', 'Se suman y se proyectan desde el mes de la acreditación hasta el último mes. Un cambio de sueldo en el otro se registra cerrando el registro y abriendo otro'],
    ], [3600, 6038]),
    p('Cómo cambia la retención, el ajuste del cese, el certificado y el archivo `.or5` del PLAME está en los capítulos 13 y 27. El registro no guarda historial: editarlo cambia las boletas que se calculen desde entonces.'),
    h2('8.4 Contrato (versión del empleado)'),
    p('En Odoo 19 el contrato es una **versión** del empleado (`hr.version`). La lista **Nómina › Empleados › Contratos** muestra el trabajador en la primera columna, con fechas, estructura, régimen y sueldo (U-02). El sueldo y las fechas del contrato son del grupo «Empleados / Administrador»; el usuario de nómina calcula y valida las boletas sin necesitarlo (lote 38, capítulo 3).'),
    ...figura('c08_12_lista_contratos', 'Lista de contratos de FM SYSTEMS (17): el trabajador en la primera columna, la fecha efectiva, el inicio y fin, la estructura, el régimen laboral, el sueldo y el horario.'),
    pasos([
      'Abra el contrato desde la ficha (botón con la fecha) o desde la lista.',
      'Fecha de inicio, **Estructura salarial** y **Diario de planillas**. Un contrato nuevo nace con «Régimen General» y su estructura (C-07): Régimen General y Quincenal → NME; Obreros - Semanal → NSO. El practicante usa la estructura **SMF** (capítulo 31).',
      '**Puesto** y **Nombre del puesto** (cargo): el certificado de trabajo lista un cargo por contrato o por versión con otro cargo (N-15, lote 21a). Sin puesto, la liquidación avisa.',
      'Pestaña **Información salarial**: salario, tipo de contrato, **Categoría del pago** y **Horas laborables** (el horario, 8.5).',
      'Grupo **Perú - Datos laborales (T-Registro / PLAME)**: los campos de la tabla siguiente.',
    ]),
    tabla(['Campo', 'Para qué'], [
      ['Régimen Laboral (T33), **Tipo de trabajador (T8)**, **Categoría ocupacional (T24)**, Tipo de contrato (T12), Ocupación (T30), Situación especial, Tipo de pago, Remuneración variable', 'T-Registro y PLAME. El régimen decide los factores de gratificación, CTS y vacaciones (capítulos 4 y 24). La T24 es obligatoria salvo para los tipos de trabajador 19, 20, 21, 23, 66, 71 y 98'],
      ['Motivo de baja (T17), **Despido arbitrario (se indemniza)**, **Fin pactado del contrato modal**', 'Al cesar (capítulo 16)'],
      ['**Incentivo por cese inafecto (art. 18 a de la LIR)**', 'Lote 26a: el incentivo por cese (INC_CESE_001, 0906) no paga 5.ª si se marca (capítulo 16)'],
      ['**Remuneración principal**', 'Lote 33b (P-84): «Fija: el sueldo (las comisiones son complementarias)» (por defecto), «Comisionista: las comisiones son su remuneración principal» o «Destajero: el destajo es su remuneración principal». Con comisionista o destajero, las comisiones o el destajo (concepto 0103) entran en la gratificación, la CTS, las vacaciones y la indemnización con su promedio, sin el requisito de 3 meses. Un trabajador sin sueldo se trata como comisionista aunque diga «Fija»'],
      ['Porcentaje de adelanto, Jornada de trabajo máxima, Jornada atípica o acumulativa, **Trabajo en horario nocturno**, Sindicalizado', 'Adelanto quincenal (capítulo 20), T-Registro, cuota sindical. Con «Trabajo en horario nocturno», la mensual avisa si el sueldo es menor que la RMV más el 35 % (lote 64, capítulo 26)'],
      ['**Fuera de la base del SENATI**', 'Lote 66: el trabajador no entra en la base del 0,75 % aunque la compañía «Afecta a SENATI» (8.5)'],
      ['**No domiciliado (Impuesto a la Renta)** y **Convenio para evitar la doble tributación**', 'Lotes 69 y 71: el extranjero no domiciliado y la Tabla 25 (8.6)'],
      ['**¿Es practicante?** y, con ella, Modalidad formativa (T18), Jornada semanal del convenio, Seguro médico del practicante, Tipo de pasantía, Tipo de centro de formación, Madre con responsabilidad familiar', 'Lote 49a: el convenio de modalidad formativa (Ley 28518). Todo lo del practicante está en el **capítulo 31**'],
      ['Remuneración en especie, No mostrar horas extras en boleta', 'Como en el v2'],
    ], [3800, 5838]),
    ...figura('c08_13_contrato_lucia', 'Contrato de Lucía: estructura «Nómina Mensual Empleados», diario Planillas, salario 4 500 y categoría del pago «Régimen General».'),
    ...figura('c08_15_categoria_del_pago', '«Categoría del pago»: los tipos peruanos primero (Régimen General, Obreros - Semanal, Quincenal - Adelanto, Beneficios Sociales y, nuevo, Modalidades formativas); los genéricos de Odoo, al final y en español (U-10). (Se descartó.)'),
    ...figura('c08_16_contrato_t8_t24', 'Datos laborales completos (caso TREGISTRO): régimen D.LEG N.° 728, tipo de trabajador 21 · Empleado, tipo de contrato [01] plazo indeterminado, tipo de pago [2] depósito en cuenta y, en la columna derecha, «Remuneración principal» Fija y las casillas nuevas «Fuera de la base del SENATI», «No domiciliado (Impuesto a la Renta)» y «¿Es practicante?».'),
    nota('**Remuneración principal**, criterios del lote 33b: sin sueldo y comisiones de 3 000 en marzo y junio, la gratificación de julio es 1 000,00 (antes 0); con sueldo 1 230 y comisiones de 2 000 y 2 500 marcado «Comisionista», 1 980,00 (sin la marca, 1 230,00 y la boleta avisa). Qué trabajadores son comisionistas o destajeros lo decide la empresa con su contadora; la boleta avisa cuando un trabajador con sueldo y la marca «Fija» tiene comisiones mayores que el sueldo en algún mes, o cuando la marca no coincide con «Remuneración variable» del T-Registro. El detalle está en los capítulos 14, 15 y 17.', 'caso'),
    nota('El contrato ya no muestra los beneficios de India de `om_hr_payroll` (HRA, DA, viajes, comidas, gastos médicos) (U-07).', 'nota'),

    h2('8.5 El horario: valor hora, tiempo parcial y SENATI'),
    p('El campo **Horas laborables** del contrato (el horario de trabajo) ya no es solo para las asistencias. Desde la versión 3 decide tres cálculos, así que debe ser la **jornada real** del trabajador:'),
    vinetas([
      '**El valor hora** (C-47, lote 24): sueldo ÷ 30 ÷ el «Promedio de horas por día» del horario del contrato (si no hay, el del trabajador o el de la compañía; sin ninguno, 8), con tope de 48 horas semanales. Lo usan las horas extras, el trabajo en feriado, la sobretasa nocturna y las tardanzas. Con sueldo 3 000: 12,50 con 8 horas; 10,42 con 48 horas en 5 días; 25,00 a tiempo parcial de 4 horas (criterios del lote 24). La opción de la compañía «Valor hora» permite volver a «Sueldo ÷ 30 ÷ 8» (capítulos 9 y 20).',
      '**El tiempo parcial** (lote 67; D.S. 001-96-TR, art. 12): si la jornada semanal del horario, dividida entre los días de la semana de la jornada de la compañía (5 o 6), da **menos de 4 horas diarias**, el trabajador no tiene CTS (D.S. 001-97-TR, art. 4): CTS_001, CTS_TRUNCA_001 y su provisión salen en 0, con el aviso «tiempo_parcial», salvo que la compañía elija «Tiempo parcial: CTS» = «Pagar». Si la Tabla 12 del contrato («02», a tiempo parcial) no dice lo mismo que el horario, la boleta avisa y manda el horario (capítulos 15 y 17).',
      '**La remuneración mínima** (lote 64): con menos de 4 horas diarias, el aviso de la boleta compara el sueldo con la RMV proporcional a la jornada de la compañía (capítulo 26).',
    ]),
    nota('Caso EMPRESA_CONSULTORA, S4 (DNI 70006804), asistente con 500 de sueldo y el horario «SOLSE Demo Consultora · 3 h diarias»: en junio de 2026, ONP **65,00**, EsSalud **101,70** (9 % de la RMV de 1 130: el tiempo parcial paga EsSalud con la base mínima) y neto **435,00**. Caso EMPRESA_COMERCIO, K8 (450, 3 horas diarias): CTS de mayo de 2026 **0,00** con el aviso; con «Pagar», **225,00**.', 'caso'),
    nota('Detectar el tiempo parcial por el horario, el promedio de las 4 horas con los días de la jornada de la empresa y las vacaciones del trabajador a tiempo parcial (las calcula como a cualquiera y avisa) son criterios según la norma, pendientes de confirmación (A-6.1, A-6.2 y A-6.3). El valor hora con una jornada distinta de 8 horas, también (P-89). Si un trabajador de 4 horas tiene el horario estándar de 8, sigue dividiendo entre 8: revise los horarios.', 'importante'),
    p('**El SENATI** (Ley 26272, art. 11). Si la compañía tiene marcada **Afecta a SENATI** (en su ficha, junto al RUC), la boleta calcula el 0,75 % (`SENATI_001`) de todos sus trabajadores. Marque **Fuera de la base del SENATI** en el contrato del personal de otra actividad que no sea la industrial (ni instalación, reparación o mantenimiento), como el vendedor de la tienda de la fábrica. El aporte, el umbral de los 20 trabajadores y sus avisos están en el capítulo 32.'),
    nota('Caso EMPRESA_INDUSTRIA, junio de 2026: la administrativa I3 (DNI 70006503, 2 500, 30 minutos de tardanza) aporta **18,71** (0,75 % de 2 494,79); el vendedor de la tienda I4 (DNI 70006504, 1 800, «Fuera de la base del SENATI») no lleva línea de SENATI. Que el personal administrativo entre en la base salvo la marca es el criterio de hoy (A-5.1).', 'caso'),

    h2('8.6 El trabajador extranjero: no domiciliado y convenio'),
    p('Dos campos del contrato deciden la renta de 5.ª del extranjero:'),
    vinetas([
      '**No domiciliado (Impuesto a la Renta)** (lote 69): el extranjero que no residió o permaneció en el país más de 183 días en un periodo cualquiera de 12 meses (LIR, art. 7 b). La condición cambia desde el 1 de enero del año siguiente (art. 8). Su 5.ª es el 30 % de lo que percibe (parámetro `pe_renta5_tasa_no_domiciliado`), sin las 7 UIT ni la escala.',
      '**Convenio para evitar la doble tributación** (lote 71), de la Tabla 25: «0 · Ninguno» por defecto. Solo se muestra con la marca, o si ya tiene un valor. Con «3 · Comunidad Andina (Bolivia, Colombia y Ecuador)», para quien tenía su residencia habitual en esos países al contratarlo (decide la residencia, no la nacionalidad), la 5.ª se retiene con las 7 UIT y la escala, como a un domiciliado (Decisión 578, art. 18). Los demás convenios no dan ese trato: el 30 %. Japón no tiene código en la Tabla 25: «0» (capítulo 5).',
    ]),
    p('El tipo de documento de la ficha (T3) debe ser el de extranjero (04, 07, 24…). La boleta avisa, entre otros casos, cuando un extranjero sin la marca tendría 183 días o menos al 31/12 («no_domiciliado_sin_marca»), cuando por la fecha de inicio ya pasaría los 183 días y desde el 1 de enero sería domiciliado («no_domiciliado»), y cuando su país es Bolivia, Colombia o Ecuador y retiene el 30 % («no_domiciliado_andino»). El convenio va al campo 22 del T-Registro y al archivo `.toc` del PLAME. La retención, los avisos y las declaraciones están en el capítulo 13.'),
    ...figura('c08_18_contrato_no_domiciliado', 'Contrato del consultor S5 de EMPRESA_CONSULTORA (de Colombia, 8 000 desde el 04/05/2026): «No domiciliado (Impuesto a la Renta)» marcado y «Convenio para evitar la doble tributación» = «3 · Comunidad Andina (Bolivia, Colombia y Ecuador)».'),
    tabla(['Caso EMPRESA_CONSULTORA, junio de 2026, sueldo 8 000 desde el 04/05/2026', 'Renta de 5.ª', 'Neto'], [
      ['S2, de Venezuela, «No domiciliado», convenio «0 · Ninguno»', '2 400,00 (30 % de 8 000)', '4 560,00'],
      ['S5, de Colombia, «No domiciliado», convenio «3 · Comunidad Andina»', '278,03 (la escala)', '6 681,97'],
      ['S3, de España, domiciliada desde 2024 (sueldo 2 500)', '0,00', '2 175,00'],
    ], [5400, 2238, 2000]),
    nota('El trabajo en el exterior, la salida del país a mitad de año, la fecha de llegada (hoy, el primer inicio de contrato en la compañía) y la devolución al andino en el cese son criterios según la norma, pendientes de confirmación (A-7.2, A-7.3, A-7.5 y A-7.8). Con valor por defecto de hoy: el trato de la Comunidad Andina (A-7.1), el sustento de la residencia (el sistema no pide documento: guárdelo, A-7.7) y el 30 % con los demás convenios (A-7.9).', 'importante'),

    h2('8.7 Renovar, reingresar o cesar'),
    p('Desde el lote 22b (C-48), **renovar no es cesar**. Cuando un contrato a plazo fijo se renueva, registre el contrato nuevo **desde el día siguiente** al fin del anterior, sin liquidación: el sistema lo trata como **un solo vínculo** y la gratificación, la CTS, el récord vacacional, las truncas y la proyección de la 5.ª cuentan desde el inicio del vínculo, como con un solo contrato por las mismas fechas.'),
    tabla(['Criterios del lote 22b: 3 000 desde el 01/01/2025, renovado el 16/05/2026', 'Antes', 'Ahora'], [
      ['Gratificación de julio de 2026', '500,00', '3 000,00 + 270,00'],
      ['CTS de noviembre de 2026, con una renovación el 16/08', '633,33', '1 500,00'],
      ['Liquidación al 31/08/2026: vacaciones truncas', '883,33', '2 000,00'],
      ['Contrato que termina el 20/12 y se renueva el 21/12: gratificación de diciembre', '2 500,00', '3 000,00'],
    ], [5638, 2000, 2000]),
    p('**El vínculo se corta** con un cese que tiene su **liquidación validada** (y no anulada por nota de crédito), con un convenio de prácticas (no es vínculo laboral) y con un cambio de régimen laboral entre dos contratos. Si el contrato anterior terminó con su liquidación validada, el nuevo cuenta desde su propio inicio, y las boletas de sus seis primeros meses avisan: «… es otro vínculo … Si la relación siguió sin interrupción (no hubo cese), anule la liquidación con una nota de crédito: el vínculo vuelve a ser uno». Con una liquidación al 15/05 y un contrato desde el 16/05, la gratificación de julio paga junio (500,00).'),
    p('**El reingreso.** Para la indemnización y el tiempo de servicios, un reingreso al día siguiente del cese suma el servicio previo (D.S. 001-96-TR, art. 16); las prácticas anteriores y un contrato ya liquidado no se unen (lote 41). En el mes del reingreso se hace una boleta por contrato. El detalle, con los ejemplos, está en el capítulo 16.'),
    nota('El contrato renovado sin interrupción como un solo vínculo y el contrato desde el día siguiente a una liquidación validada como otro vínculo son criterios según la norma, pendientes de confirmación (P-47 y P-108).', 'importante'),
    pieCapitulo(['ce', 'om'], 'C-07, U-02, U-07, U-10, U-11, N-02, N-08, N-12 (lote 19), N-15 (21a), O-80 (22a), C-48 (22b), P-46 b (26b), P-46 c (26a), O-73/P-39 (25a), C-47 (24), P-84 (33b), P-53 c y O-74 (38), O-160 (40), lote 41, O-156 (49a), O-192 (66), O-193 (67), O-194 (69), O-195 (71)'),
  );


  return c;
};
