import type { InventoryItemData } from "@temper/game-items-core/inventory-types"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import type {
  CategoryRule,
  MoveToDestination,
} from "@temper/game-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@temper/game-items-rules-core/rule-matcher-context-types"
import type { ManagementPlan } from "@temper/game-items-rules-routing-core/inventory-management-plan-types"
import fc from "fast-check"
import {
  ESO_BAG_BACKPACK,
  makeAffected,
  makeInventory,
  makeLocation,
} from "./inventory-management-plan.test-utils"
import { makeStackableItem } from "./inventory-management-plan-property-fixtures"

export type CanLevelMorphsCondition = { readonly mode: "can-level" }

export interface ChainTier {
  readonly destination: MoveToDestination
  readonly targetQuantity?: number
  readonly charEligibility?: {
    readonly canLevelMorphs?: CanLevelMorphsCondition
  }
}

export type DestinationChain = readonly ChainTier[]

export const stockStackCountArb = fc.integer({ min: 1, max: 24 })
export const targetQuantityArb = fc.integer({ min: 1, max: 8 })
export const priorityNumArb = fc.integer({ min: 1, max: 4 })
export const priorityArb = fc.array(priorityNumArb, { minLength: 1, maxLength: 4 })

const FIXED_DESTINATIONS: readonly MoveToDestination[] = [
  "bank",
  "character:by-priority",
  "house-storage:4677",
] as const

export const tierDestinationArb: fc.Arbitrary<MoveToDestination> = fc.constantFrom(
  ...FIXED_DESTINATIONS
)

export const tierArb: fc.Arbitrary<ChainTier> = fc
  .record({
    destination: tierDestinationArb,
    targetQuantity: fc.option(targetQuantityArb, { nil: undefined }),
    eligible: fc.boolean(),
  })
  .map(({ destination, targetQuantity, eligible }) => {
    const tier: ChainTier = eligible
      ? {
          destination,
          targetQuantity,
          charEligibility: { canLevelMorphs: { mode: "can-level" } },
        }
      : { destination, targetQuantity }
    return tier
  })

export const chainArb: fc.Arbitrary<DestinationChain> = fc
  .tuple(fc.array(tierArb, { minLength: 0, maxLength: 3 }), tierArb, fc.boolean())
  .map(([head, tail, unboundTail]) => {
    const finalTail: ChainTier = unboundTail
      ? tail.charEligibility
        ? { destination: tail.destination, charEligibility: tail.charEligibility }
        : { destination: tail.destination }
      : tail
    return [...head, finalTail]
  })

export const boundedChainArb: fc.Arbitrary<DestinationChain> = fc.array(
  tierArb.filter((t) => t.targetQuantity !== undefined),
  { minLength: 1, maxLength: 4 }
)

export function sumPlanByDestination(plan: ManagementPlan): Map<string, number> {
  const sums = new Map<string, number>()
  for (const session of plan.sessions) {
    for (const venue of session.venues) {
      const key = `${venue.venue}:${venue.label}`
      for (const group of venue.actionGroups) {
        for (const item of group.items) {
          sums.set(key, (sums.get(key) ?? 0) + item.stackCount)
        }
      }
    }
  }
  return sums
}

