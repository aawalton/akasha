import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"

export const BOUND_OPTIONS: FilterOption[] = [
  { value: "bound", label: "Is Bound" },
  { value: "not-bound", label: "Is Not Bound" },
]

const read = (c: CategoryRule["conditions"]) => c?.bound

export const boundFilter: InventoryRuleFilter = {
  id: "bound",
  label: "Bound Status",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ bound: "bound" }),
  clear: () => ({ bound: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { bound: v } : {}
  },
}
