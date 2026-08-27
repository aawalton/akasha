import { describe, expect, it } from "bun:test"
import {
  ACCOUNT_CARDS,
  CHARACTER_CARDS,
  CUMULATIVE_ACCOUNT_CARDS,
  CUMULATIVE_CHARACTER_CARDS,
} from "./completion-card-registry"
import { isCumulativeCard, isResettingCard } from "./completion-card-reset-behavior"

describe("cumulative card registries", () => {
  it("CUMULATIVE_CHARACTER_CARDS excludes every resetting card", () => {
    for (const card of CUMULATIVE_CHARACTER_CARDS) {
      expect(isResettingCard(card.id)).toBe(false)
      expect(isCumulativeCard(card.id)).toBe(true)
    }
  })

  it("CUMULATIVE_ACCOUNT_CARDS excludes every resetting card", () => {
    for (const card of CUMULATIVE_ACCOUNT_CARDS) {
      expect(isResettingCard(card.id)).toBe(false)
      expect(isCumulativeCard(card.id)).toBe(true)
    }
  })

  it("drops daily-writs from the character permanent view", () => {
    expect(CHARACTER_CARDS.some((c) => c.id === "daily-writs")).toBe(true)
    expect(CUMULATIVE_CHARACTER_CARDS.some((c) => c.id === "daily-writs")).toBe(false)
  })

  it("drops the antiquity-leads cards from the account permanent view", () => {
    expect(CUMULATIVE_ACCOUNT_CARDS.some((c) => c.id === "antiquity-leads-legendary")).toBe(false)
    expect(CUMULATIVE_ACCOUNT_CARDS.some((c) => c.id === "antiquity-leads-motifs")).toBe(false)
  })

  it("keeps every cumulative card from the full registry", () => {
    const expectedChar = CHARACTER_CARDS.filter((c) => isCumulativeCard(c.id))
    expect(CUMULATIVE_CHARACTER_CARDS).toEqual(expectedChar)
    const expectedAccount = ACCOUNT_CARDS.filter((c) => isCumulativeCard(c.id))
    expect(CUMULATIVE_ACCOUNT_CARDS).toEqual(expectedAccount)
  })
})
