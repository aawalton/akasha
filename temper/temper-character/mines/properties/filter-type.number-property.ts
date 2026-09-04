import type { NumberProperty } from "@akasha/pages-system/number-property"

export type FilterType = number

export const filterType = {
  id: "01a05fcd-f54d-71a9-a104-a3d18ce7eab4",
  pageTypeSlug: "number-property",
  slug: "filter-type",
  propertySlug: "filter-type",
  definition: "the tab the game files an item under",
  max: null,
} as const satisfies NumberProperty
