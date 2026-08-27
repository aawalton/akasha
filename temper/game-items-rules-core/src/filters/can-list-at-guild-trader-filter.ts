import type { CategoryRule } from "../inventory-rule-types"
import type { InventoryRuleFilter } from "./filter-types"

const read = (c: CategoryRule["conditions"]) => c?.canListAtGuildTrader

export const canListAtGuildTraderFilter: InventoryRuleFilter = {
  id: "can-list-at-guild-trader",
  label: "Can List at Guild Trader",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isEligibleForAction: (action) => action === "list",
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canListAtGuildTrader: "can-list-at-guild-trader" }),
  clear: () => ({ canListAtGuildTrader: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canListAtGuildTrader: v } : {}
  },
}
