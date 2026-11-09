// Manual v3 (origen: v2), bloque 2: capítulos 10 a 18 y 20 (el proceso del mes). El 19 (asistencias) va en el bloque 4.
// Cifras medidas en contable19 el 2026-10-22: casos del laboratorio (SOLSE Demo) y recorrido de FM SYSTEMS.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 12
  a(
    h1('12. Aportes y retenciones'),
    p('Las cifras de este capítulo son del **caso NOMINA** (planilla de julio de 2026, 525 celdas al 100 %) y del **caso VIDALEY**.'),
    tabla(['Concepto', 'Regla', 'Base y tasa', 'Ejemplo medido'], [
      ['ONP', 'ONP_001', '13 % de la base afecta', 'Jorge, sueldo 1 130: **146,90**'],
      ['AFP aporte', 'AFP_APO_001', '10 %', 'Carlos, base 3 613: **361,30**'],
      ['AFP comisión sobre flujo', 'AFP_COM_001', 'Tasa de su AFP (Habitat 1,47 %)', 'Carlos: **53,11**. Con comisión **mixta**: 0,00 (María)'],
      ['AFP prima de seguro', 'AFP_PRI_001', '1,37 % con tope en la RMA **del mes**', 'Carlos: **49,50**. Ana, sueldo 15 000: **173,62** (topeada en la RMA 12 672,65 de julio–setiembre)'],
      ['EsSalud', 'ESSALUD_001', '9 % con base mínima de la RMV **del mes**', 'Carlos: **325,17**'],
      ['EPS: aporte y crédito', 'EPS_APO_001 / EPS_CRED_001', 'Tasa del plan; crédito contra EsSalud hasta 25 %', 'Carlos: **162,59** y **−81,29**'],
      ['SENATI', 'SENATI_001', '0,75 % (si la compañía está afecta)', 'Carlos: **27,10**'],
      ['SCTR salud', 'SCTR_SAL_001', 'Tasa de la póliza', 'Rosa (semanal): **5,46**'],
      ['Vida Ley (empleador)', 'VIDA_001', 'Tasa de la póliza con tope de la RMA', 'Caso VIDALEY, sueldo 3 000 al 0,53 %: **15,90**'],
      ['SIS de la microempresa', 'SIS_MICRO_001', 'S/ 15 por trabajador', 'Capítulo 24'],
    ], [2100, 2100, 2700, 2738]),
    ...figura('c12_01_carlos_calculo', 'Carlos, julio de 2026 (caso NOMINA): AFP Habitat, EsSalud, EPS con su crédito, SENATI y neto 3 149,09.'),
    ...figura('c12_02_ana_calculo', 'Ana, sueldo 15 000 (caso NOMINA): la prima de seguro AFP se topa en la RMA y sale 173,62; renta de 5.ª 1 267,25 en dos tramos; neto 11 838,63.'),
    h2('12.1 Topes y bases del mes'),
    p('La base mínima de EsSalud (la RMV) y el tope de la prima AFP (la RMA) se aplican **al total del mes**, no a cada boleta (C-26). Cuando en el mes hay mensual y vacacional, la segunda boleta paga lo que falta para llegar al importe del mes.'),
    ...figura('c12_03_nilda_vac_calculo', 'Nilda (caso NOMINA), vacaciones todo julio: la vacacional de 3 000 paga EsSalud 270,00, que es el 9 % del mes. La mensual queda sin importes y no se valida (C-18).'),
    nota('Caso NOMINA: «ESSALUD_001 del mes» de Nilda y de Óscar = **270,00**. Óscar, con 11 días de goce, paga 135,00 en la vacacional y 135,00 en la mensual. Antes de C-26, Nilda pagaba 371,70: 270,00 en la vacacional más 101,70 de base mínima en una mensual en cero.', 'caso'),
    h2('12.2 La tardanza reduce la base'),
    p('El descuento por tardanza (`TARD_001`) es un «Descuento que reduce la base afecta» (C-10): la base de ONP, AFP, EsSalud y renta de 5.ª es el total de ingresos afectos **menos la tardanza**. En el ejemplo del capítulo 20, 45 minutos (7,50) bajan la base de 2 537,00 a 2 529,50.'),
    h2('12.3 Prima de Vida Ley'),
    ...figura('c12_04_vidaley_calculo', 'Caso VIDALEY, junio de 2026: «Seguro Vida Ley (aporte del empleador)» 15,90 con sueldo 3 000 y tasa 0,53 %. El neto no cambia: 2 610,00.'),
    tabla(['Escenario del caso VIDALEY', 'Prima'], [
      ['Tasa 0,53 %, sueldo 3 000', '15,90'],
      ['Sueldo 15 000 (tope de la RMA)', '66,77'],
      ['Importe fijo de la póliza', '25,00 una vez al mes'],
      ['Póliza vencida', 'Sin prima y con aviso'],
      ['Semanal, cuatro semanas', '14,84 en el mes'],
      ['Vacacional de 7 500 y mensual de 15 000', '39,75 en la vacacional; 66,77 en el mes'],
    ], [6000, 3638]),
    p('La prima va al PLAME en el concepto **0803** (informativo) y al asiento en **6274 / 4699**. Las gratificaciones, las utilidades, los subsidios y las vacaciones truncas no son base.'),
    pieCapitulo(['ce'], 'C-10, C-26, C-32, N-05'),
  );


  return c;
};
