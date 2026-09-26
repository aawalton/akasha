import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const metricDivisor = {
  id: "01a0de62-56d0-7fc4-9ed7-cdffcdc9f17f",
  type: "page-type/number-property",
  slug: "metric-divisor",
  propertySlug: "divisor",
  definition: "the rating a rated stat takes to reach one whole percent",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
