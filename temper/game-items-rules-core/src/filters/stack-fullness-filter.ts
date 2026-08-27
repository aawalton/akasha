import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"

export const STACK_FULLNESS_OPTIONS: FilterOption[] = [
  { value: "full", label: "Full Stack" },
  { value: "partial", label: "Partial Stack" },
]

const read = (c: CategoryRule["conditions"]) => c?.stackFullness

export const stackFullnessFilter: InventoryRuleFilter = {
  id: "stack-fullness",
  label: "Stack Fullness",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ stackFullness: "full" }),
  clear: () => ({ stackFullness: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { stackFullness: v } : {}
  },
}
