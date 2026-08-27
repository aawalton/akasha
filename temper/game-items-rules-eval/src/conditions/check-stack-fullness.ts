import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import type { ConditionCheckResult } from "./check-result"

export function checkStackFullness(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  _ctx: EvalContext
): ConditionCheckResult {
  if (rule.stackFullness === undefined) {
    return { kind: "skip" }
  }
  if (facts.stackCount === undefined) {
    return { kind: "indeterminate", conditionKind: "stack-fullness", missingSignal: "stackCount" }
  }
  if (facts.maxStackSize === undefined) {
    return { kind: "indeterminate", conditionKind: "stack-fullness", missingSignal: "maxStackSize" }
  }
  const isFull = facts.stackCount >= facts.maxStackSize
  if (rule.stackFullness === "full" && !isFull) {
    return { kind: "fail", conditionKind: "stack-fullness" }
  }
  if (rule.stackFullness === "partial" && isFull) {
    return { kind: "fail", conditionKind: "stack-fullness" }
  }
  return { kind: "pass" }
}
