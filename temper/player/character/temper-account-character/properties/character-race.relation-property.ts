import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const characterRace = {
  id: "01a15670-535d-74da-80ef-f1c5d8ba8e71",
  type: "page-type/relation-property",
  slug: "character-race",
  propertySlug: "race",
  definition: "the race a character was rolled as",
  targetPageType: "page-type/temper-race",
  types: "ts",
  createdAt: "2026-10-19T23:12:44.380Z",
  updatedAt: "2026-10-19T23:12:44.380Z",
} as const satisfies RelationProperty
