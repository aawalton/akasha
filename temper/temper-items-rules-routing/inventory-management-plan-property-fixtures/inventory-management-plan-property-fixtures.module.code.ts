import type { InventoryItemData } from "@akasha/temper-items-core/inventory-types"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type {
  CategoryRule,
  ItemAction,
  MoveToDestination,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import type { RuleMatcherContext } from "@akasha/temper-items-rules-core/rule-matcher-context-types"
import type { ManagementPlan } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-types"
import fc from "fast-check"
import {
  ESO_BAG_BACKPACK,
  makeAffected,
  makeInventory,
  makeItem,
  makeLocation,
  makeRule,
} from "../inventory-management-plan-test-utils/inventory-management-plan-test-utils.module.code.ts"

export const STACK_COUNT_ARB = fc.integer({ min: 1, max: 50 })
export const QUALITY_ARB = fc.integer({ min: 1, max: 5 })

export const ITEM_NAME_ARB = fc.stringMatching(/^[a-zA-Z]{4,12}$/)

export const PHYSICAL_ACTIONS: readonly ItemAction[] = ["sell", "destroy"] as const
export const NON_PHYSICAL_ACTIONS: readonly ItemAction[] = ["nothing", "lock", "unlock"] as const
export const CAPACITY_BOUNDED_ACTIONS: readonly ItemAction[] = ["move-to", "stock"] as const

export const ITEM_SPEC_LIST_ARB = fc.array(
  fc.record({
    name: ITEM_NAME_ARB,
    quality: QUALITY_ARB,
    stackCount: STACK_COUNT_ARB,
  }),
  { minLength: 0, maxLength: 12 }
)

export const BANK_FREE_ARB = fc.integer({ min: 0, max: 20 })

export const EQUIP_SPEC_LIST_ARB = fc.array(
  fc.record({ name: ITEM_NAME_ARB, quality: QUALITY_ARB }),
  {
    minLength: 0,
    maxLength: 12,
  }
)

export function sumPlanStackCount(plan: ManagementPlan): number {
  let total = 0
  for (const session of plan.sessions) {
    for (const venue of session.venues) {
      for (const group of venue.actionGroups) {
        for (const item of group.items) total += item.stackCount
      }
    }
  }
  return total
}

export function makeEquipItem(name: string, itemId: number): InventoryItemData {
  return { ...makeItem(name), itemId, equipType: 1, stackCount: 1 }
}

export function makeStackableItem(
  name: string,
  itemId: number,
  stackCount: number,
  quality = 2
): InventoryItemData {
  return { ...makeItem(name, quality), itemId, stackCount }
}

export function buildScenario(
  ruleId: string,
  action: ItemAction,
  items: ReadonlyArray<{ name: string; quality: number; stackCount: number }>,
  destination?: MoveToDestination
): {
  rule: CategoryRule
  affectedItemsMap: Map<string, AffectedItem[]>
  inventory: ReturnType<typeof makeInventory>
} {
  const charId = "1001"
  const charName = "Azara"
  const bag: Record<number, ReturnType<typeof makeItem>> = {}
  const affected: AffectedItem[] = []
  items.forEach((spec, idx) => {
    const item = makeItem(spec.name, spec.quality)
    item.stackCount = spec.stackCount
    bag[idx] = item
    affected.push(makeAffected(item, charId, charName, ESO_BAG_BACKPACK))
  })
  const rule: CategoryRule = makeRule(ruleId, action, destination)
  const affectedItemsMap = new Map<string, AffectedItem[]>([[ruleId, affected]])
  const inventory = makeInventory(
    { [charId]: makeLocation(charName, { [ESO_BAG_BACKPACK]: bag }) },
    { [charId]: { displayName: charName } }
  )
  return { rule, affectedItemsMap, inventory }
}

export function buildCapacityBoundedScenario(
  ruleId: string,
  action: ItemAction,
  equipSpecs: ReadonlyArray<{ name: string; quality: number }>,
  bankFree: number
): {
  rule: CategoryRule
  affectedItemsMap: Map<string, AffectedItem[]>
  inventory: ReturnType<typeof makeInventory>
} {
  const charId = "1001"
  const charName = "Azara"
  const bag: Record<number, InventoryItemData> = {}
  const affected: AffectedItem[] = []
  equipSpecs.forEach((spec, idx) => {
    const item = makeEquipItem(spec.name, 100_000 + idx)
    bag[idx] = item
    affected.push(makeAffected(item, charId, charName, ESO_BAG_BACKPACK))
  })
  const usedSlots = 5
  const bankBag: Record<number, InventoryItemData> = {}
  for (let i = 0; i < usedSlots; i++) {
    bankBag[i] = makeEquipItem(`Filler${i}`, 900_000 + i)
  }
  const rule: CategoryRule = makeRule(ruleId, action, "bank")
  const affectedItemsMap = new Map<string, AffectedItem[]>([[ruleId, affected]])
  const inventory = makeInventory(
    {
      [charId]: makeLocation(charName, { [ESO_BAG_BACKPACK]: bag }),
      Bank: makeLocation("Bank", { 6: bankBag }, { 6: usedSlots + bankFree }),
    },
    { [charId]: { displayName: charName } }
  )
  return { rule, affectedItemsMap, inventory }
}

export function buildStackableBypassScenario(
  ruleId: string,
  action: ItemAction,
  stackCounts: readonly number[]
): {
  rule: CategoryRule
  affectedItemsMap: Map<string, AffectedItem[]>
  inventory: ReturnType<typeof makeInventory>
} {
  const charId = "1001"
  const charName = "Azara"
  const itemId = 500_001
  const itemName = "Potion"
  const bag: Record<number, InventoryItemData> = {}
  const affected: AffectedItem[] = []
  stackCounts.forEach((stackCount, idx) => {
    const item = makeStackableItem(itemName, itemId, stackCount)
    bag[idx] = item
    affected.push(makeAffected(item, charId, charName, ESO_BAG_BACKPACK))
  })
  const existingBankStack = makeStackableItem(itemName, itemId, 1)
  const rule: CategoryRule = makeRule(ruleId, action, "bank")
  const affectedItemsMap = new Map<string, AffectedItem[]>([[ruleId, affected]])
  const inventory = makeInventory(
    {
      [charId]: makeLocation(charName, { [ESO_BAG_BACKPACK]: bag }),
      Bank: makeLocation("Bank", { 6: { 0: existingBankStack } }, { 6: 1 }),
    },
    { [charId]: { displayName: charName } }
  )
  return { rule, affectedItemsMap, inventory }
}

export const RECIPE_NAME = "Recipe: Roast Venison"
export const RECIPE_RESULT_ID = 28289

export const COPY_COUNT_ARB = fc.integer({ min: 0, max: 5 })
export const PRIORITY_ARB = fc.array(fc.integer({ min: 1, max: 4 }), {
  minLength: 1,
  maxLength: 4,
})

export function buildRecipeDedupScenario(
  copyCount: number,
  priorityIds: readonly string[]
): {
  rule: CategoryRule
  affectedItemsMap: Map<string, AffectedItem[]>
  inventory: ReturnType<typeof makeInventory>
  context: RuleMatcherContext
} {
  const bankBag: Record<number, InventoryItemData> = {}
  const affected: AffectedItem[] = []
  for (let i = 0; i < copyCount; i++) {
    const item = makeItem(RECIPE_NAME)
    item.itemId = 90_000 + i
    item.itemType = 29
    bankBag[i] = item
    affected.push(makeAffected(item, "Bank", "Bank", 2))
  }

  const rule = makeRule("r1", "use", "character:by-priority")
  const affectedItemsMap = new Map<string, AffectedItem[]>([["r1", affected]])

  const locations: Record<string, ReturnType<typeof makeLocation>> = {
    Bank: makeLocation("Bank", { 2: bankBag }),
  }
  const characters: Record<string, { displayName: string }> = {}
  const knownRecipesByCharacter = new Map<string, Set<number>>()
  priorityIds.forEach((charId, idx) => {
    locations[charId] = makeLocation(
      `Char${idx}`,
      { [ESO_BAG_BACKPACK]: {} },
      { [ESO_BAG_BACKPACK]: 200 }
    )
    characters[charId] = { displayName: `Char${idx}` }
    knownRecipesByCharacter.set(charId, new Set<number>())
  })
  const inventory = makeInventory(locations, characters)

  const context: RuleMatcherContext = {
    wantedEquipment: [],
    wantedCompanionEquipment: [],
    wantedConsumables: new Map(),
    consumableStock: new Map(),
    bankStock: new Map(),
    characterLevels: new Map(),
    knownRecipesByCharacter,
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

  return { rule, affectedItemsMap, inventory, context }
}

export const STOCK_TARGET_ARB = fc.integer({ min: 1, max: 5 })
export const STOCK_STACK_COUNT_ARB = fc.integer({ min: 1, max: 12 })

export function buildStockByPriorityScenario(
  stockCount: number,
  target: number,
  priorityIds: readonly string[]
): {
  stockRule: CategoryRule
  sellRule: CategoryRule
  affectedItemsMap: Map<string, AffectedItem[]>
  inventory: ReturnType<typeof makeInventory>
  context: RuleMatcherContext
} {
  const itemId = 70001
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
    destination: "character:by-priority",
    stockScope: "any-character",
    conditions: { targetQuantity: target },
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

  return { stockRule, sellRule, affectedItemsMap, inventory, context }
}
