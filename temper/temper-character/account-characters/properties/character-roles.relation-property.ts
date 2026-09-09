import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type CharacterRoles = Slug

export const characterRoles = {
  id: "01a076c2-ee95-7043-8326-ee288ac93a97",
  pageTypeSlug: "relation-property",
  slug: "character-roles",
  propertySlug: "roles",
  definition: "a part a character is planned to play",
  targetPageType: "page-type/temper-character-role",
} as const satisfies RelationProperty
