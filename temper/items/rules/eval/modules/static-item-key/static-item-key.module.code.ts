import {
  ESO_ITEMTYPE_RECIPE,
  type InventoryItemData,
} from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { getRecipeResultId } from "akasha/temper/items/core/modules/recipe-result-id-lookup/recipe-result-id-lookup.module.code.ts"
import type { ItemKey } from "akasha/temper/items/rules/core/modules/use-destination-types/use-destination-types.module.code.ts"
import { resolveBookItemKey } from "akasha/temper/items/rules/eval/modules/build-item-facts-from-inventory-item/build-item-facts-from-inventory-item.module.code.ts"

export function resolveStaticItemKey(item: InventoryItemData): ItemKey | undefined {
  if (item.itemType !== ESO_ITEMTYPE_RECIPE) return resolveBookItemKey(item)
  return { kind: "recipe", resultItemId: getRecipeResultId(item.itemName) ?? item.itemId }
}
