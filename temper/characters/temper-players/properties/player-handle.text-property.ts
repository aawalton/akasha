import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const playerHandle = {
  id: "01a06e47-1976-783b-9378-3634a67b0e9d",
  type: "text-property",
  slug: "player-handle",
  propertySlug: "handle",
  definition: "the name a player is shown under to other players",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
