#!/usr/bin/env sh
# Render the deck plan SVGs to 4800x2000 PNGs with headless Chromium.
set -e
cd "$(dirname "$0")/../../public/media"
CHROME="${CHROME:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"
for name in deck-plan-second-deck deck-plan-main-deck; do
  "$CHROME" --headless --no-sandbox --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=2 --window-size=2400,1000 \
    --default-background-color=ffffffff \
    --screenshot="$PWD/$name.png" "file://$PWD/$name.svg" 2>/dev/null
done
# Web derivatives for the site, cropped to the plan (the page supplies the title).
for name in deck-plan-second-deck deck-plan-main-deck; do
  for w in 1200 2400; do
    convert "$name.png" -crop 4800x1180+0+300 +repage -resize "${w}x" -quality 90 -define webp:method=6 "$name-$w.webp"
  done
done
