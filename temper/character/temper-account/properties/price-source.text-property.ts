import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const priceSource = {
  id: "01a0675a-f185-7929-9208-3fb95bf5d7a1",
  type: "page-type/text-property",
  slug: "price-source",
  propertySlug: "price-source",
  definition: "the addon the gold figures on a reading came from",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
