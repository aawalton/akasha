import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type CompanionRoles = Slug

export const companionRoles = {
  id: "01a076c3-0a1f-7a37-9498-511bec8c2675",
  pageTypeSlug: "relation-property",
  slug: "companion-roles",
  propertySlug: "roles",
  definition: "a duty a companion is planned to cover",
  targetPageType: "page-type/temper-companion-role",
} as const satisfies RelationProperty
