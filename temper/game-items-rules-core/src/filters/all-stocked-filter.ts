import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"
import { checkAncestorRoots } from "./filter-utils"

const ALL_STOCKED_ELIGIBLE_ROOTS = new Set(["consumables"])

export const ALL_STOCKED_OPTIONS: FilterOption[] = [
  { value: "all-stocked", label: "All Stocked" },
  { value: "not-all-stocked", label: "Not All Stocked" },
]

const read = (c: CategoryRule["conditions"]) => c?.allStocked

export const allStockedFilter: InventoryRuleFilter = {
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
