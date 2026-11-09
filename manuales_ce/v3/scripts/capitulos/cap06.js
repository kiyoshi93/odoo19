// Manual v3 (origen: v2), bloque 1: capítulos 1 a 9 (configuración). Casos SCTR y VIDALEY releídos en contable19 el 2026-11-09.
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));

  // ------------------------------------------------------------------ 6
  a(
    h1('6. Seguros: EPS, SCTR y Vida Ley'),
    p('Los tres seguros se registran en **Nómina › Nómina PE › Seguros y EPS**, que en la versión 3 tiene tres entradas: **Planes EPS**, **Vida Ley** y **Pólizas SCTR**. La ficha del trabajador dice a qué plan, póliza o entidad pertenece (capítulo 8) y la boleta calcula el aporte de la empresa. Las cifras de los aportes, con todos sus casos, están en el capítulo 12.'),

    h2('6.1 Planes EPS'),
    p('**Nómina PE › Seguros y EPS › Planes EPS.** Cada plan tiene la entidad, la **Entidad (T14)** que se declara en el T-Registro, el N.° de póliza, las fechas de inicio y de finalización y, para el empleador y para el trabajador, una **tasa** o un **importe**. La lista y la ficha del trabajador muestran el nombre de la entidad (U-01).'),
    ...figura('c06_01_planes_eps', 'Planes EPS: «PACIFICO EPS (DEMO)», con tasa del empleador 4,5 % y del trabajador 2 %, y el plan del caso TREGISTRO con su código T14 «2 · Pacífico S.A. EPS».'),
    tabla(['Qué', 'Cómo lo calcula la versión 3'], [
      ['**Vigencia del plan** (O-135, lote 45)', 'El plan cuenta solo entre su fecha de inicio y la de finalización. Un plan que vence el 30/06 deja de dar aporte y crédito en julio, y la bonificación extraordinaria de la gratificación vuelve al 9 %. En el mes en que empieza o termina, cuenta si estuvo vigente algún día del mes'],
      ['**Plan por importe fijo** (lote 34a)', 'Con «Importe empleador» y sin tasa, aporta el importe una vez en el mes y genera su crédito. Antes el aporte salía en 0'],
      ['**Crédito EPS del mes** (C-46, lote 34a)', 'La regla `EPS_CRED_001` lleva el 25 % del EsSalud **del mes** del trabajador (con todas sus boletas: mensual, comisiones, vacacional, liquidación; parámetro `pe_eps_credito_max`), sin pasar de lo pagado a la EPS en el mes, menos el crédito de sus otras boletas del mes. El total ya no depende del orden en que se calculan las boletas'],
      ['**Tope de la empresa** (D.S. 009-97-SA, art. 16 b)', 'El 10 % de la UIT por trabajador cubierto: en 2026, 550,00 × cubiertos. La boleta **avisa** si el crédito de la compañía en el mes lo pasa (el aviso queda en el historial al validar); se ajusta al declarar en el PLAME'],
      ['**Estructura propia antigua**', 'Si la estructura del cliente tiene una copia vieja de `EPS_CRED_001`, la boleta avisa («eps_formula»): esa copia sigue calculando por boleta y da de menos'],
    ], [2800, 6838]),
    nota('Criterios del lote 34a, sueldo 3 000 con plan EPS y comisiones de 1 000 en su planilla validada antes: el crédito del mes es **−90,00** (antes −87,08, repartido en −22,50 y −64,58). Un plan por importe fijo de 67,50 sin tasa: aporte 67,50 y crédito −67,50 (antes 0 y 0). Un trabajador con sueldo alto y un crédito del mes de 2 250: aviso del tope (1 × 550,00).', 'caso'),
    nota('El tope a) del crédito (lo pagado a la EPS) se aplica **por trabajador**, que nunca da de más: criterio según la norma, pendiente de confirmación (P-137). La tasa de la bonificación con un plan que empieza o termina en el mes del pago (con el plan vigente algún día del mes): criterio según la norma, pendiente de confirmación (P-138).', 'importante'),

    h2('6.2 Pólizas SCTR'),
    p('Desde el lote 19 (N-12) el SCTR se calcula con la tasa del contrato de cada entidad. **Nómina PE › Seguros y EPS › Pólizas SCTR** guarda una póliza por entidad y vigencia:'),
    tabla(['Campo', 'Para qué'], [
      ['**Entidad**', 'Salud - EsSalud, Salud - EPS, Pensión - ONP o Pensión - Compañía de seguros. La boleta usa la póliza de la entidad que dice la ficha del trabajador'],
      ['**Aseguradora** y **N.° de póliza o contrato**', 'La EPS o la compañía de seguros (con EsSalud o la ONP, opcional)'],
      ['**Tasa (%)**', 'Tasa mensual en porcentaje, la del contrato: 0,53 para 0,53 %. Una fracción (0,0053) se rechaza; por encima del 5 % se acepta con una advertencia (¿0,53 escrita como 5,3?)'],
      ['**Cobra la prima sobre la gratificación ordinaria**', 'Lote 34a. No aparece con EsSalud. Márquela solo si el condicionado de la ONP, la EPS o la compañía lo exige (D.S. 003-98-SA, 3.ª DF). Por defecto, sin marcar: la gratificación no paga SCTR (Ley 30334)'],
      ['**Vigente desde / hasta**', 'De una misma entidad solo puede haber una vigente en cada fecha: al renovar, ponga la fecha de fin a la anterior. «Hasta» vacía: sin fecha de fin'],
      ['Notas', 'Actividad, condiciones de la póliza, tope de la remuneración asegurable…'],
    ], [3000, 6638]),
    p('Cada usuario ve las pólizas de sus compañías. Los cambios de tasa, vigencia y entidad quedan en el historial de la póliza. Una póliza que ya usó una boleta validada no se borra: se archiva (filtro «Archivadas»).'),
    ...figura('c06_05_polizas_sctr', 'Pólizas SCTR del caso SCTR (SOLSE Demo Servicios), vigentes del 01/11/2026 al 30/11/2026: Salud - EsSalud 0,53 %, Salud - EPS 1,20 %, Pensión - ONP 0,92 % y Pensión - Compañía de seguros 1,05 %.'),
    ...figura('c06_06_poliza_sctr', 'Póliza Salud - EPS del caso SCTR (1,20 %), con la casilla «Cobra la prima sobre la gratificación ordinaria» sin marcar.'),
    h3('El SCTR en la ficha y en la boleta'),
    p('En la ficha (pestaña **Nómina PE**, grupo **Salud**) se marca **Cubierto por SCTR** si el trabajador hace una actividad de riesgo (Anexo 5 del D.S. 009-97-SA). La casilla se llamaba «SCTR Pensión» y ya decidía las dos coberturas. Al marcarla aparecen **SCTR salud** (EsSalud o EPS) y **SCTR pensión (entidad)** (ONP o compañía de seguros privada): son los mismos campos que van al T-Registro y sus cambios quedan en el historial del trabajador.'),
    ...figura('c06_04_sctr_en_la_ficha', 'Trabajador del caso SCTR (DNI 70002001) con «Cubierto por SCTR» marcada: SCTR salud EsSalud y SCTR pensión ONP.'),
    p('Con la casilla, la boleta deja **una línea por cobertura**, según la entidad de la ficha:'),
    tabla(['Entidad de la ficha', 'Línea', 'PLAME', 'Pasivo'], [
      ['Salud, EsSalud', '`SCTR_ESS_001` «SCTR Salud - EsSalud»', '0806', '4031'],
      ['Salud, EPS', '`SCTR_SAL_001` «SCTR Salud - EPS»', '0810', '4699'],
      ['Pensión, ONP', '`SCTR_ONP_001` «SCTR Pensión - ONP»', '0813', '4032'],
      ['Pensión, compañía de seguros', '`SCTR_PEN_001` «SCTR Pensión - Compañía de seguros»', '0814', '4699'],
    ], [2600, 4238, 1200, 1600]),
    p('El importe es la remuneración afecta (menos tardanzas, más subsidios: la columna «ESSALUD SCTR» de la Tabla 22, sin tope) × la tasa de la póliza de esa entidad vigente al fin del periodo. Va en la mensual, la semanal, la vacacional, la liquidación y las planillas de comisiones y bonificaciones; el gasto, a la 6273. Cada línea guarda la póliza y la tasa con que se calculó: columnas opcionales **Póliza SCTR** y **Tasa SCTR (%)** de las líneas de la boleta.'),
    ...figura('c06_07_boleta_sctr', 'Boleta de noviembre de 2026 del caso SCTR (DNI 70002002, sueldo 3 000, EPS y compañía de seguros): SCTR Salud - EPS 36,00 y SCTR Pensión - Compañía de seguros 31,50; la columna opcional «Póliza SCTR» dice con qué póliza y tasa se calculó cada una (Salud - EPS · 1,2 %; Pensión - Compañía de seguros · 1,05 %).'),
    tabla(['Caso SCTR, noviembre de 2026, sueldo 3 000', 'SCTR salud', 'SCTR pensión'], [
      ['70002001, EsSalud y ONP', '15,90 (0,53 %; pasivo 4031)', '27,60 (0,92 %; pasivo 4032)'],
      ['70002002, EPS y compañía de seguros', '36,00 (1,20 %; 4699)', '31,50 (1,05 %; 4699)'],
      ['70002003, sin entidad en la ficha', '39,00 (1,30 % referencial, con aviso)', '51,00 (1,70 % referencial)'],
      ['70002004, obrero, semana del 2 al 8 (700,00)', '3,71 (EsSalud)', '7,35 (compañía)'],
    ], [3638, 3000, 3000]),
    p('**Avisos de la boleta:**'),
    vinetas([
      'sin la entidad en la ficha: `SCTR_SAL_001` y `SCTR_PEN_001` con la tasa referencial de los parámetros (`pe_sctr_salud_tasa` y `pe_sctr_pension_tasa`, capítulo 4) y pasivo 4699, como antes del lote 19;',
      'con la entidad y sin póliza vigente: la línea de la entidad, con la tasa referencial;',
      'la estructura no tiene la regla de la entidad, o la tiene con la fórmula anterior al lote (una estructura propia copiada antes): hay que copiar las reglas SCTR de «Reglas Básicas»;',
      'la póliza tiene una tasa por encima del 5 %;',
      'la boleta en borrador es de un periodo anterior al último cambio de la casilla o de las entidades: se calcula con lo de hoy.',
    ]),
    h3('El SCTR sobre la gratificación'),
    p('Por defecto la gratificación de julio y diciembre no paga SCTR con ninguna entidad (Ley 30334). Si la póliza de la ONP, la EPS o la compañía tiene **Cobra la prima sobre la gratificación ordinaria**, la estructura de gratificación calcula el SCTR de esa entidad sobre la gratificación (no sobre la bonificación extraordinaria), con aviso. La póliza se busca a la **fecha de pago**, el 15 (O-132, lote 45), y la liquidación de un cese del 15 al 31/12, que paga la gratificación ordinaria, también lo cobra (O-131).'),
    nota('Criterios del lote 34a: gratificación de julio de 3 000 con una póliza EPS al 1 %: 0 sin la casilla; **30,00** con ella, y la boleta avisa.', 'caso'),
    nota('Que alguna póliza cobre la prima sobre la gratificación es un criterio según la norma, pendiente de confirmación (P-93). Por defecto, ninguna. Una estructura de gratificación propia copiada antes del lote 34a no tiene las reglas nuevas: la boleta lo avisa para copiarlas.', 'importante'),
    p('**En el PLAME.** El PDT calcula el SCTR con EsSalud (0806) con la tasa que se le registra. Los códigos 0810, 0813 y 0814 solo van al `.rem` si se marcan en la compañía, grupo **PLAME: aportes informativos en el .rem** (por defecto, sin marcar; capítulo 27).'),
    nota('Una tasa por trabajador o por actividad dentro de la misma entidad no se puede registrar: hay una póliza por entidad y periodo en cada compañía. La ficha no es histórica: la casilla y las entidades son las de hoy (la boleta en borrador de un periodo anterior a un cambio lo avisa). Una estructura propia del cliente no recibe las reglas nuevas: se copian a mano. La factura de la aseguradora y la conciliación con el PDT quedan fuera (capítulo 33).', 'limite'),

    h2('6.3 Vida Ley'),
    p('La prima de Vida Ley **se calcula en la planilla** (N-05). Cada póliza (**Nómina PE › Seguros y EPS › Vida Ley**) tiene:'),
    tabla(['Campo', 'Para qué'], [
      ['Entidad, N.° de póliza y vigencia', 'Identificación. Una póliza vencida no cobra prima y avisa.'],
      ['Tasa (%)', 'Tasa de la póliza en porcentaje, de 0,05 a 5 (0,53 = 0,53 %). «0.0053» se rechaza.'],
      ['Importe por trabajador', 'Alternativa a la tasa: un importe fijo una vez al mes.'],
      ['**Calcular la prima en la planilla**', 'Activa el cálculo. Las pólizas existentes antes de la versión 2 quedan sin marcar: nada cambia hasta que el usuario lo decide.'],
      ['Compañía y Empleados', 'Solo se cobra a los trabajadores de la póliza y de su compañía.'],
    ], [3200, 6438]),
    ...figura('c06_02_polizas_vida_ley', 'Pólizas del caso VIDALEY: por tasa (0,53 %, 6 trabajadores), por importe fijo y vencida.'),
    ...figura('c06_03_poliza_vida_ley', 'Póliza por tasa con «Calcular la prima en la planilla» marcada y sus trabajadores.'),
    p('La regla `VIDA_001` es un aporte del empleador: tasa × **remuneración asegurable** del mes, con el tope de la RMA, menos lo que ya cargaron las demás boletas del mes. El neto del trabajador no cambia. Va al PLAME en el concepto 0803 (casilla marcada por defecto en «PLAME: aportes informativos en el .rem») y al asiento en 6274 / 4699.'),
    nota('Caso VIDALEY, junio de 2026, tasa 0,53 %: con sueldo 3 000 la prima es **15,90**; con sueldo 15 000 se topa en la RMA del trimestre (12 598,91) y es **66,77**; la póliza por importe fijo cobra **25,00**; la vencida, nada.', 'caso'),
    h3('La remuneración asegurable (lote 34b)'),
    p('Desde el lote 34b la prima va sobre la **remuneración mensual habitual** (D.Leg. 688, art. 9, con el texto de la Ley 31149), con el tope de la RMA:'),
    vinetas([
      '**fuera** quedan los conceptos marcados «Variable regular» con la forma «Periódica» o «Periódica anual» (capítulo 9), y las vacaciones truncas y las adquiridas no gozadas del cese;',
      '**las variables** entran solo si son habituales: con importe en 3 de los últimos 6 meses, o en todos los meses del vínculo si son menos;',
      '**las comisiones o el destajo** (reglas del concepto 0103) entran con el promedio diario de los últimos 3 meses × 30, sea o no la remuneración principal;',
      '**en un mes con suspensión** (subsidio, maternidad, licencia sin goce, sanción, huelga…; TUO del D.Leg. 728, art. 12) la empresa sigue pagando la prima sobre la última remuneración (Ley 26645, art. 7): los días suspendidos (mes comercial: un mes entero, 30) van a la última remuneración, sin pasar de ella. La última es la base del último mes validado, guardada en la línea `VIDA_001` (campo **Remuneración asegurable Vida Ley**), así que una suspensión larga mantiene la de antes. Sin ella, la del último mes con ingresos afectos; sin ninguno, el sueldo del contrato;',
      '**la inhabilitación** (Tabla 21, 04) no sigue con la prima: la boleta lo avisa.',
    ]),
    p('La compañía puede volver a lo de antes en su grupo **Seguro Vida Ley** (capítulo 9):'),
    tabla(['Opción', 'Por defecto', 'Alternativa (lo de antes del lote 34b)'], [
      ['Vida Ley en un mes con suspensión', 'Los días suspendidos, a la última remuneración', 'Proporcional: solo lo percibido en el mes'],
      ['Variables en la Vida Ley', 'Solo las habituales: con importe en 3 de los últimos 6 meses', 'Todas las del mes'],
      ['Comisiones en la Vida Ley', 'El promedio de los últimos 3 meses', 'La del mes'],
    ], [3000, 3400, 3238]),
    tabla(['Criterios del lote 34b, sueldo 3 000 y tasa 0,50 %', 'Antes', 'Ahora'], [
      ['Un mes entero sin goce', '0', '15,00'],
      ['10 días sin goce', '10,00', '15,00 (con «Proporcional», 10,00)'],
      ['Sin goce del 16/03 al 15/05: marzo, abril y mayo', '7,50, 0 y 7,50', '15,00 cada mes'],
      ['Un bono anual de 1 000 en el mes («Periódica anual»)', '20,00', '15,00'],
      ['Horas extras ocasionales en el mes', 'con ellas', '15,00'],
      ['Comisionista con 2 400, 3 000 y 3 600', '18,00', '15,00'],
      ['10 días de inhabilitación', '10,00', '10,00, con aviso'],
      ['Cese el 15/03 con 3 000 de vacaciones adquiridas, la liquidación validada antes', '22,50', '7,50'],
    ], [5000, 2000, 2638]),
    nota('Criterio según la norma, con el valor por defecto de hoy (P-52). La nota de crédito hecha a mano revierte la prima (O-138, lote 45); antes la dejaba en 0.', 'nota'),
    nota('Una sola póliza por trabajador y sin historia de pólizas anteriores. La semanal cuenta lo percibido en el mes con 4 o 5 boletas según su fecha de inicio. Las boletas validadas antes del lote 34b no tienen la base guardada: la primera suspensión usa la del último mes con ingresos afectos. El control «Trabajador sin póliza Vida Ley» de la compañía (capítulo 26) viene en «No controlar» hasta registrar las pólizas.', 'limite'),
    pieCapitulo(['ce', 'ce_demo'], 'U-01, N-05, N-12 (lote 19), C-46 y P-93 (lote 34a), P-52 (lote 34b), O-131 a O-138 (lote 45)'),
  );


  return c;
};
