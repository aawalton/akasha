import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const saleAvg = {
  id: "01a06053-b381-7e47-8f7b-1921dc8dc919",
  type: "page-type/number-property",
  slug: "sale-avg",
  propertySlug: "sale-avg",
  definition: "the average gold an item has sold for",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
