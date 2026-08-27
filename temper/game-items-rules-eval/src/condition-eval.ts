import type { CompiledOrderedRule } from "@temper/game-items-rules-core/inventory-rule-compiler-types"
import { checkClassification } from "./conditions/check-classification"
import { checkContainer } from "./conditions/check-container"
import { checkCrossCharacterCraft } from "./conditions/check-cross-character-craft"
import { checkEquipTarget } from "./conditions/check-equip-target"
import { checkFlags } from "./conditions/check-flags"
import { checkKnowledge } from "./conditions/check-knowledge"
import { checkLocation } from "./conditions/check-location"
import { checkNumeric } from "./conditions/check-numeric"
import { checkPotionEffects } from "./conditions/check-potion-effects"
import type { ConditionCheckResult } from "./conditions/check-result"
import { checkStackFullness } from "./conditions/check-stack-fullness"
import { checkStock } from "./conditions/check-stock"
import type { EvalContext } from "./eval-env"
import type { ItemFacts } from "./item-facts"

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
