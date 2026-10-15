#!/usr/bin/env bash
set -euo pipefail

api_pid=""
web_pid=""

cleanup() {
  [[ -n "$api_pid" ]] && kill "$api_pid" 2>/dev/null || true
  [[ -n "$web_pid" ]] && kill "$web_pid" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

API_PORT="${API_PORT:-3333}" \
  NODE_OPTIONS="${API_NODE_OPTIONS:---max-old-space-size=96}" \
  node apps/api/dist/main.js &
api_pid=$!

PORT="${PORT:-3000}" \
  NODE_OPTIONS="${WEB_NODE_OPTIONS:---max-old-space-size=192}" \
  node apps/web/node_modules/next/dist/bin/next start apps/web -p "${PORT:-3000}" &
web_pid=$!

wait -n "$api_pid" "$web_pid"
