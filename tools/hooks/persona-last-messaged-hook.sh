#!/usr/bin/env bash

set -euo pipefail

PAYLOAD="$(cat 2>/dev/null || true)"

[[ -z "${AGENT_ID:-}" ]] && exit 0

STAMP="$(cd "$(dirname "${BASH_SOURCE[0]}")/../lib" && pwd)/persona-last-messaged.ts"

( nohup bun "$STAMP" "$AGENT_ID" >/dev/null 2>&1 <<<"$PAYLOAD" & ) || true

exit 0
