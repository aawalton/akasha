import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ConditionCheckResult } from "../check-result/check-result.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

const SPECIALIZED_ITEMTYPE_CONTAINER_CURRENCY = 875

function isTransmuteCrystalContainer(facts: ItemFacts): boolean {
  return (
    facts.specializedItemType === SPECIALIZED_ITEMTYPE_CONTAINER_CURRENCY &&
    facts.itemName.includes("Transmut")
  )
}

export function checkContainer(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
): ConditionCheckResult {
  if (rule.canOpen === undefined && rule.canGiveMaxRewards === undefined) {
    return { kind: "skip" }
  }

  if (rule.canOpen !== undefined) {
    const result = evaluateCanOpen(facts, ctx)
    if (result.kind !== "pass") return result
  }

  if (rule.canGiveMaxRewards !== undefined) {
    const result = evaluateCanGiveMaxRewards(facts, ctx)
    if (result.kind !== "pass") return result
  }

  return { kind: "pass" }
}

function evaluateCanOpen(facts: ItemFacts, ctx: EvalContext): ConditionCheckResult {
  if (facts.isContainer === undefined) {
    return { kind: "indeterminate", conditionKind: "canOpen", missingSignal: "isContainer" }
  }
  if (facts.isContainer === false) {
    return { kind: "fail", conditionKind: "canOpen" }
  }

  const group = ctx.env.getCooldownGroup(facts.itemId)
  if (group === "unknown") {
    return { kind: "indeterminate", conditionKind: "canOpen", missingSignal: "cooldownGroup" }
  }
  if (group === null) {
    return evaluateTransmuteCap(facts, ctx)
  }

  const expired = ctx.env.isCooldownExpired(group)
  if (expired === "unknown") {
    return { kind: "indeterminate", conditionKind: "canOpen", missingSignal: "cooldownExpired" }
  }
  if (expired === false) {
    return { kind: "fail", conditionKind: "canOpen" }
  }
  return evaluateTransmuteCap(facts, ctx)
}

function evaluateTransmuteCap(facts: ItemFacts, ctx: EvalContext): ConditionCheckResult {
  if (!isTransmuteCrystalContainer(facts)) {
    return { kind: "pass" }
  }
  const cap = ctx.env.getTransmuteCrystalCap()
  if (cap === "unknown") {
    return { kind: "indeterminate", conditionKind: "canOpen", missingSignal: "transmuteCrystalCap" }
  }
  const amount = ctx.env.getTransmuteCrystalAmount()
  if (amount === "unknown") {
    return {
      kind: "indeterminate",
      conditionKind: "canOpen",
      missingSignal: "transmuteCrystalAmount",
    }
  }
  if (amount >= cap) {
    return { kind: "fail", conditionKind: "canOpen" }
  }
  return { kind: "pass" }
}

function evaluateCanGiveMaxRewards(facts: ItemFacts, ctx: EvalContext): ConditionCheckResult {
  if (facts.isContainer === undefined) {
    return {
      kind: "indeterminate",
      conditionKind: "canGiveMaxRewards",
      missingSignal: "isContainer",
    }
  }
  if (facts.isContainer === false) {
    return { kind: "fail", conditionKind: "canGiveMaxRewards" }
  }

  const group = ctx.env.getCooldownGroup(facts.itemId)
  if (group === "unknown") {
    return {
      kind: "indeterminate",
      conditionKind: "canGiveMaxRewards",
      missingSignal: "cooldownGroup",
    }
  }

  if (group !== null) {
    const expired = ctx.env.isCooldownExpired(group)
    if (expired === "unknown") {
      return {
        kind: "indeterminate",
        conditionKind: "canGiveMaxRewards",
        missingSignal: "cooldownExpired",
      }
    }
    if (expired === false) {
      return {
        kind: "indeterminate",
        conditionKind: "canGiveMaxRewards",
        missingSignal: "rftwClassification",
      }
    }
  }

  if (group === null) {
    return { kind: "pass" }
  }

  const characters = ctx.env.getAllCharacters()
  if (characters === "unknown") {
    return {
      kind: "indeterminate",
      conditionKind: "canGiveMaxRewards",
      missingSignal: "characters",
    }
  }

  const total = ctx.env.getTotalScriptCount()
  if (total === "unknown") {
    return {
      kind: "indeterminate",
      conditionKind: "canGiveMaxRewards",
      missingSignal: "totalScriptCount",
    }
  }

  let anyKnowsAll = false
  let allKnowAll = characters.length > 0
  if (characters.length === 0) {
    allKnowAll = false
  }
  for (const charId of characters) {
    const scripts = ctx.env.getKnownScripts(charId)
    if (scripts === "unknown") {
      return {
        kind: "indeterminate",
        conditionKind: "canGiveMaxRewards",
        missingSignal: `knownScripts:${charId}`,
      }
    }
    if (scripts.size >= total) {
      anyKnowsAll = true
    } else {
      allKnowAll = false
    }
  }

  if (anyKnowsAll && !allKnowAll) {
    return { kind: "fail", conditionKind: "canGiveMaxRewards" }
  }
  return { kind: "pass" }
}
