// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Cifras y pantallas medidas en contable19 el 2026-10-22.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 8
  a(
    h1('8. Alta de un trabajador'),
    p('Ejemplo del recorrido: **Lucía Fernanda Ramos Ticona**, DNI sintético `99999901`, analista contable, ingreso el 01/01/2025, sueldo 4 500, SPP Integra con comisión sobre flujo, EsSalud regular y un hijo menor, que da derecho a la asignación familiar. Para los datos del T-Registro se usa además una trabajadora del caso TREGISTRO.'),
    h2('8.1 Ficha: datos principales y personales'),
    pasos([
      '**Empleados › Nuevo**: nombre completo y puesto.',
      'Pestaña **Personal**: **Número de identificación** (el DNI u otro documento) y **Cumpleaños**.',
    ]),
    ...figura('c08_01_ficha_lucia', 'Ficha de Lucía Fernanda Ramos Ticona.'),
    ...figura('c08_02_personal', 'Pestaña Personal: documento y fecha de nacimiento.'),
    h2('8.2 Pestaña Nómina PE'),
    p('La pestaña **Nómina PE** reúne todo lo que piden la boleta, el PLAME y el T-Registro:'),
    tabla(['Grupo', 'Campos', 'Para qué'], [
      ['Identificación T-Registro', '**Tipo de documento (T3)**, nombres, apellido paterno y materno por separado, situación educativa, discapacidad, rentas de 5.ª exoneradas, **edad**', 'El PLAME y el T-Registro toman el tipo de documento de aquí. Si es pasaporte (07) o documento extranjero (24), se pide el país emisor (T26). La edad sale en **años cumplidos**, como entero (U-11)'],
      ['Sistema pensionario', 'Sistema (T11), CUSPP, tipo de comisión AFP (flujo o mixta), «No aplica prima de seguro AFP», «No aporta pensión»', 'Aportes de pensión (capítulo 12)'],
      ['Salud', 'Régimen de salud, plan EPS, casilla **SCTR Pensión** y, si está marcada, las entidades de **SCTR salud** (EsSalud o EPS) y **SCTR pensión** (ONP o privada); póliza de **Vida Ley**', 'Aportes del empleador y T-Registro'],
      ['Cuentas bancarias', 'Cuenta y banco de sueldo; cuenta y banco de CTS', 'TXT bancarios (capítulo 27)'],
      ['Descuento judicial', '¿Tiene beneficiario?', 'Retención judicial'],
      ['Firma de boletas', 'Firma como empleador', 'Marca al representante del empleador: su firma aparece en las boletas (N-08)'],
      ['**Entrega de la boleta**', '**Boleta por correo**, fecha del acuerdo y correo para la boleta', 'Entrega electrónica (D.S. 001-98-TR, art. 19): solo con el acuerdo del trabajador (capítulo 28)'],
      ['**Domicilio para el T-Registro**', 'Tipo y nombre de vía, número, dpto., interior, manzana, lote, km, block, etapa, tipo y nombre de zona, referencia y **distrito (T28)**', 'Alta en el T-Registro. «SN» si no tiene número (entonces la referencia es obligatoria)'],
      ['**Estudios superiores (T-Registro)**', 'Estudios concluidos en el Perú, **institución y carrera (T34)**, año de egreso', 'Alta en el T-Registro (archivo `.edu`)'],
      ['**Derechohabientes**', 'Parentesco, nombre, género, nacimiento, **tipo y número de documento, apellidos, nombres, alta como derechohabiente**', 'Asignación familiar y registro de derechohabientes (capítulo 29)'],
    ], [2300, 4100, 3238]),
    ...figura('c08_03_nomina_pe_1', 'Nómina PE de Lucía: Identificación T-Registro (DNI, nombres y apellidos separados, situación educativa, edad 35) y sistema pensionario SPP Integra con comisión por flujo.'),
    ...figura('c08_17_salud_cuentas_firma', 'Salud (régimen, EPS, SCTR, Vida Ley), cuentas bancarias, descuento judicial, firma de boletas y entrega de la boleta.'),
    nota('El recorrido de FM SYSTEMS se cargó para el manual v1: Lucía no tiene domicilio, estudios ni tipo de trabajador (T8) para el T-Registro, y su hijo no tiene documento. Calcula bien su planilla, pero **no podría exportarse al T-Registro**: el asistente la marcaría «NO SE EXPORTA» con la lista de lo que falta. Las pantallas del T-Registro de este capítulo son de una trabajadora del caso TREGISTRO, que tiene todo completo.', 'importante'),
    h3('Datos del T-Registro completos (caso TREGISTRO)'),
    ...figura('c08_07_tregistro_identificacion', 'Trabajadora del caso TREGISTRO (DNI 70001501): tipo de documento 01 · DNI, nombres y apellidos separados, situación educativa [15] Titulado, edad 36 (entero).'),
    ...figura('c08_08_tregistro_domicilio', 'Domicilio para el T-Registro con el distrito del ubigeo RENIEC (LIMA - LIMA - LIMA [140101]) y su derechohabiente.'),
    ...figura('c08_09_tregistro_estudios', 'Estudios superiores concluidos en el Perú: institución y carrera de la T34 y año de egreso.'),
    ...figura('c08_10_entrega_electronica', 'Entrega de la boleta: «Boleta por correo» y, al marcarla, la fecha del acuerdo y el correo.'),
    h2('8.3 Derechohabientes'),
    p('Los derechohabientes se registran en la misma pestaña. Para la **asignación familiar** basta el parentesco **Hijo(a)** y la fecha de nacimiento: se paga mientras sea menor de 18 años o tenga discapacidad. Para el **registro de derechohabientes del T-Registro** se agregan el tipo y número de documento, los apellidos y nombres separados y la fecha de **Alta como derechohabiente**. Una línea nueva trae la fecha de hoy.'),
    ...figura('c08_06_derechohabientes', 'Derechohabiente de Lucía: Hijo(a), nacido el 20/06/2019. Da derecho a la asignación familiar.'),
    ...figura('c08_11_tregistro_derechohabientes', 'Derechohabiente completo del caso TREGISTRO: DNI 78001501, apellidos, nombres y alta el 16 de octubre.'),
    nota('La edad del **derechohabiente** se calcula a hoy y con decimales: un hijo de 17 años y 11 meses tiene 17,92 (menor de 18), y así lo lee la regla de la asignación familiar. La del **trabajador** es entera. El parentesco debe tener código de la Tabla 19 para exportarse (capítulo 5).', 'nota'),
    h2('8.4 Contrato (versión del empleado)'),
    p('En Odoo 19 el contrato es una **versión** del empleado (`hr.version`). La lista **Nómina › Empleados › Contratos** muestra el trabajador en la primera columna, con fechas, estructura, régimen y sueldo (U-02).'),
    ...figura('c08_12_lista_contratos', 'Lista de contratos con el trabajador, la fecha efectiva, el inicio y fin, la estructura, el régimen laboral y el sueldo.'),
    pasos([
      'Abra el contrato desde la ficha (botón con la fecha) o desde la lista.',
      'Fecha de inicio, **Estructura salarial** y **Diario de planillas**. Un contrato nuevo nace con «Régimen General» y su estructura (C-07): Régimen General y Quincenal → NME; Obreros - Semanal → NSO.',
      'Pestaña **Información salarial**: salario, tipo de contrato, **Categoría del pago** y horario.',
      'Grupo **Perú - Datos laborales (T-Registro / PLAME)**: régimen laboral (T33), **tipo de trabajador (T8)**, **categoría ocupacional (T24)**, tipo de contrato (T12), ocupación (T30), situación especial, tipo de pago y, al cesar, **motivo de baja** (T17), **despido arbitrario** y **fin pactado del contrato modal** (capítulo 16).',
    ]),
    ...figura('c08_13_contrato_lucia', 'Contrato de Lucía: estructura «Nómina Mensual Empleados», diario Planillas, salario 4 500 y categoría del pago «Régimen General».'),
    ...figura('c08_15_categoria_del_pago', '«Categoría del pago»: los tipos peruanos primero; los genéricos de Odoo, al final y en español (U-10). (Se descartó.)'),
    ...figura('c08_16_contrato_t8_t24', 'Datos laborales completos (caso TREGISTRO): régimen D.LEG N.° 728, tipo de trabajador 21 · Empleado, tipo de contrato [01] plazo indeterminado, tipo de pago [2] depósito en cuenta.'),
    nota('El contrato ya no muestra los beneficios de India de `om_hr_payroll` (HRA, DA, viajes, comidas, gastos médicos) (U-07). La categoría ocupacional (T24) es obligatoria salvo para los tipos de trabajador 19, 20, 21, 23, 66, 71 y 98.', 'nota'),
    pieCapitulo(['ce', 'om'], 'C-07, U-02, U-07, U-10, U-11, N-02, N-08'),
  );


  return c;
};
