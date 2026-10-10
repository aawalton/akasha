import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"

const GAME_PROGRAM = "eso64.exe"

const PROCESS_ROOT = "/proc"

export function isGameCommandLine(commandLine: string): boolean {
  const program = commandLine.split("\0")[0] ?? ""
  const last = program.split(/[\\/]/).pop() ?? ""
  return last.toLowerCase() === GAME_PROGRAM
}

function commandLineOf(pid: string): string {
  try {
    return readFileSync(join(PROCESS_ROOT, pid, "cmdline"), "utf-8")
  } catch {
    return ""
  }
}

export function isGameRunning(): boolean {
  let pids: readonly string[]
  try {
    pids = readdirSync(PROCESS_ROOT).filter((name) => /^\d+$/.test(name))
  } catch {
    return false
  }
  return pids.some((pid) => isGameCommandLine(commandLineOf(pid)))
}
