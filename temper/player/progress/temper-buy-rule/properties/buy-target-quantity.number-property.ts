import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const buyTargetQuantity = {
  id: "01a0d8c3-b8a8-712e-8574-aeee992728e9",
  type: "page-type/number-property",
  slug: "buy-target-quantity",
  propertySlug: "target-quantity",
  definition: "how many of its item a buy rule keeps bought",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
