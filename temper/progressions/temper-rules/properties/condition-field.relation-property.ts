import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const conditionField = {
  id: "01a05fd0-3aa3-7030-b6ea-b5999bd300d5",
  type: "relation-property",
  slug: "condition-field",
  propertySlug: "condition-field",
  definition: "the test one condition of a rule names",
  targetPageType: "page-type/temper-condition-field",
  types: "ts",
} as const satisfies RelationProperty
