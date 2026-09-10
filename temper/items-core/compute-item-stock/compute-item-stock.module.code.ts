import type { InventoryDatabase } from "../inventory-types/inventory-types.module.code.ts"
import { classifyLocation } from "../location-classify/location-classify.module.code.ts"

export interface ItemStockBreakdown {
  byChar: Map<string, number>
  accountStorage: number
  total: number
}

export function computeItemStock(
  inventory: InventoryDatabase | null,
  itemIds: ReadonlySet<number>
): Map<number, ItemStockBreakdown> {
  const result = new Map<number, ItemStockBreakdown>()
  if (inventory === null) return result

  const breakdownFor = (itemId: number): ItemStockBreakdown => {
    let breakdown = result.get(itemId)
    if (breakdown === undefined) {
      breakdown = { byChar: new Map<string, number>(), accountStorage: 0, total: 0 }
      result.set(itemId, breakdown)
    }
    return breakdown
  }

  for (const [locationKey, location] of Object.entries(inventory.locations)) {
    const isCharacter = classifyLocation(locationKey) === "character"
    for (const slots of Object.values(location.bags)) {
      for (const item of Object.values(slots)) {
        if (!itemIds.has(item.itemId)) continue
        const breakdown = breakdownFor(item.itemId)
        if (isCharacter) {
          breakdown.byChar.set(
            locationKey,
            (breakdown.byChar.get(locationKey) ?? 0) + item.stackCount
          )
        } else {
          breakdown.accountStorage += item.stackCount
        }
        breakdown.total += item.stackCount
      }
    }
  }

  return result
}
