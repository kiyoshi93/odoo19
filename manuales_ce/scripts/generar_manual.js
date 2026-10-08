// Genera el manual de Nómina PE (Odoo 19 Community + localización SOLSE) en formato Word.
// Uso: NODE_PATH=<carpeta con docx> node manuales_ce/scripts/generar_manual.js
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, LevelFormat, Bookmark, InternalHyperlink, PageBreak, Header, Footer, PageNumber,
  PageOrientation,
} = require('docx');

const CAPTURAS = path.join(__dirname, '..', 'capturas');
const SALIDA = path.join(__dirname, '..', 'Manual_Nomina_PE_Odoo19_Community.docx');
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


// ---------- Datos medidos (corridas en contable19, 2026-10-07/08) ----------
const EVIDENCIAS = path.join(__dirname, '..', 'evidencias');
const anioCompleto = JSON.parse(fs.readFileSync(path.join(EVIDENCIAS, 'anio_completo_fm.json'), 'utf8'));
const dinero = (valor) => (valor === undefined || valor === null || valor === '') ? '—'
  : Number(valor).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const importe = (fila, codigo) => {
  const linea = fila.lineas.find(([c]) => c === codigo);
  return linea ? dinero(linea[1]) : '—';
};
const MESES_CORTOS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'set', 'oct', 'nov', 'dic'];
const periodoTexto = (periodo) => `${MESES_CORTOS[Number(periodo.slice(5)) - 1]}-${periodo.slice(2, 4)}`;

// Portada
agregar(
  new Paragraph({ spacing: { before: 2400 }, children: [] }),
  new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: 'MANUAL DE USUARIO', bold: true, size: 28, color: '888888' })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Nómina Peruana en Odoo 19 Community', bold: true, size: 56, color: COLOR })] }),
  new Paragraph({ spacing: { after: 600 }, children: [new TextRun({ text: 'Localización SOLSE sobre om_hr_payroll: planilla, aportes, renta de 5.ª, gratificaciones, CTS, liquidación, vacaciones, feriados, asistencias, PLAME, AFPnet, pago a bancos y recibos por honorarios', size: 28, color: '444444' })] }),
  new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: COLOR, space: 4 } }, children: [] }),
  espacio(),
  tabla(['Dato', 'Valor'], [
    ['Versión de Odoo', '19.0 Community'],
    ['Módulos documentados', 'om_hr_payroll 19.0.1.0 · om_hr_payroll_account 19.0.0.0 · solse_pe_payroll_base 19.0.1.6.0 · solse_pe_payroll_ce 19.0.1.8.0 · solse_pe_payroll_asistencia 19.0.1.0.0 · solse_pe_plame_rxh 19.0.1.2.0 · solse_pe_plame_4ta 19.0.1.0.0'],
    ['Base de medición', 'Base de pruebas contable19: compañía FM SYSTEMS SOLUTIONS EIRL (recorrido del manual) y compañía «SOLSE Demo Servicios S.A.C.» del laboratorio de demostración (casos medidos)'],
    ['Público', 'Usuarios de RR. HH. y contabilidad, e implementadores'],
    ['Fecha', 'Octubre de 2026 · versión 1'],
  ], [2600, 7038]),
  espacio(),
  nota('Todas las cifras de este manual salen de una **corrida real** en la base de pruebas (7 y 8 de octubre de 2026); ninguna se dedujo a mano. Los trabajadores del recorrido son **ficticios** y sus DNI son **sintéticos** (`99999901` y `99999902`). En las capturas del laboratorio de demostración, los DNI de sus trabajadores y los RUC de sus prestadores aparecen difuminados.'),
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ children: [new TextRun({ text: 'Contenido', bold: true, size: 32, color: COLOR })], spacing: { after: 200 } }),
  'INDICE',
);

// 1. Introducción
agregar(
  h1('1. Introducción'),
  p('Este manual explica cómo procesar la planilla peruana en **Odoo 19 Community** con la localización SOLSE. A diferencia de Enterprise, Community no trae nómina: la base es el módulo comunitario `om_hr_payroll` (Odoo Mates) y SOLSE le agrega la capa peruana (parámetros con vigencia, reglas salariales, maestros SUNAT, archivos PLAME, AFPnet y TXT bancarios).'),
  h2('1.1 Cómo leer este manual'),
  vinetas([
    'Los capítulos 2 a 9 son de **configuración**: se hacen una vez, al implementar.',
    'Los capítulos 10 a 20 son el **proceso mensual**: boletas, lote, beneficios y novedades.',
    'Los capítulos 21 y 22 son las **salidas legales**: planilla, PLAME, AFPnet, bancos y 4.ª categoría.',
    'El capítulo 23 dice **qué no cubre** la localización; el 24 es la lista de cierre mensual.',
    'Los recuadros **Para implementadores** y el **Anexo A** recogen observaciones medidas que conviene conocer antes de salir a producción.',
  ]),
  h2('1.2 La regla de oro: los acumulados leen boletas VALIDADAS'),
  p('La renta de 5.ª, el sexto de gratificación de la CTS y el descuento del adelanto se calculan con acumulados que **solo leen boletas en estado Hecho**. El orden del proceso importa: primero se validan adelantos, gratificaciones y vacaciones, y después se calcula la mensual (capítulo 11).'),
  h2('1.3 De dónde salen las cifras'),
  tabla(['Escenario', 'Dónde', 'Qué mide'], [
    ['Recorrido del manual', 'FM SYSTEMS SOLUTIONS EIRL', 'Dos trabajadores sintéticos con planilla completa de enero de 2025 a diciembre de 2026: 64 boletas (mensuales, gratificaciones, CTS y vacaciones)'],
    ['Caso NOMINA', 'Laboratorio · SOLSE Demo Servicios', '13 trabajadores de julio–agosto de 2026: aportes, 5.ª, gratificación, adelanto, vacaciones, judicial, sindicato, liquidación y asiento. **100 % conforme** (736 celdas comparadas en los cuatro casos)'],
    ['Caso ASISTENCIA', 'Laboratorio', 'Tardanzas, faltas y faltas parciales de septiembre de 2026. **100 %**'],
    ['Casos PLAME y PLAME-RXH', 'Laboratorio', 'ZIP del PDT con .rem, .jor, .snl, .ps4 y .4ta de julio de 2026. **100 %**'],
  ], [2200, 2500, 4938]),
);

