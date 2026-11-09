# Capturas pedidas · g2_contabilidad (capítulos 7 y 28)

Base contable19. No pulsar «Generar asiento», «Registrar pago», «Registrar el pago», «Enviar por correo» ni «Guardar»:
todas son pantallas que se abren y se cancelan o se descartan. Ventana de 1600 × 900, como las del v2.

## Capítulo 7

### c07_01_mapeo_pcge (rehacer)
- **Qué debe verse:** Nómina › Nómina PE › Contabilidad de nómina › Mapeo contable PCGE, en lista. El contador de
  registros arriba a la derecha («1-79» o «1-80 / 79»).
- **Compañía:** FM SYSTEMS (1).
- **Resaltar:** las filas `DESC_D_001 → 4111 / 6211`, `TARD_001 → 4111 / 6211`, `PRALI_ENT_001 → 4111 / 4699`,
  `SCTR_ESS_001 → 6273 / 4031` e `IND_VAC_001 → 623 / 4111` (ordenar por código o buscarlas). El v2 decía 45 reglas; hoy son 79 filas.

### c07_05_opciones_provisiones (nueva)
- **Qué debe verse:** Ajustes › Nómina PE › bloque «Provisiones de beneficios (N-13)» con todas sus opciones visibles.
- **Compañía:** SOLSE Demo Servicios (4). Hoy está en «Sin provisión» (los casos devuelven las opciones al terminar):
  elegir **«En la boleta mensual»** en «Provisión mensual de beneficios» y marcar «Provisionar el EsSalud de las
  vacaciones» **sin guardar**, para que se vean «Provisión en la semanal», «Aplicación de lo provisionado», «Adelanto de
  vacaciones en la provisión», «Pasivo de vacaciones», «Indemnización vacacional en la provisión», «Saldo inicial de
  ejercicios anteriores», «Corrección de un mes contabilizado», «Variables de una adicional validada después de la
  mensual», «Liquidaciones de meses anteriores sin aplicar» y «Provisiones en la boleta impresa». Después **Descartar**.
- **Resaltar:** «Provisión mensual de beneficios» y «Aplicación de lo provisionado».

### c07_06_asistente_provisiones (nueva)
- **Qué debe verse:** Nómina › Nómina PE › Contabilidad de nómina › Provisiones del mes, con Mes «Enero», Año 2027,
  Diario «Planillas», «Solo estos trabajadores» vacío, «Con el saldo inicial» marcado y «También los meses posteriores
  ya registrados» desmarcado. **Cancelar** (no pulsar «Generar asiento»).
- **Compañía:** SOLSE Demo Servicios (4). El asistente lee la opción **guardada** de la compañía, y hoy todas están en
  «Sin provisión»: así la ventana muestra el aviso azul «La compañía no provisiona con un asiento mensual» y oculta las
  dos casillas. Si quien captura puede guardar en la compañía 4 «Asiento mensual de provisiones», tomar la captura y
  devolverla a «Sin provisión» enseguida (es lo que hace el caso PROVISIONES), hacerlo así. Si no, tomarla con el aviso
  y avisar: el pie del capítulo se ajusta.

### c07_07_asiento_provisiones_enero (nueva)
- **Qué debe verse:** el asiento «Provisiones de nómina 01/2027» (account.move id 11242, borrador, diario Planillas,
  fecha 31/01/2027), pestaña de apuntes, total 17 337,50.
- **Compañía:** SOLSE Demo Servicios (4); caso PROVISIONES.
- **Resaltar:** el contacto del trabajador en cada línea y los netos 6214 1 907,50, 6291 3 031,25, 6215 11 375,00 y
  6271 1 023,75 (si no caben, agrupar por cuenta en Contabilidad › Apuntes contables con filtro por el asiento).

### c07_08_registro_provisiones (nueva)
- **Qué debe verse:** Nómina › Nómina PE › Provisiones de beneficios, buscando el trabajador 70002101 «Trabajador
  provisiones régimen general», agrupado por Concepto (lo que viene por defecto: Trabajador y Concepto) y con la columna
  «Importe» con sus subtotales. Abrir el grupo «CTS».
