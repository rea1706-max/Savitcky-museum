#!/usr/bin/env bash
# One-time setup of the Savitsky Museum on an Ubuntu server without Docker.
# Idempotent: safe to run again. Needs passwordless sudo for the current user.
#   curl -fsSL https://raw.githubusercontent.com/rea1706-max/Savitcky-museum/main/scripts/server-setup-native.sh | bash
set -euo pipefail

REPO="${REPO:-https://github.com/rea1706-max/Savitcky-museum.git}"
APP_DIR="$HOME/savitsky-museum"

# Next.js builds need more than 1 GB of memory: add swap once.
if ! swapon --show | grep -q .; then
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile >/dev/null
  sudo swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab >/dev/null
fi

# Node.js 20 LTS, the same major version as CI and the Dockerfile.
if ! node -v 2>/dev/null | grep -q '^v20\.'; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
fi
command -v git >/dev/null || sudo apt-get install -y git

[[ -d "$APP_DIR/.git" ]] || git clone --quiet "$REPO" "$APP_DIR"
chmod +x "$APP_DIR/scripts/deploy-native.sh"

sudo cp "$APP_DIR/deploy/native/savitsky-museum.service" /etc/systemd/system/
sudo cp "$APP_DIR/deploy/native/savitsky-deploy.service" /etc/systemd/system/
sudo cp "$APP_DIR/deploy/native/savitsky-deploy.timer" /etc/systemd/system/
sudo cp "$APP_DIR/deploy/native/nginx-savitsky.conf" /etc/nginx/sites-available/savitsky
sudo ln -sf /etc/nginx/sites-available/savitsky /etc/nginx/sites-enabled/savitsky
sudo nginx -t
sudo systemctl daemon-reload
sudo systemctl enable savitsky-museum.service >/dev/null

# First release, then hand over to the timer.
"$APP_DIR/scripts/deploy-native.sh"
sudo systemctl reload nginx
sudo systemctl enable --now savitsky-deploy.timer
echo "Savitsky Museum is live at http://savitsky.82-115-51-36.sslip.io"
