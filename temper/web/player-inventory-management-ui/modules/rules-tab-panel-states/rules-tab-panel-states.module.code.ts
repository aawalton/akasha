export interface InventoryReadState {
  isInventoryLoading: boolean
  hasInventory: boolean
}

export type UnmappedItemsPanelState =
  | "loading"
  | "no-inventory"
  | "hidden-by-filter"
  | "all-covered"
  | "items"

export function decideUnmappedItemsPanelState(
  args: InventoryReadState & {
    visibleCount: number
    totalCount: number
  }
): UnmappedItemsPanelState {
  if (args.visibleCount > 0) return "items"
  if (!args.hasInventory) return args.isInventoryLoading ? "loading" : "no-inventory"
  if (args.totalCount > 0) return "hidden-by-filter"
  return "all-covered"
}

export type ManagementPlanPanelState = "loading" | "no-inventory" | "no-actions" | "plan"

export function decideManagementPlanPanelState(
  args: InventoryReadState & { sessionCount: number }
): ManagementPlanPanelState {
  if (args.sessionCount > 0) return "plan"
  if (!args.hasInventory) return args.isInventoryLoading ? "loading" : "no-inventory"
  return "no-actions"
}
