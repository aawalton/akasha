import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type BopTradeable = boolean

export const bopTradeable = {
  id: "01a06053-b37c-7c03-a83d-9646c904a9d3",
  pageTypeSlug: "boolean-property",
  slug: "bop-tradeable",
  propertySlug: "bop-tradeable",
  definition: "whether a bound item may still go to whoever earned the item alongside",
} as const satisfies BooleanProperty
