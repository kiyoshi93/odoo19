# Hallazgos · g5_cese (capítulos 16 y 23)

Medido en contable19 por JSON-RPC, solo lectura, el 2026-11-09 (ce 19.0.1.39.202, base 19.0.1.21.14, ce_demo 19.0.2.46.0).

## H1 · El manual v2 decía que sin derecho no se paga el subsidio (documentación, no código)
- **Dónde:** capítulo 23 del v2 (tabla del 23.1 y pie de c23_03_sin_derecho_nov_dias): «70000805 · sin derecho: RB 2 000,00, sin subsidio y con aviso».
- **Medido:** la boleta de noviembre de 2026 de 70000805 (`hr.payslip` 9625, caso SUBSIDIOS) tiene SUB_INC_001 **1 000,00** y neto 2 740,00,
  con la nota «Validada con avisos: … no cumple los aportes que dan derecho al subsidio … EsSalud no reembolsará el subsidio …».
  Es el diseño (`_pe_sin_derecho_a_subsidio`: aviso o bloqueo, «antes se pagaba siempre»). La captura del v2 ya mostraba «Por pagar 2 740,00».
- **Impacto:** el v2 contaba mal el comportamiento. Corregido en el v3. El caso SUBSIDIOS solo compara la 0121 del `.rem` de 70000805
  (el 0916 sin derecho espera a P-42), así que el PLAME de ese trabajador no está medido.

## H2 · La CTS trunca no tiene concepto PLAME (a confirmar)
- **Dónde:** regla CTS_TRUNCA_001 de la estructura «Liquidación» (y CTS_001): `plame_ids` vacío.
- **Impacto:** bajo. La CTS pagada directamente al cese no sale en el `.rem` (Tabla 22, 0904 «Compensación por tiempo de servicios»,
  sin afectaciones). Puede ser una decisión del módulo; no encontré dónde se documenta. Para la contadora o el chat de desarrollo.
- **Cómo:** `hr.salary.rule` search_read de CTS_TRUNCA_001 y CTS_001 (plame_ids = []); las demás líneas de la liquidación sí tienen código
  (0114, 0118, 0407, 0313, 0501, 0503, 0504, 0906, 0928).

## Nota (no es hallazgo): cifras del v2 que cambiaron por lotes posteriores
- INDEMNIZACION 70000351: vacaciones truncas 391,67 → 383,33, base de 5.ª 2 571,67 → 2 563,33, ONP 50,92 → 49,83, neto 22 595,75 → 22 588,50
  (lote 32b, de fecha a fecha desde el aniversario 15/03). La indemnización (18 575,00) no cambia.
- INDEMNIZACION 70000357 (18 750,00) no es un caso de tope: es el indeterminado después de un modal (vínculo desde el 01/03/2022).
  El tope es solo 70000358 (37 356,00). El v2 los juntaba bajo «Tope de 12 remuneraciones».
