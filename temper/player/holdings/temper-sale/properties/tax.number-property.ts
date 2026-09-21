import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const tax = {
  id: "01a0685d-89aa-7312-b0d9-123291b38407",
  type: "page-type/number-property",
  slug: "tax",
  propertySlug: "tax",
  definition: "what the store took out of a price",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
