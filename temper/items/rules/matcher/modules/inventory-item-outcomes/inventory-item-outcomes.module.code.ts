import {
  type CompiledOrderedRule,
  IMPLICIT_TERMINAL_COMPILED_RULE,
} from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { ClassifiedInventoryItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { IMPLICIT_TERMINAL_RULE_ID } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { RuleMatcherContext } from "akasha/temper/items/rules/core/modules/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import { computeStockGroups } from "akasha/temper/items/rules/eval/modules/compute-stock-groups/compute-stock-groups.module.code.ts"
import type { WalkOutcome } from "akasha/temper/items/rules/eval/modules/eval-result/eval-result.module.code.ts"
import { walkRules } from "akasha/temper/items/rules/eval/modules/evaluator/evaluator.module.code.ts"
import type { ItemFacts } from "akasha/temper/items/rules/eval/modules/item-facts/item-facts.module.code.ts"
import {
  buildItemIdToCooldownGroup,
  buildWebEvalEnv,
} from "akasha/temper/items/rules/matcher/modules/web-eval-env/web-eval-env.module.code.ts"
import { webItemFactsFromClassified } from "akasha/temper/items/rules/matcher/modules/web-item-facts/web-item-facts.module.code.ts"

interface ItemOutcome {
  readonly item: ClassifiedInventoryItem
  readonly outcome: WalkOutcome
}

export function itemOutcomes(
  userRules: readonly CompiledOrderedRule[],
  classifiedItems: readonly ClassifiedInventoryItem[],
  context?: RuleMatcherContext
): readonly ItemOutcome[] {
  const rules: readonly CompiledOrderedRule[] = [
    ...userRules.filter((one) => one.id !== IMPLICIT_TERMINAL_RULE_ID),
    IMPLICIT_TERMINAL_COMPILED_RULE,
  ]
  const env = buildWebEvalEnv(context, {
    itemIdToCooldownGroup: buildItemIdToCooldownGroup(classifiedItems),
  })
  const factsByItem = new Map<ClassifiedInventoryItem, ItemFacts>()
  const factsFor = (one: ClassifiedInventoryItem): ItemFacts => {
    const held = factsByItem.get(one)
    if (held !== undefined) return held
    const built = webItemFactsFromClassified(one, context)
    factsByItem.set(one, built)
    return built
  }
  const stockGroupByRuleId = computeStockGroups(rules, classifiedItems, factsFor, env)
  const ctx = { env, claimedByCharacter: undefined, stockGroupByRuleId } as const
  return classifiedItems.map((one) => ({
    item: one,
    outcome: walkRules(rules, factsFor(one), ctx).outcome,
  }))
}
