# Re-medición del lote 1 de mejoras (contable19, 2026-10-12)

Versiones instaladas: solse_pe_payroll_base 19.0.1.8.2 · solse_pe_payroll_ce 19.0.1.9.4 · solse_pe_payroll_ce_demo 19.0.2.5.0.

| Qué (tabla «Entrega del lote 1») | Esperado | Medido | Resultado |
|---|---|---|---|
| Laboratorio NOMINA | 100 %; Ana AFP_PRI_001 173,62 y NET 11 838,63 | 100 %; 173,62 y 11 838,63 | OK |
| Laboratorio ASISTENCIA | 100 % | 100 % | OK |
| Laboratorio PLAME-RXH y PLAME | 100 % | **No corren**: falla «sembrar» de PLAME-RXH con `Wrong value for account.move.nd_exoneracion: '00'` | BLOQUEADO (fuera del lote, ver abajo) |
| TXT BCP haberes dic-2026 | Lucía «2A» con su cuenta y «S»; mayúsculas sin tildes; ASCII | `2A19199999901001 … LUCIA FERNANDA RAMOS TICONA … 3825.96S`; Héctor 2B por CCI (Interbank); ASCII sí | OK |
| TXT BCP CTS nov-2026 | 1 línea + «Omitidos (1)» con Héctor (Interbank) | 1 línea Lucía 2 695,92 + «Omitidos (1) por S/ 1283.33 — NO van en el archivo» + banda roja | OK |
| Trabajador sin cuenta de sueldo | TXT con los demás + omitidos; con «Modo estricto», error con la lista | TXT con Lucía (3 825,96) + omitido Héctor 1 914,00; estricto: error con la lista | OK |
| Scotiabank | formato propio, banda amarilla, «AÚN NO ESTÁ VALIDADO» | formato propio (no 0104), banda amarilla y aviso | OK |
| RMV «1,230» | «Use punto decimal y sin separador de miles…» | mensaje exacto; además «-5», tasa «13» y comisión incompleta rechazados; valores válidos se guardan | OK |
| Boleta AFP ene-2025 sin carga manual | calcula | las vigencias 2025 vienen ahora de la data (xmlid `param_pe_afp_comision_flujo_2025`, `param_pe_afp_rma_2025t1…`); la copia de ene-2025 calcula | OK (no se probó una base nueva) |
| ASF_001 oct-2026 | 123,00 | 123,00 | OK |
| RMA vigente hoy | 12 732,70 desde 2026-10-01 | 12 732,70 (8 vigencias trimestrales 2025-2026) | OK |
| anio_completo_fm.json | sin diferencias | 64 boletas recalculadas en copias borrador: 0 diferencias (copias borradas) | OK |
| Log «C-02:» / «V-01:» | revisar | sin acceso al log del servidor; las vigencias manuales de contable19 quedaron adoptadas (tienen xmlid, sin duplicados) y no hay actividades V-01 en los parámetros | revisar el log en el servidor |

## Bloqueo de PLAME-RXH (no es del lote de nómina)

En la misma actualización subió `solse_pe_sire_compra_8_5` de 19.0.2.4 a 19.0.2.5 y su tabla 33
(`nd_exoneracion`, «Exoneración aplicada») pasó de `00/01` a `1…6`. `solse_pe_plame_rxh_demo` 19.0.2.2.0
(`wizard/plame_demo_sembrar.py:527`) sigue sembrando `'nd_exoneracion': '00'` para el prestador no domiciliado.
Consecuencia: PLAME-RXH no siembra y PLAME (que lo requiere) tampoco corre. El «limpiar» previo borró los
datos de PLAME-RXH del laboratorio.

Evidencias: archivos TXT en esta carpeta; `remedicion_anio_completo.json`; capturas
`p21_06_bancos_cts_resultado.png` y `p21_07_bancos_scotiabank_resultado.png`.

## Re-intento tras la actualización de módulos (2026-10-12, 21:40)

- Versiones: `solse_pe_plame_rxh_demo` sigue en 19.0.2.2.0; `solse_pe_sire_compra_8_5` 19.0.2.5; `solse_pe_demo_libros` 19.0.1.38; nómina sin cambios (base 19.0.1.8.2, ce 19.0.1.9.4).
- PLAME-RXH: «Sembrar» sigue fallando con `Wrong value for account.move.nd_exoneracion: '00'`. La selección vigente es `1…6` (tabla 33). H-19 **no está corregido**.
- PLAME: no corre porque depende de que PLAME-RXH esté sembrado.
- Log «C-02:» / «V-01:»: no hay rastro en `ir.logging` ni en `mail.message`; solo se escriben en el log del servidor (no accesible desde la sesión).
- Además, `nd_modalidad_servicio: '02'` del mismo diccionario tampoco es válido: la selección vigente es `1/2/3` («3 - exclusivamente en el extranjero»). Odoo solo informa el primer error, así que al corregir `nd_exoneracion` fallaría por este.
