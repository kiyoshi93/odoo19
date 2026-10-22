# Guiones de la serie de videos · Nómina PE v2

Voz: ElevenLabs Sarah. Cada escena muestra la captura del manual que se indica; el recuadro rojo marca el dato. Las cifras son las del manual v2 (corridas del 22/10/2026).


Total estimado: 40 min de narración en 27 episodios.


## E00 · Nómina peruana para Odoo 19 Community: versión 2

capítulos 1, 31 · Caso: — · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Nómina peruana para Odoo 19 Community: versión 2 | La nómina peruana para Odoo diecinueve Community tiene una versión nueva. Lo que antes quedaba fuera, ahora está dentro. |
| 2 | Tarjeta: Lo que en la versión 1 no estaba — Subsidios por descanso médico y maternidad; Exportación del T-Registro: altas, bajas, modificaciones y derechohabientes; Indemnización por despido y renta de 5.ª al cese; Seguro Vida Ley, pago de la planilla y entrega de boletas por correo | Subsidios por descanso médico y maternidad. El T-Registro, con altas, bajas, modificaciones y derechohabientes. La indemnización por despido y la renta de quinta al cese. El seguro Vida Ley, el pago de la planilla y la entrega de boletas. |
| 3 | Captura `c10_02_boleta_impresa` · foco: NETO · rótulo: «Boleta impresa que cuadra al centavo» | Cada boleta cuadra al centavo con su asiento contable. |
| 4 | Captura `c23_01_descanso_nov_calculo` · foco: Subsidio por inc · rótulo: «Subsidio por incapacidad en la boleta» | Los subsidios salen en la boleta y en el PLAME, con sus días de la Tabla veintiuno. |
| 5 | Captura `c29_01_altas_resultado` · rótulo: «T-Registro: archivos listos para el PVS» | El T-Registro se valida antes de exportar y sale listo para el validador de SUNAT. |
| 6 | Captura `c27_02_plame_resultado` · rótulo: «PLAME para el PDT» | Y el PLAME, AFPnet y los archivos para el BCP, Interbank y Scotiabank se generan desde las boletas validadas. |
| 7 | Tarjeta: 14 casos · 2 573 celdas — Catorce casos de laboratorio, comparados celda por celda contra la norma: todos al 100 %. | Catorce casos de laboratorio, dos mil quinientas setenta y tres celdas comparadas contra la norma, todas conformes. Todo está en el manual versión dos y en esta serie de videos. |

Duración estimada: 1.0 min (148 palabras).

## E01 · Resumen: la nómina de un mes, del alta al PLAME

capítulos 1, 11, 27 · Caso: NOMINA · Módulos: base, ce, ce_demo

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Resumen: la nómina de un mes, del alta al PLAME | En este resumen recorremos un mes completo de planilla en Odoo diecinueve Community, del alta del trabajador hasta el PLAME. Las cifras son las del manual versión dos, medidas en una base de prueba con datos ficticios. |
| 2 | Captura `c03_02_menu_nomina_pe` · rótulo: «Nómina › Nómina PE» | Todo vive en la aplicación Nómina. El menú Nómina PE reúne los parámetros legales, los maestros de SUNAT, los seguros, las salidas legales y la contabilidad de nómina. |
| 3 | Captura `c04_02_parametro_rmv` · rótulo: «Parámetros con vigencia: RMV 1 130 y 1 230» | Los valores legales no están escritos en las reglas. Cada parámetro tiene vigencias: la remuneración mínima vale S/ 1 130 desde enero de 2025 y S/ 1 230 desde el 1 de octubre de 2026. Cada boleta usa el valor vigente en su periodo. |
| 4 | Captura `c08_03_nomina_pe_1` · rótulo: «Ficha del trabajador: datos del T-Registro» | En la ficha del trabajador se registran los datos del T-Registro: documento, nombres y apellidos por separado, situación educativa y el sistema de pensiones. Lucía está en la AFP Integra, con comisión por flujo. |
| 5 | Captura `c08_13_contrato_lucia` · rótulo: «Contrato: estructura, diario y sueldo» | En el contrato van la estructura Nómina Mensual Empleados, el diario Planillas y el sueldo: S/ 4 500. |
| 6 | Captura `c10_01_calculo` · foco: Asignación familiar, Neto a pagar · rótulo: «Boleta de diciembre de 2026 (caso BOLETA)» | La boleta calcula la remuneración, la asignación familiar de S/ 123, los aportes y la renta de quinta. En el caso BOLETA, el neto de diciembre es S/ 4 025,70. |
| 7 | Captura `c10_02_boleta_impresa` · rótulo: «Boleta impresa: ingresos − descuentos = neto» | La boleta impresa cuadra al centavo: S/ 4 623,00 de ingresos, menos S/ 597,30 de descuentos, da el neto. |
| 8 | Captura `c10_03_asiento` · rótulo: «Asiento en el diario Planillas» | Al validar, se genera el asiento en el diario Planillas, con el trabajador como socio en la cuenta cuatro uno uno uno. Suma S/ 5 671,04 al debe y al haber. |
| 9 | Captura `c11_02_lote_diciembre_fm` · rótulo: «Lote mensual» | Con un lote se generan las boletas de todos los trabajadores del mes. El lote no vuelve a calcular las boletas que ya están validadas. |
| 10 | Tarjeta: Los acumulados leen boletas validadas — Primero el adelanto; Luego gratificación, CTS y vacaciones; Después la mensual y las semanales; Al final, la liquidación de quien cesa | Una regla evita errores: los acumulados solo leen boletas validadas. Primero el adelanto; luego la gratificación, la CTS y las vacaciones; después la mensual; y al final, la liquidación de quien cesa. |
| 11 | Captura `c12_02_ana_calculo` · foco: Prima de · rótulo: «Aportes con tope y renta de quinta en dos tramos» | Los aportes respetan los topes. Ana gana S/ 15 000: su prima de seguro se topa en la remuneración máxima asegurable y sale S/ 173,62. |
| 12 | Captura `c13_04_certificado_renta5_lucia_2025` · rótulo: «Certificado de renta de quinta 2025» | La renta de quinta se proyecta con las gratificaciones y la asignación familiar. En 2025, a Lucía se le retuvieron S/ 2 309,73, y el certificado anual sale del mismo cálculo. |
| 13 | Captura `c14_01_lucia_grati_jul2026_calculo` · rótulo: «Gratificación de julio de 2026» | La gratificación de julio paga el sueldo más la asignación familiar, S/ 4 613, y la bonificación extraordinaria de S/ 415,17. |
| 14 | Captura `c15_02_liquidacion_deposito_cts` · rótulo: «Liquidación del depósito de CTS» | La CTS de noviembre suma un sexto de la gratificación validada. Lucía recibe S/ 2 695,92, con su constancia de depósito. |
| 15 | Captura `c17_01_lucia_vac_feb2026_calculo` · rótulo: «Vacaciones de febrero de 2026» | Las vacaciones se registran como una ausencia aprobada. En febrero, la boleta vacacional de Lucía paga S/ 2 306,50 por los quince días de goce, y la mensual paga el resto del mes. |
| 16 | Captura `c16_01_carmen_liquidacion_calculo` · rótulo: «Liquidación por cese (caso NOMINA)» | Cuando alguien cesa, la liquidación paga las vacaciones truncas con sus aportes, la gratificación trunca y la CTS trunca. Carmen recibe un neto de S/ 3 331,89. |
| 17 | Captura `c27_02_plame_resultado` · rótulo: «PLAME de noviembre de 2026» | Con las boletas validadas se genera el PLAME en un solo archivo comprimido, listo para importar en el PDT: remuneraciones, jornada y suspensiones. |
| 18 | Captura `c27_04_bcp_haberes_resultado` · rótulo: «TXT del BCP: abonados y omitidos» | Y los archivos de pago para el banco: en el caso BANCOS, el BCP abona a cuatro trabajadores, S/ 7 918, y avisa del que no tiene cuenta sueldo. |
| 19 | Captura `c29_01_altas_resultado` · rótulo: «T-Registro: altas de octubre de 2026» | Las altas y bajas del T-Registro salen con la estructura del validador de SUNAT. Antes de exportar, el asistente dice qué le falta a cada trabajador. |
| 20 | Captura `c30_02_rxh_revision` · rótulo: «Recibos por honorarios de julio de 2026» | Y los recibos por honorarios pagados en el mes se declaran en el PLAME de cuarta categoría: en el caso de laboratorio, nueve comprobantes por S/ 15 022,60. |
| 21 | Tarjeta: Lo que aún no cubre — TXT del Banco de la Nación (formato no publicado); Sobretasa por trabajar en un feriado; Firma digital certificada de la boleta; Algunos casos del T-Registro: pensionistas, formación, terceros | Para tener en cuenta: aún no se cubren el archivo del Banco de la Nación, la sobretasa por trabajar en un feriado, la firma digital certificada de la boleta y algunos casos del T-Registro. |
| 22 | Tarjeta: S/ 4 025,70 — Neto de diciembre de 2026 del caso BOLETA: ingresos 4 623,00 − descuentos 597,30, igual en la boleta, la impresión y el asiento. | Cada uno de estos pasos tiene su capítulo en el manual y su episodio en esta serie, con las mismas cifras. |

