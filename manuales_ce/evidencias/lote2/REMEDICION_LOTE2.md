# Re-medición del lote 2 de nómina CE — contable19

- **Fecha:** 2026-10-13, de 14:59 a 15:15 (hora del servidor, UTC).
- **Alcance:** solo medición. No se tocó código ni módulos.
- **Despliegue medido:** el de Gabriel (`-u` a las 14:54–14:55).

## Versiones (manifiesto en disco = base)

| Módulo | Esperado | Medido |
|---|---|---|
| solse_pe_payroll_base | 19.0.1.9.3 | 19.0.1.9.3 ✓ |
| solse_pe_payroll_ce | 19.0.1.10.10 | 19.0.1.10.10 ✓ |
| solse_pe_payroll_ce_demo | 19.0.2.5.0 | 19.0.2.5.0 ✓ |
| om_hr_payroll / om_hr_payroll_account | sin cambio | 19.0.1.0 / 19.0.0.0 ✓ |
| solse_pe_plame_rxh_demo (fuera de la línea) | — | 19.0.2.3.1 |

## Resultado

| # | Qué | Esperado | Medido | OK/FALLA |
|---|---|---|---|---|
| 1 | Versiones | base 19.0.1.9.3 · ce 19.0.1.10.10 · ce_demo 19.0.2.5.0 | Iguales en disco y en base | OK |
| 2 | Log del `-u` | Sin ERROR; mensajes U-03, U-04 y U-06 | **No verificable**: la sesión no tiene acceso al log del servidor. Los efectos sí se ven: HRA, DA, Travel, Meal y Medical archivadas; «Cónyuge» corregido; etiquetas de om en es_PE | Pendiente (revisar el log en el servidor) |
| 3 | Laboratorio | Los 4 casos al 100 %; Ana AFP_PRI_001 173,62 y NET 11 838,63 | PLAME-RXH 100 % (202 celdas) · PLAME 100 % (95) · ASISTENCIA 100 % (73) · NOMINA 100 % (366); 0 celdas distintas. Ana (jul-2026): AFP_PRI_001 173,615305 → 173,62 y NET 11 838,63 | OK |
| 4 | Boletas FM SYSTEMS recalculadas | 0 diferencias | 64 boletas hechas recalculadas en copia en borrador (borradas al terminar): **0 diferencias** | OK |
| 5 | U-01 Planes EPS | Entidad, N.° de póliza, vigencia, tasas y N.° de empleados; «PACIFICO EPS (DEMO)» en la ficha de Carlos; Vida Ley con lista propia | Lista EPS: Entidad · N° de póliza · Fecha de inicio · Fecha de finalización · Tasa empleador · Tasa trabajador · N.° de empleados. Ficha de Carlos, pestaña «Nómina PE», «Plan EPS: PACIFICO EPS (DEMO)». Vida Ley: Entidad · N° Póliza · Fecha inicio/fin vigencia · Tasa · N.° de empleados (vacía) | OK (obs. 1) |
| 6 | U-02 Contratos | Agrupada por empleado; «Empleado» 1.ª columna y no ocultable; estructura, régimen y sueldo visibles | Faceta «Empleado» (15 grupos). Columnas: Empleado · Fecha efectiva · Inicio · Fin · Estructura salarial · Régimen Laboral · Nota · Salario… «Empleado» no figura entre las columnas opcionales | OK |
| 7 | U-03 Reglas salariales | Filtro «Estructuras peruanas», agrupada por estructura, sin las reglas de India. **Anotar grupos y reglas** (local: 8 y 123; contable19 tenía 135 en total) | Facetas «Estructuras peruanas» + «Estructura». **8 grupos y 127 reglas**: Básicas 30 · Mensual 29 · Semanal 29 · Quincenal 3 · Gratificaciones 5 · CTS 3 · Vacaciones 21 · Liquidación 7. Sin el filtro: 9 grupos y 130 reglas (+ «Ninguno (3)» = BASIC/GROSS/NET de om). 130 activas + 5 archivadas = 135 | OK (obs. 2) |
| 8 | U-07 Formulario de contrato | Sin el grupo «Beneficios mensuales en efectivo» | No aparece en ninguna pestaña (contrato de Lucía). Ningún contrato de la base tiene valor en hra, da, travel_allowance, meal_allowance o medical_allowance (0 de 80) | OK |
| 9 | U-04 Motivo de baja y maestros | «[01] RENUNCIA», búsqueda por «01»; T8, T9, T17 y T35 con Código · Abreviatura · Descripción; «Cónyuge» | Contrato de Carmen: «[01] RENUNCIA». Al escribir «01» se sugiere «[01] RENUNCIA». T9, T17 y T35: Código · Abreviatura · Descripción. **T8: Código · Abreviatura · «Tipo de Contrato»**. Vínculos (T19): Cónyuge, Pareja, Hijo(a)… | OK (obs. 3) |
| 10 | U-04 Exportar y reimportar | Sin errores | Exportados 3 contratos (id + «Motivo de baja»: dos «[01] RENUNCIA» y uno vacío). Reimportado el mismo CSV con el importador estándar: prueba y carga sin mensajes; valores sin cambio (`u04_reimportacion.json`) | OK |
| 11 | U-05 Mapeo y T12 | Miga «RB_001 → 6211 / 4111»; T12 con Código · Descripción, vacía | Miga «Mapeo contable PCGE / RB_001 → 6211 / 4111». T12: Código · Descripción, 0 filas | OK |
| 12 | U-06 Contrato | «Estructura salarial», «Periodicidad de pago» (Mensual, Semanal…), «Diario de planillas», «Categoría de empleado»; nada en inglés | Las cuatro etiquetas presentes. Periodicidad: Mensual, Trimestral, Semestral, Anual, Semanal, Cada dos semanas, Bimestral. Ninguna etiqueta en inglés | OK (obs. 4) |
| 13 | U-06 Boleta y lote | Boleta: «Boleta rectificativa», «Rectificar», «Enviar por correo». Lote: «Marcar como hecho» | Boleta 148: botones Rectificar · Cancelar nómina · Enviar por correo; campo «Boleta rectificativa». Lote (formulario nuevo en borrador, sin guardar): Generar nóminas · **Marcar como hecho** · Cerrar. El único lote existente está «Hecho» y por eso no muestra botones | OK (obs. 5) |
| 14 | U-06 Boleta nueva (sin confirmar, descartada) | «Boleta de {empleado} – {mes año}»; con Gratificaciones, «Boleta de Gratificación de …»; días «Días laborados (100 %)» y «Feriados» | «Boleta de Lucía Fernanda Ramos Ticona – octubre 2026» → con Gratificaciones: «Boleta de Gratificación de Lucía Fernanda Ramos Ticona – octubre 2026». Días: «Días laborados (100 %)» WORK100 22 / 176 y «Feriados» GLOBAL −1 / −8 (8 de octubre). Se descartó: el total de boletas siguió en 100 | OK |
| 15 | U-09 Menús | Un solo «Parámetros de Nómina PE», en Nómina › Nómina PE | Nómina PE: «Parámetros de Nómina PE» (1 menú en toda la base). Configuración: Estructuras salariales · Reglas salariales · Registros de contribución · Plantillas de ventaja de contrato | OK (obs. 6) |

