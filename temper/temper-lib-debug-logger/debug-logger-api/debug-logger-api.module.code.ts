import { asConcatList, asLoggerTag } from "../debug-logger-casts/debug-logger-casts.module.code.ts"
import { CALLBACK_LOG_CLEARED } from "../debug-logger-constants/debug-logger-constants.module.code.ts"
import { INTERNAL, LIB } from "../debug-logger-state/debug-logger-state.module.code.ts"
import type { Lib, LoggerInstance } from "../debug-logger-types/debug-logger-types.module.code.ts"

export function initApi(): undefined {
  const loggerClass = INTERNAL.class.Logger
  if (loggerClass === undefined) return

  LIB.GetAPIVersion = function (this: void): number {
    return 2
  }

  LIB.DEFAULT_SETTINGS = INTERNAL.defaultSettings
  LIB.TAG_INGAME = INTERNAL.TAG_INGAME

  LIB.LOG_LEVEL_VERBOSE = INTERNAL.LOG_LEVEL_VERBOSE
  LIB.LOG_LEVEL_DEBUG = INTERNAL.LOG_LEVEL_DEBUG
  LIB.LOG_LEVEL_INFO = INTERNAL.LOG_LEVEL_INFO
  LIB.LOG_LEVEL_WARNING = INTERNAL.LOG_LEVEL_WARNING
  LIB.LOG_LEVEL_ERROR = INTERNAL.LOG_LEVEL_ERROR
  LIB.LOG_LEVELS = INTERNAL.LOG_LEVELS
  LIB.LOG_LEVEL_TO_STRING = INTERNAL.LOG_LEVEL_TO_STRING
  LIB.STR_TO_LOG_LEVEL = INTERNAL.STR_TO_LOG_LEVEL

  LIB.ENTRY_TIME_INDEX = INTERNAL.ENTRY_TIME_INDEX
  LIB.ENTRY_FORMATTED_TIME_INDEX = INTERNAL.ENTRY_FORMATTED_TIME_INDEX
  LIB.ENTRY_OCCURENCES_INDEX = INTERNAL.ENTRY_OCCURENCES_INDEX
  LIB.ENTRY_LEVEL_INDEX = INTERNAL.ENTRY_LEVEL_INDEX
  LIB.ENTRY_TAG_INDEX = INTERNAL.ENTRY_TAG_INDEX
  LIB.ENTRY_MESSAGE_INDEX = INTERNAL.ENTRY_MESSAGE_INDEX
  LIB.ENTRY_STACK_INDEX = INTERNAL.ENTRY_STACK_INDEX
  LIB.ENTRY_ERROR_CODE_INDEX = INTERNAL.ENTRY_ERROR_CODE_INDEX

  LIB.SESSION_START_TIME = INTERNAL.SESSION_START_TIME
  LIB.UI_LOAD_START_TIME = INTERNAL.UI_LOAD_START_TIME

  LIB.Create = function (this: void, selfOrTag?: unknown, tag?: unknown): LoggerInstance {
    let resolvedTag = tag
    if (selfOrTag !== LIB) {
      resolvedTag = selfOrTag
    }
    return loggerClass.New(asLoggerTag(resolvedTag))
  }
  setmetatable(LIB, {
    __call(this: Lib, ...args: unknown[]): LoggerInstance {
      return LIB.Create(LIB, ...args)
    },
  })

  LIB.IsTraceLoggingEnabled = function (this: Lib): boolean {
    return INTERNAL.settings.logTraces
  }

  LIB.SetTraceLoggingEnabled = function (this: Lib, enabled: boolean): undefined {
    INTERNAL.settings.logTraces = enabled
  }

  LIB.GetMinLogLevel = function (this: Lib): string {
    return INTERNAL.settings.minLogLevel
  }

  LIB.SetMinLogLevel = function (this: Lib, level: string): undefined {
    INTERNAL.settings.minLogLevel = level
  }

  LIB.GetLog = function (this: Lib) {
    return INTERNAL.log
  }

  LIB.ToggleFormattingErrors = function (this: Lib): boolean {
    const next = INTERNAL.appendFormattingErrors !== true
    INTERNAL.appendFormattingErrors = next
    return next
  }

  LIB.ClearLog = function (this: Lib) {
    INTERNAL.log = []
    LibDebugLoggerLog = INTERNAL.log
    INTERNAL.FireCallbacks(CALLBACK_LOG_CLEARED, INTERNAL.log)
    return INTERNAL.log
  }

  LIB.SetBlockChatOutputEnabled = function (this: Lib, enabled: boolean): undefined {
    INTERNAL.blockChatOutput = enabled
  }

  LIB.IsBlockChatOutputEnabled = function (this: Lib): boolean {
    return INTERNAL.blockChatOutput === true
  }

  LIB.CombineSplitStringIfNeeded = function (this: void, input: unknown): string {
    if (type(input) === "table") {
      return table.concat(asConcatList(input), "")
    }
    return input as string
  }

  LIB.RegisterCallback = function (
    this: Lib,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    INTERNAL.callbackObject.RegisterCallback(callbackName, callback)
  }
}
