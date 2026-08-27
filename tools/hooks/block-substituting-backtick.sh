#!/usr/bin/env bash

set -euo pipefail

HEALTH_DIR="${CLAUDE_HOOK_HEALTH_DIR:-/var/tmp/claude-hook-health}"
HEALTH_FILE="$HEALTH_DIR/block-substituting-backtick.jsonl"

report_uninspected() {
  trap - ERR EXIT
  local detail="$1"
  mkdir -p "$HEALTH_DIR" 2>/dev/null || true
  printf '{"hook":"block-substituting-backtick","at":%s,"uninspected":"%s"}\n' \
    "${EPOCHSECONDS:-0}" "$detail" >>"$HEALTH_FILE" 2>/dev/null || true
  printf 'block-substituting-backtick: %s — FAILED OPEN, this Bash call was NOT inspected\n' \
    "$detail" >&2
  printf '{"systemMessage":"block-substituting-backtick did not inspect a Bash call (%s) and failed open. See %s"}\n' \
    "$detail" "$HEALTH_FILE"
  exit 0
}
trap 'report_uninspected "internal failure: exit $? at line $LINENO"' ERR

SELF_PATH="${BASH_SOURCE[0]}"
SELF_DIR="${SELF_PATH%/*}"
if [ "$SELF_DIR" = "$SELF_PATH" ]; then SELF_DIR="."; fi
DECIDER="$SELF_DIR/../lib/refuse-substituting-backtick.ts"

BUN="${HOME:-}/.bun/bin/bun"
if [ ! -x "$BUN" ]; then BUN=bun; fi

if [ "${1:-}" = "--scope" ]; then
  exec "$BUN" "$DECIDER" --scope
fi

INPUT=""
IFS= read -r -d '' INPUT || true

case "$INPUT" in
  *'`'*) ;;
  *) exit 0 ;;
esac

DECISION=0
printf '%s' "$INPUT" | "$BUN" "$DECIDER" || DECISION=$?

if [ "$DECISION" -eq 2 ]; then
  exit 2
elif [ "$DECISION" -eq 0 ]; then
  exit 0
elif [ "$DECISION" -eq 3 ]; then
  report_uninspected "the command could not be parsed"
fi

report_uninspected "internal failure: the decider exited $DECISION"
