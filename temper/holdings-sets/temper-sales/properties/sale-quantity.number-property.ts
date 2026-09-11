import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const saleQuantity = {
  id: "01a0685d-89aa-724b-b85f-0851f02aaa3c",
  type: "number-property",
  slug: "sale-quantity",
  propertySlug: "quantity",
  definition: "how many of an item went in one sale",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
