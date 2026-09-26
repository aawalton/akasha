import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { pidAliveOrAssumeDead } from "akasha/code/process/modules/pid-signal/pid-signal.module.code.ts"
import {
  watcherConfigDir,
  watcherLogDir,
} from "akasha/temper/watcher/modules/watcher-paths/watcher-paths.module.code.ts"
import { z } from "zod"

export type WatcherDaemonState = {
  readonly pid: number
  readonly startedAt: string
  readonly logPath: string
}

const STATE_SHAPE = z
  .object({
    pid: z.number().int().positive(),
    startedAt: z.string().min(1),
    logPath: z.string().min(1),
  })
  .strict()

const STATE_FILE = "daemon.json"

export const WORKER_LOG = "watcher.log"

function stateFilePath(): string {
  return join(watcherConfigDir(), STATE_FILE)
}

export function workerLogPath(): string {
  return join(watcherLogDir(), WORKER_LOG)
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
    const read = STATE_SHAPE.safeParse(JSON.parse(raw))
    return read.success ? read.data : undefined
  } catch {
    return undefined
  }
}

export function writeState(state: WatcherDaemonState): undefined {
  const path = stateFilePath()
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(state)}\n`, { mode: 0o600 })
  return undefined
}

export function clearState(): undefined {
  const path = stateFilePath()
  if (existsSync(path)) rmSync(path)
  return undefined
}

export const isPidAlive = pidAliveOrAssumeDead
