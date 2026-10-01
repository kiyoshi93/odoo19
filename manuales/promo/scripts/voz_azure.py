# Voz neuronal de Azure Speech (REST). Requiere AZURE_SPEECH_KEY y AZURE_SPEECH_REGION en el entorno.
import os, urllib.request, wave
from xml.sax.saxutils import escape


def sintetizar(texto, archivo, voz=None, velocidad='+5%'):
    voz = voz or os.environ.get('VOZ', 'es-PE-CamilaNeural')
    region = os.environ['AZURE_SPEECH_REGION']
    ssml = (f"<speak version='1.0' xml:lang='es-PE'><voice name='{voz}'>"
            f"<prosody rate='{velocidad}'>{escape(texto)}</prosody></voice></speak>")
    peticion = urllib.request.Request(
        f'https://{region}.tts.speech.microsoft.com/cognitiveservices/v1', data=ssml.encode('utf-8'), method='POST',
        headers={'Ocp-Apim-Subscription-Key': os.environ['AZURE_SPEECH_KEY'], 'Content-Type': 'application/ssml+xml',
                 'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm', 'User-Agent': 'promo-nomina'})
    with urllib.request.urlopen(peticion, timeout=60) as respuesta, open(archivo, 'wb') as f:
        f.write(respuesta.read())
    with wave.open(archivo) as w:
        return w.getnframes() / w.getframerate()
