import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import { INVENTORY_RULE_FILTERS } from "../rule-filter-registry/rule-filter-registry.module.code.ts"

export function ruleFingerprint(rule: CategoryRule): string {
  const parts = [rule.categoryId, rule.action, rule.destination ?? ""]
  if (rule.stockScope != null) parts.push(`scope:${rule.stockScope}`)
  for (const filter of INVENTORY_RULE_FILTERS) {
    const part = filter.fingerprint(rule.conditions)
    if (part === undefined) continue
    parts.push(`${filter.id}:${part}`)
  }
  return parts.join("|")
}
