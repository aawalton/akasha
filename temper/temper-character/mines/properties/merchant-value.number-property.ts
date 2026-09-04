import type { NumberProperty } from "@akasha/pages-system/number-property"

export type MerchantValue = number

export const merchantValue = {
  id: "01a05fcd-f551-79d8-8c3b-5ad26decd62d",
  pageTypeSlug: "number-property",
  slug: "merchant-value",
  propertySlug: "value",
  definition: "what a merchant pays for one item",
  max: null,
} as const satisfies NumberProperty
