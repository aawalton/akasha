import { asConcatList, asLoggerTag, asString } from "./casts"
import { CALLBACK_LOG_CLEARED } from "./constants"
import { internal, lib } from "./lib-state"
import type { Lib, LoggerInstance } from "./types"

export function initApi(): undefined {
  const Logger = internal.class.Logger
  if (Logger === undefined) return

  lib.GetAPIVersion = function (this: void): number {
    return 2
  }

  lib.DEFAULT_SETTINGS = internal.defaultSettings
  lib.TAG_INGAME = internal.TAG_INGAME

  lib.LOG_LEVEL_VERBOSE = internal.LOG_LEVEL_VERBOSE
  lib.LOG_LEVEL_DEBUG = internal.LOG_LEVEL_DEBUG
  lib.LOG_LEVEL_INFO = internal.LOG_LEVEL_INFO
  lib.LOG_LEVEL_WARNING = internal.LOG_LEVEL_WARNING
  lib.LOG_LEVEL_ERROR = internal.LOG_LEVEL_ERROR
  lib.LOG_LEVELS = internal.LOG_LEVELS
  lib.LOG_LEVEL_TO_STRING = internal.LOG_LEVEL_TO_STRING
  lib.STR_TO_LOG_LEVEL = internal.STR_TO_LOG_LEVEL

  lib.ENTRY_TIME_INDEX = internal.ENTRY_TIME_INDEX
  lib.ENTRY_FORMATTED_TIME_INDEX = internal.ENTRY_FORMATTED_TIME_INDEX
  lib.ENTRY_OCCURENCES_INDEX = internal.ENTRY_OCCURENCES_INDEX
  lib.ENTRY_LEVEL_INDEX = internal.ENTRY_LEVEL_INDEX
  lib.ENTRY_TAG_INDEX = internal.ENTRY_TAG_INDEX
  lib.ENTRY_MESSAGE_INDEX = internal.ENTRY_MESSAGE_INDEX
  lib.ENTRY_STACK_INDEX = internal.ENTRY_STACK_INDEX
  lib.ENTRY_ERROR_CODE_INDEX = internal.ENTRY_ERROR_CODE_INDEX

  lib.SESSION_START_TIME = internal.SESSION_START_TIME
  lib.UI_LOAD_START_TIME = internal.UI_LOAD_START_TIME

  lib.Create = function (this: void, selfOrTag?: unknown, tag?: unknown): LoggerInstance {
    let resolvedTag = tag
    if (selfOrTag !== lib) {
      resolvedTag = selfOrTag
    }
    return Logger.New(asLoggerTag(resolvedTag))
  }
  setmetatable(lib, {
    __call(this: Lib, ...args: unknown[]): LoggerInstance {
      return lib.Create(lib, ...args)
    },
  })

  lib.IsTraceLoggingEnabled = function (this: Lib): boolean {
    return internal.settings.logTraces
  }

  lib.SetTraceLoggingEnabled = function (this: Lib, enabled: boolean): undefined {
    internal.settings.logTraces = enabled
  }

  lib.GetMinLogLevel = function (this: Lib): string {
    return internal.settings.minLogLevel
  }

  lib.SetMinLogLevel = function (this: Lib, level: string): undefined {
    internal.settings.minLogLevel = level
  }

  lib.GetLog = function (this: Lib) {
    return internal.log
  }

  lib.ToggleFormattingErrors = function (this: Lib): boolean {
    const next = internal.appendFormattingErrors !== true
    internal.appendFormattingErrors = next
    return next
  }

  lib.ClearLog = function (this: Lib) {
    internal.log = []
    LibDebugLoggerLog = internal.log
    internal.FireCallbacks(CALLBACK_LOG_CLEARED, internal.log)
    return internal.log
  }

  lib.SetBlockChatOutputEnabled = function (this: Lib, enabled: boolean): undefined {
    internal.blockChatOutput = enabled
  }

  lib.IsBlockChatOutputEnabled = function (this: Lib): boolean {
    return internal.blockChatOutput === true
  }

  lib.CombineSplitStringIfNeeded = function (this: void, input: unknown): string {
    if (type(input) === "table") {
      return table.concat(asConcatList(input), "")
    }
    return asString(input)
  }

  lib.RegisterCallback = function (
    this: Lib,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ): undefined {
    internal.callbackObject.RegisterCallback(callbackName, callback)
  }
}
