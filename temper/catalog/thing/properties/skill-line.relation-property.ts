import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const skillLine = {
  id: "01a0cb21-70d9-7538-be2f-3fc1b1531dca",
  type: "page-type/relation-property",
  slug: "skill-line",
  propertySlug: "skill-line-id",
  definition: "the line a thing is learned from",
  targetPageType: "page-type/temper-skill-line",
  types: "ts",
} as const satisfies RelationProperty
