# Guiones de la serie (E00 a E26). Cada escena: 't' = 'cap' (captura del manual, con 'focos' que se buscan
# por OCR y se enmarcan) o 'tarjeta' / 'limites' / 'cifra'. En 'voz': [[S 4025.70]] soles, [[N x]] número,
# [[P x]] porcentaje, [[T voz|texto]] cuando lo dicho y lo escrito difieren. Cifras: manual v2 (22/10/2026).
VERSIONES = {
    'base': '19.0.1.20.1', 'ce': '19.0.1.27.1', 'ce_demo': '19.0.2.25.1', 'asistencia': '19.0.1.4.1',
    'asistencia_demo': '19.0.1.2.1', 'plame_demo': '19.0.1.4.1', 'plame_4ta': '19.0.1.0.0', 'plame_rxh': '19.0.1.2.0',
}
from guiones_a import EPISODIOS as A  # noqa: E402
from guiones_b import EPISODIOS as B  # noqa: E402
from guiones_c import EPISODIOS as C  # noqa: E402
EPISODIOS = A + B + C
