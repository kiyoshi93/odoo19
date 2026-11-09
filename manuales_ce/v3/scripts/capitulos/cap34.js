// Manual v3 (origen: v2), bloque 4: capítulos 30 a 32 y anexos A a E (el 19 está en cap19.js). Medido el 2026-10-22.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');

  // ------------------------------------------------------------------ 34 (era el 32 en el v2)
  a(
    h1('34. Lista de verificación del cierre mensual y anual'),
    h2('34.1 Cada mes'),
    pasos([
      '**Parámetros**: ¿cambió la RMA (cada trimestre), la RMV o la comisión de alguna AFP? Registre la vigencia antes de calcular. Si aparece la banda de avisos, atiéndala primero (capítulos 4 y 26).',
      '**Novedades**: ingresos (con T8, T24 y datos del T-Registro), ceses (fecha de fin, motivo y, si corresponde, despido arbitrario), cambios de sueldo con su fecha efectiva, vacaciones, licencias, descansos médicos, asistencias, horas extra, adelantos, comisiones y bonificaciones.',
      '**Practicantes**: convenios nuevos y terminados, su descanso de 15 días y la media subvención del mes en que cumplen seis meses (capítulo 31).',
      '**No domiciliados**: el extranjero que llega o deja de serlo (183 días), con su convenio de la Tabla 25 (capítulo 13).',
      '**T-Registro dentro del plazo**: altas el día del ingreso, bajas al día siguiente del cese, modificaciones y derechohabientes (capítulo 29).',
      '**Orden de validación**: adelanto → gratificación, CTS y vacaciones → mensuales y semanales → liquidaciones (capítulo 11).',
      'Revise las bandas y avisos de cada boleta. Una boleta sin importes no se valida: elimínela (capítulo 10).',
      'Revise el asiento de cada lote en el diario **Planillas** y, si la compañía provisiona con un asiento mensual, genere el de **Provisiones del mes** (capítulo 7).',
      'Genere la planilla, el PLAME, AFPnet y los TXT bancarios, y **abra cada archivo** antes de enviarlo. Revise los **omitidos** de cada TXT, y en el PLAME el `.toc` de los no domiciliados, el `.or5` de otras rentas de 5.ª y el archivo del **personal en formación** para digitarlo en el PDT (capítulos 27 y 31).',
      '**Registre el pago** del lote con su número de operación, y el **pago de AFPnet** dentro de los cinco primeros días hábiles (capítulo 28).',
      '**Entregue las boletas** dentro de los 3 días hábiles: impresas con firma, o por correo a quien tiene el acuerdo (capítulo 28).',
      'Importe el PLAME en el PDT y compare sus totales con la planilla.',
    ]),
    h2('34.2 Cada año'),
    pasos([
      'En diciembre: registre los **feriados** del año siguiente y la **UIT** nueva (vigente desde el 1 de enero).',
      'Valide la gratificación y las vacaciones de diciembre **antes** que la mensual: en diciembre la renta de 5.ª no se corrige en otro mes.',
      'Emita el **certificado de 5.ª** de cada trabajador del ejercicio, con el representante del empleador marcado (capítulo 13).',
      'Calcule el **reparto de utilidades** con la renta neta del ejercicio, dentro del plazo legal: revise el aviso de los **20 trabajadores o menos**, confírmelo y entregue la **hoja de liquidación** de cada trabajador y ex trabajador (capítulo 20).',
      'Si la compañía está **afecta a SENATI**, revise el promedio de trabajadores del año que termina: con 20 o menos, la contribución del año siguiente es voluntaria (capítulo 32).',
      'Si provisiona, revise al cierre el **pasivo de vacaciones** y los saldos de las cuentas de provisión (capítulo 7).',
      'Revise las pólizas de **Vida Ley** y de **EPS** que vencen.',
    ]),
    pieCapitulo(['base', 'ce'], null),
  );


  return c;
};
