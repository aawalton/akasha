import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const classId = {
  id: "01a05fca-cb81-7a5f-a2f7-41aefe8c6b62",
  type: "page-type/text-property",
  slug: "class-id",
  propertySlug: "class-id",
  definition: "the class for which a script reads differently",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a class.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
