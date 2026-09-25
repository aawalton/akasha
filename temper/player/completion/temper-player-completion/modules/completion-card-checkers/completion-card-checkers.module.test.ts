import { describe, expect, test } from "bun:test"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"
import { COMPLETION_CARD_CHECKERS } from "akasha/temper/player/completion/temper-player-completion/modules/completion-card-checkers/completion-card-checkers.module.code.ts"
import {
  type CompletionCatalogs,
  NO_COMPLETION_CATALOGS,
} from "akasha/temper/player/completion/temper-player-completion/modules/completion-catalogs/completion-catalogs.module.code.ts"

const DONE = { completed: true, criteriaProgress: { completedSteps: 1, totalSteps: 1 } }

const CATALOGS: CompletionCatalogs = {
  ...NO_COMPLETION_CATALOGS,
  achievementCategories: [
    { slug: "character-dragonhold", title: "Dragonhold", category: "character", displayOrder: 0 },
    {
      slug: "character-dragonhold-quests",
      title: "Quests",
      category: "character",
      displayOrder: 0,
      parent: "character-dragonhold",
      achievements: [
        { esoAchievementId: 2612, name: "An Invented Deed", achievementPoints: 10, totalSteps: 1 },
        {
          esoAchievementId: 2613,
          name: "Another Invented Deed",
          achievementPoints: 10,
          totalSteps: 1,
        },
      ],
    },
    {
      slug: "character-dragonhold-exploration",
      title: "Exploration",
      category: "character",
      displayOrder: 1,
      parent: "character-dragonhold",
      achievements: [
        { esoAchievementId: 2614, name: "A Deed Far Away", achievementPoints: 10, totalSteps: 1 },
      ],
    },
    { slug: "account-dragonhold", title: "Dragonhold", category: "account", displayOrder: 0 },
    {
      slug: "account-dragonhold-general",
      title: "General",
      category: "account",
      displayOrder: 0,
      parent: "account-dragonhold",
      achievements: [
        {
          esoAchievementId: 2700,
          name: "A Deed of the Account",
          achievementPoints: 10,
          totalSteps: 1,
        },
      ],
    },
  ],
}

const HALFWAY: CharacterCompletion = { achievements: { 2612: DONE } }

const QUESTS_DONE: CharacterCompletion = { achievements: { 2612: DONE, 2613: DONE } }

const EVERY_ONE: CharacterCompletion = { achievements: { 2612: DONE, 2613: DONE, 2614: DONE } }

const checker = COMPLETION_CARD_CHECKERS["character-achievements"]
if (checker === undefined) throw new Error("test fixture: no character-achievements checker")

describe("character-achievements", () => {
  test("a subcategory path counts each achievement in it once", () => {
    expect(checker.getItemProgress?.(HALFWAY, ["Dragonhold", "Quests"], CATALOGS)).toEqual({
      current: 1,
      total: 2,
    })
  })

  test("a category path counts every achievement under its subcategories", () => {
    expect(checker.getItemProgress?.(QUESTS_DONE, ["Dragonhold"], CATALOGS)).toEqual({
      current: 2,
      total: 3,
    })
  })

  test("a category is finished once every achievement in it is done", () => {
    expect(checker.isItemComplete?.(QUESTS_DONE, ["Dragonhold", "Quests"], CATALOGS)).toBe(true)
    expect(checker.isItemComplete?.(QUESTS_DONE, ["Dragonhold"], CATALOGS)).toBe(false)
    expect(checker.isItemComplete?.(EVERY_ONE, ["Dragonhold"], CATALOGS)).toBe(true)
  })

  test("the card is finished once every character achievement is done", () => {
    expect(checker.isCardComplete(QUESTS_DONE, CATALOGS)).toBe(false)
    expect(checker.isCardComplete(EVERY_ONE, CATALOGS)).toBe(true)
    expect(checker.getItemProgress?.(QUESTS_DONE, [], CATALOGS)).toEqual({ current: 2, total: 3 })
  })

  test("a card with no catalog is never finished", () => {
    expect(checker.isCardComplete(EVERY_ONE, NO_COMPLETION_CATALOGS)).toBe(false)
  })

  test("a path naming one achievement still counts that achievement", () => {
    expect(checker.getItemProgress?.(HALFWAY, ["Dragonhold", "Quests", "2612"], CATALOGS)).toEqual({
      current: 1,
      total: 1,
    })
    expect(checker.isItemComplete?.(HALFWAY, ["Dragonhold", "Quests", "2613"], CATALOGS)).toBe(
      false
    )
  })

  test("a path naming no category the catalog holds answers nothing", () => {
    expect(checker.getItemProgress?.(HALFWAY, ["Summerset"], CATALOGS)).toBeUndefined()
  })

  test("a character the store has not read answers nothing", () => {
    expect(checker.getItemProgress?.({}, ["Dragonhold"], CATALOGS)).toBeUndefined()
  })
})
