import { computeItemStock } from "@akasha/temper-items-core/compute-item-stock"
import type { InventoryDatabase } from "@akasha/temper-items-core/inventory-types"
import { evaluateBuyRules } from "@akasha/temper-items-rules-core/buy-rule-eval"
import type { BuyRule } from "@akasha/temper-items-rules-core/buy-rule-types"
import type { PlanItem } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-types"
import type {
  CharSimState,
  SimStep,
} from "../inventory-management-plan-simulation/inventory-management-plan-simulation.module.code.ts"

export const BUY_CHARACTER_ID = "__buy__"

export const BUY_CHARACTER_NAME = "Any Character"

const BUY_NOTE = "Buy"

export interface BuyShortfall {
  rule: BuyRule
  quantity: number
}

export function collectBuyShortfalls(
  buyRules: readonly BuyRule[],
  inventory: InventoryDatabase | null
): readonly BuyShortfall[] {
  if (buyRules.length === 0) return []
  const itemIds = new Set<number>()
  for (const rule of buyRules) {
    if (rule.active === false) continue
    itemIds.add(rule.itemId)
  }
  if (itemIds.size === 0) return []

  const stock = computeItemStock(inventory, itemIds)
  const totals = new Map<number, number>()
  for (const [itemId, breakdown] of stock) totals.set(itemId, breakdown.total)

  const shortfalls: BuyShortfall[] = []
  for (const evaluation of evaluateBuyRules(buyRules, totals)) {
    if (evaluation.shortfall <= 0) continue
    shortfalls.push({ rule: evaluation.rule, quantity: evaluation.shortfall })
  }
  return shortfalls
}

function buildBuySimStep(shortfall: BuyShortfall): SimStep {
  const planItem: PlanItem = {
    itemId: shortfall.rule.itemId,
    itemName: shortfall.rule.itemName,
    stackCount: shortfall.quantity,
    quality: 0,
    action: "sell",
    note: BUY_NOTE,
  }
  return {
    venue: "vendor",
    operation: "retrieve",
    planItem,
    backpackSlots: 1,
    itemId: shortfall.rule.itemId,
    stackable: true,
    occupiesStorageSlot: false,
    next: null,
  }
}

export function injectBuySimSteps(
  charStates: Map<string, CharSimState>,
  buyRules: readonly BuyRule[] | undefined,
  inventory: InventoryDatabase | null
): undefined {
  if (buyRules === undefined || buyRules.length === 0) return
  const shortfalls = collectBuyShortfalls(buyRules, inventory)
  if (shortfalls.length === 0) return

  const pending: SimStep[] = shortfalls.map(buildBuySimStep)
  charStates.set(BUY_CHARACTER_ID, {
    characterId: BUY_CHARACTER_ID,
    pending,
    isSource: false,
    depositKeys: new Set(),
  })
}
