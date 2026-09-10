import type { InventoryItemData } from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import type { InventoryLocationConditionId } from "akasha/temper/items-core/location-condition/location-condition.module.code.ts"
import {
  buildItemFactsFromInventoryItem,
  resolveStaticItemKey,
} from "akasha/temper/items-rules-eval/build-item-facts-from-inventory-item/build-item-facts-from-inventory-item.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/item-facts/item-facts.module.code.ts"

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
