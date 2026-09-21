import type { TierAllocation } from "akasha/temper/items/rules/core/modules/destination-chain-types/destination-chain-types.module.code.ts"
import {
  composeCharEligibilityPredicate,
  type EligibilityResolvers,
} from "akasha/temper/items/rules/core/modules/eligibility-predicate-composer/eligibility-predicate-composer.module.code.ts"
import type { DestinationChain } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { StockDestinationContext } from "akasha/temper/items/rules/core/modules/stock-destination-types/stock-destination-types.module.code.ts"
import type { CharacterId } from "akasha/temper/items/rules/core/modules/use-destination-types/use-destination-types.module.code.ts"

function readGroupStock(
  ctx: StockDestinationContext,
  itemIds: ReadonlySet<number>,
  charId: CharacterId
): number {
  if (ctx.getStockOnCharForGroup !== undefined) {
    return ctx.getStockOnCharForGroup(itemIds, charId)
  }
  let sum = 0
  for (const id of itemIds) sum += ctx.getStockOnChar(id, charId)
  return sum
}

export interface StockHolding {
  readonly heldPerChar: ReadonlyMap<CharacterId, number>
  readonly keptPerChar: Map<CharacterId, number>
  readonly sourceCharId?: CharacterId
}

export function stockHeldByCharacter(
  held: readonly (readonly [string, number])[]
): Map<CharacterId, number> {
  const perChar = new Map<CharacterId, number>()
  for (const [charId, count] of held) {
    const id = charId as CharacterId
    perChar.set(id, (perChar.get(id) ?? 0) + count)
  }
  return perChar
}

function stockOrder(
  priority: readonly CharacterId[],
  sourceCharId: CharacterId | undefined
): readonly CharacterId[] {
  if (sourceCharId === undefined) return priority
  if (!priority.includes(sourceCharId)) return priority
  return [sourceCharId, ...priority.filter((one) => one !== sourceCharId)]
}

function stockNeed(
  charId: CharacterId,
  targetQuantity: number,
  ctx: StockDestinationContext,
  itemIds: ReadonlySet<number>,
  allocatedHere: Map<CharacterId, number>,
  holding: StockHolding | undefined
): number {
  if (holding === undefined) {
    return targetQuantity - readGroupStock(ctx, itemIds, charId) - (allocatedHere.get(charId) ?? 0)
  }
  const held = Math.max(readGroupStock(ctx, itemIds, charId), holding.heldPerChar.get(charId) ?? 0)
  if (charId === holding.sourceCharId) {
    return Math.min(targetQuantity, held) - (holding.keptPerChar.get(charId) ?? 0)
  }
  return targetQuantity - held - (allocatedHere.get(charId) ?? 0)
}

export function planStockDestinationsForStack(
  groupKey: string,
  itemIds: ReadonlySet<number>,
  stackCount: number,
  targetQuantity: number,
  ctx: StockDestinationContext,
  claims: Map<CharacterId, Set<string>>,
  eligibilityPredicate?: (charId: CharacterId) => boolean,
  allocatedPerChar?: Map<CharacterId, number>,
  holding?: StockHolding
): readonly CharacterId[] {
  if (stackCount <= 0) return []
  if (targetQuantity <= 0) return []
  const allocations: CharacterId[] = []
  const allocatedHere = allocatedPerChar ?? new Map<CharacterId, number>()
  for (const charId of stockOrder(ctx.characterPriority, holding?.sourceCharId)) {
    if (allocations.length >= stackCount) break
    if (eligibilityPredicate !== undefined && !eligibilityPredicate(charId)) continue
    const need = stockNeed(charId, targetQuantity, ctx, itemIds, allocatedHere, holding)
    if (need <= 0) continue
    const remaining = stackCount - allocations.length
    const emit = Math.min(need, remaining)
    for (let i = 0; i < emit; i++) allocations.push(charId)
    if (holding !== undefined && charId === holding.sourceCharId) {
      holding.keptPerChar.set(charId, (holding.keptPerChar.get(charId) ?? 0) + emit)
    } else {
      allocatedHere.set(charId, (allocatedHere.get(charId) ?? 0) + emit)
    }
    const existing = claims.get(charId)
    if (existing === undefined) {
      claims.set(charId, new Set([groupKey]))
    } else {
      existing.add(groupKey)
    }
  }
  return allocations
}

export function planStockDestinationsForChain(
  groupKey: string,
  itemIds: ReadonlySet<number>,
  stackCount: number,
  chain: DestinationChain,
  stockCtx: StockDestinationContext,
  resolvers: EligibilityResolvers,
  claims: Map<CharacterId, Set<string>>,
  allocatedPerChar?: Map<CharacterId, number>,
  holding?: StockHolding
): readonly TierAllocation[] {
  if (stackCount <= 0 || chain.length === 0) return []
  const allocations: TierAllocation[] = []
  let remaining = stackCount
  const chainAllocatedPerChar = allocatedPerChar ?? new Map<CharacterId, number>()

  for (let i = 0; i < chain.length; i++) {
    if (remaining <= 0) break
    const tier = chain[i]
    if (tier === undefined) continue
    const isLast = i === chain.length - 1
    const authoredTarget = tier.targetQuantity
    if (tier.destination === "character:by-priority") {
      const predicate = composeCharEligibilityPredicate(tier.charEligibility, resolvers)
      const target = authoredTarget === undefined ? Number.MAX_SAFE_INTEGER : authoredTarget
      const allocation = planStockDestinationsForStack(
        groupKey,
        itemIds,
        remaining,
        target,
        stockCtx,
        claims,
        predicate,
        chainAllocatedPerChar,
        holding
      )
      const groupedByChar = new Map<CharacterId, number>()
      for (const id of allocation) {
        groupedByChar.set(id, (groupedByChar.get(id) ?? 0) + 1)
      }
      for (const [charId, count] of groupedByChar) {
        allocations.push({
          tierIndex: i,
          destination: tier.destination,
          charId,
          count,
        })
      }
      remaining -= allocation.length
      continue
    }

    const cap =
      isLast || authoredTarget === undefined ? remaining : Math.min(authoredTarget, remaining)
    if (cap <= 0) continue
    allocations.push({
      tierIndex: i,
      destination: tier.destination,
      count: cap,
    })
    remaining -= cap
  }

  return allocations
}
