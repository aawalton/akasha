import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const STOLEN_INELIGIBLE_ROOTS = new Set(["companion", "currency"])

export const STOLEN_OPTIONS: FilterOption[] = [
  { value: "stolen", label: "Is Stolen" },
  { value: "not-stolen", label: "Is Not Stolen" },
]

const read = (c: CategoryRule["conditions"]) => c?.stolen

export const STOLEN_FILTER: InventoryRuleFilter = {
  id: "stolen",
  label: "Stolen Status",
  priority: 1,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, STOLEN_INELIGIBLE_ROOTS, "opt-out", categories),
  mutuallyExclusive: ["crafted"],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ stolen: "stolen" }),
  clear: () => ({ stolen: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { stolen: v } : {}
  },
}
