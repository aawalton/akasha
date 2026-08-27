import { SHORT_NAME } from "./constants"
import type { TestResult } from "./types"

function resolveLogLevels(): {
  verbose: unknown
  debug: unknown
  info: unknown
  warning: unknown
  error: unknown
} {
  if (LibDebugLogger !== undefined) {
    return {
      verbose: LibDebugLogger.LOG_LEVEL_VERBOSE,
      debug: LibDebugLogger.LOG_LEVEL_DEBUG,
      info: LibDebugLogger.LOG_LEVEL_INFO,
      warning: LibDebugLogger.LOG_LEVEL_WARNING,
      error: LibDebugLogger.LOG_LEVEL_ERROR,
    }
  }
  return { verbose: "V", debug: "D", info: "I", warning: "W", error: "E" }
}

export const logLevels = resolveLogLevels()

const logger = LibDebugLogger !== undefined ? LibDebugLogger.Create(SHORT_NAME) : undefined

export const runtime: { debug: boolean; testresult: TestResult | undefined } = {
  debug: GetDisplayName() === "@Solinur",
  testresult: undefined,
}

export function Print(this: void, level: unknown, ...args: readonly unknown[]): undefined {
  if (logger === undefined || runtime.debug !== true) {
    return
  }
  if (type(logger.Log) === "function") {
    logger.Log(level, ...args)
  }
}
