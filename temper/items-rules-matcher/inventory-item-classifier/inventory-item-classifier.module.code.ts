import { classifyItemToNodeIds } from "akasha/temper/temper-items-core/classify-item-node-ids/classify-item-node-ids.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/temper-items-core/inventory-types/inventory-types.module.code.ts"
import { getLocationDisplayName } from "akasha/temper/temper-items-core/location-classify/location-classify.module.code.ts"
import type { ClassifiedInventoryItem } from "akasha/temper/temper-items-rules-core/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"

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
