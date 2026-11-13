#!/usr/bin/env bash
# Lager kartdataene for Karibia-etappen (Tenerife -> Barbados).
#   - public/voyage/land-carib.json: Natural Earth 10m-land klippet til CARIB_BOX
#   - public/voyage/land-rest.json:  samme boks fjernes fra grovkartet, så kysten ikke tegnes to ganger
# Boksen må være lik CONFIG.caribBox i src/lib/voyage/engine.ts.
# Kjøres fra roten av repoet. Kjør det bare én gang per versjon av land-rest.json
# (å fjerne boksen på nytt gjør ingenting, men kvantiseringen rundes én gang til).
set -euo pipefail

BOX="-76,2,-44,22"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

(cd "$TMP" && npm pack world-atlas@2.0.2 --silent >/dev/null && tar xzf world-atlas-2.0.2.tgz)

npx --yes mapshaper@0.6.102 "$TMP/package/land-10m.json" \
  -clip bbox="$BOX" -rename-layers land \
  -o public/voyage/land-carib.json format=topojson quantization=60000

npx --yes mapshaper@0.6.102 public/voyage/land-rest.json \
  -erase bbox="$BOX" -rename-layers land \
  -o public/voyage/land-rest.json force format=topojson quantization=20000
