import { asFormatArgs } from "./casts"
import { CALLBACK_LOG_ADDED, CALLBACK_LOG_PRUNED } from "./constants"
import { internal, lib } from "./lib-state"
import type { LogEntry, LoggerConfig } from "./types"

function isString(value: unknown): value is string {
  return type(value) === "string"
}

function IsFormattingString(value: unknown): boolean {
  if (isString(value)) {
    const [found] = string.find(value, "%%%S")
    if (found !== undefined) {
      return true
    }
  }
  return false
}

function FormatTime(this: void, timestamp: number): string {
  return string.format(os.date("%F %T.%%03.0f %z", timestamp / 1000), timestamp % 1000)
}

function PruneLog(): undefined {
  const log = internal.log
  const logLength = log.length
  if (logLength > internal.LOG_PRUNE_THRESHOLD) {
    const newLog: LogEntry[] = []
    const startIndex = logLength - internal.NUM_MAX_ENTRIES
    for (let i = startIndex; i <= logLength; i++) {
      const entry = log[i - 1]
      if (entry !== undefined) newLog[newLog.length] = entry
    }

    internal.log = newLog
    LibDebugLoggerLog = newLog
    internal.FireCallbacks(CALLBACK_LOG_PRUNED, startIndex)
  }
}

function SplitLongStringIfNeeded(value?: string): string | string[] {
  if (value === undefined) return ""

  let output: string | string[] = value
  const byteLength = value.length
  const maxSaveDataLength = internal.MAX_SAVE_DATA_LENGTH
  if (byteLength > maxSaveDataLength) {
    const parts: string[] = []
    let startPos = 1
    let endPos = startPos + maxSaveDataLength - 1
    while (startPos <= byteLength) {
      parts[parts.length] = string.sub(value, startPos, endPos)
      startPos = endPos + 1
      endPos = startPos + maxSaveDataLength - 1
    }
    output = parts
  }
  return output
}

const temp: string[] = []
function PrepareMessage(this: void, ...args: unknown[]): string {
  let message = ""
  const count = args.length
  if (count > 0) {
    let handled = false
    if (IsFormattingString(args[0])) {
      ;[handled, message] = pcall(string.format, ...asFormatArgs(args))
    }

    if (!handled) {
      ZO_ClearTable(temp)
      for (let i = 0; i < count; i++) {
        temp[i] = tostring(args[i])
      }

      if (internal.appendFormattingErrors === true && message !== "") {
        const [index] = string.find(message, "\nstack traceback")
        if (index !== undefined) {
          temp[temp.length] = string.sub(message, 1, index)
        }
      }
      message = table.concat(temp, " ")
    }
  }

  return message
}

let lastEntry: LogEntry | undefined
let lastMessage: string | undefined
let lastStacktrace: string | undefined
let wasDuplicate: boolean | undefined
function IsSameAsLastMessage(
  level: string,
  tag: string,
  message?: string,
  stacktrace?: string
): boolean {
  if (
    lastEntry === undefined ||
    lastMessage !== message ||
    lastStacktrace !== stacktrace ||
    lastEntry[3] !== level ||
    lastEntry[4] !== tag
  ) {
    return false
  }
  return true
}

function DoLog(
  this: void,
  level: string,
  tag: string,
  message?: string,
  stacktrace?: string,
  errorCode?: number
): undefined {
  const now = internal.SESSION_START_TIME + GetGameTimeMilliseconds()
  if (stacktrace !== undefined && internal.originStacktrace !== undefined) {
    stacktrace = stacktrace + "\nregistered by:\n" + internal.originStacktrace
  }
  let updatedExisting = false
  const isDuplicate = IsSameAsLastMessage(level, tag, message, stacktrace)
  if (!isDuplicate || wasDuplicate !== true) {
    const entry: LogEntry = [
      now,
      FormatTime(now),
      1,
      level,
      tag,
      SplitLongStringIfNeeded(message),
      SplitLongStringIfNeeded(stacktrace),
      errorCode,
    ]

    const log = internal.log
    log[log.length] = entry

    lastEntry = entry
    lastMessage = message
    lastStacktrace = stacktrace
  } else if (lastEntry !== undefined) {
    lastEntry[0] = now
    lastEntry[1] = FormatTime(now)
    lastEntry[2] = lastEntry[2] + 1
    updatedExisting = true
  }
  internal.FireCallbacks(CALLBACK_LOG_ADDED, lastEntry, updatedExisting)
  wasDuplicate = isDuplicate

  PruneLog()
}

