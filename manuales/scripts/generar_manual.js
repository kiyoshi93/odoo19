// Genera el manual de Nómina PE (Odoo 19 Enterprise + localización SOLSE) en formato Word.
// Uso: NODE_PATH=<carpeta con docx> node manuales/scripts/generar_manual.js
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, ImageRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, LevelFormat, Bookmark, InternalHyperlink, PageBreak, Header, Footer, PageNumber,
  PageOrientation,
} = require('docx');

const CAPTURAS = path.join(__dirname, '..', 'capturas');
const SALIDA = path.join(__dirname, '..', 'Manual_Nomina_PE_Odoo19.docx');
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

// Portada
agregar(
  new Paragraph({ spacing: { before: 2400 }, children: [] }),
  new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: 'MANUAL DE USUARIO', bold: true, size: 28, color: '888888' })] }),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Nómina Peruana en Odoo 19 Enterprise', bold: true, size: 56, color: COLOR })] }),
  new Paragraph({ spacing: { after: 600 }, children: [new TextRun({ text: 'Localización SOLSE: planilla, beneficios sociales, asistencias, PLAME, AFPnet, pago a bancos y recibos por honorarios (4ta categoría)', size: 28, color: '444444' })] }),
  new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: COLOR, space: 4 } }, children: [] }),
  espacio(),
  tabla(['Dato', 'Valor'], [
    ['Versión de Odoo', '19.0 Enterprise'],
    ['Módulos documentados', 'solse_pe_payroll 19.0.0.45 · solse_pe_payroll_catalogo · solse_pe_payroll_asistencia_ee · solse_pe_plame_rxh · solse_pe_plame_4ta_ee'],
    ['Empresa de ejemplo', 'Base de pruebas multiempresa (los datos de las empresas se ocultan en las capturas)'],
    ['Público', 'Usuarios de RR.HH./contabilidad e implementadores'],
    ['Fecha', 'Octubre 2026 · versión 2 (contrastada con la biblia SOLSE, encargo manual-nomina-ee)'],
  ], [2600, 7038]),
  espacio(),
  nota('Todos los trabajadores, prestadores, cuentas bancarias y montos de este manual son **datos ficticios de prueba**. Los DNI (`99999901`–`99999903`) y RUC (`10999999048`, `10999999056`) son **sintéticos**: se comprobó en la consulta RENIEC/SUNAT de Odoo que no corresponden a ninguna persona. Las capturas se tomaron en una base de pruebas y los datos de las empresas (razón social, RUC, dirección, correos y logo) aparecen difuminados; los resultados se contrastaron con los valores esperados del caso de demostración de la localización.'),
  new Paragraph({ children: [new PageBreak()] }),
  new Paragraph({ children: [new TextRun({ text: 'Contenido', bold: true, size: 32, color: COLOR })], spacing: { after: 200 } }),
  'INDICE',
);

// 1. Introducción
agregar(
  h1('1. Introducción'),
  p('Este manual guía, paso a paso y con capturas de pantalla, el uso de la nómina peruana en Odoo 19 Enterprise con la localización SOLSE. Cubre desde la configuración inicial hasta la generación de los archivos que se presentan a SUNAT, AFPnet y los bancos.'),
  h2('1.1 Módulos que intervienen'),
  tabla(['Módulo', 'Función'], [
    ['`solse_pe_payroll`', 'Núcleo: maestros SUNAT, parámetros legales, estructuras y reglas salariales (NME, NSO, NQA, GRAT, CTS, VAC, LIQ), boleta PE, planilla, PLAME, AFPnet, pago a bancos, utilidades y contabilidad de nómina.'],
    ['`solse_pe_payroll_catalogo`', 'Puente con el catálogo SUNAT: agrega el acceso SUNAT › Nómina PE.'],
    ['`solse_pe_payroll_asistencia_ee`', 'Concilia las marcaciones de Asistencias con la boleta: faltas, medias jornadas y tardanzas.'],
    ['`solse_pe_plame_rxh`', 'Recibos por honorarios: datos del prestador, retención de 4ta y archivos .ps4/.4ta.'],
    ['`solse_pe_plame_4ta_ee`', 'Incluye los archivos de 4ta categoría dentro del ZIP PLAME de la nómina.'],
  ], [3000, 6638]),
  espacio(),
  h2('1.2 Flujo general'),
  ...pasos([
    'Instalar los módulos y configurar la compañía.',
    'Revisar parámetros legales (UIT, RMV, AFP, RMA…) y maestros SUNAT.',
    'Verificar la contabilidad de nómina (diario y mapeo PCGE).',
    'Registrar seguros (EPS / Vida Ley) y dar de alta a los trabajadores.',
    'Registrar asistencias (si aplica) y procesar los recibos: adelantos → gratificación → vacaciones → mensual.',
    'Validar recibos, publicar asientos e imprimir boletas.',
    'Generar planilla, PLAME, AFPnet y el archivo de pago a bancos.',
    'Registrar y pagar los recibos por honorarios y exportar la 4ta categoría.',
  ]),
  h2('1.3 Estados del recibo en Enterprise'),
  p('En Odoo 19 Enterprise un recibo pasa por **Borrador → Validado → Pagado** (o **Cancelado**). No existen los estados "Por verificar" ni "Hecho" de versiones anteriores o de la edición Community. Al validar se genera el asiento (en borrador) en el diario de la estructura; al cancelar, el asiento se elimina o se revierte.'),
  h2('1.4 Convenciones'),
  ...vinetas([
    'Las rutas de menú se escriben así: **Nómina › Nómina PE › Parámetros de Nómina PE**.',
    'En las figuras, el **recuadro rojo** señala el campo o botón que se usa en el paso.',
    'Los cuadros **Para implementadores** contienen detalles técnicos o hallazgos a tener en cuenta en la puesta en marcha.',
  ]),
);

// 2. Instalación
agregar(
  h1('2. Instalación de los módulos'),
  p('Los módulos de nómina se instalan desde **Aplicaciones**. Como varios son técnicos, primero se quita el filtro "Aplicaciones" del buscador.'),
  ...pasos([
    'Abra **Aplicaciones**, elimine el filtro predeterminado y busque `solse_pe_plame`.',
    'En la tarjeta **Nómina Peruana - PLAME 4ta Categoría (Enterprise)** pulse **Activar**. Odoo instala también su dependencia **Perú - PLAME Recibos por Honorarios**.',
    'Instale de la misma forma `solse_pe_payroll` (núcleo) y `solse_pe_payroll_asistencia_ee` si usará asistencias. `solse_pe_payroll_catalogo` se instala solo.',
  ]),
  ...figura('p00_01_aplicaciones_buscar_plame', 'Búsqueda de los módulos PLAME en Aplicaciones (sin el filtro "Aplicaciones").'),
  ...figura('p00_02_activar_plame_4ta_ee', 'Botón Activar del módulo PLAME 4ta Categoría (Enterprise).'),
  nota('No instale los módulos marcados como **(Community)** ni los de **datos de demostración** en una base productiva. Las ramas Enterprise (`solse_pe_payroll`) y Community (`solse_pe_payroll_base` / `_ce`) son excluyentes: el instalador bloquea la convivencia.', 'importante'),
  nota('Si al instalar `solse_pe_plame_4ta_ee` aparece el error *External ID not found: solse_pe_payroll.plame_wizard_view_form*, el núcleo de nómina está desactualizado en la base (versión registrada menor que la del código). Actualice `solse_pe_payroll` (**Aplicaciones › Actualizar** o `-u solse_pe_payroll`) y reintente.', 'implementador'),
);

