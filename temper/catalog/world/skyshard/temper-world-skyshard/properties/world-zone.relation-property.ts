import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const worldZone = {
  id: "01a0d5d4-6c7f-712a-86b7-e6a314ba29a0",
  type: "page-type/relation-property",
  slug: "world-zone",
  propertySlug: "world-zone",
  definition: "the zone whose guide counts a skyshard",
  targetPageType: "page-type/temper-world-zone",
  types: "ts",
} as const satisfies RelationProperty
