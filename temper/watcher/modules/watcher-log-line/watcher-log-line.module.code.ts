export type LogSource = "watcher" | "tray"

export type LogLevel = "INFO" | "ERROR" | "WARN"

export type WatcherLogLine = {
  readonly timestamp: string
  readonly line: string
  readonly source: LogSource
  readonly level: LogLevel
}

const WORKER_LINE = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z) (INFO|ERROR) (.*)$/

const TRAY_LINE = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z) \[(INFO|ERROR|WARN)\] (.*)$/

const LEVELS: readonly LogLevel[] = ["INFO", "ERROR", "WARN"]

function levelOf(word: string): LogLevel | null {
  return LEVELS.find((one) => one === word) ?? null
}

export function parseWatcherLine(raw: string, source: LogSource): WatcherLogLine | null {
  const found = (source === "watcher" ? WORKER_LINE : TRAY_LINE).exec(raw)
  if (found === null) return null
  const [, timestamp, level, message] = found
  if (timestamp === undefined || level === undefined || message === undefined) return null
  const read = levelOf(level)
  if (read === null) return null
  return { timestamp, line: message, source, level: read }
}
