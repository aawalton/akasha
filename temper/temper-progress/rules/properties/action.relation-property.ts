import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type Action = string

export const action = {
  id: "01a05fd0-3aa2-7b8c-94d8-d42fee16f415",
  pageTypeSlug: "relation-property",
  slug: "action",
  propertySlug: "action",
  definition: "what a rule does to an item the rule matches",
  targetPageTypeSlug: "page-type/temper-item-action",
} as const satisfies RelationProperty
