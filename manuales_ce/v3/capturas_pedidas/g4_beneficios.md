# Capturas pedidas · grupo g4_beneficios (capítulos 13, 14, 15, 17 y 20)

Base contable19. Ninguna captura necesita guardar ni validar nada: abrir y capturar. Todo dato de FM que pueda ser real
(RUC, domicilio, cuentas bancarias) se ofusca (decisión 3 de Gabriel).

## Nuevas

### c13_05_renta5_detalle_maria_jul2026 (cap. 13.2)
- **Compañía:** SOLSE Demo Servicios S.A.C. (id 4).
- **Registro:** `hr.payslip` id **9903**, «Recibo de salario - María Elena Torres Vega - Nómina Mensual Empleados (01/07/2026 al 31/07/2026)», validada (caso NOMINA).
- **Vista:** formulario de la boleta, pestaña **«Renta de 5ta»** (módulo `solse_pe_payroll_renta5_ce`).
- **Qué debe verse:** el recuadro verde «Retención de julio: 2 155,20 ÷ 8 = 269,40.», los botones «Actualizar detalle» e «Imprimir detalle», los grupos Parámetros (UIT 5 500, factor 1, bonificación 9 %), «1. Proyección anual» (remuneraciones proyectadas 48 000,00, gratificaciones proyectadas 17 440,00, renta bruta 65 440,00), «2. Deducción» (38 500,00, renta neta 26 940,00), la tabla de tramos (un tramo al 8 %, 2 155,20) y «4. Retención del mes» (divisor 8, retención 269,40).
- **Resaltar:** la renta neta, el impuesto anual y la retención en la boleta. Si no cabe, dos capturas recortadas (parte superior y tramos + sección 4) con el mismo nombre y sufijo `_a` / `_b` (avisar para ajustar el JS).

### c13_06_renta5_no_domiciliado_s2 (cap. 13.6)
- **Compañía:** SOLSE Demo Consultora S.A.C. (id 16).
- **Registro:** `hr.payslip` id **9996**, gratificación de julio de 2026 de «Consultor CONSULTORA extranjero no domiciliado» (S2, documento 000068002).
- **Vista:** pestaña «Renta de 5ta».
- **Qué debe verse:** el resumen «No domiciliado (LIR, art. 54): 30 % de (8 000,00 percibido en el tramo + 1 453,33 de esta boleta) − retenido 2 400,00 = 436,00.», Cálculo «No domiciliado (30 %, art. 54 de la LIR)», el grupo «Retención del no domiciliado (art. 54 de la LIR)»: tasa 30 %, rige la marca desde 04/05/2026, percibido 8 000,00, afecto 1 453,33, retenido 2 400,00, retención 436,00.
- **Resaltar:** la tasa y la retención 436,00.

### c15_03_constancia_cts_k9_divisor (cap. 15.2)
- **Compañía:** SOLSE Demo Comercio S.A.C. (id 14).
- **Registro:** `hr.payslip` id **10055**, CTS de noviembre de 2025 de «Vendedor COMERCIO con ingreso a mitad de semestre» (K9, 70006309).
- **Vista:** Imprimir › **«Liquidación de depósito de CTS (PE)»** (el PDF).
- **Qué debe verse:** sueldo 1,500.00, variables 70.09 con el divisor «÷ 3.5667 (107 días ÷ 30)», computable 1,570.09, cómputo del 15/07/2025 al 31/10/2025 (3 meses y 17 días), monto 466.67 y el monto en letras con «SOLES».
- **Resaltar:** el divisor «3.5667 (107 días ÷ 30)». Compañía sin RUC: el PDF sale sin RUC (es de laboratorio).

