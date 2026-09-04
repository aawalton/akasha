import type { InventoryItemData } from "@akasha/temper-items-core/inventory-types"
import type { InventoryLocationConditionId } from "@akasha/temper-items-core/location-condition"
import {
  buildItemFactsFromInventoryItem,
  resolveStaticItemKey,
} from "@akasha/temper-items-rules-eval/build-item-facts-from-inventory-item"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"

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
