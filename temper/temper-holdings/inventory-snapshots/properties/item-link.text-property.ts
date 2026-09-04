import type { TextProperty } from "@akasha/pages-system/text-property"

export type ItemLink = string

export const itemLink = {
  id: "01a06053-b37e-7d8f-9b54-cc84490468a6",
  pageTypeSlug: "text-property",
  slug: "item-link",
  propertySlug: "item-link",
  definition: "the string the game writes an item's whole state as",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
