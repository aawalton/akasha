import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const classId = {
  id: "01a05fca-cb81-7a5f-a2f7-41aefe8c6b62",
  type: "text-property",
  slug: "class-id",
  propertySlug: "class-id",
  definition: "the class a script reads differently for",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a class.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
