import { describe, expect, it } from "bun:test"
import type { ClassifiedInventoryItem } from "@temper/game-items-rules-core/inventory-rule-matcher-types"
import { makeContext, makeItem } from "@temper/game-items-rules-core/inventory-rule-test-utils"
import type { ItemKey } from "@temper/game-items-rules-core/use-destination-types"
import { buildItemIdToCooldownGroup, buildWebEvalEnv } from "./web-eval-env"

function classify(itemOverrides: Parameters<typeof makeItem>[0] = {}): ClassifiedInventoryItem {
  return {
    item: makeItem(itemOverrides),
    locationKey: "1001",
    locationDisplayName: "Azara",
    nodeIds: ["miscellaneous", "other"],
    bagId: 1,
  }
}

const RECIPE_KEY: ItemKey = { kind: "recipe", resultItemId: 1234 }
const FACTS = { equipType: 5, traitType: 12, quality: 4 } as const

describe("buildWebEvalEnv (no context)", () => {
  it("returns 'unknown' for every method when ctx is undefined", () => {
    const env = buildWebEvalEnv(undefined)

    expect(env.isKnownByCharacter(RECIPE_KEY, "char-a")).toBe("unknown")
    expect(env.isKnownByAnyCharacter(RECIPE_KEY)).toBe("unknown")
    expect(env.isTraitResearched("char-a", 1, "divines")).toBe("unknown")
    expect(env.isCraftingRankBelowCap("char-a", 1)).toBe("unknown")
    expect(env.matchesWantedEquipment(FACTS)).toBe("unknown")
    expect(env.matchesWantedCompanionEquipment(FACTS)).toBe("unknown")
    expect(env.isCompanionWornSlotFilled("Bastian", FACTS)).toBe("unknown")
    expect(env.findCharacterForWantedEquipment(FACTS)).toBe("unknown")
    expect(env.findCompanionForWantedEquipment(FACTS)).toBe("unknown")
    expect(env.getConsumableStock(1, "char-a")).toBe("unknown")
    expect(env.getConsumableWanters(1)).toBe("unknown")
    expect(env.getBankStock(1)).toBe("unknown")
    expect(env.getCooldownGroup(1)).toBe("unknown")
    expect(env.isCooldownExpired("group")).toBe("unknown")
    expect(env.getKnownScripts("char-a")).toBe("unknown")
    expect(env.getTotalScriptCount()).toBe("unknown")
    expect(env.getCharacterPriority()).toBe("unknown")
    expect(env.getCurrentCharacter()).toBe("unknown")
    expect(env.getAllCharacters()).toBe("unknown")
  })
})

