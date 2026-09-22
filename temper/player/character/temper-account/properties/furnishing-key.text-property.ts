import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const furnishingKey = {
  id: "01a0675a-f185-740b-a52c-e6f2ef7cdcf2",
  type: "page-type/text-property",
  slug: "furnishing-key",
  propertySlug: "furnishing-key",
  definition: "the game's string for a placed furnishing",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
