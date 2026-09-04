import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import { hashItemKey } from "@akasha/temper-items-rules-core/use-destination-resolver"
import { buildWantedEquipmentFacts } from "../check-equip-target/check-equip-target.module.code.ts"
import {
  inferInspireCraftingType,
  inferResearchTraitKey,
} from "../craft-inference/craft-inference.module.code.ts"
import type { EvalContext } from "../eval-env/eval-env.module.code.ts"
import type { ItemFacts } from "../item-facts/item-facts.module.code.ts"

export type DestinationResolution =
  | { readonly kind: "resolved"; readonly concrete: string }
  | { readonly kind: "no-eligible-target"; readonly detail?: string }
  | { readonly kind: "indeterminate"; readonly detail?: string }

const CHARACTER_BY_PRIORITY = "character:by-priority"
const CHARACTER_WORN_BY_PRIORITY = "character-worn:by-priority"
const COMPANION_WORN_BY_PRIORITY = "companion-worn:by-priority"
const COMPANION_BY_PRIORITY = "companion:by-priority"

export function resolveDestination(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
): DestinationResolution {
  const dest = rule.destination
  if (dest === undefined || dest === "") {
    return { kind: "resolved", concrete: "" }
  }
  if (dest === CHARACTER_BY_PRIORITY) {
    return resolveCharacterByPriority(rule, facts, ctx)
  }
  if (dest === CHARACTER_WORN_BY_PRIORITY) {
    return resolveCharacterWornByPriority(facts, ctx)
  }
  if (dest === COMPANION_WORN_BY_PRIORITY) {
    return resolveCompanionWornByPriority(facts, ctx)
  }
  if (dest === COMPANION_BY_PRIORITY) {
    return {
      kind: "indeterminate",
      detail: `destination resolver for ${dest} not yet implemented`,
    }
  }
  return { kind: "resolved", concrete: dest }
}

function resolveCharacterByPriority(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
): DestinationResolution {
  if (rule.action === "use") return resolveUseByPriority(facts, ctx)
  if (rule.action === "research") return resolveResearchByPriority(facts, ctx)
  if (rule.action === "deconstruct") return resolveDeconstructByPriority(facts, ctx)
  if (rule.action === "stock") return resolveStockByPriority(rule, facts, ctx)
  return {
    kind: "indeterminate",
    detail: `character:by-priority resolution for action="${rule.action}" not yet implemented`,
  }
}

function resolveStockByPriority(
  rule: CompiledOrderedRule,
  facts: ItemFacts,
  ctx: EvalContext
): DestinationResolution {
  const priority = ctx.env.getCharacterPriority()
  if (priority === "unknown") {
    return { kind: "indeterminate", detail: "characterPriority unknown" }
  }
  if (priority.length === 0) {
    return { kind: "no-eligible-target", detail: "empty characterPriority" }
  }
  const target = rule.targetQuantity
  if (target === undefined || target <= 0) {
    return { kind: "resolved", concrete: `character:${priority[0]}` }
  }
  for (const charId of priority) {
    const stock = ctx.env.getConsumableStock(facts.itemId, charId)
    if (stock === "unknown") {
      return { kind: "indeterminate", detail: `stock unknown for ${charId}` }
    }
    if (stock < target) {
      return { kind: "resolved", concrete: `character:${charId}` }
    }
  }
  return {
    kind: "no-eligible-target",
    detail: "every priority character is at or above targetQuantity",
  }
}

