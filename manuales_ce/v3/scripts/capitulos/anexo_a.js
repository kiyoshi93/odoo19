// Manual v3 (origen: v2), bloque 4: capítulos 30 a 32 y anexos A a E (el 19 está en cap19.js). Medido el 2026-10-22.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');
  const PEND = JSON.parse(fs.readFileSync(path.join(MEDIDAS, 'pendientes_contadora.json'), 'utf8'));

  // ------------------------------------------------------------------ Anexo A
  a(
    h1('Anexo A. Observaciones para implementadores'),
    h2('A.1 Cierre de las observaciones del manual v1'),
    tabla(['v1', 'Observación', 'Resuelto por', 'Cómo queda'], [
      ['A1', 'Parámetros sin vigencias', 'C-02, V-01, V-02', 'Vigencias completas, validación al guardar y mensaje de vigencia faltante (ver O-64)'],
      ['A2', '5.ª sin asignación familiar en la proyección', 'C-03', 'Lucía 2025 = 2 309,73'],
      ['A3', 'Asignación familiar en el mes de goce parcial', 'C-04 (P-19)', 'Correcto según la contadora: sin cambio'],
      ['A4', 'Boleta descuadrada por 0,01', 'C-05', 'Cuadra al centavo con el asiento'],
      ['A5', 'TXT del BCP: cuentas como interbancarias; CTS vacía', 'C-01', 'Banco por código SBS; CTS con líneas'],
      ['A6', 'TXT bloqueado por un trabajador sin cuenta', 'C-08', 'Omitidos con aviso; modo estricto opcional'],
      ['A7', 'Asiento en «Operaciones varias»', 'C-06', 'Diario Planillas por defecto'],
      ['A8', 'Boleta sin días si el contrato no tiene estructura', 'C-07', 'Estructura por defecto'],
      ['A9', 'Feriados restados en los días de la boleta y del `.jor`', 'C-09, C-24', 'Días por norma; `.jor` de 6 campos'],
      ['A10', 'La tardanza no reduce la base', 'C-10', 'Base = afectos − tardanza'],
      ['A11', 'SENATI activado por la demo', 'Q-01', 'La demo solo escribe en compañías de laboratorio'],
      ['A12', 'T12 vacía; campos de India', 'Q-02, U-07', 'T12 del Anexo 2; campos ocultos'],
    ], [700, 3200, 1700, 4038]),
    h2('A.2 Observaciones abiertas'),
    tabla(['#', 'Observación', 'Qué hacer'], [
      ['O-51', 'Despliegue: dos copias de los módulos de nómina en el `addons_path` hicieron que un `-u` cargara la versión vieja (lotes 9 a 11)', 'Una sola copia; comprobar las versiones en Aplicaciones después de cada `-u` (capítulo 2). Gabriel la dejó en una sola copia'],
      ['O-55', 'La edad de los derechohabientes se mostraba a hoy, con decimales', 'Resuelta en el lote 22a: la asignación familiar mide la edad del hijo el primer día del mes del periodo (capítulo 8)'],
      ['O-56', 'El TXT de haberes no lleva el neto de las vacaciones, la liquidación ni el adelanto', 'Págueles con un archivo aparte o por otro medio'],
      ['O-57', 'Calendario de dos semanas con evaluación por horas: las horas esperadas de un día normal suman las dos semanas', 'No usar «Evaluar horas» con calendarios de dos semanas'],
      ['O-58', 'Turno de noche que cruza la medianoche: la conciliación es por día calendario', 'Revisar a mano las faltas y tardanzas de esos turnos'],
      ['O-62', 'Calendario en UTC: las tardanzas salen desplazadas 5 horas', 'Calendario y usuarios en America/Lima (capítulos 2 y 19)'],
      ['O-63', 'Las 64 boletas validadas de FM SYSTEMS conservaban las líneas de días y los nombres del v1 y el diario «Operaciones varias»', 'Resuelta el 22/10/2026: se regeneraron con las versiones finales, sin cambio de importes (Anexo C)'],
      ['O-64', 'En el navegador, la vigencia faltante (V-02) se muestra como «¡Vaya! Ocurrió un error»; el mensaje funcional queda en «Ver detalles técnicos»', 'Leer la última línea de los detalles técnicos (capítulo 26). Reportado para corrección'],
      ['O-65', 'Boletas con descanso médico: la línea de días se llama «Sick Time Off» (código GLOBAL)', 'Solo de presentación'],
    ], [800, 5000, 3838]),
    h2('A.3 Observaciones de la versión 3'),
    p('Encontradas al documentar la versión 3 y reportadas al equipo de desarrollo (detalle en el capítulo 33.4): el pago de la planilla con provisiones en la boleta, el récord descargado con «Avisar» al cese, la banda de feriados con un solo horario, la CTS sin concepto PLAME y los casos `EMPRESA_*` sin tipo de trabajador ni RUC. También: los textos de ayuda de los asistentes del PLAME y del T-Registro no nombran todavía los archivos nuevos (`.or5`, `.toc`, personal en formación, `.pfl`, `.lug`).'),
    h2('A.4 Criterios pendientes de confirmación por la contadora'),
    p('La contadora empezó a responder en noviembre de 2026 la lista `PREGUNTAS_CONTADORA_2026-11-08`. Lo de esta tabla **puede cambiar el código**: el manual lo describe según la norma y lo marca como **«criterio según la norma, pendiente de confirmación»**. Si la contadora responde distinto, cambiará en una versión siguiente.'),
    tabla(['Código', 'Tema', 'Qué hace hoy el sistema'], PEND['1 · Pueden cambiar código'], [1000, 3600, 5038]),
    h2('A.5 Criterios con valor por defecto'),
    p('Lo de esta tabla ya tiene una **opción** en la compañía o un valor por defecto: el manual lo documenta con el valor de hoy y la contadora puede cambiarlo sin tocar el código.'),
    tabla(['Código', 'Tema', 'Valor de hoy'], PEND['2 · Con valor por defecto'], [1000, 3600, 5038]),
  );

  return c;
};