describe("buildWebEvalEnv (with context)", () => {
  it("answers isKnownByCharacter from knownRecipesByCharacter", () => {
    const ctx = makeContext({ "char-a": [42, 43], "char-b": [99] })
    const env = buildWebEvalEnv(ctx)

    expect(env.isKnownByCharacter({ kind: "recipe", resultItemId: 42 }, "char-a")).toBe(true)
    expect(env.isKnownByCharacter({ kind: "recipe", resultItemId: 99 }, "char-a")).toBe(false)
    expect(env.isKnownByCharacter({ kind: "recipe", resultItemId: 99 }, "char-b")).toBe(true)
    expect(env.isKnownByCharacter({ kind: "recipe", resultItemId: 42 }, "char-c")).toBe(false)
  })

  it("answers isKnownByAnyCharacter across the whole priority list", () => {
    const ctx = makeContext({ "char-a": [42], "char-b": [99] })
    const env = buildWebEvalEnv(ctx)

    expect(env.isKnownByAnyCharacter({ kind: "recipe", resultItemId: 42 })).toBe(true)
    expect(env.isKnownByAnyCharacter({ kind: "recipe", resultItemId: 100 })).toBe(false)
  })

  it("returns first matching character for findCharacterForWantedEquipment", () => {
    const ctx = makeContext({})
    ctx.wantedEquipment = [
      { esoCharId: "char-a", equipType: 5, traitType: 12, quality: 4 },
      { esoCharId: "char-b", equipType: 5, traitType: 12, quality: 4 },
    ]
    const env = buildWebEvalEnv(ctx)
    expect(env.findCharacterForWantedEquipment(FACTS)).toBe("char-a")
  })

  it("returns undefined for findCharacterForWantedEquipment when no signature matches", () => {
    const ctx = makeContext({})
    const env = buildWebEvalEnv(ctx)
    expect(env.findCharacterForWantedEquipment(FACTS)).toBeUndefined()
  })

  it("answers consumable stock from the per-character map", () => {
    const ctx = makeContext({})
    ctx.consumableStock.set(500, new Map([["char-a", 150]]))
    const env = buildWebEvalEnv(ctx)
    expect(env.getConsumableStock(500, "char-a")).toBe(150)
    expect(env.getConsumableStock(500, "char-b")).toBe(0)
    expect(env.getConsumableStock(999, "char-a")).toBe(0)
  })

  it("answers bank stock from bankStock map", () => {
    const ctx = makeContext({})
    ctx.bankStock.set(42, 200)
    const env = buildWebEvalEnv(ctx)
    expect(env.getBankStock(42)).toBe(200)
    expect(env.getBankStock(99)).toBe(0)
  })

  it("answers isTraitResearched from the per-character research map", () => {
    const ctx = makeContext({})
    ctx.researchedTraitsByCharacter.set("char-a", new Map([[1, new Map([["divines", true]])]]))
    const env = buildWebEvalEnv(ctx)
    expect(env.isTraitResearched("char-a", 1, "divines")).toBe(true)
    expect(env.isTraitResearched("char-b", 1, "divines")).toBe("unknown")
    expect(env.isTraitResearched("char-a", 1, "infused")).toBe("unknown")
  })

  it("answers isCraftingRankBelowCap by combining craftingLevels with the cap table", () => {
    const ctx = makeContext({})
    ctx.craftingLevels.set("char-a", new Map([[1, 5]]))
    const env = buildWebEvalEnv(ctx)
    expect(env.isCraftingRankBelowCap("char-a", 1)).toBe(true)
    expect(env.isCraftingRankBelowCap("char-a", 2)).toBe("unknown")
    expect(env.isCraftingRankBelowCap("char-b", 1)).toBe("unknown")
  })

  it("answers isCooldownExpired against Date.now via openCooldowns", () => {
    const ctx = makeContext({})
    ctx.openCooldowns.set("rftw", Date.now() + 60_000)
    ctx.openCooldowns.set("daily", Date.now() - 1)
    const env = buildWebEvalEnv(ctx)
    expect(env.isCooldownExpired("rftw")).toBe(false)
    expect(env.isCooldownExpired("daily")).toBe(true)
    expect(env.isCooldownExpired("absent")).toBe(true)
  })

  it("returns null for getCooldownGroup when itemIdToCooldownGroup is empty", () => {
    const env = buildWebEvalEnv(makeContext({}))
    expect(env.getCooldownGroup(1)).toBe(null)
  })

  it("returns the mapped group for getCooldownGroup when itemIdToCooldownGroup is provided", () => {
    const env = buildWebEvalEnv(makeContext({}), {
      itemIdToCooldownGroup: new Map([[42, "rftw"]]),
    })
    expect(env.getCooldownGroup(42)).toBe("rftw")
    expect(env.getCooldownGroup(99)).toBe(null)
  })

  it("getCurrentCharacter is always 'unknown' for the web matcher", () => {
    const env = buildWebEvalEnv(makeContext({ "char-a": [] }))
    expect(env.getCurrentCharacter()).toBe("unknown")
  })

  it("getAllCharacters aggregates from priority + every per-character map", () => {
    const ctx = makeContext({ "char-a": [], "char-b": [] }, ["char-a", "char-b"])
    ctx.craftingLevels.set("char-c", new Map())
    const env = buildWebEvalEnv(ctx)
    const chars = env.getAllCharacters()
    expect(chars).not.toBe("unknown")
    if (chars !== "unknown") {
      expect(chars).toContain("char-a")
      expect(chars).toContain("char-b")
      expect(chars).toContain("char-c")
    }
  })
})

describe("buildItemIdToCooldownGroup", () => {
  it("returns an empty map when no items are containers", () => {
    const items = [classify({ itemId: 1, itemType: 1 }), classify({ itemId: 2, itemType: 2 })]
    expect(buildItemIdToCooldownGroup(items).size).toBe(0)
  })

  it("returns an empty map when containers have unknown names", () => {
    const items = [
      classify({ itemId: 1, itemType: 18, isContainer: true, itemName: "Unknown Box" }),
    ]
    expect(buildItemIdToCooldownGroup(items).size).toBe(0)
  })

  it("populates itemId → groupKey for containers with recognized names", () => {
    const items = [
      classify({
        itemId: 42,
        itemType: 18,
        isContainer: true,
        itemName: "Rewards for the Worthy",
      }),
    ]
    const result = buildItemIdToCooldownGroup(items)
    expect(result.size).toBe(1)
    expect(result.get(42)).toBeTruthy()
  })
})
