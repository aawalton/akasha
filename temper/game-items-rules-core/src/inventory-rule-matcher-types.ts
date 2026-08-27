import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import type { CharacterId } from "./use-destination-types"

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
