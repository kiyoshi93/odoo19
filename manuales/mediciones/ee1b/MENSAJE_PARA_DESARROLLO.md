Remedición del lote EE-1b en `demoContable` (https://148.113.151.40.sslip.io): **todo OK**. Puedes continuar con el siguiente lote.

| Punto | Resultado |
|---|---|
| 1. Versiones | OK: `solse_pe_payroll` 19.0.1.5.3 · `solse_pe_payroll_demo` 19.0.1.5.3 |
| 2. Log del `-u` | OK: ningún ERROR de nómina; salen las líneas de upgrade, «C-02: 0 vigencia(s)…», C-31 y C-07. Los 49 ERROR son de otros módulos (`mkb.*`, `smigracion.*`, `ai.embedding`, `solse_multi_barcodes`) |
| 3. Configuración | OK: LEAVE90 no pagado en NME y NSO (junto con VACPE100, FALTA y FALTA_PARCIAL); Régimen General y Quincenal → NME, Obreros → NSO, Beneficios y General sin estructura, General al final (secuencia 90); C-23 = «Omitir» |
| 4. Laboratorio | NOMINA 100 % (366) · ASISTENCIA 100 % (68) · PLAME-RXH 99,01 % (H-7) · PLAME 100 % (95) |
| 5. TXT del BCP | OK: `ABONO_BCP_SUELDO_202607.txt`, 1 cabecera y 12 «2A», ningún «2B»; total S/ 38357.44 igual en el resumen y la cabecera; omitidos vacío; ASCII y nombres en mayúsculas |
| 6. Script de impacto | OK: H-2 sin cambios de cuenta; H-4 con 0 ausencias por diferir; 5 borradores sin cambio |

- **Ana, julio de 2026:** AFP_PRI_001 173,62 y NET 11 838,63.
- **H-3:** 9 trabajadores en Régimen General, 2 en Quincenal y 2 en Obreros.

**Para que lo revises:**
1. **Texto del log.** Odoo 19 escribe «Running **upgrade** [>0.0.0] pre-migrate», no «Running migration». Ajusta el texto en los próximos encargos. Revisé el log de EE-0/EE-1a y ahí no estaba ninguna de las dos formas, así que lo informado entonces sigue en pie.
2. **H-5.** El script cuenta 21 mensuales validadas antes del `-u` con sus entradas en borrador. Es el cambio de comportamiento anunciado. Las boletas validadas después de la nueva siembra ya dejan sus entradas validadas: 335 validadas, 172 en borrador y 1 cancelada.
3. **Responsable de ausencias diferidas.** No está configurado en ninguna de las 5 compañías, así que la actividad de H-4 iría al administrador. Conviene que el laboratorio lo configure al construir, o que el manual lo indique.
4. **Caso nuevo.** Al sincronizar aparece **ANTICIPOS** (pendiente). No lo medí porque el encargo no lo pide.
5. **D-6.** Los 13 trabajadores de NOMINA siguen sin DNI 9999…, pendiente de decisión.
6. **Detalle del TXT.** Las únicas minúsculas son los textos fijos del formato del BCP, «Referencia Beneficiario» y «Ref Emp». Los nombres sí van en mayúsculas. Si C-12 debe abarcar también esos textos, es un ajuste menor.

**En el ZIP:**
- el informe `REMEDICION_EE1B.md`;
- el log del `-u` y la salida de `medir_impacto_ee1b.py`;
- los 4 Excel de comparación (el de NOMINA y el de PLAME-RXH son los pedidos);
- la captura de la pestaña «Nómina PE - Controles».

El TXT del BCP no va en el ZIP porque tiene cuentas y DNI de la demo.
