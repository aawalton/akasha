import type { ItemCategoryNode } from "@akasha/temper-items-core/item-category-tree-types"
import { resolveAllRuleStates } from "../inventory-rule-engine/inventory-rule-engine.module.code.ts"
import type {
  CategoryRule,
  ItemAction,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export type RuleStates = Record<string, ItemAction | null>

export interface RuleConditionStates {
  unconditional: RuleStates
  stolen: RuleStates
  notStolen: RuleStates
  crafted: RuleStates
  notCrafted: RuleStates
  bound: RuleStates
  notBound: RuleStates
  reconstructed: RuleStates
  notReconstructed: RuleStates
  transmuted: RuleStates
  notTransmuted: RuleStates
  known: RuleStates
  notKnown: RuleStates
  canInspire: RuleStates
  notCanInspire: RuleStates
  canResearch: RuleStates
  notCanResearch: RuleStates
  canUnlock: RuleStates
  notCanUnlock: RuleStates
  canOpen: RuleStates
  canGiveMaxRewards: RuleStates
}

function isUnconditional(rule: CategoryRule): boolean {
  return (
    rule.conditions?.stolen == null &&
    rule.conditions?.crafted == null &&
    rule.conditions?.bound == null &&
    rule.conditions?.reconstructed == null &&
    rule.conditions?.transmuted == null &&
    rule.conditions?.known == null &&
    rule.conditions?.canInspire == null &&
    rule.conditions?.canResearch == null &&
    rule.conditions?.canUnlock == null &&
    rule.conditions?.canOpen == null &&
    rule.conditions?.canGiveMaxRewards == null
  )
}

export function resolveRuleConditionStates(
  activeRules: readonly CategoryRule[],
  categories: Record<string, ItemCategoryNode>
): RuleConditionStates {
  const matching = (predicate: (rule: CategoryRule) => boolean): RuleStates => {
    const rules = activeRules.filter(predicate)
    return rules.length > 0 ? resolveAllRuleStates(rules, categories) : {}
  }

  return {
    unconditional: resolveAllRuleStates(activeRules.filter(isUnconditional), categories),
    stolen: matching((r) => r.conditions?.stolen === "stolen"),
    notStolen: matching((r) => r.conditions?.stolen === "not-stolen"),
    crafted: matching((r) => r.conditions?.crafted === "crafted"),
    notCrafted: matching((r) => r.conditions?.crafted === "not-crafted"),
    bound: matching((r) => r.conditions?.bound === "bound"),
    notBound: matching((r) => r.conditions?.bound === "not-bound"),
    reconstructed: matching((r) => r.conditions?.reconstructed === "reconstructed"),
    notReconstructed: matching((r) => r.conditions?.reconstructed === "not-reconstructed"),
    transmuted: matching((r) => r.conditions?.transmuted === "transmuted"),
    notTransmuted: matching((r) => r.conditions?.transmuted === "not-transmuted"),
    known: matching((r) => r.conditions?.known === "known"),
    notKnown: matching((r) => r.conditions?.known === "not-known"),
    canInspire: matching((r) => r.conditions?.canInspire === "can-inspire"),
    notCanInspire: matching((r) => r.conditions?.canInspire === "cannot-inspire"),
    canResearch: matching((r) => r.conditions?.canResearch === "can-research"),
    notCanResearch: matching((r) => r.conditions?.canResearch === "cannot-research"),
    canUnlock: matching((r) => r.conditions?.canUnlock === "can-unlock"),
    notCanUnlock: matching((r) => r.conditions?.canUnlock === "cannot-unlock"),
    canOpen: matching((r) => r.conditions?.canOpen === "can-open"),
    canGiveMaxRewards: matching((r) => r.conditions?.canGiveMaxRewards === "can-give-max-rewards"),
  }
}
