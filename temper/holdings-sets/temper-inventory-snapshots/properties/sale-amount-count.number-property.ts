import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const saleAmountCount = {
  id: "01a06053-b381-725f-b7e5-12f853fc3295",
  type: "number-property",
  slug: "sale-amount-count",
  propertySlug: "sale-amount-count",
  definition: "how many of an item the averaged sales covered",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
