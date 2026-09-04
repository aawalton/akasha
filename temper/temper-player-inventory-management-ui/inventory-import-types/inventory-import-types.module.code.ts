export interface InventoryImportResult {
  success: boolean
  error?: string
  locationCount: number
  itemCount: number
  totalValue: number
  status: "upserted" | "skipped"
}
