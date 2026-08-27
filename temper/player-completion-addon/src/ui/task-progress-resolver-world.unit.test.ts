import { describe, expect, it } from "bun:test"
import { loreLibraryData } from "@temper/game-completion/generated/lore-library-data.generated"
import { companionQuestData } from "@temper/player-completion/companion-quest-data"
import { MAX_COMPANION_RAPPORT } from "@temper/player-completion/companion-rapport"
import { ALL_COMPANION_IDS } from "../generated/companion-mappings.generated"
import type { SavedCharacterEntry } from "../saved-variables"
import {
  resolveCompanionQuests,
  resolveCompanionRapport,
  resolveLoreLibrary,
} from "./task-progress-resolver-world"

const TOTAL_RAPPORT = ALL_COMPANION_IDS.length * MAX_COMPANION_RAPPORT
const RAPPORT_COMPANION_ID_A = ALL_COMPANION_IDS[0]
const RAPPORT_COMPANION_ID_B = ALL_COMPANION_IDS[1]
if (RAPPORT_COMPANION_ID_A === undefined || RAPPORT_COMPANION_ID_B === undefined)
  throw new Error("test fixture: expected at least two companion IDs in ALL_COMPANION_IDS")

const ALL_COMPANION_QUEST_IDS: readonly number[] = companionQuestData.flatMap((g) =>
  g.quests.map((q) => q.questId)
)
const TOTAL_COMPANION_QUESTS = ALL_COMPANION_QUEST_IDS.length

const BASTIAN = companionQuestData.find((g) => g.companionId === "bastian")
if (BASTIAN === undefined)
  throw new Error("test fixture: bastian group missing from companionQuestData")
const BASTIAN_Q0 = BASTIAN.quests[0]
const BASTIAN_Q1 = BASTIAN.quests[1]
if (BASTIAN_Q0 === undefined || BASTIAN_Q1 === undefined)
  throw new Error("test fixture: bastian quests[0..1] missing from companionQuestData")

function charWith(quests: number[] | undefined): SavedCharacterEntry {
  return { name: "test-char", quests }
}

const TOTAL_LORE_BOOKS = loreLibraryData.reduce(
  (sum, cat) => sum + cat.collections.reduce((s, col) => s + col.books.length, 0),
  0
)
const LORE_CAT = loreLibraryData[0]
if (LORE_CAT === undefined) throw new Error("test fixture: loreLibraryData[0] missing")
const LORE_COL = LORE_CAT.collections[0]
if (LORE_COL === undefined)
  throw new Error("test fixture: loreLibraryData[0].collections[0] missing")
const LORE_BOOK = LORE_COL.books[0]
if (LORE_BOOK === undefined)
  throw new Error("test fixture: loreLibraryData[0].collections[0].books[0] missing")
const CAT_BOOK_TOTAL = LORE_CAT.collections.reduce((s, col) => s + col.books.length, 0)
const COL_BOOK_TOTAL = LORE_COL.books.length

function charWithLore(loreLibrary: SavedCharacterEntry["loreLibrary"]): SavedCharacterEntry {
  return { name: "test-char", loreLibrary }
}

describe("resolveCompanionQuests", () => {
  it("returns undefined when charData has no quests array", () => {
    expect(resolveCompanionQuests(charWith(undefined), undefined)).toBeUndefined()
  })

  it("returns undefined when charData is undefined", () => {
    expect(resolveCompanionQuests(undefined, undefined)).toBeUndefined()
  })

  it("counts the full set of completed quests across all companions when no itemPath given", () => {
    const out = resolveCompanionQuests(charWith([...ALL_COMPANION_QUEST_IDS]), undefined)
    expect(out).toEqual({ current: TOTAL_COMPANION_QUESTS, total: TOTAL_COMPANION_QUESTS })
  })

  it("counts a partial set against the full total", () => {
    const out = resolveCompanionQuests(
      charWith([BASTIAN_Q0.questId, BASTIAN_Q1.questId]),
      undefined
    )
    expect(out).toEqual({ current: 2, total: TOTAL_COMPANION_QUESTS })
  })

  it("ignores quest IDs that are not companion quests", () => {
    const out = resolveCompanionQuests(charWith([9999, 12345]), undefined)
    expect(out).toEqual({ current: 0, total: TOTAL_COMPANION_QUESTS })
  })

  it("narrows to one companion when itemPath[0] is a companionId", () => {
    const out = resolveCompanionQuests(charWith([BASTIAN_Q0.questId, 9999]), ["bastian"])
    expect(out).toEqual({ current: 1, total: BASTIAN.quests.length })
  })

  it("returns undefined for an unknown companionId in itemPath", () => {
    const out = resolveCompanionQuests(charWith([...ALL_COMPANION_QUEST_IDS]), ["not-a-companion"])
    expect(out).toBeUndefined()
  })

  it("returns undefined when itemPath[0] is a number (companionIds are strings)", () => {
    const out = resolveCompanionQuests(charWith([...ALL_COMPANION_QUEST_IDS]), [0])
    expect(out).toBeUndefined()
  })
})

