import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const goal = {
  id: "01a05fd0-3aa5-7e52-843e-37a0187718f4",
  type: "page-type/relation-property",
  slug: "goal",
  propertySlug: "goal",
  definition: "a player's reason for keeping the item",
  targetPageType: "page-type/temper-rule-goal",
  types: "ts",
} as const satisfies RelationProperty
