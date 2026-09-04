import type { SavedSearchStore } from "@akasha/temper-items-filters-core/saved-search"

import type { ListingEntry } from "@akasha/temper-trading-listings/listing-types"

export interface GuildSnapshot {
  guildName: string
  kioskName: string
  listings: Record<string, ListingEntry>
}

export interface LastSoldEntry {
  stackCount: number
  pricePerUnit: number
}

export interface SavedVariablesData {
  displayName: string
  worldName: string
  guilds: Record<string, GuildSnapshot>
  savedSearches: SavedSearchStore
  lastSold: Record<string, LastSoldEntry>
  perf?: { loadTimeMs: number }
}

export const SAVED_VARIABLES_DEFAULTS: SavedVariablesData & Record<string, unknown> = {
  displayName: "",
  worldName: "",
  guilds: {},
  savedSearches: { searches: [] },
  lastSold: {},
}
