import type { CategoryRule } from "../inventory-rule-types"
import { INVENTORY_RULE_FILTERS } from "./filter-registry"

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