Duración estimada: 4.1 min (617 palabras).

## E02 · Instalación, actualización y laboratorio

capítulos 2, 3, Anexo E · Caso: los 14 casos · Módulos: base, ce, ce_demo, asistencia, plame_demo

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Instalación, actualización y laboratorio | En este episodio vemos cómo comprobar la instalación después de cada actualización y cómo usar el laboratorio de casos. |
| 2 | Captura `c02_01_aplicaciones_versiones` · rótulo: «Aplicaciones: cada módulo con su versión» | Después de actualizar, filtre Aplicaciones por Nómina Peruana, Payroll y PLAME, solo las instaladas. Cada módulo muestra su versión: compárela con la de la entrega. |
| 3 | Tarjeta: Una sola copia de cada módulo — Cada módulo de nómina debe estar una sola vez en el addons_path; Con dos copias, Odoo puede cargar la versión vieja sin avisar; Después del -u, compare las versiones en Aplicaciones | Un cuidado importante: cada módulo de nómina debe estar una sola vez en las rutas de módulos del servidor. Con dos copias, Odoo puede cargar la versión vieja sin avisar. Por eso, después de actualizar, se comparan las versiones. |
| 4 | Captura `c03_01_menu_principal` · rótulo: «Nómina y SOLSE Demo» | La nómina está en la aplicación Nómina. El laboratorio está en SOLSE Demo. |
| 5 | Captura `c02_02_laboratorio` · rótulo: «② Sincronizar casos» | En el laboratorio, pulse Sincronizar casos después de cada actualización: así la lista de casos toma las versiones nuevas. |
| 6 | Captura `c02_03_casos_100` · rótulo: «Los 14 casos al 100 %» | Cada caso siembra trabajadores sintéticos, genera boletas y archivos, y los compara celda por celda con un Excel de referencia. Los catorce casos están en cien por ciento. |
| 7 | Captura `c02_04_caso_tregistro` · rótulo: «Caso TREGISTRO: 262 celdas, 0 diferencias» | Por ejemplo, el caso TREGISTRO compara 262 celdas sin diferencias. En Comparaciones se descarga el Excel, con lo esperado y lo generado. |
| 8 | Captura `c02_05_datos_de_prueba_en_fm` · rótulo: «En una compañía real no se cargan datos de prueba» | El laboratorio solo escribe en sus compañías de prueba. En una compañía real, el asistente de datos de prueba no carga nada. |
| 9 | Captura `c03_03_menu_configuracion` · rótulo: «Configuración: estructuras y reglas» | El menú Configuración tiene las estructuras, las reglas salariales y las plantillas. Los parámetros legales ya no se repiten aquí: están en Nómina PE. |
| 10 | Tarjeta: 14 / 14 — Casos al 100 % después del lote 12: 2 573 celdas comparadas. | Después de cada actualización: versiones en Aplicaciones, sincronizar casos y correr los catorce. Los detalles están en el capítulo dos y en el anexo E del manual. |

Duración estimada: 1.6 min (238 palabras).

## E03 · Parámetros legales con vigencia

capítulos 4, 26 · Caso: NOMINA (hoja Parámetros) · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Parámetros legales con vigencia | Los valores legales de la planilla, como la UIT, la remuneración mínima o las tasas de las AFP, se guardan como parámetros con vigencia. Veamos cómo se mantienen. |
| 2 | Captura `c04_01_parametros_lista` · rótulo: «Nómina PE › Parámetros» | En Nómina PE, Parámetros, están los veinticinco parámetros agrupados por categoría, cada uno con su valor vigente a hoy. |
| 3 | Captura `c04_02_parametro_rmv` · rótulo: «RMV: una fila por vigencia» | La remuneración mínima tiene dos vigencias: S/ 1 130 desde el 1 de enero de 2025 y S/ 1 230 desde el 1 de octubre de 2026. Cuando cambia, se agrega una fila; no se edita la anterior. |
| 4 | Captura `c04_03_parametro_rma` · rótulo: «RMA: una vigencia por trimestre» | La remuneración máxima asegurable cambia cada trimestre, así que tiene una vigencia por trimestre. |
| 5 | Captura `c04_04_parametro_comision_afp` · rótulo: «Nueva vigencia y Editar en tabla» | Los parámetros con varias filas, como las comisiones de las AFP o los tramos de la renta de quinta, tienen un editor en tabla. |
| 6 | Captura `c04_05_nueva_vigencia_comision_afp` · rótulo: «Una fila por AFP» | La nueva vigencia de comisiones muestra una fila por AFP con su tasa en porcentaje, y el texto que se guardará. |
| 7 | Captura `c04_06_editar_tramos_en_tabla` · rótulo: «Tramos de la renta de quinta» | Y los tramos de la renta de quinta: cinco, veinte, treinta y cinco y cuarenta y cinco UIT, y el último sin tope. |
| 8 | Captura `c04_07_valor_rechazado` · rótulo: ««1,230» se rechaza» | Los valores se escriben con punto decimal y sin separador de miles. Si se escribe uno coma doscientos treinta, el parámetro lo rechaza y explica por qué. |
| 9 | Captura `c04_08_boleta_2027_alertas_rma_uit` · rótulo: «Avisos antes de calcular 2027» | Si falta una vigencia, la boleta avisa antes de calcular. En una boleta de enero de 2027, la banda dice que la RMA es de octubre, que faltan los feriados de 2027 y que falta la UIT de 2027, con lo que se usaría la de 2026: S/ 5 500. |
| 10 | Captura `c26_03_vigencia_faltante` · rótulo: «Vigencia faltante: el detalle está en «Ver detalles técnicos»» | Si aun así se calcula sin la vigencia, el navegador muestra un error genérico. El mensaje que explica qué parámetro falta está al final de Ver detalles técnicos. |
| 11 | Tarjeta: S/ 1 230 — Remuneración mínima vital desde el 1 de octubre de 2026: una fila nueva en el parámetro, sin tocar las reglas. | Cada mes, antes de calcular, revise la RMA del trimestre, la remuneración mínima y las comisiones de las AFP. Está en los capítulos cuatro y veintiséis del manual. |

Duración estimada: 2.0 min (300 palabras).

## E04 · Maestros SUNAT, seguros y mapeo contable

capítulos 5, 6, 7 · Caso: — · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Maestros SUNAT, seguros y mapeo contable | Este episodio recorre las tablas de SUNAT, los seguros y la configuración contable de la nómina. |
| 2 | Captura `c05_01_t22_conceptos_plame` · rótulo: «T22: conceptos del PLAME» | La tabla veintidós tiene los conceptos del PLAME, con su código y los tributos y aportes a los que está afecto cada uno. |
| 3 | Captura `c05_03_busqueda_por_codigo` · rótulo: «Búsqueda por código: 0121» | Los maestros se buscan por código o por descripción: cero uno dos uno encuentra Remuneración o jornal básico. |
| 4 | Captura `c05_02_t11_sistemas_pensionarios` · rótulo: «T11: sistemas pensionarios» | La tabla once tiene los sistemas pensionarios: el cero dos es la ONP, y cada AFP lleva su clave para la comisión. |
| 5 | Captura `c05_05_t19_vinculos` · rótulo: «T19: vínculos familiares» | La tabla diecinueve tiene los vínculos de los derechohabientes de EsSalud: cónyuge, concubina, hijo y gestante. Los demás parientes no tienen código, porque no son derechohabientes. |
| 6 | Captura `c05_06_t28_ubigeo` · rótulo: «T28: ubigeo RENIEC» | Para el domicilio del T-Registro están los 1 892 distritos del ubigeo de RENIEC. |
| 7 | Captura `c05_07_t34_carreras` · rótulo: «T34: instituciones y carreras» | Y para los estudios superiores, 5 925 combinaciones de institución y carrera. |
| 8 | Captura `c06_01_planes_eps` · rótulo: «Planes EPS» | En Seguros se registran los planes EPS. El plan de demostración tiene 4,5 % para el empleador y 2 % para el trabajador. |
| 9 | Captura `c06_04_sctr_en_la_ficha` · rótulo: «SCTR en la ficha del trabajador» | El SCTR se marca en la ficha del trabajador, con la entidad de salud y la de pensión. |
| 10 | Captura `c07_01_mapeo_pcge` · rótulo: «Mapeo contable PCGE» | El mapeo contable asigna a cada una de las cuarenta y cinco reglas su cuenta de débito y de crédito del plan contable general empresarial. |
| 11 | Captura `c07_03_diario_planillas` · rótulo: «Diario Planillas (PLLA)» | Las boletas se contabilizan en el diario Planillas, con la cuenta cuatro uno uno uno, remuneraciones por pagar. |
| 12 | Captura `c07_04_regla_cuentas` · rótulo: «RB_001: 6211000 / 4111000» | Cada regla queda con sus cuentas. La remuneración básica va al debe de la seis dos uno uno y al haber de la cuatro uno uno uno. |
| 13 | Tarjeta: 45 reglas — Cada regla con su cuenta de débito y de crédito del PCGE; el asiento cae en el diario Planillas. | Esta configuración se hace una vez por compañía. Los detalles están en los capítulos cinco, seis y siete del manual. |

