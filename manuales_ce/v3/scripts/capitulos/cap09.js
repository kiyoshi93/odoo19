// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Estructuras, reglas y opciones de la compañía releídas en
// contable19 el 2026-11-09 (search_read y fields_get, es_PE).
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 9
  a(
    h1('9. Estructuras salariales'),
    p('Cada boleta se calcula con una **estructura**: el conjunto de reglas que paga un tipo de planilla. En la versión 3 hay trece estructuras de SOLSE, cada una con su **Tipo de planilla** (C-42, lote 16), que es lo que leen las salidas legales para elegir sus boletas:'),
    tabla(['Código', 'Estructura', 'Tipo de planilla', 'Reglas', 'Uso'], [
      ['NME', 'Nómina Mensual Empleados', 'Mensual', '70', 'Planilla mensual'],
      ['NSO', 'Nómina Semanal Obreros', 'Semanal', '70', 'Planilla semanal'],
      ['NQA', 'Nómina Quincenal / Adelanto', 'Adelanto o quincena', '3', 'Adelanto quincenal (porcentaje del contrato)'],
      ['GRAT', 'Gratificaciones', 'Gratificación', '15', 'Julio y diciembre'],
      ['CTS', 'CTS', 'CTS', '9', 'Mayo y noviembre'],
      ['VAC', 'Vacaciones', 'Vacaciones', '33', 'Goce de vacaciones'],
      ['LIQ', 'Liquidación', 'Liquidación', '33', 'Cese: truncas, indemnización y 5.ª del cese'],
      ['**COMI**', '**Planilla de comisiones**', 'Adicional', '27', 'Comisiones y otros conceptos del lote 15 en su propia boleta (lote 16)'],
      ['**BONI**', '**Planilla de bonificaciones**', 'Adicional', '27', 'Bonificaciones en su propia boleta (lote 16)'],
      ['**UTIL**', '**Planilla de utilidades**', 'Adicional', '6', 'Participación en las utilidades: solo renta de 5.ª (lote 16)'],
      ['**SMF**', '**Subvención de modalidad formativa**', 'Modalidad formativa', '7', 'El practicante (lote 49a, capítulo 31)'],
      ['0001 / BASE', 'Reglas Básicas / Base for new structures', '(sin tipo)', '71 / 3', '«Reglas Básicas» es la plantilla de las reglas: de ella se copian las que falten en una estructura. No se usan para calcular'],
    ], [1100, 2900, 1700, 900, 3038]),
    ...figura('c09_01_estructuras', 'Las estructuras de SOLSE con la columna «Tipo de planilla» y el número de reglas de cada una. En el laboratorio aparece además «Nómina Mensual Empleados (copia del caso ADICIONALES)», una copia hecha con «Duplicar».'),
    ...figura('c09_02_estructura_nme', 'Estructura NME: reglas con código y categoría; la pestaña «Ausencias no pagadas» define qué ausencias descuentan.'),
    h2('9.1 El tipo de planilla'),
    p('El campo **Tipo de planilla** está en el formulario de la estructura y, desde el lote 16b, también en la lista del menú **Configuración › Estructuras salariales** (columna opcional, visible por defecto). Con él, cada salida elige las boletas:'),
    tabla(['Salida', 'Tipos que toma'], [
      ['PLAME (`.rem`)', 'Mensual, semanal, gratificación, vacaciones, liquidación y adicional. La jornada (`.jor`), de la mensual y la semanal'],
      ['AFPnet', 'Mensual, semanal, vacaciones, liquidación y adicional'],
      ['Pago a bancos', 'Haberes: mensual y semanal, más gratificación y adicional si se marcan sus casillas. CTS: la CTS'],
      ['Planilla del mes', 'Mensual; más semanal y adicional si se marcan sus casillas'],
      ['Reparto de utilidades', 'Todos salvo adelanto y CTS; los días, de la mensual y la semanal'],
      ['Modalidad formativa', 'Ninguna de las anteriores salvo el pago a bancos: el practicante va al archivo del personal en formación del PLAME y a su propia alta del T-Registro (capítulo 31)'],
    ], [2600, 7038]),
    vinetas([
      'Las estructuras de SOLSE ya traen su tipo. Las propias del cliente reciben el tipo al actualizar, según sus reglas; si no se reconoce ninguna, quedan sin tipo, el log las nombra y hay que asignarlo a mano.',
      'Una estructura copiada con **Duplicar** hereda el tipo, y sus boletas salen en las mismas salidas que la original. Comparte las reglas de la original: marcar una casilla en una regla de la copia también la marca en la original (lote 17).',
      'La boleta de una estructura **sin tipo** avisa que «no entra en el PLAME, AFPnet, bancos, la planilla ni el reparto de utilidades», y el aviso queda en el historial al validarla. No bloquea.',
      'Una estructura hija de la mensual, sin reglas propias, calcula con las de su padre, y los avisos y la 5.ª lo ven (O-113 a, lote 43).',
      'Si se **archiva** una regla en una estructura (por ejemplo, la movilidad de libre disposición en la semanal), las actualizaciones del módulo ya no la vuelven a crear (lote 14). Lo mismo con las reglas SCTR archivadas: las nuevas nacen archivadas (lote 19).',
    ]),
    p('Las **planillas adicionales** (COMI, BONI y UTIL) emiten su boleta y su asiento en el diario de planillas, van al mismo PLAME, AFPnet y reparto del mes y calculan los aportes con la base mínima y el tope del mes (UTIL, solo la renta de 5.ª). No llevan el SIS, la cuota sindical, el descuento judicial ni los descuentos: los carga la mensual. El detalle está en los capítulos 11, 13, 20 y 27.'),
    h2('9.2 Reglas salariales'),
    p('La lista **Configuración › Reglas salariales** abre **agrupada por estructura** y filtrada en «Estructuras peruanas» (U-03). La misma regla aparece una vez por estructura que la usa, con su propia configuración: la asignación familiar `ASF_001` está en la mensual (NME) y en la semanal (NSO).'),
    ...figura('c09_03_reglas_agrupadas', 'Reglas salariales agrupadas por estructura, con la mensual abierta.'),
    p('En el formulario de la regla, debajo de «Aparece en la boleta», hay cuatro campos que decide el cliente **en la copia de cada estructura**: las actualizaciones del módulo no los cambian (salvo la marca inicial de cada lote, que la post-migración pone una sola vez y deja en el log).'),
    tabla(['Campo', 'Qué hace', 'Marcadas por SOLSE en «Reglas Básicas»'], [
      ['**¿Aplica para utilidades?**', 'El importe entra en la base de remuneraciones del reparto (D.Leg. 892). Una regla nueva de ingresos afectos o de la gratificación nace marcada', 'Las remunerativas: `RB_001`, `RBS_002`, `FER_001`, `LCG_001`, `ASF_001`, `HE25_001`, `HE35_001`, `TFER_001`, `FMAY_001`, `BNOC_001`, `MOVL_001`, `ALIM_001`, `COM_001`, `BONREG_001`, `PRALI_EXC_001` y `BPRODR_001`'],
      ['**Ingreso extraordinario para la renta de 5.ª**', 'En el mes en que se paga no se proyecta: la retención suma su impuesto (el anual con él menos el anual sin él) y desde el mes siguiente cuenta como percibido (C-44, lote 15)', '`UTIL_001`, `UTIL_ANT_001`, `GRATEX_001`, `BPROD_001`, `BPRODR_001` y `FMAY_001`'],
      ['**Variable regular para la remuneración computable**', 'Lo que paga entra en la gratificación, la CTS, las vacaciones y las truncas si es regular: con importe en al menos 3 meses del periodo (C-41, lote 17)', '`HE25_001`, `HE35_001`, `TFER_001`, `BNOC_001`, `MOVL_001`, `ALIM_001`, `COM_001`, `BONREG_001`, `PRALI_EXC_001` y `BPRODR_001`'],
      ['**Cómo entra en la remuneración computable**', 'Solo con la casilla anterior (lote 33a). «Variable: con importe en 3 de los 6 meses, lo percibido ÷ 6» (por defecto, como antes); «Fija mensual: entra entera, con el importe del mes de referencia»; «Periódica, de más de un mes y hasta un semestre (art. 18)»; «Periódica anual (art. 18: 1/12)»', 'Todas en «Variable»'],
    ], [2600, 4238, 2800]),
    ...figura('c09_05_regla_casillas', 'Regla «Movilidad de libre disposición» (MOVL_001) de la estructura NME: «¿Aplica para utilidades?» y «Variable regular para la remuneración computable» marcadas, y «Cómo entra en la remuneración computable» en «Variable».'),
    p('**La forma de la variable** (lote 33a). Una movilidad o una alimentación pactada por un monto al mes se marca **Fija mensual**: entra entera, con el importe del mes de referencia (abril u octubre en la CTS, junio o noviembre en la gratificación, el anterior al goce en las vacaciones). Un bono trimestral o semestral se marca **Periódica**: en la CTS entra lo percibido ÷ 6 (la anual, ÷ 12) sin el requisito de los 3 meses; en la gratificación, como variable; en las vacaciones, nunca. Criterios del lote 33a, sueldo 3 000: gratificación de julio con una movilidad fija de 200 desde mayo, 3 200,00 (con «Variable», 3 000,00); CTS de mayo con un bono trimestral «Periódica» de 900 en marzo, +75,00. La forma también decide qué entra en la remuneración asegurable de la Vida Ley (capítulo 6). Los cálculos completos, en los capítulos 14, 15 y 17.'),
    nota('No se marca lo que no es remuneración computable (TUO D.Leg. 650, art. 19): gratificaciones extraordinarias, utilidades, movilidad supeditada a la asistencia, condiciones de trabajo, prestaciones alimentarias dentro del tope. Una regla propia del cliente (un incentivo, un destajo) se marca a mano. Qué conceptos son fijos mensuales es un criterio según la norma, pendiente de confirmación (P-82); los periódicos (P-83), los extraordinarios (P-72, P-76) y la casilla de utilidades (P-61, P-65) se documentan con el valor de hoy.', 'importante'),
    p('**La categoría «Ingreso no afecto a aportes, afecto a renta de 5.ª»** (INR_001, dentro de «Ingreso no Afecto»; lote 15) es para lo que no paga EsSalud ni ONP/AFP pero sí renta de 5.ª. Una regla propia en esta categoría entra sola en la base de 5.ª (BAR5_001): ingresos afectos − tardanzas y descuentos deducibles + esta categoría. Ya están en ella la movilidad supeditada, las utilidades, las prestaciones alimentarias, la gratificación extraordinaria y el bono de productividad del sector público.'),

    h2('9.3 Opciones de la compañía'),
    p('Lo que la norma deja a criterio de la empresa, o lo que una contadora puede leer de dos maneras, es una **opción de la compañía**: **Ajustes › Usuarios y empresas › Empresas ›** (la compañía) **›** pestaña **Nómina PE - Controles**. Cada opción tiene su ayuda con la norma; el valor por defecto es el que dice la norma o, si cambió un cálculo, el nuevo, con la alternativa «como antes del lote N». Algunas se repiten en **Ajustes › Nómina PE** (provisiones, boleta por correo, liquidación por cese). La pestaña **Nómina PE - Asistencias** tiene las del capítulo 19, entre ellas «Pagar el trabajo en feriado desde las asistencias» (apagada, lote 18).'),
    tabla(['Grupo', 'Opciones (valor por defecto)', 'Capítulo'], [
      ['(junto al RUC)', '**Afecta a SENATI**; Con 20 trabajadores o menos: SENATI (Avisar)', '32'],
      ['Controles al validar la boleta', 'Cinco controles: «Avisar», «Bloquear la validación» o «No controlar» (Avisar; «Trabajador sin póliza Vida Ley», No controlar)', '26'],
      ['T-Registro / Pago a bancos', 'Código de establecimiento (0000); Interbank: CTS en cuenta de otro banco (Omitir)', '29, 27'],
      ['Boleta por correo (N-08)', 'Boleta por correo (Solo con el acuerdo del trabajador); Documento del trabajador en su contacto de trabajo (apagada)', '28, 8'],
      ['PLAME', 'Declarar aparte los feriados (0115) y la licencia con goce (0907) (apagada, lote 18)', '18, 27'],
      ['Provisiones (N-13)', 'Provisión mensual de beneficios (Sin provisión) y once opciones de cómo provisionar y aplicar', '7'],
      ['Liquidación por cese (N-15)', 'Vacaciones ganadas y no gozadas al cese (Avisar: se registran con las entradas VAC_ADQ_001 e IND_VAC_001)', '16'],
      ['Indemnización por despido arbitrario', 'Variables en la base (Con las variables regulares); 1/6 de la gratificación (apagada); contrato modal en la MYPE (La mayor); Tabla 12: 12 y 13 (Por el art. 76); modal desnaturalizado (Desde el inicio del primer contrato); Plazo máximo de los contratos modales (El de cada modalidad y 5 años en conjunto)', '16'],
      ['Conteo de meses y días', 'Meses de las vacaciones truncas y tiempo de servicios de la indemnización (De fecha a fecha)', '16'],
      ['Gratificaciones', 'Diciembre de un cese desde el 15/12 (Completa); Remuneración de la gratificación (La del mes del pago); Variables de diciembre (Julio a noviembre); Variables de la trunca (Hasta el mes anterior al cese)', '14, 16'],
      ['Remuneración computable (variables regulares)', 'Divisor con menos de 6 meses (Según la norma); Mes parcial (Por días); Periódicas en la gratificación (Como variables); comisionista y destajero: diciembre (Junio a noviembre), promedio (De los meses calendario completos) y vacaciones del destajero (Las 4 semanas anteriores)', '14, 15, 17'],
      ['Modalidades formativas (practicantes)', 'Subvención pactada menor que el mínimo (Pagar el mínimo y avisar); Inasistencias (No se descuentan); EsSalud con la base mínima (apagada); Jornada semanal habitual (48); Descanso con doce meses cumplidos (apagada)', '31'],
      ['Seguro Vida Ley', 'En un mes con suspensión (Los días suspendidos, a la última remuneración); Variables (Solo las habituales); Comisiones (El promedio de los últimos 3 meses)', '6'],
      ['Valor hora y feriados', 'Valor hora (Sueldo ÷ 30 ÷ las horas diarias de la jornada del trabajador); y las del promedio del subsidio: feriado y horas extras (Siempre), mes de ingreso (Por sus días), meses sin remuneración (Con 0), redondeo (En soles enteros), subsidio afecto a la ONP (No), las fechas «desde» y Continuación del subsidio al año nuevo desde', '20, 23'],
      ['Suspensiones', 'Asignación familiar en un mes entero sin goce (No pagarla); Básica de un mes con suspensiones (Mes comercial: 30 − los días suspendidos)', '8, 22'],
      ['Renta de 5.ª', 'Renta de 5.ª en la planilla semanal (Proporcional en cada semanal del mes); Descuento deducible (0707) en la renta de 5.ª (Reduce los aportes y la renta de 5.ª)', '13'],
      ['Conceptos configurados (N-09)', 'Exceso de las prestaciones alimentarias (Se paga como remuneración (0116)); Prestaciones alimentarias en el neto (Fuera del neto)', '10'],
      ['PLAME (y sus tres grupos: horas del .jor; descanso semanal y 1 de mayo; aportes informativos en el .rem)', 'Subsidio que cruza de mes (Por los días subsidiados de cada mes); `.or5` (La renta del mes); horas ordinarias del `.jor` (Solo las trabajadas) y del feriado trabajado (A las horas ordinarias); dominical de la semanal (Aparte, en el 0115); 1 de mayo en el descanso (Pagar un día adicional); informativos 0803 y 0811 marcados, 0810, 0813, 0814, 0801 y 0609 sin marcar', '18, 27'],
      ['Micro y pequeña empresa (REMYPE)', 'Acreditación en el REMYPE (fecha); Microempresa: régimen de salud (SIS), asignación familiar (No pagar) y utilidades (Excluir); Pequeña empresa: asignación familiar (No pagar)', '24'],
      ['Utilidades (D.Leg. 892)', 'Con 20 trabajadores o menos: utilidades (Repartir y avisar)', '20'],
      ['Tiempo parcial (menos de 4 horas diarias)', 'Tiempo parcial: CTS (No pagar)', '15'],
    ], [2600, 5838, 1200]),
    ...figura('c09_06_opciones_compania', 'Pestaña «Nómina PE - Controles» de la compañía, en los grupos «Seguro Vida Ley», «Valor hora y feriados», «Suspensiones» y «Renta de 5.ª», con sus valores por defecto.'),
    nota('Una actualización que cambia un cálculo deja la opción en su valor por defecto, salvo cuando la compañía ya trabajaba de la otra manera: entonces la deja como estaba y lo dice en el log. Por ejemplo, la compañía que ya tenía semanales validadas en el ejercicio sin 5.ª queda en «No retener en la semanal» (lote 27a); la que ya pagaba la asignación familiar en la pequeña empresa o la CTS al tiempo parcial, en «Pagar» (lotes 58 y 67). Revise la pestaña después de cada actualización y decida cada opción con la contadora: las que dependen de ella están en el capítulo 33.', 'implementador'),
    h3('Micro y pequeña empresa'),
    p('El régimen laboral del contrato decide los factores del parámetro `pe_regimen_factores` (gratificación, días de CTS y días de vacaciones; capítulo 4). Para la micro y la pequeña empresa, la compañía define además, en el grupo **Micro y pequeña empresa (REMYPE)**, la fecha de **Acreditación en el REMYPE**, el régimen de salud de la microempresa (SIS de S/ 15 al mes por trabajador o EsSalud 9 %), si paga la asignación familiar en cada régimen y si la microempresa entra en el reparto de utilidades. Si el trabajador tiene su propio **régimen de salud** (T32) en la ficha, ese manda: 21 = SIS microempresa. El detalle, con los casos EMPRESA_PEQUENA y EMPRESA_MICRO, está en el capítulo 24.'),
    nota('Las estructuras pertenecen a la compañía 1 y las usan también las demás compañías. Se comprobó que un usuario de otra compañía calcula sus boletas sin error de acceso (Q-03, cerrado sin cambio).', 'implementador'),
    pieCapitulo(['ce'], 'U-03, C-25, Q-03, lote 14 (regla archivada), INR_001 y C-44 (lote 15), C-42 y N-10 (lote 16), lote 16b, C-41 (lote 17), P-82/P-83 (lote 33a), O-113 a (lote 43), O-156 (lote 49a), y las opciones de la compañía de los lotes 18 a 67'),
  );


  return c;
};
