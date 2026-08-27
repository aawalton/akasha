import { asLib } from "./casts"
import {
  ENTRY_ERROR_CODE_INDEX,
  ENTRY_FORMATTED_TIME_INDEX,
  ENTRY_LEVEL_INDEX,
  ENTRY_MESSAGE_INDEX,
  ENTRY_OCCURENCES_INDEX,
  ENTRY_STACK_INDEX,
  ENTRY_TAG_INDEX,
  ENTRY_TIME_INDEX,
  LIB_IDENTIFIER,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_ERROR,
  LOG_LEVEL_INFO,
  LOG_LEVEL_TO_NUMBER,
  LOG_LEVEL_TO_STRING,
  LOG_LEVEL_VERBOSE,
  LOG_LEVEL_WARNING,
  LOG_LEVELS,
  LOG_PRUNE_THRESHOLD,
  MAX_ENTRY_AGE,
  MAX_SAVE_DATA_LENGTH,
  NUM_MAX_ENTRIES,
  STR_TO_LOG_LEVEL,
  TAG_INGAME,
} from "./constants"
import type { InternalState, Lib, Settings } from "./types"

const UI_LOAD_START_TIME = GetTimeStamp() * 1000
const SESSION_START_TIME = UI_LOAD_START_TIME - GetGameTimeMilliseconds()

const callbackObject = ZO_CallbackObject.New()

const defaultSettings: Settings = {
  version: 2,
  logTraces: false,
  minLogLevel: LOG_LEVEL_INFO,
  loadScreenStartTime: UI_LOAD_START_TIME,
}

function noopFormatTime(this: void): string {
  return ""
}
function noop(this: void): undefined {}

export const internal: InternalState = {
  class: {},
  log: [],
  verboseWhitelist: {},
  callbackObject,
  FireCallbacks(this: InternalState, eventName: string, ...args: unknown[]): undefined {
    callbackObject.FireCallbacks(eventName, ...args)
  },
  UI_LOAD_START_TIME,
  SESSION_START_TIME,

  TAG_INGAME,
  LOG_LEVEL_VERBOSE,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_INFO,
  LOG_LEVEL_WARNING,
  LOG_LEVEL_ERROR,
  NUM_MAX_ENTRIES,
  LOG_PRUNE_THRESHOLD,
  MAX_ENTRY_AGE,
  MAX_SAVE_DATA_LENGTH,
  ENTRY_TIME_INDEX,
  ENTRY_FORMATTED_TIME_INDEX,
  ENTRY_OCCURENCES_INDEX,
  ENTRY_LEVEL_INDEX,
  ENTRY_TAG_INDEX,
  ENTRY_MESSAGE_INDEX,
  ENTRY_STACK_INDEX,
  ENTRY_ERROR_CODE_INDEX,
  LOG_LEVELS,
  LOG_LEVEL_TO_NUMBER,
  LOG_LEVEL_TO_STRING,
  STR_TO_LOG_LEVEL,

  defaultSettings,
  settings: ZO_ShallowTableCopy(defaultSettings),

  FormatTime: noopFormatTime,
  Log: noop,
  LogRaw: noop,
  LogPerformance: noop,
  InitializeSettings(this: InternalState): Settings {
    return this.settings
  },
  InitializeLog: noop,
}

export const lib: Lib = asLib({
  id: LIB_IDENTIFIER,
  internal,
  callback: {},
})
