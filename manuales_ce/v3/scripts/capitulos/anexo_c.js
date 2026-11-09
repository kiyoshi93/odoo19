// Manual v3 (origen: v2), bloque 4: capítulos 30 a 32 y anexos A a E (el 19 está en cap19.js). Medido el 2026-10-22.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');

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


  return c;
};
