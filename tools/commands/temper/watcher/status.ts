
export const summary = "Report running/stopped status of the single global watcher daemon (pid, uptime, log)."

import type { CommandHelp } from "../../../ops/surface.ts"
import { parseArgs } from "../../../lib/parse-args.ts"
import { readState, workerLogPath } from "../../../lib/temper-watcher-daemon.ts"
import { isUnitActive, unitMainPid } from "../../../lib/temper-watcher-systemd.ts"

export const help: CommandHelp = {
  flags: [{ name: "--json", description: "Emit JSON object instead of the summary line" }],
  examples: ["ops temper watcher status", "ops temper watcher status --json"],
}

function uptimeSeconds(startedAt: string): number | null {
  const startMs = Date.parse(startedAt)
  if (Number.isNaN(startMs)) return null
  return Math.max(0, Math.floor((Date.now() - startMs) / 1000))
}

export default async function temperWatcherStatus(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const running = isUnitActive()
  const startedAt = running ? (readState()?.startedAt ?? null) : null

  if (json) {
    if (running) {
      process.stdout.write(
        `${JSON.stringify({
          status: "running",
          pid: unitMainPid(),
          started_at: startedAt,
          uptime_s: startedAt === null ? null : uptimeSeconds(startedAt),
          log_path: workerLogPath(),
        })}\n`
      )
    } else {
      process.stdout.write(
        `${JSON.stringify({
          status: "stopped",
          pid: null,
          started_at: null,
          uptime_s: null,
          log_path: null,
        })}\n`
      )
    }
    return
  }

  if (running) {
    const uptime = startedAt === null ? null : uptimeSeconds(startedAt)
    const uptimeStr = uptime === null ? "?" : String(uptime)
    process.stdout.write(
      `running pid=${unitMainPid() ?? "?"} uptime=${uptimeStr}s log=${workerLogPath()}\n`
    )
  } else {
    process.stdout.write("stopped\n")
  }
}
