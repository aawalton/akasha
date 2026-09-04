import type { NumberProperty } from "@akasha/pages-system/number-property"

export type SalePrice = number

export const salePrice = {
  id: "01a0685d-89aa-784d-9be8-d85ea2639775",
  pageTypeSlug: "number-property",
  slug: "sale-price",
  propertySlug: "sale-price",
  definition: "what a buyer paid in gold",
  max: null,
} as const satisfies NumberProperty
