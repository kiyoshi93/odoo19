// Manual v3, Anexo E: el laboratorio. Origen: v2 (22/10/2026, 14 casos). Actualizado con los casos nuevos de los lotes 14
// a 21b, los laboratorios por empresa (lotes 60 a 68) y «Limpiar» (lotes 16b, 40 y 70). Corrida completa del 08/11/2026
// en contable19 (re-medición de los lotes 70 y 71): los 30 casos al 100 %, 4 741 + 688 celdas.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');

  // ------------------------------------------------------------------ Anexo E
  a(
    h1('Anexo E. El laboratorio: 30 casos'),
    p('Cada caso siembra trabajadores sintéticos, genera boletas y archivos, y los compara celda por celda con un Excel de referencia, cuyos valores esperados salen de la norma. Los **25 casos de siempre** trabajan en SOLSE Demo Servicios S.A.C.; los **5 casos `EMPRESA_*`**, cada uno en su compañía de laboratorio (E.2). Medición del 08/11/2026 con las versiones del v3: **los 30 al 100 %, 5 429 celdas** (4 741 + 688).'),
    h2('E.1 Los 25 casos de siempre'),
    tabla(['Caso', 'Celdas', 'Hojas del Excel', 'Prueba', 'Capítulos'], [
      ['NOMINA', '525', 'Boletas, Aportes, Vacaciones, Asiento, Configuración, Diagnóstico, AFPnet, Parámetros', 'Planilla de julio de 2026 con 13 trabajadores: aportes, 5.ª, gratificación, adelanto, vacaciones, judicial, sindicato, liquidación', '10–17, 20, 27'],
      ['BOLETA', '166', 'Boleta impresa, Conceptos, Diagnóstico', 'La boleta impresa cuadra al centavo', '10'],
      ['BANCOS', '407', 'BCP, Interbank y Scotiabank haberes y CTS, Omitidos, Archivos, Boletas, Diagnóstico', 'TXT de mayo de 2026', '15, 27'],
      ['MICRO', '83', 'Régimen, Conceptos, Diagnóstico', 'Microempresa: SIS, AF voluntaria, sin gratificación ni CTS', '9, 24'],
      ['UTILIDADES', '42', 'Base, Reparto, Resumen, Tope', 'Reparto 50/50, tope de 18 sueldos y la base con las liquidaciones', '20'],
      ['AUMENTO', '66', 'Conceptos, PLAME, Diagnóstico', 'Aumento a mitad de mes, dos contratos y licencias sin goce', '21, 22'],
      ['SUBSIDIOS', '344', 'Días, Conceptos, PLAME, Diagnóstico', 'Descanso médico (20 y 21), maternidad (22) y derecho', '23, 27'],
      ['CESE', '149', 'Conceptos, PLAME, Diagnóstico', 'Renta de 5.ª al cese: devolución, retención, renovación, reingreso', '13, 16'],
      ['INDEMNIZACION', '63', 'Conceptos, PLAME, Diagnóstico', 'Indemnización por despido arbitrario', '16'],
      ['VIDALEY', '58', 'Conceptos, PLAME, Diagnóstico', 'Prima de Vida Ley', '6, 12'],
      ['TREGISTRO', '262', 'Archivos, Diagnóstico', 'Altas, bajas, 9 modificaciones y derechohabientes', '8, 29'],
      ['ASISTENCIA', '94', 'Tardanzas, Faltas, Combinado, Feriado, Diagnóstico', 'Conciliación de asistencias', '19'],
      ['PLAME', '126', 'ZIP, REM, JOR, SNL, Anexo4ta, Diagnóstico', 'ZIP del PDT de julio de 2026 con la 4.ª y el dominical de la semanal', '27, 30'],
      ['PLAME-RXH', '202', 'PS4, 4TA, Archivos, Diagnóstico', 'PLAME de 4.ª sin nómina', '30'],
      ['DECLARACION', '65', 'Conceptos, PLAME, Diagnóstico', 'Movilidad 0908 y 0909, trunca 0407, SIS 0811, utilidades 0910 y 0911 (lote 14)', '16, 20, 24, 27'],
      ['CONCEPTOS', '108', 'Conceptos, PLAME, AFPnet, Diagnóstico', 'Los 14 conceptos configurados y la 5.ª del mes del pago de utilidades (lote 15)', '10, 12, 13, 27'],
      ['ADICIONALES', '152', 'Boletas, PLAME, AFPnet, Bancos, Planilla, Utilidades, Diagnóstico', 'Planillas de comisiones y utilidades, y la copia de la mensual (lote 16)', '9, 12, 13, 20, 27'],
      ['COMPUTABLE', '44', 'Beneficios, Diagnóstico', 'Remuneración computable con las variables regulares (lote 17)', '14, 15, 17'],
      ['FERIADOS', '63', 'Boletas, PLAME, Diagnóstico', 'Feriados y licencia con goce aparte, y trabajo en feriado (lote 18)', '10, 18, 27'],
      ['SCTR', '82', 'Boletas, Asiento, Diagnóstico', 'SCTR por entidad: tasa de la póliza, código y cuenta (lote 19)', '6, 12'],
      ['PROVISIONES', '296', 'Provisiones, Asiento, Diagnóstico', 'Provisión mensual en un asiento y su aplicación (lote 20a)', '7'],
      ['PROVISIONES_BOLETA', '612', 'Provisiones, Boletas, Asiento, Diagnóstico', 'Provisión en la boleta mensual y en la semanal (lote 20b)', '7'],
      ['PROVISIONES_BENEFICIO', '300', 'Provisiones, Boletas, Asiento, Diagnóstico', 'Aplicación en la boleta del beneficio (lote 20c)', '7, 14–17'],
      ['DOCUMENTOS_CESE', '325', 'Hoja, Certificado, Constancia CTS, Envío, Vacaciones, Diagnóstico', 'Hoja de liquidación, certificado de trabajo y constancia de cese (lote 21a)', '16, 28'],
      ['UTILIDADES_REPARTO', '107', 'Reparto, Resumen, Hoja, Planilla, Envío, Diagnóstico', 'Reparto guardado, hoja de utilidades y planilla de utilidades (lote 21b)', '20'],
    ], [1900, 700, 2700, 3038, 1300]),
    nota('Cambios de celdas respecto del v2: **PLAME** pasa de 121 a **126** (la fila del dominical de la semanal en el 0115, lote 31b: la obrera 46321478 con 0121 1 440,00 y 0115 240,00) y **UTILIDADES** de 33 a **42** (la hoja «Base», con las liquidaciones, lote 13). Los otros doce casos del v2 tienen las mismas celdas.', 'nota'),

    h2('E.2 Los laboratorios por empresa (EMPRESA_*)'),
    p('Cada uno es un mes completo de una empresa realista en su propia compañía de laboratorio, sin RUC y con el plan contable peruano. Sus hojas: **Compañía** (la configuración y las opciones del perfil), **Conceptos** (las líneas de las boletas), **Avisos** (los avisos que debe dar cada boleta) y **Diagnóstico**. El docstring de cada seeder (`solse_pe_payroll_ce_demo/models/seeder_empresa_*.py`) trae todos los esperados con su norma.'),
    tabla(['Caso', 'Celdas', 'Compañía y trabajadores', 'Cifras que muestra', 'Capítulos'], [
      ['EMPRESA_PEQUENA', '217', 'SOLSE Demo Pequeña Empresa S.A.C. · 6 trabajadores (70006101 a 70006106); P5, la recontratada, tiene además su ficha anterior archivada', 'P1, 2 400: gratificación de julio 1 200,00, bonificación 108,00, CTS de mayo 650,00. P3, despido el 15/10/2026: vacaciones truncas 862,50, CTS trunca 446,88, indemnización 1 100,00 (60 × 20 × 11/12). P6, régimen general: CTS 1 166,67. Utilidades: 68 ÷ 12 = 5,67 → 6, reparte 5 000,00 y avisa. Avisos del REMYPE (P4) y de la recontratada (P5)', '20, 24'],
      ['EMPRESA_MICRO', '104', 'SOLSE Demo Microempresa E.I.R.L. · 4 trabajadores (70006201 a 70006204)', 'M1, 1 300: SIS 15,00 y gratificación sin importe. M3, despido el 30/09/2026: vacaciones truncas 625,00, indemnización 416,67 (50 × 10 × 10/12), neto 960,42. Sin utilidades, y dice por qué', '24'],
      ['EMPRESA_COMERCIO', '138', 'SOLSE Demo Comercio S.A.C. · 9 trabajadores (70006301 a 70006309)', 'Horas extras, comisionista, nocturnas, utilidades al 8 % (8 000,00), avisos de la RMV (K5 «rmv_nocturna», mínimo 1 660,50; K6 y K8 «rmv»), tiempo parcial (K8: CTS 0,00 y aviso; 225,00 con «Pagar») y el mes parcial en el divisor (K9: CTS 466,67, lote 70)', '15, 17, 20, 26'],
      ['EMPRESA_INDUSTRIA', '92', 'SOLSE Demo Industria S.A.C. · 4 trabajadores (70006501 a 70006504)', 'SENATI: I1 obrero semanal 2,63; I2 sindicalizado 15,00 y cuota sindical 20,00; I3 con tardanza 18,71 (0,75 % de 2 494,79); I4 «Fuera de la base» 0,00. Utilidades al 10 % (10 000,00)', '20, 32'],
      ['EMPRESA_CONSULTORA', '137', 'SOLSE Demo Consultora S.A.C. · 5 trabajadores: S1 70006801, S4 70006804 y los extranjeros 000068002, 000068003 y 000068005', 'S1 practicante: SUBV_001 1 130,00, media subvención 565,00, EsSalud 152,55, neto 1 695,00. S2 no domiciliado: 5.ª 2 400,00 (30 %), neto 4 560,00; gratificación con 436,00. S3 domiciliada: neto 2 175,00. S4 a tiempo parcial: ONP 65,00, EsSalud 101,70. S5 andino (convenio 3): 5.ª 278,03, neto 6 681,97; campo 22 del `.tra` = 3; `.toc` de junio con S2 y S5', '13, 27, 29, 31'],
    ], [1800, 700, 2300, 3638, 1200]),
    vinetas([
      '**La primera vez, la compañía la crea un administrador** (crear una compañía y cargar su plan contable es de administrador). Un operador recibe un mensaje que lo dice; después cualquiera corre el caso.',
      'Con la facturación instalada, la compañía nace con la dirección del laboratorio y sin tipo de documento (lote 70, capítulo 2).',
      '**No sirven para presentar** el PLAME, AFPnet ni el T-Registro de esas empresas: no tienen RUC. Los archivos y los PDF salen sin RUC.',
    ]),
    ...figura('c02_06_empresa_consultora', 'Caso EMPRESA_CONSULTORA conforme: 137 celdas, 9 boletas validadas en SOLSE Demo Consultora S.A.C.'),

    h2('E.3 Cómo correr un caso'),
    pasos([
      'Después de cada actualización: **SOLSE Demo › Configuración › Laboratorio › ② Sincronizar casos** (33 casos registrados: los 30 de la nómina y 3 de la facturación).',
      'En **Casos de demostración**, abra el caso y pulse **⑤ Limpiar**, **① Sembrar datos**, **② Generar** y **④ Comparar** (o «⑤ Limpiar» y después **Ejecutar todo**). El mismo día, NOMINA antes que PLAME.',
      'El caso queda «Comparado» con su porcentaje de coincidencia. En **Comparaciones** se descarga el Excel con las columnas «esperado» y «generado» de cada celda.',
      'Si un caso no llega al 100 %, la hoja **Diagnóstico** del Excel dice en qué etapa se cortó y las demás hojas, qué celdas difieren. El porcentaje vale solo si las cuatro fases terminaron sin error.',
    ]),
    vinetas([
      '**UTILIDADES y SUBSIDIOS comparten tres DNI** (70000801 a 70000803, O-72): corra cada caso completo, de a uno.',
      '**«Limpiar» y la tarea nocturna** «Generate Missing Work Entries» no corren a la vez (lote 70): si la tarea está corriendo, «Limpiar» no borra nada, lo dice y pide pulsar otra vez en unos minutos. «Limpiar» borra también las entradas de trabajo, los trabajadores que una limpieza anterior dejó archivados y los asientos del pago de la planilla y de AFPnet de las boletas del caso (capítulo 2.6).',
    ]),
    nota('El laboratorio solo escribe en sus compañías (Q-01). No lo corra en una base de producción: siembra trabajadores, boletas y asientos de prueba.', 'importante'),
    pieCapitulo(['ce_demo', 'asistencia_demo', 'plame_demo'], 'Q-01, Q-04, Q-05, O-71 (lote 16b), lotes 14 a 21b (casos nuevos), O-175 (lote 57), lotes 60 a 68 (EMPRESA_*), lote 70'),
  );

  return c;
};
