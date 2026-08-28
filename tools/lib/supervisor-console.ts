import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  statSync,
  unlinkSync,
} from "node:fs"
import { dirname } from "node:path"
import { logWriter, type LogWriter } from "./log-append.ts"
import { seatNameForAgent } from "./seat-presence-read.ts"
import { supervisorsRootDir } from "./supervisor-log-path.ts"

export type RotationOptions = {
  maxBytes: number
}

export type LogSink = (level: string, text: string) => undefined

export const LOG_MAX_BYTES = 10 * 1024 * 1024

export const SUPERVISOR_CONSOLE_SOURCE = "supervisor-console"

export function shouldRotate(currentBytes: number, maxBytes: number): boolean {
  if (maxBytes <= 0) return false
  return currentBytes >= maxBytes
}

function sizeOrZero(logPath: string): number {
  try {
    return statSync(logPath).size
  } catch {
    return 0
  }
}

function textOf(args: readonly unknown[]): string {
  return args
    .map((a) => (a instanceof Error ? `${a.message}\n${a.stack ?? ""}` : String(a)))
    .join(" ")
}

export function fileSink(logPath: string, rotate?: RotationOptions): LogSink {
  let currentBytes = rotate != null ? sizeOrZero(logPath) : 0
  return (level, text): undefined => {
    const line = `${new Date().toISOString()} [${level}] ${text}\n`
    if (rotate != null && shouldRotate(currentBytes, rotate.maxBytes)) {
      try {
        renameSync(logPath, `${logPath}.1`)
        currentBytes = 0
      } catch {}
    }
    appendFileSync(logPath, line)
    currentBytes += Buffer.byteLength(line)
  }
}

export function pageSink(writer: LogWriter, agentId: string, fallback: LogSink): LogSink {
  let named: string | null = null
  return (level, text): undefined => {
    writer.write({ "written-at": new Date().toISOString(), "agent-id": agentId, level, text })
    const refused = writer.refused()
    if (refused === null) return
    if (refused !== named) {
      named = refused
      fallback("ERROR", `[${SUPERVISOR_CONSOLE_SOURCE}] the seat log page refuses these lines, so they land here instead: ${refused}`)
    }
    fallback(level, text)
  }
}

export function redirectConsoleToSink(sink: LogSink): () => void {
  const origLog = console.log
  const origWarn = console.warn
  const origError = console.error

  console.log = (...args: readonly unknown[]) => {
    sink("LOG", textOf(args))
  }
  console.warn = (...args: readonly unknown[]) => {
    sink("WARN", textOf(args))
  }
  console.error = (...args: readonly unknown[]) => {
    sink("ERROR", textOf(args))
  }

  return () => {
    console.log = origLog
    console.warn = origWarn
    console.error = origError
  }
}

export const DEFAULT_SUPERVISORS_DIR = supervisorsRootDir()

export function buildAgentLogRedirect(supervisorsDir: string = DEFAULT_SUPERVISORS_DIR): {
  redirectToBootstrap: () => () => void
  redirectTo: (agentId: string) => () => void
  getCurrentLogPath: () => string
  getCurrentLogDir: () => string
  getCurrentSink: () => LogSink
} {
  const bootstrapPath = `${supervisorsDir}/bootstrap-${process.pid}.log`
  let active: (() => void) | null = null
  let activePath: string = bootstrapPath
  let activeSink: LogSink = fileSink(bootstrapPath)
  let bootstrapMigrated = false
  return {
    redirectToBootstrap(): () => void {
      mkdirSync(supervisorsDir, { recursive: true })
      active?.()
      activePath = bootstrapPath
      activeSink = fileSink(bootstrapPath)
      active = redirectConsoleToSink(activeSink)
      return active
    },
    redirectTo(agentId: string): () => void {
      const agentDir = `${supervisorsDir}/${agentId}`
      const agentPath = `${agentDir}/supervisor.log`
      mkdirSync(agentDir, { recursive: true })
      active?.()
      const toFile = fileSink(agentPath, { maxBytes: LOG_MAX_BYTES })
      const seatName = seatNameForAgent(agentId)
      const writer = seatName === null ? null : logWriter(SUPERVISOR_CONSOLE_SOURCE, seatName)
      activeSink = writer === null ? toFile : pageSink(writer, agentId, toFile)
      if (!bootstrapMigrated) {
        bootstrapMigrated = true
        if (existsSync(bootstrapPath)) {
          for (const line of readFileSync(bootstrapPath, "utf8").split("\n"))
            if (line.trim() !== "") activeSink("BOOTSTRAP", line)
          try {
            unlinkSync(bootstrapPath)
          } catch {
          }
        }
      }
      activePath = agentPath
      active = redirectConsoleToSink(activeSink)
      return active
    },
    getCurrentLogPath(): string {
      return activePath
    },
    getCurrentLogDir(): string {
      return dirname(activePath)
    },
    getCurrentSink(): LogSink {
      return activeSink
    },
  }
}
