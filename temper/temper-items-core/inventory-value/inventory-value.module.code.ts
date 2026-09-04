import { computeValue } from "../inventory-display-value/inventory-display-value.module.code.ts"
import type { InventoryDatabase } from "../inventory-types/inventory-types.module.code.ts"

export function computeInventoryTotalValue(inventory: InventoryDatabase): number {
  let total = 0

  for (const location of Object.values(inventory.locations)) {
    for (const bag of Object.values(location.bags)) {
      for (const item of Object.values(bag)) {
        const value = computeValue(item.estimatedValue, item.merchantValue, item.replacementCost)
        if (value !== undefined && value > 0) {
          total += value * item.stackCount
        }
      }
    }

    if (location.placedFurnishings) {
      for (const furnishing of Object.values(location.placedFurnishings)) {
        if (furnishing.estimatedValue !== undefined && furnishing.estimatedValue > 0) {
          total += furnishing.estimatedValue
        }
      }
    }
  }

  return total
}
