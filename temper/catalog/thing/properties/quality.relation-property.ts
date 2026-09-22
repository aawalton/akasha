import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const quality = {
  id: "01a05fb0-3ced-77db-9e30-4e6234c93115",
  type: "page-type/relation-property",
  slug: "quality",
  propertySlug: "quality",
  definition: "a thing's grade",
  targetPageType: "page-type/temper-quality",
  types: "ts",
} as const satisfies RelationProperty