Duración estimada: 1.7 min (262 palabras).

## E05 · Alta del trabajador y su contrato

capítulos 8, 9 · Caso: TREGISTRO (fichas) · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Alta del trabajador y su contrato | Este episodio muestra cómo dar de alta a un trabajador con todos los datos que piden la boleta, el PLAME y el T-Registro. |
| 2 | Captura `c08_01_ficha_lucia` · rótulo: «Ficha de Lucía Fernanda Ramos Ticona» | Empezamos por la ficha del empleado. Lucía es una trabajadora ficticia del recorrido del manual, con DNI sintético. |
| 3 | Captura `c08_03_nomina_pe_1` · rótulo: «Pestaña Nómina PE» | La pestaña Nómina PE tiene la identificación para el T-Registro: tipo de documento, nombres y apellidos por separado, situación educativa y la edad, que se calcula sola. Debajo, el sistema pensionario: Lucía está en Integra, con comisión por flujo. |
| 4 | Captura `c08_17_salud_cuentas_firma` · rótulo: «Salud, cuentas, descuento judicial y firma» | Más abajo, el régimen de salud, la EPS, el SCTR, las cuentas bancarias de sueldo y de CTS, el descuento judicial y la firma de boletas. |
| 5 | Captura `c08_07_tregistro_identificacion` · rótulo: «Caso TREGISTRO: identificación completa» | En el caso TREGISTRO se ven todos los grupos completos. La edad es un número entero: treinta y seis. |
| 6 | Captura `c08_08_tregistro_domicilio` · rótulo: «Domicilio con ubigeo RENIEC» | El domicilio usa el distrito del ubigeo de RENIEC, el mismo que pide el T-Registro. |
| 7 | Captura `c08_09_tregistro_estudios` · rótulo: «Estudios superiores: institución y carrera» | Los estudios superiores se eligen de la tabla treinta y cuatro, con su año de egreso. |
| 8 | Captura `c08_06_derechohabientes` · rótulo: «Derechohabiente: hijo menor» | Los derechohabientes se registran en la ficha. El hijo de Lucía, nacido en 2019, le da derecho a la asignación familiar. |
| 9 | Captura `c08_10_entrega_electronica` · rótulo: «Acuerdo de entrega por correo» | Si el trabajador aceptó recibir su boleta por correo, se marca aquí, con la fecha del acuerdo y el correo. |
| 10 | Captura `c08_13_contrato_lucia` · rótulo: «Contrato de Lucía» | El contrato lleva la estructura, el diario Planillas, el sueldo de S/ 4 500 y la categoría del pago, Régimen General. |
| 11 | Captura `c08_16_contrato_t8_t24` · rótulo: «Datos laborales para el T-Registro» | Y los datos laborales del T-Registro: régimen laboral, tipo de trabajador, tipo de contrato y tipo de pago. |
| 12 | Captura `c09_01_estructuras` · rótulo: «Las 9 estructuras salariales» | Un contrato nuevo nace con la estructura mensual. Las nueve estructuras cubren la mensual, la semanal, el adelanto, la gratificación, la CTS, las vacaciones y la liquidación. |
| 13 | Tarjeta: 9 estructuras — El contrato nuevo nace con «Nómina Mensual Empleados»; las demás se eligen en cada boleta. | Con la ficha completa desde el alta, la boleta, el PLAME y el T-Registro salen sin correcciones. Está en los capítulos ocho y nueve del manual. |

Duración estimada: 1.9 min (289 palabras).

## E06 · La boleta: cálculo, impresión y asiento

capítulos 10, 7, 26 · Caso: BOLETA · Módulos: base, ce, ce_demo

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: La boleta: cálculo, impresión y asiento | Este episodio sigue una boleta de punta a punta: cómo se crea, qué calcula, cómo se imprime y qué asiento genera. |
| 2 | Captura `c10_04_boleta_nueva` · rótulo: «Boleta nueva: trabajador y periodo» | En Nóminas del empleado, Nuevo: se elige el trabajador y el periodo. La boleta toma el contrato y la estructura, y propone el nombre en español y los días laborados: veintitrés días y ciento ochenta y cuatro horas. |
| 3 | Captura `c10_01_dias` · rótulo: «Días trabajados con «¿Pagado?»» | La pestaña de días trabajados muestra los días hábiles y sus horas. La columna Pagado dice qué días se pagan en esta boleta. |
| 4 | Captura `c10_01_calculo` · foco: Asignación familiar, Neto a pagar · rótulo: «Cálculo de diciembre de 2026 (caso BOLETA)» | Al calcular aparecen las líneas: remuneración de S/ 4 500, asignación familiar de S/ 123, los aportes a la AFP, EsSalud, SENATI y el neto a pagar: S/ 4 025,70. |
| 5 | Captura `c10_02_boleta_impresa` · rótulo: «Boleta de Pago de Remuneraciones» | La boleta impresa muestra treinta y un días laborados, ingresos por S/ 4 623,00, descuentos por S/ 597,30 y aportes del empleador por S/ 450,74. Ingresos menos descuentos da exactamente el neto. |
| 6 | Captura `c10_01_contable` · rótulo: «Información contable» | Al confirmar, la boleta queda en el diario Planillas, con su asiento. |
| 7 | Captura `c10_03_asiento` · rótulo: «Asiento: 5 671,04 al debe y al haber» | El asiento suma S/ 5 671,04 al debe y al haber. El saldo de la cuenta cuatro uno uno uno del trabajador es igual al neto de la boleta. |
| 8 | Captura `c10_05_boleta_sin_importes` · rótulo: «Una boleta sin importes no se valida» | Si una boleta sale toda en cero, por ejemplo la CTS de un trabajador de microempresa, no se valida: la localización lo explica y ofrece eliminarla. |
| 9 | Captura `c26_02_sin_sistema_pensionario` · rótulo: «Aviso: trabajador sin sistema pensionario» | Y si falta un dato, la boleta avisa antes de validar. Aquí, un trabajador sin ONP ni AFP: la boleta no calcularía aportes de pensión. |
| 10 | Tarjeta: S/ 4 025,70 — Neto de diciembre de 2026 del caso BOLETA: igual en el cálculo, en la boleta impresa y en la cuenta 4111 del asiento. | El caso BOLETA comprueba ciento sesenta y seis celdas: seis boletas que cuadran al centavo. Está en el capítulo diez del manual. |

Duración estimada: 1.7 min (258 palabras).

## E07 · El lote mensual y las rectificativas

capítulos 11, 25 · Caso: NOMINA · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: El lote mensual y las rectificativas | Este episodio muestra cómo procesar el mes con un lote, en qué orden validar y cómo corregir una boleta ya validada. |
| 2 | Captura `c11_01_lotes` · rótulo: «Nómina › Procesamientos de nóminas» | Los lotes están en Procesamientos de nóminas. Cada lote agrupa las boletas de un periodo y nace con el diario Planillas. |
| 3 | Captura `c11_03_lote_nuevo` · rótulo: «Lote nuevo de noviembre de 2026» | Se crea el lote con su periodo. |
| 4 | Captura `c11_04_generar_nominas` · rótulo: «Generar nóminas» | Con Generar nóminas se eligen los trabajadores. |
| 5 | Captura `c11_05_lote_generado` · rótulo: «Boletas generadas en borrador» | Y el lote crea sus boletas en borrador, con el nombre en español. |
| 6 | Tarjeta: Validar en este orden — Adelanto quincenal; Gratificación, CTS y vacaciones; Mensual y semanales; Liquidaciones al final | Los acumulados solo leen boletas validadas. Por eso el orden es: adelanto; gratificación, CTS y vacaciones; mensual y semanales; y al final, las liquidaciones. |
| 7 | Captura `c26_01_diciembre_grati_borrador_dias` · rótulo: «Diciembre: la gratificación primero» | En diciembre no queda mes para corregir la renta de quinta. Si la gratificación del mes sigue en borrador, la mensual lo avisa: valídela antes. |
| 8 | Captura `c11_02_lote_diciembre_fm` · rótulo: «El lote no recalcula las validadas» | Un lote con boletas ya validadas no las vuelve a calcular ni duplica su asiento. Solo calcula las que nunca calculó. |
| 9 | Captura `c25_01_original_rectificar` · rótulo: «Rectificar una boleta validada» | Si una boleta validada tiene un error, no se edita: se rectifica. Esta mensual de noviembre se validó con S/ 2 500, y el sueldo correcto era S/ 2 700. |
| 10 | Captura `c25_02_rectificativa_calculo` · rótulo: «La rectificativa copia y resta» | La rectificativa copia las líneas de la original y resta en todos los reportes. |
| 11 | Captura `c25_04_lista_boletas_rectificada` · rótulo: «Original, rectificativa y nueva» | Luego se calcula la boleta correcta. El PLAME declara la remuneración de S/ 2 700 una sola vez, y la planilla de sueldos muestra un neto de S/ 2 349. |
| 12 | Tarjeta: S/ 2 700 — Remuneración de noviembre declarada una sola vez en el PLAME tras rectificar la boleta de 2 500. | Validar en orden y rectificar en lugar de editar mantiene los acumulados y los reportes correctos. Está en los capítulos once y veinticinco del manual. |

