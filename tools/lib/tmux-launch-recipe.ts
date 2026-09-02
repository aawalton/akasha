export const TMUX_HISTORY_LIMIT = "50000"

const SERVER_OPTIONS: readonly (readonly string[])[] = [
  ["set-option", "-g", "history-limit", TMUX_HISTORY_LIMIT],
  ["set-option", "-g", "status", "off"],
  ["set-option", "-g", "remain-on-exit", "failed"],
]

const SCOPE_COMMAND = "systemd-run"

const SCOPE_FLAGS: readonly string[] = ["--user", "--scope", "--collect", "--quiet"]

const ENV_SCRUB: readonly string[] = ["env", "-u", "TMUX", "-u", "TMUX_PANE"]

const HEADLESS_FLAG = "--headless"

export const PTY_PROXY_REL = "tools/lib/pty-proxy.ts"

export const SUPERVISOR_REL = "tools/run-supervisor.ts"

export const TMUX_SERVER_COMM = "tmux: server"

export function tmuxServerCountShell(): string {
  return `pgrep -x '${TMUX_SERVER_COMM}' 2>/dev/null | wc -l`
}

export function serverOptionArgv(): readonly string[] {
  return SERVER_OPTIONS.flatMap((one) => [...one, ";"])
}

export function serverOptionShell(): string {
  return SERVER_OPTIONS.map((one) => one.join(" ")).join(" \\; ")
}

export function envScrubArgv(): readonly string[] {
  return [...ENV_SCRUB]
}

export function envScrubShell(): string {
  return ENV_SCRUB.join(" ")
}

export function scopeArgv(unit: string): readonly string[] {
  return [SCOPE_COMMAND, ...SCOPE_FLAGS, `--unit=${unit}`]
}

export function scopeShell(unitExpansion: string): string {
  return [SCOPE_COMMAND, ...SCOPE_FLAGS, unitExpansion].join(" ")
}

export function supervisorEntryArgv(root: string): readonly string[] {
  return ["bun", "run", `${root}/${PTY_PROXY_REL}`, "--", "bun", "run", `${root}/${SUPERVISOR_REL}`]
}

export function supervisorEntryShell(proxy: string, supervisor: string): string {
  return ["bun", "run", proxy, "--", "bun", "run", supervisor].join(" ")
}

export function launchModeFlags(headless: boolean): readonly string[] {
  return headless ? [HEADLESS_FLAG] : []
}
