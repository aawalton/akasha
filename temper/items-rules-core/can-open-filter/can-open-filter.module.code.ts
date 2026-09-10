import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

export const CAN_OPEN_OPTIONS: FilterOption[] = [{ value: "can-open", label: "Can Open" }]

const read = (c: CategoryRule["conditions"]) => c?.canOpen

export const CAN_OPEN_FILTER: InventoryRuleFilter = {
  id: "can-open",
  label: "Can Open",
  priority: 0,
  isEligible: () => true,
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canOpen: "can-open" }),
  clear: () => ({ canOpen: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canOpen: v } : {}
  },
}
