# Limpieza de avisos del log — servidor de pruebas (demoContable)

Sale del log del `-u solse_pe_payroll,solse_pe_payroll_demo` del 2026-10-26 y del estado de los módulos en la base. **Ninguno de estos avisos viene de la nómina.**

## 1. Actualizar: el código es más nuevo que lo instalado (7 módulos)

| Módulo | Instalado | En el servidor |
|---|---|---|
| `solse_fabricacion_por_venta` | 19.0.13.3.0 | 19.0.13.4.0 |
| `solse_factura_consolidada_compra` | 19.0.1.0.0 | 19.0.1.0.1 |
| `solse_multi_barcodes` | 19.0.0.10 | 19.0.1.0 (ver punto 3) |
| `solse_multi_barcodes_pricelist` | 19.0.1.2.0 | 19.0.1.3.1 |
| `solse_pos_list_view` | 19.0.1.1.1 | 19.0.1.4.0 |
| `solse_pos_search_multi_word` | 19.0.1.1.0 | 19.0.1.2.1 |
| `solse_textil_inventario` | 19.0.8.0.2 | 19.0.8.1.0 |

```
-u solse_fabricacion_por_venta,solse_factura_consolidada_compra,solse_multi_barcodes_pricelist,solse_pos_list_view,solse_pos_search_multi_word,solse_textil_inventario
```

## 2. «Model … has no table» (56 ERROR)

Son modelos cuyo código está en el servidor pero no tienen tabla ni registro en `ir.model`. Lo habitual es que se agregaron al código sin subir la versión del módulo, así que el `-u` normal no los crea. La asignación a cada módulo sale del nombre del modelo: confírmala con un `grep` del `_name` en el servidor.

| Modelo | Módulo probable | Qué hacer |
|---|---|---|
| `mkb.completa.codigo`, `mkb.duplicado.codigo`, `mkb.consolida.plantilla` | `mkb_remapeo_productos` (19.0.0.3) | `-u mkb_remapeo_productos`, y subir su versión si el código cambió |
| `smigracion.wizard.mapeo.plantillas` y `.linea` | `solse_migracion_data` (19.0.0.1) | `-u solse_migracion_data` |
| `solse.mover.stock.fabricado` | `solse_pos_picking_asistido` o `solse_fabricacion_por_venta` (`grep "solse.mover.stock.fabricado"`) | `-u` del módulo que lo defina |
| `ai.embedding` | `ai` (Odoo Enterprise) | Necesita la extensión **pgvector** de PostgreSQL. Si no usas la app IA, desinstala `ai`; si la usas, instala pgvector y luego `-u ai` |

## 3. Módulos que no cargan (1 ERROR + 6 WARNING)

- `solse_multi_barcodes` sale como **«not installable, skipped»**. Es probable que el manifiesto que está en el servidor tenga `'installable': False` o un error.
- Por eso tampoco cargan `solse_multi_barcodes_pricelist` ni `solse_pricelist_item_search`, que dependen de él.
- Solución:
  - si se usan: corrige el manifiesto de `solse_multi_barcodes` y actualiza los tres;
  - si no se usan en este servidor de pruebas: desinstálalos.

## 4. Avisos de código para el equipo de desarrollo (WARNING, no bloquean)

| Aviso | Dónde | Corrección en Odoo 19 |
|---|---|---|
| `_sql_constraints` ya no se admite (17 veces) | modelos con `_sql_constraints` en los módulos SOLSE | `models.Constraint(...)` en el modelo |
| `unknown parameter 'tracking'` | `solse.pe.cierre.state`, `solse.lista.compra.line.estado`, `lost.sale.entry.state`, `stock.location.solse_marcado_vacio` | heredar de `mail.thread`, o quitar `tracking=True` |
| `inconsistent 'store'` / `'compute_sudo'` | `account.move.line`: `monto_distribuido`, `monto_pendiente`; `account.move`: `origin_doc_id`, `origin_doc_code`, `origin_doc_number` | los campos calculados por el mismo método deben tener igual `store` y `compute_sudo` |
| campo relacionado traducido y almacenado | `account.move.line.nombre_producto`, `solse.carga.precios.linea.valor_talla_nombre` | `store=False`, o quitar `translate` |
| dos campos con la misma etiqueta | `res.company`: `solse_vso_largo_modelo` y `solse_traslado_largo_modelo` («Largo del código de modelo») | darles etiquetas distintas |
| `@route(type='json')` obsoleto | `solse_ubicacion_dashboard/controllers/dashboard.py:467`, `solse_migracion_data/controllers/leer_registro.py:12` | `type='jsonrpc'` |
| `odoo.osv` obsoleto | algún módulo importa `odoo.osv` (`expression`) | `odoo.fields.Domain` |
| falta restricción NOT NULL | `solse.picking.asistido`, `solse.mover.stock.fabricado`, `smigracion.wizard.mapeo.plantillas`, `ai.embedding`, `account_followup.manual_reminder` | se resuelve al actualizar los módulos de los puntos 1 y 2 |

## 5. Configuración del servidor (`/etc/odoo19.conf`)

- `longpolling_port`: en Odoo 19 se llama **`gevent_port`**.
- `default_productivity_apps = False` no es una opción booleana válida: quítala.
- Define `http_interface` (por ejemplo `127.0.0.1` si Odoo va detrás de nginx). Odoo avisa que en la versión 20 cambia el valor por defecto.
- Para indexar los PDF adjuntos, instala `pdfminer.six` en el entorno de Python de Odoo (opcional).

## 6. Lo que se puede ignorar

Las 2 líneas `(ERROR/3) Unexpected indentation` de docutils vienen de las descripciones de los manifiestos. No son una falla.
