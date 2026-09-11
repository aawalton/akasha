import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const firstName = {
  id: "01a05fcd-f544-7cb1-bba6-6e863b43b867",
  type: "text-property",
  slug: "first-name",
  propertySlug: "first-name",
  definition: "what a character is called for short",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
