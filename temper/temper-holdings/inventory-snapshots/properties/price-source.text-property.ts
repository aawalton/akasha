import type { TextProperty } from "@akasha/pages/text-property"

export type PriceSource = string

export const priceSource = {
  id: "01a0675a-f185-7929-9208-3fb95bf5d7a1",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "price-source",
  propertySlug: "price-source",
  definition: "the addon the gold figures on a reading came from",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
