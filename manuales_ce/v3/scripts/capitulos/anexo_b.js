// Manual v3 (origen: v2), bloque 4: capítulos 30 a 32 y anexos A a E (el 19 está en cap19.js). Medido el 2026-10-22.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');

  // ------------------------------------------------------------------ Anexo B
  a(
    h1('Anexo B. Datos de prueba'),
    p('Trabajadores del recorrido (FM SYSTEMS SOLUTIONS EIRL). Datos **ficticios**; DNI **sintéticos**.'),
    tabla(['Trabajador', 'DNI', 'Ingreso', 'Sueldo', 'Pensión', 'Particularidades'], [
      ['Lucía Fernanda Ramos Ticona', '99999901', '01/01/2025', '4 500', 'SPP Integra (flujo)', 'Un hijo menor; vacaciones del 2 al 16/02/2026; cuentas BCP de sueldo y CTS'],
      ['Héctor Manuel Salas Quispe', '99999902', '01/03/2025', '2 200', 'ONP', 'Vacaciones del 14 al 23/09/2026; cuentas Interbank'],
    ], [2300, 1100, 1200, 900, 1700, 2438]),
    p('Los casos del laboratorio siembran sus propios trabajadores sintéticos (DNI 7000xxxx y los del caso NOMINA) en la compañía **SOLSE Demo Servicios S.A.C.** (Anexo E). Los escenarios de los capítulos 11, 20, 22, 25, 26 y 28 se armaron en esa misma compañía con trabajadores 70009xxx y se borraron después de medir. Ningún escenario escribió en FM SYSTEMS.'),
    nota('En las capturas, los DNI del caso NOMINA y los RUC de las compañías y prestadores del laboratorio aparecen difuminados.', 'nota'),
  );


  return c;
};
