import type { InventoryItemData } from "@akasha/temper-items-core/inventory-types"
import type { CharacterId } from "../use-destination-types/use-destination-types.module.code.ts"

export interface AffectedItem {
  item: InventoryItemData
  locationKey: string
  locationDisplayName: string
  bagId: number
  alreadyAtDestination: boolean
  quantity?: number
  useAllocation?: readonly CharacterId[]
}

export interface ClassifiedInventoryItem {
  item: InventoryItemData
  locationKey: string
  locationDisplayName: string
  nodeIds: readonly string[]
  bagId: number
}

export interface AllRuleAffectedItemsResult {
  ruleMap: Map<string, readonly AffectedItem[]>
}
