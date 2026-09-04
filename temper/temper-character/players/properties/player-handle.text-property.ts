import type { TextProperty } from "@akasha/pages-system/text-property"

export type PlayerHandle = string

export const playerHandle = {
  id: "01a06e47-1976-783b-9378-3634a67b0e9d",
  pageTypeSlug: "text-property",
  slug: "player-handle",
  propertySlug: "handle",
  definition: "the name a player is shown under to other players",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
