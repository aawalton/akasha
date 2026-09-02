import type { BuySource } from "@akasha/temper-items-rules-core/buy-rule-types"

export const ITEM_ACTION_CHOICES = [
  "nothing",
  "lock",
  "unlock",
  "move-to",
  "stock",
  "character-equip",
  "companion-equip",
  "deconstruct",
  "refine",
  "destroy",
  "fence-launder",
  "fence-sell",
  "list",
  "mail",
  "research",
  "sell",
  "use",
  "open",
] as const

export const STOCK_SCOPE_CHOICES = ["current-character", "any-character"] as const

export const BUY_SOURCE_CHOICES: readonly BuySource[] = ["merchant"]