// 3. Menú
agregar(
  h1('3. Menú de Nómina PE'),
  p('Tras la instalación, la aplicación **Nómina** muestra el menú **Nómina PE**, que agrupa todo lo propio de la localización. El tablero de Nómina muestra además advertencias útiles (empleados sin contrato, sin cuenta bancaria, sin DNI, RMA desactualizada).'),
  ...figura('p01_01_tablero_nomina', 'Tablero de Nómina con advertencias.'),
  ...figura('p01_02_menu_nomina_pe', 'Menú Nómina PE desplegado.'),
  tabla(['Opción', 'Uso'], [
    ['Parámetros de Nómina PE', 'UIT, RMV, asignación familiar, tasas ONP/AFP/EsSalud, RMA, renta de 5ta, factores por régimen, etc., con vigencias.'],
    ['Maestros SUNAT', 'Tablas T11, T33, T8, T12, T30, T17, T9, T35, T19 y T22 (conceptos PLAME).'],
    ['Seguros y EPS', 'Planes EPS y pólizas Vida Ley.'],
    ['Planilla de sueldos', 'Reporte mensual en PDF o Excel.'],
    ['Pago masivo a bancos', 'TXT de abono de haberes o CTS (BCP, Interbank, Scotiabank).'],
    ['PLAME (archivos PDT)', 'ZIP con .rem, .jor, .snl (y .ps4/.4ta si está el puente de 4ta).'],
    ['AFPnet', 'Excel de la planilla previsional para el portal AFPnet.'],
    ['Reparto de utilidades', 'Cálculo anual de participación de utilidades.'],
    ['Contabilidad de nómina', 'Mapeo contable PCGE y asistente para asignar cuentas.'],
  ], [3000, 6638]),
);

// 4. Compañía
agregar(
  h1('4. Configuración de la compañía'),
  p('Ruta: **Ajustes › Usuarios y empresas › Empresas** › seleccione la compañía.'),
  h2('4.1 Datos generales'),
  ...pasos([
    'Verifique que el **país** sea Perú y que el **RUC** esté completo: se usa en los nombres de los archivos PLAME, AFPnet y de bancos.',
    'Marque **Afecta a SENATI** si la empresa realiza actividad industrial (manufactura, como en el ejemplo). Activa la contribución SENATI (0.75 %) en la boleta.',
  ]),
  ...figura('p02_02_compania_senati_marcado', 'Casilla Afecta a SENATI en la ficha de la compañía.'),
  h2('4.2 Pestaña Nómina PE - Asistencias'),
  p('Solo aparece con `solse_pe_payroll_asistencia_ee`. Define cómo se concilian las marcaciones con la boleta:'),
  tabla(['Campo', 'Valor sugerido', 'Efecto'], [
    ['Tolerancia de tardanza (minutos)', '10', 'Minutos de gracia por día antes de contar tardanza.'],
    ['Descontar tardanzas en la boleta', 'Activo', 'Genera la entrada TARDANZAS y la regla TAR_001.'],
    ['Conciliar asistencias al calcular la boleta', 'Opcional', 'Si está activo, "Calcular hoja" concilia automáticamente; si no, use el botón "Cargar asistencias".'],
    ['Evaluar horas trabajadas por día (Fase 2)', 'Opcional', 'Detecta medias jornadas (FALTA_PARCIAL) con el margen indicado.'],
  ], [3300, 1600, 4738]),
  ...figura('p02_03_compania_asistencias', 'Configuración de conciliación de asistencias.'),
);

// 5. Parámetros
agregar(
  h1('5. Parámetros legales'),
  p('Ruta: **Nómina › Nómina PE › Parámetros de Nómina PE** (también desde **SUNAT › Nómina PE**). Cada parámetro guarda un **historial de vigencias**: para actualizar un valor no se modifica el anterior, se agrega una línea nueva con la fecha desde la que rige.'),
  ...figura('p03_01_parametros_grupos', 'Parámetros agrupados por categoría.'),
  ...figura('p03_01_parametros_lista', 'Grupo Generales: UIT, RMV y asignación familiar con su valor vigente.'),
  h2('5.1 Registrar una nueva vigencia'),
  ...pasos([
    'Abra el parámetro (por ejemplo **UIT - Unidad Impositiva Tributaria**).',
    'En la pestaña **Historial** pulse **Agregar una línea**.',
    'Indique la fecha **Desde** y el **Valor de parámetro**; guarde. Los recibos usan el valor vigente a la fecha del periodo.',
  ]),
  ...figura('p03_03_parametro_uit', 'UIT con dos vigencias: 5,350 (2025) y 5,500 (2026).'),
  h2('5.2 Remuneración Máxima Asegurable (RMA) de AFP'),
  p('La SBS actualiza la RMA **cada trimestre** (enero, abril, julio y octubre). Si la última vigencia tiene más de 95 días, el tablero muestra la advertencia "RMA de AFP posiblemente desactualizada". Registre el nuevo tope publicado por la SBS como una vigencia más.'),
  ...figura('p03_02_parametro_rma', 'Parámetro RMA con su historial.'),
  nota('En la base revisada, la RMV solo tiene vigencia 2025 (S/ 1,130) y la RMA vigente es la de abril 2026. Antes de procesar la nómina, confirme los valores oficiales del periodo y agréguelos como nuevas vigencias.', 'importante'),
);

// 6. Maestros
agregar(
  h1('6. Maestros SUNAT'),
  p('Ruta: **Nómina › Nómina PE › Maestros SUNAT**. Vienen cargados con las tablas oficiales; normalmente solo se revisan.'),
  h2('6.1 Sistemas pensionarios (T11)'),
  p('Cada AFP debe tener su **Clave AFP** (Habitat, Integra, Prima, Profuturo): con ella se busca la comisión sobre flujo en el parámetro `pe_afp_comision_flujo`. La casilla **CUSPP** hace obligatorio el CUSPP en la ficha del trabajador.'),
  ...figura('p04_01_sistemas_pensionarios', 'Sistemas pensionarios con su clave AFP.'),
  ...figura('p04_02_sistema_pensionario_habitat', 'Detalle de SPP HABITAT: clave AFP y CUSPP.'),
  nota('**SPP HORIZONTE** no tiene clave AFP: un trabajador asignado a ella tendría comisión 0. Si aún hay afiliados, revise su reasignación.', 'implementador'),
  h2('6.2 Regímenes laborales (T33)'),
  p('La **Clave de cálculo** determina los factores de gratificación, CTS y vacaciones (General, Pequeña Empresa, Microempresa, Agrario).'),
  ...figura('p04_03_regimenes_laborales', 'Regímenes laborales y su clave de cálculo.'),
  h2('6.3 Otros maestros'),
  p('**Vínculos familiares (T19)**: la asignación familiar se paga si el trabajador tiene un derechohabiente con parentesco que contenga "Hijo" menor de 18 años (o con discapacidad). **Conceptos PLAME (T22)**: catálogo de conceptos remunerativos con sus afectaciones.'),
  ...figura('p04_04_vinculos_familiares', 'Vínculos familiares (T19).'),
  ...figura('p04_05_conceptos_plame', 'Conceptos PLAME (T22).'),
  nota('El maestro **Contratos MINTRA (T12)** viene vacío: si lo usará en la plantilla de contrato, cárguelo manualmente.', 'implementador'),
);

