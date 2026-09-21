import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const totalValue = {
  id: "01a05fcb-fd2a-75cf-8930-e033cb736730",
  type: "page-type/number-property",
  slug: "total-value",
  propertySlug: "total-value",
  definition: "what everything a reading covers is worth in gold",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
