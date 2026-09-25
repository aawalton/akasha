import { z } from "zod"

export type LogSource = "watcher" | "tray"

const LOG_LEVEL = z.enum(["INFO", "ERROR", "WARN"])

type LogLevel = z.infer<typeof LOG_LEVEL>

export type WatcherLogLine = {
  readonly timestamp: string
  readonly line: string
  readonly source: LogSource
  readonly level: LogLevel
}

const WORKER_LINE = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z) (INFO|ERROR) (.*)$/

const TRAY_LINE = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z) \[(INFO|ERROR|WARN)\] (.*)$/

const LINE_PARTS = z.tuple([z.string(), z.string(), LOG_LEVEL, z.string()])

export function parseWatcherLine(raw: string, source: LogSource): WatcherLogLine | null {
  const read = LINE_PARTS.safeParse((source === "watcher" ? WORKER_LINE : TRAY_LINE).exec(raw))
  if (!read.success) return null
  const [, timestamp, level, message] = read.data
  return { timestamp, line: message, source, level }
}
