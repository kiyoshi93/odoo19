// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Cifras y pantallas medidas en contable19 el 2026-10-22.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 7
  a(
    h1('7. Contabilidad de nómina'),
    p('Cada regla salarial lleva su cuenta al debe y al haber **por compañía**. El **Mapeo contable PCGE** define los prefijos y el inicializador asigna la primera cuenta del plan que empieza con ese prefijo. El asistente **Asignar cuentas contables** vuelve a aplicar el mapeo a la compañía elegida y crea el diario Planillas si falta.'),
    ...figura('c07_01_mapeo_pcge', 'Mapeo contable PCGE: 45 reglas con su prefijo de débito y de crédito. Cada fila se nombra «RB_001 → 6211 / 4111» (U-05).'),
    tabla(['Concepto', 'Regla', 'Debe', 'Haber'], [
      ['Remuneración básica, asignación familiar, horas extra, nocturnidad', 'RB_001, ASF_001, HE25_001, HE35_001, BNOC_001', '6211', '4111'],
      ['Remuneración vacacional', 'VAC_001', '6215', '4115'],
      ['Gratificación y bonificación extraordinaria', 'GRATI_001, BONO_GRATI_001', '6214', '4114'],
      ['CTS del periodo', 'CTS_001', '6291', '4151'],
      ['Subsidios (incapacidad y maternidad)', 'SUB_INC_001, SUB_MAT_001', '1629', '4111'],
      ['Adelanto de remuneración', 'ADEL_001', '1411', '4111'],
      ['Movilidad de libre disposición', 'MOV_001', '6220', '4111'],
      ['Participación en las utilidades', 'UTIL_001', '6221', '4111'],
      ['Prima de Vida Ley', 'VIDA_001', '6274', '4699'],
      ['SIS de la microempresa', 'SIS_MICRO_001', '6271', '4039'],
    ], [3600, 3000, 1500, 1538]),
    ...figura('c07_02_asignar_cuentas', 'Asistente «Asignar cuentas contables»: se elige la compañía.'),
    h2('7.1 Diario de planillas'),
    p('La boleta toma el diario en este orden (C-06): el del contrato → el valor por defecto del usuario → el de la estructura → **Planillas (PLLA)** de la compañía. El lote nace con PLLA. En la práctica, una boleta nueva se asienta en PLLA sin tocar nada (en el v1 caía en «Operaciones varias»).'),
    ...figura('c07_03_diario_planillas', 'Diario Planillas (PLLA), tipo misceláneo, cuenta predeterminada 4111000.'),
    h2('7.2 Cuentas cambiadas a mano'),
    p('Si el cliente usa subcuentas, por ejemplo una 4111 por sede, cámbielas en la pestaña **Contabilidad** de la regla. Las actualizaciones **las conservan** (C-21): el inicializador solo asigna la cuenta donde falta o es inválida.'),
    ...figura('c07_04_regla_cuentas', 'Regla RB_001 de la estructura mensual: cuenta deudora 6211000 y acreedora 4111000 en FM SYSTEMS.'),
    nota('La boleta validada genera el asiento en PLLA y cuadra al centavo con la boleta impresa (capítulo 10). Con «Registrar pago» (capítulo 28), el trabajador figura como socio en las líneas de las cuentas 41x y el pago concilia el neto.', 'nota'),
    pieCapitulo(['ce', 'om_account'], 'C-06, C-15, C-21, U-05'),
  );


  return c;
};
