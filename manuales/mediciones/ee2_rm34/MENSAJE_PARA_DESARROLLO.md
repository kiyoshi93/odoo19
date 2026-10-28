Remedición de RM-3 y RM-4 en `demoContable`: **todo OK**. Puedes continuar.

| Punto | Resultado |
|---|---|
| 1. Versión | OK: `solse_pe_payroll` 19.0.1.16.7; las otras cinco sin cambio |
| 2. Log del `-u` | OK: ningún ERROR de nómina; «Nómina PE: inicialización de estructuras completada.» |
| 3. Ficha de Carlos (99998001) | OK: **RM-3**: en «Nómina» aparece el grupo «Perú - Datos laborales (T-Registro / PLAME)» con los 15 campos; T12 «[01] A PLAZO INDETERMINADO - D.LEG. 728» y Régimen Laboral «D LEG N.° 728». **RM-4**: en «Nómina PE», «Cuenta sueldo» con valor y «Banco sueldo» = Banco De Credito Del Peru; «Cuenta CTS» con valor y «Banco CTS» = INTERBANK |
| 4. NOMINA | OK: 100 %, 366/366 celdas, 6/6 estructuras |

Medido con el administrador sin superusuario y la compañía «servicios» activa. No se cambió nada en la ficha.

**En el ZIP:**
- el informe `REMEDICION_EE2_RM34.md`;
- el log del `-u`;
- las capturas de las pestañas «Nómina» y «Nómina PE», con los números de cuenta tapados.