// 2. Instalación
agregar(
  h1('2. Instalación de los módulos'),
  p('Instale desde **Aplicaciones** (modo desarrollador) en este orden. `om_hr_payroll` y `om_hr_payroll_account` no vienen en los paquetes SOLSE: deben estar en el `addons_path`.'),
  tabla(['Orden', 'Módulo', 'Para qué'], [
    ['1', '`om_hr_payroll` + `om_hr_payroll_account`', 'Nómina base Community y su contabilización'],
    ['2', '`solse_pe_payroll_base`', 'Capa de compatibilidad: parámetros con vigencia, acumulados por SQL, días no pagados'],
    ['3', '`solse_pe_payroll_ce`', 'Núcleo peruano: estructuras, reglas, maestros, PLAME, AFPnet, bancos, planilla, utilidades'],
    ['4', '`solse_pe_payroll_asistencia`', 'Tardanzas y faltas desde Asistencias (opcional)'],
    ['5', '`solse_pe_plame_rxh` y `solse_pe_plame_4ta`', 'PLAME de recibos por honorarios; el segundo los añade al ZIP de la planilla (opcional)'],
  ], [900, 3600, 5138]),
  nota('Las variantes Community y Enterprise **no se pueden mezclar**: `solse_pe_payroll_base` tiene un control previo a la instalación que la bloquea si encuentra la nómina Enterprise de SOLSE (`solse_pe_payroll`), porque ambas siembran los mismos parámetros.', 'importante'),
  h2('2.1 Qué hace el inicializador'),
  p('Al instalar y en **cada actualización**, `solse_pe_payroll_ce` ejecuta su inicializador: crea o repara las estructuras (NME, NSO, NQA, GRAT, CTS, VAC, LIQ), copia las reglas de la plantilla «Reglas Básicas», asigna las cuentas contables por prefijo PCGE, crea el diario **Planillas (PLLA)** y marca el tipo de ausencia **Vacaciones PE (D.Leg. 713)** como no pagado en las mensuales.'),
  nota('Una vacación aprobada impide actualizar los módulos de nómina (N-6 de la biblia): antes de `-u`, rechace o archive las ausencias de prueba.', 'implementador'),
);

// 3. Menú
agregar(
  h1('3. Menú de Nómina'),
  p('Todo está bajo la aplicación **Nómina** (en Community, se abre desde la cuadrícula de aplicaciones).'),
  ...figura('01_menu_principal', 'Aplicaciones de la base de pruebas; la nómina está en «Nómina».'),
  ...figura('p03_01_menu_nomina_pe', 'Menú Nómina PE: maestros SUNAT, seguros, salidas legales y contabilidad de nómina.'),
  ...figura('p03_02_menu_configuracion', 'Menú Configuración de om_hr_payroll: estructuras, reglas y parámetros.'),
  tabla(['Menú', 'Para qué'], [
    ['Nóminas del empleado', 'Boletas individuales (capítulo 10)'],
    ['Procesamientos de nóminas', 'Lotes mensuales (capítulo 11)'],
    ['Nómina PE › Parámetros de Nómina PE', 'UIT, RMV, tasas y topes con fecha de vigencia (capítulo 4)'],
    ['Nómina PE › Maestros SUNAT', 'Tablas T8, T9, T11, T12, T17, T19, T22, T30, T33 y T35 (capítulo 5)'],
    ['Nómina PE › Seguros y EPS', 'Planes EPS y Vida Ley (capítulo 6)'],
    ['Nómina PE › Planilla de sueldos / Pago masivo a bancos / PLAME / AFPnet / Reparto de utilidades', 'Salidas legales (capítulo 21)'],
    ['Nómina PE › Contabilidad de nómina', 'Mapeo PCGE y asignación de cuentas (capítulo 7)'],
  ], [4200, 5438]),
);

// 4. Parámetros
agregar(
  h1('4. Parámetros legales con vigencia'),
  p('Los valores normativos no están escritos en las reglas: viven en **Nómina › Nómina PE › Parámetros de Nómina PE**, cada uno con una lista de **vigencias**. La boleta usa el valor vigente a su fecha final.'),
  ...figura('p04_01_parametros_lista', 'Parámetros agrupados por categoría.'),
  tabla(['Código', 'Concepto', 'Valor en la base (vigente desde)'], [
    ['pe_uit', 'UIT', '5,350 (01/01/2025) · 5,500 (01/01/2026)'],
    ['pe_rmv', 'Remuneración mínima vital', '1,130 (01/01/2025) · **1,230 (01/10/2026, cargado para este manual)**'],
    ['pe_asig_familiar', 'Asignación familiar', '113 (01/01/2025) · **123 (01/10/2026, cargado)**'],
    ['pe_onp_tasa / pe_afp_aporte / pe_afp_prima_seguro', 'ONP / fondo AFP / prima de seguro', '13 % / 10 % / 1.37 %'],
    ['pe_afp_comision_flujo', 'Comisión sobre flujo por AFP', 'Habitat 1.47 %, Integra 1.55 %, Prima 1.60 %, Profuturo 1.69 % (01/01/2026; **01/01/2025 cargado**)'],
    ['pe_afp_rma', 'Remuneración máxima asegurable', '**12,184.88 (01/01/2025)**, **12,209.11 (01/01/2026)**, 12,598.91 (01/04/2026), **12,732.70 (01/10/2026)**'],
    ['pe_essalud_tasa / pe_eps_credito_max', 'EsSalud / tope crédito EPS', '9 % / 25 %'],
    ['pe_renta5_deduccion_uit / pe_renta5_tramos', 'Renta de 5.ª', '7 UIT; 8 %, 14 %, 17 %, 20 %, 30 % (hasta 5, 20, 35, 45 UIT y exceso)'],
    ['pe_grati_bono_essalud / pe_grati_bono_eps', 'Bonificación extraordinaria', '9 % / 6.75 %'],
    ['pe_regimen_factores', 'Factores por régimen', 'general 1.0; pequeña 0.5; micro 0.0 (grati y CTS)'],
  ], [3000, 2600, 4038]),
  h2('4.1 Registrar una vigencia nueva'),
  pasos([
    'Abra el parámetro (por ejemplo **RMV - Remuneración Mínima Vital**).',
    'En la pestaña **Vigencias**, pulse **Agregar una línea**.',
    'Escriba **Vigente desde** (`01/10/2026`) y el **Valor** (`1230`). Guarde.',
  ]),
  ...figura('p04_02_rmv_nueva_vigencia', 'RMV 1,230 desde el 01/10/2026 (D.S. 015-2026-TR) agregada como nueva vigencia.'),
  ...figura('p04_03_rma_vigencias', 'RMA con sus vigencias trimestrales.'),
  p('**Efecto medido:** con la vigencia nueva, la asignación familiar de octubre de 2026 en adelante sale **123.00** (antes 113.00) y la gratificación de diciembre de 2026 de la trabajadora con hijo sube a **4,623.00** (sueldo 4,500 + 123).'),
  nota('Tal como se instala, la nómina de **2025 no se puede calcular** con AFP: la boleta se detiene con «No existe una vigencia del parámetro de nómina "pe_afp_comision_flujo" para la fecha 2025-01-31». Para este manual se cargaron la comisión 2025 y las RMA indicadas en negrita. Son **valores de prueba tomados de fuentes secundarias: verifíquelos en la SBS** antes de usarlos. La RMA no cambia ninguna cifra de los trabajadores de ejemplo, que ganan muy por debajo del tope.', 'importante'),
  nota('La RMA cambia cada trimestre. El módulo programa una actividad de aviso cuando su vigencia supera **95 días**. Revise los parámetros al inicio de cada trimestre y cuando cambie la RMV.', 'implementador'),
);

