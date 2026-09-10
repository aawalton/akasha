import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export type TotalValue = number

export const totalValue = {
  id: "01a05fcb-fd2a-75cf-8930-e033cb736730",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "total-value",
  propertySlug: "total-value",
  definition: "what everything a reading covers is worth in gold",
  max: null,
} as const satisfies NumberProperty
