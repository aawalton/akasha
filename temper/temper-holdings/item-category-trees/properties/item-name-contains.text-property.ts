import type { TextProperty } from "@akasha/pages-system/text-property"

export type ItemNameContains = string

export const itemNameContains = {
  id: "01a05fcb-fd32-75de-abbc-161a35a4b1a1",
  pageTypeSlug: "text-property",
  slug: "item-name-contains",
  propertySlug: "item-name-contains",
  definition: "the words an item's name carries for the branch to take it",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
