import type { CategoryRule } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "akasha/temper/items-rules-core/rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "akasha/temper/items-rules-core/rule-filter-utils/rule-filter-utils.module.code.ts"

const ALL_STOCKED_ELIGIBLE_ROOTS = new Set(["consumables"])

export const ALL_STOCKED_OPTIONS: FilterOption[] = [
  { value: "all-stocked", label: "All Stocked" },
  { value: "not-all-stocked", label: "Not All Stocked" },
]

const read = (c: CategoryRule["conditions"]) => c?.allStocked

export const ALL_STOCKED_FILTER: InventoryRuleFilter = {
  id: "all-stocked",
  label: "All Stocked",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, ALL_STOCKED_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ allStocked: "all-stocked" }),
  clear: () => ({ allStocked: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { allStocked: v } : {}
  },
}
