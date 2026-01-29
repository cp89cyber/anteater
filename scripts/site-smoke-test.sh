#!/usr/bin/env bash
set -euo pipefail

if command -v rg >/dev/null 2>&1; then
  SEARCH=(rg -n)
else
  SEARCH=(grep -nE)
fi

files=(
  index.html
  species.html
  habitat.html
  diet.html
  conservation.html
  styles.css
  main.js
)

for f in "${files[@]}"; do
  if [ ! -f "$f" ]; then
    echo "Missing $f"
    exit 1
  fi
done

require() {
  local file="$1"
  local pattern="$2"
  if ! "${SEARCH[@]}" "$pattern" "$file" >/dev/null; then
    echo "Missing pattern '$pattern' in $file"
    exit 1
  fi
}

for page in index.html species.html habitat.html diet.html conservation.html; do
  require "$page" '<link[^>]+href="styles.css"'
  require "$page" '<script[^>]+src="main.js"'
  require "$page" '<nav'
  require "$page" 'id="main-content"'
  require "$page" 'class="site-header"'
  require "$page" 'class="site-footer"'
  require "$page" 'class="hero'
  require "$page" 'class="section"'
  require "$page" 'data-page="'
  require "$page" 'aria-current="page"'
  require "$page" 'Skip to main content'
  require "$page" 'class="facts-widget"'
  require "$page" 'data-fact-text'
  require "$page" 'data-fact-button'
  require "$page" 'class="fact-list"'
done

echo "Smoke test passed."
