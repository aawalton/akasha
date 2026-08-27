import { buildItemFactsFromInventoryItem, resolveStaticItemKey } from "./game-code.ts"
import type {
  InventoryItemData,
  InventoryLocationConditionId,
  ItemFacts,
} from "./game-item-types.ts"

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
