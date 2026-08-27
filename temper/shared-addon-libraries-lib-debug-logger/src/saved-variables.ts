import type { LogEntry, Settings } from "./types"

declare global {
  var LibDebugLoggerSettings: Settings | undefined
  var LibDebugLoggerLog: LogEntry[] | undefined
}
