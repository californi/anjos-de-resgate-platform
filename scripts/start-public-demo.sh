#!/usr/bin/env bash
set -euo pipefail

api_pid=""
web_pid=""

cleanup() {
  [[ -n "$api_pid" ]] && kill "$api_pid" 2>/dev/null || true
  [[ -n "$web_pid" ]] && kill "$web_pid" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

API_PORT="${API_PORT:-3333}" pnpm --filter @anjos/api start &
api_pid=$!

PORT="${PORT:-3000}" pnpm --filter @anjos/web start &
web_pid=$!

wait -n "$api_pid" "$web_pid"
