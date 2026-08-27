import { describe, expect, it } from "bun:test"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { makeContext } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import {
  ALL_CATEGORIES_ID,
  type CategoryRule,
  IMPLICIT_TERMINAL_RULE_ID,
} from "@temper/game-items-rules-core/inventory-rule-types"
import fc from "fast-check"
import { computeAllRuleAffectedItems } from "../inventory-rule-matcher"
import {
  eligibleCharCountArb,
  recipeCI,
  stackCountArb,
} from "../inventory-rule-matcher-property-fixtures"
import { compile } from "./compile-rules"

describe("computeAllRuleAffectedItems — surplus fall-through invariants", () => {
  it("A: unit conservation — use rule + sell rule sum to the full stackCount", () => {
    fc.assert(
      fc.property(stackCountArb, eligibleCharCountArb, (stackCount, eligibleCount) => {
        const ci = recipeCI(stackCount)
        const useRule: CategoryRule = {
          id: "use",
          categoryId: ALL_CATEGORIES_ID,
          action: "use",
          destination: "character:by-priority",
          active: true,
        }
        const sellRule: CategoryRule = {
          id: "sell",
          categoryId: ALL_CATEGORIES_ID,
          action: "sell",
          active: true,
        }

        const knownByChar: Record<string, number[]> = {}
        for (let i = 0; i < eligibleCount; i++) knownByChar[`100${i + 1}`] = []
        knownByChar["1099"] = [28289]
        const ctx = makeContext(knownByChar)

        const result = computeAllRuleAffectedItems(compile([useRule, sellRule]), [ci], ctx)

        let totalUnits = 0
        for (const bucketId of ["use", "sell", IMPLICIT_TERMINAL_RULE_ID]) {
          const bucket = result.ruleMap.get(bucketId) ?? []
          for (const a of bucket) {
            if (a.item !== ci.item) continue
            totalUnits += a.quantity ?? a.item.stackCount
          }
        }
        expect(totalUnits).toBe(stackCount)
      })
    )
  })

  it("A-stock: unit conservation — stock by-priority + sell sum to the full stackCount", () => {
    fc.assert(
      fc.property(stackCountArb, eligibleCharCountArb, (stackCount, eligibleCount) => {
        const ci: ClassifiedInventoryItem = {
          item: {
            itemId: 80001,
            itemName: "Generic Stockable",
            itemLink: "",
            quality: 2,
            filterType: 1,
            itemType: 1,
            traitType: 0,
            requiredLevel: 1,
            requiredCP: 0,
            stackCount,
          },
          locationKey: "Bank",
          locationDisplayName: "Bank",
          nodeIds: ["all", "consumables", "potion"],
          bagId: 2,
        }
        const stockRule: CategoryRule = {
          id: "stock",
          categoryId: ALL_CATEGORIES_ID,
          action: "stock",
          destination: "character:by-priority",
          stockScope: "any-character",
          conditions: { targetQuantity: 5 },
          active: true,
        }
        const sellRule: CategoryRule = {
          id: "sell",
          categoryId: ALL_CATEGORIES_ID,
          action: "sell",
          active: true,
        }

        const knownByChar: Record<string, number[]> = {}
        for (let i = 0; i < eligibleCount; i++) knownByChar[`100${i + 1}`] = []
        if (eligibleCount === 0) knownByChar["1099"] = []
        const ctx = makeContext(knownByChar)

        const result = computeAllRuleAffectedItems(compile([stockRule, sellRule]), [ci], ctx)
        let totalUnits = 0
        for (const bucketId of ["stock", "sell", IMPLICIT_TERMINAL_RULE_ID]) {
          const bucket = result.ruleMap.get(bucketId) ?? []
          for (const a of bucket) {
            if (a.item !== ci.item) continue
            totalUnits += a.quantity ?? a.item.stackCount
          }
        }
        expect(totalUnits).toBe(stackCount)
      })
    )
  })

  it("P3-stock: stock × by-priority participates in first-match-wins", () => {
    fc.assert(
      fc.property(stackCountArb, (stackCount) => {
        const ci: ClassifiedInventoryItem = {
          item: {
            itemId: 80002,
            itemName: "Generic Stockable",
            itemLink: "",
            quality: 2,
            filterType: 1,
            itemType: 1,
            traitType: 0,
            requiredLevel: 1,
            requiredCP: 0,
            stackCount,
          },
          locationKey: "Bank",
          locationDisplayName: "Bank",
          nodeIds: ["all", "consumables", "potion"],
          bagId: 2,
        }
        const target = 3
        const stockRule: CategoryRule = {
          id: "stock",
          categoryId: ALL_CATEGORIES_ID,
          action: "stock",
          destination: "character:by-priority",
          conditions: { targetQuantity: target },
          active: true,
        }
        const sellRule: CategoryRule = {
          id: "sell",
          categoryId: ALL_CATEGORIES_ID,
          action: "sell",
          active: true,
        }
        const ctx = makeContext({ "1001": [], "1002": [] })
        const result = computeAllRuleAffectedItems(compile([stockRule, sellRule]), [ci], ctx)
        const stockBucket = result.ruleMap.get("stock") ?? []
        const sellBucket = result.ruleMap.get("sell") ?? []
        const stockUnits = stockBucket.reduce(
          (s, a) => s + (a.item === ci.item ? (a.quantity ?? a.item.stackCount) : 0),
          0
        )
        const sellUnits = sellBucket.reduce(
          (s, a) => s + (a.item === ci.item ? (a.quantity ?? a.item.stackCount) : 0),
          0
        )
        const expectedStockUnits = Math.min(stackCount, 2 * target)
        expect(stockUnits).toBe(expectedStockUnits)
        expect(sellUnits).toBe(stackCount - expectedStockUnits)
      })
    )
  })

  it("AGGREGATE: one stock rule caps the per-char TOTAL across all matched itemIds", () => {
    const ITEM_A = 80010
    const ITEM_B = 80011
    const mkCI = (itemId: number): ClassifiedInventoryItem => ({
      item: {
        itemId,
        itemName: "Generic Stockable",
        itemLink: "",
        quality: 2,
        filterType: 1,
        itemType: 1,
        traitType: 0,
        requiredLevel: 1,
        requiredCP: 0,
        stackCount: 40,
      },
      locationKey: "Bank",
      locationDisplayName: "Bank",
      nodeIds: ["all", "consumables", "potion"],
      bagId: 2,
    })
    const ciA = mkCI(ITEM_A)
    const ciB = mkCI(ITEM_B)

    const stockRule: CategoryRule = {
      id: "stock",
      categoryId: ALL_CATEGORIES_ID,
      action: "stock",
      destination: "character:by-priority",
      stockScope: "any-character",
      conditions: { targetQuantity: 100 },
      active: true,
    }
    const sellRule: CategoryRule = {
      id: "sell",
      categoryId: ALL_CATEGORIES_ID,
      action: "sell",
      active: true,
    }

    const ctx = makeContext({ c: [], d: [] }, ["c", "d"])
    ctx.consumableStock = new Map([
      [ITEM_A, new Map([["c", 60]])],
      [ITEM_B, new Map([["c", 50]])],
    ])

    const result = computeAllRuleAffectedItems(compile([stockRule, sellRule]), [ciA, ciB], ctx)
    const stockBucket = result.ruleMap.get("stock") ?? []
    const sellBucket = result.ruleMap.get("sell") ?? []
    const stockUnits = stockBucket.reduce((s, a) => s + (a.quantity ?? a.item.stackCount), 0)
    const sellUnits = sellBucket.reduce((s, a) => s + (a.quantity ?? a.item.stackCount), 0)
    const allChars: string[] = []
    for (const a of stockBucket) for (const ch of a.useAllocation ?? []) allChars.push(ch)
    expect(allChars.every((ch) => ch === "d")).toBe(true)
    expect(stockUnits).toBe(80)
    expect(sellUnits).toBe(0)
  })

  it("AGGREGATE: 60 of A + 50 of B held by the only char caps at target 100, surplus sells", () => {
    const ITEM_A = 80020
    const ITEM_B = 80021
    const ciA: ClassifiedInventoryItem = {
      item: {
        itemId: ITEM_A,
        itemName: "Generic Stockable",
        itemLink: "",
        quality: 2,
        filterType: 1,
        itemType: 1,
        traitType: 0,
        requiredLevel: 1,
        requiredCP: 0,
        stackCount: 40,
      },
      locationKey: "Bank",
      locationDisplayName: "Bank",
      nodeIds: ["all", "consumables", "potion"],
      bagId: 2,
    }
    const ciB: ClassifiedInventoryItem = { ...ciA, item: { ...ciA.item, itemId: ITEM_B } }

    const stockRule: CategoryRule = {
      id: "stock",
      categoryId: ALL_CATEGORIES_ID,
      action: "stock",
      destination: "character:by-priority",
      stockScope: "any-character",
      conditions: { targetQuantity: 100 },
      active: true,
    }
    const sellRule: CategoryRule = {
      id: "sell",
      categoryId: ALL_CATEGORIES_ID,
      action: "sell",
      active: true,
    }
    const ctx = makeContext({ c: [] }, ["c"])
    ctx.consumableStock = new Map([
      [ITEM_A, new Map([["c", 60]])],
      [ITEM_B, new Map([["c", 50]])],
    ])
    const result = computeAllRuleAffectedItems(compile([stockRule, sellRule]), [ciA, ciB], ctx)
    const stockUnits = (result.ruleMap.get("stock") ?? []).reduce(
      (s, a) => s + (a.quantity ?? a.item.stackCount),
      0
    )
    const sellUnits = (result.ruleMap.get("sell") ?? []).reduce(
      (s, a) => s + (a.quantity ?? a.item.stackCount),
      0
    )
    expect(stockUnits).toBe(0)
    expect(sellUnits).toBe(80)
  })

  it("B: no character receives two routed copies of the same recipe across the run", () => {
    fc.assert(
      fc.property(
        fc.array(stackCountArb, { minLength: 1, maxLength: 5 }),
        eligibleCharCountArb,
        (stackCounts, eligibleCount) => {
          const cis: ClassifiedInventoryItem[] = stackCounts.map((sc, i) => {
            const base = recipeCI(sc)
            return { ...base, item: { ...base.item, itemId: 90_000 + i } }
          })

          const useRule: CategoryRule = {
            id: "use",
            categoryId: ALL_CATEGORIES_ID,
            action: "use",
            destination: "character:by-priority",
            active: true,
          }
          const knownByChar: Record<string, number[]> = {}
          for (let i = 0; i < eligibleCount; i++) knownByChar[`100${i + 1}`] = []
          knownByChar["1099"] = [28289]
          const ctx = makeContext(knownByChar)

          const result = computeAllRuleAffectedItems(compile([useRule]), cis, ctx)
          const bucket = result.ruleMap.get("use") ?? []

          const allChars: string[] = []
          for (const a of bucket) {
            for (const c of a.useAllocation ?? []) allChars.push(c)
          }
          expect(new Set(allChars).size).toBe(allChars.length)
        }
      )
    )
  })
})
