import { asFormatArgs } from "../debug-logger-casts/debug-logger-casts.module.code.ts"
import {
  CALLBACK_LOG_ADDED,
  CALLBACK_LOG_PRUNED,
} from "../debug-logger-constants/debug-logger-constants.module.code.ts"
import { INTERNAL, LIB } from "../debug-logger-state/debug-logger-state.module.code.ts"
import type {
  LogEntry,
  LoggerConfig,
} from "../debug-logger-types/debug-logger-types.module.code.ts"

declare const debug: { traceback: (this: void, message?: string, level?: number) => string }

function isString(value: unknown): value is string {
  return type(value) === "string"
}

function isFormattingString(value: unknown): boolean {
  if (isString(value)) {
    const [found] = string.find(value, "%%%S")
    if (found !== undefined) {
      return true
    }
  }
  return false
}

function formatTime(this: void, timestamp: number): string {
  return string.format(os.date("%F %T.%%03.0f %z", timestamp / 1000), timestamp % 1000)
}

function pruneLog(): undefined {
  const log = INTERNAL.log
  const logLength = log.length
  if (logLength > INTERNAL.LOG_PRUNE_THRESHOLD) {
    const newLog: LogEntry[] = []
    const startIndex = logLength - INTERNAL.NUM_MAX_ENTRIES
    for (let i = startIndex; i <= logLength; i++) {
      const entry = log[i - 1]
      if (entry !== undefined) newLog[newLog.length] = entry
    }

    INTERNAL.log = newLog
    LibDebugLoggerLog = newLog
    INTERNAL.FireCallbacks(CALLBACK_LOG_PRUNED, startIndex)
  }
}

function splitLongStringIfNeeded(value?: string): string | string[] {
  if (value === undefined) return ""

  let output: string | string[] = value
  const byteLength = value.length
  const maxSaveDataLength = INTERNAL.MAX_SAVE_DATA_LENGTH
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

const TEMP: string[] = []
function prepareMessage(this: void, ...args: unknown[]): string {
  let message = ""
  const count = args.length
  if (count > 0) {
    let handled = false
    if (isFormattingString(args[0])) {
      ;[handled, message] = pcall(string.format, ...asFormatArgs(args))
    }

    if (!handled) {
      ZO_ClearTable(TEMP)
      for (let i = 0; i < count; i++) {
        TEMP[i] = tostring(args[i])
      }

      if (INTERNAL.appendFormattingErrors === true && message !== "") {
        const [index] = string.find(message, "\nstack traceback")
        if (index !== undefined) {
          TEMP[TEMP.length] = string.sub(message, 1, index)
        }
      }
      message = table.concat(TEMP, " ")
    }
  }

  return message
}

let lastEntry: LogEntry | undefined
let lastMessage: string | undefined
let lastStacktrace: string | undefined
let wasDuplicate: boolean | undefined
function isSameAsLastMessage(
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

function doLog(
  this: void,
  level: string,
  tag: string,
  message?: string,
  stacktrace?: string,
  errorCode?: number
): undefined {
  const now = INTERNAL.SESSION_START_TIME + GetGameTimeMilliseconds()
  if (stacktrace !== undefined && INTERNAL.originStacktrace !== undefined) {
    stacktrace = stacktrace + "\nregistered by:\n" + INTERNAL.originStacktrace
  }
  let updatedExisting = false
  const isDuplicate = isSameAsLastMessage(level, tag, message, stacktrace)
  if (!isDuplicate || wasDuplicate !== true) {
    const entry: LogEntry = [
      now,
      formatTime(now),
      1,
      level,
      tag,
      splitLongStringIfNeeded(message),
      splitLongStringIfNeeded(stacktrace),
      errorCode,
    ]

    const log = INTERNAL.log
    log[log.length] = entry

    lastEntry = entry
    lastMessage = message
    lastStacktrace = stacktrace
  } else if (lastEntry !== undefined) {
    lastEntry[0] = now
    lastEntry[1] = formatTime(now)
    lastEntry[2] = lastEntry[2] + 1
    updatedExisting = true
  }
  INTERNAL.FireCallbacks(CALLBACK_LOG_ADDED, lastEntry, updatedExisting)
  wasDuplicate = isDuplicate

  pruneLog()
}

function logFallbackMessage(message: unknown): undefined {
  let text: string
  if (isString(message)) {
    text = string.sub(message, 1, INTERNAL.MAX_SAVE_DATA_LENGTH)
  } else {
    text = "Could not create log entry"
  }
  const log = INTERNAL.log
  const entry: LogEntry = [
    INTERNAL.SESSION_START_TIME + GetGameTimeMilliseconds(),
    "-",
    1,
    INTERNAL.LOG_LEVEL_ERROR,
    LIB.id,
    text,
  ]
  log[log.length] = entry
  INTERNAL.FireCallbacks(CALLBACK_LOG_ADDED, entry, false)
}

function shouldLog(level: string, tag: string, minLevelOverride?: string): boolean {
  let minLevel = INTERNAL.settings.minLogLevel
  if (minLevelOverride !== undefined) minLevel = minLevelOverride
  const levels = INTERNAL.LOG_LEVEL_TO_NUMBER
  const levelNumber = levels[level]
  const minLevelNumber = levels[minLevel]
  if (
    levelNumber === undefined ||
    minLevelNumber === undefined ||
    levelNumber < minLevelNumber ||
    (level === INTERNAL.LOG_LEVEL_VERBOSE && INTERNAL.verboseWhitelist[tag] !== true)
  ) {
    return false
  }
  return true
}

function tryLog(
  this: void,
  level: string,
  tag: string,
  message?: string,
  stacktrace?: string,
  errorCode?: number
): undefined {
  const [handled, result] = pcall(doLog, level, tag, message, stacktrace, errorCode)

  if (!handled) {
    logFallbackMessage(result)
  }
}

function logRaw(
  this: void,
  level: string,
  tag: string,
  message?: string,
  stacktrace?: string,
  errorCode?: number
): undefined {
  if (!shouldLog(level, tag)) return
  tryLog(level, tag, message, stacktrace, errorCode)
}

function logMessage(
  this: void,
  level: string,
  config: LoggerConfig,
  ...args: unknown[]
): undefined {
  if (!shouldLog(level, config.tag, config.minLevelOverride)) return

  const [handled, message] = pcall(prepareMessage, ...args)

  if (handled) {
    let stacktrace: string | undefined
    let shouldLogTraces = INTERNAL.settings.logTraces
    if (config.logTracesOverride !== undefined) shouldLogTraces = config.logTracesOverride
    if (shouldLogTraces) {
      stacktrace = debug.traceback()
    }
    tryLog(level, config.tag, message, stacktrace)
  } else {
    logFallbackMessage(message)
  }
}

function doInitializeLog(this: typeof INTERNAL): undefined {
  if (LibDebugLoggerLog !== undefined) {
    const startUpLog = INTERNAL.log
    const oldLog = LibDebugLoggerLog
    const newLog: LogEntry[] = []

    const startIndex = math.max(1, oldLog.length + startUpLog.length - INTERNAL.NUM_MAX_ENTRIES)
    const minTime = INTERNAL.SESSION_START_TIME - INTERNAL.MAX_ENTRY_AGE
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

    INTERNAL.log = newLog
    LibDebugLoggerLog = newLog
  } else {
    LibDebugLoggerLog = INTERNAL.log
  }
}

export function initLogHandler(): undefined {
  INTERNAL.formatTime = formatTime
  INTERNAL.LogRaw = logRaw
  INTERNAL.Log = logMessage
  INTERNAL.InitializeLog = doInitializeLog
}
