export interface PerfSlot {
  perf?: { loadTimeMs: number }
}

export interface CaptureDescriptor<T extends object> {
  readonly addonName: string
  readonly savedVariablesName: string
  readonly version: number | string
  readonly defaults: T
  readonly perf?: boolean
}
