Remedición del lote EE-2 en `demoContable`: **hay una FALLA que bloquea el Laboratorio**. Lo demás está OK.

**La falla:** «Sembrar» de NOMINA da `AccessError`:

> Administrador (id=2) no tiene acceso 'leer' a: Tipo de estructura salarial (hr.payroll.structure.type)

Traza:

```
demo_caso.py:406 accion_sembrar → seeder_nomina.py:248 → inicializador.inicializar_todo()
→ inicializar_estructuras.py:418 inicializar_todo → inicializar_estructuras.py:355 ordenar_tipos_genericos (U-10)
→ fetch de hr.payroll.structure.type → AccessError
```

- **Causa:** la regla nativa «HR Payroll Structure Type: Multi Company» oculta los tipos belgas (CP200 BE y CP200 PFI BE), porque ninguna compañía es de Bélgica. `ordenar_tipos_genericos` los lee sin `sudo()`. En el `-u` no falla porque corre como superusuario; desde el Laboratorio, o cualquier `inicializar_todo()` de un usuario normal, sí.
- **Corrección sugerida:** `sudo()` en la búsqueda y escritura de `ordenar_tipos_genericos`, o limitarla a los tipos PE y a los genéricos sin país.
- **Efecto:**
  - ASISTENCIA y PLAME no corren («hay que sembrar NOMINA»);
  - no se puede generar el TXT del BCP;
  - «Limpiar» sí corrió, así que la compañía «servicios» del laboratorio quedó sin trabajadores ni boletas.

| Punto | Resultado |
|---|---|
| 1. Versiones | OK: las seis versiones entregadas |
| 2. Log del `-u` | OK: ningún ERROR de nómina; salen U-04, Q-02, las tres de U-06 (nombres y los dos «Validate traducido») y las tres de D-6 (13 versiones y 26 cuentas en 1 compañía; 8 comparaciones borradas, 1272 líneas; 6 CUSPP); ningún WARNING de «no es compañía del laboratorio»; docutils solo de `asistencia_ee` (R-9 OK) |
| 3. Pantallas | OK: U-02 (Empleado primero, agrupada por trabajador), U-03 («Estructuras peruanas»), U-10 (PE primero, «sin planilla PE» al final), maestros con columna Código, tablero sin aviso H-6 (0 contratos, igual que el script) |
| 4. Laboratorio | **FALLA**: NOMINA no siembra (AccessError); PLAME-RXH 99,01 % (H-7) |
| 5. TXT del BCP | NO MEDIBLE: no hay boletas de NOMINA |
| 6. Script de impacto | OK: ningún «modelo,id», «Cónyugue» 0, T12-20 archivado, contextos y nombres de boleta, «Validar», menús U-09, tipos por secuencia, edad entera, H-6 en 0, D-6 con 13 sintéticos y 0 anteriores, chatter 0 |

**Observación de la demo (U-04/U-11):** los 13 trabajadores sembrados no tienen fecha de nacimiento, régimen de salud, situación educativa ni T12. En su ficha esos campos salen vacíos y la edad en 0, así que el «[código] descripción» no se puede ver en pantalla, aunque el script lo confirma en los maestros. Conviene que la siembra complete esos datos.

**Con la corrección entregada:** repito los puntos 4 y 5, incluidos los DNI 99998001 a 99998013 y las boletas «Boleta de Pago - …» en el detalle de NOMINA.

**En el ZIP:**
- el informe `REMEDICION_EE2.md`;
- el log del `-u` y la salida de `medir_impacto_ee2.py`;
- `COMPARACION_PLAME-RXH.xlsx`;
- las capturas de las pantallas.
