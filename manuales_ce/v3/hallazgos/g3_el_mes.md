# Hallazgos · grupo g3_el_mes (capítulos 10, 11, 12, 18, 19, 21, 22, 25 y 26)

Medido el 09/11/2026 en contable19 por JSON-RPC, solo lectura (`search_read`, `search_count`, `read_group`, `fields_get`).

## 1. La banda de feriados del año (V-05) se apaga con feriados de un solo horario
- **Módulo / dónde:** `solse_pe_payroll_base`, `hr.rule.parameter._pe_hay_feriados` (models/hr_rule_parameter.py, línea 620).
- **Qué pasa:** cuenta cualquier hoja sin recurso de la compañía o sin compañía, **también las que tienen horario**
  (`calendar_id`). En SOLSE Demo Servicios (id 4) los únicos «feriados» de 2026 son 4 hojas de los horarios de los casos
  (Angamos del caso ASISTENCIA y 8, 9 y 25/12 del horario del caso FERIADOS). Con eso la banda «Faltan los días festivos
  de 2026» ya no sale en la compañía 4 (la CTS en borrador id 9547 no la muestra; la gratificación en borrador id 10032
  de la compañía 13, sin feriados, sí), pero la boleta de diciembre del caso BOLETA (id 9544, horario estándar) no tiene
  ningún feriado.
- **Impacto:** bajo en producción, pero real: una compañía que cargue los feriados solo en un horario (o un feriado
  regional de una sede) deja sin aviso a los trabajadores de los demás horarios, que se quedan sin feriados en los días
  trabajados, el `.jor`, el 0115 y la asistencia. En el manual: la captura c10_04 del v2 muestra la banda, que hoy no sale
  (se pidió rehacerla).
- **Sugerencia:** contar solo las hojas sin `calendar_id` (o avisar por horario).

## 2. La nota del lote 37 dice otro valor por defecto que el código
- **Dónde:** `NOTA_LOTE37.md` dice que «Variables de una adicional validada después de la mensual» viene en «En la boleta
  del mes siguiente (como antes)». El código (`res_company.py`, `pe_provision_adicional`, línea 381) tiene
  `default='adicional'` («En la planilla adicional, con su fecha») y las cinco compañías leídas (1, 4, 14, 15 y 16) están
  en «adicional».
- **Impacto:** documental (capítulos 7 y 11). El cap. 11 del v3 se escribió con el valor del código.

## 3. La hoja «1 · Pueden cambiar código» de la contadora describe un «hoy» viejo en tres preguntas
- **Dónde:** `99-sintesis/contadora/PREGUNTAS_CONTADORA_2026-11-08.xlsx`, columna «Qué hace hoy el sistema».
  - **P-39:** dice «Hoy se paga completa…»; desde el lote 25a el valor por defecto es «No pagarla en un mes entero en
    suspensión perfecta» (`pe_asignacion_sin_goce` = `no_pagar` en las cinco compañías leídas).
  - **P-41:** dice «(b) el día 1 laborado no se paga»; desde el lote 25b hay piso (100,00) y la opción «Días calendario con
    goce».
  - **P-90:** dice «Hoy, solo si es regular»; desde el lote 24 el valor por defecto es «Siempre» (`pe_subsidio_feriado` =
    `siempre`). **P-89** tiene la columna vacía («None»).
- **Impacto:** la contadora podría responder sobre un comportamiento que ya no es el del sistema. El manual v3 describe el
  del código.

## 4. Las boletas sembradas por el laboratorio no llevan el nombre de U-06
- **Dónde:** las boletas de los casos (por ejemplo, ids 9539 a 9544 del caso BOLETA) se llaman «Recibo de salario -
  Trabajadora BOLETA (perfil C-05) - Nómina Mensual Empleados (01/12/2026 al 31/12/2026)», no «Boleta de … – diciembre
  2026» (U-06), porque el sembrador las crea sin el `onchange` del formulario.
- **Impacto:** cosmético; solo se nota en las capturas de listas del laboratorio (y en los videos). Las boletas creadas
  desde el formulario y el lote sí llevan el nombre de U-06.

## 5. La boleta impresa dice «… Y 70/100 SOLES», no «… SOLES Y … CÉNTIMOS» como la nota del lote 38
- **Dónde:** `solse_pe_payroll_ce.reporte_boleta_pago`, boleta del caso BOLETA de diciembre de 2026 (captura c10_02 del 09/11/2026):
  «SON: CUATRO MIL VEINTICINCO Y 70/100 SOLES». `NOTA_LOTE38.md` dice que la boleta escribe «… SOLES Y CINCUENTA CÉNTIMOS»
  (el formato de `res.currency._pe_en_letras`), que la boleta no parece usar.
- **Impacto:** documental (el plural sí está). El cap. 10 del v3 cita el texto medido. Conviene confirmar qué usan la hoja de
  liquidación y la constancia de la CTS.

## 6. Una boleta nueva de un periodo sin contrato propone días trabajados de otros meses
- **Dónde:** formulario de la boleta (sin guardar), SOLSE Demo Servicios, 09/11/2026. «Trabajador AUMENTO sin goce una semana»
  (contrato desde el 01/09/2026), periodo 01/08/2026–31/08/2026: la banda dice bien «no tiene contrato vigente…», pero la pestaña
  de días trabajados propone WORK100 65 días / 520 h y SINGOCE100 −5,25 días (la licencia de noviembre). Con «Trabajador AUMENTO a
  mitad de mes» (dos versiones), WORK100 32 y 33 días.
- **Impacto:** bajo (la banda avisa y sin contrato no se calcula), pero confunde. En el manual, c26_04 se recortó a la banda y la
  cabecera. Revisar `get_worked_day_lines` / `_pe_tramos_de_versiones` cuando ninguna versión rige en el periodo.

## Para «Lo que no cubre» (capítulo 33), sin cambio de código
- El dominical proporcional a los días trabajados de la semanal (D.Leg. 713, art. 4; O-112).
- El 1 de mayo del destajero con el promedio de los 30 días previos (D.S. 012-92-TR, art. 10): solo con la entrada FMAY_001.
- El descanso semanal trabajado y el feriado en un día libre del horario no salen de las asistencias (se ingresan en TFER_001).
- El piso de la básica no corre en un mes con vacaciones y suspensiones, con un permiso sin código de la Tabla 21 ni con una
  versión sin horario o con horario flexible (lote 25b).
- Dos mensuales del mismo mes (por contrato o por quincena) no ajustan al mes comercial (lote 25a; P-41).
- El valor hora con dos versiones en el mes usa el horario de la versión de la boleta (lote 24).
