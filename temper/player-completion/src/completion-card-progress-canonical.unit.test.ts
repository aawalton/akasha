import { describe, expect, it } from "bun:test"
import { affixScripts } from "@temper/game-characters-skills/scribing/affix-scripts-data"
import { focusScripts } from "@temper/game-characters-skills/scribing/focus-scripts-data"
import { grimoires } from "@temper/game-characters-skills/scribing/grimoires-data"
import { signatureScripts } from "@temper/game-characters-skills/scribing/signature-scripts-data"
import type {
  AccountCompletion,
  CharacterCompletion,
} from "@temper/game-completion/completion-types"
import { loreLibraryData } from "@temper/game-completion/generated/lore-library-data.generated"
import { recipeData } from "@temper/game-completion/generated/recipe-data.generated"
import { companionQuestData } from "./companion-quest-data"
import { resolveTaskProgress } from "./completion-card-progress-resolver"
import {
  accountAchievementData,
  characterAchievementData,
} from "./generated/achievement-data.generated"
import { cadwellData } from "./generated/cadwell-data.generated"
import { traitResearchData } from "./generated/trait-research-data.generated"

const TOTAL_RECIPES = recipeData.reduce((s, l) => s + l.recipes.length, 0)
const TOTAL_TRAITS = traitResearchData.reduce(
  (s, c) => s + c.lines.reduce((a, l) => a + l.traits.length, 0),
  0
)
const TOTAL_POIS = cadwellData.reduce(
  (s, lv) => s + lv.zones.reduce((a, z) => a + z.pois.length, 0),
  0
)
const TOTAL_COLLECTIONS = loreLibraryData.reduce((s, c) => s + c.collections.length, 0)
const TOTAL_COMPANION_QUESTS = companionQuestData.reduce((s, g) => s + g.quests.length, 0)

const CHAR_ACH_LEAVES = characterAchievementData.reduce(
  (s, c) => s + c.subCategories.reduce((a, sc) => a + sc.achievements.length, 0),
  0
)
const ACCT_ACH_LEAVES = accountAchievementData.reduce(
  (s, c) => s + c.subCategories.reduce((a, sc) => a + sc.achievements.length, 0),
  0
)

const SCRIBING_TOTAL =
  grimoires.list.length +
  focusScripts.list.length +
  signatureScripts.list.filter((s) => s.itemId !== 0).length +
  affixScripts.list.filter((s) => s.itemId !== 0).length

describe("canonical / recipes", () => {
  it("fresh character reports { 0, TOTAL_RECIPES } at card level", () => {
    const out = resolveTaskProgress("recipes", null, {}, null)
    expect(out).toEqual({ current: 0, total: TOTAL_RECIPES })
  })

  it("partial blob reports { knownCount, TOTAL_RECIPES } at card level", () => {
    const list = recipeData[0]
    if (list === undefined) throw new Error("fixture: recipeData[0] missing")
    const known = list.recipes.slice(0, 3).map((r) => r.itemId)
    const charCompletion: CharacterCompletion = { recipes: { [list.listIndex]: known } }
    const out = resolveTaskProgress("recipes", null, charCompletion, null)
    expect(out).toEqual({ current: 3, total: TOTAL_RECIPES })
  })

  it("per-list drill reports { knownInList, staticListLength } even when list absent from wire", () => {
    const list = recipeData[0]
    if (list === undefined) throw new Error("fixture: recipeData[0] missing")
    const out = resolveTaskProgress("recipes", [list.listIndex], {}, null)
    expect(out).toEqual({ current: 0, total: list.recipes.length })
  })

  it("per-list drill counts known against the full static list length", () => {
    const list = recipeData[0]
    if (list === undefined) throw new Error("fixture: recipeData[0] missing")
    const known = list.recipes.slice(0, 2).map((r) => r.itemId)
    const charCompletion: CharacterCompletion = { recipes: { [list.listIndex]: known } }
    const out = resolveTaskProgress("recipes", [list.listIndex], charCompletion, null)
    expect(out).toEqual({ current: 2, total: list.recipes.length })
  })
})

