import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const stockQuantity = {
  id: "01a0d8c3-b8a9-75c9-8ac0-4627b1081d11",
  type: "page-type/number-property",
  slug: "stock-quantity",
  propertySlug: "stock-quantity",
  definition: "how many of its item a stocking rule keeps",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