// 7. Contabilidad de nómina
agregar(
  h1('7. Contabilidad de nómina'),
  p('Al instalar el módulo se asigna el diario **Salarios** a las estructuras y se completan las cuentas de las reglas según el plan PCGE. Si crea una compañía nueva después de la instalación, ejecute el asistente de esta sección.'),
  h2('7.1 Asignar cuentas contables'),
  ...pasos([
    'Ingrese a **Nómina › Nómina PE › Contabilidad de nómina › Asignar cuentas contables**.',
    'Seleccione la compañía y pulse **Asignar cuentas**.',
    'Revise el resultado: indica cuántas cuentas se asignaron y qué prefijos no existen en el plan contable.',
  ]),
  ...figura('p05_01_asignar_cuentas', 'Asistente Asignar cuentas contables.'),
  ...figura('p05_02_asignar_cuentas_resultado', 'Resultado: prefijos sin cuenta en el plan.'),
  nota('En la base de ejemplo falta la cuenta **6221** (Participación de los trabajadores en utilidades). Créela en el plan contable antes de registrar utilidades (regla UTIL_001) y vuelva a ejecutar el asistente.', 'importante'),
  nota('**Multiempresa**: el inicializador recorre **todas las compañías con país Perú** y deja en cada una su propio diario de salarios y las cuentas de las reglas. Medido en la base de ejemplo: la segunda compañía de la base tiene su diario **Salarios** propio y Remuneración básica → 6211, Neto → 4111, EsSalud → 6271/4031, igual que la principal. Valide siempre con la compañía correcta activa en el selector de compañías.'),
  h2('7.2 Mapeo contable PCGE'),
  p('Lista editable que relaciona cada regla salarial con su prefijo de débito y crédito (por ejemplo, Remuneración básica → 6211; ONP → 4032; AFP → 4170; EsSalud → 6271/4031; Neto → 4111).'),
  ...figura('p05_03_mapeo_contable', 'Mapeo contable PCGE por regla salarial.'),
);

// 8. Seguros
agregar(
  h1('8. Seguros: planes EPS'),
  p('Ruta: **Nómina › Nómina PE › Seguros y EPS › Planes EPS**. El plan EPS determina el aporte del empleador a la EPS y el crédito contra EsSalud (máximo 25 % del aporte EsSalud).'),
  ...pasos([
    'Pulse **Nuevo**.',
    'Complete **Entidad**, **N° de póliza**, **Fecha de inicio** y **Fecha de finalización**.',
    'Ingrese la **Tasa empleador** y la **Tasa trabajador** en forma decimal (4.5 % = `0.045`).',
    'Guarde.',
  ]),
  ...figura('p06_02_plan_eps_formulario', 'Formulario de plan EPS.'),
  ...figura('p06_03_plan_eps_guardado', 'Plan EPS guardado.'),
  nota('La vista redondea la tasa a 2 decimales (0.045 se ve como 0.05), pero el valor guardado y usado en el cálculo es 0.045. El plan no tiene campo nombre y en los desplegables aparece como `eps.management,1`; identifíquelo por el orden de creación.', 'implementador'),
);

// 9. Alta de trabajador
agregar(
  h1('9. Alta de un trabajador'),
  p('Ruta: **Empleados › Nuevo** (o **Nómina › Empleados**). Se usa como ejemplo a **Carlos Alberto Quispe Mamani**: sueldo S/ 3,500, AFP Habitat (comisión sobre flujo), EPS y una hija menor (genera asignación familiar).'),
  h2('9.1 Datos principales'),
  ...pasos(['Escriba el **nombre completo** y el **puesto**.']),
  ...figura('p07_01_empleado_nuevo', 'Nombre y puesto del trabajador.'),
  h2('9.2 Pestaña Personal'),
  ...pasos([
    'Registre la **Fecha de nacimiento** (se calcula la edad).',
    'En **Ciudadanía › Número de identificación** registre el **DNI**: aparece en la boleta, PLAME y AFPnet (en el ejemplo, el DNI sintético `99999901`).',
  ]),
  ...figura('p07_02_personal_nacimiento', 'Fecha de nacimiento.'),
  ...figura('p07_02b_personal_dni', 'Número de identificación (DNI).'),
  h2('9.3 Pestaña Nómina PE'),
  p('Es la pestaña propia de la localización (datos del T-Registro).'),
  ...pasos([
    '**Identificación T-Registro**: Nombres, Apellido paterno, Apellido materno y Situación educativa.',
    '**Sistema pensionario**: elija la AFP u ONP. Si es AFP, el **CUSPP** es obligatorio y se elige el **Tipo de comisión** (flujo o mixta).',
    '**Salud**: régimen de salud (EsSalud regular, EsSalud + EPS, etc.), plan EPS, SCTR pensión y Vida Ley.',
    '**Derechohabientes**: agregue los hijos con parentesco **Hijo(a)**, nombre, género y fecha de nacimiento.',
  ]),
  ...figura('p07_03_nomina_pe_identificacion_pension', 'Identificación T-Registro y sistema pensionario.'),
  ...figura('p07_04_nomina_pe_salud', 'Régimen de salud y plan EPS.'),
  ...figura('p07_05_nomina_pe_derechohabientes', 'Derechohabientes: la hija genera la asignación familiar.'),
  h2('9.4 Pestaña Nómina (contrato)'),
  ...pasos([
    'En **Contrato** indique la fecha de inicio (y de fin si es a plazo fijo).',
    'Registre el **Salario** mensual.',
    'En **Categoría del pago** elija el tipo de estructura: **Régimen General** (mensual), **Obreros - Semanal** o **Quincenal - Adelanto**.',
    'Verifique el **horario laboral** (se usa para asistencias y días trabajados). Guarde.',
  ]),
  ...figura('p07_06_nomina_contrato', 'Fecha de contrato, salario y categoría del pago.'),
  nota('Los campos laborales peruanos del contrato (régimen laboral, condición, ocupación, porcentaje de adelanto, sindicalizado, motivo de baja) solo están en **Empleados › Configuración › Plantillas de contrato** y "Cargar una plantilla" no los copia al empleado. Si el régimen queda vacío, el cálculo asume **Régimen General**. Para MYPE, sindicalizados o adelantos por porcentaje se requiere un ajuste de la vista (pendiente en la localización).', 'implementador'),
  h2('9.5 Cuentas bancarias de sueldo y CTS'),
  ...pasos([
    'En la pestaña **Personal**, campo **Cuentas bancarias**, escriba el número de cuenta y elija **Crear y editar…**.',
    'Elija el **Banco**, el **Uso de la cuenta** (Sueldo o CTS) y el **CCI** de 20 dígitos. Guarde.',
    'Repita para la cuenta CTS.',
  ]),
  ...figura('p07_08_cuenta_bancaria_sueldo', 'Cuenta sueldo: banco, uso de la cuenta y CCI.'),
  ...figura('p07_10_personal_cuentas', 'Cuentas sueldo y CTS registradas.'),
  ...figura('p07_12_nomina_pe_cuentas_derechohabientes', 'La pestaña Nómina PE muestra las cuentas sueldo y CTS detectadas.'),
  nota('El formulario de cuenta bancaria muestra el campo **CCI** dos veces (dos módulos agregan el mismo campo). Además, mientras la cuenta no tenga activado **Enviar dinero**, los recibos validados muestran la advertencia "Cuentas bancarias no confiables".', 'implementador'),
);

