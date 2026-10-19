import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const characterClass = {
  id: "01a15670-535d-7600-9875-76ac072df95c",
  type: "page-type/relation-property",
  slug: "character-class",
  propertySlug: "class",
  definition: "the class a character was rolled as",
  targetPageType: "page-type/temper-class",
  types: "ts",
  createdAt: "2026-10-19T23:12:44.380Z",
  updatedAt: "2026-10-19T23:12:44.380Z",
} as const satisfies RelationProperty
