#!/usr/bin/env bash

set -euo pipefail

SELF_PATH="${BASH_SOURCE[0]}"
SELF_DIR="${SELF_PATH%/*}"
if [ "$SELF_DIR" = "$SELF_PATH" ]; then SELF_DIR="."; fi
SAY_REFUSAL="$SELF_DIR/../lib/say-refusal.ts"

OUTPUT_DIR="${PLAYWRIGHT_MCP_OUTPUT_DIR:-$HOME/.playwright-mcp}"
OUTPUT_DIR="${OUTPUT_DIR%/}"

INPUT=$(cat)
FILENAME=$(echo "$INPUT" | jq -r '.tool_input.filename // ""')

[ -z "$FILENAME" ] && exit 0

case "$FILENAME" in
  "$OUTPUT_DIR"/*) exit 0 ;;
esac

MSG=$(bun "$SAY_REFUSAL" block-playwright-stray-filename \
  --filename "$FILENAME" --dir "$OUTPUT_DIR" --base "$(basename "$FILENAME")")

echo "$MSG" >&2
jq -n --arg msg "$MSG" '{decision: "block", reason: $msg}'
exit 2
