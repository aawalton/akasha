import type { ItemCategoryNode } from "@akasha/temper-items-core/item-category-tree-types"
import {
  type RuleConstantKey,
  resolveThreshold,
} from "../rule-constants/rule-constants.module.code.ts"

export function renderThresholdLabel(v: number | RuleConstantKey): string {
  return typeof v === "number" ? `${v}` : `${v}(${resolveThreshold(v)})`
}

export function checkAncestorRoots(
  nodeId: string,
  roots: ReadonlySet<string>,
  mode: "opt-in" | "opt-out",
  categories: Record<string, ItemCategoryNode>
): boolean {
  const defaultResult = mode !== "opt-in"
  const matchResult = mode === "opt-in"

  if (roots.has(nodeId)) return matchResult

  function find(node: ItemCategoryNode, ancestorIds: readonly string[]): boolean | null {
    if (node.id === nodeId) {
      const hasAncestorInRoots = ancestorIds.some((id) => roots.has(id))
      return hasAncestorInRoots ? matchResult : defaultResult
    }
    if (node.children) {
      for (const child of node.children) {
        const result = find(child, [...ancestorIds, node.id])
        if (result !== null) return result
      }
    }
    return null
  }

  for (const category of Object.values(categories)) {
    if (!category) continue
    const result = find(category, [])
    if (result !== null) return result
  }

  return defaultResult
}
