// Manual v3, capítulo 24: micro y pequeña empresa (C-25, lote 14, lote 58). Cifras de los casos MICRO (SOLSE Demo
// Servicios), EMPRESA_PEQUENA y EMPRESA_MICRO (sus compañías de laboratorio), medidas en contable19 el 09/11/2026.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  a(
    h1('24. Micro y pequeña empresa'),
    p('La micro y la pequeña empresa inscritas en el **REMYPE** tienen un régimen laboral especial (TUO de la Ley MYPE, D.S. 013-2013-PRODUCE). El régimen se elige en el **contrato** de cada trabajador (régimen laboral de la Tabla 33: «Microempresa» o «Pequeña empresa»): así una compañía puede tener trabajadores del régimen general contratados antes de su acreditación. Las reglas leen los factores del régimen (`pe_regimen_factores`) y las opciones de la compañía.'),
    tabla(['Beneficio', 'Régimen general', 'Pequeña empresa', 'Microempresa'], [
      ['Gratificación (julio y diciembre)', '1 remuneración', '**½ remuneración**', 'no tiene'],
      ['CTS', '1 remuneración por año', '**15 remuneraciones diarias** por año', 'no tiene'],
      ['Vacaciones', '30 días', '**15 días**', '**15 días**'],
      ['Indemnización por despido arbitrario', '1,5 remuneraciones por año (tope 12)', '**20 remuneraciones diarias** por año (tope 120)', '**10 remuneraciones diarias** por año (tope 90)'],
      ['Salud', 'EsSalud 9 %', 'EsSalud 9 %', '**SIS** (S/ 15) o EsSalud, según la compañía'],
      ['Asignación familiar', 'sí', 'según la compañía (por defecto, **no**)', 'según la compañía (por defecto, **no**)'],
      ['Utilidades', 'sí', 'sí', 'según la compañía (por defecto, **excluida**)'],
    ], [2700, 2100, 2500, 2338]),

    h2('24.1 Las opciones de la compañía'),
    p('En **Ajustes de la compañía › Nómina PE - Controles**, grupo **«Micro y pequeña empresa (REMYPE)»**:'),
    tabla(['Opción', 'Por defecto', 'Efecto'], [
      ['**Acreditación en el REMYPE** (fecha)', 'vacía', 'Con fecha, la boleta avisa si un contrato del régimen especial empezó **antes** de la acreditación («mype_remype») o si un trabajador que cesó en el régimen general fue recontratado en el especial **antes de un año** («mype_recontratado»). Avisa, no bloquea'],
      ['Microempresa: régimen de salud', '**SIS** (S/ 15 por trabajador)', 'Con «EsSalud 9 %», la boleta lleva EsSalud'],
      ['Microempresa: asignación familiar', '**No pagar**', 'Con «Pagar», la paga'],
      ['Microempresa: utilidades', '**Excluir del reparto**', 'Lo que la persona trabajó en el régimen general antes de pasar a la micro sí cuenta. Con «Incluir (voluntario)», reparte'],
      ['Pequeña empresa: asignación familiar', '**No pagar** (no es parte del régimen)', 'Con «Pagar (voluntario)», la paga y entra también en la gratificación, la CTS y las vacaciones. Las compañías que ya la pagaban quedaron en «Pagar» al actualizar'],
    ], [3000, 2300, 4338]),
    ...figura('c24_03_compania_remype', 'Grupo «Micro y pequeña empresa (REMYPE)» de la compañía SOLSE Demo Pequeña Empresa, con su fecha de acreditación.'),

    h2('24.2 La microempresa'),
    p('**Caso MICRO** (SOLSE Demo Servicios), junio de 2026, sueldo 1 500: la compañía decide el régimen de salud y la asignación familiar (C-25):'),
    tabla(['Opción de la compañía', 'Por defecto', 'Efecto medido'], [
      ['Microempresa: régimen de salud', '**SIS**', 'Sin EsSalud y `SIS_MICRO_001` **15,00**. Con «EsSalud 9 %»: EsSalud **135,00**'],
      ['Microempresa: asignación familiar', '**No pagar**', 'Con un hijo: asignación familiar **0,00**. Con «Pagar»: **113,00** (RMV de junio de 2026: 1 130)'],
    ], [3000, 2100, 4538]),
    ...figura('c24_01_micro_jun_calculo', 'Trabajador de microempresa, junio de 2026: remuneración 1 500, ONP 195,00, SIS 15,00, SENATI 11,25, sin EsSalud; neto 1 305,00.'),
    p('El SIS se paga en el Banco de la Nación. En el PLAME va como dato informativo con el código **0811** (como el 0803 de Vida Ley); EsSalud (0804) no va al archivo porque lo calcula el PDT. En la planilla semanal, los S/ 15 del mes se reparten entre las semanales que empiezan en el mes: en agosto de 2026, de lunes a domingo, son 5 de 3,00 (lote 14). Si el trabajador tiene su propio **régimen de salud** (Tabla 32) en la ficha, ese manda: 21 = SIS microempresa.'),
    ...figura('c24_02_micro_liquidacion_calculo', 'Liquidación del trabajador de microempresa: vacaciones truncas 687,50 (15 días por año), sin gratificación ni CTS truncas; ONP 89,38; neto 598,12.'),
    p('**Caso EMPRESA_MICRO** («SOLSE Demo Microempresa E.I.R.L.», todo el año en el régimen):'),
    tabla(['Trabajador', 'Concepto', 'Importe'], [
      ['M1, 1 300', 'SIS de junio de 2026', '15,00'],
      ['M1', 'Gratificación de julio', 'sin importe (no se valida)'],
      ['M3, 1 500, despido arbitrario el 30/09/2026', 'Vacaciones truncas', '625,00'],
      ['M3', 'Indemnización: 50 × 10 × 10/12', '416,67'],
      ['M3', 'Neto de la liquidación', '960,42'],
    ], [3800, 3800, 2038]),
    ...figura('c24_04_micro_liquidacion_m3', 'Liquidación de M3 (EMPRESA_MICRO, cese el 30/09/2026): vacaciones truncas 625,00, indemnización 416,67 (10 remuneraciones diarias por año), ONP 81,25 y neto 960,42.'),
    nota('La CTS y la gratificación del trabajador de microempresa salen sin importes y no se validan: la localización avisa y ofrece eliminarlas (capítulo 10). Las utilidades de la micro no se reparten por defecto, y el asistente dice por qué (capítulo 20).', 'nota'),

    h2('24.3 La pequeña empresa'),
    p('**Caso EMPRESA_PEQUENA** («SOLSE Demo Pequeña Empresa S.A.C.», acreditada en el REMYPE el 15/01/2025):'),
    tabla(['Trabajador', 'Concepto', 'Cálculo', 'Importe'], [
      ['P1, 2 400', 'Gratificación de julio de 2026', '2 400 × ½', '**1 200,00**'],
      ['P1', 'Bonificación extraordinaria', '9 % de 1 200', '108,00'],
      ['P1', 'CTS de mayo de 2026', '(2 400 + 1 200 ÷ 6) ÷ 4: 15 remuneraciones diarias por semestre', '**650,00**'],
      ['P3, 1 800, despido arbitrario el 15/10/2026', 'Vacaciones truncas', '15 días por año', '862,50'],
      ['P3', 'Gratificación trunca', '½ remuneración, proporcional', '450,00'],
      ['P3', 'Bonificación de la trunca', '9 %', '40,50'],
      ['P3', 'CTS trunca', '15 remuneraciones diarias por año, proporcional', '446,88'],
      ['P3', 'Indemnización', '60 × 20 × 11/12', '**1 100,00**'],
      ['P3', 'Neto de la liquidación', '', '2 787,75'],
      ['P6, régimen general en la misma compañía', 'CTS de mayo de 2026', 'Régimen general', '1 166,67'],
    ], [2900, 2300, 3100, 1338]),
    ...figura('c24_05_pequena_grati_p1', 'Gratificación de julio de 2026 de P1 (EMPRESA_PEQUENA): media remuneración 1 200,00 y bonificación extraordinaria 108,00.'),
    ...figura('c24_06_pequena_liquidacion_p3', 'Liquidación de P3 (EMPRESA_PEQUENA, despido el 15/10/2026): truncas de la pequeña empresa e indemnización de 20 remuneraciones diarias por año, 1 100,00; neto 2 787,75.'),
    p('Los avisos del REMYPE se ven con dos trabajadores del caso: **P4**, cuyo contrato empezó el 01/06/2024, antes de la acreditación («mype_remype»), y **P5**, recontratada en el régimen especial antes de un año de su cese en el general («mype_recontratado»).'),
    ...figura('c24_07_aviso_remype', 'Aviso «mype_remype» en una boleta nueva de P4: su contrato empezó antes de la acreditación de la compañía en el REMYPE.'),

    h2('24.4 La sobretasa nocturna'),
    p('En la micro y la pequeña empresa no corresponde la sobretasa del 35 % de la remuneración mínima si la jornada es **habitualmente nocturna** (TUO, arts. 53 y 62). La boleta lo **avisa**, pero no la quita: decide el usuario.'),

    h2('24.5 Lo pendiente'),
    vinetas([
      '**Tope de la CTS de la pequeña empresa** (90 remuneraciones diarias): todavía **no se aplica** (O-178). Si es un tope acumulado o por periodo es pregunta de la contadora: **criterio según la norma, pendiente de confirmación (P-159)**. Ver el capítulo 33.',
      'Con valor por defecto: la asignación familiar de la pequeña empresa en «No pagar» para las compañías nuevas (P-158) y la microempresa fuera del reparto de utilidades (P-160).',
    ]),
    nota('Caso MICRO (83 celdas), EMPRESA_MICRO (104 celdas) y EMPRESA_PEQUENA (217 celdas), todos al 100 %.', 'caso'),
    pieCapitulo(['ce', 'ce_demo'], 'C-25, C-18, C-39 (lote 14), O-177 a O-181 (lote 58)'),
  );

  return c;
};
