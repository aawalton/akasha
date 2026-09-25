import type { InventoryItemData } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { classifyLocation } from "akasha/temper/items/core/modules/location-classify/location-classify.module.code.ts"
import type { TierAllocation } from "akasha/temper/items/rules/core/modules/destination-chain-types/destination-chain-types.module.code.ts"
import type { EligibilityResolvers } from "akasha/temper/items/rules/core/modules/eligibility-predicate-composer/eligibility-predicate-composer.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import type {
  ItemRule,
  MoveToDestination,
} from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { RuleMatcherContext } from "akasha/temper/items/rules/core/modules/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import { buildStockDestinationContext } from "akasha/temper/items/rules/core/modules/stock-destination-context-builder/stock-destination-context-builder.module.code.ts"
import {
  planStockDestinationsForChain,
  type StockHolding,
  stockHeldByCharacter,
} from "akasha/temper/items/rules/core/modules/stock-destination-planner/stock-destination-planner.module.code.ts"
import type { CharacterId } from "akasha/temper/items/rules/core/modules/use-destination-types/use-destination-types.module.code.ts"

interface ChainExpansionRow {
  readonly entry: AffectedItem
  readonly destination: MoveToDestination
  readonly sourceSlotCount: number
  readonly directAct: boolean
}

export function stockSourceCharId(entry: AffectedItem): CharacterId | undefined {
  if (classifyLocation(entry.locationKey) !== "character") return undefined
  return entry.locationKey as CharacterId
}

export function stockHeldForEntries(
  entries: readonly AffectedItem[]
): ReadonlyMap<CharacterId, number> {
  const held: [string, number][] = []
  for (const entry of entries) {
    if (classifyLocation(entry.locationKey) !== "character") continue
    held.push([entry.locationKey, entry.quantity ?? entry.item.stackCount])
  }
  return stockHeldByCharacter(held)
}

function buildChainEligibilityResolvers(context: RuleMatcherContext): EligibilityResolvers {
  return {
    getCharacterSkillLineRanks: context.getCharacterSkillLineRanks,
    getCharacterCurseState: context.getCharacterCurseState,
    getCharacterCanLevelMorphs: context.getCharacterCanLevelMorphs,
  }
}

function expandChainEntryIntoRows(
  rule: CompiledOrderedRule | ItemRule,
  entry: AffectedItem,
  sourceSlotCount: number,
  context: RuleMatcherContext,
  claims: Map<CharacterId, Set<string>>,
  group?: {
    itemIds: ReadonlySet<number>
    allocatedPerChar: Map<CharacterId, number>
    heldPerChar: ReadonlyMap<CharacterId, number>
    keptPerChar: Map<CharacterId, number>
  }
): { rows: readonly ChainExpansionRow[]; residue: number } {
  const chain = rule.destinationChain
  if (chain === undefined || chain.length === 0) return { rows: [], residue: 0 }
  const stackCount = entry.quantity ?? entry.item.stackCount
  if (stackCount <= 0) return { rows: [], residue: 0 }
  const stockCtx = buildStockDestinationContext(context)
  const resolvers = buildChainEligibilityResolvers(context)
  const groupKey = group !== undefined ? `stock:rule:${rule.id}` : `stock:${entry.item.itemId}`
  const itemIds = group?.itemIds ?? new Set([entry.item.itemId])
  const holding: StockHolding | undefined =
    group === undefined
      ? undefined
      : {
          heldPerChar: group.heldPerChar,
          keptPerChar: group.keptPerChar,
          sourceCharId: stockSourceCharId(entry),
        }
  const tierAllocations = planStockDestinationsForChain(
    groupKey,
    itemIds,
    stackCount,
    chain,
    stockCtx,
    resolvers,
    claims,
    group?.allocatedPerChar,
    holding
  )
  const rows = tierAllocations.map((tierAlloc, idx) =>
    buildChainRowForAllocation(entry, idx === 0 ? sourceSlotCount : 0, tierAlloc)
  )
  let allocated = 0
  for (const t of tierAllocations) allocated += t.count
  const residue = Math.max(0, stackCount - allocated)
  return { rows, residue }
}

