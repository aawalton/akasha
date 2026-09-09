import type { TextProperty } from "@akasha/pages/text-property"

export type EsoCharacterId = string

export const esoCharacterId = {
  id: "01a05fba-ce39-7efc-aa9e-99bf36eda42a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "eso-character-id",
  propertySlug: "eso-character-id",
  definition: "the character The Elder Scrolls Online names by this",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