// 5. Maestros
agregar(
  h1('5. Maestros SUNAT'),
  p('Las tablas de la Planilla Electrónica se cargan con el módulo y se usan en la ficha del trabajador, el contrato y el PLAME.'),
  tabla(['Tabla', 'Menú', 'Registros en la base'], [
    ['T8 Tipos de trabajador', 'Tipos de trabajador (T8)', '26'],
    ['T9 Situación educativa', 'Situación educativa (T9)', '21'],
    ['T11 Sistemas pensionarios', 'Sistemas pensionarios (T11)', '17'],
    ['T12 Contratos MINTRA', 'Contratos MINTRA (T12)', '**0 (vacía: no hay datos en el módulo)**'],
    ['T17 Motivos de baja', 'Motivos de baja (T17)', '21'],
    ['T22 Conceptos PLAME', 'Conceptos PLAME (T22)', '293'],
    ['T30 Ocupaciones', 'Ocupaciones (T30)', '4,643'],
    ['T33 Regímenes laborales', 'Regímenes laborales (T33)', '26'],
    ['T35 Situaciones especiales', 'Situaciones especiales (T35)', '9'],
  ], [3000, 3400, 3238]),
  ...figura('p05_01_maestro_t22', 'Conceptos PLAME (T22): cada regla salarial se vincula a su código.'),
  ...figura('p05_02_maestro_t11', 'Sistemas pensionarios (T11): el código 02 es ONP; las AFP llevan su clave para la comisión.'),
);

// 6. Seguros
agregar(
  h1('6. Seguros: EPS, SCTR y Vida Ley'),
  vinetas([
    '**Planes EPS** (Nómina PE › Seguros y EPS): tasa del empleador y del trabajador. La regla `EPS_CRED_001` aplica el crédito contra EsSalud con tope del 25 %. Medido en el caso NOMINA: aporte EPS **162.59** y crédito **−81.29**.',
    '**SCTR**: casilla **SCTR Pensión** en la ficha del trabajador; tasas en parámetros (salud 1.30 %, pensión 1.70 %). Medido: SCTR salud de un obrero semanal **5.46**.',
    '**Vida Ley**: existe el catálogo, pero **no hay regla salarial** que calcule la prima. En la base el catálogo está vacío.',
  ]),
  ...figura('p06_01_planes_eps', 'Planes EPS.'),
);

// 7. Contabilidad
agregar(
  h1('7. Contabilidad de nómina'),
  p('Cada regla salarial lleva su cuenta al debe y al haber **por compañía**. El inicializador las asigna desde **Mapeo contable PCGE** (prefijos 62/40/41/14) y el asistente **Asignar cuentas contables** las vuelve a aplicar a la compañía que elija.'),
  ...figura('p07_01_mapeo_pcge', 'Mapeo contable PCGE por regla.'),
  ...figura('p07_02_asignar_cuentas', 'Asistente para asignar las cuentas a una compañía.'),
  tabla(['Concepto', 'Debe', 'Haber'], [
    ['Remuneración básica y asignación familiar', '6211', '4111'],
    ['AFP (fondo, comisión, prima)', '4111', '4170'],
    ['ONP', '4111', '4032'],
    ['Renta de 5.ª', '4111', '40173'],
    ['EsSalud (empleador)', '6271', '4031'],
    ['SENATI (empleador)', '6277', '4033'],
    ['Gratificación / vacaciones / CTS (neto)', '6214 / 6215 / 6291', '4114 / 4115 / 4151'],
  ], [4200, 2700, 2738]),
  h2('7.1 Diario de planillas'),
  p('El inicializador crea el diario **Planillas (PLLA)**. En Community, la boleta **no toma el diario de la estructura**: usa el diario del **contrato** (campo **Salary Journal**) o, si está vacío, el primer diario general («Operaciones varias»). Elija **Planillas** en el contrato de cada trabajador, en la boleta o en el lote.'),
  ...figura('p07_03_diario_planillas', 'Diario Planillas (PLLA).'),
  nota('Medido: las boletas calculadas sin diario elegido se asentaron en «Operaciones varias» (MISCE/2026/12/…); con **Planillas** elegido en la boleta o en el lote salieron PLLA/2026/12/0001 y 0002.', 'implementador'),
);

// 8. Alta del trabajador
agregar(
  h1('8. Alta de un trabajador'),
  p('Ejemplo del manual: **Lucía Fernanda Ramos Ticona**, DNI sintético `99999901`, analista contable, ingreso 01/01/2025, sueldo 4,500, AFP Integra (flujo), EsSalud regular y un hijo menor (genera asignación familiar).'),
  h2('8.1 Datos principales y personales'),
  pasos(['**Empleados › Nuevo**: nombre completo y puesto.', 'Pestaña **Personal**: **Número de identificación** = DNI y **Fecha de nacimiento**.']),
  ...figura('p08_01_empleado_nuevo', 'Nombre y puesto.'),
  ...figura('p08_02_personal', 'DNI y fecha de nacimiento en la pestaña Personal.'),
  h2('8.2 Pestaña Nómina PE'),
  pasos([
    '**Identificación T-Registro**: nombres, apellido paterno y materno por separado, situación educativa.',
    '**Sistema pensionario**: SPP INTEGRA; **CUSPP**; **Tipo de comisión AFP** = flujo o mixta (con mixta la comisión sale 0.00: medido en el caso NOMINA).',
    '**Salud**: régimen y, si corresponde, plan EPS. **SCTR Pensión** y **Vida Ley** si aplica.',
    '**Derechohabientes**: agregue al hijo con parentesco **Hijo** y su fecha de nacimiento. La asignación familiar se paga mientras sea menor de 18 años (o con discapacidad).',
  ]),
  ...figura('p08_03_nomina_pe', 'Pensión y salud en la pestaña Nómina PE.'),
  ...figura('p08_04_derechohabientes', 'Derechohabiente que da derecho a la asignación familiar.'),
  h2('8.3 Contrato (versión del empleado)'),
  p('En Odoo 19 el contrato es una **versión** del empleado (`hr.version`). En la pestaña **Nómina** indique la fecha de inicio, el salario y la **Categoría del pago** «Régimen General».'),
  ...figura('p08_05_contrato', 'Inicio del contrato, salario y categoría del pago.'),
  pasos([
    'Abra **Nómina › Empleados › Contratos** y entre al contrato.',
    'Elija **Salary Structure** = **Nómina Mensual Empleados**. Sin estructura, al crear la boleta no se cargan los días trabajados.',
    'Elija **Salary Journal** = **Planillas**.',
    'Complete **Perú - Datos laborales (T-Registro / PLAME)**: régimen laboral, ocupación, tipo de pago y, al cesar, **motivo de baja**.',
  ]),
  ...figura('p08_07_contrato_tregistro', 'Contrato con estructura, diario de planillas y datos T-Registro.'),
  ...figura('p08_06_empleado_guardado', 'Trabajador guardado.'),
);

