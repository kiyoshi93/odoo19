# Remedición de los lotes EE-0 y EE-1a — nómina Enterprise

- **Base medida:** `mkbOctubre`, base local de Gabriel, vía https://stainable-writing-frequent.ngrok-free.dev, el 2026-10-24.
- **Forma de medir:** solo lectura (RPC y navegador). No se instaló, validó, guardó ni canceló nada.
- **Prueba de RMV:** la única edición fue la pedida en el punto 3. Se descartó, y luego se comprobó por datos que no se guardó.

## Resumen

| Punto | Estado | Detalle |
|---|---|---|
| 1. Versiones | **OK parcial** | `solse_pe_payroll` 19.0.1.1.4 instalado. **`solse_pe_payroll_demo` no está instalado** (código 19.0.1.5.2 disponible). |
| 2. Log del `-u` | **PENDIENTE** | Requiere consola: se lo pido a Gabriel. |
| 3. Parámetros | **OK** | 24 parámetros con tipo, ninguno «Libre»; vigencias de RMV, AF, RMA y comisión según lo esperado; «1 230» rechazado con el mensaje de V-01. |
| 4. Tablero | **OK** | Sin el aviso de vigencias mal escritas. |
| 5. Laboratorio | **NO MEDIBLE** | Sin `solse_pe_payroll_demo` no existe el menú Laboratorio ni los casos. |
| 6. Q-01 | **NO MEDIBLE** | El asistente «Datos de prueba (demo)» es de `solse_pe_payroll_demo`. |
| 7. Script de impacto | **PENDIENTE** | Requiere `odoo-bin shell`. Se adelantan conteos por RPC. |

## 1. Versiones

- **Odoo:** `19.0+e-20260312`. Leído de `server_version` en la sesión: 19, 0, 0, final, 0, e.

| Módulo | Estado | Versión instalada |
|---|---|---|
| `solse_pe_payroll` | installed | **19.0.1.1.4** (esperada 19.0.1.1.4) |
| `solse_pe_payroll_demo` | **uninstalled** | — (código disponible 19.0.1.5.2) |
| `solse_pe_payroll_renta5` | installed | 19.0.1.0.0 |
| `solse_pe_payroll_catalogo` | installed | 19.0.0.2 |
| `hr_payroll` | installed | 19.0.1.0 |
| `solse_pe_payroll_asistencia_ee` y su demo | uninstalled | — |
| `solse_pe_plame_ee_demo` | uninstalled | — |
| `solse_pe_demo_suite_ee` | uninstalled | — |

**No es DESP-1:** ninguna versión instalada es menor que la entregada. El problema es otro: el encargo da `solse_pe_payroll_demo` por instalado («antes 19.0.1.1.0»), pero en esta base nunca lo estuvo. Por eso los puntos 5 y 6 no se pueden medir. Instalarlo es decisión de Gabriel y de la línea principal; el encargo pide no instalar.

## 2. Log del `-u solse_pe_payroll,solse_pe_payroll_demo`

PENDIENTE. Gabriel debe adjuntarlo. Se esperan estas líneas:

- `Running migration [>0.0.0] pre-migrate`
- `Running migration [$19.0.1.0.0] end-migrate`
- `C-02: N vigencia(s) del cliente adoptada(s).`
- `V-01: N vigencia(s) inválida(s) entre las guardadas.`

Si el `-u` incluyó `solse_pe_payroll_demo` estando desinstalado, Odoo no lo actualiza; conviene confirmarlo en el log.

## 3. Parámetros — OK

- **24 parámetros PE:**
  - monto 5;
  - tasa 16;
  - comisión por AFP 1;
  - tramos de renta 1;
  - factores por régimen 1.
- **En «Libre»:** ninguno. Captura: `p3_lista_parametros.png`.