export function threadResidueToNextRule(
  rules: readonly (CompiledOrderedRule | ItemRule)[],
  ruleIdx: number,
  residue: number,
  sourceEntry: AffectedItem,
  workingAffectedItemsMap: Map<string, AffectedItem[]>
): string | undefined {
  if (residue <= 0) return undefined
  for (let nextIdx = ruleIdx + 1; nextIdx < rules.length; nextIdx++) {
    const nextRule = rules[nextIdx]
    if (nextRule === undefined) continue
    if (nextRule.active === false) continue
    if (nextRule.id === undefined) continue
    const residueEntry: AffectedItem = {
      item: sourceEntry.item,
      locationKey: sourceEntry.locationKey,
      locationDisplayName: sourceEntry.locationDisplayName,
      bagId: sourceEntry.bagId,
      alreadyAtDestination: false,
      quantity: residue,
    }
    const bucket = workingAffectedItemsMap.get(nextRule.id)
    if (bucket !== undefined) bucket.push(residueEntry)
    else workingAffectedItemsMap.set(nextRule.id, [residueEntry])
    return nextRule.id
  }
  return undefined
}

export function processChainRule(
  args: {
    rule: CompiledOrderedRule | ItemRule
    ruleIdx: number
    rules: readonly (CompiledOrderedRule | ItemRule)[]
    merged: readonly { entry: AffectedItem; sourceSlotCount: number }[]
    context: RuleMatcherContext
    chainClaims: Map<CharacterId, Set<string>>
    workingAffectedItemsMap: Map<string, AffectedItem[]>
    chainResidueRecipients: Set<string>
  },
  emitRoute: (
    entry: AffectedItem,
    destination: MoveToDestination | undefined,
    sourceSlotCount: number,
    chainTierDirect: boolean
  ) => void
): undefined {
  const {
    rule,
    ruleIdx,
    rules,
    merged,
    context,
    chainClaims,
    workingAffectedItemsMap,
    chainResidueRecipients,
  } = args
  const groupItemIds = new Set<number>()
  for (const { entry } of merged) groupItemIds.add(entry.item.itemId)
  const group = {
    itemIds: groupItemIds,
    allocatedPerChar: new Map<CharacterId, number>(),
    heldPerChar: stockHeldForEntries(merged.map(({ entry }) => entry)),
    keptPerChar: new Map<CharacterId, number>(),
  }
  for (const { entry, sourceSlotCount } of merged) {
    const expansion = expandChainEntryIntoRows(
      rule,
      entry,
      sourceSlotCount,
      context,
      chainClaims,
      group
    )
    for (const row of expansion.rows) {
      emitRoute(row.entry, row.destination, row.sourceSlotCount, row.directAct)
    }
    if (expansion.residue > 0) {
      const recipient = threadResidueToNextRule(
        rules,
        ruleIdx,
        expansion.residue,
        entry,
        workingAffectedItemsMap
      )
      if (recipient !== undefined) chainResidueRecipients.add(recipient)
    }
  }
  return undefined
}

function buildChainRowForAllocation(
  entry: AffectedItem,
  sourceSlotCount: number,
  tierAlloc: TierAllocation
): ChainExpansionRow {
  const isByPriority = tierAlloc.destination === "character:by-priority"
  const charId = tierAlloc.charId
  const useAllocation =
    charId !== undefined && isByPriority
      ? Array.from({ length: tierAlloc.count }, () => charId)
      : undefined
  const syntheticItem: InventoryItemData = entry.item
  const syntheticEntry: AffectedItem = {
    item: syntheticItem,
    locationKey: entry.locationKey,
    locationDisplayName: entry.locationDisplayName,
    bagId: entry.bagId,
    alreadyAtDestination: false,
    quantity: tierAlloc.count,
    useAllocation,
  }
  const directAct = !isByPriority
  return {
    entry: syntheticEntry,
    destination: tierAlloc.destination,
    sourceSlotCount,
    directAct,
  }
}
