import { type InventoryLocationConditionId } from "@temper/game-items-core/location-condition"
import { buildItemFactsFromInventoryItem, resolveStaticItemKey } from "./game-code.ts"
import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import type { ItemFacts } from "@temper/game-items-rules-eval/item-facts"

export function cliItemFactsFromInventoryItem(
  item: InventoryItemData,
  nodeIds: ReadonlyArray<string>,
  location: InventoryLocationConditionId | undefined
): ItemFacts {
  return buildItemFactsFromInventoryItem({
    item,
    nodeIds,
    location,
    itemKey: resolveStaticItemKey(item),
  })
}
