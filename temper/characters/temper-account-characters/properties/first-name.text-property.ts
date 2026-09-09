import type { TextProperty } from "@akasha/pages/text-property"

export type FirstName = string

export const firstName = {
  id: "01a05fcd-f544-7cb1-bba6-6e863b43b867",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "first-name",
  propertySlug: "first-name",
  definition: "what a character is called for short",
  maxLength: 100,
  nameFormat: null,
} as const satisfies TextProperty
