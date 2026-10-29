Medición del lote EE-3 con su revisión en `demoContable`: **OK**. Solo falta que Gabriel vuelva a correr `medir_impacto_ee3.py` después de los casos.

Medido con el administrador sin superusuario y la compañía «servicios» activa. No se cambió nada.

| Punto | Resultado |
|---|---|
| 1. Versiones | OK: las cinco con la versión de la tabla; `catalogo` 19.0.0.3 y `plame_ee_demo` 19.0.1.1.1 sin cambio |
| 2. Log del `-u` | OK: ningún ERROR de nómina; «H-1 (EE-3): advertencias recalculadas en 1 boleta(s) en borrador; con «danger» ahora: 1» → **N = 1, M = 1** |
| 3. `medir_impacto_ee3.py` antes | OK: 3 R5TA_001 con C-03, C-11 y C-10; 42 bases sin ninguna «sin restar DA_001»; TARD_001 y TAR_001 en DA_001, 101 y 102, 0704; RB_001 2 de 2; V-04 «aviso»; acción de C-18 existe; **1 «C-18 sin importes»** en Servicios (adelanto viejo de Teresa) |
| 3. `medir_impacto_ee3.py` después | **Pendiente** de la corrida de Gabriel. Por RPC, Servicios tiene 5 borradores (el adelanto nuevo de Teresa y las 4 de ASISTENCIA), todos con 0 errores y 0 avisos |
| 4. Criterios | OK: `criterios_ee3.py` **47 criterios, 0 fallas** · `criterios_ee3_rev.py` **15 criterios, 0 fallas** |
| 5. Laboratorio | OK: NOMINA 100 % (366) · ASISTENCIA 100 % (**83**) · PLAME-RXH 99,01 % (las 2 de H-7: 8 esperado / 9 obtenido) · PLAME 100 % (95) |
| 6. TXT del BCP de julio | OK: 1 cabecera y 12 «2A», ningún «2B»; S/ 38357.44 en el resumen y la cabecera; sin omitidos; ASCII |
| 7. Pantallas | OK: «Nómina PE - Controles», grupo Boleta, con los dos controles en «Avisar» · adelanto de Teresa en borrador con ADEL_001 1 800,00 y sin advertencia roja · septiembre de Carlos con TAR_001 10,94, BAR5_001 3 602,06, AFP_APO_001 360,21, ESSALUD_001 324,19 y «Tardanzas del mes» 10,94 |

**Observación menor:** en `medir_impacto_ee3.py`, el bloque de boletas y controles V-04 solo lista «SOLSE Demo Servicios S.A.C.», no cada compañía como dice el encargo. Si debe mostrar los controles de todas las compañías, hay que ajustar el script.

**En el ZIP:**
- el informe `REMEDICION_EE3.md`;
- el log del `-u`;
- la salida de `medir_impacto_ee3.py` antes de los casos;
- la salida de los dos criterios;
- las 4 capturas del punto 7;
- `COMPARACION_PLAME-RXH.xlsx`, el único caso que no sale al 100 %.
