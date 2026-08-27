import { describe, expect, test } from "bun:test"
import { ACCOUNT_CARDS, CHARACTER_CARDS, COMPANION_CARDS } from "./completion-card-registry"
import { isCumulativeCard } from "./completion-card-reset-behavior"
import { buildCompletionSummaries, computeOverallCompletionScore } from "./completion-overall-score"

const EMPTY = buildCompletionSummaries([], [], null)

describe("buildCompletionSummaries (empty inputs)", () => {
  test("runs without throwing and scores a finite, non-negative number", () => {
    const score = computeOverallCompletionScore(
      EMPTY.accountSummary,
      EMPTY.characterSummary,
      EMPTY.companionSummary
    )
    expect(Number.isFinite(score)).toBe(true)
    expect(score).toBeGreaterThanOrEqual(0)
  })
})

describe("computeOverallCompletionScore", () => {
  test("sums only cumulative account+character cards plus all companion entries", () => {
    const account = { ...EMPTY.accountSummary }
    for (const c of ACCOUNT_CARDS)
      account[c.id] = { count: isCumulativeCard(c.id) ? 2 : 9999, total: 0 }
    const character = { ...EMPTY.characterSummary }
    for (const c of CHARACTER_CARDS)
      character[c.id] = { count: isCumulativeCard(c.id) ? 2 : 9999, total: 0 }
    const companion = { ...EMPTY.companionSummary }
    for (const c of COMPANION_CARDS) companion[c.id] = { count: 3, total: 0 }

    const cumulativeAccount = ACCOUNT_CARDS.filter((c) => isCumulativeCard(c.id)).length
    const cumulativeCharacter = CHARACTER_CARDS.filter((c) => isCumulativeCard(c.id)).length
    const expected = 2 * cumulativeAccount + 2 * cumulativeCharacter + 3 * COMPANION_CARDS.length

    expect(computeOverallCompletionScore(account, character, companion)).toBe(expected)
  })

  test("a resetting card's count never enters the total", () => {
    const account = { ...EMPTY.accountSummary }
    for (const c of ACCOUNT_CARDS)
      account[c.id] = { count: isCumulativeCard(c.id) ? 1 : 0, total: 0 }
    const character = { ...EMPTY.characterSummary }
    for (const c of CHARACTER_CARDS)
      character[c.id] = { count: isCumulativeCard(c.id) ? 1 : 0, total: 0 }
    const companion = { ...EMPTY.companionSummary }
    for (const c of COMPANION_CARDS) companion[c.id] = { count: 0, total: 0 }
    const base = computeOverallCompletionScore(account, character, companion)

    for (const c of ACCOUNT_CARDS)
      if (!isCumulativeCard(c.id)) account[c.id] = { count: 100_000, total: 0 }
    for (const c of CHARACTER_CARDS)
      if (!isCumulativeCard(c.id)) character[c.id] = { count: 100_000, total: 0 }

    expect(computeOverallCompletionScore(account, character, companion)).toBe(base)
  })
})
