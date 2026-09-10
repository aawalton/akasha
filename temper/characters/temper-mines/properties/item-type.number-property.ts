import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type ItemType = number

export const itemType = {
  id: "01a05fcd-f551-7007-a182-be620f340830",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "item-type",
  propertySlug: "item-type",
  definition: "the sort of thing an item is",
  max: null,
} as const satisfies NumberProperty
