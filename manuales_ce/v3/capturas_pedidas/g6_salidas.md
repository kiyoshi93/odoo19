# Capturas pedidas · grupo g6_salidas (capítulos 2, 27, 29, 30 y Anexo E)

Base contable19, versiones del v3 (ce 19.0.1.39.202, ce_demo 19.0.2.46.0, renta5_ce 19.0.1.0.4). Usuario con la zona
America/Lima. En todas: el año debe verse **sin separador de miles** («2026», no «2,026»); por eso se rehacen las del v2
que muestran un año. Se reutilizan sin cambios: c02_04_caso_tregistro, c02_05_datos_de_prueba_en_fm, c29_01, c29_03,
c29_04, c30_02 y c30_03.

## Capítulo 2

1. **c02_01_aplicaciones_versiones** (rehacer). Aplicaciones, filtro «Instaladas», búsqueda «Nómina Peruana», «Payroll» y
   «PLAME», vista de lista con la columna de versión. Compañía cualquiera. Debe verse
   `solse_pe_payroll_renta5_ce` «Nómina Peruana - Detalle de Renta de 5ta (Community)» 19.0.1.0.4 (nuevo), el núcleo
   19.0.1.39.202, la base 19.0.1.21.14 y los datos de prueba 19.0.2.46.0. Resaltar la fila de renta5_ce.
2. **c02_02_laboratorio** (rehacer). SOLSE Demo › Configuración › Laboratorio › «Laboratorio SOLSE Perú» (solse.demo.laboratorio
   id 1), compañía activa SOLSE Demo Servicios S.A.C. Arriba los contadores **33 Casos** y **30 Conformes**; el botón
   «② Sincronizar casos» resaltado; «Primer ejercicio» sin coma. Si cabe, la pestaña «Casos registrados» con las
   primeras filas.
3. **c02_03_casos_100** (rehacer). SOLSE Demo › Casos de demostración, vista de lista filtrada por Rama = Nómina (o
   agrupada por Rama), con los **30** casos de la nómina en «Comparado» y 100,00, incluidos los cinco EMPRESA_*. Si no
   caben, dos capturas no: basta con que se vean los EMPRESA_* al final y el contador 30.
4. **c02_06_empresa_consultora** (nueva). Formulario del caso EMPRESA_CONSULTORA (solse.demo.caso id 33), pestaña
   «Comparaciones», la última fila: 137 celdas, 0 diferencias, 100,00, conforme (comparación del 09/11 06:11 o la que
   haya). Resaltar los botones «⑤ Limpiar», «① Sembrar datos», «② Generar» y «④ Comparar». Ojo: el campo «Compañía»
   del formulario dice «SOLSE Demo Servicios» aunque el caso corre en su propia compañía (ver hallazgos): recortar el
   formulario para que no se vea o dejarlo y que el pie lo diga.

## Capítulo 27

5. **c27_01_planilla_resultado** (rehacer). Nómina › Nómina PE › Planilla de sueldos, compañía SOLSE Demo Servicios,
   Noviembre 2026, «Incluir nómina semanal (obreros)» e «Incluir planillas adicionales» marcadas, después de «Generar
   Excel»: Planilla_2026_11.xlsx. Resaltar «Incluir planillas adicionales» y el año 2026.
6. **c27_02_plame_resultado** (rehacer; puede ser la misma pantalla que pide el cap. 31 como c31_04). Nómina › Nómina PE
   › PLAME (archivos PDT), **compañía activa SOLSE Demo Consultora S.A.C. (id 16)**, Mes Junio, Año 2026, «Incluir 4ta
   categoría» marcada, después de «Generar archivos PLAME» (el asistente no guarda nada). Debe verse el archivo
   `PLAME_0601202606.zip` y el Resumen completo: «Boletas del periodo: 4 · Trabajadores en .rem: 4 · Líneas .rem: 6 |
   Líneas .jor: 4 | Líneas .snl: 0 · Conceptos T22: 0121, 0605», «Líneas .toc …: 2», «Personal en formación …: 1, monto
   pagado 1695.00, EsSalud … 152.55» y «4ta categoría: no hay recibos…». Resaltar las líneas del .toc y del personal en
   formación. Requiere el caso EMPRESA_CONSULTORA sembrado (lo está desde el 09/11 06:11).
7. **c27_03_afpnet_resultado** (rehacer). Nómina › Nómina PE › AFPnet (planilla previsional), SOLSE Demo Servicios,
   Julio 2026, después de «Generar Excel AFPnet»: AFPNET_2026_07.xlsx y el resumen con 6 trabajadores del SPP. Requiere
   NOMINA sembrado. Año sin coma.
8. **c27_04_bcp_haberes_resultado** (rehacer). Pago masivo a bancos, SOLSE Demo Servicios, Mayo 2026, Haberes, BCP -
   Telecrédito, «Incluir gratificaciones del mes» desmarcada e **«Incluir planillas adicionales» marcada** (nueva),
   después de «Generar TXT»: ABONO_BCP_SUELDO_202605.txt, «Abonados: 4 trabajadores | Total: S/ 7918.00» y el omitido
   de 1 566,00. Requiere BANCOS sembrado. Resaltar la casilla nueva.
9. **c27_05_interbank_cts_resultado** (rehacer). Igual, CTS, Interbank, mayo de 2026: 1 abonado por 833,33 y 4 omitidos
   por 2 800,39. Año sin coma.
10. **c27_06_scotiabank_haberes_resultado** (rehacer). Igual, haberes, Scotiabank, mayo de 2026: 3 abonados por
    6 003,88, 2 omitidos y el aviso «Scotiabank: formato sin validar». Año sin coma.

Nada de datos de FM en estas capturas. Los DNI del caso NOMINA y BANCOS se difuminan como en el v2.
