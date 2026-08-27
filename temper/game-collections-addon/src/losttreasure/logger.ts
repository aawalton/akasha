import { ADDON_NAME } from "./constants"

function requireLibDebugLogger(this: void): LibDebugLogger {
  if (LibDebugLogger === undefined) {
    throw new Error("TemperLostTreasure requires LibDebugLogger")
  }
  return LibDebugLogger
}

const lib = requireLibDebugLogger()
const mainLogger = lib(ADDON_NAME)

export const LOG_LEVEL_DEBUG = lib.LOG_LEVEL_DEBUG
export const LOG_LEVEL_INFO = lib.LOG_LEVEL_INFO

const tags: Record<string, DebugLogger> = {}

export function createLogger(this: void, namespace: string): DebugLogger {
  const existing = tags[namespace]
  if (existing !== undefined) {
    mainLogger.Error("failed creating a new logger for: %s", namespace)
    return existing
  }
  const tagLogger = mainLogger.Create(namespace)
  tags[namespace] = tagLogger
  return tagLogger
}

export function setMinLogLevelToAllTags(this: void, level?: number): undefined {
  const resolved = level ?? LOG_LEVEL_INFO
  mainLogger.SetMinLevelOverride(resolved)
  for (const namespace in tags) {
    const tagLogger = tags[namespace]
    if (tagLogger !== undefined) {
      tagLogger.SetMinLevelOverride(resolved)
    }
  }
}

setMinLogLevelToAllTags(lib.GetMinLogLevel())
