# shellcheck shell=bash

_rr_self="$(readlink -f -- "${BASH_SOURCE[0]:-$0}")"
_rr_own="$(cd -- "$(dirname -- "$_rr_self")/../.." && pwd -P)"
_rr_beside="$(dirname -- "$_rr_own")"

# The file this is sourced from stands in akasha, so the root two directories above it is
# akasha or this is not a checkout worth naming roots from. Refuse rather than fall back to a
# sibling guess: the guess named a directory that need not be there, and every caller read the
# name as a root that was.
if [ ! -f "$_rr_own/tools/ops/cli.ts" ]; then
  printf 'repo-roots.sh: derived %s, which holds no tools/ops/cli.ts, so it is not an akasha checkout\n' \
    "$_rr_own" >&2
  unset _rr_self _rr_own _rr_beside
  return 1 2>/dev/null || exit 1
fi

export AKASHA_ROOT="${AKASHA_ROOT:-$_rr_own}"

# A sibling is exported only where it is a checkout, on the same rule `repo/roots/roots.ts` applies
# to the repositories it derives: a name that is set stands for a root that is there.
if [ -e "$_rr_beside/code-editor/.git" ]; then
  export CODE_EDITOR_ROOT="${CODE_EDITOR_ROOT:-$_rr_beside/code-editor}"
fi

unset _rr_self _rr_own _rr_beside
