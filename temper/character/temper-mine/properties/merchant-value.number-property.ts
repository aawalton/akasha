import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const merchantValue = {
  id: "01a05fcd-f551-79d8-8c3b-5ad26decd62d",
  type: "page-type/number-property",
  slug: "merchant-value",
  propertySlug: "merchant-value",
  definition: "what a merchant pays for one item",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
