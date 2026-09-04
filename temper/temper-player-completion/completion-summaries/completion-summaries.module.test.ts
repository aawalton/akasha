import { describe, expect, test } from "bun:test"
import type {
  AccountCompletion,
  CharacterCompletion,
} from "@akasha/temper-completion/completion-progress"
import { companionQuestIds } from "../companion-quest-data/companion-quest-data.module.code.ts"
import {
  ACCOUNT_CARDS,
  CHARACTER_CARDS,
  COMPANION_CARDS,
} from "../completion-card-registry/completion-card-registry.module.code.ts"
import {
  type CompletionCatalogs,
  NO_COMPLETION_CATALOGS,
} from "../completion-catalogs/completion-catalogs.module.code.ts"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { computeOverallCompletionScore } from "../completion-scope-rollup/completion-scope-rollup.module.code.ts"
import {
  buildCompletionSummaries,
  computeOverallCompletionScoreFromRows,
} from "./completion-summaries.module.code.ts"

const NOTHING = {
  characterRows: [],
  companionRows: [],
  accountCompletion: null,
  catalogs: NO_COMPLETION_CATALOGS,
} as const

const QUEST_IDS = [910_001, 910_002, 910_003] as const

const QUEST_CATALOG: CompletionCatalogs = {
  ...NO_COMPLETION_CATALOGS,
  questZones: [
    {
      title: "A Zone Only This Test Knows",
      zoneQuests: QUEST_IDS.map((esoQuestId) => ({ esoQuestId, questName: `Quest ${esoQuestId}` })),
    },
  ],
}

function characterRow(completion: CharacterCompletion | null): CompletionCharacterRow {
  return {
    id: "character-one",
    userId: "user-one",
    esoCharacterId: "eso-character-one",
    completion,
    createdAt: 0,
    updatedAt: 0,
    roles: [],
  }
}

describe("summaries folded from a player with no rows, no account and no catalogs", () => {
  test("it folds without throwing and scores a finite number no lower than zero", () => {
    const summaries = buildCompletionSummaries(NOTHING)
    const score = computeOverallCompletionScore(
      summaries.accountSummary,
      summaries.characterSummary,
      summaries.companionSummary
    )
    expect(Number.isFinite(score)).toBe(true)
    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBe(0)
  })

  test("each summary carries an entry counted at zero for every card its registry declares", () => {
    const { accountSummary, characterSummary, companionSummary } = buildCompletionSummaries(NOTHING)

    expect(ACCOUNT_CARDS.length).toBeGreaterThan(0)
    expect(CHARACTER_CARDS.length).toBeGreaterThan(0)
    expect(COMPANION_CARDS.length).toBeGreaterThan(0)

    for (const card of ACCOUNT_CARDS) {
      expect(accountSummary[card.id].count).toBe(0)
      expect(accountSummary[card.id].total).toBeGreaterThanOrEqual(0)
    }
    for (const card of CHARACTER_CARDS) {
      expect(characterSummary[card.id].count).toBe(0)
      expect(characterSummary[card.id].total).toBeGreaterThanOrEqual(0)
    }
    for (const card of COMPANION_CARDS) {
      expect(companionSummary[card.id].count).toBe(0)
      expect(companionSummary[card.id].total).toBeGreaterThanOrEqual(0)
    }
  })
})

describe("a catalog handed in", () => {
  test("no companion quest claims the ids this test folds against", () => {
    for (const id of QUEST_IDS) expect(companionQuestIds.has(id)).toBe(false)
  })

  test("the quest catalog reaches the character quest card and nothing else counts it", () => {
    const rows = [characterRow({ quests: [QUEST_IDS[0], QUEST_IDS[1]] })]

    const withCatalog = buildCompletionSummaries({
      characterRows: rows,
      companionRows: [],
      accountCompletion: null,
      catalogs: QUEST_CATALOG,
    })
    expect(withCatalog.characterSummary.quests).toEqual({ count: 2, total: 3 })
    expect(withCatalog.accountSummary["account-quests"]).toEqual({ count: 2, total: 3 })

    const withoutCatalog = buildCompletionSummaries({
      characterRows: rows,
      companionRows: [],
      accountCompletion: null,
      catalogs: NO_COMPLETION_CATALOGS,
    })
    expect(withoutCatalog.characterSummary.quests).toEqual({ count: 0, total: 0 })
    expect(withoutCatalog.accountSummary["account-quests"]).toEqual({ count: 0, total: 0 })
  })
})

describe("what the rows carry reaches the summaries", () => {
  test("a character's completed quests raise the score over the same rows with no catalog", () => {
    const rows = [characterRow({ quests: [QUEST_IDS[0], QUEST_IDS[1]] })]

    const scored = computeOverallCompletionScoreFromRows({
      characterRows: rows,
      companionRows: [],
      accountCompletion: null,
      catalogs: QUEST_CATALOG,
    })
    const unscored = computeOverallCompletionScoreFromRows({
      characterRows: rows,
      companionRows: [],
      accountCompletion: null,
      catalogs: NO_COMPLETION_CATALOGS,
    })

    expect(scored - unscored).toBe(4)
  })

  test("the account's champion points reach the champion points card", () => {
    const accountCompletion: AccountCompletion = { achievements: {}, championPointsEarned: 1_234 }

    const { accountSummary } = buildCompletionSummaries({
      characterRows: [],
      companionRows: [],
      accountCompletion,
      catalogs: NO_COMPLETION_CATALOGS,
    })

    expect(accountSummary["champion-points"].count).toBe(1_234)
    expect(accountSummary["champion-points"].total).toBeGreaterThan(0)
  })
})

describe("the score taken straight from the rows", () => {
  test("it is the score of the summaries the same input folds", () => {
    const input = {
      characterRows: [characterRow({ quests: [QUEST_IDS[0], QUEST_IDS[1]] })],
      companionRows: [],
      accountCompletion: { achievements: {}, championPointsEarned: 7 } as AccountCompletion,
      catalogs: QUEST_CATALOG,
    }
    const { accountSummary, characterSummary, companionSummary } = buildCompletionSummaries(input)

    expect(computeOverallCompletionScoreFromRows(input)).toBe(
      computeOverallCompletionScore(accountSummary, characterSummary, companionSummary)
    )
  })
})