Duración estimada: 1.6 min (238 palabras).

## E08 · Aportes: ONP, AFP, EsSalud y EPS

capítulo 12 · Caso: NOMINA · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Aportes: ONP, AFP, EsSalud y EPS | Este episodio repasa los aportes y retenciones de la boleta con tres trabajadores del caso NOMINA. |
| 2 | Captura `c12_01_carlos_calculo` · foco: Neto a pagar · rótulo: «Carlos: AFP Habitat y EPS» | Carlos está en la AFP Habitat y tiene EPS: la boleta calcula el aporte obligatorio, la comisión y la prima de seguro, EsSalud con el crédito de la EPS y SENATI. Su neto es S/ 3 149,09. |
| 3 | Captura `c12_02_ana_calculo` · foco: Prima de, Neto a pagar · rótulo: «Ana: la prima se topa en la RMA» | Ana gana S/ 15 000. La prima de seguro de la AFP se calcula hasta la remuneración máxima asegurable: sale S/ 173,62. Su renta de quinta, en dos tramos, es S/ 1 267,25, y su neto, S/ 11 838,63. |
| 4 | Captura `c12_03_nilda_vac_calculo` · rótulo: «Nilda: EsSalud del mes 270,00» | Nilda goza vacaciones todo julio. La vacacional de S/ 3 000 paga EsSalud por S/ 270, que es el nueve por ciento del mes. La mensual queda sin importes y no se valida. |
| 5 | Tarjeta: La base mínima y el tope se miran por mes — Nilda: 270,00 en la vacacional; antes de la v2 pagaba 371,70; Óscar: 135,00 en la vacacional + 135,00 en la mensual = 270,00 | La base mínima de EsSalud y el tope de la prima se miran por mes, no por boleta. Antes de la versión dos, Nilda pagaba S/ 371,70. Ahora paga S/ 270, igual que Óscar, que reparte ciento treinta y cinco en cada boleta. |
| 6 | Captura `c20_02_entradas_calculo` · foco: Base afecta · rótulo: «La tardanza reduce la base» | La tardanza reduce la base afecta. En este ejemplo, la base es S/ 2 529,50: los ingresos, menos la movilidad, menos la tardanza. Sobre ella se calculan la ONP y EsSalud. |
| 7 | Tarjeta: S/ 270,00 — EsSalud del mes de Nilda y de Óscar (caso NOMINA): la base mínima y el tope se aplican al mes, no a cada boleta. | Los aportes se calculan sobre la base afecta del mes, con sus mínimos y topes. Está en el capítulo doce del manual. |

Duración estimada: 1.5 min (221 palabras).

## E09 · Renta de 5.ª categoría de punta a punta

capítulos 13, 16 · Caso: Lucía (recorrido) y CESE · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Renta de 5.ª categoría de punta a punta | Este episodio sigue la renta de quinta categoría: la retención mensual, el mes de vacaciones, el cese y el certificado anual. |
| 2 | Captura `c13_01_lucia_ene2025_calculo` · foco: Base afecta, Renta de 5ta · rótulo: «Lucía, enero de 2025» | En enero de 2025, la base afecta de Lucía es S/ 4 613: sueldo más asignación familiar. La proyección anual incluye las gratificaciones con su asignación familiar, y la retención del mes es S/ 192,48. |
| 3 | Captura `c17_02_lucia_nme_feb2026_calculo` · foco: Renta de 5ta · rótulo: «Mes de vacaciones: la 5.ª va en la mensual» | En el mes de vacaciones, la renta de quinta se calcula en la mensual, sumando lo pagado en la vacacional. En febrero de 2026, la retención es S/ 183,73. |
| 4 | Captura `c13_02_cese_devolucion_calculo` · foco: Devoluci · rótulo: «Caso CESE: devolución de retención» | Al cese se recalcula el impuesto del año con lo realmente ganado. En el caso CESE, la liquidación de abril de 2026 devuelve S/ 2 158,67 retenidos de más, y el neto es S/ 13 132. |
| 5 | Captura `c13_03_certificado_asistente` · rótulo: «Certificado de 5.ª: asistente» | El certificado anual se emite desde su asistente: compañía, ejercicio y trabajadores. Lo firma el representante del empleador marcado en su ficha. |
| 6 | Captura `c13_04_certificado_renta5_lucia_2025` · rótulo: «Certificado de Lucía, ejercicio 2025» | El certificado de Lucía de 2025: renta bruta S/ 65 412,34, deducción de siete UIT S/ 37 450, renta neta S/ 27 962,34, y un impuesto igual a lo retenido: S/ 2 309,73. |
| 7 | Tarjeta: S/ 2 309,73 — Renta de 5.ª retenida a Lucía en 2025 = impuesto del certificado anual. | La retención de cada mes, la devolución al cese y el certificado salen del mismo cálculo. Está en los capítulos trece y dieciséis del manual. |

Duración estimada: 1.3 min (201 palabras).

## E10 · Vacaciones y feriados

capítulos 17, 18 · Caso: NOMINA · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Vacaciones y feriados | Este episodio muestra cómo se registran y se pagan las vacaciones, y cómo se cargan los feriados del año. |
| 2 | Captura `c17_03_asignaciones` · rótulo: «Asignaciones de vacaciones» | Los días ganados se registran como asignaciones. Lucía tiene cincuenta y dos coma cinco días por veintiún meses, y Héctor, cuarenta y siete coma cinco por diecinueve meses. |
| 3 | Captura `c17_04_ausencias` · rótulo: «Ausencias aprobadas» | El goce se registra como una ausencia aprobada: Lucía, del 2 al 16 de febrero de 2026, y Héctor, del 14 al 23 de setiembre. |
| 4 | Captura `c17_05_tipos_ausencia_tabla21` · rótulo: «Tipos de ausencia con su código de la Tabla 21» | Cada tipo de ausencia tiene su código de suspensión de la Tabla veintiuno: vacaciones veintitrés, sin goce cero cinco, enfermedad veinte y maternidad veintidós. Con ese código, la boleta descuenta los días y el PLAME los declara. |
| 5 | Captura `c17_06_oscar_vac_jul2026_dias` · rótulo: «Vacacional: los días de goce pagados» | En el mes de goce se calculan dos boletas. La vacacional de Óscar paga los días de vacaciones. |
| 6 | Captura `c17_07_oscar_nme_jul2026_dias` · rótulo: «Mensual: la misma línea, sin pagar» | La mensual lleva la misma línea de vacaciones, pero sin marcar en Pagado: esos días ya los pagó la vacacional. Óscar recibe S/ 1 500 en cada boleta y sus aportes se reparten igual. |
| 7 | Captura `c17_01_lucia_vac_feb2026_calculo` · rótulo: «Lucía, vacacional de febrero de 2026» | En el recorrido, la vacacional de Lucía paga S/ 2 306,50: sueldo más asignación familiar, entre treinta, por quince días. El neto es S/ 2 008,50. |
| 8 | Captura `c17_02_lucia_nme_feb2026_dias` · rótulo: «Mensual de Lucía: vacaciones sin «¿Pagado?»» | Y la mensual de febrero muestra las vacaciones sin pagar, igual que la de Óscar. |
| 9 | Captura `c17_02_lucia_nme_feb2026_calculo` · rótulo: «Mensual: 2 250,00 y asignación familiar completa» | La mensual paga S/ 2 250 de remuneración y la asignación familiar completa, S/ 113. El mes suma S/ 4 669,50. |
| 10 | Captura `c18_01_dias_festivos` · rótulo: «Vacaciones › Configuración › Días festivos» | Los feriados nacionales se registran cada año en Días festivos, sin recurso, para que valgan para toda la compañía. |
| 11 | Captura `c18_02_banda_sin_feriados` · rótulo: «Aviso: faltan los feriados del año» | Si faltan los feriados del año, la lista de boletas lo avisa en una banda, antes de calcular. |
| 12 | Tarjeta: S/ 4 669,50 — Febrero de 2026 de Lucía: vacacional 2 306,50 + mensual 2 250,00 + asignación familiar 113,00. | Vacacional por los días de goce, mensual por el resto, y feriados cargados antes de calcular. Está en los capítulos diecisiete y dieciocho del manual. |

