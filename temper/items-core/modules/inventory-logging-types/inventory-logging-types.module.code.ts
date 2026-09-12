export type InventoryLoggingLevel = "none" | "minimal" | "verbose"
export type InventoryPerfTracingLevel = "none" | "minimal"

export interface InventoryLoggingSettings {
  actionReports: InventoryLoggingLevel
  perfTracing: InventoryPerfTracingLevel
}
