// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Conteos releídos en contable19 el 2026-11-09 (sin cambios desde el v2).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 5
  a(
    h1('5. Maestros SUNAT y tablas del T-Registro'),
    p('Las tablas de la Planilla Electrónica se cargan con el módulo y las usan la ficha del trabajador, el contrato, el PLAME y el T-Registro. En la versión 2 cada maestro se muestra como **«[código] descripción»** y se busca por código, abreviatura o descripción (U-04).'),
    tabla(['Tabla', 'Menú (Nómina PE › Maestros SUNAT)', 'Registros', 'Dónde se usa'], [
      ['T11 Sistemas pensionarios', 'Sistemas pensionarios (T11)', '17', 'Ficha: sistema pensionario'],
      ['T33 Regímenes laborales', 'Regímenes laborales (T33)', '27', 'Contrato: régimen laboral'],
      ['T12 Tipo de contrato / condición laboral', 'Tipos de contrato (T12)', '25 activos', 'Contrato. Ahora con los datos del Anexo 2 de SUNAT del 07/10/2026 (Q-02); el 20 (agrario) está archivado'],
      ['T30 Ocupaciones', 'Ocupaciones (T30)', '4 644', 'Contrato: ocupación'],
      ['T17 Motivos de baja', 'Motivos de baja (T17)', '21', 'Contrato: motivo del cese'],
      ['T9 Situación educativa', 'Situación educativa (T9)', '21', 'Ficha'],
      ['**T34** Instituciones y carreras', 'Instituciones y carreras (T34)', '**5 925**', 'Ficha: estudios superiores (T-Registro)'],
      ['**T28** Ubigeo RENIEC', 'Ubigeo RENIEC (T28)', '**1 892**', 'Ficha: distrito del domicilio (T-Registro)'],
      ['T35 Situaciones especiales', 'Situaciones especiales (T35)', '9', 'Contrato'],
      ['**T19** Vínculo familiar', 'Vínculos familiares (T19)', '9 parentescos, 4 con código', 'Derechohabientes (T-Registro)'],
      ['T22 Conceptos PLAME', 'Conceptos PLAME (T22)', '293', 'Reglas salariales y PLAME'],
    ], [2600, 2800, 1400, 2838]),
    p('Los conteos son los mismos del manual v2: los lotes 13 a 71 no agregaron registros a estos maestros. Los códigos de la Tabla 22 que empezaron a usar las reglas nuevas (0107, 0115, 0116, 0407, 0811, 0907, 0908, 0910, entre otros) ya estaban entre sus 293 conceptos.'),
    p('Otras tablas son listas de selección dentro del formulario, sin menú propio:'),
    tabla(['Tabla', 'Dónde', 'Valores'], [
      ['**T3** Tipo de documento', 'Ficha › Nómina PE', '01 DNI, 04 carné de extranjería, 07 pasaporte, 09, 22, 23 PTP, 24 documento extranjero, 26 CPP'],
      ['**T26** País emisor', 'Ficha › Nómina PE (solo con 07 o 24)', 'Países'],
      ['**T8** Tipo de trabajador', 'Contrato', '24 tipos del sector privado (21 · Empleado, 20 · Obrero…)'],
      ['**T24** Categoría ocupacional', 'Contrato', '01 Ejecutivo, 02 Obrero, 03 Empleado'],
      ['**T18** Modalidad formativa', 'Contrato, con «¿Es practicante?» (lote 49a)', 'Las 7 modalidades del sector privado (capítulo 31)'],
      ['**T25** Convenio para evitar la doble tributación', 'Contrato, con «No domiciliado» (lote 71)', '0 · Ninguno (por defecto), 1 · Canadá, 2 · Chile, 3 · Comunidad Andina (Bolivia, Colombia y Ecuador), 4 · Brasil, 5 · México, 6 · Corea, 7 · Suiza, 8 · Portugal'],
      ['**T14** Entidad prestadora de salud', 'Plan EPS', '1 a 7 (2 · Pacífico S.A. EPS…)'],
      ['**T20** Motivo de baja del derechohabiente y **T27** documento que acredita el vínculo', 'Derechohabientes', 'Según SUNAT'],
    ], [3000, 2900, 3738]),
    nota('La Tabla 25 todavía no tiene código para el convenio con **Japón**, que está vigente: ese trabajador va con «0 · Ninguno» y retiene el 30 % (O-197; capítulo 33). Cómo se usa la Tabla 25 en el contrato, en el capítulo 8; su efecto en la retención, en el 13; en el T-Registro (campo 22) y el PLAME (`.toc`), en el 29 y el 27.', 'limite'),
    ...figura('c05_01_t22_conceptos_plame', 'Conceptos PLAME (T22): código, descripción y a qué tributos o aportes está afecto cada concepto.'),
    ...figura('c05_03_busqueda_por_codigo', 'Búsqueda por código: «0121» encuentra «Remuneración o jornal básico».'),
    ...figura('c05_02_t11_sistemas_pensionarios', 'Sistemas pensionarios (T11): el 02 es la ONP; las AFP llevan su clave para la comisión.'),
    ...figura('c05_04_t12_tipos_contrato', 'Tipos de contrato (T12): código, abreviatura y descripción del Anexo 2.'),
    ...figura('c05_08_t33_regimenes', 'Regímenes laborales (T33).'),
    h2('5.1 Tablas nuevas del T-Registro'),
    ...figura('c05_05_t19_vinculos', 'Vínculos familiares (T19): Cónyuge 02, Pareja (concubina) 03, Hijo(a) 05 y Gestante 04. Padre, Hermano(a), Primo(a), Abuelo(a) y Nieto(a) no son derechohabientes de EsSalud y no tienen código.'),
    ...figura('c05_06_t28_ubigeo', 'Ubigeo RENIEC (T28): 1 892 distritos con su departamento y provincia.'),
    ...figura('c05_07_t34_carreras', 'Instituciones y carreras (T34): 5 925 combinaciones de institución y carrera.'),
    nota('Un parentesco sin código de la Tabla 19 no se exporta como derechohabiente: el asistente del T-Registro lo excluye (capítulo 29). Si crea un parentesco propio, póngale el código que corresponda.', 'importante'),
    pieCapitulo(['ce'], 'U-04, U-05, Q-02, N-02, O-156 (lote 49a: T18), O-195 y O-197 (lote 71: T25)'),
  );


  return c;
};
