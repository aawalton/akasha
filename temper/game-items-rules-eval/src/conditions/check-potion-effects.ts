import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import type { EvalContext } from "../eval-env"
import type { ItemFacts } from "../item-facts"
import type { ConditionCheckResult } from "./check-result"

export function checkPotionEffects(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  _ctx: EvalContext
): ConditionCheckResult {
  const required = rule.potionEffects
  if (required === undefined || required.length === 0) {
    return { kind: "skip" }
  }

  if (facts.potionEffectMetricIds === undefined) {
    return {
      kind: "indeterminate",
      conditionKind: "potion-effects",
      missingSignal: "potionEffectMetricIds",
    }
  }

  const granted = new Set(facts.potionEffectMetricIds)
  const mode = rule.potionEffectsMode ?? "any"

  const matches =
    mode === "all"
      ? required.every((effect) => granted.has(effect))
      : required.some((effect) => granted.has(effect))

  if (!matches) {
    return { kind: "fail", conditionKind: "potion-effects" }
  }
  return { kind: "pass" }
}
