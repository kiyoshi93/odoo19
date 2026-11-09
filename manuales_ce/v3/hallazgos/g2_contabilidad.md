# Hallazgos · g2_contabilidad (capítulos 7 y 28)

Medido en contable19 el 09/11/2026, solo lectura (search_read / read / read_group), `solse_pe_payroll_ce` 19.0.1.39.202.

## H1 · Alta · «Registrar pago» no puede pagar las boletas con líneas de provisión o de aplicación

- **Módulo:** `solse_pe_payroll_ce`, `models/pago_planilla.py` (`_pe_lineas_del_trabajador`, `_pe_debido_al_trabajador`,
  `_pe_motivo_sin_pago`) frente a las reglas PRO_* y APL_* (lotes 20b y 20c).
- **Dónde:** el saldo «por pagar» suma todas las líneas del asiento de la boleta en cuentas que empiezan con 411, 413,
  415 o 419. Las líneas de provisión y de aplicación van a la 4114, 4115 y 4151 **con el trabajador como socio**, así que
  cuentan como deuda con el trabajador. Lo que el asiento le debe deja de coincidir con el neto y el pago se rechaza
  («… no coincide con el neto … revise las cuentas de sus reglas») o no queda saldo.
- **Medido (`pe_por_pagar` frente al NET de la boleta), compañía 4:**

  | Boleta | Caso | Por pagar | Neto |
  |---|---|---|---|
  | 9722, mensual 01/2028 de 70002201 (PRO_*) | PROVISIONES_BOLETA | 3 669,74 (= 2 583,07 + 500 + 45 + 291,67 + 250) | 2 583,07 |
  | 9742, mensual 07/2028 de 70002201 (PRO_* y APL_* de la gratificación) | PROVISIONES_BOLETA | 399,73 | 2 583,06 |
  | 9764, gratificación 07/2029 de 70002301 (APL_* en su boleta) | PROVISIONES_BENEFICIO | 0,00 | 3 270,00 |
  | 9747, vacacional 02/2029 de 70002302 | PROVISIONES_BENEFICIO | −195,00 | 1 305,00 |
  | 9756, liquidación 03/2029 de 70002303 | PROVISIONES_BENEFICIO | −3 251,98 | 3 591,36 |

- **Impacto:** con «Provisión mensual de beneficios» = «En la boleta mensual», o con «Aplicación de lo provisionado» =
  «En la boleta del beneficio» (y siempre la liquidación con la boleta mensual), la planilla no se puede pagar con
  «Registrar pago» (N-07, lote 38). Arrastra la boleta por correo «a quien cobra en cuenta» (lote 38, P-54 a), que pide el
  pago registrado. Con «Asiento mensual de provisiones» no pasa: la provisión va en un asiento aparte. La re-medición del
  lote 38 probó el pago con UTILIDADES_REPARTO y COMPUTABLE, sin provisiones.
- **No se pulsó «Registrar pago»** (el brief lo prohíbe): el rechazo se deduce del código con las cifras medidas.
- **En el manual:** cap. 28.1 lleva una nota «Límite» con estas cifras. Si se corrige antes de publicar, quitarla.

## H2 · Media · La liquidación con «Avisar» descarga el pasivo de vacaciones no gozadas que no paga

- **Módulo:** `solse_pe_payroll_ce`, aplicación de la liquidación (lote 20c) con «Vacaciones ganadas y no gozadas al
  cese» = «Avisar» (por defecto).
- **Medido:** caso PROVISIONES_BENEFICIO, liquidación de 70002303 del 31/03/2029 (hr.payslip 9756, PLLA/2029/03/0005).
  Paga solo las truncas (vacaciones truncas 750,00) y su historial avisa: «Vacaciones ganadas y no gozadas … récord del
  01/01/2028 al 31/12/2028, 30 de 30 días sin gozar … 3000.00 … Regístrela con la entrada VAC_ADQ_001». Aun así, su
  asiento aplica **APL_VAC_001 3 750,00** (3 000,00 del récord R2028-01-01 + 750,00 del R2029-01-01) y **APL_ESSVAC_001
  337,50** (270,00 + 67,50): debe 4115 / haber 6215 3 000,00 por un récord que no se pagó.
- **Impacto:** el pasivo del récord queda en cero y el gasto se revierte 3 270,00 (con su EsSalud) mientras la deuda con
  el trabajador sigue (D.Leg. 713, art. 22). Si después se paga con VAC_ADQ_001, va entero al gasto. La nota del lote 50
  dice que la **indemnización** vacacional queda en el pasivo con «Avisar»; la remuneración del récord no.
- **Para la contadora/desarrollo:** ¿con «Avisar» y sin la entrada, la liquidación debería dejar en el pasivo lo del
  récord no pagado?

## H3 · Baja · Texto del asistente «Provisiones del mes» desactualizado

- **Dónde:** `wizard/provisiones_views.xml`, el párrafo gris: «Si el borrador del mes ya existe, se reemplaza; si ya
  está contabilizado, hay que anularlo para recalcular.»
- **Desde el lote 36** la opción por defecto («Corrección de un mes contabilizado» = «Asiento de ajuste por la
  diferencia») hace un asiento de ajuste sin anular nada. El texto solo vale con «Extorno y asiento nuevo».
- La ayuda de la acción «Provisiones de beneficios» (lista vacía) también nombra solo el «Asiento mensual de provisiones».

## H4 · Observación de notas (no es del código)

- **NOTA_LOTE38** dice que la boleta escribe «DOS MIL SEISCIENTOS ONCE SOLES Y CINCUENTA CÉNTIMOS». La re-medición del
  lote 38 en contable19 midió «DOS MIL SEISCIENTOS ONCE Y 50/100 SOLES» y, en una boleta de la demo, «SEIS MIL
  CUATROCIENTOS SESENTA Y SIETE Y 36/100 SOLES» (el texto base lo da `amount_to_text` de la base). El manual usa lo medido.
- **NOTA_LOTE20C**: sus cifras de la CTS de mayo (1 166,68) y de la liquidación (875,01 de CTS y 750,00 de vacaciones) no
  son las del caso PROVISIONES_BENEFICIO en la base, que tiene saldo inicial en enero (1 750,01; 1 458,34; 3 750,00 y
  337,50). Las de la nota coinciden con PROVISIONES_BOLETA (70002204: 1 500,00 / 135,00 / 875,01 / 750,00 / 67,50). El
  manual cita cada cifra con su caso.
