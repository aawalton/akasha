import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const categoryId = {
  id: "01a05fba-ce38-7da7-8f2a-a30aa8bbacae",
  type: "text-property",
  slug: "category-id",
  propertySlug: "category-id",
  definition: "the group a thing is filed under",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [{ invariantKind: "gap", statement: "This property is a relation to  a category." }],
  types: "ts",
} as const satisfies TextProperty
