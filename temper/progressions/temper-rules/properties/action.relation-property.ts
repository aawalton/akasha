import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const action = {
  id: "01a05fd0-3aa2-7b8c-94d8-d42fee16f415",
  type: "relation-property",
  slug: "action",
  propertySlug: "action",
  definition: "what a rule does to an item the rule matches",
  targetPageType: "page-type/temper-item-action",
  types: "ts",
} as const satisfies RelationProperty
