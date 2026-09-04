import type { TextProperty } from "@akasha/pages-system/text-property"

export type SetName = string

export const setName = {
  id: "01a05fcd-f555-7273-9cc6-e1676adee740",
  pageTypeSlug: "text-property",
  slug: "set-name",
  propertySlug: "set-name",
  definition: "what the set an item belongs to is called",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
