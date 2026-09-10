import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type CharacterName = string

export const characterName = {
  id: "01a05fd3-435c-7547-b700-960e8b753707",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "character-name",
  propertySlug: "character-name",
  definition: "the name a character is shown under in the game",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
