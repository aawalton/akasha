import { expect, test } from "bun:test"
import type { CharacterKnowledge } from "akasha/temper/commands/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import { buildCliEvalEnv } from "akasha/temper/commands/inventory-eval-env/inventory-eval-env.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items-core/inventory-types/inventory-types.module.code.ts"
import { STYLE_TO_CHAPTERS } from "akasha/temper/items-core/motif-chapter-set/motif-chapter-set.module.code.ts"

const STYLED = 1

const CHAPTERS_OF_STYLED = STYLE_TO_CHAPTERS[STYLED] ?? []

function knowing(over: Partial<CharacterKnowledge>): CharacterKnowledge {
  return {
    id: "111",
    name: "Ayrenn",
    recipeResultItemIds: new Set<number>(),
    motifChaptersByStyle: new Map(),
    motifKnowledgeByStyle: new Map(),
    unlockedScriptIds: new Set<number>(),
    skillLineRanksByEsoLineId: new Map<number, number>(),
    researchedTraitsByCraftingType: new Map<number, ReadonlyMap<string, boolean>>(),
    curseState: undefined,
    ...over,
  }
}

function envOf(one: CharacterKnowledge) {
  return buildCliEvalEnv({
    charactersById: new Map([[one.id, one]]),
    characterPriority: [one.id],
    wantedConsumables: {},
  })
}

test("a recipe a character knows reads as known, and one it does not reads as unknown", () => {
  const env = envOf(knowing({ recipeResultItemIds: new Set([41]) }))
  expect(env.isKnownByCharacter({ kind: "recipe", resultItemId: 41 }, "111")).toBe(true)
  expect(env.isKnownByCharacter({ kind: "recipe", resultItemId: 42 }, "111")).toBe(false)
})

test("a character nobody has heard of knows nothing", () => {
  const env = envOf(knowing({ recipeResultItemIds: new Set([41]) }))
  expect(env.isKnownByCharacter({ kind: "recipe", resultItemId: 41 }, "999")).toBe(false)
})

test("any character knowing it is enough", () => {
  const env = envOf(knowing({ unlockedScriptIds: new Set([5]) }))
  expect(env.isKnownByAnyCharacter({ kind: "script", scriptId: 5 })).toBe(true)
  expect(env.isKnownByAnyCharacter({ kind: "script", scriptId: 6 })).toBe(false)
})

test("a motif with no chapter named is known only where every chapter of it is known", () => {
  const all = envOf(
    knowing({ motifKnowledgeByStyle: new Map([[STYLED, new Set(CHAPTERS_OF_STYLED)]]) })
  )
  expect(all.isKnownByCharacter({ kind: "motif", styleId: STYLED, chapterId: null }, "111")).toBe(
    CHAPTERS_OF_STYLED.length > 0
  )
  const some = envOf(knowing({ motifKnowledgeByStyle: new Map([[STYLED, new Set([1])]]) }))
  expect(some.isKnownByCharacter({ kind: "motif", styleId: STYLED, chapterId: null }, "111")).toBe(
    CHAPTERS_OF_STYLED.length === 1
  )
})

test("a style the chapter table has never heard of is known by nobody", () => {
  const env = envOf(knowing({ motifKnowledgeByStyle: new Map([[999999, new Set([1])]]) }))
  expect(env.isKnownByCharacter({ kind: "motif", styleId: 999999, chapterId: null }, "111")).toBe(
    false
  )
})

test("a consumable is known by nobody off the game", () => {
  const env = envOf(knowing({}))
  expect(env.isKnownByAnyCharacter({ kind: "consumable", itemId: 1 })).toBe(false)
})

test("what only the running game knows is answered unknown rather than guessed", () => {
  const env = envOf(knowing({}))
  expect(env.getCurrentCharacter()).toBe("unknown")
  expect(env.getConsumableStock(1, "111")).toBe("unknown")
})

const CLOTHIER = 2

