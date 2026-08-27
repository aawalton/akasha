import { hasSignals, matchesSignals } from "./classify-item"
import { ITEM_CATEGORY_PRIORITY, ITEM_CATEGORY_TREE } from "./generated/item-category-tree.generated"
import type { ClassifiableItem, ItemCategoryNode } from "./item-category-tree-types"

export function classifyItemToNodeIds(item: ClassifiableItem): readonly string[] {
  for (const categoryId of ITEM_CATEGORY_PRIORITY) {
    const category = ITEM_CATEGORY_TREE[categoryId]
    if (category === undefined) continue
    const path = walkNodeIds(item, category)
    if (path !== null) return path
  }
  return ["miscellaneous", "other"]
}

function walkNodeIds(item: ClassifiableItem, node: ItemCategoryNode): readonly string[] | null {
  if (hasSignals(node) && !matchesSignals(item, node)) return null

  if (node.children) {
    for (const child of node.children) {
      const deeper = walkNodeIds(item, child)
      if (deeper) return [node.id, ...deeper]
    }
  }

  if (hasSignals(node)) return [node.id]

  return null
}
