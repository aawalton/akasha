import type { CategoryRule } from "../inventory-rule-types"
import type { InventoryRuleFilter } from "./filter-types"
import { checkAncestorRoots } from "./filter-utils"

const ELIGIBLE_ROOTS = new Set(["companion"])

const read = (c: CategoryRule["conditions"]) => c?.isTargetCompanionEquip

export const neededForTargetCompanionBuildFilter: InventoryRuleFilter = {
  id: "needed-for-target-companion-build",
  label: "Needed for Target Companion Build",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ isTargetCompanionEquip: "is-target-companion-equip" }),
  clear: () => ({ isTargetCompanionEquip: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { isTargetCompanionEquip: v } : {}
  },
}