Duración estimada: 1.9 min (285 palabras).

## E11 · Asistencias: tardanzas, faltas y feriados

capítulo 19 · Caso: ASISTENCIA · Módulos: asistencia, asistencia_demo

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Asistencias: tardanzas, faltas y feriados | Con el módulo de asistencias, las marcaciones se concilian con el horario y se llevan a la boleta como faltas y tardanzas. Veamos cómo. |
| 2 | Captura `c19_01_ajustes_asistencias` · rótulo: «Ajustes: tolerancia y descuento de tardanzas» | En los ajustes de la compañía se define la tolerancia de tardanza, diez minutos en este ejemplo, y si las tardanzas se descuentan en la boleta. |
| 3 | Captura `c19_08_calendario_zona_horaria` · rótulo: «Horario en America/Lima» | El horario de trabajo debe estar en la zona horaria America Lima. Si queda en UTC, las tardanzas salen desplazadas cinco horas. |
| 4 | Captura `c19_02_jorge_oct_boton` · rótulo: «Cargar asistencias» | En la boleta en borrador, el botón Cargar asistencias concilia las marcaciones del periodo. |
| 5 | Captura `c19_03_carlos_tardanzas_asistencias` · rótulo: «Tres tardanzas de 25 minutos» | Carlos llegó tres veces veinticinco minutos tarde. Con diez de tolerancia, cuentan quince cada una: cuarenta y cinco minutos. |
| 6 | Captura `c19_03_carlos_tardanzas_calculo` · rótulo: «Descuento por tardanzas: 10,94» | Se descuentan al valor minuto: S/ 10,94 sobre un sueldo de S/ 3 500. La tardanza también reduce la base de los aportes. |
| 7 | Captura `c19_04_jorge_set_faltas_asistencias` · rótulo: «Jorge: dos faltas» | Un día laborable sin marcaciones ni ausencia aprobada es falta. Jorge tiene dos en setiembre: su básica baja a S/ 1 054,67. |
| 8 | Captura `c19_05_maria_parcial_asistencias` · rótulo: «María: media jornada» | Con la evaluación por horas, una media jornada se descuenta en proporción: a María le faltan cuatro horas el día 4, y su básica queda en S/ 7 866,67. |
| 9 | Captura `c19_06_oscar_combinado_asistencias` · rótulo: «Óscar: faltas y vacaciones justificadas» | Los días cubiertos por una ausencia aprobada, como las vacaciones de Óscar, salen como justificados y no son falta. |
| 10 | Captura `c19_02_jorge_oct_feriado_asistencias` · rótulo: «Octubre: el feriado no es falta» | Desde el lote doce, el día no laborable del calendario sin ausencia cuenta como feriado: no es falta ni tardanza. En octubre, Jorge tiene veintiún días evaluados, cero faltas y un feriado, el Combate de Angamos. |
| 11 | Captura `c19_02_jorge_oct_feriado_calculo` · rótulo: «Remuneración completa: 1 130,00» | Su remuneración básica de octubre sale completa: S/ 1 130, sin ninguna línea de falta. |
| 12 | Tarjeta: S/ 1 130,00 — Octubre de 2026 de Jorge (caso ASISTENCIA): un feriado, cero faltas, remuneración completa. | Las horas trabajadas en un feriado se muestran, pero la sobretasa no se calcula. Los turnos de noche que cruzan la medianoche se concilian por día calendario. Está en el capítulo diecinueve del manual. |

Duración estimada: 1.9 min (283 palabras).

## E12 · Cambios de contrato dentro del mes

capítulo 21 · Caso: AUMENTO · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Cambios de contrato dentro del mes | Un aumento a mitad de mes o un contrato nuevo cambian cómo se paga el mes. Este episodio muestra cómo lo resuelve la boleta. |
| 2 | Captura `c21_03_versiones_del_contrato` · rótulo: «Dos versiones del contrato» | En Odoo diecinueve, un aumento se registra como una nueva versión del contrato. En el caso AUMENTO, el sueldo es de S/ 2 000 desde el 1 de setiembre y de S/ 3 000 desde el 15 de octubre. |
| 3 | Captura `c21_01_aumento_oct_dias` · rótulo: «Una línea de días por versión» | La boleta de octubre lleva una línea de días por versión: diez días con el sueldo anterior y doce con el nuevo. En total, veintidós días y ciento setenta y seis horas. |
| 4 | Captura `c21_01_aumento_oct_calculo` · rótulo: «Cada sueldo paga sus días» | Cada sueldo paga sus días: la remuneración básica es S/ 2 533,33, con ONP de S/ 329,33, EsSalud de S/ 228 y un neto de S/ 2 204. |
| 5 | Captura `c21_02_dos_contratos_oct_dias` · rótulo: «Dos contratos en el mismo mes» | Si el trabajador tiene dos contratos en el mes, la boleta lleva una línea de días por contrato. |
| 6 | Tarjeta: El .jor declara el mes una sola vez — 176 horas para cada trabajador del caso; En la versión 1 los días se repetían con dos versiones | En el PLAME de octubre, el archivo de jornada declara ciento setenta y seis horas a cada uno, una sola vez. En la versión uno, los días se repetían cuando había dos versiones. |
| 7 | Tarjeta: S/ 2 533,33 — Básica de octubre con aumento el día 15: 10 días a 2 000 + 12 días a 3 000; 176 horas en el .jor. | Cada versión del contrato paga sus días, y el PLAME declara el mes una sola vez. Está en el capítulo veintiuno del manual. |

Duración estimada: 1.3 min (197 palabras).

## E13 · Licencias sin goce y permisos por horas

capítulo 22 · Caso: AUMENTO y escenario del manual · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Licencias sin goce y permisos por horas | Este episodio muestra tres ausencias sin goce: una semana, un permiso de dos horas y un mes entero. |
| 2 | Captura `c22_04_ausencias_sin_goce` · rótulo: «Tres ausencias «Sin pagar» aprobadas» | Las tres son ausencias del tipo Sin pagar, aprobadas: un permiso de dos horas el 17 de noviembre, una semana del 9 al 13, y todo el mes de noviembre. |
| 3 | Captura `c22_01_semana_sin_goce_dias` · rótulo: «Semana sin goce: −5 días sin pagar» | La semana sin goce resta cinco días y cuarenta horas, sin marcar en Pagado. Con un sueldo de S/ 2 500, la remuneración del mes es S/ 2 083,33. |
| 4 | Captura `c22_02_permiso_2_horas_calculo` · rótulo: «Permiso de 2 horas: 2 479,17» | El permiso de dos horas se descuenta al valor hora: dos mil quinientos entre treinta, entre ocho, por dos. La remuneración queda en S/ 2 479,17 y el neto en S/ 2 156,88. |
| 5 | Captura `c22_03_mes_sin_goce_dias` · rótulo: «Mes entero sin goce» | Con todo noviembre sin goce, la boleta resta veintiún días y no tiene importes: no se valida. |
| 6 | Tarjeta: Suspensiones en el .snl — Semana sin goce: 05|5 y 126 horas en el .jor; Mes entero sin goce: 05|30, sin boleta mensual | En el PLAME, la semana sin goce va como suspensión cero cinco por cinco días, con ciento veintiséis horas en la jornada. El mes entero va como cero cinco por treinta días, sin boleta mensual. |
| 7 | Tarjeta: S/ 2 479,17 — Remuneración con un permiso de 2 horas sin goce: 2 500 − 2 500 / 30 / 8 × 2. | El divisor del valor hora y la asignación familiar en un mes entero sin goce están pendientes de confirmación por la contadora. Está en el capítulo veintidós y en el anexo A del manual. |

Duración estimada: 1.3 min (196 palabras).

## E14 · Subsidios: descanso médico y maternidad

