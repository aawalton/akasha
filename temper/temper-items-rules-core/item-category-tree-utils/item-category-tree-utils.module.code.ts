import { ITEM_CATEGORY_PRIORITY } from "@akasha/temper-items-core/item-category-tree-data"
import type { ItemCategoryNode } from "@akasha/temper-items-core/item-category-tree-types"
import { ALL_CATEGORIES_ID } from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export function getNodePath(
  nodeId: string,
  categories: Record<string, ItemCategoryNode>
): readonly { id: string; name: string }[] {
  function find(
    node: ItemCategoryNode,
    ancestors: readonly { id: string; name: string }[]
  ): readonly { id: string; name: string }[] | null {
    const current = [...ancestors, { id: node.id, name: node.name }]
    if (node.id === nodeId) return current
    if (node.children) {
      for (const child of node.children) {
        const result = find(child, current)
        if (result) return result
      }
    }
    return null
  }

  for (const key of ITEM_CATEGORY_PRIORITY) {
    const category = categories[key]
    if (category) {
      const result = find(category, [])
      if (result) return result
    }
  }

  return []
}

export function getNodeChildren(
  nodeId: string | undefined,
  categories: Record<string, ItemCategoryNode>
): readonly { id: string; name: string }[] {
  if (nodeId === undefined) {
    return ITEM_CATEGORY_PRIORITY.map((key) => categories[key])
      .filter((n): n is ItemCategoryNode => n != null)
      .map((n) => ({ id: n.id, name: n.name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }

  function find(node: ItemCategoryNode): readonly ItemCategoryNode[] | null {
    if (node.id === nodeId) return node.children ?? null
    if (node.children) {
      for (const child of node.children) {
        const result = find(child)
        if (result) return result
      }
    }
    return null
  }

  for (const key of ITEM_CATEGORY_PRIORITY) {
    const category = categories[key]
    if (category) {
      const result = find(category)
      if (result) {
        return result
          .map((n) => ({ id: n.id, name: n.name }))
          .sort((a, b) => a.name.localeCompare(b.name))
      }
    }
  }

  return []
}

export function getCategoryAncestorIds(
  nodeId: string,
  categories: Record<string, ItemCategoryNode>
): Set<string> {
  if (nodeId === ALL_CATEGORIES_ID) return new Set([ALL_CATEGORIES_ID])
  return new Set(getNodePath(nodeId, categories).map((n) => n.id))
}

export function getCategoryDescendantIds(
  nodeId: string,
  categories: Record<string, ItemCategoryNode>
): Set<string> {
  const result = new Set<string>()

  function collect(node: ItemCategoryNode): undefined {
    result.add(node.id)
    if (node.children) {
      for (const child of node.children) {
        collect(child)
      }
    }
  }

  if (nodeId === ALL_CATEGORIES_ID) {
    result.add(ALL_CATEGORIES_ID)
    for (const key of ITEM_CATEGORY_PRIORITY) {
      const category = categories[key]
      if (category) collect(category)
    }
    return result
  }

  function findAndCollect(node: ItemCategoryNode): boolean {
    if (node.id === nodeId) {
      collect(node)
      return true
    }
    if (node.children) {
      for (const child of node.children) {
        if (findAndCollect(child)) return true
      }
    }
    return false
  }

  for (const key of ITEM_CATEGORY_PRIORITY) {
    const category = categories[key]
    if (category && findAndCollect(category)) break
  }

  return result
}
