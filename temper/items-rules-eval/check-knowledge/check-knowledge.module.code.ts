import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export function checkKnowledge(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
): ConditionCheckResult {
  if (rule.known === undefined && rule.canUnlock === undefined) {
    return { kind: "skip" }
  }

  if (facts.itemKey === undefined) {
    if (facts.known !== undefined) {
      return decideKnowledge(rule, facts.known)
    }
    const conditionKind = rule.known !== undefined ? "known" : "canUnlock"
    if (facts.isKnowledgeItem === false) {
      return { kind: "fail", conditionKind }
    }
    return { kind: "indeterminate", conditionKind, missingSignal: "itemKey" }
  }

  const characters = ctx.env.getAllCharacters()
  if (characters === "unknown") {
    const conditionKind = rule.known !== undefined ? "known" : "canUnlock"
    return { kind: "indeterminate", conditionKind, missingSignal: "characters" }
  }

  let allKnow = true
  for (const charId of characters) {
    const result = ctx.env.isKnownByCharacter(facts.itemKey, charId)
    if (result === "unknown") {
      const conditionKind = rule.known !== undefined ? "known" : "canUnlock"
      return {
        kind: "indeterminate",
        conditionKind,
        missingSignal: `knowledge:${charId}`,
      }
    }
    if (!result) {
      allKnow = false
    }
  }

  return decideKnowledge(rule, allKnow)
}

function decideKnowledge(rule: CompiledOrderedRule, allKnow: boolean): ConditionCheckResult {
  if (rule.known !== undefined) {
    if (rule.known === "known" && !allKnow) {
      return { kind: "fail", conditionKind: "known" }
    }
    if (rule.known === "not-known" && allKnow) {
      return { kind: "fail", conditionKind: "known" }
    }
  }

  if (rule.canUnlock !== undefined) {
    const canUnlock = !allKnow
    if (rule.canUnlock === "can-unlock" && !canUnlock) {
      return { kind: "fail", conditionKind: "canUnlock" }
    }
    if (rule.canUnlock === "cannot-unlock" && canUnlock) {
      return { kind: "fail", conditionKind: "canUnlock" }
    }
  }

  return { kind: "pass" }
}