// 10. Recibo individual
agregar(
  h1('10. Recibo de nómina individual'),
  p('Ruta: **Nómina › Recibos de nómina › Recibos** › **Nuevo**.'),
  nota('Orden obligatorio dentro de un mes: **1)** adelanto quincenal (NQA) validado, **2)** gratificación (julio y diciembre), **3)** vacaciones (VAC), **4)** mensual (NME) o semanal (NSO). El descuento del adelanto, la proyección de renta de 5ta y la CTS solo leen recibos **validados**.', 'importante'),
  h2('10.1 Crear y calcular'),
  ...pasos([
    'Elija el **Empleado** y la **Estructura** (por ejemplo **Gratificaciones** o **Nómina Mensual Empleados**). Los tipos de estructura no tienen estructura por defecto: selecciónela siempre.',
    'Indique el **Periodo** (del 1 al último día del mes) y guarde.',
    'Pulse **Calcular hoja** y revise la pestaña **Cálculo del salario**.',
  ]),
  ...figura('p13a_01_recibo_septiembre', 'Recibo con empleado, estructura y periodo.'),
  h3('Gratificación de julio'),
  ...figura('p08a_02_calculo', 'Gratificación de julio: (3,500 + 113) × 6/6 + bonificación extraordinaria Ley 30334 (9 %).'),
  h3('Recibo mensual de julio'),
  ...figura('p08b_02_calculo', 'Cálculo del recibo mensual: ingresos, AFP, EsSalud, EPS, SENATI y neto.'),
  h2('10.2 Validar'),
  ...pasos([
    'Pulse **Validate** (el botón aparece en inglés por traducción faltante de hr_payroll) y confirme con **De acuerdo**.',
    'El recibo pasa a **Validado** y se genera el asiento contable en borrador.',
  ]),
  ...figura('p08b_03a_confirmar', 'Confirmación de la validación.'),
  ...figura('p08c_01_recibo_validado_imprimir', 'Recibo validado: botones Pagar, Imprimir y acceso al asiento.'),
  h2('10.3 Asiento contable'),
  ...pasos([
    'Pulse el botón inteligente **Asiento contable (borrador)**.',
    'Revise los apuntes (6211, 4170, 6271/4031, 6275/4699, 6277/4033, 4111) y pulse **Publicar**.',
  ]),
  ...figura('p08c_03_asiento_borrador', 'Asiento de nómina en borrador.'),
  ...figura('p08c_04_asiento_publicado', 'Asiento publicado (SLR/2026/07/0001).'),
  h2('10.4 Boleta de pago'),
  p('El botón **Imprimir** genera la **Boleta de Pago de Remuneraciones** (D.S. N° 001-98-TR): datos del empleador y del trabajador, días y horas, ingresos, descuentos, aportes del empleador y neto en letras.'),
  ...figura('p08c_05_boleta_pago_pe', 'Boleta de Pago PE generada.', 560),
  nota('El PDF que Odoo adjunta automáticamente al validar (y envía por correo al trabajador) usa la plantilla estándar de hr_payroll, en inglés. Para que el adjunto sea la Boleta PE, configure el reporte en la estructura salarial.', 'implementador'),
  h2('10.5 Verificación del cálculo'),
  tabla(['Concepto (julio 2026)', 'Carlos Quispe', 'Jorge Fernández', 'María Torres'], [
    ['Remuneración básica', '3,500.00', '1,130.00', '8,000.00'],
    ['Asignación familiar', '113.00', '—', '—'],
    ['ONP / AFP aporte', 'AFP 361.30', 'ONP 146.90', 'AFP (mixta)'],
    ['AFP comisión / prima', '53.11 / 49.50', '—', '0.00 / —'],
    ['Renta de 5ta', '0.00', '0.00', '269.40'],
    ['EsSalud / EPS / crédito EPS', '325.17 / 162.59 / −81.29', 'EsSalud', 'EsSalud'],
    ['SENATI', '27.10', '—', '—'],
    ['**Neto a pagar**', '**3,149.09**', '**983.10**', '**6,821.00**'],
    ['Gratificación + bono (julio)', '3,613.00 + 243.88', '1,130.00 + 101.70', '8,000.00 + 720.00'],
  ], [2900, 2350, 2050, 2338]),
  p('Todos los valores coinciden con los esperados por el caso de demostración de la localización.'),
);

// 11. Lote
agregar(
  h1('11. Periodo (lote) de nómina'),
  p('Para procesar a varios trabajadores a la vez: **Nómina › Recibos de nómina › Periodos de nómina** (Pay Runs).'),
  ...pasos([
    'Pulse **Nuevo**, elija la **Estructura salarial** y el **Periodo**, y pulse **Siguiente**.',
    'Marque los trabajadores a incluir (excluya a quien ya tiene recibo del periodo) y pulse **Seleccionar**. Odoo crea y calcula los recibos.',
    'Revise netos y advertencias y pulse **Validar** (confirme con **De acuerdo**).',
  ]),
  ...figura('p10_02_nuevo_periodo', 'Nuevo periodo de nómina: estructura y periodo.'),
  ...figura('p10_03_seleccionar_empleados', 'Selección de trabajadores.'),
  ...figura('p10_04_periodo_creado', 'Recibos del periodo creados y calculados.'),
  ...figura('p10_06_periodo_validado', 'Periodo validado.'),
  nota('El asistente filtra a los trabajadores por **tipo de estructura**. Gratificaciones, CTS, Vacaciones y Liquidación pertenecen al tipo **Beneficios Sociales**, y los trabajadores al tipo Régimen General, por eso el lote de gratificación sale vacío. Mientras no se ajuste, procese estos beneficios con **recibos individuales**.', 'importante'),
  ...figura('p10a_03_paso2', 'Lote de gratificación: el asistente no encuentra trabajadores.'),
);

