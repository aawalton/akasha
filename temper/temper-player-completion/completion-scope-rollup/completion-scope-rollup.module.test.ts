import { describe, expect, test } from "bun:test"
import {
  ACCOUNT_CARDS,
  type AccountSummaryData,
  CHARACTER_CARDS,
  type CharacterSummaryData,
  COMPANION_CARDS,
  type CompanionSummaryData,
} from "../completion-card-registry/completion-card-registry.module.code.ts"
import { isCumulativeCard } from "../completion-card-reset-behavior/completion-card-reset-behavior.module.code.ts"
import {
  computeOverallCompletionScore,
  sumAccountScope,
  sumCharacterScope,
  sumCompanionScope,
} from "./completion-scope-rollup.module.code.ts"

function zeroedAccount(): AccountSummaryData {
  return Object.fromEntries(
    ACCOUNT_CARDS.map((card) => [card.id, { count: 0, total: 0 }])
  ) as AccountSummaryData
}

function zeroedCharacter(): CharacterSummaryData {
  return Object.fromEntries(
    CHARACTER_CARDS.map((card) => [card.id, { count: 0, total: 0 }])
  ) as CharacterSummaryData
}

function zeroedCompanion(): CompanionSummaryData {
  return Object.fromEntries(
    COMPANION_CARDS.map((card) => [card.id, { count: 0, total: 0 }])
  ) as CompanionSummaryData
}

const CUMULATIVE_ACCOUNT_COUNT = ACCOUNT_CARDS.filter((card) => isCumulativeCard(card.id)).length
const CUMULATIVE_CHARACTER_COUNT = CHARACTER_CARDS.filter((card) =>
  isCumulativeCard(card.id)
).length

describe("computeOverallCompletionScore over summaries nothing has been counted into", () => {
  test("it runs without throwing and scores a finite number no lower than zero", () => {
    const score = computeOverallCompletionScore(
      zeroedAccount(),
      zeroedCharacter(),
      zeroedCompanion()
    )
    expect(Number.isFinite(score)).toBe(true)
    expect(score).toBeGreaterThanOrEqual(0)
    expect(score).toBe(0)
  })
})

describe("computeOverallCompletionScore", () => {
  test("it adds only the cumulative account and character cards beside every companion entry", () => {
    const account = zeroedAccount()
    for (const card of ACCOUNT_CARDS)
      account[card.id] = { count: isCumulativeCard(card.id) ? 2 : 9999, total: 0 }
    const character = zeroedCharacter()
    for (const card of CHARACTER_CARDS)
      character[card.id] = { count: isCumulativeCard(card.id) ? 2 : 9999, total: 0 }
    const companion = zeroedCompanion()
    for (const card of COMPANION_CARDS) companion[card.id] = { count: 3, total: 0 }

    const expected =
      2 * CUMULATIVE_ACCOUNT_COUNT + 2 * CUMULATIVE_CHARACTER_COUNT + 3 * COMPANION_CARDS.length

    expect(computeOverallCompletionScore(account, character, companion)).toBe(expected)
  })

  test("the count of a card that starts over never enters the total", () => {
    const account = zeroedAccount()
    for (const card of ACCOUNT_CARDS)
      account[card.id] = { count: isCumulativeCard(card.id) ? 1 : 0, total: 0 }
    const character = zeroedCharacter()
    for (const card of CHARACTER_CARDS)
      character[card.id] = { count: isCumulativeCard(card.id) ? 1 : 0, total: 0 }
    const companion = zeroedCompanion()
    for (const card of COMPANION_CARDS) companion[card.id] = { count: 0, total: 0 }
    const base = computeOverallCompletionScore(account, character, companion)

    for (const card of ACCOUNT_CARDS)
      if (!isCumulativeCard(card.id)) account[card.id] = { count: 100_000, total: 0 }
    for (const card of CHARACTER_CARDS)
      if (!isCumulativeCard(card.id)) character[card.id] = { count: 100_000, total: 0 }

    expect(computeOverallCompletionScore(account, character, companion)).toBe(base)
  })

  test("it is the three scope counts added together", () => {
    const account = zeroedAccount()
    for (const card of ACCOUNT_CARDS) account[card.id] = { count: 4, total: 7 }
    const character = zeroedCharacter()
    for (const card of CHARACTER_CARDS) character[card.id] = { count: 5, total: 8 }
    const companion = zeroedCompanion()
    for (const card of COMPANION_CARDS) companion[card.id] = { count: 6, total: 9 }

    expect(computeOverallCompletionScore(account, character, companion)).toBe(
      sumAccountScope(account).count +
        sumCharacterScope(character).count +
        sumCompanionScope(companion).count
    )
  })
})

describe("one scope of completion cards", () => {
  test("an account scope adds the totals beside the counts, over cumulative cards only", () => {
    const account = zeroedAccount()
    for (const card of ACCOUNT_CARDS) account[card.id] = { count: 4, total: 7 }

    expect(sumAccountScope(account)).toEqual({
      count: 4 * CUMULATIVE_ACCOUNT_COUNT,
      total: 7 * CUMULATIVE_ACCOUNT_COUNT,
    })
  })

  test("a character scope adds the totals beside the counts, over cumulative cards only", () => {
    const character = zeroedCharacter()
    for (const card of CHARACTER_CARDS) character[card.id] = { count: 5, total: 8 }

    expect(sumCharacterScope(character)).toEqual({
      count: 5 * CUMULATIVE_CHARACTER_COUNT,
      total: 8 * CUMULATIVE_CHARACTER_COUNT,
    })
  })

  test("a companion scope counts every card, cumulative or not", () => {
    const companion = zeroedCompanion()
    for (const card of COMPANION_CARDS) companion[card.id] = { count: 6, total: 9 }

    expect(sumCompanionScope(companion)).toEqual({
      count: 6 * COMPANION_CARDS.length,
      total: 9 * COMPANION_CARDS.length,
    })
    expect(COMPANION_CARDS.length).toBeGreaterThan(0)
  })

  test("a scope over cards nothing has been counted into is zero on both sides", () => {
    expect(sumAccountScope(zeroedAccount())).toEqual({ count: 0, total: 0 })
    expect(sumCharacterScope(zeroedCharacter())).toEqual({ count: 0, total: 0 })
    expect(sumCompanionScope(zeroedCompanion())).toEqual({ count: 0, total: 0 })
  })

  test("a resetting card is left out of the account and character scopes", () => {
    const resettingAccount = ACCOUNT_CARDS.filter((card) => !isCumulativeCard(card.id))
    const resettingCharacter = CHARACTER_CARDS.filter((card) => !isCumulativeCard(card.id))
    expect(resettingAccount.length + resettingCharacter.length).toBeGreaterThan(0)

    const account = zeroedAccount()
    for (const card of resettingAccount) account[card.id] = { count: 100, total: 100 }
    const character = zeroedCharacter()
    for (const card of resettingCharacter) character[card.id] = { count: 100, total: 100 }

    expect(sumAccountScope(account)).toEqual({ count: 0, total: 0 })
    expect(sumCharacterScope(character)).toEqual({ count: 0, total: 0 })
  })
})
