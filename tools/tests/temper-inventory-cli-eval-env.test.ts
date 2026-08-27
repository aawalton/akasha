import { describe, expect, it } from "bun:test"
import type { ItemKey } from "../lib/temper-inventory/game-item-types.ts"
import { buildCliEvalEnv } from "../lib/temper-inventory/cli-eval-env.ts"
import type { CharacterKnowledge } from "../lib/temper-inventory/parse-temper-characters.ts"

function makeChar(overrides: Partial<CharacterKnowledge>): CharacterKnowledge {
  return {
    id: "char-a",
    name: "Char A",
    recipeResultItemIds: new Set(),
    motifChaptersByStyle: new Map(),
    motifKnowledgeByStyle: new Map(),
    unlockedScriptIds: new Set(),
    ...overrides,
  }
}

const RECIPE_KEY: ItemKey = { kind: "recipe", resultItemId: 1234 }
const MOTIF_KEY: ItemKey = { kind: "motif", styleId: 15, chapterId: 3 }
const SCRIPT_KEY: ItemKey = { kind: "script", scriptId: 999 }
const FACTS = { equipType: 5, traitType: 12, quality: 4 } as const

describe("buildCliEvalEnv (knowledge)", () => {
  it("answers isKnownByCharacter from per-character knowledge maps", () => {
    const charactersById = new Map<string, CharacterKnowledge>([
      ["char-a", makeChar({ id: "char-a", recipeResultItemIds: new Set([1234, 5678]) })],
      ["char-b", makeChar({ id: "char-b", recipeResultItemIds: new Set([9999]) })],
    ])
    const env = buildCliEvalEnv({
      charactersById,
      characterPriority: ["char-a", "char-b"],
      wantedConsumables: {},
    })

    expect(env.isKnownByCharacter(RECIPE_KEY, "char-a")).toBe(true)
    expect(env.isKnownByCharacter(RECIPE_KEY, "char-b")).toBe(false)
    expect(env.isKnownByCharacter(RECIPE_KEY, "char-c")).toBe(false)
  })

  it("answers isKnownByAnyCharacter across the charactersById map", () => {
    const charactersById = new Map<string, CharacterKnowledge>([
      ["char-a", makeChar({ id: "char-a", recipeResultItemIds: new Set([1234]) })],
      ["char-b", makeChar({ id: "char-b" })],
    ])
    const env = buildCliEvalEnv({
      charactersById,
      characterPriority: ["char-a", "char-b"],
      wantedConsumables: {},
    })

    expect(env.isKnownByAnyCharacter(RECIPE_KEY)).toBe(true)
    expect(env.isKnownByAnyCharacter({ kind: "recipe", resultItemId: 99 })).toBe(false)
  })

  it("routes motif chapter lookups through motifChaptersByStyle", () => {
    const charactersById = new Map<string, CharacterKnowledge>([
      [
        "char-a",
        makeChar({
          motifChaptersByStyle: new Map([[15, new Set([3, 4])]]),
        }),
      ],
    ])
    const env = buildCliEvalEnv({
      charactersById,
      characterPriority: ["char-a"],
      wantedConsumables: {},
    })

    expect(env.isKnownByCharacter(MOTIF_KEY, "char-a")).toBe(true)
    expect(env.isKnownByCharacter({ kind: "motif", styleId: 15, chapterId: 99 }, "char-a")).toBe(
      false
    )
    expect(env.isKnownByCharacter({ kind: "motif", styleId: 99, chapterId: 3 }, "char-a")).toBe(
      false
    )
  })

  it("master books (chapterId null) require every chapter of the style to be known", () => {
    const partial = new Map<string, CharacterKnowledge>([
      ["char-a", makeChar({ motifChaptersByStyle: new Map([[15, new Set([1])]]) })],
    ])
    const envPartial = buildCliEvalEnv({
      charactersById: partial,
      characterPriority: ["char-a"],
      wantedConsumables: {},
    })
    expect(
      envPartial.isKnownByCharacter({ kind: "motif", styleId: 15, chapterId: null }, "char-a")
    ).toBe(false)

    const full = new Map<string, CharacterKnowledge>([
      [
        "char-a",
        makeChar({
          motifChaptersByStyle: new Map([
            [15, new Set([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])],
          ]),
        }),
      ],
    ])
    const envFull = buildCliEvalEnv({
      charactersById: full,
      characterPriority: ["char-a"],
      wantedConsumables: {},
    })
    expect(
      envFull.isKnownByCharacter({ kind: "motif", styleId: 15, chapterId: null }, "char-a")
    ).toBe(true)
  })

  it("racial-motif knowledge (styleId 1..14) is not surfaced here — falls back to false", () => {
    const charactersById = new Map<string, CharacterKnowledge>([
      ["char-a", makeChar({ motifChaptersByStyle: new Map() })],
    ])
    const env = buildCliEvalEnv({
      charactersById,
      characterPriority: ["char-a"],
      wantedConsumables: {},
    })
    expect(env.isKnownByCharacter({ kind: "motif", styleId: 1, chapterId: 4 }, "char-a")).toBe(
      false
    )
    expect(env.isKnownByCharacter({ kind: "motif", styleId: 1, chapterId: null }, "char-a")).toBe(
      false
    )
  })

  it("routes script lookups through unlockedScriptIds", () => {
    const charactersById = new Map<string, CharacterKnowledge>([
      ["char-a", makeChar({ unlockedScriptIds: new Set([999]) })],
    ])
    const env = buildCliEvalEnv({
      charactersById,
      characterPriority: ["char-a"],
      wantedConsumables: {},
    })

    expect(env.isKnownByCharacter(SCRIPT_KEY, "char-a")).toBe(true)
    expect(env.isKnownByCharacter({ kind: "script", scriptId: 1 }, "char-a")).toBe(false)
  })

  it("treats consumables as not 'known'-able at the recipe/motif/script seam", () => {
    const charactersById = new Map<string, CharacterKnowledge>([
      ["char-a", makeChar({ recipeResultItemIds: new Set([500]) })],
    ])
    const env = buildCliEvalEnv({
      charactersById,
      characterPriority: ["char-a"],
      wantedConsumables: { "500": {} },
    })
    expect(env.isKnownByCharacter({ kind: "consumable", itemId: 500 }, "char-a")).toBe(false)
  })
})