// 12. Asistencias
agregar(
  h1('12. Asistencias y su efecto en la boleta'),
  p('Con `solse_pe_payroll_asistencia_ee`, las marcaciones de la aplicación **Asistencias** (reloj, kiosko o registro manual) se convierten en faltas y tardanzas dentro del recibo.'),
  h2('12.1 Registrar marcaciones'),
  p('Normalmente provienen del reloj biométrico o del modo quiosco. Para un registro manual: **Asistencias › Gestión › Asistencias › Nuevo**, indique el empleado, la **Entrada** y la **Salida**.'),
  ...figura('p13_01_marcacion_manual', 'Marcación manual: llegada a las 8:25 a. m.'),
  ...figura('p13_02_lista_asistencias', 'Lista de asistencias del mes.'),
  h2('12.2 Conciliar en el recibo'),
  ...pasos([
    'Cree el recibo mensual del periodo (en borrador).',
    'Pulse **Cargar asistencias**.',
    'Revise **Días trabajados** (líneas de Falta injustificada no pagada), **Entradas salariales** (Horas de tardanza) y la pestaña **Asistencias** (detalle día por día).',
    'Pulse **Calcular hoja**.',
  ]),
  ...figura('p13a_02_dias_trabajados', 'Jorge: 20 días de asistencia y 2 faltas injustificadas.'),
  ...figura('p13a_04_resumen_asistencias', 'Detalle de la conciliación: faltas del 10 y 24 de septiembre.'),
  ...figura('p13a_05_calculo', 'Remuneración básica con 2 faltas: 1,130 / 30 × 28 = 1,054.67.'),
  p('Nota: estas capturas de Jorge son anteriores a registrar su vacación del 21 al 23 de septiembre. Con la vacación, el mismo mes queda como se muestra en el capítulo 13.6.'),
  ...figura('p13b_03_entradas', 'Carlos: 0.75 h de tardanza (3 días × 15 min sobre la tolerancia de 10 min).'),
  ...figura('p13b_05_calculo', 'Descuento por tardanzas: 3,500 / 240 × 0.75 = 10.94.'),
  nota('El importe de la pestaña Días trabajados (por horas del calendario) puede diferir de la Remuneración básica de la boleta, que se calcula sobre 30 días según la norma peruana. El importe válido es el de la regla **Remuneración básica**.'),
  nota('En Enterprise el **Descuento por tardanzas** (TAR_001) se muestra con importe **positivo** porque es una deducción (Neto = Ingresos − Deducciones). Las horas del recibo sí descuentan los minutos brutos de retraso: Carlos queda con **174.75 h** en septiembre (176 h − 3 × 25 min), que es lo que llega al `.jor` de PLAME.'),
  nota('En la prueba, el descuento por tardanza **no reduce** el concepto 0121 del `.rem` de PLAME (se declaró 3,500.00 con una tardanza de 10.94). Consulte con su contador cómo declararlo; queda registrado como observación (Anexo A, H-MAN-6).', 'implementador'),
);

// 13. Vacaciones y feriados
agregar(
  h1('13. Vacaciones y feriados'),
  p('Las vacaciones se rigen por el **D. Leg. 713** (descanso de 30 días calendario) y el D.S. 012-92-TR. La contadora del proyecto confirmó el criterio de cálculo que aplica la localización: durante el goce, la remuneración básica del mes **descuenta los días de vacaciones contados en días CALENDARIO** (incluidos sábados, domingos y feriados) sobre un **mes comercial de 30 días**.'),
  tabla(['Concepto', 'Fórmula', 'Dónde'], [
    ['Remuneración vacacional (VAC_001)', '(sueldo + asignación familiar) / 30 × días calendario de goce', 'Boleta de estructura **Vacaciones**'],
    ['Remuneración básica del mes (RB_001)', 'sueldo / 30 × (30 − días calendario no pagados)', 'Boleta **Nómina Mensual Empleados**'],
    ['Días no pagados', 'vacaciones + faltas + medias jornadas del periodo, en días calendario', 'Se suman todas las ausencias no pagadas del mes'],
  ], [2900, 4300, 2438]),
  espacio(),
  p('Resultado: el goce y la mensual del mismo mes suman **un solo sueldo**. Ejemplos medidos:'),
  tabla(['Caso', 'Goce', 'VAC_001', 'Básica del mes', 'Total'], [
    ['María (S/ 8,000) · base de ejemplo', '1–15 ago.', '4,000.00', '8,000/30 × (30 − 15) = 4,000.00', '8,000.00'],
    ['Jorge (S/ 1,130) · 2 faltas + vacaciones', '21–23 set.', '113.00', '1,130/30 × (30 − 2 − 3) = 941.67', '1,054.67'],
    ['Laboratorio SOLSE · S/ 3,000', '1–30 jul.', '3,000.00', '3,000/30 × (30 − 30) = 0.00', '3,000.00'],
    ['Laboratorio SOLSE · S/ 3,000', '1–15 jul.', '1,500.00', '3,000/30 × (30 − 15) = 1,500.00', '3,000.00'],
  ], [2900, 1200, 1200, 2900, 1438]),
  espacio(),
  h2('13.1 Tipo de ausencia'),
  p('La localización crea el tipo de ausencia **Vacaciones PE (D.Leg. 713)** (tipo de entrada de trabajo `VACPE100`), con asignación obligatoria y aprobación de RR.HH. El inicializador lo marca como **no pagado** en las estructuras mensual y semanal: **no** desmarque "Pagado" a mano en los días trabajados.'),
  h2('13.2 Asignar días de vacaciones'),
  ...pasos([
    'Ruta: **Vacaciones › Gestión › Asignaciones** › **Nuevo**.',
    'Tipo de permiso **Vacaciones PE (D.Leg. 713)**, el **Empleado**, el periodo de validez y la **Asignación** en días (30 por año completo de servicios). Guarde.',
    'Pulse **Validar**.',
  ]),
  ...figura('p16a_01_asignacion', 'Asignación de 30 días de Vacaciones PE.'),
  h2('13.3 Solicitar y aprobar el goce'),
  ...pasos([
    'Ruta: **Vacaciones › Gestión › Todo el tiempo personal** › **Nuevo** (o el propio trabajador desde **Mi tiempo**).',
    'Empleado, tipo **Vacaciones PE** y las **Fechas** del goce (elíjalas en el calendario: clic en el primer día y en el último). Guarde.',
    'Pulse **Validar**. El estado pasa a **Aprobado** y la ausencia queda "A calcular en el siguiente recibo de nómina".',
  ]),
  ...figura('p16a_03_solicitud', 'Solicitud del 1 al 15 de agosto: Odoo muestra 10 días (hábiles).'),
  ...figura('p16a_05_solicitud_aprobada', 'Vacación aprobada.'),
  nota('Una vacación en borrador o "Por aprobar" **no descuenta nada y no avisa**: verifique que esté **Aprobada** antes de calcular la nómina.', 'importante'),
  nota('Odoo descuenta del **saldo** los días **hábiles** del horario del trabajador (10 días para el goce del 1 al 15 de agosto), no los 15 días calendario. El **cálculo de la boleta sí usa días calendario** y es correcto; lo que queda sobrestimado es el saldo de vacaciones que muestra Odoo. Controle el saldo legal aparte hasta que se corrija (Anexo A, H-MAN-2).', 'implementador'),
  h2('13.4 Boleta de vacaciones'),
  ...pasos([
    'Cree un recibo con estructura **Vacaciones** y como periodo las fechas del goce (ej. 01/08 al 15/08).',
    'Pulse **Calcular hoja**: la línea **Remuneración vacacional** paga los días calendario del goce. Valide.',
    'Valide la boleta de vacaciones **antes** que la mensual del mes.',
  ]),
  ...figura('p17a_01_boleta_vacaciones', 'Boleta de vacaciones: 8,000 / 30 × 15 = 4,000.00.'),
  h2('13.5 Efecto en el recibo mensual'),
  p('Cree la mensual del mes **después** de aprobar la vacación. En **Días trabajados** la vacación aparece como línea **no pagada** y la **Remuneración básica** descuenta sus días calendario.'),
  ...figura('p17a_02_mensual_dias_trabajados', 'María, agosto: Vacaciones PE (no pagado) y Asistencia.'),
  ...figura('p17a_03_mensual_calculo', 'Remuneración básica de agosto: 4,000.00 (30 − 15 días).'),
  h2('13.6 Faltas y vacaciones en el mismo mes'),
  p('Las faltas (de la conciliación de asistencias) y las vacaciones se **suman** como días no pagados. Jorge, septiembre: 2 faltas + 3 días de vacaciones.'),
  ...figura('p17b_01_faltas_y_vacaciones_dias', 'Vacaciones PE 3 días, Asistencia 17 y Faltas 2.'),
  ...figura('p17b_02_faltas_y_vacaciones_calculo', 'Remuneración básica: 1,130 / 30 × (30 − 2 − 3) = 941.67.'),
  nota('Si la vacación se aprueba **después** de crear el recibo mensual, la pestaña Días trabajados no la muestra ("Cargar asistencias" no la agrega), aunque la Remuneración básica sí la descuenta. Como el `.jor` de PLAME suma esas líneas, **elimine el borrador y vuelva a crear el recibo** (Anexo A, H-MAN-5).', 'importante'),
  h2('13.7 Feriados'),
  p('Los feriados están **dentro** de los 30 días comerciales: no aumentan ni reducen la remuneración básica. Para que la boleta los muestre como día pagado, hay que registrarlos **con un tipo de entrada de trabajo pagado**.'),
  ...pasos([
    'Ruta: **Vacaciones › Configuración › Días festivos** › **Nuevo**.',
    'Nombre (ej. **Combate de Angamos**), fecha de inicio y fin (el mismo día) y **Tipo de entrada de trabajo**: un tipo **pagado**, por ejemplo **Tiempo personal genérico**. Guarde.',
    'Registre los feriados del año **antes** de calcular la nómina de cada mes.',
  ]),
  ...figura('p18_03_dia_festivo_tipo_entrada', 'Feriado del 8 de octubre con tipo de entrada Tiempo personal genérico.'),
  nota('Sin **Tipo de entrada de trabajo**, el día del feriado queda como entrada **en conflicto** y la boleta no lo muestra. La localización no trae un tipo "Feriado": use uno pagado del estándar o cree uno propio (Anexo A, H-MAN-4).', 'implementador'),
  h3('Regenerar las entradas de trabajo'),
  p('Odoo genera las entradas de trabajo por adelantado. Un feriado (o una ausencia) registrado **después** no se aplica a las entradas ya generadas: hay que **regenerarlas**.'),
  ...pasos([
    'Ruta: **Nómina › Entradas de trabajo › Entradas de trabajo**.',
    'Pulse **Restablecer**, elija los **Empleados** y el **Periodo** (el mes completo) y pulse **Volver a generar entradas de trabajo**.',
    'Cree (o vuelva a crear) los recibos del mes.',
  ]),
  ...figura('p18_04b_restablecer_entradas', 'Regeneración de entradas de trabajo del mes.'),
  ...figura('p18_04c_entradas_trabajo_despues', 'El 8 de octubre de Carlos pasa a "GTO" (Tiempo personal genérico).'),
  ...figura('p18_05_recibo_linea_feriado', 'Boleta de octubre: feriado pagado (1 día, 8 h) y 21 días de asistencia; básica 3,500.'),
  nota('Regenere las entradas del mes **antes de crear los recibos**. En la prueba, tras aprobar la vacación de María, agosto quedó solo con las entradas de vacaciones y **sin entradas de asistencia**: su mensual tuvo una sola línea y el `.jor` de PLAME la declaró con **0 días y 0 horas** aunque cobró el mes. Tras "Restablecer" y rehacer el recibo, el `.jor` declaró 11 días y 88 horas (Anexo A, H-MAN-3).', 'importante'),
);

