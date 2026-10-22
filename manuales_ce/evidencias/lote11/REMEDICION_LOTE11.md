# Re-medición del lote 11 de nómina CE — contable19

- **Fecha:** 2026-10-22, de 11:58 a 12:20 (hora del servidor).
- **Alcance:** solo medición.
- **Escrituras:** solo las corridas de los 14 casos del laboratorio y los asistentes transitorios del T-Registro de SOLSE Demo (9 envíos de modificaciones y 2 de derechohabientes). En FM solo se leyó: el asistente de altas de derechohabientes se abrió para contar sus propuestas, pero no se generó.
- **Línea de prueba:** la línea nueva de derechohabiente se descartó sin guardar. 70001502 sigue con 3 parientes.

## Despliegue

Hubo dos `-u` del lote 11:

| `-u` | Carpeta que cargó `solse_pe_payroll_ce` | ce instalado | |
|---|---|---|---|
| 11:15 (`log_u_lote11_1115.txt`) | `/opt/odoo19/solse_peru_cpe/` | 19.0.1.26.2 (lote 10) | DESP-1 |
| 11:49 (`log_u_lote11_1149.txt`) | `/opt/odoo19/solse_peru_contabilidad/` | **19.0.1.27.1** | OK |

La medición se hizo sobre el segundo `-u`, el de las 11:49 (ver O-51).

## Resultado

| # | Qué | Esperado | Medido | |
|---|---|---|---|---|
| 1 | Versiones | base 19.0.1.20.1 · ce 19.0.1.27.1 · ce_demo 19.0.2.25.1; asistencia 19.0.1.3.2 y plame_demo 19.0.1.4.1 sin cambio | Iguales. ce_demo con `write_date` 2026-10-22 11:49 | OK |
| 2 | Log del `-u` | Sin ERROR; «Cuentas CE: 0 asignaciones»; tres líneas «Nómina PE (N-02 fase 2): parentesco … con el código 02 / 03 / 05 de la Tabla 19» | **0 ERROR** y 0 CRITICAL. «Cuentas CE: **0** asignaciones» en las 8 pasadas. Termina en «Modules loaded» y «Registry loaded». **Faltan las tres líneas de la N-02 fase 2**: no hay ninguna «Running migration» en el log. El efecto sí está en la base: Cónyuge **02**, Pareja **03**, Hijo(a) **05** y Gestante **04** (ver O-52) | **FALLA** (solo el log) |
| 3 | Sin recalcular | Boletas de FM idénticas al lote 10; Lucía R5TA 2025 = 2 309,73 y 2026 = 2 160,78 | Las 64 boletas son idénticas al lote 10 (líneas, días, estado y asiento): 0 distintas, 0 faltantes, 0 nuevas. Sumas: **2 309,73 / 2 160,78** | OK |
| 4 | Sincronizar y correr los 14 casos | Todos al 100 %; los 13 de siempre con las mismas celdas; TREGISTRO 262 con el nombre nuevo | Nombre: «Nómina — archivos de la carga masiva del T-Registro (**altas, bajas, modificaciones y derechohabientes**)». PLAME-RXH 202 · NOMINA 525 · PLAME 121 · BOLETA 166 · BANCOS 407 · MICRO 83 · UTILIDADES 33 · AUMENTO 66 · SUBSIDIOS 344 · CESE 149 · INDEMNIZACION 63 · VIDALEY 58 · **TREGISTRO 262** (Archivos 244, Diagnóstico 18) · ASISTENCIA 73. Los 13 de siempre tienen el mismo desglose por estructura que el lote 10. Todos al 100 % | OK |
| 5 | Modificaciones (9 envíos, fecha del cambio 16/10/2026) | Ver la tabla del punto 5 | Las 9 coinciden línea por línea | OK |
| 6 | Derechohabientes, octubre de 2026 | ALTA con 4 líneas de 46 campos; 71001502 no se exporta; 40001510 no aparece; BAJA con 1 línea | Ver el punto 6 | OK |
| 7 | PVS | Lo hace Gabriel | No corresponde a esta sesión | Pendiente (Gabriel) |
| 8 | Interfaz | Columnas nuevas; la línea nueva trae el alta con la fecha de hoy; T19; edad 36 entera | Ver el punto 8 | OK |
| 9 | Impacto en FM (solo conteos) | Ninguno con fecha de alta; el asistente de altas propone 0 | Derechohabientes: **3**, todos «Hijo(a)». Con fecha de alta: **0**. Altas de derechohabientes del 01/01/2000 al 22/10/2026: **0 propuestos** | OK |
| 10 | O-31 | Sin versión antes y después | Antes **0 de 136**; después **0 de 136** | OK |

