import type { TextProperty } from "@akasha/pages-system/text-property"

export type PriceSource = string

export const priceSource = {
  id: "01a0675a-f185-7929-9208-3fb95bf5d7a1",
  pageTypeSlug: "text-property",
  slug: "price-source",
  propertySlug: "price-source",
  definition: "the addon the gold figures on a reading came from",
  max: 100,
  nameFormatSlug: null,
} as const satisfies TextProperty
