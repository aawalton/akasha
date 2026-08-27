interface LogState {
  log_event: string[] | undefined
  log_to_chat: boolean
  log_to_chat_warn_error: boolean
  show_log: boolean
  logger: DebugLogger | undefined
}

const state: LogState = {
  log_event: undefined,
  log_to_chat: false,
  log_to_chat_warn_error: false,
  show_log: false,
  logger: undefined,
}

export function startNewEvent(event_name?: string, ...args: unknown[]): undefined {
  if (state.log_event !== undefined) {
    endEvent()
  }
  const s = string.format(event_name ?? "--", ...args)
  state.log_event = [s]
}

export function endEvent(): undefined {
  const lines = state.log_event
  if (lines === undefined) {
    return
  }
  const s = table.concat(lines, "\n.  ")
  state.log_event = undefined
  verbose(s)
}

export function add(arg1: unknown, arg2?: unknown): undefined {
  let name: unknown = arg1
  let value: unknown = arg2
  if (value == null) {
    name = ""
    value = arg1
  }

  if (state.log_event === undefined) {
    startNewEvent()
  }
  const event = state.log_event
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
  let max_line_len = 0
  const lines: string[] = []
  const sorted_keys: (string | number)[] = []
  for (const [k] of pairs(valueTable)) {
    sorted_keys[sorted_keys.length] = k
  }
  table.sort(sorted_keys)
  for (const k of sorted_keys) {
    const v = valueTable[k]
    const line = string.format("%s:%s", tostring(k), tostring(v))
    max_line_len = math.max(max_line_len, line.length)
    lines[lines.length] = line
  }
  if (lines.length < 10 && max_line_len < 80) {
    return prefix + table.concat(lines, "  ")
  }
  return prefix + table.concat(lines, "\n")
}

const NOP: DebugLogger = {
  Verbose: (..._args: unknown[]) => undefined,
  Debug: (..._args: unknown[]) => undefined,
  Info: (..._args: unknown[]) => undefined,
  Warn: (..._args: unknown[]) => undefined,
  Error: (..._args: unknown[]) => undefined,
}

export function logger(): DebugLogger {
  if (state.logger === undefined) {
    if (LibDebugLogger !== undefined && state.show_log) {
      state.logger = LibDebugLogger.Create(TemperWrit.name)
    }
    if (state.logger === undefined) {
      state.logger = NOP
      state.log_to_chat_warn_error = true
    }
  }
  return state.logger
}

function formatArgs(args: unknown[]): string {
  const fmt = args[0]
  if (typeof fmt === "string") {
    return string.format(fmt, ...args.slice(1))
  }
  return tostring(fmt)
}

export function logOne(color: string, ...args: unknown[]): undefined {
  if (state.log_to_chat) {
    d(`|c${color}${TemperWrit.name}: ${formatArgs(args)}|r`)
  }
}

export function logOneWarnError(color: string, ...args: unknown[]): undefined {
  if (state.log_to_chat || state.log_to_chat_warn_error) {
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
  StartNewEvent: (this: void, event_name?: string, ...args: unknown[]) => void
  EndEvent: (this: void) => void
  Add: (this: void, arg1: unknown, arg2?: unknown) => void
  Flatten: (this: void, name: unknown, value: unknown) => string
  Verbose: (this: void, ...args: unknown[]) => void
  Debug: (this: void, ...args: unknown[]) => void
  Info: (this: void, ...args: unknown[]) => void
  Warn: (this: void, ...args: unknown[]) => void
  Error: (this: void, ...args: unknown[]) => void
}

const logNamespace: LogNamespace = {
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

TemperWrit.Log = logNamespace
TemperWrit.Logger = logger
TemperWrit.LogOne = logOne
TemperWrit.LogOneWarnError = logOneWarnError
