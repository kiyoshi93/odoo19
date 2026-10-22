# Regenera EN SITIO las 64 boletas de FM SYSTEMS (autorizado por Gabriel el 22/10/2026):
# cancelar → borrador → días, nombre y diario como los pone hoy el formulario → calcular → validar.
import sys, os, json
sys.path.insert(0, os.path.dirname(__file__)); sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'lote3'))
from dias import dias_nuevos, ejecutar, CTX
from recalcular_en_orden import foto
OUT = os.path.join(os.path.dirname(__file__), 'out')
ORDEN_ESTRUCTURA = {'GRAT': 0, 'VAC': 1, 'CTS': 2}

antes = foto()
assert len(antes) == 64 and all(b['estado'] == 'done' for b in antes)
nombres = {b['id']: [b['name'], b['journal_id'][1], b['number']] for b in ejecutar('hr.payslip', 'read', [b['id'] for b in antes], ['name', 'journal_id', 'number'], context=CTX)}
json.dump({'boletas': antes, 'nombres': nombres, 'correos': ejecutar('mail.mail', 'search_count', [])}, open(os.path.join(OUT, 'antes.json'), 'w'), ensure_ascii=False, indent=0)
bitacora = []
for b in sorted(antes, key=lambda b: (b['periodo'], ORDEN_ESTRUCTURA.get(b['estructura'], 9), b['emp'], b['id'])):
    paso = 'cancelar'
    try:
        ejecutar('hr.payslip', 'action_payslip_cancel', [b['id']], context=CTX); paso = 'borrador'
        ejecutar('hr.payslip', 'action_payslip_draft', [b['id']], context=CTX); paso = 'días'
        lineas, otros = dias_nuevos(b['id'])
        valores = {'worked_days_line_ids': [(5, 0, 0)] + [(0, 0, l) for l in lineas]}
        if otros.get('name'):
            valores['name'] = otros['name']
        if otros.get('journal_id'):
            valores['journal_id'] = otros['journal_id']
        ejecutar('hr.payslip', 'write', [b['id']], valores, context=CTX); paso = 'calcular'
        ejecutar('hr.payslip', 'compute_sheet', [b['id']], context=CTX); paso = 'validar'
        ejecutar('hr.payslip', 'action_payslip_done', [b['id']], context=CTX)
        bitacora.append([b['periodo'], b['estructura'], b['emp'], b['id'], 'ok'])
        print(b['periodo'], b['estructura'], b['emp'], b['id'], 'ok', flush=True)
    except SystemExit as e:
        bitacora.append([b['periodo'], b['estructura'], b['emp'], b['id'], 'ERROR en ' + paso + ': ' + getattr(e, 'mensaje', str(e))[:600]])
        print('ERROR', b['id'], paso, getattr(e, 'mensaje', str(e))[:600], flush=True)
        break
json.dump(bitacora, open(os.path.join(OUT, 'bitacora.json'), 'w'), ensure_ascii=False, indent=0)
despues = foto()
nombres = {b['id']: [b['name'], b['journal_id'][1], b['number']] for b in ejecutar('hr.payslip', 'read', [b['id'] for b in despues], ['name', 'journal_id', 'number'], context=CTX)}
json.dump({'boletas': despues, 'nombres': nombres, 'correos': ejecutar('mail.mail', 'search_count', [])}, open(os.path.join(OUT, 'despues.json'), 'w'), ensure_ascii=False, indent=0)
print('regeneradas', sum(1 for x in bitacora if x[-1] == 'ok'), 'de', len(antes))
