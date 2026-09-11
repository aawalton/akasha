import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const characterRoles = {
  id: "01a076c2-ee95-7043-8326-ee288ac93a97",
  type: "relation-property",
  slug: "character-roles",
  propertySlug: "roles",
  definition: "a part a character is planned to play",
  targetPageType: "page-type/temper-character-role",
  types: "ts",
} as const satisfies RelationProperty
