import { hasSignals, matchesSignals } from "../classify-item/classify-item.module.code.ts"
import {
  ITEM_CATEGORY_PRIORITY,
  ITEM_CATEGORY_TREE,
} from "../item-category-tree-data/item-category-tree-data.module.code.ts"
import type {
  ClassifiableItem,
  ItemCategoryNode,
} from "../item-category-tree-types/item-category-tree-types.module.code.ts"

export function classifyItemToNodeIds(item: ClassifiableItem): readonly string[] {
  for (const categoryId of ITEM_CATEGORY_PRIORITY) {
    const category = ITEM_CATEGORY_TREE[categoryId]
    if (category === undefined) continue
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
