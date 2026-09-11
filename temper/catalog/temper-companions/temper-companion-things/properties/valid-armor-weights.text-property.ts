import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const validArmorWeights = {
  id: "01a05fce-1853-7880-bba6-4f23630e1dbf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "valid-armor-weights",
  propertySlug: "valid-armor-weights",
  definition: "an armor weight a role is built around",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  types: "ts",
} as const satisfies TextProperty
