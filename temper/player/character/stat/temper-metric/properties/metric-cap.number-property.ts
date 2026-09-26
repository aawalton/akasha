import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const metricCap = {
  id: "01a0de62-56d0-77da-bfe1-0e3eeca5a2d6",
  type: "page-type/number-property",
  slug: "metric-cap",
  propertySlug: "cap",
  definition: "the most a rated stat can come to",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
