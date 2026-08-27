import { ADDON_NAME } from "./constants"

type LogType = "Debug" | "Info" | "Verbose" | "Warn"

type UnknownRecord = Record<string | number, unknown>

function asObject(this: void, value: unknown): object {
  return value as object
}

function asUnknownRecord(this: void, value: unknown): UnknownRecord {
  return value as UnknownRecord
}

let showLog = true

export function setShowLog(this: void, value: boolean): undefined {
  showLog = value
}

const loggerInstance: DebugLogger | undefined =
  LibDebugLogger != null ? LibDebugLogger.Create(ADDON_NAME) : undefined

const hasViewer = DebugLogViewer != null
const hasLogger = loggerInstance != null

function createLog(this: void, logType: LogType, logContent: string): undefined {
  if (!hasViewer && logType === "Info") {
    CHAT_ROUTER.AddSystemMessage(logContent)
    return
  }
  if (!showLog) return
  if (hasLogger && loggerInstance != null) {
    if (logType === "Debug") {
      loggerInstance.Debug(logContent)
    }
    if (logType === "Info") {
      loggerInstance.Info(logContent)
    }
    if (logType === "Verbose") {
      loggerInstance.Verbose(logContent)
    }
    if (logType === "Warn") {
      loggerInstance.Warn(logContent)
    }
  }
}

function emitMessage(this: void, logType: LogType, text: string): undefined {
  let line = text
  if (line === "") {
    line = "[Empty String]"
  }
  createLog(logType, line)
}

function emitTable(
  this: void,
  logType: LogType,
  t: Record<string | number, unknown>,
  indent: string,
  tableHistory: LuaTable<object, boolean>
): undefined {
  for (const [k, v] of pairs(t)) {
    const vType = type(v)

    emitMessage(logType, indent + "(" + vType + "): " + tostring(k) + " = " + tostring(v))

    if (vType === "table") {
      const vTable = asObject(v)
      if (tableHistory.get(vTable) === true) {
        emitMessage(logType, indent + "Avoiding cycle on table...")
      } else {
        tableHistory.set(vTable, true)
        emitTable(logType, asUnknownRecord(v), indent + "  ", tableHistory)
      }
    }
  }
}

export function dm(this: void, logType: LogType, ...values: unknown[]): undefined {
  for (const value of values) {
    if (type(value) === "table") {
      emitTable(logType, asUnknownRecord(value), ".", new LuaTable<object, boolean>())
    } else {
      emitMessage(logType, tostring(value))
    }
  }
}
