import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type SuggestedPrice = number

export const suggestedPrice = {
  id: "01a06053-b383-7448-b1ba-e91fc6cead28",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "suggested-price",
  propertySlug: "suggested-price",
  definition: "the gold a seller is advised to ask for an item",
  max: null,
} as const satisfies NumberProperty
