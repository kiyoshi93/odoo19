# Capturas del v3: instrucciones para el grupo que las pidió

Ahora tomas tú las capturas que pediste en `capturas_pedidas/<tu_grupo>.md`, con Playwright, contra contable19.

## Cómo
- Escribe tus pasos en `/home/user/odoo19/manuales_ce/v3/scripts/capturas_<tu_grupo>.js` (solo ese archivo). Reutiliza las utilidades de
  `capturas_v3.js` (`require('./capturas_v3')` exporta `pasos, rpc, empleado, idBoleta, idVersion, borradorConAvisos, grupoCompania,
  asistentePlame, hechos`) y de `capturas_bloque3.js` (`boleta, informe, cap, cia, tab, alta, limpio, descartar`) y `../../scripts/odoo_ui.js`
  (`irA, pestana, muchosAUno, rangoFechas, captura, esperarCarga…`). Mira en `capturas_v3.js` los pasos `c24`, `c31`, `c32`, `c16`, `c23`, `c07`, `c28`
  como ejemplo, incluidas `boletaCalculo` y `recortarForm` (cópialas a tu archivo si no están exportadas). Busca los registros por DNI/fecha
  con `idBoleta`/`empleado`/`rpc` (los ids cambian cuando se siembra un caso), y las acciones por xmlid (`/odoo/action-solse_pe_payroll_ce.<xmlid>`;
  boletas `action-1005`, lotes `action-1007`, contratos `action-1009`, PLAME `action-1040`; compañía `action-base.action_res_company_form/<id>`).
- Ejecuta: `cd /home/user/odoo19/manuales_ce/v3/scripts && source entorno.sh && export SESION_FILE=/tmp/claude-0/-home-user/a58fb904-ba88-59df-b173-0f0ec3a57b51/scratchpad/sesion_<tu_grupo>.json NODE_PATH=$NPM_G && node capturas_<tu_grupo>.js paso1,paso2`
  (el bloque `if (require.main === module)` de `capturas_v3.js` te sirve de modelo: login con `u.asegurarLogin`). Las capturas quedan en `v3/capturas/`.
- **Mira cada captura con la herramienta Read** y comprueba que se ve lo que dice su pie. Si no, corrige el paso o **ajusta el pie** en tu capítulo
  para que diga exactamente lo que se ve (cifras incluidas). Las boletas: pestaña «Cálculo de la nómina», recortadas al formulario (1040 px) sin
  espacio vacío (`recortarForm`).
- **Ofusca** cualquier dato que parezca real (RUC, cuentas bancarias, correos, domicilios de FM SYSTEMS): con PIL, un rectángulo gris sobre el dato.
  Lucía y Héctor y los DNI 7000xxxx/9999xxxx son sintéticos.

## Lo que NO se hace (estricto)
- No pulses **Guardar, Confirmar, Validar, Calcular hoja, Generar asiento, Registrar pago, Enviar** ni ningún botón que escriba. Los asistentes
  que solo generan un archivo (PLAME, AFPnet, planilla, bancos, T-Registro) sí se pueden generar. Los formularios nuevos o cambiados se
  **descartan**; los asistentes se **cancelan**.
- No cambies opciones de compañías ni contratos, aunque sea para volverlos atrás: captura lo que hay y ajusta el pie.
- No uses `/web/database`. No borres nada.
- Si un paso necesita escribir para verse, sáltalo y dilo en tu informe.

## Informe (tu respuesta)
Breve: capturas hechas (nombres), las que no salieron y por qué, pies que ajustaste.
