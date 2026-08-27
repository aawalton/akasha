import type { CategoryRule } from "../inventory-rule-types"
import type { InventoryRuleFilter } from "./filter-types"

const read = (c: CategoryRule["conditions"]) => c?.itemNamePattern

export const itemNameFilter: InventoryRuleFilter = {
  id: "item-name",
  label: "Item Name",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => {
    const v = read(c)
    return typeof v === "string" && v.trim().length > 0
  },
  fingerprint: (c) => {
    const v = read(c)
    return v !== undefined && v.trim().length > 0 ? v : undefined
  },
  applyDefault: () => ({}),
  clear: () => ({ itemNamePattern: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { itemNamePattern: v } : {}
  },
}
