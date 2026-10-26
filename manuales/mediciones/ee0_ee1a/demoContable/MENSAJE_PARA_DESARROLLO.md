Remedición de los lotes EE-0 y EE-1a: **todo OK**. Puedes continuar con los siguientes lotes.

**Dónde se midió:** el entorno de pruebas cambió. Ya no es la base local por ngrok, sino `demoContable` en https://148.113.151.40.sslip.io (Odoo 19.0 EE). En ese servidor está también la base `demoEE`.

**Versiones:** `solse_pe_payroll` 19.0.1.1.4 y `solse_pe_payroll_demo` 19.0.1.5.2. No es DESP-1.

**Qué se hizo además de lo pedido** (con autorización de Gabriel):
- se construyó el laboratorio (① Construir), que estaba vacío;
- se instalaron `solse_pe_plame_ee_demo`, `solse_pe_plame_4ta_ee`, `solse_pe_plame_rxh` y `solse_pe_plame_rxh_demo`, para poder correr PLAME y PLAME-RXH.

| Punto | Resultado |
|---|---|
| 1. Versiones | OK |
| 2. Log del `-u` | OK: ningún ERROR de nómina; los 57 ERROR son de otros módulos de la base |
| 3. Parámetros | OK: 24 con tipo, ninguno «Libre»; RMV 1230 y AF 123.0 desde 01/10/2026; RMA 12732.70; comisión 2025 y 2026; «1 230» da el mensaje de V-01 |
| 4. Tablero | OK: sin el aviso de vigencias mal escritas |
| 5. Laboratorio | NOMINA 100 % (366) · ASISTENCIA 100 % (68) · PLAME-RXH 99,01 % (H-7) · PLAME 100 % (95) |
| 6. Q-01 | OK: aviso de compañía real; solo «4. Validación interna» |
| 7. Script de impacto | OK: 0 vigencias inválidas, ninguna manual, 0 boletas desde 10/2026, 5 borradores sin cambio |

- **Ana, julio de 2026:** AFP_PRI_001 = 173,62 y NET = 11 838,63, iguales a lo esperado.
- **E-06:** ningún trabajador con «General».

**Para que lo revises:**
1. **Líneas de migración ausentes en el log.** No aparecen «Running migration», ni «C-02: N vigencia(s)…», ni «V-01: N vigencia(s)…». Cuando corrió el `-u`, la base ya estaba en 19.0.1.1.4, así que Odoo no repitió las migraciones. Los datos confirman C-02 y V-01: todas las vigencias tienen su xmlid y hay 0 inválidas. Si necesitas ver esas líneas, que salgan en el próximo cambio de versión.
2. **DNI de los trabajadores de laboratorio.** Los 13 trabajadores que siembra NOMINA tienen DNI de 8 dígitos que no empiezan con 9999, aunque el encargo dice que las pruebas usan DNI 9999… Confirma que son ficticios; si no, conviene cambiarlos a sintéticos (es el mismo caso que H-MAN-1).
3. **PLAME-RXH.** Las 2 celdas distintas son del «Diagnóstico»: «3 · con algún pago registrado» y «3c · search: + payment_state», con 8 esperado y 9 obtenido. Es el 99,01 % conocido por H-7.

**En el ZIP:**
- el informe `REMEDICION_EE0_EE1A.md`;
- los 4 Excel de comparación;
- el log del `-u` y la salida de `medir_impacto_ee1a.py`;
- las capturas de los puntos 3, 4 y 6;
- `LIMPIEZA_LOG_demoContable.md`, con los avisos ajenos a nómina que hay que limpiar en el servidor de pruebas. Es solo informativo.
