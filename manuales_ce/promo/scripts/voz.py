# Síntesis de voz con la librería espeak-ng empaquetada en espeakng_loader (ctypes)
import ctypes
import os
import sys
import wave

import espeakng_loader

lib = ctypes.CDLL(espeakng_loader.get_library_path())
AUDIO_OUTPUT_SYNCHRONOUS = 2
muestras = bytearray()
CALLBACK = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.c_void_p)


@CALLBACK
def recibir(wav, n, eventos):
    if n > 0:
        muestras.extend(ctypes.string_at(wav, n * 2))
    return 0


ruta_datos = os.path.dirname(espeakng_loader.get_data_path())
frecuencia = lib.espeak_Initialize(AUDIO_OUTPUT_SYNCHRONOUS, 0, ruta_datos.encode(), 0)
lib.espeak_SetSynthCallback(recibir)


def sintetizar(texto, archivo, voz='es-419', velocidad=155, tono=45):
    muestras.clear()
    lib.espeak_SetVoiceByName(voz.encode())
    lib.espeak_SetParameter(1, velocidad, 0)  # espeakRATE
    lib.espeak_SetParameter(3, tono, 0)  # espeakPITCH
    datos = texto.encode('utf-8')
    lib.espeak_Synth(datos, len(datos) + 1, 0, 0, 0, 0x01, None, None)  # espeakCHARS_UTF8
    lib.espeak_Synchronize()
    with wave.open(archivo, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(frecuencia); w.writeframes(bytes(muestras))
    return len(muestras) / 2 / frecuencia


if __name__ == '__main__':
    print('frecuencia', frecuencia)
    print(sintetizar(sys.argv[1], sys.argv[2]))
