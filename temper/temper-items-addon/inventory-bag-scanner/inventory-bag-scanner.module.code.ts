import { extractItemData } from "../inventory-item-data/inventory-item-data.module.code.ts"
import type { ItemData } from "../inventory-saved-variables-types/inventory-saved-variables-types.module.code.ts"
export function scanStandardBag(bagId: number): Record<number, ItemData> {
  const items: Record<number, ItemData> = {}
  const bagSize = GetBagSize(bagId)
  for (let slotIndex = 0; slotIndex < bagSize; slotIndex++) {
    const item = extractItemData(bagId, slotIndex)
    if (item) {
      items[slotIndex] = item
    }
  }
  return items
}

export function scanVirtualBag(): Record<number, ItemData> {
  const items: Record<number, ItemData> = {}
  let slotId = GetNextVirtualBagSlotId(undefined)
  while (slotId !== undefined) {
    const item = extractItemData(BAG_VIRTUAL, slotId)
    if (item) {
      items[slotId] = item
    }
    slotId = GetNextVirtualBagSlotId(slotId)
  }
  return items
}

export function scanIteratedBag(bagId: number): Record<number, ItemData> {
  const items: Record<number, ItemData> = {}
  let slotIndex = ZO_GetNextBagSlotIndex(bagId, undefined)
  while (slotIndex !== undefined) {
    const item = extractItemData(bagId, slotIndex)
    if (item) {
      items[slotIndex] = item
    }
    slotIndex = ZO_GetNextBagSlotIndex(bagId, slotIndex)
  }
  return items
}

export function scanBag(bagId: number): Record<number, ItemData> {
  if (bagId === BAG_VIRTUAL) {
    return scanVirtualBag()
  }
  if (bagId === BAG_GUILDBANK || bagId === BAG_FURNITURE_VAULT) {
    return scanIteratedBag(bagId)
  }
  return scanStandardBag(bagId)
}
