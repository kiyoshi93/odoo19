// Manual v3, bloque 1: capítulos 1 a 9 (configuración). Menú medido en contable19 el 2026-11-09 (ir.ui.menu, es_PE).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 3
  a(
    h1('3. Menú de Nómina'),
    p('Todo está bajo la aplicación **Nómina**, que se abre desde el menú de aplicaciones (icono de cuadrícula, arriba a la izquierda). Con la suite de facturación SOLSE instalada, **Nómina PE** aparece también bajo el menú raíz de SOLSE: es el mismo menú.'),
    ...figura('c03_01_menu_principal', 'Menú de aplicaciones: la nómina está en «Nómina»; el laboratorio, en «SOLSE Demo».'),
    ...figura('c03_02_menu_nomina_pe', 'Menú Nómina PE de la versión 3: parámetros, maestros SUNAT, seguros (con «Pólizas SCTR»), salidas legales, AFPnet y su pago, utilidades, renta de 5.ª, contabilidad y provisiones.'),
    p('El menú **Nómina PE** queda así, en el orden en que aparece. En **negrita**, lo que no estaba en el manual v2. La columna «Quién lo ve» es el grupo de acceso tal como se llama en Ajustes › Usuarios.'),
    tabla(['Menú', 'Para qué', 'Quién lo ve', 'Capítulo'], [
      ['Nóminas del empleado', 'Boletas individuales', 'Nómina / Oficial', '10'],
      ['Procesamientos de nóminas', 'Lotes del mes', 'Nómina / Oficial', '11'],
      ['Empleados › Empleados / Contratos', 'Fichas y contratos (versiones)', 'Fichas: Nómina / Oficial; Contratos: Empleados / Administrador', '8'],
      ['Nómina PE › Parámetros de Nómina PE', 'UIT, RMV, tasas y topes con vigencia. Es el **único** acceso: el duplicado de Configuración se quitó (U-09)', 'Nómina / Responsable', '4'],
      ['Nómina PE › Maestros SUNAT', 'T11, T33, T12, T30, T17, T9, T34, T28, T35, T19 y T22', 'Nómina / Oficial', '5'],
      ['Nómina PE › Seguros y EPS › Planes EPS / Vida Ley', 'Planes EPS y pólizas de Vida Ley', 'Nómina / Oficial', '6'],
      ['Nómina PE › Seguros y EPS › **Pólizas SCTR**', 'Una póliza por entidad y vigencia, con su tasa (N-12, lote 19)', 'Nómina / Oficial', '6'],
      ['Nómina PE › Planilla de sueldos', 'Planilla del mes en Excel', 'Nómina / Oficial', '27'],
      ['Nómina PE › Pago masivo a bancos', 'TXT de haberes y CTS (BCP, Interbank, Scotiabank)', 'Nómina / Oficial', '27'],
      ['Nómina PE › PLAME (archivos PDT)', 'ZIP del PDT 601', 'Nómina / Oficial', '27'],
      ['Nómina PE › T-Registro (carga masiva)', 'Altas, bajas, modificaciones y derechohabientes', 'Nómina / Oficial', '29'],
      ['Nómina PE › AFPnet (planilla previsional)', 'Archivo de AFPnet', 'Nómina / Oficial', '27'],
      ['Nómina PE › **AFPnet: registrar el pago**', 'Un asiento por AFP con la fecha del pago (P-53 d, lote 38). También está en Contabilidad › Proveedores', 'Contabilidad / Facturación', '28'],
      ['Nómina PE › Reparto de utilidades', 'Participación de utilidades (D.Leg. 892)', 'Nómina / Oficial', '20'],
      ['Nómina PE › **Trabajadores del reparto de utilidades**', 'Las líneas de todos los repartos, para buscar y filtrar por trabajador', 'Nómina / Oficial', '20'],
      ['Nómina PE › Certificado de 5.ª categoría', 'Certificado anual de rentas y retenciones', 'Nómina / Oficial', '13'],
      ['Nómina PE › **Detalle de Renta de 5ta**', 'El cálculo de la 5.ª de cada boleta, paso a paso (módulo `solse_pe_payroll_renta5_ce`, lote 39)', 'Nómina / Oficial', '13'],
      ['Nómina PE › Contabilidad de nómina › Mapeo contable PCGE / Asignar cuentas contables', 'Cuentas de las reglas por compañía', 'Nómina / Responsable', '7'],
      ['Nómina PE › Contabilidad de nómina › **Provisiones del mes**', 'Asistente que genera la provisión mensual de beneficios (N-13)', 'Nómina / Responsable', '7'],
      ['Nómina PE › **Provisiones de beneficios**', 'Consulta de lo provisionado por trabajador y beneficio', 'Nómina / Oficial', '7'],
      ['Nómina PE › Datos de prueba (demo)', 'Solo laboratorio (capítulo 2)', 'Nómina / Responsable', '2'],
    ], [3300, 3638, 1700, 1000]),
    nota('«Nómina / Oficial» es el usuario de nómina; «Nómina / Responsable», su administrador. Desde el lote 38 (O-74 y O-79), **Nómina / Oficial** crea, calcula, valida, imprime y envía las boletas y liquidaciones que puede ver, sin «Empleados / Administrador», que le abriría toda la ficha de todos los empleados. Lo que no puede ver sigue cerrado: las boletas de un área que no dirige o de una compañía que no tiene. Desde el lote 40 (O-158), las boletas, sus líneas, las entradas y los lotes solo se ven en su compañía: con varias compañías seleccionadas, cada lista muestra las de la compañía activa. Anote los grupos de nómina en el documento de seguridad de la compañía y revíselos cada seis meses (D.S. 016-2024-JUS, arts. 46 y 47).', 'implementador'),
    ...figura('c03_03_menu_configuracion', 'Menú Configuración: ajustes, estructuras, reglas salariales, registros de contribución y plantillas. Los parámetros ya no se repiten aquí.'),
    ...figura('c03_04_menu_empleados', 'Menú Empleados: fichas y contratos.'),
    nota('En la versión 3 los años ya no llevan separador de miles (lote 59): el ejercicio de un reparto, de un certificado o de una constancia se ve «2026», no «2,026», y las filas agrupadas por año ya no los suman. Los importes de los PDF sí llevan coma de miles, como el resto de Odoo en español de Perú: «1,234.56».', 'nota'),
    pieCapitulo(['base', 'ce', 'renta5', 'ce_demo'], 'U-09, N-12 (lote 19), P-53 d y O-74/O-79 (lote 38), lote 39, O-158 (lote 40), lote 59'),
  );


  return c;
};
