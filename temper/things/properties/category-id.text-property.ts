import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type CategoryId = string

export const categoryId = {
  id: "01a05fba-ce38-7da7-8f2a-a30aa8bbacae",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "category-id",
  propertySlug: "category-id",
  definition: "the group a thing is filed under",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to  a category." }],
} as const satisfies TextProperty
