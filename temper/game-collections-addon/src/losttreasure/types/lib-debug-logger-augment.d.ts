interface DebugLogger {
  Error: (...args: unknown[]) => void
  Create: (namespace: string) => DebugLogger
  SetMinLevelOverride: (level: number) => void
}

interface LibDebugLogger {
  (this: void, tag: string): DebugLogger
  LOG_LEVEL_DEBUG: number
  LOG_LEVEL_INFO: number
  GetMinLogLevel: () => number
}
