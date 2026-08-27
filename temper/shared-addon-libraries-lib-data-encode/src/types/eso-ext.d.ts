interface ZoInitializingObjectClass {
  Subclass<T = object>(this: ZoInitializingObjectClass): T
}
declare const ZO_InitializingObject: ZoInitializingObjectClass

interface LibDebugLoggerInstance {
  Log(this: LibDebugLoggerInstance, level: unknown, ...args: readonly unknown[]): void
}

interface LibDebugLoggerClass {
  Create: (this: void, name: string) => LibDebugLoggerInstance
  LOG_LEVEL_VERBOSE: unknown
  LOG_LEVEL_DEBUG: unknown
  LOG_LEVEL_INFO: unknown
  LOG_LEVEL_WARNING: unknown
  LOG_LEVEL_ERROR: unknown
}

declare const LibDebugLogger: LibDebugLoggerClass | undefined
