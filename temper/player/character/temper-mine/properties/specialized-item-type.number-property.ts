import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const specializedItemType = {
  id: "01a05fcd-f555-706e-a4c3-2a13a46747d2",
  type: "page-type/number-property",
  slug: "specialized-item-type",
  propertySlug: "specialized-item-type",
  definition: "the narrower sort of thing an item is",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
