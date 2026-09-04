import { composeCharEligibilityPredicate } from "@akasha/temper-items-rules-core/eligibility-predicate-composer"
import type { CompiledOrderedRule } from "@akasha/temper-items-rules-core/inventory-rule-compiler-types"
import type { ClassifiedInventoryItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type { ItemRule } from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import { planStockDestinationsForStack } from "@akasha/temper-items-rules-core/stock-destination-planner"
import type { StockDestinationContext } from "@akasha/temper-items-rules-core/stock-destination-types"
import {
  buildUseDestinationContext,
  inventoryItemUseKey,
} from "@akasha/temper-items-rules-core/use-destination-context-builder"
import { planUseDestinationsForStack } from "@akasha/temper-items-rules-core/use-destination-resolver"
import {
  type CharacterId,
  characterId,
} from "@akasha/temper-items-rules-core/use-destination-types"

export interface MatchedCI {
  ci: ClassifiedInventoryItem
  consumed: number
  allocation?: readonly CharacterId[]
}

export function computeQuantity(m: MatchedCI): number | undefined {
  if (m.consumed === m.ci.item.stackCount) return undefined
  return m.consumed
}

export interface AllocationEnv {
  tryAllocation: (
    ci: ClassifiedInventoryItem,
    rule: CompiledOrderedRule | ItemRule,
    remaining: number
  ) => { consumed: number; allocation?: readonly CharacterId[] }
  beginStockRuleGroup: (
    rule: CompiledOrderedRule | ItemRule | undefined,
    matchedItemIds: ReadonlySet<number>
  ) => void
  resetClaims: () => void
}

export function createAllocationEnv(context: RuleMatcherContext | undefined): AllocationEnv {
  let useClaims: Map<CharacterId, Set<string>> | undefined
  let useDestinationCtx: ReturnType<typeof buildUseDestinationContext> | undefined
  let stockDestinationCtx: StockDestinationContext | undefined
  let activeStockGroup:
    | { groupKey: string; itemIds: ReadonlySet<number>; allocatedPerChar: Map<CharacterId, number> }
    | undefined

  function ensureUseClaims(): Map<CharacterId, Set<string>> {
    if (useClaims === undefined) useClaims = new Map()
    return useClaims
  }

  function ensureUseDestinationCtx(): ReturnType<typeof buildUseDestinationContext> | undefined {
    if (useDestinationCtx !== undefined) return useDestinationCtx
    if (context === undefined) return undefined
    useDestinationCtx = buildUseDestinationContext(context)
    return useDestinationCtx
  }

  function ensureStockDestinationCtx(): StockDestinationContext | undefined {
    if (stockDestinationCtx !== undefined) return stockDestinationCtx
    if (context === undefined) return undefined
    const captured = context
    const characterPriority = captured.characterPriority.map((id) => characterId(id))
    const readOne = (itemId: number, charId: CharacterId): number => {
      const charStock = captured.consumableStock.get(itemId)
      if (charStock === undefined) return 0
      return charStock.get(charId) ?? 0
    }
    stockDestinationCtx = {
      characterPriority,
      getStockOnChar: readOne,
      getStockOnCharForGroup: (itemIds, charId) => {
        let sum = 0
        for (const id of itemIds) sum += readOne(id, charId)
        return sum
      },
    }
    return stockDestinationCtx
  }

  function tryUseAllocation(
    ci: ClassifiedInventoryItem,
    rule: CompiledOrderedRule | ItemRule,
    remaining: number
  ): { consumed: number; allocation?: readonly CharacterId[] } {
    if (context === undefined) return { consumed: remaining }
    const itemKey = inventoryItemUseKey(ci.item, rule.action, rule.destination, context)
    if (itemKey === undefined) {
      return { consumed: remaining }
    }
    const ctx = ensureUseDestinationCtx()
    if (ctx === undefined) return { consumed: remaining }
    const predicate = buildEligibilityPredicate(rule, context)
    const allocation = planUseDestinationsForStack(
      itemKey,
      remaining,
      ctx,
      ensureUseClaims(),
      predicate
    )
    if (allocation.length === 0) return { consumed: 0 }
    return { consumed: allocation.length, allocation }
  }

  function tryStockByPriorityAllocation(
    ci: ClassifiedInventoryItem,
    rule: CompiledOrderedRule | ItemRule,
    remaining: number
  ): { consumed: number; allocation?: readonly CharacterId[] } {
    if (context === undefined) return { consumed: remaining }
    const targetQuantity = readStockTargetQuantity(rule)
    if (targetQuantity === undefined || targetQuantity <= 0) return { consumed: remaining }
    const stockCtx = ensureStockDestinationCtx()
    if (stockCtx === undefined) return { consumed: remaining }
    const predicate = buildEligibilityPredicate(rule, context)
    const group = activeStockGroup
    const groupKey = group?.groupKey ?? `stock:${ci.item.itemId}`
    const itemIds = group?.itemIds ?? new Set([ci.item.itemId])
    const allocation = planStockDestinationsForStack(
      groupKey,
      itemIds,
      remaining,
      targetQuantity,
      stockCtx,
      ensureUseClaims(),
      predicate,
      group?.allocatedPerChar
    )
    if (allocation.length === 0) return { consumed: 0 }
    return { consumed: allocation.length, allocation }
  }

  function beginStockRuleGroup(
    rule: CompiledOrderedRule | ItemRule | undefined,
    matchedItemIds: ReadonlySet<number>
  ): undefined {
    if (rule === undefined || matchedItemIds.size === 0) {
      activeStockGroup = undefined
      return undefined
    }
    activeStockGroup = {
      groupKey: `stock:rule:${rule.id}`,
      itemIds: matchedItemIds,
      allocatedPerChar: new Map<CharacterId, number>(),
    }
    return undefined
  }

  function tryAllocation(
    ci: ClassifiedInventoryItem,
    rule: CompiledOrderedRule | ItemRule,
    remaining: number
  ): { consumed: number; allocation?: readonly CharacterId[] } {
    if (
      "destinationChain" in rule &&
      rule.destinationChain !== undefined &&
      rule.destinationChain.length > 0
    ) {
      return { consumed: remaining }
    }
    if (rule.action === "stock" && rule.destination === "character:by-priority") {
      return tryStockByPriorityAllocation(ci, rule, remaining)
    }
    return tryUseAllocation(ci, rule, remaining)
  }

  function resetClaims(): undefined {
    useClaims = new Map()
    return undefined
  }

  return { tryAllocation, beginStockRuleGroup, resetClaims }
}

function readStockTargetQuantity(rule: CompiledOrderedRule | ItemRule): number | undefined {
  if ("stockQuantity" in rule && rule.stockQuantity !== undefined) return rule.stockQuantity
  if ("categoryId" in rule) return rule.targetQuantity
  return undefined
}

function buildEligibilityPredicate(
  rule: CompiledOrderedRule | ItemRule,
  context: RuleMatcherContext
): ((charId: CharacterId) => boolean) | undefined {
  if (!("categoryId" in rule)) return undefined

  const skillActive =
    rule.requiredSkillLines !== undefined && rule.requiredSkillLines.skillLineIds.length > 0
  if (!skillActive && rule.requiredCurseState === undefined && rule.canLevelMorphs === undefined) {
    return undefined
  }

  return composeCharEligibilityPredicate(rule, {
    getCharacterSkillLineRanks: context.getCharacterSkillLineRanks,
    getCharacterCurseState: context.getCharacterCurseState,
    getCharacterCanLevelMorphs: context.getCharacterCanLevelMorphs,
  })
}
