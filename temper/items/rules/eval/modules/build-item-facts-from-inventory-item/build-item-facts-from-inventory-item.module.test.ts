import { expect, test } from "bun:test"
import type { InventoryItemData } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { readPotionRestoresFrom } from "akasha/temper/items/rules/core/modules/potion-restore-resolve/potion-restore-resolve.module.code.ts"
import { buildItemFactsFromInventoryItem } from "akasha/temper/items/rules/eval/modules/build-item-facts-from-inventory-item/build-item-facts-from-inventory-item.module.code.ts"

readPotionRestoresFrom(() => [])

const TALISMAN: InventoryItemData = {
  itemId: 224365,
  itemName: "Prowler's Talisman",
  itemLink: "|H1:item:224365:436:1:0:0:0:0:0:0:0:0:0:0:0:1:0:0:1:0:0:0|h|h",
  quality: 6,
  filterType: 25,
  itemType: 2,
  traitType: 28,
  requiredLevel: 1,
  requiredCP: 0,
  stackCount: 1,
}

function factsOf(item: InventoryItemData) {
  return buildItemFactsFromInventoryItem({
    item,
    nodeIds: [],
    location: "backpack",
    itemKey: undefined,
  })
}

test("an item the capture holds unique is unique in its facts", () => {
  expect(factsOf({ ...TALISMAN, unique: true }).isUnique).toBe(true)
})

test("an item a capture took before uniqueness was recorded is not known to be unique", () => {
  expect(factsOf(TALISMAN).isUnique).toBeUndefined()
})