export function buildChainScenario(
  stockCount: number,
  chain: DestinationChain,
  priorityIds: readonly string[],
  canLevelMap: ReadonlyMap<string, boolean>
): {
  stockRule: CategoryRule
  sellRule: CategoryRule
  affectedItemsMap: Map<string, AffectedItem[]>
  inventory: ReturnType<typeof makeInventory>
  context: RuleMatcherContext
} {
  const itemId = 70_001
  const itemName = "Generic Stockable"

  const bankBag: Record<number, InventoryItemData> = {}
  const stockAffected: AffectedItem[] = []
  const stackItem = makeStackableItem(itemName, itemId, stockCount)
  bankBag[0] = stackItem
  stockAffected.push(makeAffected(stackItem, "Bank", "Bank", 2))

  const stockRule: CategoryRule = {
    id: "stock",
    categoryId: "all",
    action: "stock",
    destination: chain[0]?.destination,
    destinationChain: chain,
    active: true,
  }
  const sellRule: CategoryRule = {
    id: "sell",
    categoryId: "all",
    action: "sell",
    active: true,
  }
  const affectedItemsMap = new Map<string, AffectedItem[]>([
    ["stock", stockAffected],
    ["sell", []],
  ])

  const locations: Record<string, ReturnType<typeof makeLocation>> = {
    Bank: makeLocation("Bank", { 2: bankBag }),
  }
  const characters: Record<string, { displayName: string }> = {}
  priorityIds.forEach((charId, idx) => {
    locations[charId] = makeLocation(
      `Char${idx}`,
      { [ESO_BAG_BACKPACK]: {} },
      { [ESO_BAG_BACKPACK]: 200 }
    )
    characters[charId] = { displayName: `Char${idx}` }
  })
  const inventory = makeInventory(locations, characters)

  const baseCtx: RuleMatcherContext = {
    wantedEquipment: [],
    wantedCompanionEquipment: [],
    wantedConsumables: new Map(),
    consumableStock: new Map(),
    bankStock: new Map(),
    characterLevels: new Map(),
    knownRecipesByCharacter: new Map(),
    knownMotifsByCharacter: new Map(),
    knownMotifsByStyleIdByCharacter: new Map(),
    knownScriptsByCharacter: new Map(),
    researchedTraitsByCharacter: new Map(),
    characterPriority: [...priorityIds],
    craftingLevels: new Map(),
    openCooldowns: new Map(),
    transmuteCrystalCap: undefined,
    transmuteCrystalAmount: undefined,
  }
  const context: RuleMatcherContext = {
    ...baseCtx,
    getCharacterCanLevelMorphs: (charId: string) => canLevelMap.get(charId) ?? false,
  }

  return { stockRule, sellRule, affectedItemsMap, inventory, context }
}

export function buildEquivalentMultiRuleScenario(
  stockCount: number,
  chain: DestinationChain,
  priorityIds: readonly string[]
): {
  rules: readonly CategoryRule[]
  affectedItemsMap: Map<string, AffectedItem[]>
  inventory: ReturnType<typeof makeInventory>
  context: RuleMatcherContext
} {
  const itemId = 70_001
  const itemName = "Generic Stockable"
  const bankBag: Record<number, InventoryItemData> = {}
  const stackItem = makeStackableItem(itemName, itemId, stockCount)
  bankBag[0] = stackItem
  const stockAffected: AffectedItem[] = [makeAffected(stackItem, "Bank", "Bank", 2)]

  const rules: CategoryRule[] = chain.map((tier, idx) => ({
    id: `r${idx}`,
    categoryId: "all",
    action: "stock",
    destination: tier.destination,
    stockScope: "any-character",
    conditions: tier.targetQuantity === undefined ? {} : { targetQuantity: tier.targetQuantity },
    active: true,
  }))
  rules.push({ id: "sell", categoryId: "all", action: "sell", active: true })

  const affectedItemsMap = new Map<string, AffectedItem[]>([[rules[0]?.id ?? "r0", stockAffected]])
  for (const r of rules.slice(1)) {
    affectedItemsMap.set(r.id, [])
  }

  const locations: Record<string, ReturnType<typeof makeLocation>> = {
    Bank: makeLocation("Bank", { 2: bankBag }),
  }
  const characters: Record<string, { displayName: string }> = {}
  priorityIds.forEach((charId, idx) => {
    locations[charId] = makeLocation(
      `Char${idx}`,
      { [ESO_BAG_BACKPACK]: {} },
      { [ESO_BAG_BACKPACK]: 200 }
    )
    characters[charId] = { displayName: `Char${idx}` }
  })
  const inventory = makeInventory(locations, characters)

  const context: RuleMatcherContext = {
    wantedEquipment: [],
    wantedCompanionEquipment: [],
    wantedConsumables: new Map(),
    consumableStock: new Map(),
    bankStock: new Map(),
    characterLevels: new Map(),
    knownRecipesByCharacter: new Map(),
    knownMotifsByCharacter: new Map(),
    knownMotifsByStyleIdByCharacter: new Map(),
    knownScriptsByCharacter: new Map(),
    researchedTraitsByCharacter: new Map(),
    characterPriority: [...priorityIds],
    craftingLevels: new Map(),
    openCooldowns: new Map(),
    transmuteCrystalCap: undefined,
    transmuteCrystalAmount: undefined,
  }

  return { rules, affectedItemsMap, inventory, context }
}

export function dedupePriorityIds(priorityNums: readonly number[]): readonly string[] {
  const seen = new Set<string>()
  const ids: string[] = []
  for (const n of priorityNums) {
    const id = `100${n}`
    if (!seen.has(id)) {
      seen.add(id)
      ids.push(id)
    }
  }
  return ids
}