capítulo 23 · Caso: SUBSIDIOS · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Subsidios: descanso médico y maternidad | Los subsidios son nuevos en la versión dos. Este episodio muestra el descanso médico, la maternidad y qué pasa cuando no hay derecho. |
| 2 | Captura `c23_04_descanso_medico` · rótulo: «Descanso médico de noviembre de 2026» | El descanso médico se registra como una ausencia con el tipo de suspensión veinte. En el caso SUBSIDIOS, va del 1 al 30 de noviembre. |
| 3 | Captura `c23_01_descanso_nov_calculo` · foco: Subsidio por inc · rótulo: «Primeros 20 días a cargo del empleador; luego subsidio» | Los primeros veinte días los paga el empleador como remuneración: S/ 2 000. Los diez siguientes son subsidio por incapacidad, con un promedio diario de S/ 100: S/ 1 000. La ONP y EsSalud se calculan solo sobre la remuneración, y el neto es S/ 2 740. |
| 4 | Captura `c23_02_maternidad_nov_calculo` · rótulo: «Maternidad: subsidio sin aportes» | En maternidad, la boleta no tiene remuneración: paga el subsidio por maternidad, S/ 3 000, sin ONP ni EsSalud. |
| 5 | Captura `c23_03_sin_derecho_nov_dias` · rótulo: «Sin derecho: días de descanso sin subsidio» | Si el trabajador no cumple los aportes previos, por ejemplo con un solo mes antes del descanso, los días van como descanso, pero no se calcula subsidio, y la boleta avisa. |
| 6 | Tarjeta: Días y conceptos de subsidio — .snl con los días por tipo de la Tabla 21: 20, 21 y 22; Conceptos 0916 (incapacidad) y 0915 (maternidad) en el .rem; 344 celdas comparadas en el caso SUBSIDIOS | En el PLAME, el archivo de suspensiones declara los días por tipo, y el de remuneraciones lleva los conceptos de subsidio. El caso SUBSIDIOS compara trescientas cuarenta y cuatro celdas en veintinueve boletas. |
| 7 | Tarjeta: S/ 2 740,00 — Noviembre con descanso médico: 2 000,00 de remuneración + 1 000,00 de subsidio − ONP 260,00. | El promedio y el contador de días tienen preguntas pendientes con la contadora, anotadas en el anexo A. Todo lo demás está en el capítulo veintitrés del manual. |

Duración estimada: 1.4 min (206 palabras).

## E15 · Gratificaciones y CTS

capítulos 14, 15 · Caso: NOMINA y BANCOS · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Gratificaciones y CTS | Este episodio muestra la gratificación de julio, la trunca al cese, y el depósito de CTS de noviembre con su constancia. |
| 2 | Captura `c14_01_lucia_grati_jul2026_calculo` · rótulo: «Gratificación de julio de 2026» | La gratificación de julio de Lucía paga el sueldo más la asignación familiar, S/ 4 613, y la bonificación extraordinaria del nueve por ciento, S/ 415,17. En total, S/ 5 028,17. |
| 3 | Tarjeta: El semestre se paga una sola vez — Carmen cobra la ordinaria de julio: 2 500,00 + 225,00; Cesa el 31/08: la liquidación paga 2/6 (julio y agosto): 833,33 + 75,00; Ninguna liquidación repite el semestre pagado | Carmen cobra la gratificación ordinaria de julio y cesa el 31 de agosto. Su liquidación paga solo dos sextos, julio y agosto: S/ 833,33 más la bonificación. El semestre ya pagado no se repite. |
| 4 | Captura `c15_01_lucia_cts_nov2026_calculo` · rótulo: «CTS de noviembre de 2026» | La CTS de noviembre se calcula con la remuneración computable: sueldo, asignación familiar y un sexto de la gratificación ya validada. Lucía recibe S/ 2 695,92. |
| 5 | Captura `c15_02_liquidacion_deposito_cts` · rótulo: «Liquidación del depósito de CTS» | La liquidación del depósito detalla la remuneración computable, S/ 5 391,83, el periodo de seis meses, el banco y el monto depositado. |
| 6 | Captura `c27_05_interbank_cts_resultado` · rótulo: «TXT de CTS de Interbank» | El depósito se paga con el archivo de CTS del banco. En el caso BANCOS, Interbank abona S/ 833,33 y lista a los cuatro que tienen la CTS en otro banco o no tienen cuenta. |
| 7 | Tarjeta: S/ 2 695,92 — CTS de noviembre de 2026 de Lucía: la mitad de 5 391,83 de remuneración computable. | La CTS lee la gratificación validada: valide primero la gratificación. Está en los capítulos catorce y quince del manual. |

Duración estimada: 1.3 min (188 palabras).

## E16 · Liquidación por cese e indemnización

capítulo 16 · Caso: NOMINA, CESE e INDEMNIZACION · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Liquidación por cese e indemnización | Este episodio muestra la liquidación de beneficios sociales, la indemnización por despido arbitrario y la renta de quinta al cese. |
| 2 | Captura `c16_01_carmen_liquidacion_calculo` · rótulo: «Liquidación de Carmen, cese el 31/08/2026» | Carmen cesa el 31 de agosto de 2026. Su liquidación paga vacaciones truncas por S/ 1 666,67, ahora con AFP y EsSalud, la gratificación trunca de S/ 833,33 con su bonificación de S/ 75, y la CTS trunca de S/ 972,22. El neto es S/ 3 331,89. |
| 3 | Captura `c16_03_contrato_despido` · rótulo: «Contrato: motivo de baja y despido arbitrario» | Para la indemnización, en el contrato se indica el motivo de baja y se marca Despido arbitrario. En un contrato modal, también el fin pactado. |
| 4 | Captura `c16_02_indemnizacion_calculo` · rótulo: «Indemnización: 18 575,00» | En el caso INDEMNIZACION, plazo indeterminado, la indemnización es S/ 18 575, sumada a las truncas. No paga renta de quinta: la base de quinta son solo las truncas, S/ 2 571,67. El neto es S/ 22 595,75. |
| 5 | Captura `c13_02_cese_devolucion_calculo` · rótulo: «Renta de 5.ª al cese: devolución» | Y al cese se regulariza la renta de quinta del año. En el caso CESE, la liquidación devuelve S/ 2 158,67. |
| 6 | Tarjeta: La liquidación va al final — Primero, las boletas del año del trabajador; Después, la liquidación; Desde un lote, las liquidaciones se validan al final | La liquidación lee todo el año del trabajador. Por eso se valida al final; desde un lote, la localización la deja para el último lugar. |
| 7 | Tarjeta: S/ 18 575,00 — Indemnización por despido arbitrario del caso INDEMNIZACION, sin renta de 5.ª. | Truncas con sus aportes, indemnización y renta de quinta al cese. Está en el capítulo dieciséis del manual. |

Duración estimada: 1.3 min (194 palabras).

## E17 · Microempresa

capítulo 24 · Caso: MICRO · Módulos: base, ce, ce_demo

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Microempresa | El régimen de microempresa tiene reglas propias: SIS en lugar de EsSalud, sin gratificación ni CTS y vacaciones de quince días. |
| 2 | Captura `c24_01_micro_jun_calculo` · rótulo: «Microempresa, junio de 2026» | Un trabajador de microempresa con S/ 1 500 paga ONP por S/ 195. El empleador aporta al SIS S/ 15 en lugar de EsSalud, y SENATI. El neto es S/ 1 305. |
| 3 | Tarjeta: Asignación familiar y EsSalud a elección — Asignación familiar: 0,00 por defecto; 113,00 con «Pagar»; EsSalud 9 % en lugar de SIS: 135,00 | La asignación familiar no es obligatoria: sale en cero, y con la opción Pagar sale S/ 113. Y si la empresa elige EsSalud en lugar de SIS, paga S/ 135. |
| 4 | Captura `c24_02_micro_liquidacion_calculo` · rótulo: «Liquidación: 15 días por año» | En la liquidación, las vacaciones truncas son de quince días por año: S/ 687,50, sin gratificación ni CTS truncas. El neto es S/ 598,12. |
| 5 | Captura `c10_05_boleta_sin_importes` · rótulo: «La CTS en cero no se valida» | Y una CTS de microempresa sale en cero: la localización lo explica y ofrece eliminarla. |
| 6 | Tarjeta: S/ 15,00 — SIS del trabajador de microempresa en lugar de EsSalud (caso MICRO, 83 celdas). | El régimen se elige en el contrato. Está en el capítulo veinticuatro del manual. |

Duración estimada: 0.9 min (136 palabras).

## E18 · Seguro Vida Ley

capítulos 6, 12 · Caso: VIDALEY · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Seguro Vida Ley | El seguro Vida Ley es nuevo en la versión dos. Este episodio muestra las pólizas y la prima en la boleta. |
| 2 | Captura `c06_02_polizas_vida_ley` · rótulo: «Pólizas de Vida Ley» | Las pólizas se registran en Seguros. El caso VIDALEY tiene una póliza por tasa, de cero coma cincuenta y tres por ciento, con seis trabajadores; otra por importe fijo, y una vencida. |
| 3 | Captura `c06_03_poliza_vida_ley` · rótulo: «Calcular la prima en la planilla» | Con la opción Calcular la prima en la planilla, la prima de cada trabajador sale en su boleta. |
| 4 | Captura `c12_04_vidaley_calculo` · rótulo: «Prima: 15,90 a cargo del empleador» | Con sueldo de S/ 3 000 y la tasa de cero coma cincuenta y tres por ciento, la prima es S/ 15,90. Es un aporte del empleador: el neto no cambia, S/ 2 610. |
| 5 | Tarjeta: La base se topa en la RMA — Sueldo 3 000: prima 15,90; Sueldo 15 000: prima 66,77 (tope en la RMA) | La base de la prima se topa en la remuneración máxima asegurable. Con un sueldo de S/ 15 000, la prima es S/ 66,77. |
| 6 | Captura `c09_04_compania_controles` · rótulo: «Control de Vida Ley en la compañía» | Vida Ley tiene su propio control en la compañía, con las opciones avisar, bloquear o no controlar. En FM SYSTEMS está en No controlar. |
| 7 | Tarjeta: S/ 15,90 — Prima de Vida Ley con sueldo 3 000 y tasa 0,53 % (caso VIDALEY, 58 celdas). | Hoy se admite una sola póliza por trabajador. Está en los capítulos seis y doce del manual. |

