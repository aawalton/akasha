import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ItemNameContains = string

export const itemNameContains = {
  id: "01a05fcb-fd32-75de-abbc-161a35a4b1a1",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "item-name-contains",
  propertySlug: "item-name-contains",
  definition: "the words an item's name has for the branch to take it",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
