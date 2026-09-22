import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const classId = {
  id: "01a05fca-cb81-7a5f-a2f7-41aefe8c6b62",
  type: "page-type/relation-property",
  slug: "class-id",
  propertySlug: "class-id",
  definition: "the class for which a script reads differently",
  targetPageType: "page-type/temper-class",
  types: "ts",
} as const satisfies RelationProperty
