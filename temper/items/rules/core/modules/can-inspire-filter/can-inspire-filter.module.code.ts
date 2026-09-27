import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "akasha/temper/items/rules/core/modules/rule-filter-utils/rule-filter-utils.module.code.ts"

const CAN_INSPIRE_ELIGIBLE_ROOTS = new Set(["equipment", "glyphs"])

const read = (c: CategoryRule["conditions"]) => c?.canInspire

export const CAN_INSPIRE_FILTER: InventoryRuleFilter = {
  id: "can-inspire",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, CAN_INSPIRE_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canInspire: "can-inspire" }),
  clear: () => ({ canInspire: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canInspire: v } : {}
  },
}