- **Compañía:** SOLSE Demo Servicios (4); caso PROVISIONES.
- **Resaltar:** la fila «… · CTS 2027-05 · saldo inicial 01/2027» (583,33) y la aplicación de mayo (1 750,01).

### c07_09_boleta_lineas_provision (nueva)
- **Qué debe verse:** la boleta mensual de enero de 2028 de 70002201 «Trabajador provisión en boleta mensual»
  (hr.payslip id 9722, PLLA/2028/01/0001), pestaña «Cálculo de la nómina».
- **Compañía:** SOLSE Demo Servicios (4); caso PROVISIONES_BOLETA.
- **Resaltar:** PRO_GRATI_001 500,00, PRO_BONO_001 45,00, PRO_CTS_001 291,67, PRO_VAC_001 250,00, PRO_ESSVAC_001 22,50
  (categoría Provisiones) y NET 2 583,07.

### c07_10_asiento_gratificacion_aplicacion (nueva)
- **Qué debe verse:** el asiento PLLA/2029/07/0001 (account.move id 11304), la gratificación de julio de 2029 de
  70002301 «Trabajador provisión aplicada en su beneficio».
- **Compañía:** SOLSE Demo Servicios (4); caso PROVISIONES_BENEFICIO.
- **Resaltar:** las dos líneas «Aplicación gratificación 2029-S1» y «Aplicación bonificación extraordinaria 2029-S1»
  (debe 4114, haber 6214: 3 000,00 y 270,00) debajo de las del beneficio (debe 6214, haber 4114).

## Capítulo 28

### c28_02_registrar_pago (rehacer)
- **Qué debe verse:** el asistente «Registrar pago de la planilla» con la casilla nueva **«Un asiento por trabajador»**
  (desmarcada). La captura del v2 no la tiene.
- **Compañía y registro:** FM SYSTEMS (1), lote «Planilla diciembre 2026» (hr.payslip.run id 1, estado Hecho), con la
  boleta de Héctor (ficticio) por pagar S/ 1 914,00. Diario de pago: el banco de FM; fecha 31/12/2026; referencia
  «OP-2026-12-31». **Cancelar.**
- **Resaltar:** la casilla «Un asiento por trabajador» y «Total a pagar». Ofuscar el número de cuenta del banco si se ve.

### c28_06_afpnet_pago (nueva)
- **Qué debe verse:** Nómina › Nómina PE › AFPnet: registrar el pago (también en Facturación › Proveedores), con Mes
  «Noviembre», Año 2026, «Solo estas AFP» vacío, diario Banco, fecha 05/12/2026. **Cancelar.**
- **Compañía:** FM SYSTEMS (1) (su 417 de noviembre de 2026 sigue sin pagar).
- **Resaltar:** el texto de arriba («Un asiento por AFP … debe a la 417 y haber al banco … los primeros cinco días del
  mes siguiente»). Ofuscar cuentas bancarias.

### c28_07_documentos_cese_imprimir (nueva)
- **Qué debe verse:** la liquidación validada de 70002401 «Trabajador DOCUMENTOS_CESE renuncia» (hr.payslip id 9767,
  agosto de 2030, PLLA/2030/08/0001) con el menú **Imprimir** abierto: «Boleta de Pago (PE)», «Hoja de liquidación de
  beneficios sociales (PE)», «Certificado de trabajo (PE)» y «Constancia de cese para el retiro de la CTS (PE)».
- **Compañía:** SOLSE Demo Servicios (4); caso DOCUMENTOS_CESE.
- **Resaltar:** los tres reportes del cese y el campo «Entregar hasta» 2 sep. (02/09/2030).

### c28_08_opcion_boleta_correo (nueva)
- **Qué debe verse:** Ajustes › Nómina PE › bloque «Boleta por correo (N-08)»: «Boleta por correo» («Solo con el
  acuerdo del trabajador») y «Documento del trabajador en su contacto» (desmarcada). Desplegar el selector para que se
  vea la segunda opción («Con el acuerdo o, sin él, a quien cobra en cuenta (D.Leg. 1310, art. 3.2)») y **Descartar**.
- **Compañía:** SOLSE Demo Servicios (4).
