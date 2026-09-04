import { appendFileSync, existsSync, mkdirSync, renameSync, statSync, unlinkSync } from "node:fs"
import { join } from "node:path"
import { WORKER_LOG } from "../watcher-daemon/watcher-daemon.module.code.ts"
import { watcherLogDir } from "../watcher-paths/watcher-paths.module.code.ts"

export const MAX_LOG_BYTES = 1_000_000

export const MAX_LOG_FILES = 3

export type WorkerLogLevel = "INFO" | "ERROR"

export interface Rename {
  readonly from: string
  readonly to: string
}

export function logLine(level: WorkerLogLevel, message: string, at: Date): string {
  return `${at.toISOString()} ${level} ${message}\n`
}

export function shouldRoll(size: number, maxBytes: number = MAX_LOG_BYTES): boolean {
  return size >= maxBytes
}

function rolledName(path: string, index: number): string {
  return `${path.slice(0, -".log".length)}.${index}.log`
}

export function rollRenames(path: string, maxFiles: number = MAX_LOG_FILES): readonly Rename[] {
  const renames: Rename[] = []
  for (let i = maxFiles - 1; i >= 1; i--) {
    renames.push({ from: i === 1 ? path : rolledName(path, i - 1), to: rolledName(path, i) })
  }
  return renames
}

export function workerLogFilePath(): string {
  return join(watcherLogDir(), WORKER_LOG)
}

function rollIfNeeded(path: string): undefined {
  if (!existsSync(path)) return
  let size: number
  try {
    size = statSync(path).size
  } catch {
    return
  }
  if (!shouldRoll(size)) return
  for (const { from, to } of rollRenames(path)) {
    if (!existsSync(from)) continue
    try {
      if (existsSync(to)) unlinkSync(to)
      renameSync(from, to)
    } catch {}
  }
  return
}

function writeLog(level: WorkerLogLevel, message: string): undefined {
  const line = logLine(level, message, new Date())
  try {
    const path = workerLogFilePath()
    mkdirSync(watcherLogDir(), { recursive: true })
    rollIfNeeded(path)
    appendFileSync(path, line)
  } catch {}
  if (process.stdout.isTTY) {
    if (level === "ERROR") process.stderr.write(line)
    else process.stdout.write(line)
  }
  return
}

export function log(message: string): undefined {
  return writeLog("INFO", message)
}

export function logError(message: string): undefined {
  return writeLog("ERROR", message)
}
