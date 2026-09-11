import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const amountCount = {
  id: "01a06053-b37b-79a4-bcdc-eb5b3f03cab2",
  type: "number-property",
  slug: "amount-count",
  propertySlug: "amount-count",
  definition: "how many of an item are listed for sale",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
