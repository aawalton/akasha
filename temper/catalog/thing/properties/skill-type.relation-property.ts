import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const skillType = {
  id: "01a05fba-ce3b-7869-b428-d3dd2f8703d7",
  type: "page-type/relation-property",
  slug: "skill-type",
  propertySlug: "skill-type",
  definition: "the sort of skill a page is about",
  targetPageType: "page-type/temper-skill-type",
  types: "ts",
} as const satisfies RelationProperty
