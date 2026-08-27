# shellcheck shell=bash

_rr_self="$(readlink -f -- "${BASH_SOURCE[0]:-$0}")"
_rr_instructions="$(cd -- "$(dirname -- "$_rr_self")/../.." && pwd -P)"
_rr_beside="$(dirname -- "$_rr_instructions")"

if [ ! -f "$_rr_instructions/tools/ops/cli.ts" ]; then
  printf 'repo-roots.sh: derived %s, which is not an instructions checkout\n' \
    "$_rr_instructions" >&2
  unset _rr_self _rr_instructions _rr_beside
  return 1 2>/dev/null || exit 1
fi

export INSTRUCTIONS_ROOT="${INSTRUCTIONS_ROOT:-$_rr_instructions}"
export AKASHA_ROOT="${AKASHA_ROOT:-$_rr_beside/akasha}"
export CODE_ROOT="${CODE_ROOT:-$_rr_beside/code}"
export MEMORY_ROOT="${MEMORY_ROOT:-$_rr_beside/memory}"
export BOOKS_ROOT="${BOOKS_ROOT:-$_rr_beside/books}"
export STORIES_ROOT="${STORIES_ROOT:-$_rr_beside/stories}"
export CODE_EDITOR_ROOT="${CODE_EDITOR_ROOT:-$_rr_beside/code-editor}"

unset _rr_self _rr_instructions _rr_beside
