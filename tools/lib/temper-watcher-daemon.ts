import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { OperationalError } from "@shared/errors-core/exit"
import { pidAliveOrAssumeDead } from "@shared/utils-process/pid-signal"
import { watcherConfigDir, watcherLogDir } from "@temper/shared-foundation-misc-eso-paths/eso-paths"
import { z } from "zod"
import { codeRoot } from "./code-root.ts"

export interface WatcherDaemonState {
  readonly pid: number
  readonly startedAt: string
  readonly logPath: string
}

const WatcherDaemonStateSchema = z
  .object({
    pid: z.number().int().positive(),
    startedAt: z.string().min(1),
    logPath: z.string().min(1),
  })
  .strict()

export function stateFilePath(): string {
  return join(watcherConfigDir(), "daemon.json")
}

export function workerLogPath(): string {
  return join(watcherLogDir(), "watcher.log")
}

export function readState(): WatcherDaemonState | undefined {
  const path = stateFilePath()
  if (!existsSync(path)) return undefined
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch {
    return undefined
  }
  try {
    const parsed = WatcherDaemonStateSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : undefined
  } catch {
    return undefined
  }
}

export function writeState(state: WatcherDaemonState): undefined {
  const path = stateFilePath()
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(state)}\n`, { mode: 0o600 })
}

export function clearState(): undefined {
  const path = stateFilePath()
  if (existsSync(path)) rmSync(path)
}

export const isPidAlive = pidAliveOrAssumeDead

const WORKER_ENTRY_RELATIVE = "packages/temper/scripts/src/watcher-exe/main.ts"

export function resolveWorkerEntry(): { readonly workerEntry: string; readonly repoRoot: string } {
  const repoRoot = codeRoot()
  const workerEntry = join(repoRoot, WORKER_ENTRY_RELATIVE)
  if (!existsSync(workerEntry)) {
    throw new OperationalError(
      `watcher worker entry not found at ${workerEntry} (code repository root ${repoRoot})`
    )
  }
  return { workerEntry, repoRoot }
}
