import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const bopTradeable = {
  id: "01a06053-b37c-7c03-a83d-9646c904a9d3",
  type: "boolean-property",
  slug: "bop-tradeable",
  propertySlug: "bop-tradeable",
  definition: "whether a bound item may still go to whoever earned the item alongside",
  types: "ts",
} as const satisfies BooleanProperty
