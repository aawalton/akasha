import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const suggestedPrice = {
  id: "01a06053-b383-7448-b1ba-e91fc6cead28",
  type: "number-property",
  slug: "suggested-price",
  propertySlug: "suggested-price",
  definition: "the gold a seller is advised to ask for an item",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
