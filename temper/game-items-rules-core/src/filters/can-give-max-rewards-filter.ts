import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"

export const CAN_GIVE_MAX_REWARDS_OPTIONS: FilterOption[] = [
  { value: "can-give-max-rewards", label: "Can Give Max Rewards" },
]

const read = (c: CategoryRule["conditions"]) => c?.canGiveMaxRewards

export const canGiveMaxRewardsFilter: InventoryRuleFilter = {
  id: "can-give-max-rewards",
  label: "Can Give Max Rewards",
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
