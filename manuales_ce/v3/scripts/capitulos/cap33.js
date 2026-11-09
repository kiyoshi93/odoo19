// Manual v3 (origen: v2), bloque 4: capítulos 30 a 32 y anexos A a E (el 19 está en cap19.js). Medido el 2026-10-22.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');

  // ------------------------------------------------------------------ 31
  a(
    h1('31. Lo que la localización no cubre'),
    p('Lo que el manual v1 declaraba «no cubierto» (subsidios, T-Registro, indemnización, regularización de 5.ª, Vida Ley y pago de la planilla) ya existe y está en los capítulos 6, 13, 16, 23, 28 y 29. Queda fuera:'),
    tabla(['Tema', 'Estado'], [
      ['TXT del Banco de la Nación y formato oficial de Scotiabank', '**Bloqueado** (N-06): los bancos no publican el formato, lo entregan al afiliar a la empresa. Scotiabank sale con un formato propio y el aviso «sin validar»'],
      ['T-Registro: pensionistas, personal en formación, personal de terceros y domicilio 2', 'No cubierto'],
      ['T-Registro: borrar valores (el CUSPP al volver a la ONP, una situación especial) y quitar establecimientos', 'No cubierto: no hay una forma documentada por carga masiva; se hace en SOL'],
      ['Derechohabientes: modificación masiva, domicilio propio y segundo domicilio', 'La modificación es solo individual en SOL; el domicilio exportado es el del titular'],
      ['Prueba externa del T-Registro', 'Los archivos de altas, bajas y modificaciones se validan en el PVS v2.22 del implementador. Los TXT de derechohabientes no tienen validador fuera de SOL'],
      ['Firma digital certificada de la boleta', 'No: la boleta lleva la imagen de la firma del representante del empleador (N-08)'],
      ['Sobretasa por trabajar en un feriado (D.Leg. 713, art. 9)', 'No se calcula: las horas marcadas en el feriado solo se muestran (C-35)'],
      ['Asistencias con calendario de dos semanas y evaluación por horas', 'Las horas esperadas de un día normal suman las dos semanas (O-57)'],
      ['Turnos de noche que cruzan la medianoche', 'La conciliación es por día calendario (O-58)'],
      ['Vida Ley con varias pólizas por trabajador o con historia de pólizas', 'Una sola póliza por trabajador (N-05)'],
      ['Criterios pendientes de la contadora', 'Ver el Anexo A: se aplican según la norma y están pendientes de confirmación'],
    ], [3800, 5838]),
    pieCapitulo(['ce', 'asistencia'], 'N-06, C-35'),
  );


  return c;
};
