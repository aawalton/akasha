import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"

export const TARGET_QUANTITY_OPTIONS: FilterOption[] = [1, 5, 10, 20, 50, 100, 200, 500, 1_000].map(
  (v) => ({ value: String(v), label: String(v) })
)

const read = (c: CategoryRule["conditions"]) => c?.targetQuantity

export const TARGET_QUANTITY_FILTER: InventoryRuleFilter = {
  id: "target-quantity",
  label: "Target",
  priority: 9,
  isEligible: () => true,
  isEligibleForAction: (action) => action === "move-to",
  mutuallyExclusive: ["keep-quantity"],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    return v !== undefined ? String(v) : undefined
  },
  applyDefault: () => ({ targetQuantity: 200 }),
  clear: () => ({ targetQuantity: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { targetQuantity: v } : {}
  },
}
