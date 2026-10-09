// Genera el documento de mejoras de la nómina peruana Community (para el chat de desarrollo).
// Uso: NODE_PATH=<carpeta con docx> node manuales_ce/scripts/generar_mejoras.js
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, LevelFormat, Bookmark, InternalHyperlink, PageBreak, Header, Footer, PageNumber,
  PageOrientation,
} = require('docx');

const CAPTURAS = path.join(__dirname, '..', 'capturas');
const SALIDA = path.join(__dirname, '..', 'mejoras', 'Mejoras_Nomina_PE_Community.docx');
const COLOR = '714B67';
const ANCHO_UTIL = 9638; // A4 con márgenes de 2 cm (DXA)

let numeroFigura = 0;
let instanciaLista = 0;

// ---------- Utilidades de contenido ----------
function corridas(texto, base = {}) {
  // **negrita** y `código` dentro del texto
  return texto.split(/(\*\*[^*]+\*\*|`[^`]+`)/).filter(Boolean).map((trozo) => {
    if (trozo.startsWith('**')) return new TextRun({ ...base, text: trozo.slice(2, -2), bold: true });
    if (trozo.startsWith('`')) return new TextRun({ ...base, text: trozo.slice(1, -1), font: 'Consolas', size: 20, color: '444444' });
    return new TextRun({ ...base, text: trozo });
  });
}

const p = (texto, opciones = {}) => new Paragraph({ children: corridas(texto), spacing: { after: 120 }, ...opciones });
// Los títulos llevan marcador para el índice estático (no depende de que Word actualice campos)
const indice = [];
const marcador = (nivel, texto) => {
  const id = `t${indice.length + 1}`;
  indice.push({ nivel, texto, id });
  return new Bookmark({ id, children: [new TextRun(texto)] });
};
const h1 = (texto) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [marcador(1, texto)], pageBreakBefore: true });
const h2 = (texto) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [marcador(2, texto)] });
const h3 = (texto) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(texto)] });

function pasos(lista) {
  instanciaLista += 1;
  const instancia = instanciaLista;
  return lista.map((texto) => new Paragraph({ children: corridas(texto), numbering: { reference: 'pasos', level: 0, instance: instancia }, spacing: { after: 80 } }));
}

function vinetas(lista) {
  return lista.map((texto) => new Paragraph({ children: corridas(texto), numbering: { reference: 'vinetas', level: 0 }, spacing: { after: 60 } }));
}

function nota(texto, tipo = 'nota') {
  const estilos = {
    nota: { relleno: 'EAF4F8', borde: '2E86AB', etiqueta: 'Nota: ' },
    importante: { relleno: 'FDF2E6', borde: 'E08A1E', etiqueta: 'Importante: ' },
    implementador: { relleno: 'F3EEF2', borde: COLOR, etiqueta: 'Para implementadores: ' },
  }[tipo];
  return new Paragraph({
    children: [new TextRun({ text: estilos.etiqueta, bold: true, color: estilos.borde }), ...corridas(texto)],
    shading: { type: ShadingType.CLEAR, fill: estilos.relleno, color: 'auto' },
    border: { left: { style: BorderStyle.SINGLE, size: 18, color: estilos.borde, space: 8 } },
    spacing: { before: 120, after: 160 },
    indent: { left: 120, right: 120 },
  });
}

function dimensionesPng(ruta) {
  const datos = fs.readFileSync(ruta);
  return { ancho: datos.readUInt32BE(16), alto: datos.readUInt32BE(20) };
}

function figura(archivo, pie, anchoPx = 620) {
  const ruta = path.join(CAPTURAS, `${archivo}.png`);
  if (!fs.existsSync(ruta)) throw new Error(`Falta la captura ${archivo}`);
  const { ancho, alto } = dimensionesPng(ruta);
  const escala = Math.min(1, anchoPx / ancho);
  numeroFigura += 1;
  return [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 120, after: 60 },
      keepNext: true,
      children: [new ImageRun({ type: 'png', data: fs.readFileSync(ruta), transformation: { width: Math.round(ancho * escala), height: Math.round(alto * escala) }, altText: { title: pie, description: pie, name: archivo } })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: `Figura ${numeroFigura}. `, bold: true, size: 18, color: COLOR }), new TextRun({ text: pie, italics: true, size: 18, color: '555555' })],
    }),
  ];
}

function tabla(encabezados, filas, anchos) {
  const total = anchos.reduce((a, b) => a + b, 0);
  const borde = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
  const bordes = { top: borde, bottom: borde, left: borde, right: borde };
  const celda = (texto, i, encabezado) => new TableCell({
    width: { size: anchos[i], type: WidthType.DXA },
    borders: bordes,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    shading: encabezado ? { type: ShadingType.CLEAR, fill: COLOR, color: 'auto' } : undefined,
    children: [new Paragraph({ children: corridas(String(texto), encabezado ? { bold: true, color: 'FFFFFF', size: 19 } : { size: 19 }) })],
  });
  return new Table({
    width: { size: total, type: WidthType.DXA },
    columnWidths: anchos,
    rows: [
      new TableRow({ tableHeader: true, children: encabezados.map((t, i) => celda(t, i, true)) }),
      ...filas.map((fila) => new TableRow({ children: fila.map((t, i) => celda(t, i, false)) })),
    ],
  });
}

const espacio = () => new Paragraph({ children: [], spacing: { after: 120 } });

// ---------- Contenido del manual ----------
const contenido = [];
const agregar = (...elementos) => elementos.flat().forEach((e) => contenido.push(e));


// Ficha de una mejora: tabla de 2 columnas con los datos que necesita el chat de desarrollo
function mejora(m) {
  const filas = [
    ['Prioridad', m.prioridad],
    ['Módulo / archivo', m.donde],
    ['Problema (medido)', m.problema],
    ['Propuesta', m.propuesta],
    ['Criterio de aceptación', m.aceptacion],
  ];
  if (m.biblia) filas.push(['Referencia', m.biblia]);
  return [h2(`${m.id} · ${m.titulo}`), tabla(['Campo', 'Detalle'], filas, [2200, 7438]), espacio()];
}

