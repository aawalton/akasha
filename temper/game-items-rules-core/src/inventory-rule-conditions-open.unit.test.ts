import { describe, expect, it } from "bun:test"
import { itemPassesConditions } from "./generated/inventory-rule-conditions.generated"
import { makeItem } from "./inventory-rule-test-utils"
import type { RuleMatcherContext } from "./rule-matcher-context-types"

describe("itemPassesConditions — canOpen", () => {
  function makeOpenContext(openCooldowns: Record<string, number>): RuleMatcherContext {
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
      knownScriptsByCharacter: new Map(),
      researchedTraitsByCharacter: new Map(),
      characterPriority: [],
      craftingLevels: new Map(),
      openCooldowns: new Map(Object.entries(openCooldowns)),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }
  }

  it("passes through when isContainer is undefined (pre-capture data)", () => {
    const item = makeItem({ itemName: "Mystery Box" })
    expect(itemPassesConditions(item, { canOpen: "can-open" })).toBe(true)
  })

  it("rejects non-containers", () => {
    const item = makeItem({ itemName: "Iron Ore", isContainer: false })
    expect(itemPassesConditions(item, { canOpen: "can-open" })).toBe(false)
  })

  it("passes containers without a cooldown group when context has no cooldown", () => {
    const item = makeItem({ itemName: "Random Loot Box", isContainer: true })
    const ctx = makeOpenContext({})
    expect(itemPassesConditions(item, { canOpen: "can-open" }, ctx)).toBe(true)
  })

  it("passes containers without a cooldown group even with unrelated active cooldowns", () => {
    const item = makeItem({ itemName: "Some Box", isContainer: true })
    const ctx = makeOpenContext({ rftw: Date.now() + 60_000 })
    expect(itemPassesConditions(item, { canOpen: "can-open" }, ctx)).toBe(true)
  })

  it("rejects RFTW container when its cooldown is active", () => {
    const item = makeItem({ itemName: "Rewards for the Worthy", isContainer: true })
    const ctx = makeOpenContext({ rftw: Date.now() + 60_000 })
    expect(itemPassesConditions(item, { canOpen: "can-open" }, ctx)).toBe(false)
  })

  it("passes RFTW container when its cooldown has expired", () => {
    const item = makeItem({ itemName: "Rewards for the Worthy", isContainer: true })
    const ctx = makeOpenContext({ rftw: Date.now() - 60_000 })
    expect(itemPassesConditions(item, { canOpen: "can-open" }, ctx)).toBe(true)
  })

  it("rejects Imperial City coffer when its cooldown is active", () => {
    const item = makeItem({ itemName: "Imperial City Coffer", isContainer: true })
    const ctx = makeOpenContext({ "imperial-city": Date.now() + 60_000 })
    expect(itemPassesConditions(item, { canOpen: "can-open" }, ctx)).toBe(false)
  })

  it("passes Imperial City coffer when only RFTW cooldown is active", () => {
    const item = makeItem({ itemName: "Imperial City Coffer", isContainer: true })
    const ctx = makeOpenContext({ rftw: Date.now() + 60_000 })
    expect(itemPassesConditions(item, { canOpen: "can-open" }, ctx)).toBe(true)
  })

  it("passes container without context (delayed-mirror pass-through)", () => {
    const item = makeItem({ itemName: "Rewards for the Worthy", isContainer: true })
    expect(itemPassesConditions(item, { canOpen: "can-open" })).toBe(true)
  })
})
