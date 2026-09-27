import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.bopTradeable

export const BOP_TRADEABLE_FILTER: InventoryRuleFilter = {
  id: "bop-tradeable",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ bopTradeable: "bop-tradeable" }),
  clear: () => ({ bopTradeable: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { bopTradeable: v } : {}
  },
}
