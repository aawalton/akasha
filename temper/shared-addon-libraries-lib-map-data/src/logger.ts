import { asMetatableView, asUserdataView } from "./casts"
import { internal } from "./lib-state"

const hasLogger = LibDebugLogger !== undefined
const hasViewer = DebugLogViewer !== undefined

function createLog(logType: string, logContent: string): undefined {
  if (!hasViewer && logType === "Info") {
    CHAT_ROUTER.AddSystemMessage(logContent)
    return
  }
  if (hasLogger && internal.logger !== undefined && logType === "Info") {
    internal.logger.Info(logContent)
  }
  if (!internal.show_log) return
  if (hasLogger && internal.logger !== undefined && logType === "Debug") {
    internal.logger.Debug(logContent)
  }
  if (hasLogger && internal.logger !== undefined && logType === "Verbose") {
    internal.logger.Verbose(logContent)
  }
  if (hasLogger && internal.logger !== undefined && logType === "Warn") {
    internal.logger.Warn(logContent)
  }
}

function emitMessage(logType: string, text: string): undefined {
  const safe = text === "" ? "[Empty String]" : text
  createLog(logType, safe)
}

function isTable(value: unknown): value is Record<string | number, unknown> {
  return type(value) === "table"
}

function emitUserdata(logType: string, udata: unknown): undefined {
  const functionLimit = 10
  const totalLimit = 20
  let functionCount = 0
  let entryCount = 0

  function tryProbe(
    label: string,
    fn: (this: void, o: unknown) => unknown,
    obj: unknown
  ): undefined {
    const [ok, res] = pcall(fn, obj)
    if (ok && res !== undefined) emitMessage(logType, `  ${label}: ${tostring(res)}`)
  }

  emitMessage(logType, `Userdata: ${tostring(udata)}`)

  if (type(udata) === "userdata") {
    const view = asUserdataView(udata)
    if (view.GetName !== undefined) tryProbe("GetName", view.GetName, udata)
    if (view.GetParent !== undefined) {
      tryProbe(
        "Parent",
        (o: unknown): unknown => {
          const ov = asUserdataView(o)
          if (ov.GetParent === undefined) return undefined
          const p = ov.GetParent(o)
          if (p === undefined) return undefined
          const pv = asUserdataView(p)
          return pv.GetName === undefined ? undefined : pv.GetName(p)
        },
        udata
      )
    }
    if (view.GetOwningWindow !== undefined) {
      tryProbe(
        "Owner",
        (o: unknown): unknown => {
          const ov = asUserdataView(o)
          if (ov.GetOwningWindow === undefined) return undefined
          const w = ov.GetOwningWindow(o)
          if (w === undefined) return undefined
          const wv = asUserdataView(w)
          return wv.GetName === undefined ? undefined : wv.GetName(w)
        },
        udata
      )
    }
    if (view.GetType !== undefined) tryProbe("Type", view.GetType, udata)
  }

  const meta = asMetatableView(getmetatable(udata))
  if (meta === undefined) {
    emitMessage(logType, "  (No metatable)")
    return
  }
  emitMessage(logType, "  (metatable present)")
  const idx = meta.__index
  if (type(idx) !== "table" || idx === undefined) {
    emitMessage(logType, `  __index is ${type(idx)}`)
    return
  }

  for (const [k, v] of pairs(idx)) {
    if (type(v) === "function") {
      if (functionCount < functionLimit && entryCount < totalLimit) {
        emitMessage(logType, `  Function: ${tostring(k)}`)
        functionCount += 1
        entryCount += 1
      }
    } else if (entryCount < totalLimit) {
      emitMessage(logType, `  ${tostring(k)}: ${tostring(v)}`)
      entryCount += 1
    }
    if (entryCount >= totalLimit) {
      emitMessage(logType, "  ... (output truncated due to limit)")
      break
    }
  }
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
  if (history.has(t)) {
    emitMessage(logType, `${effectiveIndent}[Cycle Detected]`)
    return
  }
  history.add(t)

  for (const [k, v] of pairs(t)) {
    const vt = type(v)
    if (vt === "table") {
      emitMessage(logType, `${effectiveIndent}(table): ${tostring(k)} = {`)
      if (isTable(v)) emitTable(logType, v, `${effectiveIndent}  `, history)
      emitMessage(logType, `${effectiveIndent}}`)
    } else if (vt === "userdata") {
      emitMessage(logType, `${effectiveIndent}(userdata): ${tostring(k)} = ${tostring(v)}`)
      emitUserdata(logType, v)
    } else {
      emitMessage(logType, `${effectiveIndent}(${vt}): ${tostring(k)} = ${tostring(v)}`)
    }
  }
}

function containsPlaceholders(str: unknown): boolean {
  if (typeof str !== "string") return false
  const [startPos] = string.find(str, "<<%d+>>")
  return startPos !== undefined
}

export function initLogger(this: void): undefined {
  if (LibDebugLogger !== undefined) {
    internal.logger = LibDebugLogger.Create(internal.loggerName)
  }

  internal.dm = function (this: typeof internal, logType: string, ...args: unknown[]): undefined {
    if (!internal.show_log && logType !== "Info") {
      return
    }

    const firstArg = args[0]
    if (typeof firstArg === "string" && containsPlaceholders(firstArg)) {
      const remaining = args.slice(1)
      emitMessage(logType, ZO_CachedStrFormat(firstArg, ...remaining))
      for (const value of remaining) {
        if (type(value) === "userdata") {
          emitUserdata(logType, value)
        } else if (isTable(value)) {
          emitTable(logType, value)
        } else if (value !== undefined) {
          emitMessage(logType, tostring(value))
        }
      }
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
}
