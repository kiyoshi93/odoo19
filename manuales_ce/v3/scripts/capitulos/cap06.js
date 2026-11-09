// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Cifras y pantallas medidas en contable19 el 2026-10-22.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 6
  a(
    h1('6. Seguros: EPS, SCTR y Vida Ley'),
    h2('6.1 Planes EPS'),
    p('**Nómina PE › Seguros y EPS › Planes EPS.** Cada plan tiene entidad, código de la Tabla 14, vigencia y las tasas del empleador y del trabajador. La lista y la ficha del trabajador muestran el nombre de la entidad (U-01). La regla `EPS_CRED_001` aplica el crédito contra EsSalud, con tope del 25 % del aporte (parámetro `pe_eps_credito_max`).'),
    ...figura('c06_01_planes_eps', 'Planes EPS: «PACIFICO EPS (DEMO)», con tasa del empleador 4,5 % y del trabajador 2 %, y el plan del caso TREGISTRO con su código T14 «2 · Pacífico S.A. EPS».'),
    h2('6.2 SCTR'),
    p('El SCTR se indica en la ficha del trabajador (pestaña Nómina PE, grupo Salud). Marque **SCTR Pensión** si el trabajador hace una actividad de riesgo (Anexo 5 del D.S. 009-97-SA). Al marcarla aparecen las entidades: **SCTR salud** (EsSalud o EPS) y **SCTR pensión (entidad)** (ONP o compañía de seguros privada). Las dos entidades van al T-Registro. Las tasas son parámetros referenciales que hay que ajustar a la póliza del cliente: 1,30 % salud y 1,70 % pensión.'),
    ...figura('c06_04_sctr_en_la_ficha', 'Trabajador del caso TREGISTRO con «SCTR Pensión» marcada: SCTR salud EsSalud y SCTR pensión con compañía de seguros privada.'),
    h2('6.3 Vida Ley'),
    p('En la versión 2 la prima de Vida Ley **se calcula en la planilla** (N-05). Cada póliza (**Nómina PE › Seguros y EPS › Vida Ley**) tiene:'),
    tabla(['Campo', 'Para qué'], [
      ['Entidad, N.° de póliza y vigencia', 'Identificación. Una póliza vencida no cobra prima y avisa.'],
      ['Tasa (%)', 'Tasa de la póliza en porcentaje, de 0,05 a 5 (0,53 = 0,53 %). «0.0053» se rechaza.'],
      ['Importe por trabajador', 'Alternativa a la tasa: un importe fijo una vez al mes.'],
      ['**Calcular la prima en la planilla**', 'Activa el cálculo. Las pólizas existentes antes de la versión 2 quedan sin marcar: nada cambia hasta que el usuario lo decide.'],
      ['Compañía y Empleados', 'Solo se cobra a los trabajadores de la póliza y de su compañía.'],
    ], [3200, 6438]),
    ...figura('c06_02_polizas_vida_ley', 'Pólizas del caso VIDALEY: por tasa (0,53 %, 6 trabajadores), por importe fijo y vencida.'),
    ...figura('c06_03_poliza_vida_ley', 'Póliza por tasa con «Calcular la prima en la planilla» marcada y sus trabajadores.'),
    p('La regla `VIDA_001` es un aporte del empleador: tasa × remuneración asegurable del mes, con el tope de la RMA, menos lo que ya cargaron las demás boletas del mes. El neto del trabajador no cambia. Va al PLAME en el concepto 0803 y al asiento en 6274 / 4699. Las cifras están en el capítulo 12.'),
    nota('Caso VIDALEY (58 celdas): con tasa 0,53 % y sueldo 3 000, la prima es **15,90**; con sueldo 15 000 se topa en la RMA y es **66,77**.', 'caso'),
    nota('Una sola póliza por trabajador y sin historia de pólizas anteriores. El control «Trabajador sin póliza Vida Ley» de la compañía (capítulo 26) viene en «No controlar» hasta registrar las pólizas.', 'limite'),
    pieCapitulo(['ce', 'ce_demo'], 'U-01, N-05'),
  );


  return c;
};
