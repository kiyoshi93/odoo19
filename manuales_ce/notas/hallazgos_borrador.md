# Hallazgos (borrador de trabajo, se pasan a la biblia al final)

- H-CE-1 (2026-10-07) Las estructuras salariales (NME, NSO, GRAT, CTS, VAC, LIQ, NQA, 0001, BASE) tienen
  company_id = FM SYSTEMS (compañía 1), pero las boletas de la compañía «servicios» del laboratorio las usan
  (caso NOMINA al 100 %). Medido por RPC: hr.payroll.structure search_read → company_id [1].
  Impacto: en multiempresa estricta un usuario solo de «servicios» podría no ver/usar las estructuras. Verificar.

- H-CE-2 (medido 2026-10-08, FM SYSTEMS) Parámetros sin vigencia 2025: `pe_afp_comision_flujo` arranca 2026-01-01 y
  `pe_afp_rma` 2026-04-01. Una boleta AFP de 2025 falla: «No existe una vigencia del parámetro de nómina
  "pe_afp_comision_flujo" para la fecha 2025-01-31». Con UIT 2025 y RMV 2025 ya cargadas, el resto de 2025 sí calcula.
  Además la RMA vigente en la data (12.598,91 desde 2026-04-01) no tiene las actualizaciones trimestrales siguientes.
- H-CE-3 (2026-10-08) RMV 1.230 desde 2026-10-01 (D.S. 015-2026-TR) no está en `hr_rule_parameter_data.xml`
  (pe_rmv 1130, pe_asig_familiar 113). Se cargó a mano para el manual; con la vigencia nueva ASF_001 sale 123 en oct-2026.
- H-CE-4 (medido) R5TA_001 proyecta las gratificaciones pendientes con `version.wage` (sin asignación familiar), pero
  GRATI_001 paga sueldo + AF. bloque4 «proyeccion_gratis = version.wage * factor_grati * (1.0 + bono) * gratis_pendientes».
  En diciembre la grati del mes cuenta como «pendiente» con esa base y el saldo anual queda corto.
  Medido: Lucía (4.500 + AF 113) retención 2025 = 2.292,45; cálculo manual con renta real 65.412,34 → 2.309,73
  (diferencia 17,28 ≈ 113 × 1,09 × 14 %).
- H-CE-5 (medido) Mes con goce parcial: VAC_001 incluye la AF prorrateada ((sueldo+AF)×días/30) y ASF_001 de la mensual
  paga la AF completa sin prorratear. Lucía feb-2026 (15 días de goce): VAC 2.306,50 + RB 2.250,00 + ASF 113,00 =
  4.669,50 frente a 4.613,00 del mes normal (+56,50 de AF). Pregunta para la contadora.
- H-CE-6 (medido) En el mes de goce la R5TA de la mensual cae (feb-2026: 12,77 frente a 177,77) porque la proyección usa
  INA del mes × meses restantes y la boleta de vacaciones del mismo mes no entra al percibido (hasta el mes anterior).
  Se recupera en los meses siguientes. Observación de diseño.
- H-CE-7 (medido) El sembrador de la demo (`solse_pe_payroll_ce_demo/models/seeder.py:125`) marca `afecto_senati = True`
  en la compañía donde corre. En contable19 FM SYSTEMS (empresa de servicios) quedó afecta a SENATI por una siembra
  antigua del asistente «Datos de prueba». Efecto: SENATI_001 en todas sus boletas.
- H-CE-8 (medido) Las líneas de la boleta guardan importes sin redondear (AFP_COM_001 71,5015; AFP_PRI_001 63,1981;
  R5TA_001 189,6033; BONO_GRATI_001 243,8775 en la demo). Verificar que PLAME / planilla / asiento redondeen igual.
- H-CE-9 (medido) Sin `struct_id` en el contrato (hr.version), `onchange_employee_id` del fork no carga días trabajados
  ni estructura (om_hr_payroll/models/hr_payslip.py:531-533). El alta por la ficha del empleado deja «Salary Structure»
  vacía; hay que elegir NME en la pestaña Nómina.
- H-CE-10 (medido) Las vacaciones VACPE100 cuentan días hábiles: goce 02-16 feb-2026 (15 calendario) = 11 días en la
  ausencia; la boleta VAC paga 15 (rango de fechas). Es N-7 de la biblia; confirmar que sigue abierto.