| Parámetro | Vigencias medidas | Esperado | Estado |
|---|---|---|---|
| RMV (`pe_rmv`) | 2025-01-01 = 1130 · **2026-10-01 = 1230** | 1230 desde 01/10/2026 | OK |
| Asignación familiar (`pe_asig_familiar`) | 2025-01-01 = 113.0 · **2026-10-01 = 123.0** | 123.0 desde 01/10/2026 | OK |
| RMA AFP (`pe_afp_rma`) | 2025-01-01 12027.91 · 2025-04-01 12137.47 · 2025-07-01 12184.88 · 2025-10-01 12178.56 · 2026-01-01 12209.11 · 2026-04-01 12598.91 · 2026-07-01 12672.65 · **2026-10-01 12732.70** | una por trimestre desde 2025; la de 01/10/2026 = 12732.70 | OK |
| Comisión sobre el flujo (`pe_afp_comision_flujo`) | 2025-01-01 y 2026-01-01 (habitat 0.0147 · integra 0.0155 · prima 0.0160 · profuturo 0.0169) | vigencias desde 2025 y 2026 | OK |

**Prueba V-01:** en la RMV se agregó la vigencia 01/01/2030 con `1 230` y se pulsó Guardar. Respuesta:

> Error de validación — Parámetro «RMV - Remuneración Mínima Vital» (pe_rmv), vigencia desde 01/01/2030: Use punto decimal y sin separador de miles: escriba «1 230» sin espacios ni comas entre las cifras. Ejemplo: 1230 · 5500 · 12672.65

- Salió el mensaje de V-01, no «invalid syntax» (REV-3 OK).
- Se descartó el cambio. Por RPC, la RMV sigue con sus dos vigencias (2025-01-01 y 2026-10-01).
- Capturas: `p3_rmv_error.png` y `p3_rmv_descartado.png`.

## 4. Tablero de Nómina — OK

- No aparece «Vigencias de parámetros de Nómina PE con un valor mal escrito».
- Solo están las advertencias nativas: empleados sin contrato activo (4), sin cuenta bancaria (7) y sin número de identificación (4).
- Captura: `p4_tablero.png`.
- Es coherente con V-01 = 0, pero se confirma con el log del punto 2.

## 5. Laboratorio — NO MEDIBLE

No hay ningún menú «Laboratorio», «Datos de prueba» ni «Sincronizar casos» (búsqueda en `ir.ui.menu`). Hace falta `solse_pe_payroll_demo` instalado.

## 6. Q-01 — NO MEDIBLE

- El asistente «Datos de prueba (demo)» no existe sin `solse_pe_payroll_demo`.
- La base sí tiene dos compañías reales:
  - compañía 1, con RUC de persona jurídica;
  - compañía 2, con RUC de persona natural.
- Ninguna tiene marca de laboratorio, así que el caso aplica en cuanto el módulo esté instalado.

## 7. Efecto en la base

PENDIENTE: la salida de `medir_impacto_ee1a.py` la debe correr Gabriel. Lo que se pudo contar por RPC (solo conteos):

| Compañía | Boletas por estado | Desde 10/2026 | En borrador desde 2025 |
|---|---|---|---|
| 1 | validated 6 (julio y agosto de 2026, trabajadores de prueba 9999…) | 0 | 0 |
| 2 | ninguna | 0 | 0 |

- No hay boletas de octubre de 2026 en adelante ni borradores que pudieran cambiar al recalcular.
- Las 6 boletas validadas no cambiaron:
  - netos 3 149,09 · 983,10 · 6 821,00 (julio) y 3 149,09 · 983,10 · 6 852,76 (agosto);
  - el detalle de 5ta de `solse_pe_payroll_renta5` sigue en «Coincide con la boleta» en las 6.

## Pendiente de Gabriel

1. El log del `-u` (punto 2).
2. La salida de `odoo-bin shell -c <conf> -d mkbOctubre --logfile=/dev/null < medir_impacto_ee1a.py` (punto 7).
3. Decidir si se instala `solse_pe_payroll_demo` (19.0.1.5.2) en esta base para medir los puntos 5 y 6, o si esa medición se hace en otra base que ya lo tenga.
