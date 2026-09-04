import type { TextProperty } from "@akasha/pages-system/text-property"

export type Destination = string

export const destination = {
  id: "01a05fd0-3aa5-7412-834a-6f12550992d0",
  pageTypeSlug: "text-property",
  slug: "destination",
  propertySlug: "destination",
  definition: "where a rule moving an item puts the item",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
