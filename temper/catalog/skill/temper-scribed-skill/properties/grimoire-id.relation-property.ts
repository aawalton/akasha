import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const grimoireId = {
  id: "01a05fca-cb83-73a3-afc2-bf571210f393",
  type: "page-type/relation-property",
  slug: "grimoire-id",
  propertySlug: "grimoire-id",
  definition: "a scribed skill's grimoire",
  targetPageType: "page-type/temper-grimoire",
  types: "ts",
} as const satisfies RelationProperty
