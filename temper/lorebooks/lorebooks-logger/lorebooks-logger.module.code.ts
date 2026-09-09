import { ADDON_NAME } from "../lorebooks-constants/lorebooks-constants.module.code.ts"

type MetatableView = { __index?: Record<string | number, unknown> } | undefined

function asMetatableView(value: unknown): MetatableView {
  return value as MetatableView
}

export let SHOW_LOG = true

export function setShowLog(value: boolean): undefined {
  SHOW_LOG = value
}

const LOGGER = LibDebugLogger !== undefined ? LibDebugLogger.Create(ADDON_NAME) : undefined
const HAS_LOGGER = LibDebugLogger !== undefined
const HAS_VIEWER = DebugLogViewer !== undefined

function createLog(logType: string, logContent: string): undefined {
  if (!HAS_VIEWER && logType === "Info") {
    CHAT_ROUTER.AddSystemMessage(logContent)
    return
  }
  if (HAS_LOGGER && LOGGER !== undefined && logType === "Info") {
    LOGGER.Info(logContent)
  }
  if (!SHOW_LOG) return
  if (HAS_LOGGER && LOGGER !== undefined && logType === "Debug") {
    LOGGER.Debug(logContent)
  } else if (HAS_LOGGER && LOGGER !== undefined && logType === "Verbose") {
    LOGGER.Verbose(logContent)
  } else if (HAS_LOGGER && LOGGER !== undefined && logType === "Warn") {
    LOGGER.Warn(logContent)
  }
}

function emitMessage(logType: string, text: string): undefined {
  if (text === "") {
    text = "[Empty String]"
  }
  createLog(logType, text)
}

function isTable(value: unknown): value is Record<string | number, unknown> {
  return type(value) === "table"
}

function emitTable(
  logType: string,
  t: Record<string | number, unknown> | undefined,
  indent?: string,
  tableHistory?: LuaSet<object>
): undefined {
  const effectiveIndent = indent ?? "."
  const history = tableHistory ?? new LuaSet<object>()

  if (t === undefined) {
    emitMessage(logType, `${effectiveIndent}[Nil Table]`)
    return
  }
  const [firstKey] = next(t)
  if (firstKey === undefined) {
    emitMessage(logType, `${effectiveIndent}[Empty Table]`)
    return
  }

  for (const [k, v] of pairs(t)) {
    const vType = type(v)
    emitMessage(logType, `${effectiveIndent}(${vType}): ${tostring(k)} = ${tostring(v)}`)
    if (isTable(v)) {
      if (history.has(v)) {
        emitMessage(logType, `${effectiveIndent}Avoiding cycle on table...`)
      } else {
        history.add(v)
        emitTable(logType, v, `${effectiveIndent}  `, history)
      }
    }
  }
}

function emitUserdata(logType: string, udata: unknown): undefined {
  const functionLimit = 5
  const totalLimit = 10
  let functionCount = 0
  let entryCount = 0

  emitMessage(logType, `Userdata: ${tostring(udata)}`)

  const meta = asMetatableView(getmetatable(udata))
  if (meta !== undefined && meta.__index !== undefined) {
    for (const [k, v] of pairs(meta.__index)) {
      if (type(v) === "function") {
        if (functionCount < functionLimit) {
          emitMessage(logType, `  Function: ${tostring(k)}`)
          functionCount += 1
          entryCount += 1
        }
      } else {
        emitMessage(logType, `  ${tostring(k)}: ${tostring(v)}`)
        entryCount += 1
      }
      if (entryCount >= totalLimit) {
        emitMessage(logType, "  ... (output truncated due to limit)")
        break
      }
    }
  } else {
    emitMessage(logType, "  (No detailed metadata available)")
  }
}

function containsPlaceholders(str: unknown): boolean {
  if (typeof str !== "string") return false
  const [startPos] = string.find(str, "<<%d+>>")
  return startPos !== undefined
}

export function dm(logType: string, ...args: unknown[]): undefined {
  if (!SHOW_LOG && logType !== "Info") {
    return
  }

  const firstArg = args[0]
  if (typeof firstArg === "string" && containsPlaceholders(firstArg)) {
    const remaining = args.slice(1)
    emitMessage(logType, ZO_CachedStrFormat(firstArg, ...remaining))
    return
  }

  for (const value of args) {
    if (type(value) === "userdata") {
      emitUserdata(logType, value)
    } else if (isTable(value)) {
      emitTable(logType, value)
    } else {
      emitMessage(logType, tostring(value))
    }
  }
}
