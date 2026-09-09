import {
  buildItemFactsFromInventoryItem,
  resolveStaticItemKey,
} from "@akasha/temper-items-rules-eval/build-item-facts-from-inventory-item"
import type { ItemFacts } from "@akasha/temper-items-rules-eval/item-facts"
import type { InventoryItemData } from "akasha/temper/temper-items-core/inventory-types/inventory-types.module.code.ts"
import type { InventoryLocationConditionId } from "akasha/temper/temper-items-core/location-condition/location-condition.module.code.ts"

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
