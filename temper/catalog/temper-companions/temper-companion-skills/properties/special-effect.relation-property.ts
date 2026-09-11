import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const specialEffect = {
  id: "01a08ece-83bb-74f4-bd4f-f9b0672a0047",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "special-effect",
  propertySlug: "special-effect",
  definition: "the act a skill effect names in place of a number",
  targetPageType: "page-type/temper-special-effect-type",
  types: "ts",
} as const satisfies RelationProperty
