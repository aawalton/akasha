import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import {
  type ConditionCheckResult,
  misshapenList,
} from "akasha/temper/items/rules/eval/modules/check-result/check-result.module.code.ts"
import type { EvalContext } from "akasha/temper/items/rules/eval/modules/eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "akasha/temper/items/rules/eval/modules/item-facts/item-facts.module.code.ts"

export function checkItemIds(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  _ctx: EvalContext
): ConditionCheckResult {
  const listed = rule.itemIds
  if (listed === undefined) return { kind: "skip" }
  const misshapen = misshapenList("item-ids", listed)
  if (misshapen !== undefined) return misshapen
  if (listed.length === 0) return { kind: "skip" }
  if (!listed.includes(facts.itemId)) return { kind: "fail", conditionKind: "item-ids" }
  return { kind: "pass" }
}
