import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import { categoryMatchesItem } from "./category-match"
import { evaluateConditions } from "./condition-eval"
import type { EvalContext, EvalEnv } from "./eval-env"
import type { ItemFacts } from "./item-facts"

export function computeStockGroups<TItem>(
  rules: readonly CompiledOrderedRule[],
  items: readonly TItem[],
  factsFor: (item: TItem) => ItemFacts,
  env: EvalEnv
): Map<string, Set<number>> {
  const groups = new Map<string, Set<number>>()
  const ctx: EvalContext = { env, skipStock: true }

  for (const rule of rules) {
    if (rule === undefined) continue
    if (rule.id === undefined) continue
    if (rule.allStocked === undefined && rule.targetQuantity === undefined) continue

    let matched: Set<number> | undefined
    for (const item of items) {
      const facts = factsFor(item)
      const category = categoryMatchesItem(rule.categoryId, facts)
      if (category.kind !== "match") continue
      if (evaluateConditions(rule, facts, ctx).kind !== "pass") continue
      if (matched === undefined) matched = new Set<number>()
      matched.add(facts.itemId)
    }

    if (matched !== undefined && matched.size > 0) groups.set(rule.id, matched)
  }

  return groups
}
