import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const characterConditionField = {
  id: "01a0d8a2-9a9d-75f0-b5b4-4a3b0dbc4e23",
  type: "page-type/relation-property",
  slug: "character-condition-field",
  propertySlug: "character-condition-field",
  definition: "the thing about a character that a leg's character test names",
  targetPageType: "page-type/temper-character-condition-field",
  types: "ts",
} as const satisfies RelationProperty
