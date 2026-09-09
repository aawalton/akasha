import {
  createLogger,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_INFO,
  setMinLogLevelToAllTags,
} from "../lost-treasure-logger/lost-treasure-logger.module.code.ts"

const logger = createLogger("debug")

const STATE = { active: false }

export function initializeDebug(this: void): undefined {
  setDebugState(false)
  logger.Debug("initialized")
}

export function enableDebug(this: void): undefined {
  setMinLogLevelToAllTags(LOG_LEVEL_DEBUG)
  setDebugState(true)
  logger.Info("Debug has been enabled")
}

export function disableDebug(this: void): undefined {
  setMinLogLevelToAllTags(LOG_LEVEL_INFO)
  setDebugState(false)
  logger.Info("Debug has been disabled")
}

export function setDebugState(this: void, bool: boolean): undefined {
  STATE.active = bool
}

export function getDebugState(this: void): boolean {
  return STATE.active
}
