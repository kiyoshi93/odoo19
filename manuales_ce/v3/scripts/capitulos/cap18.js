// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19: feriados de FM SYSTEMS (09/11/2026), caso FERIADOS (lote 18; re-medición del lote 71) y
// criterios de los lotes 24, 31a, 31b y 43.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 18
  a(
    h1('18. Feriados'),
    p('Los feriados nacionales se registran cada año en **Vacaciones › Configuración › Días festivos**, sin recurso (valen para toda la compañía) o con un horario (valen para ese horario). Se cargan de 00:00 a 23:59 en la zona del horario (America/Lima). En FM SYSTEMS están los 16 feriados de 2025 y los 16 de 2026; los de 2027 todavía no (medido el 09/11/2026).'),
    ...figura('c18_01_dias_festivos', 'Días festivos de 2026 de FM SYSTEMS (filtro «Periodo: 2026»).'),
    h2('18.1 Efecto en la boleta y en el PLAME'),
    vinetas([
      'Los feriados **no descuentan**: el feriado es descanso remunerado (D.Leg. 713) y el sueldo mensual no cambia.',
      'Los **días laborados** declarados incluyen los feriados (C-09): diciembre de 2026 completo = 31 días, 0 no laborados.',
      'Las **horas ordinarias del `.jor`** son, por defecto, las efectivamente trabajadas: diciembre de 2026, con 23 días laborables de 8 h y 3 feriados, da **160**. La opción **«Horas ordinarias del .jor»** de la compañía (grupo «PLAME: horas del .jor») tiene «También las de los feriados no trabajados», que da **184** (lote 31a; capítulo 27).',
      'En la conciliación de asistencias, el feriado sin marcas **no es falta** (C-35, capítulo 19).',
      'Por defecto, la remuneración de los feriados va dentro de la básica (0121). La compañía puede declararla aparte (18.2).',
    ]),
    nota('**El turno que termina a las 24:00** (lote 43, O-110): con un turno de 16:00 a 24:00 y el feriado cargado de 00:00 a 23:59, el `.jor` daba 160 h 3 min (y 23 h 57 min de feriados no trabajados). Ahora da **160** y **24**. El de 08:00 a 17:00 no cambia.', 'nota'),

    h2('18.2 Feriados y licencia con goce aparte: 0115 y 0907 (lote 18)'),
    p('En la compañía, pestaña **«Nómina PE - Controles»**, grupo **PLAME**: **«Declarar aparte los feriados (0115) y la licencia con goce (0907)»**. Viene **apagada**: todo va en la remuneración básica (0121), como siempre. Encendida, la mensual y la semanal pagan aparte:'),
    vinetas([
      '**Remuneración de feriados** (FER_001, 0115): los feriados del periodo registrados para la compañía o para el horario del trabajador. Un feriado que cae en una ausencia aprobada no va aquí (en vacaciones lo paga la vacacional; en una licencia va como licencia), salvo en una ausencia de tipo «Tiempo trabajado», como una comisión de servicio, que sí se paga como feriado (lote 43, O-113 b). Los domingos y el descanso semanal siguen en la básica de la mensual.',
      '**Licencia con goce de haber** (LCG_001, 0907): los días de las ausencias cuyo tipo de suspensión (Tabla 21) es una licencia con goce (24, 25, 26, 28, 29 y 31 a 35: sindical, con goce, paternidad, adopción, citaciones, fallecimiento…). El descanso médico, los subsidios, las vacaciones y los días compensados siguen en la básica.',
    ]),
    p('Cada día vale el sueldo de ese día ÷ 30, y la básica resta lo mismo: **el total, los aportes, la renta de 5.ª, la cuota sindical y la planilla no cambian**. Con la básica forzada (RBM_001 o RBS_002 como entrada) no se separa nada. Caso FERIADOS (diciembre de 2026, sueldo 3 000, ONP, feriados del 8, 9 y 25 en su horario):'),
    tabla(['Caso FERIADOS', 'Básica', 'Feriados (0115)', 'Licencia (0907)', 'Otros', 'Total'], [
      ['70001901, licencia con goce el 14 y 15', '2 500,00', '300,00', '200,00', '—', '3 000,00'],
      ['70001902, trabajó 8 horas el 08/12', '2 700,00', '300,00', '—', 'TFER_001 200,00', '3 200,00'],
      ['70001903, obrero, semana del 7 al 13', '500,00', '200,00', '—', '—', '700,00'],
      ['70001904, paternidad del 22 al 26 (con el 25)', '2 300,00', '200,00', '500,00', '—', '3 000,00'],
    ], [3000, 1200, 1300, 1300, 1600, 1238]),
    ...figura('c18_03_feriados_aparte', 'Caso FERIADOS, 70001902, diciembre de 2026: Remuneración de feriados 300,00, Remuneración básica 2 700,00 y Trabajo en feriado o día de descanso 200,00; total 3 200,00 y neto 2 784,00.'),
    nota('Caso FERIADOS (63 celdas), releído el 09/11/2026: las cuatro boletas validadas con estas cifras; `.rem` de 70001901: 0121 2 500,00, 0115 300,00 y 0907 200,00. La compañía del laboratorio tiene la opción encendida; los feriados del caso están solo en su horario, para que ningún otro caso los vea. Declararlos aparte es «valor por defecto apagado» (P-68).', 'caso'),
    p('Si un feriado del periodo no empieza a las 00:00 en la zona del horario (por ejemplo, cargado en UTC: en Lima empieza a las 19:00 del día anterior), la boleta avisa («feriado_hora»). Corríjalo en Días festivos: mientras tanto, ese día puede no separarse.'),

    h2('18.3 Trabajo en un feriado o en el día de descanso (lotes 18, 24 y 31a)'),
    p('Las horas trabajadas en un feriado o en el día de descanso semanal **sin descanso sustitutorio** se ingresan en la entrada **TFER_001** (con asistencias, también salen de las marcas: capítulo 19). La regla TFER_001 (0107) paga **horas × valor hora × (1 + sobretasa)**, con el parámetro `pe_feriado_sobretasa` = 1,0 (100 %; D.Leg. 713, arts. 3 y 9). El feriado sigue pagado en la básica (o en el 0115). En 70001902: 8 h × 12,50 × 2 = **200,00**.'),
    vinetas([
      '**El valor hora** es sueldo ÷ 30 ÷ las horas diarias de la jornada del trabajador (lote 24; capítulo 10): 4 horas en un feriado con sueldo 3 000 pagan 100,00 con jornada de 8 h, 83,33 con 48 h en 5 días y 200,00 a tiempo parcial de 4 h.',
      '**Es una variable regular** para la gratificación, la CTS y las vacaciones (C-41), y entra **siempre** en el promedio del subsidio (opción «Trabajo en feriado en el promedio del subsidio» = «Siempre»; lote 24; «criterio según la norma, pendiente de confirmación (P-90)»).',
      '**En el `.jor`**, sus horas van por defecto a las horas ordinarias trabajadas (no son sobretiempo: D.S. 007-2002-TR, art. 10): 8 h trabajadas el 08/12 dan **168**. La opción «Horas trabajadas en un feriado o día de descanso (.jor)» tiene «Al sobretiempo» y «No se declaran» (lote 31a). Con «También las de los feriados no trabajados», no se cuentan dos veces.',
      'Todas las horas del feriado van al 0107 con el 100 %, también las que pasan la jornada: «criterio según la norma, pendiente de confirmación (P-86)».',
    ]),
    p('Si la estructura de la boleta no tiene la regla TFER_001 (una copia propia anterior al lote 18), la boleta avisa que esas horas no se pagan («trabajo_en_feriado»): copie la regla de la estructura base.'),

    h2('18.4 La semanal: el dominical y los feriados en el 0115 (lotes 31b y 43)'),
    p('El 0115 de la Tabla 22 es «Remuneración día de descanso y feriados (incluida la del 1° de mayo)». En el `.rem` del PLAME, la parte de la básica de la semanal (RBS_002) que paga el **descanso semanal obligatorio** (el dominical) y los feriados va al **0115**, y el resto al 0121. La boleta, el asiento y el total no cambian. La opción **«Dominical y feriados de la semanal (PLAME)»** (grupo «Descanso semanal y 1 de mayo») viene en «Aparte, en el 0115»; «En la remuneración básica (0121)» es lo de antes del lote 31b. Con los criterios del lote 31b:'),
    tabla(['Semanal a 70,00 diarios', 'Antes', 'Ahora'], [
      ['Semana del 02 al 08/11/2026', '0121 490,00', '0115 70,00 y 0121 420,00'],
      ['La misma con dos feriados', '0121 490,00', '0115 210,00 y 0121 280,00'],
    ], [3800, 2400, 3438]),
    vinetas([
      'No cuentan los días que caen en una ausencia aprobada (vacaciones, descanso médico, licencia). Una comisión de servicio o una ausencia de medio día no los quitan.',
      'Con «Declarar aparte los feriados» encendida, los feriados ya van con FER_001: aquí solo el dominical. La mensual sigue con todo en el 0121.',
      '**El dominical queda guardado al validar la semanal** (lote 43, O-111): una ausencia aprobada después no cambia el PLAME de un mes ya presentado. La actualización guardó el de las 18 semanales validadas del laboratorio.',
      'Si el horario trabaja los 7 días, no se sabe cuál es el descanso: la boleta avisa («sin_descanso_semanal») y el PLAME no separa su dominical.',
    ]),
    nota('El dominical proporcional a los días trabajados (D.Leg. 713, art. 4) sigue pendiente: una falta injustificada no lo descuenta (O-112; capítulo 33). Que el 0115 tenga las afectaciones del 0121 no se pudo confirmar en el Anexo 2 de la Tabla 22.', 'limite'),

    h2('18.5 El 1 de mayo en el día de descanso semanal (lote 31b)'),
    p('Si el Día del Trabajo coincide con el descanso semanal obligatorio, se paga **un día de remuneración** por el feriado, aparte del pago del descanso (D.S. 012-92-TR, art. 9). La regla **FMAY_001 «Día del Trabajo en el descanso semanal»** (0115), en la mensual y la semanal, vale el sueldo ÷ 30 más, si la boleta paga la asignación familiar, la asignación ÷ 30. Para la renta de 5.ª es ingreso extraordinario: no se proyecta.'),
    tabla(['Situación (criterios del lote 31b)', 'Antes', 'Ahora'], [
      ['1 de mayo de 2026 (viernes), horario que descansa los viernes, sueldo 3 000', 'nada', 'FMAY_001 **100,00** (0115)'],
      ['Ídem con asignación familiar', 'nada', '**103,77**'],
      ['1 de mayo de 2027 (sábado) con jornada de lunes a viernes', 'nada', 'nada (100,00 con la opción del día libre)'],
    ], [5400, 1400, 2838]),
    vinetas([
      'El descanso obligatorio es el domingo si el horario no lo trabaja; si lo trabaja, el primer día libre. El sábado libre de una jornada de lunes a viernes no lo es.',
      'Opciones (grupo «Descanso semanal y 1 de mayo»): **«1 de mayo en el día de descanso semanal»**: «Pagar un día adicional» (por defecto), «Pagarlo también si cae en un día libre del horario» o «No pagarlo»; y **«Pagar el 1 de mayo también en una ausencia»** (apagada; nunca en una suspensión perfecta ni con subsidio).',
      'Con otros conceptos fijos (la alimentación) o a destajo, el importe se registra con la entrada FMAY_001: el destajero cobra con el promedio de los 30 días previos (art. 10), y el módulo no lo calcula.',
      'Si la estructura se copió antes del lote y no tiene la regla, la boleta avisa («primero_mayo_sin_regla»).',
    ]),
    ...figura('c18_04_opciones_feriados', 'Ficha de la compañía, pestaña «Nómina PE - Controles»: los grupos «Valor hora y feriados», «PLAME: horas del .jor» y «Descanso semanal y 1 de mayo» con sus valores por defecto, y «Declarar aparte los feriados (0115) y la licencia con goce (0907)» en el grupo PLAME.'),

    h2('18.6 Aviso de feriados del año sin cargar'),
    p('Si no hay ningún feriado registrado en el año de la boleta, la banda de avisos lo dice (V-05): «Faltan los días festivos de 2026: no hay ninguno registrado y las boletas de ese año no tendrán la línea de feriados en los días trabajados. Regístrelos en Vacaciones › Configuración › Días festivos.» Sin ellos, las horas, la asistencia, el 0115 y el 1 de mayo salen mal.'),
    ...figura('c18_02_banda_sin_feriados', 'Compañía de laboratorio sin feriados de 2026: «Faltan los días festivos de 2026…» arriba de la lista de boletas.'),
    nota('Cargue los feriados del año siguiente en diciembre (FM SYSTEMS no tiene todavía los de 2027). Los feriados de otro horario o de otra compañía no cuentan para el trabajador. Un feriado que solo existe como ausencia del trabajador (hoja con recurso) lo reconoce la conciliación de asistencias, pero no va al 0115.', 'implementador'),
    pieCapitulo(['base', 'ce', 'ce_demo'], 'C-09, C-24, V-05, C-43 y N-11 (18), C-47 y P-90 (24), P-31 y P-87 (31a), P-85 y P-88 (31b), O-110, O-111 y O-113 (43)'),
  );


  return c;
};