// 9. Estructuras
agregar(
  h1('9. Estructuras salariales'),
  tabla(['Código', 'Estructura', 'Uso'], [
    ['NME', 'Nómina Mensual Empleados', 'Planilla mensual'],
    ['NSO', 'Nómina Semanal Obreros', 'Planilla semanal (remuneración por semana comercial)'],
    ['NQA', 'Nómina Quincenal / Adelanto', 'Adelanto quincenal (porcentaje del contrato)'],
    ['GRAT', 'Gratificaciones', 'Julio y diciembre'],
    ['CTS', 'CTS', 'Mayo y noviembre'],
    ['VAC', 'Vacaciones', 'Boleta de los días de goce'],
    ['LIQ', 'Liquidación', 'Truncas al cese'],
  ], [1100, 3300, 5238]),
  ...figura('p09_01_estructuras', 'Estructuras salariales.'),
  ...figura('p09_02_estructura_nme', 'Reglas de la estructura mensual.'),
);

// 10. Boleta individual
const lucia = { RB: '4,500.00', ASF: '123.00', GROSS: '4,623.00', APO: '462.30', COM: '71.66', PRI: '63.34', R5TA: '199.74', NET: '3,825.96', ESSALUD: '416.07', SENATI: '34.67' };
agregar(
  h1('10. Boleta de pago individual'),
  pasos([
    '**Nóminas del empleado › Nuevo**: elija el trabajador y el **Período** (01/12/2026 – 31/12/2026). La estructura y los días trabajados se cargan del contrato.',
    'En **Información contable**, elija el diario **Planillas**.',
    'Guarde y pulse **Calcular hoja**.',
    'Revise **Cálculo de la nómina** y pulse **Confirmar**: la boleta pasa a **Hecho** y genera el asiento.',
  ]),
  ...figura('p10_04_boleta_nueva', 'Boleta nueva: estructura y días trabajados traídos del contrato.'),
  ...figura('p10_05_boleta_calculada', 'Líneas calculadas.'),
  tabla(['Concepto', 'Código', 'Importe'], [
    ['Remuneración básica', 'RB_001', lucia.RB], ['Asignación familiar', 'ASF_001', lucia.ASF], ['Total ingresos', 'GROSS', lucia.GROSS],
    ['AFP – aporte obligatorio (10 %)', 'AFP_APO_001', lucia.APO], ['AFP – comisión Integra (1.55 %)', 'AFP_COM_001', lucia.COM], ['AFP – prima de seguro (1.37 %)', 'AFP_PRI_001', lucia.PRI],
    ['Renta de 5.ª categoría', 'R5TA_001', lucia.R5TA], ['**Neto a pagar**', 'NET', `**${lucia.NET}**`],
    ['EsSalud (empleador, 9 %)', 'ESSALUD_001', lucia.ESSALUD], ['SENATI (empleador, 0.75 %)', 'SENATI_001', lucia.SENATI],
  ], [4600, 2200, 2838]),
  p('La boleta creada desde la interfaz coincidió **al centavo** con la calculada por el proceso automático del mismo mes.'),
  ...figura('p10_06_boleta_confirmada', 'Boleta confirmada con su asiento en el diario Planillas.'),
  h2('10.1 Boleta impresa (D.S. 001-98-TR)'),
  p('Botón **Imprimir** › **Boleta de Pago (PE)**: encabezado de empleador y trabajador, días y horas, tres columnas (ingresos, descuentos, aportes) y el neto en letras.'),
  ...figura('p10_07_boleta_pdf', 'Boleta de pago de diciembre de 2026.', 600),
  nota('En la boleta impresa, **Total descuentos 797.03 + Neto 3,825.96 = 4,622.99**, un centavo menos que el total de ingresos (4,623.00). Las líneas guardan importes sin redondear (comisión 71.6565, prima 63.3351, 5.ª 199.7378): el total de descuentos se suma sin redondear y el neto con líneas redondeadas. El asiento sí cuadra. Ver Anexo A.', 'implementador'),
  h2('10.2 Asiento contable'),
  ...figura('p10_08_asiento', 'Asiento de la boleta: 5,870.78 al debe y al haber.'),
);

// 11. Lote
agregar(
  h1('11. Lote mensual y orden del proceso'),
  pasos([
    '**Procesamientos de nóminas › Nuevo**: nombre, periodo y **Diario de salarios = Planillas**. Guarde.',
    '**Generar nóminas**: en el asistente, **Agregar una línea** y elija a los trabajadores; pulse **Generar**.',
    'Revise las boletas creadas y pulse **Marcar como hecho**: las boletas pasan a Hecho y se asientan.',
  ]),
  ...figura('p11_01_lote_nuevo', 'Lote de diciembre de 2026 con diario Planillas.'),
  ...figura('p11_03_lote_seleccion', 'Asistente «Generar nóminas» con el trabajador elegido.'),
  ...figura('p11_04_lote_generado', 'Boleta generada dentro del lote.'),
  ...figura('p11_05_lote_hecho', 'Lote marcado como hecho.'),
  p('Medido: la boleta de Héctor Manuel Salas Quispe (DNI sintético `99999902`, ONP, sueldo 2,200) salió con ONP **286.00** y neto **1,914.00**, igual que la calculada por el proceso automático.'),
  h2('11.1 Orden del mes'),
  pasos([
    'Adelanto quincenal (NQA), si hay. **Valídelo**: la mensual solo descuenta adelantos en Hecho (medido: un adelanto en borrador no se descontó, `DESC_ADEL_001` = 0.00).',
    'Gratificación (julio y diciembre), CTS (mayo y noviembre) y vacaciones del mes. **Valídelas**.',
    'Mensuales (NME) y semanales (NSO).',
    'Salidas: planilla, PLAME, AFPnet, TXT bancarios.',
  ]),
);

