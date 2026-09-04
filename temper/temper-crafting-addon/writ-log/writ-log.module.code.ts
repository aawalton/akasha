interface LogState {
  log_event: string[] | undefined
  log_to_chat: boolean
  log_to_chat_warn_error: boolean
  show_log: boolean
  logger: DebugLogger | undefined
}

const STATE: LogState = {
  log_event: undefined,
  log_to_chat: false,
  log_to_chat_warn_error: false,
  show_log: false,
  logger: undefined,
}

export function startNewEvent(eventName?: string, ...args: unknown[]): undefined {
  if (STATE.log_event !== undefined) {
    endEvent()
  }
  const s = string.format(eventName ?? "--", ...args)
  STATE.log_event = [s]
}

export function endEvent(): undefined {
  const lines = STATE.log_event
  if (lines === undefined) {
    return
  }
  const s = table.concat(lines, "\n.  ")
  STATE.log_event = undefined
  verbose(s)
}

export function add(arg1: unknown, arg2?: unknown): undefined {
  let name: unknown = arg1
  let value: unknown = arg2
  if (value == null) {
    name = ""
    value = arg1
  }

  if (STATE.log_event === undefined) {
    startNewEvent()
  }
  const event = STATE.log_event
  if (event !== undefined) {
    event[event.length] = flatten(name, value)
  }
}

function isRecord(v: unknown): v is Record<string | number, unknown> {
  return type(v) === "table"
}

export function flatten(name: unknown, value: unknown): string {
  let prefix = ""
  if (name != null && name !== "") {
    prefix = `${tostring(name)}: `
  }

  if (!isRecord(value)) {
    return prefix + tostring(value)
  }

  const valueTable = value
  let maxLineLen = 0
  const lines: string[] = []
  const sortedKeys: (string | number)[] = []
  for (const [k] of pairs(valueTable)) {
    sortedKeys[sortedKeys.length] = k
  }
  table.sort(sortedKeys)
  for (const k of sortedKeys) {
    const v = valueTable[k]
    const line = string.format("%s:%s", tostring(k), tostring(v))
    maxLineLen = math.max(maxLineLen, line.length)
    lines[lines.length] = line
  }
  if (lines.length < 10 && maxLineLen < 80) {
    return prefix + table.concat(lines, "  ")
  }
  return prefix + table.concat(lines, "\n")
}

const NOP: DebugLogger = {
  Log: (..._args: unknown[]) => undefined,
  Create: (..._args: unknown[]) => NOP,
  SetMinLevelOverride: (..._args: unknown[]) => undefined,
  Verbose: (..._args: unknown[]) => undefined,
  Debug: (..._args: unknown[]) => undefined,
  Info: (..._args: unknown[]) => undefined,
  Warn: (..._args: unknown[]) => undefined,
  Error: (..._args: unknown[]) => undefined,
}

export function logger(): DebugLogger {
  if (STATE.logger === undefined) {
    if (LibDebugLogger !== undefined && STATE.show_log) {
      STATE.logger = LibDebugLogger.Create(TemperWrit.name)
    }
    if (STATE.logger === undefined) {
      STATE.logger = NOP
      STATE.log_to_chat_warn_error = true
    }
  }
  return STATE.logger
}

function formatArgs(args: unknown[]): string {
  const fmt = args[0]
  if (typeof fmt === "string") {
    return string.format(fmt, ...args.slice(1))
  }
  return tostring(fmt)
}

export function logOne(color: string, ...args: unknown[]): undefined {
  if (STATE.log_to_chat) {
    d(`|c${color}${TemperWrit.name}: ${formatArgs(args)}|r`)
  }
}

export function logOneWarnError(color: string, ...args: unknown[]): undefined {
  if (STATE.log_to_chat || STATE.log_to_chat_warn_error) {
    d(`|c${color}${TemperWrit.name}: ${formatArgs(args)}|r`)
  }
}

export function verbose(...args: unknown[]): undefined {
  logOne("444444", ...args)
  logger().Verbose(...args)
}

export function debug(...args: unknown[]): undefined {
  logOne("666666", ...args)
  logger().Debug(...args)
}

export function info(...args: unknown[]): undefined {
  logOne("999999", ...args)
  logger().Info(...args)
}

export function warn(...args: unknown[]): undefined {
  logOneWarnError("FF8800", ...args)
  logger().Warn(...args)
}

export function error(...args: unknown[]): undefined {
  logOneWarnError("FF6666", ...args)
  logger().Error(...args)
}

export interface LogNamespace {
  StartNewEvent: (this: void, eventName?: string, ...args: unknown[]) => undefined
  EndEvent: (this: void) => undefined
  Add: (this: void, arg1: unknown, arg2?: unknown) => undefined
  Flatten: (this: void, name: unknown, value: unknown) => string
  Verbose: (this: void, ...args: unknown[]) => undefined
  Debug: (this: void, ...args: unknown[]) => undefined
  Info: (this: void, ...args: unknown[]) => undefined
  Warn: (this: void, ...args: unknown[]) => undefined
  Error: (this: void, ...args: unknown[]) => undefined
}

const LOG_NAMESPACE: LogNamespace = {
  StartNewEvent: startNewEvent,
  EndEvent: endEvent,
  Add: add,
  Flatten: flatten,
  Verbose: verbose,
  Debug: debug,
  Info: info,
  Warn: warn,
  Error: error,
}

TemperWrit.Log = LOG_NAMESPACE
TemperWrit.Logger = logger
TemperWrit.LogOne = logOne
TemperWrit.LogOneWarnError = logOneWarnError
