import type { CategoryRule } from "../inventory-rule-types"
import type { InventoryRuleFilter } from "./filter-types"

const read = (c: CategoryRule["conditions"]) => c?.canSell

export const canSellFilter: InventoryRuleFilter = {
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
