export const LOG_LEVEL_VERBOSE = "V"
export const LOG_LEVEL_DEBUG = "D"
export const LOG_LEVEL_INFO = "I"
export const LOG_LEVEL_WARNING = "W"
export const LOG_LEVEL_ERROR = "E"

let mainlogger: DebugLogger | undefined
const SUBLOGGERS: Record<string, DebugLogger> = {}

if (LibDebugLogger !== undefined) {
  mainlogger = LibDebugLogger.Create("TemperCombat")

  SUBLOGGERS["main"] = mainlogger
  SUBLOGGERS["calc"] = mainlogger.Create("calc")
  SUBLOGGERS["group"] = mainlogger.Create("group")
  SUBLOGGERS["other"] = mainlogger.Create("other")
  SUBLOGGERS["UI"] = mainlogger.Create("UI")
  SUBLOGGERS["save"] = mainlogger.Create("save")
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
  const sublogger = category != null ? SUBLOGGERS[category] : undefined
  const logger = sublogger !== undefined ? sublogger : mainlogger
  if (type(logger.Log) === "function") {
    logger.Log(level, formatString, ...args)
  }
  return undefined
}