// 12. Aportes
agregar(
  h1('12. Aportes y retenciones'),
  tabla(['Concepto', 'Regla', 'Cálculo', 'Medido'], [
    ['ONP', 'ONP_001', '13 % de los ingresos afectos', 'Héctor 2,200 → **286.00**; Miguel (demo) 3,000 → 390.00'],
    ['AFP fondo', 'AFP_APO_001', '10 % de los ingresos afectos', 'Lucía 4,613 → **461.30**'],
    ['AFP comisión flujo', 'AFP_COM_001', 'Tasa de la AFP; con comisión mixta = 0', 'Lucía Integra → **71.50**; María (mixta) → 0.00'],
    ['AFP prima', 'AFP_PRI_001', '1.37 % con tope en la RMA', 'Lucía → **63.20**; Ana (demo, 15,000) topeada → 172.61'],
    ['EsSalud', 'ESSALUD_001', '9 % (mínimo sobre la RMV)', 'Lucía → **415.17**'],
    ['EPS', 'EPS_APO_001 / EPS_CRED_001', 'Aporte y crédito ≤ 25 % de EsSalud', 'Carlos (demo) 162.59 / −81.29'],
    ['Descuento judicial', 'DJ_001', '% o monto, tope 60 % del disponible', 'Miguel (demo) 20 % → 522.00'],
    ['Cuota sindical', 'SIND_001', '1 % del básico si es sindicalizado', 'Rosa (demo) → 4.20'],
  ], [1700, 2200, 2900, 2838]),
  p('Valores de enero de 2025 para Lucía (ingresos afectos 4,613). Las cifras de la demo son del caso NOMINA (julio de 2026).'),
  nota('SENATI (0.75 %) aparece porque la compañía tiene marcada **Afecta a SENATI** (Ajustes › Compañías). Solo corresponde a empresas industriales (CIIU D) con más de 20 trabajadores. En la base quedó marcada por una siembra antigua de la demo: revise esa casilla en producción.', 'importante'),
);

// 13. Renta de 5.ª
const r5ta = anioCompleto.filter((r) => r.emp === 27 && r.estructura === 'NME');
agregar(
  h1('13. Renta de 5.ª categoría'),
  p('La regla `R5TA_001` retiene en las boletas mensuales (periodo de 20 días o más):'),
  pasos([
    '**Proyección anual** = lo percibido hasta el mes anterior (boletas validadas) + ingresos afectos del mes × meses restantes + gratificaciones pendientes × (1 + bonificación).',
    'Resta **7 UIT** y aplica los tramos 8 %, 14 %, 17 %, 20 % y 30 %.',
    'Divide según el mes: enero–marzo ÷ 12; abril ÷ 9 (descontando lo retenido); mayo–julio ÷ 8; agosto ÷ 5; setiembre–noviembre ÷ 4; diciembre, el saldo.',
  ]),
  ...figura('p13_01_r5ta_enero', 'Retención de 5.ª en la boleta de enero de 2025.'),
  h2('13.1 Retenciones medidas de Lucía (sueldo 4,500 + asignación familiar)'),
  tabla(['Mes', 'R5TA_001', 'Mes', 'R5TA_001'],
    Array.from({ length: Math.ceil(r5ta.length / 2) }, (_, i) => {
      const a = r5ta[i]; const b = r5ta[i + Math.ceil(r5ta.length / 2)];
      return [periodoTexto(a.periodo), importe(a, 'R5TA_001'), b ? periodoTexto(b.periodo) : '', b ? importe(b, 'R5TA_001') : ''];
    }), [1800, 3019, 1800, 3019]),
  p('Total retenido en 2025: **2,292.45** (suma de las retenciones de cada boleta). Otros casos medidos en la demo: María (8,000) **269.40** en julio y **377.16** en agosto, con la gratificación ya en el acumulado; Ana (15,000) **1,267.25** en julio.'),
  nota('En febrero de 2026 la retención baja a **12.77** porque Lucía gozó 15 días de vacaciones: la proyección multiplica los ingresos del mes (reducidos) por los meses restantes, y la boleta de vacaciones del mismo mes aún no está en el acumulado. Se recupera desde marzo.', 'nota'),
  nota('La proyección de gratificaciones usa el **sueldo sin asignación familiar**, aunque la gratificación sí la incluye. Medido en 2025: retenido 2,292.45 frente a 2,309.73 con la renta real (65,412.34), una diferencia de 17.28 (≈ 113 × 1.09 × 14 %). Ver Anexo A.', 'implementador'),
);

// 14. Gratificaciones
const gratis = anioCompleto.filter((r) => r.estructura === 'GRAT');
agregar(
  h1('14. Gratificaciones'),
  p('Estructura **GRAT**, solo en julio y diciembre. Base = sueldo + asignación familiar; se paga por sextos de **meses completos** del semestre y por el factor del régimen (general 1.0, pequeña empresa 0.5, microempresa 0). La bonificación extraordinaria (Ley 30334) es 9 %, o 6.75 % si el trabajador tiene EPS.'),
  tabla(['Trabajador', 'Periodo', 'GRATI_001', 'BONO_GRATI_001', 'Neto'],
    gratis.map((r) => [r.emp === 27 ? 'Lucía' : 'Héctor', periodoTexto(r.periodo), importe(r, 'GRATI_001'), importe(r, 'BONO_GRATI_001'), importe(r, 'NET')]),
    [1800, 1500, 2100, 2100, 2138]),
  p('Héctor ingresó el 01/03/2025: en julio de 2025 recibe 4/6 (marzo a junio) = **1,466.67**. En diciembre de 2026 la de Lucía incluye la asignación familiar nueva (4,500 + 123). En la demo: régimen MYPE (José, 1,500) **750.00**; con EPS (Carlos) bonificación **243.88** (6.75 %).'),
  ...figura('p14_01_grati_julio', 'Boleta de gratificación de julio de 2026.'),
);

// 15. CTS
const cts = anioCompleto.filter((r) => r.estructura === 'CTS');
agregar(
  h1('15. CTS'),
  p('Estructura **CTS**, en mayo y noviembre. Remuneración computable = sueldo + asignación familiar + 1/6 de la última gratificación **validada** (sin bonificación); tiempo = meses/12 + días/360 del semestre; por el factor del régimen.'),
  tabla(['Trabajador', 'Depósito', 'CTS_001'], cts.map((r) => [r.emp === 27 ? 'Lucía' : 'Héctor', periodoTexto(r.periodo), importe(r, 'CTS_001')]), [3200, 3000, 3438]),
  p('Mayo de 2025: Lucía tiene 4 meses (enero–abril) y aún no hay gratificación, 4,613 × 4/12 = **1,537.67**. Noviembre de 2025: (4,613 + 4,613/6) × 6/12 = **2,690.92**.'),
  ...figura('p15_01_cts_noviembre', 'Boleta de CTS de noviembre de 2026.'),
  nota('El TXT de abono CTS al BCP salió **sin trabajadores** (solo cabecera, total 0.00) aunque había dos CTS validadas: el banco BCP de la base se identifica por su código BIC y el generador espera el código 02. Hasta corregirlo, revise el TXT antes de enviarlo. Ver capítulo 21 y Anexo A.', 'importante'),
);

