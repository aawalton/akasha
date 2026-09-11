import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const buyerName = {
  id: "01a0685d-89aa-7156-8c60-1ac86c89368f",
  type: "text-property",
  slug: "buyer-name",
  propertySlug: "buyer-name",
  definition: "the account an item was bought by",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
