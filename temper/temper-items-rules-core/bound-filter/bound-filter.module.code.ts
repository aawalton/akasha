import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

export const BOUND_OPTIONS: FilterOption[] = [
  { value: "bound", label: "Is Bound" },
  { value: "not-bound", label: "Is Not Bound" },
]

const read = (c: CategoryRule["conditions"]) => c?.bound

export const BOUND_FILTER: InventoryRuleFilter = {
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