// 13. Reportes
agregar(
  h1('14. Reportes y archivos legales'),
  p('Todos los asistentes toman únicamente los recibos **validados** del mes y año indicados.'),
  h2('14.1 Planilla de sueldos'),
  p('Ruta: **Nómina › Nómina PE › Planilla de sueldos**. Elija mes y año; **Imprimir PDF** o **Generar Excel**.'),
  ...figura('p11_01_planilla_asistente', 'Asistente de planilla de sueldos.'),
  ...figura('p11_01b_planilla_pdf', 'Planilla de sueldos de julio 2026 (PDF).'),
  h2('14.2 PLAME (archivos PDT)'),
  p('Ruta: **Nómina › Nómina PE › PLAME (archivos PDT)**. Genera un ZIP `0601AAAAMM<RUC>` con `.rem` (remuneraciones), `.jor` (jornada) y `.snl`. Con el módulo de 4ta, incluye además `.ps4` y `.4ta` (casilla **Incluir 4ta categoría**). El resumen indica trabajadores, líneas y conceptos T22.'),
  ...figura('p11_04_plame_generado', 'ZIP PLAME generado con su resumen.'),
  p('Formato del archivo de jornada **`.jor`** (una línea por trabajador, campos separados y terminados con `|`):'),
  tabla(['Campo', 'Contenido', 'Ejemplo (Carlos, septiembre)'], [
    ['1', 'Tipo de documento', '01'],
    ['2', 'Número de documento', '99999901'],
    ['3', 'Días efectivamente laborados (líneas pagadas de Días trabajados)', '22'],
    ['4', 'Horas ordinarias', '174'],
    ['5', '**Minutos** de la jornada ordinaria (confirmado por la contadora, P-02)', '45'],
    ['6', 'Horas de sobretiempo (HE25 + HE35)', '0'],
    ['7', 'Minutos de sobretiempo', '0'],
  ], [900, 5600, 3138]),
  espacio(),
  p('Línea generada en la base de ejemplo: `01|99999901|22|174|45|0|0|` (174.75 h = 174 h 45 min, por las tardanzas de septiembre). Con jornadas exactas de 8 h el campo de minutos sale 0. Las vacaciones y faltas no cuentan como días laborados.'),
  ...figura('p14_02_plame_setiembre', 'PLAME de septiembre 2026.'),
  h2('14.3 AFPnet'),
  p('Ruta: **Nómina › Nómina PE › AFPnet**. Genera el Excel (hoja TRABAJADOR) con los afiliados al SPP que tienen CUSPP.'),
  ...figura('p11_05_afpnet_generado', 'Excel AFPnet generado.'),
  h2('14.4 Pago masivo a bancos'),
  ...pasos([
    'Ruta: **Nómina › Nómina PE › Pago masivo a bancos**.',
    'Elija mes, año, **Tipo de pago** (Haberes o CTS), **Banco de cargo**, **Cuenta de cargo** de la empresa y **Fecha de pago**.',
    'Pulse **Generar TXT** y descargue el archivo para cargarlo en la banca por internet.',
  ]),
  ...figura('p11_06_bancos_asistente', 'Parámetros del pago masivo.'),
  ...figura('p11_07_bancos_generado', 'TXT generado: 3 trabajadores, total S/ 10,953.19.'),
  nota('Antes de cargar el TXT en producción, valídelo con el banco. En la prueba: (a) las cuentas del propio BCP salieron como interbancarias (usa el CCI), porque el código de banco se toma del BIC; (b) los nombres llevan tildes (ej. "Fernández"), que algunos formatos bancarios no aceptan; (c) al elegir **Scotiabank** se genera el formato Interbank.', 'implementador'),
);

