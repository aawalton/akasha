import type { CategoryRule } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"
import { checkAncestorRoots } from "../rule-filter-utils/rule-filter-utils.module.code.ts"

const ELIGIBLE_ROOTS = new Set(["equipment"])

const read = (c: CategoryRule["conditions"]) => c?.isTargetEquip

export const NEEDED_FOR_TARGET_CHARACTER_BUILD_FILTER: InventoryRuleFilter = {
  id: "needed-for-target-character-build",
  label: "Needed for Target Character Build",
  priority: 0,
  isEligible: (categoryId, categories) =>
    checkAncestorRoots(categoryId, ELIGIBLE_ROOTS, "opt-in", categories),
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => read(c),
  applyDefault: () => ({ isTargetEquip: "is-target-equip" }),
  clear: () => ({ isTargetEquip: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { isTargetEquip: v } : {}
  },
}
