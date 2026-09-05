import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type Goal = string

export const goal = {
  id: "01a05fd0-3aa5-7e52-843e-37a0187718f4",
  pageTypeSlug: "relation-property",
  slug: "goal",
  propertySlug: "goal",
  definition: "what a player is keeping the item for",
  targetPageTypeSlug: "page-type/temper-rule-goal",
} as const satisfies RelationProperty
