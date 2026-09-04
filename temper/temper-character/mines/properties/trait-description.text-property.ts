import type { TextProperty } from "@akasha/pages-system/text-property"

export type TraitDescription = string

export const traitDescription = {
  id: "01a05fcd-f555-763a-91b6-6940440fe5ee",
  pageTypeSlug: "text-property",
  slug: "trait-description",
  propertySlug: "trait-description",
  definition: "what the trait worked into an item does",
  max: 500,
  nameFormatSlug: null,
} as const satisfies TextProperty
