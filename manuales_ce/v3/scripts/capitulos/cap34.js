// Manual v3 (origen: v2), bloque 4: capítulos 30 a 32 y anexos A a E (el 19 está en cap19.js). Medido el 2026-10-22.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');

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


  return c;
};