// 16. Liquidación
agregar(
  h1('16. Liquidación por cese'),
  pasos([
    'En el contrato, registre la **fecha de fin** y el **motivo de baja** (T17).',
    'Cree la boleta con la estructura **Liquidación** para el mes del cese.',
  ]),
  ...figura('p16_02_cese_contrato', 'Contrato con fecha de cese y motivo de baja (laboratorio).'),
  ...figura('p16_01_liquidacion', 'Liquidación medida: vacaciones, gratificación, bonificación y CTS truncas.'),
  tabla(['Concepto', 'Regla', 'Medido (Carmen, sueldo 2,500, cese 31/08/2026)'], [
    ['Vacaciones truncas 8/12', 'VAC_TRUNCA_001', '1,666.67'],
    ['Gratificación trunca 2/6', 'GRATI_TRUNCA_001', '833.33'],
    ['Bonificación 9 %', 'BONO_GRATI_TRUNCA_001', '75.00'],
    ['CTS trunca 4/12 (sexto sin bonificación)', 'CTS_TRUNCA_001', '972.22'],
    ['**Neto de liquidación**', 'NET', '**3,547.22**'],
  ], [3800, 2500, 3338]),
  nota('**No cubierto por la localización:** indemnización por despido arbitrario y regularización de la renta de 5.ª al cese. Calcúlelas aparte y cárguelas como entrada si corresponde.', 'importante'),
);

// 17. Vacaciones
agregar(
  h1('17. Vacaciones'),
  p('Se registran con el tipo de ausencia **Vacaciones PE (D.Leg. 713)**. Devengan 2.5 días por mes (plan «Vacaciones PE - Devengo mensual»). El pago va en una boleta **VAC** por el rango de días de goce; la mensual descuenta esos días.'),
  ...figura('p17_05_asignaciones', 'Asignaciones de vacaciones devengadas.'),
  ...figura('p17_04_ausencias', 'Ausencia de vacaciones aprobada: 11 días hábiles para 15 días calendario.'),
  h2('17.1 Goce parcial medido (Lucía, 2 al 16 de febrero de 2026: 15 días)'),
  tabla(['Boleta', 'Concepto', 'Importe'], [
    ['VAC (02/02–16/02)', 'VAC_001 = (4,500 + 113) × 15/30', '2,306.50'],
    ['NME febrero', 'RB_001 = 4,500 × (30 − 15)/30', '2,250.00'],
    ['NME febrero', 'ASF_001', '113.00'],
  ], [2600, 4600, 2438]),
  ...figura('p17_02_vac_mensual_dias', 'Mensual de febrero: la línea de vacaciones con «Pagado» desmarcado.'),
  ...figura('p17_01_vac_boleta', 'Boleta de vacaciones de febrero de 2026.'),
  p('Casos de la demo (julio de 2026, sueldo 3,000): goce de 30 días → mensual **0.00** y vacaciones **3,000.00**; goce de 15 días → mensual **1,500.00** y vacaciones **1,500.00**. Héctor (septiembre de 2026, 10 días): vacaciones **733.33** y mensual **1,466.67**.'),
  nota('La mensual se calcula con **mes comercial de 30 días**: resta los días de goce en días calendario. La ausencia, en cambio, cuenta días hábiles (11 para los 15 días calendario de Lucía).', 'nota'),
  nota('En el mes de goce parcial, la asignación familiar se pagó 1.5 veces: prorrateada dentro de VAC_001 (56.50) y completa en ASF_001 (113.00). Consulte con su contador si corresponde. Ver Anexo A.', 'implementador'),
);

// 18. Feriados
agregar(
  h1('18. Feriados'),
  p('Los feriados se registran en **Vacaciones › Configuración › Días festivos** (para este manual se cargaron los 16 feriados nacionales de 2025 y de 2026).'),
  ...figura('p18_01_feriados', 'Feriados nacionales registrados.'),
  p('**No hay regla salarial de feriados.** El mes comercial de 30 días ya los paga. om_hr_payroll los muestra en los días trabajados como una línea **GLOBAL** («Global Leaves») en negativo y pagada, que no descuenta nada.'),
  ...figura('p18_02_boleta_global', 'Enero de 2025: 23 días hábiles y la línea GLOBAL del 1 de enero.'),
  p('**Efecto medido en salidas:** en diciembre de 2026 (feriados 8, 9 y 25) la boleta impresa y el `.jor` del PLAME declaran **20 días / 160 horas** para un mes pagado completo. Confirme con su contador qué deben declarar.'),
);

// 19. Asistencias
agregar(
  h1('19. Asistencias: tardanzas y faltas'),
  p('Con `solse_pe_payroll_asistencia`, la boleta tiene el botón **Cargar asistencias**: concilia los registros de Asistencias y crea las faltas y tardanzas. La configuración está en **Ajustes › Compañías › Nómina PE - Asistencias**.'),
  ...figura('p19_04_ajustes_asistencia', 'Tolerancia de tardanza (10 minutos) y opciones de la compañía.'),
  tabla(['Caso medido (septiembre de 2026)', 'Resultado'], [
    ['Carlos: tres tardanzas de 25 minutos (tolerancia 10)', '`TAR_001` = **10.94** (horas × sueldo/240)'],
    ['Jorge (1,130): faltas el 10 y el 24', 'Línea FALTA de 2 días no pagada; `RB_001` = **1,054.67**'],
    ['María (8,000): falta de 4 horas', 'FALTA_PARCIAL no pagada; `RB_001` = **7,866.67**'],
    ['Óscar (3,000): 2 faltas y 3 días de vacaciones', '`RB_001` = **2,500.00**'],
  ], [4900, 4738]),
  ...figura('p19_01_boleta_tardanzas', 'Boleta con «Cargar asistencias» (laboratorio).'),
  ...figura('p19_03_boleta_faltas', 'Faltas como línea no pagada en los días trabajados.'),
);

