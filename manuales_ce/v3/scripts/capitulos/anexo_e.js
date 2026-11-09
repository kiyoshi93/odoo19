// Manual v3 (origen: v2), bloque 4: capítulos 30 a 32 y anexos A a E (el 19 está en cap19.js). Medido el 2026-10-22.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');

  // ------------------------------------------------------------------ Anexo E
  a(
    h1('Anexo E. El laboratorio: 14 casos'),
    p('Cada caso siembra trabajadores sintéticos en SOLSE Demo Servicios, genera boletas y archivos, y los compara celda por celda con un Excel de referencia, cuyos valores esperados salen de la norma. Medición del 22/10/2026 con las versiones finales:'),
    tabla(['Caso', 'Celdas', 'Estructuras del Excel', 'Prueba', 'Capítulos'], [
      ['NOMINA', '525', 'Boletas, Aportes, Vacaciones, Asiento, Configuración, Diagnóstico, AFPnet, Parámetros', 'Planilla de julio de 2026 con 13 trabajadores: aportes, 5.ª, gratificación, adelanto, vacaciones, judicial, sindicato, liquidación', '10–17, 20, 27'],
      ['BOLETA', '166', 'Boleta impresa, Conceptos, Diagnóstico', 'La boleta impresa cuadra al centavo', '10'],
      ['BANCOS', '407', 'BCP, Interbank y Scotiabank haberes y CTS, Omitidos, Archivos, Boletas', 'TXT de mayo de 2026', '15, 27'],
      ['MICRO', '83', 'Régimen, Conceptos, Diagnóstico', 'Microempresa: SIS, AF voluntaria, sin gratificación ni CTS', '9, 24'],
      ['UTILIDADES', '33', 'Reparto, Resumen, Tope', 'Reparto 50/50 y tope de 18 sueldos', '20'],
      ['AUMENTO', '66', 'Conceptos, PLAME, Diagnóstico', 'Aumento a mitad de mes, dos contratos y licencias sin goce', '21, 22'],
      ['SUBSIDIOS', '344', 'Días, Conceptos, PLAME, Diagnóstico', 'Descanso médico (20 y 21), maternidad (22) y derecho', '23'],
      ['CESE', '149', 'Conceptos, PLAME, Diagnóstico', 'Renta de 5.ª al cese: devolución, retención, renovación, reingreso', '13, 16'],
      ['INDEMNIZACION', '63', 'Conceptos, PLAME, Diagnóstico', 'Indemnización por despido arbitrario', '16'],
      ['VIDALEY', '58', 'Conceptos, PLAME, Diagnóstico', 'Prima de Vida Ley', '6, 12'],
      ['TREGISTRO', '262', 'Archivos, Diagnóstico', 'Altas, bajas, 9 modificaciones y derechohabientes', '8, 29'],
      ['ASISTENCIA', '94', 'Tardanzas, Faltas, Combinado, Feriado, Diagnóstico', 'Conciliación de asistencias', '19'],
      ['PLAME', '121', 'ZIP, REM, JOR, SNL, Anexo4ta, Diagnóstico', 'ZIP del PDT con la 4.ª', '27'],
      ['PLAME-RXH', '202', 'PS4, 4TA, Archivos, Diagnóstico', 'PLAME de 4.ª sin nómina', '30'],
    ], [1500, 800, 2600, 3200, 1538]),
    h2('E.1 Cómo correr un caso'),
    pasos([
      'Después de cada actualización: **SOLSE Demo › Laboratorio › ② Sincronizar casos**.',
      'En **Casos de demostración**, abra el caso y pulse **⑤ Limpiar**, **① Sembrar datos**, **② Generar** y **④ Comparar**. El mismo día, NOMINA antes que PLAME.',
      'El caso queda «Comparado» con su porcentaje de coincidencia. En **Comparaciones** se descarga el Excel con las columnas «esperado» y «generado» de cada celda.',
      'Si un caso no llega al 100 %, la hoja **Diagnóstico** del Excel dice en qué etapa se cortó y las demás hojas, qué celdas difieren.',
    ]),
    nota('El laboratorio solo escribe en sus compañías (Q-01). No lo corra en una base de producción: siembra trabajadores, boletas y asientos de prueba.', 'importante'),
    pieCapitulo(['ce_demo', 'asistencia_demo', 'plame_demo'], 'Q-01, Q-04, Q-05'),
  );

  return c;
};
