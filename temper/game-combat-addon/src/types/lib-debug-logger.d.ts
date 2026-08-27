interface DebugLoggerInstance {
  Create(subTag: string): DebugLoggerInstance
  Log(level: string, formatString: string, ...args: unknown[]): void
}

interface LibDebugLoggerTable {
  Create: (this: void, tag: string) => DebugLoggerInstance
  LOG_LEVEL_VERBOSE: string
  LOG_LEVEL_DEBUG: string
  LOG_LEVEL_INFO: string
  LOG_LEVEL_WARNING: string
  LOG_LEVEL_ERROR: string
}

declare const LibDebugLogger: LibDebugLoggerTable | undefined
