import type {
  CategoryRule,
  ItemAction,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export function collectTraitActions(
  rules: readonly CategoryRule[]
): Record<string, ItemAction | false> {
  const traitActions: Record<string, ItemAction | false> = {}
  for (const rule of rules) {
    const ruleTraits = rule.conditions?.traits
    if (ruleTraits == null || ruleTraits.length === 0) continue
    for (const traitId of ruleTraits) {
      const key = `${rule.categoryId}:trait:${traitId}`
      if (!(key in traitActions)) traitActions[key] = rule.action
    }
  }
  return traitActions
}
