import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "akasha/temper/items/rules/core/modules/rule-filter-utils/rule-filter-utils.module.code.ts"

const RECONSTRUCTED_ELIGIBLE_ROOTS = new Set(["equipment"])

const read = (c: CategoryRule["conditions"]) => c?.reconstructed

export const RECONSTRUCTED_FILTER: InventoryRuleFilter = {
  id: "reconstructed",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, RECONSTRUCTED_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ reconstructed: "reconstructed" }),
  clear: () => ({ reconstructed: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { reconstructed: v } : {}
  },
}
