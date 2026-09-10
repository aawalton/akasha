import type { AnyCompletionCardId } from "../completion-card-id/completion-card-id.module.code.ts"

export type ResetBehavior = "resetting" | "cumulative"

const CARD_RESET_BEHAVIOR: Record<AnyCompletionCardId, ResetBehavior> = {
  "account-achievements": "cumulative",
  "antiquity-leads-legendary": "resetting",
  "antiquity-leads-motifs": "resetting",
  "antiquity-lore": "cumulative",
  "bank-upgrades": "cumulative",
  "champion-points": "cumulative",
  collectibles: "cumulative",
  "grand-master-stations": "cumulative",
  "account-recipes": "cumulative",
  "account-trait-research": "cumulative",
  "item-sets": "cumulative",
  "lore-library": "cumulative",
  "account-points-of-interest": "cumulative",
  "account-quests": "cumulative",
  "account-scribing-knowledge": "cumulative",
  "subclassing-skill-lines": "cumulative",
  "subclassing-skill-morphs": "cumulative",
  "tales-of-tribute": "cumulative",
  "account-zone-completion": "cumulative",
  "character-achievements": "cumulative",
  "alliance-rank": "cumulative",
  "cadwells-almanac": "cumulative",
  "character-level": "cumulative",
  "companion-quests": "cumulative",
  "daily-writs": "resetting",
  "companion-rapport-character": "cumulative",
  recipes: "cumulative",
  "trait-research": "cumulative",
  "lore-library-character": "cumulative",
  "mount-training": "cumulative",
  "pack-upgrades": "cumulative",
  "points-of-interest": "cumulative",
  quests: "cumulative",
  "skill-lines": "cumulative",
  "skill-morphs": "cumulative",
  "skill-points": "cumulative",
  "scribing-knowledge": "cumulative",
  "zone-completion": "cumulative",
  "companion-level": "cumulative",
  "companion-quests-union": "cumulative",
  "companion-rapport": "cumulative",
  "companion-skill-lines": "cumulative",
  "guild-sales": "resetting",
  "hireling-mails": "resetting",
  "active-quests": "resetting",
  "inventory-management": "resetting",
  "dungeon-sets": "resetting",
}

const RESETTING_CARD_IDS: ReadonlySet<string> = new Set(
  Object.entries(CARD_RESET_BEHAVIOR)
    .filter(([, behavior]) => behavior === "resetting")
    .map(([id]) => id)
)

const CUMULATIVE_CARD_IDS: ReadonlySet<string> = new Set(
  Object.entries(CARD_RESET_BEHAVIOR)
    .filter(([, behavior]) => behavior === "cumulative")
    .map(([id]) => id)
)

export function isResettingCard(cardId: string | undefined): boolean {
  if (cardId === undefined) return false
  return RESETTING_CARD_IDS.has(cardId)
}

export function isCumulativeCard(cardId: string | undefined): boolean {
  if (cardId === undefined) return false
  return CUMULATIVE_CARD_IDS.has(cardId)
}
