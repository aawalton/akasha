import type { NumberProperty } from "@akasha/pages-system/number-property"

export type Tax = number

export const tax = {
  id: "01a0685d-89aa-7312-b0d9-123291b38407",
  pageTypeSlug: "number-property",
  slug: "tax",
  propertySlug: "tax",
  definition: "what the store took out of a price",
  max: null,
} as const satisfies NumberProperty
