import { describe, expect, it } from "bun:test"
import { isCumulativeCard, isResettingCard } from "./completion-card-reset-behavior"

const RESETTING_CARDS = [
  "daily-writs",
  "hireling-mails",
  "guild-sales",
  "antiquity-leads-motifs",
  "antiquity-leads-legendary",
  "active-quests",
  "inventory-management",
  "dungeon-sets",
]

const CUMULATIVE_CARDS = [
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
  it.each(RESETTING_CARDS)("%s → true", (cardId) => {
    expect(isResettingCard(cardId)).toBe(true)
  })

  it.each(CUMULATIVE_CARDS)("%s → false", (cardId) => {
    expect(isResettingCard(cardId)).toBe(false)
  })

  it("undefined → false", () => {
    expect(isResettingCard(undefined)).toBe(false)
  })

  it("unknown card id → false", () => {
    expect(isResettingCard("not-a-real-card")).toBe(false)
  })
})

describe("isCumulativeCard", () => {
  it.each(CUMULATIVE_CARDS)("%s → true", (cardId) => {
    expect(isCumulativeCard(cardId)).toBe(true)
  })

  it.each(RESETTING_CARDS)("%s → false", (cardId) => {
    expect(isCumulativeCard(cardId)).toBe(false)
  })

  it("undefined → false (no card is not cumulative)", () => {
    expect(isCumulativeCard(undefined)).toBe(false)
  })

  it("unknown card id → false (safer default)", () => {
    expect(isCumulativeCard("not-a-real-card")).toBe(false)
  })
})
