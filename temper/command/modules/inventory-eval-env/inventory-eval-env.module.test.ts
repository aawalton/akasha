import { expect, test } from "bun:test"
import type { CharacterKnowledge } from "akasha/temper/command/modules/inventory-characters-reading/inventory-characters-reading.module.code.ts"
import { buildCliEvalEnv } from "akasha/temper/command/modules/inventory-eval-env/inventory-eval-env.module.code.ts"
import type { InventoryDatabase } from "akasha/temper/items/core/modules/inventory-types/inventory-types.module.code.ts"
import { STYLE_TO_CHAPTERS } from "akasha/temper/items/core/modules/motif-chapter-set/motif-chapter-set.module.code.ts"
import { TOTAL_SCRIPT_COUNT } from "akasha/temper/items/rules/core/modules/scribing-total-script-count/scribing-total-script-count.module.code.ts"
import { skillLines } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import type { MorphCharacterCompletion } from "akasha/temper/player/skill-morph/access/modules/morph-completion-shapes/morph-completion-shapes.module.code.ts"
import { morphableSkillsByLine } from "akasha/temper/player/skill-morph/modules/morphable-skills/morphable-skills.module.code.ts"

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
    morphCompletion: undefined,
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

const TWO_HANDED_ESO_LINE_ID = skillLines.data["weapon-two-handed"].esoSkillLineId

const TWO_HANDED_SKILLS = morphableSkillsByLine.get("weapon-two-handed") ?? []

function twoHandedAt(rank: number): MorphCharacterCompletion {
  const skills = Object.fromEntries(
    TWO_HANDED_SKILLS.map((one, at) => [
      at + 1,
      {
        base: { name: one.baseName, rank },
        morph1: { name: one.morph1Name, rank },
        morph2: { name: one.morph2Name, rank },
      },
    ])
  )
  return { classId: 1, raceId: 1, skillLineProgress: { [TWO_HANDED_ESO_LINE_ID]: { skills } } }
}

test("whether a character can level a morph comes from the characters capture", () => {
  expect(TWO_HANDED_SKILLS.length).toBeGreaterThan(0)
  const leveling = envOf(knowing({ morphCompletion: twoHandedAt(2) }))
  expect(leveling.getCharacterCanLevelMorphs("111")).toBe(true)
  const maxed = envOf(knowing({ morphCompletion: twoHandedAt(4) }))
  expect(maxed.getCharacterCanLevelMorphs("111")).toBe(false)
})

test("whether a character can level a morph is unknown where the capture holds no morphs", () => {
  expect(envOf(knowing({})).getCharacterCanLevelMorphs("111")).toBe("unknown")
  const held = envOf(knowing({ morphCompletion: twoHandedAt(2) }))
  expect(held.getCharacterCanLevelMorphs("999")).toBe("unknown")
})

test("the characters and their order are answered from what was read", () => {
  const env = envOf(knowing({}))
  expect(env.getAllCharacters()).toEqual(["111"])
  expect(env.getCharacterPriority()).toEqual(["111"])
})

test("the characters wanting a consumable come from the compiled config", () => {
  const empty = buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: {},
  })
  expect(empty.getConsumableWanters(64509)).toEqual([])

  const filled = buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: { "64509": ["111", "222"] },
  })
  expect(filled.getConsumableWanters(64509)).toEqual(["111", "222"])
  expect(filled.getConsumableWanters(68235)).toEqual([])
})

test("wanters read the same off a lua table as off an array", () => {
  const env = buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: { "64509": { "1": "111", "2": "222" } },
  })
  expect(env.getConsumableWanters(64509)).toEqual(["111", "222"])
})

function stackOf(itemId: number, stackCount: number) {
  return {
    itemId,
    itemName: "",
    itemLink: "",
    quality: 1,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount,
  }
}

test("a wanted consumable's stock is counted per character off the inventory capture", () => {
  const env = buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: { "64509": ["111", "222"] },
    db: {
      meta: EMPTY_META,
      locations: {
        "111": {
          displayName: "Ayrenn",
          lastScanned: 0,
          bags: { 1: { 1: stackOf(64509, 7), 2: stackOf(64509, 5), 3: stackOf(68235, 2) } },
        },
        "222": { displayName: "Naryu", lastScanned: 0, bags: { 1: { 1: stackOf(64509, 3) } } },
        Bank: { displayName: "Bank", lastScanned: 0, bags: { 1: { 1: stackOf(64509, 99) } } },
      },
    },
  })
  expect(env.getConsumableStock(64509, "111")).toBe(12)
  expect(env.getConsumableStock(64509, "222")).toBe(3)
  expect(env.getConsumableStock(64509, "333")).toBe(0)
  expect(env.getConsumableStock(68235, "111")).toBe(0)
})

test("stock is answered unknown where no inventory capture was handed in", () => {
  const env = buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: { "64509": ["111"] },
  })
  expect(env.getConsumableStock(64509, "111")).toBe("unknown")
})

test("bank stock is counted off the inventory capture, and the bank alone", () => {
  const env = buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: {},
    db: {
      meta: EMPTY_META,
      locations: {
        Bank: {
          displayName: "Bank",
          lastScanned: 0,
          bags: { 1: { 1: stackOf(64509, 40), 2: stackOf(64509, 2) } },
        },
        "111": { displayName: "Ayrenn", lastScanned: 0, bags: { 1: { 1: stackOf(64509, 9) } } },
      },
    },
  })
  expect(env.getBankStock(64509)).toBe(42)
  expect(env.getBankStock(68235)).toBe(0)
})

test("bank stock is answered unknown where no inventory capture was handed in", () => {
  const env = buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: {},
  })
  expect(env.getBankStock(64509)).toBe("unknown")
})

test("how many scripts there are comes from the table rather than reading unknown", () => {
  expect(envOf(knowing({})).getTotalScriptCount()).toBe(TOTAL_SCRIPT_COUNT)
  expect(TOTAL_SCRIPT_COUNT).toBeGreaterThan(0)
})

const RING = { equipType: 12, traitType: 1, quality: 4 }

test("wanted equipment is matched against the compiled list, and names the character", () => {
  const env = buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: {},
    wantedEquipment: [{ esoCharId: "111", ...RING }],
  })
  expect(env.matchesWantedEquipment(RING)).toBe(true)
  expect(env.findCharacterForWantedEquipment(RING)).toBe("111")
  expect(env.matchesWantedEquipment({ ...RING, quality: 5 })).toBe(false)
  expect(env.findCharacterForWantedEquipment({ ...RING, quality: 5 })).toBeUndefined()
})

test("a compiled list that is there and empty answers false rather than unknown", () => {
  const env = buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: {},
    wantedEquipment: [],
    wantedCompanionEquipment: [],
  })
  expect(env.matchesWantedEquipment(RING)).toBe(false)
  expect(env.matchesWantedCompanionEquipment(RING)).toBe(false)
})

test("wanted equipment is answered unknown where no compiled list was handed in", () => {
  const env = buildCliEvalEnv({
    charactersById: new Map(),
    characterPriority: [],
    wantedConsumables: {},
  })
  expect(env.matchesWantedEquipment(RING)).toBe("unknown")
  expect(env.matchesWantedCompanionEquipment(RING)).toBe("unknown")
  expect(env.findCharacterForWantedEquipment(RING)).toBe("unknown")
  expect(env.findCompanionForWantedEquipment(RING)).toBe("unknown")
})
