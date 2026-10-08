import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const baseStatMetric = {
  id: "01a0df46-e492-70d2-abeb-f7b819283a2c",
  type: "page-type/relation-property",
  slug: "base-stat-metric",
  propertySlug: "metric",
  definition: "the stat a base stat moves",
  targetPageType: "page-type/temper-metric",
  types: "ts",
  createdAt: "2026-09-26T19:52:40.338Z",
  updatedAt: "2026-09-26T19:52:44.000Z",
} as const satisfies RelationProperty
