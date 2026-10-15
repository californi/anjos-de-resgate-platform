#!/usr/bin/env bash
set -euo pipefail

image="${1:-anjos-de-resgate:ci}"
container_id=""

cleanup() {
  [[ -z "$container_id" ]] || docker stop "$container_id" >/dev/null 2>&1 || true
}
trap cleanup EXIT

# Disposable credentials and no published ports or external network access.
container_id="$(docker run --rm --detach --network none \
  --memory 512m --memory-swap 512m \
  -e PORT=3000 -e USE_IN_MEMORY_REPOSITORY=true \
  -e PUBLIC_DEMO_USER=smoke-test \
  -e PUBLIC_DEMO_PASSWORD=disposable-smoke-test \
  "$image")"

if ! docker exec "$container_id" node --input-type=module -e '
  import assert from "node:assert/strict";
  import { setTimeout } from "node:timers/promises";

  const base = "http://127.0.0.1:3000";
  const credentials = `${process.env.PUBLIC_DEMO_USER}:${process.env.PUBLIC_DEMO_PASSWORD}`;
  const headers = { Authorization: `Basic ${Buffer.from(credentials).toString("base64")}` };
  let ready = false;
  for (let attempt = 0; attempt < 90; attempt++) {
    try {
      const response = await fetch(`${base}/healthz`, { signal: AbortSignal.timeout(2000) });
      if (response.status === 200) {
        assert.equal((await response.json()).status, "ok");
        ready = true;
        break;
      }
    } catch {}
    await setTimeout(1000);
  }
  assert.ok(ready, "Web and API must become healthy within 90 attempts");
  console.log("PASS health: Web and internal API");

  for (const path of ["/", "/admin/animais", "/api/animals"]) {
    assert.equal((await fetch(`${base}${path}`)).status, 401, `${path} must require credentials`);
  }
  console.log("PASS authentication: public, admin and API routes require credentials");

  assert.equal((await fetch(base, { headers })).status, 200);
  const health = await fetch(`${base}/api/health`, { headers });
  assert.equal(health.status, 200);
  assert.equal((await health.json()).status, "ok");
  const response = await fetch(`${base}/api/animals`, { headers });
  assert.equal(response.status, 200);
  const animals = await response.json();
  assert.ok(Array.isArray(animals) && animals.length > 0);
  console.log(`PASS authenticated page and API proxy: ${animals.length} demo animals`);
'; then
  docker logs --tail 80 "$container_id"
  exit 1
fi

docker stats --no-stream --format 'Memory snapshot: {{.MemUsage}}' "$container_id"
