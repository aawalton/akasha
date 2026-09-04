import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ArmorType = number

export const armorType = {
  id: "01a05fcd-f54c-7e54-b137-1ee0839f485b",
  pageTypeSlug: "number-property",
  slug: "armor-type",
  propertySlug: "armor-type",
  definition: "the weight class of armor an item is",
  max: null,
} as const satisfies NumberProperty
