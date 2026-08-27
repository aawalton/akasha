#!/usr/bin/env bash
set -uo pipefail
[[ -z "${AGENT_ID:-}" ]] && exit 0

SELF_DIR="${BASH_SOURCE[0]%/*}"
. "$SELF_DIR/../lib/seat-page-read.sh"

SEAT_FILE=$(seat_page_file "$AGENT_ID")
[[ -z "$SEAT_FILE" ]] && exit 0
[[ -z "$(seat_page_value "$SEAT_FILE" "$SEAT_FORWARDS_TO_KEY")" ]] && exit 0

STDIN=$(cat 2>/dev/null || true)
TRANSCRIPT=$(printf '%s' "$STDIN" | jq -r '.transcript_path // ""' 2>/dev/null || echo "")
[[ -z "$TRANSCRIPT" ]] && exit 0

SEAT="${SEAT_FILE##*/}"
SEAT="${SEAT%.md}"
SEAT="${SEAT//[^A-Za-z0-9._-]/}"
[[ -z "$SEAT" ]] && exit 0

setsid bash "$SELF_DIR/../lib/forward-turn.sh" "$TRANSCRIPT" \
  >>"${FORWARD_TURN_LOG_DIR:-/var/tmp}/forward-turn-${SEAT}.log" 2>&1 &
exit 0
