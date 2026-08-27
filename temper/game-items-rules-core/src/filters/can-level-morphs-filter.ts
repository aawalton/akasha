import type { CategoryRule, ItemAction } from "../inventory-rule-types"
import type { RuleMatcherContext } from "../rule-matcher-context-types"
import type { CanLevelMorphsCondition } from "./can-level-morphs-filter-types"
import type { InventoryRuleFilter } from "./filter-types"

const read = (c: CategoryRule["conditions"]): CanLevelMorphsCondition | undefined =>
  c?.canLevelMorphs ?? undefined

export function characterPassesCanLevelMorphs(
  charId: string,
  _condition: CanLevelMorphsCondition,
  getCharacterCanLevelMorphs: RuleMatcherContext["getCharacterCanLevelMorphs"]
): boolean {
  if (getCharacterCanLevelMorphs === undefined) return true
  return getCharacterCanLevelMorphs(charId) === true
}

export const canLevelMorphsFilter: InventoryRuleFilter = {
  id: "can-level-morphs",
  label: "Can Level Morphs",
  priority: 0,
  isEligible: () => true,
  isEligibleForAction: (action: ItemAction) => action === "stock",
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    if (v === undefined) return undefined
    return v.mode
  },
  applyDefault: () => ({ canLevelMorphs: { mode: "can-level" } }),
  clear: () => ({ canLevelMorphs: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { canLevelMorphs: v } : {}
  },
}
