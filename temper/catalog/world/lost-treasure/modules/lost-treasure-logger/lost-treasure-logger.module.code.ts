import { ADDON_NAME } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-constants/lost-treasure-constants.module.code.ts"
import "akasha/temper/addon/type/temper-debug-logger-global/temper-debug-logger-global.type-declaration.d.ts"

function requireLibDebugLogger(this: void): TemperDebugLogger {
  if (TemperDebugLogger === undefined) {
    throw new Error("TemperWorldLostTreasure requires TemperDebugLogger")
  }
  return TemperDebugLogger
}

const lib = requireLibDebugLogger()
const mainLogger = lib(ADDON_NAME)

export const LOG_LEVEL_DEBUG = lib.LOG_LEVEL_DEBUG
export const LOG_LEVEL_INFO = lib.LOG_LEVEL_INFO

const TAGS: Record<string, DebugLogger> = {}

export function createLogger(this: void, namespace: string): DebugLogger {
  const existing = TAGS[namespace]
  if (existing !== undefined) {
    mainLogger.Error("failed creating a new logger for: %s", namespace)
    return existing
  }
  const tagLogger = mainLogger.Create(namespace)
  TAGS[namespace] = tagLogger
  return tagLogger
}

export function setMinLogLevelToAllTags(this: void, level?: string): undefined {
  const resolved = level ?? LOG_LEVEL_INFO
  mainLogger.SetMinLevelOverride(resolved)
  for (const namespace in TAGS) {
    const tagLogger = TAGS[namespace]
    if (tagLogger !== undefined) {
      tagLogger.SetMinLevelOverride(resolved)
    }
  }
}

setMinLogLevelToAllTags(lib.GetMinLogLevel())
