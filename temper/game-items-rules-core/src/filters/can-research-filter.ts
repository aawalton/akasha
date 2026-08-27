import type { CategoryRule } from "../inventory-rule-types"
import type { FilterOption, InventoryRuleFilter } from "./filter-types"
import { checkAncestorRoots } from "./filter-utils"

const CAN_RESEARCH_ELIGIBLE_ROOTS = new Set(["equipment"])

export const CAN_RESEARCH_OPTIONS: FilterOption[] = [
  { value: "can-research", label: "Can Research" },
  { value: "cannot-research", label: "Cannot Research" },
]

const read = (c: CategoryRule["conditions"]) => c?.canResearch

export const canResearchFilter: InventoryRuleFilter = {
  id: "can-research",
  label: "Can Research",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, CAN_RESEARCH_ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ canResearch: "can-research" }),
  clear: () => ({ canResearch: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canResearch: v } : {}
  },
}