// 20. Otras novedades
agregar(
  h1('20. Horas extra, nocturnidad, movilidad, adelantos y utilidades'),
  p('Se cargan como **Otras entradas** en la boleta (pestaña Días trabajados y entradas), con su código.'),
  tabla(['Entrada', 'Código', 'Cálculo', 'Medido (Héctor, 2,200)'], [
    ['Horas extra 25 %', 'HE25_001', 'horas × sueldo/30/8 × 1.25', '10 h → **114.58**'],
    ['Horas extra 35 %', 'HE35_001', 'horas × sueldo/30/8 × 1.35', '4 h → **49.50**'],
    ['Horas nocturnas', 'BNOC_001', 'horas × máx(sueldo, RMV)/240 × 35 %', '8 h → **25.67**'],
    ['Movilidad (no afecta)', 'MOV_001', 'importe', '150 → **150.00**, fuera de la base de ONP y 5.ª'],
    ['Tardanza (minutos)', 'TARD_001', 'minutos × sueldo/240/60', '30 min → **4.58**'],
    ['Utilidades', 'UTIL_001', 'importe (sale del asistente Reparto de utilidades)', '—'],
  ], [2000, 1500, 3300, 2838]),
  ...figura('p20_01_entradas', 'Entradas de la boleta de prueba.'),
  ...figura('p20_02_entradas_calculo', 'Cálculo con horas extra, nocturnidad, movilidad y tardanza (ONP 310.67 sobre 2,389.75).'),
  p('Boleta de prueba en borrador, eliminada después de medir. **Adelanto quincenal** (NQA): porcentaje del contrato; medido en la demo: adelanto del 40 % de 4,500 = **1,800.00**, descontado en la mensual (`DESC_ADEL_001` 1,800.00).'),
  nota('La tardanza (`TARD_001`) descuenta del neto pero **no reduce la base afecta**: la ONP de la prueba se calculó sobre 2,389.75 con la remuneración básica completa. Las faltas sí reducen la remuneración básica.', 'implementador'),
);

// 21. Reportes
agregar(
  h1('21. Reportes y archivos legales'),
  h2('21.1 Planilla de sueldos'),
  p('**Nómina PE › Planilla de sueldos**: mes y año; **Imprimir PDF** o **Generar Excel** (`Planilla_AAAA_MM.xlsx`).'),
  ...figura('p21_01_planilla_asistente', 'Asistente de la planilla de sueldos.'),
  h2('21.2 PLAME (archivos del PDT)'),
  p('**Nómina PE › PLAME (archivos PDT)**: genera `PLAME_0601AAAAMMRUC.zip` con `.rem`, `.jor` y `.snl` desde las boletas validadas; con **Incluir 4ta categoría** añade `.ps4` y `.4ta`.'),
  ...figura('p21_02_plame_resultado', 'Resultado del PLAME de diciembre de 2026 (FM SYSTEMS).'),
  p('Contenido medido del `.rem` de diciembre de 2026 (FM SYSTEMS):'),
  tabla(['Tipo doc.', 'DNI', 'Concepto T22', 'Devengado', 'Pagado'], [
    ['01', '99999901', '0121 remuneración básica', '4500.00', '4500.00'],
    ['01', '99999901', '0201 asignación familiar', '123.00', '123.00'],
    ['01', '99999901', '0312 bonificación extraordinaria', '416.07', '416.07'],
    ['01', '99999901', '0406 gratificación', '4623.00', '4623.00'],
    ['01', '99999901', '0605 renta de 5.ª', '199.74', '199.74'],
    ['01', '99999902', '0121 remuneración básica', '2200.00', '2200.00'],
    ['01', '99999902', '0312 bonificación extraordinaria', '198.00', '198.00'],
    ['01', '99999902', '0406 gratificación', '2200.00', '2200.00'],
  ], [1100, 1500, 3300, 1800, 1938]),
  p('`.jor`: `01|99999901|20|160|0|0|0|` (días, horas, **minutos** de la jornada ordinaria, horas y minutos de sobretiempo). `.snl` vacío: no hay suspensiones. Separador `|`, fin de línea CRLF. Los aportes (06xx/08xx salvo 0605) no se exportan: los calcula el PDT.'),
  ...figura('p21_03_plame_4ta_resultado', 'PLAME de julio de 2026 del laboratorio con la 4.ª categoría incluida (5 archivos).'),
  h2('21.3 AFPnet'),
  p('**Nómina PE › AFPnet**: Excel `AFPNET_AAAA_MM.xlsx` (hoja TRABAJADOR, 17 columnas) para el portal AFPnet.'),
  ...figura('p21_04_afpnet_asistente', 'Asistente AFPnet.'),
  h2('21.4 Pago masivo a bancos'),
  p('**Nómina PE › Pago masivo a bancos**: TXT de haberes o CTS para **BCP Telecrédito** o **Interbank**, desde las boletas validadas y las cuentas del trabajador marcadas con **Uso de la cuenta** = sueldo o CTS (con CCI).'),
  ...figura('p21_05_bancos_sueldo_asistente', 'Asistente de pago masivo.'),
  p('Medido (haberes de diciembre de 2026, cuenta de cargo BCP): `ABONO_BCP_SUELDO_202612.txt` con 2 abonos y total **5,739.96** (3,825.96 + 1,914.00).'),
  nota('Tres comportamientos medidos que conviene conocer: (1) si un trabajador **no tiene cuenta**, el TXT **no se genera** (mensaje «Trabajadores sin cuenta de Haberes (sueldo) registrada»); (2) una cuenta **del propio BCP** sale como interbancaria (registro 2B con CCI) porque el banco se identifica por su BIC; (3) por la misma causa, el **TXT de CTS al BCP sale vacío**. Scotiabank y Banco de la Nación no están implementados.', 'importante'),
);

// 22. RxH
agregar(
  h1('22. Recibos por honorarios (4.ª categoría)'),
  p('Hay **dos puertas con el mismo contenido** (medido byte a byte en el caso PLAME):'),
  vinetas([
    '**Sin nómina**: Contabilidad › Reportes › **PLAME - Recibos por Honorarios** (`solse_pe_plame_rxh`): genera `.ps4` (prestadores) y `.4ta` (comprobantes).',
    '**Con nómina**: casilla **Incluir 4ta categoría** del asistente PLAME (`solse_pe_plame_4ta`).',
  ]),
  p('Criterio de **percepción**: entran los recibos **pagados** en el mes, sin importar su fecha de emisión; los pagos parciales se prorratean y las notas de crédito toman la fecha de pago del recibo origen. La retención sale del impuesto marcado como **retención de 4.ª**. Los datos del prestador (apellidos y nombres separados, domiciliado, convenio, suspensiones) se registran en el contacto.'),
  ...figura('p22_04_rxh_revision', 'Revisión de julio de 2026: 8 prestadores, 9 comprobantes, total declarado S/ 15,022.60 (laboratorio).'),
  ...figura('p22_02_ajustes_4ta', 'Opciones de 4.ª categoría de la compañía.'),
  nota('El formato se comparó con archivos aceptados por el PDT 4.6. La **validación final en el PDT del cliente está pendiente**: verifíquelo con su primera declaración.', 'importante'),
);

