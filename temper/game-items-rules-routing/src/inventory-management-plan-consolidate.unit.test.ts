import { describe, expect, it } from "bun:test"
import { requireFirst } from "../../../shared/utils-narrow/src/require-first"
import { compileCategoryRuleToOrdered } from "@temper/game-items-rules-core/inventory-rule-compiler"
import type { RuleMatcherContext } from "@temper/game-items-rules-core/rule-matcher-context-types"
import { buildManagementPlan } from "./inventory-management-plan"
import {
  ESO_BAG_BACKPACK,
  makeAffected,
  makeInventory,
  makeItem,
  makeLocation,
  makeRule,
} from "./inventory-management-plan.test-utils"

function requireAt<T>(arr: readonly T[], i: number, label?: string): T {
  return requireFirst(arr.slice(i, i + 1), label ?? `index ${i}`)
}

describe("buildManagementPlan – consolidate routing", () => {
  const charA = "1001"
  const charB = "1002"

  function makeConsolidateContext(): RuleMatcherContext {
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
      characterPriority: [charA, charB],
      craftingLevels: new Map(),
      openCooldowns: new Map(),
      transmuteCrystalCap: undefined,
      transmuteCrystalAmount: undefined,
    }
  }

  it("routes non-primary char → guild-bank through bank via primary", () => {
    const item = makeItem("Guild Deposit")
    const rule = makeRule("r1", "move-to", "guild-bank")
    const affected = makeAffected(item, charB, "Bastian", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charB]: makeLocation(
          "Bastian",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      makeConsolidateContext()
    )
    expect(plan.sessions.length).toBeGreaterThanOrEqual(2)
    expect(requireAt(plan.sessions, 0).characterId).toBe(charB)
    expect(requireAt(requireAt(plan.sessions, 0).venues, 0).venue).toBe("bank")
    expect(requireAt(plan.sessions, 1).characterId).toBe(charA)
    const charAVenues = requireAt(plan.sessions, 1).venues.map((v) => v.venue)
    expect(charAVenues).toContain("bank")
    expect(charAVenues).toContain("guild-bank")
  })

  it("routes primary char → guild-bank directly", () => {
    const item = makeItem("Guild Deposit")
    const rule = makeRule("r1", "move-to", "guild-bank")
    const affected = makeAffected(item, charA, "Azara", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        [charB]: makeLocation("Bastian", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      makeConsolidateContext()
    )
    expect(plan.sessions).toHaveLength(1)
    expect(requireAt(plan.sessions, 0).characterId).toBe(charA)
    expect(requireAt(requireAt(plan.sessions, 0).venues, 0).venue).toBe("guild-bank")
  })

  it("routes bank → guild-bank using primary char", () => {
    const item = makeItem("Guild Deposit")
    const rule = makeRule("r1", "move-to", "guild-bank")
    const affected = makeAffected(item, "Bank", "Bank", 6)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charB]: makeLocation("Bastian", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        Bank: makeLocation("Bank", { 6: { 0: item } }, { 6: 200 }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      makeConsolidateContext()
    )
    expect(plan.sessions).toHaveLength(1)
    expect(requireAt(plan.sessions, 0).characterId).toBe(charA)
    const venues = requireAt(plan.sessions, 0).venues.map((v) => v.venue)
    expect(venues).toContain("bank")
    expect(venues).toContain("guild-bank")
  })

  it("routes non-primary char → house-storage through bank via primary", () => {
    const item = makeItem("House Item")
    const chestKey = "HouseBank:42:123"
    const rule = makeRule("r1", "move-to", "house-storage:123")
    const affected = makeAffected(item, charB, "Bastian", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charB]: makeLocation(
          "Bastian",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
        [chestKey]: makeLocation("My Chest", { 1: {} }, { 1: 100 }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      makeConsolidateContext()
    )
    expect(plan.sessions.length).toBeGreaterThanOrEqual(2)
    expect(requireAt(plan.sessions, 0).characterId).toBe(charB)
    expect(requireAt(plan.sessions, 1).characterId).toBe(charA)
    const charAVenues = requireAt(plan.sessions, 1).venues.map((v) => v.venue)
    expect(charAVenues).toContain("house-storage")
  })

  it("routes non-primary char → furniture-vault through bank via primary", () => {
    const item = makeItem("Jubilee Banner")
    const rule = makeRule("r1", "move-to", "furniture-vault")
    const affected = makeAffected(item, charB, "Bastian", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charB]: makeLocation(
          "Bastian",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
        FurnitureVault: makeLocation("Furniture Vault", { 1: {} }, { 1: 100 }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      makeConsolidateContext()
    )
    expect(plan.sessions.length).toBeGreaterThanOrEqual(2)
    expect(requireAt(plan.sessions, 0).characterId).toBe(charB)
    expect(requireAt(requireAt(plan.sessions, 0).venues, 0).venue).toBe("bank")
    expect(requireAt(plan.sessions, 1).characterId).toBe(charA)
    const charAVenues = requireAt(plan.sessions, 1).venues.map((v) => v.venue)
    expect(charAVenues).toContain("bank")
    expect(charAVenues).toContain("house-storage")
  })

  it("routes primary char → furniture-vault directly", () => {
    const item = makeItem("Jubilee Banner")
    const rule = makeRule("r1", "move-to", "furniture-vault")
    const affected = makeAffected(item, charA, "Azara", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation(
          "Azara",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        [charB]: makeLocation("Bastian", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        FurnitureVault: makeLocation("Furniture Vault", { 1: {} }, { 1: 100 }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      makeConsolidateContext()
    )
    expect(plan.sessions).toHaveLength(1)
    expect(requireAt(plan.sessions, 0).characterId).toBe(charA)
    expect(requireAt(requireAt(plan.sessions, 0).venues, 0).venue).toBe("house-storage")
  })

  it("preserves specific guild-bank venueDetail through cross-char path", () => {
    const guildKey = "Fighters Guild"
    const item = makeItem("Guild Deposit")
    const rule = makeRule("r1", "move-to", `guild-bank:${guildKey}`)
    const affected = makeAffected(item, charB, "Bastian", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charB]: makeLocation(
          "Bastian",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
        Bank: makeLocation("Bank", { 6: {} }, { 6: 200 }),
        [guildKey]: makeLocation("Fighters Guild", { 1: {} }, { 1: 200 }),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan(
      [rule].map(compileCategoryRuleToOrdered),
      [],
      map,
      inventory,
      makeConsolidateContext()
    )
    const charASession = plan.sessions.find((s) => s.characterId === charA)
    if (charASession === undefined) throw new Error("expected charASession to be defined")
    const guildVenue = charASession.venues.find((v) => v.venue === "guild-bank")
    if (guildVenue === undefined) throw new Error("expected guildVenue to be defined")
    expect(guildVenue.label).toBe("Fighters Guild")
    expect(guildVenue.venueCategory).toBe("Guild Bank")
  })

  it("falls back to direct routing when no characterPriority", () => {
    const item = makeItem("Guild Deposit")
    const rule = makeRule("r1", "move-to", "guild-bank")
    const affected = makeAffected(item, charB, "Bastian", ESO_BAG_BACKPACK)
    const map = new Map([["r1", [affected]]])

    const inventory = makeInventory(
      {
        [charA]: makeLocation("Azara", { [ESO_BAG_BACKPACK]: {} }, { [ESO_BAG_BACKPACK]: 200 }),
        [charB]: makeLocation(
          "Bastian",
          { [ESO_BAG_BACKPACK]: { 0: item } },
          { [ESO_BAG_BACKPACK]: 200 }
        ),
      },
      { [charA]: { displayName: "Azara" }, [charB]: { displayName: "Bastian" } }
    )

    const plan = buildManagementPlan([rule].map(compileCategoryRuleToOrdered), [], map, inventory)
    expect(plan.sessions).toHaveLength(1)
    expect(requireAt(plan.sessions, 0).characterId).toBe(charB)
    expect(requireAt(requireAt(plan.sessions, 0).venues, 0).venue).toBe("guild-bank")
  })
})
