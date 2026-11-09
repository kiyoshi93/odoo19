// Manual v3 (origen: v2), bloque 3: capítulos 21 a 29 (lo nuevo de la versión 2). Medido en contable19 el 2026-10-22:
// casos del laboratorio y escenarios propios en SOLSE Demo (trabajadores 70009xxx, borrados después).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const escenario = 'Escenario armado para este manual en la compañía de laboratorio con trabajadores sintéticos (DNI 70009xxx), borrados después de medir';

  // ------------------------------------------------------------------ 27
  a(
    h1('27. Reportes y archivos legales'),
    p('Todas las salidas legales leen las **boletas validadas** del periodo (las rectificativas restan, capítulo 25) y se generan desde **Nómina › Nómina PE**.'),
    h2('27.1 Planilla de sueldos'),
    p('**Planilla de sueldos**: mes, año y «Incluir nómina semanal (obreros)». **Generar Excel** (o **Imprimir PDF**) produce `Planilla_<año>_<mes>.xlsx`, con una fila por trabajador: remuneración, asignación familiar, horas extra, otros ingresos, ONP, AFP, 5.ª, otros descuentos, neto, EsSalud y otros aportes (SENATI, SIS, Vida Ley).'),
    ...figura('c27_01_planilla_resultado', 'Planilla de noviembre de 2026 generada: Planilla_2026_11.xlsx.'),
    h2('27.2 PLAME (archivos del PDT 601)'),
    p('**PLAME (archivos PDT)** genera el ZIP con el `.rem` (ingresos y descuentos por concepto T22), el `.jor` (jornada), el `.snl` (suspensiones) y, con la casilla, el `.ps4` y el `.4ta` de recibos por honorarios. Las aportaciones (06xx y 08xx) las calcula el PDT y no se exportan, salvo los informativos como 0803 (Vida Ley).'),
    ...figura('c27_02_plame_resultado', 'PLAME de noviembre de 2026 de la compañía de laboratorio, con los escenarios del manual: 15 boletas, 13 trabajadores en el `.rem`, conceptos 0114, 0121, 0201, 0915 y 0916.'),
    tabla(['Archivo', 'Cambio de la versión 2', 'Ejemplo medido'], [
      ['`.rem`', 'Nuevos conceptos: 0915 (maternidad), 0916 (incapacidad), 0501 / 0503 (indemnización), 0928 (devolución de 5.ª), 0803 (Vida Ley). Tipo de documento de la ficha (T3)', '`01|70000801|0916|1000.00|1000.00|`'],
      ['`.jor`', '**6 campos**: ya no lleva «días» (C-24). Horas de la jornada cumplida', '`01|70000901|176|0|0|0|`'],
      ['`.snl`', 'Sale lleno: una línea por trabajador y tipo de suspensión de la Tabla 21 (C-09, N-01)', '`01|70000801|20|20|` · `01|70000801|21|10|`'],
    ], [1300, 5000, 3338]),
    nota('Caso PLAME (121 celdas): `.rem`, `.jor`, `.snl` y el anexo de 4.ª del ZIP de julio de 2026.', 'caso'),
    h2('27.3 AFPnet'),
    p('**AFPnet** genera el Excel de importación al portal (hoja TRABAJADOR) con los afiliados al SPP y su remuneración asegurable del mes. Julio de 2026 en el laboratorio: **6 trabajadores SPP**. Un subsidio con AFP suma a la remuneración asegurable (caso SUBSIDIOS: 3 000,00).'),
    ...figura('c27_03_afpnet_resultado', 'AFPnet de julio de 2026: AFPNET_2026_07.xlsx con 6 trabajadores del SPP.'),
    h2('27.4 Pago masivo a bancos'),
    p('**Pago masivo a bancos** genera el TXT de abono de **haberes** o de **CTS** para BCP (Telecrédito), Interbank o Scotiabank: mes, año, tipo, banco de cargo, cuenta de cargo de la empresa y fecha de pago. El resultado dice cuántos se abonan, el total y quiénes quedan **omitidos** y por qué.'),
    tabla(['Cambio', 'Qué hace ahora', 'Ítem'], [
      ['Banco por código SBS', 'Una cuenta del propio banco sale como abono propio (BCP «2A») y otra como interbancaria («2B», con CCI). El TXT de CTS del BCP ya no sale vacío', 'C-01'],
      ['Omitidos', 'Un trabajador sin cuenta, sin CCI o con CTS en otro banco no bloquea el archivo: queda fuera y se lista. «Modo estricto» vuelve a bloquear', 'C-08'],
      ['ASCII', 'Sin tildes ni Ñ (Ñañez → NANEZ) y con CRLF', 'C-12'],
      ['Scotiabank', 'Formato propio, con el aviso «formato sin validar» con el banco', 'C-13, N-06'],
      ['Totales exactos', 'Sin el sol de menos por redondeo', 'C-19'],
      ['CTS de otro banco', 'Por defecto se omite y se deposita con el archivo de ese banco; opción de abonar por CCI en Interbank', 'C-23'],
    ], [2200, 6000, 1438]),
    ...figura('c27_04_bcp_haberes_resultado', 'BCP haberes de mayo de 2026 (caso BANCOS): 4 abonados por S/ 7 918,00 y 1 omitido (sin cuenta sueldo) por S/ 1 566,00.'),
    ...figura('c27_05_interbank_cts_resultado', 'Interbank CTS de mayo de 2026: 1 abonado por S/ 833,33 y 4 omitidos (CTS en otro banco o sin cuenta CTS) por S/ 2 800,39.'),
    ...figura('c27_06_scotiabank_haberes_resultado', 'Scotiabank haberes: 3 abonados por S/ 6 003,88, 2 omitidos y el aviso «formato sin validar».'),
    nota('Caso BANCOS (407 celdas): cabeceras, registros, montos, omitidos y propiedades de los 6 archivos (BCP, Interbank y Scotiabank, haberes y CTS de mayo de 2026). Los archivos salen con CRLF y en ASCII.', 'caso'),
    nota('El formato de Scotiabank no está validado con la banca por internet del banco y no hay TXT del Banco de la Nación: los bancos entregan el formato al afiliar a la empresa (N-06, capítulo 31). Haga una carga de prueba antes del primer pago real.', 'limite'),
    pieCapitulo(['ce', 'ce_demo', 'plame_demo'], 'C-01, C-08, C-09, C-12, C-13, C-19, C-23, C-24, N-01, N-06'),
  );


  return c;
};