### c20_03_reparto_guardado (cap. 20.4)
- **Compañía:** SOLSE Demo Servicios S.A.C. (id 4).
- **Registro:** `solse.pe.utilidades` id **87**, «Utilidades 2031 · SOLSE Demo Servicios S.A.C.», confirmado (caso UTILIDADES_REPARTO).
- **Menú:** Nómina › Nómina PE › Reparto de utilidades › abrir el reparto 2031.
- **Qué debe verse:** estado Confirmado, ejercicio 2031 (sin coma), renta neta 5 000 000,00, 5 %, monto 250 000,00, remuneración del tope «Vigente al cierre, con la asignación familiar», fecha de pago 30/04/2032, totales (783 días, 192 000,00, remanente 11 104,17) y la lista de las tres líneas (a pagar 54 000,00, 80 729,17 y 104 166,67; la de 70002502 marcada «Ex trabajador»). Botones «Volver a borrador», «Trabajadores».
- **Resaltar:** el remanente y la ex trabajadora.

## Rehacer (mismo nombre)

### c20_01_reparto_utilidades (cap. 20.4)
- La del v2 muestra el ejercicio «2,025» (con coma; lote 59) y era el asistente abierto directo desde el menú (ahora el menú abre la lista; lote 21b).
- **Compañía:** SOLSE Demo Pequeña Empresa S.A.C. (id 12). Menú Nómina › Nómina PE › Reparto de utilidades › botón **«Calcular un ejercicio»**.
- **Qué debe verse:** el asistente con Ejercicio (año) **2026**, Renta neta anual 100 000,00 y Porcentaje «5% - Otras actividades». **No pulsar «Calcular reparto»** (crearía un reparto guardado): capturar con los valores escritos y cerrar.

### c20_02_entradas_lista y c20_02_entradas_calculo (cap. 20)
- Las del v2 son del trabajador sintético borrado y muestran MOV_001 como «Movilidad de libre disposición» (desde el lote 14 MOV_001 es «Movilidad supeditada a la asistencia»).
- **Compañía:** SOLSE Demo Comercio S.A.C. (id 14). **Registro:** `hr.payslip` id **10045**, mensual de junio de 2026 de «Vendedora COMERCIO con horas extras» (K1, 70006301).
- **c20_02_entradas_lista:** pestaña «Días trabajados y entradas», bloque «Otras entradas»: HE25_001 10,00, HE35_001 4,00, TARD_001 60,00.
- **c20_02_entradas_calculo:** pestaña «Cálculo de la nómina»: RB_001 1 800,00, HE25_001 93,75, HE35_001 40,50, GROSS 1 934,25, TARD_001 7,50, BAR5_001 1 926,75, ONP 250,48, ESSALUD 173,41, NET 1 676,27.

### c15_02_liquidacion_deposito_cts (cap. 15.2)
- La del v2 tiene los importes sin separador de miles y el monto en letras en «SOL» (lotes 59 y 38).
- **Compañía:** FM SYSTEMS (id 1). **Registro:** `hr.payslip` id **140** (SLIP/100), CTS de noviembre de 2026 de Lucía. Imprimir › «Liquidación de depósito de CTS (PE)».
- **Qué debe verse:** computable 5,391.83 (4,500.00 + 123.00 + 768.83), periodo 01/05/2026–31/10/2026, monto 2,695.92 y «… SOLES …».
- **Ofuscar:** el RUC y el domicilio de FM y el número de la cuenta CTS.

### c13_04_certificado_renta5_lucia_2025 (cap. 13.7)
- La del v2 tiene los importes sin separador de miles (lote 59) y muestra el RUC y el domicilio reales de FM.
- **Compañía:** FM SYSTEMS. Nómina PE › Certificado de 5.ª categoría, ejercicio 2025, trabajadora Lucía; vista previa del PDF.
- **Qué debe verse:** renta bruta 65,412.34; deducción (37,450.00); renta neta 27,962.34; impuesto y retención 2,309.73.
- **Ofuscar:** RUC y domicilio de FM.

## Se reutilizan sin cambios
c13_01, c13_02, c13_03, c14_01, c15_01, c17_01 a c17_07 (boletas validadas que los lotes 13 a 71 no recalcularon; FM idéntica en las re-mediciones).
