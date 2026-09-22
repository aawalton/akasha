import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const effectiveCharacter = {
  id: "01a0c931-a8fd-73bf-9d92-c50b03800442",
  type: "page-type/relation-property",
  slug: "effective-character",
  propertySlug: "effective-character",
  definition: "the character a rotating task falls to for its current turn",
  targetPageType: "page-type/temper-account-character",
  types: "ts",
} as const satisfies RelationProperty
