import { ITEM_CATEGORY_PRIORITY, ITEM_CATEGORY_TREE } from "./generated/item-category-tree.generated"
import type { CategoryPath, ClassifiableItem, ItemCategoryNode } from "./item-category-tree-types"

export function classifyItem(item: ClassifiableItem): CategoryPath {
  for (const categoryId of ITEM_CATEGORY_PRIORITY) {
    const category = ITEM_CATEGORY_TREE[categoryId]
    const path = walkNode(item, category)
    if (path) return path
  }
  return ["Miscellaneous", "Other"]
}

function walkNode(item: ClassifiableItem, node: ItemCategoryNode): CategoryPath | null {
  if (hasSignals(node) && !matchesSignals(item, node)) return null

  if (node.children) {
    for (const child of node.children) {
      const deeper = walkNode(item, child)
      if (deeper) return [node.name, ...deeper]
    }
  }

  if (hasSignals(node)) return [node.name]

  return null
}

export function hasSignals(node: ItemCategoryNode): boolean {
  return (
    node.filterTypes != null ||
    node.itemTypes != null ||
    node.specializedItemTypes != null ||
    node.traitTypeRange != null ||
    node.equipTypes != null ||
    node.weaponTypes != null ||
    node.armorTypes != null ||
    node.furnitureCategoryIds != null ||
    node.furnitureSubcategoryIds != null ||
    node.itemNameContains != null
  )
}

export function matchesSignals(item: ClassifiableItem, node: ItemCategoryNode): boolean {
  if (node.filterTypes && !node.filterTypes.includes(item.filterType)) return false
  if (node.itemTypes && !node.itemTypes.includes(item.itemType)) return false
  if (node.specializedItemTypes) {
    if (item.specializedItemType === undefined) return false
    if (!node.specializedItemTypes.includes(item.specializedItemType)) return false
  }
  if (node.traitTypeRange) {
    if (item.traitType === undefined) return false
    if (item.traitType < node.traitTypeRange[0] || item.traitType > node.traitTypeRange[1])
      return false
  }
  if (node.equipTypes) {
    if (item.equipType === undefined) return false
    if (!node.equipTypes.includes(item.equipType)) return false
  }
  if (node.weaponTypes) {
    if (item.weaponType === undefined) return false
    if (!node.weaponTypes.includes(item.weaponType)) return false
  }
  if (node.armorTypes) {
    if (item.armorType === undefined) return false
    if (!node.armorTypes.includes(item.armorType)) return false
  }
  if (node.furnitureCategoryIds) {
    if (item.furnitureCategoryId === undefined) return false
    if (!node.furnitureCategoryIds.includes(item.furnitureCategoryId)) return false
  }
  if (node.furnitureSubcategoryIds) {
    if (item.furnitureSubcategoryId === undefined) return false
    if (!node.furnitureSubcategoryIds.includes(item.furnitureSubcategoryId)) return false
  }
  if (node.itemNameContains != null) {
    if (item.itemName === undefined) return false
    if (!item.itemName.includes(node.itemNameContains)) return false
  }
  return true
}
