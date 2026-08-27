export const LIB_IDENTIFIER = "LibDebugLogger"

export const TAG_INGAME = "UI"

export const CALLBACK_LOG_CLEARED = "LogCleared"
export const CALLBACK_LOG_PRUNED = "LogPruned"
export const CALLBACK_LOG_ADDED = "LogAdded"

export const LOG_LEVEL_VERBOSE = "V"
export const LOG_LEVEL_DEBUG = "D"
export const LOG_LEVEL_INFO = "I"
export const LOG_LEVEL_WARNING = "W"
export const LOG_LEVEL_ERROR = "E"

export const NUM_MAX_ENTRIES = 10000
export const LOG_PRUNE_THRESHOLD = NUM_MAX_ENTRIES + 1000
export const MAX_ENTRY_AGE = 86_400_000
export const MAX_SAVE_DATA_LENGTH = 1999

export const ENTRY_TIME_INDEX = 1
export const ENTRY_FORMATTED_TIME_INDEX = 2
export const ENTRY_OCCURENCES_INDEX = 3
export const ENTRY_LEVEL_INDEX = 4
export const ENTRY_TAG_INDEX = 5
export const ENTRY_MESSAGE_INDEX = 6
export const ENTRY_STACK_INDEX = 7
export const ENTRY_ERROR_CODE_INDEX = 8

export const LOG_LEVELS: readonly string[] = [
  LOG_LEVEL_VERBOSE,
  LOG_LEVEL_DEBUG,
  LOG_LEVEL_INFO,
  LOG_LEVEL_WARNING,
  LOG_LEVEL_ERROR,
]

export const LOG_LEVEL_TO_NUMBER: Record<string, number> = {
  [LOG_LEVEL_VERBOSE]: 0,
  [LOG_LEVEL_DEBUG]: 1,
  [LOG_LEVEL_INFO]: 2,
  [LOG_LEVEL_WARNING]: 3,
  [LOG_LEVEL_ERROR]: 4,
}

export const LOG_LEVEL_TO_STRING: Record<string, string> = {
  [LOG_LEVEL_VERBOSE]: "verbose",
  [LOG_LEVEL_DEBUG]: "debug",
  [LOG_LEVEL_INFO]: "info",
  [LOG_LEVEL_WARNING]: "warning",
  [LOG_LEVEL_ERROR]: "error",
}

export const STR_TO_LOG_LEVEL: Record<string, string> = {
  verbose: LOG_LEVEL_VERBOSE,
  v: LOG_LEVEL_VERBOSE,
  debug: LOG_LEVEL_DEBUG,
  d: LOG_LEVEL_DEBUG,
  info: LOG_LEVEL_INFO,
  i: LOG_LEVEL_INFO,
  warning: LOG_LEVEL_WARNING,
  w: LOG_LEVEL_WARNING,
  error: LOG_LEVEL_ERROR,
  e: LOG_LEVEL_ERROR,
}
