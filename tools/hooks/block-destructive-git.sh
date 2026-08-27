#!/usr/bin/env bash

set -euo pipefail

SELF_PATH="${BASH_SOURCE[0]}"
SELF_DIR="${SELF_PATH%/*}"
if [ "$SELF_DIR" = "$SELF_PATH" ]; then SELF_DIR="."; fi
SAY_REFUSAL="$SELF_DIR/../lib/say-refusal.ts"

read -r -d '' SCOPE <<'DECLARED' || true
predicate-derivation: open-sample — git enumerates its verb vocabulary exactly, but authors no
  classification that separates THIS hazard, so there is nothing here to derive the protected set
  from. Measured against every group `git --list-cmds` exposes: all seven verbs above sit in
  `list-mainporcelain` beside status, log, diff and grep; `list-worktree` is {add, mv, restore, rm},
  two of the seven plus two non-hazards, missing five; five of the seven sit in no attribute group
  at all. Blocking any whole group would refuse ordinary read-only calls. And the hazard is
  SUB-VERB — `worktree list` reads while `worktree remove --force` destroys, `config --get` reads
  while `config --unset` writes — so no verb-level enumeration of any kind can express it. The
  reason is structural: the hazard is "destroys another agent's uncommitted work in a worktree
  several agents share", and git has no notion of several agents sharing a worktree, so it holds
  no opinion to derive from. This list therefore samples an open world; it does not define one.
  NOT REACHED. Each measured against this script, not supposed:
    - git checkout-index -a -f      writes the working tree from the index
    - git read-tree -u <tree>       writes the working tree from a tree
    - git worktree remove --force   removes a worktree holding uncommitted work
    - git update-ref, symbolic-ref, update-index, switch, revert, apply, reflog expire, gc
    - a git invocation carrying no determinable subcommand (bare `git`, or global flags only)
    - a destructive verb inside a quoted payload, which the dequoting step strips before
      segmentation — and, in the opposite direction, one merely QUOTED in a heredoc body, which
      that step does not strip, so data naming a verb is refused as though it were a command
  The absence of a verb from this list is NOT a finding that it is safe; it is unexamined.
  Do not close a gap here by adding the verb. A denylist over an open hazard family teaches its
  own holes: the refusal is what sends a reader looking for the neighbouring verb it did not name,
  and a longer list is a longer search prompt. A gap found here is evidence that this guard cannot
  close its class, not an invitation to extend it.
  Printed by `block-destructive-git.sh --scope`, which is the one place this stands: it is
  what the program says about itself, held as the text it prints rather than as a comment.
DECLARED

if [ "${1:-}" = "--scope" ]; then
  printf '%s\n' "$SCOPE"
  exit 0
fi

INPUT=$(cat)
CMD=$(echo "$INPUT" | jq -r '.tool_input.command // ""')

[ -z "$CMD" ] && exit 0

CMD_CLEAN=$(echo "$CMD" | sed 's/^[[:space:]]*//' | tr -s ' ')

BLOCKED_VERBS=(stash reset rebase checkout restore clean rm)

extract_subcmd_and_args() {
  local segment="$1"
  local head="" subcmd="" rest=""
  local phase="head"
  local skip_next=false
  local word

  for word in $segment; do
    case "$phase" in
      head)
        if [[ "$word" =~ ^[A-Za-z_][A-Za-z0-9_]*= ]]; then continue; fi
        if [ "$word" = "sudo" ] || [ "$word" = "env" ]; then continue; fi
        head="$word"
        phase="flags"
        ;;
      flags)
        if $skip_next; then
          skip_next=false
          continue
        fi
        case "$word" in
          -c|-C|--git-dir|--work-tree|--namespace|--super-prefix|--exec-path)
            skip_next=true
            continue ;;
          -*) continue ;;
          *)
            subcmd="$word"
            phase="rest" ;;
        esac
        ;;
      rest) rest+="${rest:+ }$word" ;;
    esac
  done

  local base="${head##*/}"
  if [ "$base" = "kubectl" ] || [ "$base" = "ssh" ]; then
    return 1
  fi
  if [ "$base" != "git" ]; then
    return 1
  fi
  if [ -z "$subcmd" ]; then
    return 1
  fi
  printf '%s\t%s\n' "$subcmd" "$rest"
}

check_segment() {
  local segment="$1"
  local extracted
  if ! extracted=$(extract_subcmd_and_args "$segment"); then
    return 0
  fi
  local subcmd="${extracted%%	*}"
  local rest="${extracted#*	}"

  local verb
  for verb in "${BLOCKED_VERBS[@]}"; do
    if [ "$subcmd" = "$verb" ]; then
      printf 'block-destructive-git-%s\t' "$verb"
      return 0
    fi
  done

  if [ "$subcmd" = "commit" ]; then
    for word in $rest; do
      case "$word" in
        --amend|--amend=*)
          printf 'block-destructive-git-amend\t'
          return 0 ;;
      esac
    done
  fi

  if [ "$subcmd" = "push" ]; then
    for word in $rest; do
      case "$word" in
        --force|-f|--force-with-lease|--force-with-lease=*|--force-if-includes)
          printf 'block-destructive-git-force-push\t'
          return 0 ;;
      esac
    done
  fi

  if [ "$subcmd" = "branch" ]; then
    local saw_delete=false
    local saw_force=false
    for word in $rest; do
      case "$word" in
        -D)
          printf 'block-destructive-git-branch-delete\tbranch -D'
          return 0 ;;
        --delete) saw_delete=true ;;
        --force|-f) saw_force=true ;;
      esac
    done
    if $saw_delete && $saw_force; then
      printf 'block-destructive-git-branch-delete\tbranch --delete --force'
      return 0
    fi
  fi

  return 0
}

BLOCK_SLUG=""
BLOCK_INVOCATION=""

# shellcheck disable=SC2001
CMD_DEQUOTED=$(echo "$CMD_CLEAN" | sed "s/'[^']*'//g; s/\"[^\"]*\"//g")
# shellcheck disable=SC2001
SEGMENTS=$(echo "$CMD_DEQUOTED" | sed 's/[|;&]\{1,2\}/\n/g')
while IFS= read -r segment; do
  segment="${segment#"${segment%%[![:space:]]*}"}"
  [ -z "$segment" ] && continue

  result=$(check_segment "$segment")
  if [ -n "$result" ]; then
    IFS=$'\t' read -r BLOCK_SLUG BLOCK_INVOCATION <<< "$result"
    break
  fi
done <<< "$SEGMENTS"

if [ -n "$BLOCK_SLUG" ]; then
  SAY=("$SAY_REFUSAL" "$BLOCK_SLUG")
  [ -n "$BLOCK_INVOCATION" ] && SAY+=(--invocation "$BLOCK_INVOCATION")
  MSG=$(bun "${SAY[@]}")
  echo "$MSG" >&2
  jq -n --arg reason "$MSG" '{decision: "block", reason: $reason}'
  exit 2
fi

exit 0
