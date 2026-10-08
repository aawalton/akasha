import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const itemCategory = {
  id: "01a0cb28-5b39-7c29-84fb-966ab4410f94",
  type: "page-type/relation-property",
  slug: "item-category",
  propertySlug: "category-id",
  definition: "the branch of the inventory tree a rule acts over",
  targetPageType: "page-type/temper-item-category-tree",
  types: "ts",
  createdAt: "2026-09-22T22:06:54.777Z",
  updatedAt: "2026-09-22T22:08:51.000Z",
} as const satisfies RelationProperty
