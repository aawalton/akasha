import { expect, test } from "bun:test"
import type { DestinationChain } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import {
  chainFillsCharacter,
  planStockChainVisit,
  stockChainTarget,
} from "akasha/temper/items/rules/core/modules/stock-chain-visit/stock-chain-visit.module.code.ts"
import { planStockReconcile } from "akasha/temper/items/rules/core/modules/stock-reconcile-plan/stock-reconcile-plan.module.code.ts"
import { ruleSoulGemsEmptyStock } from "akasha/temper/player/progress/temper-inventory-rule/pages/rule-soul-gems-empty-stock/rule-soul-gems-empty-stock.temper-inventory-rule.ts"
import { stock } from "akasha/temper/player/progress/temper-item-action/pages/stock.temper-item-action.ts"

const ERIN = "8796093022338107"
const OTHER = "8796093022000001"

const ERIN_BROTH: DestinationChain = [
  { destination: `character:${ERIN}`, targetQuantity: 20 },
  { destination: "house-storage:4675" },
]

const BY_PRIORITY_MARA: DestinationChain = [
  { destination: "character:by-priority", targetQuantity: 20 },
  { destination: "bank", targetQuantity: 100 },
  { destination: "house-storage:4675" },
]

test("a fill tier naming a character fills that character from the chest after it", () => {
  const plan = planStockChainVisit(ERIN_BROTH)

  expect(plan?.fillCharacter).toBe(ERIN)
  expect(plan?.fillTargetQuantity).toBe(20)
  expect(plan?.surplusDestination).toBe("house-storage:4675")
})

test("a fill tier naming a character fills no other character", () => {
  const plan = planStockChainVisit(ERIN_BROTH)
  if (plan === undefined) throw new Error("a chain naming a character answered no plan")

  expect(chainFillsCharacter(plan, ERIN)).toBe(true)
  expect(chainFillsCharacter(plan, OTHER)).toBe(false)
})

test("a by-priority fill tier fills every character", () => {
  const plan = planStockChainVisit(BY_PRIORITY_MARA)
  if (plan === undefined) throw new Error("a by-priority chain answered no plan")

  expect(plan.fillCharacter).toBe(undefined)
  expect(chainFillsCharacter(plan, ERIN)).toBe(true)
  expect(chainFillsCharacter(plan, OTHER)).toBe(true)
})

test("a chain naming a character targets that one character's fill", () => {
  expect(stockChainTarget(ERIN_BROTH, 20)).toBe(20)
  expect(stockChainTarget(BY_PRIORITY_MARA, 2)).toBe(140)
})

test("a chain sending to no character answers no plan", () => {
  expect(planStockChainVisit([{ destination: "character-worn:by-priority" }])).toBe(undefined)
  expect(planStockChainVisit([{ destination: "bank", targetQuantity: 100 }])).toBe(undefined)
})

const EMPTY_SOUL_GEMS: DestinationChain = [
  { destination: "character:by-priority", targetQuantity: 200 },
  { destination: "bank", targetQuantity: 200 },
  { destination: "vendor" },
]

test("every character and the bank stock 200 empty soul gems, and the rest sell", async () => {
  expect(ruleSoulGemsEmptyStock.action).toEndWith(`/${stock.slug}`)
  const text = await Bun.file(
    new URL(
      "../../../../../player/progress/temper-inventory-rule/pages/rule-soul-gems-empty-stock/rule-soul-gems-empty-stock.temper-inventory-rule.destination-chain.jsonl",
      import.meta.url
    )
  ).text()
  const legs: unknown = JSON.parse(`[${text.trim().split("\n").join(",")}]`)
  expect(legs).toMatchObject(EMPTY_SOUL_GEMS)

  const plan = planStockChainVisit(EMPTY_SOUL_GEMS)
  if (plan === undefined) throw new Error("the empty soul gem chain answered no plan")
  expect(chainFillsCharacter(plan, ERIN)).toBe(true)
  expect(chainFillsCharacter(plan, OTHER)).toBe(true)
  expect(plan.surplusCascade).toEqual([
    { destination: "bank", cap: 200 },
    { destination: "vendor", cap: undefined },
  ])

  function bankVisit(backpackCount: number, banked = 0): ReturnType<typeof planStockReconcile> {
    return planStockReconcile({
      selfTarget: plan?.fillTargetQuantity ?? 0,
      backpackCount,
      openTierCap: plan?.surplusCascade[0]?.cap,
      openTierStorageCount: banked,
      withdrawableFromOpen: 1000,
    })
  }
  expect(bankVisit(0)).toEqual({ direction: "withdraw", count: 200 })
  expect(bankVisit(150)).toEqual({ direction: "withdraw", count: 50 })
  expect(bankVisit(200)).toEqual({ direction: "none", count: 0 })
  expect(bankVisit(500)).toEqual({ direction: "deposit", count: 200 })
  expect(bankVisit(500, 200)).toEqual({ direction: "none", count: 0 })
})
