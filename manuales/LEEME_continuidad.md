# Continuidad: manuales de nómina SOLSE (Odoo 19)

Guía para retomar el trabajo en una sesión nueva, por ejemplo para documentar la **nómina Community** (`solse_pe_payroll_ce`) con el mismo método que se usó para Enterprise.

## Qué hay en este directorio

| Ruta | Contenido |
|---|---|
| `Manual_Nomina_PE_Odoo19.docx` | Manual Enterprise v2: 16 capítulos, anexos A y B, 81 figuras e índice estático con enlaces |
| `capturas/` | Capturas del manual, ya difuminadas (sin datos de las empresas) |
| `scripts/odoo_ui.js` | Funciones auxiliares de Playwright para Odoo 19: `abrir`, `irA`, `campo`, `escribir`, `fecha`, `rangoFechas`, `seleccion`, `muchosAUno`, `pestana`, `guardar` y `captura`, que marca la zona con un recuadro rojo |
| `scripts/pNN_*.js` | Un script por capítulo; cada uno llena datos en la base y toma las capturas |
| `scripts/generar_manual.js` | Arma el .docx con docx-js (`NODE_PATH` debe apuntar a la carpeta con `docx` instalado) |
| `scripts/ocultar_empresa.py` | Difumina razón social, RUC, dirección, correos y logo con OCR (`rapidocr_onnxruntime`) más zonas manuales |
| `video/` | Video resumen de la sesión 1 (grabación de pantalla, guion para narrar) |
| `promo/` | Video promocional vertical 9:16, escenas, subtítulos, guion y motores de voz (eSpeak, Kokoro, Azure, ElevenLabs) |

## Lecciones aprendidas (aplicarlas desde el día 1)

1. **Datos reales:** la base de pruebas tenía la razón social, el RUC y el logo de un cliente real. Las capturas se difuminan **antes** de armar el manual, y el texto nunca nombra a las empresas.
2. **DNI y RUC sintéticos:** DNI `99999901`–`99999903`, RUC `10999999048` y `10999999056`. Se verificó en RENIEC/SUNAT que no corresponden a nadie.
3. **Interfaz de Odoo 19:**
   - Los rangos de fecha se llenan con clics en el calendario; el mes 9 se llama "Setiembre".
   - Escape descarta la fila en edición en las listas editables.
   - Los selectores pueden ser `o_select_menu` en lugar de `select`.
   - Hay que esperar a que se cierre el desplegable del autocompletado.
4. **Entradas de trabajo:** después de cargar feriados o ausencias tardías, usar "Restablecer" para regenerarlas. Si no, `.jor` sale con 0 días (hallazgo H-MAN-3).
5. **Índice del docx:** no usar `TableOfContents` (sale en blanco si Word no actualiza los campos); usar la lista con `Bookmark` e `InternalHyperlink`.
6. **Chromium y el proxy de la sesión:** necesita `--ignore-certificate-errors-spki-list` con el hash de la CA del proxy. Requiere autorización explícita del usuario en cada sesión, limitada al dominio de la base.

## Lo que la sesión nueva necesita del usuario

- **Fuentes de los módulos:** los zip `solse_contabilidad` y `solse_facturacion`. No se versionan en el repo.
- **La base Community:** agregar su dominio a *Dominios permitidos* del entorno y pasar las credenciales como variables de entorno (`ODOO_URL`, `ODOO_DB`, `ODOO_USUARIO`, `ODOO_CLAVE`), no en el chat.
- **Los módulos de la nómina Community:** confirmar cuáles se instalan; en los zip aparecían `solse_pe_payroll_base`, `solse_pe_payroll_ce`, `solse_pe_payroll_ce_demo`, `solse_pe_payroll_asistencia` y `solse_pe_payroll_asistencia_demo`.
- **La biblia SOLSE:** el tar.gz de la rama `manual-nomina`, si se va a contrastar el manual con ella.
