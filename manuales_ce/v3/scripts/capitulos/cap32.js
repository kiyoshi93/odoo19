// Manual v3, capítulo 32 (nuevo): el SENATI (lote 66, O-192). Cifras del caso EMPRESA_INDUSTRIA
// («SOLSE Demo Industria S.A.C.»), medidas en contable19 el 09/11/2026.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  a(
    h1('32. SENATI'),
    p('La contribución al **SENATI** (Ley 26272) la pagan las empresas de la **actividad industrial** (CIIU, sección D) y, por su personal de **instalación, reparación y mantenimiento**, las de otras actividades (arts. 11 y 12). Es el **0,75 %** de las remuneraciones del mes (`SENATI_001`), a cargo del empleador: no descuenta nada al trabajador y no cambia su neto. Se declara en el PLAME.'),
    nota('Caso **EMPRESA_INDUSTRIA** («SOLSE Demo Industria S.A.C.», compañía de laboratorio marcada «Afecta a SENATI»): un obrero semanal (I1), un obrero sindicalizado (I2), una administrativa con tardanza (I3) y el vendedor de la tienda de la fábrica (I4).', 'caso'),

    h2('32.1 Configuración'),
    tabla(['Dónde', 'Campo', 'Para qué'], [
      ['Ajustes › Empresas › la compañía, pestaña «Información general»', '**Afecta a SENATI**', 'Enciende la contribución del 0,75 % en las boletas de la compañía'],
      ['Compañía', '**Con 20 trabajadores o menos: SENATI**', '«Avisar» (por defecto) o «Aportar sin aviso (voluntario)». Solo se ve con «Afecta a SENATI»'],
      ['Versión del contrato', '**Fuera de la base del SENATI**', 'Para el personal que **no** está en la actividad industrial ni en instalación, reparación o mantenimiento, como el vendedor de la tienda de la fábrica (art. 11): su boleta no lleva la contribución y no cuenta para el umbral'],
    ], [2600, 2900, 4138]),
    ...figura('c32_01_compania_senati', 'Compañía SOLSE Demo Industria: «Afecta a SENATI» y «Con 20 trabajadores o menos: SENATI» = Avisar.'),
    ...figura('c32_02_contrato_fuera_senati', 'Contrato de I4, vendedor de la tienda de la fábrica, con «Fuera de la base del SENATI» marcado.'),

    h2('32.2 Lo que calcula la boleta'),
    p('La base es la remuneración afecta del mes, después de las tardanzas y los días no pagados. **Caso EMPRESA_INDUSTRIA, junio de 2026:**'),
    tabla(['Trabajador', 'Boleta', 'Base', 'SENATI_001'], [
      ['I1, obrero semanal', 'Semanal del 01 al 07/06/2026', '350,00', '**2,63**'],
      ['I2, obrero sindicalizado, 2 000', 'Mensual (cuota sindical 20,00)', '2 000,00', '**15,00**'],
      ['I3, administrativa, 2 500, 30 minutos de tardanza', 'Mensual (tardanza 5,21)', '2 494,79', '**18,71**'],
      ['I4, vendedor de la tienda, «Fuera de la base»', 'Mensual', '—', '**0,00** (no lleva la línea)'],
    ], [3500, 2700, 1500, 1938]),
    ...figura('c32_03_boleta_senati_i3', 'Boleta de junio de 2026 de I3: remuneración 2 500,00, tardanza 5,21 y SENATI 18,71 (0,75 % de 2 494,79).'),

    h2('32.3 El umbral de los 20 trabajadores'),
    p('La contribución **obliga solo a la empresa que tuvo más de 20 trabajadores en promedio el año anterior** en esas actividades; con 20 o menos es voluntaria (art. 13). La boleta cuenta, en cada mes del año anterior, el mayor número de personas con contrato vigente a la vez (sin las de «Fuera de la base del SENATI»), suma los 12 meses y divide entre 12, como en el umbral de utilidades (capítulo 20).'),
    vinetas([
      'Con 20 o menos, y la opción en «Avisar», la boleta muestra el aviso **«senati»** (no bloquea y no deja de calcular): «La compañía está marcada «Afecta a SENATI», pero en 2025 tuvo N trabajadores en promedio … con 20 o menos es voluntaria. Si no aporta voluntariamente, desmarque «Afecta a SENATI»; si aporta, elija «Aportar sin aviso»…».',
      'En EMPRESA_INDUSTRIA el aviso dice que en 2025 tuvo **3,00** trabajadores en promedio (sus tres contratos dentro de la base, todo el año ÷ 12; el vendedor de la tienda no cuenta).',
      'Si al año anterior le faltan contratos en algún mes, el aviso no da el número y pide verificarlo con la planilla.',
      'Si el contrato tiene «Fuera de la base del SENATI» pero la boleta igual lleva `SENATI_001`, la estructura usa una copia de la regla anterior al lote 66: avisa **«senati_copia»**.',
    ]),
    ...figura('c32_04_aviso_senati', 'Aviso «senati» en una boleta nueva de julio de 2026 de I3 (sin guardar): en 2025 la compañía tuvo 3,00 trabajadores en promedio; con 20 o menos la contribución es voluntaria.'),
    nota('Se documentan con el valor de hoy (la contadora puede cambiar la opción): A-5.1, el personal administrativo común de una empresa industrial con otra actividad **entra** en la base salvo que se marque «Fuera de la base»; A-5.2, en el primer año de la empresa la boleta **avisa** y sigue calculando; A-5.3, el promedio se cuenta como en utilidades, con redondeo.', 'nota'),
    pieCapitulo(['ce', 'ce_demo'], 'O-192 (lote 66)'),
  );

  return c;
};
