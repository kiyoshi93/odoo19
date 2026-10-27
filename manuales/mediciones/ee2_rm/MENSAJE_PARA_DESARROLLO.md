Remedición de la corrección de EE-2 (RM-1 y RM-2) en `demoContable`: **OK**. Queda una observación sobre la T12.

Medido con el administrador (id 2) sin superusuario, igual que el botón del Laboratorio.

| Punto | Resultado |
|---|---|
| 1. Versiones | OK: `solse_pe_payroll` 19.0.1.16.5 · `solse_pe_payroll_demo` 19.0.1.6.5; las otras 4 sin cambio |
| 2. Log del `-u` | OK: ningún ERROR de nómina; solo la `[>0.0.0] pre-migrate` de siempre; dos veces «Nómina PE: inicialización de estructuras completada.» |
| 3. Laboratorio | OK: NOMINA 100 % (366) · ASISTENCIA 100 % (68) · PLAME-RXH 99,01 % (H-7) · PLAME 100 % (95). **RM-1 OK**: Sembrar de NOMINA ya no da AccessError |
| 4. TXT del BCP | OK: 1 cabecera y 12 «2A», ningún «2B»; S/ 38357.44 en el resumen y la cabecera; omitidos vacío; ASCII |
| 5. Ficha (RM-2) | OK con observación: Carlos (99998001) con fecha de nacimiento, edad 38, régimen de salud «[01] ESSALUD REGULAR Y EPS/SERV. PROPIOS» y situación educativa «[13] EDUCACIÓN UNIVERSITARIA COMPLETA (4)» |

**Detalle de NOMINA:**
- DNI exactamente 99998001 a 99998013;
- Ana, julio: AFP_PRI_001 173,62 y NET 11 838,63;
- boletas «Boleta de Pago - …» (13 mensuales y 8 semanales), «Adelanto Quincenal - …» (2) y «Boleta de Gratificación - …» (10).

**Para que lo revises:**
1. **T12 sin pantalla en la ficha.** El campo «Tipo de contrato (T12)» (`hr.version.labor_condition_id`) tiene el valor sembrado, «[01] A PLAZO INDETERMINADO - D.LEG. 728». Pero solo está en la vista de plantillas de contrato (`hr.contract.template.view.form.inherit.solse_pe_payroll`). No aparece en la ficha del empleado, en ninguna de sus 7 pestañas, ni en «Registros de los empleados», cuya columna «Tipo de contrato» es el nativo `contract_type_id`. El usuario no puede ver ni editar la T12 de un trabajador. Propuesta: agregarlo en la pestaña «Nómina» o «Nómina PE» de la ficha.
2. **Cuentas en la pestaña «Nómina PE»** (menor). «Cuenta sueldo», «Banco sueldo», «Cuenta CTS» y «Banco CTS» salen vacíos en los trabajadores de la demo, aunque tienen sus 2 cuentas en el contacto. El TXT las toma bien (H-2), pero la ficha no las muestra.

**En el ZIP:**
- el informe `REMEDICION_EE2_RM.md`;
- el log del `-u`;
- los 4 Excel de comparación;
- las capturas de la ficha de Carlos.