**Resultado del lote 11: 8 puntos OK, 1 FALLA de log (punto 2, sin efecto en los datos) y 1 a cargo de Gabriel (PVS).**

### Punto 5 · Modificaciones (SOLSE Demo, fecha del cambio 16/10/2026)

Todos los archivos van en CRLF. «Propuesto» indica si el asistente lo trajo solo; si no, se añadió a mano.

| Envío | Trabajador | Propuesto | Archivos | Contenido |
|---|---|---|---|---|
| Tipo de trabajador | 70001508 | sí | per 2 | `01\|70001508\|\|1\|2\|\|15/10/2026\|\|\|` · `01\|70001508\|\|1\|2\|16/10/2026\|\|21\|\|` |
| Datos del contrato | 70001509 | sí | tra 1 · per 1 · cta 1 | `.tra` solo con el campo 10 = `01` y el campo 20 = `2` · `.per` `01\|70001509\|\|1\|2\|\|\|21\|\|` · `.cta` `01\|70001509\|\|002\|19187654321098\|` |
| Cuenta de abono | 70001509 | no (añadido) | per 1 · cta 1 | `.per` `01\|70001509\|\|1\|2\|\|\|21\|\|` · `.cta` `…\|002\|19187654321098\|` |
| Régimen pensionario | 70001510 | no (añadido) | tra 1 · per 3 | `.per` `…\|1\|2\|\|\|21\|\|` (TT sin fechas) · `…\|1\|4\|\|15/10/2026\|\|\|` · `…\|1\|4\|16/10/2026\|\|25\|\|` · `.tra` solo con el CUSPP **765432HCCZU8** (campo 8) |
| Régimen de salud / EPS | 70001510 | no (añadido) | per 3 | `…\|1\|2\|\|\|21\|\|` · `…\|1\|3\|\|15/10/2026\|\|\|` · **`…\|1\|3\|16/10/2026\|\|01\|2\|`** |
| SCTR salud (movimiento «Alta») | 70001510 | no (añadido) | per 2 | `…\|1\|2\|\|\|21\|\|` · **`…\|1\|5\|16/10/2026\|\|1\|\|`** |
| Establecimiento adicional | 70001510 | no (añadido) | est 1 | `01\|70001510\|\|20603456786\|0001\|` |
| Situación educativa y estudios | 70001510 | no (añadido) | tra 1 · per 1 · edu 1 | `.tra` campo 5 = `13` · `.per` `…\|1\|2\|\|\|21\|\|` · `.edu` `01\|70001510\|\|13\|1\|160000001\|342056\|2011\|` |
| Celular, correo y domicilio | 70001510 | no (añadido) | ide 1 | 41 campos; nombres, apellidos y sexo vacíos (campos 5 a 8); termina en `\|1\|` |

ZIP: `zips/m1_…` a `zips/m9_…`. El detalle de cada envío está en `envios/m*.json`.

### Punto 6 · Derechohabientes (01/10/2026–31/10/2026)

**Altas, `RD_20603456786_22102026_ALTA.TXT`** (CRLF):
- 9 propuestos: **4 exportados** y 5 sin exportar.
- Las 4 líneas tienen **46 campos**: 45 separadores, el último campo va vacío y no hay pipe de cierre adicional.
- Líneas exportadas:
  - `01|70001502|01|78001502||10/05/2018|QUISPE|ROJAS|MATEO|1|05|…` (titular 70001502);
  - `01|70001502|01|40001502||03/03/1988|ROJAS|CCAMA|ELENA|2|02|05|…` (titular 70001502);
  - `04|001234567|07|CD7654321|862|15/09/2019|RAMÍREZ|LÓPEZ|SOFÍA|2|05|10|…` (pasaporte, país 862; titular 001234567);
  - `01|70001501|01|78001501||20/08/2020|TORRES|PEÑA|LUCÍA|2|05|…` (titular 70001501).
- 71001502: «**NO SE EXPORTA: hijo mayor de edad sin incapacidad permanente: no es derechohabiente (Tabla 19)**».
- 40001510 no aparece.
- Hijos de otros casos con «NO SE EXPORTA» (solo se anotan; les faltan el documento, los apellidos y nombres separados, el sexo y el domicilio):
  - «Valentina Quispe Soto», titular 45781236;
  - hijos de las trabajadoras de BOLETA (70000501), MICRO (70000702) e INDEMNIZACION (70000358). Esta última además tiene «el titular no tiene un vínculo laboral vigente hoy».

