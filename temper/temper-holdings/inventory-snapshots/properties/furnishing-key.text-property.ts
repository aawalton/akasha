import type { TextProperty } from "@akasha/pages/text-property"

export type FurnishingKey = string

export const furnishingKey = {
  id: "01a0675a-f185-740b-a52c-e6f2ef7cdcf2",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "furnishing-key",
  propertySlug: "furnishing-key",
  definition: "the string the game names a placed furnishing by",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
