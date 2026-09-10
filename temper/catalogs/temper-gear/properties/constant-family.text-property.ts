import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ConstantFamily = string

export const constantFamily = {
  id: "01a05fd1-d438-7600-b72e-b390f2f0dabf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "constant-family",
  propertySlug: "constant-family",
  definition: "the group of gear values a constant belongs to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
