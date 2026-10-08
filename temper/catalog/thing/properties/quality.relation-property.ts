import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const quality = {
  id: "01a05fb0-3ced-77db-9e30-4e6234c93115",
  type: "page-type/relation-property",
  slug: "quality",
  propertySlug: "quality",
  definition: "a thing's grade",
  targetPageType: "page-type/temper-quality",
  types: "ts",
  createdAt: "2026-09-02T01:16:20.589Z",
  updatedAt: "2026-09-22T16:12:04.000Z",
} as const satisfies RelationProperty
