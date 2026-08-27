import type { CategoryRule, ItemAction } from "../inventory-rule-types"
import type { RuleMatcherContext } from "../rule-matcher-context-types"
import type { InventoryRuleFilter } from "./filter-types"
import type { RequiredCurseStateCondition } from "./required-curse-state-filter-types"


const read = (c: CategoryRule["conditions"]): RequiredCurseStateCondition | undefined =>
  c?.requiredCurseState !== undefined ? c.requiredCurseState : undefined

export function characterPassesRequiredCurseState(
  charId: string,
  condition: RequiredCurseStateCondition,
  getCharacterCurseState: NonNullable<RuleMatcherContext["getCharacterCurseState"]>
): boolean {
  const actual = getCharacterCurseState(charId)
  if (actual === undefined) return false
  return actual === condition.state
}

export const requiredCurseStateFilter: InventoryRuleFilter = {
  id: "required-curse-state",
  label: "Required Curse State",
  priority: 0,
  isEligible: () => true,
  isEligibleForAction: (action: ItemAction) => action === "stock",
  mutuallyExclusive: [],
  isPresent: (c) => read(c) !== undefined,
  fingerprint: (c) => {
    const v = read(c)
    if (v === undefined) return undefined
    return v.state
  },
  applyDefault: () => ({}),
  clear: () => ({ requiredCurseState: undefined }),
  transferToCategory: (c) => {
    const v = read(c)
    return v !== undefined ? { requiredCurseState: v } : {}
  },
}
