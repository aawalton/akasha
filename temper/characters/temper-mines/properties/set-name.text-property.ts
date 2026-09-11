import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const setName = {
  id: "01a05fcd-f555-7273-9cc6-e1676adee740",
  type: "text-property",
  slug: "set-name",
  propertySlug: "set-name",
  definition: "what the set an item belongs to is called",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