// 23. No cubierto
agregar(
  h1('23. Lo que la localización no cubre'),
  tabla(['Tema', 'Estado medido en el código y la base'], [
    ['Subsidios (maternidad, incapacidad temporal)', 'No hay reglas ni flujo. Solo existe una categoría «subsidio» sin uso y el `.snl` sale vacío («suspensiones aún no gestionadas»).'],
    ['T-Registro (altas, bajas, modificaciones)', 'No hay exportación. Los campos del trabajador y del contrato llevan la etiqueta T-Registro, pero el archivo se hace en el portal SUNAT.'],
    ['Indemnización por despido arbitrario', 'No cubierta.'],
    ['Regularización de 5.ª al cese', 'No cubierta: la liquidación no recalcula la 5.ª.'],
    ['Prima de Vida Ley', 'Catálogo sin regla salarial.'],
    ['TXT Scotiabank y Banco de la Nación', 'No implementados (solo BCP e Interbank).'],
    ['Flujo de pagos de nómina', 'En Community no existe; el «importe pagado» de la boleta es manual.'],
    ['Maestro T12 (contratos MINTRA)', 'Tabla vacía: cárguela a mano si la necesita.'],
  ], [3600, 6038]),
);

// 24. Cierre
agregar(
  h1('24. Lista de verificación del cierre mensual'),
  pasos([
    'Parámetros: ¿cambió la RMA (trimestral), la RMV o la UIT? Registre la vigencia antes de calcular.',
    'Novedades: ingresos, ceses (fecha de fin y motivo), vacaciones aprobadas, asistencias, horas extra, adelantos.',
    'Valide en orden: adelanto → gratificación/CTS/vacaciones → mensuales y semanales.',
    'Revise el asiento de cada lote en el diario **Planillas**.',
    'Genere planilla, PLAME, AFPnet y TXT bancarios; **abra cada archivo** antes de enviarlo.',
    'Importe el PLAME en el PDT y compare totales con la planilla.',
  ]),
);

// Anexo A
agregar(
  h1('Anexo A. Observaciones para implementadores'),
  p('Observaciones **medidas** durante la elaboración del manual. Están registradas para la línea de desarrollo; aquí se conservan como avisos.'),
  tabla(['#', 'Observación', 'Medición'], [
    ['A1', 'Parámetros sin vigencia 2025 (comisión AFP, RMA) y RMV 1,230 de 10/2026 sin cargar', 'Boleta de 2025 detenida por falta de `pe_afp_comision_flujo`'],
    ['A2', 'La 5.ª proyecta las gratificaciones sin asignación familiar', '2025: 2,292.45 retenido frente a 2,309.73'],
    ['A3', 'Asignación familiar 1.5 veces en el mes de goce parcial', 'Febrero de 2026: +56.50'],
    ['A4', 'Boleta impresa descuadrada por 0.01 (importes sin redondear)', '797.03 + 3,825.96 ≠ 4,623.00'],
    ['A5', 'TXT BCP: cuentas BCP tratadas como interbancarias; CTS vacía', 'ABONO_BCP_CTS_202611 con total 0.00'],
    ['A6', 'TXT bloqueado si un trabajador no tiene cuenta', 'Mensaje de validación'],
    ['A7', 'Sin diario en el contrato el asiento va a «Operaciones varias»', 'MISCE/2026/12/…'],
    ['A8', 'Sin estructura en el contrato no se cargan días trabajados', 'Al crear la boleta'],
    ['A9', 'Feriados restados en días de boleta y `.jor`', '20 días en diciembre de 2026'],
    ['A10', 'La tardanza no reduce la base afecta', 'ONP sobre 2,389.75'],
    ['A11', 'SENATI activado por la demo en la compañía donde corre', 'FM SYSTEMS afecta a SENATI'],
    ['A12', 'Maestro T12 vacío; campos ajenos a Perú en el contrato (HRA, DA…)', 'Conteo de registros'],
  ], [700, 5400, 3538]),
);

// Anexo B
agregar(
  h1('Anexo B. Datos de prueba utilizados'),
  p('Trabajadores del recorrido (FM SYSTEMS SOLUTIONS EIRL). Datos **ficticios**; DNI **sintéticos**.'),
  tabla(['Trabajador', 'DNI', 'Ingreso', 'Sueldo', 'Pensión', 'Particularidades'], [
    ['Lucía Fernanda Ramos Ticona', '99999901', '01/01/2025', '4,500', 'SPP Integra (flujo)', 'Hijo menor; vacaciones 02–16/02/2026; cuentas BCP sueldo y CTS'],
    ['Héctor Manuel Salas Quispe', '99999902', '01/03/2025', '2,200', 'ONP', 'Vacaciones 14–23/09/2026; cuentas Interbank'],
  ], [2300, 1100, 1200, 900, 1700, 2438]),
  p('Los casos del laboratorio (NOMINA, ASISTENCIA, PLAME, PLAME-RXH) se siembran desde **SOLSE Demo › Casos de demostración** con los botones Sembrar, Generar y Comparar, en la compañía «SOLSE Demo Servicios S.A.C.». Sus identificadores no se reproducen en este manual.'),
);

// Anexo C
agregar(
  h1('Anexo C. Planilla medida de enero de 2025 a diciembre de 2026'),
  p('Boletas validadas de los dos trabajadores del recorrido (64 boletas; las mensuales de diciembre de 2026 se rehicieron desde la interfaz con el mismo resultado). Fuente: `manuales_ce/evidencias/anio_completo_fm.json`.'),
  tabla(['Trab.', 'Mes', 'Estr.', 'Básica', 'AF', 'Vac./Grati/CTS', 'Pensión', '5.ª', 'Neto'],
    anioCompleto.map((r) => {
      const l = Object.fromEntries(r.lineas);
      const pension = (l.AFP_APO_001 || 0) + (l.AFP_COM_001 || 0) + (l.AFP_PRI_001 || 0) + (l.ONP_001 || 0);
      const beneficio = l.VAC_001 || l.GRATI_001 || l.CTS_001;
      return [r.emp === 27 ? 'Lucía' : 'Héctor', periodoTexto(r.periodo), r.estructura, dinero(l.RB_001), dinero(l.ASF_001), dinero(beneficio), pension ? dinero(Math.round(pension * 100) / 100) : '—', dinero(l.R5TA_001), dinero(l.NET)];
    }), [900, 900, 800, 1100, 800, 1500, 1200, 1000, 1438]),
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
  title: 'Manual de Nómina Peruana - Odoo 19 Community',
  description: 'Manual de usuario de la nómina peruana (localización SOLSE) en Odoo 19 Community',
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
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Manual de Nómina Peruana · Odoo 19 Community', size: 16, color: '888888' })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Página ', PageNumber.CURRENT, ' de ', PageNumber.TOTAL_PAGES], size: 16, color: '888888' })] })] }) },
    children: contenido,
  }],
});

Packer.toBuffer(documento).then((buffer) => {
  fs.writeFileSync(SALIDA, buffer);
  console.log(`Manual generado: ${SALIDA} (${numeroFigura} figuras)`);
});
