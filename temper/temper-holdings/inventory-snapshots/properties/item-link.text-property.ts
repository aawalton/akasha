import type { TextProperty } from "@akasha/pages/text-property"

export type ItemLink = string

export const itemLink = {
  id: "01a06053-b37e-7d8f-9b54-cc84490468a6",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "item-link",
  propertySlug: "item-link",
  definition: "the string the game writes an item's whole state as",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
