import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import { checkClassification } from "akasha/temper/items-rules-eval/check-classification/check-classification.module.code.ts"
import { checkContainer } from "akasha/temper/items-rules-eval/check-container/check-container.module.code.ts"
import { checkCrossCharacterCraft } from "akasha/temper/items-rules-eval/check-cross-character-craft/check-cross-character-craft.module.code.ts"
import { checkEquipTarget } from "akasha/temper/items-rules-eval/check-equip-target/check-equip-target.module.code.ts"
import { checkFlags } from "akasha/temper/items-rules-eval/check-flags/check-flags.module.code.ts"
import { checkKnowledge } from "akasha/temper/items-rules-eval/check-knowledge/check-knowledge.module.code.ts"
import { checkLocation } from "akasha/temper/items-rules-eval/check-location/check-location.module.code.ts"
import { checkNumeric } from "akasha/temper/items-rules-eval/check-numeric/check-numeric.module.code.ts"
import { checkPotionEffects } from "akasha/temper/items-rules-eval/check-potion-effects/check-potion-effects.module.code.ts"
import type { ConditionCheckResult } from "akasha/temper/items-rules-eval/check-result/check-result.module.code.ts"
import { checkStackFullness } from "akasha/temper/items-rules-eval/check-stack-fullness/check-stack-fullness.module.code.ts"
import { checkStock } from "akasha/temper/items-rules-eval/check-stock/check-stock.module.code.ts"
import type { EvalContext } from "akasha/temper/items-rules-eval/eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/item-facts/item-facts.module.code.ts"

export type ConditionResult =
  | { readonly kind: "pass" }
  | { readonly kind: "fail"; readonly conditionKind: string; readonly detail?: string }
  | {
      readonly kind: "indeterminate"
      readonly conditionKind: string
      readonly missingSignal: string
    }
  | {
      readonly kind: "misshapen"
      readonly conditionKind: string
      readonly held: string
      readonly why: string
    }

type ConditionChecker = (
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
) => ConditionCheckResult

const CHECKERS: ReadonlyArray<ConditionChecker> = [
  checkNumeric,
  checkFlags,
  checkClassification,
  checkLocation,
  checkKnowledge,
  checkEquipTarget,
  checkCrossCharacterCraft,
  checkContainer,
  checkStock,
  checkStackFullness,
  checkPotionEffects,
]

export function evaluateConditions(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
): ConditionResult {
  for (const check of CHECKERS) {
    const result = check(rule, facts, ctx)
    if (result.kind === "skip" || result.kind === "pass") continue
    return result
  }
  return { kind: "pass" }
}
