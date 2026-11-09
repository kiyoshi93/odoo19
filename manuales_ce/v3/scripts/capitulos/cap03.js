// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Cifras y pantallas medidas en contable19 el 2026-10-22.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 3
  a(
    h1('3. Menú de Nómina'),
    p('Todo está bajo la aplicación **Nómina**, que se abre desde el menú de aplicaciones (icono de cuadrícula, arriba a la izquierda).'),
    ...figura('c03_01_menu_principal', 'Menú de aplicaciones: la nómina está en «Nómina»; el laboratorio, en «SOLSE Demo».'),
    ...figura('c03_02_menu_nomina_pe', 'Menú Nómina PE: parámetros, maestros SUNAT (con T19, T28 y T34), seguros, salidas legales (incluidos T-Registro y Certificado de 5.ª) y contabilidad de nómina.'),
    tabla(['Menú', 'Para qué', 'Capítulo'], [
      ['Nóminas del empleado', 'Boletas individuales', '10'],
      ['Procesamientos de nóminas', 'Lotes del mes', '11'],
      ['Empleados › Empleados / Contratos', 'Fichas y contratos (versiones)', '8'],
      ['Nómina PE › Parámetros de Nómina PE', 'UIT, RMV, tasas y topes con vigencia. Es el **único** acceso: el duplicado de Configuración se quitó (U-09)', '4'],
      ['Nómina PE › Maestros SUNAT', 'T11, T33, T12, T30, T17, T9, **T34**, **T28**, T35, **T19** y T22', '5'],
      ['Nómina PE › Seguros y EPS', 'Planes EPS y pólizas de Vida Ley', '6'],
      ['Nómina PE › Planilla de sueldos', 'Planilla del mes en Excel', '27'],
      ['Nómina PE › Pago masivo a bancos', 'TXT de haberes y CTS (BCP, Interbank, Scotiabank)', '27'],
      ['Nómina PE › PLAME (archivos PDT)', 'ZIP del PDT 601', '27'],
      ['Nómina PE › **T-Registro (carga masiva)**', 'Altas, bajas, modificaciones y derechohabientes', '29'],
      ['Nómina PE › AFPnet (planilla previsional)', 'Archivo de AFPnet', '27'],
      ['Nómina PE › Reparto de utilidades', 'Participación de utilidades (D.Leg. 892)', '20'],
      ['Nómina PE › **Certificado de 5.ª categoría**', 'Certificado anual de retenciones', '13'],
      ['Nómina PE › Contabilidad de nómina', 'Mapeo PCGE y asignación de cuentas', '7'],
      ['Nómina PE › Datos de prueba (demo)', 'Solo laboratorio (capítulo 2)', '2'],
    ], [3800, 4638, 1200]),
    ...figura('c03_03_menu_configuracion', 'Menú Configuración: estructuras, reglas salariales, registros de contribución y plantillas. Los parámetros ya no se repiten aquí.'),
    ...figura('c03_04_menu_empleados', 'Menú Empleados: fichas y contratos.'),
    pieCapitulo(['base', 'ce'], 'U-09'),
  );


  return c;
};
