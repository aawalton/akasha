import type { TextProperty } from "@akasha/pages-system/text-property"

export type BuyerName = string

export const buyerName = {
  id: "01a0685d-89aa-7156-8c60-1ac86c89368f",
  pageTypeSlug: "text-property",
  slug: "buyer-name",
  propertySlug: "buyer-name",
  definition: "the account an item was bought by",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
