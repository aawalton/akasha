import { ROOT } from "./entry-points.ts"

export const ENDED_FN = "__editor_terminal_ended"

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

export function terminalEndedTrapLines(): readonly string[] {
  return [
    "# only the editor's own terminals, which are the ones losing their attachments",
    'if [ -n "${VSCODE_SHELL_INTEGRATION:-}" ]; then',
    `  trap '${ENDED_FN} 129; trap - HUP; kill -HUP $$' HUP`,
    `  trap '${ENDED_FN}' EXIT`,
    "fi",
  ]
}
