import type { CanLevelMorphsCondition } from "../can-level-morphs-filter-types/can-level-morphs-filter-types.module.code.ts"
import type {
  CategoryRule,
  ItemAction,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryRuleFilter } from "../rule-filter-types/rule-filter-types.module.code.ts"
import type { RuleMatcherContext } from "../rule-matcher-context-types/rule-matcher-context-types.module.code.ts"

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

export const CAN_LEVEL_MORPHS_FILTER: InventoryRuleFilter = {
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