// 14. RxH
agregar(
  h1('15. Recibos por honorarios (4ta categoría)'),
  p('Los recibos por honorarios se registran en Contabilidad como facturas de proveedor con tipo de documento **02**; el pago determina el periodo en que se declaran (criterio de percepción).'),
  h2('15.1 Configuración (una sola vez)'),
  h3('Tipo de documento 02 para compras'),
  ...pasos([
    'Ruta: **Contabilidad › Configuración › Tipos de documento** › **Nuevo**.',
    'Nombre **Recibo por Honorarios**, código **02**, prefijo **E**, país Perú, tipo **Factura** y **Sub tipo: Compra**, de la compañía. Guarde.',
  ]),
  ...figura('p12_00_tipo_documento_rxh', 'Tipo de documento 02 con sub tipo Compra.'),
  nota('Sin este registro el tipo 02 **no aparece** en la factura de proveedor: la localización solo ofrece tipos de documento de la compañía con sub tipo Compra. Los RxH no se incluyen en el Registro de Compras (SIRE/PLE), por eso esas casillas quedan desmarcadas.', 'implementador'),
  h3('Ajustes PLAME - Recibos por Honorarios'),
  p('Ruta: **Contabilidad › Configuración › Ajustes**, bloque **PLAME - Recibos por Honorarios**. Deje vacío el régimen pensionario (campo 10) y desactivado el relleno con ceros, salvo indicación del contador.'),
  ...figura('p12_01_ajustes_plame_rxh', 'Ajustes PLAME - Recibos por Honorarios.'),
  h3('Impuesto de retención de 4ta (8 %)'),
  ...pasos([
    'Ruta: **Contabilidad › Configuración › Impuestos** › **Nuevo**.',
    'Nombre **Retención Renta 4ta Categoría 8%**, tipo **Compras**, importe **-8 %**.',
    'En **Definición**, asigne la cuenta **4017200** (Renta de cuarta categoría) a la línea de impuesto de factura y de nota de crédito.',
    'En **Opciones avanzadas**, marque **Retención de renta de 4ta categoría**. Guarde.',
  ]),
  ...figura('p12_02_impuesto_retencion_4ta', 'Impuesto de retención: compras, -8 %.'),
  ...figura('p12_03_impuesto_cuentas', 'Cuenta 4017200 en las líneas de distribución.'),
  ...figura('p12_04_impuesto_marcar_retencion_4ta', 'Casilla Retención de renta de 4ta categoría.'),
  nota('Cree un **grupo de impuestos** propio (por ejemplo "Retenciones 4ta"): con el grupo por defecto, la retención se muestra como "IGV: -240.00" en los totales de la factura.', 'implementador'),
  h2('15.2 Prestador de servicios'),
  ...pasos([
    'Ruta: **Contabilidad › Proveedores › Proveedores** › **Nuevo**. Seleccione **Persona**.',
    'Escriba el nombre, tipo de identificación **RUC** y el número (RUC 10…).',
    'Guarde. Recién entonces aparece la pestaña **PLAME 4ta categoría**.',
    'En esa pestaña complete **Apellido paterno**, **Apellido materno** y **Nombres** tal como figuran en el RUC (o use **Separar desde el nombre completo** y revise). Verifique Tipo de documento PLAME (06) y Domiciliado. Registre las constancias de suspensión de retención si las hubiera.',
  ]),
  ...figura('p12_05_prestador_datos', 'Prestador persona con RUC (búsqueda automática desactivada en el ejemplo).'),
  ...figura('p12_06_prestador_pestana_plame', 'Pestaña PLAME 4ta categoría.'),
  nota('La casilla **Búsqueda automática** consulta SUNAT al ingresar el RUC y reemplaza el nombre y el tipo de contacto con los datos oficiales. En producción es lo deseable; en este manual se desactivó porque los datos son ficticios.'),
  h2('15.3 Registrar y pagar el recibo'),
  ...pasos([
    'Ruta: **Contabilidad › Proveedores › Facturas** › **Nuevo**.',
    'Proveedor, **Tipo de Documento: (02) Recibo por Honorarios**, **Número de Documento** (ej. `E001-103`), **Referencia de factura** (obligatoria; use el mismo número) y **Fecha de la factura** (emisión).',
    'Agregue la línea del servicio con su importe. Si supera S/ 1,500 y el prestador no tiene suspensión, aplique la **retención de 4ta**; si no, deje la línea sin impuestos.',
    'Pulse **Confirmar**.',
    'Pulse **Pagar**: elija el diario de banco, la **Fecha de pago** y el **Medio de Pago** (Tabla 1 SUNAT, obligatorio), y pulse **Crear pago**.',
  ]),
  ...figura('p12_07_recibo_honorarios', 'Recibo por honorarios E001-103: S/ 3,000 con retención de 8 % (neto S/ 2,760).'),
  ...figura('p12_07b_registrar_pago', 'Registro del pago con medio de pago SUNAT.'),
  h2('15.4 Exportar la 4ta categoría'),
  ...pasos([
    'Ruta: **Contabilidad › Reportes › PLAME - Recibos por Honorarios**.',
    'Indique **Ejercicio** y **Mes**; pulse **Revisar periodo**. Se listan los recibos **pagados** en el mes.',
    'Revise la pestaña **Validaciones** (errores bloquean, advertencias no).',
    'Pulse **Generar archivos** y descargue `.ps4` (prestadores) y `.4ta` (comprobantes). En el PDT se importa primero el .ps4 y luego el .4ta.',
  ]),
  ...figura('p12_09_exportar_rxh_revision', 'Revisión del periodo: 2 prestadores, 2 comprobantes, S/ 3,800.'),
  ...figura('p12_11_exportar_rxh_archivos', 'Archivos .ps4 y .4ta generados.'),
  p('Con `solse_pe_plame_4ta_ee`, el asistente **PLAME (archivos PDT)** de nómina incluye estos dos archivos dentro del mismo ZIP:'),
  ...figura('p12_12_plame_nomina_con_4ta', 'ZIP PLAME de nómina con el anexo de 4ta categoría.'),
);

// 15. Cierre mensual
agregar(
  h1('16. Lista de verificación del cierre mensual'),
  ...pasos([
    'Actualizar parámetros con nuevas vigencias (RMA trimestral, RMV, UIT en enero, comisiones AFP).',
    'Altas, bajas y cambios de sueldo de trabajadores; cuentas bancarias con CCI.',
    'Feriados del mes registrados con tipo de entrada pagado.',
    'Ausencias (vacaciones) **aprobadas** y asistencias completas del mes.',
    'Regenerar las entradas de trabajo del mes (**Restablecer**) antes de crear los recibos.',
    'Validar adelantos quincenales (NQA).',
    'Gratificaciones (julio/diciembre) y CTS (mayo/noviembre) con recibos individuales.',
    'Boletas de vacaciones (VAC) del mes, validadas antes de la mensual.',
    'Recibos mensuales (NME) / semanales (NSO): calcular, revisar y validar (individual o por periodo).',
    'Publicar asientos de nómina.',
    'Imprimir boletas y enviarlas.',
    'Planilla de sueldos, AFPnet, PLAME (con 4ta) y TXT de bancos.',
    'Recibos por honorarios pagados en el mes y exportación .ps4/.4ta.',
  ]),
);

