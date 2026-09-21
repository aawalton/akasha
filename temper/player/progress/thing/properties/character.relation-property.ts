import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const character = {
  id: "01a05fc6-81fb-7d2b-9860-e72705b8dd8f",
  type: "page-type/relation-property",
  slug: "character",
  propertySlug: "character",
  definition: "the character a page is about",
  targetPageType: "page-type/temper-account-character",
  types: "ts",
} as const satisfies RelationProperty
