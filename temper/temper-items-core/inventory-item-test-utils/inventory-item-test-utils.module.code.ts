import type { InventoryItemData } from "../inventory-types/inventory-types.module.code.ts"

export function makeInventoryItem(
  itemId: number,
  stackCount: number,
  overrides: Partial<InventoryItemData> = {}
): InventoryItemData {
  return {
    itemId,
    itemName: `Item ${itemId}`,
    itemLink: "",
    quality: 2,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount,
    ...overrides,
  }
}
