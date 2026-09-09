import type { TextProperty } from "@akasha/pages/text-property"

export type SetName = string

export const setName = {
  id: "01a05fcd-f555-7273-9cc6-e1676adee740",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "set-name",
  propertySlug: "set-name",
  definition: "what the set an item belongs to is called",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
