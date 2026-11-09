# Hallazgos · grupo g4_beneficios (capítulos 13, 14, 15, 17 y 20)

Medido en contable19 por JSON-RPC (solo lectura) el 09/11/2026, con `solse_pe_payroll_ce` 19.0.1.39.202,
`solse_pe_payroll_renta5_ce` 19.0.1.0.4 y `solse_pe_payroll_ce_demo` 19.0.2.46.0. Ninguno es un error de cálculo: las
cifras de los casos coinciden con las notas.

## H1 · La hoja «1 · Pueden cambiar código» describe un «hoy» que ya cambió
- **Dónde:** `99-sintesis/contadora/PREGUNTAS_CONTADORA_2026-11-08.xlsx`, hoja «1 · Pueden cambiar código», columna
  «Qué hace hoy el sistema», filas P-57, P-58, P-79, P-80, P-81 y P-115.
- **Qué:** dicen el comportamiento anterior a los lotes 22a a 23b (p. ej. P-57 «Hoy la liquidación no paga enero a
  junio»; P-81 «Hoy cuentan [las variables del mes del cese]»; P-115 «Hoy la vigente al cese»). El código de la
  versión .202 hace lo contrario por defecto (trunca de enero a junio en la liquidación; variables hasta el mes
  anterior; remuneración del mes anterior al cese), y lo midió el caso COMPUTABLE (70001806: trunca 3 000,00 y 270,00).
- **Impacto:** la contadora puede responder sobre un comportamiento que ya no existe. El manual describe el del código.
- **Módulo:** documentación (no código).

## H2 · La captura c13_04 del v2 muestra el RUC y el domicilio de FM
- **Dónde:** `manuales_ce/v3/capturas/c13_04_certificado_renta5_lucia_2025.png` (heredada del v2).
- **Impacto:** regla 3 (nada de datos reales de FM). Pedida de nuevo con el RUC y el domicilio ofuscados, y con los
  importes con separador de miles del lote 59.

## H3 · Casos que no dejan en la base las boletas que mide (para las capturas)
- **EMPRESA_COMERCIO:** K5 a K8 no tienen boletas en contable19 (los avisos de la RMV y la CTS a tiempo parcial de K8,
  0,00 / 225,00 y «tiempo_parcial», se miden en borradores que el caso deshace). Una captura de la CTS de K8 exige
  correr el caso o calcular un borrador.
- **EMPRESA_PEQUENA, EMPRESA_COMERCIO, EMPRESA_INDUSTRIA y EMPRESA_MICRO:** no hay reparto de utilidades guardado
  (`solse.pe.utilidades`) en sus compañías: el caso mide el asistente. El único reparto guardado es el de
  UTILIDADES_REPARTO (id 87, SOLSE Demo Servicios), cuyo «Trabajadores del ejercicio» es 91 (sin aviso del umbral).
- **NOMINA:** María Elena Torres Vega tiene contrato desde el 01/01/2025 pero boletas solo desde julio de 2026; su
  detalle de 5.ª de julio proyecta sin lo percibido antes (269,40). Es coherente con la regla de oro (solo boletas
  validadas), pero conviene decirlo en la captura y en el E09, como hace el capítulo 13.2.
- **Impacto:** solo para las capturas y los videos; no cambia ninguna cifra.
