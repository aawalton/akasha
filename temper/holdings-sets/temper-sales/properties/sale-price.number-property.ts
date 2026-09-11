import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const salePrice = {
  id: "01a0685d-89aa-784d-9be8-d85ea2639775",
  type: "number-property",
  slug: "sale-price",
  propertySlug: "sale-price",
  definition: "what a buyer paid in gold",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
