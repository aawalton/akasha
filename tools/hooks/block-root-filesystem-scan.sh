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
  MSG=$(bun "$SAY_REFUSAL" block-root-filesystem-scan)
  echo "$MSG" >&2
  jq -n --arg reason "$MSG" '{decision: "block", reason: $reason}'
  exit 2
}

is_grep_family() {
  case "$1" in
    grep | ugrep | egrep | fgrep | rg | ripgrep) return 0 ;;
    *) return 1 ;;
  esac
}
is_find_family() {
  case "$1" in
    find | fd | fdfind) return 0 ;;
    *) return 1 ;;
  esac
}
recurses_by_default() {
  case "$1" in
    rg | ripgrep) return 0 ;;
    *) return 1 ;;
  esac
}

d=$(printf '\044')
t=$(printf '\176')
DANGEROUS_ROOTS=(
  "/" "/."
  "${t}" "${t}/"
  "${d}HOME" "${d}HOME/"
  "${d}{HOME}" "${d}{HOME}/"
  "/proc" "/proc/" "/sys" "/sys/" "/dev" "/dev/"
)

is_dangerous_root() {
  local candidate="$1" root
  for root in "${DANGEROUS_ROOTS[@]}" "$HOME" "$HOME/"; do
    [ "$candidate" = "$root" ] && return 0
  done
  return 1
}

segment_command() {
  echo "$1" | awk '{
    for (i=1; i<=NF; i++) {
      if ($i ~ /^[A-Za-z_][A-Za-z0-9_]*=/) continue
      if ($i == "sudo" || $i == "env") continue
      n = $i
      sub(/.*\//, "", n)   # strip any leading path
      print n; exit
    }
  }'
}

segment_args() {
  echo "$1" | awk '{
    found = 0
    out = ""
    for (i=1; i<=NF; i++) {
      if (!found) {
        if ($i ~ /^[A-Za-z_][A-Za-z0-9_]*=/) continue
        if ($i == "sudo" || $i == "env") continue
        found = 1
        continue
      }
      out = (out == "" ? $i : out " " $i)
    }
    print out
  }'
}

has_recursive_flag() {
  for word in $1; do
    case "$word" in
      --recursive | --dereference-recursive | -R | --include-dir | --recurse) return 0 ;;
      --*) ;;
      -r) return 0 ;;
      -*[rR]*) return 0 ;;
    esac
  done
  return 1
}

check_segment() {
  local segment="$1"
  local cmd
  cmd=$(segment_command "$segment")
  [ -z "$cmd" ] && return 0

  local args
  args=$(segment_args "$segment")

  if is_grep_family "$cmd"; then
    if recurses_by_default "$cmd" || has_recursive_flag "$args"; then
      for word in $args; do
        case "$word" in
          -*) continue ;;
        esac
        if is_dangerous_root "$word"; then
          emit_block
        fi
      done
    fi
    return 0
  fi

  if is_find_family "$cmd"; then
    for word in $args; do
      case "$word" in
        -*) continue ;;
      esac
      if is_dangerous_root "$word"; then
        emit_block
      fi
    done
    return 0
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
  first=$(printf '%s' "$segment" | awk '{print $1}')
  case "$first" in
    ssh | kubectl) continue ;;
  esac
  check_segment "$segment"
done <<< "$SEGMENTS"

exit 0
