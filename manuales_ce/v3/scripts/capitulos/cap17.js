// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19 el 2026-10-22: casos del laboratorio (SOLSE Demo) y recorrido de FM SYSTEMS.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 17
  a(
    h1('17. Vacaciones'),
    p('Las vacaciones se devengan como **asignaciones** del tipo **Vacaciones PE (D.Leg. 713)** (2,5 días por mes en el régimen general) y se gozan con una **ausencia** aprobada del mismo tipo.'),
    ...figura('c17_03_asignaciones', 'Asignaciones de FM SYSTEMS: Lucía 52,5 días (21 meses) y Héctor 47,5 días (19 meses).'),
    ...figura('c17_04_ausencias', 'Ausencias aprobadas: Lucía del 2 al 16 de febrero de 2026 (11 días hábiles) y Héctor del 14 al 23 de setiembre de 2026 (8 días hábiles).'),
    h2('17.1 Tipos de ausencia y Tabla 21'),
    p('Cada tipo de ausencia tiene su **Tipo de suspensión (Tabla 21)** (C-09). Con ese código, la boleta descuenta los días declarados y el PLAME los lleva al `.snl`. Por defecto: Vacaciones PE 23, «Sin pagar» 05, Enfermedad 20, Días compensatorios 27 y Maternidad 22.'),
    ...figura('c17_05_tipos_ausencia_tabla21', 'Tipos de ausencia con su código de la Tabla 21.'),
    h2('17.2 Boleta de vacaciones y mensual del mes'),
    p('En el mes de goce se calculan dos boletas: la **vacacional** (estructura VAC) por los días de goce y la **mensual** por el resto. Ejemplo del caso NOMINA: Óscar (sueldo 3 000) goza del 1 al 15 de julio de 2026.'),
    ...figura('c17_06_oscar_vac_jul2026_dias', 'Vacacional de Óscar: «Vacaciones PE» −11 días / −88 h pagada.'),
    ...figura('c17_07_oscar_nme_jul2026_dias', 'Mensual de Óscar: la misma línea de vacaciones, **no pagada** (¿Pagado? sin marcar, C-16).'),
    tabla(['Boleta', 'Remuneración', 'ONP', 'EsSalud', 'Neto'], [
      ['Vacacional (1–15 jul.)', 'VAC_001 1 500,00', '195,00', '135,00', '1 305,00'],
      ['Mensual (16–31 jul.)', 'RB_001 1 500,00', '195,00', '135,00', '1 305,00'],
      ['**Mes**', '**3 000,00**', '**390,00**', '**270,00**', ''],
    ], [2600, 2200, 1400, 1400, 2038]),
    p('En el recorrido de FM, Lucía goza 15 días en febrero de 2026: vacacional **2 306,50** ((4 500 + 113) / 30 × 15) y mensual con remuneración 2 250,00 y asignación familiar 113,00 completa. La asignación familiar del mes de goce parcial va completa en la mensual y proporcional en la vacacional: según la contadora es correcto (C-04, P-19). Total del mes: 4 669,50.'),
    ...figura('c17_01_lucia_vac_feb2026_calculo', 'Lucía, vacacional de febrero de 2026: 2 306,50 con AFP, EsSalud y SENATI; neto 2 008,50.'),
    ...figura('c17_02_lucia_nme_feb2026_calculo', 'Lucía, mensual de febrero de 2026: remuneración 2 250,00, asignación familiar 113,00 y renta de 5.ª del mes de vacaciones 183,73 (C-11).'),
    ...figura('c17_02_lucia_nme_feb2026_dias', 'Mensual de Lucía, febrero de 2026: «Vacaciones PE (D.Leg. 713)» −11 días sin «¿Pagado?» (C-16), igual que la de Óscar.'),
    nota('Un mes **entero** de goce deja la mensual sin importes, porque EsSalud y la prima ya se pagaron en la vacacional (C-26). Esa mensual no se valida: elimínela (C-18). Caso NOMINA: Nilda, 1 al 30 de julio.', 'nota'),
    pieCapitulo(['base', 'ce'], 'C-04, C-09, C-11, C-16, C-26'),
  );


  return c;
};
