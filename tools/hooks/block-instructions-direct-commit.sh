#!/usr/bin/env bash

set -euo pipefail

SELF_PATH="${BASH_SOURCE[0]}"
SELF_DIR="${SELF_PATH%/*}"
if [ "$SELF_DIR" = "$SELF_PATH" ]; then SELF_DIR="."; fi
SAY_REFUSAL="$SELF_DIR/../lib/say-refusal.ts"
. "$SELF_DIR/../lib/repo-roots.sh"

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

[ -z "$CMD" ] && exit 0

SESSION_CWD=$(echo "$INPUT" | jq -r '.cwd // ""')
INSTRUCTIONS_AT=$(realpath -m "$INSTRUCTIONS_ROOT")
MEMORY_AT=$(realpath -m "$MEMORY_ROOT")

CLEAN=$(printf '%s' "$CMD" | tr -d "\"'" | tr -s ' ')

CURRENT="${SESSION_CWD:-/}"
CURRENT=$(realpath -m "$CURRENT")

expand_path() {
  local p="$1"
  p="${p/#\~/$HOME}"
  p="${p//\$HOME/$HOME}"
  [ -z "$p" ] && p="$HOME"
  if [[ "$p" != /* ]]; then
    p="$CURRENT/$p"
  fi
  realpath -m "$p"
}

repo_of() {
  if [ "$1" = "$INSTRUCTIONS_AT" ] || [[ "$1" == "$INSTRUCTIONS_AT"/* ]]; then
    printf 'instructions\n'
  elif [ "$1" = "$MEMORY_AT" ] || [[ "$1" == "$MEMORY_AT"/* ]]; then
    printf 'memory\n'
  fi
}

commit_target_dir() {
  local -a words
  read -ra words <<<"$1"

  local i=0
  while [ "$i" -lt "${#words[@]}" ]; do
    case "${words[$i]}" in
      [A-Za-z_]*=*) i=$((i + 1)) ;;
      sudo | env) i=$((i + 1)) ;;
      *) break ;;
    esac
  done

  local first="${words[$i]:-}"
  [ "$first" != "git" ] && return 0

  local explicit_dir=""
  local subcmd=""
  i=$((i + 1))
  while [ "$i" -lt "${#words[@]}" ]; do
    local w="${words[$i]}"
    case "$w" in
      -C | --work-tree)
        explicit_dir="${words[$((i + 1))]:-}"
        i=$((i + 2))
        ;;
      -c | --git-dir | --namespace | --super-prefix | --exec-path)
        i=$((i + 2))
        ;;
      -*)
        i=$((i + 1))
        ;;
      *)
        subcmd="$w"
        break
        ;;
    esac
  done

  [ "$subcmd" != "commit" ] && return 0

  if [ -n "$explicit_dir" ]; then
    expand_path "$explicit_dir"
  else
    printf '%s\n' "$CURRENT"
  fi
}

BLOCK_DIR=""
BLOCK_REPO=""

SEGMENTS=$(printf '%s' "$CLEAN" | sed 's/[|;&]\{1,2\}/\n/g')
while IFS= read -r segment; do
  segment="${segment#"${segment%%[![:space:]]*}"}"
  [ -z "$segment" ] && continue

  read -ra seg_words <<<"$segment"
  verb="${seg_words[0]:-}"

  if [ "$verb" = "ssh" ] || [ "$verb" = "kubectl" ]; then
    continue
  fi

  if [ "$verb" = "cd" ]; then
    CURRENT=$(expand_path "${seg_words[1]:-}")
    continue
  fi

  target=$(commit_target_dir "$segment")
  if [ -n "$target" ]; then
    repo=$(repo_of "$target")
    if [ -n "$repo" ]; then
      BLOCK_DIR="$target"
      BLOCK_REPO="$repo"
      break
    fi
  fi
done <<<"$SEGMENTS"

if [ -n "$BLOCK_DIR" ]; then
  MSG=$(bun "$SAY_REFUSAL" block-instructions-direct-commit \
    --repo "$BLOCK_REPO" --dir "$BLOCK_DIR")
  echo "$MSG" >&2
  jq -n --arg reason "$MSG" '{decision: "block", reason: $reason}'
  exit 2
fi

exit 0
