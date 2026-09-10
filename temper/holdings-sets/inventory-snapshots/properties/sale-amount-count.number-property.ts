import type { NumberProperty } from "@akasha/pages/number-property"

export type SaleAmountCount = number

export const saleAmountCount = {
  id: "01a06053-b381-725f-b7e5-12f853fc3295",
  pageTypeSlug: "number-property",
  type: "number-property",
  slug: "sale-amount-count",
  propertySlug: "sale-amount-count",
  definition: "how many of an item the averaged sales covered",
  max: null,
} as const satisfies NumberProperty
