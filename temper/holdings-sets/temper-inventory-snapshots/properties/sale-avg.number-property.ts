import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const saleAvg = {
  id: "01a06053-b381-7e47-8f7b-1921dc8dc919",
  type: "number-property",
  slug: "sale-avg",
  propertySlug: "sale-avg",
  definition: "the average gold an item has sold for",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
