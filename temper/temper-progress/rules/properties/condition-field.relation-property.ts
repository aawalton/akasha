import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type ConditionField = string

export const conditionField = {
  id: "01a05fd0-3aa3-7030-b6ea-b5999bd300d5",
  pageTypeSlug: "relation-property",
  slug: "condition-field",
  propertySlug: "condition-field",
  definition: "the test one condition of a rule names",
  targetPageTypeSlug: "page-type/temper-condition-field",
} as const satisfies RelationProperty
