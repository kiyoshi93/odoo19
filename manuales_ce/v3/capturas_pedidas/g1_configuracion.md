# Capturas pedidas · g1_configuracion (capítulos 3, 4, 5, 6, 8 y 9)

Base contable19, usuario administrador, idioma español (Perú). Ids medidos el 2026-11-09. Nada de datos reales de FM
(RUC, cuentas, correos): si aparecen en la pantalla, ofuscarlos.

## Para rehacer (la pantalla del v2 cambió)

| Nombre | Qué debe verse | Compañía | Registro exacto | Vista / pestaña | Resaltar |
|---|---|---|---|---|---|
| `c03_02_menu_nomina_pe` | El menú Nómina PE completo, abierto. Es largo: si no entra, hacer dos capturas y unirlas, o reducir el zoom | FM SYSTEMS (activa sola) | Nómina › Nómina PE | Menú desplegado | Seguros y EPS › **Pólizas SCTR**; **AFPnet: registrar el pago**; **Trabajadores del reparto de utilidades**; **Detalle de Renta de 5ta**; Contabilidad de nómina › **Provisiones del mes**; **Provisiones de beneficios** |
| `c04_01_parametros_lista` | Los 27 parámetros agrupados por categoría con su «Valor vigente» | FM SYSTEMS | Nómina › Nómina PE › Parámetros de Nómina PE | Lista agrupada por «Categoría PE», todos los grupos abiertos | `pe_feriado_sobretasa` (1.0, grupo jornada) y `pe_renta5_tasa_no_domiciliado` (0.30, grupo renta) |
| `c06_04_sctr_en_la_ficha` | Grupo «Salud» con «Cubierto por SCTR» marcada, SCTR salud = EsSalud y SCTR pensión (entidad) = ONP | SOLSE Demo Servicios (4) | hr.employee 3511, «Trabajador SCTR EsSalud y ONP», DNI 70002001 | Ficha › pestaña Nómina PE | La etiqueta «Cubierto por SCTR» (antes «SCTR Pensión») y las dos entidades |
| `c08_16_contrato_t8_t24` | El grupo «Perú - Datos laborales (T-Registro / PLAME)» completo, las dos columnas | SOLSE Demo Servicios (4) | hr.version 3804 de «Trabajadora TREGISTRO AFP, EPS y depósito» (DNI 70001501), versión del 01/10/2026 | Contrato › Información salarial, bajar hasta el grupo | En la columna derecha: «Remuneración principal» (Fija), «Fuera de la base del SENATI», «No domiciliado (Impuesto a la Renta)» y «¿Es practicante?»; a la izquierda, «Incentivo por cese inafecto» |
| `c08_17_salud_cuentas_firma` | Grupos Salud, Cuentas bancarias, Descuento judicial, Firma de boletas y Entrega de la boleta | FM SYSTEMS | hr.employee 27, Lucía Fernanda Ramos Ticona | Ficha › pestaña Nómina PE | La etiqueta «Cubierto por SCTR». Ofuscar cuentas si las hubiera (hoy están vacías) |
| `c09_01_estructuras` | Las 14 estructuras con las columnas Nombre, Referencia, **Tipo de planilla**, Reglas salariales y Compañía | FM SYSTEMS | Nómina › Configuración › Estructuras salariales | Lista | La columna «Tipo de planilla»; las nuevas COMI, BONI, UTIL y SMF |

## Nuevas

| Nombre | Qué debe verse | Compañía | Registro exacto | Vista / pestaña | Resaltar |
|---|---|---|---|---|---|
| `c06_05_polizas_sctr` | Las cuatro pólizas del caso SCTR: entidad, aseguradora, número, tasa, vigente desde y hasta | SOLSE Demo Servicios (4) | Nómina › Nómina PE › Seguros y EPS › Pólizas SCTR (ids 81 a 84) | Lista | Tasas 0,53 / 1,20 / 0,92 / 1,05 y la vigencia 01/11/2026 – 30/11/2026 |
| `c06_06_poliza_sctr` | El formulario de la póliza «Salud - EPS» | SOLSE Demo Servicios (4) | solse.pe.sctr.poliza 82, «Caso SCTR · eps» | Formulario | La casilla «Cobra la prima sobre la gratificación ordinaria» (sin marcar) y la tasa 1,20 |
| `c06_07_boleta_sctr` | Las líneas de la boleta con SCTR_SAL_001 36,00 y SCTR_PEN_001 31,50 | SOLSE Demo Servicios (4) | hr.payslip 9713, «Trabajadora SCTR EPS y compañía», 01/11/2026 – 30/11/2026 (DNI 70002002) | Boleta › pestaña de líneas (Cálculo de salario), con las columnas opcionales «Póliza SCTR» y «Tasa SCTR (%)» activadas | Las dos líneas SCTR con su póliza y su tasa |
| `c08_18_contrato_no_domiciliado` | La columna derecha de «Perú - Datos laborales» con «No domiciliado (Impuesto a la Renta)» marcado y el convenio | SOLSE Demo Consultora (16) | hr.version 3924 de «Consultor CONSULTORA andino no domiciliado» (S5, documento 000068005), versión del 04/05/2026, sueldo 8 000 | Contrato › Información salarial | «Convenio para evitar la doble tributación» = «3 · Comunidad Andina (Bolivia, Colombia y Ecuador)» |
| `c09_05_regla_casillas` | El formulario de la regla con los cuatro campos | FM SYSTEMS | hr.salary.rule 169, MOVL_001 «Movilidad de libre disposición» de la estructura NME | Formulario de la regla, debajo de «Aparece en la boleta» | «¿Aplica para utilidades?» y «Variable regular para la remuneración computable» marcadas; «Cómo entra en la remuneración computable» = «Variable…» (si se abre la lista, mostrar las cuatro formas sin guardar) |
| `c09_06_opciones_compania` | La pestaña «Nómina PE - Controles» en los grupos «Seguro Vida Ley», «Valor hora y feriados», «Suspensiones» y «Renta de 5.ª» | FM SYSTEMS | Ajustes › Usuarios y empresas › Empresas › FM SYSTEMS SOLUTIONS EIRL | Pestaña Nómina PE - Controles, desplazada hasta esos grupos | Los valores por defecto. No mostrar el RUC (está arriba, fuera de esta zona) |

Las demás capturas de los capítulos 3 a 9 del v2 siguen valiendo.
