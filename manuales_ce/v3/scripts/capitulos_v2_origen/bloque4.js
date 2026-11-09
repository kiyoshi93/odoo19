// Manual v2, bloque 4: capítulos 30 a 32 y anexos A a E (el 19 está en cap19.js). Medido el 2026-10-22.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');

  // ------------------------------------------------------------------ 30
  a(
    h1('30. Recibos por honorarios (4.ª categoría)'),
    p('El PLAME de 4.ª categoría (prestadores y comprobantes) tiene **dos puertas con el mismo contenido** (medido byte a byte en el caso PLAME):'),
    vinetas([
      '**Sin nómina**: Contabilidad › Reportes › **PLAME - Recibos por Honorarios** (`solse_pe_plame_rxh`). Genera el `.ps4` (prestadores) y el `.4ta` (comprobantes).',
      '**Con nómina**: casilla **Incluir 4ta categoría** del asistente PLAME (`solse_pe_plame_4ta`), que los agrega al ZIP de la planilla (capítulo 27).',
    ]),
    p('Entran los recibos **pagados** en el mes, sin importar su fecha de emisión. Los pagos parciales se prorratean y las notas de crédito toman la fecha de pago del recibo de origen. La retención sale del impuesto marcado como **retención de 4.ª**. Los datos del prestador (apellidos y nombres separados, domiciliado, convenio, suspensiones) se registran en el contacto.'),
    pasos([
      'Elija **Ejercicio** y **Mes** (o el rango Desde / Hasta).',
      '**Revisar periodo** lista los comprobantes con su prestador, tipo, serie, número, emisión, pago, retención y monto, y la pestaña **Validaciones** dice qué falta corregir.',
      '**Generar archivos** produce el `.ps4` y el `.4ta`.',
    ]),
    ...figura('c30_02_rxh_revision', 'Revisión de julio de 2026 (caso PLAME-RXH): 8 prestadores, 9 comprobantes y total declarado S/ 15 022,60, con una nota de crédito y un no domiciliado con pasaporte.'),
    ...figura('c30_03_ajustes_4ta', 'Ajustes de 4.ª categoría de la compañía: retención para el PLAME y umbral de S/ 1 500.'),
    nota('Caso PLAME-RXH (202 celdas): los 8 prestadores del `.ps4` (7 con RUC y un pasaporte no domiciliado con convenio 2) y los 9 comprobantes del `.4ta`, con CRLF y en ASCII.', 'caso'),
    nota('El formato se comparó con archivos aceptados por el PDT 4.6. La **validación final en el PDT del cliente está pendiente**: verifíquelo con su primera declaración.', 'importante'),
    pieCapitulo(['plame_rxh', 'plame_4ta'], null),
  );

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

  // ------------------------------------------------------------------ 32
  a(
    h1('32. Lista de verificación del cierre mensual y anual'),
    h2('32.1 Cada mes'),
    pasos([
      '**Parámetros**: ¿cambió la RMA (cada trimestre), la RMV o la comisión de alguna AFP? Registre la vigencia antes de calcular. Si aparece la banda de avisos, atiéndala primero (capítulos 4 y 26).',
      '**Novedades**: ingresos (con T8, T24 y datos del T-Registro), ceses (fecha de fin, motivo y, si corresponde, despido arbitrario), cambios de sueldo con su fecha efectiva, vacaciones, licencias, descansos médicos, asistencias, horas extra, adelantos.',
      '**T-Registro dentro del plazo**: altas el día del ingreso, bajas al día siguiente del cese, modificaciones y derechohabientes (capítulo 29).',
      '**Orden de validación**: adelanto → gratificación, CTS y vacaciones → mensuales y semanales → liquidaciones (capítulo 11).',
      'Revise las bandas y avisos de cada boleta. Una boleta sin importes no se valida: elimínela (capítulo 10).',
      'Revise el asiento de cada lote en el diario **Planillas**.',
      'Genere la planilla, el PLAME, AFPnet y los TXT bancarios, y **abra cada archivo** antes de enviarlo. Revise los **omitidos** de cada TXT (capítulo 27).',
      '**Registre el pago** del lote con su número de operación (capítulo 28).',
      '**Entregue las boletas** dentro de los 3 días hábiles: impresas con firma, o por correo a quien tiene el acuerdo (capítulo 28).',
      'Importe el PLAME en el PDT y compare sus totales con la planilla.',
    ]),
    h2('32.2 Cada año'),
    pasos([
      'En diciembre: registre los **feriados** del año siguiente y la **UIT** nueva (vigente desde el 1 de enero).',
      'Valide la gratificación y las vacaciones de diciembre **antes** que la mensual: en diciembre la renta de 5.ª no se corrige en otro mes.',
      'Emita el **certificado de 5.ª** de cada trabajador del ejercicio, con el representante del empleador marcado (capítulo 13).',
      'Calcule el **reparto de utilidades** con la renta neta del ejercicio, dentro del plazo legal (capítulo 20).',
      'Revise las pólizas de **Vida Ley** y de **EPS** que vencen.',
    ]),
    pieCapitulo(['base', 'ce'], null),
  );

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
      ['O-55', 'La edad de los derechohabientes se calcula a hoy, con decimales', 'Es la que leen las reglas de asignación familiar (17,92 < 18). Tenerlo en cuenta al recalcular meses pasados'],
      ['O-56', 'El TXT de haberes no lleva el neto de las vacaciones, la liquidación ni el adelanto', 'Págueles con un archivo aparte o por otro medio'],
      ['O-57', 'Calendario de dos semanas con evaluación por horas: las horas esperadas de un día normal suman las dos semanas', 'No usar «Evaluar horas» con calendarios de dos semanas'],
      ['O-58', 'Turno de noche que cruza la medianoche: la conciliación es por día calendario', 'Revisar a mano las faltas y tardanzas de esos turnos'],
      ['O-62', 'Calendario en UTC: las tardanzas salen desplazadas 5 horas', 'Calendario y usuarios en America/Lima (capítulos 2 y 19)'],
      ['O-63', 'Las 64 boletas validadas de FM SYSTEMS conservaban las líneas de días y los nombres del v1 y el diario «Operaciones varias»', 'Resuelta el 22/10/2026: se regeneraron con las versiones finales, sin cambio de importes (Anexo C)'],
      ['O-64', 'En el navegador, la vigencia faltante (V-02) se muestra como «¡Vaya! Ocurrió un error»; el mensaje funcional queda en «Ver detalles técnicos»', 'Leer la última línea de los detalles técnicos (capítulo 26). Reportado para corrección'],
      ['O-65', 'Boletas con descanso médico: la línea de días se llama «Sick Time Off» (código GLOBAL)', 'Solo de presentación'],
    ], [800, 5000, 3838]),
    h2('A.3 Criterios pendientes de confirmación por la contadora'),
    p('Estos comportamientos siguen la norma, pero el criterio de la contadora está **pendiente de confirmación**. No son hechos firmes: si la contadora responde distinto, cambiarán. La ficha de cada ítem (`mejoras-nomina-ce.md`) tiene la pregunta completa.'),
    tabla(['Pregunta', 'Ítem', 'Tema'], [
      ['Ronda 5', 'C-09, C-26', 'Mes con vacaciones: 25 días laborados + 5 de vacaciones; horas de los feriados en el `.jor`; base mínima de EsSalud y tope de la prima por mes'],
      ['P-25, P-26, P-29', 'C-22, C-16', 'Reparto de utilidades: qué remuneración y qué días cuentan (vacaciones, subsidios, días no pagados)'],
      ['P-35 a P-38, P-41 a P-45', 'N-01', 'Subsidios: promedio, contador de 20 días, derecho y casos de borde'],
      ['P-39', 'C-32', 'Asignación familiar en un mes entero sin goce'],
      ['P-40', 'C-31', 'Divisor del valor hora en los permisos por horas'],
      ['P-46, P-47', 'N-04', 'Renta de 5.ª al cese; truncas de un contrato renovado'],
      ['P-48, P-50, P-51', 'N-03', 'Indemnización: convención de días y casos de prueba'],
      ['P-49, P-52', 'N-05', 'Vida Ley: base de la prima, mes subsidiado'],
      ['P-53', 'N-07', 'Pago de la planilla'],
      ['P-54 a P-56', 'N-08', 'Entrega de boletas por correo y constancias'],
      ['P-57 a P-59', 'C-34', 'Gratificación del semestre al cese'],
    ], [2200, 1500, 5938]),
  );

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

  // ------------------------------------------------------------------ Anexo C
  const fm = JSON.parse(fs.readFileSync(path.join(MEDIDAS, 'fm_64_boletas.json'), 'utf8'));
  const dinero = (v) => (v === undefined || v === null || v === 0) ? '—' : Number(v).toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const MES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'];
  const filas = fm.slice().sort((x, y) => (x.emp - y.emp) || x.periodo.localeCompare(y.periodo) || x.estructura.localeCompare(y.estructura)).map((r) => {
    const l = Object.fromEntries(r.lineas);
    const pension = (l.AFP_APO_001 || 0) + (l.AFP_COM_001 || 0) + (l.AFP_PRI_001 || 0) + (l.ONP_001 || 0);
    return [r.emp === 27 ? 'Lucía' : 'Héctor', `${MES[Number(r.periodo.slice(5)) - 1]}-${r.periodo.slice(2, 4)}`, r.estructura, dinero(l.RB_001), dinero(l.ASF_001),
      dinero(l.VAC_001 || l.GRATI_001 || l.CTS_001), pension ? dinero(Math.round(pension * 100) / 100) : '—', dinero(l.R5TA_001), dinero(l.NET)];
  });
  a(
    h1('Anexo C. Planilla medida de enero de 2025 a diciembre de 2026'),
    p('Las 64 boletas validadas de los dos trabajadores del recorrido, leídas en `contable19` el 22/10/2026, después de regenerarlas. Fuente: `manuales_ce/v2/medidas/fm_64_boletas.json`.'),
    nota('**Regeneradas el 22/10/2026** con las versiones finales, con autorización de la empresa: cada boleta se canceló (su asiento se eliminó), tomó los días, el nombre y el diario que pone hoy el formulario, se recalculó y se volvió a validar, mes por mes y, dentro del mes, gratificación, vacaciones y CTS antes que la mensual. **Ningún importe cambió**: 0 diferencias en las 64 boletas. La renta de 5.ª de Lucía suma 2 309,73 (2025) y 2 160,78 (2026), con la proyección de gratificaciones con asignación familiar (C-03) y la 5.ª del mes de vacaciones (C-11). La asignación familiar sube a 123,00 desde octubre de 2026 (RMV 1 230). Cambiaron: los nombres («Boleta de…», «Boleta de Gratificación de…», «Liquidación CTS de…», U-06), las líneas de días en español, «¿Pagado?» sin marcar en las vacaciones de las mensuales de febrero (Lucía) y setiembre de 2026 (Héctor) (C-16), y el diario: los 64 asientos nuevos están en Planillas (PLLA/2025/01/0001 a PLLA/2026/12/0005; debe = haber = 242 485,34). Los días por feriado siguen en la línea «Feriados» de la boleta, como los pone hoy el formulario.', 'importante'),
    tabla(['Trab.', 'Mes', 'Estr.', 'Básica', 'AF', 'Vac./Grati/CTS', 'Pensión', '5.ª', 'Neto'], filas, [900, 900, 800, 1100, 800, 1500, 1200, 1000, 1438]),
  );

  // ------------------------------------------------------------------ Anexo D
  const lotes = [
    ['1', '12/10', 'base 19.0.1.8.2 · ce 19.0.1.9.4', 'C-01, C-02, C-08, C-12, C-13, V-01'],
    ['2', '13/10', 'base 19.0.1.9.3 · ce 19.0.1.10.10', 'C-14, U-01 a U-07, U-09'],
    ['3', '13/10', 'base 19.0.1.10.5 · ce 19.0.1.11.10', 'C-03, C-05, C-06, C-07, C-11'],
    ['4', '14/10', 'base 19.0.1.11.7 · ce 19.0.1.12.9 · ce_demo 19.0.2.6.2', 'C-15, C-17, U-08, U-10, V-02, V-03, V-04, Q-02, Q-03 (cerrado)'],
    ['5', '14/10', 'base 19.0.1.11.8 · ce 19.0.1.12.12 · ce_demo 19.0.2.12.3', 'C-19, V-05, Q-01, Q-04, Q-05'],
    ['6a', '15/10', 'base 19.0.1.11.10 · ce 19.0.1.12.16 · ce_demo 19.0.2.15.2', 'C-18, C-21, C-22, C-23'],
    ['6', '17/10', 'base 19.0.1.14.0 · ce 19.0.1.15.5 · ce_demo 19.0.2.17.1 · asistencia 19.0.1.2.1 · plame_demo 19.0.1.4.1', 'C-09, C-10, C-16, C-20, C-24 a C-29'],
    ['7a', '19/10', 'base 19.0.1.17.3 · ce 19.0.1.18.3 · ce_demo 19.0.2.18.0 · asistencia 19.0.1.3.2', 'C-30, C-31, C-32, O-31'],
    ['7b', '19/10', 'base 19.0.1.19.1 · ce 19.0.1.21.1 · ce_demo 19.0.2.21.1', 'N-01, N-03, N-04'],
    ['8', '19/10', 'ce 19.0.1.24.2 · ce_demo 19.0.2.22.0', 'N-05, N-07, N-08'],
    ['9', '19/10', 'base 19.0.1.20.1 · ce 19.0.1.25.1 · ce_demo 19.0.2.23.1', 'C-33, C-34'],
    ['10', '19/10', 'ce 19.0.1.26.2 · ce_demo 19.0.2.24.1', 'N-02 (altas y bajas del T-Registro)'],
    ['11', '22/10', 'ce 19.0.1.27.1 · ce_demo 19.0.2.25.1', 'N-02 fase 2 (modificaciones y derechohabientes), U-11'],
    ['12', '22/10', 'asistencia 19.0.1.4.1 · asistencia_demo 19.0.1.2.1', 'C-35'],
  ];
  a(
    h1('Anexo D. Historial de versiones'),
    p('Los 65 cambios de la versión 2 se entregaron en 12 lotes, del 12 al 22 de octubre de 2026. Cada lote se re-midió en `contable19` (informes `manuales_ce/evidencias/lote*/REMEDICION_*.md`). Los lotes 7a, 7b y 8 se midieron juntos, con el 8 instalado. C-04 y Q-03 se cerraron sin cambio de código (C-04 por la respuesta P-19 de la contadora, el 15/10). N-06 está bloqueado (formatos de los bancos).'),
    tabla(['Lote', 'Validado (2026)', 'Versiones al validar', 'Ítems'], lotes, [800, 1300, 3800, 3738]),
    p('Versiones finales documentadas: base 19.0.1.20.1 · ce 19.0.1.27.1 · ce_demo 19.0.2.25.1 · asistencia 19.0.1.4.1 · asistencia_demo 19.0.1.2.1 · plame_demo 19.0.1.4.1.'),
  );

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
