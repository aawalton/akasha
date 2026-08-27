import { classifyItemToNodeIds } from "@temper/game-items-core/classify-item-node-ids"
import { getLocationDisplayName } from "@temper/game-items-core/inventory-grouping"
import type { InventoryDatabase } from "@temper/game-items-core/inventory-types"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"

export function classifyAllInventoryItems(
  inventory: InventoryDatabase
): readonly ClassifiedInventoryItem[] {
  const results: ClassifiedInventoryItem[] = []

  for (const [locationKey, location] of Object.entries(inventory.locations)) {
    for (const [bagIdStr, slots] of Object.entries(location.bags)) {
      for (const item of Object.values(slots)) {
        results.push({
          item,
          locationKey,
          locationDisplayName: getLocationDisplayName(locationKey, location.displayName),
          nodeIds: classifyItemToNodeIds(item),
          bagId: Number(bagIdStr),
        })
      }
    }
  }

  return results
}
