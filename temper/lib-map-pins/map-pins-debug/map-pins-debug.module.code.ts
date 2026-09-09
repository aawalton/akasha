import type { TableKey } from "../map-pins-casts/map-pins-casts.module.code.ts"

import type { Lib } from "../map-pins-types/map-pins-types.module.code.ts"

export function initDebug(lib: Lib): undefined {
  if (LibDebugLogger !== undefined) {
    lib.logger = LibDebugLogger.Create(lib.loggerName)
  }
}

function createLog(lib: Lib, logType: string, logContent: string): undefined {
  const hasLogger = lib.logger !== undefined
  const hasViewer = DebugLogViewer !== undefined

  if (!hasViewer && logType === "Info") {
    CHAT_ROUTER.AddSystemMessage(logContent)
    return
  }
  if (hasLogger && logType === "Info") {
    lib.logger?.Info(logContent)
  }
  if (!lib.show_log) {
    return
  }
  if (hasLogger && logType === "Debug") {
    lib.logger?.Debug(logContent)
  }
  if (hasLogger && logType === "Verbose") {
    lib.logger?.Verbose(logContent)
  }
  if (hasLogger && logType === "Warn") {
    lib.logger?.Warn(logContent)
  }
}

function emitMessage(lib: Lib, logType: string, text: string): undefined {
  let message = text
  if (message === "") {
    message = "[Empty String]"
  }
  createLog(lib, logType, message)
}

function emitTable(
  lib: Lib,
  logType: string,
  t: unknown,
  indent: string | undefined,
  tableHistory: LuaTable<AnyNotNil, boolean> | undefined
): undefined {
  const ind = indent ?? "."
  const history = tableHistory ?? new LuaTable<AnyNotNil, boolean>()

  if (t == null) {
    emitMessage(lib, logType, `${ind}[Nil Table]`)
    return
  }

  const record = t as Record<string, unknown>
  const [firstKey] = next(record)
  if (firstKey === undefined) {
    emitMessage(lib, logType, `${ind}[Empty Table]`)
    return
  }

  for (const [k, v] of pairs(record)) {
    const vType = type(v)
    emitMessage(lib, logType, `${ind}(${vType}): ${tostring(k)} = ${tostring(v)}`)
    if (vType === "table") {
      const key = v as TableKey
      if (history.has(key)) {
        emitMessage(lib, logType, `${ind}Avoiding cycle on table...`)
      } else {
        history.set(key, true)
        emitTable(lib, logType, v, `${ind}  `, history)
      }
    }
  }
}

function emitUserdata(lib: Lib, logType: string, udata: unknown): undefined {
  const functionLimit = 5
  const totalLimit = 10
  let functionCount = 0
  let entryCount = 0

  emitMessage(lib, logType, `Userdata: ${tostring(udata)}`)

  const meta = getmetatable(udata)
  if (meta && meta.__index != null) {
    for (const [k, v] of pairs(meta.__index as Record<string, unknown>)) {
      if (type(v) === "function") {
        if (functionCount < functionLimit) {
          emitMessage(lib, logType, `  Function: ${tostring(k)}`)
          functionCount = functionCount + 1
          entryCount = entryCount + 1
        }
      } else {
        emitMessage(lib, logType, `  ${tostring(k)}: ${tostring(v)}`)
        entryCount = entryCount + 1
      }

      if (entryCount >= totalLimit) {
        emitMessage(lib, logType, "  ... (output truncated due to limit)")
        break
      }
    }
  } else {
    emitMessage(lib, logType, "  (No detailed metadata available)")
  }
}

function containsPlaceholders(str: unknown): boolean {
  if (type(str) !== "string") {
    return false
  }
  const [found] = string.find(str as string, "<<%d+>>")
  return found !== undefined
}

export function dm(lib: Lib, logType: string, ...args: unknown[]): undefined {
  if (!lib.show_log && logType !== "Info") {
    return
  }

  const numArgs = args.length
  const firstArg = args[0]

  if (type(firstArg) === "string" && containsPlaceholders(firstArg)) {
    const remainingArgs: unknown[] = []
    for (let i = 1; i < numArgs; i++) {
      remainingArgs.push(args[i])
    }
    const formattedValue = ZO_CachedStrFormat(firstArg as string, ...remainingArgs)
    emitMessage(lib, logType, formattedValue)
  } else {
    for (let i = 0; i < numArgs; i++) {
      const value = args[i]
      const valueType = type(value)
      if (valueType === "userdata") {
        emitUserdata(lib, logType, value)
      } else if (valueType === "table") {
        emitTable(lib, logType, value, undefined, undefined)
      } else {
        emitMessage(lib, logType, tostring(value))
      }
    }
  }
}
