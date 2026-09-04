import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import { checkClassification } from "../check-classification/check-classification.module.code.ts"
import { checkContainer } from "../check-container/check-container.module.code.ts"
import { checkCrossCharacterCraft } from "../check-cross-character-craft/check-cross-character-craft.module.code.ts"
import { checkEquipTarget } from "../check-equip-target/check-equip-target.module.code.ts"
import { checkFlags } from "../check-flags/check-flags.module.code.ts"
import { checkKnowledge } from "../check-knowledge/check-knowledge.module.code.ts"
import { checkLocation } from "../check-location/check-location.module.code.ts"
import { checkNumeric } from "../check-numeric/check-numeric.module.code.ts"
import { checkPotionEffects } from "../check-potion-effects/check-potion-effects.module.code.ts"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import { checkStackFullness } from "../check-stack-fullness/check-stack-fullness.module.code.ts"
import { checkStock } from "../check-stock/check-stock.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export type ConditionResult =
  | { readonly kind: "pass" }
  | { readonly kind: "fail"; readonly conditionKind: string; readonly detail?: string }
  | {
      readonly kind: "indeterminate"
      readonly conditionKind: string
      readonly missingSignal: string
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