Duración estimada: 1.1 min (170 palabras).

## E19 · Pago a bancos: BCP, Interbank y Scotiabank

capítulos 27, 15 · Caso: BANCOS · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Pago a bancos: BCP, Interbank y Scotiabank | Este episodio muestra los archivos de pago de haberes y de CTS para el BCP, Interbank y Scotiabank. |
| 2 | Captura `c27_04_bcp_haberes_resultado` · rótulo: «BCP haberes de mayo de 2026» | En Nómina PE, Pago a bancos, se elige el banco, el tipo, haberes o CTS, y el mes. En el caso BANCOS, el archivo de haberes del BCP abona a cuatro trabajadores, S/ 7 918. |
| 3 | Tarjeta: Un trabajador sin cuenta no bloquea el archivo — BCP: 1 omitido sin cuenta sueldo, por 1 566,00; El resumen dice a quién no se pagó y por qué; Modo estricto opcional: no generar si falta alguien | Un trabajador sin cuenta ya no bloquea el archivo. Se omite, y el resumen dice a quién no se pagó y por qué: aquí, uno sin cuenta sueldo, por S/ 1 566. Si la empresa prefiere, el modo estricto no genera el archivo. |
| 4 | Captura `c27_05_interbank_cts_resultado` · rótulo: «Interbank CTS: 1 abonado, 4 omitidos» | El archivo de CTS de Interbank abona S/ 833,33 y omite a los cuatro que tienen la CTS en otro banco o no tienen cuenta CTS, por S/ 2 800,39. |
| 5 | Captura `c27_06_scotiabank_haberes_resultado` · rótulo: «Scotiabank: formato sin validar» | Scotiabank abona a tres trabajadores, S/ 6 003,88. Su formato es propio de la localización: el asistente avisa que no está validado con el banco. |
| 6 | Tarjeta: Listos para la banca por internet — Banco de cada cuenta por su código SBS; Sin tildes (ASCII) y con fin de línea CRLF; Total exacto al centavo; Banco de la Nación: no cubierto (formato no publicado) | Los archivos salen sin tildes y con fin de línea de Windows, con el total exacto al centavo. El banco de cada cuenta se reconoce por su código SBS. El Banco de la Nación no está cubierto: su formato no es público. |
| 7 | Tarjeta: S/ 7 918,00 — Haberes de mayo de 2026 abonados por el BCP a 4 trabajadores del caso BANCOS (407 celdas). | Antes de subir un archivo al banco, ábralo y revise los omitidos. Está en los capítulos veintisiete y quince del manual. |

Duración estimada: 1.4 min (214 palabras).

## E20 · Pago de la planilla y entrega de boletas

capítulo 28 · Caso: escenario del manual (lote de noviembre) · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Pago de la planilla y entrega de boletas | Nuevo en la versión dos: registrar el pago de la planilla y entregar las boletas, con su plazo y su constancia. |
| 2 | Captura `c28_02_registrar_pago` · rótulo: «Registrar pago del lote» | Desde el lote validado, Registrar pago muestra lo que se paga a cada trabajador: S/ 2 175 y S/ 2 610, en total S/ 4 785. |
| 3 | Captura `c28_03_asiento_pago` · rótulo: «Asiento del pago, conciliado» | El pago genera su asiento en el banco: debe la cuenta cuatro uno uno uno de cada trabajador y haber el banco. Los apuntes quedan conciliados con los de la planilla. |
| 4 | Captura `c28_04_boleta_pagada` · rótulo: «Boleta pagada: fecha, operación y plazo de entrega» | Cada boleta queda pagada, con la fecha, el asiento, el número de operación y el plazo de entrega: tres días hábiles. Pagada el 30 de noviembre, se entrega hasta el 3 de diciembre. |
| 5 | Captura `c08_10_entrega_electronica` · rótulo: «Acuerdo de entrega electrónica» | La entrega por correo requiere el acuerdo del trabajador, registrado en su ficha con la fecha y el correo. |
| 6 | Captura `c28_05_enviar_boletas_sin_acuerdo` · rótulo: «Enviar boletas por correo» | Enviar boletas por correo manda a cada trabajador con acuerdo su boleta validada que aún no se envió, y guarda la constancia. Quien no tiene acuerdo recibe la boleta impresa, con firma. |
| 7 | Tarjeta: S/ 4 785,00 — Pago del lote de noviembre de 2026: 2 175,00 + 2 610,00, asiento BNK1/2026/00001 conciliado. | Registrar el pago y entregar la boleta dentro de los tres días hábiles cierra el mes. Está en el capítulo veintiocho del manual. |

Duración estimada: 1.2 min (185 palabras).

## E21 · PLAME, AFPnet y planilla de sueldos

capítulo 27 · Caso: PLAME · Módulos: base, ce, plame_demo

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: PLAME, AFPnet y planilla de sueldos | Este episodio muestra los archivos legales del mes: la planilla de sueldos, el PLAME y AFPnet. |
| 2 | Captura `c27_01_planilla_resultado` · rótulo: «Planilla de sueldos» | La planilla de sueldos del mes sale en Excel, con una fila por trabajador. |
| 3 | Captura `c27_02_plame_resultado` · rótulo: «PLAME de noviembre de 2026» | El PLAME genera el archivo comprimido para el PDT. En noviembre, quince boletas de trece trabajadores, con los conceptos de remuneración, asignación familiar y los subsidios. |
| 4 | Tarjeta: Qué lleva cada archivo — .rem: un concepto por línea, con los códigos de la Tabla 22; .jor: 6 campos, las horas del mes una sola vez; .snl: días de suspensión por tipo de la Tabla 21; Las rectificativas restan | El archivo de remuneraciones lleva un concepto por línea con su código. El de jornada tiene seis campos y declara las horas del mes una sola vez. El de suspensiones, los días por tipo. Y las rectificativas restan. |
| 5 | Captura `c27_03_afpnet_resultado` · rótulo: «AFPnet de julio de 2026» | AFPnet sale en Excel con los trabajadores del sistema privado: en julio, seis. |
| 6 | Tarjeta: 13 trabajadores — PLAME de noviembre de 2026: 15 boletas, 13 trabajadores en el .rem; el caso PLAME compara 121 celdas. | Importe el PLAME en el PDT y compare sus totales con la planilla. Está en el capítulo veintisiete del manual. |

Duración estimada: 0.8 min (127 palabras).

## E22 · Horas extra, otras entradas y utilidades

capítulo 20 · Caso: UTILIDADES · Módulos: base, ce

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Horas extra, otras entradas y utilidades | Este episodio muestra las entradas variables del mes, como horas extra y movilidad, y el reparto de utilidades. |
| 2 | Captura `c20_02_entradas_lista` · rótulo: «Otras entradas de la boleta» | Las entradas variables se registran en la boleta: seis horas extra al veinticinco por ciento, dos al treinta y cinco, diez horas nocturnas, movilidad de S/ 200 y cuarenta y cinco minutos de tardanza. |
| 3 | Captura `c20_02_entradas_calculo` · foco: Base afecta · rótulo: «Base afecta 2 529,50» | Las horas extra suman S/ 75 y S/ 27, y las nocturnas S/ 35. La movilidad no es remunerativa y la tardanza resta: la base afecta es S/ 2 529,50 y el neto, S/ 2 400,66. |
| 4 | Captura `c20_01_reparto_utilidades` · rótulo: «Nómina PE › Reparto de utilidades» | El reparto de utilidades se calcula con su asistente: ejercicio, renta neta y porcentaje según la actividad. Reparte cincuenta por ciento por días laborados y cincuenta por remuneraciones, con tope de dieciocho sueldos. |
| 5 | Tarjeta: 5 000,00 entre 3 trabajadores — 12 000,00 de remuneraciones: 833,33 + 500,00 = 1 333,33; 18 000,00: 833,33 + 750,00 = 1 583,33; 30 000,00: 833,33 + 1 250,00 = 2 083,33 | En el caso UTILIDADES, cinco mil soles entre tres trabajadores con los mismos días: cada uno recibe S/ 833,33 por días y su parte por remuneraciones. El tope usa el sueldo vigente al cierre del ejercicio. |
| 6 | Tarjeta: S/ 2 083,33 — Mayor participación del caso UTILIDADES: 833,33 por días + 1 250,00 por remuneraciones. | Qué días y qué remuneraciones cuentan para el reparto está pendiente de confirmación por la contadora, anotado en el anexo A. Lo demás está en el capítulo veinte del manual. |

