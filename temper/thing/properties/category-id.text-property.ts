import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const categoryId = {
  id: "01a05fba-ce38-7da7-8f2a-a30aa8bbacae",
  type: "page-type/text-property",
  slug: "category-id",
  propertySlug: "category-id",
  definition: "a thing's group",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to  a category.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
