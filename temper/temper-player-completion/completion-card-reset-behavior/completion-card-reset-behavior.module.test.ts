import { describe, expect, test } from "bun:test"
import { isCumulativeCard, isResettingCard } from "./completion-card-reset-behavior.module.code.ts"

const RESETTING_CARD_IDS = [
  "daily-writs",
  "hireling-mails",
  "guild-sales",
  "antiquity-leads-motifs",
  "antiquity-leads-legendary",
  "active-quests",
  "inventory-management",
  "dungeon-sets",
]

const CUMULATIVE_CARD_IDS = [
  "account-achievements",
  "antiquity-lore",
  "bank-upgrades",
  "champion-points",
  "collectibles",
  "grand-master-stations",
  "account-recipes",
  "account-trait-research",
  "item-sets",
  "lore-library",
  "account-points-of-interest",
  "account-quests",
  "account-scribing-knowledge",
  "subclassing-skill-lines",
  "subclassing-skill-morphs",
  "tales-of-tribute",
  "account-zone-completion",
  "character-achievements",
  "alliance-rank",
  "cadwells-almanac",
  "character-level",
  "companion-quests",
  "companion-rapport-character",
  "recipes",
  "trait-research",
  "lore-library-character",
  "mount-training",
  "pack-upgrades",
  "points-of-interest",
  "quests",
  "skill-lines",
  "skill-morphs",
  "skill-points",
  "scribing-knowledge",
  "zone-completion",
  "companion-level",
  "companion-quests-union",
  "companion-rapport",
  "companion-skill-lines",
]

describe("isResettingCard", () => {
  test.each(RESETTING_CARD_IDS)("the %s card starts over", (cardId) => {
    expect(isResettingCard(cardId)).toBe(true)
  })

  test.each(CUMULATIVE_CARD_IDS)("the %s card does not start over", (cardId) => {
    expect(isResettingCard(cardId)).toBe(false)
  })

  test("no card at all does not start over", () => {
    expect(isResettingCard(undefined)).toBe(false)
  })

  test("a card the table never names does not start over", () => {
    expect(isResettingCard("not-a-real-card")).toBe(false)
  })
})

describe("isCumulativeCard", () => {
  test.each(CUMULATIVE_CARD_IDS)("the %s card counts for all time", (cardId) => {
    expect(isCumulativeCard(cardId)).toBe(true)
  })

  test.each(RESETTING_CARD_IDS)("the %s card does not count for all time", (cardId) => {
    expect(isCumulativeCard(cardId)).toBe(false)
  })

  test("no card at all does not count for all time", () => {
    expect(isCumulativeCard(undefined)).toBe(false)
  })

  test("a card the table never names does not count for all time", () => {
    expect(isCumulativeCard("not-a-real-card")).toBe(false)
  })
})

describe("the two answers together", () => {
  test("the table names every card the two lists name and nothing else", () => {
    for (const cardId of [...RESETTING_CARD_IDS, ...CUMULATIVE_CARD_IDS]) {
      expect(isResettingCard(cardId) || isCumulativeCard(cardId)).toBe(true)
      expect(isResettingCard(cardId) && isCumulativeCard(cardId)).toBe(false)
    }
  })
})
