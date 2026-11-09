# Hallazgos · grupo g6_salidas (capítulos 2, 27, 29, 30 y Anexo E)

Medido en contable19 (solo lectura por JSON-RPC) y en el código de `addons/solse_pe_contabilidad/` (rama nomina-ce),
el 09/11/2026. Ninguno cambia un importe.

1. **El texto del asistente PLAME quedó viejo.** `solse_pe_payroll_ce/wizard/plame_views.xml`, el párrafo de arriba del
   formulario: «Genera los archivos de importación al PDT PLAME (.rem, .jor, .snl) … Las aportaciones (06xx/08xx) las
   calcula el propio PDT y no se exportan.» Desde los lotes 30, 49c, 51 y 71 el ZIP lleva también el `.or5`, el `.toc`
   y el `…_personal_en_formacion.txt`, y el `.rem` lleva el 0605 y los informativos marcados (0803, 0811 por defecto;
   0609, 0801, 0810, 0813 y 0814 con su casilla). Impacto: el usuario lee en pantalla lo contrario de lo que trae el
   archivo. Medido: el PLAME de junio de 2026 de la Consultora (re-medición del 71) trae `.toc` y personal en formación.
2. **El texto del asistente del T-Registro no nombra los archivos del practicante.** `wizard/t_registro_views.xml`:
   «(RP_RUC.ide, .tra, .per, .est, .cta y .edu)». Desde el lote 49c el alta del practicante lleva `.pfl` y `.lug`
   (`wizard/t_registro.py`, `_pe_filas_alta_formacion`). Impacto menor (texto).
3. **El caso `EMPRESA_*` dice «Compañía: SOLSE Demo Servicios».** `solse.demo.caso` ids 29 a 33: `company_clave` =
   `servicios` (leído por RPC), así que el formulario del caso muestra la compañía de servicios aunque el seeder
   (`seeder_empresa.py`, `_company`) trabaja en su propia compañía (12 a 16). Impacto: confunde en la captura y en el
   video «Una empresa en un mes».
4. **La cobertura del laboratorio no llega al 100 % con la nómina conforme.** `solse.demo.laboratorio` id 1:
   `total_casos` 33, `casos_conformes` 30, `cobertura` 90,91. Los 3 pendientes son de la facturación (LC, ANTICIPOS y
   DETRACCION, estado «pendiente»). No es un error de la nómina, pero la cabecera del laboratorio ya no dice «N casos y
   N conformes» como en el v2. El manual lo explica en el pie de c02_02.
5. **Sin medición en contable19 (no es un error, es un hueco para el manual):** el alta y la baja del practicante en el
   T-Registro (EMPRESA_CONSULTORA no tiene RUC y TREGISTRO no tiene practicantes), el `.or5` (0 registros de otros
   empleadores en contable19), el 0115 del 1 de mayo (FMAY_001), la gratificación ordinaria de un cese del 15 al 31/12
   en el `.rem` (0406/0312), las horas del `.jor` con feriados (160/184/168: la hoja «2» de la contadora dice «falta
   medir» en P-31 y P-87) y el subsidio que cruza de mes (el impacto del 27b dio 0 boletas). Un caso del laboratorio
   con cada uno cerraría la regla 1 del manual.