**Resultado: 14 OK y 1 pendiente que no se puede medir desde la sesión (log del `-u`). Ninguna FALLA.**

## Observaciones (no son fallas del lote 2)

1. **N.° de empleados del plan EPS:** muestra 0 con FM SYSTEMS activa y 1 con SOLSE Demo activa (Carlos es de la empresa 4). Cuenta por empresa activa, lo cual es coherente.
2. **Reglas en el filtro peruano:** 127 en contable19 frente a 123 en local. No se investigó el origen de las 4 reglas adicionales (no hay lista local con la cual comparar); el detalle por grupo está en la fila 7.
3. **T8:** la tercera columna se titula «Tipo de Contrato» en vez de «Descripción». Si se quiere uniformidad con T9/T17/T35, es un ajuste menor.
4. **Contrato:** «Horas laborables» muestra «Standard 40 hours/week». Es el nombre del calendario (dato del registro, no etiqueta).
5. **Estado del lote:** el valor `close` se muestra como «Cerrar» (verbo) en la barra de estado. Debería decir «Cerrado».
6. **Menú de om:** «Plantillas de ventaja de contrato» es una traducción literal de om. Además, el chatter del empleado muestra «Employee creado».

## Evidencia (en esta carpeta)

- `laboratorio.txt` y `comparaciones_laboratorio.csv`: las 4 comparaciones (736 celdas, todas «ok»).
- `remedicion_anio_completo.json`: 64 boletas recalculadas, 0 diferencias.
- `u04_export_contratos.csv` y `u04_reimportacion.json`: prueba de exportar y reimportar.
- `ui_hechos.json`: lo leído en pantalla en cada paso.
- `capturas/`:
  - U-01: `u01_*`
  - U-02: `u02_*`
  - U-03: `u03_*`
  - U-04: `u04_*`
  - U-05: `u05_*`
  - U-06 contrato: `u06_contrato*`
  - U-06 boleta: `u06_boleta*`
  - U-06 lote: `u06_lote*`
  - U-06 boleta nueva: `u06_boleta_nueva_*`
  - U-09: `u09_*`
