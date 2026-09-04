import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.canSell

export const CAN_SELL_FILTER: InventoryRuleFilter = {
  id: "can-sell",
  label: "Can Sell to Merchant",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isEligibleForAction: (action) => action === "sell" || action === "fence-sell",
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canSell: "can-sell" }),
  clear: () => ({ canSell: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canSell: v } : {}
  },
}
