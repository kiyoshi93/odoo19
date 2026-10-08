# Continuidad: manual de nómina Community (Odoo 19)

Estado al 2026-10-08: **fase (a) entregada** — `Manual_Nomina_PE_Odoo19_Community.docx` (24 capítulos,
anexos A-C, 53 figuras). Pendiente: revisión del usuario y fase (b) (video resumen y promo vertical).

Acceso: `ODOO_URL=https://51.222.13.59.sslip.io` (el proxy solo deja HTTPS). En modo Auto el clasificador
bloquea ese host; usar el modo «Aceptar ediciones» o la regla del script de configuración del entorno.

Qué hay: `scripts/` (Playwright: p01, p04, p08, p08b, p10_p11, p11b, p21, p22, capturar_vistas.js + vistas/*.json,
ocultar_empresa.py con OCR, generar_manual.js), `evidencias/` (comparaciones del laboratorio, 64 boletas del
año completo, archivos PLAME/TXT/Excel/PDF), `notas/hallazgos_borrador.md` (pasados a la biblia, rama
`manual-nomina-ce`, `99-sintesis/manual-ce-hallazgos-nuevos.md`).

Estado de la base: laboratorio construido (3 compañías demo) y 4 casos al 100 %; en FM SYSTEMS, Lucía
(99999901) y Héctor (99999902) con planilla ene-2025..dic-2026, feriados 2025-2026, vigencias de prueba
(comisión AFP 2025, RMA 2025/2026, RMV 1230 y AF 123 desde 01/10/2026), lote «Planilla diciembre 2026».

## Arranque de la sesión nueva

1. Rama `claude/odoo-payroll-manual-pe-ce-lhjakl` (ya contiene `manuales/` de Enterprise:
   no se toca). El manual CE va en `manuales_ce/` con la misma estructura.
2. Fuentes (no se versionan): `solse_contabilidad.zip`, `solse_facturacion.zip`,
   `om_hr_payroll.zip`, `om_hr_payroll_account.zip`, y la biblia
   `biblia-solse-reducida.tar.gz` (entrada: `99-sintesis/encargo-manual-nomina-ce.md`).
3. Base: SOLO `contable19` (`/web/login?db=contable19`); credenciales en `ODOO_URL`,
   `ODOO_DB`, `ODOO_USUARIO`, `ODOO_CLAVE`. Nunca `/web/database/manager`.
4. Copiar `manuales/scripts/odoo_ui.js`, `generar_manual.js` y `ocultar_empresa.py` a
   `manuales_ce/scripts/` (las capturas salen en `manuales_ce/capturas/`).
   Instalar `rapidocr_onnxruntime` (no viene en el contenedor).
5. Primera entrega pendiente: captura del menú principal + índice confirmado.

## Decisiones del usuario (2026-10-07)

1. **Datos del caso NOMINA: opción (a)**: correr el caso demo tal cual para medir cifras y
   difuminar los DNI de la demo en las capturas.
2. **Compañía: «FM SYSTEMS SOLUTIONS EIRL»**, la empresa del usuario; se trabaja ahí y se
   muestra con normalidad. (Ojo: los casos demo siembran en la compañía «servicios» del
   laboratorio; resolver al entrar a la base cómo se reparte.)
3. **Periodo: años completos 2025 y 2026** (para que vacaciones devenguen bien).
   La RMA solo rige desde 2026-04-01 y la UIT 2026 = 5.500.

## Índice propuesto

1. Introducción · 2. Instalación (stack CE, exclusión con EE, inicializador) ·
3. Menú de Nómina · 4. Parámetros legales con vigencia · 5. Maestros SUNAT ·
6. Seguros (EPS, SCTR, Vida Ley sin regla) · 7. Contabilidad de nómina (mapeo PCGE,
diario PLLA; la boleta no toma el diario de la estructura) · 8. Alta de un trabajador
(empleado + `hr.version`) · 9. Estructuras (NME, NSO, NQA, GRAT, CTS, VAC, LIQ) ·
10. Boleta mensual · 11. Lote y orden del proceso · 12. Aportes y retenciones ·
13. Renta de 5.ª · 14. Gratificaciones · 15. CTS · 16. Liquidación por cese (no cubre
indemnización ni regularización de 5.ª) · 17. Vacaciones · 18. Feriados (línea GLOBAL,
sin regla propia) · 19. Asistencias · 20. HHEE, nocturnidad, movilidad, adelantos,
utilidades · 21. Reportes y archivos (planilla, TXT BCP/Interbank, PLAME, AFPnet) ·
22. Recibos por honorarios (4.ª) · 23. Subsidios y T-Registro: no cubiertos ·
24. Cierre mensual · Anexo A observaciones · Anexo B datos sintéticos · Anexo C cifras
medidas.

## Inventario del código (resumen)

- Contrato = `hr.version` en todos los módulos.
- Existen: R5TA_001 (proyección, 7 UIT, tramos, divisores por mes), GRATI_001 (jul/dic,
  sextos, factor régimen), BONO_GRATI_001 (9 % / 6,75 % EPS), CTS_001 (may/nov, 1/6 grati
  validada), truncas en LIQ, VAC_001, ONP/AFP (flujo/mixta, tope RMA), EsSalud, EPS,
  SCTR, SENATI, ASF, HHEE 25/35, BNOC, TARD_001 / TAR_001, DJ, SIND, ADEL/DESC_ADEL,
  UTIL_001.
- No existen: subsidios (solo categoría BSM sin uso; `.snl` vacío), exportación
  T-Registro, indemnización por despido, regularización de 5.ª al cese, regla de Vida
  Ley, TXT de Scotiabank / BN.
- Feriados: línea `GLOBAL` de om_hr_payroll en días trabajados (negativa, pagada); no
  descuenta; el `.jor` la resta de los días.
- Casos demo: NOMINA (jul-ago 2026), ASISTENCIA (set 2026), PLAME, PLAME-RXH (jul 2026),
  por el laboratorio `solse_pe_demo_libros` (① Sembrar ② Generar ③ Excel ④ Comparar
  ⑤ Limpiar). Cifras esperadas en `90-qa/fichas-qa-individuales.md` de la biblia; el
  manual debe usar las MEDIDAS en la base, no las esperadas.
