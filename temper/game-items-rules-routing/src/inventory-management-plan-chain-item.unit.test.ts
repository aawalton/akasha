import { describe, expect, it } from "bun:test"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { AffectedItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import type { ItemRule } from "@temper/game-items-rules-core/inventory-rule-types"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  buildChainScenario,
  type DestinationChain,
  sumPlanByDestination,
} from "./inventory-management-plan-chain-property-fixtures"
import { sumPlanStackCount } from "./inventory-management-plan-property-fixtures"

describe("buildManagementPlan — ItemRule destinationChain per-tier expansion", () => {
  const chain: DestinationChain = [
    { destination: "bank", targetQuantity: 3 },
    { destination: "house-storage:4677" },
  ]
  const stockCount = 10
  const priorityIds = ["1001"] as const
  const canLevelMap = new Map<string, boolean>()

  it("(1) item-rule chain plan matches the equivalent category-rule chain plan", () => {
    const cat = buildChainScenario(stockCount, chain, priorityIds, canLevelMap)
    const catPlan = buildManagementPlan(
      [cat.stockRule, cat.sellRule].map(compileCategoryRuleToOrdered),
      [],
      cat.affectedItemsMap,
      cat.inventory,
      cat.context
    )

    const itemRule: ItemRule = {
      id: "item-stock",
      itemId: 70_001,
      itemName: "Generic Stockable",
      action: "stock",
      destination: chain[0]?.destination,
      destinationChain: chain,
      active: true,
    }
    const itemAffected: Map<string, AffectedItem[]> = new Map([
      ["item-stock", cat.affectedItemsMap.get("stock") ?? []],
    ])
    const itemPlan = buildManagementPlan([], [itemRule], itemAffected, cat.inventory, cat.context)

    expect(Object.fromEntries(sumPlanByDestination(itemPlan))).toEqual(
      Object.fromEntries(sumPlanByDestination(catPlan))
    )
    expect(sumPlanStackCount(itemPlan)).toBe(sumPlanStackCount(catPlan))
  })

  it("(2) chain expands per-tier: lands at both tiers and conserves the stack", () => {
    const cat = buildChainScenario(stockCount, chain, priorityIds, canLevelMap)
    const itemRule: ItemRule = {
      id: "item-stock",
      itemId: 70_001,
      itemName: "Generic Stockable",
      action: "stock",
      destination: chain[0]?.destination,
      destinationChain: chain,
      active: true,
    }
    const itemAffected: Map<string, AffectedItem[]> = new Map([
      ["item-stock", cat.affectedItemsMap.get("stock") ?? []],
    ])
    const itemPlan = buildManagementPlan([], [itemRule], itemAffected, cat.inventory, cat.context)

    const sums = sumPlanByDestination(itemPlan)
    expect(sums.size).toBeGreaterThanOrEqual(2)
    expect(sumPlanStackCount(itemPlan)).toBe(stockCount)
  })
})
