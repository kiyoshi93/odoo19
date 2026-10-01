# Voz de ElevenLabs (REST). Requiere ELEVENLABS_API_KEY; VOZ=el:<voice_id>, MODELO opcional.
import json, os, urllib.request, wave

API = 'https://api.elevenlabs.io/v1'


def _peticion(ruta, datos=None):
    return urllib.request.Request(API + ruta, data=json.dumps(datos).encode() if datos else None,
                                  headers={'xi-api-key': os.environ['ELEVENLABS_API_KEY'], 'Content-Type': 'application/json'})


def listar_voces():
    with urllib.request.urlopen(_peticion('/voices'), timeout=60) as r:
        for v in json.load(r)['voices']:
            print(v['voice_id'], v['name'], v.get('labels', {}))


def sintetizar(texto, archivo, voz=None):
    voz_id = (voz or os.environ['VOZ']).split(':', 1)[-1]
    datos = {'text': texto, 'model_id': os.environ.get('MODELO', 'eleven_multilingual_v2'),
             'voice_settings': {'stability': 0.45, 'similarity_boost': 0.8, 'style': 0.3}}
    with urllib.request.urlopen(_peticion(f'/text-to-speech/{voz_id}?output_format=pcm_24000', datos), timeout=120) as r:
        pcm = r.read()
    with wave.open(archivo, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(24000); w.writeframes(pcm)
    return len(pcm) / 2 / 24000


if __name__ == '__main__':
    listar_voces()
