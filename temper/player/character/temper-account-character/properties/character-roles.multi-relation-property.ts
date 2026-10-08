import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const characterRoles = {
  id: "01a076c2-ee95-7043-8326-ee288ac93a97",
  type: "page-type/multi-relation-property",
  slug: "character-roles",
  propertySlug: "roles",
  definition: "a part a character is planned to play",
  targetPageType: "page-type/temper-character-role",
  types: "ts",
  createdAt: "2026-09-06T12:48:01.685Z",
  updatedAt: "2026-09-22T13:58:32.000Z",
} as const satisfies MultiRelationProperty
