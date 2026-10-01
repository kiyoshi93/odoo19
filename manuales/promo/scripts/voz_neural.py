# Voz neuronal offline con Kokoro (modelo ONNX publicado en GitHub, sin conexión al sintetizar).
import os
import soundfile as sf
from kokoro_onnx import Kokoro

MODELOS = os.environ.get('KOKORO_DIR', os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tts'))
_kokoro = None


def sintetizar(texto, archivo, voz=None, velocidad=1.05):
    global _kokoro
    if _kokoro is None:
        _kokoro = Kokoro(os.path.join(MODELOS, 'kokoro-v1.0.onnx'), os.path.join(MODELOS, 'voices-v1.0.bin'))
    muestras, frecuencia = _kokoro.create(texto, voice=voz or os.environ.get('VOZ', 'ef_dora'), speed=velocidad, lang='es')
    sf.write(archivo, muestras, frecuencia)
    return len(muestras) / frecuencia
