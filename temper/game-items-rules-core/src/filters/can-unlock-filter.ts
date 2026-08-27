import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"

export const CAN_UNLOCK_OPTIONS: FilterOption[] = [
  { value: "can-unlock", label: "Can Unlock" },
  { value: "cannot-unlock", label: "Cannot Unlock" },
]

const read = (c: CategoryRule["conditions"]) => c?.canUnlock

export const canUnlockFilter: InventoryRuleFilter = {
  id: "can-unlock",
  label: "Can Unlock",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canUnlock: "can-unlock" }),
  clear: () => ({ canUnlock: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canUnlock: v } : {}
  },
}
