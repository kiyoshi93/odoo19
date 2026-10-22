// Manual v2, capítulo 19 (asistencias). Va en el bloque 4 porque espera la validación del lote 12 (C-35),
// pero se inserta entre el 18 y el 20. Medido en contable19 el 2026-10-22, con el lote 12 validado.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  a(
    h1('19. Asistencias: tardanzas, faltas y feriados'),
    p('`solse_pe_payroll_asistencia` concilia las marcaciones de **Asistencias** (entrada y salida) con el horario de trabajo del contrato y lleva a la boleta las tardanzas, las faltas y las medias jornadas. Es opcional: sin el módulo, las novedades se registran a mano como entradas o ausencias.'),
    h2('19.1 Configuración'),
    p('En **Ajustes de la compañía › Nómina PE - Asistencias**:'),
    tabla(['Opción', 'Para qué', 'FM SYSTEMS'], [
      ['Tolerancia de tardanza (minutos)', 'Minutos de gracia sobre la hora de entrada antes de contar tardanza', '10'],
      ['Descontar tardanzas en la boleta', 'Si está apagado, el resumen muestra las tardanzas pero no se descuentan', 'Sí'],
      ['Conciliar asistencias al calcular la boleta', '«Calcular hoja» concilia sola, sin pulsar «Cargar asistencias»', 'No'],
      ['Evaluar horas trabajadas por día (fase 2)', 'Además de las faltas de día completo, descuenta las horas que faltan (salidas tempranas, medias jornadas)', 'No'],
      ['Margen de horas por día', 'Las horas faltantes iguales o menores al margen se ignoran (ruido de marcación); 0,25 = 15 minutos', '0,25'],
    ], [3200, 4900, 1538]),
    ...figura('c19_01_ajustes_asistencias', 'Nómina PE - Asistencias de FM SYSTEMS: tolerancia 10 minutos, descontar tardanzas, conciliación manual.'),
    nota('El horario de trabajo (calendario) debe estar en la zona **America/Lima**: la conciliación ubica las marcaciones en la zona del calendario. Con el calendario en UTC (lo que crea una base nueva si el administrador no tiene zona), las tardanzas salen desplazadas 5 horas (O-62). Los calendarios de FM SYSTEMS y de SOLSE Demo están en America/Lima.', 'importante'),
    ...figura('c19_08_calendario_zona_horaria', 'Horario de trabajo con la zona horaria America/Lima y su jornada de 8:00 a 17:00 con una hora de descanso.'),
    h2('19.2 Conciliar las asistencias'),
    pasos([
      'Registre las marcaciones en **Asistencias** (reloj, quiosco o a mano).',
      'Cree la boleta del mes y pulse **Cargar asistencias** (o **Calcular hoja** si la compañía concilia al calcular).',
      'La pestaña **Asistencias** de la boleta muestra el resumen día por día; las faltas pasan a los días trabajados y las tardanzas a las entradas.',
      'Pulse **Calcular hoja**.',
    ]),
    ...figura('c19_02_jorge_oct_boton', 'Boleta en borrador con el botón «Cargar asistencias».'),
    ...figura('c19_07_checadas_jorge', 'Asistencias de un trabajador del caso ASISTENCIA: horas trabajadas y esperadas por mes.'),
    h3('Qué significa cada marca del resumen'),
    tabla(['Marca', 'Significado'], [
      ['✔', 'Día trabajado completo'],
      ['✔ · tarde N min', 'Llegó tarde: N minutos después de la tolerancia'],
      ['✘ FALTA', 'Día laborable sin marcaciones ni ausencia aprobada: no se paga'],
      ['◐ parcial · faltan N h', 'Media jornada (solo con «Evaluar horas»): la fracción no se paga'],
      ['• justificado', 'Día cubierto por una ausencia aprobada (vacaciones, descanso médico…)'],
      ['◇ feriado', 'Día no laborable del calendario: no es falta ni tardanza (C-35)'],
      ['◇ feriado · marcó N h', 'Trabajó en un feriado: se muestra, pero la sobretasa no se calcula'],
      ['· no laborable N h', 'Medio día no laborable: el día se mide contra la parte laborable'],
    ], [3200, 6438]),
    h2('19.3 Tardanzas'),
    p('Cada llegada tarde descuenta los minutos después de la tolerancia, al valor minuto (sueldo / 240 / 60). La tardanza **reduce la base afecta** de los aportes y de la renta de 5.ª (C-10, capítulo 12).'),
    ...figura('c19_03_carlos_tardanzas_asistencias', 'Caso ASISTENCIA, setiembre de 2026: tres tardanzas de 25 minutos; con 10 de tolerancia cuentan 15 cada una, 45 minutos en total.'),
    ...figura('c19_03_carlos_tardanzas_calculo', 'Cálculo: descuento por tardanzas 10,94 (45 minutos de un sueldo de 3 500).'),
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
    h2('19.5 Feriados (C-35)'),
    p('Desde el lote 12, al conciliar las asistencias, el día que el calendario trae como **no laborable en toda la jornada**, sin solicitud de ausencia, cuenta como **feriado**: no es falta, ni tardanza, ni horas faltantes. Puede ser un feriado de la compañía o del calendario, o un día no laborable cargado para el trabajador. La base es el D.Leg. 713, art. 6: el feriado no laborable es descanso remunerado.'),
    vinetas([
      'Se registra en **Vacaciones › Configuración › Días festivos** (capítulo 18). Sin recurso, vale para toda la compañía o, si se le pone uno, para ese calendario. Con recurso, vale solo para ese trabajador.',
      'Un feriado de otro calendario o de otra compañía **no** justifica.',
      'La línea de totales cuenta los días laborables **sin** los feriados y termina en «· Feriados: N».',
      '**Medio día no laborable** (por ejemplo, la tarde del 24 de diciembre): el día se mide contra la parte laborable y sale «· no laborable N h». Si el trabajador no viene en todo el día, sigue siendo falta, porque debía la mañana.',
    ]),
    ...figura('c19_02_jorge_oct_feriado_asistencias', 'Caso ASISTENCIA, octubre de 2026: «Días laborables evaluados: 21 · Faltas: 0 · Tardanza acumulada: 0 min · Feriados: 1» y «2026-10-08 ◇ feriado» (Combate de Angamos, cargado como día no laborable del trabajador).'),
    ...figura('c19_02_jorge_oct_feriado_calculo', 'Cálculo de octubre: remuneración básica 1 130,00 completa y ninguna línea de falta.'),
    nota('Caso ASISTENCIA (94 celdas, estructura «Feriado»): RB_001 1 130,00, FALTA 0 días, 1 feriado en el resumen, 21 marcaciones de octubre. La hoja de Angamos va en un calendario propio del caso, para que ningún otro caso la vea.', 'caso'),
    nota('No calcula la sobretasa del 100 % por trabajar en un feriado (D.Leg. 713, art. 9): las horas marcadas en el feriado solo se muestran. Con un calendario de dos semanas y evaluación por horas, las horas esperadas de un día normal suman las dos semanas (O-57). Un turno de noche que cruza la medianoche se concilia por día calendario (O-58).', 'limite'),
    pieCapitulo(['asistencia', 'asistencia_demo'], 'C-10, C-29, C-35'),
  );
  return c;
};
