// Manual v3 (origen: v2), bloque 4: capítulos 30 a 32 y anexos A a E (el 19 está en cap19.js). Medido el 2026-10-22.
const fs = require('fs');
const path = require('path');
module.exports = (h) => {
  const { p, h1, h2, h3, pasos, vinetas, nota, figura, tabla, pieCapitulo } = h;
  const c = [];
  const a = (...x) => x.flat().forEach((e) => c.push(e));
  const MEDIDAS = path.join(__dirname, '..', '..', 'medidas');

  // ------------------------------------------------------------------ Anexo D
  const lotes = [
    ['1', '12/10', 'base 19.0.1.8.2 · ce 19.0.1.9.4', 'C-01, C-02, C-08, C-12, C-13, V-01'],
    ['2', '13/10', 'base 19.0.1.9.3 · ce 19.0.1.10.10', 'C-14, U-01 a U-07, U-09'],
    ['3', '13/10', 'base 19.0.1.10.5 · ce 19.0.1.11.10', 'C-03, C-05, C-06, C-07, C-11'],
    ['4', '14/10', 'base 19.0.1.11.7 · ce 19.0.1.12.9 · ce_demo 19.0.2.6.2', 'C-15, C-17, U-08, U-10, V-02, V-03, V-04, Q-02, Q-03 (cerrado)'],
    ['5', '14/10', 'base 19.0.1.11.8 · ce 19.0.1.12.12 · ce_demo 19.0.2.12.3', 'C-19, V-05, Q-01, Q-04, Q-05'],
    ['6a', '15/10', 'base 19.0.1.11.10 · ce 19.0.1.12.16 · ce_demo 19.0.2.15.2', 'C-18, C-21, C-22, C-23'],
    ['6', '17/10', 'base 19.0.1.14.0 · ce 19.0.1.15.5 · ce_demo 19.0.2.17.1 · asistencia 19.0.1.2.1 · plame_demo 19.0.1.4.1', 'C-09, C-10, C-16, C-20, C-24 a C-29'],
    ['7a', '19/10', 'base 19.0.1.17.3 · ce 19.0.1.18.3 · ce_demo 19.0.2.18.0 · asistencia 19.0.1.3.2', 'C-30, C-31, C-32, O-31'],
    ['7b', '19/10', 'base 19.0.1.19.1 · ce 19.0.1.21.1 · ce_demo 19.0.2.21.1', 'N-01, N-03, N-04'],
    ['8', '19/10', 'ce 19.0.1.24.2 · ce_demo 19.0.2.22.0', 'N-05, N-07, N-08'],
    ['9', '19/10', 'base 19.0.1.20.1 · ce 19.0.1.25.1 · ce_demo 19.0.2.23.1', 'C-33, C-34'],
    ['10', '19/10', 'ce 19.0.1.26.2 · ce_demo 19.0.2.24.1', 'N-02 (altas y bajas del T-Registro)'],
    ['11', '22/10', 'ce 19.0.1.27.1 · ce_demo 19.0.2.25.1', 'N-02 fase 2 (modificaciones y derechohabientes), U-11'],
    ['12', '22/10', 'asistencia 19.0.1.4.1 · asistencia_demo 19.0.1.2.1', 'C-35'],
  ];
  a(
    h1('Anexo D. Historial de versiones'),
    p('Los 65 cambios de la versión 2 se entregaron en 12 lotes, del 12 al 22 de octubre de 2026. Cada lote se re-midió en `contable19` (informes `manuales_ce/evidencias/lote*/REMEDICION_*.md`). Los lotes 7a, 7b y 8 se midieron juntos, con el 8 instalado. C-04 y Q-03 se cerraron sin cambio de código (C-04 por la respuesta P-19 de la contadora, el 15/10). N-06 está bloqueado (formatos de los bancos).'),
    tabla(['Lote', 'Validado (2026)', 'Versiones al validar', 'Ítems'], lotes, [800, 1300, 3800, 3738]),
    p('Versiones finales documentadas: base 19.0.1.20.1 · ce 19.0.1.27.1 · ce_demo 19.0.2.25.1 · asistencia 19.0.1.4.1 · asistencia_demo 19.0.1.2.1 · plame_demo 19.0.1.4.1.'),
  );


  return c;
};
