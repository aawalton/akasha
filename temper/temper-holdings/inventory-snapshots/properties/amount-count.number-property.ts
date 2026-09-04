import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AmountCount = number

export const amountCount = {
  id: "01a06053-b37b-79a4-bcdc-eb5b3f03cab2",
  pageTypeSlug: "number-property",
  slug: "amount-count",
  propertySlug: "amount-count",
  definition: "how many of an item are listed for sale",
  max: null,
} as const satisfies NumberProperty