function LogFallbackMessage(message: unknown): undefined {
  let text: string
  if (isString(message)) {
    text = string.sub(message, 1, internal.MAX_SAVE_DATA_LENGTH)
  } else {
    text = "Could not create log entry"
  }
  const log = internal.log
  const entry: LogEntry = [
    internal.SESSION_START_TIME + GetGameTimeMilliseconds(),
    "-",
    1,
    internal.LOG_LEVEL_ERROR,
    lib.id,
    text,
  ]
  log[log.length] = entry
  internal.FireCallbacks(CALLBACK_LOG_ADDED, entry, false)
}

function ShouldLog(level: string, tag: string, minLevelOverride?: string): boolean {
  let minLevel = internal.settings.minLogLevel
  if (minLevelOverride !== undefined) minLevel = minLevelOverride
  const LOG_LEVEL_TO_NUMBER = internal.LOG_LEVEL_TO_NUMBER
  const levelNumber = LOG_LEVEL_TO_NUMBER[level]
  const minLevelNumber = LOG_LEVEL_TO_NUMBER[minLevel]
  if (
    levelNumber === undefined ||
    minLevelNumber === undefined ||
    levelNumber < minLevelNumber ||
    (level === internal.LOG_LEVEL_VERBOSE && internal.verboseWhitelist[tag] !== true)
  ) {
    return false
  }
  return true
}

function TryLog(
  this: void,
  level: string,
  tag: string,
  message?: string,
  stacktrace?: string,
  errorCode?: number
): undefined {
  const [handled, result] = pcall(DoLog, level, tag, message, stacktrace, errorCode)

  if (!handled) {
    LogFallbackMessage(result)
  }
}

function LogRaw(
  this: void,
  level: string,
  tag: string,
  message?: string,
  stacktrace?: string,
  errorCode?: number
): undefined {
  if (!ShouldLog(level, tag)) return
  TryLog(level, tag, message, stacktrace, errorCode)
}

function Log(this: void, level: string, config: LoggerConfig, ...args: unknown[]): undefined {
  if (!ShouldLog(level, config.tag, config.minLevelOverride)) return

  const [handled, message] = pcall(PrepareMessage, ...args)

  if (handled) {
    let stacktrace: string | undefined
    let shouldLogTraces = internal.settings.logTraces
    if (config.logTracesOverride !== undefined) shouldLogTraces = config.logTracesOverride
    if (shouldLogTraces) {
      stacktrace = debug.traceback()
    }
    TryLog(level, config.tag, message, stacktrace)
  } else {
    LogFallbackMessage(message)
  }
}

function doInitializeLog(this: typeof internal): undefined {
  if (LibDebugLoggerLog !== undefined) {
    const startUpLog = internal.log
    const oldLog = LibDebugLoggerLog
    const newLog: LogEntry[] = []

    const startIndex = math.max(1, oldLog.length + startUpLog.length - internal.NUM_MAX_ENTRIES)
    const minTime = internal.SESSION_START_TIME - internal.MAX_ENTRY_AGE
    for (let i = startIndex; i <= oldLog.length; i++) {
      const entry = oldLog[i - 1]
      if (entry !== undefined && entry[0] >= minTime) {
        newLog[newLog.length] = entry
      }
    }

    for (let i = 1; i <= startUpLog.length; i++) {
      const entry = startUpLog[i - 1]
      if (entry !== undefined) newLog[newLog.length] = entry
    }

    internal.log = newLog
    LibDebugLoggerLog = newLog
  } else {
    LibDebugLoggerLog = internal.log
  }
}

export function initLogHandler(): undefined {
  internal.FormatTime = FormatTime
  internal.LogRaw = LogRaw
  internal.Log = Log
  internal.InitializeLog = doInitializeLog
}
