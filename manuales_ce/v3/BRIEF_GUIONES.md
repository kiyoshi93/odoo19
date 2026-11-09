# Guiones de los videos del v3: instrucciones para cada grupo

Gabriel decidió regrabar **toda** la serie con las versiones del v3: cada episodio debe servir como manual para los clientes y estar al día.
Tú escribes los guiones de los episodios de tu grupo (lista en tu mensaje). El coordinador los graba con la voz de Gabriel.

## Formato
- Archivo propio: `/home/user/odoo19/manuales_ce/v3/videos/scripts/guiones_<tu_grupo>.py` con `REEMPLAZOS = {'E06': {...}, ...}` y, si te toca un
  episodio nuevo, `NUEVOS = [{...}]`. Copia la estructura exacta de los episodios del v2 (`guiones_a.py`, `guiones_b.py`, `guiones_c.py`, misma carpeta)
  y del v3 (`guiones_v3.py`: E17, E27, E28 son el modelo): `id, titulo, capitulos (lista de str con la numeración del v3), caso, modulos
  (claves de VERSIONES: base, ce, ce_demo, renta5, asistencia, asistencia_demo, plame_demo, plame_4ta, plame_rxh), entrada, escenas, cifra_clave
  (tupla cifra/etiqueta o None), cierre_titulo, cierre`.
- Escenas: `{'t': 'cap', 'img': 'nombre_captura', 'rotulo': '…', 'focos': ['texto que el OCR encuentra en la captura'], 'voz': '…'}` o tarjetas
  `{'t': 'tarjeta', 'ceja': …, 'titulo': …, 'items': [...], 'voz': …}`. En la voz, cifras con `[[S 1234.50]]` (soles), `[[N 25]]`, `[[P 0.75]]`,
  o `[[T lo que se dice|lo que se escribe]]`. Escribe los números de módulo y códigos como se pronuncian («punto rem», «cero cuatro cero siete»).
- **Solo capturas del v3** (`/home/user/odoo19/manuales_ce/v3/capturas/`, tomadas en noviembre de 2026; la fecha del archivo lo dice). Nada de capturas
  del v2 sin rehacer. Las mismas cifras que el capítulo del manual (regla 4: una cifra distinta es un error).
- 5 a 9 escenas, 2 a 4 minutos. Tono: el del v2, claro, para un cliente que aprende a usar el sistema. Lo pendiente de la contadora se dice
  como «criterio pendiente de confirmación». Nada de datos reales de FM.
- Las capturas de otros grupos se pueden usar (mira `ls -t` y ábrelas con Read).

## Comprobar
`cd /home/user/odoo19 && python3 manuales_ce/v3/videos/scripts/revisar_focos.py E06,E07` debe terminar sin «FALTA» ni «FOCO NO ENCONTRADO»
(el OCR quita tildes; usa textos cortos y visibles: un código de regla, un importe tal como se ve, «Neto a pagar»). Si te falta una captura,
tómala con tu script de capturas siguiendo `BRIEF_CAPTURAS.md`.

**No grabes** (no ejecutes `serie.py` ni `generar_final.sh`): gasta la voz; lo hace el coordinador.

## Informe
Breve: episodios escritos, duración estimada, capturas nuevas que tomaste para ellos.
