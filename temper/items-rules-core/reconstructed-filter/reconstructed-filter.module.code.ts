import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type {
  FilterOption,
  InventoryRuleFilter,
} from "../rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const RECONSTRUCTED_ELIGIBLE_ROOTS = new Set(["equipment"])

export const RECONSTRUCTED_OPTIONS: FilterOption[] = [
  { value: "reconstructed", label: "Is Reconstructed" },
  { value: "not-reconstructed", label: "Is Not Reconstructed" },
]

const read = (c: CategoryRule["conditions"]) => c?.reconstructed

export const RECONSTRUCTED_FILTER: InventoryRuleFilter = {
  id: "reconstructed",
  label: "Reconstructed Status",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, RECONSTRUCTED_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ reconstructed: "reconstructed" }),
  clear: () => ({ reconstructed: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { reconstructed: v } : {}
  },
}
