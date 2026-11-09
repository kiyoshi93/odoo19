// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Cifras y pantallas medidas en contable19 el 2026-10-22.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 4
  a(
    h1('4. Parámetros legales con vigencia'),
    p('Los valores normativos no están escritos en las reglas: viven en **Nómina › Nómina PE › Parámetros de Nómina PE**, cada uno con su lista de **vigencias**. La boleta usa el valor vigente a su **fecha final**. Los parámetros se agrupan por categoría.'),
    ...figura('c04_01_parametros_lista', 'Los 25 parámetros agrupados por categoría, con su valor vigente a hoy.'),
    tabla(['Código', 'Concepto', 'Vigencias en la base'], [
      ['`pe_uit`', 'UIT', '5 350 (01/01/2025) · 5 500 (01/01/2026)'],
      ['`pe_rmv`', 'Remuneración mínima vital', '1 130 (01/01/2025) · **1 230 (01/10/2026, D.S. 015-2026-TR)**'],
      ['`pe_asig_familiar`', 'Asignación familiar (10 % de la RMV)', '113 (01/01/2025) · **123 (01/10/2026)**'],
      ['`pe_onp_tasa`', 'ONP', '13 %'],
      ['`pe_afp_aporte` / `pe_afp_prima_seguro`', 'Fondo AFP / prima de seguro', '10 % / 1,37 %'],
      ['`pe_afp_comision_flujo`', 'Comisión sobre flujo por AFP', 'Habitat 1,47 %, Integra 1,55 %, Prima 1,60 %, Profuturo 1,69 % (01/01/2025 y 01/01/2026)'],
      ['`pe_afp_rma`', 'Remuneración máxima asegurable (trimestral, SBS)', '12 184,88 · 12 137,47 · 12 184,88 · 12 178,56 (trimestres de 2025) · 12 209,11 · 12 598,91 · 12 672,65 · **12 732,70** (trimestres de 2026)'],
      ['`pe_essalud_tasa` / `pe_eps_credito_max`', 'EsSalud / tope del crédito EPS', '9 % / 25 %'],
      ['`pe_sctr_salud_tasa` / `pe_sctr_pension_tasa`', 'SCTR (referenciales, ajustar por cliente)', '1,30 % / 1,70 %'],
      ['`pe_sis_microempresa`', 'SIS de la microempresa por trabajador', 'S/ 15 al mes (capítulo 24)'],
      ['`pe_renta5_deduccion_uit` / `pe_renta5_tramos`', 'Renta de 5.ª', '7 UIT; 8 %, 14 %, 17 %, 20 % y 30 % (hasta 5, 20, 35, 45 UIT y el exceso)'],
      ['`pe_grati_bono_essalud` / `pe_grati_bono_eps`', 'Bonificación extraordinaria (Ley 30334)', '9 % / 6,75 %'],
      ['`pe_regimen_factores`', 'Factores por régimen laboral', 'general 1,0 / 30 / 30; pequeña 0,5 / 15 / 15; micro (gratificación, días de CTS, días de vacaciones)'],
      ['`pe_hhee_recargo_1` / `_2`', 'Horas extra', '25 % / 35 %'],
      ['`pe_nocturna_sobretasa`', 'Sobretasa nocturna sobre la RMV', '35 %'],
      ['`pe_senati_tasa` / `pe_cuota_sindical`', 'SENATI / cuota sindical', '0,75 % / 1 %'],
    ], [3200, 2900, 3538]),
    nota('Las vigencias de 2025 (comisión AFP y las 8 RMA trimestrales de 2025–2026) y la RMV 1 230 / AF 123 de octubre de 2026 **ya vienen en el módulo** (C-02). En el v1 se cargaban a mano y la nómina de 2025 no se podía calcular. Una actualización que encuentra una vigencia cargada a mano en la misma fecha la adopta y avisa en el log si el valor difiere. La comisión de enero a julio de 2025 repite la de 2026: contrástela con el histórico de la SBS si recalcula ese periodo.', 'importante'),
    ...figura('c04_02_parametro_rmv', 'RMV con sus dos vigencias: 1 130 desde el 01/01/2025 y 1 230 desde el 01/10/2026.'),
    ...figura('c04_03_parametro_rma', 'RMA: una vigencia por trimestre de 2025 y 2026.'),
    h2('4.1 Registrar una vigencia nueva con el editor'),
    p('Las tasas, comisiones, tramos y factores ya no se escriben como texto: el parámetro tiene el botón **Nueva vigencia** y cada vigencia el botón **Editar en tabla** (U-08).'),
    pasos([
      'Abra el parámetro, por ejemplo **AFP - Comisión sobre flujo por administradora**.',
      'Pulse **Nueva vigencia**. El diálogo parte de la vigencia que rige hoy y muestra una fila por AFP.',
      'Escriba **Vigente desde** y las tasas **en porcentaje**: `1.47` para 1,47 %. Abajo se ve el texto que se guardará.',
      'Pulse **Guardar vigencia**. Las anteriores se conservan: el recálculo de un periodo pasado sigue usando la suya.',
    ]),
    ...figura('c04_04_parametro_comision_afp', 'Parámetro de comisión AFP: botón «Nueva vigencia» y, en cada vigencia, «Editar en tabla».'),
    ...figura('c04_05_nueva_vigencia_comision_afp', 'Nueva vigencia: una fila por AFP con su tasa en porcentaje y el texto que se guardará. (Pantalla de muestra: se canceló sin guardar.)'),
    p('Para los tramos de la renta de 5.ª, **Editar en tabla** muestra una fila por tramo («Hasta (UIT)» y «Tasa (%)»). Las filas se agregan, se quitan y se ordenan; el último tramo no tiene tope y se deja en 0.'),
    ...figura('c04_06_editar_tramos_en_tabla', 'Tramos de la renta de 5.ª en tabla: 5, 20, 35 y 45 UIT, y el último sin tope. (Pantalla de muestra: se canceló.)'),
    nota('El editor no abre ni redondea una vigencia que no puede mostrar tal cual, por ejemplo una con más decimales que su columna. En ese caso, use el texto.', 'nota'),
    h2('4.2 Validación al guardar'),
    p('Cada parámetro tiene un **Tipo de valor** (monto, tasa, comisión por AFP, tramos de renta, factores por régimen) y el valor se comprueba al guardar (V-01): números con punto decimal y sin separador de miles, tasas en fracción (0.13 = 13 %) y, en diccionarios y tramos, todas las claves que leen las reglas. Un valor mal escrito ya no llega a las boletas.'),
    ...figura('c04_07_valor_rechazado', 'Escribir «1,230» en la RMV se rechaza: «Use punto decimal y sin separador de miles: «1,230» se leería como (1, 230)». (Se descartó.)'),
    h2('4.3 Avisos de vigencias'),
    p('Dos avisos impiden calcular con un parámetro atrasado:'),
    vinetas([
      '**Banda amarilla de RMA, UIT y feriados** (V-03, V-05), arriba de las listas de boletas y lotes y en el formulario de la boleta y del lote en borrador. Aparece cuando la RMA vigente a la fecha tiene más de 95 días o falta, cuando la UIT vigente es de un año anterior o cuando no hay ningún feriado registrado en el año. Con todo al día no hay banda: hoy, en FM SYSTEMS, no aparece.',
      '**Vigencia faltante** (V-02): si una regla pide un parámetro sin vigencia a la fecha, la boleta no calcula y el mensaje lo dice en lenguaje funcional: «Falta registrar «AFP - Comisión sobre flujo por administradora» (pe_afp_comision_flujo) vigente al 31/07/2026. Regístrelo en Nómina › Nómina PE › Parámetros de Nómina PE. Boleta: …, regla AFP - Comisión (AFP_COM_001)». Si la fecha es anterior a la primera vigencia, también lo dice.',
    ]),
    ...figura('c04_08_boleta_2027_alertas_rma_uit', 'Boleta de enero de 2027 en borrador (no se guardó): la banda avisa que la RMA es del 01/10/2026, que faltan los feriados de 2027 y que falta la UIT de 2027, con lo que se usaría la de 2026 (5 500).'),
    nota('Revise los parámetros al inicio de cada trimestre (RMA de la SBS), cada 1 de enero (UIT) y cuando cambie la RMV. La banda le recuerda la RMA y la UIT, pero no la RMV ni las comisiones AFP.', 'implementador'),
    pieCapitulo(['base', 'ce'], 'C-02, U-08, V-01, V-02, V-03'),
  );


  return c;
};
