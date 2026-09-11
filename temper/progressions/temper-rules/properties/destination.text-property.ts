import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const destination = {
  id: "01a05fd0-3aa5-7412-834a-6f12550992d0",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "destination",
  propertySlug: "destination",
  definition: "where a rule moving an item puts the item",
  maxLength: 50,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