**Bajas, `RD_20603456786_22102026_BAJA.TXT`:**
- 1 exportado.
- Línea: `01|70001510|01|40001510||04/04/1990|MENDOZA|SILVA|CARMEN|02|15/10/2026|04`.

Ninguno de los dos TXT se subió a SOL. Están en `zips/`.

### Punto 8 · Interfaz (SOLSE Demo)

- **Ficha de 70001502, pestaña «Nómina PE», «Derechohabientes»:**
  - columnas: Parentesco · Nombre · Género · Fecha de nacimiento · **Tipo de documento · N.° de documento · Apellido paterno · Apellido materno · Nombres · Alta como derechohabiente**;
  - 3 filas (MATEO, ELENA, DIEGO), todas con alta el 16 oct.;
  - captura `l11_p8_ficha_70001502_derechohabientes.png`.
- **Línea nueva:** «Alta como derechohabiente» viene con **22 oct.** (hoy) y tipo de documento «01 · DNI». Se descartó y la ficha sigue con 3 parientes. Captura `l11_p8_linea_nueva_alta_hoy.png`.
- **Maestros SUNAT › «Vínculos familiares (T19)»:**
  - con código: Cónyuge **02** · Pareja **03** · Hijo(a) **05** · Gestante **04**;
  - sin código: Padre, Hermano(a), Primo(a), Abuelo(a) y Nieto(a);
  - captura `l11_p8_vinculos_familiares_t19.png`.
- **Edad de 70001501:** «Edad **36**», entero. O-50 queda resuelta. Captura `l11_p8_edad_70001501.png`.

## Observaciones

- **O-51 · Dos copias de los módulos de nómina en el servidor.** Las carpetas `solse_pe_payroll_*` están en `/opt/odoo19/solse_peru_cpe/` y en `/opt/odoo19/solse_peru_contabilidad/`, y las dos están en el `addons_path`.
  - Según qué copia esté al día, el `-u` carga una u otra. Las rutas de `i18n` del log lo muestran:
    - lotes 9 y 10 y el `-u` de las 11:15: `solse_peru_cpe`;
    - lote 6 y el `-u` de las 11:49: `solse_peru_contabilidad`.
  - Esa es la causa de los DESP-1 repetidos.
  - Recomendación: dejar una sola copia y quitar la otra del `addons_path`, o borrarla.
- **O-52 · El `-u` de las 11:49 no corrió ninguna migración.**
  - El log no tiene ninguna línea «Running migration» ni las tres «Nómina PE (N-02 fase 2)» de `migrations/19.0.1.27.0/post-migrate.py`.
  - Aun así, los parentescos ya tienen los códigos 02 / 03 / 05.
  - Probables causas:
    - la post-migración corrió en un `-u` intermedio cuyo log no se pasó;
    - o la copia que se cargó no tiene la carpeta `migrations/19.0.1.27.0`.
  - Conviene revisarlo antes del siguiente lote: con dos copias, una migración puede quedarse sin correr sin que nada falle.
- **O-53 · El servicio quedó apagado tras el `-u`**, por tercera vez (sigue O-46). Conviene añadir «levantar el servicio» a la lista del despliegue.
- **O-54 · Hijos de otros casos en las altas de derechohabientes de octubre.**
  - Son 5 «NO SE EXPORTA» que no son del caso TREGISTRO: Valentina Quispe Soto, titular 45781236, y los hijos de BOLETA, MICRO e INDEMNIZACION.
  - Sus parientes se cargan con fecha de alta en octubre, pero sin los datos del registro.
  - No afectan al caso (262 al 100 %), pero salen en la lista de quien exporte las altas de octubre de SOLSE Demo.

## Evidencia (esta carpeta)

- **Logs:** `log_u_lote11_1115.txt` (la copia vieja, DESP-1) y `log_u_lote11_1149.txt` (el medido).
- **Antes y después:** `antes.txt`, `despues.txt` y `fm_lote11_sin_recalcular.json`.
- **Casos:** `casos_tras_sincronizar.json` y `vuelta1/` (`resultado.json` y los 14 Excel, incluido `COMPARACION_TREGISTRO.xlsx`).
- **T-Registro:**
  - `zips/`: los 9 ZIP de modificaciones y los TXT de ALTA y BAJA;
  - `envios/`: el detalle de cada envío.
- **FM:** `impacto_fm_derechohabientes_conteos.json` (solo conteos).
- **Interfaz:** `ui_hechos.json` y `capturas/l11_p8_*`.
- **Scripts de medición:** `antes.py`, `tregistro11.py` y `ui_lote11.js`.
