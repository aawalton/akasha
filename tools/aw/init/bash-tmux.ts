import { DEFAULT_ACCOUNT } from "../../lib/default-account.ts"
import {
  envScrubShell,
  launchModeFlags,
  scopeShell,
  serverOptionShell,
  supervisorEntryShell,
} from "../../lib/tmux-launch-recipe.ts"
import { personaDocumentGateLines, personaDocumentStandsShell } from "./persona-document.ts"
import { PROXY, ROOT_LOCAL, SEAT_START_DIR, SUPERVISOR } from "./entry-points.ts"
import { implName } from "./reload.ts"
import { payloadEscapeLines, resolveTokensLines, SEAT_COMMAND_REL } from "./state-seat.ts"
import {
  INTERACTIVE_PRINCIPAL,
  spelledSeatNameLines,
  stateSeatFromRowLines,
} from "./state-seat-attributes.ts"

export const TMUX_LAUNCH_FN = "_aw_tmux_launch"

const INTERACTIVE_MODE_FLAGS = launchModeFlags(false)
  .map((one) => ` ${one}`)
  .join("")

export const SEAT_LIVE_FN = "_aw_seat_live"

export function seatLiveFnLines(): readonly string[] {
  return [
    `${SEAT_LIVE_FN}() {`,
    `  tmux has-session -t "=$1" 2>/dev/null || return 1`,
    `  case "$(tmux list-panes -s -t "=$1" -F '#{pane_dead}' 2>/dev/null)" in`,
    "    *0*) return 0 ;;",
    "  esac",
    "  return 1",
    "}",
  ]
}

export function tmuxLaunchFnLines(): readonly string[] {
  return [
    `${TMUX_LAUNCH_FN}() {`,
    '  local _use_tmux="$1" _seat="$2"',
    "  shift 2",
    `  ${ROOT_LOCAL}`,
    `  if [ ! -d "${SEAT_START_DIR}" ]; then`,
    `    echo "${SEAT_START_DIR} is not there, so this seat has nowhere to start." >&2`,
    "    return 1",
    "  fi",
    `  local _cmd=(${supervisorEntryShell(PROXY, SUPERVISOR)}${INTERACTIVE_MODE_FLAGS})`,
    '  _cmd+=("$@")',
    '  if [ "$_use_tmux" != 1 ]; then',
    `    ( cd "${SEAT_START_DIR}" && "\${_cmd[@]}" )`,
    "    return $?",
    "  fi",
    '  if ! command -v tmux >/dev/null 2>&1; then',
    '    echo "tmux is not installed, so this seat cannot be started under one. Re-run with --no-tmux to start it in this terminal." >&2',
    "    return 1",
    "  fi",
    `  if tmux has-session -t "=$_seat" 2>/dev/null && ! ${SEAT_LIVE_FN} "$_seat"; then`,
    '    echo "the tmux session holding \x27$_seat\x27 has only a dead pane; stopping it, ' +
      'then starting a new one." >&2',
    '    tmux kill-session -t "=$_seat" 2>/dev/null || {',
    '      echo "the dead tmux session holding \x27$_seat\x27 would not stop, so nothing ' +
      'was started." >&2',
    "      return 1",
    "    }",
    "  fi",
    '  if ! tmux has-session -t "=$_seat" 2>/dev/null; then',
    '    local _unit="tmux-seat-$_seat-$(date +%s%3N)"',
    "    local _scope=()",
    "    if command -v systemd-run >/dev/null 2>&1; then",
    `      _scope=(${scopeShell('"--unit=$_unit"')})`,
    "    else",
    '      echo "no systemd-run, so this tmux server is starting inside this terminal\x27s own cgroup and will be killed when the editor quits." >&2',
    "    fi",
    `    "\${_scope[@]}" tmux ${serverOptionShell()} \\; new-session -d -s "$_seat" -c "${SEAT_START_DIR}" -- ` +
      `${envScrubShell()} "\${_cmd[@]}" || return 1`,
    "  fi",
    '  tmux attach-session -t "=$_seat"',
    "}",
  ]
}

function flagLines(name: string, withForce = false): readonly string[] {
  return [
    `  local _${name}_tmux=1`,
    ...(withForce ? [`  local _${name}_force=0`] : []),
    `  local _${name}_argv=() _${name}_flag`,
    `  for _${name}_flag in "$@"; do`,
    `    case "$_${name}_flag" in`,
    `      --no-tmux) _${name}_tmux=0 ;;`,
    ...(withForce ? [`      --force) _${name}_force=1 ;;`] : []),
    `      *) _${name}_argv+=("$_${name}_flag") ;;`,
    "    esac",
    "  done",
    `  set -- "\${_${name}_argv[@]}"`,
  ]
}

function seatNameSplitLines(name: string): readonly string[] {
  return [
    `  if [ "$#" = 1 ] && [ "$name" != "\${name%%-*}" ] && ` +
      `[ -f "$_root/${SEAT_COMMAND_REL}" ] && ` +
      `! { ${personaDocumentStandsShell("name")}; }; then`,
    `    set -- "\${name%%-*}" "\${name#*-}"`,
    '    name="$1"',
    "  fi",
  ]
}

