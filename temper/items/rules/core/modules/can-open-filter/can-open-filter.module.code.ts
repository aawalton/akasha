import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.canOpen

export const CAN_OPEN_FILTER: InventoryRuleFilter = {
  id: "can-open",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canOpen: "can-open" }),
  clear: () => ({ canOpen: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canOpen: v } : {}
  },
}
