#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/sheri/savitsky-museum"

cd "$APP_DIR"

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Deployment stopped: the server checkout has uncommitted changes." >&2
  exit 1
fi

git fetch origin main
git checkout main
git pull --ff-only origin main

docker compose build --pull
docker compose up -d --remove-orphans

for attempt in $(seq 1 30); do
  if curl --fail --silent --show-error http://127.0.0.1:3020/ >/dev/null; then
    docker compose ps
    exit 0
  fi
  sleep 2
done

docker compose logs --tail=100 savitsky-museum >&2
exit 1

