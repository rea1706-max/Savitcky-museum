#!/usr/bin/env bash
# Builds the latest main and swaps it in without Docker (small servers: 1 CPU, 1 GB RAM).
# The running site is served from RUN_DIR and is untouched while the new build runs;
# if the new release does not answer, the previous one is restored.
#   scripts/deploy-native.sh          build and release origin/main now
#   scripts/deploy-native.sh --check  only when origin/main has new commits (timer)
set -euo pipefail

# Optimises the images of the main pages once, one at a time, so the first visitors
# after a release do not wait for (or time out on) a cold image cache.
warm_images() {
  local page url
  for page in / /stories /collection /exhibitions /visit; do
    curl --silent "http://127.0.0.1:$PORT$page" \
      | grep -oE '/_next/image\?url=[^" ,]+' | sed 's/&amp;/\&/g' | sort -u \
      | while read -r url; do
          curl --silent --output /dev/null --max-time 120 "http://127.0.0.1:$PORT$url" || true
        done || true
  done
}

# Everything runs inside main(): bash reads the whole function before starting, so the
# git reset below may safely replace this very file mid-run.
main() {
APP_DIR="${APP_DIR:-$HOME/savitsky-museum}"
RUN_DIR="${RUN_DIR:-$HOME/savitsky-app}"
SERVICE="${SERVICE:-savitsky-museum}"
PORT="${PORT:-3020}"
SITE_URL="${SITE_URL:-http://savitsky.82-115-51-36.sslip.io}"
CHECK_ONLY="${1:-}"

# One deploy at a time: the timer fires every minute but a build takes several.
exec 9>/tmp/savitsky-deploy.lock
flock -n 9 || exit 0

cd "$APP_DIR"
git fetch --quiet origin main
if [[ "$CHECK_ONLY" == "--check" ]] && [[ -f "$RUN_DIR/server.js" ]] \
  && [[ "$(git rev-parse HEAD)" == "$(git rev-parse origin/main)" ]]; then
  exit 0
fi

# The server checkout only ever mirrors main.
git reset --hard --quiet origin/main
echo "deploying $(git log -1 --format='%h %s')"

# Dependencies only when the lock file changed.
lock_hash="$(sha1sum package-lock.json | cut -d' ' -f1)"
if [[ "$(cat node_modules/.lock-hash 2>/dev/null)" != "$lock_hash" ]]; then
  npm ci --no-audit --no-fund
  echo "$lock_hash" > node_modules/.lock-hash
fi

export NEXT_TELEMETRY_DISABLED=1 NEXT_PUBLIC_SITE_URL="$SITE_URL"
export NODE_OPTIONS="--max-old-space-size=1536"
# next/font downloads Google Fonts during the build; retry once on a network blip.
npm run build || (sleep 15 && npm run build)

stage="$RUN_DIR.next"
rm -rf "$stage"
cp -a .next/standalone "$stage"
cp -a .next/static "$stage/.next/static"
cp -a public "$stage/public"

# Keep already optimised images: re-encoding large PNGs on one CPU is slow.
if [[ -d "$RUN_DIR/.next/cache/images" ]]; then
  mkdir -p "$stage/.next/cache"
  cp -a "$RUN_DIR/.next/cache/images" "$stage/.next/cache/"
fi

rm -rf "$RUN_DIR.prev"
[[ -d "$RUN_DIR" ]] && mv "$RUN_DIR" "$RUN_DIR.prev"
mv "$stage" "$RUN_DIR"
sudo systemctl restart "$SERVICE"

for _ in $(seq 1 30); do
  if curl --fail --silent --output /dev/null "http://127.0.0.1:$PORT/"; then
    echo "released $(git log -1 --format=%h)"
    # In the foreground: systemd ends a oneshot unit's leftover processes.
    warm_images
    exit 0
  fi
  sleep 2
done

echo "new release did not answer; restoring the previous one" >&2
if [[ -d "$RUN_DIR.prev" ]]; then
  rm -rf "$RUN_DIR"
  mv "$RUN_DIR.prev" "$RUN_DIR"
  sudo systemctl restart "$SERVICE"
fi
exit 1
}

main "$@"
