#!/usr/bin/env bash

set -euo pipefail

PAGE_QUERY_ORIGIN="${PAGE_QUERY_ORIGIN:-http://127.0.0.1:8787}"
HOOK_NAME="local-agent-session-start"
ROTATION_PATIENCE=2

STDIN=$(cat)
SOURCE=$(echo "$STDIN" | jq -r '.source // ""' 2>/dev/null || echo "")
SESSION_ID=$(echo "$STDIN" | jq -r '.session_id // ""' 2>/dev/null || echo "")
TRANSCRIPT_PATH=$(echo "$STDIN" | jq -r '.transcript_path // ""' 2>/dev/null || echo "")

[[ -z "${AGENT_ID:-}" ]] && exit 0
[[ -z "$SESSION_ID" || -z "$TRANSCRIPT_PATH" ]] && exit 0

SELF_DIR="$(cd -P "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "$SOURCE" == "clear" ]]; then
  . "$SELF_DIR/../lib/seat-page-read.sh"
  SEAT=$(seat_page_file "$AGENT_ID")
  SEAT="${SEAT##*/}"
  SEAT="${SEAT%.md}"
  SEAT="${SEAT//[^A-Za-z0-9._-]/}"
  if [[ -n "$SEAT" ]]; then
    curl -s -m "$ROTATION_PATIENCE" -o /dev/null \
      -X POST "${PAGE_QUERY_ORIGIN}/patch/seat/${SEAT}" \
      -H 'content-type: application/json' \
      -d "{\"writer\":\"${HOOK_NAME}\",\"values\":{\"rotated-session-uuid\":\"${SESSION_ID}\"}}" \
      2>/dev/null || true
  fi
fi

if [[ "${AGENT_LAUNCH:-}" == "spawned" ]]; then
  export SESSION_ID TRANSCRIPT_PATH
  ( nohup bun "$SELF_DIR/../session-flush.ts" >/dev/null 2>&1 & ) || true
fi

exit 0
