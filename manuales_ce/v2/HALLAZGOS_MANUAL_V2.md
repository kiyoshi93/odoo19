# Hallazgos del manual v2 de la nómina Community

Hallazgos de la documentación (desde O-63). Solo medición: no se cambió código ni datos de FM SYSTEMS.

| # | Módulo / dónde | Qué se midió | Impacto | Cómo se midió |
|---|---|---|---|---|
| O-63 | Datos de FM SYSTEMS (recorrido del manual), no el código | Las 64 boletas validadas de Lucía y Héctor (2025–2026) conservan las líneas de días del v1: «Normal Working Days paid at 100%», «Global Leaves» (la línea negativa de feriados anterior a C-09) y, en la mensual de febrero de 2026 de Lucía, VACPE100 marcada «¿Pagado?» (anterior a C-16). Tres nombres de boleta siguen en inglés («Salary Slip of … for diciembre-2026», anterior a U-06). Los **importes** sí corresponden al código actual: 5.ª de Lucía 2 309,73 / 2 160,78 | Las pantallas de días del recorrido no muestran C-09 ni C-16. El manual v2 usa para esas pantallas las boletas del laboratorio, calculadas con las versiones finales. El Anexo C solo puede reflejar C-09 si se regeneran las boletas de FM, lo que requiere la autorización de Gabriel (cancelar, recalcular y revalidar 64 boletas y sus asientos) | RPC de solo lectura: `hr.payslip.worked_days` de las boletas 84, 116, 117, 129 y 140 (`v2/medidas/boletas_bloque2.json`) |

Notas que no son defectos:
- **Vacaciones › Configuración › Días festivos.** La acción 974 que abre la lista desde un horario de trabajo da «¡Vaya! Ocurrió un error» si se abre por URL directa, porque necesita el horario activo. La del menú (975) funciona. Es estándar de Odoo.
