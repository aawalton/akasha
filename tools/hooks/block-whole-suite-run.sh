#!/usr/bin/env bash

set -euo pipefail

SELF_PATH="${BASH_SOURCE[0]}"
SELF_DIR="${SELF_PATH%/*}"
if [ "$SELF_DIR" = "$SELF_PATH" ]; then SELF_DIR="."; fi
SAY_REFUSAL="$SELF_DIR/../lib/say-refusal.ts"

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

[ -z "$CMD" ] && exit 0

emit_block() {
  local MSG
  MSG=$(bun "$SAY_REFUSAL" block-whole-suite-run)
  echo "$MSG" >&2
  jq -n --arg reason "$MSG" '{decision: "block", reason: $reason}'
  exit 2
}

check_segment() {
  local segment="$1"
  local seen_bun=0 seen_test=0 named=0 word
  for word in $segment; do
    if [ "$seen_test" = 1 ]; then
      case "$word" in
        --help | -h) return 0 ;;
        -*) continue ;;
        *.test.ts | *.test.tsx) named=$((named + 1)) ;;
        *">"*) continue ;;
        *) emit_block ;;
      esac
      continue
    fi
    if [ "$seen_bun" = 1 ] && [ "$word" = "test" ]; then
      seen_test=1
      continue
    fi
    case "${word##*/}" in
      bun | bunx) seen_bun=1 ;;
      *) seen_bun=0 ;;
    esac
  done
  if [ "$seen_test" = 1 ] && [ "$named" = 0 ]; then
    emit_block
  fi
  return 0
}

# shellcheck disable=SC2001
CMD_DEQUOTED=$(echo "$CMD" | sed "s/'[^']*'//g; s/\"[^\"]*\"//g")
# shellcheck disable=SC2001
SEGMENTS=$(echo "$CMD_DEQUOTED" | sed 's/[|;&]\{1,2\}/\n/g')

while IFS= read -r segment; do
  segment="${segment#"${segment%%[![:space:]]*}"}"
  [ -z "$segment" ] && continue
  check_segment "$segment"
done <<< "$SEGMENTS"

exit 0
