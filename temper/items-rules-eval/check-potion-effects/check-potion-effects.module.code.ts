import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

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