describe("buildCliEvalEnv (routing context)", () => {
  it("returns the priority list for getCharacterPriority", () => {
    const env = buildCliEvalEnv({
      charactersById: new Map(),
      characterPriority: ["char-a", "char-b"],
      wantedConsumables: {},
    })
    expect(env.getCharacterPriority()).toEqual(["char-a", "char-b"])
  })

  it("getAllCharacters returns the keyset of charactersById in insertion order", () => {
    const charactersById = new Map<string, CharacterKnowledge>([
      ["char-a", makeChar({ id: "char-a" })],
      ["char-b", makeChar({ id: "char-b" })],
      ["char-c", makeChar({ id: "char-c" })],
    ])
    const env = buildCliEvalEnv({
      charactersById,
      characterPriority: ["char-a", "char-b"],
      wantedConsumables: {},
    })
    const all = env.getAllCharacters()
    expect(all).toEqual(["char-a", "char-b", "char-c"])
  })

  it("getCurrentCharacter is always 'unknown' (CLI cannot identify the logged-in char)", () => {
    const env = buildCliEvalEnv({
      charactersById: new Map(),
      characterPriority: [],
      wantedConsumables: {},
    })
    expect(env.getCurrentCharacter()).toBe("unknown")
  })
})

describe("buildCliEvalEnv (consumables and stock)", () => {
  it("returns empty wanters list (CLI parser does not surface per-char wanters)", () => {
    const env = buildCliEvalEnv({
      charactersById: new Map(),
      characterPriority: [],
      wantedConsumables: { "500": { qtyPerChar: 5 } },
    })
    expect(env.getConsumableWanters(500)).toEqual([])
    expect(env.getConsumableWanters(999)).toEqual([])
  })

  it("returns 'unknown' for stock lookups (CLI parser does not surface stock)", () => {
    const env = buildCliEvalEnv({
      charactersById: new Map(),
      characterPriority: [],
      wantedConsumables: {},
    })
    expect(env.getConsumableStock(1, "char-a")).toBe("unknown")
    expect(env.getBankStock(1)).toBe("unknown")
  })
})

describe("buildCliEvalEnv (scripts)", () => {
  it("returns the per-character unlockedScriptIds set", () => {
    const charactersById = new Map<string, CharacterKnowledge>([
      ["char-a", makeChar({ unlockedScriptIds: new Set([1, 2, 3]) })],
    ])
    const env = buildCliEvalEnv({
      charactersById,
      characterPriority: ["char-a"],
      wantedConsumables: {},
    })
    const known = env.getKnownScripts("char-a")
    expect(known).not.toBe("unknown")
    if (known !== "unknown") {
      expect(known.has(1)).toBe(true)
      expect(known.has(2)).toBe(true)
      expect(known.has(99)).toBe(false)
    }
  })

  it("returns an empty set for unknown characters (no script knowledge)", () => {
    const env = buildCliEvalEnv({
      charactersById: new Map(),
      characterPriority: [],
      wantedConsumables: {},
    })
    const known = env.getKnownScripts("char-a")
    expect(known).not.toBe("unknown")
    if (known !== "unknown") expect(known.size).toBe(0)
  })

  it("getTotalScriptCount is 'unknown' (CLI does not pull the generated constant)", () => {
    const env = buildCliEvalEnv({
      charactersById: new Map(),
      characterPriority: [],
      wantedConsumables: {},
    })
    expect(env.getTotalScriptCount()).toBe("unknown")
  })
})

describe("buildCliEvalEnv (live-state and build-derived gaps)", () => {
  it("returns 'unknown' for every signal the CLI's SVs do not carry", () => {
    const env = buildCliEvalEnv({
      charactersById: new Map(),
      characterPriority: [],
      wantedConsumables: {},
    })
    expect(env.isTraitResearched("char-a", 1, "divines")).toBe("unknown")
    expect(env.isCraftingRankBelowCap("char-a", 1)).toBe("unknown")
    expect(env.matchesWantedEquipment(FACTS)).toBe("unknown")
    expect(env.matchesWantedCompanionEquipment(FACTS)).toBe("unknown")
    expect(env.isCompanionWornSlotFilled("Bastian", FACTS)).toBe("unknown")
    expect(env.findCharacterForWantedEquipment(FACTS)).toBe("unknown")
    expect(env.findCompanionForWantedEquipment(FACTS)).toBe("unknown")
    expect(env.getCooldownGroup(1)).toBe("unknown")
    expect(env.isCooldownExpired("group")).toBe("unknown")
  })
})
