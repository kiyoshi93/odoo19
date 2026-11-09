# Instrucciones comunes para redactar capítulos del manual v3 (nómina CE, Odoo 19 Community)

Eres un redactor técnico experto en nómina peruana y en Odoo. Actualizas capítulos del **manual v3**: el v2 (del 22/10/2026,
que llega hasta el lote 12) más **todos los cambios de los lotes 13 a 71**, ya validados en la base contable19.
Escribe en español, con el mismo tono del v2: directo, preciso, con tablas, cifras medidas y recuadros.

## Archivos

- **Tus capítulos** (los únicos que editas): `/home/user/odoo19/manuales_ce/v3/scripts/capitulos/capNN.js`. Cada uno es un
  módulo `module.exports = (h) => { ... return c; }` que usa los helpers de `../base_docx.js`:
  `p(texto)`, `h1('NN. Título')`, `h2('NN.M Título')`, `h3(t)`, `pasos([...])`, `vinetas([...])`,
  `nota(texto, tipo)` con tipo `nota | importante | implementador | caso | limite`, `...figura('nombre_captura', 'pie con las cifras')`,
  `tabla(encabezados, filas, anchosEnDxa)` (los anchos suman **9638**), `pieCapitulo(['base','ce','ce_demo','renta5','asistencia',...], 'ítems')`.
  En los textos, `**negrita**` y `` `código` ``. Mira cómo lo hace el v2 en tu propio archivo antes de cambiar nada.
- **Numeración v3:** 1 a 30 como en el v2; **31 Modalidades formativas: el practicante** (nuevo); **32 SENATI** (nuevo);
  **33 Lo que la localización no cubre** (era el 31); **34 Lista de verificación del cierre** (era el 32); anexos A a E.
  Si tu texto remite a «capítulo 31» o «32» del v2, cámbialo a 33 o 34. El 24 pasa a llamarse **«Micro y pequeña empresa»**.
- **Comprobar:** `cd /home/user/odoo19 && NODE_PATH=$(npm root -g) node manuales_ce/v3/scripts/generar_manual_v3.js` debe terminar sin error
  (las capturas que falten salen como «[Falta la captura …]», eso está bien). Otros agentes editan otros capítulos a la vez:
  **no toques archivos que no son tuyos**, ni `generar_manual_v3.js`, ni `base_docx.js`.

## Fuentes (en `/home/user/docodoov19`, rama `nomina-ce`; solo lectura)

- `50-nomina/mejoras-ce/documentacion-v3/INSTRUCCIONES_MANUAL_V3_Y_VIDEOS_NOMINA_CE.md`: qué entra en el v3, versiones y tabla de episodios.
- `50-nomina/mejoras-ce/documentacion-v2/notas/NOTA_LOTE13.md` … `NOTA_LOTE38.md`: una nota por lote (qué cambia para el usuario,
  opciones, cifras y capítulos). Muchas no nombran el capítulo: **búscalas por tema** (`grep -il` de los conceptos de tus capítulos).
- `50-nomina/mejoras-ce/documentacion-v2/notas/NOTA_LOTES_*.md`: las seis notas por tema de los lotes 39 a 71 (regímenes, cese, el mes,
  provisiones, laboratorio, renta de 5.ª y PLAME). Cada una tiene al final una tabla «Qué tocar en el manual».
- `50-nomina/mejoras-ce/documentacion-v2/MATRIZ_DOCUMENTACION_NOMINA_CE.md` (lotes 1 a 23a) y `50-nomina/mejoras-ce/mejoras-nomina-ce.md` (fichas).
- `50-nomina/mejoras-ce/evidencias_loteNN/plan_NN.md` (norma y decisiones) y `evidencias_loteNN/remedicion_contable19/*.md` (cifras medidas).
- `99-sintesis/contadora/PREGUNTAS_CONTADORA_2026-11-08.xlsx` (léelo con openpyxl): lo de la hoja **«1 · Pueden cambiar código»** se escribe
  como **«criterio según la norma, pendiente de confirmación (ID)»**; lo de la hoja **«2 · Con valor por defecto»**, con el valor de hoy.
