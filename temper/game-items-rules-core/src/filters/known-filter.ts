import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"
import { checkAncestorRoots } from "./filter-utils"

const KNOWN_ELIGIBLE_ROOTS = new Set(["recipes", "monster-trophies", "rare-fish"])

export const KNOWN_OPTIONS: FilterOption[] = [
  { value: "known", label: "Is Known" },
  { value: "not-known", label: "Is Not Known" },
]

const read = (c: CategoryRule["conditions"]) => c?.known

export const knownFilter: InventoryRuleFilter = {
  id: "known",
  label: "Known Status",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, KNOWN_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ known: "known" }),
  clear: () => ({ known: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { known: v } : {}
  },
}