export function seatNewFn(name: string): string {
  return [
    `${implName(name)}() {`,
    ...flagLines(name, true),
    '  local name="$1"',
    '  if [ -z "$name" ]; then',
    `    echo "Usage: ${name} <persona> [<role>] [<domain>] [--no-tmux] [--force], or ${name} <seat-name> [--no-tmux] [--force]"`,
    "    return 1",
    "  fi",
    `  ${ROOT_LOCAL}`,
    ...seatNameSplitLines(name),
    ...payloadEscapeLines(name),
    `  local _${name}_typed_role="" _${name}_typed_domain="" _${name}_sorted=""`,
    `  if [ "$#" -gt 1 ] && [ -f "$_root/${SEAT_COMMAND_REL}" ]; then`,
    ...resolveTokensLines(name),
    `      echo "${name}: nothing was launched and nothing was stopped. Name the slots ` +
      `yourself if the sort cannot: ${name} <persona> <role> <domain>" >&2`,
    "      return 1",
    "    }",
    `    _${name}_typed_role=$(printf '%s\\n' "$_${name}_sorted" | sed -n 's/^role=//p')`,
    `    _${name}_typed_domain=$(printf '%s\\n' "$_${name}_sorted" | sed -n 's/^domain=//p')`,
    `  elif [ "$#" -gt 1 ]; then`,
    `    _${name}_typed_role="$2"`,
    "  fi",
    ...spelledSeatNameLines(name),
    ...personaDocumentGateLines(name, "name"),
    "  local full_aid agent_flag=()",
    `  local _${name}_stop_flags=() _${name}_stop_err _${name}_stop_rc=0`,
    `  [ "$_${name}_force" = 1 ] && _${name}_stop_flags+=(--force)`,
    `  _${name}_stop_err="/var/tmp/aw-${name}-stop-$$.err"`,
    `  ops seat stop "$_${name}_seat" "\${_${name}_stop_flags[@]}" ` +
      `>/dev/null 2>"$_${name}_stop_err"`,
    `  _${name}_stop_rc=$?`,
    `  if [ "$_${name}_stop_rc" != 0 ] && [ "$_${name}_stop_rc" != 2 ]; then`,
    `    cat "$_${name}_stop_err" >&2`,
    `    rm -f "$_${name}_stop_err"`,
    `    return "$_${name}_stop_rc"`,
    "  fi",
    `  rm -f "$_${name}_stop_err"`,
    `  if [ "$_${name}_stop_rc" = 2 ] && [ "$_${name}_tmux" = 1 ] && ` +
      `command -v tmux >/dev/null 2>&1 && ` +
      `tmux has-session -t "=$_${name}_seat" 2>/dev/null; then`,
    `    echo "${name}: '$_${name}_seat' holds a tmux session with no seat page; stopping ` +
      `it, then starting a new seat under that name." >&2`,
    `    tmux kill-session -t "=$_${name}_seat" 2>/dev/null || {`,
    `      echo "${name}: the tmux session holding '$_${name}_seat' would not stop, so ` +
      `nothing was started." >&2`,
    "      return 1",
    "    }",
    "  fi",
    `  local _${name}_stated=(--start-mode interactive --persona "$name" ` +
    `--principal ${INTERACTIVE_PRINCIPAL})`,
    `  [ -n "$_${name}_typed_role" ] && _${name}_stated+=(--role "$_${name}_typed_role")`,
    `  [ -n "$_${name}_typed_domain" ] && ` +
      `_${name}_stated+=(--domain "$_${name}_typed_domain")`,
    `  [ "$_${name}_tmux" = 1 ] || _${name}_stated+=(--no-launch)`,
    `  full_aid=$(ops seat start "\${_${name}_stated[@]}") || {`,
    `    echo "${name}: '$_${name}_seat' was not bound, so nothing was launched." >&2`,
    "    return 1",
    "  }",
    `  full_aid=$(printf '%s' "$full_aid" | cut -f1)`,
    '  if [ -z "$full_aid" ]; then',
    `    echo "${name}: '$_${name}_seat' bound no agent id, so nothing was launched." >&2`,
    "    return 1",
    "  fi",
    '  agent_flag=(--agent-id "$full_aid")',
    ...stateSeatFromRowLines(name),
    `  ${TMUX_LAUNCH_FN} "$_${name}_tmux" "$_${name}_seat" ` +
      `-a ${DEFAULT_ACCOUNT} "\${agent_flag[@]}"`,
    "  local _rc=$?",
    "  return $_rc",
    "}",
  ].join("\n")
}

export function seatResumeFn(name: string): string {
  return [
    `${implName(name)}() {`,
    ...flagLines(name),
    '  local name="$1"',
    '  if [ -z "$name" ]; then',
    `    echo "Usage: ${name} <seat-name> [--no-tmux]"`,
    "    return 1",
    "  fi",
    `  ${ROOT_LOCAL}`,
    `  if [ "$_${name}_tmux" = 1 ] && command -v tmux >/dev/null 2>&1 && ` +
      `${SEAT_LIVE_FN} "$name"; then`,
    `    tmux attach-session -t "=$name"`,
    "    return $?",
    "  fi",
    ...payloadEscapeLines(name),
    "  local full_aid full_sid",
    "  IFS=$'\\t' read -r full_aid full_sid < <(ops seat resume \"$name\" --start-mode interactive --no-launch)",
    '  if [ -z "$full_sid" ]; then',
    `    echo "${name}: no resumable session for seat '$name'" >&2`,
    "    return 1",
    "  fi",
    ...stateSeatFromRowLines(name),
    `  ${TMUX_LAUNCH_FN} "$_${name}_tmux" "$name" -a ${DEFAULT_ACCOUNT} -r ` +
      `--agent-id "$full_aid" --session-id "$full_sid"`,
    "  local _rc=$?",
    "  return $_rc",
    "}",
  ].join("\n")
}
