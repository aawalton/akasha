import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "akasha/temper/items/rules/core/modules/rule-filter-utils/rule-filter-utils.module.code.ts"

const UNCOLLECTED_ELIGIBLE_ROOTS = new Set(["equipment"])

const read = (c: CategoryRule["conditions"]) => c?.uncollected

export const UNCOLLECTED_FILTER: InventoryRuleFilter = {
  id: "uncollected",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, UNCOLLECTED_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ uncollected: "uncollected" }),
  clear: () => ({ uncollected: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { uncollected: v } : {}
  },
}
