import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "akasha/temper/items/rules/core/modules/rule-filter-utils/rule-filter-utils.module.code.ts"

const CAN_RESEARCH_ELIGIBLE_ROOTS = new Set(["equipment"])

const read = (c: CategoryRule["conditions"]) => c?.canResearch

export const CAN_RESEARCH_FILTER: InventoryRuleFilter = {
  id: "can-research",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, CAN_RESEARCH_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canResearch: "can-research" }),
  clear: () => ({ canResearch: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canResearch: v } : {}
  },
}
