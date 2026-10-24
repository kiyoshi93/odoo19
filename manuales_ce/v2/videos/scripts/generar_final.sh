#!/usr/bin/env bash
# Serie final: voz de soporte (Gabriel, clonación profesional) con los ajustes aprobados en el piloto E06
# (semilla 1, 24/10/2026), intro de SYSTION y marca de agua.
# Uso (desde el repo): bash manuales_ce/v2/videos/scripts/generar_final.sh [E06,E07...]
set -euo pipefail
cd "$(dirname "$0")/../../../.."
export VOZ=el:8Y8NNxkGdyBx5yhgIj6q MODELO=eleven_v4 ESTABILIDAD=0.3 SIMILITUD=0.9 ESTILO=0 VELOCIDAD=1.0 REFUERZO=1 SEMILLA=1
export SALIDA_VIDEOS=salida_voz_soporte
EPISODIOS=${1:-todos}
python3 manuales_ce/v2/videos/scripts/serie.py "$EPISODIOS"
python3 manuales_ce/v2/videos/scripts/marca.py manuales_ce/v2/videos/salida_voz_soporte manuales_ce/v2/videos/final \
  $([ "$EPISODIOS" = todos ] || echo "$EPISODIOS")
