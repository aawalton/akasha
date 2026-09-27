import type { CategoryRule } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "akasha/temper/items/rules/core/modules/rule-filter-types/rule-filter-types.module.code.ts"

const read = (c: CategoryRule["conditions"]) => c?.canGiveMaxRewards

export const CAN_GIVE_MAX_REWARDS_FILTER: InventoryRuleFilter = {
  id: "can-give-max-rewards",
  priority: 0,
  isEligible: () => true,
  isEligibleForAction: (action) => action === "open",
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canGiveMaxRewards: "can-give-max-rewards" }),
  clear: () => ({ canGiveMaxRewards: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canGiveMaxRewards: v } : {}
  },
}
