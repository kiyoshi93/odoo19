# Informe g3_el_mes (cap. 10, 11, 12, 18, 19, 21, 22, 25, 26) · resumen del coordinador
Capturas pedidas: 10 (capturas_pedidas/g3_el_mes.md): rehacer c10_02_boleta_impresa, c10_03_asiento, c10_04_boleta_nueva, c19_01_ajustes_asistencias; nuevas c10_06_conceptos_vales, c10_07_aviso_rmv, c12_05_sctr_lineas, c18_03_feriados_aparte, c18_04_opciones_feriados, c22_05_opciones_suspensiones.
Hallazgos (hallazgos/g3_el_mes.md): 1 banda de feriados V-05 se apaga con feriados de un solo horario (_pe_hay_feriados); 2 NOTA_LOTE37 da otro defecto que el código («En la planilla adicional, con su fecha»); 3 hoja 1 contadora «hoy» viejo en P-39, P-41, P-90, P-89 vacía; 4 boletas sembradas sin nombre U-06 (cosmético).
Corregido: asiento BOLETA PLLA/2026/12/0373 (5 671,04); boletas sin versión 0 de 409; tardanza sueldo/30/horas/60 (10,94 igual); sobretasa feriado sí se calcula (lote 18); SCTR 4 líneas (Rosa 5,46/7,14 tasa de referencia); crédito EPS del mes; banda de feriados ya no sale en compañía 4.
Por medir: crédito EPS −90/fijo 67,50/tope 550; SCTR grati 30; FMAY_001 100 y 103,77; semanal 0115/0121 70/420 y 210/280; PRALI_EXC_001 ONP 442 EsSalud 306 tope 2 460; valor hora; 25a/25b; .jor 160/184/168; AF edad del hijo; adicional 100/9/58,33/50.
Cap. 33: dominical proporcional (O-112); 1 de mayo del destajero; descanso semanal trabajado o feriado en día libre no salen de asistencias; casos sin piso 25b; dos mensuales no ajustan a 30; valor hora con dos versiones en el mes.
## E06 Boleta: BOLETA dic 2026 neto 4 025,70; PDF «4,025.70» y «… SOLES Y SETENTA CÉNTIMOS»; asiento PLLA/2026/12/0373 5 671,04; CONCEPTOS 70001601 vales 150 fuera del neto PRALI_ENT_001, neto 5 097,50; RMV: K6 oct (1 200 < 1 230) «rmv», K5 1 600 «rmv_nocturna» mínimo 1 660,50; banda sin_tipo, computable, «Validada con avisos»; provisiones no se imprimen.
## E07 Lote: orden grati, vacaciones, adicionales, CTS, mensual, liquidación; ADICIONALES 70001701 un abono 3 045 (2 610 + 435); campo Compañía; pago desde el lote.
## E08 Aportes: Carlos EPS 162,59/−81,29, EsSalud 325,17; crédito EPS del mes (−90 en vez de −87,08) y tope 550; SCTR 15,90/27,60 y 36,00/31,50; base con adicional ONP 390 + 65; deducible base 2 970 AFP 297; SENATI I3 18,71, I4 sin línea, aviso; S4 EsSalud 101,70.
## E10 Feriados: FERIADOS 70001901 2 500 + 300 + 200; 70001902 TFER_001 200 (12,50 × 8 × 2); .jor 168 / 160 / 184; semanal dominical 0115 70/420 guardado; FMAY_001 100; c18_04.
## E11 Asistencias: casilla «Pagar el trabajo en feriado desde las asistencias»; tardanza con jornada, Carlos 10,94.
## E12 Cambios de contrato: aumento 2 533,33; parte del mes cese 10/03 1 000, ingreso 20/03 1 200 (1 320); una sola mensual (dos suman 3 100).
## E13 Licencias: semana sin goce 2 083,33; permiso 2 h 2 479,17; febrero sin goce básica 0 y AF 0 (grupo «Suspensiones»); piso 25b 100,00; .snl guardado al validar.
## E14 (semanal/.snl): .snl guardado (195 boletas); dominical guardado; ausencia aprobada después no cambia el PLAME; rectificar.
## E18 Vida Ley/seguros: VIDALEY 15,90 al 0803; póliza SCTR y columnas; casilla grati 30,00 (póliza al 15); plan EPS vigente (eps_no_vigente); nota de crédito revierte la prima.
## Corrección (g3, después de las capturas)
- E06: la boleta impresa dice «SON: CUATRO MIL VEINTICINCO Y 70/100 SOLES» (medido en c10_02), no «… SOLES Y SETENTA CÉNTIMOS». Hallazgo 5.
- E13: el guion usa el caso AUMENTO (70000903, sueldo 2 400: semana sin goce + permiso de 2 h = 1 980,00), que existe en contable19; el escenario 2 083,33 / 2 479,17 del v2 se borró y no se puede capturar de nuevo.