describe("canonical / trait-research", () => {
  it("fresh character reports { 0, TOTAL_TRAITS } at card level", () => {
    const out = resolveTaskProgress("trait-research", null, {}, null)
    expect(out).toEqual({ current: 0, total: TOTAL_TRAITS })
  })

  it("per-craft-type drill reports the static subtotal for an empty wire blob", () => {
    const craft = traitResearchData[0]
    if (craft === undefined) throw new Error("fixture: traitResearchData[0] missing")
    const subtotal = craft.lines.reduce((a, l) => a + l.traits.length, 0)
    const out = resolveTaskProgress("trait-research", [craft.craftTypeId], {}, null)
    expect(out).toEqual({ current: 0, total: subtotal })
  })

  it("per-line drill reports the static line subtotal for an empty wire blob", () => {
    const craft = traitResearchData[0]
    const line = craft?.lines[0]
    if (craft === undefined || line === undefined)
      throw new Error("fixture: traitResearchData[0].lines[0] missing")
    const out = resolveTaskProgress("trait-research", [craft.craftTypeId, line.lineIndex], {}, null)
    expect(out).toEqual({ current: 0, total: line.traits.length })
  })

  it("partial blob counts known traits against the full static total at card level", () => {
    const craft = traitResearchData[0]
    const line = craft?.lines[0]
    const t0 = line?.traits[0]
    const t1 = line?.traits[1]
    if (craft === undefined || line === undefined || t0 === undefined || t1 === undefined)
      throw new Error("fixture: traitResearchData[0].lines[0].traits[0..1] missing")
    const charCompletion: CharacterCompletion = {
      traitResearch: {
        [craft.craftTypeId]: {
          name: craft.name,
          lines: {
            [line.lineIndex]: {
              name: line.name,
              traits: {
                [t0.traitIndex]: { name: t0.name, known: true },
                [t1.traitIndex]: { name: t1.name, known: true },
              },
            },
          },
        },
      },
    }
    const out = resolveTaskProgress("trait-research", null, charCompletion, null)
    expect(out).toEqual({ current: 2, total: TOTAL_TRAITS })
  })
})

describe("canonical / scribing-knowledge", () => {
  it("fresh character reports { 0, SCRIBING_TOTAL } at card level", () => {
    const out = resolveTaskProgress("scribing-knowledge", null, {}, null)
    expect(out).toEqual({ current: 0, total: SCRIBING_TOTAL })
  })

  it("partial blob counts unlocked grimoires + scripts against the static total", () => {
    const g0 = grimoires.list[0]
    if (g0 === undefined) throw new Error("fixture: grimoires.list[0] missing")
    const charCompletion: CharacterCompletion = {
      scribing: {
        grimoires: { 1: { name: g0.name, unlocked: true } },
        scripts: {},
      },
    }
    const out = resolveTaskProgress("scribing-knowledge", null, charCompletion, null)
    expect(out).toEqual({ current: 1, total: SCRIBING_TOTAL })
  })
})

describe("canonical / cadwells-almanac", () => {
  it("fresh character reports { 0, TOTAL_POIS } at card level", () => {
    const out = resolveTaskProgress("cadwells-almanac", null, {}, null)
    expect(out).toEqual({ current: 0, total: TOTAL_POIS })
  })

  it("partial blob counts completed POIs against the full static 78", () => {
    const level = cadwellData[0]
    const zone = level?.zones[0]
    const poi = zone?.pois[0]
    if (level === undefined || zone === undefined || poi === undefined)
      throw new Error("fixture: cadwellData[0].zones[0].pois[0] missing")
    const charCompletion: CharacterCompletion = {
      cadwell: {
        progressionLevel: level.level,
        levels: {
          [level.level]: {
            zones: {
              [zone.zoneIndex]: {
                name: zone.name,
                description: "",
                order: 1,
                pois: {
                  [poi.poiIndex]: {
                    name: poi.name,
                    openingText: "",
                    closingText: "",
                    order: 1,
                    discovered: true,
                    completed: true,
                  },
                },
              },
            },
          },
        },
      },
    }
    const out = resolveTaskProgress("cadwells-almanac", null, charCompletion, null)
    expect(out).toEqual({ current: 1, total: TOTAL_POIS })
  })
})

describe("canonical / character-achievements", () => {
  const CAT = characterAchievementData[0]
  const SUB = CAT?.subCategories[0]
  const ACH = SUB?.achievements[0]
  if (CAT === undefined || SUB === undefined || ACH === undefined)
    throw new Error("fixture: characterAchievementData[0].subCategories[0].achievements[0] missing")

  it("fresh character reports { 0, CHAR_ACH_LEAVES } at card level", () => {
    const out = resolveTaskProgress("character-achievements", null, {}, null)
    expect(out).toEqual({ current: 0, total: CHAR_ACH_LEAVES })
  })

  it("preserves numeric criteria progress (3/5) at a single-achievement leaf", () => {
    const charCompletion: CharacterCompletion = {
      achievements: {
        [ACH.achievementId]: {
          completed: false,
          criteriaProgress: {
            completedSteps: 0,
            totalSteps: 5,
            criteria: { "1": { numCompleted: 3, numRequired: 5 } },
          },
        },
      },
    }
    const out = resolveTaskProgress(
      "character-achievements",
      [CAT.name, SUB.name, ACH.achievementId],
      charCompletion,
      null
    )
    expect(out).toEqual({ current: 3, total: 5 })
  })

  it("counts completed leaves against the full static leaf total at card level", () => {
    const charCompletion: CharacterCompletion = {
      achievements: {
        [ACH.achievementId]: {
          completed: true,
          criteriaProgress: { completedSteps: 1, totalSteps: 1 },
        },
      },
    }
    const out = resolveTaskProgress("character-achievements", null, charCompletion, null)
    expect(out).toEqual({ current: 1, total: CHAR_ACH_LEAVES })
  })
})

