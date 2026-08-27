/**
 * Temper Inventory Currencies (Generated)
 *
 * ESO inventory currencies sourced from the universal pages table
 * (page type: temper-inventory-currency).
 *
 * DO NOT EDIT — regenerate with: ops temper addon-data generate
 */

import type { CurrencyTemplate } from "../inventory-currency-data"

/**
 * Keyed-by-id view of the currency catalog. Preserved as a literal object
 * so the resulting Record type carries the same string-literal keys the
 * engine needs for its currency-id union, with no runtime conversion and
 * no `as` cast required.
 */
export const INVENTORY_CURRENCY_DATA = {
  gold: { id: "gold" as const, name: "Gold" },
  alliancePoints: { id: "alliancePoints" as const, name: "Alliance Points" },
  telvarStones: { id: "telvarStones" as const, name: "Tel Var Stones" },
  transmuteCrystals: { id: "transmuteCrystals" as const, name: "Transmute Crystals" },
  writVouchers: { id: "writVouchers" as const, name: "Writ Vouchers" },
  eventTickets: { id: "eventTickets" as const, name: "Event Tickets" },
  endeavorSeals: { id: "endeavorSeals" as const, name: "Endeavor Seals" },
  undauntedKeys: { id: "undauntedKeys" as const, name: "Undaunted Keys" },
  crowns: { id: "crowns" as const, name: "Crowns" },
  crownGems: { id: "crownGems" as const, name: "Crown Gems" },
  archivalFortunes: { id: "archivalFortunes" as const, name: "Archival Fortunes" },
  tradeBars: { id: "tradeBars" as const, name: "Trade Bars" },
  tomePoints: { id: "tomePoints" as const, name: "Tome Points" },
  tomePointCaches: { id: "tomePointCaches" as const, name: "Tome Point Caches" },
  tomeTokens: { id: "tomeTokens" as const, name: "Tome Tokens" },
  tomeChallengeRerolls: { id: "tomeChallengeRerolls" as const, name: "Tome Challenge Rerolls" },
} as const satisfies Record<string, CurrencyTemplate>
