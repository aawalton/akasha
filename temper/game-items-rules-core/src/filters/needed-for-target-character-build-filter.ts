import type { CategoryRule } from "../inventory-rule-types"
import type { InventoryRuleFilter } from "./filter-types"
import { checkAncestorRoots } from "./filter-utils"

const ELIGIBLE_ROOTS = new Set(["equipment"])

const read = (c: CategoryRule["conditions"]) => c?.isTargetEquip

export const neededForTargetCharacterBuildFilter: InventoryRuleFilter = {
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