function resolveUseByPriority(facts: ItemFacts, ctx: EvalContext): DestinationResolution {
  const itemKey = facts.itemKey
  if (itemKey === undefined) {
    return {
      kind: "indeterminate",
      detail: "character:by-priority requires facts.itemKey",
    }
  }

  if (itemKey.kind === "consumable") {
    const wanters = ctx.env.getConsumableWanters(itemKey.itemId)
    if (wanters === "unknown") {
      return { kind: "indeterminate", detail: "consumable wanters unknown" }
    }
    if (wanters.length === 0) {
      return { kind: "no-eligible-target", detail: "no character wants this consumable" }
    }
    return { kind: "resolved", concrete: `character:${wanters[0]}` }
  }

  const priority = ctx.env.getCharacterPriority()
  if (priority === "unknown") {
    return { kind: "indeterminate", detail: "characterPriority unknown" }
  }
  if (priority.length === 0) {
    return { kind: "no-eligible-target", detail: "empty characterPriority" }
  }

  const claimHash = hashItemKey(itemKey)
  const claims = ctx.claimedByCharacter

  for (const charId of priority) {
    if (claims !== undefined) {
      const existing = claims.get(charId)
      if (existing?.has(claimHash)) {
        continue
      }
    }
    const known = ctx.env.isKnownByCharacter(itemKey, charId)
    if (known === "unknown") {
      return { kind: "indeterminate", detail: `knowledge unknown for ${charId}` }
    }
    if (known) continue
    return { kind: "resolved", concrete: `character:${charId}` }
  }

  return { kind: "no-eligible-target", detail: "every priority character already knows item" }
}

function resolveResearchByPriority(facts: ItemFacts, ctx: EvalContext): DestinationResolution {
  const inferred = inferResearchTraitKey(facts)
  if (inferred === undefined) {
    return {
      kind: "no-eligible-target",
      detail: "item is not researchable",
    }
  }

  const priority = ctx.env.getCharacterPriority()
  if (priority === "unknown") {
    return { kind: "indeterminate", detail: "characterPriority unknown" }
  }
  if (priority.length === 0) {
    return { kind: "no-eligible-target", detail: "empty characterPriority" }
  }

  for (const charId of priority) {
    const researched = ctx.env.isTraitResearched(charId, inferred.craftingType, inferred.traitKey)
    if (researched === "unknown") {
      return { kind: "indeterminate", detail: `research unknown for ${charId}` }
    }
    if (researched === false) {
      return { kind: "resolved", concrete: `character:${charId}` }
    }
  }

  return { kind: "no-eligible-target", detail: "every priority character has trait researched" }
}

function resolveDeconstructByPriority(facts: ItemFacts, ctx: EvalContext): DestinationResolution {
  const craftingType = inferInspireCraftingType(facts)
  if (craftingType === 0) {
    return { kind: "no-eligible-target", detail: "item has no inferrable crafting type" }
  }

  const priority = ctx.env.getCharacterPriority()
  if (priority === "unknown") {
    return { kind: "indeterminate", detail: "characterPriority unknown" }
  }
  if (priority.length === 0) {
    return { kind: "no-eligible-target", detail: "empty characterPriority" }
  }

  for (const charId of priority) {
    const below = ctx.env.isCraftingRankBelowCap(charId, craftingType)
    if (below === "unknown") {
      return { kind: "indeterminate", detail: `craftingRank unknown for ${charId}` }
    }
    if (below === true) {
      return { kind: "resolved", concrete: `character:${charId}` }
    }
  }

  return { kind: "no-eligible-target", detail: "every priority character is at the rank cap" }
}

function resolveCharacterWornByPriority(facts: ItemFacts, ctx: EvalContext): DestinationResolution {
  const wanted = buildWantedEquipmentFacts(facts)
  if (wanted === undefined) {
    return {
      kind: "no-eligible-target",
      detail: "item is missing equipType / traitType / quality",
    }
  }
  const result = ctx.env.findCharacterForWantedEquipment(wanted)
  if (result === "unknown") {
    return { kind: "indeterminate", detail: "wanted-equipment match unknown" }
  }
  if (result === undefined) {
    return { kind: "no-eligible-target", detail: "no character wants this equipment" }
  }
  return { kind: "resolved", concrete: `character-worn:${result}` }
}

function resolveCompanionWornByPriority(facts: ItemFacts, ctx: EvalContext): DestinationResolution {
  const wanted = buildWantedEquipmentFacts(facts)
  if (wanted === undefined) {
    return {
      kind: "no-eligible-target",
      detail: "item is missing equipType / traitType / quality",
    }
  }
  const result = ctx.env.findCompanionForWantedEquipment(wanted)
  if (result === "unknown") {
    return { kind: "indeterminate", detail: "companion wanted-equipment match unknown" }
  }
  if (result === undefined) {
    return { kind: "no-eligible-target", detail: "no companion wants this equipment" }
  }
  return { kind: "resolved", concrete: `companion-worn:${result}` }
}
