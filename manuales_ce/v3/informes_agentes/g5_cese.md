# Informe g5_cese (cap. 16 y 23) · resumen del coordinador
Capturas pedidas: 7 (capturas_pedidas/g5_cese.md). Hallazgos: hallazgos/g5_cese.md (H1 doc v2 subsidio sin derecho; H2 CTS sin 0904).
Cifras corregidas: INDEMNIZACION 70000351 vac. truncas 383,33 (v2 391,67), base 5.ª 2 563,33, ONP 49,83, neto 22 588,50; tope solo 70000358 (37 356,00);
70000355/356 18 000,00; SUBSIDIOS 70000805 paga SUB_INC_001 1 000,00 con aviso, neto 2 740,00.
Por medir (criterios del lote, no en contable19): reingreso 28/12, récord cumplido el día del cese, modal desnaturalizado 24 750, incentivo 60 000, semanal con subsidio.
## E16 Liquidación (reemplazar)
- Orden: mensual y (cese desde 15/07) gratificación de julio antes de la liquidación; control «Boletas del año antes que la liquidación del cese».
- INDEMNIZACION 70000351: vac. truncas 383,33 (de fecha a fecha desde 15/03), IND_001 18 575,00 fuera de la base de 5.ª (2 563,33), neto 22 588,50, PLAME 0501.
- Opciones del cese en la compañía: plazo máximo del modal, mayor entre art. 76 y régimen, Avisar/Calcular no gozadas.
- DOCUMENTOS_CESE 70002402: VAC_ADQ_001 6 000, IND_VAC_001 3 000, IND_001 11 250, neto 22 865,00; hoja, certificado, constancia; correo (48 h).
- Cierre: segunda liquidación del mismo cese avisa cese_liquidacion_duplicada.
## E14 Subsidios (reemplazar)
- 70000801 casilla «Accidente (común o de trabajo)»; noviembre RB 2 000 + SUB_INC_001 1 000 (promedio 100), ONP 260, neto 2 740; .rem 0121/0916; .snl 20|20 y 21|10.
- 70000805 sin derecho: paga 1 000 con nota «EsSalud no reembolsará…»; «Accidente» quita el aviso.
- «Promedios fijados del subsidio» en la ficha de 70000802 (12/10 y 01/11, 100,00); redondeo a soles enteros; opción ONP «No».
- Cambio de año: 70000807 (dic 17 días empleador; ene 20+5, RB 2 500 + 500); opción «Continuación del subsidio al año nuevo desde» (01/01/2029 demo).
- Semanal que cruza de mes 600/100 (opción «Por los días subsidiados de cada mes»); .snl guardado al validar.
- Maternidad 70000803 3 000 sin ONP ni EsSalud; 70000806 ene 1 300 + 1 700, feb 2 800.
