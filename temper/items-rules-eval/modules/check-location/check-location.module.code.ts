import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { EvalContext } from "akasha/temper/items-rules-eval/eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/item-facts/item-facts.module.code.ts"
import {
  type ConditionCheckResult,
  misshapenList,
} from "akasha/temper/items-rules-eval/modules/check-result/check-result.module.code.ts"

export function checkLocation(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  _ctx: EvalContext
): ConditionCheckResult {
  if (rule.location === undefined) {
    return { kind: "skip" }
  }
  const misshapen = misshapenList("location", rule.location)
  if (misshapen !== undefined) return misshapen
  if (rule.location.length === 0) {
    return { kind: "skip" }
  }
  if (facts.location === undefined) {
    return { kind: "indeterminate", conditionKind: "location", missingSignal: "location" }
  }
  if (!rule.location.includes(facts.location)) {
    return { kind: "fail", conditionKind: "location", detail: facts.location }
  }
  return { kind: "pass" }
}
