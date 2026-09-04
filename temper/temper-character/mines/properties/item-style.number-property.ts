import type { NumberProperty } from "@akasha/pages-system/number-property"

export type ItemStyle = number

export const itemStyle = {
  id: "01a05fcd-f551-7d3e-b2da-c159378bc326",
  pageTypeSlug: "number-property",
  slug: "item-style",
  propertySlug: "style",
  definition: "the cultural style an item is made in",
  max: null,
} as const satisfies NumberProperty