test("a trait comes from the characters capture, and one nothing names reads as unknown", () => {
  const env = envOf(
    knowing({
      researchedTraitsByCraftingType: new Map([
        [
          CLOTHIER,
          new Map([
            ["sharpened", true],
            ["nirnhoned", false],
          ]),
        ],
      ]),
    })
  )
  expect(env.isTraitResearched("111", CLOTHIER, "Sharpened")).toBe(true)
  expect(env.isTraitResearched("111", CLOTHIER, "Nirnhoned")).toBe(false)
  expect(env.isTraitResearched("111", CLOTHIER, "Training")).toBe("unknown")
  expect(env.isTraitResearched("111", 1, "Sharpened")).toBe("unknown")
  expect(env.isTraitResearched("999", CLOTHIER, "Sharpened")).toBe("unknown")
})

function envOverInventory(db: InventoryDatabase) {
  return buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: {},
    db,
  })
}

const EMPTY_META = { displayName: "", worldName: "", lastFullScan: 0 }

const BLACKSMITHING = 1

test("a crafting rank comes from the inventory capture and is read against its cap", () => {
  const env = envOverInventory({
    locations: {},
    meta: EMPTY_META,
    craftingLevels: { "111": { [BLACKSMITHING]: 9 }, "222": { [BLACKSMITHING]: 10 } },
  })
  expect(env.isCraftingRankBelowCap("111", BLACKSMITHING)).toBe(true)
  expect(env.isCraftingRankBelowCap("222", BLACKSMITHING)).toBe(false)
  expect(env.isCraftingRankBelowCap("333", BLACKSMITHING)).toBe("unknown")
})

test("the transmute crystal figures come from the inventory capture", () => {
  expect(envOf(knowing({})).getTransmuteCrystalCap()).toBe("unknown")
  const env = envOverInventory({
    locations: {},
    meta: EMPTY_META,
    transmuteCrystalAmount: 400,
    transmuteCrystalCap: 1000,
  })
  expect(env.getTransmuteCrystalAmount()).toBe(400)
  expect(env.getTransmuteCrystalCap()).toBe(1000)
})

test("a container names its cooldown group, and a cooldown nothing records reads as expired", () => {
  const env = envOverInventory({
    meta: EMPTY_META,
    locations: {
      "111": {
        displayName: "Ayrenn",
        lastScanned: 0,
        bags: {
          1: {
            1: {
              itemId: 77,
              itemName: "Rewards for the Worthy",
              itemLink: "",
              quality: 1,
              filterType: 1,
              itemType: 1,
              traitType: 0,
              requiredLevel: 1,
              requiredCP: 0,
              stackCount: 1,
              isContainer: true,
            },
          },
        },
      },
    },
    openCooldowns: { "rftw": Date.now() + 60_000 },
  })
  expect(env.getCooldownGroup(77)).toBe("rftw")
  expect(env.getCooldownGroup(78)).toBeNull()
  expect(env.isCooldownExpired("rftw")).toBe(false)
  expect(env.isCooldownExpired("undaunted")).toBe(true)
})

test("a skill line rank comes from the characters capture, named by its temper id", () => {
  const env = envOf(knowing({ skillLineRanksByEsoLineId: new Map([[111, 7]]) }))
  expect(env.getCharacterSkillLineRanks("111", "world-legerdemain")).toEqual({
    currentRank: 7,
    maxRank: 20,
  })
})

test("a skill line the capture never names reads as absent rather than unknown", () => {
  const env = envOf(knowing({ skillLineRanksByEsoLineId: new Map([[111, 7]]) }))
  expect(env.getCharacterSkillLineRanks("111", "guild-thieves-guild")).toBeUndefined()
  expect(env.getCharacterSkillLineRanks("111", "not-a-skill-line")).toBeUndefined()
})

test("a curse state comes from the characters capture", () => {
  expect(envOf(knowing({ curseState: "werewolf" })).getCharacterCurseState("111")).toBe("werewolf")
  expect(envOf(knowing({})).getCharacterCurseState("111")).toBeUndefined()
})

test("whether a character can level a morph is answered unknown off the game", () => {
  expect(envOf(knowing({})).getCharacterCanLevelMorphs("111")).toBe("unknown")
})

test("the characters and their order are answered from what was read", () => {
  const env = envOf(knowing({}))
  expect(env.getAllCharacters()).toEqual(["111"])
  expect(env.getCharacterPriority()).toEqual(["111"])
})
