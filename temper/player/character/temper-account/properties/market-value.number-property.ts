import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const marketValue = {
  id: "01a06053-b37d-7603-aa73-880a2e6d55eb",
  type: "page-type/number-property",
  slug: "market-value",
  propertySlug: "market-value",
  definition: "what an item is reckoned to be worth in gold",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
