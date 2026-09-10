import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type CompanionRoles = List<Slug>

export const companionRoles = {
  id: "01a076c3-0a1f-7a37-9498-511bec8c2675",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "companion-roles",
  propertySlug: "roles",
  definition: "a duty a companion is planned to cover",
  targetPageType: "page-type/temper-companion-role",
} as const satisfies RelationProperty
