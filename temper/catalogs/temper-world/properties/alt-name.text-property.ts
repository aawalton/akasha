import type { TextProperty } from "@akasha/pages/text-property"

export type AltName = string

export const altName = {
  id: "01a05fc4-7a8f-7317-a065-cf6c35fe2012",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "alt-name",
  propertySlug: "alt-name",
  definition: "the second name a people is known by",
  maxLength: 200,
  nameFormat: null,
} as const satisfies TextProperty
