import { ROOT } from "./entry-points.ts"

export const ENDED_FN = "__editor_terminal_ended"

/**
 * The record an editor terminal's shell leaves behind saying how it ended.
 *
 * THE SHELL IS THE ONLY THING THAT KNOWS. Its parent is the editor's pty host, which
 * records that a pty is gone but never why, and the page beside it is keyed by a pid
 * the kernel is free to hand out again before any sweep reads it. The shell itself
 * still holds `$?`, and a shell ended by a signal carries that signal in it as 128
 * plus the number.
 *
 * IT ADDRESSES ITS OWN PAGE. `pages/code-editor-terminal` names every page
 * `<pid>-<starttime>`, and both of those stand in the shell's own `/proc` entry, so it
 * writes beside the page for itself without being told which one that is.
 *
 * THE FILE IS UNCOMMITTED, which is what lets a shell that is already dying write it:
 * a file its repo ignores is written without passing the write gate.
 *
 * SIGKILL LEAVES NOTHING, AND THAT IS THE POINT. No shell can trap it, so a terminal
 * whose page stands with no record beside it was killed outright rather than asked to
 * go — which is the one fact this is here to settle.
 */
export function terminalEndedFnLines(): readonly string[] {
  return [
    `${ENDED_FN}() {`,
    "  local _status=${1:-$?}",
    `  local _root="${ROOT}"`,
    '  local _dir="$_root/pages/code-editor-terminal"',
    '  [ -d "$_dir" ] || return 0',
    '  local _stat _rest _start _signal=""',
    "  _stat=$(</proc/$$/stat) || return 0",
    '  _rest="${_stat##*) }"',
    `  _start=$(printf '%s' "$_rest" | awk '{ print $20 }')`,
    '  [ -n "$_start" ] || return 0',
    '  [ "$_status" -gt 128 ] && _signal=$(kill -l $((_status - 128)) 2>/dev/null)',
    `  printf '{"ended-at":"%s","status":%s,"signal":"%s","pid":%s,"ppid":%s,"tty":"%s"}\\n' \\`,
    `    "$(date -Is)" "$_status" "$_signal" "$$" "$PPID" "$(tty 2>/dev/null)" \\`,
    `    > "$_dir/$$-$_start.code-editor-terminal.ended.uncommitted.attachment.json" 2>/dev/null`,
    "  return 0",
    "}",
  ]
}

/**
 * The traps that reach the record, set only in the editor's own terminals.
 *
 * A SHELL ENDED BY AN UNCAUGHT SIGNAL NEVER REACHES ITS EXIT TRAP, so SIGHUP records
 * in its own handler and then re-raises, leaving what the shell does about it exactly
 * as it was.
 *
 * SIGINT IS DELIBERATELY NOT TRAPPED: it is what Ctrl-C sends, and a handler here
 * would end the shell on a keystroke that today does nothing to it. SIGTERM is not
 * trapped either, an interactive bash ignoring it already.
 */
export function terminalEndedTrapLines(): readonly string[] {
  return [
    "# only the editor's own terminals, which are the ones losing their attachments",
    'if [ -n "${VSCODE_SHELL_INTEGRATION:-}" ]; then',
    `  trap '${ENDED_FN} 129; trap - HUP; kill -HUP $$' HUP`,
    `  trap '${ENDED_FN}' EXIT`,
    "fi",
  ]
}
