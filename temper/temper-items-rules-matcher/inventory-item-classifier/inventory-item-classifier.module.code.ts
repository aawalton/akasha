import { classifyItemToNodeIds } from "@akasha/temper-items-core/classify-item-node-ids"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import { getLocationDisplayName } from "@akasha/temper-items-core/location-classify"
import type { ClassifiedInventoryItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"

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
