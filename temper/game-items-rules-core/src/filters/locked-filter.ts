import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"

export const LOCKED_OPTIONS: FilterOption[] = [
  { value: "locked", label: "Is Locked" },
  { value: "not-locked", label: "Is Not Locked" },
]

const read = (c: CategoryRule["conditions"]) => c?.locked

export const lockedFilter: InventoryRuleFilter = {
  id: "locked",
  label: "Lock Status",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ locked: "locked" }),
  clear: () => ({ locked: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { locked: v } : {}
  },
}
