#!/usr/bin/env bash

set -euo pipefail

SELF_PATH="${BASH_SOURCE[0]}"
SELF_DIR="${SELF_PATH%/*}"
if [ "$SELF_DIR" = "$SELF_PATH" ]; then SELF_DIR="."; fi
SAY_REFUSAL="$SELF_DIR/../lib/say-refusal.ts"
. "$SELF_DIR/../lib/repo-roots.sh"

INSTRUCTIONS_AT="$(realpath -m "$INSTRUCTIONS_ROOT")"
MEMORY_AT="$(realpath -m "$MEMORY_ROOT")"
BOOKS_AT="$(realpath -m "$BOOKS_ROOT")"
STORIES_AT="$(realpath -m "$STORIES_ROOT")"

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // ""')

[ -z "$FILE_PATH" ] && exit 0

RESOLVED=$(realpath -m "$FILE_PATH")

inside() {
  [ "$RESOLVED" = "$1" ] || [[ "$RESOLVED" == "$1"/* ]]
}

if inside "$INSTRUCTIONS_AT"; then
  ROOT="$INSTRUCTIONS_AT"
  REPO="instructions"
elif inside "$MEMORY_AT"; then
  ROOT="$MEMORY_AT"
  REPO="memory"
elif inside "$BOOKS_AT"; then
  ROOT="$BOOKS_AT"
  REPO="books"
elif inside "$STORIES_AT"; then
  ROOT="$STORIES_AT"
  REPO="stories"
else
  exit 0
fi

REL="${RESOLVED#"$ROOT"/}"

if git -C "$ROOT" check-ignore -q "$RESOLVED" 2>/dev/null; then
  exit 0
fi

MSG=$(bun "$SAY_REFUSAL" block-instructions-direct-write \
  --path "$FILE_PATH" --resolved "$RESOLVED" --repo "$REPO" --root "$ROOT" --rel "$REL")
echo "$MSG" >&2
jq -n --arg reason "$MSG" '{decision: "block", reason: $reason}'
exit 2
