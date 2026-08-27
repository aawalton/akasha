import { describe, expect, test } from "bun:test"
import {
  CROWN_CONSUMABLE_ESO_IDS,
  isUncoveredCrownConsumable,
  lookupCrownReplacementCosts,
} from "./crown-consumable-price-lookup"
import type { PricingData } from "./pricing-types"

const LIVE_21074 = {
  "4": {
    "1": {
      "-1": {
        A: 812.34,
        N: 336.5385,
        S: 667.16,
        X: 8000,
        AC: 42049,
        EC: 966,
        SA: 752.32,
        SE: 531,
        SAC: 21829,
      },
    },
  },
}

const LIVE_3520 = {
  "0": {
    "200": {
      "-1": {
        "": { A: 19.17, N: 2, S: 7.36, X: 1250, SA: 8.18 },
        "0": { A: 131.45, N: 8.333333, S: 117.58, X: 333.3333 },
        "1": { A: 160, N: 160, X: 160 },
      },
    },
  },
}

function pricing(data: PricingData["Data"]): PricingData {
  return { Data: data, TimeStamp: 0 }
}

describe("lookupCrownReplacementCosts", () => {
  test("prices Crown Fortifying Meal from the coordinates TTC actually publishes", () => {
    const outcome = lookupCrownReplacementCosts(pricing({ "21074": LIVE_21074 })).get(64711)
    expect(outcome).toEqual({ kind: "priced", gold: 752.32 })
  })

  test("picks the highest reagent-combo price on the potion path", () => {
    const outcome = lookupCrownReplacementCosts(pricing({ "3520": LIVE_3520 })).get(64710)
    expect(outcome).toEqual({ kind: "priced", gold: 160 })
  })

  test("every crown ESO id is present whether or not it priced", () => {
    const outcomes = lookupCrownReplacementCosts(pricing({ "21074": LIVE_21074 }))
    expect(new Set(outcomes.keys())).toEqual(CROWN_CONSUMABLE_ESO_IDS)
    expect(outcomes.get(1)).toBeUndefined()
  })

  describe("distinguishes why a price could not be resolved", () => {
    test("item-absent when TTC has no rows for the equivalent at all", () => {
      const outcome = lookupCrownReplacementCosts(pricing({})).get(64711)
      expect(outcome).toEqual({ kind: "unpriced", ttcItemId: "21074", reason: "item-absent" })
    })

    test("quality-absent — the exact live defect, reproduced", () => {
      const outcome = lookupCrownReplacementCosts(
        pricing({ "21074": { "-1": { "20": { "-1": { SA: 999 } } } } })
      ).get(64711)
      expect(outcome).toEqual({ kind: "unpriced", ttcItemId: "21074", reason: "quality-absent" })
    })

    test("level-absent when the quality resolves but the level does not", () => {
      const outcome = lookupCrownReplacementCosts(
        pricing({ "21074": { "4": { "20": { "-1": { SA: 999 } } } } })
      ).get(64711)
      expect(outcome).toEqual({ kind: "unpriced", ttcItemId: "21074", reason: "level-absent" })
    })

    test("trait-absent when the level resolves but the trait does not", () => {
      const outcome = lookupCrownReplacementCosts(
        pricing({ "21074": { "4": { "1": { "7": { SA: 999 } } } } })
      ).get(64711)
      expect(outcome).toEqual({ kind: "unpriced", ttcItemId: "21074", reason: "trait-absent" })
    })

    test("no-positive-price when the entry resolves but carries no usable price", () => {
      const outcome = lookupCrownReplacementCosts(
        pricing({ "21074": { "4": { "1": { "-1": { SA: 0, N: 0 } } } } })
      ).get(64711)
      expect(outcome).toEqual({
        kind: "unpriced",
        ttcItemId: "21074",
        reason: "no-positive-price",
      })
    })
  })
})

describe("isUncoveredCrownConsumable", () => {
  test.each([
    [79690, "Crown Lethal Poison"],
    [124674, "Gold Coast Swift Survivor Elixir"],
    [61079, "Crown Repair Kit"],
    [71668, "Crown Mimic Stone"],
    [64700, "Crown Lesson: Riding Speed"],
  ])("flags %i %s as outside the table", (itemId, itemName) => {
    expect(isUncoveredCrownConsumable(itemId, itemName)).toBe(true)
  })

  test.each([
    [64711, "Crown Fortifying Meal"],
    [64710, "Crown Tri-Restoration Potion"],
    [112427, "Gold Coast Spellcaster Elixir"],
    [112428, "Gold Coast Warrior Elixir"],
  ])("does not flag %i %s, which the table covers", (itemId, itemName) => {
    expect(isUncoveredCrownConsumable(itemId, itemName)).toBe(false)
  })

  test.each([
    [127741, "Earthgore Mask"],
    [21074, "Bewitched Sugar Skulls"],
    [1, "Crowned Nettle"],
  ])("does not flag %i %s, which is not a Crown Store item", (itemId, itemName) => {
    expect(isUncoveredCrownConsumable(itemId, itemName)).toBe(false)
  })
})