describe("resolveLoreLibrary", () => {
  it("returns undefined when charData has no loreLibrary", () => {
    expect(resolveLoreLibrary(charWithLore(undefined), undefined)).toBeUndefined()
  })

  it("returns undefined when charData is undefined", () => {
    expect(resolveLoreLibrary(undefined, undefined)).toBeUndefined()
  })

  it("counts zero known against full total when loreLibrary is empty", () => {
    expect(resolveLoreLibrary(charWithLore({}), undefined)).toEqual({
      current: 0,
      total: TOTAL_LORE_BOOKS,
    })
  })

  it("counts one known against full total via sparse format", () => {
    const out = resolveLoreLibrary(
      charWithLore({
        [LORE_CAT.categoryIndex]: { [LORE_COL.collectionIndex]: [LORE_BOOK.bookIndex] },
      }),
      undefined
    )
    expect(out).toEqual({ current: 1, total: TOTAL_LORE_BOOKS })
  })

  it("narrows to a category when itemPath[0] is a categoryIndex", () => {
    const out = resolveLoreLibrary(
      charWithLore({
        [LORE_CAT.categoryIndex]: { [LORE_COL.collectionIndex]: [LORE_BOOK.bookIndex] },
      }),
      [LORE_CAT.categoryIndex]
    )
    expect(out).toEqual({ current: 1, total: CAT_BOOK_TOTAL })
  })

  it("narrows to a collection when itemPath is [categoryIndex, collectionIndex]", () => {
    const out = resolveLoreLibrary(
      charWithLore({
        [LORE_CAT.categoryIndex]: { [LORE_COL.collectionIndex]: [LORE_BOOK.bookIndex] },
      }),
      [LORE_CAT.categoryIndex, LORE_COL.collectionIndex]
    )
    expect(out).toEqual({ current: 1, total: COL_BOOK_TOTAL })
  })

  it("returns undefined when itemPath narrows to a non-existent category", () => {
    expect(resolveLoreLibrary(charWithLore({}), [9999])).toBeUndefined()
  })

  it("returns undefined when itemPath narrows to a non-existent collection", () => {
    expect(resolveLoreLibrary(charWithLore({}), [LORE_CAT.categoryIndex, 9999])).toBeUndefined()
  })
})

function charWithRapport(
  companionRapport: SavedCharacterEntry["companionRapport"]
): SavedCharacterEntry {
  return { name: "test-char", companionRapport }
}

describe("resolveCompanionRapport", () => {
  it("returns 0/TOTAL_RAPPORT when charData has no companionRapport (real character, no rapport logged yet)", () => {
    expect(resolveCompanionRapport(charWithRapport(undefined), undefined)).toEqual({
      current: 0,
      total: TOTAL_RAPPORT,
    })
  })

  it("returns 0/TOTAL_RAPPORT when charData is undefined (parallel to resolveDailyWrits null-tolerance)", () => {
    expect(resolveCompanionRapport(undefined, undefined)).toEqual({
      current: 0,
      total: TOTAL_RAPPORT,
    })
  })

  it("item-level: returns 0/4000 when charData has no companionRapport", () => {
    expect(resolveCompanionRapport(charWithRapport(undefined), [RAPPORT_COMPANION_ID_A])).toEqual({
      current: 0,
      total: MAX_COMPANION_RAPPORT,
    })
  })

  it("card-level: zero rapport across the canonical roster", () => {
    expect(resolveCompanionRapport(charWithRapport({}), undefined)).toEqual({
      current: 0,
      total: TOTAL_RAPPORT,
    })
  })

  it("card-level: all real companions at raw max (4000) totals to TOTAL_RAPPORT", () => {
    const rapport: Record<number, number> = {}
    for (const id of ALL_COMPANION_IDS) rapport[id] = MAX_COMPANION_RAPPORT
    expect(resolveCompanionRapport(charWithRapport(rapport), undefined)).toEqual({
      current: TOTAL_RAPPORT,
      total: TOTAL_RAPPORT,
    })
  })

  it("card-level: partial across two companions sums RAW points against full total", () => {
    const out = resolveCompanionRapport(
      charWithRapport({ [RAPPORT_COMPANION_ID_A]: 4000, [RAPPORT_COMPANION_ID_B]: 1000 }),
      undefined
    )
    expect(out).toEqual({ current: 5000, total: TOTAL_RAPPORT })
  })

  it("card-level: ignores entries for unknown companion IDs in the total", () => {
    const out = resolveCompanionRapport(
      charWithRapport({ [RAPPORT_COMPANION_ID_A]: 4000, 9999: 4000 }),
      undefined
    )
    expect(out).toEqual({ current: 4000, total: TOTAL_RAPPORT })
  })

  it("card-level: a within-tier raw gain increases card current (sub-tier gains register)", () => {
    const lower = resolveCompanionRapport(
      charWithRapport({ [RAPPORT_COMPANION_ID_A]: 1000 }),
      undefined
    )
    const higher = resolveCompanionRapport(
      charWithRapport({ [RAPPORT_COMPANION_ID_A]: 1145 }),
      undefined
    )
    if (lower === undefined || higher === undefined)
      throw new Error("test: card-level rapport resolution returned undefined")
    expect(higher.current - lower.current).toBe(145)
  })

  it("item-level: returns raw/4000 for a tracked companion", () => {
    const out = resolveCompanionRapport(charWithRapport({ [RAPPORT_COMPANION_ID_A]: 1000 }), [
      RAPPORT_COMPANION_ID_A,
    ])
    expect(out).toEqual({ current: 1000, total: MAX_COMPANION_RAPPORT })
  })

  it("item-level: returns 0/4000 for an untracked but real companion", () => {
    const out = resolveCompanionRapport(charWithRapport({}), [RAPPORT_COMPANION_ID_A])
    expect(out).toEqual({ current: 0, total: MAX_COMPANION_RAPPORT })
  })

  it("item-level: returns undefined when itemPath[0] is a string", () => {
    const out = resolveCompanionRapport(charWithRapport({ [RAPPORT_COMPANION_ID_A]: 4000 }), [
      "bastian",
    ])
    expect(out).toBeUndefined()
  })
})
