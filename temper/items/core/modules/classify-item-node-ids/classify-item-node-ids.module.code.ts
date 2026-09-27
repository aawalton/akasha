import {
  hasSignals,
  matchesSignals,
} from "akasha/temper/items/core/modules/classify-item/classify-item.module.code.ts"
import type {
  ClassifiableItem,
  ItemCategoryNode,
  ItemCategoryRoots,
} from "akasha/temper/items/core/modules/item-category-tree-types/item-category-tree-types.module.code.ts"

export function classifyItemToNodeIds(
  item: ClassifiableItem,
  roots: ItemCategoryRoots
): readonly string[] {
  for (const category of roots) {
    const path = matchNodeIds(item, category)
    if (path !== null) return path
  }
  return ["miscellaneous", "other"]
}

function matchNodeIds(item: ClassifiableItem, node: ItemCategoryNode): readonly string[] | null {
  if (hasSignals(node) && !matchesSignals(item, node)) return null

  if (node.children) {
    for (const child of node.children) {
      const deeper = matchNodeIds(item, child)
      if (deeper) return [node.id, ...deeper]
    }
  }

  if (hasSignals(node)) return [node.id]

  return null
}
