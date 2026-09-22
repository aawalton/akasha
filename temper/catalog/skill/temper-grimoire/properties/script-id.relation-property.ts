import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const scriptId = {
  id: "01a05fca-cb86-726d-9036-faa9f19d229d",
  type: "page-type/relation-property",
  slug: "script-id",
  propertySlug: "script-id",
  definition: "the script an entry is about",
  targetPageType: "page-type/temper-script",
  types: "ts",
} as const satisfies RelationProperty
