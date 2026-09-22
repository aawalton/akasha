import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const buyerName = {
  id: "01a0685d-89aa-7156-8c60-1ac86c89368f",
  type: "page-type/text-property",
  slug: "buyer-name",
  propertySlug: "buyer-name",
  definition: "an item's buying account",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
