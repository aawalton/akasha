import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export function checkLocation(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  _ctx: EvalContext
): ConditionCheckResult {
  if (rule.location === undefined || rule.location.length === 0) {
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
