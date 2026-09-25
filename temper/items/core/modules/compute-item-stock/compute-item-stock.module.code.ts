import type { InventoryDatabase } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { classifyLocation } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"

interface ItemStockBreakdown {
  byChar: Map<string, number>
  accountStorage: number
  total: number
}

const BANK = "Bank"

export function computeBankStock(inventory: InventoryDatabase | null): Map<number, number> {
  const result = new Map<number, number>()
  const bank = inventory?.locations[BANK]
  if (bank === undefined) return result
  for (const slots of Object.values(bank.bags)) {
    for (const item of Object.values(slots)) {
      result.set(item.itemId, (result.get(item.itemId) ?? 0) + item.stackCount)
    }
  }
  return result
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
