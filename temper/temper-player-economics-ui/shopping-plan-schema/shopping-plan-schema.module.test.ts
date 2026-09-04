import { describe, expect, test } from "bun:test"
import { shoppingPlanSchema } from "./shopping-plan-schema.module.code.ts"

type Obj = Record<string, unknown>

function validListing(overrides: Obj = {}): Obj {
  return {
    TradeAsset: {
      UnitPrice: 25,
      Amount: 200,
      Item: { Name: "Companion's Arm Cops", ID: 191960, QualityID: 2 },
    },
    PlayerID: "@player",
    GuildName: "Traders Guild",
    GuildKioskLocationID: 7,
    ID: 123456,
    ...overrides,
  }
}

function validPlan(overrides: Obj = {}): Obj {
  return {
    purchases: [{ key: "k1", listing: validListing(), unitPrice: 25 }],
    locations: ["7"],
    totalCost: 25,
    missingItems: [],
    budgets: [{ key: "k1", ceiling: 27, cheapestPrice: 25, multiplier: 1.1, strategy: "Normal" }],
    alternatives: { k1: [{ key: "k1", listing: validListing(), unitPrice: 30 }] },
    ...overrides,
  }
}

describe("shoppingPlanSchema", () => {
  test("parses a valid plan", () => {
    expect(shoppingPlanSchema.safeParse(validPlan()).success).toBe(true)
  })

  test("rejects a plan with an unknown extra key (strict — a drifted payload)", () => {
    expect(shoppingPlanSchema.safeParse(validPlan({ someFutureField: true })).success).toBe(false)
  })

  test("rejects a plan whose locations field is missing", () => {
    const { locations: omitted, ...noLocations } = validPlan()
    expect(shoppingPlanSchema.safeParse(noLocations).success).toBe(false)
  })

  test("rejects a plan whose locations field is not an array", () => {
    expect(shoppingPlanSchema.safeParse(validPlan({ locations: "7" })).success).toBe(false)
  })

  test("rejects a plan whose listing lacks TradeAsset (the crash field)", () => {
    const { TradeAsset: omitted, ...listingNoAsset } = validListing()
    const plan = validPlan({
      purchases: [{ key: "k1", listing: listingNoAsset, unitPrice: 25 }],
    })
    expect(shoppingPlanSchema.safeParse(plan).success).toBe(false)
  })

  test("tolerates unknown extra fields inside a listing (loose listing, strict wrapper)", () => {
    const plan = validPlan({
      purchases: [{ key: "k1", listing: validListing({ SomeFutureField: "kept" }), unitPrice: 25 }],
    })
    expect(shoppingPlanSchema.safeParse(plan).success).toBe(true)
  })

  test("rejects a plan whose budget carries an unknown strategy", () => {
    const plan = validPlan({
      budgets: [{ key: "k1", ceiling: 27, cheapestPrice: 25, multiplier: 1.1, strategy: "Wild" }],
    })
    expect(shoppingPlanSchema.safeParse(plan).success).toBe(false)
  })
})
