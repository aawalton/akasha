import { appendFileSync, existsSync, mkdirSync, renameSync, statSync, unlinkSync } from "node:fs"
import { join } from "node:path"
import { watcherLogDir } from "@akasha/temper-watcher/watcher-paths"

const MAX_LOG_BYTES = 1_000_000
const MAX_LOG_FILES = 3

function getLogDir(): string {
  return watcherLogDir()
}

function getLogPath(): string {
  return join(getLogDir(), "watcher.log")
}

function ensureLogDir(): undefined {
  const dir = getLogDir()
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

function rotateIfNeeded(path: string): undefined {
  if (!existsSync(path)) return
  let size: number
  try {
    size = statSync(path).size
  } catch {
    return
  }
  if (size < MAX_LOG_BYTES) return
  for (let i = MAX_LOG_FILES - 1; i >= 1; i--) {
    const src = i === 1 ? path : `${path.slice(0, -4)}.${i - 1}.log`
    const dst = `${path.slice(0, -4)}.${i}.log`
    if (!existsSync(src)) continue
    try {
      if (existsSync(dst)) unlinkSync(dst)
      renameSync(src, dst)
    } catch {}
  }
}

function timestamp(): string {
  return new Date().toISOString()
}

function writeLog(level: "INFO" | "ERROR", message: string): undefined {
  const line = `${timestamp()} ${level} ${message}\n`
  try {
    ensureLogDir()
    rotateIfNeeded(getLogPath())
    appendFileSync(getLogPath(), line)
  } catch {}
  if (process.stdout.isTTY) {
    if (level === "ERROR") {
      process.stderr.write(line)
    } else {
      process.stdout.write(line)
    }
  }
}

export function log(message: string): undefined {
  writeLog("INFO", message)
}

export function logError(message: string): undefined {
  writeLog("ERROR", message)
}
