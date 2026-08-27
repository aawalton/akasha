# shellcheck shell=bash

_rr_self="$(readlink -f -- "${BASH_SOURCE[0]:-$0}")"
_rr_own="$(cd -- "$(dirname -- "$_rr_self")/../.." && pwd -P)"
_rr_beside="$(dirname -- "$_rr_own")"

if [ ! -f "$_rr_own/tools/ops/cli.ts" ]; then
  printf 'repo-roots.sh: derived %s, which holds no tools/ops/cli.ts\n' \
    "$_rr_own" >&2
  unset _rr_self _rr_own _rr_beside
  return 1 2>/dev/null || exit 1
fi

if [ -d "$_rr_own/checks/check" ]; then
  export AKASHA_ROOT="${AKASHA_ROOT:-$_rr_own}"
  export INSTRUCTIONS_ROOT="${INSTRUCTIONS_ROOT:-$_rr_beside/instructions}"
else
  export INSTRUCTIONS_ROOT="${INSTRUCTIONS_ROOT:-$_rr_own}"
  export AKASHA_ROOT="${AKASHA_ROOT:-$_rr_beside/akasha}"
fi
export CODE_ROOT="${CODE_ROOT:-$_rr_beside/code}"
export MEMORY_ROOT="${MEMORY_ROOT:-$_rr_beside/memory}"
export BOOKS_ROOT="${BOOKS_ROOT:-$_rr_beside/books}"
export STORIES_ROOT="${STORIES_ROOT:-$_rr_beside/stories}"
export CODE_EDITOR_ROOT="${CODE_EDITOR_ROOT:-$_rr_beside/code-editor}"

unset _rr_self _rr_own _rr_beside