// Anexo A
agregar(
  h1('Anexo A. Observaciones para implementadores'),
  p('Hallazgos de la prueba integral en Odoo 19 Enterprise, contrastados con la biblia del proyecto (rama de nómina Enterprise, planes NOM-1/2/3, respuestas de la contadora y mapa de pendientes). La columna **Biblia** indica si la observación ya estaba registrada. Las correcciones corresponden al equipo de desarrollo; el detalle está en `99-sintesis/manual-hallazgos-nuevos.md` de la biblia.'),
  tabla(['#', 'Observación', 'Impacto / acción', 'Biblia'], [
    ['1', 'Lote (Periodo de nómina) de Gratificación/CTS/VAC/LIQ no encuentra trabajadores: filtra por tipo de estructura (Beneficios Sociales).', 'Alto. Recibos individuales.', 'Nuevo'],
    ['2', 'Campos laborales PE de hr.version (régimen, adelanto %, sindicalizado, motivo de baja) solo en la plantilla de contrato; no se copian al cargar plantilla.', 'Alto para MYPE, sindicalizados y adelantos.', 'Nuevo'],
    ['3', 'Pago a bancos: cuentas BCP tratadas como interbancarias (código desde BIC); Scotiabank genera formato Interbank; `CODIGO_SCOTIABANK` no definido; nombres con tildes.', 'Alto. Validar el TXT con el banco.', 'Nuevo (zona sin caso de prueba)'],
    ['H-MAN-3', 'Tras aprobar una vacación, el mes puede quedar sin entradas de asistencia: el `.jor` declara 0 días y 0 horas.', 'Alto. Restablecer entradas antes de los recibos (cap. 13.7).', 'Nuevo'],
    ['4', 'Tipo de documento 02 de compra no existe por defecto para la compañía: los RxH no se pueden registrar hasta crearlo.', 'Medio. Paso de configuración (cap. 15).', 'Causa registrada (M-4); hueco nuevo'],
    ['5', 'Instalación de solse_pe_plame_4ta_ee falla si solse_pe_payroll no está actualizado en la base.', 'Medio. Actualizar el núcleo.', 'Nuevo'],
    ['6', 'Tipos de estructura sin estructura por defecto.', 'Medio. Elegir la estructura en cada recibo.', 'Nuevo'],
    ['7', 'El PDF adjunto al validar es la plantilla estándar (inglés), no la Boleta PE.', 'Medio. Configurar el reporte en la estructura.', 'Nuevo'],
    ['8', 'Falta la cuenta 6221 en el plan para UTIL_001.', 'Medio. Crear la cuenta.', 'Nuevo'],
    ['9', 'RMV sin vigencia 2026; la RMA de abril 2026 dispara la alerta trimestral.', 'Medio. Registrar valores oficiales.', 'RMV nuevo; alerta RMA = comportamiento documentado'],
    ['H-MAN-2', 'El saldo de Vacaciones PE se consume en días hábiles (10 por un goce de 15 días calendario); el cálculo de la boleta sí usa calendario.', 'Medio. Controlar el saldo legal aparte.', 'Nuevo'],
    ['H-MAN-4', 'Feriado sin tipo de entrada de trabajo → día en conflicto; la localización no trae tipo "Feriado".', 'Medio. Asignar un tipo pagado (cap. 13.7).', 'Nuevo (la "línea GLOBAL" de la biblia es de Community)'],
    ['H-MAN-6', 'El descuento por tardanza (TAR_001) no reduce el 0121 del `.rem`.', 'Medio. Consultar al contador.', 'Nuevo'],
    ['H-MAN-5', 'Vacación aprobada después de crear la mensual: no aparece en Días trabajados (la básica sí la descuenta).', 'Bajo en importes. Rehacer el recibo.', 'Nuevo'],
    ['10', 'Contratos MINTRA (T12) vacío.', 'Bajo.', 'Nuevo'],
    ['11', 'Plan EPS sin nombre (`eps.management,1`); tasa mostrada con 2 decimales.', 'Bajo (cosmético).', 'Nuevo'],
    ['12', 'Campo CCI duplicado en la cuenta bancaria; pestaña PLAME 4ta del contacto visible solo tras guardar.', 'Bajo (cosmético).', 'Nuevo'],
    ['13', 'Botón "Validate" sin traducir; Año mostrado como "2,026" en asistentes.', 'Bajo (cosmético).', 'Nuevo'],
    ['14 / H-MAN-1', 'Identificadores de los datos demo que pertenecen a personas reales: un RUC del padrón de RxH y un DNI de la matriz de empleados de nómina devuelven nombre en la consulta SUNAT/RENIEC (números en la biblia, H-MAN-1).', 'Bajo en la operación, sensible en privacidad. Usar sintéticos.', 'Nuevo; contradice la ficha QA del padrón RxH'],
  ], [900, 4500, 2300, 1938]),
);

// Anexo B
agregar(
  h1('Anexo B. Datos de prueba utilizados'),
  p('Todos los datos son **ficticios**. Los identificadores son **sintéticos**: se comprobó con el botón "Buscar por RUC/DNI" de Odoo (consulta RENIEC/SUNAT) que no devuelven ninguna persona. Para crear más, use DNI de la serie `9999xxxx` y, para RUC de persona natural, `10` + DNI + dígito verificador módulo 11.'),
  tabla(['Trabajador', 'DNI (sintético)', 'Sueldo', 'Pensión', 'Particularidades'], [
    ['Carlos Alberto Quispe Mamani', '99999901', '3,500', 'SPP Habitat (flujo)', 'EPS Pacífico, hija menor, tardanzas en septiembre, feriado en octubre'],
    ['Jorge Luis Fernández Rojas', '99999902', '1,130', 'ONP', '2 faltas y 3 días de vacaciones en septiembre'],
    ['María Elena Torres Vega', '99999903', '8,000', 'SPP Integra (mixta)', 'Renta de 5ta; vacaciones del 1 al 15 de agosto'],
  ], [2700, 1400, 900, 1800, 2838]),
  espacio(),
  tabla(['Prestador (ficticio)', 'RUC (sintético)', 'Recibo', 'Importe', 'Emisión / Pago', 'Retención'], [
    ['FLORES PAREDES ROSA ELENA', '10999999048', 'E001-103', '3,000.00', '05/07 / 12/07', '8 % (240.00)'],
    ['QUISPE HUAMAN ANA LUCIA', '10999999056', 'E001-101', '800.00', '03/07 / 10/07', 'No'],
  ], [2700, 1400, 1100, 1100, 1800, 1538]),
  espacio(),
  p('Los scripts de Playwright que generaron estas capturas están en `manuales/scripts/` y permiten regenerarlas ante cambios de versión.'),
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
  title: 'Manual de Nómina Peruana - Odoo 19',
  description: 'Manual de usuario de la nómina peruana (localización SOLSE) en Odoo 19 Enterprise',
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
    headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: 'Manual de Nómina Peruana · Odoo 19 Enterprise', size: 16, color: '888888' })] })] }) },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Página ', PageNumber.CURRENT, ' de ', PageNumber.TOTAL_PAGES], size: 16, color: '888888' })] })] }) },
    children: contenido,
  }],
});

Packer.toBuffer(documento).then((buffer) => {
  fs.writeFileSync(SALIDA, buffer);
  console.log(`Manual generado: ${SALIDA} (${numeroFigura} figuras)`);
});
