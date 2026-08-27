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
  MSG=$(bun "$SAY_REFUSAL" block-addon-direct-install)
  echo "$MSG" >&2
  jq -n --arg reason "$MSG" '{decision: "block", reason: $reason}'
  exit 2
}

invokes_ops_verb() {
  local segment="$1" verb="$2"
  local seen_ops="" rest=""
  for word in $segment; do
    if [ -z "$seen_ops" ]; then
      case "$word" in
        *=*|env|bun|run) continue ;;
        ops|*/ops|ops/cli.ts|*/ops/cli.ts) seen_ops=1 ;;
        *) return 1 ;;
      esac
      continue
    fi
    rest="$rest $word"
  done
  [ -n "$seen_ops" ] || return 1
  case "$rest " in
    " temper addon $verb "*) return 0 ;;
  esac
  return 1
}

# shellcheck disable=SC2001
CMD_JOINED=$(echo "$CMD" | sed -e ':a' -e '/\\$/{N; s/\\\n/ /; ta' -e '}')
# shellcheck disable=SC2001
CMD_DEQUOTED=$(echo "$CMD_JOINED" | sed "s/'[^']*'//g; s/\"[^\"]*\"//g")
# shellcheck disable=SC2001
SEGMENTS=$(echo "$CMD_DEQUOTED" | sed 's/[|;&]\{1,2\}/\n/g')

while IFS= read -r segment; do
  segment="${segment#"${segment%%[![:space:]]*}"}"
  [ -z "$segment" ] && continue

  if invokes_ops_verb "$segment" install; then
    case " $segment " in
      *" --help "*|*" -h "*) : ;;
      *) emit_block ;;
    esac
  fi

  if invokes_ops_verb "$segment" build; then
    case " $segment " in
      *" --build-only "*|*" --watch "*|*" --help "*|*" -h "*) : ;;
      *) emit_block ;;
    esac
  fi
done <<< "$SEGMENTS"

exit 0
