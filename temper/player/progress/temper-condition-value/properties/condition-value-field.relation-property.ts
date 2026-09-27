import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const conditionValueField = {
  id: "01a0e270-1aa6-7723-afc6-39c66af2f4b5",
  type: "page-type/relation-property",
  slug: "condition-value-field",
  propertySlug: "condition-field",
  definition: "the condition field a condition value is a value of",
  targetPageType: "page-type/temper-condition-field",
  types: "ts",
} as const satisfies RelationProperty
