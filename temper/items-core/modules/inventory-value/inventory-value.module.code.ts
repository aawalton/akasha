import { computeValue } from "akasha/temper/items-core/modules/inventory-display-value/inventory-display-value.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"

export function computeInventoryTotalValue(inventory: InventoryDatabase): number {
  let total = 0

  for (const location of Object.values(inventory.locations)) {
    for (const bag of Object.values(location.bags)) {
      for (const item of Object.values(bag)) {
        const value = computeValue(item.marketValue, item.merchantValue, item.replacementValue)
        if (value !== undefined && value > 0) {
          total += value * item.stackCount
        }
      }
    }

    if (location.placedFurnishings) {
      for (const furnishing of Object.values(location.placedFurnishings)) {
        if (furnishing.marketValue !== undefined && furnishing.marketValue > 0) {
          total += furnishing.marketValue
        }
      }
    }
  }

  return total
}