- El código de la versión documentada: `addons/solse_pe_contabilidad/` (vistas XML para los **nombres exactos** de campos, botones y menús;
  modelos para el comportamiento). Usa las etiquetas tal como las ve el usuario.

## Reglas (no negociables)

1. **Toda cifra sale de una corrida real o de un caso del laboratorio** (las notas y las re-mediciones traen cifras medidas). Cita el caso
   («caso EMPRESA_PEQUENA, P3: indemnización 1 100,00»). Si una cifra del v2 cambió por un lote posterior, corrígela y dilo en tu informe.
   Si no puedes confirmar una cifra, no la inventes: márcala en tu informe como «por medir».
2. **Lectura de la base permitida, solo lectura.** Puedes leer contable19 por JSON-RPC para confirmar cifras y etiquetas:
   `import sys; sys.path.insert(0,'/tmp/claude-0/-home-user/a58fb904-ba88-59df-b173-0f0ec3a57b51/scratchpad/guia'); from rpc import ejecutar`
   y luego `ejecutar('hr.payslip','search_read',[dominio],fields=[...],context={'allowed_company_ids':[ids]})`.
   **Solo** `search_read`, `read`, `search_count`, `read_group` y `fields_get`. **Nunca** `create`, `write`, `unlink`, botones (`action_*`,
   `accion_*`, `button_*`, `compute_sheet`) ni nada bajo `/web/database`. Compañías: 1 FM SYSTEMS (recorrido con Lucía y Héctor, ficticios),
   4 SOLSE Demo Servicios (25 casos), 12 Pequeña Empresa, 13 Microempresa, 14 Comercio, 15 Industria, 16 Consultora (casos `EMPRESA_*`).
   El contrato es `hr.version`. Los casos están sembrados y al 100 %.
3. **Datos:** DNI y RUC sintéticos de los casos; nada de datos reales de FM (RUC, cuentas, correos). Lucía y Héctor son ficticios.
4. **Lo que no existe en el código no se describe:** va al capítulo 33 como «no cubierto» (díselo al coordinador en el informe).
5. **Cada capítulo cierra con `pieCapitulo`** con los módulos que muestra y los ítems/lotes que cubre (por ejemplo `'C-36 (lote 13), N-16 (21b), P-46 c (26a)'`).
6. **Capturas:** no tomes capturas. Usa `...figura('cNN_MM_tema', 'pie con la cifra que se ve')`. Puedes reutilizar nombres del v2 (están en
   `/home/user/odoo19/manuales_ce/v3/capturas/`; míralas con la herramienta Read si necesitas saber qué muestran) **solo si la pantalla
   sigue siendo correcta**. Para cada captura nueva o que deba rehacerse, escribe un pedido en
   `/home/user/odoo19/manuales_ce/v3/capturas_pedidas/<tu_grupo>.md`: nombre, qué debe verse, compañía, registro exacto (modelo, empleado/caso,
   fechas o cómo encontrarlo), pestaña o vista, y qué resaltar. Pocas y buenas: las que un usuario necesita para hacerlo.
7. **Hallazgos** (algo roto o una cifra que no cuadra con la norma o con la base): anótalos en
   `/home/user/odoo19/manuales_ce/v3/hallazgos/<tu_grupo>.md` con módulo, dónde, impacto y cómo lo mediste. No cambies código.
8. **Episodios:** al final de tu informe, para cada episodio de tus capítulos (tabla del §3 de las instrucciones v3), lista en 3–6 viñetas
   qué debe decir y mostrar ahora (cifras incluidas), para que el coordinador reescriba el guion.

## Informe final (tu respuesta)

Breve: capítulos tocados y qué cambió (por lote), cifras corregidas respecto al v2, cifras «por medir», capturas pedidas (cuántas),
hallazgos, y las viñetas de los episodios. No pegues el texto del capítulo.
