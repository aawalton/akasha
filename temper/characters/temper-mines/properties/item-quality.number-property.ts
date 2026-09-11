import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const itemQuality = {
  id: "01a05fcd-f550-7c6e-82be-0dccaa9c37c6",
  type: "number-property",
  slug: "item-quality",
  propertySlug: "quality",
  definition: "the grade an item is made at, as the game numbers grades",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
