import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

export const LOCKED_OPTIONS: FilterOption[] = [
  { value: "locked", label: "Is Locked" },
  { value: "not-locked", label: "Is Not Locked" },
]

const read = (c: CategoryRule["conditions"]) => c?.locked

export const LOCKED_FILTER: InventoryRuleFilter = {
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
