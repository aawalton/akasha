import type { TextProperty } from "@akasha/pages-system/text-property"

export type ClassId = string

export const classId = {
  id: "01a05fca-cb81-7a5f-a2f7-41aefe8c6b62",
  pageTypeSlug: "text-property",
  slug: "class-id",
  propertySlug: "class-id",
  definition: "the class a script reads differently for",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a class.",
    },
  ],
} as const satisfies TextProperty