describe("canonical / account-achievements", () => {
  const CAT = accountAchievementData[0]
  const SUB = CAT?.subCategories[0]
  const ACH = SUB?.achievements[0]
  if (CAT === undefined || SUB === undefined || ACH === undefined)
    throw new Error("fixture: accountAchievementData[0].subCategories[0].achievements[0] missing")

  it("fresh account reports { 0, ACCT_ACH_LEAVES } at card level", () => {
    const out = resolveTaskProgress("account-achievements", null, null, { achievements: {} })
    expect(out).toEqual({ current: 0, total: ACCT_ACH_LEAVES })
  })

  it("preserves numeric criteria progress (3/5) at a single-achievement leaf", () => {
    const accountCompletion: AccountCompletion = {
      achievements: {
        [ACH.achievementId]: {
          completed: false,
          criteriaProgress: {
            completedSteps: 0,
            totalSteps: 5,
            criteria: { "1": { numCompleted: 3, numRequired: 5 } },
          },
        },
      },
    }
    const out = resolveTaskProgress(
      "account-achievements",
      [CAT.name, SUB.name, ACH.achievementId],
      null,
      accountCompletion
    )
    expect(out).toEqual({ current: 3, total: 5 })
  })

  it("counts completed leaves against the full static leaf total at card level", () => {
    const accountCompletion: AccountCompletion = {
      achievements: {
        [ACH.achievementId]: {
          completed: true,
          criteriaProgress: { completedSteps: 1, totalSteps: 1 },
        },
      },
    }
    const out = resolveTaskProgress("account-achievements", null, null, accountCompletion)
    expect(out).toEqual({ current: 1, total: ACCT_ACH_LEAVES })
  })
})

describe("canonical / companion-quests", () => {
  it("fresh character reports { 0, TOTAL_COMPANION_QUESTS } at card level", () => {
    const out = resolveTaskProgress("companion-quests", null, {}, null)
    expect(out).toEqual({ current: 0, total: TOTAL_COMPANION_QUESTS })
  })

  it("counts only completed quests, NOT rapport-locked-incomplete actionability", () => {
    const group = companionQuestData.find((g) => g.quests.length >= 2)
    const q0 = group?.quests[0]
    const q1 = group?.quests[1]
    if (group === undefined || q0 === undefined || q1 === undefined)
      throw new Error("fixture: a companion group with >=2 quests is required")
    const charCompletion: CharacterCompletion = { quests: [q0.questId] }
    const out = resolveTaskProgress("companion-quests", null, charCompletion, null)
    expect(out).toEqual({ current: 1, total: TOTAL_COMPANION_QUESTS })
  })
})

describe("canonical / lore-library-character", () => {
  it("fresh character reports { 0, TOTAL_COLLECTIONS } at card level", () => {
    const out = resolveTaskProgress("lore-library-character", null, {}, null)
    expect(out).toEqual({ current: 0, total: TOTAL_COLLECTIONS })
  })

  it("a fully-known collection counts as one complete collection", () => {
    const cat = loreLibraryData[0]
    const col = cat?.collections[0]
    if (cat === undefined || col === undefined)
      throw new Error("fixture: loreLibraryData[0].collections[0] missing")
    const allBookIndexes = col.books.map((b) => b.bookIndex)
    const charCompletion: CharacterCompletion = {
      loreLibrary: { [cat.categoryIndex]: { [col.collectionIndex]: allBookIndexes } },
    }
    const out = resolveTaskProgress("lore-library-character", null, charCompletion, null)
    expect(out).toEqual({ current: 1, total: TOTAL_COLLECTIONS })
  })

  it("a partially-known collection does NOT count as complete", () => {
    const cat = loreLibraryData[0]
    const col = cat?.collections.find((c) => c.books.length >= 2)
    if (cat === undefined || col === undefined)
      throw new Error("fixture: loreLibraryData[0] collection with >=2 books missing")
    const firstBook = col.books[0]
    if (firstBook === undefined) throw new Error("fixture: collection book[0] missing")
    const charCompletion: CharacterCompletion = {
      loreLibrary: { [cat.categoryIndex]: { [col.collectionIndex]: [firstBook.bookIndex] } },
    }
    const out = resolveTaskProgress("lore-library-character", null, charCompletion, null)
    expect(out).toEqual({ current: 0, total: TOTAL_COLLECTIONS })
  })
})

describe("canonical / daily-writs", () => {
  it("missing dailyWrits reports { 0, 7 }", () => {
    expect(resolveTaskProgress("daily-writs", null, {}, null)).toEqual({ current: 0, total: 7 })
  })

  it("valid-date blob with completed=3 reports { 3, 7 }", async () => {
    const { getEsoDateString } = await import("@temper/shared-formula-framework/eso-date")
    const charCompletion: CharacterCompletion = {
      dailyWrits: { date: getEsoDateString(), completed: 3 },
    }
    expect(resolveTaskProgress("daily-writs", null, charCompletion, null)).toEqual({
      current: 3,
      total: 7,
    })
  })

  it("stale-date blob reports { 0, 7 }", () => {
    const charCompletion: CharacterCompletion = {
      dailyWrits: { date: "1999-01-01", completed: 5 },
    }
    expect(resolveTaskProgress("daily-writs", null, charCompletion, null)).toEqual({
      current: 0,
      total: 7,
    })
  })
})
