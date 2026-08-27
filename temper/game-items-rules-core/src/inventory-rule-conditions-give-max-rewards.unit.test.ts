import { describe, expect, it } from "bun:test"
import { itemPassesConditions } from "./generated/inventory-rule-conditions.generated"
import { TOTAL_SCRIPT_COUNT } from "./generated/scribing-total-script-count.generated"
import { makeItem } from "./inventory-rule-test-utils"
import type { RuleMatcherContext } from "./rule-matcher-context-types"

describe("itemPassesConditions — canGiveMaxRewards", () => {
  function fullKnown(): Set<number> {
    const s = new Set<number>()
    for (let i = 1; i <= TOTAL_SCRIPT_COUNT; i++) s.add(i)
    return s
  }

  function partialKnown(n: number): Set<number> {
    const s = new Set<number>()
    for (let i = 1; i <= n; i++) s.add(i)
    return s
  }

  function makeCtx(
    openCooldowns: Record<string, number>,
    knownScripts: Record<string, Set<number>> = {}
  ): RuleMatcherContext {
    return {
      wantedEquipment: [],
      wantedCompanionEquipment: [],
      wantedConsumables: new Map(),
      consumableStock: new Map(),
      bankStock: new Map(),
      characterLevels: new Map(),
      knownRecipesByCharacter: new Map(),
      knownMotifsByCharacter: new Map(),
      knownMotifsByStyleIdByCharacter: new Map(),
      knownScriptsByCharacter: new Map(Object.entries(knownScripts)),
      researchedTraitsByCharacter: new Map(),
      characterPriority: Object.keys(knownScripts),
      craftingLevels: new Map(),
      openCooldowns: new Map(Object.entries(openCooldowns)),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }
  }

  it("passes through when isContainer is undefined", () => {
    const item = makeItem({ itemName: "Coffer" })
    expect(itemPassesConditions(item, { canGiveMaxRewards: "can-give-max-rewards" })).toBe(true)
  })

  it("rejects non-containers", () => {
    const item = makeItem({ itemName: "Iron Ore", isContainer: false })
    expect(itemPassesConditions(item, { canGiveMaxRewards: "can-give-max-rewards" })).toBe(false)
  })

  it("rejects RFTW container while RFTW cooldown is active", () => {
    const item = makeItem({ itemName: "Rewards for the Worthy", isContainer: true })
    const ctx = makeCtx({ rftw: Date.now() + 60_000 }, { c1: fullKnown() })
    expect(itemPassesConditions(item, { canGiveMaxRewards: "can-give-max-rewards" }, ctx)).toBe(
      false
    )
  })

  it("passes non-RFTW cooldown-group container on cooldown when at least one char knows all scripts", () => {
    const item = makeItem({ itemName: "Imperial City Coffer", isContainer: true })
    const ctx = makeCtx(
      { "imperial-city": Date.now() + 60_000 },
      { c1: fullKnown(), c2: partialKnown(5) }
    )
    expect(itemPassesConditions(item, { canGiveMaxRewards: "can-give-max-rewards" }, ctx)).toBe(
      true
    )
  })

  it("rejects non-RFTW cooldown-group container on cooldown when no char knows all scripts", () => {
    const item = makeItem({ itemName: "Imperial City Coffer", isContainer: true })
    const ctx = makeCtx({ "imperial-city": Date.now() + 60_000 }, { c1: partialKnown(5) })
    expect(itemPassesConditions(item, { canGiveMaxRewards: "can-give-max-rewards" }, ctx)).toBe(
      false
    )
  })

  it("rejects off-cooldown non-RFTW group container when one char knows all but another doesn't", () => {
    const item = makeItem({ itemName: "Imperial City Coffer", isContainer: true })
    const ctx = makeCtx({}, { c1: fullKnown(), c2: partialKnown(5) })
    expect(itemPassesConditions(item, { canGiveMaxRewards: "can-give-max-rewards" }, ctx)).toBe(
      false
    )
  })

  it("passes off-cooldown non-RFTW group container when all chars know all scripts", () => {
    const item = makeItem({ itemName: "Imperial City Coffer", isContainer: true })
    const ctx = makeCtx({}, { c1: fullKnown(), c2: fullKnown() })
    expect(itemPassesConditions(item, { canGiveMaxRewards: "can-give-max-rewards" }, ctx)).toBe(
      true
    )
  })

  it("passes off-cooldown non-RFTW group container when no char knows all scripts", () => {
    const item = makeItem({ itemName: "Imperial City Coffer", isContainer: true })
    const ctx = makeCtx({}, { c1: partialKnown(5), c2: partialKnown(2) })
    expect(itemPassesConditions(item, { canGiveMaxRewards: "can-give-max-rewards" }, ctx)).toBe(
      true
    )
  })

  it("passes container outside any cooldown group regardless of script knowledge", () => {
    const item = makeItem({ itemName: "Random Loot Box", isContainer: true })
    const ctx = makeCtx({}, { c1: fullKnown(), c2: partialKnown(2) })
    expect(itemPassesConditions(item, { canGiveMaxRewards: "can-give-max-rewards" }, ctx)).toBe(
      true
    )
  })

  it("passes RFTW container off-cooldown", () => {
    const item = makeItem({ itemName: "Rewards for the Worthy", isContainer: true })
    const ctx = makeCtx({}, { c1: fullKnown() })
    expect(itemPassesConditions(item, { canGiveMaxRewards: "can-give-max-rewards" }, ctx)).toBe(
      true
    )
  })
})
