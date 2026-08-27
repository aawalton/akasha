export const LOG_LEVEL_VERBOSE = "V"
export const LOG_LEVEL_DEBUG = "D"
export const LOG_LEVEL_INFO = "I"
export const LOG_LEVEL_WARNING = "W"
export const LOG_LEVEL_ERROR = "E"

let mainlogger: DebugLoggerInstance | undefined
const subloggers: Record<string, DebugLoggerInstance> = {}

if (LibDebugLogger !== undefined) {
  mainlogger = LibDebugLogger.Create("TemperCombat")

  subloggers["main"] = mainlogger
  subloggers["calc"] = mainlogger.Create("calc")
  subloggers["group"] = mainlogger.Create("group")
  subloggers["other"] = mainlogger.Create("other")
  subloggers["UI"] = mainlogger.Create("UI")
  subloggers["save"] = mainlogger.Create("save")
}

export function log(
  category: string | undefined,
  level: string,
  formatString: string,
  ...args: unknown[]
): undefined {
  if (mainlogger === undefined) {
    return undefined
  }
  const sublogger = category != null ? subloggers[category] : undefined
  const logger = sublogger !== undefined ? sublogger : mainlogger
  if (type(logger.Log) === "function") {
    logger.Log(level, formatString, ...args)
  }
  return undefined
}
