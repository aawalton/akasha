export type InventoryLoggingLevel = "none" | "minimal" | "verbose"
export type InventoryPerfTracingLevel = "none" | "minimal"
export type InventoryBankProfilerLevel = "none" | "script"

export interface InventoryLoggingSettings {
  actionReports: InventoryLoggingLevel
  perfTracing: InventoryPerfTracingLevel
  bankProfiler?: InventoryBankProfilerLevel
}