Duración estimada: 1.2 min (187 palabras).

## E23 · T-Registro I: altas y bajas

capítulo 29 · Caso: TREGISTRO · Módulos: ce, ce_demo

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: T-Registro I: altas y bajas | La exportación del T-Registro es nueva en la versión dos. Este primer episodio muestra las altas y las bajas. |
| 2 | Tarjeta: Cinco operaciones, cada una un envío — Altas y bajas; Modificaciones; Altas y bajas de derechohabientes; Estructura del Manual del PVS T-Registro v2.22 | El asistente del T-Registro tiene cinco operaciones: altas, bajas, modificaciones, y altas y bajas de derechohabientes. Cada una es un envío aparte, con la estructura del manual del validador de SUNAT. |
| 3 | Captura `c29_01_altas_resultado` · rótulo: «Altas de octubre de 2026: 4 exportados, 2 no» | Antes de exportar, el asistente valida los datos que exige el validador. En las altas de octubre del caso TREGISTRO, cuatro trabajadores se exportan y dos no, y el resumen dice qué le falta a cada uno y con qué regla. |
| 4 | Tarjeta: Un archivo por tipo de dato — .ide 4 · .tra 4 · .per 17; .est 4 · .cta 2 · .edu 3; Se comprimen para el PVS | Las altas generan un archivo por tipo de dato: identificación, datos laborales, periodos, establecimientos, cuentas y estudios. Se suben al validador de SUNAT. |
| 5 | Tarjeta: Fin del periodo y motivo — Las bajas de octubre: un solo .per; Fecha de fin del periodo y motivo de baja | Las bajas generan un solo archivo de periodos, con la fecha de fin y el motivo de baja. |
| 6 | Captura `c09_04_compania_controles` · rótulo: «Controles del T-Registro en la compañía» | En la compañía se configuran los controles del T-Registro, por ejemplo el plazo para el alta, que es el mismo día del ingreso. |
| 7 | Tarjeta: 4 / 6 — Altas de octubre de 2026 exportadas en el caso TREGISTRO; las otras 2 salen con lo que les falta. | La prueba en el validador la hace el implementador con su versión del PVS. Está en el capítulo veintinueve del manual. |

Duración estimada: 1.2 min (176 palabras).

## E24 · T-Registro II: modificaciones y derechohabientes

capítulo 29 · Caso: TREGISTRO · Módulos: ce, ce_demo

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: T-Registro II: modificaciones y derechohabientes | El segundo episodio del T-Registro muestra las modificaciones y los derechohabientes. |
| 2 | Captura `c29_03_modificacion_resultado` · rótulo: «Modificación del tipo de trabajador» | Cada modificación es un envío, con un concepto y su fecha de cambio. Aquí, el tipo de trabajador cambia el 16 de octubre de 2026: el archivo de periodos lleva dos líneas, el cierre y el nuevo periodo. |
| 3 | Tarjeta: Nueve conceptos — Tipo de trabajador, datos del contrato, cuenta de abono; Régimen pensionario, salud y EPS, SCTR salud; Establecimiento, estudios, contacto y domicilio | Hay nueve conceptos: tipo de trabajador, datos del contrato, cuenta de abono, régimen pensionario, salud, SCTR, establecimiento, estudios y datos de contacto. Cada uno genera solo los archivos que cambian. |
| 4 | Captura `c29_04_dh_altas_resultado` · rótulo: «Altas de derechohabientes: 4 exportados, 5 no» | Las altas de derechohabientes generan un archivo de texto: en octubre, cuatro exportados y cinco sin exportar, por ejemplo hijos sin documento o sin apellidos separados. Un hijo mayor de edad sin incapacidad tampoco se exporta. |
| 5 | Tarjeta: Los TXT de derechohabientes van directo a SOL — No pasan por el PVS; Se suben en SOL: T-Registro › Registro de Derechohabientes › Carga masiva; Nunca suba archivos del laboratorio: es un registro real | Los archivos de derechohabientes no pasan por el validador: se suben directamente en SOL. Nunca suba los del laboratorio, porque una carga en SOL es un registro real. |
| 6 | Tarjeta: 262 celdas — Caso TREGISTRO: altas, bajas, las 9 modificaciones y los derechohabientes, al 100 %. | No cubre pensionistas, personal en formación ni de terceros, ni la modificación masiva de derechohabientes. Está en el capítulo veintinueve del manual. |

Duración estimada: 1.1 min (165 palabras).

## E25 · Recibos por honorarios y PLAME de 4.ª

capítulo 30 · Caso: PLAME-RXH · Módulos: plame_rxh, plame_4ta

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Recibos por honorarios y PLAME de 4.ª | Los recibos por honorarios se declaran en el PLAME de cuarta categoría. Hay dos formas de generarlo, con el mismo contenido. |
| 2 | Tarjeta: El mismo archivo, con o sin nómina — Sin nómina: Contabilidad › Reportes › PLAME - Recibos por Honorarios; Con nómina: casilla «Incluir 4ta categoría» del PLAME; Entran los recibos pagados en el mes | Sin nómina, desde Contabilidad, Reportes. Con nómina, marcando Incluir cuarta categoría en el PLAME. En los dos casos entran los recibos pagados en el mes, sin importar su fecha de emisión. |
| 3 | Captura `c30_01_rxh_periodo` · rótulo: «Elegir ejercicio y mes» | Se elige el ejercicio y el mes, o un rango de fechas. |
| 4 | Captura `c30_02_rxh_revision` · rótulo: «Revisar periodo: 8 prestadores, 9 comprobantes» | Revisar periodo lista cada comprobante con su prestador, serie, número, fechas, retención y monto. En julio de 2026, ocho prestadores y nueve comprobantes, con una nota de crédito y un no domiciliado con pasaporte. Total declarado: S/ 15 022,60. |
| 5 | Captura `c30_03_ajustes_4ta` · rótulo: «Retención y umbral de 1 500» | En los ajustes de la compañía se indica el impuesto de retención y el umbral de S/ 1 500. |
| 6 | Tarjeta: S/ 15 022,60 — Total declarado de julio de 2026 en el caso PLAME-RXH: 8 prestadores y 9 comprobantes. | El formato se comparó con archivos aceptados por el PDT. Verifíquelo con su primera declaración. Está en el capítulo treinta del manual. |

Duración estimada: 1.0 min (144 palabras).

## E26 · Cierre mensual y anual

capítulos 32, Anexo E · Caso: — · Módulos: base, ce, ce_demo

| # | Se ve | Se dice |
|---|---|---|
| 1 | Tarjeta: Cierre mensual y anual | El último episodio reúne la lista de verificación del cierre de cada mes y de cada año. |
| 2 | Tarjeta: Parámetros y novedades — RMA del trimestre, RMV y comisiones AFP; Ingresos, ceses, cambios de sueldo con fecha efectiva; Vacaciones, licencias, descansos médicos, asistencias, horas extra; T-Registro dentro del plazo | Cada mes, antes de calcular: revise los parámetros, registre las novedades del mes y presente el T-Registro dentro del plazo. |
| 3 | Tarjeta: En orden — Adelanto → gratificación, CTS y vacaciones → mensuales → liquidaciones; Bandas y avisos de cada boleta; Asiento de cada lote en el diario Planillas | Valide en orden: adelanto, gratificación, CTS y vacaciones, mensuales, y al final las liquidaciones. Revise los avisos de cada boleta y el asiento de cada lote. |
| 4 | Tarjeta: Archivos, pago y entrega — Planilla, PLAME, AFPnet y TXT bancarios: abrir cada uno; Revisar los omitidos de cada TXT; Registrar el pago con su número de operación; Entregar las boletas en 3 días hábiles | Después: genere y abra cada archivo, revise los omitidos, registre el pago y entregue las boletas en tres días hábiles. Por último, importe el PLAME y compare sus totales con la planilla. |
| 5 | Tarjeta: Diciembre y el cierre del ejercicio — Feriados y UIT del año siguiente; Gratificación y vacaciones de diciembre antes que la mensual; Certificado de 5.ª de cada trabajador; Reparto de utilidades; pólizas de Vida Ley y EPS | Cada año: registre los feriados y la UIT del año siguiente, valide la gratificación de diciembre antes que la mensual, emita los certificados de quinta, calcule las utilidades y revise las pólizas que vencen. |
| 6 | Captura `c02_03_casos_100` · rótulo: «Después de cada actualización: los 14 casos» | Y después de cada actualización de los módulos, corra los catorce casos del laboratorio: todos deben quedar en cien por ciento. |
| 7 | Tarjeta: 14 casos — Al 100 % después de cada actualización: la prueba de que el cálculo sigue la norma. | Gracias por acompañarnos en esta serie. La lista completa está en el capítulo treinta y dos del manual. |

Duración estimada: 1.1 min (168 palabras).
