// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Cifras y pantallas medidas en contable19 el 2026-10-22.
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
    p('Otras tablas son listas de selección dentro del formulario, sin menú propio: **T3** tipo de documento (ficha), **T8** tipo de trabajador y **T24** categoría ocupacional (contrato), **T14** código de la EPS (plan EPS), **T20** motivo de baja del derechohabiente y **T27** documento que acredita el vínculo.'),
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
    pieCapitulo(['ce'], 'U-04, U-05, Q-02, N-02'),
  );


  return c;
};
