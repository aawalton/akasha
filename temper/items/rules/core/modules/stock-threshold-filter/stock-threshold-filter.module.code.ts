import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"

export const STOCK_THRESHOLD_COUNTS: readonly number[] = [10, 25, 50, 100, 200, 500]

const read = (c: CategoryRule["conditions"]) => c?.stockThreshold

export const STOCK_THRESHOLD_FILTER: InventoryRuleFilter = {
  id: "stock-threshold",
  priority: 0,
  isEligible: () => {
    return true
  },
  mutuallyExclusive: [],
  isEligibleForAction: () => true,
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    return v !== undefined ? String(v) : undefined
  },
  applyDefault: () => ({ stockThreshold: 200 }),
  clear: () => ({ stockThreshold: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { stockThreshold: v } : {}
  },
}
