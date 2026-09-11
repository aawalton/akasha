import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "akasha/temper/items-rules-core/rule-filter-types/rule-filter-types.module.code.ts"

export const STACK_FULLNESS_OPTIONS: FilterOption[] = [
  { value: "full", label: "Full Stack" },
  { value: "partial", label: "Partial Stack" },
]

const read = (c: CategoryRule["conditions"]) => c?.stackFullness

export const STACK_FULLNESS_FILTER: InventoryRuleFilter = {
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