// Portada
agregar(
  new Paragraph({ spacing: { before: 2000 }, children: [] }),
  new Paragraph({ children: [new TextRun({ text: 'DOCUMENTO DE MEJORAS', bold: true, size: 28, color: '888888' })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Nómina peruana · Odoo 19 Community', bold: true, size: 56, color: COLOR })] }),
  new Paragraph({ spacing: { after: 500 }, children: [new TextRun({ text: 'Correcciones, mejoras de interfaz, validaciones y cobertura nueva detectadas al elaborar el manual de usuario', size: 28, color: '444444' })] }),
  tabla(['Dato', 'Valor'], [
    ['Módulos', 'solse_pe_payroll_base 19.0.1.6.0 · solse_pe_payroll_ce 19.0.1.8.0 · solse_pe_payroll_asistencia 19.0.1.0.0 · solse_pe_plame_rxh 19.0.1.2.0 · solse_pe_plame_4ta 19.0.1.0.0 · demos · om_hr_payroll 19.0.1.0'],
    ['Base de medición', 'contable19 (servidor de pruebas), 7 y 8 de octubre de 2026'],
    ['Fuente', 'Manual de usuario Community, sus evidencias (rama claude/odoo-payroll-manual-pe-ce-lhjakl, manuales_ce/evidencias) y biblia rama manual-nomina-ce (99-sintesis/manual-ce-hallazgos-nuevos.md)'],
    ['Destino', 'Chat de desarrollo de los módulos de nómina'],
  ], [2400, 7238]),
  espacio(),
  nota('Cada ítem tiene un **ID estable** (C = corrección, U = interfaz, V = validación, N = funcionalidad nueva, Q = calidad). Los problemas marcados «medido» se reprodujeron en la base; los criterios de aceptación indican cómo comprobar el arreglo con una corrida, siguiendo el estándar «mide, no deduzcas» de la biblia. No se tocó código: este documento solo describe.'),
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ children: [new TextRun({ text: 'Contenido', bold: true, size: 32, color: COLOR })], spacing: { after: 200 } }),
  'INDICE',
);

// Resumen
agregar(
  h1('Resumen y orden sugerido'),
  tabla(['ID', 'Mejora', 'Prioridad', 'Tipo'], [
    ['C-01', 'TXT BCP: código de banco por BIC; CTS sale vacío', 'Alta', 'Corrección'],
    ['C-02', 'Vigencias faltantes: comisión AFP 2025, RMA trimestral, RMV 1.230', 'Alta', 'Datos'],
    ['V-01', 'Validar el valor de los parámetros al guardar (tipo y formato)', 'Alta', 'Validación'],
    ['C-03', 'Renta de 5.ª: proyección de gratificaciones sin asignación familiar', 'Media', 'Corrección'],
    ['C-04', 'Asignación familiar 1,5 veces en mes de goce parcial', 'Media (consultar)', 'Corrección'],
    ['C-05', 'Boleta impresa descuadrada por redondeo', 'Media', 'Corrección'],
    ['C-06', 'Diario Planillas por defecto en contrato, boleta y lote', 'Media', 'Corrección'],
    ['C-07', 'Estructura por defecto en el contrato', 'Media', 'Corrección'],
    ['C-08', 'TXT: omitir trabajadores sin cuenta con aviso, en lugar de bloquear', 'Media', 'Corrección'],
    ['U-01', 'Planes EPS: la lista solo muestra el ID', 'Alta', 'Interfaz'],
    ['U-02', 'Contratos: la lista no muestra al trabajador', 'Alta', 'Interfaz'],
    ['U-03', 'Reglas salariales: 135 filas repetidas sin estructura, con reglas de India', 'Alta', 'Interfaz'],
    ['U-04', 'Maestros SUNAT: solo la abreviatura, sin código ni descripción', 'Media', 'Interfaz'],
    ['U-05', 'Mapeo PCGE y T12 sin nombre (se ve «modelo,id»)', 'Media', 'Interfaz'],
    ['U-06', 'Textos en inglés y traducciones erróneas', 'Media', 'Interfaz'],
    ['U-07', 'Campos de India en el contrato (HRA, DA, allowances)', 'Media', 'Interfaz'],
    ['U-08', 'Editor de parámetros estructurados (comisiones, tramos, factores)', 'Media', 'Interfaz'],
    ['U-09', 'Menú «Parámetros de Nómina PE» duplicado', 'Baja', 'Interfaz'],
    ['V-02', 'Aviso previo de vigencias faltantes al calcular', 'Media', 'Validación'],
    ['V-03', 'Alerta de RMA y RMV visible en el tablero', 'Baja', 'Validación'],
    ['C-09', 'Días laborados en boleta y .jor con feriados', 'Consultar', 'Corrección'],
    ['C-10', 'Tardanza no reduce la base afecta', 'Consultar', 'Corrección'],
    ['C-11', '5.ª cae en el mes de vacaciones', 'Baja', 'Corrección'],
    ['C-12', 'TXT bancario con tildes (latin-1)', 'Baja', 'Corrección'],
    ['C-13', 'Opción Scotiabank genera el formato de Interbank', 'Alta', 'Corrección'],
    ['Q-01', 'La demo activa SENATI en la compañía donde corre', 'Media', 'Calidad'],
    ['Q-02', 'Maestro T12 sin datos', 'Media', 'Calidad'],
    ['Q-03', 'Estructuras con compañía fija', 'Baja', 'Calidad'],
    ['Q-04', 'Pruebas automáticas de las salidas (TXT, AFPnet)', 'Media', 'Calidad'],
    ['Q-05', 'Cobertura pendiente de medición (utilidades, microempresa, alerta RMA…)', 'Media', 'Calidad'],
    ['N-01 … N-08', 'Subsidios, T-Registro, indemnización, regularización de 5.ª, Vida Ley, Scotiabank/BN, pagos, envío de boletas', 'Según demanda', 'Nueva'],
  ], [1200, 5600, 1500, 1338]),
  p('**Orden sugerido**: C-01, C-13, C-02 y V-01 (afectan dinero o bloquean la planilla), luego U-01 a U-03 (lo primero que ve el cliente), después C-03 a C-08 y el resto. Los marcados «consultar» necesitan respuesta de la contadora antes de programar.'),
);

// Correcciones
agregar(h1('1. Correcciones funcionales'));
[
  { id: 'C-01', titulo: 'TXT BCP: código de banco por BIC; el TXT de CTS sale vacío', prioridad: '**Alta**', donde: '`solse_pe_payroll_ce/wizard/bancos.py` · `_cuenta_empleado` (l. 128-147) y `_generar_bcp` (l. 191-193)',
    problema: 'El código de banco se toma de `bank_id.bic`. En la base el BCP tiene bic «BCPLPEPL», nunca «02». Resultado medido: en haberes una cuenta BCP sale como registro «2B» con CCI (interbancaria) en lugar de «2A» con número de cuenta; en CTS la línea `if self.tipo == \'cts\' and codigo != CODIGO_BCP: continue` salta a todos: `ABONO_BCP_CTS_202611.txt` solo trae la cabecera con total 0.00 aunque había 2 CTS validadas (2,695.92 y 1,283.33). No hay aviso.',
    propuesta: 'Resolver el banco por una tabla propia (res.bank → código SBS 02/03/09/18) o por los BIC de la base (medidos: BCP «BCPLPEPL» → 02, Interbank «BINPPEPL» → 03). Si un trabajador queda fuera por banco no soportado, listarlo en `resumen` y no silenciarlo.',
    aceptacion: 'Con la cuenta BCP de Lucía (99999901): haberes sale «2A» con su número de cuenta; CTS de noviembre 2026 trae 2 líneas y total 3,979.25 (si Héctor tiene cuenta BCP) o 1 línea y el aviso de Héctor (Interbank).' },
  { id: 'C-02', titulo: 'Vigencias faltantes en la data de parámetros', prioridad: '**Alta**', donde: '`solse_pe_payroll_base/data/hr_rule_parameter_data.xml`',
    problema: 'Medido: una boleta AFP de 2025 se detiene con «No existe una vigencia del parámetro de nómina "pe_afp_comision_flujo" para la fecha 2025-01-31». La comisión arranca 2026-01-01 y la RMA 2026-04-01 (sin las actualizaciones siguientes). La RMV 1,230 desde 2026-10-01 (D.S. 015-2026-TR) no está: `pe_rmv` 1130 y `pe_asig_familiar` 113.',
    propuesta: 'Agregar vigencias oficiales (SBS) de comisiones 2025, RMA por trimestre desde 2025-01 y RMV/AF de 2026-10. Documentar en la data la fuente y fecha de cada valor. Como es `noupdate`, prever un script de migración que agregue vigencias sin pisar las del cliente.',
    aceptacion: 'Una boleta AFP de enero 2025 calcula sin error; ASF_001 de octubre 2026 = 123.00; la RMA vigente a la fecha de hoy existe.' },
  { id: 'C-03', titulo: 'Renta de 5.ª: proyección de gratificaciones sin asignación familiar', prioridad: 'Media', donde: '`solse_pe_payroll_ce/data/hr_salary_rule_bloque4_data.xml` · R5TA_001',
    problema: '`proyeccion_gratis = version.wage * factor_grati * (1.0 + bono) * gratis_pendientes` usa el sueldo, pero GRATI_001 paga sueldo + AF. En diciembre la grati del mes cuenta como «pendiente» con esa base. Medido (Lucía, 4,500 + AF 113): retención 2025 = 2,292.45; con la renta real (65,412.34) corresponde 2,309.73. Diferencia 17.28 ≈ 113 × 1.09 × 14 %.',
    propuesta: 'Proyectar la gratificación con la misma base que GRATI_001 (sueldo + AF vigente) o, en julio y diciembre, usar el importe de la boleta GRAT ya validada del mes.',
    aceptacion: 'Repetir la corrida 2025 de Lucía: suma de R5TA_001 = 2,309.73 ± 0.05.' },
  { id: 'C-04', titulo: 'Asignación familiar duplicada en el mes de goce parcial', prioridad: 'Media · **consultar con la contadora**', donde: '`bloque8` VAC_001 y `bloque1` ASF_001',
    problema: 'VAC_001 = (sueldo + AF) × días/30 y la mensual paga ASF_001 completa. Medido (Lucía, goce 02–16/02/2026): VAC 2,306.50 + RB 2,250.00 + ASF 113.00 = 4,669.50 frente a 4,613.00 de un mes normal (+56.50).',
    propuesta: 'Si la contadora confirma: prorratear ASF_001 por los días no gozados, o sacar la AF de VAC_001 y dejarla solo en la mensual.',
    aceptacion: 'Febrero 2026 de Lucía: VAC + mensual = 4,613.00.' },
  { id: 'C-05', titulo: 'Boleta impresa descuadrada por redondeo', prioridad: 'Media', donde: '`om_hr_payroll` (líneas sin redondear) y `solse_pe_payroll_ce/report/boleta_pago_report.xml`',
    problema: 'Las líneas guardan importes sin redondear (AFP_COM 71.6565, AFP_PRI 63.3351, R5TA 199.7378, BONO_GRATI 243.8775). Medido en la boleta de Lucía de diciembre 2026: «Total descuentos 797.03» + «Neto 3825.96» = 4,622.99 ≠ 4,623.00. El asiento sí cuadra.',
    propuesta: 'Redondear cada regla a 2 decimales al calcular (`round(result, 2)` o precisión de la moneda en `_get_payslip_lines`), y sumar en el reporte con las líneas redondeadas.',
    aceptacion: 'Ingresos − descuentos = neto exacto en la boleta PDF de los 64 meses medidos; PLAME, planilla y asiento con los mismos importes.' },
  { id: 'C-06', titulo: 'Diario Planillas por defecto', prioridad: 'Media', donde: '`om_hr_payroll_account` (default `journal_id`) · `solse_pe_payroll_ce/models/plataforma_ce.py` · inicializador',
    problema: 'Sin diario en el contrato, la boleta se asienta en el primer diario general. Medido: MISCE/2026/12/0002 («Miscellaneous Operations»); con Planillas elegido a mano: PLLA/2026/12/0001. El diario de la estructura (`hr.payroll.structure.journal_id`) no se usa.',
    propuesta: 'Default de `journal_id` en boleta y lote: diario de la estructura → del contrato → PLLA de la compañía. El inicializador puede completar `version.journal_id` vacío con PLLA.',
    aceptacion: 'Una boleta nueva sin tocar el diario se asienta en PLLA.' },
  { id: 'C-07', titulo: 'Estructura por defecto en el contrato', prioridad: 'Media', donde: '`hr.version.struct_id` · om_hr_payroll `onchange_employee_id` (hr_payslip.py:531-533)',
    problema: 'El alta por la ficha del empleado deja «Salary Structure» vacía y entonces la boleta nueva no carga estructura ni días trabajados (medido).',
    propuesta: 'Default de `struct_id` desde la categoría del pago (`structure_type_id` → estructura NME/NSO) y aviso en la boleta si el contrato no tiene estructura.',
    aceptacion: 'Alta nueva con «Régimen General» → contrato con NME; boleta nueva con días trabajados.' },
  { id: 'C-08', titulo: 'TXT bancario: no bloquear por un trabajador sin cuenta', prioridad: 'Media', donde: '`bancos.py` · `action_generar`',
    problema: 'Un trabajador sin cuenta de sueldo bloquea todo el archivo (ValidationError «Trabajadores sin cuenta de Haberes (sueldo) registrada»). La biblia (§6, caso 16) esperaba «omitido con motivo».',
    propuesta: 'Generar el TXT con los que tienen cuenta y listar los omitidos con su motivo en `resumen` (y opcionalmente un modo estricto).',
    aceptacion: 'Con Héctor sin cuenta: se genera el TXT de Lucía y el resumen dice «Omitido: Héctor … sin cuenta de sueldo».' },
  { id: 'C-09', titulo: 'Días laborados con feriados en boleta y .jor', prioridad: '**Consultar con la contadora**', donde: '`wizard/plame.py` (.jor) y boleta PDF',
    problema: 'Diciembre 2026, mes pagado completo: la boleta y el .jor declaran 20 días / 160 h (23 hábiles − feriados 8, 9 y 25 como GLOBAL).',
    propuesta: 'Según respuesta: sumar los feriados pagados a los días declarados, o mantener y documentar.',
    aceptacion: 'Definido por la contadora; corrida de diciembre 2026.' },
  { id: 'C-10', titulo: 'La tardanza no reduce la base afecta', prioridad: '**Consultar con la contadora**', donde: '`bloque10` TARD_001 (y TAR_001 de asistencia)',
    problema: 'TARD_001 descuenta del neto (30 min → 4.58) pero ONP/AFP y 5.ª se calculan sobre la RB completa (medido: ONP sobre 2,389.75).',
    propuesta: 'Si corresponde, mover la tardanza a la categoría que reduce la remuneración afecta (como FALTA).',
    aceptacion: 'Según respuesta.' },
  { id: 'C-11', titulo: 'Renta de 5.ª en el mes de vacaciones', prioridad: 'Baja', donde: 'R5TA_001',
    problema: 'Medido: febrero 2026 retiene 12.77 (normal 177.77): la proyección multiplica el INA reducido por los meses restantes y la boleta VAC del mismo mes no entra en lo percibido. Se recupera desde marzo.',
    propuesta: 'Incluir en la proyección las boletas validadas del mes en curso (VAC) o proyectar con la remuneración del contrato en lugar del INA del mes.',
    aceptacion: 'Febrero 2026 de Lucía con retención del orden de los meses vecinos.' },
  { id: 'C-12', titulo: 'TXT bancario con tildes', prioridad: 'Baja', donde: '`bancos.py` (codificación latin-1)',
    problema: 'Los nombres salen con tildes (Héctor, Lucía) codificados en latin-1.',
    propuesta: 'Normalizar a ASCII mayúsculas sin tildes si el banco lo exige (como ya hace el PLAME de 4.ª).',
    aceptacion: 'TXT solo con caracteres ASCII.' },
  { id: 'C-13', titulo: 'La opción Scotiabank genera el TXT con formato de Interbank', prioridad: '**Alta**', donde: '`solse_pe_payroll_ce/wizard/bancos.py` · `action_generar` (l. 150-162)',
    problema: 'Verificado en el código: el campo `banco` ofrece BCP, Interbank y **Scotiabank** (l. 80-83), pero `action_generar` hace `if self.banco == \'bcp\': _generar_bcp(...) else: _generar_interbank(...)`. Elegir Scotiabank produce un archivo con formato Interbank y nombre «ABONO_SCOTIABANK_…», sin aviso; `_generar_scotiabank` (l. 272) nunca se llama.',
    propuesta: 'Despachar por banco (bcp / interbank / scotiabank) y, mientras un formato no esté validado, ocultarlo del selector o bloquearlo con un mensaje claro.',
    aceptacion: 'Elegir Scotiabank genera el formato de Scotiabank (o un aviso de «no disponible»), nunca el de Interbank.' },
].forEach((m) => agregar(mejora(m)));

// Interfaz
agregar(h1('2. Mejoras de interfaz'));
[
  { id: 'U-01', titulo: 'Planes EPS: la lista solo muestra el ID', prioridad: '**Alta**', donde: '`solse_pe_payroll_ce/models/maestros.py` (eps.management) y su vista lista',
    problema: 'Medido: la lista «Planes EPS» tiene una sola columna «ID» y el registro se muestra como «eps.management,1» (el modelo no tiene `name` ni `_rec_name`). En la ficha del trabajador el plan EPS tampoco se identifica.',
    propuesta: '`_rec_name = \'entity\'` (o `_compute_display_name` «Entidad – póliza») y lista con Entidad, N.° de póliza, inicio, fin, tasa empleador, tasa trabajador y cantidad de empleados.',
    aceptacion: 'La lista y el campo del trabajador muestran «PACIFICO EPS (DEMO)».' },
  { id: 'U-02', titulo: 'Contratos: la lista no muestra al trabajador', prioridad: '**Alta**', donde: 'Nómina › Empleados › Contratos (hr.version, acción de om_hr_payroll)',
    problema: 'Medido: cada fila se llama por su fecha («1 ene. 2025») y la lista no tiene la columna del empleado: con 28 contratos no se distingue de quién es cada uno.',
    propuesta: 'Agregar `employee_id` como primera columna, agrupar por empleado y mostrar fechas de inicio y fin, sueldo, estructura y régimen laboral.',
    aceptacion: 'La lista de contratos se lee sin abrir cada registro.' },
  { id: 'U-03', titulo: 'Reglas salariales: filas repetidas, sin estructura, con reglas de India', prioridad: '**Alta**', donde: 'Nómina › Configuración › Reglas salariales',
    problema: 'Medido: 135 reglas; la misma regla aparece varias veces (copia por estructura: Reglas Básicas 30, NME 29, NSO 29, VAC 21…) sin columna de estructura, y aparecen reglas de India de om_hr_payroll (HRA «House Rent Allowance», DA, Travel, Meal, Medical, sin estructura).',
    propuesta: 'Columna y agrupación por estructura; filtro por defecto «Estructuras peruanas»; archivar en la instalación las reglas sin estructura ajenas a Perú (HRA, DA, Travel, Meal, Medical).',
    aceptacion: 'La lista abre agrupada por estructura y sin reglas de India.' },
  { id: 'U-04', titulo: 'Maestros SUNAT: solo la abreviatura', prioridad: 'Media', donde: 'Listas de T8 (type.contract), T9 (academic.degree), T17 (low.reason), T35 (special.situation); T19 sin código',
    problema: 'Medido: estas listas muestran solo `name` (la abreviatura); el **código SUNAT** y la descripción existen en el modelo pero no se ven, y el desplegable del trabajador tampoco muestra el código.',
    propuesta: 'Listas con Código · Abreviatura · Descripción; `display_name` = «[código] descripción» (como ya hace Conceptos PLAME T22); búsqueda por código.',
    aceptacion: 'En la ficha, «Motivo de baja» muestra p. ej. «[01] RENUNCIA».' },
  { id: 'U-05', titulo: 'Registros que se muestran como «modelo,id»', prioridad: 'Media', donde: '`solse.payroll.mapeo.contable`, `mintra.contract`, asistentes',
    problema: 'Medido: el mapeo contable se muestra «solse.payroll.mapeo.contable,1» (en la miga de pan al abrirlo); T12 no tiene nombre y su lista solo tiene la columna ID.',
    propuesta: '`_compute_display_name` en el mapeo («RB_001 → 6211 / 4111») y `_rec_name` en T12 (`mintra_description`).',
    aceptacion: 'Ningún registro de nómina se muestra como «modelo,id».' },
  { id: 'U-06', titulo: 'Textos en inglés y traducciones erróneas', prioridad: 'Media', donde: 'om_hr_payroll i18n/es (o un `es_PE.po` en solse_pe_payroll_ce)',
    problema: 'Medido en la interfaz en español: boleta nombrada «Salary Slip of … for diciembre-2026»; campos «Salary Structure», «Salary Journal», «Scheduled Pay», «Employee Category», «Analytic Account», «Employment Version/Contract»; días «Normal Working Days paid at 100%» y «Global Leaves»; botón del lote «Marcar como echo»; `credit_note` traducido como «Factura rectificativa».',
    propuesta: 'Traducciones: «Boleta de {empleado} – {mes año}», «Estructura salarial», «Diario de planillas», «Periodicidad de pago», «Contrato», «Días laborados (100 %)», «Feriados», «Marcar como hecho», «Boleta rectificativa».',
    aceptacion: 'Ningún texto en inglés en boleta, lote y contrato con idioma es_PE.' },
  { id: 'U-07', titulo: 'Campos de India en el contrato', prioridad: 'Media', donde: 'Formulario de hr.version (om_hr_payroll)',
    problema: 'Medido: el contrato muestra «Beneficios mensuales en efectivo» con HRA, DA, travel_allowance, meal_allowance, medical_allowance y other_allowance, que no aplican en Perú.',
    propuesta: 'Ocultarlos en la vista heredada de solse_pe_payroll_ce.',
    aceptacion: 'El contrato solo muestra datos peruanos.' },
  { id: 'U-08', titulo: 'Editor de parámetros estructurados', prioridad: 'Media', donde: 'hr.rule.parameter.value (`parameter_value` texto)',
    problema: 'Las comisiones, tramos y factores se escriben como texto Python (p. ej. «{\'habitat\': 0.0147, \'integra\': 0.0155, …}»). Es fácil equivocarse y el error recién aparece al calcular la boleta (ver V-01).',
    propuesta: 'Vista amigable: para parámetros tipo diccionario, una tabla clave/valor; para tramos, filas «hasta UIT / tasa»; conservar el texto como respaldo técnico.',
    aceptacion: 'Un usuario de RR. HH. actualiza la comisión de una AFP sin escribir sintaxis.' },
  { id: 'U-09', titulo: 'Menú de parámetros duplicado', prioridad: 'Baja', donde: 'menu_views.xml (payroll_base y payroll_ce)',
    problema: '«Parámetros de Nómina PE» aparece en Configuración y en Nómina PE (misma acción).',
    propuesta: 'Dejar uno solo (Nómina PE) o renombrar.',
    aceptacion: 'Un solo acceso.' },
].forEach((m) => agregar(mejora(m)));
agregar(nota('Pantallas de referencia para U-01 a U-03: capturas `p06_01_planes_eps.png`, `p09_03_reglas_salariales.png` y la lista de Contratos (Nómina › Empleados › Contratos) en `manuales_ce/capturas/`.', 'nota'));

// Validaciones
agregar(h1('3. Validaciones y controles'));
[
  { id: 'V-01', titulo: 'Validar el valor de los parámetros al guardar', prioridad: '**Alta**', donde: '`solse_pe_payroll_base/models/hr_rule_parameter.py` · `_verificar_valor` (l. 197)',
    problema: 'La restricción solo comprueba que el texto no esté vacío; el valor se evalúa recién en la boleta con `ast.literal_eval`. Un valor escrito con coma de miles, como «1,230», se guarda sin error y `literal_eval` lo convierte en la tupla (1, 230): la regla falla o calcula mal en todas las boletas.',
    propuesta: 'En la restricción: ejecutar `literal_eval` y validar el tipo esperado por parámetro (número, dict con claves AFP, lista de tramos, dict de factores), con mensaje claro.',
    aceptacion: 'Guardar «1,230» en RMV muestra «Use punto decimal y sin separador de miles».' },
  { id: 'V-02', titulo: 'Aviso previo de vigencias faltantes', prioridad: 'Media', donde: 'hr.payslip `compute_sheet` / lote',
    problema: 'Hoy la falta de vigencia aparece como «Wrong python code defined for salary rule AFP - Comisión (AFP_COM_001)…» (error técnico de om_hr_payroll).',
    propuesta: 'Antes de calcular, verificar las vigencias que usarán las reglas a la fecha de la boleta y mostrar un mensaje funcional: «Falta registrar la comisión AFP vigente al 31/01/2025 (Nómina PE › Parámetros)».',
    aceptacion: 'Mensaje funcional en lugar del error de regla.' },
  { id: 'V-03', titulo: 'Alertas de RMA y RMV visibles', prioridad: 'Baja', donde: 'payroll_base (cron RMA de 95 días)',
    problema: 'La alerta de la RMA es una actividad sobre el parámetro: poco visible. Ninguna alerta para RMV/UIT al inicio de año.',
    propuesta: 'Banda de aviso en la lista de boletas y lotes cuando la RMA tenga más de 95 días o falte la UIT del año en curso.',
    aceptacion: 'El aviso aparece al abrir Nóminas del empleado.' },
].forEach((m) => agregar(mejora(m)));

// Calidad
agregar(h1('4. Calidad, datos y demo'));
[
  { id: 'Q-01', titulo: 'La demo activa SENATI en la compañía donde corre', prioridad: 'Media', donde: '`solse_pe_payroll_ce_demo/models/seeder.py:125`',
    problema: 'El sembrador hace `compania.afecto_senati = True`. En contable19 FM SYSTEMS (servicios) quedó afecta a SENATI por una siembra antigua del asistente «Datos de prueba»; todas sus boletas llevan SENATI_001.',
    propuesta: 'Que la demo solo toque compañías del laboratorio (`solse_es_demo`) y que el asistente «Datos de prueba» no aparezca en compañías reales.',
    aceptacion: 'Correr la demo no cambia `afecto_senati` de una compañía real.' },
  { id: 'Q-02', titulo: 'Maestro T12 sin datos', prioridad: 'Media', donde: '`solse_pe_payroll_ce/data/` (falta mintra_contract)',
    problema: 'Medido: `mintra.contract` con 0 registros y sin archivo de datos; el campo del contrato queda vacío.',
    propuesta: 'Cargar la tabla 12 de la Planilla Electrónica (CSV como work.occupation).',
    aceptacion: 'Contratos MINTRA (T12) con sus códigos SUNAT.' },
  { id: 'Q-03', titulo: 'Estructuras con compañía fija', prioridad: 'Baja', donde: 'hr.payroll.structure (inicializador)',
    problema: 'Medido: las 9 estructuras tienen `company_id` = compañía 1 y las usan las boletas de otras compañías (el caso NOMINA corre en «servicios» al 100 %).',
    propuesta: 'Estructuras sin compañía (compartidas) o una copia por compañía, coherente con N-4.',
    aceptacion: 'Usuario restringido a otra compañía calcula boletas sin error de acceso.' },
  { id: 'Q-04', titulo: 'Casos QA para las salidas sin cobertura', prioridad: 'Media', donde: 'Laboratorio (`solse_pe_demo_libros`)',
    problema: 'Los casos actuales no cubren TXT bancarios, AFPnet ni la boleta PDF; por eso C-01, C-05 y C-08 no se detectaron.',
    propuesta: 'Caso «BANCOS»: TXT BCP/Interbank haberes y CTS con cuentas propias e interbancarias y un trabajador sin cuenta; caso «BOLETA»: cuadre ingresos − descuentos = neto.',
    aceptacion: 'Los casos nuevos fallan con el código actual y pasan con las correcciones.' },
].forEach((m) => agregar(mejora(m)));

// Nuevas
agregar(
  h1('5. Funcionalidades nuevas (cobertura)'),
  p('Lo que hoy **no existe en el código** y el manual (capítulo 23) y el video resumen (tarjeta «Lo que hoy no cubre la localización») declaran como no cubierto. Cada ficha indica qué se verificó en el código para afirmar que falta.'),
);
[
  { id: 'N-01', titulo: 'Subsidios (incapacidad temporal y maternidad)', prioridad: 'Alta (aparece en el video y el manual)', donde: '`solse_pe_payroll_ce`: reglas, `wizard/plame.py` (.snl), tipos de ausencia',
    problema: 'Verificado en el código: no hay reglas de subsidio; la categoría BSM_001 (subsidios) existe pero ninguna regla la usa; `plame.py` escribe el `.snl` vacío con el comentario «suspensiones aún no gestionadas» (l. 14-16 y 156). Medido: el `.snl` de diciembre 2026 sale vacío.',
    propuesta: 'Tipos de ausencia subsidiada con su código de suspensión (tabla 21: 21 incapacidad temporal, 22 maternidad, etc.); los días subsidiados no pagados en la mensual; regla de subsidio (pagado por el empleador y recuperable de EsSalud) en BSM_001; el `.snl` con tipo de documento, documento, código de suspensión y días.',
    aceptacion: 'Trabajador con 10 días de descanso médico: la mensual paga 20 días + subsidio de 10, el `.snl` trae la línea con el código de suspensión y 10 días, y el `.jor` declara 20 días.' },
  { id: 'N-02', titulo: 'Exportación del T-Registro', prioridad: 'Media (aparece en el video y el manual)', donde: 'Nuevo asistente en `solse_pe_payroll_ce`',
    problema: 'Verificado: no hay asistente ni exportación; solo campos y etiquetas «Identificación T-Registro» y «Perú - Datos laborales (T-Registro / PLAME)» (hr_employee.py:6, hr_version_views.xml:12).',
    propuesta: 'Asistente de altas, bajas y modificaciones que genere los archivos de importación del T-Registro (estructuras de datos personales, datos laborales, periodos, derechohabientes) a partir de la ficha, el contrato y los derechohabientes ya cargados; validación previa de datos faltantes.',
    aceptacion: 'Alta de Lucía (99999901) exportada; los archivos se importan en el T-Registro de prueba sin rechazos (validación externa como el PDT).' },
  { id: 'N-03', titulo: 'Indemnización por despido arbitrario', prioridad: 'Media (aparece en el video y el manual)', donde: 'Estructura LIQ (`bloque9`)',
    problema: 'Verificado: la estructura Liquidación solo tiene vacaciones, gratificación, bonificación y CTS truncas (medido: Carmen, neto 3,547.22); no hay regla de indemnización.',
    propuesta: 'Regla opcional activada por el motivo de baja (T17) o por una entrada: 1.5 remuneraciones por año completo (proporcional por meses y días) con tope de 12 remuneraciones (D.S. 003-97-TR, art. 38); para plazo fijo, 1.5 por mes restante con el mismo tope.',
    aceptacion: 'Cese con despido arbitrario de un trabajador con 1 año y 8 meses: indemnización calculada y verificada por la contadora.' },
  { id: 'N-04', titulo: 'Regularización de la renta de 5.ª al cese', prioridad: 'Media (aparece en el video y el manual)', donde: 'Estructura LIQ / R5TA_001',
    problema: 'Verificado: la estructura LIQ excluye R5TA y no recalcula el impuesto anual con los ingresos reales del año al cese.',
    propuesta: 'Regla en LIQ que calcule el impuesto anual con lo percibido + la liquidación (sin proyección) y retenga la diferencia contra lo ya retenido.',
    aceptacion: 'Cese en agosto: retención total del año igual al impuesto anual recalculado con los ingresos reales.' },
  { id: 'N-05', titulo: 'Prima de Vida Ley', prioridad: 'Baja', donde: '`life.insurance` + nueva regla',
    problema: 'Verificado: existe el catálogo (entidad, póliza, vigencia, tasa, importe, empleados) pero ninguna regla salarial lo usa; en la base el catálogo está vacío.',
    propuesta: 'Regla de aporte del empleador (tasa sobre la remuneración o importe fijo) con cuentas 6273/46xx, solo para los empleados de la póliza vigente.',
    aceptacion: 'Trabajador en la póliza: aporte del empleador en la boleta y en el asiento.' },
  { id: 'N-06', titulo: 'TXT de Scotiabank y Banco de la Nación', prioridad: 'Media (aparece en el video y el manual)', donde: '`wizard/bancos.py` (l. 5-13 lo declara pendiente)',
    problema: 'Verificado: el selector ofrece BCP, Interbank y Scotiabank, y existe `_generar_scotiabank` (l. 272), pero nunca se llama (ver C-13). Banco de la Nación no existe.',
    propuesta: 'Conectar Scotiabank (haberes y CTS) y agregar Banco de la Nación con sus formatos oficiales; resolver antes C-01 y C-13.',
    aceptacion: 'TXT de prueba aceptado por la banca por internet de cada banco (validación externa).' },
  { id: 'N-07', titulo: 'Pago de la planilla', prioridad: 'Baja', donde: 'hr.payslip / hr.payslip.run (Community)',
    problema: 'Verificado: en Community no hay flujo de pagos de nómina; `paid_amount` es un campo manual con valor 0 (payroll_base).',
    propuesta: 'Botón en el lote para registrar el pago (asiento 4111 contra banco) a partir del TXT generado, y marcar las boletas como pagadas.',
    aceptacion: 'Lote de diciembre pagado: cuenta 4111 en cero para esos trabajadores.' },
  { id: 'N-08', titulo: 'Envío masivo de boletas y constancias', prioridad: 'Baja', donde: 'hr.payslip.run · reportes',
    problema: 'La boleta se imprime una por una; om_hr_payroll tiene `action_send_email` por boleta pero no hay envío desde el lote con la boleta PE, ni constancia de depósito de CTS ni certificado de retenciones de 5.ª.',
    propuesta: 'Envío desde el lote con la plantilla «Boleta de Pago (PE)»; reportes de constancia de CTS y certificado anual de 5.ª.',
    aceptacion: 'Lote de diciembre: cada trabajador recibe su boleta en PDF.' },
].forEach((m) => agregar(mejora(m)));

agregar(
  h2('Q-05 · Cobertura pendiente de medición'),
  tabla(['Campo', 'Detalle'], [
    ['Prioridad', 'Media'],
    ['Módulo / archivo', 'Laboratorio (`solse_pe_demo_libros`) y casos de `solse_pe_payroll_ce_demo`'],
    ['Problema', 'Funciones que existen pero que ni el laboratorio ni este manual midieron: **reparto de utilidades** (asistente D.Leg. 892), **microempresa** (sin gratificación ni CTS), **alerta de la RMA** a los 95 días, **AFPnet** solo con afiliados con CUSPP, **checksum** del TXT BCP, nómina **semanal** de obreros en FM SYSTEMS y **descuento judicial / cuota sindical** fuera de la demo. Son los casos 7, 15, 16, 17 y 19 abiertos en la biblia (§6).'],
    ['Propuesta', 'Agregar estas filas a los casos NOMINA y PLAME (o un caso BANCOS, ver Q-04).'],
    ['Criterio de aceptación', 'Cada función con al menos un valor esperado comparado en el laboratorio.'],
  ], [2200, 7438]),
  espacio(),
);

// Plan de re-ejecución
agregar(
  h1('6. Al confirmar los cambios: qué se vuelve a correr'),
  p('Cuando el chat de desarrollo entregue las correcciones, la sesión del manual vuelve a medir y actualiza manual y videos con este orden:'),
  pasos([
    'Actualizar los módulos en contable19 (antes, rechazar las vacaciones aprobadas de prueba: N-6 de la biblia).',
    'Laboratorio: Limpiar, Sembrar, Generar y Comparar los cuatro casos (deben seguir al 100 %) y los casos nuevos de Q-04 y Q-05.',
    'FM SYSTEMS: recalcular la planilla de enero de 2025 a diciembre de 2026 (borrar y regenerar las 64 boletas) y comparar contra `anio_completo_fm.json`. Las diferencias esperadas son solo las de C-03, C-04, C-05 y C-11.',
    'Repetir los archivos legales: PLAME, AFPnet, planilla y TXT de haberes y de CTS (C-01, C-08 y C-12).',
    'Recapturar las pantallas afectadas por U-01 a U-09 y por las funcionalidades nuevas, y volver a difuminar.',
    'Manual: actualizar los capítulos 4, 10, 13, 15, 17, 21 y 23, y el Anexo A (cerrar las observaciones resueltas).',
    'Video resumen: regrabar los clips afectados y cambiar la tarjeta «Lo que hoy no cubre» según lo que se haya implementado. Promo: agregar escenas si entran N-01 o N-02.',
  ]),
  tabla(['Mejora', 'Capítulo del manual', 'Segmento del video'], [
    ['C-01, C-08, C-12, N-06', '21 Reportes (pago a bancos), 15 CTS', 'Nuevo clip de pago a bancos'],
    ['C-02, V-01, V-02, U-08', '4 Parámetros', 'Parámetros con vigencia'],
    ['C-03, C-11', '13 Renta de 5.ª', '—'],
    ['C-04, C-09', '17 Vacaciones, 18 Feriados', 'Vacaciones'],
    ['C-05, C-06, C-07', '7 Contabilidad, 8 Alta, 10 Boleta', 'Alta del trabajador; boleta, asiento y PDF'],
    ['U-01 a U-07, U-09', '3, 5, 6, 8, 9', 'Menú Nómina PE'],
    ['N-01 a N-05, N-07, N-08', '16 Liquidación, 21, 23', 'Tarjeta «Alcance» y clips nuevos'],
  ], [3000, 3600, 3038]),
);

// ---------- Índice estático con enlaces internos ----------
const entradasIndice = indice.map(({ nivel, texto, id }) => new Paragraph({
  spacing: { before: nivel === 1 ? 120 : 0, after: nivel === 1 ? 40 : 20 },
  indent: { left: nivel === 1 ? 0 : 400 },
  children: [new InternalHyperlink({ anchor: id, children: [new TextRun({ text: texto, bold: nivel === 1, size: nivel === 1 ? 22 : 20, color: nivel === 1 ? COLOR : '333333' })] })],
}));
contenido.splice(contenido.indexOf('INDICE'), 1, ...entradasIndice);

// ---------- Documento ----------
const documento = new Document({
  creator: 'SOLSE - Implementación Odoo',
  title: 'Mejoras de la nómina peruana - Odoo 19 Community',
  description: 'Documento de mejoras para el desarrollo de la nómina peruana Community',
  styles: {
    default: { document: { run: { font: 'Calibri', size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 36, bold: true, color: COLOR }, paragraph: { spacing: { before: 240, after: 200 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 28, bold: true, color: '333333' }, paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true, run: { size: 24, bold: true, color: COLOR }, paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ],
  },
  numbering: {
    config: [
      { reference: 'pasos', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] },
      { reference: 'vinetas', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 540, hanging: 360 } } } }] },
    ],
  },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838, orientation: PageOrientation.PORTRAIT }, margin: { top: 1134, bottom: 1134, left: 1134, right: 1134 } } },
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Mejoras · Nómina Peruana Odoo 19 Community', size: 16, color: '888888' })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Página ', PageNumber.CURRENT, ' de ', PageNumber.TOTAL_PAGES], size: 16, color: '888888' })] })] }) },
    children: contenido,
  }],
});

Packer.toBuffer(documento).then((buffer) => {
  fs.writeFileSync(SALIDA, buffer);
  console.log(`Documento generado: ${SALIDA}`);
});
