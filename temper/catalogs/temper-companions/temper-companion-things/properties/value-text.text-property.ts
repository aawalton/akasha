import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ValueText = string

export const valueText = {
  id: "01a05fcf-246b-7280-9bef-d656202e06a7",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "value-text",
  propertySlug: "value-text",
  definition: "the text a constant holds",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
