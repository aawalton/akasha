import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const ELIGIBLE_ROOTS = new Set(["companion"])

const read = (c: CategoryRule["conditions"]) => c?.isTargetCompanionEquip

export const NEEDED_FOR_TARGET_COMPANION_BUILD_FILTER: InventoryRuleFilter = {
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
