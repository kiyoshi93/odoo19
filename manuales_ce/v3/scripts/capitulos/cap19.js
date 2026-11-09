// Manual v3 (origen: v2), capítulo 19 (asistencias). Va en el bloque 4 porque espera la validación del lote 12 (C-35),
// pero se inserta entre el 18 y el 20. Medido en contable19 el 2026-10-22, con el lote 12 validado; caso ASISTENCIA
// re-medido en el lote 71 (100 %, las mismas cifras). Lo nuevo de los lotes 18, 24, 25a y 25b, con sus criterios.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  a(
    h1('19. Asistencias: tardanzas, faltas y feriados'),
    p('`solse_pe_payroll_asistencia` concilia las marcaciones de **Asistencias** (entrada y salida) con el horario de trabajo del contrato y lleva a la boleta las tardanzas, las faltas, las medias jornadas y, si se quiere, el trabajo en feriado. Es opcional: sin el módulo, las novedades se registran a mano como entradas o ausencias.'),
    h2('19.1 Configuración'),
    p('En la ficha de la compañía, pestaña **Nómina PE - Asistencias**:'),
    tabla(['Opción', 'Para qué', 'FM SYSTEMS'], [
      ['Tolerancia de tardanza (minutos)', 'Minutos de gracia sobre la hora de entrada antes de contar tardanza', '10'],
      ['Descontar tardanzas en la boleta', 'Si está apagado, el resumen muestra las tardanzas pero no se descuentan', 'Sí'],
      ['Conciliar asistencias al calcular la boleta', '«Calcular hoja» concilia sola, sin pulsar «Cargar asistencias»', 'No'],
      ['**Pagar el trabajo en feriado desde las asistencias** (lote 18)', 'Las horas marcadas en un feriado van a la entrada FERIADO_TRABAJADO y TFER_001 las paga con el 100 % (19.6)', 'No'],
      ['Evaluar horas trabajadas por día (grupo «Fase 2: evaluación por horas»)', 'Además de las faltas de día completo, descuenta las horas que faltan (salidas tempranas, medias jornadas)', 'No'],
      ['Margen de horas por día', 'Las horas faltantes iguales o menores al margen se ignoran (ruido de marcación); 0,25 = 15 minutos', '0,25'],
    ], [3200, 4900, 1538]),
    ...figura('c19_01_ajustes_asistencias', 'Nómina PE - Asistencias de FM SYSTEMS: tolerancia 10 minutos, descontar tardanzas, conciliación manual y «Pagar el trabajo en feriado desde las asistencias» apagada.'),
    nota('El horario de trabajo (calendario) debe estar en la zona **America/Lima**: la conciliación ubica las marcaciones en la zona del calendario. Con el calendario en UTC (lo que crea una base nueva si el administrador no tiene zona), las tardanzas salen desplazadas 5 horas (O-62). Los calendarios de FM SYSTEMS y de SOLSE Demo están en America/Lima.', 'importante'),
    ...figura('c19_08_calendario_zona_horaria', 'Horario de trabajo con la zona horaria America/Lima y su jornada de 8:00 a 17:00 con una hora de descanso.'),
    p('El horario también da el **«Promedio de horas por día»** con que se valoran las tardanzas, las horas extras y el trabajo en feriado (lote 24; capítulo 10). Revise que sea la jornada real del trabajador: con un horario de 9,6 horas diarias, una hora de tardanza con sueldo 3 000 descuenta 10,42 y no 12,50.'),
    h2('19.2 Conciliar las asistencias'),
    pasos([
      'Registre las marcaciones en **Asistencias** (reloj, quiosco o a mano).',
      'Cree la boleta del mes y pulse **Cargar asistencias** (o **Calcular hoja** si la compañía concilia al calcular).',
      'La pestaña **Asistencias** de la boleta muestra el resumen día por día; las faltas pasan a los días trabajados y las tardanzas a las entradas.',
      'Pulse **Calcular hoja**.',
    ]),
    ...figura('c19_02_jorge_oct_boton', 'Boleta en borrador con el botón «Cargar asistencias».'),
    ...figura('c19_07_checadas_jorge', 'Asistencias de Jorge (caso ASISTENCIA), vista de análisis: 160 horas trabajadas y 160 esperadas en setiembre de 2026, 168 y 168 en octubre.'),
    h3('Qué significa cada marca del resumen'),
    tabla(['Marca', 'Significado'], [
      ['✔', 'Día trabajado completo'],
      ['✔ · tarde N min', 'Llegó tarde: N minutos después de la tolerancia'],
      ['✘ FALTA', 'Día laborable sin marcaciones ni ausencia aprobada: no se paga'],
      ['◐ parcial · faltan N h', 'Media jornada (solo con «Evaluar horas»): la fracción no se paga'],
      ['• justificado', 'Día cubierto por una ausencia aprobada (vacaciones, descanso médico…)'],
      ['◇ feriado', 'Día no laborable del calendario: no es falta ni tardanza (C-35)'],
      ['◇ feriado · marcó N h', 'Trabajó en un feriado: con la opción del lote 18 se paga (19.6); sin ella, la boleta avisa'],
      ['· no laborable N h', 'Medio día no laborable: el día se mide contra la parte laborable'],
    ], [3200, 6438]),
    h2('19.3 Tardanzas'),
    p('Cada llegada tarde descuenta los minutos después de la tolerancia, al **valor minuto: sueldo ÷ 30 ÷ las horas diarias de la jornada ÷ 60** (regla TAR_001; lote 24). Con la jornada de 8 horas es lo mismo que antes (sueldo ÷ 240 ÷ 60). La opción «Valor hora» de la compañía permite volver a «Sueldo ÷ 30 ÷ 8». La tardanza **reduce la base afecta** de los aportes y de la renta de 5.ª (C-10, capítulo 12).'),
    ...figura('c19_03_carlos_tardanzas_asistencias', 'Caso ASISTENCIA, setiembre de 2026: tres tardanzas de 25 minutos; con 10 de tolerancia cuentan 15 cada una, 45 minutos en total.'),
    ...figura('c19_03_carlos_tardanzas_calculo', 'Cálculo de setiembre de Carlos (sueldo 3 500): TAR_001 «Descuento por tardanzas» 10,94 (45 minutos con jornada de 8 horas), base afecta 3 602,06 y neto 3 139,55.'),
    h2('19.4 Faltas y medias jornadas'),
    tabla(['Trabajador (caso ASISTENCIA)', 'Setiembre de 2026', 'Resultado'], [
      ['Jorge (1 130)', '2 faltas (10 y 24)', 'RB **1 054,67** (1 130 − 2 × 1 130 / 30); línea FALTA de 2 días no pagada'],
      ['María (8 000), con «Evaluar horas»', 'Media jornada el 4', 'RB **7 866,67** (8 000 − 0,5 × 8 000 / 30); FALTA_PARCIAL 4 h'],
      ['Óscar (3 000)', '2 faltas y 3 días de vacaciones (21 al 23)', 'RB **2 500,00** (3 000 / 30 × 25); los días de vacaciones salen «justificado»'],
    ], [2800, 2800, 4038]),
    ...figura('c19_04_jorge_set_faltas_asistencias', 'Jorge, setiembre: dos «✘ FALTA».'),
    ...figura('c19_05_maria_parcial_asistencias', 'María, setiembre: «◐ parcial · faltan 4.00 h» el 4.'),
    ...figura('c19_06_oscar_combinado_asistencias', 'Óscar, setiembre: faltas y vacaciones «justificado».'),
    nota('Las faltas solo se cuentan dentro del vínculo: un trabajador que ingresa a mitad de mes no tiene faltas por los días anteriores a su ingreso (C-29).', 'nota'),
    nota('Las faltas de la conciliación se cuentan en **días hábiles** y no son una ausencia de la Tabla 21. Por eso un mes entero sin marcas no llega a «todo el mes sin remuneración» (sigue pagando los días de descanso) y no cuenta para el piso de la básica de los lotes 25a y 25b (capítulo 22). Si la falta debe declararse como suspensión, regístrela como ausencia del tipo 07.', 'limite'),
    h2('19.5 Feriados (C-35)'),
    p('Desde el lote 12, al conciliar las asistencias, el día que el calendario trae como **no laborable en toda la jornada**, sin solicitud de ausencia, cuenta como **feriado**: no es falta, ni tardanza, ni horas faltantes. Puede ser un feriado de la compañía o del calendario, o un día no laborable cargado para el trabajador. La base es el D.Leg. 713, art. 6: el feriado no laborable es descanso remunerado.'),
    vinetas([
      'Se registra en **Vacaciones › Configuración › Días festivos** (capítulo 18). Sin recurso, vale para toda la compañía o, si se le pone uno, para ese calendario. Con recurso, vale solo para ese trabajador.',
      'Un feriado de otro calendario o de otra compañía **no** justifica.',
      'La línea de totales cuenta los días laborables **sin** los feriados y termina en «· Feriados: N».',
      '**Medio día no laborable** (por ejemplo, la tarde del 24 de diciembre): el día se mide contra la parte laborable y sale «· no laborable N h». Si el trabajador no viene en todo el día, sigue siendo falta, porque debía la mañana.',
    ]),
    ...figura('c19_02_jorge_oct_feriado_asistencias', 'Caso ASISTENCIA, octubre de 2026 (boleta en borrador): «Días laborables evaluados: 21 · Faltas: 0 · Tardanza acumulada: 0 min · Feriados: 1» y «2026-10-08 ◇ feriado» (Combate de Angamos, cargado como día no laborable del trabajador). Arriba, el aviso de la RMV: el sueldo de Jorge (1 130,00) es menor que la RMV de octubre (1 230,00).'),
    ...figura('c19_02_jorge_oct_feriado_calculo', 'Cálculo de octubre: remuneración básica 1 130,00 completa y ninguna línea de falta.'),
    nota('Caso ASISTENCIA (94 celdas, estructura «Feriado»), re-medido en el lote 71 al 100 %: RB_001 1 130,00, FALTA 0 días, 1 feriado en el resumen, 21 marcaciones de octubre. La hoja de Angamos va en un calendario propio del caso, para que ningún otro caso la vea.', 'caso'),
    h2('19.6 El trabajo en feriado desde las asistencias (lote 18)'),
    p('La conciliación deja en la pestaña Asistencias de la boleta los feriados en que el trabajador marcó, con las horas. Qué pasa después depende de **«Pagar el trabajo en feriado desde las asistencias»**:'),
    tabla(['Opción', 'Qué hace la boleta', 'Aviso'], [
      ['Apagada (por defecto)', 'No paga nada solo. Si no hubo descanso sustitutorio, ingrese las horas en la entrada TFER_001 (capítulo 18)', '«feriado_trabajado»: «Asistencias: <trabajador> marcó en el feriado <fecha>… ingrese las horas en la entrada TFER_001, o active…»'],
      ['Encendida', 'Escribe las horas en la entrada FERIADO_TRABAJADO, que TFER_001 suma a la entrada manual y paga con el 100 % (0107)', '«feriado_pagado» dice las horas pagadas; si hubo descanso sustitutorio, ponga la entrada en 0 o bórrela: la conciliación respeta el cambio'],
    ], [2200, 4000, 3438]),
    p('Si la boleta tiene horas en TFER_001 y en FERIADO_TRABAJADO a la vez, se suman y la boleta avisa («feriado_doble»): TFER_001 queda para el descanso semanal trabajado o un feriado que las asistencias no ven. Con jornada de 8 horas y sueldo 3 000, 8 horas en un feriado pagan 200,00 (12,50 × 8 × 2), como 70001902 del caso FERIADOS; sus horas van al `.jor` como horas ordinarias trabajadas (capítulo 18).'),
    nota('El descanso semanal trabajado no sale de las asistencias (los días de descanso no se concilian), ni un feriado que cae en un día libre del horario (un sábado de una jornada de lunes a viernes): se ingresan en TFER_001. El descanso sustitutorio no se ve en las marcas. Con un calendario de dos semanas y evaluación por horas, las horas esperadas de un día normal suman las dos semanas (O-57). Un turno de noche que cruza la medianoche se concilia por día calendario (O-58).', 'limite'),
    pieCapitulo(['asistencia', 'asistencia_demo', 'ce'], 'C-10, C-29, C-35, N-11 (18), C-47 (24), O-73 (25a)'),
  );
  return c;
};
