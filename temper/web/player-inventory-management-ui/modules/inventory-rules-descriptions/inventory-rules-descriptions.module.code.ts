import type { ItemCategoriesKeyed } from "akasha/temper/items/core/modules/item-category-tree/item-category-tree.module.code.ts"
import {
  ALL_CATEGORIES_ID,
  ALL_CATEGORIES_NODE,
  type CategoryRule,
  type ItemRule,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import { getNodePath } from "akasha/temper/items/rules/core/modules/item-category-tree-utils/item-category-tree-utils.module.code.ts"
import { getActionLabel } from "akasha/temper/web/player-inventory-management-ui/modules/action-options/action-options.module.code.ts"

function describeCategoryRule(rule: CategoryRule, categories: ItemCategoriesKeyed): string {
  const actionLabel = getActionLabel(rule.action)
  if (rule.title != null) return `${rule.title} — ${actionLabel}`
  if (rule.categoryId === ALL_CATEGORIES_ID) return `${ALL_CATEGORIES_NODE.name} — ${actionLabel}`
  const path = getNodePath(rule.categoryId, categories)
  const categoryName = path.length > 0 ? path.map((p) => p.name).join(" > ") : rule.categoryId
  return `${categoryName} — ${actionLabel}`
}

function describeItemRule(rule: ItemRule): string {
  const actionLabel = getActionLabel(rule.action)
  return `${rule.title != null && rule.title !== "" ? rule.title : rule.itemName} — ${actionLabel}`
}

export function getCategoryRuleDescriptions(
  rules: readonly CategoryRule[],
  ids: readonly string[],
  categories: ItemCategoriesKeyed
): readonly string[] {
  const idSet = new Set(ids)
  return rules.filter((r) => idSet.has(r.id)).map((r) => describeCategoryRule(r, categories))
}

export function getItemRuleDescriptions(
  rules: readonly ItemRule[],
  ids: readonly string[]
): readonly string[] {
  const idSet = new Set(ids)
  return rules.filter((r) => idSet.has(r.id)).map(describeItemRule)
}
