import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type TraitDescription = string

export const traitDescription = {
  id: "01a05fcd-f555-763a-91b6-6940440fe5ee",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "trait-description",
  propertySlug: "trait-description",
  definition: "what the trait worked into an item does",
  maxLength: 500,
  nameFormat: null,
} as const satisfies TextProperty
